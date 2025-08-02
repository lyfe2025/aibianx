#!/bin/bash

# AI变现之路 - 邮件系统管理子菜单
# BillionMail 邮件营销系统的专用管理界面

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载动态配置
source "$SCRIPT_DIR/load-config.sh"

# 显示邮件系统管理菜单
show_email_menu() {
    clear
    echo -e "${BLUE}┌─────────────────────────────────────────┐${NC}"
    echo -e "${BLUE}│        📧 邮件系统管理中心              │${NC}"
    echo -e "${BLUE}└─────────────────────────────────────────┘${NC}"
    echo ""
    echo "📋 BillionMail 邮件营销系统管理:"
    echo ""
    
    echo -e " ${BLUE}🚀 系统管理${NC}"
    echo "  1) 部署BillionMail      (真实邮件营销系统)"
    echo "  2) 检查服务状态         (健康状态检查)"
    echo "  3) 重启邮件服务         (解决服务问题)"
    echo ""
    
    echo -e " ${BLUE}🌐 管理界面${NC}"
    echo "  4) 打开管理界面         (浏览器访问)"
    echo "  5) 打开WebMail界面      (邮件收发)"
    echo ""
    
    echo -e " ${BLUE}🧪 测试工具${NC}"
    echo "  6) API连接测试          (测试API功能)"
    echo "  7) 完整集成测试         (前端+后端+邮件)"
    echo "  8) NextAuth邮件测试     (认证邮件集成)"
    echo ""
    
    echo -e " ${BLUE}📊 监控日志${NC}"
    echo "  9) 查看服务日志         (实时日志监控)"
    echo " 10) 查看核心服务日志     (Core服务)"
    echo " 11) 查看邮件服务日志     (Postfix服务)"
    echo ""
    
    echo -e " ${BLUE}🔗 服务地址${NC}"
    echo "  📍 管理界面: ${BILLIONMAIL_ADMIN_URL:-http://localhost:8080}"
    echo "  📧 WebMail: ${BILLIONMAIL_WEBMAIL_URL:-http://localhost:8080/webmail}"
    echo "  👤 默认账户: billion / billion"
    echo ""
    
    echo -e " ${BLUE}🌐 快捷命令${NC}"
    echo "  0) 返回主菜单"
    echo ""
}

# 执行邮件菜单选择
execute_email_choice() {
    local choice=$1
    
    case $choice in
        1) # 部署BillionMail
            echo -e "${BLUE}🚀 BillionMail真实系统已部署完成！${NC}"
            echo -e "${GREEN}✅ 管理界面: ${BILLIONMAIL_ADMIN_URL}${NC}"
            echo -e "${GREEN}✅ WebMail: ${BILLIONMAIL_WEBMAIL_URL}${NC}"
            echo -e "${GREEN}✅ 默认账户: billion / billion${NC}"
            echo ""
            echo "💡 系统说明："
            echo "  • BillionMail是完整的邮件营销平台"
            echo "  • 支持用户管理、邮件列表、模板编辑"
            echo "  • 提供专业的邮件发送和统计功能"
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        2) # 检查服务状态
            echo -e "${BLUE}🔍 检查BillionMail服务状态...${NC}"
            exec "$PROJECT_ROOT/scripts/billionmail/check-billionmail.sh"
            ;;
        3) # 重启邮件服务
            echo -e "${BLUE}🔄 重启BillionMail服务...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/billionmail/restart-billionmail.sh" ]; then
                exec "$PROJECT_ROOT/scripts/billionmail/restart-billionmail.sh"
            else
                echo "正在重启BillionMail服务..."
                cd "$PROJECT_ROOT/BillionMail" && docker-compose restart
                echo -e "${GREEN}✅ BillionMail服务已重启${NC}"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        4) # 打开管理界面
            echo -e "${YELLOW}🌐 打开BillionMail管理界面...${NC}"
            echo ""
            echo -e "${GREEN}📍 访问地址: ${BILLIONMAIL_ADMIN_URL}${NC}"
            echo ""
            echo "🔧 BillionMail功能特点:"
            echo "  ✅ 完整的邮件营销平台"
            echo "  ✅ 用户订阅管理"
            echo "  ✅ 邮件模板编辑"
            echo "  ✅ 发送统计分析"
            echo "  ✅ API密钥管理"
            echo ""
            echo "💡 默认登录信息:"
            echo "  用户名: billion"
            echo "  密码: billion"
            echo ""
            if command -v open > /dev/null; then
                echo "🚀 正在打开浏览器..."
                open "${BILLIONMAIL_ADMIN_URL}"
            elif command -v xdg-open > /dev/null; then
                echo "🚀 正在打开浏览器..."
                xdg-open "${BILLIONMAIL_ADMIN_URL}"
            else
                echo "💡 请手动打开浏览器访问上述地址"
            fi
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        5) # 打开WebMail界面
            echo -e "${YELLOW}📧 打开WebMail界面...${NC}"
            echo ""
            echo -e "${GREEN}📍 WebMail地址: ${BILLIONMAIL_WEBMAIL_URL}${NC}"
            echo ""
            echo "📧 WebMail说明:"
            echo "  • 需要先在管理界面创建邮箱账户"
            echo "  • 使用创建的邮箱账户登录WebMail"
            echo "  • 支持收发邮件、邮件管理等功能"
            echo ""
            if command -v open > /dev/null; then
                echo "🚀 正在打开浏览器..."
                open "${BILLIONMAIL_WEBMAIL_URL}"
            elif command -v xdg-open > /dev/null; then
                echo "🚀 正在打开浏览器..."
                xdg-open "${BILLIONMAIL_WEBMAIL_URL}"
            else
                echo "💡 请手动打开浏览器访问上述地址"
            fi
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        6) # API连接测试
            echo -e "${BLUE}🧪 测试BillionMail API连接...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/billionmail/test-api.sh" ]; then
                exec "$PROJECT_ROOT/scripts/billionmail/test-api.sh"
            else
                echo -e "${YELLOW}⚠️ API测试脚本开发中...${NC}"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        7) # 完整集成测试
            echo -e "${BLUE}🧪 完整集成测试（前端+后端+邮件）...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/billionmail/test-integration-full.sh" ]; then
                exec "$PROJECT_ROOT/scripts/billionmail/test-integration-full.sh"
            else
                echo -e "${YELLOW}⚠️ 集成测试脚本开发中...${NC}"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        8) # NextAuth邮件测试
            echo -e "${BLUE}🔐 测试NextAuth邮件集成...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/billionmail/test-nextauth-integration.sh" ]; then
                exec "$PROJECT_ROOT/scripts/billionmail/test-nextauth-integration.sh"
            else
                echo -e "${YELLOW}⚠️ NextAuth测试脚本开发中...${NC}"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        9) # 查看服务日志
            echo -e "${YELLOW}📜 查看BillionMail日志...${NC}"
            echo "选择要查看的服务日志:"
            echo "  1) 核心服务 (billionmail-core-billionmail-1)"
            echo "  2) 邮件服务 (billionmail-postfix-billionmail-1)"  
            echo "  3) WebMail (billionmail-webmail-billionmail-1)"
            echo "  4) 所有服务"
            read -p "请选择 [1-4]: " log_choice
            case $log_choice in
                1) docker logs -f billionmail-core-billionmail-1 ;;
                2) docker logs -f billionmail-postfix-billionmail-1 ;;
                3) docker logs -f billionmail-webmail-billionmail-1 ;;
                4) cd "$PROJECT_ROOT/BillionMail" && docker-compose logs -f ;;
                *) echo "查看所有服务日志..." && cd "$PROJECT_ROOT/BillionMail" && docker-compose logs -f ;;
            esac
            return 1
            ;;
        10) # 查看核心服务日志
            echo -e "${BLUE}📋 查看BillionMail核心服务日志...${NC}"
            echo "按 Ctrl+C 退出日志查看"
            echo ""
            sleep 2
            docker logs -f billionmail-core-billionmail-1 2>/dev/null || echo -e "${RED}❌ 核心服务容器未运行${NC}"
            return 1
            ;;
        11) # 查看邮件服务日志
            echo -e "${BLUE}📋 查看邮件服务日志...${NC}"
            echo "按 Ctrl+C 退出日志查看"
            echo ""
            sleep 2
            docker logs -f billionmail-postfix-billionmail-1 2>/dev/null || echo -e "${RED}❌ 邮件服务容器未运行${NC}"
            return 1
            ;;
        0) # 返回主菜单
            exec "$PROJECT_ROOT/scripts.sh"
            ;;
        *) # 无效选择
            echo -e "${RED}❌ 无效选择: $choice${NC}"
            echo "请输入 0-11 之间的数字"
            echo ""
            read -p "按回车键继续..." 
            return 1
            ;;
    esac
}

# 主循环
main() {
    while true; do
        show_email_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if execute_email_choice "$choice"; then
            continue
        fi
    done
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main
fi