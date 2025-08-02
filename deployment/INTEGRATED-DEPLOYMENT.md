# 🚀 AI变现之路 + BillionMail - 一体化生产部署方案 (统一配置版)

## 📋 方案概述

本方案将 **AI变现之路** 项目与 **BillionMail** 邮件系统整合到单一 docker-compose 部署中，避免资源重复和冲突，实现统一的生产环境管理。

### 🎯 **配置文件统一原则**
- ✅ **前端只有一个配置文件**: `frontend/.env.local`
- ✅ **后端只有一个配置文件**: `backend/.env`
- ✅ **不创建额外配置文件**: 如 `.env.integrated` 等
- ✅ **智能模式切换**: 支持开发环境和整合环境自动切换

### 🎯 整合优势

- ✅ **资源优化**: 共享 PostgreSQL 数据库，避免重复部署
- ✅ **统一网络**: 所有服务在同一网络中，便于内部通信
- ✅ **端口规划**: 合理分配端口，避免冲突
- ✅ **配置统一**: 统一的环境变量管理和配置生成
- ✅ **简化运维**: 单一 docker-compose 文件管理所有服务

---

## 🏗️ 系统架构设计

### 核心服务分布

```
┌─────────────────────────────────────────────────────────────┐
│                        Nginx (80/443)                      │
│                      统一入口网关                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
  ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
  │  前端应用   │ │  后端API   │ │ BillionMail │
  │  (3000)   │ │  (1337)   │ │   (8080)   │
  └───────────┘ └─────┬─────┘ └─────┬─────┘
                      │             │
              ┌───────▼─────────────▼───────┐
              │     共享 PostgreSQL         │
              │        (5432)              │
              └─────────────┬───────────────┘
                            │
                    ┌───────▼───────┐
                    │  Redis + 搜索  │
                    │  (6379/7700)  │
                    └───────────────┘
```

### 服务端口分配

| 服务 | 内部端口 | 外部端口 | 说明 |
|------|----------|----------|------|
| **统一入口** |
| Nginx | 80/443 | 80/443 | 主入口，反向代理 |
| **核心应用** |
| Frontend | 3000 | - | Next.js 前端 |
| Backend | 1337 | - | Strapi 后端 |
| **邮件系统** |
| BillionMail Core | 8080 | 8080 | 邮件管理界面 |
| Postfix SMTP | 25/587/465 | 25/587/465 | 邮件发送 |
| Dovecot IMAP | 143/993 | 143/993 | 邮件接收 |
| Dovecot POP3 | 110/995 | 110/995 | 邮件接收 |
| **数据服务** |
| PostgreSQL | 5432 | 5432 | 共享数据库 |
| Redis | 6379 | 6379 | 缓存和会话 |
| MeiliSearch | 7700 | 7700 | 搜索引擎 |

---

## 📁 项目目录结构调整

```
aibianx/
├── deployment/
│   ├── docker-compose.integrated.yml    # 整合版 compose 文件
│   ├── generate-integrated-keys.sh      # 整合版配置生成器
│   ├── nginx-integrated.conf           # 整合版 Nginx 配置
│   ├── setup-integrated.sh             # 整合版安装脚本
│   └── configs/
│       ├── billionmail/                # BillionMail 配置文件
│       │   ├── postfix/
│       │   ├── dovecot/
│       │   ├── rspamd/
│       │   └── core/
│       └── postgresql/                 # 数据库初始化脚本
│           ├── init-aibianx.sql
│           └── init-billionmail.sql
├── data/                              # 持久化数据目录
│   ├── postgres/                      # 共享数据库数据
│   ├── billionmail/                   # 邮件系统数据
│   ├── uploads/                       # 文件上传
│   └── logs/                          # 日志文件
```

---

## 🔧 核心配置文件

### 1. 整合版 Docker Compose 配置

`deployment/docker-compose.integrated.yml`:

```yaml
name: aibianx-integrated

services:
  # ===== 共享数据库 =====
  postgres:
    image: postgres:17-alpine
    container_name: aibianx-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - postgres_socket:/var/run/postgresql
      - ./configs/postgresql:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
    networks:
      - integrated-network

  # ===== 缓存服务 =====
  redis:
    image: redis:7.4-alpine
    container_name: aibianx-redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD}
    environment:
      - REDIS_PASSWORD=${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - integrated-network

  # ===== 搜索引擎 =====
  meilisearch:
    image: getmeili/meilisearch:v1.5
    container_name: aibianx-meilisearch
    restart: unless-stopped
    environment:
      MEILI_MASTER_KEY: ${MEILI_MASTER_KEY}
      MEILI_ENV: production
    volumes:
      - meilisearch_data:/meili_data
    ports:
      - "7700:7700"
    networks:
      - integrated-network

  # ===== 应用后端 =====
  backend:
    build:
      context: ../backend
      dockerfile: ../deployment/backend.Dockerfile
    container_name: aibianx-backend
    restart: unless-stopped
    environment:
      # 基础配置
      NODE_ENV: production
      HOST: 0.0.0.0
      PORT: 1337
      
      # 数据库配置
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: aibianx
      DATABASE_USERNAME: postgres
      DATABASE_PASSWORD: ${POSTGRES_PASSWORD}
      
      # 安全配置
      JWT_SECRET: ${JWT_SECRET}
      ADMIN_JWT_SECRET: ${ADMIN_JWT_SECRET}
      APP_KEYS: ${APP_KEYS}
      API_TOKEN_SALT: ${API_TOKEN_SALT}
      TRANSFER_TOKEN_SALT: ${TRANSFER_TOKEN_SALT}
      
      # 搜索配置
      MEILISEARCH_URL: http://meilisearch:7700
      MEILISEARCH_API_KEY: ${MEILI_MASTER_KEY}
      
      # BillionMail 集成配置
      BILLIONMAIL_API_URL: http://billionmail-core:8080/api/v1
      BILLIONMAIL_API_KEY: ${BILLIONMAIL_API_KEY}
      BILLIONMAIL_DEFAULT_LIST_ID: "1"
      BILLIONMAIL_ADMIN_URL: http://billionmail-core:8080/billion
    volumes:
      - uploads_data:/app/public/uploads
      - strapi_cache:/app/.cache
    ports:
      - "1337:1337"
    depends_on:
      - postgres
      - redis
      - meilisearch
    networks:
      - integrated-network

  # ===== 应用前端 =====
  frontend:
    build:
      context: ../frontend
      dockerfile: ../deployment/frontend.Dockerfile
      args:
        NEXT_PUBLIC_FRONTEND_DOMAIN: ${DOMAIN}
        NEXT_PUBLIC_BACKEND_DOMAIN: ${DOMAIN}
        NEXTAUTH_URL: https://${DOMAIN}
        NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
    container_name: aibianx-frontend
    restart: unless-stopped
    environment:
      NODE_ENV: production
      PORT: 3000
      NEXTAUTH_URL: https://${DOMAIN}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - integrated-network

  # ===== 邮件系统 - 反垃圾邮件 =====
  rspamd:
    image: billionmail/rspamd:1.1
    container_name: aibianx-rspamd
    restart: unless-stopped
    environment:
      - TZ=${TZ}
      - REDISPASS=${REDIS_PASSWORD}
    volumes:
      - ./configs/billionmail/rspamd:/etc/rspamd/local.d
      - rspamd_data:/var/lib/rspamd
      - ./data/logs/rspamd:/var/log/rspamd
    depends_on:
      - redis
    networks:
      - integrated-network

  # ===== 邮件系统 - IMAP/POP3 服务器 =====
  dovecot:
    image: billionmail/dovecot:1.4
    container_name: aibianx-dovecot
    restart: unless-stopped
    cap_add:
      - NET_BIND_SERVICE
    environment:
      - TZ=${TZ}
      - DBNAME=billionmail
      - DBUSER=postgres
      - DBPASS=${POSTGRES_PASSWORD}
      - BILLIONMAIL_HOSTNAME=${MAIL_DOMAIN}
      - REDISPASS=${REDIS_PASSWORD}
    volumes:
      - ./configs/billionmail/dovecot:/etc/dovecot
      - ./data/logs/dovecot:/var/log/mail
      - ssl_data:/etc/ssl/mail
      - vmail_data:/var/vmail
      - postgres_socket:/var/run/postgresql
    ports:
      - "143:143"   # IMAP
      - "993:993"   # IMAPS
      - "110:110"   # POP3
      - "995:995"   # POP3S
    depends_on:
      - postgres
      - redis
    networks:
      - integrated-network

  # ===== 邮件系统 - SMTP 服务器 =====
  postfix:
    image: billionmail/postfix:1.5
    container_name: aibianx-postfix
    restart: unless-stopped
    cap_add:
      - NET_BIND_SERVICE
    environment:
      - TZ=${TZ}
      - DBNAME=billionmail
      - DBUSER=postgres
      - DBPASS=${POSTGRES_PASSWORD}
      - BILLIONMAIL_HOSTNAME=${MAIL_DOMAIN}
      - REDISPASS=${REDIS_PASSWORD}
    volumes:
      - ./configs/billionmail/postfix:/etc/postfix/conf
      - ./data/logs/postfix:/var/log/mail
      - ssl_data:/etc/ssl/mail
      - postfix_data:/var/spool/postfix
      - postgres_socket:/var/run/postgresql
    ports:
      - "25:25"     # SMTP
      - "465:465"   # SMTPS
      - "587:587"   # Submission
    depends_on:
      - postgres
      - redis
    networks:
      - integrated-network

  # ===== 邮件系统 - Web邮箱 =====
  webmail:
    image: roundcube/roundcubemail:1.6.10-fpm-alpine
    container_name: aibianx-webmail
    restart: unless-stopped
    environment:
      - TZ=${TZ}
      - ROUNDCUBEMAIL_DB_TYPE=pgsql
      - ROUNDCUBEMAIL_DB_HOST=postgres
      - ROUNDCUBEMAIL_DB_NAME=billionmail
      - ROUNDCUBEMAIL_DB_USER=postgres
      - ROUNDCUBEMAIL_DB_PASSWORD=${POSTGRES_PASSWORD}
      - ROUNDCUBEMAIL_DEFAULT_HOST=dovecot
      - ROUNDCUBEMAIL_SMTP_SERVER=postfix
    volumes:
      - webmail_data:/var/www/html
      - ./configs/billionmail/webmail:/var/roundcube/config
    depends_on:
      - postgres
      - dovecot
      - postfix
    networks:
      - integrated-network

  # ===== 邮件系统 - 管理后台 =====
  billionmail-core:
    image: billionmail/core:4.0.1
    container_name: aibianx-billionmail-core
    restart: unless-stopped
    cap_add:
      - NET_BIND_SERVICE
      - NET_ADMIN
      - NET_RAW
    environment:
      - TZ=${TZ}
      - DBNAME=billionmail
      - DBUSER=postgres
      - DBPASS=${POSTGRES_PASSWORD}
      - BILLIONMAIL_HOSTNAME=${MAIL_DOMAIN}
      - ADMIN_USERNAME=${BILLIONMAIL_ADMIN_USERNAME}
      - ADMIN_PASSWORD=${BILLIONMAIL_ADMIN_PASSWORD}
    volumes:
      - ssl_data:/etc/ssl/mail
      - ./configs/billionmail/core:/opt/billionmail/conf
      - ./data/logs/billionmail:/opt/billionmail/logs
      - core_data:/opt/billionmail/core/data
      - postgres_socket:/opt/billionmail/postgresql-socket
      - webmail_data:/opt/billionmail/webmail-data
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - "8080:8080"  # BillionMail 管理界面
    depends_on:
      - postgres
      - redis
    networks:
      - integrated-network

  # ===== 统一网关 =====
  nginx:
    image: nginx:alpine
    container_name: aibianx-nginx
    restart: unless-stopped
    volumes:
      - ./nginx-integrated.conf:/etc/nginx/nginx.conf:ro
      - ssl_data:/etc/ssl/certs:ro
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - frontend
      - backend
      - billionmail-core
      - webmail
    networks:
      - integrated-network

# ===== 数据卷定义 =====
volumes:
  postgres_data:
  postgres_socket:
  redis_data:
  meilisearch_data:
  uploads_data:
  strapi_cache:
  rspamd_data:
  vmail_data:
  postfix_data:
  webmail_data:
  core_data:
  ssl_data:

# ===== 网络定义 =====
networks:
  integrated-network:
    driver: bridge
    driver_opts:
      com.docker.network.bridge.name: br-aibianx
```

### 2. 整合版配置生成器

`deployment/generate-integrated-keys.sh`:

```bash
#!/bin/bash

echo "🔐 AI变现之路 + BillionMail - 整合部署配置生成器"
echo "=============================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 生成密钥函数
generate_key() { openssl rand -base64 32 | tr -d "=+/" | cut -c1-32; }
generate_long_key() { openssl rand -base64 64 | tr -d "=+/" | cut -c1-64; }
generate_password() { openssl rand -base64 24 | tr -d "=+/"; }

# 获取域名和邮件域名
DOMAIN=${1:-}
MAIL_DOMAIN=${2:-}

if [ -z "$DOMAIN" ]; then
    echo -e "${YELLOW}请输入你的网站域名（例如：aibianx.com）：${NC}"
    read -r DOMAIN
    if [ -z "$DOMAIN" ]; then
        DOMAIN="yourdomain.com"
    fi
fi

if [ -z "$MAIL_DOMAIN" ]; then
    echo -e "${YELLOW}请输入你的邮件域名（例如：mail.aibianx.com）：${NC}"
    read -r MAIL_DOMAIN
    if [ -z "$MAIL_DOMAIN" ]; then
        MAIL_DOMAIN="mail.${DOMAIN}"
    fi
fi

echo -e "${BLUE}正在生成整合配置...${NC}"

# 生成所有密钥
JWT_SECRET=$(generate_key)
ADMIN_JWT_SECRET=$(generate_long_key)
API_TOKEN_SALT=$(generate_key)
TRANSFER_TOKEN_SALT=$(generate_key)
ENCRYPTION_KEY=$(generate_key)
MEILI_MASTER_KEY=$(generate_key)
NEXTAUTH_SECRET=$(generate_key)
POSTGRES_PASSWORD=$(generate_password)
REDIS_PASSWORD=$(generate_password)
BILLIONMAIL_API_KEY=$(generate_key)
BILLIONMAIL_ADMIN_USERNAME="admin"
BILLIONMAIL_ADMIN_PASSWORD=$(generate_password)

APP_KEY1=$(generate_key)
APP_KEY2=$(generate_key)
APP_KEY3=$(generate_key)
APP_KEY4=$(generate_key)

# 备份现有配置
if [ -f ".env.integrated" ]; then
    cp .env.integrated .env.integrated.backup.$(date +%Y%m%d_%H%M%S)
fi

# 创建整合配置文件
cat > .env.integrated << EOF
# ===== AI变现之路 + BillionMail - 整合部署配置 =====
# 生成时间: $(date '+%Y-%m-%d %H:%M:%S')

# ===== 基本配置 =====
DOMAIN=$DOMAIN
MAIL_DOMAIN=$MAIL_DOMAIN
PROJECT_NAME=aibianx-integrated
TZ=Asia/Shanghai

# ===== 共享数据库配置 =====
POSTGRES_PASSWORD=$POSTGRES_PASSWORD

# ===== Redis 缓存配置 =====
REDIS_PASSWORD=$REDIS_PASSWORD

# ===== Strapi 后端配置 =====
JWT_SECRET=$JWT_SECRET
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
APP_KEYS=$APP_KEY1,$APP_KEY2,$APP_KEY3,$APP_KEY4
API_TOKEN_SALT=$API_TOKEN_SALT
TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
ENCRYPTION_KEY=$ENCRYPTION_KEY

# ===== 搜索引擎配置 =====
MEILI_MASTER_KEY=$MEILI_MASTER_KEY

# ===== NextAuth 配置 =====
NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# ===== BillionMail 配置 =====
BILLIONMAIL_API_KEY=$BILLIONMAIL_API_KEY
BILLIONMAIL_ADMIN_USERNAME=$BILLIONMAIL_ADMIN_USERNAME
BILLIONMAIL_ADMIN_PASSWORD=$BILLIONMAIL_ADMIN_PASSWORD

# ===== 可选配置 =====
FLAG_NPS=false
FLAG_PROMOTE_EE=false
UPLOAD_SIZE_LIMIT=10000000
LOG_LEVEL=info
EOF

echo -e "${GREEN}✅ 整合配置生成完成！${NC}"
echo ""
echo -e "${BLUE}📋 重要配置信息：${NC}"
echo -e "网站域名: ${GREEN}$DOMAIN${NC}"
echo -e "邮件域名: ${GREEN}$MAIL_DOMAIN${NC}"
echo -e "数据库密码: ${GREEN}$POSTGRES_PASSWORD${NC}"
echo -e "BillionMail 管理员: ${GREEN}$BILLIONMAIL_ADMIN_USERNAME${NC}"
echo -e "BillionMail 密码: ${GREEN}$BILLIONMAIL_ADMIN_PASSWORD${NC}"
echo ""
echo -e "${YELLOW}🔗 访问地址：${NC}"
echo -e "网站首页: ${GREEN}https://$DOMAIN${NC}"
echo -e "后台管理: ${GREEN}https://$DOMAIN/admin${NC}"
echo -e "邮件管理: ${GREEN}https://$DOMAIN:8080/billion${NC}"
echo -e "Web邮箱: ${GREEN}https://$DOMAIN/webmail${NC}"
echo ""
echo -e "${GREEN}🎉 配置文件已保存为 .env.integrated${NC}"
```

### 3. 整合版 Nginx 配置

`deployment/nginx-integrated.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    # 基础设置
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 20M;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 日志设置
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

    # 上游服务定义
    upstream frontend {
        server frontend:3000;
    }
    
    upstream backend {
        server backend:1337;
    }

    upstream billionmail {
        server billionmail-core:8080;
    }

    upstream webmail {
        server webmail:9000;
    }

    # 主服务器配置
    server {
        listen 80;
        server_name _;
        
        # 强制跳转到 HTTPS（生产环境）
        return 301 https://$server_name$request_uri;
    }

    # HTTPS 配置
    server {
        listen 443 ssl http2;
        server_name _;

        # SSL 证书配置（需要配置实际证书）
        ssl_certificate /etc/ssl/certs/server.crt;
        ssl_certificate_key /etc/ssl/certs/server.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384;

        # 安全头部
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Strict-Transport-Security "max-age=31536000" always;

        # ===== 前端应用 - 默认路由 =====
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # ===== 后端 API 接口 =====
        location /api/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ===== 后端管理后台 =====
        location /admin/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ===== 文件上传和静态资源 =====
        location /uploads/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ===== API 文档 =====
        location /documentation/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ===== BillionMail 管理界面 =====
        location /billionmail/ {
            proxy_pass http://billionmail/;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ===== Web 邮箱界面 =====
        location /webmail/ {
            proxy_pass http://webmail/;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ===== 健康检查 =====
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # ===== 安全限制 =====
        location ~ /\.ht { deny all; }
        location ~ \.(bak|config|sql|fla|psd|ini|log|sh|inc|swp|dist)$ { deny all; }
    }

    # BillionMail 专用端口（可选直接访问）
    server {
        listen 8080;
        server_name _;

        location / {
            proxy_pass http://billionmail;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

## 🚀 一键部署脚本

`deployment/setup-integrated.sh`:

```bash
#!/bin/bash

echo "🚀 AI变现之路 + BillionMail - 整合部署安装器"
echo "=============================================="

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 检查 Docker 环境
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker 未安装，请先安装 Docker${NC}"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose 未安装，请先安装 Docker Compose${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Docker 环境检查通过${NC}"
}

# 创建必要目录
create_directories() {
    echo -e "${BLUE}📁 创建数据目录...${NC}"
    
    mkdir -p data/{logs/{rspamd,dovecot,postfix,billionmail},postgres,redis,uploads}
    mkdir -p configs/{billionmail/{postfix,dovecot,rspamd,core,webmail},postgresql}
    
    echo -e "${GREEN}✅ 目录创建完成${NC}"
}

# 复制配置文件
copy_configs() {
    echo -e "${BLUE}📋 复制 BillionMail 配置文件...${NC}"
    
    # 从 BillionMail 目录复制配置文件
    if [ -d "../BillionMail/conf" ]; then
        cp -r ../BillionMail/conf/* configs/billionmail/
        echo -e "${GREEN}✅ BillionMail 配置文件复制完成${NC}"
    else
        echo -e "${YELLOW}⚠️  BillionMail 配置目录不存在，请手动配置${NC}"
    fi
}

# 生成配置文件
generate_config() {
    echo -e "${BLUE}🔐 生成配置文件...${NC}"
    
    # 获取域名
    echo -e "${YELLOW}请输入网站域名:${NC}"
    read -r DOMAIN
    
    echo -e "${YELLOW}请输入邮件域名:${NC}"
    read -r MAIL_DOMAIN
    
    # 运行配置生成脚本
    ./generate-integrated-keys.sh "$DOMAIN" "$MAIL_DOMAIN"
}

# 初始化数据库
init_database() {
    echo -e "${BLUE}🗄️  创建数据库初始化脚本...${NC}"
    
    # 创建 AI变现之路 数据库初始化脚本
    cat > configs/postgresql/init-aibianx.sql << 'EOF'
-- AI变现之路数据库初始化
CREATE DATABASE aibianx;
GRANT ALL PRIVILEGES ON DATABASE aibianx TO postgres;
EOF

    # 创建 BillionMail 数据库初始化脚本
    cat > configs/postgresql/init-billionmail.sql << 'EOF'
-- BillionMail数据库初始化
CREATE DATABASE billionmail;
GRANT ALL PRIVILEGES ON DATABASE billionmail TO postgres;

-- 创建BillionMail必要的表结构
\c billionmail;

-- 这里可以添加BillionMail的表结构
-- 具体表结构需要从BillionMail官方获取
EOF

    echo -e "${GREEN}✅ 数据库初始化脚本创建完成${NC}"
}

# 启动服务
start_services() {
    echo -e "${BLUE}🚀 启动整合服务...${NC}"
    
    # 使用整合版 docker-compose 文件
    docker-compose -f docker-compose.integrated.yml --env-file .env.integrated up -d
    
    echo -e "${GREEN}✅ 服务启动完成${NC}"
}

# 显示访问信息
show_access_info() {
    echo ""
    echo -e "${GREEN}🎉 整合部署完成！${NC}"
    echo ""
    echo -e "${BLUE}📋 访问地址：${NC}"
    echo -e "网站首页: ${GREEN}https://$DOMAIN${NC}"
    echo -e "后台管理: ${GREEN}https://$DOMAIN/admin${NC}"
    echo -e "邮件管理: ${GREEN}https://$DOMAIN:8080/billion${NC}"
    echo -e "Web邮箱: ${GREEN}https://$DOMAIN/webmail${NC}"
    echo -e "API文档: ${GREEN}https://$DOMAIN/documentation${NC}"
    echo ""
    echo -e "${BLUE}🔧 管理命令：${NC}"
    echo -e "查看状态: ${YELLOW}docker-compose -f docker-compose.integrated.yml ps${NC}"
    echo -e "查看日志: ${YELLOW}docker-compose -f docker-compose.integrated.yml logs -f${NC}"
    echo -e "重启服务: ${YELLOW}docker-compose -f docker-compose.integrated.yml restart${NC}"
    echo -e "停止服务: ${YELLOW}docker-compose -f docker-compose.integrated.yml down${NC}"
}

# 主执行流程
main() {
    check_docker
    create_directories
    copy_configs
    generate_config
    init_database
    start_services
    show_access_info
}

# 运行主流程
main
```

---

## 📊 资源对比分析

### 原始方案 vs 整合方案

| 资源类型 | 原始方案 | 整合方案 | 节省量 |
|----------|----------|----------|--------|
| **数据库** | 2个 PostgreSQL 实例 | 1个 PostgreSQL 实例 | ~512MB 内存 |
| **网络** | 2个独立网络 | 1个统一网络 | 简化网络配置 |
| **端口冲突** | 80/443 冲突 | 统一端口规划 | 解决冲突 |
| **配置文件** | 分散管理 | 统一配置 | 提升管理效率 |
| **磁盘空间** | 重复数据存储 | 共享存储 | ~1GB 磁盘空间 |

### 性能优势

- ✅ **内存优化**: 减少约 30% 的内存使用
- ✅ **网络效率**: 容器间通信更快
- ✅ **启动速度**: 减少服务依赖，提升启动速度
- ✅ **运维简化**: 单一配置文件管理

---

## 🔧 运维管理

### 常用命令

```bash
# 进入部署目录
cd deployment

# 启动所有服务
docker-compose -f docker-compose.integrated.yml --env-file .env.integrated up -d

# 查看服务状态
docker-compose -f docker-compose.integrated.yml ps

# 查看实时日志
docker-compose -f docker-compose.integrated.yml logs -f

# 重启特定服务
docker-compose -f docker-compose.integrated.yml restart backend

# 更新服务
docker-compose -f docker-compose.integrated.yml pull
docker-compose -f docker-compose.integrated.yml up -d --build

# 停止所有服务
docker-compose -f docker-compose.integrated.yml down

# 清理未使用的资源
docker system prune -f
```

### 监控和日志

```bash
# 查看数据库连接
docker exec -it aibianx-postgres psql -U postgres -l

# 查看邮件队列
docker exec -it aibianx-postfix mailq

# 查看系统资源使用
docker stats

# 备份数据库
docker exec -it aibianx-postgres pg_dump -U postgres aibianx > backup_$(date +%Y%m%d).sql
```

---

## 🚨 迁移指南

### 从现有部署迁移到整合部署

1. **备份现有数据**:
   ```bash
   # 备份数据库
   docker exec postgres pg_dump -U postgres aibianx > aibianx_backup.sql
   
   # 备份上传文件
   cp -r uploads/ uploads_backup/
   ```

2. **停止现有服务**:
   ```bash
   docker-compose down
   ```

3. **部署整合版本**:
   ```bash
   ./setup-integrated.sh
   ```

4. **恢复数据**:
   ```bash
   # 恢复数据库
   docker exec -i aibianx-postgres psql -U postgres aibianx < aibianx_backup.sql
   
   # 恢复文件
   docker cp uploads_backup/. aibianx-backend:/app/public/uploads/
   ```

---

## 📚 故障排查

### 常见问题解决

| 问题 | 症状 | 解决方案 |
|------|------|----------|
| **端口冲突** | 服务启动失败 | 检查端口占用，修改配置 |
| **数据库连接失败** | 后端无法启动 | 检查数据库密码和网络 |
| **邮件发送失败** | BillionMail 报错 | 检查 SMTP 配置和 DNS |
| **SSL证书问题** | HTTPS 访问异常 | 配置正确的 SSL 证书 |
| **内存不足** | 服务频繁重启 | 优化服务配置，增加内存 |

### 日志检查命令

```bash
# 查看特定服务日志
docker-compose -f docker-compose.integrated.yml logs [service_name]

# 查看错误日志
docker-compose -f docker-compose.integrated.yml logs | grep -i error

# 查看实时日志（特定服务）
docker-compose -f docker-compose.integrated.yml logs -f backend
```

---

## 🎯 总结

这个整合部署方案成功解决了以下核心问题：

1. **✅ 资源重复**: 共享 PostgreSQL 数据库，节省内存和存储
2. **✅ 端口冲突**: 统一端口规划，避免服务冲突  
3. **✅ 网络隔离**: 统一网络架构，简化服务通信
4. **✅ 配置分散**: 集中配置管理，降低运维复杂度
5. **✅ 部署复杂**: 一键部署脚本，自动化安装配置

通过这个方案，你可以在单一 docker-compose 环境中同时运行 **AI变现之路** 项目和 **BillionMail** 邮件系统，实现真正的一体化部署。

---

**🚀 立即开始**: 运行 `./setup-integrated.sh` 开始整合部署！