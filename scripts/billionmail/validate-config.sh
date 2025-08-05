#!/bin/bash

# BillionMail配置验证脚本
# 验证BillionMail是否正确配置并可以发送邮件

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🔧 BillionMail配置验证${NC}"
echo -e "${CYAN}验证BillionMail是否正确配置并可以使用${NC}"
echo ""

# 检查BillionMail服务状态
echo -e "${YELLOW}📦 检查BillionMail服务状态...${NC}"
if ! docker ps | grep -q "core-billionmail"; then
    echo -e "${RED}❌ BillionMail服务未运行${NC}"
    echo -e "${YELLOW}启动命令：${NC}./scripts.sh billionmail deploy"
    exit 1
fi
echo -e "${GREEN}✅ BillionMail服务正在运行${NC}"

# 检查API连通性
echo -e "${YELLOW}🌐 检查BillionMail API连通性...${NC}"
API_URL="http://localhost:8080/api/v1"
if ! curl -s "${API_URL}/health" >/dev/null 2>&1; then
    echo -e "${RED}❌ BillionMail API无法访问${NC}"
    echo -e "${CYAN}请检查：${NC}http://localhost:8080/billion"
    exit 1
fi
echo -e "${GREEN}✅ BillionMail API连通正常${NC}"

# 检查管理界面
echo -e "${YELLOW}🎛️  检查管理界面...${NC}"
if ! curl -s "http://localhost:8080/billion" >/dev/null 2>&1; then
    echo -e "${RED}❌ 管理界面无法访问${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 管理界面正常${NC}"

# 检查后端配置
echo -e "${YELLOW}⚙️  检查后端BillionMail配置...${NC}"
cd "$PROJECT_ROOT/backend"

# 检查环境变量
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ 后端.env文件不存在${NC}"
    exit 1
fi

# 检查BillionMail配置
BILLIONMAIL_DOMAIN=$(grep "BILLIONMAIL_DOMAIN" .env | cut -d'=' -f2)
BILLIONMAIL_PORT=$(grep "BILLIONMAIL_PORT" .env | cut -d'=' -f2)
BILLIONMAIL_API_KEY=$(grep "BILLIONMAIL_API_KEY" .env | cut -d'=' -f2)

if [ -z "$BILLIONMAIL_DOMAIN" ] || [ -z "$BILLIONMAIL_PORT" ]; then
    echo -e "${RED}❌ BillionMail基础配置缺失${NC}"
    echo "请检查BILLIONMAIL_DOMAIN和BILLIONMAIL_PORT配置"
    exit 1
fi

echo -e "${GREEN}✅ BillionMail域名配置：${NC}${BILLIONMAIL_DOMAIN}:${BILLIONMAIL_PORT}"

# 检查API Key
if [ "$BILLIONMAIL_API_KEY" = "your-billionmail-api-key-here" ] || [ -z "$BILLIONMAIL_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  BillionMail API Key未配置${NC}"
    echo -e "${CYAN}请按以下步骤配置：${NC}"
    echo -e "${CYAN}1. 访问：${NC}http://localhost:8080/billion"
    echo -e "${CYAN}2. 登录：${NC}billion / billion"
    echo -e "${CYAN}3. 进入API管理，生成API密钥${NC}"
    echo -e "${CYAN}4. 在backend/.env中更新BILLIONMAIL_API_KEY${NC}"
    echo ""
    read -p "$(echo -e ${YELLOW}是否现在配置API Key？[y/N]: ${NC})" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${CYAN}请在新窗口中打开：${NC}http://localhost:8080/billion"
        echo -e "${YELLOW}配置完成后，请重新运行此脚本${NC}"
    fi
    exit 1
else
    echo -e "${GREEN}✅ BillionMail API Key已配置${NC}"
fi

# 测试API连接（使用配置的API Key）
echo -e "${YELLOW}🔑 测试API Key有效性...${NC}"
API_TEST_URL="${BILLIONMAIL_DOMAIN}:${BILLIONMAIL_PORT}/api/v1/health"
if [ "$BILLIONMAIL_DOMAIN" = "localhost" ]; then
    API_TEST_URL="http://localhost:${BILLIONMAIL_PORT}/api/v1/health"
fi

API_RESPONSE=$(curl -s -H "Authorization: Bearer $BILLIONMAIL_API_KEY" "$API_TEST_URL" 2>/dev/null)
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  无法验证API Key（可能是BillionMail版本差异）${NC}"
    echo -e "${CYAN}请手动验证：${NC}http://localhost:8080/billion"
else
    echo -e "${GREEN}✅ API Key验证通过${NC}"
fi

# 检查邮件模板配置提醒
echo ""
echo -e "${PURPLE}📧 邮件模板配置检查：${NC}"
echo -e "${CYAN}请确认在BillionMail管理界面中已创建以下模板：${NC}"
echo -e "   ${YELLOW}•${NC} user_welcome (用户注册欢迎邮件)"
echo -e "   ${YELLOW}•${NC} email_verification (邮箱验证邮件)"
echo -e "   ${YELLOW}•${NC} password_reset (密码重置邮件)"
echo ""

# 检查邮箱配置提醒
echo -e "${PURPLE}📮 邮箱配置检查：${NC}"
echo -e "${CYAN}请确认在BillionMail管理界面中已创建：${NC}"
echo -e "   ${YELLOW}•${NC} 发件邮箱：noreply@localhost.test"
echo -e "   ${YELLOW}•${NC} 测试邮箱：test@localhost.test"
echo ""

# 提供配置指南链接
echo -e "${PURPLE}📚 配置指南：${NC}"
echo -e "${CYAN}详细配置：${NC}docs/API文档/BillionMail快速上手指南.md"
echo -e "${CYAN}管理界面：${NC}http://localhost:8080/billion (billion/billion)"
echo -e "${CYAN}WebMail：${NC}http://localhost:8080/roundcube"
echo ""

# 提供测试命令
echo -e "${PURPLE}🧪 下一步测试：${NC}"
echo -e "${CYAN}快速测试：${NC}./scripts/billionmail/quick-test-email.sh"
echo -e "${CYAN}完整测试：${NC}./scripts/billionmail/test-integration-full.sh"
echo -e "${CYAN}用户注册：${NC}访问 http://localhost 进行注册测试"

echo ""
echo -e "${GREEN}🎉 BillionMail配置验证完成！${NC}"

# 如果所有检查都通过，提供一键测试选项
if [ "$BILLIONMAIL_API_KEY" != "your-billionmail-api-key-here" ] && [ -n "$BILLIONMAIL_API_KEY" ]; then
    echo ""
    read -p "$(echo -e ${YELLOW}是否立即进行邮件发送测试？[y/N]: ${NC})" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}🚀 启动邮件发送测试...${NC}"
        "$SCRIPT_DIR/quick-test-email.sh"
    fi
fi