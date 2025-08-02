#!/bin/bash

# AI变现之路 - 生产环境部署脚本
# 支持unified和separate部署模式，包含部署前检查和回滚机制

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# 部署配置
DEPLOY_MODE=""
DEPLOYMENT_TIMESTAMP=""
BACKUP_DIR=""

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

# 检查Docker环境
check_docker_environment() {
    log_step "检查Docker环境"
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker未安装"
        exit 1
    fi
    
    if ! docker info &>/dev/null; then
        log_error "Docker服务未运行"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &>/dev/null; then
        log_error "Docker Compose未安装"
        exit 1
    fi
    
    log_success "Docker环境检查通过"
}

# 验证配置文件
validate_configuration() {
    log_step "验证配置文件"
    
    local errors=()
    
    # 检查前端配置
    if [ ! -f "$PROJECT_ROOT/frontend/.env.local" ]; then
        errors+=("前端配置文件不存在: frontend/.env.local")
    else
        local frontend_domain=$(grep "NEXT_PUBLIC_FRONTEND_DOMAIN=" "$PROJECT_ROOT/frontend/.env.local" | cut -d'=' -f2)
        if [ -z "$frontend_domain" ]; then
            errors+=("前端域名配置缺失")
        fi
        log_info "前端域名: $frontend_domain"
    fi
    
    # 检查后端配置
    if [ ! -f "$PROJECT_ROOT/backend/.env" ]; then
        errors+=("后端配置文件不存在: backend/.env")
    else
        local node_env=$(grep "NODE_ENV=" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)
        if [ "$node_env" != "production" ]; then
            errors+=("后端环境应设置为production，当前为: $node_env")
        fi
        log_info "后端环境: $node_env"
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

# 选择Docker Compose文件
select_compose_file() {
    local mode="$1"
    local compose_file=""
    
    case "$mode" in
        "unified")
            if [ -f "$PROJECT_ROOT/deployment/docker-compose.unified.yml" ]; then
                compose_file="$PROJECT_ROOT/deployment/docker-compose.unified.yml"
            elif [ -f "$PROJECT_ROOT/deployment/docker-compose.yml" ]; then
                compose_file="$PROJECT_ROOT/deployment/docker-compose.yml"
            fi
            ;;
        "separate")
            if [ -f "$PROJECT_ROOT/deployment/docker-compose.separate.yml" ]; then
                compose_file="$PROJECT_ROOT/deployment/docker-compose.separate.yml"
            elif [ -f "$PROJECT_ROOT/deployment/docker-compose.yml" ]; then
                compose_file="$PROJECT_ROOT/deployment/docker-compose.yml"
            fi
            ;;
        *)
            # 自动选择
            if [ -f "$PROJECT_ROOT/deployment/docker-compose.unified.yml" ]; then
                compose_file="$PROJECT_ROOT/deployment/docker-compose.unified.yml"
                mode="unified"
            elif [ -f "$PROJECT_ROOT/deployment/docker-compose.yml" ]; then
                compose_file="$PROJECT_ROOT/deployment/docker-compose.yml"
                mode="unified"
            fi
            ;;
    esac
    
    if [ -z "$compose_file" ]; then
        log_error "找不到Docker Compose配置文件"
        exit 1
    fi
    
    export DEPLOY_MODE="$mode"
    echo "$compose_file"
}

# 部署前检查
pre_deploy_check() {
    log_step "部署前检查"
    
    local errors=()
    
    # 检查端口占用
    local required_ports=("80" "443" "1337" "5432" "7700")
    for port in "${required_ports[@]}"; do
        if netstat -tuln 2>/dev/null | grep -q ":$port " && [ "$port" != "80" ]; then
            log_warning "端口 $port 已被占用"
        fi
    done
    
    # 检查磁盘空间
    local available_space=$(df "$PROJECT_ROOT" | awk 'NR==2 {print $4}')
    if [ "$available_space" -lt 2097152 ]; then  # 2GB in KB
        errors+=("磁盘空间不足，需要至少2GB可用空间")
    fi
    
    # 检查内存
    if command -v free &>/dev/null; then
        local available_memory=$(free -m | awk 'NR==2{print $7}')
        if [ "$available_memory" -lt 1024 ]; then  # 1GB
            log_warning "可用内存不足1GB，可能影响性能"
        fi
    fi
    
    # 检查项目文件完整性
    local required_files=(
        "frontend/package.json"
        "backend/package.json"
        "frontend/.env.local"
        "backend/.env"
    )
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$PROJECT_ROOT/$file" ]; then
            errors+=("缺失文件: $file")
        fi
    done
    
    # 报告检查结果
    if [ ${#errors[@]} -eq 0 ]; then
        log_success "部署前检查通过"
        return 0
    else
        log_error "部署前检查发现问题:"
        for error in "${errors[@]}"; do
            echo "   • $error"
        done
        exit 1
    fi
}

# 创建部署备份
create_deployment_backup() {
    log_step "创建部署备份"
    
    export DEPLOYMENT_TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    export BACKUP_DIR="$PROJECT_ROOT/backups/deployment_$DEPLOYMENT_TIMESTAMP"
    
    # 创建备份目录
    mkdir -p "$BACKUP_DIR"
    
    # 备份配置文件
    log_info "备份配置文件..."
    if [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
        cp "$PROJECT_ROOT/frontend/.env.local" "$BACKUP_DIR/frontend.env.local.backup"
    fi
    
    if [ -f "$PROJECT_ROOT/backend/.env" ]; then
        cp "$PROJECT_ROOT/backend/.env" "$BACKUP_DIR/backend.env.backup"
    fi
    
    # 备份现有容器状态
    log_info "备份容器状态..."
    docker ps -a --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" > "$BACKUP_DIR/containers_before.txt" 2>/dev/null || true
    
    # 备份Docker网络
    docker network ls > "$BACKUP_DIR/networks_before.txt" 2>/dev/null || true
    
    log_success "部署备份创建完成: $BACKUP_DIR"
}

# 执行unified部署
deploy_unified() {
    local compose_file="$1"
    
    log_step "执行整合部署 (Unified)"
    
    cd "$PROJECT_ROOT"
    
    log_info "使用配置文件: $compose_file"
    
    # 停止现有服务
    log_info "停止现有服务..."
    docker-compose -f "$compose_file" down 2>/dev/null || true
    
    # 清理旧镜像和容器
    log_info "清理旧资源..."
    docker container prune -f 2>/dev/null || true
    docker image prune -f 2>/dev/null || true
    
    # 构建镜像
    log_info "构建Docker镜像..."
    if docker-compose -f "$compose_file" build --no-cache; then
        log_success "镜像构建完成"
    else
        log_error "镜像构建失败"
        return 1
    fi
    
    # 启动服务
    log_info "启动生产服务..."
    if docker-compose -f "$compose_file" up -d; then
        log_success "服务启动完成"
    else
        log_error "服务启动失败"
        return 1
    fi
    
    # 等待服务初始化
    log_info "等待服务初始化..."
    sleep 15
    
    return 0
}

# 执行separate部署
deploy_separate() {
    local compose_file="$1"
    
    log_step "执行分离部署 (Separate)"
    
    cd "$PROJECT_ROOT"
    
    log_info "使用配置文件: $compose_file"
    
    # 分步启动服务
    log_info "启动数据库服务..."
    docker-compose -f "$compose_file" up -d postgres redis
    
    log_info "等待数据库启动..."
    sleep 10
    
    log_info "启动搜索引擎..."
    docker-compose -f "$compose_file" up -d meilisearch
    
    log_info "等待搜索引擎启动..."
    sleep 5
    
    log_info "启动后端服务..."
    docker-compose -f "$compose_file" up -d backend
    
    log_info "等待后端启动..."
    sleep 10
    
    log_info "启动前端服务..."
    docker-compose -f "$compose_file" up -d frontend
    
    log_info "等待前端启动..."
    sleep 5
    
    log_success "分离部署完成"
    return 0
}

# 部署后验证
post_deploy_verification() {
    log_step "部署后验证"
    
    local failed_services=()
    local max_attempts=12
    local attempt=0
    
    # 等待服务完全启动
    log_info "等待服务完全启动..."
    sleep 10
    
    # 检查容器状态
    log_info "检查容器状态..."
    local containers=("postgres" "backend" "frontend")
    for container in "${containers[@]}"; do
        if docker ps --filter "name=$container" --filter "status=running" | grep -q "$container"; then
            log_success "$container - 运行正常"
        else
            log_error "$container - 运行异常"
            failed_services+=("$container")
        fi
    done
    
    # 健康检查
    log_info "执行健康检查..."
    
    # 检查前端响应
    while [ $attempt -lt $max_attempts ]; do
        if curl -f "http://localhost:3000" &>/dev/null || curl -f "http://localhost" &>/dev/null; then
            log_success "前端服务 - 响应正常"
            break
        else
            attempt=$((attempt + 1))
            if [ $attempt -eq $max_attempts ]; then
                log_warning "前端服务 - 响应超时"
                failed_services+=("frontend-health")
            else
                log_info "等待前端服务... ($attempt/$max_attempts)"
                sleep 5
            fi
        fi
    done
    
    # 重置attempt计数
    attempt=0
    
    # 检查后端响应
    while [ $attempt -lt $max_attempts ]; do
        if curl -f "http://localhost:1337" &>/dev/null; then
            log_success "后端服务 - 响应正常"
            break
        else
            attempt=$((attempt + 1))
            if [ $attempt -eq $max_attempts ]; then
                log_warning "后端服务 - 响应超时"
                failed_services+=("backend-health")
            else
                log_info "等待后端服务... ($attempt/$max_attempts)"
                sleep 5
            fi
        fi
    done
    
    # 报告验证结果
    if [ ${#failed_services[@]} -eq 0 ]; then
        log_success "部署验证通过"
        return 0
    else
        log_error "以下服务验证失败: ${failed_services[*]}"
        return 1
    fi
}

# 回滚部署
rollback_deployment() {
    log_step "执行部署回滚"
    
    if [ -z "$BACKUP_DIR" ] || [ ! -d "$BACKUP_DIR" ]; then
        log_error "备份目录不存在，无法执行回滚"
        return 1
    fi
    
    cd "$PROJECT_ROOT"
    
    # 停止当前服务
    log_info "停止当前服务..."
    local compose_file=$(select_compose_file "$DEPLOY_MODE")
    docker-compose -f "$compose_file" down 2>/dev/null || true
    
    # 恢复配置文件
    log_info "恢复配置文件..."
    if [ -f "$BACKUP_DIR/frontend.env.local.backup" ]; then
        cp "$BACKUP_DIR/frontend.env.local.backup" "$PROJECT_ROOT/frontend/.env.local"
        log_success "前端配置已恢复"
    fi
    
    if [ -f "$BACKUP_DIR/backend.env.backup" ]; then
        cp "$BACKUP_DIR/backend.env.backup" "$PROJECT_ROOT/backend/.env"
        log_success "后端配置已恢复"
    fi
    
    # 清理失败的容器
    log_info "清理失败的容器..."
    docker container prune -f 2>/dev/null || true
    
    log_success "回滚完成"
    log_info "备份文件保存在: $BACKUP_DIR"
}

# 显示部署结果
show_deployment_result() {
    log_step "部署完成"
    
    echo -e "${GREEN}🎉 生产部署成功！${NC}"
    echo "=================="
    echo ""
    echo -e "${CYAN}📊 部署信息:${NC}"
    echo "   部署模式: $DEPLOY_MODE"
    echo "   部署时间: $DEPLOYMENT_TIMESTAMP"
    echo "   备份位置: $BACKUP_DIR"
    echo ""
    
    # 获取域名信息
    local frontend_domain="localhost"
    if [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
        frontend_domain=$(grep "NEXT_PUBLIC_FRONTEND_DOMAIN=" "$PROJECT_ROOT/frontend/.env.local" | cut -d'=' -f2 || echo "localhost")
    fi
    
    echo -e "${CYAN}🌐 访问地址:${NC}"
    echo "   网站首页: https://$frontend_domain"
    echo "   后台管理: https://$frontend_domain/admin"
    echo "   API文档: https://$frontend_domain/documentation"
    echo ""
    
    echo -e "${CYAN}💡 管理命令:${NC}"
    echo "   查看状态: ./scripts.sh production status"
    echo "   查看日志: ./scripts.sh production logs"
    echo "   重启服务: ./scripts.sh production restart"
    echo ""
    
    echo -e "${YELLOW}🔐 安全提醒:${NC}"
    echo "   • 请及时修改默认密码"
    echo "   • 配置SSL证书"
    echo "   • 设置防火墙规则"
    echo "   • 定期备份数据"
    echo ""
}

# 统一模式部署
deploy_unified() {
    local compose_file="$1"
    
    log_step "执行统一部署"
    
    # 如果有setup-unified-deployment.sh，优先使用
    if [ -f "$PROJECT_ROOT/deployment/setup-unified-deployment.sh" ]; then
        log_info "使用统一部署脚本..."
        
        # 获取域名配置
        local domain=$(grep "NEXT_PUBLIC_FRONTEND_DOMAIN=" "$PROJECT_ROOT/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "yourdomain.com")
        local mail_domain=$(grep "MAIL_DOMAIN=" "$PROJECT_ROOT/backend/.env" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "mail.$domain")
        
        # 执行统一部署
        cd "$PROJECT_ROOT/deployment"
        if ./setup-unified-deployment.sh "$domain" "$mail_domain"; then
            log_success "统一部署完成"
            return 0
        else
            log_error "统一部署失败"
            return 1
        fi
    else
        # 使用标准docker-compose部署
        log_info "使用Docker Compose统一部署..."
        
        # 停止现有服务
        if docker compose -f "$compose_file" ps -q 2>/dev/null | grep -q .; then
            log_info "停止现有服务..."
            docker compose -f "$compose_file" down
        fi
        
        # 构建并启动服务
        log_info "构建并启动所有服务..."
        if docker compose -f "$compose_file" up -d --build; then
            log_success "服务启动成功"
            return 0
        else
            log_error "服务启动失败"
            return 1
        fi
    fi
}

# 分离模式部署
deploy_separate() {
    local compose_file="$1"
    
    log_step "执行分离部署"
    
    # 分步启动服务
    local services=("postgres" "redis" "meilisearch" "backend" "frontend" "nginx")
    
    for service in "${services[@]}"; do
        log_info "启动服务: $service"
        if docker compose -f "$compose_file" up -d "$service"; then
            log_info "等待服务稳定..."
            sleep 5
        else
            log_error "服务 $service 启动失败"
            return 1
        fi
    done
    
    log_success "分离部署完成"
    return 0
}

# 显示帮助信息
show_help() {
    echo -e "${GREEN}🚀 AI变现之路 - 生产部署工具${NC}"
    echo "================================="
    echo ""
    echo "用法:"
    echo "  $0 <mode> [options]"
    echo ""
    echo "部署模式:"
    echo "  unified    整合部署 (推荐) - 所有服务在一个Docker网络中"
    echo "  separate   分离部署 - 服务分步启动，更好的控制"
    echo "  check      检查部署状态"
    echo ""
    echo "选项:"
    echo "  --force    强制部署，跳过某些检查"
    echo "  --rebuild  重新构建所有镜像"
    echo ""
    echo "示例:"
    echo "  $0 unified              # 整合部署"
    echo "  $0 separate             # 分离部署"
    echo "  $0 check                # 检查部署状态"
    echo "  $0 unified --rebuild    # 重新构建并部署"
    echo ""
    echo "功能说明:"
    echo "  ✅ 自动选择最佳Docker Compose配置"
    echo "  ✅ 部署前完整检查"
    echo "  ✅ 自动创建部署备份"
    echo "  ✅ 部署后健康验证"
    echo "  ✅ 失败自动回滚"
    echo ""
}

# 主函数
main() {
    local mode="${1:-unified}"
    local force=false
    local rebuild=false
    
    # 解析参数
    shift
    while [[ $# -gt 0 ]]; do
        case $1 in
            --force)
                force=true
                shift
                ;;
            --rebuild)
                rebuild=true
                shift
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            *)
                echo -e "${RED}❌ 未知参数: $1${NC}"
                show_help
                exit 1
                ;;
        esac
    done
    
    echo -e "${GREEN}🚀 AI变现之路 - 生产环境部署${NC}"
    echo "==============================="
    echo ""
    
    case "$mode" in
        "unified"|"separate")
            # 设置错误处理
            trap 'rollback_deployment' ERR
            
            # 执行部署流程
            check_docker_environment
            validate_configuration
            
            local compose_file=$(select_compose_file "$mode")
            log_info "部署模式: $DEPLOY_MODE"
            log_info "配置文件: $compose_file"
            
            if [ "$force" != "true" ]; then
                pre_deploy_check
            fi
            
            create_deployment_backup
            
            if [ "$mode" = "unified" ]; then
                deploy_unified "$compose_file"
            else
                deploy_separate "$compose_file"
            fi
            
            if post_deploy_verification; then
                show_deployment_result
            else
                log_error "部署验证失败，执行回滚"
                rollback_deployment
                exit 1
            fi
            ;;
        "check")
            echo -e "${BLUE}📊 检查部署状态...${NC}"
            "$SCRIPT_DIR/manage-services.sh" status
            ;;
        *)
            echo -e "${RED}❌ 未知部署模式: $mode${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"