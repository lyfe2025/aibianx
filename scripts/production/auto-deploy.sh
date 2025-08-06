#!/bin/bash

# AI变现之路 - 全自动生产部署脚本
# 从零开始的完整自动部署流程

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载动态配置 (如果可用)
if [ -f "$SCRIPT_DIR/../tools/load-config.sh" ]; then
    source "$SCRIPT_DIR/../tools/load-config.sh" 2>/dev/null || true
fi

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# 默认配置
DEFAULT_DOMAIN="example.com"
DEFAULT_MAIL_DOMAIN="mail.example.com"
DEFAULT_PROJECT_DIR="/opt/aibianx"
DEFAULT_GIT_URL="https://github.com/lyfe2025/aibianx.git"

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

# 解析命令行参数
parse_arguments() {
    local domain=""
    local mail_domain=""
    local silent=false
    local mode="unified"
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --silent)
                silent=true
                shift
                ;;
            --mode)
                mode="$2"
                shift 2
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            *)
                if [ -z "$domain" ]; then
                    domain="$1"
                elif [ -z "$mail_domain" ]; then
                    mail_domain="$1"
                fi
                shift
                ;;
        esac
    done
    
    # 导出变量供其他函数使用
    export DEPLOY_DOMAIN="${domain:-$DEFAULT_DOMAIN}"
    export DEPLOY_MAIL_DOMAIN="${mail_domain:-$DEFAULT_MAIL_DOMAIN}"
    export DEPLOY_SILENT="$silent"
    export DEPLOY_MODE="$mode"
}

# 显示部署信息
show_deployment_info() {
    echo -e "${GREEN}🚀 AI变现之路 - 全自动生产部署${NC}"
    echo "======================================="
    echo ""
    echo -e "${CYAN}📋 部署配置:${NC}"
    echo "   网站域名: $DEPLOY_DOMAIN"
    echo "   邮件域名: $DEPLOY_MAIL_DOMAIN"
    echo "   部署模式: $DEPLOY_MODE"
    echo "   静默模式: $DEPLOY_SILENT"
    echo ""
    
    if [ "$DEPLOY_SILENT" != "true" ]; then
        echo "按回车键继续，或 Ctrl+C 取消..."
        read -r
    fi
}

# 检测运行环境
detect_environment() {
    log_step "检测运行环境"
    
    local os_type=$(uname -s)
    local os_version=""
    
    case "$os_type" in
        "Linux")
            if [ -f /etc/os-release ]; then
                . /etc/os-release
                os_version="$NAME $VERSION"
            fi
            ;;
        "Darwin")
            os_version="macOS $(sw_vers -productVersion)"
            ;;
        *)
            log_warning "未知操作系统: $os_type"
            ;;
    esac
    
    log_info "操作系统: $os_version"
    log_info "用户: $(whoami)"
    log_info "工作目录: $(pwd)"
    
    # 检查权限
    if [ "$EUID" -eq 0 ]; then
        log_warning "检测到root用户，建议使用普通用户运行"
    fi
    
    # 检查网络连接
    if ping -c 1 google.com &>/dev/null; then
        log_success "网络连接正常"
    else
        log_error "网络连接失败，请检查网络设置"
        exit 1
    fi
}

# 检查和安装基础环境
check_and_install_environment() {
    log_step "检查基础环境"
    
    # 调用环境安装脚本
    if "$SCRIPT_DIR/install-environment.sh" check-only; then
        log_success "基础环境检查通过"
        return 0
    fi
    
    log_warning "检测到缺失的基础环境"
    
    if [ "$DEPLOY_SILENT" != "true" ]; then
        echo "是否自动安装缺失的环境? [y/N]"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            log_error "用户取消安装"
            exit 1
        fi
    fi
    
    log_info "开始自动安装基础环境..."
    if "$SCRIPT_DIR/install-environment.sh" auto; then
        log_success "基础环境安装完成"
    else
        log_error "基础环境安装失败"
        exit 1
    fi
}

# 确认项目目录
confirm_project_directory() {
    log_step "确认项目目录"
    
    local target_dir="$DEFAULT_PROJECT_DIR"
    
    if [ "$DEPLOY_SILENT" != "true" ]; then
        echo "项目将部署到: $target_dir"
        echo "是否使用此目录? [Y/n]"
        read -r response
        if [[ "$response" =~ ^[Nn]$ ]]; then
            echo "请输入目标目录:"
            read -r target_dir
        fi
    fi
    
    export PROJECT_DIR="$target_dir"
    log_info "目标目录: $PROJECT_DIR"
}

# 克隆或更新项目
setup_project() {
    log_step "设置项目代码"
    
    if [ -d "$PROJECT_DIR" ]; then
        log_info "项目目录已存在，更新代码..."
        if "$SCRIPT_DIR/manage-project.sh" update "$PROJECT_DIR"; then
            log_success "项目代码更新完成"
        else
            log_error "项目代码更新失败"
            exit 1
        fi
    else
        log_info "克隆项目代码..."
        if "$SCRIPT_DIR/manage-project.sh" clone "$DEFAULT_GIT_URL" "$PROJECT_DIR"; then
            log_success "项目代码克隆完成"
        else
            log_error "项目代码克隆失败"
            exit 1
        fi
    fi
    
    # 进入项目目录
    cd "$PROJECT_DIR"
    export PROJECT_ROOT="$PROJECT_DIR"
}

# 生成生产配置
generate_production_config() {
    log_step "生成生产配置"
    
    log_info "配置域名: $DEPLOY_DOMAIN"
    log_info "邮件域名: $DEPLOY_MAIL_DOMAIN"
    
    # 调用统一配置管理器
    if "$PROJECT_DIR/deployment/configure-unified-env.sh" integrated "$DEPLOY_DOMAIN" "$DEPLOY_MAIL_DOMAIN"; then
        log_success "生产配置生成完成"
    else
        log_error "生产配置生成失败"
        exit 1
    fi
}

# 验证配置
validate_configuration() {
    log_step "验证配置文件"
    
    local errors=()
    
    # 检查前端配置
    if [ ! -f "$PROJECT_DIR/frontend/.env.local" ]; then
        errors+=("前端配置文件不存在")
    else
        local frontend_domain=$(grep "NEXT_PUBLIC_FRONTEND_DOMAIN=" "$PROJECT_DIR/frontend/.env.local" | cut -d'=' -f2)
        if [ -z "$frontend_domain" ]; then
            errors+=("前端域名配置缺失")
        fi
    fi
    
    # 检查后端配置
    if [ ! -f "$PROJECT_DIR/backend/.env" ]; then
        errors+=("后端配置文件不存在")
    else
        local node_env=$(grep "NODE_ENV=" "$PROJECT_DIR/backend/.env" | cut -d'=' -f2)
        if [ "$node_env" != "production" ]; then
            errors+=("后端环境应设置为production")
        fi
    fi
    
    # 检查Docker Compose文件
    if [ ! -f "$PROJECT_DIR/deployment/docker-compose.unified.yml" ]; then
        if [ ! -f "$PROJECT_DIR/deployment/docker-compose.yml" ]; then
            errors+=("Docker Compose配置文件不存在")
        fi
    fi
    
    # 报告验证结果
    if [ ${#errors[@]} -eq 0 ]; then
        log_success "配置验证通过"
        return 0
    else
        log_error "配置验证失败:"
        for error in "${errors[@]}"; do
            echo "   • $error"
        done
        exit 1
    fi
}

# 执行部署前检查
pre_deploy_check() {
    log_step "部署前检查"
    
    # 检查Docker服务
    if ! docker info &>/dev/null; then
        log_error "Docker服务未运行"
        exit 1
    fi
    
    # 检查端口占用
    local required_ports=("80" "443" "1337" "5432" "7700")
    for port in "${required_ports[@]}"; do
        if netstat -tuln 2>/dev/null | grep -q ":$port "; then
            log_warning "端口 $port 已被占用"
        fi
    done
    
    # 检查磁盘空间
    local available_space=$(df . | awk 'NR==2 {print $4}')
    if [ "$available_space" -lt 2097152 ]; then  # 2GB in KB
        log_error "磁盘空间不足，需要至少2GB可用空间"
        exit 1
    fi
    
    log_success "部署前检查通过"
}

# 执行生产部署
execute_deployment() {
    log_step "执行生产部署"
    
    cd "$PROJECT_DIR"
    
    # 选择Docker Compose文件
    local compose_file="deployment/docker-compose.yml"
    if [ -f "deployment/docker-compose.unified.yml" ]; then
        compose_file="deployment/docker-compose.unified.yml"
    fi
    
    log_info "使用配置文件: $compose_file"
    
    # 构建并启动服务
    log_info "构建Docker镜像..."
    if docker-compose -f "$compose_file" build; then
        log_success "Docker镜像构建完成"
    else
        log_error "Docker镜像构建失败"
        exit 1
    fi
    
    log_info "启动生产服务..."
    if docker-compose -f "$compose_file" up -d; then
        log_success "生产服务启动完成"
    else
        log_error "生产服务启动失败"
        exit 1
    fi
    
    # 等待核心服务启动
    log_info "等待核心服务初始化..."
    sleep 10
    
    # 🚀 启动邮件系统 (BillionMail)
    log_info "启动BillionMail邮件系统..."
    if "$PROJECT_DIR/scripts/billionmail/deploy-billionmail.sh"; then
        log_success "BillionMail邮件系统启动完成"
    else
        log_warning "BillionMail邮件系统启动失败，请稍后手动启动"
        log_info "手动启动命令: $PROJECT_DIR/scripts.sh email start"
    fi
    
    # 等待所有服务完全启动
    log_info "等待所有服务完全初始化..."
    sleep 15
}

# 验证部署状态
verify_deployment() {
    log_step "验证部署状态"
    
    local failed_services=()
    
    # 检查容器状态
    local containers=("postgres" "backend" "frontend")
    for container in "${containers[@]}"; do
        if docker ps --filter "name=$container" --filter "status=running" | grep -q "$container"; then
            log_success "$container - 运行正常"
        else
            log_error "$container - 运行异常"
            failed_services+=("$container")
        fi
    done
    
    # 检查BillionMail容器状态
    log_info "检查BillionMail邮件系统状态..."
    cd "$PROJECT_DIR/BillionMail" 2>/dev/null || true
    if [ -f "docker-compose.yml" ] && docker-compose ps | grep -q "Up"; then
        log_success "BillionMail邮件系统 - 运行正常"
    else
        log_warning "BillionMail邮件系统 - 运行异常或未启动"
        failed_services+=("billionmail")
    fi
    cd "$PROJECT_DIR"
    
    # 检查服务健康状态
    log_info "检查服务健康状态..."
    
    # 等待服务完全启动
    sleep 5
    
    # 检查前端
    FRONTEND_CHECK_URL="${FRONTEND_URL}"
    if curl -f "$FRONTEND_CHECK_URL" &>/dev/null; then
        log_success "前端服务 - 响应正常 ($FRONTEND_CHECK_URL)"
    else
        log_warning "前端服务 - 响应异常 ($FRONTEND_CHECK_URL)"
    fi
    
    # 检查后端
    BACKEND_CHECK_URL="${BACKEND_URL}"
    if curl -f "$BACKEND_CHECK_URL" &>/dev/null; then
        log_success "后端服务 - 响应正常 ($BACKEND_CHECK_URL)"
    else
        log_warning "后端服务 - 响应异常 ($BACKEND_CHECK_URL)"
    fi
    
    # 检查邮件系统管理界面
    if [ -n "${BILLIONMAIL_ADMIN_URL:-}" ]; then
        local billionmail_code=$(curl -s -o /dev/null -w "%{http_code}" "${BILLIONMAIL_ADMIN_URL}" 2>/dev/null || echo "000")
        if echo "$billionmail_code" | grep -qE "^(200|302|404)$"; then
            log_success "BillionMail管理界面 - 响应正常 (${BILLIONMAIL_ADMIN_URL})"
        else
            log_warning "BillionMail管理界面 - 响应异常 (${BILLIONMAIL_ADMIN_URL})"
        fi
    fi
    
    # 报告结果
    if [ ${#failed_services[@]} -eq 0 ]; then
        log_success "部署验证通过"
        return 0
    else
        log_error "以下服务验证失败: ${failed_services[*]}"
        return 1
    fi
}

# 显示部署结果
show_deployment_result() {
    log_step "部署完成"
    
    echo -e "${GREEN}🎉 生产部署完成！${NC}"
    echo "==================="
    echo ""
    echo -e "${CYAN}🌐 访问地址:${NC}"
    echo "   网站首页: https://$DEPLOY_DOMAIN"
    echo "   后台管理: https://$DEPLOY_DOMAIN/admin"
    echo "   API文档: https://$DEPLOY_DOMAIN/documentation"
    echo ""
    echo -e "${CYAN}📧 邮件系统:${NC}"
    echo "   管理界面: https://$DEPLOY_MAIL_DOMAIN:8080/billion"
    echo "   WebMail: https://$DEPLOY_MAIL_DOMAIN:8080/roundcube"
    echo ""
    echo -e "${CYAN}💡 管理命令:${NC}"
    echo "   查看状态: $PROJECT_DIR/scripts.sh production status"
    echo "   查看日志: $PROJECT_DIR/scripts.sh production logs"
    echo "   重启服务: $PROJECT_DIR/scripts.sh production restart"
    echo ""
    echo -e "${YELLOW}🔐 安全提醒:${NC}"
    echo "   • 请及时修改默认密码"
    echo "   • 配置SSL证书"
    echo "   • 设置防火墙规则"
    echo "   • 定期备份数据"
    echo ""
}

# 部署失败回滚
rollback_deployment() {
    log_error "部署失败，执行回滚..."
    
    cd "$PROJECT_DIR" 2>/dev/null || return 1
    
    # 停止服务
    docker-compose down 2>/dev/null || true
    
    # 清理容器
    docker container prune -f 2>/dev/null || true
    
    log_warning "回滚完成"
}

# 错误处理
handle_error() {
    local exit_code=$?
    log_error "部署过程中发生错误 (退出码: $exit_code)"
    rollback_deployment
    exit $exit_code
}

# 显示帮助信息
show_help() {
    echo -e "${GREEN}🚀 AI变现之路 - 全自动生产部署工具${NC}"
    echo "==========================================="
    echo ""
    echo "用法:"
    echo "  $0 [domain] [mail-domain] [选项]"
    echo ""
    echo "参数:"
    echo "  domain      网站域名 (默认: $DEFAULT_DOMAIN)"
    echo "  mail-domain 邮件域名 (默认: $DEFAULT_MAIL_DOMAIN)"
    echo ""
    echo "选项:"
    echo "  --silent    静默模式，不需要用户交互"
    echo "  --mode      部署模式 (unified|separate，默认: unified)"
    echo "  --help, -h  显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0                                    # 使用默认配置"
    echo "  $0 example.com mail.example.com       # 指定域名"
    echo "  $0 example.com mail.example.com --silent  # 静默部署"
    echo ""
    echo "功能说明:"
    echo "  ✅ 自动检测和安装基础环境"
    echo "  ✅ 自动克隆或更新项目代码"
    echo "  ✅ 自动生成生产配置"
    echo "  ✅ 自动执行Docker部署"
    echo "  ✅ 自动验证部署状态"
    echo "  ✅ 部署失败自动回滚"
    echo ""
}

# 主函数
main() {
    # 设置错误处理
    trap handle_error ERR
    
    # 解析命令行参数
    parse_arguments "$@"
    
    # 显示部署信息
    show_deployment_info
    
    # 执行部署流程
    detect_environment
    check_and_install_environment
    confirm_project_directory
    setup_project
    generate_production_config
    validate_configuration
    pre_deploy_check
    execute_deployment
    
    # 验证部署结果
    if verify_deployment; then
        show_deployment_result
    else
        log_error "部署验证失败，请检查服务状态"
        exit 1
    fi
}

# 执行主函数
main "$@"