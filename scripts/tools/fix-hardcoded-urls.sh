#!/bin/bash

# ===================================================================
# AI变现之路 - 批量修复硬编码URL脚本
# ===================================================================
# 🎯 目标: 统一替换所有脚本中的硬编码URL为动态变量
# 📝 使用: ./scripts/tools/fix-hardcoded-urls.sh
# ⚠️  重要: 运行前请备份重要文件

set -e

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 AI变现之路 - 批量修复硬编码URL${NC}"
echo -e "${CYAN}=========================================${NC}"

# 检查备份目录
BACKUP_DIR="${PROJECT_ROOT}/backups/hardcode-fix-$(date +%Y%m%d_%H%M%S)"
mkdir -p "${BACKUP_DIR}"

echo -e "${YELLOW}📦 创建备份目录: ${BACKUP_DIR}${NC}"

# 需要修复的文件列表（根据检查结果）
declare -a FILES_TO_FIX=(
    "scripts/tools/subscription-system-clean-setup.sh"
    "scripts/tools/subscription-system-direct-setup.sh"
    "scripts/tools/pre-deployment-checklist.sh"
    "scripts/tools/production-health-check.sh"
    "scripts/deployment/start-dev.sh"
    "scripts/production/local-production-deploy.sh"
)

# 硬编码URL替换映射表
declare -A URL_REPLACEMENTS=(

    ["http://localhost:7700"]='${MEILISEARCH_URL}'
    ["http://localhost:1337/admin"]='${ADMIN_URL}'
    ["http://localhost:1337"]='${BACKEND_URL}'
    ["http://localhost/admin"]='${ADMIN_URL}'
    ["http://localhost"]='${FRONTEND_URL}'
)

# 修复函数
fix_file_hardcodes() {
    local file="$1"
    local full_path="${PROJECT_ROOT}/${file}"
    
    if [[ ! -f "${full_path}" ]]; then
        echo -e "${YELLOW}⚠️  文件不存在: ${file}${NC}"
        return 1
    fi
    
    echo -e "${BLUE}🔧 修复文件: ${file}${NC}"
    
    # 备份原文件
    cp "${full_path}" "${BACKUP_DIR}/$(basename "${file}").backup"
    
    # 检查文件是否已有统一环境配置
    local needs_env_config=false
    if ! grep -q "configure-unified-env.sh" "${full_path}"; then
        needs_env_config=true
    fi
    
    # 如果需要，添加统一环境配置
    if [[ "${needs_env_config}" == "true" ]]; then
        echo -e "   📝 添加统一环境配置引用..."
        
        # 在脚本开头添加环境配置加载
        local temp_file=$(mktemp)
        
        # 读取文件头部
        local shebang_line=$(head -n 1 "${full_path}")
        local after_shebang=$(tail -n +2 "${full_path}")
        
        # 构建新文件
        {
            echo "${shebang_line}"
            echo ""
            echo "# 获取项目根目录"
            echo 'SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"'
            echo 'PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"'
            echo ""
            echo "# 加载统一环境配置"
            echo 'source "${PROJECT_ROOT}/deployment/configure-unified-env.sh"'
            echo ""
            echo "${after_shebang}"
        } > "${temp_file}"
        
        mv "${temp_file}" "${full_path}"
    fi
    
    # 替换硬编码URL
    local replacement_count=0
    for hardcode in "${!URL_REPLACEMENTS[@]}"; do
        local replacement="${URL_REPLACEMENTS[$hardcode]}"
        
        # 使用sed进行替换（转义特殊字符）
        local escaped_hardcode=$(printf '%s\n' "$hardcode" | sed 's/[[\.*^$()+?{|]/\\&/g')
        local escaped_replacement=$(printf '%s\n' "$replacement" | sed 's/[[\.*^$(){}?+|/]/\\&/g')
        
        if grep -q "$hardcode" "${full_path}"; then
            sed -i.tmp "s|$escaped_hardcode|$replacement|g" "${full_path}"
            rm -f "${full_path}.tmp"
            
            local count=$(grep -c "$replacement" "${full_path}" || true)
            replacement_count=$((replacement_count + count))
            echo -e "   ✅ 替换 '$hardcode' → '$replacement' (${count}处)"
        fi
    done
    
    echo -e "   📊 总共替换: ${replacement_count} 处硬编码"
    return 0
}

# 执行修复
echo -e "${YELLOW}🚀 开始批量修复硬编码URL...${NC}"
echo ""

total_fixed=0
for file in "${FILES_TO_FIX[@]}"; do
    if fix_file_hardcodes "$file"; then
        total_fixed=$((total_fixed + 1))
    fi
    echo ""
done

# 修复其他可能的硬编码文件
echo -e "${YELLOW}🔍 搜索其他可能的硬编码文件...${NC}"

# 搜索脚本目录中其他可能包含硬编码的文件
additional_files=$(find "${PROJECT_ROOT}/scripts" -name "*.sh" -type f -exec grep -l "http://localhost" {} \; 2>/dev/null || true)

if [[ -n "$additional_files" ]]; then
    echo -e "${CYAN}发现额外的硬编码文件:${NC}"
    while IFS= read -r file; do
        if [[ "$file" != *"fix-hardcoded-urls.sh" ]]; then
            relative_file=${file#$PROJECT_ROOT/}
            echo -e "   • $relative_file"
            
            # 自动修复这些文件
            if fix_file_hardcodes "$relative_file"; then
                total_fixed=$((total_fixed + 1))
            fi
        fi
    done <<< "$additional_files"
fi

# 运行硬编码检查验证修复效果
echo -e "${YELLOW}🔍 验证修复效果...${NC}"
if [[ -f "${PROJECT_ROOT}/scripts/tools/check-hardcode.sh" ]]; then
    "${PROJECT_ROOT}/scripts/tools/check-hardcode.sh" --quiet || true
fi

# 总结报告
echo ""
echo -e "${GREEN}🎉 硬编码URL修复完成！${NC}"
echo -e "${CYAN}=========================================${NC}"
echo -e "📊 修复统计:"
echo -e "   • 处理文件: ${total_fixed} 个"
echo -e "   • 备份目录: ${BACKUP_DIR}"
echo -e "   • 配置文件: deployment/configure-unified-env.sh"
echo ""
echo -e "${BLUE}📋 下一步操作:${NC}"
echo -e "1. ${CYAN}测试修复效果:${NC} ./scripts.sh tools check"
echo -e "2. ${CYAN}验证服务启动:${NC} ./scripts.sh deploy start"
echo -e "3. ${CYAN}检查访问地址:${NC} deployment/configure-unified-env.sh"
echo ""
echo -e "${YELLOW}⚠️  如有问题，可从备份目录恢复:${NC}"
echo -e "   cp ${BACKUP_DIR}/*.backup [对应文件路径]"