#!/bin/bash

# AI变现之路 - 开发环境快速启动脚本
# 用于同时启动Strapi后端和Next.js前端

echo "🚀 AI变现之路 - 开发环境启动中..."
echo "========================================="

# 创建日志目录
mkdir -p logs

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查依赖安装
echo "📦 检查依赖安装..."

if [ ! -d "backend/node_modules" ]; then
    echo "🔄 安装后端依赖..."
    cd backend && npm install && cd ..
else
    echo "✅ 后端依赖已安装"
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "🔄 安装前端依赖..."
    cd frontend && npm install && cd ..
else
    echo "✅ 前端依赖已安装"
fi

# 检查环境变量文件
if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  前端环境变量文件不存在，正在创建..."
    cat > frontend/.env.local << 'EOF'
# AI变现之路 - 前端环境变量配置
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=AI变现之路
EOF
    echo "✅ 已创建 frontend/.env.local"
else
    echo "✅ 前端环境变量文件已存在"
fi

if [ ! -f "backend/.env" ]; then
    echo "⚠️  后端环境变量文件不存在，正在创建..."
    cat > backend/.env << 'EOF'
# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=aibianx_dev
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_SSL=false

# Secrets
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
JWT_SECRET=your-jwt-secret-here
EOF
    echo "✅ 已创建 backend/.env (请根据实际情况修改数据库配置)"
else
    echo "✅ 后端环境变量文件已存在"
fi

# 检查端口占用
check_port() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
        echo "⚠️  端口 $port 已被占用，正在尝试停止 $service..."
        pkill -f "$service" 2>/dev/null || true
        sleep 2
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
            echo "❌ 无法释放端口 $port，请手动停止相关进程"
            exit 1
        fi
    fi
}

echo "🔍 检查端口占用..."
check_port 1337 "strapi"
check_port 3000 "next"

# 启动后端服务
echo "🔄 启动Strapi后端服务..."
cd backend
npm run develop > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../logs/backend.pid
cd ..

echo "✅ 后端服务已启动 (PID: $BACKEND_PID)"
echo "📝 后端日志: logs/backend.log"

# 等待后端启动完成
echo "⏳ 等待后端服务启动完成..."
for i in {1..30}; do
    if curl -s http://localhost:1337/admin > /dev/null 2>&1; then
        echo "✅ 后端服务启动完成"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ 后端服务启动超时"
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    sleep 2
    echo -n "."
done

# 启动前端服务
echo "🔄 启动Next.js前端服务..."
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../logs/frontend.pid
cd ..

echo "✅ 前端服务已启动 (PID: $FRONTEND_PID)"
echo "📝 前端日志: logs/frontend.log"

# 等待前端启动完成
echo "⏳ 等待前端服务启动完成..."
for i in {1..20}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ 前端服务启动完成"
        break
    fi
    if [ $i -eq 20 ]; then
        echo "⚠️  前端服务启动中，请稍后访问"
        break
    fi
    sleep 2
    echo -n "."
done

echo ""
echo "🎉 开发环境启动完成！"
echo "========================================="
echo "📍 访问地址："
echo "   🌐 前端网站: http://localhost:3000"
echo "   ⚙️  后端管理: http://localhost:1337/admin"
echo "   📡 API测试: http://localhost:1337/api/articles"
echo ""
echo "📝 日志文件："
echo "   📄 后端日志: logs/backend.log"
echo "   📄 前端日志: logs/frontend.log"
echo ""
echo "🛑 停止服务："
echo "   ./stop-dev.sh"
echo ""
echo "💡 提示："
echo "   - 如需查看实时日志: tail -f logs/backend.log 或 tail -f logs/frontend.log"
echo "   - 第一次运行可能需要较长时间，请耐心等待"
echo "   - 如遇到问题，请检查logs目录下的日志文件" 