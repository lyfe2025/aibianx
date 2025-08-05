#!/bin/bash

# AI变现之路 - 智能脚本管理工具 (精简版)
# 支持传统命令行模式和精简交互式菜单

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 加载统一配置
source "$SCRIPT_DIR/scripts/tools/load-config.sh"
load_config

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# 加载核心菜单功能
source "$SCRIPT_DIR/scripts/tools/menu-core.sh"

# ===== 环境检测和智能适应功能 =====

# 检测当前环境
detect_current_environment() {
    local env_type="unknown"
    local env_status="unknown"
    local config_type="unknown"
    
    # 检测环境标记文件
    if [ -f ".production" ]; then
        env_type="production"
    elif [ -f ".development" ]; then
        env_type="development"
    else
        # 通过配置文件检测
        if [ -f "backend/.env" ]; then
            local node_env=$(grep "NODE_ENV=" backend/.env 2>/dev/null | cut -d'=' -f2)
            local database_host=$(grep "DATABASE_HOST=" backend/.env 2>/dev/null | cut -d'=' -f2)
            
            if [ "$node_env" = "production" ] || [ "$database_host" != "localhost" ]; then
                env_type="production"
                config_type="integrated"
            else
                env_type="development"
                config_type="local"
            fi
        else
            env_type="development"
        fi
    fi
    
    # 检测环境状态
    case "$env_type" in
        "production")
            if check_production_services 2>/dev/null; then
                env_status="healthy"
            else
                env_status="warning"
            fi
            ;;
        "development")
            if check_development_services 2>/dev/null; then
                env_status="healthy"
            else
                env_status="warning"
            fi
            ;;
        *)
            env_status="error"
            ;;
    esac
    
    # 输出环境信息
    echo "$env_type:$env_status:$config_type"
}

# 检查开发环境服务状态
check_development_services() {
    # 简单检查：如果有nodejs或docker进程运行，认为是健康状态
    if pgrep -f "node" > /dev/null || docker ps > /dev/null 2>&1; then
        return 0
    fi
    return 1
}

# 检查生产环境服务状态
check_production_services() {
    # 检查Docker服务和关键容器
    if ! docker info > /dev/null 2>&1; then
        return 1
    fi
    
    # 检查是否有相关容器运行
    if docker ps --format "table {{.Names}}" | grep -E "(postgres|frontend|backend)" > /dev/null 2>&1; then
        return 0
    fi
    return 1
}

# 显示使用说明
show_usage() {
    echo -e "${CYAN}🚀 AI变现之路 - 智能脚本管理工具${NC}"
    echo "========================================"
    echo ""
    echo -e "${BLUE}📋 使用方法:${NC}"
    echo "  交互模式: ./scripts.sh"
    echo "  命令模式: ./scripts.sh <类别> <操作> [参数...]"
    echo "  帮助信息: ./scripts.sh -h"
    echo ""
    echo -e "${BLUE}🔧 主要类别:${NC}"
    echo "  deploy       - 部署管理 (start, stop, frontend, backend)"
    echo "  db           - 数据库管理 (check, backup, restore)"
    echo "  restore      - 数据还原 (database, system, verify, list)"
    echo "  search       - 搜索引擎 (deploy, check, restart, manage)"
    echo "  tools        - 开发工具 (status, check-hardcode, pre-commit)"
    echo "  email        - 邮件系统 (deploy, check, admin, test)"
    echo "  backup       - 备份恢复 (full, restore, verify, cleanup)"
    echo "  production   - 生产环境 (auto-deploy, configure, deploy, local-deploy)"
    echo ""
    echo -e "${BLUE}💡 快速示例:${NC}"
    echo "  ./scripts.sh deploy start           # 启动开发环境"
    echo "  ./scripts.sh restore list           # 查看可用备份"
    echo "  ./scripts.sh restore database [文件] # 还原数据库"
    echo "  ./scripts.sh tools pre-commit       # 代码质量检查"
    echo "  ./scripts.sh search manage          # 搜索管理工具"
    echo "  ./scripts.sh email admin            # 邮件管理界面"
    echo ""
    echo -e "${BLUE}🌐 环境管理:${NC}"
    echo "  菜单模式: 选择 'e' 进行环境切换"
    echo "  菜单模式: 选择 'h' 查看完整帮助"
}

# 主程序逻辑
main() {
    # 检查是否有命令行参数
    if [ $# -ge 2 ]; then
        # 传统命令行模式 - 重用现有的命令行处理逻辑
        handle_command_line "$@"
    elif [ $# -eq 1 ] && [ "$1" = "-h" -o "$1" = "--help" ]; then
        # 显示帮助
        show_usage
    else
        # 交互式模式 - 使用精简核心菜单
        handle_interactive_mode
    fi
}

# 处理命令行模式 (保留原有逻辑，但简化)
handle_command_line() {
    local category=$1
    local action=$2
    shift 2

    # 执行对应的脚本 (保留原有的完整逻辑)
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
        "tools")
            case "$action" in
                "status")
                    exec "$SCRIPT_DIR/scripts/tools/status.sh" "$@"
                    ;;
                "check-hardcode")
                    exec "$SCRIPT_DIR/scripts/tools/check-hardcode.sh" "$@"
                    ;;
                "pre-commit")
                    exec "$SCRIPT_DIR/scripts/tools/pre-commit-check.sh" "$@"
                    ;;
                "fix-fields")
                    exec "$SCRIPT_DIR/scripts/tools/configure-field-descriptions.sh" "$@"
                    ;;
                "setup-env")
                    exec "$SCRIPT_DIR/scripts/tools/setup-env.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的工具操作: $action${NC}"
                    echo "可用操作: status, check-hardcode, pre-commit, fix-fields, setup-env"
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
                "manage")
                    exec "$SCRIPT_DIR/scripts/search/manage-meilisearch.sh" "$@"
                    ;;
                "restart")
                    echo -e "${YELLOW}🔄 重启MeiliSearch...${NC}"
                    docker restart meilisearch 2>/dev/null && echo -e "${GREEN}✅ MeiliSearch已重启${NC}" || echo -e "${RED}❌ 重启失败${NC}"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的搜索操作: $action${NC}"
                    echo "可用操作: deploy, check, manage, restart"
                    exit 1
                    ;;
            esac
            ;;
        "email")
            case "$action" in
                "deploy")
                    echo -e "${BLUE}🚀 BillionMail真实系统已部署完成！${NC}"
                    echo -e "${GREEN}✅ 管理界面: ${BILLIONMAIL_ADMIN_URL}${NC}"
                    echo -e "${GREEN}✅ WebMail: ${BILLIONMAIL_WEBMAIL_URL}${NC}"
                    ;;
                "check")
                    exec "$SCRIPT_DIR/scripts/billionmail/check-billionmail.sh"
                    ;;
                "admin")
                    echo -e "${GREEN}📍 BillionMail管理界面: ${BILLIONMAIL_ADMIN_URL}${NC}"
                    if command -v open > /dev/null; then
                        open "${BILLIONMAIL_ADMIN_URL}"
                    elif command -v xdg-open > /dev/null; then
                        xdg-open "${BILLIONMAIL_ADMIN_URL}"
                    fi
                    ;;
                "test")
                    exec "$SCRIPT_DIR/scripts/billionmail/test-api.sh"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的邮件操作: $action${NC}"
                    echo "可用操作: deploy, check, admin, test"
                    exit 1
                    ;;
            esac
            ;;
        "backup")
            case "$action" in
                "full")
                    exec "$SCRIPT_DIR/scripts/backup/backup-strapi.sh" "$@"
                    ;;
                "restore")
                    if [ $# -eq 0 ]; then
                        echo -e "${RED}❌ 请提供备份文件路径${NC}"
                        exit 1
                    fi
                    exec "$SCRIPT_DIR/scripts/backup/restore-strapi.sh" "$@"
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
                    echo "可用操作: full, restore, verify"
                    exit 1
                    ;;
            esac
            ;;
        "restore")
            # 统一的还原入口
            case "$action" in
                "database")
                    if [ $# -eq 0 ]; then
                        echo -e "${RED}❌ 请提供数据库备份文件路径${NC}"
                        echo -e "${BLUE}💡 示例: ./scripts.sh restore database backups/database-only/backup_20240101.sql${NC}"
                        exit 1
                    fi
                    exec "$SCRIPT_DIR/scripts/database/restore-database-only.sh" "$@"
                    ;;
                "system")
                    if [ $# -eq 0 ]; then
                        echo -e "${RED}❌ 请提供系统备份文件路径${NC}"
                        echo -e "${BLUE}💡 示例: ./scripts.sh restore system backups/strapi_backup_20240101.tar.gz${NC}"
                        exit 1
                    fi
                    exec "$SCRIPT_DIR/scripts/backup/restore-strapi.sh" "$@"
                    ;;
                "verify")
                    if [ $# -eq 0 ]; then
                        echo -e "${RED}❌ 请提供备份文件路径进行验证${NC}"
                        exit 1
                    fi
                    exec "$SCRIPT_DIR/scripts/backup/verify-backup.sh" "$@"
                    ;;
                "list")
                    echo -e "${BLUE}📋 可用的备份文件：${NC}"
                    echo ""
                    echo -e "${YELLOW}数据库备份：${NC}"
                    find backups/database-only/ -name "*.sql" 2>/dev/null | sort -r | head -10 || echo "  无数据库备份文件"
                    echo ""
                    echo -e "${YELLOW}系统备份：${NC}"
                    find backups/ -name "strapi_backup_*.tar.gz" 2>/dev/null | sort -r | head -10 || echo "  无系统备份文件"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的还原操作: $action${NC}"
                    echo "可用操作: database, system, verify, list"
                    echo ""
                    echo -e "${BLUE}💡 使用示例：${NC}"
                    echo "  ./scripts.sh restore list             # 查看可用备份"
                    echo "  ./scripts.sh restore database [文件] # 还原数据库"
                    echo "  ./scripts.sh restore system [文件]   # 还原整个系统"
                    echo "  ./scripts.sh restore verify [文件]   # 验证备份文件"
                    exit 1
                    ;;
            esac
            ;;
        "production")
            # 为了简化，这里只保留最常用的生产命令
            case "$action" in
                "auto-deploy")
                    exec "$SCRIPT_DIR/scripts/production/auto-deploy.sh" "$@"
                    ;;
                "configure")
                    exec "$SCRIPT_DIR/deployment/configure-unified-env.sh" integrated "$@"
                    ;;
                "deploy")
                    exec "$SCRIPT_DIR/scripts/production/deploy-production.sh" "${3:-unified}" "$@"
                    ;;
                "local-deploy")
                    exec "$SCRIPT_DIR/scripts/production/local-production-deploy.sh" "$@"
                    ;;
                "status")
                    exec "$SCRIPT_DIR/scripts/production/manage-services.sh" status
                    ;;
                *)
                    echo -e "${RED}❌ 未知的生产操作: $action${NC}"
                    echo "可用操作: auto-deploy, configure, deploy, local-deploy, status"
                    echo "更多生产功能请使用交互模式: ./scripts.sh"
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

# 处理交互式模式 - 使用精简核心菜单
handle_interactive_mode() {
    while true; do
        show_core_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if execute_core_choice "$choice"; then
            # 如果执行成功但没有退出脚本，继续循环
            continue
        fi
        # execute_core_choice 返回1表示需要继续显示菜单
    done
}

# 启动主程序
main "$@"