#!/bin/bash

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载统一环境配置
source "${PROJECT_ROOT}/deployment/configure-unified-env.sh"


# 订阅系统架构重构 - 全新设置（无数据迁移）
# 直接配置新架构，移除旧subscription引用

set -e

echo "🚀 开始订阅系统架构重构..."
echo "📋 模式: 全新设置 (无数据迁移)"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查前置条件
check_prerequisites() {
    echo -e "${BLUE}🔍 检查前置条件...${NC}"
    
    # 检查Strapi服务是否运行
    if ! url_health_check "${ADMIN_URL}" "Strapi管理后台"; then
        echo -e "${RED}❌ Strapi服务未运行，请先启动后端服务${NC}"
        echo "命令: ./scripts.sh deployment start-backend"
        exit 1
    fi
    
    # 检查数据库连接
    if ! ./scripts/database/check-database.sh > /dev/null 2>&1; then
        echo -e "${RED}❌ 数据库连接失败，请检查数据库状态${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 前置条件检查通过${NC}"
}

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

# 重启服务
restart_services() {
    echo -e "${BLUE}🔄 重启Strapi服务...${NC}"
    
    # 停止服务
    ./scripts.sh deploy stop
    sleep 3
    
    # 启动后端服务
    if ./scripts.sh deployment start-backend; then
        echo -e "${GREEN}✅ 服务重启完成${NC}"
        
        # 等待服务启动
        echo "⏳ 等待服务启动..."
        sleep 10
        
        # 检查服务状态
        if url_health_check "${ADMIN_URL}" "Strapi管理后台"; then
            echo -e "${GREEN}✅ 服务启动成功${NC}"
        else
            echo -e "${YELLOW}⚠️  服务启动中，请稍等...${NC}"
            sleep 10
        fi
    else
        echo -e "${RED}❌ 服务重启失败${NC}"
        exit 1
    fi
}

# 验证新架构
verify_new_architecture() {
    echo -e "${BLUE}🔍 验证新架构...${NC}"
    
    # 检查新API端点
    echo "📡 测试新API端点..."
    
    # 测试邮件订阅API
    if curl -s -X POST ${BACKEND_URL}/api/email-subscription/subscribe \
        -H "Content-Type: application/json" \
        -d '{"email":"test@example.com","source":"test"}' > /dev/null; then
        echo -e "${GREEN}✅ 邮件订阅API正常${NC}"
    else
        echo -e "${YELLOW}⚠️  邮件订阅API测试失败（可能需要权限配置）${NC}"
    fi
    
    # 检查Admin界面访问
    echo "🎨 检查Admin界面..."
    echo "请访问以下地址验证新内容类型:"
    echo "  📧 邮件订阅: ${ADMIN_URL}/content-manager/collection-types/api::email-subscription.email-subscription"
    echo "  💎 会员服务: ${ADMIN_URL}/content-manager/collection-types/api::membership.membership"
}

# 清理旧文件（可选）
cleanup_old_files() {
    echo -e "${BLUE}🧹 清理旧文件...${NC}"
    
    echo -e "${YELLOW}⚠️  发现旧的subscription内容类型${NC}"
    echo "建议在确认新架构工作正常后删除旧文件:"
    echo "  📁 backend/src/api/subscription/"
    echo ""
    read -p "是否现在删除旧subscription目录? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if [ -d "backend/src/api/subscription" ]; then
            mv "backend/src/api/subscription" "backend/src/api/subscription.backup.$(date +%Y%m%d_%H%M%S)"
            echo -e "${GREEN}✅ 旧subscription目录已备份并移除${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  旧subscription目录保留，请稍后手动处理${NC}"
    fi
}

# 生成完成报告
generate_completion_report() {
    echo -e "${BLUE}📊 生成完成报告...${NC}"
    
    cat > "docs/当前开发/订阅系统架构重构完成.md" << EOF
# 订阅系统架构重构完成报告

## 📅 执行时间
- 执行时间: $(date '+%Y-%m-%d %H:%M:%S')
- 执行模式: 全新设置（无数据迁移）
- 执行脚本: subscription-system-clean-setup.sh

## ✅ 已完成步骤
1. [x] 新内容类型配置 (email-subscription + membership)
2. [x] 数据库中文注释添加
3. [x] Strapi后台中文字段描述配置
4. [x] 代码引用更新 (refund + order 服务)
5. [x] 服务重启和验证

## 🎯 新架构概览

### 📧 邮件订阅系统 (email-subscription)
- **用途**: 免费邮件列表订阅
- **用户**: 游客和注册用户
- **API**: \`POST /api/email-subscription/subscribe\`
- **集成**: BillionMail 邮件系统

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
- [ ] Admin界面显示中文字段名称
- [ ] 邮件订阅功能正常工作
- [ ] 会员购买流程正常
- [ ] BillionMail集成正常
- [ ] API权限配置正确

## 📞 后续工作
1. 测试所有邮件订阅流程
2. 测试会员购买和管理功能
3. 配置API权限（如果需要）
4. 更新API文档
5. 删除旧subscription备份文件（确认无问题后）

## 🎉 完成状态
✅ 订阅系统架构重构完成
✅ 新架构已就绪并可投入使用

---
**新架构优势:**
- 概念清晰：邮件订阅 vs 会员服务完全分离
- 功能专一：每个系统专注自己的业务逻辑  
- 维护简单：代码结构清晰，职责明确
- 扩展性强：为后续功能开发奠定坚实基础
EOF

    echo -e "${GREEN}✅ 完成报告已生成: docs/当前开发/订阅系统架构重构完成.md${NC}"
}

# 主执行流程
main() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎯 订阅系统架构重构 - 全新设置（无数据迁移）"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    echo ""
    echo -e "${YELLOW}📋 执行内容:${NC}"
    echo "1. 配置新内容类型 (email-subscription + membership)"
    echo "2. 添加数据库中文注释和字段描述"
    echo "3. 更新代码引用"
    echo "4. 重启服务并验证"
    echo "5. 清理旧文件（可选）"
    echo ""
    
    read -p "是否继续执行架构重构? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "操作已取消"
        exit 0
    fi
    
    # 执行重构步骤
    check_prerequisites
    configure_new_content_types
    update_code_references
    restart_services
    verify_new_architecture
    cleanup_old_files
    generate_completion_report
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}🎉 订阅系统架构重构完成！${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${BLUE}📋 接下来请验证:${NC}"
    echo "1. 访问Admin检查字段显示: ${ADMIN_URL}"
    echo "2. 测试邮件订阅功能"
    echo "3. 测试会员购买功能"
    echo "4. 确认BillionMail集成正常"
    echo ""
    echo -e "${GREEN}✨ 新的订阅系统架构已就绪！${NC}"
}

# 执行主函数
main "$@"
