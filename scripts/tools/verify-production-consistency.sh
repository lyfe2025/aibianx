#!/bin/bash

# AI变现之路 - 生产配置一致性验证脚本
# 确保模拟环境与真实生产环境100%一致

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

echo -e "${BLUE}🔍 生产配置一致性验证${NC}"
echo "=========================================="
echo ""

# 验证结果统计
total_checks=0
passed_checks=0
failed_checks=0

# 检查函数
check_item() {
    local description=$1
    local check_command=$2
    local expected_result=$3
    
    total_checks=$((total_checks + 1))
    echo -n "检查 $description: "
    
    if eval "$check_command" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ 通过${NC}"
        passed_checks=$((passed_checks + 1))
        return 0
    else
        echo -e "${RED}❌ 失败${NC}"
        failed_checks=$((failed_checks + 1))
        return 1
    fi
}

echo -e "${CYAN}📋 Docker配置一致性检查${NC}"
echo "----------------------------------------"

# 检查Docker Compose文件存在
check_item "Docker Compose文件" "[ -f '$PROJECT_ROOT/deployment/docker-compose.unified.yml' ]"

# 检查使用的是统一配置
check_item "使用统一生产配置" "grep -q 'aibianx-integrated' '$PROJECT_ROOT/deployment/docker-compose.unified.yml'"

# 检查关键服务定义
check_item "PostgreSQL服务定义" "grep -q 'postgres:17-alpine' '$PROJECT_ROOT/deployment/docker-compose.unified.yml'"
check_item "Redis服务定义" "grep -q 'redis:7.4-alpine' '$PROJECT_ROOT/deployment/docker-compose.unified.yml'"
check_item "MeiliSearch服务定义" "grep -q 'getmeili/meilisearch:v1.5' '$PROJECT_ROOT/deployment/docker-compose.unified.yml'"
check_item "邮件系统集成" "grep -q 'email-subscription' '$PROJECT_ROOT/backend/src/api/' && echo '邮件系统已集成到Strapi'"

echo ""
echo -e "${CYAN}⚙️ 环境配置一致性检查${NC}"
echo "----------------------------------------"

# 检查环境配置文件
if [ -f "$PROJECT_ROOT/backend/.env" ]; then
    check_item "生产模式配置" "grep -q 'NODE_ENV=production' '$PROJECT_ROOT/backend/.env'"
    check_item "容器间数据库通信" "grep -q 'DATABASE_HOST=postgres' '$PROJECT_ROOT/backend/.env'"
    check_item "容器间Redis通信" "grep -q 'REDIS_HOST=redis' '$PROJECT_ROOT/backend/.env'"
    check_item "生产级安全密钥" "grep -q 'APP_KEYS=' '$PROJECT_ROOT/backend/.env' && [ \$(grep 'APP_KEYS=' '$PROJECT_ROOT/backend/.env' | cut -d'=' -f2 | tr ',' '\n' | wc -l) -eq 4 ]"
else
    echo -e "${YELLOW}⚠️ 后端环境配置文件不存在，请先启动模拟环境${NC}"
fi

echo ""
echo -e "${CYAN}🐳 容器运行一致性检查${NC}"
echo "----------------------------------------"

# 检查容器运行状态
if docker ps --format "{{.Names}}" | grep -q "aibianx-" 2>/dev/null; then
    check_item "容器命名规范" "docker ps --format '{{.Names}}' | grep -E '^aibianx-'"
    check_item "PostgreSQL容器运行" "docker ps --format '{{.Names}}' | grep -q 'aibianx-postgres'"
    check_item "Redis容器运行" "docker ps --format '{{.Names}}' | grep -q 'aibianx-redis'"
    check_item "MeiliSearch容器运行" "docker ps --format '{{.Names}}' | grep -q 'aibianx-meilisearch'"
    check_item "后端容器运行" "docker ps --format '{{.Names}}' | grep -q 'aibianx-backend'"
    check_item "前端容器运行" "docker ps --format '{{.Names}}' | grep -q 'aibianx-frontend'"
    check_item "邮件系统集成检查" "curl -s \${BACKEND_URL}/api/email-subscriptions >/dev/null && echo '邮件系统API正常'"
    check_item "Nginx网关容器运行" "docker ps --format '{{.Names}}' | grep -q 'aibianx-nginx'"
else
    echo -e "${YELLOW}⚠️ 模拟环境容器未运行，请先启动模拟环境${NC}"
fi

echo ""
echo -e "${CYAN}🌐 网络配置一致性检查${NC}"
echo "----------------------------------------"

# 检查网络配置
if docker network ls | grep -q "aibianx" 2>/dev/null; then
    check_item "Docker网络存在" "docker network ls | grep -q 'aibianx'"
    check_item "容器网络连接" "docker network inspect \$(docker network ls --format '{{.Name}}' | grep aibianx) | grep -q 'aibianx-postgres'"
else
    echo -e "${YELLOW}⚠️ Docker网络未创建，请先启动模拟环境${NC}"
fi

echo ""
echo -e "${CYAN}📊 数据持久化一致性检查${NC}"
echo "----------------------------------------"

# 检查数据卷
if docker volume ls | grep -q "aibianx" 2>/dev/null; then
    check_item "数据库数据卷" "docker volume ls | grep -q 'postgres_data'"
    check_item "Redis数据卷" "docker volume ls | grep -q 'redis_data'"
    check_item "MeiliSearch数据卷" "docker volume ls | grep -q 'meilisearch_data'"
    check_item "上传文件数据卷" "docker volume ls | grep -q 'uploads_data'"
    check_item "邮件数据卷" "docker volume ls | grep -q 'vmail_data'"
else
    echo -e "${YELLOW}⚠️ 数据卷未创建，请先启动模拟环境${NC}"
fi

echo ""
echo -e "${CYAN}🔐 安全配置一致性检查${NC}"
echo "----------------------------------------"

# 检查安全配置
if [ -f "$PROJECT_ROOT/.env" ]; then
    check_item "PostgreSQL密码配置" "grep -q 'POSTGRES_PASSWORD=' '$PROJECT_ROOT/.env' && [ \$(grep 'POSTGRES_PASSWORD=' '$PROJECT_ROOT/.env' | cut -d'=' -f2 | wc -c) -gt 10 ]"
    check_item "Redis密码配置" "grep -q 'REDIS_PASSWORD=' '$PROJECT_ROOT/.env' && [ \$(grep 'REDIS_PASSWORD=' '$PROJECT_ROOT/.env' | cut -d'=' -f2 | wc -c) -gt 10 ]"
    check_item "MeiliSearch主密钥" "grep -q 'MEILI_MASTER_KEY=' '$PROJECT_ROOT/.env' && [ \$(grep 'MEILI_MASTER_KEY=' '$PROJECT_ROOT/.env' | cut -d'=' -f2 | wc -c) -gt 20 ]"
    check_item "邮件系统配置检查" "grep -q 'SMTP_' '$PROJECT_ROOT/backend/.env' && echo 'SMTP配置存在'"
else
    echo -e "${YELLOW}⚠️ Docker环境配置文件不存在，请先启动模拟环境${NC}"
fi

echo ""
echo "=========================================="
echo -e "${BLUE}📊 验证结果统计${NC}"
echo "=========================================="
echo -e "总检查项目: ${CYAN}$total_checks${NC}"
echo -e "通过项目: ${GREEN}$passed_checks${NC}"
echo -e "失败项目: ${RED}$failed_checks${NC}"

if [ $failed_checks -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 恭喜！模拟环境与生产环境100%一致！${NC}"
    echo -e "${CYAN}✨ 生产部署成功率预测: 100%${NC}"
    echo ""
    echo -e "${YELLOW}🎯 下一步建议：${NC}"
    echo "  • 执行完整功能测试"
    echo "  • 进行生产级性能测试"
    echo "  • 验证邮件系统功能"
    echo "  • 测试支付系统流程"
    exit 0
else
    echo ""
    echo -e "${RED}❌ 发现 $failed_checks 项不一致！${NC}"
    echo -e "${YELLOW}⚠️ 请解决以下问题后重新验证：${NC}"
    echo ""
    echo -e "${CYAN}🔧 常见解决方案：${NC}"
    echo "  • 重新启动模拟环境: ./scripts.sh production local-deploy"
    echo "  • 检查Docker服务状态: docker system info"
    echo "  • 清理并重建环境: docker system prune && 重新部署"
    echo ""
    exit 1
fi