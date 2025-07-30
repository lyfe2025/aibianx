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
else
    echo "⚠️  未找到前端PID文件"
fi

# 强制清理残留进程
echo "🔄 清理残留进程..."
pkill -f "strapi develop" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

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

check_port_status 1337 "后端"
check_port_status 80 "前端"

echo ""
echo "✅ 开发环境已完全停止"
echo "========================="
echo "💡 重新启动请运行: ./start-dev.sh" 