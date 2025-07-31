#!/bin/bash

# MeiliSearch 一键部署脚本
# AI变现之路项目 - 搜索引擎快速部署

# 加载统一配置
source "$(dirname "$0")/../tools/load-config.sh"
load_config

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 === MeiliSearch 一键部署 ===${NC}"
echo ""

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker未安装，请先安装Docker${NC}"
    exit 1
fi

# 检查Docker是否运行
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker未运行，请启动Docker${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker环境检查通过${NC}"

# 选择部署模式
echo ""
echo "📋 请选择部署模式:"
echo "1) 开发环境 (无需API密钥，快速开发)"
echo "2) 生产环境 (需要API密钥，安全部署)"
echo ""
read -p "请输入选择 (1/2，默认1): " DEPLOY_MODE
DEPLOY_MODE=${DEPLOY_MODE:-1}

# 停止现有容器
echo ""
echo "🔄 停止现有MeiliSearch容器..."
docker stop meilisearch 2>/dev/null || echo "   没有运行中的容器"
docker rm meilisearch 2>/dev/null || echo "   没有需要删除的容器"

if [ "$DEPLOY_MODE" = "1" ]; then
    # 开发环境部署
    echo ""
    echo -e "${YELLOW}📦 部署开发环境...${NC}"
    
    docker run -d \
        --name meilisearch \
        -p 7700:7700 \
        -e MEILI_ENV=development \
        -v meilisearch_data:/meili_data \
        --restart unless-stopped \
        getmeili/meilisearch:latest
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 开发环境部署成功${NC}"
        echo ""
        echo "📋 开发环境特点:"
        echo "• 无需API密钥认证"
        echo "• 便于快速开发调试"
        echo "• 数据自动持久化"
        echo "• 完全免费使用"
    else
        echo -e "${RED}❌ 部署失败${NC}"
        exit 1
    fi
    
elif [ "$DEPLOY_MODE" = "2" ]; then
    # 生产环境部署
    echo ""
    echo -e "${YELLOW}🏭 部署生产环境...${NC}"
    
    # 生成或输入Master Key
    echo ""
    read -p "请输入Master Key（留空自动生成）: " MASTER_KEY
    
    if [ -z "$MASTER_KEY" ]; then
        MASTER_KEY=$(openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64)
        echo -e "${YELLOW}⚠️  自动生成Master Key: ${MASTER_KEY}${NC}"
        echo -e "${RED}🔐 请妥善保存此密钥！${NC}"
    fi
    
    docker run -d \
        --name meilisearch \
        -p 7700:7700 \
        -e MEILI_ENV=production \
        -e MEILI_MASTER_KEY="$MASTER_KEY" \
        -e MEILI_NO_ANALYTICS=true \
        -v meilisearch_prod:/meili_data \
        --restart unless-stopped \
        --memory=2g \
        --cpus=1 \
        getmeili/meilisearch:latest
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 生产环境部署成功${NC}"
        echo ""
        echo "🔐 生产环境配置:"
        echo "• Master Key: $MASTER_KEY"
        echo "• 强制API认证"
        echo "• 禁用分析收集"
        echo "• 资源限制: 2GB内存, 1核CPU"
        echo ""
        echo -e "${YELLOW}📝 请将Master Key添加到后端环境变量:${NC}"
        echo "   echo 'MEILISEARCH_API_KEY=$MASTER_KEY' >> backend/.env"
    else
        echo -e "${RED}❌ 部署失败${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ 无效选择${NC}"
    exit 1
fi

# 等待服务启动
echo ""
echo "⏳ 等待服务启动..."
sleep 5

# 验证部署
echo ""
echo "🔍 验证部署状态..."

HEALTH_CHECK=$(curl -s "${SEARCH_HEALTH_URL}" 2>/dev/null)
if [[ $HEALTH_CHECK == *"available"* ]]; then
    echo -e "${GREEN}✅ 服务启动成功${NC}"
else
    echo -e "${RED}❌ 服务启动失败${NC}"
    echo "请检查Docker日志: docker logs meilisearch"
    exit 1
fi

# 初始化搜索索引
echo ""
echo "🔄 初始化搜索索引..."

# 检查后端是否运行
BACKEND_CHECK=$(curl -s "${BACKEND_API_URL}/search/health" 2>/dev/null)
if [[ $BACKEND_CHECK == *"available"* ]]; then
    # 重建索引
    REINDEX_RESULT=$(curl -s -X POST "${BACKEND_API_URL}/search/reindex" 2>/dev/null)
    if [[ $REINDEX_RESULT == *"syncedArticles"* ]]; then
        SYNCED_COUNT=$(echo $REINDEX_RESULT | grep -o '"syncedArticles":[0-9]*' | cut -d':' -f2)
        echo -e "${GREEN}✅ 索引初始化成功，同步了${SYNCED_COUNT}篇文章${NC}"
    else
        echo -e "${YELLOW}⚠️  索引初始化跳过，请手动同步数据${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  后端服务未运行，请启动后手动同步:${NC}"
    echo "   cd backend && npm run develop"
    echo "   curl -X POST ${BACKEND_API_URL}/search/reindex"
fi

# 显示访问信息
echo ""
echo -e "${BLUE}🌐 === 访问信息 ===${NC}"
echo "• MeiliSearch服务: ${SEARCH_URL}"
echo "• 健康检查: ${SEARCH_HEALTH_URL}"
echo "• 前端搜索测试: ${FRONTEND_URL}/weekly"

if [ "$DEPLOY_MODE" = "2" ]; then
    echo "• API密钥管理: curl -H 'Authorization: Bearer $MASTER_KEY' ${SEARCH_URL}/keys"
fi

# 显示后续步骤
echo ""
echo -e "${BLUE}📋 === 后续步骤 ===${NC}"
echo "1. 启动后端服务: ./scripts.sh deploy backend"
echo "2. 启动前端服务: ./scripts.sh deploy frontend"
echo "3. 访问前端页面: ${FRONTEND_URL}/weekly"
echo "4. 进行搜索测试: 在搜索框输入关键词"

# 显示管理命令
echo ""
echo -e "${BLUE}🔧 === 管理命令 ===${NC}"
echo "• 搜索管理工具: ./scripts.sh search manage"
echo "• 查看搜索状态: ./scripts.sh search check"
echo "• 重启搜索服务: ./scripts.sh search restart"
echo "• 查看搜索日志: ./scripts.sh search logs"
echo "• 重建搜索索引: ./scripts.sh search reindex"
echo "• 查看系统状态: ./scripts.sh tools status"

echo ""
echo -e "${GREEN}🎉 === 部署完成 ===${NC}"
echo ""
echo "📖 完整文档: docs/当前开发/前端系统/MeiliSearch部署与配置指南.md"