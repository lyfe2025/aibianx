#!/bin/bash

# BillionMail 快速状态检查和自动修复脚本
# 专门用于启动过程中的快速验证

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载统一环境配置
if [ -f "${PROJECT_ROOT}/deployment/configure-unified-env.sh" ]; then
    source "${PROJECT_ROOT}/deployment/configure-unified-env.sh"
else
    # 后备配置
    BILLIONMAIL_ADMIN_URL="http://localhost:8080/billion"
    BILLIONMAIL_WEBMAIL_URL="http://localhost:8080/roundcube"
fi

# 返回码定义
# 0: 服务完全正常
# 1: 容器存在但未运行
# 2: 容器不存在但目录存在
# 3: BillionMail未部署

# 快速检查函数
check_billionmail_status() {
    # 1️⃣ 检查BillionMail目录是否存在
    if [ ! -d "${PROJECT_ROOT}/BillionMail" ]; then
        return 3  # BillionMail未部署
    fi
    
    # 2️⃣ 最快检查：核心容器是否运行
    if docker ps --format "table {{.Names}}" | grep -q "billionmail-core-billionmail-1"; then
        # 进一步检查管理界面是否可访问
        if curl -s -f "${BILLIONMAIL_ADMIN_URL}" > /dev/null 2>&1; then
            return 0  # 服务完全正常
        else
            return 1  # 容器运行但服务异常
        fi
    fi
    
    # 3️⃣ 检查容器是否存在（已停止）
    if docker ps -a --format "table {{.Names}}" | grep -q "billionmail-core-billionmail-1"; then
        return 1  # 容器存在但未运行
    fi
    
    # 4️⃣ 容器不存在但目录存在
    return 2  # 容器不存在但目录存在
}

# 自动修复函数
auto_fix_billionmail() {
    local status=$1
    
    case $status in
        1)
            # 容器存在但未运行，尝试启动
            echo "🔄 BillionMail容器已存在，正在启动..."
            cd "${PROJECT_ROOT}/BillionMail"
            
            # 加载并导出环境变量
            if [ -f "env_init" ]; then
                echo "   📝 加载环境变量..."
                set -a  # 自动导出变量
                source env_init
                set +a
                # 验证关键变量已设置
                echo "   ✅ 环境变量已加载: TZ=$TZ, HTTP_PORT=$HTTP_PORT"
            fi
            
            docker-compose up -d > /dev/null 2>&1
            if [ $? -eq 0 ]; then
                # 等待启动
                local count=0
                while [ $count -lt 15 ]; do
                    if docker ps --format "table {{.Names}}" | grep -q "billionmail-core-billionmail-1"; then
                        echo "✅ BillionMail启动成功"
                        return 0
                    fi
                    sleep 2
                    count=$((count + 1))
                done
                echo "⚠️  BillionMail启动超时，但可能仍在初始化中"
                return 1
            else
                echo "❌ BillionMail启动失败"
                return 1
            fi
            ;;
        2)
            # 容器不存在但目录存在，需要创建和启动
            echo "📦 BillionMail目录已存在，正在创建容器..."
            cd "${PROJECT_ROOT}/BillionMail"
            
            # 加载并导出环境变量
            if [ -f "env_init" ]; then
                echo "   📝 加载环境变量..."
                set -a  # 自动导出变量
                source env_init
                set +a
                # 验证关键变量已设置
                echo "   ✅ 环境变量已加载: TZ=$TZ, HTTP_PORT=$HTTP_PORT"
            fi
            
            # 清理可能存在的问题容器
            echo "   🧹 清理旧容器..."
            docker-compose down > /dev/null 2>&1
            
            # 创建和启动容器（显示进度）
            echo "   🚀 启动BillionMail容器（可能需要1-2分钟）..."
            echo "   💡 首次启动需要初始化PostgreSQL和Redis，请耐心等待..."
            
            # 使用后台启动，但显示关键信息
            docker-compose up -d
            local compose_exit_code=$?
            
            if [ $compose_exit_code -eq 0 ]; then
                echo "   ⏳ 等待容器完全启动..."
                
                # 分阶段检查：先检查基础服务，再检查应用服务
                local count=0
                local max_wait=60  # 增加到120秒
                
                # 第一阶段：等待PostgreSQL和Redis启动
                echo "   📦 第1阶段：等待数据库服务启动..."
                while [ $count -lt 30 ]; do
                    local postgres_ready=$(docker-compose ps | grep "billionmail-pgsql" | grep -c "Up")
                    local redis_ready=$(docker-compose ps | grep "billionmail-redis" | grep -c "Up")
                    
                    if [ "$postgres_ready" -eq 1 ] && [ "$redis_ready" -eq 1 ]; then
                        echo "   ✅ 数据库服务已启动"
                        break
                    fi
                    
                    echo "   ⏳ 等待数据库初始化... ($count/30)"
                    sleep 3
                    count=$((count + 1))
                done
                
                # 第二阶段：等待应用服务启动
                echo "   📦 第2阶段：等待应用服务启动..."
                count=0
                while [ $count -lt 30 ]; do
                    if docker ps --format "table {{.Names}}" | grep -q "billionmail-core-billionmail-1"; then
                        # 再等待一下确保服务完全启动
                        sleep 5
                        echo "✅ BillionMail创建和启动成功"
                        return 0
                    fi
                    sleep 2
                    count=$((count + 1))
                done
                
                echo "⚠️  BillionMail启动超时，但容器可能仍在初始化中"
                echo "💡 可以运行以下命令检查状态："
                echo "   cd BillionMail && docker-compose logs"
                return 1
            else
                echo "❌ BillionMail创建失败"
                echo "💡 可以运行以下命令查看详细错误："
                echo "   cd BillionMail && docker-compose logs"
                return 1
            fi
            ;;
        3)
            # BillionMail未部署
            echo "❌ BillionMail未部署，请先运行部署脚本"
            echo "💡 部署命令: ./scripts/billionmail/deploy-billionmail.sh"
            return 3
            ;;
        *)
            echo "❓ 未知状态"
            return 1
            ;;
    esac
}

# 静默模式检查
if [ "$1" = "--silent" ]; then
    set +e
    check_billionmail_status
    exit_code=$?
    set -e
    exit $exit_code
fi

# 自动修复模式
if [ "$1" = "--fix" ]; then
    echo "🔧 BillionMail 快速状态检查和自动修复..."
    
    set +e
    check_billionmail_status
    status=$?
    set -e
    
    case $status in
        0)
            echo "✅ BillionMail 服务运行正常"
            echo "   🌐 管理界面: ${BILLIONMAIL_ADMIN_URL}"
            echo "   📧 WebMail: ${BILLIONMAIL_WEBMAIL_URL}"
            exit 0
            ;;
        1|2)
            echo "⚠️  BillionMail 需要修复，正在自动修复..."
            auto_fix_billionmail $status
            exit $?
            ;;
        3)
            echo "❌ BillionMail 未部署"
            echo "💡 部署命令: ./scripts/billionmail/deploy-billionmail.sh"
            exit 3
            ;;
    esac
fi

# 详细模式检查（默认）
echo "📧 BillionMail 快速状态检查..."

# 临时禁用错误退出模式，允许函数返回非零状态码
set +e
check_billionmail_status
status=$?
set -e

case $status in
    0)
        echo "✅ BillionMail 服务运行正常"
        echo "   🌐 管理界面: ${BILLIONMAIL_ADMIN_URL}"
        echo "   📧 WebMail: ${BILLIONMAIL_WEBMAIL_URL}"
        ;;
    1)
        echo "⚠️  BillionMail 容器存在但未运行"
        echo "   💡 启动命令: ./scripts/billionmail/check-billionmail-fast.sh --fix"
        ;;
    2)
        echo "⚠️  BillionMail 目录存在但容器未创建"
        echo "   💡 创建命令: ./scripts/billionmail/check-billionmail-fast.sh --fix"
        ;;
    3)
        echo "❌ BillionMail 未部署"
        echo "   💡 部署命令: ./scripts/billionmail/deploy-billionmail.sh"
        ;;
    *)
        echo "❓ 未知状态: $status"
        ;;
esac

exit $status