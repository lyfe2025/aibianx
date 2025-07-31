#!/bin/bash

# MeiliSearch 快速重建索引脚本
# AI变现之路项目 - 一键索引创建和数据同步
# 
# 🚀 使用场景:
# - 新部署后快速创建索引
# - 数据更新后重新同步
# - 索引配置变更后重建
# - 开发调试时快速重置

# 加载统一配置
source "$(dirname "$0")/../tools/load-config.sh"
load_config

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 === MeiliSearch 快速重建索引 ===${NC}"
echo ""

# 检查MeiliSearch服务状态
echo "🔍 检查MeiliSearch服务状态..."
HEALTH_CHECK=$(curl -s "${SEARCH_HEALTH_URL}" 2>/dev/null)
if [[ $HEALTH_CHECK != *"available"* ]]; then
    echo -e "${RED}❌ MeiliSearch服务不可用${NC}"
    echo "请先启动MeiliSearch服务："
    echo "   ./scripts.sh search deploy"
    exit 1
fi
echo -e "${GREEN}✅ MeiliSearch服务正常${NC}"

# 检测API密钥配置
echo ""
echo "🔐 检测API密钥配置..."
API_KEY_HEADER=""
if [ -f "backend/.env" ] && grep -q "^MEILISEARCH_API_KEY=" backend/.env; then
    API_KEY=$(grep "^MEILISEARCH_API_KEY=" backend/.env | cut -d'=' -f2)
    if [ -n "$API_KEY" ]; then
        API_KEY_HEADER="-H 'Authorization: Bearer $API_KEY'"
        echo -e "${BLUE}🔑 使用生产模式API密钥${NC}"
    else
        echo -e "${GREEN}🔓 使用开发模式（无需API密钥）${NC}"
    fi
else
    echo -e "${GREEN}🔓 使用开发模式（无需API密钥）${NC}"
fi

# 步骤1: 创建或更新索引结构
echo ""
echo "📋 步骤1: 创建/更新索引结构..."
create_index_structure() {
    # 创建articles索引
    echo "   📝 创建articles索引..."
    INDEX_CREATE_RESULT=$(eval "curl -s -X POST '${SEARCH_URL}/indexes' $API_KEY_HEADER -H 'Content-Type: application/json' -d '{
        \"uid\": \"articles\",
        \"primaryKey\": \"documentId\"
    }'")
    
    # 等待索引创建完成
    sleep 2
    
    # 配置索引设置
    echo "   ⚙️  配置索引设置..."
    SETTINGS_RESULT=$(eval "curl -s -X PATCH '${SEARCH_URL}/indexes/articles/settings' $API_KEY_HEADER -H 'Content-Type: application/json' -d '{
        \"searchableAttributes\": [\"title\", \"excerpt\", \"content\", \"author.name\", \"category.name\", \"tags.name\"],
        \"displayedAttributes\": [\"documentId\", \"title\", \"slug\", \"excerpt\", \"author\", \"category\", \"tags\", \"publishedAt\", \"viewCount\", \"readingTime\", \"featured\"],
        \"filterableAttributes\": [\"category.slug\", \"tags.slug\", \"author.slug\", \"featured\", \"publishedAt\"],
        \"sortableAttributes\": [\"publishedAt\", \"viewCount\", \"readingTime\", \"title\"]
    }'")
    
    # 等待设置应用
    sleep 3
    echo -e "   ✅ 索引结构创建完成"
}

create_index_structure

# 步骤2: 检查后端服务
echo ""
echo "🔌 步骤2: 检查后端服务..."
BACKEND_CHECK=$(curl -s "${BACKEND_API_URL}/search/health" 2>/dev/null)
if [[ $BACKEND_CHECK != *"available"* ]]; then
    echo -e "${YELLOW}⚠️  后端服务未运行，跳过数据同步${NC}"
    echo ""
    echo -e "${BLUE}📋 手动启动后端服务：${NC}"
    echo "   ./scripts.sh deploy backend"
    echo ""
    echo -e "${BLUE}🔄 启动后重新运行此脚本：${NC}"
    echo "   ./scripts.sh search reindex"
    echo ""
    echo -e "${GREEN}✅ 索引结构已创建，等待数据同步${NC}"
    exit 0
fi
echo -e "${GREEN}✅ 后端服务正常${NC}"

# 步骤3: 同步数据
echo ""
echo "📄 步骤3: 同步文章数据..."
echo "   🔄 正在从数据库同步文章..."
REINDEX_RESULT=$(curl -s -X POST "${BACKEND_API_URL}/search/reindex" 2>/dev/null)

# 解析同步结果
if [[ $REINDEX_RESULT == *"syncedCount"* ]]; then
    SYNCED_COUNT=$(echo $REINDEX_RESULT | grep -o '"syncedCount":[0-9]*' | cut -d':' -f2)
    echo -e "   ✅ 数据同步完成，同步了 ${GREEN}${SYNCED_COUNT}篇文章${NC}"
elif [[ $REINDEX_RESULT == *"syncedArticles"* ]]; then
    SYNCED_COUNT=$(echo $REINDEX_RESULT | grep -o '"syncedArticles":[0-9]*' | cut -d':' -f2)
    echo -e "   ✅ 数据同步完成，同步了 ${GREEN}${SYNCED_COUNT}篇文章${NC}"
else
    echo -e "   ${YELLOW}⚠️  数据同步响应异常${NC}"
    echo "   响应内容: $REINDEX_RESULT"
    echo ""
    echo -e "${BLUE}🔍 手动检查API状态：${NC}"
    echo "   curl ${BACKEND_API_URL}/search/health"
fi

# 步骤4: 验证索引状态
echo ""
echo "🔍 步骤4: 验证索引状态..."
INDEX_STATS=$(eval "curl -s '${SEARCH_URL}/indexes/articles/stats' $API_KEY_HEADER")
if [[ $INDEX_STATS == *"numberOfDocuments"* ]]; then
    DOC_COUNT=$(echo $INDEX_STATS | grep -o '"numberOfDocuments":[0-9]*' | cut -d':' -f2)
    echo -e "   ✅ 索引验证成功，当前文档数: ${GREEN}${DOC_COUNT}${NC}"
    
    # 简单搜索测试
    echo ""
    echo "🧪 步骤5: 快速搜索测试..."
    SEARCH_TEST=$(eval "curl -s -X POST '${SEARCH_URL}/indexes/articles/search' $API_KEY_HEADER -H 'Content-Type: application/json' -d '{\"q\":\"AI\",\"limit\":1}'")
    if [[ $SEARCH_TEST == *"hits"* ]]; then
        echo -e "   ✅ 搜索功能正常"
    else
        echo -e "   ${YELLOW}⚠️  搜索功能可能异常${NC}"
    fi
else
    echo -e "   ${YELLOW}⚠️  索引状态获取异常${NC}"
fi

# 显示结果总结
echo ""
echo -e "${GREEN}🎉 === 快速重建索引完成！ ===${NC}"
echo ""
echo -e "${BLUE}🌐 测试搜索功能：${NC}"
echo "   • 前端搜索: ${FRONTEND_URL}/weekly"
if [[ $API_KEY_HEADER == "" ]]; then
    echo "   • 搜索管理: ${SEARCH_URL} (开发模式图形界面)"
fi

echo ""
echo -e "${BLUE}🔧 其他管理命令：${NC}"
echo "   • 查看搜索状态: ./scripts.sh search check"
echo "   • 搜索管理工具: ./scripts.sh search manage"
echo "   • 查看系统状态: ./scripts.sh tools status"

echo ""
echo -e "${GREEN}✨ 立即测试：在前端搜索框输入 'AI' 或 '变现' 试试看！${NC}"