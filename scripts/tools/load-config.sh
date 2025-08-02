#!/bin/bash

# =================================
# 统一配置加载工具
# 为所有脚本提供域名和端口配置
# =================================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 加载配置的函数
load_config() {
    # 获取项目根目录
    if [ -z "$PROJECT_ROOT" ]; then
        PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
    fi

    # 加载前端环境变量
    if [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
        set -a  # 自动导出变量
        source "$PROJECT_ROOT/frontend/.env.local"
        set +a
    fi

    # 加载后端环境变量  
    if [ -f "$PROJECT_ROOT/backend/.env" ]; then
        set -a  # 自动导出变量
        source "$PROJECT_ROOT/backend/.env"
        set +a
    fi

    # 设置默认值（如果环境变量未设置）
    export FRONTEND_DOMAIN="${NEXT_PUBLIC_FRONTEND_DOMAIN:-localhost}"
    export FRONTEND_PORT="${NEXT_PUBLIC_FRONTEND_PORT:-80}"
    export FRONTEND_PROTOCOL="${NEXT_PUBLIC_FRONTEND_PROTOCOL:-http}"

    export BACKEND_DOMAIN="${NEXT_PUBLIC_BACKEND_DOMAIN:-${BACKEND_DOMAIN:-localhost}}"
    export BACKEND_PORT="${NEXT_PUBLIC_BACKEND_PORT:-${BACKEND_PORT:-1337}}"
    export BACKEND_PROTOCOL="${NEXT_PUBLIC_BACKEND_PROTOCOL:-${BACKEND_PROTOCOL:-http}}"

    export SEARCH_DOMAIN="${NEXT_PUBLIC_SEARCH_DOMAIN:-${MEILISEARCH_DOMAIN:-localhost}}"
    export SEARCH_PORT="${NEXT_PUBLIC_SEARCH_PORT:-${MEILISEARCH_PORT:-7700}}"
    export SEARCH_PROTOCOL="${NEXT_PUBLIC_SEARCH_PROTOCOL:-${MEILISEARCH_PROTOCOL:-http}}"

    export BILLIONMAIL_DOMAIN="${NEXT_PUBLIC_BILLIONMAIL_DOMAIN:-${BILLIONMAIL_DOMAIN:-localhost}}"
    export BILLIONMAIL_PORT="${NEXT_PUBLIC_BILLIONMAIL_PORT:-${BILLIONMAIL_PORT:-8080}}"
    export BILLIONMAIL_PROTOCOL="${NEXT_PUBLIC_BILLIONMAIL_PROTOCOL:-${BILLIONMAIL_PROTOCOL:-http}}"

    export DB_HOST="${DATABASE_HOST:-localhost}"
    export DB_PORT="${DATABASE_PORT:-5432}"

    # 构建完整URL的函数
    build_frontend_url() {
        local path="${1:-}"
        local port_suffix=""
        if [[ ! (("$FRONTEND_PROTOCOL" == "http" && "$FRONTEND_PORT" == "80") || ("$FRONTEND_PROTOCOL" == "https" && "$FRONTEND_PORT" == "443")) ]]; then
            port_suffix=":$FRONTEND_PORT"
        fi
        echo "${FRONTEND_PROTOCOL}://${FRONTEND_DOMAIN}${port_suffix}${path}"
    }

    build_backend_url() {
        local path="${1:-}"
        local port_suffix=""
        if [[ ! (("$BACKEND_PROTOCOL" == "http" && "$BACKEND_PORT" == "80") || ("$BACKEND_PROTOCOL" == "https" && "$BACKEND_PORT" == "443")) ]]; then
            port_suffix=":$BACKEND_PORT"
        fi
        echo "${BACKEND_PROTOCOL}://${BACKEND_DOMAIN}${port_suffix}${path}"
    }

    build_search_url() {
        local path="${1:-}"
        local port_suffix=""
        if [[ ! (("$SEARCH_PROTOCOL" == "http" && "$SEARCH_PORT" == "80") || ("$SEARCH_PROTOCOL" == "https" && "$SEARCH_PORT" == "443")) ]]; then
            port_suffix=":$SEARCH_PORT"
        fi
        echo "${SEARCH_PROTOCOL}://${SEARCH_DOMAIN}${port_suffix}${path}"
    }

    build_billionmail_url() {
        local path="${1:-}"
        local port_suffix=""
        if [[ ! (("$BILLIONMAIL_PROTOCOL" == "http" && "$BILLIONMAIL_PORT" == "80") || ("$BILLIONMAIL_PROTOCOL" == "https" && "$BILLIONMAIL_PORT" == "443")) ]]; then
            port_suffix=":$BILLIONMAIL_PORT"
        fi
        echo "${BILLIONMAIL_PROTOCOL}://${BILLIONMAIL_DOMAIN}${port_suffix}${path}"
    }

    # 导出URL构建函数
    export -f build_frontend_url
    export -f build_backend_url  
    export -f build_search_url
    export -f build_billionmail_url

    # 构建常用URL
    export FRONTEND_URL=$(build_frontend_url)
    export BACKEND_URL=$(build_backend_url)
    export BACKEND_ADMIN_URL=$(build_backend_url "/admin")
    export BACKEND_API_URL=$(build_backend_url "/api")
    export BACKEND_DOCS_URL=$(build_backend_url "/documentation")
    export SEARCH_URL=$(build_search_url)
    export SEARCH_HEALTH_URL=$(build_search_url "/health")
    export BILLIONMAIL_URL=$(build_billionmail_url)
    export BILLIONMAIL_ADMIN_URL=$(build_billionmail_url "/billion")
    export BILLIONMAIL_WEBMAIL_URL=$(build_billionmail_url "/roundcube")
    export BILLIONMAIL_API_URL=$(build_billionmail_url "/api/v1")

    # 数据库工具函数
    build_psql_command() {
        local database="${1:-${DATABASE_NAME:-aibianx_dev}}"
        local cmd="${2:-}"
        if [ -n "$cmd" ]; then
            echo "psql postgresql://${DATABASE_USERNAME:-aibianx_dev}:${DATABASE_PASSWORD:-aibianx_password}@${DB_HOST}:${DB_PORT}/${database} ${cmd}"
        else
            echo "psql postgresql://${DATABASE_USERNAME:-aibianx_dev}:${DATABASE_PASSWORD:-aibianx_password}@${DB_HOST}:${DB_PORT}/${database}"
        fi
    }

    test_postgresql_connection() {
        local database="${1:-${DATABASE_NAME:-aibianx_dev}}"
        psql postgresql://${DATABASE_USERNAME:-aibianx_dev}:${DATABASE_PASSWORD:-aibianx_password}@${DB_HOST}:${DB_PORT}/${database} -c "SELECT 1;" > /dev/null 2>&1
    }

    # 导出数据库函数
    export -f build_psql_command
    export -f test_postgresql_connection

    # 验证配置（可选）
    if [ "$1" = "--verbose" ]; then
        echo -e "${GREEN}📋 配置已加载:${NC}"
        echo "   • 前端服务: $FRONTEND_URL"
        echo "   • 后端服务: $BACKEND_URL"
        echo "   • 后端管理: $BACKEND_ADMIN_URL"
        echo "   • 搜索引擎: $SEARCH_URL"
        echo "   • 邮件营销: $BILLIONMAIL_ADMIN_URL"
        echo "   • WebMail: $BILLIONMAIL_WEBMAIL_URL"
        echo "   • 数据库: $DB_HOST:$DB_PORT"
    fi
}

# 检查配置是否已加载
check_config() {
    if [ -z "$FRONTEND_URL" ] || [ -z "$BACKEND_URL" ] || [ -z "$SEARCH_URL" ] || [ -z "$BILLIONMAIL_ADMIN_URL" ]; then
        echo -e "${YELLOW}⚠️  配置未加载，正在自动加载...${NC}" >&2
        load_config
    fi
}

# 如果直接执行此脚本，加载配置
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    load_config --verbose
fi