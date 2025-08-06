package relay

import (
	domainsV1 "billionmail-core/api/domains/v1"
	"billionmail-core/internal/consts"
	"billionmail-core/internal/model/entity"
	docker "billionmail-core/internal/service/dockerapi"
	"billionmail-core/internal/service/domains"
	"billionmail-core/internal/service/public"
	"context"
	"encoding/hex"
	"fmt"
	"github.com/gogf/gf/util/grand"
	"github.com/gogf/gf/v2/crypto/gaes"
	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gfile"
	"path"
	"regexp"
	"strings"
)

var (
	postfixConfigDir = public.AbsPath("../conf/postfix")

	senderRelayFile     = "/conf/sender_relay"
	saslPasswdFile      = "/conf/sasl_passwd"
	senderTransportFile = "/conf/sender_transport_relay"
	mainCfFile          = "main.cf"
	//mainCfFileExtra      = "/conf/extra.cf"
	postfixContainerName = consts.SERVICES.Postfix
)

func GetRelayEncryptionKey() (string, error) {
	// 1. Retrieve key from the database
	val, err := g.DB().Model("bm_options").
		Where("name", "relay_encryption_key").
		Value("value")

	if val != nil && val.String() != "" {
		if _, err := hex.DecodeString(val.String()); err == nil {
			return val.String(), nil
		}
	}

	// 2. Generate key
	newSecret := hex.EncodeToString(grand.B(16))

	// 3. Save the new key to the database
	_, err = g.DB().Model("bm_options").
		OnConflict("name").
		OnDuplicate("value").
		Data(g.Map{
			"name":  "relay_encryption_key",
			"value": newSecret,
		}).
		Save()
	if err != nil {
		// If insert fails, attempt to retrieve the key again
		val, err = g.DB().Model("bm_options").
			Where("name", "relay_encryption_key").
			Value("value")

		if val != nil && val.String() != "" {
			return val.String(), nil
		}
		return "", gerror.New("Failed to insert new key and retrieve key again")
	}

	return newSecret, nil
}

func EncryptPassword(ctx context.Context, plainText string) (string, error) {
	if plainText == "" {
		return "", gerror.New("Password cannot be empty")
	}
	relayEncryptionKey, err := GetRelayEncryptionKey()
	if err != nil {
		return "", gerror.Wrap(err, "Failed to retrieve encryption key")
	}

	keyBytes, err := hex.DecodeString(relayEncryptionKey)
	if err != nil {
		return "", gerror.Wrap(err, "Failed to parse encryption key")
	}

	if len(keyBytes) < 16 {
		return "", gerror.New("Encryption key length is insufficient")
	}
	keyBytes = keyBytes[:16]

	encrypted, err := gaes.Encrypt([]byte(plainText), keyBytes)
	if err != nil {
		//g.Log().Errorf(ctx, "Password encryption failed: %v", err)
		return "", gerror.Wrap(err, "Password encryption failed")
	}

	return hex.EncodeToString(encrypted), nil
}

func DecryptPassword(ctx context.Context, encryptedHex string) (string, error) {
	if encryptedHex == "" {
		return "", nil
	}

	encryptedBytes, err := hex.DecodeString(encryptedHex)
	if err != nil {
		//g.Log().Errorf(ctx, "Decryption failed, invalid hex format: %v", err)
		return "", gerror.Wrap(err, "Password format is incorrect")
	}

	relayEncryptionKey, err := GetRelayEncryptionKey()
	if err != nil {
		return "", gerror.Wrap(err, "Failed to retrieve encryption key")
	}

	keyBytes, err := hex.DecodeString(relayEncryptionKey)
	if err != nil {
		return "", gerror.Wrap(err, "Failed to parse encryption key")
	}

	if len(keyBytes) < 16 {
		return "", gerror.New("Encryption key length is insufficient")
	}
	keyBytes = keyBytes[:16]

	decrypted, err := gaes.Decrypt(encryptedBytes, keyBytes)
	if err != nil {
		//g.Log().Errorf(ctx, "Password decryption failed: %v", err)
		return "", gerror.Wrap(err, "Password decryption failed")
	}

	return string(decrypted), nil
}

func buildCacheKey(domain, recordType string) string {
	return fmt.Sprintf("DOMAIN_DNS_RECORDS_:%s:_%s", domain, recordType)
}

// GenerateSPFRecord generates SPF record hints based on IP and host.
func GenerateSPFRecord(ip string, host string, domain string) string {
	// Retrieve the current SPF record for the domain
	var existingValue string
	var newSpfParts []string

	// Fetch SPF record from cache or domains service
	spfRecord := public.GetCache(buildCacheKey(domain, "SPF"))

	if spfRecord != nil {
		if v, ok := spfRecord.(domainsV1.DNSRecord); ok {
			existingValue = v.Value
		}
	}

	// If cache is empty, attempt to fetch from domains service
	if existingValue == "" {
		record, _ := domains.GetSPFRecord(domain, false)
		existingValue = record.Value
	}

	// Create a basic record if none exists
	if existingValue == "" {
		existingValue = "v=spf1 +a +mx"
	}

	// Analyze the existing record to avoid duplications
	parts := strings.Split(existingValue, " ")
	existingParts := make(map[string]bool)
	var allMechanism string

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		existingParts[part] = true
		if strings.HasSuffix(part, "all") {
			allMechanism = part
			continue
		}
		newSpfParts = append(newSpfParts, part)
	}

	// Add IP if provided and not duplicated
	if ip != "" {
		var ipPart string
		if strings.Contains(ip, ":") {
			ipPart = fmt.Sprintf("+ip6:%s", ip)
		} else {
			ipPart = fmt.Sprintf("+ip4:%s", ip)
		}
		if !existingParts[ipPart] {
			newSpfParts = append(newSpfParts, ipPart)
		}
	}

	// Add host if provided and not duplicated
	if host != "" {
		hostPart := fmt.Sprintf("include:%s", host)
		if !existingParts[hostPart] {
			newSpfParts = append(newSpfParts, hostPart)
		}
	}

	if allMechanism != "" {
		newSpfParts = append(newSpfParts, allMechanism)
	} else {
		newSpfParts = append(newSpfParts, "~all")
	}

	return strings.Join(newSpfParts, " ")
}

// SyncRelayConfigsToPostfix
func SyncRelayConfigsToPostfix(ctx context.Context) error {
	// 1. Retrieve all active relay configurations
	var activeConfigs []*entity.BmRelay
	err := g.DB().Model("bm_relay").Where("active", 1).Scan(&activeConfigs)
	if err != nil {
		//g.Log().Errorf(ctx, "Failed to query active relay configurations: %v", err)
		return gerror.Wrap(err, "Failed to query relay configurations")
	}
	// Check the total number of configurations (including inactive ones)
	totalCount, err := g.DB().Model("bm_relay").Count()
	if err != nil {
		//g.Log().Errorf(ctx, "Failed to query total relay configuration count: %v", err)
		return gerror.Wrap(err, "Failed to query total relay configuration count")
	}
	// 2. Generate configuration files
	if err := generateRelayConfigFiles(ctx, activeConfigs); err != nil {
		return err
	}
	// 3. Update master.cf
	if err := updatePostfixMasterCf(ctx, activeConfigs); err != nil {
		return err
	}
	// 4. Update markers in main.cf and extra.cf; if no configurations exist, disable relay functionality
	mainCfPath := path.Join(postfixConfigDir, mainCfFile)
	if err := ensurePostfixRelayConfig(mainCfPath, totalCount > 0); err != nil {
		return err
	}
	// 5. Execute Postfix commands
	return reloadPostfixConfigs(ctx)
}

// generateRelayConfigFiles Generates relay configuration files
func generateRelayConfigFiles(ctx context.Context, configs []*entity.BmRelay) error {
	// Ensure the configuration directory exists
	senderRelayPath := path.Join(postfixConfigDir, senderRelayFile)
	saslPasswdPath := path.Join(postfixConfigDir, saslPasswdFile)
	senderTransportPath := path.Join(postfixConfigDir, senderTransportFile)

	if !gfile.Exists(postfixConfigDir) {
		return gerror.New("Postfix configuration directory does not exist : " + postfixConfigDir)
	}
	// Generate configuration file content
	var senderRelayContent strings.Builder
	var saslPasswdContent strings.Builder
	var senderTransportContent strings.Builder
	if len(configs) == 0 {
		senderRelayContent.WriteString("# No active relay configurations\n")
		saslPasswdContent.WriteString("# No active relay configurations\n")
		senderTransportContent.WriteString("# No active relay configurations\n")
	} else {
		for _, config := range configs {
			// Process sender_relay content
			// Ensure SenderDomain starts with @
			senderDomain := config.SenderDomain
			if !strings.HasPrefix(senderDomain, "@") {
				senderDomain = "@" + senderDomain
			}

			senderRelayContent.WriteString(fmt.Sprintf("%s [%s]:%s\n",
				senderDomain, config.RelayHost, config.RelayPort))
			// Process sasl_passwd content
			// Decrypt password
			decryptedPass, err := DecryptPassword(ctx, config.AuthPassword)
			if err != nil {
				g.Log().Warningf(ctx, "Decryption of password for configuration ID %d failed, skipping this configuration: %v", config.Id, err)
				continue
			}

			saslPasswdContent.WriteString(fmt.Sprintf("[%s]:%s %s:%s\n",
				config.RelayHost, config.RelayPort, config.AuthUser, decryptedPass))
			// Create sender_transport configuration
			smtpName := "smtp_default"
			if config.SmtpName != "" {

				cleanedSmtpName := regexp.MustCompile(`[^a-zA-Z0-9]+`).ReplaceAllString(config.SmtpName, "_")
				smtpName = fmt.Sprintf("smtp_%s", cleanedSmtpName)
			}

			senderTransportContent.WriteString(fmt.Sprintf("%s %s:[%s]:%s\n",
				strings.TrimPrefix(senderDomain, "@"), smtpName, config.RelayHost, config.RelayPort))
		}
	}

	// 写入配置文件
	if err := gfile.PutContents(senderRelayPath, senderRelayContent.String()); err != nil {
		return gerror.Newf("Failed to write sender_relay file: %v", err)
	}

	if err := gfile.PutContents(saslPasswdPath, saslPasswdContent.String()); err != nil {
		return gerror.Newf("Failed to write sasl_passwd file: %v", err)
	}

	if err := gfile.PutContents(senderTransportPath, senderTransportContent.String()); err != nil {
		return gerror.Newf("Failed to write sender_transport file: %v", err)
	}

	return nil
}

// updatePostfixMasterCf Updates the Postfix master configuration file
func updatePostfixMasterCf(ctx context.Context, configs []*entity.BmRelay) error {
	masterCfPath := path.Join(postfixConfigDir, "master.cf")
	if !gfile.Exists(masterCfPath) {
		g.Log().Warning(ctx, "master.cf file not found, skipping configuration update")
		return nil
	}

	// Read existing content
	masterContent := gfile.GetContents(masterCfPath)

	beginMarker := "# BEGIN BILLIONMAIL RELAY CONFIG - DO NOT EDIT THIS MARKER"
	endMarker := "# END BILLIONMAIL RELAY CONFIG - DO NOT EDIT THIS MARKER"

	var customConfigBlock strings.Builder
	customConfigBlock.WriteString(beginMarker + "\n")

	//  If there are active configurations, create service lines for each configuration
	if len(configs) > 0 {
		for _, config := range configs {
			// Generate SMTP service name
			smtpName := "smtp"
			if config.SmtpName != "" {

				cleanedSmtpName := regexp.MustCompile(`[^a-zA-Z0-9]+`).ReplaceAllString(config.SmtpName, "_")
				smtpName = fmt.Sprintf("smtp_%s", cleanedSmtpName)
			} else {
				// Generate a unique name based on the domain
				domain := regexp.MustCompile(`[^a-zA-Z0-9]+`).ReplaceAllString(config.SenderDomain, "_")
				smtpName = fmt.Sprintf("smtp_%s", domain)
			}

			// Configure HELO name
			heloName := config.HeloName
			if heloName == "" {
				heloName = config.Host
				if heloName == "" {
					heloName = config.SenderDomain
				}
			}

			serviceLine := fmt.Sprintf("%s unix - - n - - smtp", smtpName)

			var params []string

			if heloName != "" {
				params = append(params, fmt.Sprintf("-o smtp_helo_name=%s", heloName))
			}

			// TLS parameters - configure based on settings
			if config.TlsProtocol != "" {
				switch config.TlsProtocol {
				case "STARTTLS":
					params = append(params, "-o smtp_use_tls=yes")
					params = append(params, "-o smtp_tls_security_level=may")
				case "SSL/TLS":
					params = append(params, "-o smtp_use_tls=yes")
					params = append(params, "-o smtp_tls_wrappermode=yes")
				case "NONE":
					params = append(params, "-o smtp_use_tls=no")
				}
			} else {

				params = append(params, "-o smtp_use_tls=yes")
				params = append(params, "-o smtp_tls_security_level=may")
			}

			// TLS
			if config.SkipTlsVerify == 1 {
				params = append(params, "-o smtp_tls_verify_cert_match=no")
			}

			// Authentication setting
			if config.AuthMethod != "" {
				switch config.AuthMethod {
				case "LOGIN":
					params = append(params, "-o smtp_sasl_mechanism_filter=login")
				case "PLAIN":
					params = append(params, "-o smtp_sasl_mechanism_filter=plain")
				case "CRAM-MD5":
					params = append(params, "-o smtp_sasl_mechanism_filter=cram-md5")
				case "NONE":
					params = append(params, "-o smtp_sasl_auth_enable=no")
				}
			}

			// Connection and concurrency settings
			maxConcurrency := 10
			if config.MaxConcurrency > 0 {
				maxConcurrency = config.MaxConcurrency
				params = append(params, fmt.Sprintf("-o smtp_destination_concurrency_limit=%d", maxConcurrency))
			}

			//maxRetries := 2
			//if config.MaxRetries > 0 {
			//	maxRetries = config.MaxRetries
			//
			//}

			if config.MaxWaitTime != "" {
				params = append(params, fmt.Sprintf("-o smtp_connect_timeout=%s", config.MaxWaitTime))
			}

			if config.MaxIdleTime != "" {
				params = append(params, fmt.Sprintf("-o smtp_connection_cache_time_limit=%s", config.MaxIdleTime))
			}

			if len(params) > 0 {

				serviceLine += "\n  " + strings.Join(params, "\n  ")
			}

			customConfigBlock.WriteString(serviceLine + "\n")
		}
	} else {

		customConfigBlock.WriteString("# No active relay configurations\n")
	}

	customConfigBlock.WriteString(endMarker + "\n")

	beginIndex := strings.Index(masterContent, beginMarker)
	endIndex := strings.Index(masterContent, endMarker)
	hasConfigBlock := beginIndex != -1 && endIndex != -1 && beginIndex < endIndex

	var newContent string
	if hasConfigBlock {

		blockEnd := endIndex + len(endMarker)
		if blockEnd < len(masterContent) && masterContent[blockEnd] == '\n' {
			blockEnd++
		}
		newContent = masterContent[:beginIndex] + customConfigBlock.String()
		if blockEnd < len(masterContent) {
			newContent += masterContent[blockEnd:]
		}
	} else {

		if !strings.HasSuffix(masterContent, "\n") {
			masterContent += "\n"
		}
		newContent = masterContent + customConfigBlock.String()
	}

	if err := gfile.PutContents(masterCfPath, newContent); err != nil {
		return gerror.Newf("Failed to write to master.cf file: %v", err)
	}

	return nil
}

// reloadPostfixConfigs Reloads Postfix configurations
func reloadPostfixConfigs(ctx context.Context) error {
	// Connect to the Docker API
	dk, err := docker.NewDockerAPI()
	if err != nil {
		g.Log().Error(ctx, "Failed to connect to Docker API:", err)
		return gerror.Wrap(err, "Failed to connect to Docker service")
	}
	defer dk.Close()
	// List of commands to run
	cmdsToRun := [][]string{
		{"postmap", "/etc/postfix/conf/sender_relay"},
		{"postmap", "/etc/postfix/conf/sasl_passwd"},
		{"postmap", "/etc/postfix/conf/sender_transport_relay"},
		{"postfix", "reload"},
	}
	// Execute commands
	for _, cmd := range cmdsToRun {
		cmdStr := strings.Join(cmd, " ")
		g.Log().Infof(ctx, "Executing command in container %s: %s", postfixContainerName, cmdStr)
		result, err := dk.ExecCommandByName(ctx, postfixContainerName, cmd, "root")

		if err != nil {
			//g.Log().Errorf(ctx, "Failed to execute command: %v, Command: %s", err, cmdStr)
			return gerror.Newf("Failed to execute command: %v, Command: %s", err, cmdStr)
		}

		if result == nil {
			//g.Log().Errorf(ctx, "Command execution result is empty: %s", cmdStr)
			return gerror.Newf("Command execution result is empty: %s", cmdStr)
		}

		if result.ExitCode != 0 {
			//g.Log().Errorf(ctx, "Command execution returned non-zero status: %d, Output: %s, Command: %s", result.ExitCode, result.Output, cmdStr)
			return gerror.Newf("Command execution failed, Exit code: %d, Output: %s, Command: %s",
				result.ExitCode, result.Output, cmdStr)
		}
		g.Log().Infof(ctx, "Command executed successfully: %s, Output: %s", cmdStr, result.Output)
	}

	return nil
}

// ensurePostfixRelayConfig
func ensurePostfixRelayConfig(mainCfPath string, enableRelay bool) error {
	//  main.cf
	if err := writePostfixRelayConfig(mainCfPath, enableRelay); err != nil {
		return err
	}

	////  extra.cf
	//extraCfPath := path.Join(postfixConfigDir, mainCfFileExtra)
	//return writePostfixRelayConfig(extraCfPath, enableRelay)
	return nil
}

// writePostfixRelayConfig
func writePostfixRelayConfig(cfPath string, enableRelay bool) error {

	if !gfile.Exists(cfPath) {
		if err := gfile.PutContents(cfPath, ""); err != nil {
			return gerror.Newf("Failed to create configuration file %s: %v", cfPath, err)
		}
	}

	content := gfile.GetContents(cfPath)

	beginMarker := "# BEGIN RELAY SERVICE CONFIGURATION - DO NOT EDIT THIS MARKER"
	endMarker := "# END RELAY SERVICE CONFIGURATION - DO NOT EDIT THIS MARKER"

	configBlock := fmt.Sprintf(`%s
smtp_sasl_auth_enable = yes
smtp_sasl_security_options = noanonymous
sender_dependent_relayhost_maps = hash:/etc/postfix/conf/sender_relay
smtp_sasl_password_maps = hash:/etc/postfix/conf/sasl_passwd
sender_dependent_default_transport_maps = hash:/etc/postfix/conf/sender_transport_relay
smtp_sasl_mechanism_filter = login, plain, cram-md5
%s`, beginMarker, endMarker)

	// Find the existing configuration block
	beginIndex := strings.Index(content, beginMarker)
	endIndex := strings.Index(content, endMarker)

	// Check if the configuration block exists
	hasConfigBlock := beginIndex != -1 && endIndex != -1 && beginIndex < endIndex

	// Decide the operation based on whether relay is enabled and if the configuration block exists
	modified := false

	if enableRelay {
		if hasConfigBlock {
			g.Log().Debugf(nil, "Relay configuration block already exists in %s, no modification needed", cfPath)
		} else {
			// Need to add the configuration block
			if strings.HasSuffix(content, "\n") {
				content = content + configBlock + "\n"
			} else {
				content = content + "\n" + configBlock + "\n"
			}
			modified = true
		}
	} else {
		if hasConfigBlock {
			// Need to remove the configuration block
			blockStart := beginIndex
			blockEnd := endIndex + len(endMarker)

			if blockEnd < len(content) && content[blockEnd] == '\n' {
				blockEnd++
			}

			newContent := content[:blockStart]
			if blockEnd < len(content) {
				newContent += content[blockEnd:]
			}
			content = newContent
			modified = true
		}
	}
	// If there are modifications, write to the file
	if modified {
		if err := gfile.PutContents(cfPath, content); err != nil {
			return gerror.Newf("Failed to write to file %s: %v", cfPath, err)
		}
	}

	return nil
}
