#!/bin/bash

# 加载统一配置
source "$(dirname "$0")/../tools/load-config.sh"
load_config
# MeiliSearch 状态检查脚本
# AI变现之路项目 - 搜索引擎状态验证

echo "🔍 === MeiliSearch 状态检查 ==="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 读取API密钥配置
API_KEY=""
if [ -f "backend/.env" ]; then
    API_KEY=$(grep "MEILISEARCH_API_KEY=" backend/.env | cut -d'=' -f2- | tr -d '"' | tr -d "'")
fi

# 构建认证头
AUTH_HEADER=""
if [ ! -z "$API_KEY" ]; then
    AUTH_HEADER="-H \"Authorization: Bearer $API_KEY\""
fi

# 检查函数
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        return 1
    fi
}

# 1. 检查Docker容器
echo "1. 检查Docker容器状态..."
docker ps | grep meilisearch > /dev/null
check_status "Docker容器运行正常"

# 2. 检查服务健康
echo ""
echo "2. 检查服务健康状态..."
HEALTH=$(curl -s "${SEARCH_HEALTH_URL}" 2>/dev/null)
if [[ $HEALTH == *"available"* ]]; then
    echo -e "${GREEN}✅ 服务健康状态: 正常${NC}"
else
    echo -e "${RED}❌ 服务健康状态: 异常${NC}"
    echo "   响应: $HEALTH"
fi

# 3. 检查索引状态
echo ""
echo "3. 检查索引配置..."
if [ ! -z "$API_KEY" ]; then
    INDEXES=$(curl -s -H "Authorization: Bearer $API_KEY" "${SEARCH_URL}/indexes" 2>/dev/null)
else
    INDEXES=$(curl -s "${SEARCH_URL}/indexes" 2>/dev/null)
fi

if [[ $INDEXES == *"articles"* ]]; then
    echo -e "${GREEN}✅ articles索引: 已创建${NC}"
else
    echo -e "${RED}❌ articles索引: 未找到${NC}"
fi

# 4. 检查文档数量
echo ""
echo "4. 检查索引文档..."
if [ ! -z "$API_KEY" ]; then
    STATS=$(curl -s -H "Authorization: Bearer $API_KEY" "${SEARCH_URL}/indexes/articles/stats" 2>/dev/null)
else
    STATS=$(curl -s "${SEARCH_URL}/indexes/articles/stats" 2>/dev/null)
fi

DOC_COUNT=$(echo "$STATS" | grep -o '"numberOfDocuments":[0-9]*' | cut -d':' -f2)

# 修复空值检查
if [ ! -z "$DOC_COUNT" ] && [ "$DOC_COUNT" -gt 0 ] 2>/dev/null; then
    echo -e "${GREEN}✅ 索引文档: ${DOC_COUNT}篇文章${NC}"
else
    echo -e "${YELLOW}⚠️  索引文档: 0篇文章（需要同步数据）${NC}"
    echo ""
    echo "🔄 数据同步建议:"
    echo "   curl -X POST ${BACKEND_API_URL}/search/reindex"
    DOC_COUNT=0
fi

# 5. 测试搜索功能
echo ""
echo "5. 测试搜索功能..."
if [ ! -z "$API_KEY" ]; then
    SEARCH_RESULT=$(curl -s -H "Authorization: Bearer $API_KEY" "${SEARCH_URL}/indexes/articles/search?q=AI&limit=1" 2>/dev/null)
else
    SEARCH_RESULT=$(curl -s "${SEARCH_URL}/indexes/articles/search?q=AI&limit=1" 2>/dev/null)
fi

if [[ $SEARCH_RESULT == *"hits"* ]]; then
    HITS_COUNT=$(echo "$SEARCH_RESULT" | grep -o '"estimatedTotalHits":[0-9]*' | cut -d':' -f2)
    if [ ! -z "$HITS_COUNT" ] && [ "$HITS_COUNT" -gt 0 ] 2>/dev/null; then
        echo -e "${GREEN}✅ 搜索功能: 正常（找到${HITS_COUNT}条结果）${NC}"
    else
        echo -e "${YELLOW}⚠️  搜索功能: 可用但无搜索结果${NC}"
    fi
else
    echo -e "${RED}❌ 搜索功能: 异常${NC}"
    echo "   响应: $(echo "$SEARCH_RESULT" | head -c 100)..."
fi

# 6. 检查Strapi集成
echo ""
echo "6. 检查Strapi集成..."
STRAPI_HEALTH=$(curl -s "${BACKEND_API_URL}/search/health" 2>/dev/null)
if [[ $STRAPI_HEALTH == *"available"* ]]; then
    echo -e "${GREEN}✅ Strapi集成: 正常${NC}"
else
    echo -e "${YELLOW}⚠️  Strapi集成: 后端服务可能未启动${NC}"
    echo "   启动命令: cd backend && npm run develop"
fi

# 7. 显示访问信息
echo ""
echo "🌐 === 访问信息 ==="
echo "• MeiliSearch服务: ${SEARCH_URL}"
echo "• 健康检查: ${SEARCH_HEALTH_URL}"
echo "• 搜索测试: ${SEARCH_URL}/indexes/articles/search?q=AI"
echo "• 前端搜索: ${FRONTEND_URL}/weekly"
echo "• API文档: ${BACKEND_DOCS_URL}"

# 8. 显示部署模式
echo ""
echo "📋 === 当前配置 ==="
CONTAINER_ENV=$(docker exec meilisearch env 2>/dev/null | grep MEILI_ENV || echo "MEILI_ENV=development")
echo "• 运行模式: $CONTAINER_ENV"

if [[ $CONTAINER_ENV == *"development"* ]]; then
    echo "• API密钥: 无需密钥（开发模式）"
    echo -e "${GREEN}• 状态: 开发环境配置正确${NC}"
else
    echo "• API密钥: 需要认证（生产模式）"
    echo -e "${YELLOW}• 状态: 生产环境模式${NC}"
fi

echo ""
echo "🎯 === 操作建议 ==="

# 修复数值比较的语法错误
if [ ! -z "$DOC_COUNT" ] && [ "$DOC_COUNT" -eq 0 ] 2>/dev/null; then
    echo -e "${YELLOW}1. 需要同步搜索数据:${NC}"
    echo "   ./scripts.sh search reindex"
fi

if [[ $STRAPI_HEALTH != *"available"* ]]; then
    echo -e "${YELLOW}2. 需要启动后端服务:${NC}"
    echo "   ./scripts.sh deploy start"
fi

echo -e "${GREEN}3. 测试前端搜索:${NC}"
echo "   访问 ${FRONTEND_URL}/weekly 并进行搜索测试"

echo ""
echo -e "${BLUE}🔧 更多管理操作:${NC}"
echo "   ./scripts.sh search manage     # 搜索管理工具"
echo "   ./scripts.sh search restart    # 重启搜索服务"
echo "   ./scripts.sh tools status      # 查看系统状态"

echo ""
echo "✨ === 检查完成 ==="
echo ""
echo "📖 完整部署文档: docs/当前开发/前端系统/MeiliSearch部署与配置指南.md"