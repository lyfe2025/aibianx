#!/bin/bash

# AI变现之路 - 环境变量加载工具
# 用于从backend/.env文件中读取配置

# 加载环境变量配置
load_backend_env() {
    local env_file="backend/.env"
    
    if [ ! -f "$env_file" ]; then
        echo "❌ 配置文件不存在: $env_file"
        return 1
    fi
    
    echo "📖 读取配置文件: $env_file"
    
    # 读取并导出环境变量
    while IFS='=' read -r key value; do
        # 跳过注释和空行
        if [[ $key =~ ^[[:space:]]*# ]] || [[ -z "$key" ]]; then
            continue
        fi
        
        # 清理key和value
        key=$(echo "$key" | xargs)
        value=$(echo "$value" | xargs)
        
        # 如果value为空，设置为空字符串
        if [ -z "$value" ]; then
            value=""
        fi
        
        # 导出环境变量
        export "$key"="$value"
        
        # 只显示数据库相关的配置（敏感信息不显示）
        case "$key" in
            DATABASE_*)
                if [[ "$key" == "DATABASE_PASSWORD" ]]; then
                    if [[ -z "$value" ]]; then
                        echo "   ✅ $key=(无密码)"
                    else
                        echo "   ✅ $key=***"
                    fi
                else
                    echo "   ✅ $key=$value"
                fi
                ;;
        esac
    done < "$env_file"
    
    echo "✅ 配置加载完成"
    return 0
}

# 验证数据库配置是否完整
validate_database_config() {
    local missing_vars=()
    
    if [ -z "$DATABASE_CLIENT" ]; then
        missing_vars+=("DATABASE_CLIENT")
    fi
    
    if [ -z "$DATABASE_HOST" ]; then
        missing_vars+=("DATABASE_HOST")
    fi
    
    if [ -z "$DATABASE_PORT" ]; then
        missing_vars+=("DATABASE_PORT")
    fi
    
    if [ -z "$DATABASE_NAME" ]; then
        missing_vars+=("DATABASE_NAME")
    fi
    
    if [ -z "$DATABASE_USERNAME" ]; then
        missing_vars+=("DATABASE_USERNAME")
    fi
    
    # DATABASE_PASSWORD 可以为空，所以不检查
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        echo "❌ 缺少必要的数据库配置:"
        for var in "${missing_vars[@]}"; do
            echo "   - $var"
        done
        return 1
    fi
    
    echo "✅ 数据库配置验证通过"
    return 0
}

# 显示当前数据库配置
show_database_config() {
    echo "🔧 当前数据库配置："
    echo "   类型: $DATABASE_CLIENT"
    echo "   主机: $DATABASE_HOST"
    echo "   端口: $DATABASE_PORT"
    echo "   数据库: $DATABASE_NAME"
    echo "   用户名: $DATABASE_USERNAME"
    if [[ -z "$DATABASE_PASSWORD" ]]; then
        echo "   密码: (无密码)"
    else
        echo "   密码: ***"
    fi
}

# 构建PostgreSQL连接命令
build_psql_command() {
    local database_name="${1:-$DATABASE_NAME}"
    local additional_params="$2"
    
    local cmd="psql"
    
    if [[ -n "$DATABASE_HOST" && "$DATABASE_HOST" != "localhost" ]]; then
        cmd="$cmd -h $DATABASE_HOST"
    fi
    
    if [[ -n "$DATABASE_PORT" && "$DATABASE_PORT" != "5432" ]]; then
        cmd="$cmd -p $DATABASE_PORT"
    fi
    
    if [[ -n "$DATABASE_USERNAME" ]]; then
        cmd="$cmd -U $DATABASE_USERNAME"
    fi
    
    if [[ -n "$database_name" ]]; then
        cmd="$cmd -d $database_name"
    fi
    
    if [[ -n "$additional_params" ]]; then
        cmd="$cmd $additional_params"
    fi
    
    echo "$cmd"
}

# 检查PostgreSQL连接
test_postgresql_connection() {
    local test_db="${1:-postgres}"
    
    if ! command -v psql &> /dev/null; then
        echo "❌ PostgreSQL 客户端未安装"
        return 1
    fi
    
    local cmd=$(build_psql_command "$test_db" "-c \"SELECT 1\"")
    
    if eval "$cmd" > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}