#!/bin/bash

# BillionMail API 测试脚本
# 用于验证API密钥和连接状态

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🧪 BillionMail API 连接测试${NC}"
echo ""

# 读取配置
if [ ! -f "$PROJECT_ROOT/backend/.env" ]; then
    echo -e "${RED}❌ 后端配置文件不存在${NC}"
    exit 1
fi

# 提取配置信息
API_URL=$(grep "BILLIONMAIL_API_URL" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)
API_KEY=$(grep "BILLIONMAIL_API_KEY" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)
LIST_ID=$(grep "BILLIONMAIL_DEFAULT_LIST_ID" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)

echo -e "${YELLOW}📋 配置信息:${NC}"
echo "API URL: $API_URL"
echo "API KEY: ${API_KEY:0:10}..." # 只显示前10个字符
echo "List ID: $LIST_ID"
echo ""

# 检查配置完整性
if [ -z "$API_URL" ] || [ -z "$API_KEY" ] || [ -z "$LIST_ID" ]; then
    echo -e "${RED}❌ 配置信息不完整${NC}"
    echo "请确保以下环境变量已设置："
    echo "- BILLIONMAIL_API_URL"
    echo "- BILLIONMAIL_API_KEY"  
    echo "- BILLIONMAIL_DEFAULT_LIST_ID"
    exit 1
fi

# 检查API密钥格式
if [ "$API_KEY" = "your-billionmail-api-key-here" ]; then
    echo -e "${RED}❌ API密钥未配置${NC}"
    echo "请在BillionMail管理界面获取真实API密钥并更新配置"
    echo "管理界面: ${BILLIONMAIL_ADMIN_URL}"
    exit 1
fi

echo -e "${YELLOW}🔍 开始API测试...${NC}"
echo ""

# 测试1: 健康检查
echo -n "1. 健康检查: "
HEALTH_RESPONSE=$(curl -s -H "Authorization: Bearer $API_KEY" "$API_URL/health")
if echo "$HEALTH_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 通过${NC}"
else
    echo -e "${RED}❌ 失败${NC}"
    echo "   响应: $HEALTH_RESPONSE"
fi

# 测试2: 认证验证
echo -n "2. 认证验证: "
AUTH_RESPONSE=$(curl -s -H "Authorization: Bearer $API_KEY" "$API_URL/auth/validate")
if echo "$AUTH_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 通过${NC}"
else
    echo -e "${RED}❌ 失败${NC}"
    echo "   响应: $AUTH_RESPONSE"
fi

# 测试3: 获取列表信息
echo -n "3. 列表访问: "
LISTS_RESPONSE=$(curl -s -H "Authorization: Bearer $API_KEY" "$API_URL/lists")
if echo "$LISTS_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 通过${NC}"
    # 显示可用列表
    if command -v jq >/dev/null 2>&1; then
        echo "   可用列表:"
        echo "$LISTS_RESPONSE" | jq -r '.data[] | "   - ID: \(.id), 名称: \(.name)"' 2>/dev/null || echo "   列表信息解析失败"
    fi
else
    echo -e "${RED}❌ 失败${NC}"
    echo "   响应: $LISTS_RESPONSE"
fi

# 测试4: 邮件模板检查
echo -n "4. 邮件模板: "
TEMPLATES_RESPONSE=$(curl -s -H "Authorization: Bearer $API_KEY" "$API_URL/templates")
if echo "$TEMPLATES_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 通过${NC}"
    # 检查必需模板
    REQUIRED_TEMPLATES=("email_verification" "login_verification" "welcome_email")
    for template in "${REQUIRED_TEMPLATES[@]}"; do
        if echo "$TEMPLATES_RESPONSE" | grep -q "\"$template\""; then
            echo -e "   ${GREEN}✓${NC} $template 模板已创建"
        else
            echo -e "   ${YELLOW}⚠${NC} $template 模板缺失"
        fi
    done
else
    echo -e "${RED}❌ 失败${NC}"
    echo "   响应: $TEMPLATES_RESPONSE"
fi

echo ""
echo -e "${BLUE}📊 测试完成${NC}"

# 显示下一步指导
echo ""
echo -e "${YELLOW}💡 下一步操作:${NC}"
echo "1. 如果认证失败，请检查API密钥是否正确"
echo "2. 如果模板缺失，请在管理界面创建邮件模板"
echo "3. 所有测试通过后，可以进行前端集成测试"
echo ""
echo -e "${BLUE}🔗 相关链接:${NC}"
echo "管理界面: ${BILLIONMAIL_ADMIN_URL}"
echo "配置指南: docs/当前开发/后台系统/邮件营销/BillionMail配置指南.md"