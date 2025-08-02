#!/bin/bash

# AI变现之路 - 生产环境服务管理脚本
# 负责启动、停止、重启生产服务

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

# 检查Docker是否可用
check_docker_available() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker未安装或不可用${NC}"
        echo "请先运行: ./scripts.sh production install-env"
        exit 1
    fi
    
    if ! docker info &>/dev/null; then
        echo -e "${RED}❌ Docker服务未运行${NC}"
        echo "请启动Docker服务"
        exit 1
    fi
}

# 启动服务
start_services() {
    local service="${1:-all}"
    local compose_file=$(get_compose_file)
    
    if [ -z "$compose_file" ]; then
        echo -e "${RED}❌ Docker Compose配置文件不存在${NC}"
        echo "请确保项目已正确部署"
        exit 1
    fi
    
    echo -e "${GREEN}▶️ 启动生产服务...${NC}"
    echo "   配置文件: $compose_file"
    echo "   服务: $service"
    echo ""
    
    cd "$PROJECT_ROOT"
    
    if [ "$service" = "all" ]; then
        echo -e "${BLUE}🚀 启动所有服务...${NC}"
        if docker-compose -f "$compose_file" up -d; then
            echo -e "${GREEN}✅ 所有服务启动成功${NC}"
        else
            echo -e "${RED}❌ 服务启动失败${NC}"
            exit 1
        fi
    else
        echo -e "${BLUE}🚀 启动服务: $service${NC}"
        if docker-compose -f "$compose_file" up -d "$service"; then
            echo -e "${GREEN}✅ 服务 $service 启动成功${NC}"
        else
            echo -e "${RED}❌ 服务 $service 启动失败${NC}"
            exit 1
        fi
    fi
    
    # 等待服务启动
    echo -e "${CYAN}⏳ 等待服务初始化...${NC}"
    sleep 5
    
    # 显示服务状态
    show_services_status
}

# 停止服务
stop_services() {
    local service="${1:-all}"
    local compose_file=$(get_compose_file)
    
    if [ -z "$compose_file" ]; then
        echo -e "${RED}❌ Docker Compose配置文件不存在${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}⏹️ 停止生产服务...${NC}"
    echo "   配置文件: $compose_file"
    echo "   服务: $service"
    echo ""
    
    # 停止搜索索引同步服务（仅在停止所有服务时）
    if [ "$service" = "all" ]; then
        if [ -f "$PROJECT_ROOT/.pids/search-sync-prod.pid" ]; then
            SEARCH_SYNC_PID=$(cat "$PROJECT_ROOT/.pids/search-sync-prod.pid")
            if kill -0 $SEARCH_SYNC_PID 2>/dev/null; then
                echo -e "${BLUE}🔄 停止搜索索引同步服务 (PID: $SEARCH_SYNC_PID)...${NC}"
                kill $SEARCH_SYNC_PID 2>/dev/null || true
                echo -e "${GREEN}✅ 搜索索引同步服务已停止${NC}"
            else
                echo -e "${YELLOW}⚠️  搜索索引同步服务已停止${NC}"
            fi
            rm -f "$PROJECT_ROOT/.pids/search-sync-prod.pid"
        else
            echo -e "${CYAN}💡 未发现搜索索引同步进程${NC}"
        fi
        echo ""
    fi
    
    cd "$PROJECT_ROOT"
    
    if [ "$service" = "all" ]; then
        echo -e "${BLUE}🛑 停止所有服务...${NC}"
        if docker-compose -f "$compose_file" down; then
            echo -e "${GREEN}✅ 所有服务停止成功${NC}"
        else
            echo -e "${RED}❌ 服务停止失败${NC}"
            exit 1
        fi
    else
        echo -e "${BLUE}🛑 停止服务: $service${NC}"
        if docker-compose -f "$compose_file" stop "$service"; then
            echo -e "${GREEN}✅ 服务 $service 停止成功${NC}"
        else
            echo -e "${RED}❌ 服务 $service 停止失败${NC}"
            exit 1
        fi
    fi
}

# 重启服务
restart_services() {
    local service="${1:-all}"
    
    echo -e "${BLUE}🔄 重启生产服务...${NC}"
    echo "   服务: $service"
    echo ""
    
    # 先停止，再启动
    stop_services "$service"
    echo ""
    start_services "$service"
}

# 显示服务状态
show_services_status() {
    local compose_file=$(get_compose_file)
    
    if [ -z "$compose_file" ]; then
        echo -e "${RED}❌ Docker Compose配置文件不存在${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}📊 生产环境状态${NC}"
    echo "==================="
    echo ""
    
    cd "$PROJECT_ROOT"
    
    # 显示容器状态
    echo -e "${CYAN}🐳 容器状态:${NC}"
    docker-compose -f "$compose_file" ps
    echo ""
    
    # 显示详细状态
    echo -e "${CYAN}🔍 服务详情:${NC}"
    
    # 检查主要服务
    local services=("postgres" "backend" "frontend" "meilisearch")
    for service in "${services[@]}"; do
        if docker ps --filter "name=$service" --filter "status=running" --format "table {{.Names}}\t{{.Status}}" | grep -q "$service"; then
            local status=$(docker ps --filter "name=$service" --format "{{.Status}}" | head -1)
            echo "   ✅ $service - $status"
        else
            echo "   ❌ $service - 未运行"
        fi
    done
    
    echo ""
    
    # 检查网络连接
    echo -e "${CYAN}🌐 网络检查:${NC}"
    
    # 检查前端
    FRONTEND_CHECK_URL="${FRONTEND_URL}"
    if curl -f "$FRONTEND_CHECK_URL" &>/dev/null; then
        echo "   ✅ 前端服务 - 响应正常 ($FRONTEND_CHECK_URL)"
    else
        echo "   ❌ 前端服务 - 响应异常 ($FRONTEND_CHECK_URL)"
    fi
    
    # 检查后端
    BACKEND_CHECK_URL="${BACKEND_URL}"
    if curl -f "$BACKEND_CHECK_URL" &>/dev/null; then
        echo "   ✅ 后端服务 - 响应正常 ($BACKEND_CHECK_URL)"
    else
        echo "   ❌ 后端服务 - 响应异常 ($BACKEND_CHECK_URL)"
    fi
    
    # 检查搜索引擎
    SEARCH_CHECK_URL="${SEARCH_URL}/health"
    if curl -f "$SEARCH_CHECK_URL" &>/dev/null; then
        echo "   ✅ 搜索引擎 - 响应正常 ($SEARCH_CHECK_URL)"
    else
        echo "   ❌ 搜索引擎 - 响应异常 ($SEARCH_CHECK_URL)"
    fi
    
    echo ""
    
    # 显示资源使用情况
    echo -e "${CYAN}💾 资源使用:${NC}"
    echo "   CPU: $(top -l 1 | grep "CPU usage" | awk '{print $3}' | sed 's/%//' || echo "未知")%"
    echo "   内存: $(free -h 2>/dev/null | awk 'NR==2{printf "%s/%s (%.2f%%)", $3,$2,$3*100/$2}' || echo "未知")"
    echo "   磁盘: $(df -h . | awk 'NR==2{printf "%s/%s (%s)", $3,$2,$5}')"
    
    echo ""
}

# 健康检查
health_check() {
    echo -e "${BLUE}🏥 执行健康检查...${NC}"
    echo ""
    
    local failed_checks=()
    
    # Docker服务检查
    if ! docker info &>/dev/null; then
        failed_checks+=("Docker服务未运行")
    fi
    
    # 容器健康检查
    local compose_file=$(get_compose_file)
    if [ -n "$compose_file" ]; then
        cd "$PROJECT_ROOT"
        
        # 检查各服务
        local services=("postgres" "backend" "frontend")
        for service in "${services[@]}"; do
            if ! docker-compose -f "$compose_file" ps "$service" | grep -q "Up"; then
                failed_checks+=("$service 服务未运行")
            fi
        done
    fi
    
    # 报告结果
    if [ ${#failed_checks[@]} -eq 0 ]; then
        echo -e "${GREEN}✅ 健康检查通过${NC}"
        return 0
    else
        echo -e "${RED}❌ 健康检查发现问题:${NC}"
        for check in "${failed_checks[@]}"; do
            echo "   • $check"
        done
        return 1
    fi
}

# 查看日志
show_logs() {
    local service="${1:-all}"
    local lines="${2:-50}"
    local compose_file=$(get_compose_file)
    
    if [ -z "$compose_file" ]; then
        echo -e "${RED}❌ Docker Compose配置文件不存在${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}📋 查看生产日志...${NC}"
    echo "   服务: $service"
    echo "   行数: $lines"
    echo ""
    echo "按 Ctrl+C 退出日志查看"
    echo ""
    
    cd "$PROJECT_ROOT"
    
    if [ "$service" = "all" ]; then
        docker-compose -f "$compose_file" logs -f --tail="$lines"
    else
        docker-compose -f "$compose_file" logs -f --tail="$lines" "$service"
    fi
}

# 显示帮助信息
show_help() {
    echo -e "${GREEN}🚀 AI变现之路 - 生产服务管理工具${NC}"
    echo "========================================"
    echo ""
    echo "用法:"
    echo "  $0 <action> [service] [options]"
    echo ""
    echo "操作:"
    echo "  start     启动服务"
    echo "  stop      停止服务"
    echo "  restart   重启服务"
    echo "  status    显示服务状态"
    echo "  health    执行健康检查"
    echo "  logs      查看服务日志"
    echo ""
    echo "服务名称:"
    echo "  all       所有服务 (默认)"
    echo "  frontend  前端服务"
    echo "  backend   后端服务"
    echo "  postgres  数据库服务"
    echo "  meilisearch 搜索引擎"
    echo ""
    echo "示例:"
    echo "  $0 start                # 启动所有服务"
    echo "  $0 start frontend       # 启动前端服务"
    echo "  $0 stop                 # 停止所有服务"
    echo "  $0 restart backend      # 重启后端服务"
    echo "  $0 status               # 查看服务状态"
    echo "  $0 logs                 # 查看所有日志"
    echo "  $0 logs backend         # 查看后端日志"
    echo ""
}

# 主函数
main() {
    local action="$1"
    local service="${2:-all}"
    local options="$3"
    
    # 检查Docker可用性
    check_docker_available
    
    case "$action" in
        "start")
            start_services "$service"
            ;;
        "stop")
            stop_services "$service"
            ;;
        "restart")
            restart_services "$service"
            ;;
        "status")
            show_services_status
            ;;
        "health")
            health_check
            ;;
        "logs")
            show_logs "$service" "$options"
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