package files

import (
	"billionmail-core/internal/service/public"
	"context"
	"github.com/gogf/gf/v2/errors/gerror"

	"github.com/gogf/gf/os/gfile"

	"billionmail-core/api/files/v1"
)

func (c *ControllerV1) ReadFile(ctx context.Context, req *v1.ReadFileReq) (res *v1.ReadFileRes, err error) {
	res = &v1.ReadFileRes{}

	exists1 := public.FileExists(req.FilePath)
	if !exists1 {
		res.Data = ""
		res.SetSuccess(public.LangCtx(ctx, "Success"))
		return
	}

	content := gfile.GetContents(req.FilePath)
	if err != nil {
		res.SetError(gerror.New(public.LangCtx(ctx, "Failed to read file: {}", err.Error())))
		return res, nil
	}

	res.Data = content
	res.SetSuccess(public.LangCtx(ctx, "Success"))
	return res, nil
}
