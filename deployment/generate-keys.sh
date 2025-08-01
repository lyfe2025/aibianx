#!/bin/bash

echo "🔐 AI变现之路 - 生产环境配置生成器"
echo "=================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 生成32字符随机密钥
generate_key() {
    openssl rand -base64 32 | tr -d "=+/" | cut -c1-32
}

# 生成64字符随机密钥
generate_long_key() {
    openssl rand -base64 64 | tr -d "=+/" | cut -c1-64
}

# 生成强密码
generate_password() {
    openssl rand -base64 24 | tr -d "=+/"
}

# 创建完整的 .env 文件
create_env_file() {
    local domain=${1:-"yourdomain.com"}
    
    cat > .env << EOF
# ===== AI变现之路 - Docker部署环境变量配置 =====
# 生产环境配置文件 - $(date '+%Y-%m-%d %H:%M:%S')

# ===== 基本配置 =====
DOMAIN=$domain
PROJECT_NAME=aibianx

# ===== 数据库配置 =====
POSTGRES_DB=aibianx
POSTGRES_USER=postgres
POSTGRES_PASSWORD=$POSTGRES_PASSWORD

# ===== Strapi后端配置 =====
# 核心配置
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# 数据库连接
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=aibianx
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=$POSTGRES_PASSWORD

# JWT和密钥配置（自动生成的安全密钥）
JWT_SECRET=$JWT_SECRET
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
APP_KEYS=$APP_KEY1,$APP_KEY2,$APP_KEY3,$APP_KEY4
API_TOKEN_SALT=$API_TOKEN_SALT
TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
ENCRYPTION_KEY=$ENCRYPTION_KEY

# ===== MeiliSearch搜索引擎配置 =====
MEILI_MASTER_KEY=$MEILI_MASTER_KEY
MEILI_ENV=production
MEILISEARCH_URL=http://meilisearch:7700
MEILISEARCH_API_KEY=$MEILI_MASTER_KEY

# ===== Next.js前端配置 =====
# 前端服务配置
NEXT_PUBLIC_FRONTEND_DOMAIN=$domain
NEXT_PUBLIC_FRONTEND_PORT=80
NEXT_PUBLIC_FRONTEND_PROTOCOL=https

# 后端连接配置
NEXT_PUBLIC_BACKEND_DOMAIN=$domain
NEXT_PUBLIC_BACKEND_PORT=1337
NEXT_PUBLIC_BACKEND_PROTOCOL=https

# 搜索服务配置
NEXT_PUBLIC_SEARCH_DOMAIN=$domain
NEXT_PUBLIC_SEARCH_PORT=7700
NEXT_PUBLIC_SEARCH_PROTOCOL=https

# NextAuth配置
NEXTAUTH_URL=https://$domain
NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# ===== 邮件配置（可选） =====
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# ===== 可选配置 =====
# Strapi特性标志
FLAG_NPS=false
FLAG_PROMOTE_EE=false

# 文件上传配置
UPLOAD_SIZE_LIMIT=10000000

# 日志级别
LOG_LEVEL=info
EOF
}

# 获取域名输入参数
DOMAIN=${1:-}

# 如果没有提供域名参数，询问用户
if [ -z "$DOMAIN" ]; then
    echo -e "${YELLOW}请输入你的域名（例如：aibianx.com）：${NC}"
    read -r DOMAIN
    if [ -z "$DOMAIN" ]; then
        DOMAIN="yourdomain.com"
        echo -e "${YELLOW}使用默认域名: $DOMAIN${NC}"
    fi
fi

echo -e "${BLUE}正在生成安全密钥...${NC}"

# 生成所有密钥
JWT_SECRET=$(generate_key)
ADMIN_JWT_SECRET=$(generate_long_key)
API_TOKEN_SALT=$(generate_key)
TRANSFER_TOKEN_SALT=$(generate_key)
ENCRYPTION_KEY=$(generate_key)
MEILI_MASTER_KEY=$(generate_key)
NEXTAUTH_SECRET=$(generate_key)
POSTGRES_PASSWORD=$(generate_password)

APP_KEY1=$(generate_key)
APP_KEY2=$(generate_key)
APP_KEY3=$(generate_key)
APP_KEY4=$(generate_key)

echo -e "${GREEN}✅ 密钥生成完成！${NC}"

# 备份现有 .env 文件（如果存在）
if [ -f ".env" ]; then
    echo -e "${BLUE}📦 备份现有 .env 文件...${NC}"
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
fi

# 直接创建完整的 .env 文件
echo -e "${BLUE}📝 生成完整的 .env 配置文件...${NC}"
create_env_file "$DOMAIN"

echo -e "${GREEN}✅ .env 文件创建完成！${NC}"
echo ""
echo -e "${BLUE}📋 生成的配置信息：${NC}"
echo -e "域名: ${GREEN}$DOMAIN${NC}"
echo -e "数据库密码: ${GREEN}$POSTGRES_PASSWORD${NC}"
echo -e "项目名称: ${GREEN}aibianx${NC}"
echo ""
echo -e "${YELLOW}⚠️  重要提醒：${NC}"
echo -e "${YELLOW}1. 请检查 .env 文件中的域名配置是否正确${NC}"
echo -e "${YELLOW}2. 如需配置邮件服务，请修改 SMTP_* 相关配置${NC}"
echo -e "${YELLOW}3. 所有安全密钥已自动生成，请勿随意修改${NC}"
echo ""
echo -e "${GREEN}🎉 配置文件生成完成！可以开始部署了！${NC}"