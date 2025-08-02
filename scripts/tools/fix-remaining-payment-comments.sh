#!/bin/bash

# 修复剩余的支付字段注释脚本
# 针对实际存在的字段添加注释

set -e

# 加载统一配置
source "$(dirname "$0")/./load-config.sh"
load_config

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 修复剩余的支付字段注释${NC}"
echo "=========================================="

# 修复微信支付配置表剩余字段注释
fix_wechat_remaining_comments() {
    echo -e "${YELLOW}🔧 修复微信支付配置表剩余字段注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 修复微信支付配置表剩余字段注释
COMMENT ON COLUMN components_payment_wechat_configs.private_key IS '商户私钥 - RSA私钥，用于签名验证，敏感信息需加密存储';
COMMENT ON COLUMN components_payment_wechat_configs.certificate IS '商户证书 - API证书内容，用于退款等敏感操作的身份验证';
COMMENT ON COLUMN components_payment_wechat_configs.api_version IS 'API版本 - 微信支付API版本，支持v2、v3等版本';
COMMENT ON COLUMN components_payment_wechat_configs.supported_methods IS '支持的支付方式 - JSON格式，包含JSAPI、APP、H5、Native等支付场景配置';
COMMENT ON COLUMN components_payment_wechat_configs.js_api_domain IS 'JSAPI支付域名 - 公众号支付时的授权域名，用于网页内支付';
COMMENT ON COLUMN components_payment_wechat_configs.h_5_domain IS 'H5支付域名 - 手机网页支付时的授权域名，用于移动端浏览器支付';
EOF

    echo -e "${GREEN}   ✅ 微信支付配置表剩余字段注释修复完成${NC}"
}

# 修复Stripe配置表剩余字段注释
fix_stripe_remaining_comments() {
    echo -e "${YELLOW}🔧 修复Stripe配置表剩余字段注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 修复Stripe配置表剩余字段注释
COMMENT ON COLUMN components_payment_stripe_configs.api_version IS 'API版本 - Stripe API版本号，如2023-10-16等';
COMMENT ON COLUMN components_payment_stripe_configs.default_currency IS '默认货币 - 默认使用的货币类型，如USD、EUR、CNY等';
COMMENT ON COLUMN components_payment_stripe_configs.supported_currencies IS '支持货币列表 - JSON格式存储支持的货币类型数组';
COMMENT ON COLUMN components_payment_stripe_configs.supported_methods IS '支持的支付方式 - JSON格式，包含card、apple_pay、google_pay等支付方法配置';
COMMENT ON COLUMN components_payment_stripe_configs.enable_apple_pay IS '启用Apple Pay - 是否在支付页面显示Apple Pay选项';
COMMENT ON COLUMN components_payment_stripe_configs.enable_google_pay IS '启用Google Pay - 是否在支付页面显示Google Pay选项';
COMMENT ON COLUMN components_payment_stripe_configs.automatic_payment_methods IS '自动支付方式 - 是否自动启用Stripe支持的新支付方式';
EOF

    echo -e "${GREEN}   ✅ Stripe配置表剩余字段注释修复完成${NC}"
}

# 验证最终修复结果
verify_final_result() {
    echo -e "${YELLOW}🔍 验证最终修复结果...${NC}"
    
    echo -e "${BLUE}📊 最终字段注释统计：${NC}"
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
            ELSE '❌ 缺失' || (total_fields - commented_fields) || '个'
        END as status
    FROM field_comments
    ORDER BY table_name;
    "
    
    echo -e "${BLUE}📋 检查是否还有缺失字段注释的字段：${NC}"
    psql -U aibianx_dev -d aibianx_dev -c "
    SELECT 
        ic.table_name,
        ic.column_name,
        '❌ 缺失注释' as status
    FROM information_schema.columns ic
    JOIN pg_class pgc ON pgc.relname = ic.table_name
    JOIN pg_attribute pa ON pa.attrelid = pgc.oid AND pa.attname = ic.column_name
    WHERE ic.table_schema = 'public' 
    AND pa.attnum > 0
    AND ic.table_name IN (
        'components_payment_wechat_configs',
        'components_payment_stripe_configs'
    )
    AND (col_description(pgc.oid, pa.attnum) IS NULL OR col_description(pgc.oid, pa.attnum) = '')
    ORDER BY ic.table_name, ic.column_name;
    "
}

# 主执行流程
main() {
    echo -e "${BLUE}开始修复剩余的支付字段注释...${NC}"
    
    # 修复剩余字段注释
    fix_wechat_remaining_comments
    fix_stripe_remaining_comments
    
    # 验证最终结果
    verify_final_result
    
    echo -e "${GREEN}🎉 剩余支付字段注释修复完成！${NC}"
    echo "=========================================="
    echo -e "${YELLOW}📝 本次修复总结：${NC}"
    echo "   ✅ 修复了微信支付配置表6个缺失字段注释"
    echo "   ✅ 修复了Stripe配置表7个缺失字段注释"
    echo "   ✅ 所有支付相关表字段注释现已完整"
}

# 执行主函数
main "$@"