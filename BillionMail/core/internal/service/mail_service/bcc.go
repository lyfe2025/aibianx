package mail_service

import (
	"billionmail-core/internal/consts"
	"billionmail-core/internal/model/entity"
	docker "billionmail-core/internal/service/dockerapi"
	"billionmail-core/internal/service/public"
	"context"
	"fmt"
	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gfile"
	"github.com/gogf/gf/v2/text/gstr"
	"path"
	"regexp"
	"strings"
)

func ProcessForwardUsers(forwardUsers string) []string {

	tmp := strings.Split(forwardUsers, "\\n")
	if len(tmp) == 1 && strings.Contains(tmp[0], "\n") {
		tmp = strings.Split(tmp[0], "\n")
	}

	result := make([]string, 0, len(tmp))
	for _, addr := range tmp {
		addr = strings.TrimSpace(addr)
		if addr != "" {
			result = append(result, addr)
		}
	}

	return result
}

// SyncBccToPostfix  sync bcc to postfix
func SyncBccToPostfix(ctx context.Context) error {

	// configPath
	postfixConfigDir := public.AbsPath(consts.POSTFIX_CONF_PATH)
	senderBccFile := path.Join(postfixConfigDir, "sender_bcc")
	recipientBccFile := path.Join(postfixConfigDir, "recipient_bcc")
	mainCfFile := public.AbsPath(consts.POSTFIX_MAIN_CONF)

	if !gfile.Exists(postfixConfigDir) {
		return gerror.New("Postfix configuration directory does not exist : " + postfixConfigDir)

	}

	// clear bcc file
	for _, file := range []string{senderBccFile, recipientBccFile} {
		if err := gfile.PutContents(file, ""); err != nil {
			return gerror.Newf("clear bcc file err : %v", err)
		}
	}

	// read bcc from database
	for _, bccType := range []string{"sender", "recipient"} {
		var rules []*entity.BmBcc
		err := g.DB().Model("bm_bcc").
			Where("type", bccType).
			Where("active", 1).
			Scan(&rules)
		if err != nil {
			return err
		}

		var content strings.Builder
		for _, rule := range rules {
			address := rule.Address
			// check address is domain or email
			domainRegex := regexp.MustCompile(`^(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$`)
			if domainRegex.MatchString(address) {
				content.WriteString(fmt.Sprintf("@%s %s\n", address, rule.Goto))
			} else {
				content.WriteString(fmt.Sprintf("%s %s\n", address, rule.Goto))
			}
		}

		// write bcc to file
		targetFile := senderBccFile
		if bccType == "recipient" {
			targetFile = recipientBccFile
		}

		if content.Len() > 0 {
			if err := gfile.PutContents(targetFile, content.String()); err != nil {
				return gerror.Newf("write bcc to file, err: %v", err)
			}
		}
	}

	// check main.cf file and add bcc config
	if err := ensurePostfixBccConfig(mainCfFile); err != nil {
		return err
	}

	postfixContainer := consts.SERVICES.Postfix

	dk, dockerErr := docker.NewDockerAPI()
	if dockerErr != nil {
		g.Log().Error(ctx, "Failed to connect to Docker API:", dockerErr)
		return dockerErr
	}
	defer dk.Close()

	cmdsToRun := [][]string{
		{"postmap", "/etc/postfix/conf/sender_bcc"},
		{"postmap", "/etc/postfix/conf/recipient_bcc"},
		{"postfix", "reload"},
	}

	for _, cmd := range cmdsToRun {
		result, err := dk.ExecCommandByName(ctx, postfixContainer, cmd, "root")

		if err != nil {
			g.Log().Error(ctx, "Failed to execute command in container :", err, "command:", strings.Join(cmd, " "))
			return gerror.Newf("Failed to execute command in container: %v, command: %s", err, strings.Join(cmd, " "))
		}

		if result == nil {
			g.Log().Error(ctx, "The result of the command is empty:", "command:", strings.Join(cmd, " "))
			return gerror.Newf("The result of the command is empty: %s", strings.Join(cmd, " "))
		}

		if result.ExitCode != 0 {
			g.Log().Error(ctx, "The command execution returns a nonzero status:", result.ExitCode, "output:", result.Output, "command:", strings.Join(cmd, " "))
			return gerror.Newf("Command execution failed, exit code: %d, output: %s, command: %s",
				result.ExitCode, result.Output, strings.Join(cmd, " "))
		}
	}

	return nil
}

// ensurePostfixBccConfig Make sure the Postfix configuration includes the BCC option
func ensurePostfixBccConfig(mainCfFile string) error {

	content := gfile.GetContents(mainCfFile)

	needUpdate := false
	bccConfig := ""

	// check sender_bcc_maps
	if !gstr.Contains(content, "sender_bcc_maps") {
		bccConfig += "sender_bcc_maps = hash:/etc/postfix/conf/sender_bcc\n"
		needUpdate = true
	}

	// check recipient_bcc_maps
	if !gstr.Contains(content, "recipient_bcc_maps") {
		bccConfig += "recipient_bcc_maps = hash:/etc/postfix/conf/recipient_bcc\n"
		needUpdate = true
	}

	if needUpdate {
		if !strings.HasSuffix(content, "\n") {
			content += "\n"
		}
		content += bccConfig

		if err := gfile.PutContents(mainCfFile, content); err != nil {
			return gerror.Newf("Failed to write to the configuration file: %v", err)
		}
	}

	return nil
}

// IsDomain Checks if the string is in domain format
func IsDomain(str string) bool {
	domainRegex := regexp.MustCompile(`^(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$`)
	return domainRegex.MatchString(str)
}

// ExtractDomain Extract the domain name from the address
func ExtractDomain(address string) string {
	if strings.Contains(address, "@") {
		return strings.Split(address, "@")[1]
	} else if strings.HasPrefix(address, "@") {
		return address[1:]
	}
	return address
}
