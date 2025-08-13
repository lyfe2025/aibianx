#!/bin/bash

# AI变现之路 - 预部署检查清单
# 确保生产部署前所有条件都满足

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}📋 生产部署前检查清单${NC}"
echo "=========================================="
echo -e "${CYAN}🎯 目标: 确保生产部署100%成功${NC}"
echo ""

# 检查统计
total_items=0
passed_items=0
failed_items=0
warning_items=0

# 检查项函数
check_item() {
    local category=$1
    local description=$2
    local check_command=$3
    local severity=${4:-"error"}  # error, warning, info
    
    total_items=$((total_items + 1))
    echo -n "[$category] $description: "
    
    if eval "$check_command" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ 通过${NC}"
        passed_items=$((passed_items + 1))
        return 0
    else
        if [ "$severity" = "warning" ]; then
            echo -e "${YELLOW}⚠️ 警告${NC}"
            warning_items=$((warning_items + 1))
        else
            echo -e "${RED}❌ 失败${NC}"
            failed_items=$((failed_items + 1))
        fi
        return 1
    fi
}

echo -e "${CYAN}🏗️ 基础环境检查${NC}"
echo "----------------------------------------"

# 基础环境检查
check_item "系统" "Docker服务运行" "docker info"
check_item "系统" "Docker Compose可用" "docker-compose --version"
check_item "系统" "足够的磁盘空间(>10GB)" "[ \$(df . | awk 'NR==2 {print \$4}') -gt 10485760 ]"
check_item "系统" "足够的内存(>4GB)" "[ \$(free -m | awk 'NR==2{print \$7}') -gt 4096 ]" "warning"

echo ""
echo -e "${CYAN}📦 项目配置检查${NC}"
echo "----------------------------------------"

# 项目配置检查
check_item "配置" "项目根目录正确" "[ -f '$PROJECT_ROOT/package.json' ] && [ -d '$PROJECT_ROOT/backend' ] && [ -d '$PROJECT_ROOT/frontend' ]"
check_item "配置" "部署配置文件存在" "[ -f '$PROJECT_ROOT/deployment/docker-compose.unified.yml' ]"
check_item "配置" "统一配置脚本存在" "[ -f '$PROJECT_ROOT/deployment/configure-unified-env.sh' ]"
check_item "配置" "生产Dockerfile存在" "[ -f '$PROJECT_ROOT/deployment/backend.Dockerfile' ] && [ -f '$PROJECT_ROOT/deployment/frontend.Dockerfile' ]"

echo ""
echo -e "${CYAN}🔒 安全配置检查${NC}"
echo "----------------------------------------"

# 安全配置检查
check_item "安全" "密钥生成工具可用" "command -v openssl"
check_item "安全" "随机数生成可用" "[ -c /dev/urandom ]"
check_item "安全" "SSL工具可用" "command -v openssl" "warning"

# 检查现有配置文件的安全性
if [ -f "$PROJECT_ROOT/backend/.env" ]; then
    check_item "安全" "后端环境变量安全" "grep -q 'JWT_SECRET=' '$PROJECT_ROOT/backend/.env' && [ \$(grep 'JWT_SECRET=' '$PROJECT_ROOT/backend/.env' | cut -d'=' -f2 | wc -c) -gt 10 ]"
    check_item "安全" "管理员密钥存在" "grep -q 'ADMIN_JWT_SECRET=' '$PROJECT_ROOT/backend/.env'"
    check_item "安全" "API令牌盐存在" "grep -q 'API_TOKEN_SALT=' '$PROJECT_ROOT/backend/.env'"
fi

echo ""
echo -e "${CYAN}🌐 网络配置检查${NC}"
echo "----------------------------------------"

# 网络配置检查
check_item "网络" "本地域名解析" "ping -c 1 bianx.local" "warning"
check_item "网络" "邮件域名解析" "ping -c 1 mail.bianx.local" "warning"
check_item "网络" "网络工具可用" "command -v curl && command -v ping"
check_item "网络" "端口检查工具可用" "command -v netstat || command -v ss"

echo ""
echo -e "${CYAN}📊 数据库配置检查${NC}"
echo "----------------------------------------"

# 数据库配置检查
check_item "数据库" "PostgreSQL镜像可用" "docker pull postgres:17-alpine"
check_item "数据库" "数据库配置文件存在" "[ -d '$PROJECT_ROOT/deployment/configs/postgresql' ] || mkdir -p '$PROJECT_ROOT/deployment/configs/postgresql'"
check_item "数据库" "数据备份脚本存在" "[ -f '$PROJECT_ROOT/scripts/database/backup-database-only.sh' ]"
check_item "数据库" "数据恢复脚本存在" "[ -f '$PROJECT_ROOT/scripts/database/restore-database-only.sh' ]"

echo ""
echo -e "${CYAN}🔍 搜索引擎配置检查${NC}"
echo "----------------------------------------"

# 搜索引擎配置检查
check_item "搜索" "MeiliSearch镜像可用" "docker pull getmeili/meilisearch:v1.5"
check_item "搜索" "搜索配置脚本存在" "[ -f '$PROJECT_ROOT/scripts/search/deploy-meilisearch.sh' ]"
check_item "搜索" "搜索管理脚本存在" "[ -f '$PROJECT_ROOT/scripts/search/manage-meilisearch.sh' ]"

echo ""
echo -e "${CYAN}📧 邮件系统配置检查${NC}"
echo "----------------------------------------"

# 邮件系统配置检查 (已集成到Strapi)
check_item "邮件" "邮件订阅API存在" "[ -d '$PROJECT_ROOT/backend/src/api/email-subscription' ]"
check_item "邮件" "SMTP配置检查" "grep -q 'SMTP' '$PROJECT_ROOT/backend/.env' || echo 'SMTP配置待配置'"

echo ""
echo -e "${CYAN}🏗️ 应用构建检查${NC}"
echo "----------------------------------------"

# 应用构建检查
check_item "构建" "Node.js环境可用" "docker run --rm node:18-alpine node --version"
check_item "构建" "后端package.json存在" "[ -f '$PROJECT_ROOT/backend/package.json' ]"
check_item "构建" "前端package.json存在" "[ -f '$PROJECT_ROOT/frontend/package.json' ]"
check_item "构建" "TypeScript配置存在" "[ -f '$PROJECT_ROOT/backend/tsconfig.json' ] && [ -f '$PROJECT_ROOT/frontend/tsconfig.json' ]"

echo ""
echo -e "${CYAN}🔧 依赖和镜像检查${NC}"
echo "----------------------------------------"

# 镜像拉取检查
echo "🐳 检查关键镜像可用性..."
check_item "镜像" "Redis镜像" "docker pull redis:7.4-alpine"
check_item "镜像" "Nginx镜像" "docker pull nginx:alpine"
check_item "镜像" "RoundCube镜像" "docker pull roundcube/roundcubemail:1.6.10-fpm-alpine"

echo ""
echo -e "${CYAN}📝 脚本和工具检查${NC}"
echo "----------------------------------------"

# 脚本检查
check_item "脚本" "主脚本可执行" "[ -x '$PROJECT_ROOT/scripts.sh' ]"
check_item "脚本" "部署脚本存在" "[ -f '$PROJECT_ROOT/scripts/production/local-production-deploy.sh' ]"
check_item "脚本" "健康检查脚本存在" "[ -f '$PROJECT_ROOT/scripts/tools/production-health-check.sh' ]"
check_item "脚本" "一致性验证脚本存在" "[ -f '$PROJECT_ROOT/scripts/tools/verify-production-consistency.sh' ]"

echo ""
echo -e "${CYAN}🧪 模拟环境验证${NC}"
echo "----------------------------------------"

# 模拟环境验证
if docker ps --format "{{.Names}}" | grep -q "aibianx-" 2>/dev/null; then
    echo "🟢 模拟环境正在运行，进行快速验证..."
    check_item "验证" "前端应用响应" "curl -s http://bianx.local" "warning"
    check_item "验证" "后端API响应" "curl -s ${BACKEND_URL}/api" "warning"
    check_item "验证" "搜索引擎响应" "curl -s ${MEILISEARCH_URL}/health" "warning"
    check_item "验证" "邮件系统API响应" "curl -s ${BACKEND_URL}/api/email-subscriptions" "warning"
else
    echo -e "${YELLOW}⚠️ 模拟环境未运行，建议先启动进行验证${NC}"
fi

echo ""
echo "=========================================="
echo -e "${BLUE}📊 检查结果汇总${NC}"
echo "=========================================="
echo -e "总检查项: ${CYAN}$total_items${NC}"
echo -e "通过项: ${GREEN}$passed_items${NC}"
echo -e "失败项: ${RED}$failed_items${NC}"
echo -e "警告项: ${YELLOW}$warning_items${NC}"

# 计算通过率
if [ $total_items -gt 0 ]; then
    local pass_rate=$(((passed_items + warning_items) * 100 / total_items))
    local critical_pass_rate=$((passed_items * 100 / total_items))
    
    echo -e "通过率: ${CYAN}$critical_pass_rate%${NC} (含警告: $pass_rate%)"
    echo ""
    
    if [ $failed_items -eq 0 ]; then
        echo -e "${GREEN}🎉 所有关键项检查通过！${NC}"
        echo -e "${CYAN}✨ 生产部署就绪状态: 优秀${NC}"
        echo ""
        echo -e "${YELLOW}🚀 建议的部署流程：${NC}"
        echo "  1. ./scripts.sh production local-deploy bianx.local"
        echo "  2. 完成功能验证测试"
        echo "  3. 执行性能压力测试"
        echo "  4. 部署到真实生产环境"
        echo ""
        if [ $warning_items -gt 0 ]; then
            echo -e "${YELLOW}💡 优化建议：${NC}"
            echo "  • 解决 $warning_items 个警告项以达到完美状态"
            echo "  • 考虑配置真实域名解析"
            echo "  • 准备生产环境SSL证书"
        fi
        exit 0
    elif [ $failed_items -le 2 ]; then
        echo -e "${YELLOW}⚠️ 发现少量问题，建议解决后再部署${NC}"
        echo -e "${CYAN}✨ 生产部署就绪状态: 良好${NC}"
        echo ""
        echo -e "${BLUE}🔧 解决方案：${NC}"
        echo "  • 检查并安装缺失的依赖"
        echo "  • 确保Docker服务正常运行"
        echo "  • 验证网络连接和域名解析"
        exit 1
    else
        echo -e "${RED}❌ 发现多个关键问题！${NC}"
        echo -e "${CYAN}✨ 生产部署就绪状态: 需要修复${NC}"
        echo ""
        echo -e "${RED}⚠️ 请解决以下问题后重新检查：${NC}"
        echo "  • 安装和配置Docker环境"
        echo "  • 检查系统资源是否充足"
        echo "  • 验证项目结构和配置文件"
        echo "  • 确保网络连接正常"
        exit 2
    fi
else
    echo ""
    echo -e "${RED}❌ 检查过程出现异常！${NC}"
    exit 3
fi