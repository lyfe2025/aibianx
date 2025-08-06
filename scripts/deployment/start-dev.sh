#!/bin/bash

# AI变现之路 - 开发环境快速启动脚本
# 用于同时启动Strapi后端和Next.js前端

echo "🚀 AI变现之路 - 开发环境启动中..."
echo "========================================="
echo "📋 启动流程说明:"
echo "   1️⃣  检查系统依赖 (Git, Docker, Node.js)"
echo "   2️⃣  加载环境配置"
echo "   3️⃣  检查数据库连接"
echo "   4️⃣  启动/检查搜索引擎"
echo "   5️⃣  启动/检查邮件系统"
echo "   6️⃣  启动后端服务 (Strapi)"
echo "   7️⃣  启动前端服务 (Next.js)"
echo "   8️⃣  同步搜索索引"
echo "   9️⃣  显示访问地址"
echo ""

# 创建必要的目录
echo "📁 创建必要的目录结构..."
mkdir -p logs .pids

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 步骤1: 检查系统依赖
echo "1️⃣  检查系统依赖 (Git, Docker, Node.js)..."

# 调用专门的依赖检查脚本进行感知检查
echo "📋 正在检查系统依赖 (Git, Docker, Docker Compose, Node.js)..."
if ! "$SCRIPT_DIR/../tools/check-dependencies.sh" >/dev/null 2>&1; then
    echo ""
    echo -e "${RED}❌ 系统依赖检查失败${NC}"
    echo -e "${YELLOW}📋 运行详细检查以查看缺失的依赖:${NC}"
    echo "   ./scripts/tools/check-dependencies.sh"
    echo ""
    
    # 询问是否使用自动安装
    if [ -f "$PROJECT_ROOT/scripts/production/install-environment.sh" ]; then
        echo -e "${CYAN}🤖 是否使用自动安装脚本安装缺失的依赖? (y/n)${NC}"
        read -p "请输入选择: " -r auto_install_choice
        
        if [[ $auto_install_choice =~ ^[Yy]$ ]]; then
            echo ""
            echo -e "${BLUE}🚀 启动自动安装...${NC}"
            "$PROJECT_ROOT/scripts/production/install-environment.sh"
            
            # 重新检查依赖
            echo ""
            echo -e "${BLUE}🔍 重新检查依赖...${NC}"
            if ! "$SCRIPT_DIR/../tools/check-dependencies.sh" >/dev/null 2>&1; then
                echo -e "${RED}❌ 自动安装后仍有依赖缺失，请手动检查${NC}"
                exit 1
            fi
            echo -e "${GREEN}✅ 依赖安装成功！${NC}"
        else
            echo -e "${YELLOW}💡 请先安装缺失的依赖，然后重新运行启动脚本${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}💡 请先安装缺失的依赖，然后重新运行启动脚本${NC}"
        exit 1
    fi
fi

echo "🎉 所有系统依赖检查完成！"

# 步骤2: 加载环境配置
echo ""
echo "2️⃣  加载环境配置..."
source "${PROJECT_ROOT}/deployment/configure-unified-env.sh"

# 加载兼容的旧配置（保持向后兼容）
source "$(dirname "$0")/../tools/load-config.sh"
source "$(dirname "$0")/../tools/load-env.sh"
load_config

# 加载后端环境变量（修复数据库信息显示问题）
if ! load_backend_env; then
    echo "❌ 加载后端环境变量失败"
    exit 1
fi

# 步骤3: 检查数据库连接
echo ""
echo "3️⃣  检查数据库连接..."
echo "🗄️ 数据库配置:"
echo "   主机: $DATABASE_HOST:$DATABASE_PORT"
echo "   数据库: $DATABASE_NAME"
echo "   用户: $DATABASE_USERNAME"

# 配置开发环境变量（清理API密钥配置）
configure_dev_env_variables() {
    # 🔧 清理开发环境的API密钥配置（开发模式无需API密钥）
    if [ -f "backend/.env" ]; then
        # 清理后端API密钥配置
        if grep -q "^MEILISEARCH_API_KEY=" backend/.env; then
            sed -i.bak "s/^MEILISEARCH_API_KEY=.*/MEILISEARCH_API_KEY=/" backend/.env
            echo "   ✅ 已清理后端 MEILISEARCH_API_KEY (开发模式无需密钥)"
        fi
        
        # 确保后端搜索配置正确 (使用分离配置格式)
        local backend_updated=false
        if grep -q "^MEILISEARCH_DOMAIN=" backend/.env; then
            sed -i.bak "s/^MEILISEARCH_DOMAIN=.*/MEILISEARCH_DOMAIN=localhost/" backend/.env
            backend_updated=true
        fi
        if grep -q "^MEILISEARCH_PORT=" backend/.env; then
            sed -i.bak "s/^MEILISEARCH_PORT=.*/MEILISEARCH_PORT=7700/" backend/.env
            backend_updated=true
        fi
        if grep -q "^MEILISEARCH_PROTOCOL=" backend/.env; then
            sed -i.bak "s/^MEILISEARCH_PROTOCOL=.*/MEILISEARCH_PROTOCOL=http/" backend/.env
            backend_updated=true
        fi
        
        if [ "$backend_updated" = true ]; then
            echo "   ✅ 已配置后端搜索URL (localhost:7700)"
        fi
    fi
    
    if [ -f "frontend/.env.local" ]; then
        # 清理前端API密钥配置
        if grep -q "^NEXT_PUBLIC_SEARCH_API_KEY=" frontend/.env.local; then
            sed -i.bak "s/^NEXT_PUBLIC_SEARCH_API_KEY=.*/NEXT_PUBLIC_SEARCH_API_KEY=/" frontend/.env.local
            echo "   ✅ 已清理前端 NEXT_PUBLIC_SEARCH_API_KEY (开发模式无需密钥)"
        fi
        
        # 确保前端搜索URL配置正确（确保协议、域名、端口分离配置）
        local need_backup=false
        if grep -q "^NEXT_PUBLIC_SEARCH_DOMAIN=" frontend/.env.local; then
            sed -i.bak "s/^NEXT_PUBLIC_SEARCH_DOMAIN=.*/NEXT_PUBLIC_SEARCH_DOMAIN=localhost/" frontend/.env.local
            need_backup=true
        fi
        if grep -q "^NEXT_PUBLIC_SEARCH_PORT=" frontend/.env.local; then
            sed -i.bak "s/^NEXT_PUBLIC_SEARCH_PORT=.*/NEXT_PUBLIC_SEARCH_PORT=7700/" frontend/.env.local
            need_backup=true
        fi
        if grep -q "^NEXT_PUBLIC_SEARCH_PROTOCOL=" frontend/.env.local; then
            sed -i.bak "s/^NEXT_PUBLIC_SEARCH_PROTOCOL=.*/NEXT_PUBLIC_SEARCH_PROTOCOL=http/" frontend/.env.local
            need_backup=true
        fi
        
        if [ "$need_backup" = true ]; then
            echo "   ✅ 已配置前端搜索URL (localhost:7700)"
        fi
    fi
}

# 智能部署MeiliSearch搜索引擎 - 增强版
deploy_meilisearch() {
    echo ""
    echo "4️⃣  启动/检查搜索引擎..."
    echo "🔍 检查MeiliSearch搜索引擎..."
    
    # 🎯 使用快速检查脚本进行状态检测
    local fast_check_script="${PROJECT_ROOT}/scripts/search/check-meilisearch-fast.sh"
    local meilisearch_status=3  # 默认为不存在
    
    if [ -f "$fast_check_script" ]; then
        "$fast_check_script" --silent
        meilisearch_status=$?
    else
        # 后备检查方法
        if curl -s "${MEILISEARCH_URL}/health" 2>/dev/null | grep -q "available"; then
            meilisearch_status=0
        elif docker ps --format "table {{.Names}}" | grep -q "^meilisearch$"; then
            meilisearch_status=1
        elif docker ps -a --format "table {{.Names}}" | grep -q "^meilisearch$"; then
            meilisearch_status=2
        else
            meilisearch_status=3
        fi
    fi
    
    # 根据状态码处理
    case $meilisearch_status in
        0)
            # 服务完全正常
            echo "✅ MeiliSearch服务运行正常"
            echo "   🌐 Web管理界面: ${MEILISEARCH_URL}"
            echo "   🔓 开发模式: 无需API密钥"
            echo "   📝 配置开发环境变量..."
            configure_dev_env_variables
            return 0
            ;;
        1)
            # 容器运行但服务异常，尝试重启
            echo "⚠️  容器运行但服务异常，尝试重启..."
            docker restart meilisearch > /dev/null 2>&1
            
            # 等待重启后的健康检查
            echo "   ⏳ 等待服务重启..."
            local restart_count=0
            while [ $restart_count -lt 15 ]; do
                if curl -s "${MEILISEARCH_URL}/health" 2>/dev/null | grep -q "available"; then
                    echo "✅ MeiliSearch重启成功"
                    echo "   🌐 Web管理界面: ${MEILISEARCH_URL}"
                    configure_dev_env_variables
                    return 0
                fi
                sleep 1
                restart_count=$((restart_count + 1))
            done
            echo "❌ MeiliSearch重启后仍无响应，将重新部署..."
            ;;
        2)
            # 容器已停止，尝试启动
            echo "🔄 容器已停止，尝试启动..."
            docker start meilisearch > /dev/null 2>&1
            
            # 等待启动后的健康检查
            echo "   ⏳ 等待容器启动..."
            local start_count=0
            while [ $start_count -lt 15 ]; do
                if curl -s "${MEILISEARCH_URL}/health" 2>/dev/null | grep -q "available"; then
                    echo "✅ MeiliSearch启动成功"
                    echo "   🌐 Web管理界面: ${MEILISEARCH_URL}"
                    configure_dev_env_variables
                    return 0
                fi
                sleep 1
                start_count=$((start_count + 1))
            done
            echo "❌ MeiliSearch启动后无响应，将重新部署..."
            ;;
        3)
            # 容器不存在，需要部署
            echo "🚀 容器不存在，准备部署..."
            ;;
    esac
    
    # 🚀 智能部署：使用专用部署脚本进行全新部署
    echo "🚀 调用专用部署脚本进行全新部署..."
    
    # 使用静默模式调用专用部署脚本
    if [ -f "${PROJECT_ROOT}/scripts/search/deploy-meilisearch.sh" ]; then
        echo "   📦 执行MeiliSearch专用部署脚本..."
        if "${PROJECT_ROOT}/scripts/search/deploy-meilisearch.sh" --silent; then
            echo "✅ 专用部署脚本执行成功"
            echo "   📝 配置开发环境变量..."
            configure_dev_env_variables
            return 0
        else
            echo "❌ 专用部署脚本执行失败"
            return 1
        fi
    else
        # 后备方案：内置部署逻辑
        echo "   📦 使用内置部署逻辑..."
        
        # 清理可能存在的问题容器
        echo "   🧹 清理现有容器..."
        docker stop meilisearch 2>/dev/null && echo "   ✅ 已停止现有容器" || echo "   ℹ️  没有运行中的容器"
        docker rm meilisearch 2>/dev/null && echo "   ✅ 已删除现有容器" || echo "   ℹ️  没有需要删除的容器"
        
        echo "   📦 部署开发环境..."
        docker run -d \
            --name meilisearch \
            -p 7700:7700 \
            -e MEILI_ENV=development \
            -v meilisearch_data:/meili_data \
            --restart unless-stopped \
            getmeili/meilisearch:latest > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            # 🕐 智能等待：使用健康检查而不是简单的容器检查
            echo "   ⏳ 等待MeiliSearch服务启动..."
            local deploy_count=0
            while [ $deploy_count -lt 30 ]; do
                # 使用健康检查API而不是docker ps
                if curl -s "${MEILISEARCH_URL}/health" 2>/dev/null | grep -q "available"; then
                    echo ""
                    echo "✅ MeiliSearch内置部署成功"
                    echo "   🌐 Web管理界面: ${MEILISEARCH_URL}"
                    echo "   🔓 开发模式: 无需API密钥"
                    echo "   💾 数据持久化: meilisearch_data Docker卷"
                    
                    # 🔧 自动配置开发环境变量（清理API密钥）
                    echo "   📝 配置开发环境变量..."
                    configure_dev_env_variables
                    
                    return 0
                fi
                
                # 每5秒显示一次进度
                if [ $((deploy_count % 5)) -eq 0 ]; then
                    echo -n "."
                fi
                
                sleep 1
                deploy_count=$((deploy_count + 1))
            done
            echo ""
            echo "❌ MeiliSearch部署超时，但容器可能仍在启动中"
            echo "💡 请稍后手动检查: curl ${MEILISEARCH_URL}/health"
            return 1
        else
            echo "❌ MeiliSearch容器创建失败，请检查Docker状态"
            echo "💡 调试命令: docker logs meilisearch"
            return 1
        fi
    fi
}

# 智能部署BillionMail邮件系统 - 增强版
deploy_billionmail() {
    echo ""
    echo "5️⃣  启动/检查邮件系统..."
    echo "📧 检查BillionMail邮件系统..."
    
    # 🎯 使用快速检查脚本进行状态检测
    local fast_check_script="${PROJECT_ROOT}/scripts/billionmail/check-billionmail-fast.sh"
    local billionmail_status=3  # 默认为未部署
    
    if [ -f "$fast_check_script" ]; then
        "$fast_check_script" --silent
        billionmail_status=$?
    else
        # 后备检查方法
        if docker ps --format "table {{.Names}}" | grep -q "billionmail-core-billionmail-1"; then
            billionmail_status=0  # 运行正常
        elif docker ps -a --format "table {{.Names}}" | grep -q "billionmail-core-billionmail-1"; then
            billionmail_status=1  # 容器存在但未运行
        elif [ -d "${PROJECT_ROOT}/BillionMail" ]; then
            billionmail_status=2  # 目录存在但容器未创建
        else
            billionmail_status=3  # 未部署
        fi
    fi
    
    # 根据状态码处理
    case $billionmail_status in
        0)
            # 服务完全正常
            echo "✅ BillionMail邮件系统运行正常"
            echo "   🌐 管理界面: ${BILLIONMAIL_ADMIN_URL}"
            echo "   📧 WebMail: ${BILLIONMAIL_WEBMAIL_URL}"
            echo "   📋 服务类型: 独立部署 (推荐)"
            return 0
            ;;
        1|2)
            # 容器存在但未运行，或容器不存在但目录存在
            echo "🔧 BillionMail需要启动，正在自动修复..."
            
            # 使用快速检查脚本的自动修复功能
            if [ -f "$fast_check_script" ]; then
                if "$fast_check_script" --fix; then
                    echo "✅ BillionMail自动修复成功"
                    echo "   🌐 管理界面: ${BILLIONMAIL_ADMIN_URL}"
                    echo "   📧 WebMail: ${BILLIONMAIL_WEBMAIL_URL}"
                    echo "   📋 服务类型: 独立部署 (推荐)"
                    return 0
                else
                    echo "⚠️  BillionMail自动修复失败，但不影响前后端服务启动"
                    echo "💡 手动修复命令: ./scripts/billionmail/check-billionmail-fast.sh --fix"
                    return 1
                fi
            else
                # 后备修复逻辑
                echo "   🔄 使用后备修复逻辑..."
                if [ -d "${PROJECT_ROOT}/BillionMail" ]; then
                    cd "${PROJECT_ROOT}/BillionMail"
                    
                    # 加载并导出环境变量
                    if [ -f "env_init" ]; then
                        echo "   📝 加载环境变量..."
                        set -a  # 自动导出变量
                        source env_init
                        set +a
                        echo "   ✅ 环境变量已加载: TZ=$TZ, HTTP_PORT=$HTTP_PORT"
                    fi
                    
                    # 启动容器
                    docker-compose up -d > /dev/null 2>&1
                    
                    # 等待启动
                    local count=0
                    while [ $count -lt 15 ]; do
                        if docker ps --format "table {{.Names}}" | grep -q "billionmail-core-billionmail-1"; then
                            echo "✅ BillionMail后备修复成功"
                            echo "   🌐 管理界面: ${BILLIONMAIL_ADMIN_URL}"
                            echo "   📧 WebMail: ${BILLIONMAIL_WEBMAIL_URL}"
                            cd "${PROJECT_ROOT}"
                            return 0
                        fi
                        sleep 2
                        count=$((count + 1))
                    done
                    echo "⚠️  BillionMail后备修复超时"
                    cd "${PROJECT_ROOT}"
                fi
                return 1
            fi
            ;;
        3)
            # 未部署
            echo "⚠️  BillionMail未部署"
            echo "💡 部署命令: ./scripts/billionmail/deploy-billionmail.sh"
            echo "💡 BillionMail是可选服务，不影响前后端服务启动"
            return 1
            ;;
    esac
    
    echo "⚠️  BillionMail服务检查完成，状态未知"
    return 1
}

# 🎯 智能化MeiliSearch部署控制
# 用户可以通过环境变量控制是否自动部署搜索引擎
AUTO_DEPLOY_MEILISEARCH=${AUTO_DEPLOY_MEILISEARCH:-true}

if [ "$AUTO_DEPLOY_MEILISEARCH" = "true" ]; then
    echo "🔍 自动部署MeiliSearch已启用"
    if deploy_meilisearch; then
        echo "✅ MeiliSearch部署检查完成"
    else
        echo "⚠️  MeiliSearch部署失败，但不影响前后端服务启动"
        echo "💡 稍后可手动部署: ./scripts/search/deploy-meilisearch.sh"
    fi
else
    echo "🔍 MeiliSearch自动部署已禁用"
    echo "💡 设置 AUTO_DEPLOY_MEILISEARCH=true 启用自动部署"
    echo "💡 手动部署命令: ./scripts/search/deploy-meilisearch.sh"
fi

# 调用BillionMail部署 (如果启用) - 使用新的deploy.conf配置
if [ "${AUTO_DEPLOY_EMAIL:-true}" = "true" ]; then
    echo "📧 检查BillionMail邮件系统..."
    
    # 使用新的部署脚本
    billionmail_deploy_script="${PROJECT_ROOT}/scripts/billionmail/deploy-billionmail.sh"
    if [ -f "$billionmail_deploy_script" ]; then
        echo "   🚀 使用专用部署脚本..."
        if "$billionmail_deploy_script" --silent 2>/dev/null; then
            echo "✅ BillionMail部署成功"
        else
            echo "⚠️  BillionMail部署失败（不影响前后端服务启动）"
            echo "💡 手动部署命令: ./scripts/billionmail/deploy-billionmail.sh"
        fi
    elif deploy_billionmail 2>/dev/null; then
        echo "✅ BillionMail部署检查完成"
    else
        echo "⚠️  BillionMail部署跳过（不影响前后端服务启动）"
        echo "💡 手动部署命令: ./scripts/billionmail/deploy-billionmail.sh"
    fi
else
    echo "📧 BillionMail部署已禁用 (AUTO_DEPLOY_EMAIL=false)"
    echo "💡 启用命令: 在deploy.conf中设置 AUTO_DEPLOY_EMAIL=true"
fi

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
            echo "⚠️  将继续启动前后端服务，但可能无法正常运行"
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
        echo "⚠️  将使用现有配置继续启动前后端服务"
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

echo ""
echo "🚀 === 核心服务启动阶段 ==="
echo "📋 无论前面检查结果如何，都将尝试启动前后端服务"
echo ""

# 启动后端服务
echo "🔄 启动Strapi后端服务..."
npm run develop > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
# 创建PID目录并保存PID文件
mkdir -p ../.pids
echo $BACKEND_PID > ../logs/backend.pid
echo $BACKEND_PID > ../.pids/backend.pid
cd ..

echo "✅ 后端服务已启动 (PID: $BACKEND_PID)"
echo "📝 后端日志: logs/backend.log"

# 等待后端启动完成
echo "⏳ 等待后端服务启动完成..."
BACKEND_READY=false
for i in {1..30}; do
    # 检查进程是否还在运行
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo ""
        echo "❌ 后端进程已退出，请检查日志文件: logs/backend.log"
        exit 1
    fi
    
    # 检查后端API是否可访问 (使用动态URL而不是硬编码)
    if curl -s "${BACKEND_API_URL}/articles" > /dev/null 2>&1; then
        echo ""
        echo "✅ 后端服务启动完成"
        BACKEND_READY=true
        break
    fi
    
    if [ $i -eq 30 ]; then
        echo ""
        echo "❌ 后端服务启动超时（60秒），请检查日志文件: logs/backend.log"
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
# 创建PID目录并保存PID文件
mkdir -p ../.pids
echo $FRONTEND_PID > ../logs/frontend.pid
echo $FRONTEND_PID > ../.pids/frontend.pid
cd ..

echo "✅ 前端服务已启动 (PID: $FRONTEND_PID)"
echo "📝 前端日志: logs/frontend.log"

# 等待前端启动完成
echo "⏳ 等待前端服务启动完成..."
FRONTEND_READY=false
for i in {1..20}; do
    # 检查进程是否还在运行
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo ""
        echo "❌ 前端进程已退出，请检查日志文件: logs/frontend.log"
        # 清理后端进程
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    
    # 检查前端是否可访问 (使用动态URL而不是硬编码)
    if curl -s "${FRONTEND_URL}" > /dev/null 2>&1; then
        echo ""
        echo "✅ 前端服务启动完成"
        FRONTEND_READY=true
        break
    fi
    
    if [ $i -eq 20 ]; then
        echo ""
        echo "⚠️  前端服务启动超时（40秒），但进程正在运行"
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

# 自动同步搜索索引（可通过环境变量控制）
AUTO_SYNC_SEARCH=${AUTO_SYNC_SEARCH:-true}
if [ "$AUTO_SYNC_SEARCH" = "true" ]; then
    echo ""
    echo "🔍 自动同步搜索索引..."
    
    # 静默运行搜索索引同步
    if [ -f "$(dirname "$0")/../search/quick-reindex.sh" ]; then
        # 创建后台任务同步索引，避免阻塞启动流程
        (
            # 等待MeiliSearch完全启动（最多60秒）
            echo "$(date '+%Y-%m-%d %H:%M:%S') - 🔍 等待MeiliSearch服务启动..." >> logs/search-sync.log
            local wait_count=0
            while [ $wait_count -lt 60 ]; do
                if curl -s ${MEILISEARCH_URL}/health > /dev/null 2>&1; then
                    echo "$(date '+%Y-%m-%d %H:%M:%S') - ✅ MeiliSearch服务已就绪" >> logs/search-sync.log
                    break
                fi
                sleep 1
                wait_count=$((wait_count + 1))
            done
            
            # 额外等待5秒确保后端也完全稳定
            sleep 5
            echo "$(date '+%Y-%m-%d %H:%M:%S') - 🚀 开始同步搜索索引..." >> logs/search-sync.log
            
            "$(dirname "$0")/../search/quick-reindex.sh" >> logs/search-sync.log 2>&1
            if [ $? -eq 0 ]; then
                echo "$(date '+%Y-%m-%d %H:%M:%S') - ✅ 搜索索引自动同步完成" >> logs/search-sync.log
            else
                echo "$(date '+%Y-%m-%d %H:%M:%S') - ❌ 搜索索引同步失败" >> logs/search-sync.log
            fi
        ) &
        SEARCH_SYNC_PID=$!
        echo "✅ 搜索索引同步已启动 (后台运行，PID: $SEARCH_SYNC_PID)"
        echo "📝 同步日志: logs/search-sync.log"
        echo "🔍 MeiliSearch管理: ${MEILISEARCH_URL}"
        
        # 保存搜索同步PID
        mkdir -p .pids
        echo $SEARCH_SYNC_PID > .pids/search-sync.pid
    else
        echo "⚠️  搜索索引同步脚本不存在，跳过自动同步"
    fi
    
    echo "💡 可设置 AUTO_SYNC_SEARCH=false 禁用自动搜索索引同步"
fi
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
echo "   📄 进程ID: .pids/backend.pid, .pids/frontend.pid"
echo ""
echo "🌐 所有访问地址："
echo "   🖥️  前端应用: ${FRONTEND_URL} (AI变现之路主站)"
echo "   ⚙️  后端管理: ${BACKEND_ADMIN_URL} (Strapi管理界面)"
echo "   📧 邮件营销: ${BILLIONMAIL_ADMIN_URL} (BillionMail管理)"
echo "   📬 WebMail: ${BILLIONMAIL_WEBMAIL_URL} (邮件收发)"
echo "   🔍 搜索管理: ${SEARCH_URL} (MeiliSearch管理)"
echo "   📡 API示例: ${BACKEND_API_URL}/articles (文章API)"
echo "   📊 API文档: ${BACKEND_DOCS_URL} (接口文档)"
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