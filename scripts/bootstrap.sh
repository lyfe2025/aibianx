#!/bin/bash
# AI变现之路 - 一键部署引导脚本
# 使用方法: bash <(curl -s https://raw.githubusercontent.com/lyfe2025/aibianx/master/scripts/bootstrap.sh)

set -e

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_NAME="aibianx"
PROJECT_URL="https://github.com/lyfe2025/aibianx.git"
INSTALL_DIR="/opt/$PROJECT_NAME"
SCRIPT_VERSION="1.0.0"

# 日志函数
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo ""
    echo -e "${CYAN}🔧 $1${NC}"
    echo "================================"
}

# 显示欢迎信息
show_welcome() {
    clear
    echo -e "${GREEN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    🚀 AI变现之路                              ║"
    echo "║                  一键部署引导程序                              ║"
    echo "║                                                              ║"
    echo "║   版本: $SCRIPT_VERSION                                         ║"
    echo "║   项目: $PROJECT_NAME                                          ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    echo -e "${CYAN}🎯 部署流程预览:${NC}"
    echo "   1️⃣  检查并安装基础环境 (Docker, Git等)"
    echo "   2️⃣  自动拉取最新项目代码"
    echo "   3️⃣  进入交互式配置界面"
    echo "   4️⃣  配置域名、数据库等参数"
    echo "   5️⃣  一键启动完整服务"
    echo ""
    echo -e "${YELLOW}💡 提示: 整个过程大约需要5-10分钟${NC}"
    echo ""
    
    # 确认继续
    read -p "🤔 是否继续部署? [Y/n]: " -r
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        echo "👋 部署已取消"
        exit 0
    fi
}

# 检测系统信息
detect_system() {
    log_step "检测系统环境"
    
    # 检测操作系统
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            OS_NAME="$NAME"
            OS_VERSION="$VERSION"
            DISTRO="$ID"
            
            # CentOS特殊检测
            if [[ "$ID" == "centos" ]]; then
                if [[ "$VERSION_ID" == "7" ]]; then
                    log_info "检测到CentOS 7 (使用YUM)"
                    CENTOS_VERSION="7"
                elif [[ "$VERSION_ID" == "8" ]]; then
                    log_info "检测到CentOS 8 (使用DNF)"
                    CENTOS_VERSION="8"
                elif [[ "$ID" == "centos" && "$NAME" == *"Stream"* ]]; then
                    log_info "检测到CentOS Stream (使用DNF)"
                    CENTOS_VERSION="stream"
                fi
            elif [[ "$ID" == "rhel" ]]; then
                log_info "检测到Red Hat Enterprise Linux"
                CENTOS_VERSION="rhel"
            fi
        else
            # 备用检测方法
            if [ -f /etc/centos-release ]; then
                OS_NAME="CentOS"
                OS_VERSION=$(cat /etc/centos-release)
                DISTRO="centos"
                if grep -q "release 7" /etc/centos-release; then
                    CENTOS_VERSION="7"
                elif grep -q "release 8" /etc/centos-release; then
                    CENTOS_VERSION="8"
                fi
            else
                OS_NAME="Linux"
                DISTRO="unknown"
            fi
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS_NAME="macOS"
        OS_VERSION=$(sw_vers -productVersion)
        DISTRO="macos"
    else
        log_error "不支持的操作系统: $OSTYPE"
        exit 1
    fi
    
    log_info "操作系统: $OS_NAME $OS_VERSION"
    log_info "发行版: $DISTRO"
    if [[ -n "$CENTOS_VERSION" ]]; then
        log_info "CentOS版本: $CENTOS_VERSION"
    fi
    log_info "用户: $(whoami)"
    log_info "架构: $(uname -m)"
    
    # 检查网络连接
    if ping -c 1 github.com &>/dev/null; then
        log_success "网络连接正常"
    else
        log_error "网络连接失败，请检查网络设置"
        exit 1
    fi
}

# 检查和安装依赖
install_dependencies() {
    log_step "检查和安装基础依赖"
    
    # 检查sudo权限
    if [ "$EUID" -ne 0 ] && ! sudo -n true 2>/dev/null; then
        log_warning "需要sudo权限安装依赖，请输入密码"
    fi
    
    # 检查并安装Git
    if ! command -v git &> /dev/null; then
        log_info "安装Git..."
        case $DISTRO in
            ubuntu|debian)
                log_info "更新Ubuntu软件包列表..."
                sudo apt update -qq
                log_info "安装Git和必要工具..."
                sudo apt install -y git curl wget software-properties-common
                ;;
            centos|rhel|fedora)
                # CentOS/RHEL优化：智能检测包管理器
                log_info "检测CentOS/RHEL包管理器..."
                if command -v dnf &> /dev/null; then
                    log_info "使用DNF包管理器 (CentOS 8+)..."
                    sudo dnf update -y -q
                    sudo dnf install -y git curl wget epel-release
                    # 安装Development Tools (编译依赖)
                    sudo dnf groupinstall -y "Development Tools"
                elif command -v yum &> /dev/null; then
                    log_info "使用YUM包管理器 (CentOS 7)..."
                    sudo yum update -y -q
                    sudo yum install -y git curl wget epel-release
                    # 安装Development Tools
                    sudo yum groupinstall -y "Development Tools"
                else
                    log_error "未找到合适的包管理器"
                    exit 1
                fi
                ;;
            macos)
                if ! command -v brew &> /dev/null; then
                    log_info "安装Homebrew..."
                    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                fi
                brew install git
                ;;
            *)
                log_error "不支持的系统，请手动安装Git"
                exit 1
                ;;
        esac
        log_success "Git安装完成"
    else
        log_success "Git已安装: $(git --version)"
    fi
    
    # 检查并安装Docker
    if ! command -v docker &> /dev/null; then
        log_info "安装Docker..."
        case $DISTRO in
            ubuntu|debian)
                # Ubuntu优化：使用官方脚本但添加更多检查
                log_info "下载Docker官方安装脚本..."
                if curl -fsSL https://get.docker.com | sudo sh; then
                    sudo usermod -aG docker $USER
                    log_info "配置Docker开机自启..."
                    sudo systemctl enable docker
                    # Ubuntu特殊：确保Docker服务立即可用
                    if sudo systemctl start docker; then
                        log_success "Docker服务启动成功"
                    else
                        log_warning "Docker服务启动可能需要几秒钟..."
                        sleep 3
                        sudo systemctl start docker
                    fi
                else
                    log_error "Docker安装失败，请检查网络连接"
                    exit 1
                fi
                ;;
            centos|rhel|fedora)
                # CentOS/RHEL优化：完整Docker配置
                log_info "CentOS/RHEL Docker安装优化..."
                
                # 移除旧版本Docker (如果存在)
                sudo yum remove -y docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine 2>/dev/null || true
                sudo dnf remove -y docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine 2>/dev/null || true
                
                # 安装Docker
                if curl -fsSL https://get.docker.com | sudo sh; then
                    sudo usermod -aG docker $USER
                    
                    # CentOS特殊：配置SELinux
                    if command -v setsebool &> /dev/null; then
                        log_info "配置SELinux for Docker..."
                        sudo setsebool -P container_manage_cgroup on 2>/dev/null || true
                    fi
                    
                    # 配置防火墙 (firewalld)
                    if systemctl is-active --quiet firewalld; then
                        log_info "配置firewalld for Docker..."
                        sudo firewall-cmd --permanent --zone=public --add-port=80/tcp || true
                        sudo firewall-cmd --permanent --zone=public --add-port=443/tcp || true
                        sudo firewall-cmd --permanent --zone=public --add-port=1337/tcp || true
                        sudo firewall-cmd --permanent --zone=public --add-port=8080/tcp || true
                        sudo firewall-cmd --reload || true
                    fi
                    
                    # 启动Docker服务
                    sudo systemctl enable docker
                    if sudo systemctl start docker; then
                        log_success "Docker服务在CentOS上启动成功"
                    else
                        log_warning "Docker服务启动可能需要几秒钟..."
                        sleep 5
                        sudo systemctl start docker
                    fi
                else
                    log_error "Docker安装失败，请检查网络连接和系统配置"
                    exit 1
                fi
                ;;
            macos)
                log_warning "请从 https://docs.docker.com/desktop/mac/install/ 下载安装Docker Desktop"
                read -p "安装完成后按回车继续..."
                ;;
            *)
                log_error "不支持的系统，请手动安装Docker"
                exit 1
                ;;
        esac
        log_success "Docker安装完成"
    else
        log_success "Docker已安装: $(docker --version)"
    fi
    
    # 检查并安装Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log_info "安装Docker Compose..."
        if [[ "$DISTRO" == "macos" ]]; then
            log_info "Docker Desktop已包含Docker Compose"
        else
            sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
        fi
        log_success "Docker Compose安装完成"
    else
        log_success "Docker Compose已安装: $(docker-compose --version)"
    fi
    
    # 启动Docker服务
    if [[ "$DISTRO" != "macos" ]]; then
        if ! sudo systemctl is-active --quiet docker; then
            log_info "启动Docker服务..."
            sudo systemctl start docker
            sudo systemctl enable docker
        fi
    fi
    
    # 验证Docker运行状态
    if docker info &>/dev/null; then
        log_success "Docker服务运行正常"
    else
        log_error "Docker服务未正常运行"
        if [[ "$DISTRO" != "macos" ]]; then
            log_info "尝试重启Docker服务..."
            sudo systemctl restart docker
            sleep 5
            if docker info &>/dev/null; then
                log_success "Docker服务重启成功"
            else
                log_error "Docker服务启动失败，请检查系统配置"
                exit 1
            fi
        else
            log_error "请确保Docker Desktop已启动并运行"
            exit 1
        fi
    fi
}

# 克隆项目代码
clone_project() {
    log_step "拉取项目代码"
    
    # 检查目标目录
    if [ -d "$INSTALL_DIR" ]; then
        log_warning "目录 $INSTALL_DIR 已存在"
        read -p "🤔 是否删除现有目录并重新克隆? [y/N]: " -r
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            log_info "删除现有目录..."
            sudo rm -rf "$INSTALL_DIR"
        else
            log_info "使用现有目录，更新代码..."
            cd "$INSTALL_DIR"
            git pull origin master || {
                log_error "代码更新失败"
                exit 1
            }
            log_success "代码更新完成"
            return 0
        fi
    fi
    
    # 创建安装目录
    log_info "创建安装目录: $INSTALL_DIR"
    sudo mkdir -p "$INSTALL_DIR"
    sudo chown $USER:$USER "$INSTALL_DIR"
    
    # 克隆项目
    log_info "克隆项目代码..."
    git clone "$PROJECT_URL" "$INSTALL_DIR" || {
        log_error "项目克隆失败"
        exit 1
    }
    
    log_success "项目代码拉取完成"
    
    # 设置权限
    log_info "设置文件权限..."
    sudo chown -R $USER:$USER "$INSTALL_DIR"
    chmod +x "$INSTALL_DIR/scripts.sh"
    chmod +x "$INSTALL_DIR"/scripts/*/*.sh 2>/dev/null || true
    
    log_success "权限设置完成"
}

# 创建快捷方式
create_shortcuts() {
    log_step "创建快捷方式"
    
    # 创建全局命令
    cat > /tmp/aibianx << EOF
#!/bin/bash
cd $INSTALL_DIR && ./scripts.sh "\$@"
EOF
    
    sudo mv /tmp/aibianx /usr/local/bin/aibianx
    sudo chmod +x /usr/local/bin/aibianx
    
    log_success "已创建全局命令: aibianx"
    
    # 添加到PATH (如果不存在)
    if ! echo $PATH | grep -q "/usr/local/bin"; then
        echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc
        echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc 2>/dev/null || true
    fi
}

# 环境检查
check_environment() {
    log_step "最终环境检查"
    
    local errors=()
    
    # 检查Docker
    if ! docker info &>/dev/null; then
        errors+=("Docker服务未运行")
    fi
    
    # 检查项目目录
    if [ ! -d "$INSTALL_DIR" ]; then
        errors+=("项目目录不存在")
    fi
    
    # 检查脚本文件
    if [ ! -f "$INSTALL_DIR/scripts.sh" ]; then
        errors+=("主脚本文件不存在")
    fi
    
    # 报告检查结果
    if [ ${#errors[@]} -eq 0 ]; then
        log_success "环境检查通过"
        return 0
    else
        log_error "环境检查失败:"
        for error in "${errors[@]}"; do
            echo "   • $error"
        done
        return 1
    fi
}

# 启动交互式管理界面
start_interactive_manager() {
    log_step "启动交互式管理界面"
    
    log_success "部署引导完成！"
    echo ""
    echo -e "${CYAN}🎉 恭喜！AI变现之路已成功准备就绪${NC}"
    echo ""
    echo -e "${YELLOW}📋 接下来你可以:${NC}"
    echo "   • 配置域名和环境变量"
    echo "   • 设置数据库参数"
    echo "   • 启动完整服务"
    echo "   • 监控系统状态"
    echo ""
    echo -e "${BLUE}💡 快捷命令:${NC}"
    echo "   全局访问: ${GREEN}aibianx${NC}"
    echo "   本地访问: ${GREEN}cd $INSTALL_DIR && ./scripts.sh${NC}"
    echo ""
    
    read -p "🚀 是否立即进入交互式管理界面? [Y/n]: " -r
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        echo ""
        log_info "正在启动交互式管理界面..."
        sleep 2
        cd "$INSTALL_DIR"
        exec ./scripts.sh
    else
        echo ""
        log_info "稍后可使用以下命令进入管理界面:"
        echo "   ${GREEN}aibianx${NC}"
        echo "   或"
        echo "   ${GREEN}cd $INSTALL_DIR && ./scripts.sh${NC}"
    fi
}

# 错误处理
handle_error() {
    local exit_code=$?
    log_error "部署过程中发生错误 (退出码: $exit_code)"
    echo ""
    echo -e "${YELLOW}🔧 故障排查建议:${NC}"
    echo "   1. 检查网络连接"
    echo "   2. 确认有足够的磁盘空间"
    echo "   3. 验证sudo权限"
    echo "   4. 重新运行部署命令"
    echo ""
    echo -e "${BLUE}📞 获取帮助:${NC}"
    echo "   GitHub Issues: https://github.com/lyfe2025/aibianx/issues"
    echo "   文档: https://github.com/lyfe2025/aibianx/tree/master/docs"
    exit $exit_code
}

# 主函数
main() {
    # 设置错误处理
    trap handle_error ERR
    
    # 执行部署流程
    show_welcome
    detect_system
    install_dependencies
    clone_project
    create_shortcuts
    
    # 最终检查
    if check_environment; then
        start_interactive_manager
    else
        log_error "环境配置失败，请检查系统状态"
        exit 1
    fi
}

# 执行主函数
main "$@"