#!/bin/bash

# AI变现之路 - 智能脚本管理工具
# 支持传统命令行模式和交互式序号选择模式

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# 显示传统命令行帮助
show_usage() {
    echo -e "${BLUE}🚀 AI变现之路 - 脚本管理工具${NC}"
    echo ""
    echo -e "${YELLOW}📋 使用方式:${NC}"
    echo "  1. 交互式模式: ./scripts.sh           (推荐)"
    echo "  2. 命令行模式: ./scripts.sh <类别> <操作> [参数]"
    echo ""
    echo -e "${YELLOW}📋 命令行模式 - 可用类别和操作:${NC}"
    echo ""
    echo -e "${GREEN}🚀 部署管理 (deploy)${NC}"
    echo "  start        - 启动开发环境"
    echo "  stop         - 停止开发服务"
    echo "  frontend     - 启动前端服务"
    echo "  backend      - 启动后端服务"
    echo ""
    echo -e "${GREEN}🗄️  数据库管理 (db)${NC}"
    echo "  check        - 检查数据库连接"
    echo "  backup       - 备份数据库"
    echo "  restore      - 还原数据库"
    echo ""
    echo -e "${GREEN}🔍 搜索引擎 (search)${NC}"
    echo "  deploy       - 部署MeiliSearch"
    echo "  check        - 检查搜索引擎状态"
    echo "  restart      - 重启MeiliSearch服务"
    echo "  logs         - 查看MeiliSearch日志"
    echo "  reindex      - 重建搜索索引"
    echo "  manage       - 搜索管理工具"
    echo ""
    echo -e "${GREEN}💾 备份管理 (backup)${NC}"
    echo "  full         - 完整系统备份"
    echo "  verify       - 验证备份文件"
    echo "  restore      - 还原系统备份"
    echo "  cleanup      - 清理临时文件"
    echo ""
    echo -e "${GREEN}🔧 工具 (tools)${NC}"
    echo "  status       - 查看系统状态"
    echo "  env          - 加载环境变量"
    echo ""
    echo -e "${YELLOW}📖 命令行使用示例:${NC}"
    echo "  ./scripts.sh deploy start    # 启动开发环境"
    echo "  ./scripts.sh db check        # 检查数据库"
    echo "  ./scripts.sh search deploy   # 部署搜索引擎"
    echo "  ./scripts.sh search restart  # 重启搜索服务"
    echo "  ./scripts.sh search reindex  # 重建搜索索引"
    echo "  ./scripts.sh backup full     # 完整备份"
    echo "  ./scripts.sh tools status    # 查看系统状态"
    echo ""
}

# 显示交互式菜单
show_menu() {
    clear
    echo -e "${BLUE}┌─────────────────────────────────────────┐${NC}"
    echo -e "${BLUE}│        🚀 AI变现之路 - 脚本工具          │${NC}"
    echo -e "${BLUE}└─────────────────────────────────────────┘${NC}"
    echo ""
    echo -e "${YELLOW}📋 请选择要执行的操作 (输入序号):${NC}"
    echo ""
    echo -e "${GREEN} 🚀 开发环境管理${NC}"
    echo -e "  ${CYAN}1${NC}) 启动完整开发环境    (前端+后端+数据库)"
    echo -e "  ${CYAN}2${NC}) 仅启动前端服务      (Next.js)"
    echo -e "  ${CYAN}3${NC}) 仅启动后端服务      (Strapi)"
    echo -e "  ${CYAN}4${NC}) 停止所有服务"
    echo ""
    echo -e "${GREEN} 📊 状态检查${NC}"
    echo -e "  ${CYAN}5${NC}) 查看系统状态        (服务+端口+资源)"
    echo -e "  ${CYAN}6${NC}) 检查数据库连接      (PostgreSQL)"
    echo -e "  ${CYAN}7${NC}) 检查搜索引擎        (MeiliSearch)"
    echo ""
    echo -e "${GREEN} 🔍 搜索引擎${NC}"
    echo -e "  ${CYAN}8${NC}) 部署MeiliSearch     (一键安装配置)"
    echo ""
    echo -e "${GREEN} 🔧 搜索管理${NC}"
    echo -e "  ${CYAN}9${NC}) 搜索管理工具        (完整管理界面)"
    echo -e " ${CYAN}10${NC}) 重启MeiliSearch     (重启搜索服务)"
    echo -e " ${CYAN}11${NC}) 查看搜索日志        (实时日志查看)"
    echo -e " ${CYAN}12${NC}) 重建搜索索引        (重新同步数据)"
    echo ""
    echo -e "${GREEN} 💾 数据管理${NC}"
    echo -e " ${CYAN}13${NC}) 数据库备份          (仅数据库)"
    echo -e " ${CYAN}14${NC}) 完整系统备份        (数据库+文件)"
    echo -e " ${CYAN}15${NC}) 清理备份临时文件"
    echo ""
    echo -e "${PURPLE} h${NC}) 显示命令行帮助"
    echo -e "${RED} 0${NC}) 退出"
    echo ""
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# 执行选择的操作
execute_choice() {
    local choice=$1
    echo ""
    
    case $choice in
        1)
            echo -e "${GREEN}🚀 启动完整开发环境...${NC}"
            exec "$SCRIPT_DIR/scripts/deployment/start-dev.sh"
            ;;
        2)
            echo -e "${GREEN}🌐 启动前端服务...${NC}"
            exec "$SCRIPT_DIR/scripts/deployment/start-frontend.sh"
            ;;
        3)
            echo -e "${GREEN}⚙️ 启动后端服务...${NC}"
            exec "$SCRIPT_DIR/scripts/deployment/start-backend.sh"
            ;;
        4)
            echo -e "${YELLOW}🛑 停止所有服务...${NC}"
            exec "$SCRIPT_DIR/scripts/deployment/stop-dev.sh"
            ;;
        5)
            echo -e "${BLUE}📊 检查系统状态...${NC}"
            exec "$SCRIPT_DIR/scripts/tools/status.sh"
            ;;
        6)
            echo -e "${BLUE}🗄️ 检查数据库连接...${NC}"
            exec "$SCRIPT_DIR/scripts/database/check-database.sh"
            ;;
        7)
            echo -e "${BLUE}🔍 检查搜索引擎状态...${NC}"
            exec "$SCRIPT_DIR/scripts/search/check-meilisearch.sh"
            ;;
        8)
            echo -e "${GREEN}🔍 部署MeiliSearch...${NC}"
            exec "$SCRIPT_DIR/scripts/search/deploy-meilisearch.sh"
            ;;
        9)
            echo -e "${BLUE}🔧 启动搜索管理工具...${NC}"
            exec "$SCRIPT_DIR/scripts/search/manage-meilisearch.sh"
            ;;
        10)
            echo -e "${YELLOW}🔄 重启MeiliSearch...${NC}"
            echo "重启搜索引擎服务..."
            docker restart meilisearch 2>/dev/null && echo -e "${GREEN}✅ MeiliSearch已重启${NC}" || echo -e "${RED}❌ 重启失败${NC}"
            echo ""
            read -p "按回车键返回主菜单..."
            return 1
            ;;
        11)
            echo -e "${BLUE}📋 查看MeiliSearch日志...${NC}"
            echo "按 Ctrl+C 退出日志查看"
            echo ""
            sleep 2
            docker logs meilisearch -f 2>/dev/null || echo -e "${RED}❌ MeiliSearch容器未运行${NC}"
            return 1
            ;;
        12)
            echo -e "${GREEN}🔄 重建搜索索引...${NC}"
            echo "正在重新同步搜索数据..."
            if curl -s -X POST http://localhost:1337/api/search/reindex > /dev/null 2>&1; then
                echo -e "${GREEN}✅ 搜索索引重建成功${NC}"
            else
                echo -e "${RED}❌ 重建失败，请确保后端服务正在运行${NC}"
            fi
            echo ""
            read -p "按回车键返回主菜单..."
            return 1
            ;;
        13)
            echo -e "${PURPLE}💾 备份数据库...${NC}"
            exec "$SCRIPT_DIR/scripts/database/backup-database-only.sh"
            ;;
        14)
            echo -e "${PURPLE}📦 完整系统备份...${NC}"
            exec "$SCRIPT_DIR/scripts/backup/backup-strapi.sh"
            ;;
        15)
            echo -e "${YELLOW}🧹 清理备份临时文件...${NC}"
            exec "$SCRIPT_DIR/scripts/backup/cleanup-backup-temp.sh"
            ;;
        h|H)
            show_usage
            echo ""
            read -p "按回车键返回主菜单..."
            return 1
            ;;
        0)
            echo -e "${GREEN}👋 再见！${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ 无效选择: $choice${NC}"
            echo "请输入 0-15 之间的数字，或 'h' 查看帮助"
            echo ""
            read -p "按回车键继续..." 
            return 1
            ;;
    esac
}

# 主程序逻辑
main() {
    # 检查是否有命令行参数
    if [ $# -ge 2 ]; then
        # 传统命令行模式
        handle_command_line "$@"
    elif [ $# -eq 1 ] && [ "$1" = "-h" -o "$1" = "--help" ]; then
        # 显示帮助
        show_usage
    else
        # 交互式模式
        handle_interactive_mode
    fi
}

# 处理命令行模式
handle_command_line() {
    local category=$1
    local action=$2
    shift 2

    # 执行对应的脚本
    case "$category" in
        "deploy")
            case "$action" in
                "start")
                    exec "$SCRIPT_DIR/scripts/deployment/start-dev.sh" "$@"
                    ;;
                "stop")
                    exec "$SCRIPT_DIR/scripts/deployment/stop-dev.sh" "$@"
                    ;;
                "frontend")
                    exec "$SCRIPT_DIR/scripts/deployment/start-frontend.sh" "$@"
                    ;;
                "backend")
                    exec "$SCRIPT_DIR/scripts/deployment/start-backend.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的部署操作: $action${NC}"
                    echo "可用操作: start, stop, frontend, backend"
                    exit 1
                    ;;
            esac
            ;;
        "db")
            case "$action" in
                "check")
                    exec "$SCRIPT_DIR/scripts/database/check-database.sh" "$@"
                    ;;
                "backup")
                    exec "$SCRIPT_DIR/scripts/database/backup-database-only.sh" "$@"
                    ;;
                "restore")
                    exec "$SCRIPT_DIR/scripts/database/restore-database-only.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的数据库操作: $action${NC}"
                    echo "可用操作: check, backup, restore"
                    exit 1
                    ;;
            esac
            ;;
        "search")
            case "$action" in
                "deploy")
                    exec "$SCRIPT_DIR/scripts/search/deploy-meilisearch.sh" "$@"
                    ;;
                "check")
                    exec "$SCRIPT_DIR/scripts/search/check-meilisearch.sh" "$@"
                    ;;
                "restart")
                    echo -e "${YELLOW}🔄 重启MeiliSearch...${NC}"
                    docker restart meilisearch 2>/dev/null && echo -e "${GREEN}✅ MeiliSearch已重启${NC}" || echo -e "${RED}❌ 重启失败${NC}"
                    ;;
                "logs")
                    echo -e "${BLUE}📋 查看MeiliSearch日志...${NC}"
                    docker logs meilisearch -f 2>/dev/null || echo -e "${RED}❌ MeiliSearch容器未运行${NC}"
                    ;;
                "reindex")
                    echo -e "${GREEN}🔄 重建搜索索引...${NC}"
                    if curl -s -X POST http://localhost:1337/api/search/reindex > /dev/null 2>&1; then
                        echo -e "${GREEN}✅ 搜索索引重建成功${NC}"
                    else
                        echo -e "${RED}❌ 重建失败，请确保后端服务正在运行${NC}"
                    fi
                    ;;
                "manage")
                    echo -e "${BLUE}🔧 启动搜索管理工具...${NC}"
                    exec "$SCRIPT_DIR/scripts/search/manage-meilisearch.sh"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的搜索操作: $action${NC}"
                    echo "可用操作: deploy, check, restart, logs, reindex, manage"
                    exit 1
                    ;;
            esac
            ;;
        "backup")
            case "$action" in
                "full")
                    exec "$SCRIPT_DIR/scripts/backup/backup-strapi.sh" "$@"
                    ;;
                "verify")
                    if [ $# -eq 0 ]; then
                        echo -e "${RED}❌ 请提供备份文件路径${NC}"
                        echo "用法: ./scripts.sh backup verify <备份文件路径>"
                        exit 1
                    fi
                    exec "$SCRIPT_DIR/scripts/backup/verify-backup.sh" "$@"
                    ;;
                "restore")
                    if [ $# -eq 0 ]; then
                        echo -e "${RED}❌ 请提供备份文件路径${NC}"
                        echo "用法: ./scripts.sh backup restore <备份文件路径>"
                        exit 1
                    fi
                    exec "$SCRIPT_DIR/scripts/backup/restore-strapi.sh" "$@"
                    ;;
                "cleanup")
                    exec "$SCRIPT_DIR/scripts/backup/cleanup-backup-temp.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的备份操作: $action${NC}"
                    echo "可用操作: full, verify, restore, cleanup"
                    exit 1
                    ;;
            esac
            ;;
        "tools")
            case "$action" in
                "status")
                    exec "$SCRIPT_DIR/scripts/tools/status.sh" "$@"
                    ;;
                "env")
                    echo "加载环境变量工具，请在其他脚本中使用 source scripts/tools/load-env.sh"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的工具操作: $action${NC}"
                    echo "可用操作: status, env"
                    exit 1
                    ;;
            esac
            ;;
        *)
            echo -e "${RED}❌ 未知的类别: $category${NC}"
            echo ""
            show_usage
            exit 1
            ;;
    esac
}

# 处理交互式模式
handle_interactive_mode() {
    while true; do
        show_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if execute_choice "$choice"; then
            # 如果执行成功但没有退出脚本，继续循环
            continue
        fi
        # execute_choice 返回1表示需要继续显示菜单
    done
}

# 启动主程序
main "$@"