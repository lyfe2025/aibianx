#!/bin/bash

# ===================================
# BillionMail配置生成器
# ===================================
# 从deploy.conf统一配置文件生成BillionMail所需的配置文件
# 支持开发和生产环境的自动切换

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_debug() { echo -e "${BLUE}[DEBUG]${NC} $1"; }

# 脚本目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DEPLOY_CONF_FILE="$PROJECT_ROOT/deployment/config/deploy.conf"
BILLIONMAIL_DIR="$PROJECT_ROOT/BillionMail"

log_info "=== BillionMail配置生成器 ==="
log_info "项目根目录: $PROJECT_ROOT"
log_info "配置文件: $DEPLOY_CONF_FILE"
log_info "BillionMail目录: $BILLIONMAIL_DIR"

# 检查必要文件
if [[ ! -f "$DEPLOY_CONF_FILE" ]]; then
    log_error "配置文件不存在: $DEPLOY_CONF_FILE"
    exit 1
fi

if [[ ! -d "$BILLIONMAIL_DIR" ]]; then
    log_error "BillionMail目录不存在: $BILLIONMAIL_DIR"
    exit 1
fi

# 读取deploy.conf配置
log_info "读取统一配置文件..."
source "$DEPLOY_CONF_FILE"

# 验证必要配置
if [[ -z "$DEPLOY_MODE" ]]; then
    log_error "DEPLOY_MODE未配置"
    exit 1
fi

if [[ -z "$DOMAIN" ]]; then
    log_error "DOMAIN未配置"
    exit 1
fi

if [[ -z "$MAIL_DOMAIN" ]]; then
    log_error "MAIL_DOMAIN未配置"
    exit 1
fi

log_info "部署模式: $DEPLOY_MODE"
log_info "主域名: $DOMAIN"
log_info "邮件域名: $MAIL_DOMAIN"

# 生成BillionMail的.env文件
log_info "生成BillionMail .env文件..."

# 根据部署模式设置端口
if [[ "$DEPLOY_MODE" == "production" ]]; then
    # 生产环境端口配置
    BM_HTTP_PORT=${BILLIONMAIL_PORT:-8080}
    BM_HTTPS_PORT=8443
    BM_HOSTNAME="$MAIL_DOMAIN"
    BM_REDIS_PORT="127.0.0.1:26379"
    BM_SQL_PORT="127.0.0.1:25432"
else
    # 开发环境端口配置
    BM_HTTP_PORT=${BILLIONMAIL_PORT:-8080}
    BM_HTTPS_PORT=8443
    BM_HOSTNAME="$MAIL_DOMAIN"
    BM_REDIS_PORT="127.0.0.1:26379"
    BM_SQL_PORT="127.0.0.1:25432"
fi

# 生成环境变量文件
cat > "$BILLIONMAIL_DIR/.env" << EOF
# ===================================
# BillionMail 环境配置
# ===================================
# 自动生成于: $(date)
# 基于配置文件: deploy.conf
# 部署模式: $DEPLOY_MODE

# 管理员配置
ADMIN_USERNAME=${BILLIONMAIL_USERNAME:-admin}
ADMIN_PASSWORD=${BILLIONMAIL_PASSWORD:-billionmail2024}

# 安全路径
SafePath=billion

# 主机名配置
BILLIONMAIL_HOSTNAME=$BM_HOSTNAME

# 数据库配置 (独立于主项目数据库)
DBNAME=billionmail
DBUSER=billionmail
DBPASS=BillionMail_DB_2024_Secure

# Redis配置 (处理空密码情况)
REDISPASS=""

# 邮件端口配置
SMTP_PORT=25
SMTPS_PORT=465
SUBMISSION_PORT=587
IMAP_PORT=143
IMAPS_PORT=993
POP_PORT=110
POPS_PORT=995

# 数据库和Redis端口配置
REDIS_PORT=$BM_REDIS_PORT
SQL_PORT=$BM_SQL_PORT

# Web管理端口配置
HTTP_PORT=$BM_HTTP_PORT
HTTPS_PORT=$BM_HTTPS_PORT

# 时区配置
TZ=Asia/Shanghai

# 网络配置
IPV4_NETWORK=172.66.1

# 安全配置
FAIL2BAN_INIT=y
IP_WHITELIST_ENABLE=false

EOF

log_info "✅ BillionMail .env文件已生成: $BILLIONMAIL_DIR/.env"

# 备份原始配置文件
if [[ -f "$BILLIONMAIL_DIR/env_init" ]]; then
    cp "$BILLIONMAIL_DIR/env_init" "$BILLIONMAIL_DIR/env_init.backup.$(date +%Y%m%d_%H%M%S)"
    log_info "✅ 原始env_init已备份"
fi

# 复制.env到env_init (BillionMail的标准配置文件)
cp "$BILLIONMAIL_DIR/.env" "$BILLIONMAIL_DIR/env_init"
log_info "✅ env_init文件已更新"

# 确保BillionMail目录权限正确
log_info "设置BillionMail目录权限..."
chmod -R 755 "$BILLIONMAIL_DIR"

# 创建必要的数据目录
log_info "创建BillionMail数据目录..."
cd "$BILLIONMAIL_DIR"

# 创建数据目录
mkdir -p {logs,postgresql-data,redis-data,rspamd-data,vmail-data,webmail-data,postfix-data,php-sock,core-data}

# 设置适当权限
chmod 755 logs postgresql-data redis-data rspamd-data vmail-data webmail-data postfix-data php-sock core-data

log_info "✅ BillionMail数据目录已创建"

# 显示配置摘要
log_info "=== BillionMail配置摘要 ==="
echo "部署模式: $DEPLOY_MODE"
echo "邮件域名: $BM_HOSTNAME"
echo "管理员用户: ${BILLIONMAIL_USERNAME:-admin}"
echo "Web管理端口: $BM_HTTP_PORT"
echo "配置文件: $BILLIONMAIL_DIR/.env"
echo "数据目录: $BILLIONMAIL_DIR/{logs,postgresql-data,redis-data,...}"

log_info "=== 下一步操作 ==="
echo "1. 启动BillionMail: cd $BILLIONMAIL_DIR && docker-compose up -d"
echo "2. 访问管理界面: http://$DOMAIN:$BM_HTTP_PORT"
echo "3. 使用管理员账号登录: ${BILLIONMAIL_USERNAME:-admin} / ${BILLIONMAIL_PASSWORD:-billionmail2024}"

log_info "✅ BillionMail配置生成完成！"