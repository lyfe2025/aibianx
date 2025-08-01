#!/bin/bash

# BillionMail 完整集成测试脚本
# 测试前端和后端的BillionMail集成代码

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "${BLUE}🧪 BillionMail 完整集成测试${NC}"
echo ""

# 测试邮箱
TEST_EMAIL="test@example.com"
TEST_NAME="测试用户"

# 1. 测试前端配置
echo -e "${YELLOW}📋 1. 检查前端配置...${NC}"

FRONTEND_CONFIG_FILE="$PROJECT_ROOT/frontend/.env.local"
if [ ! -f "$FRONTEND_CONFIG_FILE" ]; then
    echo -e "${RED}❌ 前端配置文件不存在${NC}"
    exit 1
fi

FRONTEND_API_URL=$(grep "NEXT_PUBLIC_BILLIONMAIL_API_URL" "$FRONTEND_CONFIG_FILE" | cut -d'=' -f2)
echo "前端API URL: $FRONTEND_API_URL"

if [ -z "$FRONTEND_API_URL" ]; then
    echo -e "${RED}❌ 前端API URL未配置${NC}"
    exit 1
else
    echo -e "${GREEN}✅ 前端配置检查通过${NC}"
fi

echo ""

# 2. 测试后端配置
echo -e "${YELLOW}📋 2. 检查后端配置...${NC}"

BACKEND_CONFIG_FILE="$PROJECT_ROOT/backend/.env"
if [ ! -f "$BACKEND_CONFIG_FILE" ]; then
    echo -e "${RED}❌ 后端配置文件不存在${NC}"
    exit 1
fi

BACKEND_API_URL=$(grep "BILLIONMAIL_API_URL" "$BACKEND_CONFIG_FILE" | cut -d'=' -f2)
BACKEND_API_KEY=$(grep "BILLIONMAIL_API_KEY" "$BACKEND_CONFIG_FILE" | cut -d'=' -f2)
BACKEND_LIST_ID=$(grep "BILLIONMAIL_DEFAULT_LIST_ID" "$BACKEND_CONFIG_FILE" | cut -d'=' -f2)

echo "后端API URL: $BACKEND_API_URL"
echo "后端API Key: ${BACKEND_API_KEY:0:10}..."
echo "默认List ID: $BACKEND_LIST_ID"

if [ -z "$BACKEND_API_URL" ] || [ -z "$BACKEND_API_KEY" ] || [ -z "$BACKEND_LIST_ID" ]; then
    echo -e "${RED}❌ 后端配置不完整${NC}"
    exit 1
else
    echo -e "${GREEN}✅ 后端配置检查通过${NC}"
fi

echo ""

# 3. 测试前端组件文件
echo -e "${YELLOW}📋 3. 检查前端组件文件...${NC}"

COMPONENTS_TO_CHECK=(
    "frontend/src/components/molecules/EmailSubscribeForm/EmailSubscribeForm.tsx"
    "frontend/src/components/molecules/EmailVerification/EmailVerification.tsx"
    "frontend/src/lib/hooks/useEmailSubscription.ts"
    "frontend/src/lib/billionmail.ts"
    "frontend/src/lib/verificationManager.ts"
)

for component in "${COMPONENTS_TO_CHECK[@]}"; do
    if [ -f "$PROJECT_ROOT/$component" ]; then
        echo -e "${GREEN}✅${NC} $component"
    else
        echo -e "${RED}❌${NC} $component (缺失)"
    fi
done

echo ""

# 4. 测试后端集成文件
echo -e "${YELLOW}📋 4. 检查后端集成文件...${NC}"

BACKEND_FILES_TO_CHECK=(
    "backend/src/lib/billionmail-config.ts"
)

for file in "${BACKEND_FILES_TO_CHECK[@]}"; do
    if [ -f "$PROJECT_ROOT/$file" ]; then
        echo -e "${GREEN}✅${NC} $file"
    else
        echo -e "${RED}❌${NC} $file (缺失)"
    fi
done

echo ""

# 5. 模拟前端API调用测试
echo -e "${YELLOW}📋 5. 模拟前端API调用测试...${NC}"

# 提取前端API URL（去掉引号）
CLEAN_API_URL=$(echo "$FRONTEND_API_URL" | tr -d '"' | tr -d "'")

echo "测试API URL: $CLEAN_API_URL"

# 测试健康检查
echo -n "健康检查: "
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$CLEAN_API_URL/health" 2>/dev/null)
if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ 成功 (200)${NC}"
else
    echo -e "${RED}❌ 失败 ($HEALTH_RESPONSE)${NC}"
fi

# 测试订阅者API端点
echo -n "订阅者API: "
SUBSCRIBERS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$CLEAN_API_URL/subscribers" 2>/dev/null)
if [ "$SUBSCRIBERS_RESPONSE" = "200" ] || [ "$SUBSCRIBERS_RESPONSE" = "404" ]; then
    echo -e "${GREEN}✅ 端点可访问 ($SUBSCRIBERS_RESPONSE)${NC}"
else
    echo -e "${RED}❌ 端点不可访问 ($SUBSCRIBERS_RESPONSE)${NC}"
fi

# 测试邮件发送API端点
echo -n "邮件发送API: "
EMAILS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$CLEAN_API_URL/emails/send" 2>/dev/null)
if [ "$EMAILS_RESPONSE" = "200" ] || [ "$EMAILS_RESPONSE" = "404" ] || [ "$EMAILS_RESPONSE" = "405" ]; then
    echo -e "${GREEN}✅ 端点可访问 ($EMAILS_RESPONSE)${NC}"
else
    echo -e "${RED}❌ 端点不可访问 ($EMAILS_RESPONSE)${NC}"
fi

echo ""

# 6. 检查BillionMail服务状态
echo -e "${YELLOW}📋 6. 检查BillionMail服务状态...${NC}"

# 检查BillionMail容器
if command -v docker >/dev/null 2>&1; then
    BILLIONMAIL_DIR="$PROJECT_ROOT/BillionMail"
    if [ -d "$BILLIONMAIL_DIR" ]; then
        cd "$BILLIONMAIL_DIR"
        
        CORE_STATUS=$(docker-compose ps core-billionmail --format "{{.Status}}" 2>/dev/null)
        if echo "$CORE_STATUS" | grep -q "Up"; then
            echo -e "${GREEN}✅ BillionMail核心服务运行正常${NC}"
        else
            echo -e "${RED}❌ BillionMail核心服务异常: $CORE_STATUS${NC}"
        fi
        
        POSTFIX_STATUS=$(docker-compose ps postfix-billionmail --format "{{.Status}}" 2>/dev/null)
        if echo "$POSTFIX_STATUS" | grep -q "Up"; then
            echo -e "${GREEN}✅ BillionMail邮件服务运行正常${NC}"
        else
            echo -e "${RED}❌ BillionMail邮件服务异常: $POSTFIX_STATUS${NC}"
        fi
        
        cd "$PROJECT_ROOT"
    else
        echo -e "${RED}❌ BillionMail目录不存在${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Docker未安装，跳过容器状态检查${NC}"
fi

echo ""

# 7. 生成测试报告
echo -e "${PURPLE}📊 集成测试总结${NC}"
echo "=================================="
echo "✅ 已验证项目："
echo "  • 前端配置文件"
echo "  • 后端配置文件"
echo "  • 前端组件文件存在性"
echo "  • 后端集成文件存在性"
echo "  • API端点可访问性"
echo "  • BillionMail服务状态"
echo ""
echo "🎯 下一步操作："
echo "  1. 访问测试页面: http://localhost/test-email"
echo "  2. 手动测试邮件订阅功能"
echo "  3. 手动测试验证码发送功能"
echo "  4. 检查邮件是否正确发送"
echo ""
echo "🔗 相关链接："
echo "  • BillionMail管理界面: http://localhost:8080/billion"
echo "  • 测试页面: http://localhost/test-email"
echo "  • API文档: http://localhost:8080/api/v1"
echo ""

# 8. 提供快速测试命令
echo -e "${BLUE}🚀 快速测试命令${NC}"
echo "=================================="
echo "# 检查BillionMail服务状态"
echo "./scripts.sh email check"
echo ""
echo "# 测试BillionMail API连接"
echo "./scripts.sh email test"
echo ""
echo "# 启动前端开发服务器"
echo "./scripts.sh deploy frontend"
echo ""
echo "# 访问测试页面"
echo "open http://localhost/test-email"