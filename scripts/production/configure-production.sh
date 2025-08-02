#!/bin/bash

# AI变现之路 - 生产环境配置管理脚本
# 负责生产环境的配置生成、验证和管理

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
    echo -e "${CYAN}🔧 $1${NC}"
}

# 检查配置文件完整性
check_config_files() {
    log_step "检查配置文件完整性"
    
    local errors=()
    
    # 检查前端配置
    if [ ! -f "$PROJECT_ROOT/frontend/.env.local" ]; then
        errors+=("前端配置文件不存在: frontend/.env.local")
    else
        log_info "前端配置文件: ✅"
        
        # 检查关键前端配置项
        local required_frontend_vars=(
            "NEXT_PUBLIC_FRONTEND_DOMAIN"
            "NEXT_PUBLIC_BACKEND_DOMAIN"
            "NEXTAUTH_URL"
            "NEXTAUTH_SECRET"
        )
        
        for var in "${required_frontend_vars[@]}"; do
            if ! grep -q "^$var=" "$PROJECT_ROOT/frontend/.env.local"; then
                errors+=("前端配置缺失: $var")
            fi
        done
    fi
    
    # 检查后端配置
    if [ ! -f "$PROJECT_ROOT/backend/.env" ]; then
        errors+=("后端配置文件不存在: backend/.env")
    else
        log_info "后端配置文件: ✅"
        
        # 检查关键后端配置项
        local required_backend_vars=(
            "NODE_ENV"
            "DATABASE_HOST"
            "DATABASE_NAME"
            "DATABASE_USERNAME"
            "DATABASE_PASSWORD"
            "APP_KEYS"
            "API_TOKEN_SALT"
            "ADMIN_JWT_SECRET"
        )
        
        for var in "${required_backend_vars[@]}"; do
            if ! grep -q "^$var=" "$PROJECT_ROOT/backend/.env"; then
                errors+=("后端配置缺失: $var")
            fi
        done
    fi
    
    # 检查Docker Compose配置
    if [ ! -f "$PROJECT_ROOT/deployment/docker-compose.unified.yml" ]; then
        errors+=("Docker Compose配置文件不存在: deployment/docker-compose.unified.yml")
    else
        log_info "Docker Compose配置: ✅"
    fi
    
    # 报告结果
    if [ ${#errors[@]} -eq 0 ]; then
        log_success "配置文件检查通过"
        return 0
    else
        log_error "配置文件检查失败:"
        for error in "${errors[@]}"; do
            echo "   • $error"
        done
        return 1
    fi
}

# 验证配置值
validate_config_values() {
    log_step "验证配置值"
    
    local errors=()
    
    # 验证前端配置
    if [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
        # 检查域名配置
        local frontend_domain=$(grep "NEXT_PUBLIC_FRONTEND_DOMAIN=" "$PROJECT_ROOT/frontend/.env.local" | cut -d'=' -f2 | tr -d '"')
        if [ -z "$frontend_domain" ] || [ "$frontend_domain" = "yourdomain.com" ]; then
            errors+=("前端域名未正确配置")
        else
            log_info "前端域名: $frontend_domain"
        fi
        
        # 检查后端域名
        local backend_domain=$(grep "NEXT_PUBLIC_BACKEND_DOMAIN=" "$PROJECT_ROOT/frontend/.env.local" | cut -d'=' -f2 | tr -d '"')
        if [ -z "$backend_domain" ] || [ "$backend_domain" = "yourdomain.com" ]; then
            errors+=("后端域名未正确配置")
        else
            log_info "后端域名: $backend_domain"
        fi
    fi
    
    # 验证后端配置
    if [ -f "$PROJECT_ROOT/backend/.env" ]; then
        # 检查环境模式
        local node_env=$(grep "NODE_ENV=" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)
        if [ "$node_env" != "production" ]; then
            log_warning "建议设置 NODE_ENV=production (当前: $node_env)"
        else
            log_info "环境模式: $node_env"
        fi
        
        # 检查数据库配置
        local db_host=$(grep "DATABASE_HOST=" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)
        local db_name=$(grep "DATABASE_NAME=" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)
        if [ -z "$db_host" ] || [ -z "$db_name" ]; then
            errors+=("数据库配置不完整")
        else
            log_info "数据库: $db_host/$db_name"
        fi
    fi
    
    # 报告结果
    if [ ${#errors[@]} -eq 0 ]; then
        log_success "配置值验证通过"
        return 0
    else
        log_error "配置值验证失败:"
        for error in "${errors[@]}"; do
            echo "   • $error"
        done
        return 1
    fi
}

# 测试配置生成
test_config_generation() {
    log_step "测试配置生成功能"
    
    # 备份现有配置
    local backup_dir="/tmp/config_test_backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    if [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
        cp "$PROJECT_ROOT/frontend/.env.local" "$backup_dir/"
        log_info "已备份前端配置"
    fi
    
    if [ -f "$PROJECT_ROOT/backend/.env" ]; then
        cp "$PROJECT_ROOT/backend/.env" "$backup_dir/"
        log_info "已备份后端配置"
    fi
    
    # 测试配置生成
    log_info "测试配置生成..."
    
    if [ -f "$PROJECT_ROOT/deployment/configure-unified-env.sh" ]; then
        cd "$PROJECT_ROOT/deployment"
        if ./configure-unified-env.sh integrated "test.example.com" "mail.test.example.com"; then
            log_success "配置生成测试通过"
            
            # 恢复原始配置
            log_info "恢复原始配置..."
            if [ -f "$backup_dir/.env.local" ]; then
                cp "$backup_dir/.env.local" "$PROJECT_ROOT/frontend/"
            fi
            if [ -f "$backup_dir/.env" ]; then
                cp "$backup_dir/.env" "$PROJECT_ROOT/backend/"
            fi
            
            # 清理备份
            rm -rf "$backup_dir"
            log_info "配置已恢复"
            
            return 0
        else
            log_error "配置生成失败"
            return 1
        fi
    else
        log_error "配置生成脚本不存在"
        return 1
    fi
}

# 检查Docker环境
check_docker_environment() {
    log_step "检查Docker环境"
    
    local errors=()
    
    # 检查Docker
    if ! command -v docker &> /dev/null; then
        errors+=("Docker未安装")
    else
        if docker info &>/dev/null; then
            log_info "Docker: ✅"
        else
            errors+=("Docker服务未运行")
        fi
    fi
    
    # 检查Docker Compose
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        errors+=("Docker Compose未安装")
    else
        log_info "Docker Compose: ✅"
    fi
    
    # 报告结果
    if [ ${#errors[@]} -eq 0 ]; then
        log_success "Docker环境检查通过"
        return 0
    else
        log_error "Docker环境检查失败:"
        for error in "${errors[@]}"; do
            echo "   • $error"
        done
        return 1
    fi
}

# 生成配置模板
generate_config_template() {
    local domain="${1:-yourdomain.com}"
    local mail_domain="${2:-mail.$domain}"
    
    log_step "生成配置模板"
    
    if [ -f "$PROJECT_ROOT/deployment/configure-unified-env.sh" ]; then
        cd "$PROJECT_ROOT/deployment"
        ./configure-unified-env.sh integrated "$domain" "$mail_domain"
        log_success "配置模板生成完成"
    else
        log_error "配置生成脚本不存在"
        exit 1
    fi
}

# 显示配置信息
show_config_info() {
    log_step "当前配置信息"
    
    echo ""
    echo -e "${CYAN}📋 前端配置 (frontend/.env.local):${NC}"
    if [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
        echo "   配置项数量: $(grep -c "^[A-Z]" "$PROJECT_ROOT/frontend/.env.local" 2>/dev/null || echo "0")"
        if grep -q "NEXT_PUBLIC_FRONTEND_DOMAIN=" "$PROJECT_ROOT/frontend/.env.local"; then
            local domain=$(grep "NEXT_PUBLIC_FRONTEND_DOMAIN=" "$PROJECT_ROOT/frontend/.env.local" | cut -d'=' -f2 | tr -d '"')
            echo "   前端域名: $domain"
        fi
    else
        echo -e "${RED}   文件不存在${NC}"
    fi
    
    echo ""
    echo -e "${CYAN}📋 后端配置 (backend/.env):${NC}"
    if [ -f "$PROJECT_ROOT/backend/.env" ]; then
        echo "   配置项数量: $(grep -c "^[A-Z]" "$PROJECT_ROOT/backend/.env" 2>/dev/null || echo "0")"
        if grep -q "NODE_ENV=" "$PROJECT_ROOT/backend/.env"; then
            local env=$(grep "NODE_ENV=" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)
            echo "   运行环境: $env"
        fi
        if grep -q "DATABASE_NAME=" "$PROJECT_ROOT/backend/.env"; then
            local db=$(grep "DATABASE_NAME=" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)
            echo "   数据库名: $db"
        fi
    else
        echo -e "${RED}   文件不存在${NC}"
    fi
    
    echo ""
    echo -e "${CYAN}📋 Docker配置:${NC}"
    if [ -f "$PROJECT_ROOT/deployment/docker-compose.unified.yml" ]; then
        local services=$(grep -c "^  [a-z].*:$" "$PROJECT_ROOT/deployment/docker-compose.unified.yml" 2>/dev/null || echo "0")
        echo "   服务数量: $services"
        echo "   配置文件: docker-compose.unified.yml ✅"
    else
        echo -e "${RED}   配置文件不存在${NC}"
    fi
    echo ""
}

# 显示帮助信息
show_help() {
    echo -e "${GREEN}🔧 AI变现之路 - 生产配置管理工具${NC}"
    echo "===================================="
    echo ""
    echo "用法:"
    echo "  $0 <action> [options]"
    echo ""
    echo "操作:"
    echo "  check               全面配置检查"
    echo "  validate            验证配置值"
    echo "  test                测试配置生成"
    echo "  generate [domain] [mail_domain]  生成配置"
    echo "  info                显示配置信息"
    echo "  docker              检查Docker环境"
    echo ""
    echo "示例:"
    echo "  $0 check                                    # 全面检查"
    echo "  $0 generate aibianx.com mail.aibianx.com   # 生成配置"
    echo "  $0 info                                     # 查看配置"
    echo ""
}

# 主函数
main() {
    local action="${1:-check}"
    
    echo -e "${GREEN}🔧 AI变现之路 - 生产配置管理${NC}"
    echo "=============================="
    echo ""
    
    case "$action" in
        "check")
            echo -e "${BLUE}📋 执行全面配置检查...${NC}"
            echo ""
            
            local all_passed=true
            
            if ! check_config_files; then
                all_passed=false
            fi
            echo ""
            
            if ! validate_config_values; then
                all_passed=false
            fi
            echo ""
            
            if ! check_docker_environment; then
                all_passed=false
            fi
            echo ""
            
            if [ "$all_passed" = "true" ]; then
                log_success "🎉 所有配置检查通过！"
                echo ""
                show_config_info
            else
                log_error "❌ 配置检查发现问题，请修复后重试"
                exit 1
            fi
            ;;
        "validate")
            validate_config_values
            ;;
        "test")
            test_config_generation
            ;;
        "generate")
            generate_config_template "$2" "$3"
            ;;
        "info")
            show_config_info
            ;;
        "docker")
            check_docker_environment
            ;;
        "help"|"--help"|"-h")
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