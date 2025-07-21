#!/bin/bash

# AI变现之路 - 快速启动脚本
# 用途: 日常开发测试的快速启动（无详细输出）
# 作者: AI变现之路开发团队

# 项目路径
FRONTEND_DIR="/Volumes/wwx/dev/WebProjects/aibianx/frontend"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 启动 AI变现之路前台项目...${NC}"

# 切换目录
cd "$FRONTEND_DIR" || exit 1

# 清理缓存
rm -rf .next > /dev/null 2>&1

# 终止可能占用的端口
lsof -ti:3000 | xargs kill -9 > /dev/null 2>&1

# 启动开发服务器
echo -e "${GREEN}✅ 服务器地址: http://localhost:3000${NC}"
npm run dev 