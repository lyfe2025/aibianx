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

# 加载统一配置
source "$(dirname "$0")/../tools/load-config.sh"
load_config

# 显示数据库配置
echo "🗄️ 数据库配置:"
echo "   主机: $DB_HOST:$DB_PORT"

# 检查PostgreSQL服务
check_postgresql() {
    if ! command -v psql &> /dev/null; then
        echo "⚠️  PostgreSQL 未安装，将使用SQLite数据库"
        return 1
    fi
    
    if ! brew services list | grep -q "postgresql.*started"; then
        echo "🔄 启动PostgreSQL服务..."
        brew services start postgresql@14 2>/dev/null || brew services start postgresql 2>/dev/null
        sleep 3
    fi
    
    if psql postgres -c "SELECT 1" > /dev/null 2>&1; then
        echo "✅ PostgreSQL 连接正常"
        return 0
    else
        echo "⚠️  PostgreSQL 连接失败，将使用SQLite数据库"
        return 1
    fi
}

# 验证数据库连接
verify_database() {
    if check_postgresql; then
        echo "🔄 验证数据库连接..."
        
        # 测试连接到指定数据库
        if test_postgresql_connection "$DATABASE_NAME"; then
            echo "✅ 数据库连接正常: $DATABASE_NAME"
            
            # 显示数据库基本信息
            local info_cmd=$(build_psql_command "$DATABASE_NAME" "-tAc \"SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'\"")
            local table_count=$(eval "$info_cmd" 2>/dev/null | xargs || echo "0")
            echo "📊 数据库信息: 共有 $table_count 个数据表"
        else
            echo "❌ 无法连接到数据库: $DATABASE_NAME"
            echo "💡 请检查数据库配置或使用 scripts/database/check-database.sh 检查"
            exit 1
        fi
    else
        # 切换到SQLite配置
        if [ -f "backend/.env" ]; then
            sed -i '' 's/DATABASE_CLIENT=postgres/DATABASE_CLIENT=sqlite/' backend/.env 2>/dev/null || true
        fi
        echo "✅ 已切换到SQLite数据库"
    fi
}

echo "🔍 验证数据库连接..."
verify_database

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
if [ ! -f "frontend/.env.local" ] || [ ! -f "backend/.env" ]; then
    echo "⚠️  环境变量文件不完整，正在自动配置..."
    source "$(dirname "$0")/../tools/setup-env.sh" || {
        echo "❌ 自动配置环境变量失败"
        exit 1
    }
else
    echo "✅ 环境变量文件已存在"
fi

# 环境变量文件已通过上面的逻辑处理

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
check_port 80 "next"

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
echo "🔄 启动Strapi后端服务..."
npm run develop > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../logs/backend.pid
cd ..

echo "✅ 后端服务已启动 (PID: $BACKEND_PID)"
echo "📝 后端日志: logs/backend.log"

# 等待后端启动完成
echo "⏳ 等待后端服务启动完成..."
BACKEND_READY=false
for i in {1..60}; do
    # 检查进程是否还在运行
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo ""
        echo "❌ 后端进程已退出，请检查日志文件: logs/backend.log"
        exit 1
    fi
    
    # 检查多个端点，更准确判断启动状态
    if curl -s "${BACKEND_URL}/_health" > /dev/null 2>&1 || \
       curl -s "${BACKEND_ADMIN_URL}" > /dev/null 2>&1 || \
       curl -s "${BACKEND_API_URL}/articles" > /dev/null 2>&1; then
        echo ""
        echo "✅ 后端服务启动完成"
        BACKEND_READY=true
        break
    fi
    
    if [ $i -eq 60 ]; then
        echo ""
        echo "❌ 后端服务启动超时（120秒），请检查日志文件: logs/backend.log"
        echo "💡 常见问题："
        echo "   - 数据库连接问题"
        echo "   - 端口被占用"
        echo "   - 环境变量配置错误"
        echo "   - 依赖包缺失"
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    sleep 2
    echo -n "."
done

if [ "$BACKEND_READY" != "true" ]; then
    echo "❌ 后端服务启动失败"
    exit 1
fi

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
FRONTEND_READY=false
for i in {1..30}; do
    # 检查进程是否还在运行
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo ""
        echo "❌ 前端进程已退出，请检查日志文件: logs/frontend.log"
        # 清理后端进程
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    
    # 检查前端是否可访问
    if curl -s "${FRONTEND_URL}" > /dev/null 2>&1; then
        echo ""
        echo "✅ 前端服务启动完成"
        FRONTEND_READY=true
        break
    fi
    
    if [ $i -eq 30 ]; then
        echo ""
        echo "⚠️  前端服务启动超时（60秒），但进程正在运行"
        echo "💡 前端服务可能仍在编译中，请稍后访问"
        FRONTEND_READY=true  # 继续执行，不退出
        break
    fi
    sleep 2
    echo -n "."
done

echo ""
echo "🎉 开发环境启动完成！"
echo "========================================="
echo "📍 访问地址："
echo "   🌐 前端网站: ${FRONTEND_URL}"
echo "   ⚙️  后端管理: ${BACKEND_ADMIN_URL}"
echo "   📡 API测试: ${BACKEND_API_URL}/articles"
echo "   📊 API文档: ${BACKEND_DOCS_URL}"
echo "   🔍 搜索引擎: ${SEARCH_URL}"
echo ""
echo "🗄️  数据库状态："
if command -v psql &> /dev/null && test_postgresql_connection; then
    echo "   ✅ PostgreSQL: 已连接 (数据库: $DATABASE_NAME, 用户: $DATABASE_USERNAME)"
else
    echo "   ✅ SQLite: 已启用 (文件: backend/.tmp/data.db)"
fi
echo ""
echo "📝 日志文件："
echo "   📄 后端日志: logs/backend.log"
echo "   📄 前端日志: logs/frontend.log"
echo "   📄 进程ID: logs/backend.pid, logs/frontend.pid"
echo ""
echo "🌐 所有访问地址："
echo "   🖥️  前端应用: http://localhost (AI变现之路主站)"
echo "   ⚙️  后端管理: http://localhost:1337/admin (Strapi管理界面)"
echo "   📧 邮件营销: http://localhost:8080/billion (BillionMail管理)"
echo "   📬 WebMail: http://localhost:8080/roundcube (邮件收发)"
echo "   🔍 搜索管理: http://localhost:7700 (MeiliSearch管理)"
echo "   📡 API接口: http://localhost:1337/api (后端API)"
echo "   📊 API文档: http://localhost:1337/documentation (接口文档)"
echo ""
echo "🛑 停止服务："
echo "   ./stop-dev.sh"
echo ""
echo "💡 故障排除："
echo "   - 查看实时日志: tail -f logs/backend.log"
echo "   - 查看错误信息: tail -n 50 logs/backend.log | grep -i error"
echo "   - 检查端口占用: lsof -i :1337 或 lsof -i :80"
echo "   - 检查数据库连接: ./scripts/database/check-database.sh"
echo "   - 第一次运行可能需要较长时间进行编译"
echo ""
echo "🔧 数据库管理："
echo "   - 连接数据库: $(build_psql_command)"
echo "   - 数据库检查: ./scripts/database/check-database.sh"
echo "   - 配置文件位置: backend/.env" 