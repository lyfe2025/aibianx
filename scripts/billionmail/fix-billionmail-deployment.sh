#!/bin/bash

# BillionMail 部署修复脚本
# 解决一键部署时BillionMail数据库初始化问题

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔧 BillionMail 部署修复工具${NC}"
echo "========================================"

# 检查BillionMail目录
if [ ! -d "$PROJECT_ROOT/BillionMail" ]; then
    echo -e "${RED}❌ BillionMail目录不存在${NC}"
    exit 1
fi

cd "$PROJECT_ROOT/BillionMail"

echo -e "${BLUE}📋 检查BillionMail服务状态...${NC}"

# 检查容器状态
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ 发现运行中的BillionMail服务${NC}"
    
    # 检查是否有重启循环的容器
    restarting_containers=$(docker-compose ps | grep "Restarting" | wc -l)
    if [ $restarting_containers -gt 0 ]; then
        echo -e "${YELLOW}⚠️  发现 $restarting_containers 个重启中的容器${NC}"
        echo -e "${BLUE}🔄 重启BillionMail服务以修复问题...${NC}"
        
        # 停止所有服务
        docker-compose down
        
        # 清理可能损坏的数据
        echo -e "${YELLOW}🧹 清理可能损坏的数据目录...${NC}"
        if [ -d "postgresql-data" ] && [ "$(ls -A postgresql-data 2>/dev/null)" ]; then
            read -p "是否清理PostgreSQL数据目录? 这将重置邮件数据库 (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                rm -rf postgresql-data/*
                echo -e "${GREEN}✅ PostgreSQL数据已清理${NC}"
            fi
        fi
        
        if [ -d "redis-data" ] && [ "$(ls -A redis-data 2>/dev/null)" ]; then
            read -p "是否清理Redis数据目录? 这将重置缓存数据 (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                rm -rf redis-data/*
                echo -e "${GREEN}✅ Redis数据已清理${NC}"
            fi
        fi
        
        # 重新启动服务
        echo -e "${BLUE}🚀 重新启动BillionMail服务...${NC}"
        docker-compose up -d
        
        # 等待服务启动
        echo -e "${BLUE}⏳ 等待服务启动完成...${NC}"
        sleep 10
    fi
else
    echo -e "${YELLOW}⚠️  BillionMail服务未运行${NC}"
    echo -e "${BLUE}🚀 启动BillionMail服务...${NC}"
    
    # 确保数据目录存在
    mkdir -p postgresql-data redis-data logs
    
    # 启动服务
    docker-compose up -d
    
    # 等待服务启动
    echo -e "${BLUE}⏳ 等待服务启动完成...${NC}"
    sleep 15
fi

# 验证服务状态
echo -e "${BLUE}📊 验证服务状态...${NC}"
echo ""

# 检查核心服务
core_status=$(docker-compose ps billionmail-core-billionmail-1 2>/dev/null | grep "Up" | wc -l)
if [ $core_status -gt 0 ]; then
    echo -e "${GREEN}✅ BillionMail核心服务运行正常${NC}"
else
    echo -e "${RED}❌ BillionMail核心服务未运行${NC}"
fi

# 检查数据库
db_status=$(docker-compose ps billionmail-pgsql-billionmail-1 2>/dev/null | grep "Up" | wc -l)
if [ $db_status -gt 0 ]; then
    echo -e "${GREEN}✅ PostgreSQL数据库运行正常${NC}"
else
    echo -e "${RED}❌ PostgreSQL数据库未运行${NC}"
fi

# 检查Redis
redis_status=$(docker-compose ps billionmail-redis-billionmail-1 2>/dev/null | grep "Up" | wc -l)
if [ $redis_status -gt 0 ]; then
    echo -e "${GREEN}✅ Redis缓存服务运行正常${NC}"
else
    echo -e "${RED}❌ Redis缓存服务未运行${NC}"
fi

# 检查Web访问
echo -e "${BLUE}🌐 检查Web访问...${NC}"
if curl -s http://localhost:8080/billion >/dev/null 2>&1; then
    echo -e "${GREEN}✅ BillionMail管理界面可访问${NC}"
    echo -e "${BLUE}   🔗 访问地址: http://localhost:8080/billion${NC}"
else
    echo -e "${YELLOW}⚠️  BillionMail管理界面暂时无法访问，服务可能还在初始化中${NC}"
fi

if curl -s http://localhost:8080/roundcube >/dev/null 2>&1; then
    echo -e "${GREEN}✅ WebMail界面可访问${NC}"
    echo -e "${BLUE}   🔗 访问地址: http://localhost:8080/roundcube${NC}"
else
    echo -e "${YELLOW}⚠️  WebMail界面暂时无法访问，服务可能还在初始化中${NC}"
fi

echo ""
echo -e "${GREEN}🎉 BillionMail修复完成！${NC}"
echo ""
echo -e "${BLUE}📋 默认登录信息:${NC}"
echo -e "${BLUE}   管理界面: admin / billion${NC}"
echo ""
echo -e "${BLUE}🔧 如果仍有问题，请运行:${NC}"
echo -e "${BLUE}   cd BillionMail && docker-compose logs${NC}"