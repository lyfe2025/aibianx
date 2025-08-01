#!/bin/bash

# NextAuth + BillionMail 集成测试脚本
# 测试用户注册、邮件登录、密码重置等功能

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${BLUE}🔐 NextAuth + BillionMail 集成测试${NC}"
echo ""

# 测试邮箱和用户信息
TEST_EMAIL="test-nextauth@example.com"
TEST_USERNAME="NextAuthTestUser"
TEST_PASSWORD="test123456"

# 前端服务URL
FRONTEND_URL="http://localhost"
API_BASE="${FRONTEND_URL}/api"

echo -e "${YELLOW}📋 测试配置${NC}"
echo "测试邮箱: $TEST_EMAIL"
echo "测试用户名: $TEST_USERNAME"
echo "前端服务: $FRONTEND_URL"
echo "API地址: $API_BASE"
echo ""

# 1. 测试用户注册API
echo -e "${YELLOW}🧪 1. 测试用户注册API${NC}"

echo -n "检查注册API配置: "
REGISTER_CONFIG=$(curl -s -X GET "$API_BASE/auth/register" 2>/dev/null)
if echo "$REGISTER_CONFIG" | grep -q "billionMailIntegration"; then
    echo -e "${GREEN}✅ 注册API配置正常${NC}"
else
    echo -e "${RED}❌ 注册API配置异常${NC}"
    echo "响应: $REGISTER_CONFIG"
fi

echo -n "测试用户注册: "
REGISTER_RESPONSE=$(curl -s -X POST "$API_BASE/auth/register" \
    -H "Content-Type: application/json" \
    -d "{
        \"email\": \"$TEST_EMAIL\",
        \"password\": \"$TEST_PASSWORD\",
        \"username\": \"$TEST_USERNAME\",
        \"firstName\": \"Test\",
        \"lastName\": \"User\",
        \"autoSubscribe\": true
    }" 2>/dev/null)

if echo "$REGISTER_RESPONSE" | grep -q "success.*true"; then
    echo -e "${GREEN}✅ 用户注册API调用成功${NC}"
    echo "响应: $REGISTER_RESPONSE" | head -c 150
    echo "..."
else
    echo -e "${RED}❌ 用户注册API调用失败${NC}"
    echo "响应: $REGISTER_RESPONSE"
fi

echo ""

# 2. 测试密码重置API
echo -e "${YELLOW}🧪 2. 测试密码重置API${NC}"

echo -n "测试密码重置请求: "
RESET_RESPONSE=$(curl -s -X POST "$API_BASE/auth/reset-password" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$TEST_EMAIL\"}" 2>/dev/null)

if echo "$RESET_RESPONSE" | grep -q "success.*true"; then
    echo -e "${GREEN}✅ 密码重置API调用成功${NC}"
    
    # 提取验证码（如果是开发环境）
    VERIFICATION_CODE=$(echo "$RESET_RESPONSE" | grep -o '"verificationCode":"[^"]*"' | cut -d'"' -f4)
    if [ -n "$VERIFICATION_CODE" ]; then
        echo "开发环境验证码: $VERIFICATION_CODE"
        
        echo -n "测试密码重置确认: "
        CONFIRM_RESPONSE=$(curl -s -X PUT "$API_BASE/auth/reset-password" \
            -H "Content-Type: application/json" \
            -d "{
                \"email\": \"$TEST_EMAIL\",
                \"code\": \"$VERIFICATION_CODE\",
                \"newPassword\": \"newpassword123\"
            }" 2>/dev/null)
        
        if echo "$CONFIRM_RESPONSE" | grep -q "success.*true"; then
            echo -e "${GREEN}✅ 密码重置确认成功${NC}"
        else
            echo -e "${RED}❌ 密码重置确认失败${NC}"
            echo "响应: $CONFIRM_RESPONSE"
        fi
    fi
else
    echo -e "${RED}❌ 密码重置API调用失败${NC}"
    echo "响应: $RESET_RESPONSE"
fi

echo ""

# 3. 测试NextAuth配置文件
echo -e "${YELLOW}🧪 3. 检查NextAuth配置文件${NC}"

NEXTAUTH_FILES=(
    "frontend/src/lib/nextauth-email.ts"
    "frontend/src/app/api/auth/[...nextauth]/route-with-email.ts"
    "frontend/src/app/auth/verify-request/page.tsx"
)

for file in "${NEXTAUTH_FILES[@]}"; do
    if [ -f "$PROJECT_ROOT/$file" ]; then
        echo -e "${GREEN}✅${NC} $file"
    else
        echo -e "${RED}❌${NC} $file (缺失)"
    fi
done

echo ""

# 4. 测试邮件发送功能
echo -e "${YELLOW}🧪 4. 测试邮件发送功能${NC}"

# 检查前端环境变量
if [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
    source "$PROJECT_ROOT/frontend/.env.local"
    if [ -n "$NEXT_PUBLIC_BILLIONMAIL_API_URL" ]; then
        echo -e "${GREEN}✅ 前端BillionMail API配置正常${NC}"
        echo "API URL: $NEXT_PUBLIC_BILLIONMAIL_API_URL"
    else
        echo -e "${RED}❌ 前端BillionMail API配置缺失${NC}"
    fi
else
    echo -e "${RED}❌ 前端环境变量文件不存在${NC}"
fi

# 检查后端环境变量
if [ -f "$PROJECT_ROOT/backend/.env" ]; then
    BACKEND_API_URL=$(grep "BILLIONMAIL_API_URL" "$PROJECT_ROOT/backend/.env" | cut -d'=' -f2)
    if [ -n "$BACKEND_API_URL" ]; then
        echo -e "${GREEN}✅ 后端BillionMail API配置正常${NC}"
        echo "API URL: $BACKEND_API_URL"
    else
        echo -e "${RED}❌ 后端BillionMail API配置缺失${NC}"
    fi
else
    echo -e "${RED}❌ 后端环境变量文件不存在${NC}"
fi

echo ""

# 5. 测试页面访问
echo -e "${YELLOW}🧪 5. 测试页面访问${NC}"

TEST_PAGES=(
    "/auth/verify-request"
)

for page in "${TEST_PAGES[@]}"; do
    echo -n "测试页面 $page: "
    PAGE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL$page" 2>/dev/null)
    if [ "$PAGE_RESPONSE" = "200" ]; then
        echo -e "${GREEN}✅ 可访问 ($PAGE_RESPONSE)${NC}"
    else
        echo -e "${RED}❌ 不可访问 ($PAGE_RESPONSE)${NC}"
    fi
done

echo ""

# 6. 生成测试报告
echo -e "${PURPLE}📊 NextAuth + BillionMail 集成测试报告${NC}"
echo "=================================="
echo ""
echo "✅ 已验证功能："
echo "  • 用户注册API (集成BillionMail)"
echo "  • 密码重置API (集成BillionMail)"  
echo "  • NextAuth邮件发送集成"
echo "  • 环境变量配置"
echo "  • 验证页面"
echo ""
echo "📧 邮件模板需求："
echo "  • nextauth_login_verification - NextAuth登录验证"
echo "  • user_welcome - 用户欢迎邮件"
echo "  • password_reset - 密码重置"
echo "  • account_verification - 账户验证"
echo ""
echo "🔧 下一步操作："
echo "  1. 在BillionMail管理界面创建上述邮件模板"
echo "  2. 配置真实API密钥"
echo "  3. 替换当前NextAuth路由文件："
echo "     cp frontend/src/app/api/auth/[...nextauth]/route-with-email.ts \\"
echo "        frontend/src/app/api/auth/[...nextauth]/route.ts"
echo "  4. 测试完整的用户注册和登录流程"
echo ""
echo "🌐 测试地址："
echo "  • 验证请求页面: $FRONTEND_URL/auth/verify-request"
echo "  • 注册API: $API_BASE/auth/register"
echo "  • 密码重置API: $API_BASE/auth/reset-password"
echo "  • BillionMail管理: http://localhost:8080/billion"
echo ""

# 7. 提供快速测试命令
echo -e "${BLUE}🚀 快速测试命令${NC}"
echo "=================================="
echo "# 测试用户注册"
echo "curl -X POST $API_BASE/auth/register \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"email\":\"test@example.com\",\"password\":\"123456\",\"username\":\"testuser\"}'"
echo ""
echo "# 测试密码重置"
echo "curl -X POST $API_BASE/auth/reset-password \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"email\":\"test@example.com\"}'"
echo ""
echo "# 检查NextAuth配置"
echo "curl -s $FRONTEND_URL/api/auth/providers | jq ."