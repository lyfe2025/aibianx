#!/bin/bash

# 🚨 紧急修复字段描述显示问题
# 直接更新数据库中的字段描述配置

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚨 紧急修复字段描述显示问题${NC}"
echo "=================================="

# 修复SMTP配置字段描述
echo -e "${YELLOW}📧 修复SMTP配置管理字段描述...${NC}"

psql -U aibianx_dev -d aibianx_dev << 'EOF'

-- 1. 确保配置记录存在
INSERT INTO strapi_core_store_settings (key, value, type, environment, tag) 
VALUES (
    'plugin_content_manager_configuration_content_types::api::smtp-config.smtp-config',
    '{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{},"layouts":{"list":["id","name","provider","host","port"],"edit":[[{"name":"name","size":6},{"name":"provider","size":6}],[{"name":"host","size":6},{"name":"port","size":6}]],"editRelations":[]}}',
    'object',
    null,
    null
) ON CONFLICT (key) DO NOTHING;

-- 2. 更新SMTP配置字段描述
UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas}', 
    '{
        "name": {"edit": {"label": "配置名称", "description": "用于标识不同的SMTP配置，如阿里云邮件、腾讯企业邮箱等", "placeholder": "输入SMTP配置名称", "visible": true, "editable": true}, "list": {"label": "配置名称", "searchable": true, "sortable": true}},
        "provider": {"edit": {"label": "邮件服务商", "description": "选择具体的邮件服务商，便于快速识别和管理", "placeholder": "选择邮件服务商", "visible": true, "editable": true}, "list": {"label": "服务商", "searchable": true, "sortable": true}},
        "host": {"edit": {"label": "SMTP服务器", "description": "SMTP服务器地址，如smtp.gmail.com、smtp.qq.com等", "placeholder": "smtp.example.com", "visible": true, "editable": true}, "list": {"label": "服务器地址", "searchable": true, "sortable": true}},
        "port": {"edit": {"label": "端口号", "description": "SMTP端口号，常用端口587(STARTTLS)、465(SSL)、25(普通)", "placeholder": "587", "visible": true, "editable": true}, "list": {"label": "端口", "searchable": false, "sortable": true}},
        "secure": {"edit": {"label": "SSL安全连接", "description": "是否使用SSL/TLS加密连接", "visible": true, "editable": true}, "list": {"label": "SSL", "searchable": false, "sortable": true}},
        "username": {"edit": {"label": "用户名", "description": "SMTP用户名，通常是完整的邮箱地址", "placeholder": "user@example.com", "visible": true, "editable": true}, "list": {"label": "用户名", "searchable": true, "sortable": false}},
        "password": {"edit": {"label": "密码", "description": "邮箱密码或授权码，建议使用授权码", "placeholder": "输入密码或授权码", "visible": true, "editable": true}, "list": {"label": "密码", "searchable": false, "sortable": false}},
        "fromEmail": {"edit": {"label": "发件人邮箱", "description": "所有邮件的发送者地址", "placeholder": "noreply@example.com", "visible": true, "editable": true}, "list": {"label": "发件人", "searchable": true, "sortable": true}},
        "fromName": {"edit": {"label": "发件人名称", "description": "显示在邮件中的发送者名称", "placeholder": "AI变现之路", "visible": true, "editable": true}, "list": {"label": "发件人名称", "searchable": false, "sortable": false}},
        "replyTo": {"edit": {"label": "回复邮箱", "description": "用户回复邮件时的目标地址", "placeholder": "support@example.com", "visible": true, "editable": true}, "list": {"label": "回复地址", "searchable": false, "sortable": false}},
        "isDefault": {"edit": {"label": "默认配置", "description": "是否作为系统默认SMTP配置", "visible": true, "editable": true}, "list": {"label": "默认", "searchable": false, "sortable": true}},
        "isActive": {"edit": {"label": "启用状态", "description": "是否启用此SMTP配置", "visible": true, "editable": true}, "list": {"label": "状态", "searchable": false, "sortable": true}},
        "dailyLimit": {"edit": {"label": "每日限制", "description": "每天最大发送邮件数量，0表示无限制", "placeholder": "1000", "visible": true, "editable": true}, "list": {"label": "日限额", "searchable": false, "sortable": true}},
        "dailySent": {"edit": {"label": "今日已发送", "description": "当天已发送的邮件数量", "visible": true, "editable": false}, "list": {"label": "已发送", "searchable": false, "sortable": true}},
        "healthStatus": {"edit": {"label": "健康状态", "description": "配置的健康状态检查结果", "visible": true, "editable": false}, "list": {"label": "健康状态", "searchable": false, "sortable": true}},
        "lastHealthCheck": {"edit": {"label": "最后检查时间", "description": "最近一次健康检查的时间", "visible": true, "editable": false}, "list": {"label": "检查时间", "searchable": false, "sortable": true}},
        "lastUsed": {"edit": {"label": "最后使用时间", "description": "最近一次使用此配置发送邮件的时间", "visible": true, "editable": false}, "list": {"label": "使用时间", "searchable": false, "sortable": true}},
        "errorCount": {"edit": {"label": "错误次数", "description": "发送失败的累计次数", "visible": true, "editable": false}, "list": {"label": "错误数", "searchable": false, "sortable": true}},
        "successCount": {"edit": {"label": "成功次数", "description": "发送成功的累计次数", "visible": true, "editable": false}, "list": {"label": "成功数", "searchable": false, "sortable": true}},
        "lastError": {"edit": {"label": "最后错误", "description": "最近一次发送失败的错误信息", "visible": true, "editable": false}, "list": {"label": "错误信息", "searchable": false, "sortable": false}},
        "notes": {"edit": {"label": "备注说明", "description": "配置的额外说明信息", "placeholder": "配置说明和注意事项", "visible": true, "editable": true}, "list": {"label": "备注", "searchable": false, "sortable": false}},
        "priority": {"edit": {"label": "优先级", "description": "数值越小优先级越高", "placeholder": "100", "visible": true, "editable": true}, "list": {"label": "优先级", "searchable": false, "sortable": true}}
    }'::jsonb
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::smtp-config.smtp-config';

EOF

echo -e "${GREEN}✅ SMTP配置字段描述已更新${NC}"

# 修复邮件订阅字段描述
echo -e "${YELLOW}📮 修复邮件订阅字段描述...${NC}"

psql -U aibianx_dev -d aibianx_dev << 'EOF'

-- 1. 确保邮件订阅配置记录存在
INSERT INTO strapi_core_store_settings (key, value, type, environment, tag) 
VALUES (
    'plugin_content_manager_configuration_content_types::api::email-subscription.email-subscription',
    '{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"email","defaultSortBy":"subscribedAt","defaultSortOrder":"DESC"},"metadatas":{},"layouts":{"list":["id","email","status","source","subscribedAt"],"edit":[[{"name":"email","size":6},{"name":"status","size":6}],[{"name":"source","size":6},{"name":"user","size":6}]],"editRelations":["user"]}}',
    'object',
    null,
    null
) ON CONFLICT (key) DO NOTHING;

-- 2. 更新邮件订阅字段描述
UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas}', 
    '{
        "email": {"edit": {"label": "订阅邮箱", "description": "用户订阅邮件列表使用的邮箱地址", "placeholder": "user@example.com", "visible": true, "editable": true}, "list": {"label": "邮箱地址", "searchable": true, "sortable": true}},
        "user": {"edit": {"label": "关联用户", "description": "关联的已注册用户（可选，游客也可订阅）", "visible": true, "editable": true}, "list": {"label": "用户", "searchable": true, "sortable": false}},
        "source": {"edit": {"label": "订阅来源", "description": "用户从哪个页面或入口订阅的邮件列表", "visible": true, "editable": true}, "list": {"label": "来源", "searchable": true, "sortable": true}},
        "tags": {"edit": {"label": "订阅标签", "description": "用户订阅的邮件类型标签列表", "placeholder": "输入JSON格式的标签", "visible": true, "editable": true}, "list": {"label": "标签", "searchable": false, "sortable": false}},
        "emailSubscriberId": {"edit": {"label": "订阅者ID", "description": "本地邮件系统中的唯一订阅者标识符", "placeholder": "自动生成", "visible": true, "editable": true}, "list": {"label": "订阅ID", "searchable": true, "sortable": false}},
        "emailListIds": {"edit": {"label": "邮件列表ID", "description": "用户已订阅的邮件列表ID集合", "placeholder": "输入JSON格式的列表ID", "visible": true, "editable": true}, "list": {"label": "列表ID", "searchable": false, "sortable": false}},
        "status": {"edit": {"label": "订阅状态", "description": "当前订阅状态：激活、取消订阅或退信", "visible": true, "editable": true}, "list": {"label": "状态", "searchable": true, "sortable": true}},
        "preferences": {"edit": {"label": "邮件偏好", "description": "用户的邮件接收偏好设置（频率、类型等）", "placeholder": "输入JSON格式的偏好设置", "visible": true, "editable": true}, "list": {"label": "偏好", "searchable": false, "sortable": false}},
        "subscribedAt": {"edit": {"label": "订阅时间", "description": "用户首次订阅邮件列表的时间", "visible": true, "editable": true}, "list": {"label": "订阅时间", "searchable": false, "sortable": true}},
        "lastEmailSent": {"edit": {"label": "最后发送时间", "description": "最近一次向该用户发送邮件的时间", "visible": true, "editable": true}, "list": {"label": "最后发送", "searchable": false, "sortable": true}}
    }'::jsonb
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::email-subscription.email-subscription';

EOF

echo -e "${GREEN}✅ 邮件订阅字段描述已更新${NC}"

# 强制刷新Strapi缓存
echo -e "${YELLOW}🔄 强制刷新Strapi缓存...${NC}"

# 清除Strapi缓存文件
rm -rf backend/.cache backend/.tmp backend/build 2>/dev/null || true
rm -rf frontend/.next 2>/dev/null || true

echo -e "${GREEN}✅ 缓存已清除${NC}"

echo ""
echo -e "${BLUE}📋 修复完成！请按以下步骤验证：${NC}"
echo "1. 刷新浏览器页面（强制刷新 Cmd+Shift+R）"
echo "2. 重新进入 Content Manager -> SMTP配置管理"
echo "3. 重新进入 Content Manager -> 邮件订阅"
echo "4. 检查字段是否显示中文标签和描述"
echo ""
echo -e "${YELLOW}💡 如果仍未生效，请重启服务：${NC}"
echo "   ./scripts.sh deploy stop && ./scripts.sh deploy start"
