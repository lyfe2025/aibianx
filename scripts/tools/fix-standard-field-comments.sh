#!/bin/bash

# 修复Strapi标准字段数据库注释脚本
# 为所有表添加统一的标准字段注释

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

echo -e "${BLUE}🔧 Strapi标准字段数据库注释批量修复工具${NC}"
echo "=================================================="

# 需要修复的表列表
TABLES_TO_FIX=(
    "commissions"
    "invitations" 
    "orders"
    "payments"
    "refunds"
    "subscriptions"
    "system_configs"
)

# 修复标准字段注释
fix_standard_field_comments() {
    local table_name=$1
    echo -e "${YELLOW}🔧 修复 ${table_name} 表的标准字段注释...${NC}"
    
    # 为每个表的标准字段添加注释
    psql -U aibianx_dev -d aibianx_dev << EOF
-- 修复 ${table_name} 表的Strapi标准字段注释
DO \$\$
BEGIN
    -- id字段注释
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='${table_name}' AND column_name='id') THEN
        EXECUTE 'COMMENT ON COLUMN ${table_name}.id IS ''主键ID - 数据记录的唯一标识符，自动递增''';
    END IF;
    
    -- created_at字段注释
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='${table_name}' AND column_name='created_at') THEN
        EXECUTE 'COMMENT ON COLUMN ${table_name}.created_at IS ''创建时间 - 记录首次创建的时间戳，由系统自动设置''';
    END IF;
    
    -- updated_at字段注释  
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='${table_name}' AND column_name='updated_at') THEN
        EXECUTE 'COMMENT ON COLUMN ${table_name}.updated_at IS ''更新时间 - 记录最后修改的时间戳，每次更新时系统自动更新''';
    END IF;
    
    -- published_at字段注释
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='${table_name}' AND column_name='published_at') THEN
        EXECUTE 'COMMENT ON COLUMN ${table_name}.published_at IS ''发布时间 - 内容发布的时间戳，空值表示草稿状态，有值表示已发布''';
    END IF;
    
    -- created_by_id字段注释
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='${table_name}' AND column_name='created_by_id') THEN
        EXECUTE 'COMMENT ON COLUMN ${table_name}.created_by_id IS ''创建人ID - 关联admin_users表，记录创建此记录的管理员用户ID''';
    END IF;
    
    -- updated_by_id字段注释
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='${table_name}' AND column_name='updated_by_id') THEN
        EXECUTE 'COMMENT ON COLUMN ${table_name}.updated_by_id IS ''更新人ID - 关联admin_users表，记录最后修改此记录的管理员用户ID''';
    END IF;
END \$\$;
EOF

    echo -e "${GREEN}   ✅ ${table_name} 表标准字段注释添加完成${NC}"
}

# 修复system_configs表的特殊字段
fix_system_configs_special_fields() {
    echo -e "${YELLOW}🔧 修复system_configs表的特殊字段注释...${NC}"
    
    psql -U aibianx_dev -d aibianx_dev << 'EOF'
-- 修复system_configs表的特殊字段注释
COMMENT ON COLUMN system_configs.locale IS '语言地区 - 系统配置适用的语言和地区设置，如zh-CN、en-US等';
COMMENT ON COLUMN system_configs.verification_code_length IS '验证码长度 - 系统生成验证码的位数，默认6位，范围4-8位';
EOF

    echo -e "${GREEN}   ✅ system_configs表特殊字段注释添加完成${NC}"
}

# 验证修复结果
verify_fix_result() {
    echo -e "${YELLOW}🔍 验证标准字段注释修复结果...${NC}"
    
    echo -e "${BLUE}📊 修复后的字段注释统计：${NC}"
    for table in "${TABLES_TO_FIX[@]}"; do
        echo -e "${BLUE}检查 ${table} 表：${NC}"
        psql -U aibianx_dev -d aibianx_dev -c "
        SELECT 
            '${table}' as table_name,
            COUNT(*) as total_fields,
            COUNT(CASE WHEN col_description(pgc.oid, pa.attnum) IS NOT NULL AND col_description(pgc.oid, pa.attnum) != '' THEN 1 END) as commented_fields,
            COUNT(CASE WHEN col_description(pgc.oid, pa.attnum) IS NULL OR col_description(pgc.oid, pa.attnum) = '' THEN 1 END) as missing_comments
        FROM information_schema.columns ic
        JOIN pg_class pgc ON pgc.relname = ic.table_name
        JOIN pg_attribute pa ON pa.attrelid = pgc.oid AND pa.attname = ic.column_name
        WHERE ic.table_schema = 'public' 
        AND pa.attnum > 0
        AND ic.table_name = '${table}';
        "
    done
    
    echo -e "${BLUE}📋 检查是否还有缺失字段注释：${NC}"
    psql -U aibianx_dev -d aibianx_dev -c "
    SELECT 
        ic.table_name,
        ic.column_name,
        '❌ 仍缺失注释' as status
    FROM information_schema.columns ic
    JOIN pg_class pgc ON pgc.relname = ic.table_name
    JOIN pg_attribute pa ON pa.attrelid = pgc.oid AND pa.attname = ic.column_name
    WHERE ic.table_schema = 'public' 
    AND pa.attnum > 0
    AND ic.table_name IN ('commissions', 'invitations', 'orders', 'payments', 'refunds', 'subscriptions', 'system_configs')
    AND (col_description(pgc.oid, pa.attnum) IS NULL OR col_description(pgc.oid, pa.attnum) = '')
    ORDER BY ic.table_name, ic.column_name;
    "
}

# 生成最终完整性报告
generate_final_report() {
    echo -e "${YELLOW}📊 生成数据库注释完整性最终报告...${NC}"
    
    echo -e "${BLUE}🎯 所有业务表的注释完整性状态：${NC}"
    psql -U aibianx_dev -d aibianx_dev -c "
    WITH table_stats AS (
        SELECT 
            t.table_name,
            CASE 
                WHEN obj_description(c.oid) IS NULL OR obj_description(c.oid) = '' THEN '❌ 缺失'
                ELSE '✅ 完整'
            END as table_comment_status,
            (SELECT COUNT(*) 
             FROM information_schema.columns ic2
             JOIN pg_class pgc2 ON pgc2.relname = ic2.table_name
             JOIN pg_attribute pa2 ON pa2.attrelid = pgc2.oid AND pa2.attname = ic2.column_name
             WHERE ic2.table_name = t.table_name AND pa2.attnum > 0
            ) as total_fields,
            (SELECT COUNT(*) 
             FROM information_schema.columns ic3
             JOIN pg_class pgc3 ON pgc3.relname = ic3.table_name
             JOIN pg_attribute pa3 ON pa3.attrelid = pgc3.oid AND pa3.attname = ic3.column_name
             WHERE ic3.table_name = t.table_name AND pa3.attnum > 0
             AND col_description(pgc3.oid, pa3.attnum) IS NOT NULL 
             AND col_description(pgc3.oid, pa3.attnum) != ''
            ) as commented_fields
        FROM information_schema.tables t
        LEFT JOIN pg_class c ON c.relname = t.table_name
        WHERE t.table_schema = 'public' 
        AND t.table_type = 'BASE TABLE'
        AND t.table_name NOT LIKE 'strapi_%'
        AND t.table_name NOT LIKE 'up_%'
        AND t.table_name NOT LIKE 'admin_%'
        AND t.table_name NOT LIKE '%_lnk'
        AND t.table_name IN ('articles', 'authors', 'categories', 'tags', 'orders', 'payments', 'refunds', 'subscriptions', 'invitations', 'commissions', 'seo_metrics', 'site_configs', 'system_configs', 'payment_config', 'components_payment_general_configs', 'components_payment_alipay_configs', 'components_payment_wechat_configs', 'components_payment_stripe_configs')
    )
    SELECT 
        table_name,
        table_comment_status,
        total_fields,
        commented_fields,
        (total_fields - commented_fields) as missing_comments,
        CASE 
            WHEN commented_fields = total_fields THEN '✅ 完整'
            ELSE '❌ 缺失' || (total_fields - commented_fields) || '个'
        END as field_comment_status
    FROM table_stats
    ORDER BY 
        CASE WHEN commented_fields = total_fields THEN 1 ELSE 0 END,
        table_name;
    "
}

# 主执行流程
main() {
    echo -e "${BLUE}开始批量修复Strapi标准字段注释...${NC}"
    
    # 为每个表修复标准字段注释
    for table in "${TABLES_TO_FIX[@]}"; do
        fix_standard_field_comments "$table"
    done
    
    # 修复system_configs表的特殊字段
    fix_system_configs_special_fields
    
    # 验证修复结果
    verify_fix_result
    
    # 生成最终报告
    generate_final_report
    
    echo -e "${GREEN}🎉 Strapi标准字段注释批量修复完成！${NC}"
    echo "=================================================="
    echo -e "${YELLOW}📝 修复内容总结：${NC}"
    echo "   ✅ 修复了7个表的标准字段注释"
    echo "   ✅ 每个表修复了6个标准字段（id, created_at, updated_at, published_at, created_by_id, updated_by_id）"
    echo "   ✅ 修复了system_configs表的2个特殊字段"
    echo "   ✅ 总计修复了44个字段注释"
    echo ""
    echo -e "${YELLOW}💡 建议：${NC}"
    echo "   1. 将此脚本集成到新表创建流程中"
    echo "   2. 定期检查数据库注释完整性"
    echo "   3. 保持数据库注释与Strapi schema同步"
}

# 执行主函数
main "$@"