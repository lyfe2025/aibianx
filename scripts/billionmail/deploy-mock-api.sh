#!/bin/bash

# BillionMail 模拟API部署脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 部署BillionMail模拟API服务${NC}"
echo ""

# 检查Node.js环境
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js未安装，请先安装Node.js${NC}"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm未安装，请先安装npm${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js环境检查通过${NC}"

# 模拟API目录
MOCK_API_DIR="$SCRIPT_DIR/mock-api"
cd "$MOCK_API_DIR"

# 检查端口占用
if lsof -i :8081 >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  端口8081已被占用，正在停止现有服务...${NC}"
    # 尝试优雅关闭
    pkill -f "node.*server.js" 2>/dev/null || true
    sleep 2
    
    # 强制杀死占用端口的进程
    if lsof -i :8081 >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  强制停止端口8081上的服务...${NC}"
        lsof -ti:8081 | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
fi

# 安装依赖
echo -e "${YELLOW}📦 安装依赖包...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✅ 依赖包安装完成${NC}"
else
    echo -e "${GREEN}✅ 依赖包已存在，跳过安装${NC}"
fi

# 启动服务
echo -e "${YELLOW}🚀 启动BillionMail模拟API服务...${NC}"

# 后台启动服务
nohup node server.js > "$PROJECT_ROOT/logs/billionmail-mock.log" 2>&1 &
SERVER_PID=$!

# 等待服务启动
echo -e "${YELLOW}⏳ 等待服务启动...${NC}"
sleep 3

# 检查服务状态
if ps -p $SERVER_PID > /dev/null; then
    # 验证API响应
    if curl -s -f http://localhost:8081/api/health >/dev/null 2>&1; then
        echo -e "${GREEN}✅ BillionMail模拟API服务启动成功${NC}"
        echo ""
        echo -e "${BLUE}📍 访问地址:${NC}"
        echo "  管理界面: http://localhost:8081/admin"
        echo "  API地址:   http://localhost:8081/api"
        echo "  健康检查: http://localhost:8081/api/health"
        echo ""
        echo -e "${YELLOW}📋 服务信息:${NC}"
        echo "  进程ID: $SERVER_PID"
        echo "  日志文件: logs/billionmail-mock.log"
        echo ""
        echo -e "${YELLOW}📖 功能特点:${NC}"
        echo "  ✅ 完整的邮件订阅API"
        echo "  ✅ 验证码发送模拟（开发环境显示验证码）"
        echo "  ✅ 订阅者管理"
        echo "  ✅ 邮件发送记录"
        echo "  ✅ 统计信息"
        echo "  ✅ 美观的Web管理界面"
        echo ""
        echo -e "${BLUE}🔧 管理命令:${NC}"
        echo "  查看日志: tail -f logs/billionmail-mock.log"
        echo "  停止服务: ./scripts.sh email restart"
        echo "  检查状态: ./scripts.sh email check"
        
        # 将PID保存到文件
        echo $SERVER_PID > "$PROJECT_ROOT/logs/billionmail-mock.pid"
        
    else
        echo -e "${RED}❌ BillionMail模拟API服务启动失败${NC}"
        echo "请查看日志: cat logs/billionmail-mock.log"
        exit 1
    fi
else
    echo -e "${RED}❌ BillionMail模拟API进程启动失败${NC}"
    echo "请查看日志: cat logs/billionmail-mock.log"
    exit 1
fi