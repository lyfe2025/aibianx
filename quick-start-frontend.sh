#!/bin/bash

# AI变现之路 - 前台快速启动脚本
# 用途: 日常开发测试的快速启动（无详细输出）
# 作者: AI变现之路开发团队

# 获取脚本所在目录作为项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 启动 AI变现之路前台项目...${NC}"

# 检查前台目录是否存在
if [ ! -d "$FRONTEND_DIR" ]; then
    echo -e "${RED}❌ 前台项目目录不存在: $FRONTEND_DIR${NC}"
    exit 1
fi

# 切换目录
cd "$FRONTEND_DIR" || exit 1

# 清理缓存
rm -rf .next > /dev/null 2>&1

# 终止可能占用的端口
lsof -ti:3000 | xargs kill -9 > /dev/null 2>&1

# 启动开发服务器
echo -e "${GREEN}✅ 服务器地址: http://localhost:3000${NC}"
npm run dev 