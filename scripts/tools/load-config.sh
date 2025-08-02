#!/bin/bash

# AI变现之路 - 配置加载模块
# 简化版配置加载，确保scripts.sh正常运行

# 基本颜色定义
export GREEN='\033[0;32m'
export BLUE='\033[0;34m'
export YELLOW='\033[1;33m'
export RED='\033[0;31m'
export CYAN='\033[0;36m'
export PURPLE='\033[0;35m'
export NC='\033[0m' # No Color

# 基本环境变量
export SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# 动态配置加载（避免硬编码）
load_dynamic_config() {
    # 默认值（开发环境）
    local frontend_domain="localhost"
    local frontend_port="80"
    local frontend_protocol="http"
    local backend_domain="localhost" 
    local backend_port="1337"
    local backend_protocol="http"
    local search_domain="localhost"
    local search_port="7700"
    local search_protocol="http"
    local billionmail_domain="localhost"
    local billionmail_port="8080"
    local billionmail_protocol="http"

    # 从前端配置文件读取（如果存在）
    if [ -f "$SCRIPT_DIR/frontend/.env.local" ]; then
        frontend_domain=$(grep "NEXT_PUBLIC_FRONTEND_DOMAIN=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$frontend_domain")
        frontend_port=$(grep "NEXT_PUBLIC_FRONTEND_PORT=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$frontend_port")
        frontend_protocol=$(grep "NEXT_PUBLIC_FRONTEND_PROTOCOL=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$frontend_protocol")
        
        backend_domain=$(grep "NEXT_PUBLIC_BACKEND_DOMAIN=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$backend_domain")
        backend_port=$(grep "NEXT_PUBLIC_BACKEND_PORT=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$backend_port")
        backend_protocol=$(grep "NEXT_PUBLIC_BACKEND_PROTOCOL=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$backend_protocol")
        
        search_domain=$(grep "NEXT_PUBLIC_SEARCH_DOMAIN=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$search_domain")
        search_port=$(grep "NEXT_PUBLIC_SEARCH_PORT=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$search_port")
        search_protocol=$(grep "NEXT_PUBLIC_SEARCH_PROTOCOL=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$search_protocol")
        
        billionmail_domain=$(grep "NEXT_PUBLIC_BILLIONMAIL_DOMAIN=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$billionmail_domain")
        billionmail_port=$(grep "NEXT_PUBLIC_BILLIONMAIL_PORT=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$billionmail_port")
        billionmail_protocol=$(grep "NEXT_PUBLIC_BILLIONMAIL_PROTOCOL=" "$SCRIPT_DIR/frontend/.env.local" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || echo "$billionmail_protocol")
    fi

    # 动态构建URL（避免硬编码）
    if ([ "$frontend_port" = "80" ] && [ "$frontend_protocol" = "http" ]) || ([ "$frontend_port" = "443" ] && [ "$frontend_protocol" = "https" ]); then
        export FRONTEND_URL="${frontend_protocol}://${frontend_domain}"
    else
        export FRONTEND_URL="${frontend_protocol}://${frontend_domain}:${frontend_port}"
    fi

    if ([ "$backend_port" = "80" ] && [ "$backend_protocol" = "http" ]) || ([ "$backend_port" = "443" ] && [ "$backend_protocol" = "https" ]); then
        export BACKEND_URL="${backend_protocol}://${backend_domain}"
        export BACKEND_ADMIN_URL="${backend_protocol}://${backend_domain}/admin"
        export BACKEND_API_URL="${backend_protocol}://${backend_domain}/api"
        export BACKEND_DOCS_URL="${backend_protocol}://${backend_domain}/documentation"
    else
        export BACKEND_URL="${backend_protocol}://${backend_domain}:${backend_port}"
        export BACKEND_ADMIN_URL="${backend_protocol}://${backend_domain}:${backend_port}/admin"
        export BACKEND_API_URL="${backend_protocol}://${backend_domain}:${backend_port}/api" 
        export BACKEND_DOCS_URL="${backend_protocol}://${backend_domain}:${backend_port}/documentation"
    fi

    if ([ "$search_port" = "80" ] && [ "$search_protocol" = "http" ]) || ([ "$search_port" = "443" ] && [ "$search_protocol" = "https" ]); then
        export SEARCH_URL="${search_protocol}://${search_domain}"
    else
        export SEARCH_URL="${search_protocol}://${search_domain}:${search_port}"
    fi

    if ([ "$billionmail_port" = "80" ] && [ "$billionmail_protocol" = "http" ]) || ([ "$billionmail_port" = "443" ] && [ "$billionmail_protocol" = "https" ]); then
        export BILLIONMAIL_ADMIN_URL="${billionmail_protocol}://${billionmail_domain}"
    else
        export BILLIONMAIL_ADMIN_URL="${billionmail_protocol}://${billionmail_domain}:${billionmail_port}"
    fi

    # WebMail 通常使用不同的端口（8001）
    export BILLIONMAIL_WEBMAIL_URL="${billionmail_protocol}://${billionmail_domain}:8001"
    
    # 导出单独的配置变量（供其他脚本使用）
    export NEXT_PUBLIC_FRONTEND_DOMAIN="$frontend_domain"
    export NEXT_PUBLIC_BACKEND_DOMAIN="$backend_domain"
    export NEXT_PUBLIC_SEARCH_DOMAIN="$search_domain"
}

# 调用动态配置加载
load_dynamic_config

# load_config 函数定义
load_config() {
    # 配置已经在文件加载时完成，这里只需要确认加载完成
    if [ -z "$CONFIG_LOADED" ]; then
        echo "⚠️ 配置加载异常" >&2
        return 1
    fi
    return 0
}

# 加载完成标记
export CONFIG_LOADED=true