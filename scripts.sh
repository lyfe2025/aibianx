#!/bin/bash

# AI变现之路 - 智能脚本管理工具
# 支持传统命令行模式和交互式序号选择模式

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
    echo "  reindex      - 智能重建搜索索引 (自动创建+数据同步)"
    echo "  manage       - 搜索管理工具"
    echo ""
    echo -e "${GREEN}💾 备份管理 (backup)${NC}"
    echo "  full         - 完整系统备份"
    echo "  verify       - 验证备份文件"
    echo "  restore      - 还原系统备份"
    echo "  cleanup      - 清理临时文件"
    echo ""
    echo -e "${GREEN}📧 邮件管理 (email)${NC}"
    echo "  deploy       - 部署BillionMail邮件系统"
    echo "  check        - 检查BillionMail服务状态"
    echo "  restart      - 重启BillionMail服务"
    echo "  logs         - 查看BillionMail日志"
    echo "  test         - 测试BillionMail API连接"
    echo "  test-full    - 完整集成测试（前端+后端）"
    echo "  test-nextauth - 测试NextAuth邮件集成"
    echo "  admin        - 打开BillionMail管理界面"
    echo ""
    echo -e "${GREEN}🔧 工具 (tools)${NC}"
    echo "  status       - 查看系统状态"
    echo "  env          - 加载环境变量"
    echo "  fix-fields   - 修复字段描述配置问题（Article专用）"
    echo "  fix-fields-any - 修复任意内容类型的字段描述问题"
    echo "  setup-env    - 自动配置环境变量（域名端口分离）"
    echo ""
    echo -e "${YELLOW}📖 命令行使用示例:${NC}"
    echo "  ./scripts.sh deploy start    # 启动开发环境"
    echo "  ./scripts.sh db check        # 检查数据库"
    echo "  ./scripts.sh search deploy   # 部署搜索引擎"
    echo "  ./scripts.sh search restart  # 重启搜索服务"
    echo "  ./scripts.sh search reindex  # 智能重建搜索索引"
      echo "  ./scripts.sh email deploy    # 部署BillionMail邮件系统"
  echo "  ./scripts.sh email check     # 检查BillionMail服务状态"
  echo "  ./scripts.sh email restart   # 重启BillionMail服务"
  echo "  ./scripts.sh email test      # 测试BillionMail API连接"
  echo "  ./scripts.sh email test-full # 完整集成测试"
  echo "  ./scripts.sh email test-nextauth # 测试NextAuth邮件集成"
  echo "  ./scripts.sh email admin     # 打开BillionMail管理界面"
    echo "  ./scripts.sh backup full     # 完整备份"
    echo "  ./scripts.sh tools status    # 查看系统状态"
    echo "  ./scripts.sh tools fix-fields # 修复字段描述配置（Article）"
    echo "  ./scripts.sh tools fix-fields-any author # 配置作者字段描述"
    echo "  ./scripts.sh tools setup-env # 自动配置环境变量"
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
    echo -e " ${CYAN}12${NC}) 智能重建索引        (自动创建+同步数据)"
    echo ""
    echo -e "${GREEN} 💾 数据管理${NC}"
    echo -e " ${CYAN}13${NC}) 数据库备份          (仅数据库)"
    echo -e " ${CYAN}14${NC}) 完整系统备份        (数据库+文件)"
    echo -e " ${CYAN}15${NC}) 清理备份临时文件"
    echo ""
    echo -e "${GREEN} 📧 邮件系统${NC}"
    echo -e " ${CYAN}16${NC}) 部署BillionMail      (邮件营销系统)"
    echo -e " ${CYAN}17${NC}) 检查BillionMail状态  (服务健康检查)"
    echo -e " ${CYAN}18${NC}) 打开BillionMail管理   (浏览器管理界面)"
    echo ""
    echo -e "${GREEN} 🔧 系统维护${NC}"
    echo -e " ${CYAN}19${NC}) 修复字段描述配置      (解决描述不显示问题)"
    echo -e " ${CYAN}20${NC}) 自动配置环境变量      (创建开发环境配置)"
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
            echo -e "${GREEN}🔄 快速重建搜索索引...${NC}"
            echo "启用智能索引重建流程..."
            echo ""
            "$SCRIPT_DIR/scripts/search/quick-reindex.sh"
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
        16) 
            echo -e "${BLUE}🚀 BillionMail已部署完成，直接使用真实系统...${NC}"
            echo -e "${GREEN}✅ BillionMail管理界面: http://localhost:8080/billion${NC}"
            echo -e "${GREEN}✅ WebMail界面: http://localhost:8080/roundcube${NC}"
            echo -e "${GREEN}✅ 默认账户: billion / billion${NC}"
            echo ""
            echo "💡 提示："
            echo "  • 管理界面: 用于系统管理、用户创建、邮件列表管理"
            echo "  • WebMail界面: 需要先在管理界面创建邮箱账户才能登录"
            echo ""
            read -p "按回车键返回主菜单..."
            return 1
            ;;  
        17)
            echo -e "${BLUE}🔍 检查BillionMail服务状态...${NC}"
            exec "$SCRIPT_DIR/scripts/billionmail/check-billionmail.sh"
            ;;
        18)
            echo -e "${YELLOW}🌐 打开BillionMail管理界面...${NC}"
            echo ""
            echo -e "${BLUE}🌐 BillionMail真实系统管理界面...${NC}"
            echo ""
            echo -e "${GREEN}📍 访问地址: http://localhost:8080/billion${NC}"
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
                open "http://localhost:8080/billion"
            elif command -v xdg-open > /dev/null; then
                echo "🚀 正在打开浏览器..."
                xdg-open "http://localhost:8080/billion"
            else
                echo "💡 请手动打开浏览器访问上述地址"
            fi
            echo ""
            read -p "按回车键返回主菜单..."
            return 1
            ;;
        19)
            echo -e "${BLUE}🔧 修复字段描述配置...${NC}"
            exec "$SCRIPT_DIR/scripts/tools/configure-field-descriptions.sh"
            ;;
        20)
            echo -e "${BLUE}🔧 自动配置环境变量...${NC}"
            exec "$SCRIPT_DIR/scripts/tools/setup-env.sh"
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
            echo "请输入 0-17 之间的数字，或 'h' 查看帮助"
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
                    echo -e "${GREEN}🔄 启动快速重建索引流程...${NC}"
                    echo ""
                    exec "$SCRIPT_DIR/scripts/search/quick-reindex.sh"
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
                "fix-fields")
                    echo -e "${BLUE}🔧 启动字段描述配置修复工具 (Article专用)...${NC}"
                    exec "$SCRIPT_DIR/scripts/tools/configure-field-descriptions.sh" "$@"
                    ;;
                "fix-fields-any")
                    echo -e "${BLUE}🔧 启动通用字段描述配置工具...${NC}"
                    exec "$SCRIPT_DIR/scripts/tools/configure-any-field-descriptions.sh" "$@"
                    ;;
                "setup-env")
                    echo -e "${BLUE}🔧 启动环境变量自动配置工具...${NC}"
                    exec "$SCRIPT_DIR/scripts/tools/setup-env.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的工具操作: $action${NC}"
                    echo "可用操作: status, env, fix-fields, fix-fields-any, setup-env"
                    exit 1
                    ;;
            esac
            ;;
        "email")
            case "$action" in
                        "deploy")
            echo -e "${BLUE}🚀 BillionMail真实系统已部署完成！${NC}"
            echo -e "${GREEN}✅ 管理界面: http://localhost:8080/billion${NC}"
            echo -e "${GREEN}✅ WebMail: http://localhost:8080/roundcube${NC}"
            echo -e "${GREEN}✅ 默认账户: billion / billion${NC}"
            ;;
                "check")
                    echo -e "${BLUE}🔍 检查BillionMail服务状态...${NC}"
                    exec "$SCRIPT_DIR/scripts/billionmail/check-billionmail.sh"
                    ;;
                "restart")
                    echo -e "${BLUE}🔄 重启BillionMail服务...${NC}"
                    exec "$SCRIPT_DIR/scripts/billionmail/restart-billionmail.sh"
                    ;;
                "logs")
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
                        4) cd "$SCRIPT_DIR/BillionMail" && docker-compose logs -f ;;
                        *) echo "查看所有服务日志..." && cd "$SCRIPT_DIR/BillionMail" && docker-compose logs -f ;;
                    esac
                    ;;
                "test")
                    echo -e "${BLUE}🧪 测试BillionMail API连接...${NC}"
                    exec "$SCRIPT_DIR/scripts/billionmail/test-api.sh"
                    ;;
                "test-full")
                    echo -e "${BLUE}🧪 完整集成测试（前端+后端）...${NC}"
                    exec "$SCRIPT_DIR/scripts/billionmail/test-integration-full.sh"
                    ;;
                "test-nextauth")
                    echo -e "${BLUE}🔐 测试NextAuth邮件集成...${NC}"
                    exec "$SCRIPT_DIR/scripts/billionmail/test-nextauth-integration.sh"
                    ;;
                "admin")
                    echo -e "${YELLOW}🌐 打开BillionMail管理界面...${NC}"
                    echo ""
                    echo -e "${GREEN}📍 访问地址: http://localhost:8080/billion${NC}"
                    echo ""
                    echo "🔧 BillionMail真实系统功能特点:"
                    echo "  ✅ 完整的邮件订阅API"
                    echo "  ✅ 专业邮件服务器和SMTP服务"
                    echo "  ✅ 用户管理和邮件列表"
                    echo "  ✅ 邮件发送统计和分析"
                    echo "  ✅ RoundCube WebMail界面"
                    echo "  ✅ 完整的管理控制台"
                    echo ""
                    echo "💡 BillionMail生产系统:"
                    echo "  这是完整的BillionMail邮件营销平台"
                    echo "  支持大规模邮件发送和专业管理"
                    echo ""
                    if command -v open > /dev/null; then
                        echo "🚀 正在打开浏览器..."
                        open "http://localhost:8080/billion"
                    elif command -v xdg-open > /dev/null; then
                        echo "🚀 正在打开浏览器..."
                        xdg-open "http://localhost:8080/billion"
                    else
                        echo "💡 请手动打开浏览器访问上述地址"
                    fi
                    ;;
                *)
                    echo -e "${BLUE}📧 BillionMail邮件营销系统管理工具${NC}"
                    echo "============================================"
                    echo "可用命令:"
                    echo "  deploy       - 部署BillionMail邮件系统"
                    echo "  check        - 检查BillionMail服务状态"
                    echo "  restart      - 重启BillionMail服务"
                    echo "  logs         - 查看BillionMail日志"
                    echo "  test         - 测试BillionMail API连接"
                    echo "  test-full    - 完整集成测试（前端+后端）"
                    echo "  test-nextauth - 测试NextAuth邮件集成"
                    echo "  admin        - 打开BillionMail管理界面"
                    echo ""
                    echo "示例："
                    echo "  $0 email deploy      # 部署BillionMail系统"
                    echo "  $0 email check       # 检查服务状态"
                    echo "  $0 email restart     # 重启服务"
                    echo "  $0 email logs        # 查看实时日志"
                    echo "  $0 email test        # 测试API连接"
                    echo "  $0 email test-full   # 完整集成测试"
                    echo "  $0 email test-nextauth # 测试NextAuth集成"
                    echo "  $0 email admin       # 打开管理界面"
                    echo ""
                    echo "🌐 BillionMail管理界面："
                    echo "  📍 访问地址: http://localhost:8080/billion"
                    echo "  📧 WebMail: http://localhost:8080/roundcube"  
                    echo "  👤 默认用户: billion / billion"
                    echo "  🔧 功能: 邮件营销、用户管理、模板编辑、统计分析"
                    echo ""
                    echo "💡 使用提示："
                    echo "  • BillionMail真实系统已完全部署并运行中"
                    echo "  • 管理界面可进行用户管理、邮件列表、模板编辑"
                    echo "  • WebMail界面需要先在管理界面创建邮箱账户"
                    echo "  • 获取API密钥用于前端集成和邮件发送"
                    exit 1
                    ;;
            esac
            ;;
        "content-type")
            case "$action" in
                "configure")
                    if [ -z "$3" ]; then
                        echo -e "${RED}❌ 请指定内容类型名称${NC}"
                        echo "用法: $0 content-type configure <content-type-name>"
                        echo "示例: $0 content-type configure smtp-config"
                        exit 1
                    else
                        echo -e "${BLUE}🔧 启动内容类型自动化配置工具...${NC}"
                        exec "$SCRIPT_DIR/scripts/content-type/configure-content-type.sh" "$3"
                    fi
                    ;;
                *)
                    echo -e "${BLUE}🔧 内容类型管理工具${NC}"
                    echo "==============================="
                    echo "可用命令:"
                    echo "  configure <name> - 自动配置内容类型（表注释+字段描述）"
                    echo ""
                    echo "用法示例:"
                    echo "  $0 content-type configure smtp-config"
                    echo "  $0 content-type configure email-subscription"
                    echo ""
                    echo "功能说明:"
                    echo "  ✅ 自动生成数据库表注释"
                    echo "  ✅ 自动配置字段描述"
                    echo "  ✅ 自动验证配置结果"
                    echo "  ✅ 无需手动操作"
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