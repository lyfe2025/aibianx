#!/bin/bash

# AI变现之路 - 极简一键部署脚本
# 基于 deployment/config/deploy.conf 自动配置和部署整个系统
# 📦 从解压后的备份目录恢复数据和文件

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DEPLOY_CONFIG="$PROJECT_ROOT/deployment/config/deploy.conf"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🚀 AI变现之路 - 极简一键部署${NC}"
echo "=================================="

# 检查部署配置文件
if [ ! -f "$DEPLOY_CONFIG" ]; then
    echo -e "${RED}❌ 部署配置文件不存在: $DEPLOY_CONFIG${NC}"
    echo -e "${YELLOW}💡 请先配置 deployment/config/deploy.conf 文件${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 加载部署配置: $DEPLOY_CONFIG${NC}"

# 加载部署配置
source "$DEPLOY_CONFIG"

# 自动选择最新备份版本
if [ "$BACKUP_VERSION" = "latest" ]; then
    LATEST_BACKUP=$(ls -d "$PROJECT_ROOT/backups/strapi_backup_"* 2>/dev/null | grep -v "\.tar\.gz" | sed 's|.*strapi_backup_||' | sort -r | head -1)
    if [ -n "$LATEST_BACKUP" ]; then
        BACKUP_VERSION="$LATEST_BACKUP"
        echo -e "${GREEN}🔄 自动选择最新备份版本: $BACKUP_VERSION${NC}"
    else
        echo -e "${RED}❌ 未找到可用的解压后备份目录${NC}"
        echo -e "${YELLOW}💡 请确保备份已解压到 backups/strapi_backup_YYYYMMDD_HHMMSS/ 目录${NC}"
        echo -e "${CYAN}📦 解压命令: tar -xzf backups/strapi_backup_*.tar.gz -C backups/${NC}"
        exit 1
    fi
fi

# 验证必需配置
if [ -z "$DEPLOY_MODE" ]; then
    echo -e "${RED}❌ DEPLOY_MODE 未配置${NC}"
    exit 1
fi

if [ -z "$DB_NAME" ] || [ -z "$DB_USER" ] || [ -z "$DB_ADMIN_PASSWORD" ]; then
    echo -e "${RED}❌ 数据库配置不完整${NC}"
    echo "请在 deployment/config/deploy.conf 中配置以下变量："
    echo "  - DB_NAME (数据库名称)"  
    echo "  - DB_USER (数据库用户名)"
    echo "  - DB_PASSWORD (数据库密码，可为空)"
    echo "  - DB_ADMIN_PASSWORD (PostgreSQL管理员密码)"
    exit 1
fi

echo -e "${BLUE}📋 部署模式: $DEPLOY_MODE${NC}"
echo -e "${BLUE}🌐 域名: $DOMAIN${NC}"
echo -e "${BLUE}🗄️ 数据库: $DB_NAME ($DB_USER)${NC}"

# 从解压后的备份目录恢复数据和文件
restore_from_backup() {
    if [ "${AUTO_RESTORE_BACKUP:-true}" = "true" ]; then
        echo -e "${CYAN}📦 从解压后的备份目录恢复数据和文件...${NC}"
        
        # 检查解压后的备份目录是否存在
        local backup_dir="$PROJECT_ROOT/backups/strapi_backup_$BACKUP_VERSION"
        if [ ! -d "$backup_dir" ]; then
            echo -e "${RED}❌ 解压后的备份目录不存在: $BACKUP_VERSION${NC}"
            echo -e "${YELLOW}💡 可用的解压后目录:${NC}"
            ls -d "$PROJECT_ROOT/backups/strapi_backup_"* 2>/dev/null | grep -v "\.tar\.gz" | sed 's|.*strapi_backup_||' | sort -r | head -5
            echo ""
            echo -e "${CYAN}📦 如果只有压缩包，请先解压:${NC}"
            echo -e "${CYAN}   tar -xzf backups/strapi_backup_$BACKUP_VERSION.tar.gz -C backups/${NC}"
            exit 1
        fi
        
        echo "   📂 使用解压后的备份目录: $BACKUP_VERSION"
        echo "   📍 备份路径: $backup_dir"
        
        # 恢复数据库
        if [ -f "$backup_dir/database/full_backup.sql" ]; then
            echo "   🗄️ 恢复数据库备份..."
            if command -v psql &> /dev/null; then
                PGPASSWORD="$DB_ADMIN_PASSWORD" psql -h localhost -U postgres -d "$DB_FULL_NAME" -f "$backup_dir/database/full_backup.sql" > /dev/null 2>&1 || {
                    echo -e "${YELLOW}⚠️  数据库可能未启动，将在容器启动后恢复${NC}"
                }
            else
                echo -e "${YELLOW}⚠️  PostgreSQL未安装，将在Docker容器启动后恢复${NC}"
            fi
        fi
        
        # 恢复上传文件
        if [ -d "$backup_dir/uploads" ] && [ "$(ls -A "$backup_dir/uploads" 2>/dev/null)" ]; then
            echo "   📁 恢复上传文件..."
            mkdir -p "$PROJECT_ROOT/backend/public/uploads"
            cp -r "$backup_dir/uploads/"* "$PROJECT_ROOT/backend/public/uploads/" 2>/dev/null || true
        fi
        
        echo -e "${GREEN}✅ 备份恢复完成${NC}"
    fi
}

# 生成所有配置文件
generate_configs() {
    echo -e "${CYAN}🔧 生成应用配置文件...${NC}"
    
    # 创建目录
    mkdir -p "$PROJECT_ROOT/backend" "$PROJECT_ROOT/frontend" "$PROJECT_ROOT/deployment"
    
    # 备份现有配置
    backup_timestamp=$(date +"%Y%m%d_%H%M%S")
    for file in backend/.env frontend/.env.local deployment/.env; do
        if [ -f "$PROJECT_ROOT/$file" ]; then
            cp "$PROJECT_ROOT/$file" "$PROJECT_ROOT/$file.backup.$backup_timestamp"
        fi
    done
    
    # 根据部署模式设置变量
    if [ "$DEPLOY_MODE" = "production" ]; then
        CURRENT_PROTOCOL="https"
        DB_HOST="postgres"
        # 智能添加环境后缀（如果用户未配置）
        if [[ "$DB_NAME" == *"_prod" ]]; then
            DB_FULL_NAME="$DB_NAME"
        else
            DB_FULL_NAME="${DB_NAME}_prod"
        fi
        if [[ "$DB_USER" == *"_prod" ]]; then
            DB_FULL_USER="$DB_USER"
        else
            DB_FULL_USER="${DB_USER}_prod"
        fi
        NODE_ENV="production"
    else
        CURRENT_PROTOCOL="http"
        DB_HOST="localhost"
        # 智能添加环境后缀（如果用户未配置）
        if [[ "$DB_NAME" == *"_dev" ]]; then
            DB_FULL_NAME="$DB_NAME"
        else
            DB_FULL_NAME="${DB_NAME}_dev"
        fi
        if [[ "$DB_USER" == *"_dev" ]]; then
            DB_FULL_USER="$DB_USER"
        else
            DB_FULL_USER="${DB_USER}_dev"
        fi
        NODE_ENV="development"
    fi
    
    # 生成后端配置
    cat > "$PROJECT_ROOT/backend/.env" << EOF
# ===================================
# AI变现之路 - 后端配置 (自动生成)
# ===================================
# 🤖 基于 deployment/config/deploy.conf 自动生成
# 📋 部署模式: $DEPLOY_MODE

# 服务配置
HOST=0.0.0.0
PORT=1337
BACKEND_DOMAIN=$DOMAIN
BACKEND_PORT=1337
BACKEND_PROTOCOL=$CURRENT_PROTOCOL

# 前端配置
FRONTEND_DOMAIN=$DOMAIN
FRONTEND_PORT=80
FRONTEND_PROTOCOL=$CURRENT_PROTOCOL

# 数据库配置
DATABASE_CLIENT=postgres
DATABASE_HOST=$DB_HOST
DATABASE_PORT=5432
DATABASE_NAME=$DB_FULL_NAME
DATABASE_USERNAME=$DB_FULL_USER
DATABASE_PASSWORD=$DB_PASSWORD
DATABASE_SSL=false

# JWT配置 (自动生成)
APP_KEYS=app_key_1,app_key_2,app_key_3,app_key_4
API_TOKEN_SALT=api_token_salt_here
ADMIN_JWT_SECRET=admin_jwt_secret_here
TRANSFER_TOKEN_SALT=transfer_token_salt_here
JWT_SECRET=jwt_secret_here

# 文件上传
UPLOAD_LOCATION=./public/uploads

# 搜索引擎
MEILISEARCH_DOMAIN=$DOMAIN
MEILISEARCH_PORT=7700
MEILISEARCH_PROTOCOL=$CURRENT_PROTOCOL
MEILISEARCH_API_KEY=

# 邮件系统
BILLIONMAIL_DOMAIN=$DOMAIN
BILLIONMAIL_PORT=8080
BILLIONMAIL_PROTOCOL=$CURRENT_PROTOCOL

# 运行环境
NODE_ENV=$NODE_ENV
EOF
    
    # 生成前端配置
    cat > "$PROJECT_ROOT/frontend/.env.local" << EOF
# ===================================
# AI变现之路 - 前端配置 (自动生成)
# ===================================
# 🤖 基于 deployment/config/deploy.conf 自动生成
# 📋 部署模式: $DEPLOY_MODE

# 前端服务
NEXT_PUBLIC_FRONTEND_DOMAIN=$DOMAIN
NEXT_PUBLIC_FRONTEND_PORT=80
NEXT_PUBLIC_FRONTEND_PROTOCOL=$CURRENT_PROTOCOL

# 后端服务
NEXT_PUBLIC_BACKEND_DOMAIN=$DOMAIN
NEXT_PUBLIC_BACKEND_PORT=1337
NEXT_PUBLIC_BACKEND_PROTOCOL=$CURRENT_PROTOCOL

# 搜索服务
NEXT_PUBLIC_SEARCH_DOMAIN=$DOMAIN
NEXT_PUBLIC_SEARCH_PORT=7700
NEXT_PUBLIC_SEARCH_PROTOCOL=$CURRENT_PROTOCOL
NEXT_PUBLIC_SEARCH_API_KEY=

# 邮件系统
NEXT_PUBLIC_BILLIONMAIL_DOMAIN=$DOMAIN
NEXT_PUBLIC_BILLIONMAIL_PORT=8080
NEXT_PUBLIC_BILLIONMAIL_PROTOCOL=$CURRENT_PROTOCOL

# 认证配置
NEXTAUTH_SECRET=nextauth_secret_key_2024
NEXTAUTH_URL=$CURRENT_PROTOCOL://$DOMAIN

# 网站配置
NEXT_PUBLIC_SITE_URL=$CURRENT_PROTOCOL://$DOMAIN
EOF

    # 生成Docker配置
    cat > "$PROJECT_ROOT/deployment/.env" << EOF
# ===================================
# AI变现之路 - Docker配置 (自动生成)
# ===================================
# 🤖 基于 deployment/config/deploy.conf 自动生成

# 域名配置
DOMAIN=$DOMAIN
MAIL_DOMAIN=$MAIL_DOMAIN

# 数据库配置
POSTGRES_PASSWORD=$DB_ADMIN_PASSWORD
REDIS_PASSWORD=redis_password_2024

# 搜索引擎
MEILI_MASTER_KEY=

# NextAuth配置
NEXTAUTH_SECRET=nextauth_secret_key_2024_$(date +%s)
NEXT_PUBLIC_SITE_URL=$CURRENT_PROTOCOL://$DOMAIN
NEXTAUTH_URL=$CURRENT_PROTOCOL://$DOMAIN

# 邮件系统
BILLIONMAIL_ADMIN_USERNAME=${BILLIONMAIL_USERNAME:-admin}
BILLIONMAIL_ADMIN_PASSWORD=${BILLIONMAIL_PASSWORD:-billionmail2024}
BILLIONMAIL_HOSTNAME=$MAIL_DOMAIN

# 系统配置
TZ=Asia/Shanghai
DEPLOY_MODE=$DEPLOY_MODE
EOF

    echo -e "${GREEN}✅ 配置文件生成完成${NC}"
}

# 主要部署流程
main() {
    echo ""
    echo -e "${CYAN}🔄 执行部署流程...${NC}"
    
    # 1. 从解压后的备份恢复数据和文件
    restore_from_backup
    
    # 2. 生成配置文件
    generate_configs
    
    echo ""
    echo -e "${GREEN}🎉 极简部署配置完成！${NC}"
    echo ""
    echo -e "${BLUE}📋 接下来的步骤:${NC}"
    echo "   1. 🚀 启动服务: ./scripts.sh"
    echo "      选择: 1) 启动完整环境"
    echo ""
    echo "   2. 📱 访问系统:"
    echo "      🌐 前端网站: $CURRENT_PROTOCOL://$DOMAIN"
    echo "      ⚙️  后端管理: $CURRENT_PROTOCOL://$DOMAIN:1337/admin"
    echo "      🔍 搜索管理: $CURRENT_PROTOCOL://$DOMAIN:7700"
    echo "      📧 邮件管理: $CURRENT_PROTOCOL://$DOMAIN:8080"
    echo ""
    echo -e "${YELLOW}💡 首次访问后台时请创建管理员账号:${NC}"
    echo "   用户名: admin"
    echo "   邮箱: admin@aibianx.com"
    echo "   密码: 自己设置"
    echo ""
    echo -e "${YELLOW}📧 BillionMail管理员账号:${NC}"
    echo "   用户名: ${BILLIONMAIL_USERNAME:-admin}"
    echo "   密码: ${BILLIONMAIL_PASSWORD:-billionmail2024}"
}

# 执行主流程
main "$@"