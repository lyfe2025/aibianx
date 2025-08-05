#!/bin/bash

# AI变现之路 - 完整服务状态和访问地址检查
# 从配置文件动态读取，避免硬编码

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义 - 检测终端是否支持颜色
if [ -t 1 ] && [ -n "$TERM" ] && [ "$TERM" != "dumb" ]; then
    GREEN='\033[0;32m'
    BLUE='\033[0;34m'
    YELLOW='\033[1;33m'
    RED='\033[0;31m'
    CYAN='\033[0;36m'
    NC='\033[0m'
else
    GREEN=''
    BLUE=''
    YELLOW=''
    RED=''
    CYAN=''
    NC=''
fi

# 加载配置
source "$PROJECT_ROOT/scripts/tools/load-config.sh"

echo -e "${CYAN}🚀 AI变现之路 - 完整服务状态检查${NC}"
echo "=================================================="

# 动态读取配置信息
DEPLOY_MODE=${DEPLOY_MODE:-"dev"}
DOMAIN=${DOMAIN:-"localhost"}
MAIL_DOMAIN=${MAIL_DOMAIN:-"localhost"}

# 端口配置
FRONTEND_PORT=${FRONTEND_PORT:-"80"}
BACKEND_PORT=${BACKEND_PORT:-"1337"}
MEILISEARCH_PORT=${MEILISEARCH_PORT:-"7700"}
BILLIONMAIL_PORT=${BILLIONMAIL_PORT:-"8080"}

# 根据模式设置协议
if [ "$DEPLOY_MODE" = "production" ]; then
    PROTOCOL="https"
else
    PROTOCOL="http"
fi

echo -e "${GREEN}📍 当前环境: ${DEPLOY_MODE} | 域名: ${DOMAIN}${NC}"
echo ""

# 检查各个服务状态
echo -e "${BLUE}📊 服务状态检查:${NC}"

# 1. 前端服务检查
echo -n "🌐 前端服务 (Next.js): "
if curl -s -f "http://localhost:${FRONTEND_PORT}" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 运行正常${NC}"
    FRONTEND_STATUS="✅"
else
    echo -e "${RED}❌ 未响应${NC}"
    FRONTEND_STATUS="❌"
fi

# 2. 后端服务检查
echo -n "⚙️  后端服务 (Strapi): "
if curl -s -f "http://localhost:${BACKEND_PORT}/api/articles" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 运行正常${NC}"
    BACKEND_STATUS="✅"
else
    echo -e "${RED}❌ 未响应${NC}"
    BACKEND_STATUS="❌"
fi

# 3. 搜索引擎检查
echo -n "🔍 MeiliSearch搜索: "
if curl -s -f "http://localhost:${MEILISEARCH_PORT}/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 运行正常${NC}"
    SEARCH_STATUS="✅"
else
    echo -e "${RED}❌ 未响应${NC}"
    SEARCH_STATUS="❌"
fi

# 4. 数据库检查
echo -n "🗄️  PostgreSQL数据库: "
# 读取数据库配置
source "$PROJECT_ROOT/backend/.env" 2>/dev/null || true
DB_USER_ACTUAL="${DATABASE_USERNAME:-${DB_USER:-aibianx_dev}}"
DB_NAME_ACTUAL="${DATABASE_NAME:-${DB_NAME:-aibianx_dev}}"
if psql -h localhost -U "${DB_USER_ACTUAL}" -d "${DB_NAME_ACTUAL}" -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 连接正常${NC}"
    DB_STATUS="✅"
else
    echo -e "${RED}❌ 连接失败${NC}"
    DB_STATUS="❌"
fi

# 5. BillionMail检查
echo -n "📧 BillionMail邮件系统: "
if docker ps --filter "name=billionmail-core-billionmail" --format "table {{.Status}}" | grep -q "Up"; then
    echo -e "${GREEN}✅ 容器运行中${NC}"
    EMAIL_STATUS="✅"
else
    echo -e "${RED}❌ 容器未运行${NC}"
    EMAIL_STATUS="❌"
fi

echo ""
echo -e "${BLUE}🌐 系统访问地址 (基于配置文件动态生成):${NC}"
echo "============================================"

# 前端访问地址
if [ "$FRONTEND_PORT" = "80" ]; then
    FRONTEND_URL="${PROTOCOL}://${DOMAIN}"
else
    FRONTEND_URL="${PROTOCOL}://${DOMAIN}:${FRONTEND_PORT}"
fi
echo -e "${FRONTEND_STATUS} 🌍 前端网站: ${FRONTEND_URL}"
echo -e "    📝 AI变现之路主站、文章浏览、搜索功能"

# 后端访问地址
BACKEND_URL="${PROTOCOL}://${DOMAIN}:${BACKEND_PORT}"
echo -e "${BACKEND_STATUS} ⚙️  后端管理: ${BACKEND_URL}/admin"
echo -e "    📝 Strapi内容管理、用户管理、系统配置"

echo -e "${BACKEND_STATUS} 📚 API文档: ${BACKEND_URL}/documentation"
echo -e "    📝 完整的REST API接口文档"

echo -e "${BACKEND_STATUS} 🔗 API接口: ${BACKEND_URL}/api/articles"
echo -e "    📝 文章、分类、标签等数据接口"

# 搜索引擎访问地址
SEARCH_URL="http://${DOMAIN}:${MEILISEARCH_PORT}"
echo -e "${SEARCH_STATUS} 🔍 搜索管理: ${SEARCH_URL}"
echo -e "    📝 MeiliSearch管理界面、索引管理"

# 邮件系统访问地址
EMAIL_URL="${PROTOCOL}://${DOMAIN}:${BILLIONMAIL_PORT}/billion"
echo -e "${EMAIL_STATUS} 📧 邮件管理: ${EMAIL_URL}"
echo -e "    📝 BillionMail邮件营销系统管理"

# WebMail地址 (BillionMail集成)
if [ "$DEPLOY_MODE" = "production" ]; then
    WEBMAIL_URL="https://${MAIL_DOMAIN}/roundcube"
else
    WEBMAIL_URL="http://${DOMAIN}:${BILLIONMAIL_PORT}/roundcube"
fi
echo -e "${EMAIL_STATUS} 📬 WebMail: ${WEBMAIL_URL}"
echo -e "    📝 邮件收发、邮箱管理"

echo ""
echo -e "${BLUE}📊 系统数据统计:${NC}"

# 获取数据统计
if [ "$DB_STATUS" = "✅" ]; then
    ARTICLE_COUNT=$(psql -h localhost -U "${DB_USER_ACTUAL}" -d "${DB_NAME_ACTUAL}" -t -c "SELECT COUNT(*) FROM articles;" 2>/dev/null | xargs)
    TABLE_COUNT=$(psql -h localhost -U "${DB_USER_ACTUAL}" -d "${DB_NAME_ACTUAL}" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | xargs)
    echo "📊 数据库表数量: ${TABLE_COUNT:-0}"
    echo "📝 文章数量: ${ARTICLE_COUNT:-0}"
fi

if [ "$SEARCH_STATUS" = "✅" ]; then
    SEARCH_DOCS=$(curl -s "http://localhost:${MEILISEARCH_PORT}/indexes/articles/stats" 2>/dev/null | grep -o '"numberOfDocuments":[0-9]*' | cut -d':' -f2)
    echo "🔍 搜索索引文档: ${SEARCH_DOCS:-0}"
fi

echo ""
echo -e "${BLUE}🚀 快速操作指令:${NC}"
echo "启动所有服务: ./scripts.sh deploy start"
echo "停止所有服务: ./scripts.sh deploy stop"
echo "查看系统状态: ./scripts.sh tools status"
echo "搜索引擎管理: ./scripts.sh search manage"
echo "邮件系统管理: ./scripts.sh email check"

# 统计运行状态
RUNNING_COUNT=0
TOTAL_COUNT=5

[ "$FRONTEND_STATUS" = "✅" ] && ((RUNNING_COUNT++))
[ "$BACKEND_STATUS" = "✅" ] && ((RUNNING_COUNT++))
[ "$SEARCH_STATUS" = "✅" ] && ((RUNNING_COUNT++))
[ "$DB_STATUS" = "✅" ] && ((RUNNING_COUNT++))
[ "$EMAIL_STATUS" = "✅" ] && ((RUNNING_COUNT++))

echo ""
if [ $RUNNING_COUNT -eq $TOTAL_COUNT ]; then
    echo -e "${GREEN}🎉 所有服务运行正常 (${RUNNING_COUNT}/${TOTAL_COUNT})${NC}"
else
    echo -e "${YELLOW}⚠️  部分服务需要检查 (${RUNNING_COUNT}/${TOTAL_COUNT})${NC}"
    echo ""
    echo -e "${YELLOW}🔧 需要修复的服务:${NC}"
    [ "$FRONTEND_STATUS" = "❌" ] && echo "   - 前端服务: cd frontend && npm run dev"
    [ "$BACKEND_STATUS" = "❌" ] && echo "   - 后端服务: cd backend && npm run develop"
    [ "$SEARCH_STATUS" = "❌" ] && echo "   - 搜索引擎: ./scripts.sh search deploy"
    [ "$DB_STATUS" = "❌" ] && echo "   - 数据库: 检查PostgreSQL服务状态"
    [ "$EMAIL_STATUS" = "❌" ] && echo "   - 邮件系统: cd BillionMail && docker-compose up -d"
fi