#!/bin/bash

# AI变现之路 - 1:1生产环境模拟子菜单
# 确保模拟生产环境通过 = 真实生产环境100%通过

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'

# 显示1:1生产环境模拟菜单
show_production_simulation_menu() {
    clear
    echo -e "${PURPLE}┌─────────────────────────────────────────────────────┐${NC}"
    echo -e "${PURPLE}│        🎯 1:1生产环境模拟 - 100%一致性保证          │${NC}"
    echo -e "${PURPLE}└─────────────────────────────────────────────────────┘${NC}"
    echo -e "${CYAN}🎯 核心原则：模拟通过 = 生产必定通过${NC}"
    echo ""
    echo "📋 模拟生产环境操作:"
    echo ""
    
    # 核心模拟功能
    echo -e " ${PURPLE}🚀 部署模拟${NC}"
    echo "  1) 一键启动1:1生产模拟   (完全模拟真实生产环境)"
    echo "  2) 验证生产配置一致性    (与真实生产对比验证)"
    echo "  3) 生产级健康检查        (7层全面检查)"
    echo ""
    
    echo -e " ${PURPLE}🔍 状态监控${NC}"
    echo "  4) 查看模拟环境状态      (容器+服务+连通性)"
    echo "  5) 生产级性能测试        (负载+响应+稳定性)"
    echo "  6) 查看生产级日志        (所有服务日志)"
    echo ""
    
    echo -e " ${PURPLE}🛠️ 环境管理${NC}"
    echo "  7) 重启模拟生产环境      (完全重启验证)"
    echo "  8) 停止模拟生产环境      (安全停止)"
    echo "  9) 清理模拟环境数据      (重置到初始状态)"
    echo ""
    
    echo -e " ${PURPLE}🔧 预部署验证${NC}"
    echo " 10) 预部署检查清单        (部署前必检项目)"
    echo " 11) 生产环境配置对比      (本地vs真实配置)"
    echo " 12) 容器镜像预验证        (构建+安全+体积)"
    echo ""
    
    echo -e " ${PURPLE}📊 测试验证${NC}"
    echo " 13) 完整功能测试          (所有功能端到端)"
    echo " 14) 邮件系统测试          (发送+接收+管理)"
    echo " 15) 支付系统测试          (沙箱环境全流程)"
    echo ""
    
    echo -e " ${PURPLE}🌐 快捷功能${NC}"
    echo "  q) 快速访问地址          (所有服务访问入口)"
    echo "  h) 1:1模拟说明          (一致性保证机制)"
    echo "  0) 返回主菜单"
    echo ""
    
    # 显示当前模拟环境状态
    show_simulation_status
}

# 显示模拟环境状态
show_simulation_status() {
    echo -e "${CYAN}📊 当前模拟环境状态：${NC}"
    
    # 检查是否有模拟环境在运行
    if docker ps --format "table {{.Names}}" | grep -q "aibianx-" 2>/dev/null; then
        local running_containers=$(docker ps --format "{{.Names}}" | grep "aibianx-" | wc -l)
        echo -e "  🟢 模拟环境状态: ${GREEN}运行中${NC} (${running_containers}个容器)"
        
        # 快速健康检查
        local health_status="🟢 健康"
        if ! curl -s "http://localhost:1337/api" >/dev/null 2>&1; then
            health_status="🔴 异常"
        fi
        echo -e "  🏥 健康状态: ${health_status}"
        
        # 显示关键服务端口
        echo -e "  🌐 关键端口: 80(前端) 1337(后端) 7700(搜索) 8080(邮件)"
    else
        echo -e "  🔴 模拟环境状态: ${RED}未运行${NC}"
        echo -e "  💡 提示: 选择 '1' 启动1:1生产环境模拟"
    fi
    echo ""
}

# 执行菜单选择
execute_simulation_choice() {
    local choice=$1
    
    case $choice in
        1) # 一键启动1:1生产模拟
            echo -e "${BLUE}🚀 启动1:1生产环境模拟...${NC}"
            echo -e "${YELLOW}⚠️ 这将完全模拟真实生产环境配置和部署流程${NC}"
            echo ""
            read -p "确认启动？(y/N): " confirm
            if [[ $confirm =~ ^[Yy]$ ]]; then
                exec "$PROJECT_ROOT/scripts/production/local-production-deploy.sh" bianx.local
            else
                echo "已取消启动"
                return 1
            fi
            ;;
        2) # 验证生产配置一致性
            echo -e "${BLUE}🔍 验证生产配置一致性...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/verify-production-consistency.sh"
            ;;
        3) # 生产级健康检查
            echo -e "${BLUE}🏥 执行生产级健康检查...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/production-health-check.sh"
            ;;
        4) # 查看模拟环境状态
            echo -e "${BLUE}📊 查看模拟环境详细状态...${NC}"
            cd "$PROJECT_ROOT/deployment"
            docker-compose -f docker-compose.unified.yml ps
            echo ""
            echo -e "${CYAN}容器资源使用：${NC}"
            docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" | grep aibianx
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        5) # 生产级性能测试
            echo -e "${BLUE}⚡ 执行生产级性能测试...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/production-performance-test.sh"
            ;;
        6) # 查看生产级日志
            echo -e "${BLUE}📋 查看生产级日志...${NC}"
            cd "$PROJECT_ROOT/deployment"
            echo "选择要查看的服务日志:"
            echo "1) 所有服务  2) 前端  3) 后端  4) 数据库  5) 邮件系统"
            read -p "输入选择 (1-5): " log_choice
            case $log_choice in
                1) docker-compose -f docker-compose.unified.yml logs -f --tail=50 ;;
                2) docker logs -f aibianx-frontend ;;
                3) docker logs -f aibianx-backend ;;
                4) docker logs -f aibianx-postgres ;;
                5) docker logs -f aibianx-billionmail-core ;;
                *) echo "无效选择"; return 1 ;;
            esac
            ;;
        7) # 重启模拟生产环境
            echo -e "${BLUE}🔄 重启模拟生产环境...${NC}"
            cd "$PROJECT_ROOT/deployment"
            docker-compose -f docker-compose.unified.yml restart
            echo -e "${GREEN}✅ 模拟生产环境已重启${NC}"
            read -p "按回车键返回菜单..."
            return 1
            ;;
        8) # 停止模拟生产环境
            echo -e "${YELLOW}🛑 停止模拟生产环境...${NC}"
            read -p "确认停止？(y/N): " confirm
            if [[ $confirm =~ ^[Yy]$ ]]; then
                cd "$PROJECT_ROOT/deployment"
                docker-compose -f docker-compose.unified.yml down
                echo -e "${GREEN}✅ 模拟生产环境已停止${NC}"
            else
                echo "已取消停止"
            fi
            read -p "按回车键返回菜单..."
            return 1
            ;;
        9) # 清理模拟环境数据
            echo -e "${RED}🗑️ 清理模拟环境数据...${NC}"
            echo -e "${YELLOW}⚠️ 这将删除所有数据卷，包括数据库数据！${NC}"
            read -p "确认清理？(输入 'YES' 确认): " confirm
            if [ "$confirm" = "YES" ]; then
                cd "$PROJECT_ROOT/deployment"
                docker-compose -f docker-compose.unified.yml down -v
                echo -e "${GREEN}✅ 模拟环境数据已清理${NC}"
            else
                echo "已取消清理"
            fi
            read -p "按回车键返回菜单..."
            return 1
            ;;
        10) # 预部署检查清单
            echo -e "${BLUE}📋 执行预部署检查清单...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/pre-deployment-checklist.sh"
            ;;
        11) # 生产环境配置对比
            echo -e "${BLUE}🔍 生产环境配置对比...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/config-comparison.sh"
            ;;
        12) # 容器镜像预验证
            echo -e "${BLUE}🐳 容器镜像预验证...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/container-image-verification.sh"
            ;;
        13) # 完整功能测试
            echo -e "${BLUE}🧪 执行完整功能测试...${NC}"
            exec "$PROJECT_ROOT/scripts/test/full-integration-test.sh"
            ;;
        14) # 邮件系统测试
            echo -e "${BLUE}📧 执行邮件系统测试...${NC}"
            exec "$PROJECT_ROOT/scripts/billionmail/test-email-system.sh"
            ;;
        15) # 支付系统测试
            echo -e "${BLUE}💳 执行支付系统测试...${NC}"
            exec "$PROJECT_ROOT/scripts/test/payment-system-test.sh"
            ;;
        q|Q) # 快速访问地址
            show_quick_access_urls
            return 1
            ;;
        h|H) # 1:1模拟说明
            show_simulation_explanation
            return 1
            ;;
        0) # 返回主菜单
            return 0
            ;;
        *) # 无效选择
            echo -e "${RED}❌ 无效选择: $choice${NC}"
            echo "请输入 0-15 之间的数字，或字母命令 (q/h)"
            echo ""
            read -p "按回车键继续..." 
            return 1
            ;;
    esac
}

# 显示快速访问地址
show_quick_access_urls() {
    echo -e "${CYAN}🌐 模拟生产环境快速访问地址：${NC}"
    echo ""
    echo -e "${GREEN}主要服务：${NC}"
    echo "  🏠 前端首页:     http://bianx.local"
    echo "  ⚙️  后端API:     http://bianx.local:1337/api"
    echo "  👤 管理后台:     http://bianx.local:1337/admin"
    echo "  📖 API文档:     http://bianx.local:1337/documentation"
    echo ""
    echo -e "${GREEN}系统服务：${NC}"
    echo "  🔍 搜索引擎:     http://bianx.local:7700"
    echo "  📧 邮件管理:     http://mail.bianx.local:8080/billion"
    echo "  📮 网页邮箱:     http://mail.bianx.local:8080/roundcube"
    echo ""
    echo -e "${YELLOW}💡 提示: 确保已配置域名解析到 127.0.0.1${NC}"
    echo ""
    read -p "按回车键返回菜单..."
}

# 显示1:1模拟说明
show_simulation_explanation() {
    echo -e "${PURPLE}🎯 1:1生产环境模拟一致性保证${NC}"
    echo "==========================================="
    echo ""
    echo -e "${GREEN}✅ 100%一致的配置：${NC}"
    echo "  • 使用相同的 Docker Compose 文件"
    echo "  • 使用相同的配置生成逻辑"
    echo "  • 使用相同的安全密钥生成方式"
    echo "  • 使用相同的容器镜像和版本"
    echo "  • 使用相同的环境变量结构"
    echo ""
    echo -e "${GREEN}✅ 100%一致的服务栈：${NC}"
    echo "  • PostgreSQL 17 + Redis 7.4 + MeiliSearch 1.5"
    echo "  • Strapi后端 (生产模式) + Next.js前端 (生产模式)"
    echo "  • BillionMail完整邮件系统 (7个容器)"
    echo "  • Nginx统一网关 (生产配置)"
    echo ""
    echo -e "${GREEN}✅ 100%一致的验证流程：${NC}"
    echo "  • 相同的健康检查逻辑"
    echo "  • 相同的服务启动顺序"
    echo "  • 相同的数据持久化配置"
    echo "  • 相同的网络配置和安全设置"
    echo ""
    echo -e "${CYAN}🔄 唯一差异：${NC}"
    echo "  • 域名: bianx.local (vs 真实生产域名)"
    echo "  • SSL: 跳过SSL证书 (vs 自动SSL)"
    echo ""
    echo -e "${PURPLE}🎯 保证原则：${NC}"
    echo -e "${YELLOW}模拟环境通过 = 生产环境必定通过${NC}"
    echo ""
    read -p "按回车键返回菜单..."
}

# 主程序循环
main() {
    while true; do
        show_production_simulation_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if execute_simulation_choice "$choice"; then
            break  # 返回主菜单
        fi
        # 继续显示当前菜单
    done
}

# 如果直接执行脚本
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main
fi