#!/bin/bash

# =======================================================
# BillionMail启动修复脚本
# 确保BillionMail在一键部署后能正常工作
# =======================================================

set -e

# 获取脚本目录和项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SUCCESS="${GREEN}✅${NC}"
ERROR="${RED}❌${NC}"
WARNING="${YELLOW}⚠️${NC}"
INFO="${BLUE}ℹ️${NC}"

echo -e "${BLUE}🔧 BillionMail启动修复脚本${NC}"

cd "$PROJECT_ROOT/BillionMail"

# 1. 确保必要的目录存在
echo -e "${INFO} 创建必要的目录..."
mkdir -p ssl-self-signed core-data logs/core
touch ssl-self-signed/.gitkeep core-data/.gitkeep

# 2. 确保数据库JWT配置存在
echo -e "${INFO} 检查并配置JWT设置..."
docker exec billionmail-pgsql-billionmail-1 psql -U billionmail -d billionmail -c "
INSERT INTO bm_options (name, value) 
VALUES ('jwt_secret', 'billionmail_jwt_secret_default_2024') 
ON CONFLICT (name) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO bm_options (name, value) 
VALUES ('jwt_expire', '86400') 
ON CONFLICT (name) DO UPDATE SET value = EXCLUDED.value;
" > /dev/null 2>&1

# 3. 同步配置
echo -e "${INFO} 同步配置..."
cd "$PROJECT_ROOT"
./scripts/billionmail/sync-billionmail-config.sh > /dev/null 2>&1

# 4. 重启BillionMail服务
echo -e "${INFO} 重启BillionMail服务..."
cd "$PROJECT_ROOT/BillionMail"
set -a
source env_init
set +a

# 完全重新创建核心容器
docker-compose down core-billionmail > /dev/null 2>&1
docker-compose up -d core-billionmail > /dev/null 2>&1

# 5. 等待并检查启动结果
echo -e "${INFO} 等待服务启动..."
sleep 15

# 检查容器状态
if docker ps | grep -q "billionmail-core-billionmail-1.*Up"; then
    # 检查Web服务是否响应
    if curl -s -f http://localhost:8080 > /dev/null 2>&1; then
        echo -e "${SUCCESS} BillionMail启动成功！"
        echo -e "${INFO} Web界面: http://localhost:8080"
        exit 0
    else
        echo -e "${WARNING} BillionMail容器运行中，但Web服务未响应"
        echo -e "${INFO} 容器状态："
        docker ps | grep billionmail-core
        echo -e "${INFO} 最新日志："
        docker logs billionmail-core-billionmail-1 --tail 5
        echo -e "${WARNING} BillionMail可能需要额外配置，但不影响核心功能"
        exit 1
    fi
else
    echo -e "${ERROR} BillionMail容器启动失败"
    echo -e "${INFO} 容器状态："
    docker ps -a | grep billionmail-core
    echo -e "${INFO} 错误日志："
    docker logs billionmail-core-billionmail-1 --tail 10
    exit 1
fi