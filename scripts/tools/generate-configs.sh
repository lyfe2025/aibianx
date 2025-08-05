#!/bin/bash

# AI变现之路 - 统一配置生成脚本
# 从主配置文件 config/unified.conf 生成所有服务的配置文件

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
UNIFIED_CONFIG="$PROJECT_ROOT/config/unified.conf"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔧 AI变现之路 - 统一配置生成工具${NC}"
echo "=================================="

# 检查统一配置文件
if [ ! -f "$UNIFIED_CONFIG" ]; then
    echo -e "${RED}❌ 统一配置文件不存在: $UNIFIED_CONFIG${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 加载统一配置: $UNIFIED_CONFIG${NC}"

# 加载统一配置
source "$UNIFIED_CONFIG"

# 验证必需配置
if [ -z "$DEPLOY_MODE" ]; then
    echo -e "${RED}❌ DEPLOY_MODE 未配置${NC}"
    exit 1
fi

echo -e "${BLUE}📋 配置模式: $DEPLOY_MODE${NC}"

# 根据部署模式设置变量
case "$DEPLOY_MODE" in
    "local")
        CURRENT_DOMAIN="$DEV_DOMAIN"
        CURRENT_PROTOCOL="$DEV_PROTOCOL"
        FRONTEND_CURRENT_PORT="$FRONTEND_DEV_PORT"
        DB_HOST="$DEV_DB_HOST"
        DB_NAME="$DEV_DB_NAME"
        DB_USER="$DEV_DB_USER"
        DB_PASSWORD="$DEV_DB_PASSWORD"
        NODE_ENV="development"
        ;;
    "container")
        CURRENT_DOMAIN="$DEV_DOMAIN"
        CURRENT_PROTOCOL="$DEV_PROTOCOL"
        FRONTEND_CURRENT_PORT="$FRONTEND_PORT"
        DB_HOST="$DEV_DB_HOST"
        DB_NAME="$DEV_DB_NAME"
        DB_USER="$DEV_DB_USER"
        DB_PASSWORD="$DEV_DB_PASSWORD"
        NODE_ENV="development"
        ;;
    "production")
        CURRENT_DOMAIN="$PRIMARY_DOMAIN"
        CURRENT_PROTOCOL="$PROD_PROTOCOL"
        FRONTEND_CURRENT_PORT="$FRONTEND_PORT"
        DB_HOST="$PROD_DB_HOST"
        DB_NAME="$PROD_DB_NAME"
        DB_USER="$PROD_DB_USER"
        DB_PASSWORD="$PROD_DB_PASSWORD"
        NODE_ENV="production"
        ;;
    *)
        echo -e "${RED}❌ 无效的部署模式: $DEPLOY_MODE${NC}"
        exit 1
        ;;
esac

# 创建配置目录
mkdir -p "$PROJECT_ROOT/backend" "$PROJECT_ROOT/frontend"

# 备份现有配置
backup_timestamp=$(date +"%Y%m%d_%H%M%S")
if [ -f "$PROJECT_ROOT/backend/.env" ]; then
    cp "$PROJECT_ROOT/backend/.env" "$PROJECT_ROOT/backend/.env.backup.$backup_timestamp"
    echo -e "${YELLOW}💾 备份后端配置: .env.backup.$backup_timestamp${NC}"
fi

if [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
    cp "$PROJECT_ROOT/frontend/.env.local" "$PROJECT_ROOT/frontend/.env.local.backup.$backup_timestamp"
    echo -e "${YELLOW}💾 备份前端配置: .env.local.backup.$backup_timestamp${NC}"
fi

# 生成后端配置
echo -e "${BLUE}🔧 生成后端配置...${NC}"
cat > "$PROJECT_ROOT/backend/.env" << EOF
# ===================================
# AI变现之路 - 后端环境变量配置
# ===================================
# 🤖 此文件由统一配置自动生成
# 📝 请勿直接编辑，修改 config/unified.conf 后重新生成
# 🔧 生成时间: $(date)
# 📋 部署模式: $DEPLOY_MODE
#

# 🌐 服务配置
BACKEND_DOMAIN=$CURRENT_DOMAIN
BACKEND_PORT=$BACKEND_PORT
BACKEND_PROTOCOL=$CURRENT_PROTOCOL
HOST=0.0.0.0
PORT=$BACKEND_PORT

# 🖥️ 前端服务配置
FRONTEND_DOMAIN=$CURRENT_DOMAIN
FRONTEND_PORT=$FRONTEND_CURRENT_PORT
FRONTEND_PROTOCOL=$CURRENT_PROTOCOL

# 🗄️ 数据库配置
DATABASE_CLIENT=$DATABASE_CLIENT
DATABASE_HOST=$DB_HOST
DATABASE_PORT=$DATABASE_PORT
DATABASE_NAME=$DB_NAME
DATABASE_USERNAME=$DB_USER
DATABASE_PASSWORD=$DB_PASSWORD
DATABASE_SSL=false

# 🔐 JWT认证配置
APP_KEYS=$APP_KEYS
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
JWT_SECRET=$JWT_SECRET

# 📁 文件上传配置
UPLOAD_LOCATION=./public/uploads

# 🔍 搜索引擎配置
MEILISEARCH_DOMAIN=$CURRENT_DOMAIN
MEILISEARCH_PORT=$SEARCH_PORT
MEILISEARCH_PROTOCOL=$CURRENT_PROTOCOL
MEILISEARCH_API_KEY=$([ "$SEARCH_ENV_MODE" = "production" ] && echo "$SEARCH_MASTER_KEY" || echo "")

# 📧 BillionMail集成配置
BILLIONMAIL_DOMAIN=$CURRENT_DOMAIN
BILLIONMAIL_PORT=$BILLIONMAIL_PORT
BILLIONMAIL_PROTOCOL=$CURRENT_PROTOCOL

# 📨 SMTP邮件配置
SMTP_HOST=$SMTP_HOST
SMTP_PORT=$SMTP_PORT
SMTP_USERNAME=$SMTP_USERNAME
SMTP_PASSWORD=$SMTP_PASSWORD
SMTP_FROM_EMAIL=$SMTP_FROM_EMAIL
SMTP_FROM_NAME=$SMTP_FROM_NAME

# 🔧 运行环境
NODE_ENV=$NODE_ENV
LOG_LEVEL=$LOG_LEVEL

# 🚀 功能开关
$([ "$DEPLOY_MODE" = "production" ] && echo "API_LOGGING=$PROD_API_LOGGING" || echo "API_LOGGING=$DEV_API_LOGGING")
$([ "$DEPLOY_MODE" = "production" ] && echo "CORS_ORIGIN=$PROD_CORS_ORIGIN" || echo "CORS_ORIGIN=$DEV_CORS_ORIGIN")
EOF

echo -e "${GREEN}✅ 后端配置已生成: backend/.env${NC}"

# 生成前端配置
echo -e "${BLUE}🔧 生成前端配置...${NC}"
cat > "$PROJECT_ROOT/frontend/.env.local" << EOF
# ===================================
# AI变现之路 - 前端环境变量配置
# ===================================
# 🤖 此文件由统一配置自动生成
# 📝 请勿直接编辑，修改 config/unified.conf 后重新生成
# 🔧 生成时间: $(date)
# 📋 部署模式: $DEPLOY_MODE
#

# 🌐 前端服务配置
NEXT_PUBLIC_FRONTEND_DOMAIN=$CURRENT_DOMAIN
NEXT_PUBLIC_FRONTEND_PORT=$FRONTEND_CURRENT_PORT
NEXT_PUBLIC_FRONTEND_PROTOCOL=$CURRENT_PROTOCOL

# ⚙️ 后端服务配置
NEXT_PUBLIC_BACKEND_DOMAIN=$CURRENT_DOMAIN
NEXT_PUBLIC_BACKEND_PORT=$BACKEND_PORT
NEXT_PUBLIC_BACKEND_PROTOCOL=$CURRENT_PROTOCOL

# 🔍 搜索服务配置
NEXT_PUBLIC_SEARCH_DOMAIN=$CURRENT_DOMAIN
NEXT_PUBLIC_SEARCH_PORT=$SEARCH_PORT
NEXT_PUBLIC_SEARCH_PROTOCOL=$CURRENT_PROTOCOL
NEXT_PUBLIC_SEARCH_API_KEY=$([ "$SEARCH_ENV_MODE" = "production" ] && echo "$SEARCH_MASTER_KEY" || echo "")

# 📧 BillionMail配置
NEXT_PUBLIC_BILLIONMAIL_DOMAIN=$CURRENT_DOMAIN
NEXT_PUBLIC_BILLIONMAIL_PORT=$BILLIONMAIL_PORT
NEXT_PUBLIC_BILLIONMAIL_PROTOCOL=$CURRENT_PROTOCOL

# 🔐 NextAuth配置
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
NEXTAUTH_URL=$CURRENT_PROTOCOL://$CURRENT_DOMAIN$([ "$FRONTEND_CURRENT_PORT" != "80" ] && [ "$FRONTEND_CURRENT_PORT" != "443" ] && echo ":$FRONTEND_CURRENT_PORT" || echo "")

# 🌐 网站URL配置
NEXT_PUBLIC_SITE_URL=$CURRENT_PROTOCOL://$CURRENT_DOMAIN$([ "$FRONTEND_CURRENT_PORT" != "80" ] && [ "$FRONTEND_CURRENT_PORT" != "443" ] && echo ":$FRONTEND_CURRENT_PORT" || echo "")

# 🔧 开发配置
$([ "$DEPLOY_MODE" != "production" ] && echo "NEXT_PUBLIC_DEV_MODE=true" || echo "NEXT_PUBLIC_DEV_MODE=false")
AUTO_SYNC_SEARCH=$AUTO_SYNC_SEARCH
EOF

echo -e "${GREEN}✅ 前端配置已生成: frontend/.env.local${NC}"

# 生成配置摘要
echo ""
echo -e "${BLUE}📊 配置摘要:${NC}"
echo "   🎯 部署模式: $DEPLOY_MODE"
echo "   🌐 域名: $CURRENT_DOMAIN"
echo "   🔗 协议: $CURRENT_PROTOCOL"
echo "   🖥️ 前端端口: $FRONTEND_CURRENT_PORT"
echo "   ⚙️ 后端端口: $BACKEND_PORT"
echo "   🔍 搜索端口: $SEARCH_PORT"
echo "   🗄️ 数据库: $DB_HOST:$DATABASE_PORT/$DB_NAME"
echo "   🔍 搜索模式: $SEARCH_ENV_MODE"

echo ""
echo -e "${GREEN}🎉 统一配置生成完成！${NC}"
echo ""
echo -e "${YELLOW}📋 下一步操作:${NC}"
echo "   1. 检查生成的配置文件"
echo "   2. 如需修改，编辑 config/unified.conf"  
echo "   3. 重新运行此脚本生成新配置"
echo "   4. 启动服务: ./scripts.sh"
echo ""
echo -e "${BLUE}💡 配置修改提示:${NC}"
echo "   • 开发环境: 设置 DEPLOY_MODE=container"
echo "   • 生产环境: 设置 DEPLOY_MODE=production 并配置域名"
echo "   • 本地调试: 设置 DEPLOY_MODE=local"