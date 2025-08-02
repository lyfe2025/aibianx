#!/bin/bash

# 字段描述完整性检查工具
# 用于预防和检测字段描述缺失问题

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

echo -e "${BLUE}🔍 Strapi 字段描述完整性检查工具${NC}"
echo "=========================================="

# 检查数据库连接
check_database() {
    echo -e "${YELLOW}📊 检查数据库连接...${NC}"
    if ! psql -U aibianx_dev -d aibianx_dev -c "SELECT 1;" >/dev/null 2>&1; then
        echo -e "${RED}❌ 数据库连接失败！请确保数据库服务正在运行${NC}"
        echo "   尝试启动后端服务: ./scripts.sh deploy backend"
        exit 1
    fi
    echo -e "${GREEN}✅ 数据库连接正常${NC}"
}

# 检查所有内容类型的字段描述
check_all_content_types() {
    echo -e "${YELLOW}🔍 检查所有内容类型的字段描述配置...${NC}"
    
    local missing_count=0
    local total_count=0
    
    # 获取所有内容类型的配置状态
    local result=$(psql -U aibianx_dev -d aibianx_dev -t -c "
    SELECT 
        REPLACE(REPLACE(key, 'plugin_content_manager_configuration_content_types::', ''), 'api::', '') as content_type,
        CASE 
            WHEN value::jsonb->'metadatas' IS NULL THEN 'MISSING'
            WHEN value::jsonb->'metadatas' = '{}' THEN 'EMPTY'
            ELSE 'OK'
        END as status,
        (SELECT COUNT(*) FROM jsonb_object_keys(value::jsonb->'metadatas')) as field_count
    FROM strapi_core_store_settings 
    WHERE key LIKE 'plugin_content_manager_configuration_content_types::api::%'
    ORDER BY content_type;
    ")
    
    echo -e "${BLUE}📋 内容类型字段描述状态：${NC}"
    echo "----------------------------------------"
    
    while IFS='|' read -r content_type status field_count; do
        # 清理空格
        content_type=$(echo "$content_type" | xargs)
        status=$(echo "$status" | xargs)
        field_count=$(echo "$field_count" | xargs)
        
        total_count=$((total_count + 1))
        
        case $status in
            "OK")
                echo -e "✅ ${content_type} (${field_count}个字段)"
                ;;
            "MISSING"|"EMPTY")
                echo -e "${RED}❌ ${content_type} - 字段描述缺失${NC}"
                missing_count=$((missing_count + 1))
                ;;
        esac
    done <<< "$result"
    
    echo "----------------------------------------"
    echo -e "${BLUE}📊 统计结果：${NC}"
    echo "   总内容类型: $total_count"
    echo "   已配置: $((total_count - missing_count))"
    if [ $missing_count -gt 0 ]; then
        echo -e "   ${RED}缺失配置: $missing_count${NC}"
        return 1
    else
        echo -e "   ${GREEN}缺失配置: 0${NC}"
        return 0
    fi
}

# 列出缺失字段描述的内容类型
list_missing_types() {
    echo -e "${YELLOW}🚨 列出需要配置字段描述的内容类型：${NC}"
    
    local missing_types=$(psql -U aibianx_dev -d aibianx_dev -t -c "
    SELECT 
        REPLACE(REPLACE(key, 'plugin_content_manager_configuration_content_types::', ''), 'api::', '') as content_type
    FROM strapi_core_store_settings 
    WHERE key LIKE 'plugin_content_manager_configuration_content_types::api::%'
    AND (value::jsonb->'metadatas' IS NULL OR value::jsonb->'metadatas' = '{}')
    ORDER BY content_type;
    ")
    
    if [ -z "$missing_types" ]; then
        echo -e "${GREEN}✅ 所有内容类型都已配置字段描述${NC}"
        return 0
    fi
    
    echo -e "${RED}以下内容类型缺少字段描述配置：${NC}"
    while IFS= read -r content_type; do
        content_type=$(echo "$content_type" | xargs)
        if [ -n "$content_type" ]; then
            echo -e "${RED}  ❌ $content_type${NC}"
            echo "     修复命令: ./scripts/tools/configure-any-field-descriptions.sh $content_type"
        fi
    done <<< "$missing_types"
    
    return 1
}

# 提供修复建议
provide_fix_suggestions() {
    echo -e "${YELLOW}🔧 修复建议：${NC}"
    echo "1. 单个修复："
    echo "   ./scripts/tools/configure-any-field-descriptions.sh [content-type]"
    echo ""
    echo "2. 批量检查所有类型："
    echo "   for type in article author category tag site-config seo-metrics payment-config; do"
    echo "       echo \"检查 \$type...\""
    echo "       ./scripts/tools/configure-any-field-descriptions.sh \$type"
    echo "   done"
    echo ""
    echo "3. 添加到开发启动检查："
    echo "   将此脚本添加到 ./scripts.sh 的启动流程中"
}

# 生成预防性脚本
generate_prevention_script() {
    local script_file="$PROJECT_ROOT/scripts/tools/auto-check-field-descriptions.sh"
    
    cat > "$script_file" << 'EOF'
#!/bin/bash
# 自动字段描述检查脚本 - 集成到开发工作流

# 检查字段描述完整性
if ! ./scripts/tools/check-field-descriptions.sh >/dev/null 2>&1; then
    echo "⚠️  发现字段描述配置缺失，请先修复后再继续开发"
    ./scripts/tools/check-field-descriptions.sh
    echo ""
    echo "修复后请重新运行开发命令"
    exit 1
fi
EOF
    
    chmod +x "$script_file"
    echo -e "${GREEN}✅ 已生成预防性检查脚本: $script_file${NC}"
}

# 主执行流程
main() {
    local check_only=false
    local generate_prevention=false
    
    # 解析参数
    case "${1:-}" in
        "--check-only")
            check_only=true
            ;;
        "--generate-prevention")
            generate_prevention=true
            ;;
        "--help"|"-h")
            echo "用法: $0 [选项]"
            echo "选项:"
            echo "  --check-only           仅检查，不提供修复建议"
            echo "  --generate-prevention  生成预防性检查脚本"
            echo "  --help, -h            显示此帮助信息"
            exit 0
            ;;
    esac
    
    # 执行检查
    check_database
    
    if check_all_content_types; then
        echo -e "${GREEN}🎉 所有内容类型的字段描述配置完整！${NC}"
        
        if $generate_prevention; then
            generate_prevention_script
        fi
        
        exit 0
    else
        echo -e "${RED}⚠️  发现字段描述配置问题${NC}"
        echo ""
        
        if ! $check_only; then
            list_missing_types
            echo ""
            provide_fix_suggestions
            
            if $generate_prevention; then
                generate_prevention_script
            fi
        fi
        
        exit 1
    fi
}

# 如果直接运行此脚本，则执行主函数
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi