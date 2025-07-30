#!/bin/bash

# AI变现之路 - 前端单独启动脚本

echo "🌐 启动Next.js前端服务..."
echo "========================="

# 创建日志目录
mkdir -p logs

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查前端依赖
if [ ! -d "frontend/node_modules" ]; then
    echo "🔄 安装前端依赖..."
    cd frontend && npm install && cd ..
else
    echo "✅ 前端依赖已安装"
fi

# 检查环境变量
if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  创建前端环境变量文件..."
    cat > frontend/.env.local << 'EOF'
# AI变现之路 - 前端环境变量配置
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=
NEXT_PUBLIC_SITE_URL=http://localhost
NEXT_PUBLIC_SITE_NAME=AI变现之路
EOF
    echo "✅ 已创建 frontend/.env.local"
fi

# 检查端口占用 (注意：80端口需要管理员权限)
if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null; then
    echo "⚠️  端口 80 已被占用，正在尝试停止..."
    pkill -f "next dev" 2>/dev/null || true
    sleep 2
    if lsof -Pi :80 -sTCP:LISTEN -t >/dev/null; then
        echo "❌ 无法释放端口 80，请手动停止相关进程"
        echo "💡 提示：80端口可能被系统服务占用，请检查："
        echo "   sudo lsof -i :80"
        exit 1
    fi
fi

# 启动前端服务
echo "🔄 启动前端服务..."
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../logs/frontend.pid
cd ..

echo "✅ 前端服务已启动 (PID: $FRONTEND_PID)"
echo "📝 日志文件: logs/frontend.log"

# 等待服务启动
echo "⏳ 等待前端服务启动完成..."
for i in {1..20}; do
    if curl -s http://localhost > /dev/null 2>&1; then
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
echo "🎉 前端服务启动完成！"
echo "========================="
echo "🌐 前端网站: http://localhost"
echo "📝 实时日志: tail -f logs/frontend.log"
echo "🛑 停止服务: ./stop-dev.sh 或 kill $FRONTEND_PID" 