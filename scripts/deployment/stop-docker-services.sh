#!/bin/bash

# AI变现之路 - Docker服务停止脚本
# 专门用于停止项目相关的所有Docker容器

echo "🐳 停止Docker服务..."
echo "========================="

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 停止函数
stop_container() {
    local container_name=$1
    local service_name=$2
    
    if docker ps | grep -q "$container_name"; then
        echo -e "${BLUE}🔄 停止 $service_name ($container_name)...${NC}"
        if docker stop "$container_name" 2>/dev/null; then
            echo -e "${GREEN}✅ $service_name 已停止${NC}"
        else
            echo -e "${YELLOW}⚠️  $service_name 停止失败，尝试强制停止...${NC}"
            docker kill "$container_name" 2>/dev/null || true
        fi
    else
        echo -e "${YELLOW}💡 $service_name 未运行${NC}"
    fi
}

# 按依赖顺序停止服务

echo -e "${BLUE}📋 停止开发环境相关服务...${NC}"
stop_container "meilisearch" "搜索引擎 (MeiliSearch)"
stop_container "aibianx-redis" "缓存服务 (Redis)"
stop_container "aibianx-postgres" "数据库服务 (PostgreSQL)"

echo ""
echo -e "${BLUE}📋 停止可能的临时容器...${NC}"
# 停止可能的临时容器（通过镜像和名称模式识别）
docker ps --format "table {{.Names}}\t{{.Image}}" | grep -E "(cranky_ride|hungry_mccarthy)" | while read line; do
    container_name=$(echo "$line" | awk '{print $1}')
    if [ -n "$container_name" ] && [ "$container_name" != "NAMES" ]; then
        stop_container "$container_name" "临时容器"
    fi
done

echo ""
echo "   a) 保持运行 (推荐) - 邮件服务独立运行"
echo "   b) 同时停止 - 完全停止所有服务"
echo ""
echo -n -e "${YELLOW}请选择 [a/b，默认a]: ${NC}"

    
    stop_container "aibianx-rspamd" "项目反垃圾服务"
else
fi

# 等待容器完全停止
echo ""
echo -e "${BLUE}⏳ 等待容器完全停止...${NC}"
sleep 3

# 显示剩余运行的容器
echo ""
echo -e "${BLUE}📊 当前仍在运行的Docker容器:${NC}"
running_containers=$(docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}")
if [ -n "$running_containers" ] && [ "$running_containers" != "NAMES	IMAGE	STATUS" ]; then
    echo "$running_containers"
else
    echo -e "${GREEN}✅ 所有容器已停止${NC}"
fi

echo ""
echo -e "${GREEN}✅ Docker服务停止完成${NC}"
echo "========================="