#!/bin/bash

# AI变现之路 - 服务状态检查脚本

# 加载统一配置
source "$(dirname "$0")/load-config.sh"
load_config

# 加载颜色支持
source "$(dirname "$0")/colors.sh"

echo -e "${BLUE}📊 AI变现之路 - 服务状态检查${NC}"
echo -e "${BLUE}===============================${NC}"

# 检查后端服务状态
echo ""
echo -e "${CYAN}⚙️  后端服务 (Strapi):${NC}"
if [ -f "logs/backend.pid" ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "   ${GREEN}✅ 运行中 (PID: $BACKEND_PID)${NC}"
        if curl -s "${BACKEND_ADMIN_URL}" > /dev/null 2>&1; then
            echo -e "   ${GREEN}✅ HTTP服务正常 (${BACKEND_URL})${NC}"
        else
            echo -e "   ${YELLOW}⚠️  HTTP服务异常${NC}"
        fi
    else
        echo -e "   ${RED}❌ 进程已停止 (PID文件存在但进程不存在)${NC}"
    fi
else
    if lsof -Pi :1337 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "   ${YELLOW}⚠️  端口1337被占用但无PID文件${NC}"
    else
        echo -e "   ${RED}❌ 未运行${NC}"
    fi
fi

echo ""

# 检查前端服务状态  
echo ""
echo -e "${CYAN}🌐 前端服务 (Next.js):${NC}"
if [ -f "logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo -e "   ${GREEN}✅ 运行中 (PID: $FRONTEND_PID)${NC}"
        if curl -s "${FRONTEND_URL}" > /dev/null 2>&1; then
            echo -e "   ${GREEN}✅ HTTP服务正常 (${FRONTEND_URL})${NC}"
        else
            echo -e "   ${YELLOW}⚠️  HTTP服务异常${NC}"
        fi
    else
        echo -e "   ${RED}❌ 进程已停止 (PID文件存在但进程不存在)${NC}"
    fi
else
    if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "   ${YELLOW}⚠️  端口80被占用但无PID文件${NC}"
    else
        echo -e "   ${RED}❌ 未运行${NC}"
    fi
fi

echo ""

# 🔍 智能检查MeiliSearch搜索引擎状态
echo ""
echo -e "${CYAN}🔍 MeiliSearch搜索引擎:${NC}"

# 检查Docker容器状态
if docker ps --format "table {{.Names}}" | grep -q "^meilisearch$"; then
    echo -e "   ${GREEN}✅ Docker容器运行中${NC}"
    
    # 🎯 使用统一配置的URL进行健康检查
    search_health_url="${SEARCH_URL}/health"
    if [ -z "$SEARCH_URL" ]; then
        search_health_url="http://localhost:7700/health"
    fi
    
    HEALTH=$(curl -s "$search_health_url" 2>/dev/null)
    if [[ $HEALTH == *"available"* ]]; then
        echo -e "   ${GREEN}✅ 服务健康正常 (${search_health_url})${NC}"
        
        # 检查索引状态
        indexes_url="${SEARCH_URL}/indexes"
        if [ -z "$SEARCH_URL" ]; then
            indexes_url="http://localhost:7700/indexes"
        fi
        
        INDEXES=$(curl -s "$indexes_url" 2>/dev/null)
        if [[ $INDEXES == *"articles"* ]]; then
            echo -e "   ${GREEN}✅ articles索引已创建${NC}"
            
            # 检查索引统计信息
            stats_url="${SEARCH_URL}/indexes/articles/stats"
            if [ -z "$SEARCH_URL" ]; then
                stats_url="http://localhost:7700/indexes/articles/stats"
            fi
            
            STATS=$(curl -s "$stats_url" 2>/dev/null)
            DOC_COUNT=$(echo "$STATS" | grep -o '"numberOfDocuments":[0-9]*' | cut -d':' -f2)
            
            if [ ! -z "$DOC_COUNT" ] && [ "$DOC_COUNT" -gt 0 ]; then
                echo -e "   ${GREEN}✅ 索引文档: ${DOC_COUNT}篇文章${NC}"
                echo -e "   ${GREEN}✅ 搜索功能: 完全就绪${NC}"
            else
                echo -e "   ${YELLOW}⚠️  索引文档: 0篇文章（需要同步数据）${NC}"
                echo -e "   ${CYAN}💡 同步命令: ./scripts.sh search reindex${NC}"
            fi
        else
            echo -e "   ${YELLOW}⚠️  articles索引未创建${NC}"
            echo -e "   ${CYAN}💡 创建命令: ./scripts/search/deploy-meilisearch.sh${NC}"
        fi
        
        # 显示管理界面信息
        if [ -z "$SEARCH_URL" ]; then
            echo -e "   ${BLUE}🌐 管理界面: http://localhost:7700${NC}"
        else
            echo -e "   ${BLUE}🌐 管理界面: ${SEARCH_URL}${NC}"
        fi
        
    else
        echo -e "   ${RED}❌ 服务健康异常 (无法访问 $search_health_url)${NC}"
        echo -e "   ${CYAN}💡 重启命令: docker restart meilisearch${NC}"
    fi
else
    # 检查是否有停止的容器
    if docker ps -a --format "table {{.Names}}" | grep -q "^meilisearch$"; then
        echo -e "   ${YELLOW}⚠️  Docker容器已停止${NC}"
        echo -e "   ${CYAN}💡 启动命令: docker start meilisearch${NC}"
    else
        echo -e "   ${RED}❌ Docker容器未创建${NC}"
        echo -e "   ${CYAN}💡 部署命令: ./scripts/search/deploy-meilisearch.sh${NC}"
    fi
fi

# 检查端口占用情况
echo ""
echo -e "${CYAN}🔌 端口占用情况:${NC}"
check_port() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        pid=$(lsof -Pi :$port -sTCP:LISTEN -t)
        cmd=$(ps -p $pid -o comm= 2>/dev/null || echo "未知")
        echo -e "   ${GREEN}✅ 端口 $port ($service): 被PID $pid ($cmd) 占用${NC}"
    else
        echo -e "   ${RED}❌ 端口 $port ($service): 空闲${NC}"
    fi
}

check_port 1337 "后端Strapi"
check_port 80 "前端Next.js"
check_port 7700 "MeiliSearch"
check_port 5432 "PostgreSQL"

echo ""

# 检查日志文件
echo ""
echo -e "${CYAN}📝 日志文件:${NC}"
if [ -f "logs/backend.log" ]; then
    backend_size=$(du -h logs/backend.log | cut -f1)
    backend_lines=$(wc -l < logs/backend.log)
    echo -e "   ${GREEN}📄 后端日志: $backend_size ($backend_lines 行)${NC}"
else
    echo -e "   ${RED}❌ 后端日志文件不存在${NC}"
fi

if [ -f "logs/frontend.log" ]; then
    frontend_size=$(du -h logs/frontend.log | cut -f1)
    frontend_lines=$(wc -l < logs/frontend.log)
    echo -e "   ${GREEN}📄 前端日志: $frontend_size ($frontend_lines 行)${NC}"
else
    echo -e "   ${RED}❌ 前端日志文件不存在${NC}"
fi

# 检查MeiliSearch日志
if docker ps | grep meilisearch > /dev/null 2>&1; then
    meilisearch_logs=$(docker logs meilisearch 2>&1 | wc -l)
    echo -e "   ${GREEN}📄 MeiliSearch日志: $meilisearch_logs 行${NC}"
else
    echo -e "   ${YELLOW}📄 MeiliSearch日志: 容器未运行${NC}"
fi

echo ""

# 检查数据库连接
echo ""
echo -e "${CYAN}🗄️  数据库连接:${NC}"
if [ -f "backend/.env" ]; then
    source backend/.env 2>/dev/null || true
    if command -v psql &> /dev/null; then
        if psql -h "${DATABASE_HOST:-127.0.0.1}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d "${DATABASE_NAME:-aibianx_dev}" -c '\q' 2>/dev/null; then
            echo -e "   ${GREEN}✅ PostgreSQL连接正常${NC}"
            # 获取数据库中的表数量
            table_count=$(psql -h "${DATABASE_HOST:-127.0.0.1}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d "${DATABASE_NAME:-aibianx_dev}" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | xargs)
            echo -e "   ${GREEN}📊 数据库表数量: $table_count${NC}"
            # 获取文章数量
            article_count=$(psql -h "${DATABASE_HOST:-127.0.0.1}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d "${DATABASE_NAME:-aibianx_dev}" -t -c "SELECT COUNT(*) FROM articles;" 2>/dev/null | xargs)
            echo -e "   ${GREEN}📝 文章数量: $article_count${NC}"
        else
            echo -e "   ${RED}❌ PostgreSQL连接失败${NC}"
        fi
    else
        echo -e "   ${YELLOW}⚠️  psql工具未安装，无法检查数据库${NC}"
    fi
else
    echo -e "   ${YELLOW}⚠️  后端环境变量文件不存在${NC}"
fi

echo ""

# API连接测试
echo ""
echo -e "${CYAN}🔗 API连接测试:${NC}"
if curl -s "${BACKEND_API_URL}/articles" > /dev/null 2>&1; then
    article_count=$(curl -s "${BACKEND_API_URL}/articles" | grep -o '"total":[0-9]*' | cut -d: -f2)
    echo -e "   ${GREEN}✅ 后端API连接正常，共有 $article_count 篇文章${NC}"
else
    echo -e "   ${RED}❌ 后端API连接失败${NC}"
fi

# 前端API测试
if curl -s "${FRONTEND_URL}" > /dev/null 2>&1; then
    echo -e "   ${GREEN}✅ 前端页面连接正常${NC}"
else
    echo -e "   ${RED}❌ 前端页面连接失败${NC}"
fi

# 搜索API测试
if curl -s "${FRONTEND_URL}":1337/api/search/health > /dev/null 2>&1; then
    echo -e "   ${GREEN}✅ 搜索API连接正常${NC}"
else
    echo -e "   ${YELLOW}⚠️  搜索API连接异常${NC}"
fi

echo ""

# 系统总览
echo ""
echo -e "${BLUE}📊 === 系统总览 ===${NC}"
# 统计运行服务数量
running_services=0
[ -f "logs/backend.pid" ] && kill -0 $(cat logs/backend.pid) 2>/dev/null && running_services=$((running_services+1))
[ -f "logs/frontend.pid" ] && kill -0 $(cat logs/frontend.pid) 2>/dev/null && running_services=$((running_services+1))
docker ps | grep meilisearch > /dev/null 2>&1 && running_services=$((running_services+1))

total_services=3
if [ $running_services -eq $total_services ]; then
    echo -e "${GREEN}✅ 系统状态: 完全运行 ($running_services/$total_services 服务)${NC}"
elif [ $running_services -gt 0 ]; then
    echo -e "${YELLOW}⚠️  系统状态: 部分运行 ($running_services/$total_services 服务)${NC}"
else
    echo -e "${RED}❌ 系统状态: 全部停止 ($running_services/$total_services 服务)${NC}"
fi

# 快速操作指南
echo ""
echo -e "${BLUE}🚀 === 快速操作指南 ===${NC}"
echo ""
echo -e "${YELLOW}📋 服务管理:${NC}"
echo -e "   ${CYAN}启动全部服务:${NC} ./scripts.sh deploy start"
echo -e "   ${CYAN}启动完整环境:${NC} ./scripts.sh deploy start"
echo -e "   ${CYAN}停止全部服务:${NC} ./scripts.sh deploy stop"
echo ""
echo -e "${YELLOW}🔍 搜索引擎:${NC}"
echo -e "   ${CYAN}部署MeiliSearch:${NC} ./scripts.sh search deploy"
echo -e "   ${CYAN}搜索管理工具:${NC} ./scripts.sh search manage"
echo -e "   ${CYAN}重启搜索服务:${NC} ./scripts.sh search restart"
echo -e "   ${CYAN}重建搜索索引:${NC} ./scripts.sh search reindex"
echo -e "   ${CYAN}检查搜索状态:${NC} ./scripts.sh search check"
echo ""
echo -e "${YELLOW}📊 监控调试:${NC}"
echo -e "   ${CYAN}查看系统状态:${NC} ./scripts.sh tools status"
echo -e "   ${CYAN}查看后端日志:${NC} tail -f logs/backend.log"
echo -e "   ${CYAN}查看前端日志:${NC} tail -f logs/frontend.log"
echo -e "   ${CYAN}查看搜索日志:${NC} ./scripts.sh search logs"
echo ""
echo -e "${YELLOW}💾 数据管理:${NC}"
echo -e "   ${CYAN}数据库备份:${NC} ./scripts.sh backup create"
echo -e "   ${CYAN}完整备份:${NC} ./scripts.sh backup full"
echo ""
echo -e "${YELLOW}🌐 访问地址:${NC}"
echo -e "   ${CYAN}前端应用:${NC} ${FRONTEND_URL} (AI变现之路主站)"
echo -e "   ${CYAN}后端管理:${NC} ${BACKEND_ADMIN_URL} (Strapi管理界面)" 
   echo -e "   ${CYAN}邮件营销:${NC} BillionMail已移除 (将由自建系统提供)"
   echo -e "   ${CYAN}WebMail:${NC} BillionMail已移除 (将由自建系统提供)"
echo -e "   ${CYAN}搜索管理:${NC} ${SEARCH_URL} (MeiliSearch管理)"
echo -e "   ${CYAN}API示例:${NC} ${BACKEND_API_URL}/articles (文章API)"
echo -e "   ${CYAN}API文档:${NC} ${BACKEND_DOCS_URL} (接口文档)" 