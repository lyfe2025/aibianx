#!/bin/bash

# AI变现之路 - 服务状态检查脚本

echo "📊 AI变现之路 - 服务状态检查"
echo "==============================="

# 检查后端服务状态
echo "⚙️  后端服务 (Strapi):"
if [ -f "logs/backend.pid" ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        echo "   ✅ 运行中 (PID: $BACKEND_PID)"
        if curl -s http://localhost:1337/admin > /dev/null 2>&1; then
            echo "   ✅ HTTP服务正常 (http://localhost:1337)"
        else
            echo "   ⚠️  HTTP服务异常"
        fi
    else
        echo "   ❌ 进程已停止 (PID文件存在但进程不存在)"
    fi
else
    if lsof -Pi :1337 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "   ⚠️  端口1337被占用但无PID文件"
    else
        echo "   ❌ 未运行"
    fi
fi

echo ""

# 检查前端服务状态  
echo "🌐 前端服务 (Next.js):"
if [ -f "logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "   ✅ 运行中 (PID: $FRONTEND_PID)"
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            echo "   ✅ HTTP服务正常 (http://localhost:3000)"
        else
            echo "   ⚠️  HTTP服务异常"
        fi
    else
        echo "   ❌ 进程已停止 (PID文件存在但进程不存在)"
    fi
else
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "   ⚠️  端口3000被占用但无PID文件"
    else
        echo "   ❌ 未运行"
    fi
fi

echo ""

# 检查端口占用情况
echo "🔌 端口占用情况:"
check_port() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        pid=$(lsof -Pi :$port -sTCP:LISTEN -t)
        cmd=$(ps -p $pid -o comm= 2>/dev/null || echo "未知")
        echo "   ✅ 端口 $port ($service): 被PID $pid ($cmd) 占用"
    else
        echo "   ❌ 端口 $port ($service): 空闲"
    fi
}

check_port 1337 "后端"
check_port 3000 "前端"

echo ""

# 检查日志文件
echo "📝 日志文件:"
if [ -f "logs/backend.log" ]; then
    backend_size=$(du -h logs/backend.log | cut -f1)
    backend_lines=$(wc -l < logs/backend.log)
    echo "   📄 后端日志: $backend_size ($backend_lines 行)"
else
    echo "   ❌ 后端日志文件不存在"
fi

if [ -f "logs/frontend.log" ]; then
    frontend_size=$(du -h logs/frontend.log | cut -f1)
    frontend_lines=$(wc -l < logs/frontend.log)
    echo "   📄 前端日志: $frontend_size ($frontend_lines 行)"
else
    echo "   ❌ 前端日志文件不存在"
fi

echo ""

# 检查数据库连接
echo "🗄️  数据库连接:"
if [ -f "backend/.env" ]; then
    source backend/.env 2>/dev/null || true
    if command -v psql &> /dev/null; then
        if psql -h "${DATABASE_HOST:-127.0.0.1}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d "${DATABASE_NAME:-aibianx_dev}" -c '\q' 2>/dev/null; then
            echo "   ✅ PostgreSQL连接正常"
            # 获取数据库中的表数量
            table_count=$(psql -h "${DATABASE_HOST:-127.0.0.1}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d "${DATABASE_NAME:-aibianx_dev}" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | xargs)
            echo "   📊 数据库表数量: $table_count"
        else
            echo "   ❌ PostgreSQL连接失败"
        fi
    else
        echo "   ⚠️  psql工具未安装，无法检查数据库"
    fi
else
    echo "   ⚠️  后端环境变量文件不存在"
fi

echo ""

# API连接测试
echo "🔗 API连接测试:"
if curl -s http://localhost:1337/api/articles > /dev/null 2>&1; then
    article_count=$(curl -s 'http://localhost:1337/api/articles' | grep -o '"total":[0-9]*' | cut -d: -f2)
    echo "   ✅ API连接正常，共有 $article_count 篇文章"
else
    echo "   ❌ API连接失败"
fi

echo ""

# 快速操作指南
echo "🚀 快速操作:"
echo "   启动全部服务: ./start-dev.sh"
echo "   启动后端服务: ./start-backend.sh"  
echo "   启动前端服务: ./start-frontend.sh"
echo "   停止全部服务: ./stop-dev.sh"
echo "   查看后端日志: tail -f logs/backend.log"
echo "   查看前端日志: tail -f logs/frontend.log"
echo "   刷新状态检查: ./status.sh" 