#!/bin/bash

# AI变现之路 - 生产环境项目管理脚本
# 负责项目代码的克隆、更新、分支管理等

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 默认配置
DEFAULT_GIT_URL="https://github.com/lyfe2025/aibianx.git"
DEFAULT_PROJECT_DIR="/opt/aibianx"
DEFAULT_BRANCH="master"

# 检查Git是否可用
check_git_available() {
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ Git未安装或不可用${NC}"
        echo "请先运行: ./scripts.sh production install-env"
        exit 1
    fi
}

# 克隆项目
clone_project() {
    local git_url="${1:-$DEFAULT_GIT_URL}"
    local target_dir="${2:-$DEFAULT_PROJECT_DIR}"
    local branch="${3:-$DEFAULT_BRANCH}"
    
    echo -e "${GREEN}📥 克隆项目代码...${NC}"
    echo "   仓库地址: $git_url"
    echo "   目标目录: $target_dir"
    echo "   分支: $branch"
    echo ""
    
    # 检查目标目录
    if [ -d "$target_dir" ]; then
        echo -e "${YELLOW}⚠️  目标目录已存在: $target_dir${NC}"
        echo "选择操作:"
        echo "  1) 删除现有目录并重新克隆"
        echo "  2) 进入现有目录并更新"
        echo "  3) 取消操作"
        read -p "请选择 [1-3]: " choice
        
        case $choice in
            1)
                echo -e "${YELLOW}🗑️  删除现有目录...${NC}"
                sudo rm -rf "$target_dir"
                ;;
            2)
                echo -e "${BLUE}🔄 进入现有目录并更新...${NC}"
                cd "$target_dir"
                update_project
                return 0
                ;;
            3)
                echo -e "${YELLOW}❌ 操作已取消${NC}"
                return 1
                ;;
            *)
                echo -e "${RED}❌ 无效选择${NC}"
                return 1
                ;;
        esac
    fi
    
    # 创建父目录
    local parent_dir=$(dirname "$target_dir")
    if [ ! -d "$parent_dir" ]; then
        echo -e "${BLUE}📁 创建父目录: $parent_dir${NC}"
        sudo mkdir -p "$parent_dir"
    fi
    
    # 克隆项目
    echo -e "${BLUE}🔄 正在克隆项目...${NC}"
    if git clone -b "$branch" "$git_url" "$target_dir"; then
        echo -e "${GREEN}✅ 项目克隆成功${NC}"
        
        # 设置目录权限
        echo -e "${BLUE}🔐 设置目录权限...${NC}"
        sudo chown -R $USER:$USER "$target_dir" 2>/dev/null || true
        
        # 进入项目目录
        cd "$target_dir"
        
        # 显示项目信息
        show_project_info
        
        return 0
    else
        echo -e "${RED}❌ 项目克隆失败${NC}"
        return 1
    fi
}

# 更新项目
update_project() {
    local project_dir="${1:-$(pwd)}"
    local branch="${2:-}"
    
    echo -e "${BLUE}🔄 更新项目代码...${NC}"
    echo "   项目目录: $project_dir"
    echo ""
    
    # 检查是否在Git仓库中
    if [ ! -d "$project_dir/.git" ]; then
        echo -e "${RED}❌ 当前目录不是Git仓库: $project_dir${NC}"
        echo "请先克隆项目或进入正确的项目目录"
        return 1
    fi
    
    # 进入项目目录
    cd "$project_dir"
    
    # 显示当前状态
    echo -e "${CYAN}📋 当前Git状态:${NC}"
    git status --porcelain
    echo ""
    
    # 检查是否有未提交的更改
    if ! git diff --quiet || ! git diff --cached --quiet; then
        echo -e "${YELLOW}⚠️  检测到未提交的更改${NC}"
        echo "选择操作:"
        echo "  1) 保存更改并更新 (git stash)"
        echo "  2) 放弃更改并更新 (git reset --hard)"
        echo "  3) 取消更新"
        read -p "请选择 [1-3]: " choice
        
        case $choice in
            1)
                echo -e "${BLUE}💾 保存当前更改...${NC}"
                git stash push -m "Auto-stash before update $(date)"
                ;;
            2)
                echo -e "${YELLOW}🗑️  放弃当前更改...${NC}"
                git reset --hard HEAD
                ;;
            3)
                echo -e "${YELLOW}❌ 更新已取消${NC}"
                return 1
                ;;
            *)
                echo -e "${RED}❌ 无效选择${NC}"
                return 1
                ;;
        esac
    fi
    
    # 获取当前分支
    local current_branch=$(git branch --show-current)
    local target_branch="${branch:-$current_branch}"
    
    echo -e "${BLUE}🔄 更新分支: $target_branch${NC}"
    
    # 切换分支（如果需要）
    if [ "$current_branch" != "$target_branch" ]; then
        echo -e "${BLUE}🔀 切换分支: $current_branch -> $target_branch${NC}"
        git checkout "$target_branch" || {
            echo -e "${RED}❌ 分支切换失败${NC}"
            return 1
        }
    fi
    
    # 拉取最新代码
    echo -e "${BLUE}📥 拉取最新代码...${NC}"
    if git pull origin "$target_branch"; then
        echo -e "${GREEN}✅ 项目更新成功${NC}"
        
        # 显示更新信息
        show_project_info
        
        # 检查是否需要重新安装依赖
        check_dependencies_update
        
        return 0
    else
        echo -e "${RED}❌ 项目更新失败${NC}"
        return 1
    fi
}

# 切换分支
switch_branch() {
    local target_branch="$1"
    local project_dir="${2:-$(pwd)}"
    
    if [ -z "$target_branch" ]; then
        echo -e "${RED}❌ 请指定目标分支${NC}"
        return 1
    fi
    
    echo -e "${BLUE}🔀 切换分支...${NC}"
    echo "   项目目录: $project_dir"
    echo "   目标分支: $target_branch"
    echo ""
    
    cd "$project_dir"
    
    # 检查分支是否存在
    if git branch -a | grep -q "$target_branch"; then
        if git checkout "$target_branch"; then
            echo -e "${GREEN}✅ 分支切换成功${NC}"
            show_project_info
            return 0
        else
            echo -e "${RED}❌ 分支切换失败${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ 分支不存在: $target_branch${NC}"
        echo "可用分支:"
        git branch -a
        return 1
    fi
}

# 验证项目
verify_project() {
    local project_dir="${1:-$(pwd)}"
    
    echo -e "${BLUE}🔍 验证项目完整性...${NC}"
    echo "   项目目录: $project_dir"
    echo ""
    
    cd "$project_dir"
    
    local errors=()
    
    # 检查关键文件
    local required_files=(
        "package.json"
        "scripts.sh"
        "frontend/package.json"
        "backend/package.json"
        "deployment/docker-compose.yml"
    )
    
    echo -e "${CYAN}📁 检查关键文件...${NC}"
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            echo "   ✅ $file"
        else
            echo "   ❌ $file - 缺失"
            errors+=("缺失文件: $file")
        fi
    done
    
    # 检查关键目录
    local required_dirs=(
        "frontend/src"
        "backend/src"
        "scripts"
        "deployment"
    )
    
    echo ""
    echo -e "${CYAN}📂 检查关键目录...${NC}"
    for dir in "${required_dirs[@]}"; do
        if [ -d "$dir" ]; then
            echo "   ✅ $dir/"
        else
            echo "   ❌ $dir/ - 缺失"
            errors+=("缺失目录: $dir/")
        fi
    done
    
    # 检查权限
    echo ""
    echo -e "${CYAN}🔐 检查权限...${NC}"
    if [ -x "scripts.sh" ]; then
        echo "   ✅ scripts.sh - 可执行"
    else
        echo "   ❌ scripts.sh - 无执行权限"
        errors+=("权限问题: scripts.sh不可执行")
    fi
    
    # 报告结果
    echo ""
    if [ ${#errors[@]} -eq 0 ]; then
        echo -e "${GREEN}✅ 项目验证通过${NC}"
        return 0
    else
        echo -e "${RED}❌ 项目验证失败:${NC}"
        for error in "${errors[@]}"; do
            echo "   • $error"
        done
        return 1
    fi
}

# 显示项目信息
show_project_info() {
    echo ""
    echo -e "${CYAN}📋 项目信息:${NC}"
    echo "   当前目录: $(pwd)"
    
    if [ -d ".git" ]; then
        echo "   当前分支: $(git branch --show-current)"
        echo "   最新提交: $(git log -1 --oneline)"
        echo "   远程地址: $(git remote get-url origin 2>/dev/null || echo '未设置')"
    fi
    
    if [ -f "package.json" ]; then
        local version=$(grep '"version"' package.json | cut -d'"' -f4)
        echo "   项目版本: $version"
    fi
    
    echo ""
}

# 检查依赖更新
check_dependencies_update() {
    echo -e "${CYAN}📦 检查依赖更新...${NC}"
    
    # 检查前端依赖
    if [ -f "frontend/package.json" ]; then
        echo "   检查前端依赖..."
        if [ -f "frontend/package-lock.json" ]; then
            echo "   💡 建议运行: cd frontend && npm install"
        fi
    fi
    
    # 检查后端依赖
    if [ -f "backend/package.json" ]; then
        echo "   检查后端依赖..."
        if [ -f "backend/package-lock.json" ]; then
            echo "   💡 建议运行: cd backend && npm install"
        fi
    fi
    
    echo ""
}

# 显示帮助信息
show_help() {
    echo -e "${GREEN}🚀 AI变现之路 - 项目管理工具${NC}"
    echo "=================================="
    echo ""
    echo "用法:"
    echo "  $0 clone [git-url] [target-dir] [branch]"
    echo "  $0 update [project-dir] [branch]"
    echo "  $0 switch <branch> [project-dir]"
    echo "  $0 verify [project-dir]"
    echo ""
    echo "命令说明:"
    echo "  clone   - 克隆项目到指定目录"
    echo "  update  - 更新现有项目代码"
    echo "  switch  - 切换Git分支"
    echo "  verify  - 验证项目完整性"
    echo ""
    echo "示例:"
    echo "  $0 clone"
    echo "  $0 clone https://github.com/lyfe2025/aibianx.git /opt/aibianx"
    echo "  $0 update"
    echo "  $0 update /opt/aibianx master"
    echo "  $0 switch main"
    echo "  $0 verify /opt/aibianx"
    echo ""
}

# 主函数
main() {
    local action="$1"
    shift
    
    # 检查Git可用性
    check_git_available
    
    case "$action" in
        "clone")
            clone_project "$@"
            ;;
        "update")
            update_project "$@"
            ;;
        "switch")
            switch_branch "$@"
            ;;
        "verify")
            verify_project "$@"
            ;;
        "help"|"-h"|"--help"|"")
            show_help
            ;;
        *)
            echo -e "${RED}❌ 未知操作: $action${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"