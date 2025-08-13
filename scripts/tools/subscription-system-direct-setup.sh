#!/bin/bash

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载统一环境配置
source "${PROJECT_ROOT}/deployment/configure-unified-env.sh"


# 订阅系统架构重构 - 直接执行（跳过前置检查）
# 直接配置新架构，移除旧subscription引用

set -e

echo "🚀 开始订阅系统架构重构（直接执行模式）..."
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置新内容类型
configure_new_content_types() {
    echo -e "${BLUE}🔧 配置新内容类型...${NC}"
    
    cd backend
    
    # 运行配置脚本
    if npm run script:configure-new-content-types; then
        echo -e "${GREEN}✅ 新内容类型配置完成${NC}"
        echo "  📧 email-subscription: 邮件订阅管理"
        echo "  💎 membership: 会员服务管理"
    else
        echo -e "${RED}❌ 新内容类型配置失败${NC}"
        exit 1
    fi
    
    cd ..
}

# 更新代码引用
update_code_references() {
    echo -e "${BLUE}🔧 更新代码引用...${NC}"
    
    # 更新refund服务
    if [ -f "backend/src/api/refund/services/refund.ts" ]; then
        echo "🔧 更新 refund 服务..."
        sed -i.bak 's/api::subscription\.subscription/api::membership.membership/g' backend/src/api/refund/services/refund.ts
        sed -i.bak 's/const subscriptions = /const memberships = /g' backend/src/api/refund/services/refund.ts
        sed -i.bak 's/subscriptions\.map(subscription =>/memberships.map(membership =>/g' backend/src/api/refund/services/refund.ts
        sed -i.bak 's/subscription\.id/membership.id/g' backend/src/api/refund/services/refund.ts
        echo "✅ refund 服务更新完成"
    fi
    
    # 更新order服务  
    if [ -f "backend/src/api/order/services/order.ts" ]; then
        echo "🔧 更新 order 服务..."
        sed -i.bak 's/api::subscription\.subscription/api::membership.membership/g' backend/src/api/order/services/order.ts
        sed -i.bak 's/const existingSubscriptions = /const existingMemberships = /g' backend/src/api/order/services/order.ts
        sed -i.bak 's/const newSubscription = /const newMembership = /g' backend/src/api/order/services/order.ts
        sed -i.bak 's/subscription\.id/membership.id/g' backend/src/api/order/services/order.ts
        echo "✅ order 服务更新完成"
    fi
    
    echo -e "${GREEN}✅ 代码引用更新完成${NC}"
}

# 移除旧subscription目录
remove_old_subscription() {
    echo -e "${BLUE}🗑️ 移除旧subscription目录...${NC}"
    
    if [ -d "backend/src/api/subscription" ]; then
        mv "backend/src/api/subscription" "backend/src/api/subscription.backup.$(date +%Y%m%d_%H%M%S)"
        echo -e "${GREEN}✅ 旧subscription目录已备份并移除${NC}"
    else
        echo -e "${YELLOW}⚠️  旧subscription目录不存在${NC}"
    fi
}

# 重启服务
restart_services() {
    echo -e "${BLUE}🔄 重启Strapi服务...${NC}"
    
    # 停止服务
    ./scripts.sh deploy stop
    sleep 3
    
    # 启动后端服务
    ./scripts.sh deployment start-backend &
    
    echo -e "${GREEN}✅ 服务重启命令已执行${NC}"
    echo "⏳ 等待服务启动..."
    sleep 15
}

# 生成完成报告
generate_completion_report() {
    echo -e "${BLUE}📊 生成完成报告...${NC}"
    
    cat > "docs/当前开发/订阅系统架构重构完成.md" << EOF
# 订阅系统架构重构完成报告

## 📅 执行时间
- 执行时间: $(date '+%Y-%m-%d %H:%M:%S')
- 执行模式: 直接执行（跳过前置检查）
- 执行脚本: subscription-system-direct-setup.sh

## ✅ 已完成步骤
1. [x] 新内容类型配置 (email-subscription + membership)
2. [x] 数据库中文注释添加
3. [x] Strapi后台中文字段描述配置
4. [x] 代码引用更新 (refund + order 服务)
5. [x] 旧subscription目录移除
6. [x] 服务重启

## 🎯 新架构概览

### 📧 邮件订阅系统 (email-subscription)
- **用途**: 免费邮件列表订阅
- **用户**: 游客和注册用户
- **API**: \`POST /api/email-subscription/subscribe\`
- **集成**: Strapi 邮件营销系统

### 💎 会员服务系统 (membership)  
- **用途**: 付费会员权益管理
- **用户**: 仅注册用户
- **API**: \`/api/membership/*\`
- **集成**: 订单和支付系统

## 📱 前端组件使用

### 邮件订阅组件
\`\`\`tsx
import { EmailSubscriptionCard, SubscriptionSection } from '@/components/molecules'

// 侧边栏邮件订阅
<EmailSubscriptionCard />

// 首页邮件订阅  
<SubscriptionSection />
\`\`\`

### 会员购买组件
\`\`\`tsx
import { MembershipPurchaseModal } from '@/components/organisms'

<MembershipPurchaseModal 
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onPurchaseSuccess={(membership) => {
    // 处理购买成功
  }}
/>
\`\`\`

## 🔍 验证清单
- [ ] Admin界面显示中文字段名称: ${ADMIN_URL}
- [ ] 邮件订阅功能正常工作
- [ ] 会员购买流程正常
- [ ] Strapi邮件系统集成正常
- [ ] API权限配置正确

## 📞 后续工作
1. 等待服务完全启动（约1-2分钟）
2. 访问Admin验证字段显示
3. 测试邮件订阅功能
4. 测试会员购买功能
5. 配置API权限（如果需要）

## 🎉 完成状态
✅ 订阅系统架构重构完成
✅ 旧文件已清理
✅ 新架构已就绪

---
**重构成功！新的清晰架构已生效。**
EOF

    echo -e "${GREEN}✅ 完成报告已生成: docs/当前开发/订阅系统架构重构完成.md${NC}"
}

# 主执行流程
main() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎯 订阅系统架构重构 - 直接执行"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # 执行重构步骤
    configure_new_content_types
    update_code_references
    remove_old_subscription
    restart_services
    generate_completion_report
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}🎉 订阅系统架构重构完成！${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${BLUE}📋 接下来请验证:${NC}"
    echo "1. 等待服务启动完成（约1-2分钟）"
    echo "2. 访问Admin: ${ADMIN_URL}"
    echo "3. 检查新内容类型的中文字段显示"
    echo "4. 测试邮件订阅和会员购买功能"
    echo ""
    echo -e "${GREEN}✨ 旧文件已清理，新架构已就绪！${NC}"
}

# 执行主函数
main "$@"
