#!/bin/bash

# AI变现之路 - 极简脚本管理工具
# 基于 deployment/config/deploy.conf 统一配置的简化版本

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 颜色定义 - 检测终端是否支持颜色
if [ -t 1 ] && [ -n "$TERM" ] && [ "$TERM" != "dumb" ]; then
    GREEN='\033[0;32m'
    BLUE='\033[0;34m'
    YELLOW='\033[1;33m'
    RED='\033[0;31m'
    CYAN='\033[0;36m'
    NC='\033[0m'
else
    GREEN=''
    BLUE=''
    YELLOW=''
    RED=''
    CYAN=''
    NC=''
fi

# 显示主菜单
show_menu() {
    # 动态读取配置信息
    local domain="localhost"
    local deploy_mode="dev"
    if [ -f "deployment/config/deploy.conf" ]; then
        domain=$(grep "^DOMAIN=" deployment/config/deploy.conf 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "localhost")
        deploy_mode=$(grep "^DEPLOY_MODE=" deployment/config/deploy.conf 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "dev")
    fi
    
    # 根据模式设置协议和菜单主题
    local protocol="http"
    local env_color="${GREEN}"
    local env_icon="🛠️"
    local mode_desc="开发环境"
    
    if [ "$deploy_mode" = "production" ]; then
        protocol="https"
        env_color="${RED}"
        env_icon="🚀"
        mode_desc="生产环境"
    fi
    
    echo -e "${CYAN}🚀 AI变现之路 - 智能管理工具${NC}"
    echo "===================================="
    echo -e "${env_color}${env_icon} 当前环境: ${mode_desc} | 域名: ${domain}${NC}"
    echo ""
    
    # 根据环境显示不同的菜单
    if [ "$deploy_mode" = "production" ]; then
        show_production_menu
    else
        show_development_menu
    fi
}

# 开发环境菜单
show_development_menu() {
    echo -e "${BLUE}📋 开发环境功能:${NC}"
    echo "  1) 🔧 极简一键配置        ⚙️  生成所有环境变量，恢复备份数据"
    echo "  2) 🚀 启动开发环境        🌐 本地开发服务器 (npm run dev)"
    echo "  3) 🛑 停止开发服务        🔴 停止本地开发进程"
    echo "  4) 📦 备份管理           💾 查看/创建/恢复/验证备份文件"
    echo "  5) 🔍 系统状态           📊 检查所有服务运行状态"
    echo ""
    echo -e "${BLUE}🛠️ 开发工具:${NC}"
    echo "  6) 📊 代码质量检查        🔎 ESLint+硬编码+环境检查"
    echo "  7) 🔍 搜索引擎管理        🎯 MeiliSearch索引管理"
    echo "  8) 📧 邮件系统管理        📬 Strapi集成邮件订阅系统"
    echo "  9) 🌐 显示所有访问地址    🔗 查看完整的系统访问地址和服务状态"
    echo ""
    echo -e "${BLUE}📚 快捷操作:${NC}"
    echo "  e) 🔄 切换到生产环境      🚀 修改 deploy.conf 中的 DEPLOY_MODE"
    echo "  h) 📖 显示详细帮助        💡 命令行用法和配置说明"
    echo "  q) 🚪 退出              👋 安全退出管理工具"
}

# 生产环境菜单
show_production_menu() {
    echo -e "${RED}🚀 生产环境功能:${NC}"
    echo "  1) 🔧 一键生产配置        ⚙️  生成生产级环境变量"
    echo "  2) 🐳 启动生产环境        🌐 Docker Compose 容器部署"
    echo "  3) 🛑 停止生产服务        🔴 停止所有生产容器"
    echo "  4) 📦 备份管理           💾 生产数据备份和恢复"
    echo "  5) 📊 生产监控           📈 容器状态、日志、性能监控"
    echo ""
    echo -e "${RED}🔧 生产运维:${NC}"
    echo "  6) 🏗️ 重建生产镜像        🔨 重新构建 Docker 镜像"
    echo "  7) 🔍 查看容器日志        📋 实时查看服务日志"
    echo "  8) 📧 邮件系统状态        📬 生产邮件服务状态"
    echo "  9) 🌐 显示生产地址        🔗 查看生产环境访问地址"
    echo ""
    echo -e "${RED}📚 快捷操作:${NC}"
    echo "  e) 🔄 切换到开发环境      🛠️ 修改 deploy.conf 中的 DEPLOY_MODE"
    echo "  h) 📖 显示详细帮助        💡 命令行用法和配置说明"
    echo "  q) 🚪 退出              👋 安全退出管理工具"
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
    echo "  🔗 主菜单选项9: 查看所有系统访问地址和服务状态"
    echo "  📊 命令行模式: ./scripts.sh tools services"
    echo "  💡 启动服务后会自动显示完整的访问地址"
    echo ""
}

# 执行菜单选择
execute_choice() {
    local choice=$1
    
    case "$choice" in
        "1")
            echo -e "${CYAN}🔧 开始执行极简一键配置...${NC}"
            echo -e "${BLUE}📋 配置流程说明:${NC}"
            echo "   1️⃣  检查系统依赖 (Git, Docker, Node.js)"
            echo "   2️⃣  读取部署配置文件 (deployment/config/deploy.conf)"
            echo "   3️⃣  生成统一环境变量 (前端、后端、数据库、搜索引擎)"
            echo "   4️⃣  检查并创建必要的目录结构"
            echo "   5️⃣  从备份恢复数据 (如果配置了备份版本)"
            echo "   6️⃣  部署搜索引擎 (MeiliSearch)"
            echo "   7️⃣  验证所有配置的完整性"
            echo ""
            echo -e "${YELLOW}🚀 开始执行配置流程...${NC}"
            echo "======================================================="
            "$SCRIPT_DIR/scripts/tools/simple-deploy.sh"
            echo "======================================================="
            echo -e "${GREEN}✅ 极简一键配置完成！${NC}"
            echo ""
            echo -e "${CYAN}📋 正在显示所有服务状态和访问地址...${NC}"
            echo ""
            "$SCRIPT_DIR/scripts/tools/show-all-services.sh"
            echo ""
            echo -n -e "${YELLOW}配置完成！按回车键返回主菜单...${NC}"
            read
            return 1
            ;;
        "2")
            # 检查当前环境模式
            local current_mode="dev"
            if [ -f "deployment/config/deploy.conf" ]; then
                current_mode=$(grep "^DEPLOY_MODE=" deployment/config/deploy.conf 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "dev")
            fi
            
            if [ "$current_mode" = "production" ]; then
                echo -e "${CYAN}🐳 开始启动生产环境...${NC}"
                echo -e "${RED}📋 生产部署流程:${NC}"
                echo "   1️⃣  检查 Docker 和 docker-compose"
                echo "   2️⃣  加载生产环境配置"
                echo "   3️⃣  构建生产 Docker 镜像"
                echo "   4️⃣  启动生产容器栈"
                echo "   5️⃣  等待服务就绪"
                echo "   6️⃣  验证生产服务状态"
                echo ""
                echo -e "${YELLOW}🚀 开始执行生产部署...${NC}"
                echo "======================================================="
                "$SCRIPT_DIR/scripts/production/deploy-production.sh"
                echo "======================================================="
                echo -e "${GREEN}✅ 生产环境部署完成！${NC}"
            else
                echo -e "${CYAN}🚀 开始启动开发环境...${NC}"
                echo -e "${BLUE}📋 开发启动流程:${NC}"
                echo "   1️⃣  加载统一环境配置 (deployment/config/deploy.conf)"
                echo "   2️⃣  检查Node.js版本和依赖"
                echo "   3️⃣  验证数据库连接 (PostgreSQL)"
                echo "   4️⃣  检查并启动搜索引擎 (MeiliSearch)"
                echo "   5️⃣  启动后端服务 (Strapi)"
                echo "   6️⃣  启动前端服务 (Next.js)"
                echo "   7️⃣  同步搜索索引数据"
                echo "   8️⃣  验证所有服务状态"
                echo ""
                echo -e "${YELLOW}🚀 开始执行启动流程...${NC}"
                echo "======================================================="
                "$SCRIPT_DIR/scripts/deployment/start-dev.sh"
                echo "======================================================="
                echo -e "${GREEN}✅ 开发环境启动完成！${NC}"
            fi
            
            echo ""
            echo -e "${CYAN}📋 正在显示所有服务状态和访问地址...${NC}"
            echo ""
            "$SCRIPT_DIR/scripts/tools/show-all-services.sh"
            echo ""
            echo -n -e "${YELLOW}启动完成！按回车键返回主菜单...${NC}"
            read
            return 1
            ;;
        "3")
            echo -e "${BLUE}🛑 停止所有服务...${NC}"
            echo ""
            "$SCRIPT_DIR/scripts/deployment/stop-dev.sh"
            echo ""
            echo -n -e "${YELLOW}停止完成！按回车键返回主菜单...${NC}"
            read
            return 1
            ;;
        "4")
            backup_menu
            ;;
        "5")
            echo -e "${BLUE}📊 检查系统状态...${NC}"
            echo ""
            "$SCRIPT_DIR/scripts/tools/status.sh"
            echo ""
            echo -n -e "${YELLOW}状态检查完成！按回车键返回主菜单...${NC}"
            read
            return 1
            ;;
        "6")
            echo -e "${BLUE}📊 执行代码质量检查...${NC}"
            echo ""
            "$SCRIPT_DIR/scripts/tools/pre-commit-check.sh"
            echo ""
            echo -n -e "${YELLOW}质量检查完成！按回车键返回主菜单...${NC}"
            read
            return 1
            ;;
        "7")
            echo -e "${BLUE}🔍 打开搜索引擎管理...${NC}"
            echo ""
            "$SCRIPT_DIR/scripts/search/manage-meilisearch.sh"
            echo ""
            echo -n -e "${YELLOW}搜索管理完成！按回车键返回主菜单...${NC}"
            read
            return 1
            ;;
        "8")
            echo -e "${BLUE}📧 邮件营销系统管理...${NC}"
            echo ""
            echo -e "${GREEN}✅ 邮件营销系统已集成到Strapi后台${NC}"
            echo -e "${CYAN}🌐 访问地址: http://localhost:1337/admin${NC}"
            echo -e "${YELLOW}💡 功能包括: SMTP配置、邮件模板、营销活动、订阅管理${NC}"
            echo ""
            echo -n -e "${YELLOW}邮件系统信息查看完成！按回车键返回主菜单...${NC}"
            read
            return 1
            ;;
        "9")
            echo -e "${BLUE}🌐 显示所有服务状态和访问地址...${NC}"
            echo ""
            "$SCRIPT_DIR/scripts/tools/show-all-services.sh"
            echo ""
            echo -n -e "${YELLOW}状态检查完成！按回车键返回主菜单...${NC}"
            read
            return 1
            ;;
        "h"|"H")
            show_help
            echo ""
            echo -n -e "${YELLOW}按回车键继续...${NC}"
            read
            return 1
            ;;
        "e"|"E")
            echo -e "${CYAN}🔄 环境切换${NC}"
            echo "========================="
            
            # 读取当前环境
            local current_mode="dev"
            if [ -f "deployment/config/deploy.conf" ]; then
                current_mode=$(grep "^DEPLOY_MODE=" deployment/config/deploy.conf 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "dev")
            fi
            
            if [ "$current_mode" = "production" ]; then
                echo -e "${YELLOW}当前环境: 生产环境${NC}"
                echo -n -e "${BLUE}是否切换到开发环境? (y/n): ${NC}"
                read -r switch_choice
                if [[ $switch_choice =~ ^[Yy]$ ]]; then
                    sed -i '' 's/DEPLOY_MODE=production/DEPLOY_MODE=dev/' deployment/config/deploy.conf
                    echo -e "${GREEN}✅ 已切换到开发环境${NC}"
                else
                    echo -e "${YELLOW}取消切换${NC}"
                fi
            else
                echo -e "${YELLOW}当前环境: 开发环境${NC}"
                echo -n -e "${RED}是否切换到生产环境? (y/n): ${NC}"
                read -r switch_choice
                if [[ $switch_choice =~ ^[Yy]$ ]]; then
                    sed -i '' 's/DEPLOY_MODE=dev/DEPLOY_MODE=production/' deployment/config/deploy.conf
                    echo -e "${RED}✅ 已切换到生产环境${NC}"
                    echo -e "${YELLOW}⚠️  请注意：生产环境将使用 Docker Compose 部署${NC}"
                else
                    echo -e "${YELLOW}取消切换${NC}"
                fi
            fi
            
            echo ""
            echo -n -e "${YELLOW}按回车键返回主菜单...${NC}"
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
    while true; do
        echo -e "\n${CYAN}📦 备份管理${NC}\n========================="
        echo "  1) 📋 查看可用备份"
        echo "  2) 🗄️ 创建完整备份"
        echo "  3) 🔄 从备份恢复"
        echo "  4) ✅ 验证备份文件"
        echo "  5) ⏰ 定时备份管理"
        echo -e "  0) 🔙 返回主菜单\n"
        echo -n -e "${YELLOW}请选择: ${NC}"
        read -r backup_choice
    
    case "$backup_choice" in
        "1")
            echo -e "${BLUE}📋 可用的备份版本：${NC}"
            echo ""
            echo -e "${YELLOW}解压后的备份目录：${NC}"
            find backups/ -maxdepth 1 -name "*_backup_*" -type d | sort -r
            echo ""
            echo -e "${YELLOW}压缩包备份：${NC}"
            ls -la backups/ | grep ".tar.gz" | sort -r
            echo ""
            echo -n -e "${YELLOW}按回车键继续...${NC}"
            read
            ;;
        "2")
            echo -e "${BLUE}🗄️ 创建完整备份...${NC}"
            echo ""
            # 检查备份脚本是否存在
            if [ -f "$SCRIPT_DIR/scripts/backup/backup-databases.sh" ]; then
                "$SCRIPT_DIR/scripts/backup/backup-databases.sh"
            else
                echo -e "${RED}❌ 备份脚本不存在: $SCRIPT_DIR/scripts/backup/backup-databases.sh${NC}"
                echo -e "${YELLOW}请确保项目已完整克隆或部署${NC}"
                echo ""
                echo -n -e "${YELLOW}按回车键继续...${NC}"
                read
                continue
            fi
            echo ""
            echo -n -e "${YELLOW}备份完成！按回车键继续...${NC}"
            read
            ;;
        "3")
            echo -e "${BLUE}🔄 使用配置文件中的备份版本恢复...${NC}"
            echo ""
            "$SCRIPT_DIR/scripts/tools/simple-deploy.sh"
            echo ""
            echo -n -e "${YELLOW}恢复完成！按回车键继续...${NC}"
            read
            ;;
        "4")
            echo -n -e "${YELLOW}请输入备份文件路径: ${NC}"
            read -r backup_file
            if [ -n "$backup_file" ]; then
                echo ""
                "$SCRIPT_DIR/scripts/backup/verify-backup.sh" "$backup_file"
                echo ""
                echo -n -e "${YELLOW}验证完成！按回车键继续...${NC}"
                read
            fi
            ;;
        "5")
            echo -e "${BLUE}⏰ 定时备份管理...${NC}"
            chmod +x "$SCRIPT_DIR/scripts/backup/manage-cron.sh"
            "$SCRIPT_DIR/scripts/backup/manage-cron.sh"
            echo -n -e "${YELLOW}定时备份管理完成！按回车键继续...${NC}"
            read
            ;;
        "0")
            return 1
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            echo -n -e "${YELLOW}按回车键继续...${NC}"
            read
            ;;
    esac
    done
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
                    find backups/ -maxdepth 1 -name "*_backup_*" -type d 2>/dev/null | sort -r
                    echo ""
                    echo -e "${YELLOW}压缩包备份：${NC}"
                    ls backups/*.tar.gz 2>/dev/null | sort -r
                    ;;
                "create")
                    if [ -f "$SCRIPT_DIR/scripts/backup/backup-databases.sh" ]; then
                        exec "$SCRIPT_DIR/scripts/backup/backup-databases.sh" "$@"
                    else
                        echo -e "${RED}❌ 备份脚本不存在: $SCRIPT_DIR/scripts/backup/backup-databases.sh${NC}"
                        echo -e "${YELLOW}请确保项目已完整克隆或部署${NC}"
                        exit 1
                    fi
                    ;;
                "restore")
                    echo -e "${BLUE}🔄 使用配置文件中的备份版本恢复...${NC}"
                    if [ -f "$SCRIPT_DIR/scripts/tools/simple-deploy.sh" ]; then
                        exec "$SCRIPT_DIR/scripts/tools/simple-deploy.sh"
                    else
                        echo -e "${RED}❌ 恢复脚本不存在: $SCRIPT_DIR/scripts/tools/simple-deploy.sh${NC}"
                        echo -e "${YELLOW}请确保项目已完整克隆或部署${NC}"
                        exit 1
                    fi
                    ;;
                "verify")
                    if [ $# -eq 0 ]; then
                        echo -e "${RED}❌ 请提供备份文件路径${NC}"
                        exit 1
                    fi
                    if [ -f "$SCRIPT_DIR/scripts/backup/verify-backup.sh" ]; then
                        exec "$SCRIPT_DIR/scripts/backup/verify-backup.sh" "$@"
                    else
                        echo -e "${RED}❌ 验证脚本不存在: $SCRIPT_DIR/scripts/backup/verify-backup.sh${NC}"
                        echo -e "${YELLOW}请确保项目已完整克隆或部署${NC}"
                        exit 1
                    fi
                    ;;
                "cron"|"schedule")
                    if [ -f "$SCRIPT_DIR/scripts/backup/manage-cron.sh" ]; then
                        chmod +x "$SCRIPT_DIR/scripts/backup/manage-cron.sh"
                        exec "$SCRIPT_DIR/scripts/backup/manage-cron.sh" "$@"
                    else
                        echo -e "${RED}❌ 定时备份脚本不存在: $SCRIPT_DIR/scripts/backup/manage-cron.sh${NC}"
                        echo -e "${YELLOW}请确保项目已完整克隆或部署${NC}"
                        exit 1
                    fi
                    ;;
                "scheduled")
                    if [ -f "$SCRIPT_DIR/scripts/backup/scheduled-backup.sh" ]; then
                        chmod +x "$SCRIPT_DIR/scripts/backup/scheduled-backup.sh"
                        exec "$SCRIPT_DIR/scripts/backup/scheduled-backup.sh" "$@"
                    else
                        echo -e "${RED}❌ 计划备份脚本不存在: $SCRIPT_DIR/scripts/backup/scheduled-backup.sh${NC}"
                        echo -e "${YELLOW}请确保项目已完整克隆或部署${NC}"
                        exit 1
                    fi
                    ;;
                *)
                    echo -e "${RED}❌ 未知的备份操作: $action${NC}"
                    echo "可用操作: list, create, restore, verify, cron, scheduled"
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
                "services")
                    exec "$SCRIPT_DIR/scripts/tools/show-all-services.sh" "$@"
                    ;;
                *)
                    echo -e "${RED}❌ 未知的工具操作: $action${NC}"
                    echo "可用操作: status, check, services"
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
                "check"|"status")
                    echo -e "${GREEN}✅ 邮件营销系统已集成到Strapi后台${NC}"
                    echo -e "${CYAN}🌐 访问地址: http://localhost:1337/admin${NC}"
                    echo -e "${YELLOW}💡 功能包括: SMTP配置、邮件模板、营销活动、订阅管理${NC}"
                    ;;
                "admin"|"manage")
                    local domain="localhost"
                    local backend_port="1337"
                    local protocol="http"
                    if [ -f "deployment/config/deploy.conf" ]; then
                        domain=$(grep "^DOMAIN=" deployment/config/deploy.conf 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "localhost")
                        backend_port=$(grep "^BACKEND_PORT=" deployment/config/deploy.conf 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "1337")
                        deploy_mode=$(grep "^DEPLOY_MODE=" deployment/config/deploy.conf 2>/dev/null | cut -d'=' -f2 | cut -d'#' -f1 | xargs || echo "dev")
                        if [ "$deploy_mode" = "production" ]; then
                            protocol="https"
                        fi
                    fi
                    local admin_url="${protocol}://${domain}:${backend_port}/admin"
                    echo -e "${BLUE}🚀 打开邮件营销系统管理界面...${NC}"
                    echo -e "${CYAN}访问地址: ${admin_url}${NC}"
                    if command -v open > /dev/null; then
                        open "$admin_url"
                    elif command -v xdg-open > /dev/null; then
                        xdg-open "$admin_url"
                    fi
                    ;;
                *)
                    echo -e "${RED}❌ 未知的邮件操作: $action${NC}"
                    echo "可用操作: check, status, admin, manage"
                    exit 1
                    ;;
            esac
            ;;
        *)
            echo -e "${RED}❌ 未知的类别: $category${NC}"
            echo ""
                echo -e "${BLUE}可用类别:${NC}"
    echo "  deploy  - 部署管理 (config, start, stop)"
    echo "  backup  - 备份管理 (list, create, restore, verify, cron, scheduled)"
    echo "  tools   - 开发工具 (status, check, services)"
    echo "  search  - 搜索引擎 (manage, check)"
    echo "  email   - 邮件营销系统 (check, status, admin, manage)"
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