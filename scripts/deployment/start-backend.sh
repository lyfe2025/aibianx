#!/bin/bash

# 加载统一配置
source "$(dirname "$0")/../tools/load-config.sh"
load_config
# AI变现之路 - 后端单独启动脚本

echo "⚙️  启动Strapi后端服务..."
echo "========================="

# 创建日志目录
mkdir -p logs

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查后端依赖
if [ ! -d "backend/node_modules" ]; then
    echo "🔄 安装后端依赖..."
    cd backend && npm install && cd ..
else
    echo "✅ 后端依赖已安装"
fi

# 检查环境变量
if [ ! -f "backend/.env" ]; then
    echo "⚠️  创建后端环境变量文件..."
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
fi

# 检查PostgreSQL连接
echo "🔍 检查数据库连接..."
if command -v psql &> /dev/null; then
    # 从.env文件读取数据库配置
    source backend/.env 2>/dev/null || true
    
    # 测试数据库连接
    if psql -h "${DATABASE_HOST:-127.0.0.1}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -d "postgres" -c '\q' 2>/dev/null; then
        echo "✅ 数据库连接正常"
        
        # 检查目标数据库是否存在
        if ! psql -h "${DATABASE_HOST:-127.0.0.1}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" -lqt | cut -d \| -f 1 | grep -qw "${DATABASE_NAME:-aibianx_dev}"; then
            echo "⚠️  数据库 ${DATABASE_NAME:-aibianx_dev} 不存在，正在创建..."
            createdb -h "${DATABASE_HOST:-127.0.0.1}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-postgres}" "${DATABASE_NAME:-aibianx_dev}" 2>/dev/null && echo "✅ 数据库创建成功" || echo "⚠️  请手动创建数据库"
        else
            echo "✅ 数据库已存在"
        fi
    else
        echo "⚠️  数据库连接失败，请检查PostgreSQL是否启动以及配置是否正确"
    fi
else
    echo "⚠️  未安装psql工具，跳过数据库检查"
fi

# 检查端口占用
if lsof -Pi :1337 -sTCP:LISTEN -t >/dev/null; then
    echo "⚠️  端口 1337 已被占用，正在尝试停止..."
    pkill -f "strapi develop" 2>/dev/null || true
    sleep 2
    if lsof -Pi :1337 -sTCP:LISTEN -t >/dev/null; then
        echo "❌ 无法释放端口 1337，请手动停止相关进程"
        exit 1
    fi
fi

# 清除缓存
echo "🧹 清除Strapi缓存..."
cd backend
if [ -d ".tmp" ] || [ -d ".cache" ] || [ -d "build" ] || [ -d "dist" ]; then
    echo "   🔄 删除缓存目录..."
    rm -rf .tmp .cache build dist 2>/dev/null || true
    echo "   ✅ 缓存清除完成"
else
    echo "   ✅ 无需清除缓存（目录不存在）"
fi

# 启动后端服务
echo "🔄 启动后端服务..."
npm run develop > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../logs/backend.pid
cd ..

echo "✅ 后端服务已启动 (PID: $BACKEND_PID)"
echo "📝 日志文件: logs/backend.log"

# 等待服务启动
echo "⏳ 等待后端服务启动完成..."
for i in {1..30}; do
    if curl -s "${BACKEND_ADMIN_URL}" > /dev/null 2>&1; then
        echo "✅ 后端服务启动完成"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ 后端服务启动超时，请检查日志文件"
        tail -20 logs/backend.log
        exit 1
    fi
    sleep 2
    echo -n "."
done

echo ""
echo "🎉 后端服务启动完成！"
echo "========================="
echo "⚙️  后端管理: ${BACKEND_ADMIN_URL}"
echo "📡 API测试: ${BACKEND_API_URL}/articles"
echo "📊 API文档: ${BACKEND_DOCS_URL}"
echo "🔍 搜索引擎: ${SEARCH_URL}"
echo "📝 实时日志: tail -f logs/backend.log"
echo "🛑 停止服务: ./stop-dev.sh 或 kill $BACKEND_PID" 