#!/bin/bash

# BillionMail模拟API服务重启脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🔄 重启BillionMail模拟API服务${NC}"
echo ""

# 停止现有服务
echo -e "${YELLOW}🛑 停止现有服务...${NC}"
PID_FILE="$PROJECT_ROOT/logs/billionmail-mock.pid"

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        echo "正在停止进程 $PID..."
        kill $PID
        
        # 等待进程关闭
        for i in {1..10}; do
            if ! ps -p $PID > /dev/null 2>&1; then
                echo -e "${GREEN}✅ 进程已正常关闭${NC}"
                break
            fi
            echo "等待进程关闭... ($i/10)"
            sleep 1
        done
        
        # 如果进程仍在运行，强制终止
        if ps -p $PID > /dev/null 2>&1; then
            echo -e "${YELLOW}⚠️  强制终止进程...${NC}"
            kill -9 $PID
            sleep 1
        fi
    fi
    rm -f "$PID_FILE"
else
    echo "PID文件不存在，尝试通过进程名查找..."
    # 通过进程名查找并停止
    if pgrep -f "node.*server.js" >/dev/null; then
        echo "发现运行中的BillionMail模拟API进程，正在停止..."
        pkill -f "node.*server.js"
        sleep 2
    fi
fi

# 强制清理端口
if lsof -i :8081 >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  端口8081仍被占用，强制清理...${NC}"
    lsof -ti:8081 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

echo -e "${GREEN}✅ 服务停止完成${NC}"
echo ""

# 重新启动服务
echo -e "${YELLOW}🚀 启动BillionMail模拟API服务...${NC}"

# 模拟API目录
MOCK_API_DIR="$SCRIPT_DIR/mock-api"

if [ ! -d "$MOCK_API_DIR" ]; then
    echo -e "${RED}❌ 模拟API目录不存在: $MOCK_API_DIR${NC}"
    echo "请先运行部署脚本: ./scripts.sh email deploy"
    exit 1
fi

cd "$MOCK_API_DIR"

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 安装依赖包...${NC}"
    npm install
fi

# 启动服务
echo -e "${YELLOW}🚀 启动服务进程...${NC}"
nohup node server.js > "$PROJECT_ROOT/logs/billionmail-mock.log" 2>&1 &
SERVER_PID=$!

# 保存PID
echo $SERVER_PID > "$PROJECT_ROOT/logs/billionmail-mock.pid"

# 等待服务启动
echo -e "${YELLOW}⏳ 等待服务启动...${NC}"
sleep 3

# 验证服务状态
if ps -p $SERVER_PID > /dev/null 2>&1; then
    # 构建动态URL
    local api_url="http://localhost:8081"
    if curl -s -f "${api_url}/api/health" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ BillionMail模拟API服务重启成功${NC}"
        echo ""
        echo -e "${BLUE}📍 服务信息:${NC}"
        echo "  进程ID: $SERVER_PID"
        echo "  管理界面: ${api_url}/admin"
        echo "  API地址: ${api_url}/api"
        echo "  日志文件: logs/billionmail-mock.log"
        echo ""
        echo -e "${YELLOW}💡 使用提示:${NC}"
        echo "  查看日志: ./scripts.sh email logs"
        echo "  检查状态: ./scripts.sh email check"
        echo "  打开管理: ./scripts.sh email admin"
    else
        echo -e "${RED}❌ 服务启动失败 - API健康检查不通过${NC}"
        echo "请查看日志: tail -f logs/billionmail-mock.log"
        exit 1
    fi
else
    echo -e "${RED}❌ 服务进程启动失败${NC}"
    echo "请查看日志: tail -f logs/billionmail-mock.log"
    exit 1
fi