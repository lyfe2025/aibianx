#!/bin/bash

# 真实BillionMail部署脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 部署真实BillionMail邮件营销系统${NC}"
echo ""

# 检查Docker环境
echo -e "${YELLOW}📦 检查Docker环境...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker未安装${NC}"
    echo "请先安装Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! docker info >/dev/null 2>&1; then
    echo -e "${RED}❌ Docker服务未运行${NC}"
    echo "请启动Docker服务"
    exit 1
fi

echo -e "${GREEN}✅ Docker环境正常${NC}"

# 停止模拟API服务
echo -e "${YELLOW}🛑 停止模拟API服务...${NC}"
if [ -f "$PROJECT_ROOT/logs/billionmail-mock.pid" ]; then
    PID=$(cat "$PROJECT_ROOT/logs/billionmail-mock.pid")
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID
        echo "✅ 模拟API服务已停止"
    fi
    rm -f "$PROJECT_ROOT/logs/billionmail-mock.pid"
fi

# 检查端口占用
echo -e "${YELLOW}🔍 检查端口占用...${NC}"
if lsof -i :8081 >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  端口8081被占用，正在清理...${NC}"
    lsof -ti:8081 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# 进入BillionMail目录
BILLIONMAIL_DIR="$PROJECT_ROOT/billionmail/BillionMail"
cd "$BILLIONMAIL_DIR"

echo ""
echo -e "${BLUE}📋 BillionMail官方部署方案${NC}"
echo "根据官方文档，我们有两种部署方式："
echo ""
echo -e "${GREEN}方式1: 使用官方install.sh脚本${NC}"
echo "  • 自动配置所有服务"
echo "  • 包含邮件服务器、数据库等"
echo "  • 完整的生产环境配置"
echo ""
echo -e "${GREEN}方式2: 使用Docker Compose${NC}"
echo "  • 轻量级部署"
echo "  • 仅Web界面服务"
echo "  • 适合开发和演示"
echo ""

read -p "请选择部署方式 [1/2]: " deploy_method

case $deploy_method in
    1)
        echo -e "${YELLOW}📦 使用官方install.sh脚本部署...${NC}"
        echo ""
        echo -e "${RED}⚠️  注意：这将安装完整的邮件服务器系统${NC}"
        echo "包括：PostgreSQL, Redis, Postfix, Dovecot, Rspamd等"
        echo ""
        read -p "确认继续？[y/N]: " confirm
        
        if [[ $confirm =~ ^[Yy]$ ]]; then
            echo -e "${YELLOW}🚀 开始安装...${NC}"
            sudo chmod +x install.sh
            sudo ./install.sh
        else
            echo "已取消安装"
            exit 0
        fi
        ;;
    2)
        echo -e "${YELLOW}🐳 使用Docker Compose部署...${NC}"
        
        # 检查并修复docker-compose.yml
        echo -e "${YELLOW}🔧 配置Docker Compose...${NC}"
        
        # 更新端口避免冲突
        sed -i.bak 's/8080:80/8081:80/g' docker-compose.yml
        
        # 启动服务
        echo -e "${YELLOW}🚀 启动BillionMail服务...${NC}"
        docker-compose up -d
        
        # 等待服务启动
        echo -e "${YELLOW}⏳ 等待服务启动...${NC}"
        sleep 10
        
        # 检查服务状态
        if docker-compose ps | grep -q "Up"; then
            echo -e "${GREEN}✅ BillionMail部署成功！${NC}"
            echo ""
            echo -e "${BLUE}📍 访问信息:${NC}"
            echo "  管理界面: http://localhost:8081"
            echo "  用户名: billionmail"
            echo "  密码: billionmail"
            echo ""
            echo -e "${YELLOW}📋 管理命令:${NC}"
            echo "  查看状态: docker-compose ps"
            echo "  查看日志: docker-compose logs -f"
            echo "  停止服务: docker-compose down"
            echo ""
            
            # 更新项目配置
            echo -e "${YELLOW}🔧 更新项目配置...${NC}"
            
            # 更新环境变量
            if [ -f "$PROJECT_ROOT/backend/.env" ]; then
                sed -i.bak 's|BILLIONMAIL_API_URL=.*|BILLIONMAIL_API_URL=http://localhost:8081/api|g' "$PROJECT_ROOT/backend/.env"
                sed -i.bak 's|BILLIONMAIL_ADMIN_URL=.*|BILLIONMAIL_ADMIN_URL=http://localhost:8081|g' "$PROJECT_ROOT/backend/.env"
            fi
            
            # 尝试打开浏览器
            if command -v open > /dev/null; then
                echo -e "${YELLOW}🌐 正在打开浏览器...${NC}"
                open "http://localhost:8081"
            fi
            
        else
            echo -e "${RED}❌ BillionMail部署失败${NC}"
            echo "查看错误日志:"
            docker-compose logs
            exit 1
        fi
        ;;
    *)
        echo -e "${RED}❌ 无效选择${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 真实BillionMail部署完成！${NC}"
echo ""
echo -e "${BLUE}🔗 相关链接:${NC}"
echo "  官方演示: https://demo.billionmail.com/billionmail"
echo "  GitHub: https://github.com/aaPanel/BillionMail"
echo "  中文文档: https://github.com/aaPanel/BillionMail/blob/dev/README-zh_CN.md"