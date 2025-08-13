#!/bin/bash

# MeiliSearch 快速状态检查脚本
# 专门用于启动过程中的快速验证

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载统一环境配置
if [ -f "${PROJECT_ROOT}/deployment/configure-unified-env.sh" ]; then
    source "${PROJECT_ROOT}/deployment/configure-unified-env.sh"
else
    # 后备配置 - 使用动态构建
    DOMAIN="${DOMAIN:-localhost}"
    MEILISEARCH_PORT="${MEILISEARCH_PORT:-7700}"
    PROTOCOL="${PROTOCOL:-http}"
    MEILISEARCH_URL="${PROTOCOL}://${DOMAIN}:${MEILISEARCH_PORT}"
    SEARCH_URL="$MEILISEARCH_URL"
fi

# 返回码定义
# 0: 服务完全正常
# 1: 容器运行但服务异常
# 2: 容器停止但存在
# 3: 容器不存在

# 快速检查函数
check_meilisearch_status() {
    # 1️⃣ 最快检查：健康API
    if curl -s "${SEARCH_URL}/health" 2>/dev/null | grep -q "available"; then
        return 0  # 服务完全正常
    fi
    
    # 2️⃣ 检查容器是否运行
    if docker ps --format "table {{.Names}}" | grep -q "^meilisearch$"; then
        return 1  # 容器运行但服务异常
    fi
    
    # 3️⃣ 检查容器是否存在（已停止）
    if docker ps -a --format "table {{.Names}}" | grep -q "^meilisearch$"; then
        return 2  # 容器停止但存在
    fi
    
    # 4️⃣ 容器不存在
    return 3  # 容器不存在
}

# 静默模式检查
if [ "$1" = "--silent" ]; then
    check_meilisearch_status
    exit $?
fi

# 详细模式检查（默认）
echo "🔍 MeiliSearch 快速状态检查..."

check_meilisearch_status
status=$?

case $status in
    0)
        echo "✅ MeiliSearch 服务运行正常"
        echo "   🌐 管理界面: ${SEARCH_URL}"
        ;;
    1)
        echo "⚠️  MeiliSearch 容器运行但服务异常"
        echo "   💡 建议重启容器: docker restart meilisearch"
        ;;
    2)
        echo "⚠️  MeiliSearch 容器已停止"
        echo "   💡 启动容器: docker start meilisearch"
        ;;
    3)
        echo "❌ MeiliSearch 容器不存在"
        echo "   💡 部署容器: ./scripts/search/deploy-meilisearch.sh"
        ;;
    *)
        echo "❓ 未知状态"
        ;;
esac

exit $status