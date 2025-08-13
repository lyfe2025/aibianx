#!/bin/bash

# AI变现之路 - 停止开发环境脚本

echo "🛑 停止开发环境..."
echo "========================="

# 停止后端服务
if [ -f "logs/backend.pid" ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        echo "🔄 停止后端服务 (PID: $BACKEND_PID)..."
        kill $BACKEND_PID
        # 等待进程完全停止
        for i in {1..10}; do
            if ! kill -0 $BACKEND_PID 2>/dev/null; then
                break
            fi
            sleep 1
        done
        # 如果还没停止，强制杀死
        if kill -0 $BACKEND_PID 2>/dev/null; then
            echo "⚠️  强制停止后端服务..."
            kill -9 $BACKEND_PID 2>/dev/null || true
        fi
        echo "✅ 后端服务已停止"
    else
        echo "⚠️  后端服务已停止"
    fi
    rm logs/backend.pid
    # 同时清理新PID目录中的文件
    rm -f .pids/backend.pid
else
    echo "⚠️  未找到后端PID文件"
fi

# 停止前端服务
if [ -f "logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "🔄 停止前端服务 (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID
        # 等待进程完全停止
        for i in {1..10}; do
            if ! kill -0 $FRONTEND_PID 2>/dev/null; then
                break
            fi
            sleep 1
        done
        # 如果还没停止，强制杀死
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            echo "⚠️  强制停止前端服务..."
            kill -9 $FRONTEND_PID 2>/dev/null || true
        fi
        echo "✅ 前端服务已停止"
    else
        echo "⚠️  前端服务已停止"
    fi
    rm logs/frontend.pid
    # 同时清理新PID目录中的文件
    rm -f .pids/frontend.pid
else
    echo "⚠️  未找到前端PID文件"
fi

# 停止搜索索引同步服务
if [ -f ".pids/search-sync.pid" ]; then
    SEARCH_SYNC_PID=$(cat .pids/search-sync.pid)
    if kill -0 $SEARCH_SYNC_PID 2>/dev/null; then
        echo "🔄 停止搜索索引同步服务 (PID: $SEARCH_SYNC_PID)..."
        kill $SEARCH_SYNC_PID 2>/dev/null || true
        echo "✅ 搜索索引同步服务已停止"
    else
        echo "⚠️  搜索索引同步服务已停止"
    fi
    rm .pids/search-sync.pid
else
    echo "💡 未发现搜索索引同步进程"
fi

# 强制清理残留进程
echo "🔄 清理残留进程..."
pkill -f "strapi develop" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

# 停止Docker容器
echo "🐳 停止Docker服务..."

# 停止MeiliSearch
if docker ps | grep -q "meilisearch"; then
    echo "🔄 停止搜索引擎 (MeiliSearch)..."
    docker stop meilisearch 2>/dev/null || true
    echo "✅ 搜索引擎已停止"
fi

# 停止项目相关的PostgreSQL和Redis
if docker ps | grep -q "aibianx-postgres"; then
    echo "🔄 停止数据库服务 (PostgreSQL)..."
    docker stop aibianx-postgres 2>/dev/null || true
    echo "✅ 数据库服务已停止"
fi

if docker ps | grep -q "aibianx-redis"; then
    echo "🔄 停止缓存服务 (Redis)..."
    docker stop aibianx-redis 2>/dev/null || true
    echo "✅ 缓存服务已停止"
fi

echo "💡 邮件系统已集成到Strapi后台，无需独立停止"

# 停止开发过程中可能启动的其他容器
echo "🔄 停止其他临时容器..."
docker ps --format "table {{.Names}}\t{{.Image}}" | grep -E "(cranky_ride|hungry_mccarthy)" | awk '{print $1}' | xargs -r docker stop 2>/dev/null || true

# 等待容器完全停止
echo "⏳ 等待容器完全停止..."
sleep 3

# 等待端口释放
echo "⏳ 等待端口释放..."
sleep 2

# 检查端口状态
check_port_status() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  端口 $port ($service) 仍被占用"
        return 1
    else
        echo "✅ 端口 $port ($service) 已释放"
        return 0
    fi
}

# 检查主要端口状态
check_port_status 1337 "后端"
check_port_status 80 "前端"
check_port_status 5432 "数据库"
check_port_status 6379 "缓存"
check_port_status 7700 "搜索引擎"

echo ""
echo "✅ 开发环境已完全停止"
echo "========================="
echo "💡 重新启动请运行: ./scripts.sh deploy start"
echo "💡 或者直接运行: ./scripts/deployment/start-dev.sh" 