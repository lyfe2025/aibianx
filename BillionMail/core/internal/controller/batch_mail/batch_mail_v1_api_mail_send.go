package batch_mail

import (
	"billionmail-core/api/batch_mail/v1"
	"billionmail-core/internal/model/entity"
	"billionmail-core/internal/service/batch_mail"
	"billionmail-core/internal/service/domains"
	"billionmail-core/internal/service/mail_service"
	"billionmail-core/internal/service/maillog_stat"
	"billionmail-core/internal/service/public"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/frame/g"
	"strings"
	"time"
)

func (c *ControllerV1) ApiMailSend(ctx context.Context, req *v1.ApiMailSendReq) (res *v1.ApiMailSendRes, err error) {
	res = &v1.ApiMailSendRes{}
	clientIP := g.RequestFromCtx(ctx).GetClientIp()
	// 1. check API Key
	apiTemplate, err := getApiTemplateByKey(ctx, req.ApiKey, clientIP)
	if err != nil {
		res.Code = 1001
		res.SetError(gerror.New(public.LangCtx(ctx, err.Error())))
		return res, nil
	}

	// check client IP
	err = CheckClientIP(ctx, apiTemplate.Id, clientIP)
	if err != nil {
		res.Code = 1002
		res.SetError(gerror.New(public.LangCtx(ctx, err.Error())))
		return res, nil
	}

	//var expireAt int64
	//if apiTemplate.ExpireTime > 0 {
	//	expireAt = int64(apiTemplate.LastKeyUpdateTime) + int64(apiTemplate.ExpireTime)
	//	if time.Now().Unix() > expireAt {
	//		// expired
	//		res.Code = 1002
	//		res.SetError(gerror.New(public.LangCtx(ctx, "API key has expired")))
	//		return res, nil
	//	}
	//}

	// 2. check email template
	_, err = getEmailTemplateById(ctx, apiTemplate.TemplateId)
	if err != nil {
		res.Code = 1004
		res.SetError(gerror.New(public.LangCtx(ctx, "Email template does not exist")))
		return res, nil
	}

	// 3. check recipient
	if req.Recipient == "" || !strings.Contains(req.Recipient, "@") {
		res.Code = 1003
		res.SetError(gerror.New(public.LangCtx(ctx, "Invalid recipient")))
		return res, nil
	}

	// 4. process contact and group
	_, err = ensureContactAndGroup(ctx, req.Recipient, apiTemplate.Id)
	if err != nil {
		res.Code = 1003
		res.SetError(gerror.New(public.LangCtx(ctx, "Failed to process recipient: {}", err.Error())))
		return res, nil
	}

	// 5. process addresser
	if req.Addresser == "" {
		req.Addresser = apiTemplate.Addresser
	}

	// 6. Join the sender queue
	err = recordApiMailLog(ctx, apiTemplate, req.Recipient, req.Addresser, req.Attribs)
	if err != nil {
		res.Code = 1005
		res.SetError(gerror.New(public.LangCtx(ctx, "Failed to record email log: {}", err.Error())))
		return res, nil
	}

	res.SetSuccess(public.LangCtx(ctx, "Email sent successfully"))
	return res, nil
}

// 记录到日志表，状态为待发送
func recordApiMailLog(ctx context.Context, apiTemplate *entity.ApiTemplates, recipient, addresser string, attribs map[string]string) error {
	// 生成消息ID

	sender, err := mail_service.NewEmailSenderWithLocal(addresser)
	if err != nil {
		return gerror.New(public.LangCtx(ctx, "Failed to create email sender: {}", err))
	}
	defer sender.Close()

	messageId := sender.GenerateMessageID()
	messageId = strings.Trim(messageId, "<>")

	// 直接记录到日志表，状态为待发送
	now := int(time.Now().Unix())
	_, err = g.DB().Model("api_mail_logs").Insert(g.Map{
		"api_id":        apiTemplate.Id,
		"recipient":     recipient,
		"message_id":    messageId, // 发送时需要加<>
		"addresser":     addresser,
		"status":        0, // 待发送
		"error_message": "",
		"send_time":     0,
		"create_time":   now,
		"attribs":       attribs,
	})

	return err

}

// get API template
func getApiTemplateByKey(ctx context.Context, apiKey string, clientIP string) (*entity.ApiTemplates, error) {
	var apiTemplate entity.ApiTemplates
	err := g.DB().Model("api_templates").Where("api_key", apiKey).Where("active", 1).Scan(&apiTemplate)
	if err != nil || apiTemplate.Id == 0 {
		return nil, gerror.New(public.LangCtx(ctx, "API key is invalid"))
	}

	return &apiTemplate, nil
}

// check API template by key and client IP
func CheckClientIP(ctx context.Context, Id int, clientIP string) error {

	ipcount, err := g.DB().Model("api_ip_whitelist").
		Where("api_id", Id).Count()
	if err == nil && ipcount > 0 {

		count, err := g.DB().Model("api_ip_whitelist").
			Where("api_id", Id).
			Where("ip", clientIP).
			Count()
		if err != nil {
			return err
		}
		if count == 0 {
			return gerror.New(public.LangCtx(ctx, "IP not allowed"))
		}
	}

	return nil
}

// get email template
func getEmailTemplateById(ctx context.Context, templateId int) (*entity.EmailTemplate, error) {
	var emailTemplate entity.EmailTemplate
	err := g.DB().Model("email_templates").Where("id", templateId).Scan(&emailTemplate)
	if err != nil || emailTemplate.Id == 0 {
		return nil, gerror.New(public.LangCtx(ctx, "Email template does not exist"))
	}
	return &emailTemplate, nil
}

// ensure contact and group exists
func ensureContactAndGroup(ctx context.Context, email string, apiId int) (entity.Contact, error) {
	var contact entity.Contact
	now := int(time.Now().Unix())

	apiGroupName := fmt.Sprintf("api_group_%d", apiId)
	var group entity.ContactGroup
	err := g.DB().Model("bm_contact_groups").Where("name", apiGroupName).Scan(&group)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			group = entity.ContactGroup{}
		} else {
			return contact, fmt.Errorf("failed to query group: %w", err)
		}
	}
	if group.Id == 0 {
		groupResult, err := g.DB().Model("bm_contact_groups").Insert(g.Map{
			"name":        apiGroupName,
			"description": fmt.Sprintf(public.LangCtx(ctx, "API %d automatically created contact group"), apiId),
			"create_time": now,
			"update_time": now,
		})
		if err != nil {
			return contact, err
		}
		groupId, _ := groupResult.LastInsertId()
		group.Id = int(groupId)
	} else {

		count, err := g.DB().Model("bm_contacts").
			Where("email", email).
			Where("group_id", group.Id).
			Where("active", 0).
			Count()
		if err != nil {
			return contact, fmt.Errorf("failed to check unsubscribe: %w", err)
		}
		if count > 0 {
			return contact, fmt.Errorf("the recipient has unsubscribed from the current group and cannot send")
		}
	}

	contactData := g.Map{
		"email":       email,
		"group_id":    group.Id,
		"active":      1,
		"status":      1,
		"create_time": now,
	}
	contactResult, err := g.DB().Model("bm_contacts").
		Data(contactData).
		OnConflict("email,group_id").
		Save()
	if err != nil {
		return contact, err
	}

	contactId, _ := contactResult.LastInsertId()
	contact.Id = int(contactId)
	contact.Email = email
	contact.GroupId = group.Id
	contact.Active = 1
	contact.Status = 1
	contact.CreateTime = now

	return contact, nil
}

// process mail content and subject
func processMailContentAndSubject(ctx context.Context, content, subject string, apiTemplate *entity.ApiTemplates, contact entity.Contact, req *v1.ApiMailSendReq) (string, string) {
	// unsubscribe link processing
	if apiTemplate.Unsubscribe == 1 {
		if !strings.Contains(content, "__UNSUBSCRIBE_URL__") && !strings.Contains(content, "{{ UnsubscribeURL . }}") {
			content = public.AddUnsubscribeButton(content)
		}
		//domain := domains.GetBaseURLBySender(req.Addresser)
		domain := domains.GetBaseURL()
		unsubscribeURL := fmt.Sprintf("%s/api/unsubscribe", domain)
		groupURL := fmt.Sprintf("%s/api/unsubscribe/user_group", domain)
		jwtToken, _ := batch_mail.GenerateUnsubscribeJWT(req.Recipient, apiTemplate.TemplateId, apiTemplate.Id)
		unsubscribeJumpURL := fmt.Sprintf("%s/unsubscribe.html?jwt=%s&email=%s&url_type=%s&url_unsubscribe=%s", domain, jwtToken, req.Recipient, groupURL, unsubscribeURL)

		if contact.Id > 0 {
			engine := batch_mail.GetTemplateEngine()
			renderedContent, err := engine.RenderEmailTemplate(ctx, content, &contact, nil, unsubscribeJumpURL)
			if err == nil {
				content = renderedContent
			}
			renderedSubject, err := engine.RenderEmailTemplate(ctx, subject, &contact, nil, unsubscribeJumpURL)
			if err == nil {
				subject = renderedSubject
			}
		} else {
			content = strings.ReplaceAll(content, "{{ UnsubscribeURL . }}", unsubscribeJumpURL)
		}
	} else if contact.Id > 0 {
		engine := batch_mail.GetTemplateEngine()
		renderedContent, err := engine.RenderEmailTemplate(ctx, content, &contact, nil, "")
		if err == nil {
			content = renderedContent
		}
		renderedSubject, err := engine.RenderEmailTemplate(ctx, subject, &contact, nil, "")
		if err == nil {
			subject = renderedSubject
		}
	}
	return content, subject
}

// send email
func sendApiMail(ctx context.Context, apiTemplate *entity.ApiTemplates, subject, content, recipient, addresser string) error {

	// create email sender
	sender, err := mail_service.NewEmailSenderWithLocal(addresser)
	if err != nil {
		return gerror.New(public.LangCtx(ctx, "Failed to create email sender: {}", err))
	}
	defer sender.Close()

	// generate message ID
	messageId := sender.GenerateMessageID()
	// add 1 billion to prevent conflict with marketing task id
	//baseURL := domains.GetBaseURLBySender(addresser)
	baseURL := domains.GetBaseURL()
	apiTemplate_id := apiTemplate.Id + 1000000000
	mailTracker := maillog_stat.NewMailTracker(content, apiTemplate_id, messageId, recipient, baseURL)
	mailTracker.TrackLinks()
	mailTracker.AppendTrackingPixel()
	content = mailTracker.GetHTML()

	// create email message
	message := mail_service.NewMessage(subject, content)
	message.SetMessageID(messageId)
	// set sender display name
	if apiTemplate.FullName != "" {
		message.SetRealName(apiTemplate.FullName)
	}
	// send email
	err = sender.Send(message, []string{recipient})
	if err != nil {
		return err
	}
	// record email log
	messageId = strings.Trim(messageId, "<>")
	_, err = g.DB().Model("api_mail_logs").Insert(g.Map{
		"api_id":     apiTemplate.Id,
		"recipient":  recipient,
		"message_id": messageId,
		"addresser":  addresser,
	})
	if err != nil {
		return err
	}
	return nil
}
