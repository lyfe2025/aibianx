#!/bin/bash

# AI变现之路 - 生产环境监控和日志脚本
# 支持实时日志查看、性能监控、告警系统

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

# 获取Docker Compose文件
get_compose_file() {
    if [ -f "$PROJECT_ROOT/deployment/docker-compose.unified.yml" ]; then
        echo "$PROJECT_ROOT/deployment/docker-compose.unified.yml"
    elif [ -f "$PROJECT_ROOT/deployment/docker-compose.yml" ]; then
        echo "$PROJECT_ROOT/deployment/docker-compose.yml"
    else
        echo ""
    fi
}

# 显示实时日志
show_logs() {
    local service="${1:-all}"
    local lines="${2:-100}"
    local follow="${3:-true}"
    local compose_file=$(get_compose_file)
    
    if [ -z "$compose_file" ]; then
        echo -e "${RED}❌ Docker Compose配置文件不存在${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}📋 查看生产日志${NC}"
    echo "=================="
    echo "   服务: $service"
    echo "   行数: $lines"
    echo "   实时: $follow"
    echo ""
    
    if [ "$follow" = "true" ]; then
        echo "按 Ctrl+C 退出日志查看"
        echo ""
        sleep 2
    fi
    
    cd "$PROJECT_ROOT"
    
    case "$service" in
        "all")
            if [ "$follow" = "true" ]; then
                docker-compose -f "$compose_file" logs -f --tail="$lines"
            else
                docker-compose -f "$compose_file" logs --tail="$lines"
            fi
            ;;
        "frontend"|"backend"|"postgres"|"meilisearch"|"redis")
            if [ "$follow" = "true" ]; then
                docker-compose -f "$compose_file" logs -f --tail="$lines" "$service"
            else
                docker-compose -f "$compose_file" logs --tail="$lines" "$service"
            fi
            ;;
        *)
            echo -e "${RED}❌ 未知服务: $service${NC}"
            echo "可用服务: all, frontend, backend, postgres, meilisearch, redis"
            exit 1
            ;;
    esac
}

# 实时监控面板
real_time_monitor() {
    echo -e "${BLUE}📊 生产环境实时监控${NC}"
    echo "======================"
    echo ""
    echo "按 Ctrl+C 退出监控"
    echo ""
    
    while true; do
        # 清屏
        clear
        
        # 显示标题和时间
        echo -e "${GREEN}🚀 AI变现之路 - 生产环境监控面板${NC}"
        echo "======================================="
        echo "更新时间: $(date '+%Y-%m-%d %H:%M:%S')"
        echo ""
        
        # 显示容器状态
        echo -e "${CYAN}🐳 容器状态:${NC}"
        local compose_file=$(get_compose_file)
        if [ -n "$compose_file" ]; then
            cd "$PROJECT_ROOT"
            docker-compose -f "$compose_file" ps 2>/dev/null | head -20
        else
            echo "   ❌ 未找到Docker Compose配置"
        fi
        echo ""
        
        # 显示服务健康状态
        echo -e "${CYAN}💓 服务健康:${NC}"
        check_service_health "frontend" "${FRONTEND_URL}"
        check_service_health "backend" "${BACKEND_URL}"
        check_service_health "meilisearch" "${SEARCH_URL}/health"
        check_service_health "postgres" "" "docker"
        echo ""
        
        # 显示系统资源
        echo -e "${CYAN}💾 系统资源:${NC}"
        show_system_resources
        echo ""
        
        # 显示网络连接
        echo -e "${CYAN}🌐 网络连接:${NC}"
        show_network_connections
        echo ""
        
        # 显示最近错误
        echo -e "${CYAN}🚨 最近错误 (最后5条):${NC}"
        show_recent_errors 5
        echo ""
        
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "🔄 30秒后自动刷新... (Ctrl+C 退出)"
        
        # 等待30秒或用户中断
        sleep 30
    done
}

# 检查服务健康状态
check_service_health() {
    local service="$1"
    local url="$2"
    local check_type="${3:-http}"
    
    case "$check_type" in
        "http")
            if [ -n "$url" ] && curl -f "$url" &>/dev/null; then
                echo "   ✅ $service - 健康"
                return 0
            else
                echo "   ❌ $service - 异常"
                return 1
            fi
            ;;
        "docker")
            if docker ps --filter "name=$service" --filter "status=running" | grep -q "$service"; then
                echo "   ✅ $service - 运行中"
                return 0
            else
                echo "   ❌ $service - 未运行"
                return 1
            fi
            ;;
    esac
}

# 显示系统资源
show_system_resources() {
    # CPU使用率
    if command -v top &>/dev/null; then
        local cpu_usage=$(top -l 1 | grep "CPU usage" | awk '{print $3}' | sed 's/%//' 2>/dev/null || echo "未知")
        echo "   CPU: ${cpu_usage}%"
    fi
    
    # 内存使用
    if command -v free &>/dev/null; then
        local memory_info=$(free -h | awk 'NR==2{printf "%s/%s (%.2f%%)", $3,$2,$3*100/$2}' 2>/dev/null || echo "未知")
        echo "   内存: $memory_info"
    elif command -v vm_stat &>/dev/null; then
        # macOS
        local memory_pressure=$(memory_pressure 2>/dev/null | grep "System-wide memory free percentage" | awk '{print $5}' 2>/dev/null || echo "未知")
        echo "   内存: 可用 ${memory_pressure}%"
    fi
    
    # 磁盘使用
    local disk_usage=$(df -h "$PROJECT_ROOT" | awk 'NR==2{printf "%s/%s (%s)", $3,$2,$5}' 2>/dev/null || echo "未知")
    echo "   磁盘: $disk_usage"
    
    # Docker资源使用
    if docker system df &>/dev/null; then
        local docker_size=$(docker system df | awk 'NR==2{print $3}' 2>/dev/null || echo "未知")
        echo "   Docker: $docker_size"
    fi
}

# 显示网络连接
show_network_connections() {
    local connections=0
    
    # 检查主要端口的连接数
    local ports=("80" "443" "1337" "3000" "5432" "7700")
    for port in "${ports[@]}"; do
        local count=$(netstat -an 2>/dev/null | grep ":$port " | grep ESTABLISHED | wc -l | tr -d ' ' || echo "0")
        if [ "$count" -gt 0 ]; then
            echo "   端口 $port: $count 个连接"
            connections=$((connections + count))
        fi
    done
    
    if [ "$connections" -eq 0 ]; then
        echo "   暂无活跃连接"
    else
        echo "   总连接数: $connections"
    fi
}

# 显示最近错误
show_recent_errors() {
    local lines="${1:-10}"
    local compose_file=$(get_compose_file)
    
    if [ -z "$compose_file" ]; then
        echo "   ❌ 无法获取日志"
        return
    fi
    
    cd "$PROJECT_ROOT"
    
    # 获取所有服务的错误日志
    local error_logs=$(docker-compose -f "$compose_file" logs --tail="$lines" 2>/dev/null | grep -i "error\|exception\|fail\|panic" | tail -n "$lines" || echo "")
    
    if [ -z "$error_logs" ]; then
        echo "   ✅ 暂无错误"
    else
        echo "$error_logs" | head -n "$lines" | while read -r line; do
            echo "   🚨 $line"
        done
    fi
}

# 性能检查
performance_check() {
    echo -e "${BLUE}⚡ 性能检查${NC}"
    echo "============"
    echo ""
    
    # 响应时间检查
    echo -e "${CYAN}🌐 响应时间检查:${NC}"
    
    # 前端响应时间
    local frontend_url="${FRONTEND_URL}"
    local frontend_time=$(curl -o /dev/null -s -w '%{time_total}' "$frontend_url" 2>/dev/null || echo "超时")
    echo "   前端服务: ${frontend_time}s ($frontend_url)"
    
    # 后端响应时间
    local backend_url="${BACKEND_URL}"
    local backend_time=$(curl -o /dev/null -s -w '%{time_total}' "$backend_url" 2>/dev/null || echo "超时")
    echo "   后端服务: ${backend_time}s ($backend_url)"
    
    # 搜索引擎响应时间
    local search_url="${SEARCH_URL}/health"
    local search_time=$(curl -o /dev/null -s -w '%{time_total}' "$search_url" 2>/dev/null || echo "超时")
    echo "   搜索引擎: ${search_time}s ($search_url)"
    
    echo ""
    
    # 数据库性能
    echo -e "${CYAN}🗄️ 数据库性能:${NC}"
    if docker ps --filter "name=postgres" --filter "status=running" | grep -q postgres; then
        local db_connections=$(docker exec -it $(docker ps --filter "name=postgres" --format "{{.Names}}" | head -1) psql -U postgres -c "SELECT count(*) FROM pg_stat_activity;" 2>/dev/null | grep -E "^\s*[0-9]+" | tr -d ' ' || echo "未知")
        echo "   活跃连接数: $db_connections"
        
        local db_size=$(docker exec -it $(docker ps --filter "name=postgres" --format "{{.Names}}" | head -1) psql -U postgres -c "SELECT pg_size_pretty(pg_database_size('aibianx_dev'));" 2>/dev/null | grep -E "^\s*[0-9]+" | tr -d ' ' || echo "未知")
        echo "   数据库大小: $db_size"
    else
        echo "   ❌ 数据库未运行"
    fi
    
    echo ""
    
    # 容器资源使用
    echo -e "${CYAN}📊 容器资源使用:${NC}"
    if docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" 2>/dev/null | head -20; then
        :
    else
        echo "   ❌ 无法获取容器资源信息"
    fi
}

# 告警检查
alert_check() {
    echo -e "${BLUE}🚨 告警检查${NC}"
    echo "============"
    echo ""
    
    local alerts=()
    
    # CPU使用率告警
    if command -v top &>/dev/null; then
        local cpu_usage=$(top -l 1 | grep "CPU usage" | awk '{print $3}' | sed 's/%//' 2>/dev/null)
        if [ -n "$cpu_usage" ] && [ $(echo "$cpu_usage > 80" | bc 2>/dev/null || echo 0) -eq 1 ]; then
            alerts+=("🔥 CPU使用率过高: ${cpu_usage}%")
        fi
    fi
    
    # 内存使用率告警
    if command -v free &>/dev/null; then
        local memory_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}' 2>/dev/null)
        if [ -n "$memory_usage" ] && [ "$memory_usage" -gt 85 ]; then
            alerts+=("💾 内存使用率过高: ${memory_usage}%")
        fi
    fi
    
    # 磁盘使用率告警
    local disk_usage=$(df "$PROJECT_ROOT" | awk 'NR==2{print $5}' | sed 's/%//' 2>/dev/null)
    if [ -n "$disk_usage" ] && [ "$disk_usage" -gt 85 ]; then
        alerts+=("💿 磁盘使用率过高: ${disk_usage}%")
    fi
    
    # 服务状态告警
    local frontend_check_url="${FRONTEND_URL}"
    if ! curl -f "$frontend_check_url" &>/dev/null; then
        alerts+=("🌐 前端服务无响应 ($frontend_check_url)")
    fi
    
    local backend_check_url="${BACKEND_URL}"
    if ! curl -f "$backend_check_url" &>/dev/null; then
        alerts+=("⚙️ 后端服务无响应 ($backend_check_url)")
    fi
    
    # 容器状态告警
    local compose_file=$(get_compose_file)
    if [ -n "$compose_file" ]; then
        cd "$PROJECT_ROOT"
        local stopped_containers=$(docker-compose -f "$compose_file" ps | grep "Exit" | wc -l | tr -d ' ')
        if [ "$stopped_containers" -gt 0 ]; then
            alerts+=("🐳 有 $stopped_containers 个容器已停止")
        fi
    fi
    
    # 显示告警结果
    if [ ${#alerts[@]} -eq 0 ]; then
        echo -e "${GREEN}✅ 系统状态正常，无告警${NC}"
    else
        echo -e "${RED}⚠️ 发现 ${#alerts[@]} 个告警:${NC}"
        for alert in "${alerts[@]}"; do
            echo "   $alert"
        done
        
        # 可选：发送告警通知
        # send_alert_notification "${alerts[@]}"
    fi
}

# 发送告警通知 (可扩展)
send_alert_notification() {
    local alerts=("$@")
    
    # 这里可以扩展为邮件、Slack、微信等通知方式
    # 示例：发送到日志文件
    local log_file="$PROJECT_ROOT/logs/alerts.log"
    mkdir -p "$(dirname "$log_file")"
    
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 系统告警:" >> "$log_file"
    for alert in "${alerts[@]}"; do
        echo "  $alert" >> "$log_file"
    done
    echo "" >> "$log_file"
}

# 显示帮助信息
show_help() {
    echo -e "${GREEN}🚀 AI变现之路 - 生产监控工具${NC}"
    echo "================================="
    echo ""
    echo "用法:"
    echo "  $0 <action> [service] [options]"
    echo ""
    echo "操作:"
    echo "  logs       查看服务日志"
    echo "  monitor    实时监控面板"
    echo "  performance 性能检查"
    echo "  alerts     告警检查"
    echo ""
    echo "服务名称 (用于logs):"
    echo "  all        所有服务 (默认)"
    echo "  frontend   前端服务"
    echo "  backend    后端服务"
    echo "  postgres   数据库服务"
    echo "  meilisearch 搜索引擎"
    echo "  redis      缓存服务"
    echo ""
    echo "日志选项:"
    echo "  --lines N  显示最后N行 (默认: 100)"
    echo "  --no-follow 不跟踪新日志"
    echo ""
    echo "示例:"
    echo "  $0 logs                    # 查看所有服务日志"
    echo "  $0 logs backend            # 查看后端日志"
    echo "  $0 logs frontend --lines 50 # 查看前端最后50行日志"
    echo "  $0 monitor                 # 启动实时监控"
    echo "  $0 performance            # 性能检查"
    echo "  $0 alerts                 # 告警检查"
    echo ""
}

# 主函数
main() {
    local action="$1"
    local service="${2:-all}"
    local lines=100
    local follow=true
    
    # 解析参数
    shift 2 2>/dev/null || shift $#
    while [[ $# -gt 0 ]]; do
        case $1 in
            --lines)
                lines="$2"
                shift 2
                ;;
            --no-follow)
                follow=false
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
    
    case "$action" in
        "logs")
            show_logs "$service" "$lines" "$follow"
            ;;
        "monitor")
            real_time_monitor
            ;;
        "performance")
            performance_check
            ;;
        "alerts")
            alert_check
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