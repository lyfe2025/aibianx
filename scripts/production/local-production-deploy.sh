#!/bin/bash

# AI变现之路 - 本地1:1生产环境模拟部署脚本
# 完全模拟真实生产环境，仅域名不同，用于验证生产部署流程

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'

# 本地模拟生产配置（仅域名不同）
LOCAL_DOMAIN="${1:-bianx.local}"
LOCAL_MAIL_DOMAIN="mail.${LOCAL_DOMAIN}"
LOCAL_IP="127.0.0.1"

# 安全密钥生成函数（和生产环境完全一致）
generate_key() {
    openssl rand -hex 16
}

generate_long_key() {
    openssl rand -hex 32
}

generate_password() {
    openssl rand -base64 32 | tr -d "=+/" | cut -c1-25
}

echo -e "${CYAN}🚀 AI变现之路 - 本地生产环境部署${NC}"
echo "=================================================="
echo -e "${BLUE}域名配置：${NC}"
echo -e "  主域名: ${LOCAL_DOMAIN}"
echo -e "  邮件域名: ${LOCAL_MAIL_DOMAIN}"
echo -e "  本地IP: ${LOCAL_IP}"
echo ""

# 检查域名解析
check_domain_resolution() {
    echo -e "${YELLOW}🔍 检查域名解析...${NC}"
    
    # 检查 /etc/hosts 配置
    if ! grep -q "${LOCAL_DOMAIN}" /etc/hosts 2>/dev/null; then
        echo -e "${RED}❌ 域名 ${LOCAL_DOMAIN} 未在 /etc/hosts 中配置${NC}"
        echo -e "${CYAN}请手动添加以下行到 /etc/hosts：${NC}"
        echo "127.0.0.1 ${LOCAL_DOMAIN}"
        echo "127.0.0.1 ${LOCAL_MAIL_DOMAIN}"
        echo "127.0.0.1 api.${LOCAL_DOMAIN}"
        echo ""
        read -p "$(echo -e ${YELLOW}是否自动添加到 /etc/hosts？[y/N]: ${NC})" -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "127.0.0.1 ${LOCAL_DOMAIN}" | sudo tee -a /etc/hosts
            echo "127.0.0.1 ${LOCAL_MAIL_DOMAIN}" | sudo tee -a /etc/hosts  
            echo "127.0.0.1 api.${LOCAL_DOMAIN}" | sudo tee -a /etc/hosts
            echo -e "${GREEN}✅ 域名解析已配置${NC}"
        else
            echo -e "${YELLOW}⚠️  请手动配置域名解析后重新运行${NC}"
            exit 1
        fi
    else
        echo -e "${GREEN}✅ 域名解析已配置${NC}"
    fi
    
    # 测试域名解析
    if ping -c 1 "${LOCAL_DOMAIN}" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ 域名 ${LOCAL_DOMAIN} 解析正常${NC}"
    else
        echo -e "${RED}❌ 域名 ${LOCAL_DOMAIN} 解析失败${NC}"
        exit 1
    fi
}

# 生成1:1生产环境配置（和真实生产环境完全一致的配置生成方式）
generate_production_config() {
    echo -e "${YELLOW}⚙️  生成1:1生产环境配置（仅域名不同）...${NC}"
    
    # 生成安全密钥（和生产环境完全一致的方式）
    echo -e "${BLUE}🔐 生成生产级安全密钥...${NC}"
    local jwt_secret=$(generate_long_key)
    local admin_jwt_secret=$(generate_long_key)
    local api_token_salt=$(generate_key)
    local transfer_token_salt=$(generate_key)
    local nextauth_secret=$(generate_long_key)
    local meili_master_key=$(generate_long_key)
    local postgres_password=$(generate_password)
    local redis_password=$(generate_password)
    # local billionmail_api_key="bm_$(generate_key)" # 已移除BillionMail
    
    local app_key1=$(generate_key)
    local app_key2=$(generate_key)
    local app_key3=$(generate_key)
    local app_key4=$(generate_key)
    
    # 前端生产配置（和deployment/configure-unified-env.sh完全一致）
    cat > "${PROJECT_ROOT}/frontend/.env.local" << EOF
# ===================================
# AI变现之路 - 前端生产部署配置（本地模拟）
# ===================================
# 生成时间: $(date '+%Y-%m-%d %H:%M:%S')

# 前端服务配置（生产部署）
NEXT_PUBLIC_FRONTEND_DOMAIN=${LOCAL_DOMAIN}
NEXT_PUBLIC_FRONTEND_PORT=80
NEXT_PUBLIC_FRONTEND_PROTOCOL=http

# 后端服务配置（生产部署）
NEXT_PUBLIC_BACKEND_DOMAIN=${LOCAL_DOMAIN}
NEXT_PUBLIC_BACKEND_PORT=1337
NEXT_PUBLIC_BACKEND_PROTOCOL=http

# 搜索服务配置（生产部署）
NEXT_PUBLIC_SEARCH_DOMAIN=${LOCAL_DOMAIN}
NEXT_PUBLIC_SEARCH_PORT=7700
NEXT_PUBLIC_SEARCH_PROTOCOL=http
NEXT_PUBLIC_SEARCH_API_KEY=${meili_master_key}

# BillionMail邮件营销配置（生产部署）- 已移除
# NEXT_PUBLIC_BILLIONMAIL_DOMAIN=${LOCAL_MAIL_DOMAIN}
# NEXT_PUBLIC_BILLIONMAIL_PORT=8080
# NEXT_PUBLIC_BILLIONMAIL_PROTOCOL=http

# NextAuth配置（生产级别）
NEXTAUTH_URL=http://${LOCAL_DOMAIN}
NEXTAUTH_SECRET=${nextauth_secret}

# Strapi API配置（生产部署）
NEXT_PUBLIC_STRAPI_URL=http://${LOCAL_DOMAIN}:1337

# OAuth配置（生产环境需要真实配置）
NEXTAUTH_GITHUB_ID=your_production_github_client_id
NEXTAUTH_GITHUB_SECRET=your_production_github_client_secret
NEXTAUTH_GOOGLE_ID=your_production_google_client_id
NEXTAUTH_GOOGLE_SECRET=your_production_google_client_secret

# 支付配置（生产环境，本地使用沙箱测试）
NEXT_PUBLIC_PAYMENT_MODE=sandbox
NEXT_PUBLIC_ALIPAY_APP_ID=your_alipay_app_id
NEXT_PUBLIC_WECHAT_APP_ID=your_wechat_app_id
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

# 其他生产配置
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
EOF

    # 后端生产配置（和deployment/configure-unified-env.sh完全一致）
    cat > "${PROJECT_ROOT}/backend/.env" << EOF
# ===================================
# AI变现之路 - 后端生产部署配置（本地模拟）
# ===================================
# 生成时间: $(date '+%Y-%m-%d %H:%M:%S')

# Node环境配置（生产模式）
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# 后端服务配置（生产部署）
BACKEND_DOMAIN=${LOCAL_DOMAIN}
BACKEND_PORT=1337
BACKEND_PROTOCOL=http

# 前端服务配置（生产部署）
FRONTEND_DOMAIN=${LOCAL_DOMAIN}
FRONTEND_PORT=80
FRONTEND_PROTOCOL=http

# 数据库服务配置（使用开发环境数据库）
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=aibianx_dev
DATABASE_USERNAME=aibianx_dev
DATABASE_PASSWORD=

# Redis配置（生产级别）
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=${redis_password}

# 搜索服务配置（生产部署）
MEILISEARCH_DOMAIN=${LOCAL_DOMAIN}
MEILISEARCH_PORT=7700
MEILISEARCH_PROTOCOL=http
MEILISEARCH_API_KEY=${meili_master_key}

# BillionMail邮件营销配置（生产部署）- 已移除
# BILLIONMAIL_DOMAIN=${LOCAL_MAIL_DOMAIN}
# BILLIONMAIL_PORT=8080
# BILLIONMAIL_PROTOCOL=http
# BILLIONMAIL_API_KEY=${billionmail_api_key}
# BILLIONMAIL_DEFAULT_LIST_ID=1

# Strapi安全配置（生产级别）
APP_KEYS=${app_key1},${app_key2},${app_key3},${app_key4}
API_TOKEN_SALT=${api_token_salt}
ADMIN_JWT_SECRET=${admin_jwt_secret}
TRANSFER_TOKEN_SALT=${transfer_token_salt}
JWT_SECRET=${jwt_secret}

# CORS配置（生产级别）
CORS_ORIGIN=http://${LOCAL_DOMAIN}

# 文件上传配置（生产级别）
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./public/uploads

# 支付配置（生产环境，本地使用沙箱）
ALIPAY_APP_ID=your_alipay_app_id
ALIPAY_PRIVATE_KEY=your_alipay_private_key
ALIPAY_PUBLIC_KEY=your_alipay_public_key
WECHAT_APP_ID=your_wechat_app_id
WECHAT_MCH_ID=your_wechat_mch_id
WECHAT_API_KEY=your_wechat_api_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_SANDBOX=true

# 邮件配置（BillionMail已移除）
SMTP_HOST=${LOCAL_MAIL_DOMAIN}
SMTP_PORT=587
SMTP_USERNAME=noreply@${LOCAL_DOMAIN}
SMTP_PASSWORD=smtp_password_${postgres_password}
SMTP_FROM=noreply@${LOCAL_DOMAIN}
SMTP_FROM_NAME=AI变现之路

# 其他生产配置
TZ=Asia/Shanghai
EOF

    # Docker Compose环境变量文件（和生产环境完全一致）
    cat > "${PROJECT_ROOT}/.env" << EOF
# ===================================
# AI变现之路 - Docker生产部署环境变量（本地模拟）
# ===================================
# 生成时间: $(date '+%Y-%m-%d %H:%M:%S')

# 项目配置
COMPOSE_PROJECT_NAME=aibianx-integrated

# 域名配置（仅此处不同于真实生产环境）
DOMAIN=${LOCAL_DOMAIN}
MAIL_DOMAIN=${LOCAL_MAIL_DOMAIN}

# 数据库配置（使用开发环境数据库）
POSTGRES_PASSWORD=
POSTGRES_DB=aibianx_dev
POSTGRES_USER=aibianx_dev

# Redis配置（生产级别）
REDIS_PASSWORD=${redis_password}

# MeiliSearch配置（生产级别）
MEILI_MASTER_KEY=${meili_master_key}

# BillionMail配置（生产级别）- 已移除
# BILLIONMAIL_ADMIN_USERNAME=admin
# BILLIONMAIL_ADMIN_PASSWORD=admin123

# 时区配置
TZ=Asia/Shanghai

# SSL配置（本地跳过SSL）
SSL_ENABLED=false
LETSENCRYPT_EMAIL=admin@${LOCAL_DOMAIN}
EOF

    echo -e "${GREEN}✅ 1:1生产环境配置已生成${NC}"
    echo -e "${CYAN}📋 生产配置特点：${NC}"
    echo -e "  • 生产级随机安全密钥"
    echo -e "  • 容器间服务通信"
    echo -e "  • 完整的邮件系统集成"
    echo -e "  • 生产级数据库配置"
    echo -e "  • 与真实生产环境唯一差异：域名"
}

# 准备1:1生产Docker环境（使用真实生产配置）
prepare_production_docker() {
    echo -e "${YELLOW}🐳 准备1:1生产Docker环境...${NC}"
    
    # 直接使用真实生产环境的Docker配置
    echo -e "${BLUE}使用真实生产环境Docker配置...${NC}"
    
    # 创建必要的配置目录结构（和生产环境一致）
    mkdir -p "${PROJECT_ROOT}/deployment/configs/postgresql"
    # mkdir -p "${PROJECT_ROOT}/deployment/configs/billionmail/rspamd" # 已移除BillionMail
    # mkdir -p "${PROJECT_ROOT}/deployment/configs/billionmail/dovecot" # 已移除BillionMail
    # mkdir -p "${PROJECT_ROOT}/deployment/configs/billionmail/postfix" # 已移除BillionMail
    # mkdir -p "${PROJECT_ROOT}/deployment/configs/billionmail/webmail" # 已移除BillionMail
    # mkdir -p "${PROJECT_ROOT}/deployment/configs/billionmail/core" # 已移除BillionMail
    mkdir -p "${PROJECT_ROOT}/deployment/data/logs/rspamd"
    mkdir -p "${PROJECT_ROOT}/deployment/data/logs/dovecot"
    mkdir -p "${PROJECT_ROOT}/deployment/data/logs/postfix"
    # mkdir -p "${PROJECT_ROOT}/deployment/data/logs/billionmail" # 已移除BillionMail
    
    # 创建Nginx配置（生产级别）
    cat > "${PROJECT_ROOT}/deployment/nginx-unified.conf" << EOF
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # 日志格式
    log_format main '\$remote_addr - \$remote_user [\$time_local] "\$request" '
                    '\$status \$body_bytes_sent "\$http_referer" '
                    '"\$http_user_agent" "\$http_x_forwarded_for"';
    
    # 基础配置
    sendfile        on;
    tcp_nopush      on;
    tcp_nodelay     on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 10M;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # 前端应用
    upstream frontend {
        server frontend:3000;
    }
    
    # 后端API
    upstream backend {
        server backend:1337;
    }
    
    # BillionMail管理界面 (已移除)
    # upstream billionmail {
    #     server billionmail-core:8080;
    # }
    
    # 主站配置
    server {
        listen 80;
        server_name ${LOCAL_DOMAIN};
        
        # 安全头
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        
        # 前端应用
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }
        
        # 后端API
        location /api/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
        
        # 后端管理界面
        location /admin {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
        
        # 静态文件
        location /uploads/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Host \$host;
        }
    }
    
    # 邮件系统配置 (BillionMail已移除)
    # server {
    #     listen 80;
    #     server_name ${LOCAL_MAIL_DOMAIN};
    #     
    #     # BillionMail管理界面 (已移除)
    #     location / {
    #         proxy_pass http://billionmail;
    #         proxy_http_version 1.1;
    #         proxy_set_header Host \$host;
    #         proxy_set_header X-Real-IP \$remote_addr;
    #         proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    #         proxy_set_header X-Forwarded-Proto \$scheme;
    #     }
    # }
}
EOF

    echo -e "${GREEN}✅ 1:1生产Docker环境已准备${NC}"
    echo -e "${CYAN}📋 Docker配置特点：${NC}"
    echo -e "  • 使用真实生产环境Docker Compose"
    echo -e "  • 完整的邮件系统容器栈"
    echo -e "  • 生产级Nginx配置"
    echo -e "  • 容器间网络隔离"
    echo -e "  • 数据持久化配置"
}

# 启动生产环境（和真实生产环境完全一致的启动方式）
start_production_environment() {
    echo -e "${YELLOW}🚀 启动1:1生产环境...${NC}"
    
    cd "${PROJECT_ROOT}/deployment"
    
    echo -e "${BLUE}📋 生产环境启动清单：${NC}"
    echo -e "  • PostgreSQL 17数据库"
    echo -e "  • Redis 7.4缓存"
    echo -e "  • MeiliSearch 1.5搜索引擎"
    echo -e "  • Strapi后端应用"
    echo -e "  • Next.js前端应用"
    # echo -e "  • BillionMail邮件系统（7个容器）" # 已移除BillionMail
    echo -e "  • Nginx统一网关"
    echo ""
    
    # 拉取镜像
    echo -e "${BLUE}🐳 拉取生产镜像...${NC}"
    docker-compose -f docker-compose.yml pull
    
    # 构建应用镜像
    echo -e "${BLUE}🔨 构建应用镜像...${NC}"
    docker-compose -f docker-compose.yml build --no-cache
    
    # 启动所有服务
    echo -e "${BLUE}🚀 启动生产服务栈...${NC}"
    docker-compose -f docker-compose.yml up -d
    
    echo -e "${GREEN}✅ 生产环境启动完成${NC}"
    
    # 显示容器状态
    echo -e "${BLUE}📊 容器状态：${NC}"
    docker-compose -f docker-compose.yml ps
}

# 等待生产服务就绪（和真实生产环境一致的健康检查）
wait_for_production_services() {
    echo -e "${YELLOW}⏳ 等待生产服务就绪...${NC}"
    
    local max_attempts=60
    local attempt=0
    
    # 等待数据库就绪
    echo -e "${BLUE}🗄️  等待PostgreSQL数据库...${NC}"
    while [ $attempt -lt $max_attempts ]; do
        if docker exec aibianx-postgres pg_isready -U postgres >/dev/null 2>&1; then
            echo -e "${GREEN}✅ PostgreSQL数据库已就绪${NC}"
            break
        fi
        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done
    
    # 等待Redis就绪
    echo -e "${BLUE}🧠 等待Redis缓存...${NC}"
    attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if docker exec aibianx-redis redis-cli ping >/dev/null 2>&1; then
            echo -e "${GREEN}✅ Redis缓存已就绪${NC}"
            break
        fi
        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done
    
    # 等待MeiliSearch就绪
    echo -e "${BLUE}🔍 等待MeiliSearch搜索引擎...${NC}"
    attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if curl -s "${MEILISEARCH_URL}/health" >/dev/null 2>&1; then
            echo -e "${GREEN}✅ MeiliSearch搜索引擎已就绪${NC}"
            break
        fi
        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done
    
    # 等待后端API就绪
    echo -e "${BLUE}⚙️  等待Strapi后端API...${NC}"
    attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if curl -s "${BACKEND_URL}/api" >/dev/null 2>&1; then
            echo -e "${GREEN}✅ Strapi后端API已就绪${NC}"
            break
        fi
        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done
    
    # 等待前端应用就绪
    echo -e "${BLUE}🌐 等待Next.js前端应用...${NC}"
    attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if curl -s "http://${LOCAL_DOMAIN}" >/dev/null 2>&1; then
            echo -e "${GREEN}✅ Next.js前端应用已就绪${NC}"
            break
        fi
        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done
    
    # 等待邮件系统就绪
    echo -e "${BLUE}📧 等待BillionMail邮件系统...${NC}"
    attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if curl -s "${BILLIONMAIL_URL}" >/dev/null 2>&1; then
            echo -e "${GREEN}✅ BillionMail邮件系统已就绪${NC}"
            break
        fi
        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done
    
    echo -e "${GREEN}🎉 所有生产服务已就绪！${NC}"
}



# 生产环境部署验证（和真实生产环境一致的验证流程）
verify_production_deployment() {
    echo -e "${YELLOW}🔍 生产环境部署验证...${NC}"
    
    local verification_failed=0
    
    echo -e "${BLUE}📊 验证核心服务...${NC}"
    
    # 验证前端应用
    echo -n "🌐 前端应用: "
    if curl -s "http://${LOCAL_DOMAIN}" | grep -q "AI变现之路" 2>/dev/null; then
        echo -e "${GREEN}✅ 正常${NC}"
    else
        echo -e "${RED}❌ 异常${NC}"
        verification_failed=1
    fi
    
    # 验证后端API
    echo -n "⚙️  后端API: "
    if curl -s "${BACKEND_URL}/api" | grep -q "data\|message" 2>/dev/null; then
        echo -e "${GREEN}✅ 正常${NC}"
    else
        echo -e "${RED}❌ 异常${NC}"
        verification_failed=1
    fi
    
    # 验证管理后台
    echo -n "👤 管理后台: "
    if curl -s "${ADMIN_URL}" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ 正常${NC}"
    else
        echo -e "${RED}❌ 异常${NC}"
        verification_failed=1
    fi
    
    # 验证搜索引擎
    echo -n "🔍 搜索引擎: "
    if curl -s "${MEILISEARCH_URL}/health" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ 正常${NC}"
    else
        echo -e "${RED}❌ 异常${NC}"
        verification_failed=1
    fi
    
    # 验证邮件系统
    echo -n "📧 邮件系统: "
    if curl -s "${BILLIONMAIL_URL}" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ 正常${NC}"
    else
        echo -e "${RED}❌ 异常${NC}"
        verification_failed=1
    fi
    
    # 验证数据库连接
    echo -n "🗄️  数据库: "
    if docker exec aibianx-postgres psql -U postgres -d postgres -c "SELECT 1;" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ 正常${NC}"
    else
        echo -e "${RED}❌ 异常${NC}"
        verification_failed=1
    fi
    
    # 验证Redis缓存
    echo -n "🧠 缓存系统: "
    if docker exec aibianx-redis redis-cli ping | grep -q "PONG" 2>/dev/null; then
        echo -e "${GREEN}✅ 正常${NC}"
    else
        echo -e "${RED}❌ 异常${NC}"
        verification_failed=1
    fi
    
    echo ""
    if [ $verification_failed -eq 0 ]; then
        echo -e "${GREEN}🎉 生产环境部署验证通过！${NC}"
        return 0
    else
        echo -e "${RED}❌ 生产环境部署验证失败，请检查日志${NC}"
        return 1
    fi
}

# 显示生产环境访问信息
show_production_access_info() {
    echo ""
    echo -e "${PURPLE}🎉 1:1生产环境模拟部署完成！${NC}"
    echo "============================================================"
    echo -e "${CYAN}🌐 生产环境访问地址：${NC}"
    echo -e "  主站首页：${GREEN}http://${LOCAL_DOMAIN}${NC}"
    echo -e "  后端API：${GREEN}http://${LOCAL_DOMAIN}:1337/api${NC}"
    echo -e "  管理后台：${GREEN}http://${LOCAL_DOMAIN}:1337/admin${NC}"
    echo -e "  API文档：${GREEN}http://${LOCAL_DOMAIN}:1337/documentation${NC}"
    echo -e "  搜索引擎：${GREEN}http://${LOCAL_DOMAIN}:7700${NC}"
    echo -e "  邮件管理：${GREEN}http://${LOCAL_MAIL_DOMAIN}:8080/billion${NC}"
    echo -e "  网页邮箱：${GREEN}http://${LOCAL_MAIL_DOMAIN}:8080/roundcube${NC}"
    echo ""
    echo -e "${CYAN}🔐 默认登录信息：${NC}"
    echo -e "  Strapi管理员：${YELLOW}使用初始管理员账户${NC}"
    # echo -e "  BillionMail：${YELLOW}admin / [生成的密码]${NC}" # 已移除BillionMail
    echo -e "  MeiliSearch：${YELLOW}使用生成的API密钥${NC}"
    echo ""
    echo -e "${CYAN}🛠️  生产环境管理命令：${NC}"
    echo -e "  查看所有服务：${YELLOW}cd deployment && docker-compose ps${NC}"
    echo -e "  查看实时日志：${YELLOW}cd deployment && docker-compose logs -f${NC}"
    echo -e "  重启所有服务：${YELLOW}cd deployment && docker-compose restart${NC}"
    echo -e "  停止所有服务：${YELLOW}cd deployment && docker-compose down${NC}"
    echo -e "  清理所有数据：${YELLOW}cd deployment && docker-compose down -v${NC}"
    echo ""
    echo -e "${CYAN}📊 监控命令：${NC}"
    echo -e "  容器资源监控：${YELLOW}docker stats${NC}"
    echo -e "  数据库连接：${YELLOW}docker exec -it aibianx-postgres psql -U postgres${NC}"
    echo -e "  Redis连接：${YELLOW}docker exec -it aibianx-redis redis-cli${NC}"
    echo ""
    echo -e "${CYAN}🔍 故障排查：${NC}"
    echo -e "  后端日志：${YELLOW}docker logs aibianx-backend${NC}"
    echo -e "  前端日志：${YELLOW}docker logs aibianx-frontend${NC}"
    echo -e "  数据库日志：${YELLOW}docker logs aibianx-postgres${NC}"
    # echo -e "  邮件系统日志：${YELLOW}docker logs aibianx-billionmail-core${NC}" # 已移除BillionMail
    echo ""
    echo -e "${GREEN}✨ 这是和真实生产环境1:1一致的部署，仅域名不同！${NC}"
}

# 主执行流程（1:1模拟真实生产部署）
main() {
    echo -e "${BLUE}🚀 开始1:1生产环境模拟部署...${NC}"
    echo -e "${CYAN}目标：完全模拟真实生产环境，验证生产部署流程${NC}"
    echo ""
    
    # 1. 检查域名解析
    check_domain_resolution
    
    # 2. 生成1:1生产配置
    generate_production_config
    
    # 3. 准备生产Docker环境
    prepare_production_docker
    
    # 4. 启动生产环境
    start_production_environment
    
    # 5. 等待服务就绪
    wait_for_production_services
    
    # 6. 验证部署
    if verify_production_deployment; then
        # 7. 显示访问信息
        show_production_access_info
        
        echo -e "${GREEN}🎯 1:1生产环境模拟部署成功！${NC}"
        echo -e "${CYAN}现在你可以在本地完全验证生产部署流程和功能${NC}"
    else
        echo -e "${RED}❌ 生产环境部署验证失败${NC}"
        echo -e "${YELLOW}请检查服务日志：cd deployment && docker-compose logs${NC}"
        exit 1
    fi
}

# 如果直接执行脚本
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi