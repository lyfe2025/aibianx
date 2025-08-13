#!/bin/bash

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载统一环境配置
source "${PROJECT_ROOT}/deployment/configure-unified-env.sh"


# AI变现之路 - 生产级健康检查脚本
# 全面检查生产环境所有服务的健康状态

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🏥 生产级健康检查${NC}"
echo "=========================================="
echo ""

# 健康检查统计
total_services=0
healthy_services=0
unhealthy_services=0

# 健康检查函数
health_check() {
    local service_name=$1
    local check_command=$2
    local timeout=${3:-10}
    
    total_services=$((total_services + 1))
    echo -n "🔍 检查 $service_name: "
    
    local attempt=0
    local max_attempts=$timeout
    
    while [ $attempt -lt $max_attempts ]; do
        if eval "$check_command" >/dev/null 2>&1; then
            echo -e "${GREEN}✅ 健康${NC}"
            healthy_services=$((healthy_services + 1))
            return 0
        fi
        attempt=$((attempt + 1))
        sleep 1
    done
    
    echo -e "${RED}❌ 不健康${NC}"
    unhealthy_services=$((unhealthy_services + 1))
    return 1
}

# 详细健康检查函数
detailed_health_check() {
    local service_name=$1
    local container_name=$2
    local port=$3
    local endpoint=${4:-""}
    
    echo -e "${CYAN}📊 $service_name 详细健康检查：${NC}"
    
    # 检查容器状态
    if docker ps --format "{{.Names}}" | grep -q "$container_name" 2>/dev/null; then
        echo -e "  🐳 容器状态: ${GREEN}运行中${NC}"
        
        # 检查容器健康状态
        local container_status=$(docker inspect --format='{{.State.Health.Status}}' "$container_name" 2>/dev/null || echo "none")
        if [ "$container_status" = "healthy" ]; then
            echo -e "  💚 容器健康: ${GREEN}健康${NC}"
        elif [ "$container_status" = "none" ]; then
            echo -e "  💛 容器健康: ${YELLOW}无健康检查${NC}"
        else
            echo -e "  💔 容器健康: ${RED}$container_status${NC}"
        fi
        
        # 检查端口监听
        if [ -n "$port" ]; then
            if docker exec "$container_name" netstat -tuln 2>/dev/null | grep -q ":$port " 2>/dev/null; then
                echo -e "  🌐 端口监听: ${GREEN}$port 正常${NC}"
            else
                echo -e "  🌐 端口监听: ${RED}$port 异常${NC}"
            fi
        fi
        
        # 检查服务响应
        if [ -n "$endpoint" ]; then
            if curl -s "$endpoint" >/dev/null 2>&1; then
                echo -e "  📡 服务响应: ${GREEN}正常${NC}"
            else
                echo -e "  📡 服务响应: ${RED}异常${NC}"
            fi
        fi
        
        # 检查资源使用
        local stats=$(docker stats --no-stream --format "{{.CPUPerc}},{{.MemUsage}}" "$container_name" 2>/dev/null || echo "0.00%,0B / 0B")
        local cpu=$(echo "$stats" | cut -d',' -f1)
        local memory=$(echo "$stats" | cut -d',' -f2)
        echo -e "  📈 资源使用: CPU $cpu, 内存 $memory"
        
    else
        echo -e "  🐳 容器状态: ${RED}未运行${NC}"
    fi
    echo ""
}

echo -e "${CYAN}🔍 快速健康检查${NC}"
echo "----------------------------------------"

# 基础服务健康检查
health_check "PostgreSQL数据库" "docker exec aibianx-postgres pg_isready -U postgres"
health_check "Redis缓存" "docker exec aibianx-redis redis-cli ping | grep -q PONG"
health_check "MeiliSearch搜索引擎" "curl -s ${MEILISEARCH_URL}/health"
health_check "Strapi后端API" "curl -s ${BACKEND_URL}/api"
health_check "Next.js前端应用" "curl -s http://bianx.local"
health_check "Strapi邮件系统API" "curl -s ${BACKEND_URL}/api/email-subscriptions"
health_check "Nginx网关" "curl -s ${FRONTEND_URL}:80"

echo ""
echo -e "${CYAN}📊 详细健康检查${NC}"
echo "=========================================="

# 详细健康检查
detailed_health_check "PostgreSQL数据库" "aibianx-postgres" "5432"
detailed_health_check "Redis缓存" "aibianx-redis" "6379"
detailed_health_check "MeiliSearch搜索引擎" "aibianx-meilisearch" "7700" "${MEILISEARCH_URL}/health"
detailed_health_check "Strapi后端应用" "aibianx-backend" "1337" "${BACKEND_URL}/api"
detailed_health_check "Next.js前端应用" "aibianx-frontend" "3000" "http://bianx.local"
detailed_health_check "Strapi邮件API" "aibianx-backend" "1337" "${BACKEND_URL}/api/email-subscriptions"
detailed_health_check "Nginx网关" "aibianx-nginx" "80" "${FRONTEND_URL}:80"

echo -e "${CYAN}📧 邮件系统组件检查${NC}"
echo "----------------------------------------"

# 邮件系统组件检查
detailed_health_check "Dovecot IMAP/POP3" "aibianx-dovecot" "143"
detailed_health_check "Postfix SMTP" "aibianx-postfix" "25"
detailed_health_check "Rspamd反垃圾邮件" "aibianx-rspamd" ""
detailed_health_check "Roundcube网页邮箱" "aibianx-webmail" ""

echo -e "${CYAN}🔄 服务连通性测试${NC}"
echo "----------------------------------------"

# 服务间连通性测试
echo "🔗 测试服务间连通性..."

# 后端到数据库连接
if docker exec aibianx-backend pg_isready -h postgres -U postgres >/dev/null 2>&1; then
    echo -e "  📊 后端→数据库: ${GREEN}连通${NC}"
else
    echo -e "  📊 后端→数据库: ${RED}断开${NC}"
fi

# 后端到Redis连接
if docker exec aibianx-backend redis-cli -h redis ping 2>/dev/null | grep -q PONG; then
    echo -e "  🧠 后端→Redis: ${GREEN}连通${NC}"
else
    echo -e "  🧠 后端→Redis: ${RED}断开${NC}"
fi

# 后端到搜索引擎连接
if docker exec aibianx-backend curl -s http://meilisearch:7700/health >/dev/null 2>&1; then
    echo -e "  🔍 后端→搜索引擎: ${GREEN}连通${NC}"
else
    echo -e "  🔍 后端→搜索引擎: ${RED}断开${NC}"
fi

# 前端到后端连接
if docker exec aibianx-frontend curl -s http://backend:1337/api >/dev/null 2>&1; then
    echo -e "  🌐 前端→后端: ${GREEN}连通${NC}"
else
    echo -e "  🌐 前端→后端: ${RED}断开${NC}"
fi

echo ""
echo "=========================================="
echo -e "${BLUE}📊 健康检查结果${NC}"
echo "=========================================="
echo -e "总服务数量: ${CYAN}$total_services${NC}"
echo -e "健康服务: ${GREEN}$healthy_services${NC}"
echo -e "不健康服务: ${RED}$unhealthy_services${NC}"

# 计算健康率
if [ $total_services -gt 0 ]; then
    local health_rate=$((healthy_services * 100 / total_services))
    echo -e "健康率: ${CYAN}$health_rate%${NC}"
    
    if [ $health_rate -eq 100 ]; then
        echo ""
        echo -e "${GREEN}🎉 所有服务健康！生产环境就绪！${NC}"
        echo -e "${CYAN}✨ 系统状态: 完美${NC}"
        echo ""
        echo -e "${YELLOW}🚀 可以安全进行以下操作：${NC}"
        echo "  • 进行功能测试"
        echo "  • 执行性能测试" 
        echo "  • 部署到真实生产环境"
        exit 0
    elif [ $health_rate -ge 80 ]; then
        echo ""
        echo -e "${YELLOW}⚠️ 大部分服务健康，但仍有问题需要解决${NC}"
        echo -e "${CYAN}✨ 系统状态: 良好但需要优化${NC}"
        exit 1
    else
        echo ""
        echo -e "${RED}❌ 服务健康率过低！请立即解决问题！${NC}"
        echo -e "${CYAN}✨ 系统状态: 需要紧急修复${NC}"
        exit 2
    fi
else
    echo ""
    echo -e "${RED}❌ 未检测到任何服务！${NC}"
    echo -e "${YELLOW}💡 建议: 请先启动模拟生产环境${NC}"
    exit 3
fi
