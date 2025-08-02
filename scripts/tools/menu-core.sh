#!/bin/bash

# AI变现之路 - 核心菜单管理
# 处理最常用的核心功能，精简主菜单

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

# 显示精简核心菜单
show_core_menu() {
    local env_info=$(detect_current_environment 2>/dev/null || echo "development:unknown:local")
    local env_type="${env_info%%:*}"
    local env_status="${env_info#*:}"
    env_status="${env_status%%:*}"
    
    # 环境适配颜色和标题
    local theme_color="$BLUE"
    local env_name="开发环境"
    local env_icon="🔧"
    
    if [ "$env_type" = "production" ]; then
        theme_color="$RED"
        env_name="生产环境"
        env_icon="🚀"
    fi
    
    clear
    echo -e "${theme_color}┌─────────────────────────────────────────┐${NC}"
    echo -e "${theme_color}│        🚀 AI变现之路 - $env_name          │${NC}"
    echo -e "${theme_color}└─────────────────────────────────────────┘${NC}"
    echo "📍 当前环境: $env_icon $env_name | 状态: $(date +%Y%m%d)"
    echo ""
    echo "📋 核心操作 (输入序号):"
    echo ""
    
    # 核心功能（最常用的8个）
    echo -e " ${theme_color}🚀 快速启动${NC}"
    echo "  1) 启动完整环境         (一键启动全部服务)"
    echo "  2) 停止所有服务         (安全停止)"
    echo "  3) 重启环境            (停止+启动)"
    echo ""
    
    echo -e " ${theme_color}📊 状态检查${NC}"
    echo "  4) 查看系统状态         (全面检查)"
    echo "  5) 预提交检查          (代码质量+硬编码)"
    echo ""
    
    echo -e " ${theme_color}🛠️ 开发工具${NC}"
    echo "  6) 搜索引擎管理         (MeiliSearch)"
    echo "  7) 邮件系统管理         (BillionMail)"
    echo "  8) 数据库管理          (备份+恢复)"
    echo ""
    
    # 高级功能入口
    echo -e " ${theme_color}🔧 高级功能${NC}"
    echo "  9) 更多开发工具...      (字段配置+环境管理)"
    echo " 10) 环境管理...         (切换+配置+故障排查)"
    echo " 11) 生产部署...         (生产环境专用功能)"
    echo ""
    
    # 字母命令（保留最重要的）
    echo -e " ${theme_color}🌐 快捷命令${NC}"
    echo "  q) 硬编码检查          (开发质量保证)"
    echo "  h) 帮助信息           (查看所有命令)"
    echo "  0) 退出"
    echo ""
}

# 执行核心菜单选择
execute_core_choice() {
    local choice=$1
    local env_info=$(detect_current_environment 2>/dev/null || echo "development:unknown:local")
    local env_type="${env_info%%:*}"
    
    case $choice in
        1) # 启动完整环境
            if [ "$env_type" = "production" ]; then
                exec "$PROJECT_ROOT/scripts/production/auto-deploy.sh"
            else
                exec "$PROJECT_ROOT/scripts/deployment/start-dev.sh"
            fi
            ;;
        2) # 停止所有服务
            if [ "$env_type" = "production" ]; then
                exec "$PROJECT_ROOT/scripts/production/manage-services.sh" stop
            else
                exec "$PROJECT_ROOT/scripts/deployment/stop-dev.sh"
            fi
            ;;
        3) # 重启环境
            echo -e "${BLUE}🔄 重启环境...${NC}"
            if [ "$env_type" = "production" ]; then
                exec "$PROJECT_ROOT/scripts/production/manage-services.sh" restart
            else
                "$PROJECT_ROOT/scripts/deployment/stop-dev.sh" && exec "$PROJECT_ROOT/scripts/deployment/start-dev.sh"
            fi
            ;;
        4) # 查看系统状态
            exec "$PROJECT_ROOT/scripts/tools/status.sh"
            ;;
        5) # 预提交检查
            exec "$PROJECT_ROOT/scripts/tools/pre-commit-check.sh"
            ;;
        6) # 搜索引擎管理
            exec "$PROJECT_ROOT/scripts/tools/submenu-search.sh"
            ;;
        7) # 邮件系统管理
            exec "$PROJECT_ROOT/scripts/tools/submenu-email.sh"
            ;;
        8) # 数据库管理
            exec "$PROJECT_ROOT/scripts/tools/submenu-database.sh"
            ;;
        9) # 更多开发工具
            exec "$PROJECT_ROOT/scripts/tools/submenu-dev-tools.sh"
            ;;
        10) # 环境管理
            exec "$PROJECT_ROOT/scripts/tools/submenu-environment.sh"
            ;;
        11) # 生产部署
            if [ "$env_type" = "production" ]; then
                exec "$PROJECT_ROOT/scripts/tools/submenu-production.sh"
            else
                echo -e "${YELLOW}⚠️ 当前为开发环境，生产功能已禁用${NC}"
                echo "请使用 'e' 切换到生产环境"
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            fi
            ;;
        q|Q) # 硬编码检查
            exec "$PROJECT_ROOT/scripts/tools/check-hardcode.sh"
            ;;
        h|H) # 帮助信息
            exec "$PROJECT_ROOT/scripts/tools/show-help.sh"
            ;;
        0) # 退出
            echo -e "${GREEN}👋 再见！${NC}"
            exit 0
            ;;
        *) # 无效选择
            echo -e "${RED}❌ 无效选择: $choice${NC}"
            echo "请输入 0-11 之间的数字，或字母命令 (q/h)"
            echo ""
            read -p "按回车键继续..." 
            return 1
            ;;
    esac
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    show_core_menu
    echo -n -e "${YELLOW}请输入选择: ${NC}"
    read -r choice
    execute_core_choice "$choice"
fi