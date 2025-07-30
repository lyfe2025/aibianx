#!/bin/bash

# AI变现之路 - 统一脚本管理入口
# 用于快速访问项目中的各种管理脚本

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

show_usage() {
    echo -e "${BLUE}🚀 AI变现之路 - 脚本管理工具${NC}"
    echo ""
    echo "用法: ./scripts.sh <类别> <操作> [参数]"
    echo ""
    echo -e "${YELLOW}📋 可用类别和操作:${NC}"
    echo ""
    echo -e "${GREEN}🚀 部署管理 (deploy)${NC}"
    echo "  start        - 启动开发环境"
    echo "  stop         - 停止开发服务"
    echo "  status       - 查看服务状态"
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
    echo -e "${YELLOW}📖 使用示例:${NC}"
    echo "  ./scripts.sh deploy start    # 启动开发环境"
    echo "  ./scripts.sh db check        # 检查数据库"
    echo "  ./scripts.sh search deploy   # 部署搜索引擎"
    echo "  ./scripts.sh backup full     # 完整备份"
    echo ""
    echo -e "${BLUE}📁 脚本目录结构:${NC}"
    echo "  scripts/deployment/  - 部署相关脚本"
    echo "  scripts/database/    - 数据库管理脚本"
    echo "  scripts/search/      - 搜索引擎脚本"
    echo "  scripts/backup/      - 备份相关脚本"
    echo "  scripts/tools/       - 工具脚本"
    echo ""
}

# 检查参数
if [ $# -lt 2 ]; then
    show_usage
    exit 1
fi

CATEGORY=$1
ACTION=$2
shift 2  # 移除前两个参数，剩下的作为脚本参数

# 执行对应的脚本
case "$CATEGORY" in
    "deploy")
        case "$ACTION" in
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
                echo -e "${RED}❌ 未知的部署操作: $ACTION${NC}"
                echo "可用操作: start, stop, frontend, backend"
                exit 1
                ;;
        esac
        ;;
    "db")
        case "$ACTION" in
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
                echo -e "${RED}❌ 未知的数据库操作: $ACTION${NC}"
                echo "可用操作: check, backup, restore"
                exit 1
                ;;
        esac
        ;;
    "search")
        case "$ACTION" in
            "deploy")
                exec "$SCRIPT_DIR/scripts/search/deploy-meilisearch.sh" "$@"
                ;;
            "check")
                exec "$SCRIPT_DIR/scripts/search/check-meilisearch.sh" "$@"
                ;;
            *)
                echo -e "${RED}❌ 未知的搜索操作: $ACTION${NC}"
                echo "可用操作: deploy, check"
                exit 1
                ;;
        esac
        ;;
    "backup")
        case "$ACTION" in
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
                echo -e "${RED}❌ 未知的备份操作: $ACTION${NC}"
                echo "可用操作: full, verify, restore, cleanup"
                exit 1
                ;;
        esac
        ;;
    "tools")
        case "$ACTION" in
            "status")
                exec "$SCRIPT_DIR/scripts/tools/status.sh" "$@"
                ;;
            "env")
                echo "加载环境变量工具，请在其他脚本中使用 source scripts/tools/load-env.sh"
                ;;
            *)
                echo -e "${RED}❌ 未知的工具操作: $ACTION${NC}"
                echo "可用操作: status, env"
                exit 1
                ;;
        esac
        ;;
    *)
        echo -e "${RED}❌ 未知的类别: $CATEGORY${NC}"
        echo ""
        show_usage
        exit 1
        ;;
esac