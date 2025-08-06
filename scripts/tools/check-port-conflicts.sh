#!/bin/bash

# 端口冲突检测和处理工具
# 用于一键部署前的端口冲突检查和清理

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# 项目需要的端口列表
PROJECT_PORTS=(
    "80:前端服务"
    "443:HTTPS服务"
    "1337:后端API"
    "5432:PostgreSQL"
    "7700:MeiliSearch"
    "8080:BillionMail管理界面"
    "25:SMTP"
    "465:SMTPS"
    "587:SMTP提交"
    "143:IMAP"
    "993:IMAPS"
    "110:POP3"
    "995:POP3S"
    "26379:Redis(BillionMail)"
    "25432:PostgreSQL(BillionMail)"
)

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

# 检查单个端口是否被占用
check_port() {
    local port=$1
    local description=$2
    local occupied=false
    local process_info=""
    
    # 使用多种方法检查端口占用
    if command -v lsof &> /dev/null; then
        # 使用lsof检查
        process_info=$(lsof -ti:$port 2>/dev/null)
        if [ -n "$process_info" ]; then
            occupied=true
            process_info=$(lsof -i:$port 2>/dev/null | grep LISTEN)
        fi
    elif command -v netstat &> /dev/null; then
        # 使用netstat检查
        if netstat -tuln 2>/dev/null | grep -q ":$port "; then
            occupied=true
            process_info=$(netstat -tuln | grep ":$port ")
        fi
    elif command -v ss &> /dev/null; then
        # 使用ss检查
        if ss -tuln 2>/dev/null | grep -q ":$port "; then
            occupied=true
            process_info=$(ss -tuln | grep ":$port ")
        fi
    fi
    
    if [ "$occupied" = true ]; then
        echo "OCCUPIED:$port:$description:$process_info"
        return 1
    else
        echo "FREE:$port:$description"
        return 0
    fi
}

# 获取占用端口的进程PID
get_port_pid() {
    local port=$1
    local pids=""
    
    if command -v lsof &> /dev/null; then
        pids=$(lsof -ti:$port 2>/dev/null)
    elif command -v fuser &> /dev/null; then
        pids=$(fuser $port/tcp 2>/dev/null | tr -d ' ')
    fi
    
    echo "$pids"
}

# 杀死占用端口的进程
kill_port_process() {
    local port=$1
    local force=${2:-false}
    
    local pids=$(get_port_pid $port)
    
    if [ -z "$pids" ]; then
        log_info "端口 $port 未被占用"
        return 0
    fi
    
    log_warning "发现端口 $port 被以下进程占用: $pids"
    
    # 先尝试优雅停止
    if [ "$force" != "true" ]; then
        log_info "尝试优雅停止进程..."
        for pid in $pids; do
            if kill -TERM $pid 2>/dev/null; then
                log_info "发送TERM信号到进程 $pid"
            fi
        done
        
        # 等待进程停止
        sleep 3
        
        # 检查是否还在运行
        local remaining_pids=$(get_port_pid $port)
        if [ -z "$remaining_pids" ]; then
            log_success "进程已优雅停止"
            return 0
        fi
    fi
    
    # 强制杀死进程
    log_warning "强制停止进程..."
    for pid in $pids; do
        if kill -KILL $pid 2>/dev/null; then
            log_info "强制停止进程 $pid"
        fi
    done
    
    sleep 2
    
    # 最终检查
    local final_pids=$(get_port_pid $port)
    if [ -z "$final_pids" ]; then
        log_success "端口 $port 已释放"
        return 0
    else
        log_error "无法释放端口 $port，进程 $final_pids 仍在运行"
        return 1
    fi
}

# 停止Docker相关服务
stop_docker_services() {
    log_step "停止可能冲突的Docker服务"
    
    # 停止项目Docker服务
    if [ -f "$PROJECT_ROOT/deployment/docker-compose.unified.yml" ]; then
        log_info "停止项目主服务..."
        cd "$PROJECT_ROOT"
        docker-compose -f deployment/docker-compose.unified.yml down 2>/dev/null || true
    fi
    
    # 停止BillionMail服务
    if [ -f "$PROJECT_ROOT/BillionMail/docker-compose.yml" ]; then
        log_info "停止BillionMail服务..."
        cd "$PROJECT_ROOT/BillionMail"
        docker-compose down 2>/dev/null || true
    fi
    
    # 回到项目根目录
    cd "$PROJECT_ROOT"
    
    # 清理停止的容器
    log_info "清理停止的容器..."
    docker container prune -f 2>/dev/null || true
    
    log_success "Docker服务停止完成"
}

# 检查所有项目端口
check_all_ports() {
    log_step "检查项目端口占用情况"
    
    local occupied_ports=()
    local free_ports=()
    
    for port_desc in "${PROJECT_PORTS[@]}"; do
        local port=$(echo "$port_desc" | cut -d':' -f1)
        local description=$(echo "$port_desc" | cut -d':' -f2)
        
        local result=$(check_port "$port" "$description")
        local status=$(echo "$result" | cut -d':' -f1)
        
        if [ "$status" = "OCCUPIED" ]; then
            occupied_ports+=("$result")
            log_error "端口 $port ($description) 被占用"
        else
            free_ports+=("$result")
            log_success "端口 $port ($description) 可用"
        fi
    done
    
    echo ""
    log_info "检查结果:"
    log_success "可用端口: ${#free_ports[@]}"
    log_error "占用端口: ${#occupied_ports[@]}"
    
    if [ ${#occupied_ports[@]} -gt 0 ]; then
        echo ""
        log_warning "被占用的端口详情:"
        for occupied in "${occupied_ports[@]}"; do
            local port=$(echo "$occupied" | cut -d':' -f2)
            local description=$(echo "$occupied" | cut -d':' -f3)
            local process_info=$(echo "$occupied" | cut -d':' -f4-)
            echo "  🔴 端口 $port ($description)"
            if [ -n "$process_info" ]; then
                echo "     进程信息: $process_info"
            fi
        done
        return 1
    fi
    
    return 0
}

# 清理端口冲突
clean_port_conflicts() {
    log_step "清理端口冲突"
    
    local mode=${1:-interactive}
    local cleaned_ports=0
    local failed_ports=0
    
    # 先停止Docker服务
    stop_docker_services
    
    # 等待服务完全停止
    sleep 5
    
    # 再次检查端口
    for port_desc in "${PROJECT_PORTS[@]}"; do
        local port=$(echo "$port_desc" | cut -d':' -f1)
        local description=$(echo "$port_desc" | cut -d':' -f2)
        
        local result=$(check_port "$port" "$description")
        local status=$(echo "$result" | cut -d':' -f1)
        
        if [ "$status" = "OCCUPIED" ]; then
            if [ "$mode" = "interactive" ]; then
                echo ""
                log_warning "端口 $port ($description) 仍被占用"
                echo "是否强制清理此端口? [y/N]"
                read -r response
                if [[ "$response" =~ ^[Yy]$ ]]; then
                    if kill_port_process "$port" true; then
                        cleaned_ports=$((cleaned_ports + 1))
                    else
                        failed_ports=$((failed_ports + 1))
                    fi
                fi
            else
                # 自动模式，直接清理
                if kill_port_process "$port" true; then
                    cleaned_ports=$((cleaned_ports + 1))
                else
                    failed_ports=$((failed_ports + 1))
                fi
            fi
        fi
    done
    
    echo ""
    log_info "清理结果:"
    log_success "成功清理端口: $cleaned_ports"
    if [ $failed_ports -gt 0 ]; then
        log_error "清理失败端口: $failed_ports"
        return 1
    fi
    
    log_success "端口冲突清理完成"
    return 0
}

# 显示帮助信息
show_help() {
    echo -e "${CYAN}🔧 端口冲突检测和处理工具${NC}"
    echo "================================"
    echo ""
    echo "用法:"
    echo "  $0 [命令] [选项]"
    echo ""
    echo "命令:"
    echo "  check      检查端口占用情况"
    echo "  clean      清理端口冲突(交互模式)"
    echo "  auto-clean 自动清理端口冲突"
    echo "  stop       停止Docker服务"
    echo ""
    echo "示例:"
    echo "  $0 check              # 检查所有项目端口"
    echo "  $0 clean              # 交互式清理冲突"
    echo "  $0 auto-clean         # 自动清理所有冲突"
    echo "  $0 stop               # 停止Docker服务"
    echo ""
}

# 主函数
main() {
    local command=${1:-check}
    
    case "$command" in
        "check")
            check_all_ports
            ;;
        "clean")
            clean_port_conflicts interactive
            ;;
        "auto-clean")
            clean_port_conflicts auto
            ;;
        "stop")
            stop_docker_services
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            log_error "未知命令: $command"
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"