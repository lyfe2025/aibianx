#!/bin/bash

# 支付系统完整测试脚本
# 验证支付系统的各个组件和功能

echo "🔧 支付系统完整测试验证"
echo "=================================="

# 获取脚本目录并加载动态配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../tools/load-config.sh"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 测试结果统计
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# 测试函数
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "\n${BLUE}[测试 $TOTAL_TESTS]${NC} $test_name"
    echo "命令: $test_command"
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ 通过${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}❌ 失败${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

# API测试函数
test_api() {
    local endpoint="$1"
    local method="${2:-GET}"
    local expected_status="${3:-200}"
    
    if command -v curl > /dev/null 2>&1; then
        response=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "${BACKEND_URL}$endpoint")
        if [ "$response" = "$expected_status" ]; then
            return 0
        else
            echo "期望状态码: $expected_status, 实际: $response"
            return 1
        fi
    else
        echo "curl命令不可用，跳过API测试"
        return 0
    fi
}

echo -e "${YELLOW}开始支付系统测试验证...${NC}"

# 1. 文件存在性测试
echo -e "\n${BLUE}=== 1. 文件完整性测试 ===${NC}"

run_test "后端支付管理器文件" "[ -f 'backend/src/services/payment-manager.ts' ]"
run_test "支付宝Provider文件" "[ -f 'backend/src/services/providers/alipay-provider.ts' ]"
run_test "微信支付Provider文件" "[ -f 'backend/src/services/providers/wechat-provider.ts' ]"
run_test "Stripe Provider文件" "[ -f 'backend/src/services/providers/stripe-provider.ts' ]"
run_test "支付配置API文件" "[ -f 'backend/src/api/payment-config/controllers/payment-config.ts' ]"
run_test "统一支付API文件" "[ -f 'backend/src/api/payments/controllers/payments.ts' ]"

run_test "前端支付Hooks文件" "[ -f 'frontend/src/lib/hooks/usePayment.ts' ]"
run_test "支付方式选择器" "[ -f 'frontend/src/components/molecules/PaymentMethodSelector.tsx' ]"
run_test "支付宝组件文件" "[ -f 'frontend/src/components/molecules/AlipayCheckout.tsx' ]"
run_test "微信支付组件文件" "[ -f 'frontend/src/components/molecules/WechatCheckout.tsx' ]"
run_test "Stripe组件文件" "[ -f 'frontend/src/components/molecules/StripeCheckout.tsx' ]"
# 会员购买功能通过弹窗实现，不需要独立页面
# run_test "会员购买页面" "[ -f 'frontend/src/app/membership/page.tsx' ]"
run_test "支付测试页面" "[ -f 'frontend/src/app/payment/test/page.tsx' ]"

# 2. 配置文件测试
echo -e "\n${BLUE}=== 2. 配置文件测试 ===${NC}"

run_test "支付配置内容类型" "[ -f 'backend/src/api/payment-config/content-types/payment-config/schema.json' ]"
run_test "支付宝配置组件" "[ -f 'backend/src/components/payment/alipay-config.json' ]"
run_test "微信支付配置组件" "[ -f 'backend/src/components/payment/wechat-config.json' ]"
run_test "Stripe配置组件" "[ -f 'backend/src/components/payment/stripe-config.json' ]"
run_test "通用支付配置组件" "[ -f 'backend/src/components/payment/general-config.json' ]"

# 3. 依赖包测试
echo -e "\n${BLUE}=== 3. 依赖包测试 ===${NC}"

if [ -f 'backend/package.json' ]; then
    run_test "支付宝SDK依赖" "grep -q 'alipay-sdk' backend/package.json"
    run_test "微信支付SDK依赖" "grep -q 'wechatpay-axios-plugin' backend/package.json"
    run_test "Stripe SDK依赖" "grep -q '\"stripe\"' backend/package.json"
else
    echo -e "${YELLOW}后端package.json不存在，跳过依赖测试${NC}"
fi

if [ -f 'frontend/package.json' ]; then
    run_test "Stripe前端SDK依赖" "grep -q '@stripe/stripe-js' frontend/package.json"
    run_test "Stripe React组件依赖" "grep -q '@stripe/react-stripe-js' frontend/package.json"
else
    echo -e "${YELLOW}前端package.json不存在，跳过依赖测试${NC}"
fi

# 4. 代码语法测试
echo -e "\n${BLUE}=== 4. 代码语法测试 ===${NC}"

if command -v node > /dev/null 2>&1; then
    run_test "后端TypeScript语法" "cd backend && npx tsc --noEmit"
    run_test "前端TypeScript语法" "cd frontend && npx tsc --noEmit"
else
    echo -e "${YELLOW}Node.js不可用，跳过语法检查${NC}"
fi

# 5. API端点测试 (需要服务运行)
echo -e "\n${BLUE}=== 5. API端点测试 ===${NC}"

echo "检查服务是否运行..."
if curl -s "${BACKEND_URL}/api/health" > /dev/null 2>&1; then
    echo -e "${GREEN}后端服务正在运行${NC}"
    
    run_test "支付配置API可访问" "test_api '/api/payment-config/available-methods' 'GET' '200'"
    run_test "支付API路由存在" "test_api '/api/payments' 'OPTIONS' '200'"
    
else
    echo -e "${YELLOW}后端服务未运行，跳过API测试${NC}"
    echo "要运行API测试，请先启动后端服务: cd backend && npm run dev"
fi

if curl -s "${FRONTEND_URL}" > /dev/null 2>&1; then
    echo -e "${GREEN}前端服务正在运行${NC}"
    echo "前端页面访问:"
    echo "  - 会员购买: 通过弹窗实现 (点击升级按钮)"
    echo "  - 支付测试: ${FRONTEND_URL}/payment/test"
else
    echo -e "${YELLOW}前端服务未运行${NC}"
    echo "要访问前端页面，请启动前端服务: cd frontend && npm run dev"
fi

# 6. 文档完整性测试
echo -e "\n${BLUE}=== 6. 文档完整性测试 ===${NC}"

run_test "支付平台申请指南" "[ -f 'docs/当前开发/三大支付平台申请指南.md' ]"
run_test "支付平台配置指南" "[ -f 'docs/当前开发/三大支付平台后台配置指南.md' ]"
run_test "轻量级支付方案" "[ -f 'docs/当前开发/轻量级支付集成方案.md' ]"
run_test "系统验证报告" "[ -f 'docs/当前开发/支付系统完整验证报告.md' ]"
run_test "API文档更新" "grep -q '支付系统' API-ENDPOINTS.md"

# 7. 脚本和工具测试
echo -e "\n${BLUE}=== 7. 工具脚本测试 ===${NC}"

run_test "支付配置脚本" "[ -f 'scripts/tools/configure-payment-config-descriptions.sh' ]"
run_test "脚本执行权限" "[ -x 'scripts/tools/configure-payment-config-descriptions.sh' ]"

# 输出测试结果
echo -e "\n${BLUE}=================================="
echo -e "测试结果统计"
echo -e "==================================${NC}"
echo -e "总测试数: ${BLUE}$TOTAL_TESTS${NC}"
echo -e "通过测试: ${GREEN}$PASSED_TESTS${NC}"
echo -e "失败测试: ${RED}$FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n${GREEN}🎉 所有测试通过！支付系统准备就绪！${NC}"
    exit 0
else
    echo -e "\n${YELLOW}⚠️  有 $FAILED_TESTS 个测试失败，请检查相关组件${NC}"
    exit 1
fi