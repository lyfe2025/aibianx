#!/bin/bash

# ===================================================================
# AI变现之路 - 统一环境变量配置脚本
# ===================================================================
# 🎯 目标: 消除所有硬编码，实现动态环境配置
# 📝 使用: source deployment/configure-unified-env.sh 
# ⚠️  重要: 所有脚本必须在开始时引用此文件

set -e

# 颜色定义
export RED='\033[0;31m'
export GREEN='\033[0;32m'
export YELLOW='\033[1;33m'
export BLUE='\033[0;34m'
export CYAN='\033[0;36m'
export NC='\033[0m' # No Color

# 获取项目根目录
if [ -n "${BASH_SOURCE[0]}" ]; then
    # 脚本直接执行时
    export PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
else
    # 脚本被source时，从当前目录推断
    if [ -f "deployment/config/deploy.conf" ]; then
        export PROJECT_ROOT="$(pwd)"
    elif [ -f "../deployment/config/deploy.conf" ]; then
        export PROJECT_ROOT="$(cd .. && pwd)"
    else
        echo -e "${RED}❌ 无法确定项目根目录${NC}"
        return 1
    fi
fi
export CONFIG_FILE="${PROJECT_ROOT}/deployment/config/deploy.conf"

# 检查配置文件
if [[ ! -f "${CONFIG_FILE}" ]]; then
    echo -e "${RED}❌ 配置文件不存在: ${CONFIG_FILE}${NC}"
    echo -e "${CYAN}💡 请先复制并配置: cp deployment/config/deploy.conf.example deployment/config/deploy.conf${NC}"
    exit 1
fi

# 加载配置文件
echo -e "${BLUE}🔧 加载配置文件: ${CONFIG_FILE}${NC}"
source "${CONFIG_FILE}"

# 构建基础URL变量
if [[ "${DEPLOY_MODE}" == "production" ]]; then
    # 生产环境使用HTTPS
    export FRONTEND_URL="https://${DOMAIN}"
    export BACKEND_URL="https://${DOMAIN}"
    export ADMIN_URL="https://${DOMAIN}/admin"
    # BillionMail已移除，邮件服务将由自建系统提供
    export MEILISEARCH_URL="https://${DOMAIN}:${MEILISEARCH_PORT}"
    export SEARCH_URL="https://${DOMAIN}:${MEILISEARCH_PORT}"
    export BACKEND_ADMIN_URL="https://${DOMAIN}/admin"
    export BACKEND_API_URL="https://${DOMAIN}/api"
    export BACKEND_DOCS_URL="https://${DOMAIN}/documentation"
else
    # 开发环境使用HTTP
    export FRONTEND_URL="http://${DOMAIN}"
    export BACKEND_URL="http://${DOMAIN}:${BACKEND_PORT}"
    export ADMIN_URL="http://${DOMAIN}:${BACKEND_PORT}/admin"
    # BillionMail已移除，邮件服务将由自建系统提供
    export MEILISEARCH_URL="http://${DOMAIN}:${MEILISEARCH_PORT}"
    export SEARCH_URL="http://${DOMAIN}:${MEILISEARCH_PORT}"
    export BACKEND_ADMIN_URL="http://${DOMAIN}:${BACKEND_PORT}/admin"
    export BACKEND_API_URL="http://${DOMAIN}:${BACKEND_PORT}/api"
    export BACKEND_DOCS_URL="http://${DOMAIN}:${BACKEND_PORT}/documentation"
fi

# 构建端口变量
export FRONTEND_PORT="80"
export BACKEND_PORT="1337"
# BILLIONMAIL_PORT="8080" # 已移除BillionMail
export MEILISEARCH_PORT="7700"
export POSTGRES_PORT="5432"

# 构建数据库连接URL
export DATABASE_URL="postgresql://aibianx_dev:${DB_ADMIN_PASSWORD}@localhost:${POSTGRES_PORT}/aibianx_dev"

# 日志目录
export LOG_DIR="${PROJECT_ROOT}/logs"
[[ ! -d "${LOG_DIR}" ]] && mkdir -p "${LOG_DIR}"

# 导出所有原配置变量（保持向后兼容）
export DOMAIN
export MAIL_DOMAIN
export DEPLOY_MODE
export DB_ADMIN_PASSWORD
# export BILLIONMAIL_USERNAME # 已移除BillionMail
# export BILLIONMAIL_PASSWORD # 已移除BillionMail
export BACKUP_VERSION
export AUTO_RESTORE_BACKUP
export AUTO_DEPLOY_SEARCH
export AUTO_DEPLOY_EMAIL

# URL构建辅助函数
url_health_check() {
    local url="$1"
    local service_name="$2"
    local max_retries="${3:-3}"
    local retry_delay="${4:-2}"
    
    echo -e "${YELLOW}🔍 检查 ${service_name} 服务: ${url}${NC}"
    
    for ((i=1; i<=max_retries; i++)); do
        if curl -s --connect-timeout 5 "${url}" >/dev/null 2>&1; then
            echo -e "${GREEN}✅ ${service_name} 服务正常${NC}"
            return 0
        else
            echo -e "${YELLOW}⏳ 第${i}次检查失败，等待${retry_delay}秒后重试...${NC}"
            [[ $i -lt $max_retries ]] && sleep "${retry_delay}"
        fi
    done
    
    echo -e "${RED}❌ ${service_name} 服务无法访问${NC}"
    return 1
}

# 打印环境配置摘要
print_env_summary() {
    echo -e "${CYAN}📋 环境配置摘要${NC}"
    echo -e "${CYAN}===========================================${NC}"
    echo -e "🏗️  部署模式: ${DEPLOY_MODE}"
    echo -e "🌐 前端地址: ${FRONTEND_URL}"
    echo -e "⚙️  后端地址: ${BACKEND_URL}"
    echo -e "🎛️  管理后台: ${ADMIN_URL}"
    echo -e "📧 邮件系统: 自建系统（BillionMail已移除）"
    echo -e "🔍 搜索引擎: ${MEILISEARCH_URL}"
    echo -e "${CYAN}===========================================${NC}"
}

# 如果直接运行此脚本，显示配置摘要
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    print_env_summary
fi

echo -e "${GREEN}✅ 统一环境变量配置完成${NC}"