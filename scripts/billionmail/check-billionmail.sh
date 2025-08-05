#!/bin/bash

# BillionMail真实系统服务状态检查脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载统一环境配置
source "${PROJECT_ROOT}/deployment/configure-unified-env.sh"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📧 BillionMail真实系统服务状态检查${NC}"
echo ""

# 检查是否在正确目录
BILLIONMAIL_DIR="$PROJECT_ROOT/BillionMail"
if [ ! -d "$BILLIONMAIL_DIR" ]; then
    echo -e "${RED}❌ BillionMail目录未找到: $BILLIONMAIL_DIR${NC}"
    echo "请确认BillionMail已正确部署"
    exit 1
fi

# 检查Docker容器状态
echo -e "${YELLOW}🔍 检查Docker容器状态...${NC}"
cd "$BILLIONMAIL_DIR"

if ! command -v docker >/dev/null 2>&1; then
    echo -e "${RED}❌ Docker未安装或不可用${NC}"
    exit 1
fi

if ! command -v docker-compose >/dev/null 2>&1; then
    echo -e "${RED}❌ docker-compose未安装或不可用${NC}"
    exit 1
fi

# 获取容器状态
CONTAINERS=$(docker-compose ps --format table 2>/dev/null)
if [ $? -eq 0 ] && [ -n "$CONTAINERS" ]; then
    echo -e "${GREEN}✅ BillionMail Docker容器状态:${NC}"
    echo "$CONTAINERS"
else
    echo -e "${RED}❌ 无法获取容器状态，BillionMail可能未启动${NC}"
    echo "请运行: cd $BILLIONMAIL_DIR && docker-compose up -d"
    exit 1
fi

echo ""

# 检查核心服务
echo -e "${YELLOW}🔍 检查核心服务状态...${NC}"
CORE_STATUS=$(docker-compose ps core-billionmail --format "{{.Status}}" 2>/dev/null)
if echo "$CORE_STATUS" | grep -q "Up"; then
    echo -e "${GREEN}✅ 核心服务运行正常${NC}"
    echo "  状态: $CORE_STATUS"
else
    echo -e "${RED}❌ 核心服务异常${NC}"
    echo "  状态: $CORE_STATUS"
fi

# 检查邮件服务
POSTFIX_STATUS=$(docker-compose ps postfix-billionmail --format "{{.Status}}" 2>/dev/null)
if echo "$POSTFIX_STATUS" | grep -q "Up"; then
    echo -e "${GREEN}✅ 邮件服务运行正常${NC}"
    echo "  状态: $POSTFIX_STATUS"
else
    echo -e "${RED}❌ 邮件服务异常${NC}"
    echo "  状态: $POSTFIX_STATUS"
fi

# 检查WebMail服务
WEBMAIL_STATUS=$(docker-compose ps webmail-billionmail --format "{{.Status}}" 2>/dev/null)
if echo "$WEBMAIL_STATUS" | grep -q "Up"; then
    echo -e "${GREEN}✅ WebMail服务运行正常${NC}"
    echo "  状态: $WEBMAIL_STATUS"
else
    echo -e "${RED}❌ WebMail服务异常${NC}"
    echo "  状态: $WEBMAIL_STATUS"
fi

echo ""

# 检查服务接口
echo -e "${YELLOW}🔍 检查服务接口...${NC}"

# 检查管理界面
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${BILLIONMAIL_ADMIN_URL}")
if echo "$HTTP_CODE" | grep -qE "^(200|302)$"; then
    echo -e "${GREEN}✅ 管理界面可访问${NC}"
    echo "  地址: ${BILLIONMAIL_ADMIN_URL}"
    echo "  状态: 正常运行"
else
    echo -e "${RED}❌ 管理界面不可访问${NC}"
    echo "  地址: ${BILLIONMAIL_ADMIN_URL}" 
    echo "  状态码: $HTTP_CODE"
    echo "  请检查服务是否正常启动"
fi

# 检查WebMail界面
WEBMAIL_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${BILLIONMAIL_WEBMAIL_URL}")
if echo "$WEBMAIL_CODE" | grep -qE "^(200|302)$"; then
    echo -e "${GREEN}✅ WebMail界面可访问${NC}"
    echo "  地址: ${BILLIONMAIL_WEBMAIL_URL}"
    echo "  状态: 正常运行"
else
    echo -e "${YELLOW}⚠️  WebMail界面暂不可用${NC}"
    echo "  地址: ${BILLIONMAIL_WEBMAIL_URL}"
    echo "  状态码: $WEBMAIL_CODE"
    echo "  说明: WebMail服务可能需要更多时间启动"
fi

echo ""

# 检查SMTP端口
echo -e "${YELLOW}🔍 检查SMTP服务端口...${NC}"
if nc -z localhost 25 2>/dev/null; then
    echo -e "${GREEN}✅ SMTP端口25可用${NC}"
else
    echo -e "${RED}❌ SMTP端口25不可用${NC}"
fi

if nc -z localhost 587 2>/dev/null; then
    echo -e "${GREEN}✅ SMTP端口587可用${NC}"
else
    echo -e "${RED}❌ SMTP端口587不可用${NC}"
fi

echo ""
echo -e "${BLUE}📍 BillionMail服务信息:${NC}"
echo -e "${GREEN}管理界面:${NC}    ${BILLIONMAIL_ADMIN_URL}"
echo -e "${GREEN}WebMail:${NC}     ${BILLIONMAIL_WEBMAIL_URL}"
echo -e "${GREEN}默认账户:${NC}    billion / billion"
echo ""
echo -e "${BLUE}📧 邮件服务端口:${NC}"
echo "SMTP:        25, 465, 587"
echo "IMAP:        143, 993"
echo "POP3:        110, 995"
echo ""
echo -e "${BLUE}💡 快速操作:${NC}"
echo "  📋 查看日志: ./scripts.sh email logs"
echo "  🔄 重启服务: ./scripts.sh email restart"
echo "  🌐 打开管理: ./scripts.sh email admin"
echo "  🧪 测试API:  ./scripts.sh email test"
echo ""
echo -e "${YELLOW}📖 系统特点:${NC}"
echo "  ✅ 完整的邮件营销平台"
echo "  ✅ 专业邮件服务器(Postfix)"
echo "  ✅ IMAP/POP3邮件收取"
echo "  ✅ RoundCube WebMail界面"
echo "  ✅ 用户和邮件列表管理"
echo "  ✅ 邮件发送统计分析"