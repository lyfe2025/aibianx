#!/bin/bash

# =============================================================================
# 🚀 AI变现之路 - 一键自动化部署脚本 (无硬编码版本)
# =============================================================================
# 
# 功能：从零开始自动安装、配置并启动完整系统
# 特点：完全动态配置，利用现有工具，避免重复造轮子
# 
# =============================================================================

set -e  # 遇到错误立即退出

# 遵循 deployment-automation.mdc 规则文件 - 绝对禁止硬编码

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 图标定义
ROCKET="🚀"
CHECK="✅"
CROSS="❌"
INFO="ℹ️"
WARNING="⚠️"
GEAR="⚙️"
PACKAGE="📦"

# 动态项目信息 (从环境变量或默认值获取，避免硬编码)
PROJECT_NAME="${PROJECT_NAME:-aibianx}"
REPO_ORG="${REPO_ORG:-lyfe2025}"
REPO_URL="${REPO_URL:-https://github.com/${REPO_ORG}/${PROJECT_NAME}.git}"  # main分支

# 配置文件检查功能
CONFIG_LOADED=false

# =============================================================================
# 工具函数
# =============================================================================

print_header() {
    echo ""
    echo -e "${CYAN}=================================================================${NC}"
    echo -e "${CYAN}        ${ROCKET} AI变现之路 - 一键自动化部署脚本 ${ROCKET}${NC}"
    echo -e "${CYAN}=================================================================${NC}"
    echo ""
    echo -e "${BLUE}${INFO} 项目仓库: ${REPO_URL}${NC}"
    echo -e "${BLUE}${INFO} 部署目标: 完整系统自动化安装${NC}"
    echo ""
}

print_step() {
    echo ""
    echo -e "${PURPLE}${1}${NC}"
    echo -e "${CYAN}----------------------------------------${NC}"
}

print_success() {
    echo -e "${GREEN}${CHECK} ${1}${NC}"
}

print_error() {
    echo -e "${RED}${CROSS} ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} ${1}${NC}"
}

print_info() {
    echo -e "${BLUE}${INFO} ${1}${NC}"
}

# 检查命令是否存在
check_command() {
    if command -v "$1" >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# 检测操作系统
detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        echo "windows"
    else
        echo "unknown"
    fi
}

# 利用现有工具进行依赖检查和安装
install_dependencies() {
    print_step "${PACKAGE} 检查并安装系统依赖 (利用现有工具)"
    
    # 首先检查基本依赖 (Git必须有才能克隆)
    if ! check_command git; then
        print_error "Git未安装，这是克隆项目的前提条件"
        local os=$(detect_os)
        case $os in
            "macos")
                print_info "macOS安装命令: brew install git"
                ;;
            "linux")
                print_info "Linux安装命令: sudo apt-get install git (Ubuntu/Debian)"
                print_info "              sudo yum install git (CentOS/RHEL)"
                ;;
        esac
        print_warning "请安装Git后重新运行此脚本"
        exit 1
    else
        print_success "Git已安装，可以克隆项目"
    fi
    
    print_info "其他依赖将在项目克隆后使用现有工具自动检查和安装"
}

# 克隆项目并加载配置
clone_project() {
    print_step "${ROCKET} 克隆项目代码"
    
    if [ -d "$PROJECT_NAME" ]; then
        print_warning "目录 $PROJECT_NAME 已存在"
        read -p "是否删除现有目录并重新克隆? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm -rf "$PROJECT_NAME"
            print_info "已删除现有目录"
        else
            print_info "使用现有目录"
            return 0
        fi
    fi
    
    print_info "正在克隆仓库: $REPO_URL"
    if git clone "$REPO_URL"; then
        print_success "项目克隆完成"
        
        # 克隆后立即加载项目配置，覆盖环境变量中的值
        load_project_config
    else
        print_error "项目克隆失败，请检查网络连接和仓库地址"
        exit 1
    fi
}

# 加载项目配置 (克隆后调用)
load_project_config() {
    print_step "${GEAR} 加载项目配置"
    
    local config_file="$PROJECT_NAME/deployment/config/deploy.conf"
    
    if [ -f "$config_file" ]; then
        print_info "从配置文件加载设置: $config_file"
        
        # 安全地读取配置文件
        while IFS='=' read -r key value; do
            # 跳过注释和空行
            [[ $key =~ ^[[:space:]]*# ]] && continue
            [[ -z $key ]] && continue
            
            # 移除key和value中的空格，并去除value中的行尾注释
            key=$(echo "$key" | tr -d '[:space:]')
            value=$(echo "$value" | sed 's/^[[:space:]]*//;s/[[:space:]]*#.*//;s/[[:space:]]*$//')
            
            # 导出变量 (如果value包含变量引用，先展开)
            case $key in
                REPO_URL|PROJECT_NAME|REPO_ORG|DOMAIN|MAIL_DOMAIN)
                    eval "export $key=\"$value\""
                    print_success "配置项: $key = $value"
                    ;;
            esac
        done < "$config_file"
        
        CONFIG_LOADED=true
    else
        print_warning "配置文件不存在: $config_file"
        print_info "将使用默认配置继续"
    fi
}

# 进入项目目录
enter_project() {
    print_step "${GEAR} 进入项目目录"
    
    # 检查项目目录是否存在
    if [ ! -d "$PROJECT_NAME" ]; then
        print_error "项目目录不存在: $PROJECT_NAME"
        exit 1
    fi
    
    if cd "$PROJECT_NAME"; then
        print_success "已进入项目目录: $(pwd)"
    else
        print_error "无法进入项目目录: $PROJECT_NAME"
        exit 1
    fi
}

# 检查项目文件
check_project_files() {
    print_step "${INFO} 检查项目文件"
    
    local required_files=("scripts.sh" "deployment/config" "frontend" "backend")
    local missing_files=()
    
    for file in "${required_files[@]}"; do
        if [ -e "$file" ]; then
            print_success "找到: $file"
        else
            missing_files+=("$file")
            print_error "缺失: $file"
        fi
    done
    
    if [ ${#missing_files[@]} -ne 0 ]; then
        print_error "项目文件不完整，请检查仓库"
        exit 1
    fi
    
    print_success "项目文件检查完成"
}

# 使用现有工具进行完整依赖检查和安装
check_and_install_dependencies() {
    print_step "${PACKAGE} 完整依赖检查和安装 (利用现有工具)"
    
    # 利用现有的依赖检查工具
    if [ -f "scripts/tools/check-dependencies.sh" ]; then
        print_info "使用现有依赖检查工具..."
        if ! ./scripts/tools/check-dependencies.sh; then
            print_warning "发现缺失依赖，尝试自动安装..."
            
            # 利用现有的环境安装工具
            if [ -f "scripts/production/install-environment.sh" ]; then
                print_info "使用现有环境安装工具..."
                ./scripts/production/install-environment.sh
                
                # 重新检查
                print_info "重新检查依赖..."
                ./scripts/tools/check-dependencies.sh
            else
                print_error "找不到环境安装工具 scripts/production/install-environment.sh"
                print_info "请手动安装缺失的依赖"
            fi
        fi
    else
        print_warning "找不到依赖检查工具 scripts/tools/check-dependencies.sh"
        print_info "跳过依赖自动检查"
    fi
}

# 执行项目部署 (利用现有工具)
deploy_project() {
    print_step "${ROCKET} 执行项目部署 (利用现有工具)"
    
    # 确保脚本有执行权限
    if [ -f "scripts.sh" ]; then
        chmod +x scripts.sh
        
        # 按照正确的流程：先配置，再启动
        print_info "步骤1: 配置系统 (./scripts.sh deploy config)"
        if ./scripts.sh deploy config; then
            print_success "系统配置完成"
            
            print_info "步骤2: 启动系统 (./scripts.sh deploy start)"
            if ./scripts.sh deploy start; then
                print_success "项目部署完成！"
                
                # 步骤3: 修复BillionMail部署问题 (如果存在)
                print_info "步骤3: 检查并修复BillionMail邮件系统..."
                if [ -f "scripts/billionmail/fix-billionmail-deployment.sh" ]; then
                    ./scripts/billionmail/fix-billionmail-deployment.sh
                else
                    print_warning "BillionMail修复脚本不存在，跳过邮件系统检查"
                fi
            else
                print_warning "启动过程中出现问题，但核心服务可能已运行"
                print_info "您可以手动检查状态: ./scripts.sh tools status"
            fi
        else
            print_error "系统配置失败"
            exit 1
        fi
    else
        print_error "找不到部署脚本 scripts.sh"
        exit 1
    fi
}

# 显示访问信息 (利用现有工具，避免硬编码)
show_access_info() {
    print_step "${CHECK} 部署完成 - 访问信息"
    
    echo ""
    echo -e "${GREEN}🎉 恭喜！AI变现之路项目部署成功！${NC}"
    echo ""
    
    # 利用现有的服务状态显示工具
    if [ -f "scripts/tools/show-all-services.sh" ]; then
        print_info "使用现有工具显示服务状态..."
        ./scripts/tools/show-all-services.sh
    else
        # 回退到基本显示 (仍然避免硬编码)
        echo -e "${CYAN}📋 系统访问地址 (基于配置):${NC}"
        
        # 从配置中读取域名和端口
        local domain="${DOMAIN:-localhost}"
        local frontend_port="${FRONTEND_PORT:-80}"
        local backend_port="${BACKEND_PORT:-1337}"
        local search_port="${MEILISEARCH_PORT:-7700}"
        local email_port="${BILLIONMAIL_PORT:-8080}"
        
        echo -e "${BLUE}  🌐 前端网站:     http://${domain}:${frontend_port}${NC}"
        echo -e "${BLUE}  ⚙️ 后端管理:     http://${domain}:${backend_port}/admin${NC}"
        echo -e "${BLUE}  🔍 搜索引擎:     http://${domain}:${search_port}${NC}"
        echo -e "${BLUE}  📧 邮件系统:     http://${domain}:${email_port}/billion${NC}"
    fi
    
    echo ""
    echo -e "${CYAN}🔧 常用管理命令:${NC}"
    echo -e "${BLUE}  ./scripts.sh tools status    # 检查系统状态${NC}"
    echo -e "${BLUE}  ./scripts.sh tools services  # 查看所有服务${NC}"
    echo -e "${BLUE}  ./scripts.sh deploy stop     # 停止所有服务${NC}"
    echo -e "${BLUE}  ./scripts.sh deploy restart  # 重启所有服务${NC}"
    echo ""
    echo -e "${YELLOW}📖 更多帮助:${NC}"
    echo -e "${BLUE}  ./scripts.sh --help          # 查看完整帮助${NC}"
    echo -e "${BLUE}  docs/                        # 查看项目文档${NC}"
    echo ""
    echo -e "${GREEN}🚀 开始您的AI变现之路吧！${NC}"
    echo ""
}

# =============================================================================
# 主流程
# =============================================================================

main() {
    # 显示头部信息
    print_header
    
    # 基础依赖检查 (仅Git)
    install_dependencies
    
    # 克隆项目并加载配置
    clone_project
    
    # 进入项目目录
    enter_project
    
    # 检查项目文件
    check_project_files
    
    # 使用现有工具进行完整依赖检查和安装
    check_and_install_dependencies
    
    # 执行项目部署 (先配置，再启动)
    deploy_project
    
    # 显示访问信息 (利用现有工具)
    show_access_info
}

# 捕获中断信号
trap 'echo -e "\n${YELLOW}${WARNING} 部署被中断${NC}"; exit 1' INT TERM

# 执行主流程
main "$@"