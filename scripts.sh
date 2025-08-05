#!/bin/bash

# AI变现之路 - 极简脚本管理工具
# 基于 deployment/config/deploy.conf 统一配置的简化版本

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# 显示主菜单
show_menu() {
    echo -e "${CYAN}🚀 AI变现之路 - 极简管理工具${NC}"
    echo "=================================="
    echo ""
    echo -e "${BLUE}📋 核心功能:${NC}"
    echo "  1) 🔧 极简一键配置"
    echo "  2) 🚀 启动完整环境"
    echo "  3) 🛑 停止所有服务"
    echo "  4) 📦 备份管理"
    echo "  5) 🔍 系统状态"
    echo ""
    echo -e "${BLUE}🛠️ 开发工具:${NC}"
    echo "  6) 📊 代码质量检查"
    echo "  7) 🔍 搜索引擎管理"
    echo "  8) 📧 邮件系统管理"
    echo ""
    echo -e "${BLUE}📚 帮助和支持:${NC}"
    echo "  h) 📖 显示详细帮助"
    echo "  q) 🚪 退出"
    echo ""
}

# 显示详细帮助
show_help() {
    echo -e "${CYAN}🚀 AI变现之路 - 详细帮助${NC}"
    echo "========================================"
    echo ""
    echo -e "${BLUE}📋 使用方法:${NC}"
    echo "  交互模式: ./scripts.sh"
    echo "  命令模式: ./scripts.sh <类别> <操作>"
    echo ""
    echo -e "${BLUE}🔧 核心命令:${NC}"
    echo "  ./scripts.sh deploy config    # 极简一键配置"
    echo "  ./scripts.sh deploy start     # 启动完整环境"
    echo "  ./scripts.sh deploy stop      # 停止所有服务"
    echo "  ./scripts.sh backup list      # 查看可用备份"
    echo "  ./scripts.sh tools status     # 系统状态检查"
    echo ""
    echo -e "${BLUE}🗄️ 配置管理:${NC}"
    echo "  📁 配置文件: deployment/config/deploy.conf"
    echo "  📦 备份目录: backups/"
    echo "  🔄 备份版本: latest 或 YYYYMMDD_HHMMSS"
    echo ""
    echo -e "${BLUE}🌐 访问地址:${NC}"
    echo "  🌐 前端网站: http://localhost"
    echo "  ⚙️  后端管理: http://localhost:1337/admin"
    echo "  🔍 搜索管理: http://localhost:7700"
    echo "  📧 邮件管理: http://localhost:8080"
    echo ""
}

# 执行菜单选择
execute_choice() {
    local choice=$1
    
    case "$choice" in
        "1")
            echo -e "${BLUE}🔧 执行极简一键配置...${NC}"
            exec "$SCRIPT_DIR/scripts/tools/simple-deploy.sh"
            ;;
        "2")
            echo -e "${BLUE}🚀 启动完整环境...${NC}"
            exec "$SCRIPT_DIR/scripts/deployment/start-dev.sh"
            ;;
        "3")
            echo -e "${BLUE}🛑 停止所有服务...${NC}"
            exec "$SCRIPT_DIR/scripts/deployment/stop-dev.sh"
            ;;
        "4")
            backup_menu
            ;;
        "5")
            echo -e "${BLUE}📊 检查系统状态...${NC}"
            exec "$SCRIPT_DIR/scripts/tools/status.sh"
            ;;
        "6")
            echo -e "${BLUE}📊 执行代码质量检查...${NC}"
            exec "$SCRIPT_DIR/scripts/tools/pre-commit-check.sh"
            ;;
        "7")
            echo -e "${BLUE}🔍 打开搜索引擎管理...${NC}"
            exec "$SCRIPT_DIR/scripts/search/manage-meilisearch.sh"
            ;;
        "8")
            echo -e "${BLUE}📧 检查邮件系统...${NC}"
            exec "$SCRIPT_DIR/scripts/billionmail/check-billionmail.sh"
            ;;
        "h"|"H")
            show_help
            echo ""
            echo -n -e "${YELLOW}按回车键继续...${NC}"
            read
            return 1
            ;;
        "q"|"Q"|"exit"|"quit")
            echo -e "${GREEN}👋 再见！${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ 无效选择: $choice${NC}"
            return 1
            ;;
    esac
}

# 备份管理菜单
backup_menu() {
    echo ""
    echo -e "${CYAN}📦 备份管理${NC}"
    echo "========================="
    echo "  1) 📋 查看可用备份"
    echo "  2) 🗄️ 创建完整备份"
    echo "  3) 🔄 从备份恢复"
    echo "  4) ✅ 验证备份文件"
    echo "  0) 🔙 返回主菜单"
    echo ""
    echo -n -e "${YELLOW}请选择: ${NC}"
    read -r backup_choice
    
    case "$backup_choice" in
        "1")
            echo -e "${BLUE}📋 可用的备份版本：${NC}"
            echo ""
            echo -e "${YELLOW}解压后的备份目录：${NC}"
            ls -la backups/ | grep "strapi_backup_" | grep -v ".tar.gz" | sort -r
            echo ""
            echo -e "${YELLOW}压缩包备份：${NC}"
            ls -la backups/ | grep ".tar.gz" | sort -r
            echo ""
            echo -n -e "${YELLOW}按回车键继续...${NC}"
            read
            ;;
        "2")
            echo -e "${BLUE}🗄️ 创建完整备份...${NC}"
            exec "$SCRIPT_DIR/scripts/backup/backup-strapi.sh"
            ;;
        "3")
            echo -e "${BLUE}🔄 使用配置文件中的备份版本恢复...${NC}"
            exec "$SCRIPT_DIR/scripts/tools/simple-deploy.sh"
            ;;
        "4")
            echo -n -e "${YELLOW}请输入备份文件路径: ${NC}"
            read -r backup_file
            if [ -n "$backup_file" ]; then
                exec "$SCRIPT_DIR/scripts/backup/verify-backup.sh" "$backup_file"
            fi
            ;;
        "0")
            return 1
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            return 1
            ;;
    esac
}

# 命令行模式处理
handle_command_line() {
    local category=$1
    local action=$2
    shift 2
    
    case "$category" in
        "deploy")
            case "$action" in
                "config")
                    echo -e "${BLUE}🔧 执行极简部署配置...${NC}"
                    exec "$SCRIPT_DIR/scripts/tools/simple-deploy.sh" "$@"
                    ;;
                "start")
                    echo -e "${BLUE}🚀 启动完整环境...${NC}"
                    exec "$SCRIPT_DIR/scripts/deployment/start-dev.sh" "$@"
                    ;;
                "stop")
                    echo -e "${BLUE}🛑 停止所有服务...${NC}"
                    exec "$SCRIPT_DIR/scripts/deployment/stop-dev.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的部署操作: $action${NC}"
                    echo "可用操作: config, start, stop"
                    exit 1
                    ;;
            esac
            ;;
        "backup")
            case "$action" in
                "list")
                    echo -e "${BLUE}📋 可用的备份版本：${NC}"
                    echo ""
                    echo -e "${YELLOW}解压后的备份目录：${NC}"
                    ls -d backups/strapi_backup_* 2>/dev/null | grep -v ".tar.gz" | sort -r
                    echo ""
                    echo -e "${YELLOW}压缩包备份：${NC}"
                    ls backups/*.tar.gz 2>/dev/null | sort -r
                    ;;
                "create")
                    exec "$SCRIPT_DIR/scripts/backup/backup-strapi.sh" "$@"
                    ;;
                "restore")
                    echo -e "${BLUE}🔄 使用配置文件中的备份版本恢复...${NC}"
                    exec "$SCRIPT_DIR/scripts/tools/simple-deploy.sh"
                    ;;
                "verify")
                    if [ $# -eq 0 ]; then
                        echo -e "${RED}❌ 请提供备份文件路径${NC}"
                        exit 1
                    fi
                    exec "$SCRIPT_DIR/scripts/backup/verify-backup.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的备份操作: $action${NC}"
                    echo "可用操作: list, create, restore, verify"
                    exit 1
                    ;;
            esac
            ;;
        "tools")
            case "$action" in
                "status")
                    exec "$SCRIPT_DIR/scripts/tools/status.sh" "$@"
                    ;;
                "check")
                    exec "$SCRIPT_DIR/scripts/tools/pre-commit-check.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的工具操作: $action${NC}"
                    echo "可用操作: status, check"
                    exit 1
                    ;;
            esac
            ;;
        "search")
            case "$action" in
                "manage")
                    exec "$SCRIPT_DIR/scripts/search/manage-meilisearch.sh" "$@"
                    ;;
                "check")
                    exec "$SCRIPT_DIR/scripts/search/check-meilisearch.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的搜索操作: $action${NC}"
                    echo "可用操作: manage, check"
                    exit 1
                    ;;
            esac
            ;;
        "email")
            case "$action" in
                "check")
                    exec "$SCRIPT_DIR/scripts/billionmail/check-billionmail.sh" "$@"
                    ;;
                "admin")
                    echo -e "${GREEN}📧 BillionMail管理界面: http://localhost:8080${NC}"
                    if command -v open > /dev/null; then
                        open "http://localhost:8080"
                    elif command -v xdg-open > /dev/null; then
                        xdg-open "http://localhost:8080"
                    fi
                    ;;
                *)
                    echo -e "${RED}❌ 未知的邮件操作: $action${NC}"
                    echo "可用操作: check, admin"
                    exit 1
                    ;;
            esac
            ;;
        *)
            echo -e "${RED}❌ 未知的类别: $category${NC}"
            echo ""
            echo -e "${BLUE}可用类别:${NC}"
            echo "  deploy  - 部署管理 (config, start, stop)"
            echo "  backup  - 备份管理 (list, create, restore, verify)"
            echo "  tools   - 开发工具 (status, check)"
            echo "  search  - 搜索引擎 (manage, check)"
            echo "  email   - 邮件系统 (check, admin)"
            exit 1
            ;;
    esac
}

# 交互式模式
interactive_mode() {
    while true; do
        show_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if ! execute_choice "$choice"; then
            # 如果返回false，继续显示菜单
            continue
        fi
        # 如果返回true，通常是exec了其他脚本，不会到这里
    done
}

# 主程序
main() {
    # 检查命令行参数
    if [ $# -ge 2 ]; then
        # 命令行模式
        handle_command_line "$@"
    elif [ $# -eq 1 ] && [ "$1" = "-h" -o "$1" = "--help" ]; then
        # 显示帮助
        show_help
    else
        # 交互式模式
        interactive_mode
    fi
}

# 启动程序
main "$@"