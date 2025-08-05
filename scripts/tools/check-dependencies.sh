#!/bin/bash

# AI变现之路 - 系统依赖检查工具
# 检查Git、Docker、Docker Compose、Node.js等必要依赖

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# 检测操作系统
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/debian_version ]; then
            echo "ubuntu"
        elif [ -f /etc/redhat-release ]; then
            echo "centos"
        else
            echo "linux"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    else
        echo "unknown"
    fi
}

# 智能安装建议
show_install_suggestion() {
    local missing_tools=("$@")
    
    echo ""
    echo -e "${YELLOW}🔧 发现缺失的依赖，建议使用自动安装:${NC}"
    echo ""
    
    # 检查是否存在自动安装脚本
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local project_root="$(cd "$script_dir/../.." && pwd)"
    local install_script="$project_root/scripts/production/install-environment.sh"
    
    if [ -f "$install_script" ]; then
        echo -e "${GREEN}🚀 推荐使用项目内置的自动安装脚本:${NC}"
        echo ""
        echo -e "${CYAN}   方式1: 自动安装所有缺失的依赖${NC}"
        echo "   ./scripts/production/install-environment.sh ${missing_tools[*]}"
        echo ""
        echo -e "${CYAN}   方式2: 交互式安装 (推荐)${NC}"
        echo "   ./scripts/production/install-environment.sh"
        echo ""
        echo -e "${BLUE}💡 自动安装脚本特性:${NC}"
        echo "   • 自动检测操作系统和版本"
        echo "   • 使用系统推荐的包管理器"
        echo "   • 配置正确的软件源和密钥"
        echo "   • 自动启动和配置服务"
        echo "   • 验证安装结果"
    else
        echo -e "${YELLOW}⚠️  未找到自动安装脚本，建议手动安装:${NC}"
        for tool in "${missing_tools[@]}"; do
            case $tool in
                "git") echo "   • Git: 访问 https://git-scm.com/downloads" ;;
                "docker") echo "   • Docker: 访问 https://docs.docker.com/get-docker/" ;;
                "docker-compose") echo "   • Docker Compose: 访问 https://docs.docker.com/compose/install/" ;;
                "node") echo "   • Node.js: 访问 https://nodejs.org (建议LTS版本)" ;;
            esac
        done
    fi
}

# 检查单个依赖
check_dependency() {
    local cmd=$1
    local name=$2
    local check_service=${3:-false}
    
    echo "🔍 检查$name..."
    if ! command -v $cmd &> /dev/null; then
        echo "❌ $name 未安装"
        return 1
    else
        local version=""
        case $cmd in
            "git")
                version=$(git --version | awk '{print $3}')
                ;;
            "docker")
                version=$(docker --version | awk '{print $3}' | sed 's/,//')
                ;;
            "docker-compose")
                version=$(docker-compose --version | awk '{print $3}' | sed 's/,//')
                ;;
            "node")
                version=$(node --version)
                ;;
        esac
        echo "✅ $name 版本: $version"
        
        # 特殊检查
        if [ "$cmd" = "docker" ] && [ "$check_service" = "true" ]; then
            if ! docker info &> /dev/null; then
                echo "⚠️  Docker 服务未运行"
                local os=$(detect_os)
                case $os in
                    "ubuntu"|"centos")
                        echo "💡 启动Docker服务: sudo systemctl start docker"
                        ;;
                    "macos")
                        echo "💡 请启动 Docker Desktop 应用"
                        ;;
                esac
                return 1
            else
                echo "✅ Docker 服务运行正常"
            fi
        fi
        
        if [ "$cmd" = "node" ]; then
            # 检查Node.js版本是否满足要求 (>=18)
            NODE_MAJOR_VERSION=$(echo $version | cut -d'.' -f1 | sed 's/v//')
            if [ "$NODE_MAJOR_VERSION" -lt 18 ]; then
                echo "⚠️  Node.js 版本过低，建议升级到 18+ 版本"
                echo "💡 当前版本: $version，建议版本: v18+ 或 v20+"
            fi
        fi
        
        return 0
    fi
}

# 主函数
main() {
    echo -e "${CYAN}🔍 AI变现之路 - 系统依赖检查${NC}"
    echo "=================================="
    
    # 检测操作系统
    OS=$(detect_os)
    echo "🖥️  检测到操作系统: $OS"
    echo ""
    
    # 依赖检查结果
    missing_tools=()
    
    # 检查所有必要依赖
    if ! check_dependency "git" "Git"; then
        missing_tools+=("git")
    fi
    echo ""
    
    if ! check_dependency "docker" "Docker" "true"; then
        missing_tools+=("docker")
    fi
    echo ""
    
    if ! check_dependency "docker-compose" "Docker Compose"; then
        missing_tools+=("docker-compose")
    fi
    echo ""
    
    if ! check_dependency "node" "Node.js"; then
        missing_tools+=("node")
    fi
    echo ""
    
    # 检查npm
    echo "🔍 检查npm..."
    if ! command -v npm &> /dev/null; then
        echo "❌ npm 未安装，通常随Node.js一起安装"
        if [[ ! " ${missing_tools[*]} " =~ " node " ]]; then
            missing_tools+=("npm")
        fi
    else
        echo "✅ npm 版本: $(npm --version)"
    fi
    
    echo ""
    echo "=================================="
    
    # 显示结果
    if [ ${#missing_tools[@]} -gt 0 ]; then
        echo -e "${RED}❌ 发现缺失的依赖: ${missing_tools[*]}${NC}"
        show_install_suggestion "${missing_tools[@]}"
        exit 1
    else
        echo -e "${GREEN}🎉 所有系统依赖检查通过！${NC}"
        echo -e "${BLUE}✅ 您的系统已准备好运行 AI变现之路 项目${NC}"
        exit 0
    fi
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi