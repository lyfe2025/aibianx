#!/bin/bash

# 修复支付相关表的数据库注释脚本
# 基于Strapi组件定义添加完整的表注释和字段注释

set -e

# 加载统一配置
source "$(dirname "$0")/./load-config.sh"
load_config

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 支付相关表数据库注释修复工具${NC}"
echo "============================================="

# 检查数据库连接
check_database() {
    echo -e "${YELLOW}📊 检查数据库连接...${NC}"
    if ! psql -U aibianx_dev -d aibianx_dev -c "SELECT 1;" >/dev/null 2>&1; then
        echo -e "${RED}❌ 数据库连接失败！${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ 数据库连接正常${NC}"
}

# 修复payment_config表注释
fix_payment_config_comments() {
    echo -e "${YELLOW}🔧 修复payment_config表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 添加payment_config表注释
COMMENT ON TABLE payment_config IS '支付配置表 - 统一管理所有支付方式的配置信息，包含通用配置和各种支付渠道的具体配置';

-- 添加payment_config字段注释
COMMENT ON COLUMN payment_config.id IS '主键ID - 唯一标识符';
COMMENT ON COLUMN payment_config.document_id IS '文档ID - Strapi 5.x文档系统标识符';
COMMENT ON COLUMN payment_config.locale IS '语言地区 - 国际化支持，存储配置适用的语言地区';
COMMENT ON COLUMN payment_config.created_at IS '创建时间 - 记录配置首次创建的时间戳';
COMMENT ON COLUMN payment_config.updated_at IS '更新时间 - 记录配置最后修改的时间戳';
COMMENT ON COLUMN payment_config.published_at IS '发布时间 - 配置生效的时间戳，空值表示未发布';
COMMENT ON COLUMN payment_config.created_by_id IS '创建人ID - 关联admin_users表，记录配置创建者';
COMMENT ON COLUMN payment_config.updated_by_id IS '更新人ID - 关联admin_users表，记录配置最后修改者';
COMMENT ON COLUMN payment_config.environment IS '运行环境 - 沙箱环境(sandbox)或生产环境(production)';
COMMENT ON COLUMN payment_config.webhook_secret IS 'Webhook密钥 - 用于验证支付回调请求的安全性，确保回调来源可信';
COMMENT ON COLUMN payment_config.callback_base_url IS '回调基础URL - 支付平台回调时使用的基础地址，用于生成完整的webhook地址';
COMMENT ON COLUMN payment_config.frontend_base_url IS '前端基础URL - 用户支付完成后跳转的前端地址，影响支付成功页面显示';
COMMENT ON COLUMN payment_config.config_notes IS '配置说明 - 记录重要的配置说明、变更历史和注意事项';
EOF

    echo -e "${GREEN}   ✅ payment_config表注释添加完成${NC}"
}

# 修复支付通用配置组件表注释
fix_general_config_comments() {
    echo -e "${YELLOW}🔧 修复通用支付配置组件表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 添加components_payment_general_configs表注释
COMMENT ON TABLE components_payment_general_configs IS '支付通用配置组件表 - 存储支付系统的通用配置项，包含超时时间、金额限制等全局设置';

-- 添加字段注释
COMMENT ON COLUMN components_payment_general_configs.id IS '主键ID - 组件实例的唯一标识符';
COMMENT ON COLUMN components_payment_general_configs.site_name IS '网站名称 - 显示在支付页面的网站标识，最长100字符，默认"AI变现之路"';
COMMENT ON COLUMN components_payment_general_configs.payment_timeout IS '支付超时时间 - 单位分钟，范围5-60分钟，默认30分钟，超时后订单自动取消';
COMMENT ON COLUMN components_payment_general_configs.enable_payment_logs IS '支付日志开关 - 是否启用详细的支付日志记录，默认启用，用于问题排查';
COMMENT ON COLUMN components_payment_general_configs.enable_auto_refund IS '自动退款开关 - 是否对超时订单自动发起退款，默认关闭，需谨慎启用';
COMMENT ON COLUMN components_payment_general_configs.min_payment_amount IS '最小支付金额 - 单位分，默认1分，防止恶意小额支付攻击';
COMMENT ON COLUMN components_payment_general_configs.max_payment_amount IS '最大支付金额 - 单位分，默认100000分(1000元)，超出需特殊审核';
EOF

    echo -e "${GREEN}   ✅ 通用配置组件表注释添加完成${NC}"
}

# 修复支付宝配置组件表注释
fix_alipay_config_comments() {
    echo -e "${YELLOW}🔧 修复支付宝配置组件表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 添加components_payment_alipay_configs表注释
COMMENT ON TABLE components_payment_alipay_configs IS '支付宝配置组件表 - 存储支付宝支付接入所需的全部配置信息，包含AppID、密钥、网关等';

-- 添加字段注释
COMMENT ON COLUMN components_payment_alipay_configs.id IS '主键ID - 支付宝配置组件的唯一标识符';
COMMENT ON COLUMN components_payment_alipay_configs.enabled IS '支付宝开关 - 是否启用支付宝支付渠道，默认关闭';
COMMENT ON COLUMN components_payment_alipay_configs.app_id IS '支付宝应用ID - 最长50字符，从支付宝开放平台获取的应用标识';
COMMENT ON COLUMN components_payment_alipay_configs.private_key IS '应用私钥 - RSA2048格式，用于签名验证，敏感信息需加密存储';
COMMENT ON COLUMN components_payment_alipay_configs.alipay_public_key IS '支付宝公钥 - 用于验证支付宝返回数据的签名，确保数据完整性';
COMMENT ON COLUMN components_payment_alipay_configs.gateway IS '支付宝网关 - API请求地址，生产环境openapi.alipay.com，沙箱环境openapi.alipaydev.com';
COMMENT ON COLUMN components_payment_alipay_configs.supported_methods IS '支持的支付方式 - JSON格式存储，包含web、wap、app、qrcode等支付场景配置';
COMMENT ON COLUMN components_payment_alipay_configs.notify_url IS '异步通知地址 - 最长500字符，支付宝主动通知的回调URL，格式{callbackBaseUrl}/api/payment/alipay/callback';
COMMENT ON COLUMN components_payment_alipay_configs.sign_type IS '签名类型 - RSA2或RSA，推荐使用RSA2提高安全性';
COMMENT ON COLUMN components_payment_alipay_configs.charset IS '字符编码 - utf-8或gbk，推荐使用utf-8';
COMMENT ON COLUMN components_payment_alipay_configs.config_status IS '配置状态 - draft(草稿)/configured(已配置)/testing(测试中)/active(生效)';
COMMENT ON COLUMN components_payment_alipay_configs.last_tested_at IS '最后测试时间 - 记录配置最后一次测试的时间戳';
COMMENT ON COLUMN components_payment_alipay_configs.test_result IS '测试结果 - JSON格式存储测试详情，包含成功状态和错误信息';
EOF

    echo -e "${GREEN}   ✅ 支付宝配置组件表注释添加完成${NC}"
}

# 修复微信支付配置组件表注释
fix_wechat_config_comments() {
    echo -e "${YELLOW}🔧 修复微信支付配置组件表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 添加components_payment_wechat_configs表注释
COMMENT ON TABLE components_payment_wechat_configs IS '微信支付配置组件表 - 存储微信支付接入所需的全部配置信息，包含商户号、AppID、密钥等';

-- 添加字段注释（基于微信支付标准配置）
COMMENT ON COLUMN components_payment_wechat_configs.id IS '主键ID - 微信支付配置组件的唯一标识符';
COMMENT ON COLUMN components_payment_wechat_configs.enabled IS '微信支付开关 - 是否启用微信支付渠道，默认关闭';
COMMENT ON COLUMN components_payment_wechat_configs.app_id IS '微信AppID - 微信开放平台或公众平台的应用标识';
COMMENT ON COLUMN components_payment_wechat_configs.mch_id IS '商户号 - 微信支付分配的商户标识';
COMMENT ON COLUMN components_payment_wechat_configs.api_key IS '商户密钥 - API密钥，用于签名验证，敏感信息需加密存储';
COMMENT ON COLUMN components_payment_wechat_configs.app_secret IS '应用密钥 - 微信应用的Secret，用于获取access_token';
COMMENT ON COLUMN components_payment_wechat_configs.cert_path IS '证书路径 - 商户API证书路径，用于退款等敏感操作';
COMMENT ON COLUMN components_payment_wechat_configs.key_path IS '私钥路径 - 商户API私钥路径，与证书配套使用';
COMMENT ON COLUMN components_payment_wechat_configs.notify_url IS '异步通知地址 - 微信支付异步通知的回调URL';
COMMENT ON COLUMN components_payment_wechat_configs.supported_methods IS '支持的支付方式 - JSON格式，包含JSAPI、APP、H5、Native等支付场景';
COMMENT ON COLUMN components_payment_wechat_configs.sandbox_mode IS '沙箱模式 - 是否使用微信支付沙箱环境进行测试';
COMMENT ON COLUMN components_payment_wechat_configs.config_status IS '配置状态 - draft(草稿)/configured(已配置)/testing(测试中)/active(生效)';
COMMENT ON COLUMN components_payment_wechat_configs.last_tested_at IS '最后测试时间 - 记录配置最后一次测试的时间戳';
COMMENT ON COLUMN components_payment_wechat_configs.test_result IS '测试结果 - JSON格式存储测试详情，包含成功状态和错误信息';
COMMENT ON COLUMN components_payment_wechat_configs.api_version IS 'API版本 - 微信支付API版本，如v2、v3等';
EOF

    echo -e "${GREEN}   ✅ 微信支付配置组件表注释添加完成${NC}"
}

# 修复Stripe配置组件表注释
fix_stripe_config_comments() {
    echo -e "${YELLOW}🔧 修复Stripe配置组件表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 添加components_payment_stripe_configs表注释
COMMENT ON TABLE components_payment_stripe_configs IS 'Stripe支付配置组件表 - 存储Stripe国际信用卡支付接入所需的配置信息，包含API密钥、webhook等';

-- 添加字段注释（基于Stripe标准配置）
COMMENT ON COLUMN components_payment_stripe_configs.id IS '主键ID - Stripe配置组件的唯一标识符';
COMMENT ON COLUMN components_payment_stripe_configs.enabled IS 'Stripe开关 - 是否启用Stripe支付渠道，默认关闭';
COMMENT ON COLUMN components_payment_stripe_configs.publishable_key IS '可发布密钥 - Stripe前端使用的公开密钥，用于创建支付元素';
COMMENT ON COLUMN components_payment_stripe_configs.secret_key IS '秘密密钥 - Stripe后端使用的私密密钥，敏感信息需加密存储';
COMMENT ON COLUMN components_payment_stripe_configs.webhook_secret IS 'Webhook密钥 - 用于验证Stripe webhook事件的签名';
COMMENT ON COLUMN components_payment_stripe_configs.webhook_endpoint IS 'Webhook端点 - Stripe事件通知的回调URL地址';
COMMENT ON COLUMN components_payment_stripe_configs.supported_currencies IS '支持货币 - JSON格式存储支持的货币类型，如USD、EUR、CNY等';
COMMENT ON COLUMN components_payment_stripe_configs.supported_methods IS '支持的支付方式 - JSON格式，包含card、apple_pay、google_pay等';
COMMENT ON COLUMN components_payment_stripe_configs.capture_method IS '资金捕获方式 - automatic(自动)或manual(手动)捕获支付';
COMMENT ON COLUMN components_payment_stripe_configs.statement_descriptor IS '账单描述 - 显示在客户银行账单上的商户名称';
COMMENT ON COLUMN components_payment_stripe_configs.success_url IS '成功页面URL - 支付成功后用户跳转的页面地址';
COMMENT ON COLUMN components_payment_stripe_configs.cancel_url IS '取消页面URL - 用户取消支付后跳转的页面地址';
COMMENT ON COLUMN components_payment_stripe_configs.test_mode IS '测试模式 - 是否使用Stripe测试环境';
COMMENT ON COLUMN components_payment_stripe_configs.config_status IS '配置状态 - draft(草稿)/configured(已配置)/testing(测试中)/active(生效)';
COMMENT ON COLUMN components_payment_stripe_configs.last_tested_at IS '最后测试时间 - 记录配置最后一次测试的时间戳';
COMMENT ON COLUMN components_payment_stripe_configs.test_result IS '测试结果 - JSON格式存储测试详情，包含成功状态和错误信息';
EOF

    echo -e "${GREEN}   ✅ Stripe配置组件表注释添加完成${NC}"
}

# 修复其他支付相关表注释
fix_other_payment_comments() {
    echo -e "${YELLOW}🔧 修复其他支付相关表注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 添加payment_config_cmps表注释
COMMENT ON TABLE payment_config_cmps IS '支付配置组件关联表 - 关联payment_config与各种支付配置组件的多态关联表';

-- 添加payment_config_last_modified_by_lnk表注释  
COMMENT ON TABLE payment_config_last_modified_by_lnk IS '支付配置最后修改人关联表 - 关联payment_config与admin_users，记录配置修改历史';
EOF

    echo -e "${GREEN}   ✅ 其他支付相关表注释添加完成${NC}"
}

# 验证修复结果
verify_fix_result() {
    echo -e "${YELLOW}🔍 验证修复结果...${NC}"
    
    echo -e "${BLUE}📊 表注释检查结果：${NC}"
    psql -U aibianx_dev -d aibianx_dev -c "
    SELECT 
        t.table_name,
        CASE 
            WHEN obj_description(c.oid) IS NULL OR obj_description(c.oid) = '' THEN '❌ 仍缺失'
            ELSE '✅ 已添加'
        END as comment_status,
        CASE 
            WHEN obj_description(c.oid) IS NULL OR obj_description(c.oid) = '' THEN ''
            ELSE substring(obj_description(c.oid), 1, 50) || '...'
        END as comment_preview
    FROM information_schema.tables t
    LEFT JOIN pg_class c ON c.relname = t.table_name
    WHERE t.table_schema = 'public' 
    AND t.table_name IN (
        'payment_config', 
        'payment_config_cmps',
        'payment_config_last_modified_by_lnk',
        'components_payment_general_configs',
        'components_payment_alipay_configs', 
        'components_payment_wechat_configs',
        'components_payment_stripe_configs'
    )
    ORDER BY t.table_name;
    "
    
    echo -e "${BLUE}📊 字段注释统计：${NC}"
    psql -U aibianx_dev -d aibianx_dev -c "
    WITH field_comments AS (
        SELECT 
            ic.table_name,
            COUNT(*) as total_fields,
            COUNT(CASE WHEN col_description(pgc.oid, pa.attnum) IS NOT NULL AND col_description(pgc.oid, pa.attnum) != '' THEN 1 END) as commented_fields
        FROM information_schema.columns ic
        JOIN pg_class pgc ON pgc.relname = ic.table_name
        JOIN pg_attribute pa ON pa.attrelid = pgc.oid AND pa.attname = ic.column_name
        WHERE ic.table_schema = 'public' 
        AND pa.attnum > 0
        AND ic.table_name IN (
            'payment_config',
            'components_payment_general_configs',
            'components_payment_alipay_configs', 
            'components_payment_wechat_configs',
            'components_payment_stripe_configs'
        )
        GROUP BY ic.table_name
    )
    SELECT 
        table_name,
        total_fields,
        commented_fields,
        (total_fields - commented_fields) as missing_comments,
        CASE 
            WHEN commented_fields = total_fields THEN '✅ 完整'
            ELSE '❌ 不完整'
        END as status
    FROM field_comments
    ORDER BY table_name;
    "
}

# 主执行流程
main() {
    echo -e "${BLUE}开始修复支付相关表的数据库注释...${NC}"
    
    # 检查数据库连接
    check_database
    
    # 执行修复
    fix_payment_config_comments
    fix_general_config_comments  
    fix_alipay_config_comments
    fix_wechat_config_comments
    fix_stripe_config_comments
    fix_other_payment_comments
    
    # 验证修复结果
    verify_fix_result
    
    echo -e "${GREEN}🎉 支付相关表数据库注释修复完成！${NC}"
    echo "============================================="
    echo -e "${YELLOW}📝 修复内容总结：${NC}"
    echo "   ✅ 添加了7个表的表注释"
    echo "   ✅ 添加了64个字段的字段注释"
    echo "   ✅ 覆盖了所有支付配置相关表"
    echo ""
    echo -e "${YELLOW}💡 建议：${NC}"
    echo "   1. 定期检查数据库注释完整性"
    echo "   2. 新建表时立即添加注释"
    echo "   3. 保持注释与Strapi schema同步"
}

# 执行主函数
main "$@"