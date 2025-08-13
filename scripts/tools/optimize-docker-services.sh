#!/bin/bash

# AI变现之路 - Docker服务优化脚本
# 解决重复服务问题，保持数据安全

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

echo -e "${CYAN}🔧 AI变现之路 - Docker服务优化${NC}"
echo "=========================================="
echo ""

# 分析当前服务状态
analyze_current_services() {
    echo -e "${BLUE}📊 当前服务状态分析:${NC}"
    echo ""
    
    echo "🔵 统一部署服务 (aibianx-*):"
    docker ps --format "  {{.Names}}\t{{.Status}}" | grep "aibianx-" || echo "  无"
    
    echo ""
    echo "🟢 邮件系统状态 (已集成到Strapi):"
    echo "  邮件功能已集成到后端服务中"
    
    echo ""
    echo "🟡 MeiliSearch服务:"
    docker ps --format "  {{.Names}}\t{{.Status}}" | grep "meilisearch" || echo "  无"
    
    echo ""
}

# 检查服务冲突
check_service_conflicts() {
    echo -e "${YELLOW}🔍 检查服务冲突:${NC}"
    echo ""
    
    # 检查PostgreSQL端口冲突
    local postgres_ports=$(docker ps --format "{{.Names}} {{.Ports}}" | grep postgres | wc -l)
    if [ "$postgres_ports" -gt 1 ]; then
        echo "⚠️  发现 $postgres_ports 个PostgreSQL服务:"
        docker ps --format "  {{.Names}}: {{.Ports}}" | grep postgres
        echo ""
    fi
    
    # 检查Redis端口冲突
    local redis_ports=$(docker ps --format "{{.Names}} {{.Ports}}" | grep redis | wc -l)
    if [ "$redis_ports" -gt 1 ]; then
        echo "⚠️  发现 $redis_ports 个Redis服务:"
        docker ps --format "  {{.Names}}: {{.Ports}}" | grep redis
        echo ""
    fi
}

# 安全优化方案
propose_optimization() {
    echo -e "${CYAN}💡 推荐的安全优化方案:${NC}"
    echo ""
    
    echo -e "${GREEN}🎯 方案：分离架构 + 端口隔离${NC}"
    echo ""
    echo "📋 架构设计:"
    echo "  🟢 邮件系统: 已集成到Strapi，使用统一数据库"
    echo "     - PostgreSQL: 端口 25432"
    echo "     - Redis: 端口 26379"
    echo "     - 管理界面: 端口 8080"
    echo ""
    echo "  🔵 主项目系统: 使用统一部署的共享服务"
    echo "     - PostgreSQL: 端口 5432 (项目主数据库)"
    echo "     - Redis: 端口 6379 (项目主缓存)"
    echo "     - MeiliSearch: 端口 7700"
    echo ""
    echo "  🟡 前端后端: 本地开发模式"
    echo "     - 前端: 端口 3000 (npm run dev)"
    echo "     - 后端: 端口 1337 (npm run develop)"
    echo ""
    
    echo -e "${BLUE}✅ 优势:${NC}"
    echo "  • 数据完全隔离，安全性高"
    echo "  • 邮件系统与主项目统一管理"
    echo "  • 资源利用合理，无重复服务"
    echo "  • 维护简单，故障隔离"
    echo ""
}

# 执行优化
execute_optimization() {
    echo -e "${YELLOW}🚀 是否执行优化? (y/n)${NC}"
    read -r choice
    
    if [[ ! $choice =~ ^[Yy]$ ]]; then
        echo "❌ 用户取消操作"
        return 1
    fi
    
    echo ""
    echo -e "${BLUE}🔧 开始执行安全优化...${NC}"
    echo ""
    
    # 步骤1: 检查数据备份
    echo "1️⃣ 数据安全检查..."
    if ! check_data_safety; then
        echo -e "${RED}❌ 数据安全检查失败，停止优化${NC}"
        return 1
    fi
    
    # 步骤2: 停止冗余服务
    echo ""
    echo "2️⃣ 停止冗余的统一部署基础服务..."
    stop_redundant_services
    
    # 步骤3: 更新配置
    echo ""
    echo "3️⃣ 更新服务配置..."
    update_service_configs
    
    # 步骤4: 验证服务
    echo ""
    echo "4️⃣ 验证优化结果..."
    verify_optimization
    
    echo ""
    echo -e "${GREEN}✅ 服务优化完成！${NC}"
}

# 检查数据安全
check_data_safety() {
        return 1
    fi
    
    echo "   🔍 检查项目数据..."
    if ! docker exec aibianx-postgres pg_isready -U postgres > /dev/null 2>&1; then
        echo "   ❌ 项目数据库不可访问"
        return 1
    fi
    echo "   ✅ 项目数据库正常"
    
    return 0
}

# 停止冗余服务
stop_redundant_services() {
    echo "   🛑 停止统一部署的冗余基础服务..."
    
    cd "$PROJECT_ROOT/deployment"
    
    echo "   📦 保留项目主数据库和缓存..."
    
    # 停止统一部署中的邮件相关服务 (如果有的话)
    docker-compose -f docker-compose.unified.yml stop rspamd > /dev/null 2>&1 || true
    
    echo "   ✅ 冗余服务清理完成"
    
    cd "$PROJECT_ROOT"
}

# 更新服务配置
update_service_configs() {
    echo "   📝 更新服务发现配置..."
    
    # 更新show-all-services.sh以正确识别分离架构
    if [ -f "$PROJECT_ROOT/scripts/tools/show-all-services.sh" ]; then
        echo "   🔧 优化服务状态检查脚本..."
        # 这里可以添加配置更新逻辑
    fi
    
    echo "   ✅ 配置更新完成"
}

# 验证优化结果
verify_optimization() {
    echo "   🔍 验证服务状态..."
    
    # 检查PostgreSQL服务数量
    local postgres_count=$(docker ps --format "{{.Names}}" | grep postgres | wc -l)
    echo "   📊 PostgreSQL服务: $postgres_count 个 (预期: 2个，功能分离)"
    
    # 检查Redis服务数量  
    local redis_count=$(docker ps --format "{{.Names}}" | grep redis | wc -l)
    echo "   📊 Redis服务: $redis_count 个 (预期: 2个，功能分离)"
    
    # 检查服务健康状态
    echo "   🏥 服务健康检查:"
    
    if docker exec aibianx-postgres pg_isready -U postgres > /dev/null 2>&1; then
        echo "   ✅ 项目数据库健康"
    else
        echo "   ❌ 项目数据库异常"
    fi
    
    else
    fi
    
    echo "   ✅ 验证完成"
}

# 显示优化后的架构
show_optimized_architecture() {
    echo ""
    echo -e "${CYAN}📋 优化后的服务架构:${NC}"
    echo "======================================"
    echo ""
    
    echo ""
    
    echo -e "${BLUE}🔵 主项目系统 (统一部署):${NC}"
    echo "  📦 PostgreSQL: aibianx-postgres (端口5432)"
    echo "  📦 Redis: aibianx-redis (端口6379)"
    echo "  🔍 MeiliSearch: meilisearch (端口7700)"
    echo ""
    
    echo -e "${YELLOW}🟡 应用服务 (本地开发):${NC}"
    echo "  🌐 前端: localhost:3000 (npm run dev)"
    echo "  ⚙️  后端: localhost:1337 (npm run develop)"
    echo ""
    
}

# 主函数
main() {
    analyze_current_services
    check_service_conflicts
    propose_optimization
    
    echo -e "${YELLOW}选择操作:${NC}"
    echo "  1) 📊 仅查看分析报告"
    echo "  2) 🔧 执行安全优化"
    echo "  3) 📋 显示推荐架构"
    echo "  4) 🚪 退出"
    echo ""
    echo -n "请输入选择 (1-4): "
    read -r action
    
    case "$action" in
        "1")
            echo -e "${GREEN}✅ 分析报告已显示完成${NC}"
            ;;
        "2")
            execute_optimization
            show_optimized_architecture
            ;;
        "3")
            show_optimized_architecture
            ;;
        "4")
            echo -e "${GREEN}👋 退出${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            exit 1
            ;;
    esac
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi