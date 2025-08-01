package batch_mail

import (
	"billionmail-core/internal/model/entity"
	"context"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gview"
	"regexp"
	"strings"
)

// TemplateEngine
type TemplateEngine struct {
	view *gview.View
}

// NewTemplateEngine Create new template engine instance
func NewTemplateEngine() *TemplateEngine {
	view := gview.New()

	// register template functions
	view.BindFuncMap(g.Map{
		"get": func(m interface{}, key string) interface{} {
			// handle map
			if m, ok := m.(map[string]string); ok {
				return m[key]
			}
			// handle g.Map
			if m, ok := m.(g.Map); ok {
				return m[key]
			}
			return ""
		},
		"UnsubscribeURL": func(data ...interface{}) interface{} {
			if len(data) > 0 {
				if m, ok := data[0].(g.Map); ok {
					if url, ok := m["UnsubscribeURL"].(string); ok {
						return url
					}
				}
			}
			return ""
		},
	})

	return &TemplateEngine{view: view}
}

// RenderTemplate Render template
func (e *TemplateEngine) RenderTemplate(ctx context.Context, content string, data g.Map) (string, error) {
	return e.view.ParseContent(ctx, content, data)
}

func (e *TemplateEngine) RenderEmailTemplate(ctx context.Context, content string, contact *entity.Contact, task *entity.EmailTask, unsubscribeURL string) (string, error) {
	return e.RenderEmailTemplateWithAPI(ctx, content, contact, task, unsubscribeURL, nil)
}

// RenderEmailTemplateWithAPI Render email template with error recovery
func (e *TemplateEngine) RenderEmailTemplateWithAPI(ctx context.Context, content string, contact *entity.Contact, task *entity.EmailTask, unsubscribeURL string, apiAttribs map[string]interface{}) (string, error) {
	// handle escape characters
	content = strings.NewReplacer(
		"\\r\\n", "\n",
		"\\n", "\n",
		"\\r", "\n",
		"\\t", "\t",
	).Replace(content)

	// prepare subscriber data
	subscriberData := make(map[string]interface{})
	if contact != nil {
		// Custom properties are added directly to subscriberData
		if contact.Attribs != nil {
			for k, v := range contact.Attribs {
				subscriberData[k] = v
			}
		}
		subscriberData["Email"] = contact.Email
		subscriberData["Active"] = contact.Active
		subscriberData["Status"] = contact.Status
	}

	// prepare api data
	apiData := make(map[string]interface{})
	if contact != nil {
		// Custom properties are added directly to subscriberData
		if apiAttribs != nil {
			for k, v := range apiAttribs {
				apiData[k] = v
			}
		}
	}

	// prepare task data
	taskData := g.Map{
		"Id":             0,
		"TaskName":       "",
		"Addresser":      "",
		"Subject":        "",
		"FullName":       "",
		"RecipientCount": 0,
		"TaskProcess":    0,
		"Pause":          0,
		"TemplateId":     0,
		"IsRecord":       0,
		"Unsubscribe":    0,
		"Threads":        0,
		"Etypes":         "",
		"TrackOpen":      0,
		"TrackClick":     0,
		"StartTime":      0,
		"CreateTime":     0,
		"UpdateTime":     0,
		"Remark":         "",
		"Active":         0,
	}
	if task != nil {
		taskData["Id"] = task.Id
		taskData["TaskName"] = task.TaskName
		taskData["Addresser"] = task.Addresser
		taskData["Subject"] = task.Subject
		taskData["FullName"] = task.FullName
		taskData["RecipientCount"] = task.RecipientCount
		taskData["TaskProcess"] = task.TaskProcess
		taskData["Pause"] = task.Pause
		taskData["TemplateId"] = task.TemplateId
		taskData["IsRecord"] = task.IsRecord
		taskData["Unsubscribe"] = task.Unsubscribe
		taskData["Threads"] = task.Threads
		taskData["Etypes"] = task.Etypes
		taskData["TrackOpen"] = task.TrackOpen
		taskData["TrackClick"] = task.TrackClick
		taskData["StartTime"] = task.StartTime
		taskData["CreateTime"] = task.CreateTime
		taskData["UpdateTime"] = task.UpdateTime
		taskData["Remark"] = task.Remark
		taskData["Active"] = task.Active
	}

	// prepare template data
	templateData := g.Map{
		"Subscriber":     subscriberData,
		"Task":           taskData,
		"UnsubscribeURL": unsubscribeURL,
		"API":            apiAttribs,
	}

	// use template engine to render
	result, err := e.view.ParseContent(ctx, content, templateData)
	if err != nil {
		return "", err
	}

	// Analyzing Spintax Grammar
	spintaxParser := GetSpintaxParser()
	result = spintaxParser.ParseSpintax(result)

	return result, nil
}

// renderWithErrorRecovery
func (e *TemplateEngine) renderWithErrorRecovery(ctx context.Context, content string, templateData g.Map) (string, error) {
	// Start with normal rendering
	result, err := e.view.ParseContent(ctx, content, templateData)
	if err == nil {
		return result, nil
	}

	//// Rendering failed. Uninitialized variables were encountered during cleanup.
	//cleanedContent := e.cleanUndefinedVariables(content)
	//result, err = e.view.ParseContent(ctx, cleanedContent, templateData)
	//if err != nil {
	//
	//	return content, nil
	//}

	return result, nil
}

// cleanUndefinedVariables
func (e *TemplateEngine) cleanUndefinedVariables(content string) string {
	// Allowed retained function names
	knownFunctions := []string{"UnsubscribeURL"}
	knownVariablePatterns := []string{
		`\{\{\s*\.\s*Subscriber\s*\.\s*[^\s{}]+[^}]*\}\}`,
		`\{\{\s*\.\s*Task\s*\.\s*[^\s{}]+[^}]*\}\}`,
	}

	allVarRegex := regexp.MustCompile(`\{\{.*?\}\}`)

	content = allVarRegex.ReplaceAllStringFunc(content, func(match string) string {
		inner := strings.TrimSpace(match[2 : len(match)-2])

		for _, pattern := range knownVariablePatterns {
			if regexp.MustCompile(pattern).MatchString(match) {
				return match
			}
		}

		for _, fn := range knownFunctions {
			fnRegex := regexp.MustCompile(`\s*` + regexp.QuoteMeta(fn) + `\s+[^}]*`)
			if fnRegex.MatchString(inner) {
				return match
			}
		}

		// If no match is found with any of the known items, replace with [__ __] format
		return "[__" + inner + "__]"
	})

	lines := strings.Split(content, "\n")
	var cleanedLines []string
	for _, line := range lines {
		if strings.TrimSpace(line) != "" {
			cleanedLines = append(cleanedLines, line)
		}
	}

	return strings.Join(cleanedLines, "\n")
}

// global template engine instance
var defaultEngine = NewTemplateEngine()

// GetTemplateEngine Get default template engine instance
func GetTemplateEngine() *TemplateEngine {
	return defaultEngine
}
