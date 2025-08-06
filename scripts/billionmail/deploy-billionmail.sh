#!/bin/bash

# ===================================
# BillionMail Docker部署脚本 v2.0
# ===================================
# 与deploy.conf统一配置集成的BillionMail部署脚本
# 支持开发和生产环境的自动化部署

set -e  # 遇到错误立即退出

# 参数处理
SILENT_MODE=false
if [[ "$1" == "--silent" ]]; then
    SILENT_MODE=true
fi

# 脚本目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DEPLOY_CONF_FILE="$PROJECT_ROOT/deployment/config/deploy.conf"
BILLIONMAIL_DIR="$PROJECT_ROOT/BillionMail"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 日志函数（支持静默模式）
log_info() { 
    if [[ "$SILENT_MODE" != "true" ]]; then
        echo -e "${GREEN}[INFO]${NC} $1"
    fi
}
log_warn() { 
    if [[ "$SILENT_MODE" != "true" ]]; then
        echo -e "${YELLOW}[WARN]${NC} $1"
    fi
}
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }  # 错误总是显示
log_debug() { 
    if [[ "$SILENT_MODE" != "true" ]]; then
        echo -e "${BLUE}[DEBUG]${NC} $1"
    fi
}

log_info "=== BillionMail邮件系统部署 v2.0 ==="
log_info "项目根目录: $PROJECT_ROOT"
log_info "配置文件: $DEPLOY_CONF_FILE"
log_info "BillionMail目录: $BILLIONMAIL_DIR"

# 检查Docker环境
if ! command -v docker &> /dev/null; then
    log_error "Docker未安装，请先安装Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

log_info "✅ Docker环境检查通过"

# 检查配置文件
if [[ ! -f "$DEPLOY_CONF_FILE" ]]; then
    log_error "配置文件不存在: $DEPLOY_CONF_FILE"
    exit 1
fi

# 检查BillionMail目录
if [[ ! -d "$BILLIONMAIL_DIR" ]]; then
    log_error "BillionMail目录不存在，请先运行克隆脚本"
    exit 1
fi

# 读取部署配置
log_info "读取部署配置..."
source "$DEPLOY_CONF_FILE"

# 生成BillionMail配置
log_info "生成BillionMail配置..."
"$SCRIPT_DIR/configure-billionmail-from-deploy.sh"

# 进入BillionMail目录
cd "$BILLIONMAIL_DIR"

# 检查端口冲突
log_info "检查端口冲突..."
BILLIONMAIL_PORT=${BILLIONMAIL_PORT:-8080}

if command -v ss &> /dev/null; then
    if ss -tlnp | grep -q ":$BILLIONMAIL_PORT"; then
        log_warn "端口$BILLIONMAIL_PORT已被占用，尝试停止相关服务..."
        # 尝试停止可能的冲突服务
        docker-compose down 2>/dev/null || true
    fi
elif command -v netstat &> /dev/null; then
    if netstat -tlnp | grep -q ":$BILLIONMAIL_PORT"; then
        log_warn "端口$BILLIONMAIL_PORT已被占用，尝试停止相关服务..."
        docker-compose down 2>/dev/null || true
    fi
fi

# 拉取最新镜像
log_info "拉取BillionMail Docker镜像..."
docker-compose pull

# 启动BillionMail服务
log_info "启动BillionMail Docker服务..."
docker-compose up -d

# 等待服务启动
log_info "等待服务启动..."
sleep 15

# 检查服务状态
log_info "检查服务状态..."
if docker-compose ps | grep -q "Up"; then
    log_info "✅ BillionMail服务启动成功"
    
    # 显示访问信息
    echo ""
    log_info "=== 服务访问信息 ==="
    echo "📍 BillionMail管理界面: http://${DOMAIN}:${BILLIONMAIL_PORT}"
    echo "📍 管理员账号: ${BILLIONMAIL_USERNAME:-admin}"
    echo "📍 管理员密码: ${BILLIONMAIL_PASSWORD:-billionmail2024}"
    echo "📍 安全路径: /billion"
    echo ""
    
    # 显示服务状态
    log_info "=== 服务状态 ==="
    docker-compose ps
    echo ""
    
    log_info "=== 下一步操作 ==="
    echo "1. 访问管理界面: http://${DOMAIN}:${BILLIONMAIL_PORT}/billion"
    echo "2. 使用管理员账号登录"
    echo "3. 配置SMTP邮件服务商"
    echo "4. 创建邮件模板和营销活动"
    echo "5. 集成前端邮件订阅功能"
    
else
    log_error "BillionMail服务启动失败"
    echo ""
    log_warn "服务状态:"
    docker-compose ps
    echo ""
    log_warn "服务日志:"
    docker-compose logs --tail=20
    exit 1
fi

log_info "✅ BillionMail部署完成！"