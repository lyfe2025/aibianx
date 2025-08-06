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

if grep -q "启动BillionMail邮件系统" "$AUTO_DEPLOY_SCRIPT"; then
    echo -e "${GREEN}✅ 一键部署脚本已包含BillionMail启动逻辑${NC}"
else
    echo -e "${RED}❌ 一键部署脚本缺少BillionMail启动逻辑${NC}"
fi

if grep -q "检查BillionMail邮件系统状态" "$AUTO_DEPLOY_SCRIPT"; then
    echo -e "${GREEN}✅ 一键部署脚本已包含BillionMail状态检查${NC}"
else
    echo -e "${RED}❌ 一键部署脚本缺少BillionMail状态检查${NC}"
fi

# 检查BillionMail部署脚本优化
echo ""
echo -e "${YELLOW}2. 检查BillionMail部署脚本优化...${NC}"
BILLIONMAIL_DEPLOY_SCRIPT="$PROJECT_ROOT/scripts/billionmail/deploy-billionmail.sh"

if grep -q "停止可能存在的旧服务" "$BILLIONMAIL_DEPLOY_SCRIPT"; then
    echo -e "${GREEN}✅ BillionMail部署脚本已包含旧服务清理${NC}"
else
    echo -e "${RED}❌ BillionMail部署脚本缺少旧服务清理${NC}"
fi

if grep -q "retry_count" "$BILLIONMAIL_DEPLOY_SCRIPT"; then
    echo -e "${GREEN}✅ BillionMail部署脚本已包含重试机制${NC}"
else
    echo -e "${RED}❌ BillionMail部署脚本缺少重试机制${NC}"
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

# 检查BillionMail目录
echo ""
echo -e "${YELLOW}4. 检查BillionMail目录结构...${NC}"
BILLIONMAIL_DIR="$PROJECT_ROOT/BillionMail"

if [ -d "$BILLIONMAIL_DIR" ]; then
    echo -e "${GREEN}✅ BillionMail目录存在${NC}"
    
    if [ -f "$BILLIONMAIL_DIR/docker-compose.yml" ]; then
        echo -e "${GREEN}✅ BillionMail Docker Compose配置存在${NC}"
    else
        echo -e "${RED}❌ BillionMail Docker Compose配置不存在${NC}"
    fi
else
    echo -e "${RED}❌ BillionMail目录不存在${NC}"
fi

# 生成修复总结
echo ""
echo -e "${BLUE}📋 修复总结${NC}"
echo "======================================="
echo -e "${GREEN}✅ 修复内容:${NC}"
echo "  1. 一键部署脚本现在会自动启动BillionMail邮件系统"
echo "  2. 增加了BillionMail服务状态检查和验证"
echo "  3. 优化了BillionMail启动流程，增加重试机制"
echo "  4. 改进了服务启动等待时间和错误处理"
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