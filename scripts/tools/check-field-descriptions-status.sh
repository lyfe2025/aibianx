#!/bin/bash

# 🔍 检查字段描述配置状态工具
# 快速检查所有内容类型的字段描述配置状态

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 字段描述配置状态检查${NC}"
echo "=================================="

# 检查所有内容类型的配置
echo -e "${YELLOW}📋 检查所有内容类型配置...${NC}"

psql -U aibianx_dev -d aibianx_dev << 'EOF'
\echo '=== 内容类型配置状态 ==='
SELECT 
    CASE 
        WHEN key LIKE '%smtp-config%' THEN 'SMTP配置管理'
        WHEN key LIKE '%email-subscription%' THEN '邮件订阅'
        WHEN key LIKE '%article%' THEN '文章管理'
        WHEN key LIKE '%author%' THEN '作者管理'
        WHEN key LIKE '%category%' THEN '分类管理'
        WHEN key LIKE '%tag%' THEN '标签管理'
        ELSE SUBSTRING(key FROM 'api::(.+?)\.')
    END as "内容类型",
    CASE 
        WHEN value::jsonb->'metadatas' IS NOT NULL AND jsonb_object_keys(value::jsonb->'metadatas') IS NOT NULL THEN '✅ 已配置'
        ELSE '❌ 未配置'
    END as "字段描述状态",
    CASE 
        WHEN jsonb_object_keys(value::jsonb->'metadatas') IS NOT NULL THEN 
            (SELECT COUNT(*) FROM jsonb_object_keys(value::jsonb->'metadatas'))
        ELSE 0
    END as "配置字段数"
FROM strapi_core_store_settings 
WHERE key LIKE '%plugin_content_manager_configuration_content_types::api::%'
ORDER BY "内容类型";

\echo ''
\echo '=== SMTP配置字段详情 ==='
SELECT 
    jsonb_object_keys(value::jsonb->'metadatas') as "字段名",
    value::jsonb->'metadatas'->jsonb_object_keys(value::jsonb->'metadatas')->'edit'->>'label' as "中文标签"
FROM strapi_core_store_settings 
WHERE key = 'plugin_content_manager_configuration_content_types::api::smtp-config.smtp-config'
LIMIT 5;

\echo ''
\echo '=== 邮件订阅字段详情 ==='
SELECT 
    jsonb_object_keys(value::jsonb->'metadatas') as "字段名",
    value::jsonb->'metadatas'->jsonb_object_keys(value::jsonb->'metadatas')->'edit'->>'label' as "中文标签"
FROM strapi_core_store_settings 
WHERE key = 'plugin_content_manager_configuration_content_types::api::email-subscription.email-subscription'
LIMIT 5;

EOF

echo ""
echo -e "${GREEN}✅ 字段描述状态检查完成${NC}"
echo ""
echo -e "${BLUE}💡 如果发现未配置的内容类型，请运行：${NC}"
echo "   ./scripts/tools/configure-any-field-descriptions.sh <内容类型名>"
echo ""
echo -e "${BLUE}💡 如果字段仍显示英文，请：${NC}"
echo "   1. 强制刷新浏览器 (Cmd+Shift+R)"
echo "   2. 清除浏览器缓存"
echo "   3. 重新进入Content Manager"
