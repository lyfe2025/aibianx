package settings

import (
	"billionmail-core/api/settings/v1"
	"billionmail-core/internal/service/public"
	"context"
	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/frame/g"
)

func (c *ControllerV1) GetSystemConfig(ctx context.Context, req *v1.GetSystemConfigReq) (res *v1.GetSystemConfigRes, err error) {
	res = &v1.GetSystemConfigRes{}

	envMap, err := public.LoadEnvFile()
	if err != nil {
		res.SetError(gerror.New(public.LangCtx(ctx, "Failed to read environment variable file: {}", err)))
		return res, nil
	}

	config := convertEnvToConfig(envMap)

	sslInfo, err := loadSSLInfo()
	if err == nil {
		config.SSL = *sslInfo
	}
	serverIP, err := public.GetServerIP()
	if err != nil {
		serverIP = "unknown"
	}
	config.ServerIP = serverIP

	whitelist, err := GetIPWhitelist()
	if err != nil {
		whitelist = []g.Map{}
	}
	config.IPWhitelist = whitelist

	res.Data = config
	res.SetSuccess(public.LangCtx(ctx, "Successfully retrieved system configuration"))
	return res, nil
}

func GetIPWhitelist() ([]g.Map, error) {

	result, err := g.DB().Model("bm_console_ip_whitelist").
		Fields("id, ip").
		All()

	if err != nil {
		return nil, gerror.Wrap(err, "Failed to get IP whitelist")
	}

	if result.IsEmpty() {
		return []g.Map{}, nil
	}

	var whitelist []g.Map
	for _, record := range result.List() {
		whitelist = append(whitelist, g.Map{
			"id": record["id"],
			"ip": record["ip"],
		})
	}

	return whitelist, nil
}
