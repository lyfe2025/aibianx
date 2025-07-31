#!/bin/bash

# =================================
# 批量修复脚本中的硬编码URL工具
# =================================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 批量修复脚本硬编码URL工具${NC}"
echo "========================================"

# 获取项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# 需要修复的脚本列表
SCRIPTS_TO_FIX=(
    "scripts/search/check-meilisearch.sh"
    "scripts/search/manage-meilisearch.sh"
    "scripts/deployment/start-backend.sh"
    "scripts/deployment/start-frontend.sh"
    "scripts/tools/configure-field-descriptions.sh"
    "scripts/tools/configure-any-field-descriptions.sh"
    "scripts/database/restore-database-only.sh"
)

# URL替换映射
declare -A URL_REPLACEMENTS=(
    ["http://localhost:1337"]='${BACKEND_URL}'
    ["http://localhost:1337/admin"]='${BACKEND_ADMIN_URL}'
    ["http://localhost:1337/api"]='${BACKEND_API_URL}'
    ["http://localhost:1337/documentation"]='${BACKEND_DOCS_URL}'
    ["http://localhost:7700"]='${SEARCH_URL}'
    ["http://localhost:7700/health"]='${SEARCH_HEALTH_URL}'
    ["http://localhost:3000"]='${FRONTEND_URL}'
    ["http://localhost"]='${FRONTEND_URL}'
)

fix_script() {
    local script_path="$1"
    local full_path="$PROJECT_ROOT/$script_path"
    
    if [ ! -f "$full_path" ]; then
        echo -e "${YELLOW}⚠️  跳过不存在的文件: $script_path${NC}"
        return
    fi
    
    echo -e "${BLUE}🔧 修复脚本: $script_path${NC}"
    
    # 检查是否已经有配置加载
    if ! grep -q "load-config.sh" "$full_path"; then
        echo "   添加配置加载..."
        
        # 获取脚本目录相对于配置文件的路径
        local script_dir=$(dirname "$script_path")
        local config_path
        case "$script_dir" in
            "scripts/search")
                config_path="../tools/load-config.sh"
                ;;
            "scripts/deployment")
                config_path="../tools/load-config.sh"
                ;;
            "scripts/tools")
                config_path="./load-config.sh"
                ;;
            "scripts/database")
                config_path="../tools/load-config.sh"
                ;;
            *)
                config_path="scripts/tools/load-config.sh"
                ;;
        esac
        
        # 在#!/bin/bash之后添加配置加载
        sed -i.bak '2a\
# 加载统一配置\
source "$(dirname "$0")/'$config_path'"\
load_config\
' "$full_path"
    fi
    
    # 替换硬编码URL
    local changes=0
    for old_url in "${!URL_REPLACEMENTS[@]}"; do
        local new_url="${URL_REPLACEMENTS[$old_url]}"
        if grep -q "$old_url" "$full_path"; then
            sed -i.tmp "s|$old_url|$new_url|g" "$full_path"
            changes=$((changes + 1))
        fi
    done
    
    # 清理临时文件
    rm -f "$full_path.tmp" "$full_path.bak"
    
    if [ $changes -gt 0 ]; then
        echo -e "   ${GREEN}✅ 已修复 $changes 处硬编码URL${NC}"
    else
        echo -e "   ${GREEN}✅ 无需修复${NC}"
    fi
}

# 修复所有脚本
echo "开始修复脚本文件..."
echo ""

for script in "${SCRIPTS_TO_FIX[@]}"; do
    fix_script "$script"
done

echo ""
echo -e "${GREEN}🎉 批量修复完成！${NC}"
echo ""
echo -e "${YELLOW}📋 修复摘要:${NC}"
echo "   • 已为脚本添加统一配置加载"
echo "   • 已替换所有硬编码URL为配置变量"
echo "   • 所有脚本现在支持域名端口分离配置"
echo ""
echo -e "${BLUE}💡 提示:${NC}"
echo "   • 所有脚本现在使用环境变量配置"
echo "   • 修改 .env 文件即可调整服务地址"
echo "   • 支持开发/生产环境无缝切换"