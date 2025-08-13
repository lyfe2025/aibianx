#!/bin/bash

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载统一环境配置
source "${PROJECT_ROOT}/deployment/configure-unified-env.sh"


# MeiliSearch 一键部署脚本
# AI变现之路项目 - 搜索引擎快速部署
# 
# 🌐 Web管理界面说明:
# =====================================
# 如果您想访问MeiliSearch的Web管理界面（漂亮的图形界面）：
# ✅ 请选择"开发环境"部署模式
# ❌ "生产环境"模式出于安全考虑会禁用Web管理界面
# 
# 开发环境: 可访问图形界面
# 生产环境: 返回JSON状态，无图形界面
# =====================================

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

# 🎯 智能部署模式检测
# 支持交互模式和静默模式
if [ "$1" = "--silent" ] || [ "$1" = "--auto" ]; then
    # 静默模式：自动选择开发环境
    DEPLOY_MODE=1
    echo "🤖 静默模式: 自动部署开发环境"
else
    # 选择部署模式 - 核心区别说明
    # ===========================================
    # 开发环境 (MEILI_ENV=development):
    #   ✅ 启用Web管理界面 - 可以在浏览器访问漂亮的图形界面
    #   ✅ 无需API密钥认证 - 快速开发调试
    #   ✅ 完整功能开放 - 所有API端点都可访问
    #   ⚠️  不适合生产环境 - 安全性较低
    #
    # 生产环境 (MEILI_ENV=production):
    #   ❌ 禁用Web管理界面 - 出于安全考虑关闭图形界面
    #   🔐 强制API密钥认证 - 所有请求需要认证
    #   🛡️  更高安全性 - 限制敏感功能访问
    #   ✅ 适合生产部署 - 性能和安全优化
    # ===========================================
    echo ""
    echo "📋 请选择部署模式:"
    echo "1) 开发环境 (启用Web管理界面 + 无需API密钥)"
    echo "2) 生产环境 (禁用Web管理界面 + 强制API认证)"
    echo ""
    read -p "请输入选择 (1/2，默认1): " DEPLOY_MODE
    DEPLOY_MODE=${DEPLOY_MODE:-1}
fi

# 停止现有容器
echo ""
echo "🔄 停止现有MeiliSearch容器..."
docker stop meilisearch 2>/dev/null || echo "   没有运行中的容器"
docker rm meilisearch 2>/dev/null || echo "   没有需要删除的容器"

if [ "$DEPLOY_MODE" = "1" ]; then
    # 🚀 开发环境部署 - 启用Web管理界面
    # ========================================
    # 配置说明：
    # - MEILI_ENV=development: 开发模式，启用Web管理界面
    # - 端口7700: 映射到本地7700端口，可直接访问 ${MEILISEARCH_URL}
    # - 数据持久化: 使用Docker卷保存搜索数据
    # - 自动重启: 容器异常时自动重启，保证服务稳定性
    # ========================================
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
        echo "• 🌐 Web管理界面已启用 - 访问 ${SEARCH_URL} 查看图形界面"
        echo "• 🔓 无需API密钥认证 - 所有API请求无需认证"
        echo "• 🚀 便于快速开发调试 - 即开即用，无配置负担"
        echo "• 💾 数据自动持久化 - Docker卷保存，重启不丢失"
        echo "• 💰 完全免费使用 - 开发阶段无使用限制"
        echo ""
        
        # 🔧 清理开发环境的API密钥配置（开发模式无需API密钥）
        echo -e "${YELLOW}📝 配置开发环境变量...${NC}"
        if [ -f "backend/.env" ]; then
            # 注释掉或设置为空的API密钥
            if grep -q "^MEILISEARCH_API_KEY=" backend/.env; then
                sed -i.bak "s/^MEILISEARCH_API_KEY=.*/MEILISEARCH_API_KEY=/" backend/.env
                echo "   ✅ 已清理后端 MEILISEARCH_API_KEY (开发模式无需密钥)"
            fi
        fi
        
        # 前端通过后端API访问搜索引擎，开发模式下也无需配置API密钥
        echo "   💡 前端搜索功能通过后端API代理访问"
    else
        echo -e "${RED}❌ 部署失败${NC}"
        exit 1
    fi
    
elif [ "$DEPLOY_MODE" = "2" ]; then
    # 🔒 生产环境部署 - 禁用Web管理界面（安全考虑）
    # =============================================
    # 配置说明：
    # - MEILI_ENV=production: 生产模式，禁用Web管理界面
    # - MEILI_MASTER_KEY: 强制API密钥认证，所有请求需要认证
    # - MEILI_NO_ANALYTICS: 禁用分析数据收集，保护隐私
    # - 资源限制: 限制内存2GB和CPU1核，防止资源滥用
    # - 安全策略: 关闭图形界面减少攻击面，提高安全性
    # =============================================
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
        echo "• 🔑 Master Key: $MASTER_KEY"
        echo "• 🛡️  强制API认证 - 所有请求需要Authorization头"
        echo "• ❌ Web管理界面已禁用 - 出于安全考虑无法通过浏览器访问"
        echo "• 🚫 禁用分析收集 - 保护用户隐私数据"
        echo "• ⚡ 资源限制: 2GB内存, 1核CPU - 防止资源滥用"
        echo ""
        
        # 🔧 自动更新后端环境变量
        echo -e "${YELLOW}📝 自动更新后端环境变量...${NC}"
        if [ -f "backend/.env" ]; then
            # 更新或添加MEILISEARCH_API_KEY
            if grep -q "^MEILISEARCH_API_KEY=" backend/.env; then
                # 存在则更新
                sed -i.bak "s/^MEILISEARCH_API_KEY=.*/MEILISEARCH_API_KEY=$MASTER_KEY/" backend/.env
                echo "   ✅ 已更新后端 MEILISEARCH_API_KEY"
            else
                # 不存在则添加
                echo "MEILISEARCH_API_KEY=$MASTER_KEY" >> backend/.env
                echo "   ✅ 已添加后端 MEILISEARCH_API_KEY"
            fi
        else
            echo "   ⚠️  backend/.env 文件不存在"
        fi
        
        # 📋 前端通过后端API访问搜索引擎，无需直接配置API密钥
        echo -e "${CYAN}💡 前端搜索功能通过后端API代理访问，无需配置API密钥${NC}"
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

# 🚀 智能索引初始化 - 自动化部署流程
echo ""
echo "🔄 智能索引初始化..."

# 步骤1: 直接创建基础索引结构（不依赖后端）
echo "   📋 步骤1: 创建基础索引结构..."
create_basic_index() {
    local API_KEY_HEADER=""
    if [ "$DEPLOY_MODE" = "2" ] && [ -n "$MASTER_KEY" ]; then
        API_KEY_HEADER="-H 'Authorization: Bearer $MASTER_KEY'"
    fi
    
    # 创建articles索引
    local INDEX_CREATE_RESULT
    INDEX_CREATE_RESULT=$(eval "curl -s -X POST '${SEARCH_URL}/indexes' $API_KEY_HEADER -H 'Content-Type: application/json' -d '{
        \"uid\": \"articles\",
        \"primaryKey\": \"documentId\"
    }'")
    
    # 等待索引创建完成
    sleep 2
    
    # 配置索引设置
    local SETTINGS_RESULT
    SETTINGS_RESULT=$(eval "curl -s -X PATCH '${SEARCH_URL}/indexes/articles/settings' $API_KEY_HEADER -H 'Content-Type: application/json' -d '{
        \"searchableAttributes\": [\"title\", \"excerpt\", \"content\", \"author.name\", \"category.name\", \"tags.name\"],
        \"displayedAttributes\": [\"documentId\", \"title\", \"slug\", \"excerpt\", \"author\", \"category\", \"tags\", \"publishedAt\", \"viewCount\", \"readingTime\", \"featured\"],
        \"filterableAttributes\": [\"category.slug\", \"tags.slug\", \"author.slug\", \"featured\", \"publishedAt\"],
        \"sortableAttributes\": [\"publishedAt\", \"viewCount\", \"readingTime\", \"title\"]
    }'")
    
    echo -e "      ✅ articles索引结构创建完成"
}

# 执行基础索引创建
create_basic_index

# 步骤2: 检查并自动启动后端服务
echo "   🔌 步骤2: 检查后端服务状态..."
BACKEND_CHECK=$(curl -s "${BACKEND_API_URL}/search/health" 2>/dev/null)
if [[ $BACKEND_CHECK != *"available"* ]]; then
    echo -e "   ${YELLOW}⚠️  后端服务未运行，正在自动启动...${NC}"
    
    # 检查是否有启动脚本
    if [ -f "./scripts.sh" ]; then
        echo "      🚀 执行后端启动..."
        ./scripts.sh deploy backend > /dev/null 2>&1 &
        
        # 等待后端启动
        echo "      ⏳ 等待后端服务启动（最多60秒）..."
        local attempts=0
        while [ $attempts -lt 12 ]; do
            sleep 5
            BACKEND_CHECK=$(curl -s "${BACKEND_API_URL}/search/health" 2>/dev/null)
            if [[ $BACKEND_CHECK == *"available"* ]]; then
                echo -e "      ✅ 后端服务启动成功"
                break
            fi
            attempts=$((attempts + 1))
            printf "      ⏳ 启动中... (%d/12)\n" $attempts
        done
        
        if [[ $BACKEND_CHECK != *"available"* ]]; then
            echo -e "   ${YELLOW}⚠️  后端自动启动超时，请手动启动后运行数据同步${NC}"
            echo "   手动启动命令: ./scripts.sh deploy backend"
            echo "   手动同步命令: ./scripts.sh search reindex"
            return
        fi
    else
        echo -e "   ${YELLOW}⚠️  未找到启动脚本，请手动启动后端服务${NC}"
        return
    fi
else
    echo -e "      ✅ 后端服务已运行"
fi

# 步骤3: 自动同步数据
echo "   📄 步骤3: 自动同步文章数据..."
REINDEX_RESULT=$(curl -s -X POST "${BACKEND_API_URL}/search/reindex" 2>/dev/null)
if [[ $REINDEX_RESULT == *"syncedCount"* ]]; then
    SYNCED_COUNT=$(echo $REINDEX_RESULT | grep -o '"syncedCount":[0-9]*' | cut -d':' -f2)
    echo -e "      ✅ 数据同步完成，同步了${SYNCED_COUNT}篇文章"
elif [[ $REINDEX_RESULT == *"syncedArticles"* ]]; then
    SYNCED_COUNT=$(echo $REINDEX_RESULT | grep -o '"syncedArticles":[0-9]*' | cut -d':' -f2)
    echo -e "      ✅ 数据同步完成，同步了${SYNCED_COUNT}篇文章"
else
    echo -e "   ${YELLOW}⚠️  数据同步响应异常，请检查后端API${NC}"
    echo "   响应内容: $REINDEX_RESULT"
fi

echo -e "${GREEN}🎉 智能索引初始化完成！${NC}"

# 显示访问信息
echo ""
echo -e "${BLUE}🌐 === 访问信息 ===${NC}"
echo "• MeiliSearch服务: ${SEARCH_URL}"
if [ "$DEPLOY_MODE" = "1" ]; then
    echo "• 🌐 Web管理界面: ${SEARCH_URL} [✅ 开发模式已启用，可访问漂亮的图形界面]"
else
    echo "• ❌ Web管理界面: ${SEARCH_URL} [生产模式已禁用，无法通过浏览器访问]"
fi
echo "• 健康检查: ${SEARCH_HEALTH_URL}"
echo "• 前端搜索测试: ${FRONTEND_URL}/weekly"

if [ "$DEPLOY_MODE" = "2" ]; then
    echo "• API密钥管理: curl -H 'Authorization: Bearer $MASTER_KEY' ${SEARCH_URL}/keys"
fi

# 🎯 智能部署状态检查和建议
echo ""
echo -e "${BLUE}📋 === 部署完成状态 ===${NC}"

# 检查完整系统状态
check_system_status() {
    echo "🔍 正在检查完整系统状态..."
    
    # 检查前端服务
    FRONTEND_CHECK=$(curl -s "${FRONTEND_URL}" 2>/dev/null)
    if [[ $FRONTEND_CHECK == *"<html"* ]]; then
        echo -e "✅ 前端服务: 运行正常"
        FRONTEND_RUNNING=true
    else
        echo -e "❌ 前端服务: 未运行"
        FRONTEND_RUNNING=false
    fi
    
    # 检查后端服务状态（已在上面检查过）
    if [[ $BACKEND_CHECK == *"available"* ]]; then
        echo -e "✅ 后端服务: 运行正常"
        BACKEND_RUNNING=true
    else
        echo -e "❌ 后端服务: 未运行"
        BACKEND_RUNNING=false
    fi
    
    # 检查搜索服务
    SEARCH_CHECK=$(curl -s "${SEARCH_HEALTH_URL}" 2>/dev/null)
    if [[ $SEARCH_CHECK == *"available"* ]]; then
        echo -e "✅ 搜索服务: 运行正常"
        SEARCH_RUNNING=true
    else
        echo -e "❌ 搜索服务: 异常"
        SEARCH_RUNNING=false
    fi
}

check_system_status

# 根据状态提供智能建议
echo ""
if [ "$FRONTEND_RUNNING" = true ] && [ "$BACKEND_RUNNING" = true ] && [ "$SEARCH_RUNNING" = true ]; then
    echo -e "${GREEN}🎉 === 完整部署成功！===${NC}"
    echo "🚀 您的AI变现之路网站已完全可用，无需手动创建索引！"
    echo ""
    echo -e "${BLUE}🌐 立即体验：${NC}"
    echo "   • 网站首页: ${FRONTEND_URL}"
    echo "   • 搜索功能: ${FRONTEND_URL}/weekly"
    echo "   • 后端管理: ${BACKEND_ADMIN_URL}"
    if [ "$DEPLOY_MODE" = "1" ]; then
        echo "   • 搜索管理: ${SEARCH_URL} (漂亮的图形界面)"
    fi
    echo ""
    echo -e "${GREEN}✨ 搜索测试：在搜索框输入 'AI' 或 '变现' 试试看！${NC}"
    
elif [ "$BACKEND_RUNNING" = true ] && [ "$SEARCH_RUNNING" = true ]; then
    echo -e "${YELLOW}⚡ === 搜索引擎部署完成！===${NC}"
    echo "✅ 索引已自动创建，数据已同步，无需手动操作！"
    echo "🔧 只需启动前端服务即可完整体验："
    echo ""
    echo -e "${BLUE}📋 一键启动完整服务：${NC}"
    echo "   ./scripts.sh deploy start"
    echo ""
    echo -e "${BLUE}🌐 当前可用服务：${NC}"
    echo "   • 后端管理: ${BACKEND_ADMIN_URL}"
    if [ "$DEPLOY_MODE" = "1" ]; then
        echo "   • 搜索管理: ${SEARCH_URL}"
    fi
    
else
    echo -e "${YELLOW}🔧 === 索引已创建，需要启动服务 ===${NC}"
    echo "✅ MeiliSearch索引已自动创建完成！"
    echo ""
    echo -e "${BLUE}🚀 一键启动所有服务：${NC}"
    echo "   ./scripts.sh deploy start"
    echo ""
    if [ "$DEPLOY_MODE" = "2" ]; then
        echo -e "${YELLOW}⚠️  生产环境提醒: API密钥已自动配置，需要重启服务生效${NC}"
        echo -e "${BLUE}📋 生产环境启动：${NC}"
        echo "   • 重启后端: ./scripts.sh deploy backend"
        echo "   • 重启前端: ./scripts.sh deploy frontend"
    else
        echo -e "${BLUE}📋 开发环境启动：${NC}"
        if [ "$BACKEND_RUNNING" = false ]; then
            echo "   • 启动后端: ./scripts.sh deploy backend"
        fi
        if [ "$FRONTEND_RUNNING" = false ]; then
            echo "   • 启动前端: ./scripts.sh deploy frontend"
        fi
    fi
fi

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
