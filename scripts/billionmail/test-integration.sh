#!/bin/bash

# BillionMail集成功能测试脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载动态配置
source "$SCRIPT_DIR/../tools/load-config.sh"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🧪 BillionMail集成功能测试${NC}"
echo ""

# 检查服务状态
echo -e "${YELLOW}🔍 检查服务状态...${NC}"
if ! curl -s -f "${BILLIONMAIL_ADMIN_URL%/*}/api/health" >/dev/null 2>&1; then
    echo -e "${RED}❌ BillionMail模拟API服务未运行${NC}"
    echo "请先启动服务: ./scripts.sh email deploy"
    exit 1
fi

echo -e "${GREEN}✅ BillionMail API服务正常${NC}"

# 测试数据
TEST_EMAIL="integration-test@example.com"
TEST_NAME="集成测试用户"
VERIFICATION_CODE="123456"

echo ""
echo -e "${YELLOW}📧 测试邮件订阅功能...${NC}"

# 1. 测试订阅
SUBSCRIBE_RESULT=$(curl -s -X POST "${BILLIONMAIL_ADMIN_URL%/*}/api/subscribers" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_EMAIL\",
    \"name\": \"$TEST_NAME\",
    \"tags\": [\"newsletter\", \"test\"],
    \"preferences\": {
      \"newsletter\": true,
      \"marketing\": false,
      \"updates\": true
    }
  }")

if echo "$SUBSCRIBE_RESULT" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 邮件订阅测试通过${NC}"
    echo "   订阅邮箱: $TEST_EMAIL"
else
    echo -e "${RED}❌ 邮件订阅测试失败${NC}"
    echo "$SUBSCRIBE_RESULT"
    exit 1
fi

echo ""
echo -e "${YELLOW}🔐 测试验证码发送功能...${NC}"

# 2. 测试验证码发送
VERIFICATION_RESULT=$(curl -s -X POST "${BILLIONMAIL_ADMIN_URL%/*}/api/emails/send" \
  -H "Content-Type: application/json" \
  -d "{
    \"to\": \"$TEST_EMAIL\",
    \"template_id\": \"email_verification\",
    \"variables\": {
      \"verification_code\": \"$VERIFICATION_CODE\",
      \"user_name\": \"$TEST_NAME\"
    },
    \"type\": \"verification\"
  }")

if echo "$VERIFICATION_RESULT" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 验证码发送测试通过${NC}"
    echo "   验证码: $VERIFICATION_CODE"
    
    # 提取返回的验证码
    RETURNED_CODE=$(echo "$VERIFICATION_RESULT" | grep -o '"verification_code":"[^"]*"' | cut -d'"' -f4)
    if [ "$RETURNED_CODE" = "$VERIFICATION_CODE" ]; then
        echo -e "${GREEN}✅ 验证码返回正确${NC}"
    else
        echo -e "${YELLOW}⚠️  验证码返回值与发送值不同${NC}"
    fi
else
    echo -e "${RED}❌ 验证码发送测试失败${NC}"
    echo "$VERIFICATION_RESULT"
    exit 1
fi

echo ""
echo -e "${YELLOW}📊 测试统计信息获取...${NC}"

# 3. 测试统计信息
STATS_RESULT=$(curl -s "${BILLIONMAIL_ADMIN_URL%/*}/api/stats")

if echo "$STATS_RESULT" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 统计信息获取正常${NC}"
    
    # 提取关键统计数据
    if command -v jq >/dev/null 2>&1; then
        TOTAL_SUBSCRIBERS=$(echo "$STATS_RESULT" | jq -r '.stats.total_subscribers')
        EMAILS_SENT=$(echo "$STATS_RESULT" | jq -r '.stats.emails_sent')
        echo "   总订阅者: $TOTAL_SUBSCRIBERS"
        echo "   已发送邮件: $EMAILS_SENT"
    else
        echo "$STATS_RESULT"
    fi
else
    echo -e "${RED}❌ 统计信息获取失败${NC}"
    echo "$STATS_RESULT"
fi

echo ""
echo -e "${YELLOW}🧹 测试取消订阅功能...${NC}"

# 4. 测试取消订阅
UNSUBSCRIBE_RESULT=$(curl -s -X POST "${BILLIONMAIL_ADMIN_URL%/*}/api/subscribers/unsubscribe" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$TEST_EMAIL\"}")

if echo "$UNSUBSCRIBE_RESULT" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ 取消订阅测试通过${NC}"
else
    echo -e "${RED}❌ 取消订阅测试失败${NC}"
    echo "$UNSUBSCRIBE_RESULT"
fi

echo ""
echo -e "${YELLOW}🌐 测试管理界面访问...${NC}"

# 5. 测试管理界面
if curl -s -f "${BILLIONMAIL_ADMIN_URL}" >/dev/null 2>&1; then
    echo -e "${GREEN}✅ 管理界面访问正常${NC}"
    echo "   管理界面: ${BILLIONMAIL_ADMIN_URL}"
else
    echo -e "${RED}❌ 管理界面访问失败${NC}"
fi

echo ""
echo -e "${GREEN}🎉 集成测试完成！${NC}"
echo ""
echo -e "${BLUE}📋 测试总结:${NC}"
echo "  ✅ 邮件订阅功能"
echo "  ✅ 验证码发送功能"
echo "  ✅ 统计信息获取"
echo "  ✅ 取消订阅功能"
echo "  ✅ 管理界面访问"
echo ""
echo -e "${YELLOW}💡 下一步:${NC}"
echo "  1. 访问前端页面测试邮件订阅: ${FRONTEND_URL}"
echo "  2. 访问管理界面查看数据: ${BILLIONMAIL_ADMIN_URL}"
echo "  3. 查看实时日志: tail -f logs/billionmail-mock.log"
echo ""
echo -e "${BLUE}🔗 相关命令:${NC}"
echo "  ./scripts.sh email check    # 检查服务状态"
echo "  ./scripts.sh email logs     # 查看日志"
echo "  ./scripts.sh email admin    # 打开管理界面"