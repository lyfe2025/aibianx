#!/bin/bash
# AI变现之路 - 统一配置管理脚本
# 根据部署模式自动配置前后端统一配置文件，不创建额外配置文件

set -e

# 项目配置
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND_ENV="$PROJECT_ROOT/frontend/.env.local"
BACKEND_ENV="$PROJECT_ROOT/backend/.env"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔧 AI变现之路 - 统一配置管理工具"
echo "=================================="

# 显示使用帮助
show_usage() {
    echo ""
    echo -e "${BLUE}📋 使用方式:${NC}"
    echo "  $0 <mode> [domain] [mail_domain]"
    echo ""
    echo -e "${BLUE}📋 部署模式:${NC}"
    echo "  dev        - 开发环境模式 (localhost)"
    echo "  integrated - 整合部署模式 (Docker容器)"
    echo ""
    echo -e "${BLUE}📋 使用示例:${NC}"
    echo "  $0 dev                                    # 开发环境"
    echo "  $0 integrated                             # 整合环境（使用默认域名）"
    echo "  $0 integrated yourdomain.com              # 整合环境（指定域名）"
    echo "  $0 integrated yourdomain.com mail.yourdomain.com  # 整合环境（指定域名和邮件域名）"
    echo ""
}

# 参数验证
MODE="$1"
DOMAIN="${2:-yourdomain.com}"
MAIL_DOMAIN="${3:-mail.$DOMAIN}"

if [ -z "$MODE" ]; then
    echo -e "${RED}❌ 错误：未指定部署模式${NC}"
    show_usage
    exit 1
fi

if [[ "$MODE" != "dev" && "$MODE" != "integrated" ]]; then
    echo -e "${RED}❌ 错误：无效的部署模式: $MODE${NC}"
    show_usage
    exit 1
fi

echo -e "${BLUE}📋 配置信息:${NC}"
echo "   🎯 部署模式: $MODE"
echo "   🌐 网站域名: $DOMAIN"
echo "   📧 邮件域名: $MAIL_DOMAIN"
echo "   📁 前端配置: $FRONTEND_ENV"
echo "   📁 后端配置: $BACKEND_ENV"
echo ""

# 生成安全密钥
generate_key() { openssl rand -base64 32 | tr -d "=+/" | cut -c1-32; }
generate_long_key() { openssl rand -base64 64 | tr -d "=+/" | cut -c1-64; }
generate_password() { openssl rand -base64 24 | tr -d "=+/"; }

# 备份现有配置
backup_configs() {
    echo -e "${BLUE}💾 备份现有配置文件...${NC}"
    
    local timestamp=$(date +%Y%m%d_%H%M%S)
    
    if [ -f "$FRONTEND_ENV" ]; then
        cp "$FRONTEND_ENV" "$FRONTEND_ENV.backup.$timestamp"
        echo "   ✅ 前端配置已备份: $FRONTEND_ENV.backup.$timestamp"
    fi
    
    if [ -f "$BACKEND_ENV" ]; then
        cp "$BACKEND_ENV" "$BACKEND_ENV.backup.$timestamp"
        echo "   ✅ 后端配置已备份: $BACKEND_ENV.backup.$timestamp"
    fi
}

# 配置开发环境
configure_dev_mode() {
    echo -e "${BLUE}🔧 配置开发环境模式...${NC}"
    
    # 前端开发配置
    cat > "$FRONTEND_ENV" << 'EOF'
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
NEXT_PUBLIC_SEARCH_API_KEY=

# BillionMail邮件营销配置（域名和端口分离）
NEXT_PUBLIC_BILLIONMAIL_DOMAIN=localhost
NEXT_PUBLIC_BILLIONMAIL_PORT=8080
NEXT_PUBLIC_BILLIONMAIL_PROTOCOL=http

# NextAuth配置
NEXTAUTH_SECRET=aibianx-dev-secret-key-2024
EOF

    # 后端开发配置
    cat > "$BACKEND_ENV" << 'EOF'
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
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=aibianx_dev
DATABASE_USERNAME=aibianx_dev
DATABASE_PASSWORD=

# 搜索服务配置（域名和端口分离）
MEILISEARCH_DOMAIN=localhost
MEILISEARCH_PORT=7700
MEILISEARCH_PROTOCOL=http
MEILISEARCH_API_KEY=

# BillionMail邮件营销配置（域名和端口分离）
BILLIONMAIL_DOMAIN=localhost
BILLIONMAIL_PORT=8080
BILLIONMAIL_PROTOCOL=http
BILLIONMAIL_API_KEY=your-billionmail-api-key-here
BILLIONMAIL_DEFAULT_LIST_ID=1

# Strapi安全配置
APP_KEYS=aibianx-key1,aibianx-key2,aibianx-key3,aibianx-key4
API_TOKEN_SALT=aibianx-api-token-salt
ADMIN_JWT_SECRET=aibianx-admin-jwt-secret
TRANSFER_TOKEN_SALT=aibianx-transfer-token-salt
JWT_SECRET=aibianx-jwt-secret
EOF

    echo -e "${GREEN}✅ 开发环境配置完成${NC}"
}

# 配置整合环境
configure_integrated_mode() {
    echo -e "${BLUE}🔧 配置整合部署环境...${NC}"
    
    # 生成安全密钥
    echo -e "${BLUE}🔐 生成安全密钥...${NC}"
    local jwt_secret=$(generate_key)
    local admin_jwt_secret=$(generate_long_key)
    local api_token_salt=$(generate_key)
    local transfer_token_salt=$(generate_key)
    local nextauth_secret=$(generate_key)
    local meili_master_key=$(generate_key)
    local postgres_password=$(generate_password)
    local billionmail_api_key=$(generate_key)
    
    local app_key1=$(generate_key)
    local app_key2=$(generate_key)
    local app_key3=$(generate_key)
    local app_key4=$(generate_key)
    
    # 前端整合配置
    cat > "$FRONTEND_ENV" << EOF
# ===================================
# AI变现之路 - 前端整合部署配置
# ===================================
# 生成时间: $(date '+%Y-%m-%d %H:%M:%S')

# 前端服务配置（整合部署）
NEXT_PUBLIC_FRONTEND_DOMAIN=$DOMAIN
NEXT_PUBLIC_FRONTEND_PORT=80
NEXT_PUBLIC_FRONTEND_PROTOCOL=https

# 后端服务配置（整合部署）
NEXT_PUBLIC_BACKEND_DOMAIN=$DOMAIN
NEXT_PUBLIC_BACKEND_PORT=1337
NEXT_PUBLIC_BACKEND_PROTOCOL=https

# 搜索服务配置（整合部署）
NEXT_PUBLIC_SEARCH_DOMAIN=$DOMAIN
NEXT_PUBLIC_SEARCH_PORT=7700
NEXT_PUBLIC_SEARCH_PROTOCOL=https
NEXT_PUBLIC_SEARCH_API_KEY=$meili_master_key

# BillionMail邮件营销配置（整合部署）
NEXT_PUBLIC_BILLIONMAIL_DOMAIN=$DOMAIN
NEXT_PUBLIC_BILLIONMAIL_PORT=8080
NEXT_PUBLIC_BILLIONMAIL_PROTOCOL=https

# NextAuth配置（整合部署）
NEXTAUTH_SECRET=$nextauth_secret
NEXTAUTH_URL=https://$DOMAIN
EOF

    # 后端整合配置
    cat > "$BACKEND_ENV" << EOF
# ===================================
# AI变现之路 - 后端整合部署配置
# ===================================
# 生成时间: $(date '+%Y-%m-%d %H:%M:%S')

# 基础服务配置
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# 后端服务配置（整合部署）
BACKEND_DOMAIN=$DOMAIN
BACKEND_PORT=1337
BACKEND_PROTOCOL=https

# 前端服务配置（整合部署）
FRONTEND_DOMAIN=$DOMAIN
FRONTEND_PORT=80
FRONTEND_PROTOCOL=https

# 数据库服务配置（整合部署 - 容器连接）
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=aibianx
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=$postgres_password

# 搜索服务配置（整合部署 - 容器连接）
MEILISEARCH_HOST=meilisearch
MEILISEARCH_PORT=7700
MEILISEARCH_URL=http://meilisearch:7700
MEILISEARCH_API_KEY=$meili_master_key

# BillionMail邮件营销配置（整合部署 - 容器连接）
BILLIONMAIL_HOST=billionmail-core
BILLIONMAIL_PORT=8080
BILLIONMAIL_API_URL=http://billionmail-core:8080/api/v1
BILLIONMAIL_API_KEY=$billionmail_api_key
BILLIONMAIL_DEFAULT_LIST_ID=1
BILLIONMAIL_ADMIN_URL=http://billionmail-core:8080/billion

# Strapi安全配置（整合部署 - 自动生成）
APP_KEYS=$app_key1,$app_key2,$app_key3,$app_key4
API_TOKEN_SALT=$api_token_salt
ADMIN_JWT_SECRET=$admin_jwt_secret
TRANSFER_TOKEN_SALT=$transfer_token_salt
JWT_SECRET=$jwt_secret

# 整合部署环境变量（供Docker Compose使用）
DOMAIN=$DOMAIN
MAIL_DOMAIN=$MAIL_DOMAIN
PROJECT_NAME=aibianx-integrated
TZ=Asia/Shanghai
POSTGRES_PASSWORD=$postgres_password
REDIS_PASSWORD=$(generate_password)
MEILI_MASTER_KEY=$meili_master_key
NEXTAUTH_SECRET=$nextauth_secret
BILLIONMAIL_ADMIN_USERNAME=admin
BILLIONMAIL_ADMIN_PASSWORD=$(generate_password)

# 可选配置
FLAG_NPS=false
FLAG_PROMOTE_EE=false
UPLOAD_SIZE_LIMIT=10000000
LOG_LEVEL=info
EOF

    echo -e "${GREEN}✅ 整合环境配置完成${NC}"
    
    # 显示重要信息
    echo ""
    echo -e "${BLUE}📋 重要配置信息:${NC}"
    echo -e "   🌐 网站域名: ${GREEN}https://$DOMAIN${NC}"
    echo -e "   📧 邮件域名: ${GREEN}$MAIL_DOMAIN${NC}"
    echo -e "   🗄️ 数据库密码: ${GREEN}$postgres_password${NC}"
    echo -e "   🔐 NextAuth密钥: ${GREEN}$nextauth_secret${NC}"
    echo -e "   🔍 搜索API密钥: ${GREEN}$meili_master_key${NC}"
    echo -e "   📧 BillionMail API: ${GREEN}$billionmail_api_key${NC}"
}

# 验证配置文件
verify_configs() {
    echo -e "${BLUE}🔍 验证配置文件...${NC}"
    
    if [ ! -f "$FRONTEND_ENV" ]; then
        echo -e "${RED}❌ 前端配置文件不存在: $FRONTEND_ENV${NC}"
        return 1
    fi
    
    if [ ! -f "$BACKEND_ENV" ]; then
        echo -e "${RED}❌ 后端配置文件不存在: $BACKEND_ENV${NC}"
        return 1
    fi
    
    # 检查关键配置项
    local frontend_lines=$(grep -c "=" "$FRONTEND_ENV" || echo "0")
    local backend_lines=$(grep -c "=" "$BACKEND_ENV" || echo "0")
    
    echo -e "${GREEN}✅ 配置验证通过${NC}"
    echo "   📁 前端配置项: $frontend_lines 个"
    echo "   📁 后端配置项: $backend_lines 个"
    
    return 0
}

# 显示后续操作指引
show_next_steps() {
    echo ""
    echo -e "${BLUE}📋 后续操作指引:${NC}"
    
    if [ "$MODE" = "dev" ]; then
        echo "   🚀 启动开发环境: ./scripts.sh deploy start"
        echo "   📊 检查系统状态: ./scripts.sh tools status"
        echo "   🌐 访问前端: 端口80 (浏览器访问localhost)"
        echo "   ⚙️ 访问后端: 端口1337 (localhost:1337/admin)"
    else
        echo "   🔧 创建整合部署配置: cd deployment && cp docker-compose.integrated.yml.template docker-compose.yml"
        echo "   🚀 启动整合环境: docker-compose up -d"
        echo "   📊 检查系统状态: ./scripts.sh integrated check"
        echo "   🌐 访问网站: https://$DOMAIN"
        echo "   ⚙️ 访问后台: https://$DOMAIN/admin"
        echo "   📧 邮件管理: https://$DOMAIN:8080/billion"
    fi
    
    echo ""
    echo -e "${YELLOW}💡 提示:${NC}"
    echo "   • 配置文件已更新为 $MODE 模式"
    echo "   • 原配置已自动备份"
    echo "   • 如需切换模式，重新运行此脚本即可"
}

# 主执行流程
main() {
    echo -e "${BLUE}开始时间: $(date)${NC}"
    echo ""
    
    # 1. 备份现有配置
    backup_configs
    
    echo ""
    
    # 2. 根据模式配置
    if [ "$MODE" = "dev" ]; then
        configure_dev_mode
    else
        configure_integrated_mode
    fi
    
    echo ""
    
    # 3. 验证配置
    if verify_configs; then
        echo ""
        show_next_steps
        echo ""
        echo -e "${GREEN}🎉 统一配置管理完成！${NC}"
    else
        echo -e "${RED}❌ 配置验证失败${NC}"
        exit 1
    fi
}

# 执行主函数
main "$@"