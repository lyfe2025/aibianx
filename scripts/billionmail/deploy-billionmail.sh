#!/bin/bash

# BillionMail Docker部署脚本 - 集成版
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载动态配置
source "$SCRIPT_DIR/../tools/load-config.sh"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 开始部署BillionMail邮件营销系统 (官方代码集成版)${NC}"
echo ""

# 检查Docker环境
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker未安装，请先安装Docker${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose未安装，请先安装Docker Compose${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker环境检查通过${NC}"

# 使用项目根目录的BillionMail
BILLIONMAIL_DIR="$PROJECT_ROOT/BillionMail"

if [ ! -d "$BILLIONMAIL_DIR" ]; then
    echo -e "${RED}❌ BillionMail目录不存在: $BILLIONMAIL_DIR${NC}"
    echo "请确保已正确克隆BillionMail代码到项目根目录"
    exit 1
fi

cd "$BILLIONMAIL_DIR"
echo -e "${GREEN}✅ 切换到BillionMail目录: $BILLIONMAIL_DIR${NC}"

# 配置环境变量 - 从deploy.conf读取
echo -e "${YELLOW}🔧 配置BillionMail环境变量...${NC}"

# 创建.env文件，从deploy.conf读取配置
cat > .env << EOF
# BillionMail Environment Configuration
# Auto-generated from deploy.conf

# Admin Configuration
ADMIN_USERNAME=${BILLIONMAIL_USERNAME:-admin}
ADMIN_PASSWORD=${BILLIONMAIL_PASSWORD:-billionmail2024}
SafePath=billion

# Hostname Configuration
BILLIONMAIL_HOSTNAME=${MAIL_DOMAIN:-localhost}

# Database Configuration
DBNAME=billionmail
DBUSER=billionmail
DBPASS=billionmail_db_2024

# Redis Configuration
REDISPASS=${BILLIONMAIL_REDIS_PASSWORD:-}

# Mail Ports
SMTP_PORT=25
SMTPS_PORT=465
SUBMISSION_PORT=587
IMAP_PORT=143
IMAPS_PORT=993
POP_PORT=110
POPS_PORT=995
REDIS_PORT=127.0.0.1:26379
SQL_PORT=127.0.0.1:25432

# Management Ports
HTTP_PORT=${BILLIONMAIL_PORT:-8080}
HTTPS_PORT=8443

# Timezone
TZ=Asia/Shanghai

# Network Configuration
IPV4_NETWORK=172.66.1

# Security Configuration
FAIL2BAN_INIT=y
IP_WHITELIST_ENABLE=false
EOF

echo -e "${GREEN}✅ 环境变量配置完成${NC}"

# 检查端口是否被占用
BILLIONMAIL_PORT=${BILLIONMAIL_PORT:-8080}
if ss -tlnp | grep -q ":$BILLIONMAIL_PORT"; then
    echo -e "${YELLOW}⚠️  端口$BILLIONMAIL_PORT已被占用${NC}"
    echo "尝试停止可能冲突的服务..."
    docker-compose down 2>/dev/null || true
    sleep 3
fi

# 创建必要的目录
echo -e "${YELLOW}📁 创建必要的数据目录...${NC}"
mkdir -p postgresql-data redis-data logs rspamd-data vmail-data postfix-data webmail-data php-sock ssl ssl-self-signed core-data

# 停止可能存在的旧服务
echo -e "${YELLOW}🛑 停止可能存在的旧服务...${NC}"
docker-compose down 2>/dev/null || true
sleep 3

# 使用Docker Compose启动服务
echo -e "${YELLOW}🐳 启动BillionMail Docker服务...${NC}"
if docker-compose up -d; then
    echo -e "${GREEN}✅ Docker服务启动命令执行成功${NC}"
else
    echo -e "${RED}❌ Docker服务启动命令执行失败${NC}"
    exit 1
fi

# 等待服务启动
echo -e "${YELLOW}⏳ 等待服务启动完成...${NC}"
sleep 20

# 多次检查服务状态，确保稳定启动
echo -e "${YELLOW}🔍 检查服务状态...${NC}"
local retry_count=0
local max_retries=3
local services_up=false

while [ $retry_count -lt $max_retries ]; do
    if docker-compose ps | grep -q "Up"; then
        services_up=true
        break
    else
        retry_count=$((retry_count + 1))
        echo -e "${YELLOW}⏳ 服务尚未完全启动，等待重试 ($retry_count/$max_retries)...${NC}"
        sleep 10
    fi
done

if [ "$services_up" = true ]; then
    echo -e "${GREEN}✅ BillionMail服务启动成功${NC}"
    echo ""
    echo -e "${BLUE}📍 BillionMail访问地址:${NC}"
    echo "  🌐 管理界面: http://${DOMAIN:-localhost}:${BILLIONMAIL_PORT:-8080}"
    echo "  📧 邮件域名: ${MAIL_DOMAIN:-localhost}"
    echo "  🔑 管理员账号: ${BILLIONMAIL_USERNAME:-admin}"
    echo "  🔒 管理员密码: ${BILLIONMAIL_PASSWORD:-billionmail2024}"
    echo ""
    echo -e "${BLUE}📊 服务端口信息:${NC}"
    echo "  HTTP: ${BILLIONMAIL_PORT:-8080}"
    echo "  SMTP: 25, 465, 587"
    echo "  IMAP: 143, 993"
    echo "  POP3: 110, 995"
    echo ""
    echo -e "${YELLOW}📋 下一步操作:${NC}"
    echo "  1. 访问管理界面完成邮件域名配置"
    echo "  2. 配置SMTP邮件服务商"
    echo "  3. 创建邮件模板和列表"
    echo "  4. 配置前端邮件订阅集成"
    echo ""
    echo -e "${GREEN}🎉 BillionMail部署完成！${NC}"
else
    echo -e "${RED}❌ BillionMail服务启动失败${NC}"
    echo "查看详细日志:"
    echo "  docker-compose logs"
    echo "  docker-compose ps"
    exit 1
fi