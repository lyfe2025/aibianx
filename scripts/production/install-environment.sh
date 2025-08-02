#!/bin/bash

# AI变现之路 - 生产环境安装脚本
# 自动检测和安装所需的基础环境

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

# 获取系统信息
get_system_info() {
    local os_type=$(uname -s)
    local os_version=""
    
    case "$os_type" in
        "Linux")
            if [ -f /etc/os-release ]; then
                . /etc/os-release
                echo "linux:$ID:$VERSION_ID"
            else
                echo "linux:unknown:unknown"
            fi
            ;;
        "Darwin")
            local mac_version=$(sw_vers -productVersion)
            echo "macos:darwin:$mac_version"
            ;;
        *)
            echo "unknown:$os_type:unknown"
            ;;
    esac
}

# 获取包管理器
get_package_manager() {
    local os_info=$(get_system_info)
    local os_type="${os_info%%:*}"
    local distro="${os_info#*:}"
    distro="${distro%%:*}"
    
    case "$os_type" in
        "linux")
            case "$distro" in
                ubuntu|debian) echo "apt" ;;
                centos|rhel|fedora) echo "dnf" ;;
                opensuse*) echo "zypper" ;;
                arch) echo "pacman" ;;
                *) echo "unknown" ;;
            esac
            ;;
        "macos")
            echo "brew"
            ;;
        *)
            echo "unknown"
            ;;
    esac
}

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 检测必需工具
check_required_tools() {
    local mode=${1:-"auto"}  # auto, manual, check-only
    local os_info=$(get_system_info)
    local os_type="${os_info%%:*}"
    local missing_tools=()
    local failed_installs=()
    
    echo -e "${BLUE}🔍 检测系统环境...${NC}"
    echo "   操作系统: $os_info"
    echo ""
    
    # 检测必需工具
    local required_tools=(
        "git:Git版本控制"
        "docker:Docker容器引擎"
        "curl:HTTP客户端工具"
        "openssl:加密工具库"
        "tar:打包工具"
        "gzip:压缩工具"
    )
    
    local optional_tools=(
        "node:Node.js运行时"
        "npm:Node.js包管理器"
        "psql:PostgreSQL客户端"
    )
    
    # 检测必需工具
    echo -e "${CYAN}🔧 检测必需工具...${NC}"
    for tool_info in "${required_tools[@]}"; do
        local tool="${tool_info%%:*}"
        local desc="${tool_info##*:}"
        
        if ! command_exists "$tool"; then
            echo "   ❌ $desc ($tool) - 未安装"
            missing_tools+=("$tool")
        else
            local version=$($tool --version 2>/dev/null | head -1)
            echo "   ✅ $desc ($tool) - 已安装 ($version)"
        fi
    done
    
    # 特殊检测Docker Compose
    if command_exists docker; then
        if docker compose version &>/dev/null; then
            local compose_version=$(docker compose version --short 2>/dev/null)
            echo "   ✅ Docker Compose - 已安装 ($compose_version)"
        else
            echo "   ❌ Docker Compose - 未安装"
            missing_tools+=("docker-compose")
        fi
    fi
    
    # 检测可选工具
    echo ""
    echo -e "${CYAN}🔧 检测可选工具...${NC}"
    for tool_info in "${optional_tools[@]}"; do
        local tool="${tool_info%%:*}"
        local desc="${tool_info##*:}"
        
        if command_exists "$tool"; then
            local version=$($tool --version 2>/dev/null | head -1)
            echo "   ✅ $desc ($tool) - 已安装 ($version)"
        else
            echo "   ⚠️  $desc ($tool) - 未安装 (可选)"
        fi
    done
    
    echo ""
    
    # 处理缺失工具
    if [ ${#missing_tools[@]} -eq 0 ]; then
        echo -e "${GREEN}🎉 所有必需工具已安装，环境检查通过！${NC}"
        return 0
    fi
    
    echo -e "${YELLOW}⚠️  检测到缺失工具: ${missing_tools[*]}${NC}"
    
    if [ "$mode" = "check-only" ]; then
        echo -e "${RED}❌ 环境检查模式，不执行安装${NC}"
        return 1
    fi
    
    if [ "$mode" = "manual" ]; then
        echo ""
        echo "请手动安装以下工具后重新运行："
        for tool in "${missing_tools[@]}"; do
            echo "  - $tool"
        done
        return 1
    fi
    
    # 自动安装模式
    echo ""
    echo -e "${GREEN}🚀 开始自动安装缺失工具...${NC}"
    
    case "$os_type" in
        "linux")
            install_linux_tools "${missing_tools[@]}"
            ;;
        "macos")
            install_macos_tools "${missing_tools[@]}"
            ;;
        *)
            echo -e "${RED}❌ 不支持在 $os_type 系统上自动安装${NC}"
            echo "请手动安装缺失工具后重新运行"
            return 1
            ;;
    esac
    
    # 重新验证安装结果
    echo ""
    echo -e "${BLUE}🔍 验证安装结果...${NC}"
    
    for tool in "${missing_tools[@]}"; do
        if command_exists "$tool"; then
            echo "   ✅ $tool - 安装成功"
        else
            echo "   ❌ $tool - 安装失败"
            failed_installs+=("$tool")
        fi
    done
    
    if [ ${#failed_installs[@]} -eq 0 ]; then
        echo ""
        echo -e "${GREEN}🎉 所有工具安装成功，环境配置完成！${NC}"
        return 0
    else
        echo ""
        echo -e "${RED}❌ 以下工具安装失败: ${failed_installs[*]}${NC}"
        echo "请手动安装后重新运行"
        return 1
    fi
}

# Linux环境安装
install_linux_tools() {
    local tools=("$@")
    local pkg_manager=$(get_package_manager)
    
    echo -e "${BLUE}🐧 Linux环境自动安装 (包管理器: $pkg_manager)${NC}"
    
    # 更新包索引
    echo "📦 更新包索引..."
    case "$pkg_manager" in
        "apt")
            sudo apt update
            ;;
        "dnf")
            sudo dnf makecache
            ;;
        "pacman")
            sudo pacman -Sy
            ;;
        "zypper")
            sudo zypper refresh
            ;;
    esac
    
    # 安装工具
    for tool in "${tools[@]}"; do
        echo -e "${CYAN}🔧 安装 $tool...${NC}"
        
        case "$tool" in
            "git")
                install_git_linux "$pkg_manager"
                ;;
            "docker")
                install_docker_linux "$pkg_manager"
                ;;
            "docker-compose")
                install_docker_compose_linux
                ;;
            "curl"|"openssl"|"tar"|"gzip")
                install_basic_tool_linux "$pkg_manager" "$tool"
                ;;
            *)
                install_basic_tool_linux "$pkg_manager" "$tool"
                ;;
        esac
    done
}

# macOS环境安装
install_macos_tools() {
    local tools=("$@")
    
    echo -e "${BLUE}🍎 macOS环境自动安装${NC}"
    
    # 检查Homebrew
    if ! command_exists brew; then
        echo "🍺 安装Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # 更新Homebrew
    echo "🔄 更新Homebrew..."
    brew update
    
    # 安装工具
    for tool in "${tools[@]}"; do
        echo -e "${CYAN}🔧 安装 $tool...${NC}"
        
        case "$tool" in
            "git")
                brew install git
                ;;
            "docker")
                echo "🐳 安装Docker Desktop for Mac..."
                echo "请访问 https://docs.docker.com/desktop/mac/install/ 手动安装Docker Desktop"
                echo "或使用: brew install --cask docker"
                ;;
            "docker-compose")
                echo "🐳 Docker Compose包含在Docker Desktop中"
                ;;
            *)
                brew install "$tool"
                ;;
        esac
    done
}

# Linux Git安装
install_git_linux() {
    local pkg_manager="$1"
    case "$pkg_manager" in
        "apt") sudo apt install -y git ;;
        "dnf") sudo dnf install -y git ;;
        "pacman") sudo pacman -S --noconfirm git ;;
        "zypper") sudo zypper install -y git ;;
    esac
}

# Linux Docker安装
install_docker_linux() {
    local pkg_manager="$1"
    echo "🐳 安装Docker..."
    
    case "$pkg_manager" in
        "apt")
            # Ubuntu/Debian Docker安装
            curl -fsSL https://get.docker.com -o get-docker.sh
            sudo sh get-docker.sh
            sudo usermod -aG docker $USER
            rm get-docker.sh
            ;;
        "dnf")
            sudo dnf install -y docker-ce docker-ce-cli containerd.io
            sudo systemctl enable docker
            sudo systemctl start docker
            sudo usermod -aG docker $USER
            ;;
        *)
            echo "使用Docker官方安装脚本..."
            curl -fsSL https://get.docker.com -o get-docker.sh
            sudo sh get-docker.sh
            sudo usermod -aG docker $USER
            rm get-docker.sh
            ;;
    esac
}

# Linux Docker Compose安装
install_docker_compose_linux() {
    echo "🐳 安装Docker Compose..."
    # Docker Compose现在通常包含在Docker中
    echo "Docker Compose应该已经包含在Docker安装中"
}

# Linux基础工具安装
install_basic_tool_linux() {
    local pkg_manager="$1"
    local tool="$2"
    
    case "$pkg_manager" in
        "apt") sudo apt install -y "$tool" ;;
        "dnf") sudo dnf install -y "$tool" ;;
        "pacman") sudo pacman -S --noconfirm "$tool" ;;
        "zypper") sudo zypper install -y "$tool" ;;
    esac
}

# 主函数
main() {
    local mode="${1:-auto}"
    
    echo -e "${GREEN}🚀 AI变现之路 - 生产环境安装工具${NC}"
    echo "========================================"
    echo ""
    
    case "$mode" in
        "check-only")
            echo "🔍 环境检查模式..."
            check_required_tools "check-only"
            ;;
        "manual")
            echo "📋 手动安装指导模式..."
            check_required_tools "manual"
            ;;
        "auto"|*)
            echo "🚀 自动安装模式..."
            check_required_tools "auto"
            ;;
    esac
}

# 执行主函数
main "$@"