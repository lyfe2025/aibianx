#!/bin/bash

# =================================
# AI变现之路 - 环境变量自动配置脚本
# =================================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 AI变现之路 - 环境变量自动配置${NC}"
echo "========================================"

# 检查是否在项目根目录
if [ ! -f "scripts.sh" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo -e "${RED}❌ 错误：请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 前端环境变量配置
echo -e "\n${YELLOW}📱 配置前端环境变量...${NC}"
if [ ! -f "frontend/.env.local" ]; then
    echo "创建 frontend/.env.local"
    cat > frontend/.env.local << 'FRONTEND_ENV'
# ===================================
# AI变现之路 - 前端环境变量配置
# ===================================

# 前端服务配置（域名和端口分离）
NEXT_PUBLIC_FRONTEND_DOMAIN=localhost
NEXT_PUBLIC_FRONTEND_PORT=80
NEXT_PUBLIC_FRONTEND_PROTOCOL=http

# 后端服务配置（域名和端口分离）
NEXT_PUBLIC_BACKEND_DOMAIN=localhost
NEXT_PUBLIC_BACKEND_PORT=1337
NEXT_PUBLIC_BACKEND_PROTOCOL=http

# 搜索服务配置（域名和端口分离）
NEXT_PUBLIC_SEARCH_DOMAIN=localhost
NEXT_PUBLIC_SEARCH_PORT=7700
NEXT_PUBLIC_SEARCH_PROTOCOL=http

# NextAuth配置
NEXTAUTH_SECRET=aibianx-dev-secret-key-2024
FRONTEND_ENV
    echo -e "${GREEN}✅ 前端环境变量配置完成${NC}"
else
    echo -e "${YELLOW}⚠️  frontend/.env.local 已存在，跳过${NC}"
fi

# 后端环境变量配置
echo -e "\n${YELLOW}🖥️  配置后端环境变量...${NC}"
if [ ! -f "backend/.env" ]; then
    echo "创建 backend/.env"
    cat > backend/.env << 'BACKEND_ENV'
# ===================================
# AI变现之路 - 后端环境变量配置
# ===================================

# 后端服务配置（域名和端口分离）
BACKEND_DOMAIN=localhost
BACKEND_PORT=1337
BACKEND_PROTOCOL=http
HOST=0.0.0.0
PORT=1337

# 前端服务配置（域名和端口分离）
FRONTEND_DOMAIN=localhost
FRONTEND_PORT=80
FRONTEND_PROTOCOL=http

# 数据库服务配置（域名和端口分离）
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=aibianx_dev
DATABASE_USERNAME=aibianx_dev
DATABASE_PASSWORD=aibianx_password

# 搜索服务配置（域名和端口分离）
MEILISEARCH_DOMAIN=localhost
MEILISEARCH_PORT=7700
MEILISEARCH_PROTOCOL=http
MEILISEARCH_API_KEY=

# Strapi安全配置
APP_KEYS=aibianx-key1,aibianx-key2,aibianx-key3,aibianx-key4
API_TOKEN_SALT=aibianx-api-token-salt
ADMIN_JWT_SECRET=aibianx-admin-jwt-secret
TRANSFER_TOKEN_SALT=aibianx-transfer-token-salt
JWT_SECRET=aibianx-jwt-secret
BACKEND_ENV
    echo -e "${GREEN}✅ 后端环境变量配置完成${NC}"
else
    echo -e "${YELLOW}⚠️  backend/.env 已存在，跳过${NC}"
fi

echo -e "\n${GREEN}🎉 环境变量配置完成！${NC}"
echo -e "\n${BLUE}📋 配置摘要：${NC}"

# 从刚刚配置的环境变量中读取值显示
frontend_domain=${FRONTEND_DOMAIN:-localhost}
frontend_port=${FRONTEND_PORT:-80}
backend_domain=${BACKEND_DOMAIN:-localhost}
backend_port=${BACKEND_PORT:-1337}
search_port=${SEARCH_PORT:-7700}
db_port=${DB_PORT:-5432}

echo "   • 前端服务：http://${frontend_domain}$([ "$frontend_port" != "80" ] && echo ":$frontend_port")"
echo "   • 后端服务：http://${backend_domain}:${backend_port}"
echo "   • 搜索引擎：http://${backend_domain}:${search_port}"
echo "   • 数据库：${backend_domain}:${db_port}"

echo -e "\n${YELLOW}💡 提示：${NC}"
echo "   • 生产环境请修改相应的URL和安全配置"
echo "   • 启动服务：./scripts.sh deploy start"
echo "   • 查看状态：./scripts.sh tools status"
