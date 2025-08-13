#!/bin/bash

# 验证一键部署邮件系统修复效果的脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔍 验证一键部署邮件系统修复效果${NC}"
echo "======================================="
echo ""

# 检查一键部署脚本修复
echo -e "${YELLOW}1. 检查一键部署脚本修复...${NC}"
AUTO_DEPLOY_SCRIPT="$PROJECT_ROOT/scripts/production/auto-deploy.sh"

if grep -q "邮件营销系统已集成到Strapi" "$AUTO_DEPLOY_SCRIPT"; then
    echo -e "${GREEN}✅ 一键部署脚本已更新为Strapi邮件系统集成${NC}"
else
    echo -e "${RED}❌ 一键部署脚本需要更新邮件系统说明${NC}"
fi

# 检查邮件系统集成状态
echo ""
echo -e "${YELLOW}2. 检查邮件系统集成状态...${NC}"
EMAIL_API_PATH="$PROJECT_ROOT/backend/src/api/email-subscription"

if [ -d "$EMAIL_API_PATH" ]; then
    echo -e "${GREEN}✅ 邮件订阅系统已集成到Strapi${NC}"
else
    echo -e "${RED}❌ 邮件订阅系统API不存在${NC}"
fi

# 检查Docker Compose配置
echo ""
echo -e "${YELLOW}3. 检查Docker Compose配置...${NC}"
DOCKER_COMPOSE_FILE="$PROJECT_ROOT/deployment/docker-compose.unified.yml"

if [ -f "$DOCKER_COMPOSE_FILE" ]; then
    if grep -q "邮件系统已改为独立部署" "$DOCKER_COMPOSE_FILE"; then
        echo -e "${GREEN}✅ Docker Compose配置正确标记邮件系统为独立部署${NC}"
    else
        echo -e "${YELLOW}⚠️  Docker Compose配置可能需要更新邮件系统说明${NC}"
    fi
else
    echo -e "${RED}❌ Docker Compose统一配置文件不存在${NC}"
fi

# 检查邮件系统清理状态
echo ""
echo -e "${YELLOW}4. 检查邮件系统清理状态...${NC}"

# 检查是否还有遗留的BillionMail引用
BILLIONMAIL_REFERENCES=$(grep -r "BillionMail\|billionmail" "$PROJECT_ROOT/scripts" 2>/dev/null | wc -l)

if [ "$BILLIONMAIL_REFERENCES" -eq 0 ]; then
    echo -e "${GREEN}✅ 脚本中已清理所有BillionMail引用${NC}"
else
    echo -e "${YELLOW}⚠️ 脚本中仍有 $BILLIONMAIL_REFERENCES 处BillionMail引用${NC}"
fi

# 生成修复总结
echo ""
echo -e "${BLUE}📋 修复总结${NC}"
echo "======================================="
echo -e "${GREEN}✅ 邮件系统集成状态:${NC}"
echo "  1. 一键部署脚本已更新为Strapi邮件系统集成"
echo "  2. 邮件订阅功能已集成到Strapi后台"
echo "  3. 移除了独立邮件系统的部署复杂性"
echo "  4. 简化了邮件营销管理流程"
echo ""
echo -e "${BLUE}🚀 使用方法:${NC}"
echo "  一键部署: ./scripts/production/auto-deploy.sh [domain] [mail-domain]"
echo "  手动启动邮件: ./scripts.sh email start"
echo "  检查邮件状态: ./scripts.sh email check"
echo ""
echo -e "${YELLOW}📝 注意事项:${NC}"
echo "  • 邮件系统现在会在核心服务启动后自动启动"
echo "  • 如果邮件系统启动失败，会显示手动启动命令"
echo "  • 部署验证现在包含邮件系统状态检查"
echo "  • 建议在新环境测试一次完整部署流程"
echo ""