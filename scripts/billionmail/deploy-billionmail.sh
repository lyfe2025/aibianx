#!/bin/bash

# BillionMail Docker部署脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 开始部署BillionMail邮件营销系统${NC}"
echo ""

# 检查Docker环境
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker未安装，请先安装Docker${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose未安装，请先安装Docker Compose${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker环境检查通过${NC}"

# 创建BillionMail工作目录
BILLIONMAIL_DIR="$PROJECT_ROOT/billionmail"
mkdir -p "$BILLIONMAIL_DIR"
cd "$BILLIONMAIL_DIR"

# 下载BillionMail
echo -e "${YELLOW}📥 下载BillionMail项目...${NC}"
if [ ! -d "BillionMail" ]; then
    git clone https://github.com/aaPanel/BillionMail.git
    echo -e "${GREEN}✅ BillionMail项目下载完成${NC}"
else
    echo -e "${YELLOW}⚠️  BillionMail目录已存在，跳过下载${NC}"
fi

cd BillionMail

# 使用BillionMail自带的安装脚本
echo -e "${YELLOW}🚀 使用BillionMail安装脚本进行部署...${NC}"
chmod +x install.sh

# 检查端口是否被占用
if ss -tlnp | grep -q :8081; then
    echo -e "${YELLOW}⚠️  端口8081已被占用，请停止相关服务后重试${NC}"
    echo "或者修改docker-compose.yml中的端口映射"
    exit 1
fi

# 使用Docker Compose启动服务（简化版）
echo -e "${YELLOW}🐳 启动BillionMail Docker服务...${NC}"
docker-compose up -d

# 等待服务启动
echo -e "${YELLOW}⏳ 等待服务启动...${NC}"
sleep 10

# 检查服务状态
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ BillionMail服务启动成功${NC}"
    echo ""
    echo -e "${BLUE}📍 访问地址:${NC}"
    echo "  管理界面: http://localhost:8081/admin"
    echo "  API地址:   http://localhost:8081/api"
    echo ""
    echo -e "${YELLOW}📋 下一步操作:${NC}"
    echo "  1. 访问管理界面完成初始化设置"
    echo "  2. 配置SMTP邮件服务商"
    echo "  3. 创建邮件模板"
    echo "  4. 获取API密钥用于集成"
else
    echo -e "${RED}❌ BillionMail服务启动失败${NC}"
    echo "请检查日志: docker-compose logs"
    exit 1
fi