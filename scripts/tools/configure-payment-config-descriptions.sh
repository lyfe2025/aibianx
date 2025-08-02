#!/bin/bash

# 支付配置字段描述配置脚本
# 为payment-config内容类型添加中文字段描述

# 获取脚本目录并加载动态配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/load-config.sh"

echo "🔧 配置支付配置字段描述..."

# 1. 检查数据库连接
DB_NAME="aibianx_dev"
DB_USER="aibianx_dev"

echo "📊 检查数据库连接..."
if ! psql -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ 数据库连接失败，请检查数据库服务"
    exit 1
fi

# 2. 生成字段描述配置JSON
cat > /tmp/payment_config_descriptions.sql << 'EOF'
-- 支付配置字段描述配置
INSERT INTO strapi_core_store_settings (key, value, type, environment, tag) 
VALUES (
    'plugin_content_manager_configuration_content_types::api::payment-config.payment-config',
    '{
        "uid": "api::payment-config.payment-config",
        "settings": {
            "bulkable": true,
            "filterable": true,
            "searchable": true,
            "pageSize": 10,
            "mainField": "id",
            "defaultSortBy": "id",
            "defaultSortOrder": "ASC"
        },
        "metadatas": {
            "id": {
                "edit": {},
                "list": {"label": "ID", "searchable": false, "sortable": true}
            },
            "general": {
                "edit": {"label": "通用配置", "description": "支付系统通用配置项", "placeholder": "", "visible": true, "editable": true},
                "list": {"label": "通用配置", "searchable": false, "sortable": false}
            },
            "alipay": {
                "edit": {"label": "支付宝配置", "description": "支付宝支付相关配置", "placeholder": "", "visible": true, "editable": true},
                "list": {"label": "支付宝配置", "searchable": false, "sortable": false}
            },
            "wechatPay": {
                "edit": {"label": "微信支付配置", "description": "微信支付相关配置", "placeholder": "", "visible": true, "editable": true},
                "list": {"label": "微信支付配置", "searchable": false, "sortable": false}
            },
            "stripe": {
                "edit": {"label": "Stripe配置", "description": "Stripe支付相关配置", "placeholder": "", "visible": true, "editable": true},
                "list": {"label": "Stripe配置", "searchable": false, "sortable": false}
            },
            "environment": {
                "edit": {"label": "运行环境", "description": "支付环境：沙箱/生产环境", "placeholder": "选择运行环境", "visible": true, "editable": true},
                "list": {"label": "运行环境", "searchable": true, "sortable": true}
            },
            "webhookSecret": {
                "edit": {"label": "Webhook密钥", "description": "用于验证回调安全性的通用密钥", "placeholder": "输入Webhook密钥", "visible": true, "editable": true},
                "list": {"label": "Webhook密钥", "searchable": false, "sortable": false}
            },
            "callbackBaseUrl": {
                "edit": {"label": "回调基础URL", "description": "支付回调的基础URL地址", "placeholder": "https://yourdomain.com", "visible": true, "editable": true},
                "list": {"label": "回调基础URL", "searchable": true, "sortable": true}
            },
            "frontendBaseUrl": {
                "edit": {"label": "前端基础URL", "description": "前端应用的基础URL地址", "placeholder": "https://yourdomain.com", "visible": true, "editable": true},
                "list": {"label": "前端基础URL", "searchable": true, "sortable": true}
            },
            "lastModifiedBy": {
                "edit": {"label": "最后修改人", "description": "最后修改配置的管理员", "placeholder": "", "visible": true, "editable": false},
                "list": {"label": "最后修改人", "searchable": false, "sortable": true}
            },
            "configNotes": {
                "edit": {"label": "配置说明", "description": "配置说明和注意事项", "placeholder": "输入配置说明...", "visible": true, "editable": true},
                "list": {"label": "配置说明", "searchable": true, "sortable": false}
            },
            "createdAt": {
                "edit": {"label": "创建时间", "description": "", "placeholder": "", "visible": false, "editable": false},
                "list": {"label": "创建时间", "searchable": false, "sortable": true}
            },
            "updatedAt": {
                "edit": {"label": "更新时间", "description": "", "placeholder": "", "visible": false, "editable": false},
                "list": {"label": "更新时间", "searchable": false, "sortable": true}
            }
        },
        "layouts": {
            "edit": [
                [{"name": "environment", "size": 6}, {"name": "lastModifiedBy", "size": 6}],
                [{"name": "callbackBaseUrl", "size": 6}, {"name": "frontendBaseUrl", "size": 6}],
                [{"name": "webhookSecret", "size": 12}],
                [{"name": "general", "size": 12}],
                [{"name": "alipay", "size": 12}],
                [{"name": "wechatPay", "size": 12}],
                [{"name": "stripe", "size": 12}],
                [{"name": "configNotes", "size": 12}]
            ],
            "editRelations": [],
            "list": ["id", "environment", "callbackBaseUrl", "lastModifiedBy", "updatedAt"]
        }
    }',
    'object',
    null,
    null
) ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value,
    type = EXCLUDED.type;
EOF

# 3. 执行SQL
echo "📝 应用支付配置字段描述..."
psql -U "$DB_USER" -d "$DB_NAME" -f /tmp/payment_config_descriptions.sql

if [ $? -eq 0 ]; then
    echo "✅ 支付配置字段描述已成功配置"
else
    echo "❌ 配置字段描述失败"
    exit 1
fi

# 4. 添加数据库注释
echo "💬 添加数据库表注释..."
psql -U "$DB_USER" -d "$DB_NAME" << 'EOF'
-- 为支付配置表添加注释
COMMENT ON TABLE payment_config IS '支付配置表 - 管理支付宝、微信支付、Stripe等支付方式的配置信息';

-- 为字段添加注释
COMMENT ON COLUMN payment_config.id IS '主键ID';
COMMENT ON COLUMN payment_config.environment IS '运行环境：sandbox-沙箱环境，production-生产环境';
COMMENT ON COLUMN payment_config.webhook_secret IS 'Webhook通用密钥，用于验证回调安全性';
COMMENT ON COLUMN payment_config.callback_base_url IS '回调基础URL，用于生成支付回调地址';
COMMENT ON COLUMN payment_config.frontend_base_url IS '前端基础URL，用于支付跳转和返回';
COMMENT ON COLUMN payment_config.config_notes IS '配置说明和注意事项';
COMMENT ON COLUMN payment_config.created_at IS '记录创建时间';
COMMENT ON COLUMN payment_config.updated_at IS '记录最后更新时间';
COMMENT ON COLUMN payment_config.created_by_id IS '创建人ID';
COMMENT ON COLUMN payment_config.updated_by_id IS '最后更新人ID';

-- 为组件表添加注释（如果存在）
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'components_payment_general_configs') THEN
        COMMENT ON TABLE components_payment_general_configs IS '支付通用配置组件 - 存储支付系统的通用配置项';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'components_payment_alipay_configs') THEN
        COMMENT ON TABLE components_payment_alipay_configs IS '支付宝配置组件 - 存储支付宝支付相关的配置信息';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'components_payment_wechat_configs') THEN
        COMMENT ON TABLE components_payment_wechat_configs IS '微信支付配置组件 - 存储微信支付相关的配置信息';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'components_payment_stripe_configs') THEN
        COMMENT ON TABLE components_payment_stripe_configs IS 'Stripe配置组件 - 存储Stripe支付相关的配置信息';
    END IF;
END $$;
EOF

if [ $? -eq 0 ]; then
    echo "✅ 数据库表注释已添加"
else
    echo "⚠️  数据库表注释添加失败（可能表尚未创建）"
fi

# 5. 清理临时文件
rm -f /tmp/payment_config_descriptions.sql

echo ""
echo "🎉 支付配置字段描述配置完成！"
echo ""
echo "📋 配置完成内容："
echo "   ✅ 支付配置字段中文描述"
echo "   ✅ 数据库表和字段注释"
echo "   ✅ 后台管理界面布局"
echo ""
echo "📝 下一步："
echo "   1. 启动后端服务"
echo "   2. 登录后台管理: ${BACKEND_ADMIN_URL}"
echo "   3. 进入内容管理 → 支付配置"
echo "   4. 按照配置指南填入支付信息"
echo ""