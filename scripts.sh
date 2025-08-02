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

# 加载菜单显示功能
source "$SCRIPT_DIR/scripts/tools/menu-display.sh"

# show_menu函数已移至 scripts/tools/menu-display.sh

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

# 显示环境状态
show_environment_status() {
    local env_info=$(detect_current_environment)
    local env_type="${env_info%%:*}"
    local temp="${env_info#*:}"
    local env_status="${temp%%:*}"
    local config_type="${temp##*:}"
    
    local env_icon="🔧"
    local env_name="开发环境"
    local status_icon="🟡"
    local status_name="未知"
    
    case "$env_type" in
        "production")
            env_icon="🚀"
            env_name="生产环境"
            ;;
        "development")
            env_icon="🔧"  
            env_name="开发环境"
            ;;
    esac
    
    case "$env_status" in
        "healthy")
            status_icon="🟢"
            status_name="正常"
            ;;
        "warning")
            status_icon="🟡"
            status_name="警告"
            ;;
        "error")
            status_icon="🔴"
            status_name="异常"
            ;;
    esac
    
    echo "📍 当前环境: $env_icon $env_name"
    echo "📊 环境状态: $status_icon $status_name"
    echo "⚙️ 配置类型: $config_type"
    echo "📁 项目路径: $(pwd)"
    echo "⏰ 最后更新: $(date '+%Y-%m-%d %H:%M:%S')"
}

# 环境切换功能
switch_environment() {
    local current_env=$(detect_current_environment | cut -d':' -f1)
    
    echo -e "${CYAN}🔄 环境切换工具${NC}"
    echo "==============="
    echo "📍 当前环境: $current_env"
    echo ""
    echo "选择目标环境:"
    echo "  1) 🔧 开发环境 (localhost)"
    echo "  2) 🚀 生产环境 (需要域名)"
    echo "  0) 🔙 返回主菜单"
    echo ""
    read -p "请选择 [0-2]: " env_choice
    
    case $env_choice in
        1)
            echo ""
            echo -e "${BLUE}🔧 切换到开发环境...${NC}"
            if [ -f "$SCRIPT_DIR/deployment/configure-unified-env.sh" ]; then
                "$SCRIPT_DIR/deployment/configure-unified-env.sh" dev
            fi
            
            # 清理环境标记
            rm -f .production .development
            echo "development-$(date +%Y%m%d)" > .development
            
            echo -e "${GREEN}✅ 已切换到开发环境${NC}"
            ;;
        2)
            echo ""
            echo "🌐 请输入生产环境域名:"
            read -p "网站域名: " domain
            read -p "邮件域名 (可选): " mail_domain
            
            if [ -z "$domain" ]; then
                echo -e "${RED}❌ 域名不能为空${NC}"
                return 1
            fi
            
            echo ""
            echo -e "${BLUE}🚀 切换到生产环境...${NC}"
            
            if [ -n "$mail_domain" ]; then
                "$SCRIPT_DIR/deployment/configure-unified-env.sh" integrated "$domain" "$mail_domain"
            else
                "$SCRIPT_DIR/deployment/configure-unified-env.sh" integrated "$domain"
            fi
            
            # 清理环境标记
            rm -f .production .development
            echo "production-$(date +%Y%m%d)" > .production
            
            echo -e "${GREEN}✅ 已切换到生产环境${NC}"
            ;;
        0)
            return 1
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            return 1
            ;;
    esac
    
    echo ""
    read -p "按回车键返回主菜单..."
}

# 显示详细环境信息
show_detailed_environment_info() {
    echo -e "${CYAN}📋 详细环境信息${NC}"
    echo "================"
    echo ""
    
    # 基本环境信息
    show_environment_status
    echo ""
    
    # 系统信息
    echo -e "${CYAN}💻 系统信息:${NC}"
    echo "   操作系统: $(uname -s)"
    echo "   系统版本: $(uname -r)"
    echo "   架构: $(uname -m)"
    echo "   用户: $(whoami)"
    echo ""
    
    # Docker信息
    echo -e "${CYAN}🐳 Docker信息:${NC}"
    if command -v docker &>/dev/null; then
        echo "   Docker版本: $(docker --version 2>/dev/null | cut -d' ' -f3 | cut -d',' -f1)"
        if docker info &>/dev/null; then
            echo "   Docker状态: 运行中"
            local containers=$(docker ps -q | wc -l | tr -d ' ')
            echo "   运行容器: $containers 个"
        else
            echo "   Docker状态: 未运行"
        fi
    else
        echo "   Docker: 未安装"
    fi
    echo ""
    
    # 配置文件信息
    echo -e "${CYAN}⚙️ 配置文件:${NC}"
    if [ -f "frontend/.env.local" ]; then
        local frontend_size=$(wc -l < "frontend/.env.local" | tr -d ' ')
        echo "   前端配置: ✅ 存在 ($frontend_size 行)"
    else
        echo "   前端配置: ❌ 不存在"
    fi
    
    if [ -f "backend/.env" ]; then
        local backend_size=$(wc -l < "backend/.env" | tr -d ' ')
        echo "   后端配置: ✅ 存在 ($backend_size 行)"
    else
        echo "   后端配置: ❌ 不存在"
    fi
    
    echo ""
    read -p "按回车键返回主菜单..."
}

# 配置管理菜单
show_configuration_menu() {
    local current_env=$(detect_current_environment | cut -d':' -f1)
    
    echo -e "${CYAN}⚙️ 配置管理工具${NC}"
    echo "==============="
    echo "📍 当前环境: $current_env"
    echo ""
    echo "配置操作:"
    echo "  1) 📋 查看当前配置"
    echo "  2) ⚙️ 生成新配置"
    echo "  3) 🔍 验证配置文件"
    echo "  4) 💾 备份配置文件"
    echo "  5) 🔄 恢复配置文件"
    echo "  0) 🔙 返回主菜单"
    echo ""
    read -p "请选择 [0-5]: " config_choice
    
    case $config_choice in
        1)
            show_current_configuration
            ;;
        2)
            if [ "$current_env" = "production" ]; then
                echo "请输入生产环境信息:"
                read -p "域名: " domain
                read -p "邮件域名: " mail_domain
                if [ -n "$domain" ]; then
                    "$SCRIPT_DIR/deployment/configure-unified-env.sh" integrated "$domain" "$mail_domain"
                fi
            else
                "$SCRIPT_DIR/deployment/configure-unified-env.sh" dev
            fi
            ;;
        3)
            validate_current_configuration
            ;;
        4)
            backup_configuration_files
            ;;
        5)
            restore_configuration_files
            ;;
        0)
            return 1
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            ;;
    esac
    
    echo ""
    read -p "按回车键返回配置菜单..."
    show_configuration_menu
}

# 显示当前配置
show_current_configuration() {
    echo -e "${CYAN}📋 当前配置信息${NC}"
    echo "==============="
    echo ""
    
    if [ -f "frontend/.env.local" ]; then
        echo -e "${BLUE}📁 前端配置:${NC}"
        grep -E "^[A-Z]" "frontend/.env.local" | head -10 | while read line; do
            echo "   $line"
        done
        echo ""
    fi
    
    if [ -f "backend/.env" ]; then
        echo -e "${BLUE}📁 后端配置:${NC}"
        grep -E "^[A-Z]" "backend/.env" | grep -v "PASSWORD\|SECRET\|KEY" | head -10 | while read line; do
            echo "   $line"
        done
        echo "   ... (敏感信息已隐藏)"
        echo ""
    fi
}

# 验证当前配置
validate_current_configuration() {
    echo -e "${CYAN}🔍 验证配置文件${NC}"
    echo "==============="
    echo ""
    
    local errors=()
    
    # 检查前端配置
    if [ ! -f "frontend/.env.local" ]; then
        errors+=("前端配置文件不存在")
    fi
    
    # 检查后端配置
    if [ ! -f "backend/.env" ]; then
        errors+=("后端配置文件不存在")
    fi
    
    if [ ${#errors[@]} -eq 0 ]; then
        echo -e "${GREEN}✅ 配置文件验证通过${NC}"
    else
        echo -e "${RED}❌ 发现问题:${NC}"
        for error in "${errors[@]}"; do
            echo "   • $error"
        done
    fi
}

# 备份配置文件
backup_configuration_files() {
    echo -e "${CYAN}💾 备份配置文件${NC}"
    echo "==============="
    
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_count=0
    
    if [ -f "frontend/.env.local" ]; then
        cp "frontend/.env.local" "frontend/.env.local.backup.$timestamp"
        echo "✅ 前端配置已备份"
        backup_count=$((backup_count + 1))
    fi
    
    if [ -f "backend/.env" ]; then
        cp "backend/.env" "backend/.env.backup.$timestamp"
        echo "✅ 后端配置已备份"
        backup_count=$((backup_count + 1))
    fi
    
    echo "📊 共备份 $backup_count 个配置文件"
}

# 恢复配置文件
restore_configuration_files() {
    echo -e "${CYAN}🔄 恢复配置文件${NC}"
    echo "==============="
    echo ""
    
    # 列出可用的备份文件
    local frontend_backups=(frontend/.env.local.backup.*)
    local backend_backups=(backend/.env.backup.*)
    
    if [ ${#frontend_backups[@]} -gt 0 ] && [ -f "${frontend_backups[0]}" ]; then
        echo "前端配置备份:"
        for i in "${!frontend_backups[@]}"; do
            echo "  $((i+1))) $(basename "${frontend_backups[i]}")"
        done
        echo ""
    fi
    
    echo "功能开发中..."
}

# 故障排查菜单
show_troubleshooting_menu() {
    echo -e "${CYAN}🔧 故障排查工具${NC}"
    echo "==============="
    echo ""
    echo "排查选项:"
    echo "  1) 🔍 系统诊断"
    echo "  2) 🐳 Docker诊断"
    echo "  3) 🌐 网络诊断"
    echo "  4) 📁 文件权限检查"
    echo "  5) 🔧 修复常见问题"
    echo "  0) 🔙 返回主菜单"
    echo ""
    read -p "请选择 [0-5]: " trouble_choice
    
    case $trouble_choice in
        1)
            system_diagnosis
            ;;
        2)
            docker_diagnosis
            ;;
        3)
            network_diagnosis
            ;;
        4)
            file_permission_check
            ;;
        5)
            fix_common_issues
            ;;
        0)
            return 1
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            ;;
    esac
    
    echo ""
    read -p "按回车键返回故障排查菜单..."
    show_troubleshooting_menu
}

# 系统诊断
system_diagnosis() {
    echo -e "${CYAN}🔍 系统诊断${NC}"
    echo "=========="
    echo ""
    
    echo "💻 系统信息:"
    echo "   操作系统: $(uname -s)"
    echo "   内核版本: $(uname -r)"
    echo "   架构: $(uname -m)"
    echo ""
    
    echo "💾 磁盘空间:"
    df -h . | tail -1 | while read filesystem size used avail capacity mounted; do
        echo "   可用空间: $avail / $size ($capacity 已使用)"
    done
    echo ""
    
    echo "🔧 必需工具:"
    local tools=("git" "docker" "curl" "node" "npm")
    for tool in "${tools[@]}"; do
        if command -v "$tool" &>/dev/null; then
            echo "   ✅ $tool"
        else
            echo "   ❌ $tool (未安装)"
        fi
    done
}

# Docker诊断
docker_diagnosis() {
    echo -e "${CYAN}🐳 Docker诊断${NC}"
    echo "============"
    echo ""
    
    if command -v docker &>/dev/null; then
        echo "✅ Docker已安装"
        echo "   版本: $(docker --version | cut -d' ' -f3 | cut -d',' -f1)"
        
        if docker info &>/dev/null; then
            echo "✅ Docker服务运行中"
            echo "   运行容器: $(docker ps -q | wc -l | tr -d ' ') 个"
            echo "   总容器: $(docker ps -aq | wc -l | tr -d ' ') 个"
        else
            echo "❌ Docker服务未运行"
        fi
    else
        echo "❌ Docker未安装"
    fi
}

# 网络诊断
network_diagnosis() {
    echo -e "${CYAN}🌐 网络诊断${NC}"
    echo "============"
    echo ""
    
    echo "🔗 网络连接测试:"
    if ping -c 1 google.com &>/dev/null; then
        echo "   ✅ 互联网连接正常"
    else
        echo "   ❌ 互联网连接异常"
    fi
    
    echo ""
    echo "📡 端口检查:"
    local ports=("80" "443" "1337" "3000" "5432")
    for port in "${ports[@]}"; do
        if netstat -tuln 2>/dev/null | grep -q ":$port "; then
            echo "   🟡 端口 $port 已被占用"
        else
            echo "   ✅ 端口 $port 可用"
        fi
    done
}

# 文件权限检查
file_permission_check() {
    echo -e "${CYAN}📁 文件权限检查${NC}"
    echo "==============="
    echo ""
    
    local files=("scripts.sh" "frontend/.env.local" "backend/.env")
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            local perms=$(ls -l "$file" | cut -d' ' -f1)
            echo "   📄 $file: $perms"
        else
            echo "   ❌ $file: 不存在"
        fi
    done
}

# 修复常见问题
fix_common_issues() {
    echo -e "${CYAN}🔧 修复常见问题${NC}"
    echo "==============="
    echo ""
    
    echo "🔧 修复scripts.sh权限..."
    chmod +x scripts.sh && echo "✅ scripts.sh权限已修复" || echo "❌ 权限修复失败"
    
    echo ""
    echo "🔧 修复production脚本权限..."
    find scripts/production -name "*.sh" -exec chmod +x {} \; && echo "✅ production脚本权限已修复" || echo "❌ 权限修复失败"
    
    echo ""
    echo "🔧 检查配置文件权限..."
    if [ -f "frontend/.env.local" ]; then
        chmod 600 "frontend/.env.local" && echo "✅ 前端配置权限已设置"
    fi
    
    if [ -f "backend/.env" ]; then
        chmod 600 "backend/.env" && echo "✅ 后端配置权限已设置"
    fi
}

# 维护工具菜单
show_maintenance_menu() {
    echo -e "${CYAN}🛠️ 生产维护工具${NC}"
    echo "================"
    echo ""
    echo "维护选项:"
    echo "  1) 💾 创建完整备份"
    echo "  2) 📋 查看备份列表"
    echo "  3) 🔄 从备份恢复"
    echo "  4) 🧹 清理系统资源"
    echo "  5) 🔄 更新系统"
    echo "  0) 🔙 返回主菜单"
    echo ""
    read -p "请选择 [0-5]: " maint_choice
    
    case $maint_choice in
        1)
            echo -e "${BLUE}💾 创建完整备份...${NC}"
            "$SCRIPT_DIR/scripts/production/maintain-production.sh" backup
            ;;
        2)
            echo -e "${BLUE}📋 查看备份列表...${NC}"
            "$SCRIPT_DIR/scripts/production/maintain-production.sh" list
            ;;
        3)
            echo -e "${BLUE}🔄 从备份恢复...${NC}"
            echo "请输入备份文件路径:"
            read -p "备份文件: " backup_file
            if [ -n "$backup_file" ]; then
                "$SCRIPT_DIR/scripts/production/maintain-production.sh" restore "$backup_file"
            fi
            ;;
        4)
            echo -e "${BLUE}🧹 清理系统资源...${NC}"
            "$SCRIPT_DIR/scripts/production/maintain-production.sh" cleanup
            ;;
        5)
            echo -e "${BLUE}🔄 更新系统...${NC}"
            "$SCRIPT_DIR/scripts/production/maintain-production.sh" update
            ;;
        0)
            return 1
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            ;;
    esac
    
    echo ""
    read -p "按回车键返回维护菜单..."
    show_maintenance_menu
}

# 智能命令执行 - 环境自适应
execute_choice() {
    local choice=$1
    local env_info=$(detect_current_environment)
    local env_type="${env_info%%:*}"
    local env_status="${env_info#*:}"
    env_status="${env_status%%:*}"
    
    echo ""
    echo -e "${CYAN}🎯 环境: $env_type | 选择: $choice${NC}"
    echo ""
    
    case $choice in
        1) # 全自动部署
            if [ "$env_type" = "production" ]; then
                echo -e "${GREEN}🚀 生产环境全自动部署...${NC}"
                exec "$SCRIPT_DIR/scripts/production/auto-deploy.sh"
            else
                echo -e "${GREEN}🚀 启动完整开发环境...${NC}"
                exec "$SCRIPT_DIR/scripts/deployment/start-dev.sh"
            fi
            ;;
        2) # 启动前端
            if [ "$env_type" = "production" ]; then
                echo -e "${GREEN}🌐 启动生产前端服务...${NC}"
                exec "$SCRIPT_DIR/scripts/production/manage-services.sh" start frontend
            else
                echo -e "${GREEN}🌐 启动前端服务...${NC}"
                exec "$SCRIPT_DIR/scripts/deployment/start-frontend.sh"
            fi
            ;;
        3) # 启动后端
            if [ "$env_type" = "production" ]; then
                echo -e "${GREEN}⚙️ 启动生产后端服务...${NC}"
                exec "$SCRIPT_DIR/scripts/production/manage-services.sh" start backend
            else
                echo -e "${GREEN}⚙️ 启动后端服务...${NC}"
                exec "$SCRIPT_DIR/scripts/deployment/start-backend.sh"
            fi
            ;;
        4) # 停止服务
            if [ "$env_type" = "production" ]; then
                echo -e "${YELLOW}🛑 停止生产环境...${NC}"
                exec "$SCRIPT_DIR/scripts/production/manage-services.sh" stop
            else
                echo -e "${YELLOW}🛑 停止所有服务...${NC}"
                exec "$SCRIPT_DIR/scripts/deployment/stop-dev.sh"
            fi
            ;;
        5) # 重启服务
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}🔄 重启生产服务...${NC}"
                exec "$SCRIPT_DIR/scripts/production/manage-services.sh" restart
            else
                echo -e "${BLUE}🔄 重启开发服务...${NC}"
                exec "$SCRIPT_DIR/scripts/deployment/stop-dev.sh" && exec "$SCRIPT_DIR/scripts/deployment/start-dev.sh"
            fi
            ;;
        6) # 检查状态
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}📈 检查生产环境状态...${NC}"
                exec "$SCRIPT_DIR/scripts/production/manage-services.sh" status
            else
                echo -e "${BLUE}📊 检查系统状态...${NC}"
                exec "$SCRIPT_DIR/scripts/tools/status.sh"
            fi
            ;;
        7) # 检查数据库
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}🗄️ 检查生产数据库...${NC}"
                exec "$SCRIPT_DIR/scripts/production/manage-services.sh" health
            else
                echo -e "${BLUE}🗄️ 检查数据库连接...${NC}"
                exec "$SCRIPT_DIR/scripts/database/check-database.sh"
            fi
            ;;
        8) # 检查搜索引擎
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}🔍 检查生产搜索引擎...${NC}"
                "$SCRIPT_DIR/scripts/production/monitor-production.sh" performance
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            else
                echo -e "${BLUE}🔍 检查搜索引擎状态...${NC}"
                exec "$SCRIPT_DIR/scripts/search/check-meilisearch.sh"
            fi
            ;;
        9) # 部署/管理搜索引擎
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}🔍 生产搜索引擎管理...${NC}"
                echo "搜索引擎应通过生产部署脚本管理"
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            else
                echo -e "${GREEN}🔍 部署MeiliSearch...${NC}"
                exec "$SCRIPT_DIR/scripts/search/deploy-meilisearch.sh"
            fi
            ;;
        10) # 查看日志
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}📋 查看生产日志...${NC}"
                exec "$SCRIPT_DIR/scripts/production/monitor-production.sh" logs
            else
                echo -e "${YELLOW}🔄 重启MeiliSearch...${NC}"
                echo "重启搜索引擎服务..."
                docker restart meilisearch 2>/dev/null && echo -e "${GREEN}✅ MeiliSearch已重启${NC}" || echo -e "${RED}❌ 重启失败${NC}"
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            fi
            ;;
        11) # 实时监控
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}📊 启动实时监控...${NC}"
                exec "$SCRIPT_DIR/scripts/production/monitor-production.sh" monitor
            else
                echo -e "${BLUE}📋 查看MeiliSearch日志...${NC}"
                echo "按 Ctrl+C 退出日志查看"
                echo ""
                sleep 2
                docker logs meilisearch -f 2>/dev/null || echo -e "${RED}❌ MeiliSearch容器未运行${NC}"
                return 1
            fi
            ;;
        12) # 搜索管理/安装环境
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}🔧 安装基础环境...${NC}"
                exec "$SCRIPT_DIR/scripts/production/install-environment.sh"
            else
                echo -e "${BLUE}🔧 启动搜索管理工具...${NC}"
                exec "$SCRIPT_DIR/scripts/search/manage-meilisearch.sh"
            fi
            ;;
        13) # 重建索引/项目管理
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}📥 更新项目代码...${NC}"
                exec "$SCRIPT_DIR/scripts/production/manage-project.sh" update
            else
                echo -e "${GREEN}🔄 快速重建搜索索引...${NC}"
                echo "启用智能索引重建流程..."
                echo ""
                "$SCRIPT_DIR/scripts/search/quick-reindex.sh"
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            fi
            ;;
        14) # 配置管理
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}⚙️ 生成生产配置...${NC}"
                echo "请输入域名信息："
                read -p "网站域名: " domain
                read -p "邮件域名 (可选): " mail_domain
                if [ -n "$domain" ]; then
                    if [ -n "$mail_domain" ]; then
                        exec "$SCRIPT_DIR/../deployment/configure-unified-env.sh" integrated "$domain" "$mail_domain"
                    else
                        exec "$SCRIPT_DIR/../deployment/configure-unified-env.sh" integrated "$domain"
                    fi
                else
                    echo -e "${RED}❌ 域名不能为空${NC}"
                    read -p "按回车键返回主菜单..."
                    return 1
                fi
            else
                echo -e "${PURPLE}📦 完整系统备份...${NC}"
                exec "$SCRIPT_DIR/scripts/backup/backup-strapi.sh"
            fi
            ;;
        15) # 部署检查/清理
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}🔍 验证配置文件...${NC}"
                "$SCRIPT_DIR/scripts/production/deploy-production.sh" check
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            else
                echo -e "${YELLOW}🧹 清理备份临时文件...${NC}"
                exec "$SCRIPT_DIR/scripts/backup/cleanup-backup-temp.sh"
            fi
            ;;
        16) # 部署/BillionMail
            if [ "$env_type" = "production" ]; then
                echo -e "${GREEN}🚀 执行生产部署...${NC}"
                exec "$SCRIPT_DIR/scripts/production/deploy-production.sh" unified
            else
                echo -e "${BLUE}🚀 BillionMail已部署完成，直接使用真实系统...${NC}"
                echo -e "${GREEN}✅ BillionMail管理界面: ${BILLIONMAIL_ADMIN_URL}${NC}"
                echo -e "${GREEN}✅ WebMail界面: ${BILLIONMAIL_WEBMAIL_URL}${NC}"
                echo -e "${GREEN}✅ 默认账户: billion / billion${NC}"
                echo ""
                echo "💡 提示："
                echo "  • 管理界面: 用于系统管理、用户创建、邮件列表管理"
                echo "  • WebMail界面: 需要先在管理界面创建邮箱账户才能登录"
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            fi
            ;;
        17) # 维护工具/BillionMail状态
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}🛠️ 生产维护工具...${NC}"
                show_maintenance_menu
                return 1
            else
                echo -e "${BLUE}🔍 检查BillionMail服务状态...${NC}"
                exec "$SCRIPT_DIR/scripts/billionmail/check-billionmail.sh"
            fi
            ;;
        18) # 备份/BillionMail管理
            if [ "$env_type" = "production" ]; then
                echo -e "${PURPLE}💾 生产环境备份...${NC}"
                exec "$SCRIPT_DIR/scripts/production/maintain-production.sh" backup
            else
                echo -e "${YELLOW}🌐 打开BillionMail管理界面...${NC}"
                echo ""
                echo -e "${BLUE}🌐 BillionMail真实系统管理界面...${NC}"
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
                read -p "按回车键返回主菜单..."
                return 1
            fi
            ;;
        19) # 完整备份/字段配置
            if [ "$env_type" = "production" ]; then
                echo -e "${PURPLE}📦 完整环境备份...${NC}"
                "$SCRIPT_DIR/scripts/production/maintain-production.sh" backup
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            else
                echo -e "${BLUE}🔧 修复字段描述配置...${NC}"
                exec "$SCRIPT_DIR/scripts/tools/configure-field-descriptions.sh"
            fi
            ;;
        20) # 恢复/环境配置
            if [ "$env_type" = "production" ]; then
                echo -e "${YELLOW}🔄 从备份恢复...${NC}"
                echo ""
                echo "请指定备份文件路径："
                read -p "备份文件: " backup_file
                if [ -n "$backup_file" ] && [ -f "$backup_file" ]; then
                    exec "$SCRIPT_DIR/scripts/production/maintain-production.sh" restore "$backup_file"
                else
                    echo -e "${RED}❌ 备份文件不存在或未指定${NC}"
                    echo ""
                    read -p "按回车键返回主菜单..."
                    return 1
                fi
            else
                echo -e "${BLUE}🔧 自动配置环境变量...${NC}"
                exec "$SCRIPT_DIR/scripts/tools/setup-env.sh"
            fi
            ;;
        21) # 清理/整合备份
            if [ "$env_type" = "production" ]; then
                echo -e "${YELLOW}🧹 清理生产资源...${NC}"
                exec "$SCRIPT_DIR/scripts/production/maintain-production.sh" cleanup
            else
                echo -e "${BLUE}💾 整合环境数据库备份...${NC}"
                if [ -f "$SCRIPT_DIR/scripts/database/backup-integrated.sh" ]; then
                    exec "$SCRIPT_DIR/scripts/database/backup-integrated.sh"
                else
                    echo -e "${RED}❌ 整合备份脚本不存在${NC}"
                    read -p "按回车键返回主菜单..."
                    return 1
                fi
            fi
            ;;
        22) # 验证/整合恢复
            if [ "$env_type" = "production" ]; then
                echo -e "${PURPLE}🔍 备份文件列表...${NC}"
                "$SCRIPT_DIR/scripts/production/maintain-production.sh" list
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            else
                echo -e "${YELLOW}🔄 整合环境数据库还原...${NC}"
                echo ""
                echo -e "${YELLOW}⚠️ 还原操作将覆盖现有数据！${NC}"
                echo "请指定备份文件路径："
                read -p "备份文件: " backup_file
                if [ -n "$backup_file" ] && [ -f "$backup_file" ]; then
                    if [ -f "$SCRIPT_DIR/scripts/database/restore-integrated.sh" ]; then
                        exec "$SCRIPT_DIR/scripts/database/restore-integrated.sh" "$backup_file"
                    else
                        echo -e "${RED}❌ 整合恢复脚本不存在${NC}"
                        read -p "按回车键返回主菜单..."
                        return 1
                    fi
                else
                    echo -e "${RED}❌ 备份文件不存在或未指定${NC}"
                    echo ""
                    read -p "按回车键返回主菜单..."
                    return 1
                fi
            fi
            ;;
        23) # 更新/整合检查
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}🔄 更新生产系统...${NC}"
                exec "$SCRIPT_DIR/scripts/production/maintain-production.sh" update
            else
                echo -e "${BLUE}🔍 整合环境状态检查...${NC}"
                if [ -f "$SCRIPT_DIR/scripts/database/check-integrated.sh" ]; then
                    exec "$SCRIPT_DIR/scripts/database/check-integrated.sh"
                else
                    echo -e "${RED}❌ 整合检查脚本不存在${NC}"
                    read -p "按回车键返回主菜单..."
                    return 1
                fi
            fi
            ;;
        24) # 告警/验证备份
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}🚨 执行告警检查...${NC}"
                "$SCRIPT_DIR/scripts/production/monitor-production.sh" alerts
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            else
                echo -e "${PURPLE}🔍 验证整合备份文件...${NC}"
                echo ""
                echo "请指定要验证的备份文件路径："
                read -p "备份文件: " backup_file
                if [ -n "$backup_file" ] && [ -f "$backup_file" ]; then
                    if [ -f "$SCRIPT_DIR/scripts/database/verify-integrated-backup.sh" ]; then
                        exec "$SCRIPT_DIR/scripts/database/verify-integrated-backup.sh" "$backup_file"
                    else
                        echo -e "${RED}❌ 验证脚本不存在${NC}"
                        read -p "按回车键返回主菜单..."
                        return 1
                    fi
                else
                    echo -e "${RED}❌ 备份文件不存在或未指定${NC}"
                    echo ""
                    read -p "按回车键返回主菜单..."
                    return 1
                fi
            fi
            ;;
        "e"|"E") # 环境切换
            switch_environment
            return 1
            ;;
        "env"|"ENV") # 查看环境
            show_detailed_environment_info
            return 1
            ;;
        "c"|"C") # 配置管理
            show_configuration_menu
            return 1
            ;;
        "t"|"T") # 故障排查
            show_troubleshooting_menu
            return 1
            ;;
        "u"|"U") # 项目更新
            if [ "$env_type" = "production" ]; then
                echo -e "${BLUE}📥 更新生产项目...${NC}"
                exec "$SCRIPT_DIR/scripts/production/manage-project.sh" update
            else
                echo -e "${BLUE}📥 更新开发项目...${NC}"
                git pull
                echo ""
                read -p "按回车键返回主菜单..."
                return 1
            fi
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
            echo "请输入 0-24 之间的数字，或字母命令 (e/env/c/t/u/h)"
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
            echo -e "${GREEN}✅ 管理界面: ${BILLIONMAIL_ADMIN_URL}${NC}"
            echo -e "${GREEN}✅ WebMail: ${BILLIONMAIL_WEBMAIL_URL}${NC}"
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
                    echo -e "${GREEN}📍 访问地址: ${BILLIONMAIL_ADMIN_URL}${NC}"
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
                        open "${BILLIONMAIL_ADMIN_URL}"
                    elif command -v xdg-open > /dev/null; then
                        echo "🚀 正在打开浏览器..."
                        xdg-open "${BILLIONMAIL_ADMIN_URL}"
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
                    echo "  📍 访问地址: ${BILLIONMAIL_ADMIN_URL}"
                    echo "  📧 WebMail: ${BILLIONMAIL_WEBMAIL_URL}"  
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
        "integrated")
            case "$action" in
                "backup")
                    echo -e "${BLUE}💾 整合环境数据库备份...${NC}"
                    exec "$SCRIPT_DIR/scripts/database/backup-integrated.sh"
                    ;;
                "restore")
                    if [ -z "$3" ]; then
                        echo -e "${RED}❌ 请指定备份文件${NC}"
                        echo "用法: $0 integrated restore <backup-file.tar.gz>"
                        echo "示例: $0 integrated restore backups/integrated/integrated_backup_20250130_140000.tar.gz"
                        exit 1
                    else
                        echo -e "${YELLOW}🔄 整合环境数据库还原...${NC}"
                        exec "$SCRIPT_DIR/scripts/database/restore-integrated.sh" "$3"
                    fi
                    ;;
                "check")
                    echo -e "${BLUE}🔍 整合环境状态检查...${NC}"
                    exec "$SCRIPT_DIR/scripts/database/check-integrated.sh"
                    ;;
                "verify")
                    if [ -z "$3" ]; then
                        echo -e "${RED}❌ 请指定备份文件${NC}"
                        echo "用法: $0 integrated verify <backup-file.tar.gz>"
                        echo "示例: $0 integrated verify backups/integrated/integrated_backup_20250130_140000.tar.gz"
                        exit 1
                    else
                        echo -e "${PURPLE}🔍 验证整合备份文件...${NC}"
                        exec "$SCRIPT_DIR/scripts/database/verify-integrated-backup.sh" "$3"
                    fi
                    ;;
                *)
                    echo -e "${BLUE}🔄 AI变现之路 + BillionMail - 整合部署管理工具${NC}"
                    echo "========================================================="
                    echo "可用命令:"
                    echo "  backup                    - 整合环境数据库备份 (AI变现之路 + BillionMail)"
                    echo "  restore <backup-file>     - 整合环境数据库还原"
                    echo "  check                     - 整合环境状态检查"
                    echo "  verify <backup-file>      - 验证整合备份文件"
                    echo ""
                    echo "用法示例:"
                    echo "  $0 integrated backup      # 备份整合环境"
                    echo "  $0 integrated restore backups/integrated/integrated_backup_20250130_140000.tar.gz"
                    echo "  $0 integrated check       # 检查整合环境状态"
                    echo "  $0 integrated verify backup.tar.gz  # 验证备份文件"
                    echo ""
                    echo "功能说明:"
                    echo "  ✅ 支持 AI变现之路 + BillionMail 整合环境"
                    echo "  ✅ 多数据库备份 (aibianx + billionmail)"
                    echo "  ✅ 容器化环境兼容"
                    echo "  ✅ 完整的文件和配置备份"
                    echo "  ✅ 备份完整性验证"
                    echo "  ✅ 安全的还原机制"
                    echo ""
                    echo "💡 提示："
                    echo "  • 整合环境指 docker-compose.integrated.yml 部署的环境"
                    echo "  • 备份包含两个数据库和所有相关文件"
                    echo "  • 还原前会自动创建安全备份"
                    echo "  • 使用 check 命令验证环境是否正常"
                    ;;
            esac
            ;;
        "production")
            case "$action" in
                "auto-deploy")
                    echo -e "${GREEN}🚀 全自动生产部署...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/auto-deploy.sh" "$@"
                    ;;
                "install-env")
                    echo -e "${BLUE}🔧 安装基础环境...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/install-environment.sh" "$@"
                    ;;
                "check-env")
                    echo -e "${BLUE}📋 检查环境状态...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/install-environment.sh" check-only
                    ;;
                "clone-project")
                    echo -e "${BLUE}📥 克隆项目代码...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/manage-project.sh" clone "$@"
                    ;;
                "update-project")
                    echo -e "${BLUE}🔄 更新项目代码...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/manage-project.sh" update "$@"
                    ;;
                "configure")
                    echo -e "${BLUE}⚙️ 生成生产配置...${NC}"
                    # 复用现有的统一配置管理器
                    if [ $# -ge 2 ]; then
                        domain="$3"
                        mail_domain="$4"
                        if [ -n "$mail_domain" ]; then
                            exec "$SCRIPT_DIR/deployment/configure-unified-env.sh" integrated "$domain" "$mail_domain"
                        else
                            exec "$SCRIPT_DIR/deployment/configure-unified-env.sh" integrated "$domain"
                        fi
                    else
                        exec "$SCRIPT_DIR/deployment/configure-unified-env.sh" integrated
                    fi
                    ;;
                "configure-check")
                    echo -e "${BLUE}🔍 验证配置文件...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/configure-production.sh" validate
                    ;;
                "deploy")
                    echo -e "${GREEN}🚀 部署生产服务...${NC}"
                    mode="${3:-unified}"
                    exec "$SCRIPT_DIR/scripts/production/deploy-production.sh" "$mode" "$@"
                    ;;
                "deploy-check")
                    echo -e "${BLUE}📊 检查部署状态...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/deploy-production.sh" check
                    ;;
                "start")
                    echo -e "${GREEN}▶️ 启动生产服务...${NC}"
                    service="${3:-all}"
                    exec "$SCRIPT_DIR/scripts/production/manage-services.sh" start "$service"
                    ;;
                "stop")
                    echo -e "${YELLOW}⏹️ 停止生产服务...${NC}"
                    service="${3:-all}"
                    exec "$SCRIPT_DIR/scripts/production/manage-services.sh" stop "$service"
                    ;;
                "restart")
                    echo -e "${BLUE}🔄 重启生产服务...${NC}"
                    service="${3:-all}"
                    exec "$SCRIPT_DIR/scripts/production/manage-services.sh" restart "$service"
                    ;;
                "status")
                    echo -e "${BLUE}📈 检查生产状态...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/manage-services.sh" status
                    ;;
                "logs")
                    echo -e "${BLUE}📋 查看生产日志...${NC}"
                    service="${3:-all}"
                    exec "$SCRIPT_DIR/scripts/production/monitor-production.sh" logs "$service"
                    ;;
                "monitor")
                    echo -e "${BLUE}📊 实时监控环境...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/monitor-production.sh" monitor
                    ;;
                "backup")
                    echo -e "${PURPLE}💾 生产环境备份...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/maintain-production.sh" backup
                    ;;
                "restore")
                    if [ -z "$3" ]; then
                        echo -e "${RED}❌ 请指定备份文件${NC}"
                        echo "用法: $0 production restore <backup-file>"
                        exit 1
                    fi
                    echo -e "${YELLOW}🔄 生产环境恢复...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/maintain-production.sh" restore "$3"
                    ;;
                "cleanup")
                    echo -e "${YELLOW}🧹 清理生产资源...${NC}"
                    exec "$SCRIPT_DIR/scripts/production/maintain-production.sh" cleanup
                    ;;
                *)
                    echo -e "${GREEN}🚀 AI变现之路 - 生产环境管理工具${NC}"
                    echo "========================================"
                    echo "🔧 环境管理:"
                    echo "  auto-deploy [domain] [mail-domain] - 全自动生产部署"
                    echo "  install-env                        - 安装基础环境"
                    echo "  check-env                          - 检查环境状态"
                    echo ""
                    echo "📦 项目管理:"
                    echo "  clone-project [git-url]            - 克隆项目代码"
                    echo "  update-project                     - 更新项目代码"
                    echo ""
                    echo "⚙️ 配置管理:"
                    echo "  configure [domain] [mail-domain]   - 生成生产配置"
                    echo "  configure-check                    - 验证配置文件"
                    echo ""
                    echo "🚀 部署管理:"
                    echo "  deploy [unified|separate]          - 部署生产服务"
                    echo "  deploy-check                       - 检查部署状态"
                    echo ""
                    echo "🎛️ 服务管理:"
                    echo "  start [service]                    - 启动生产服务"
                    echo "  stop [service]                     - 停止生产服务"
                    echo "  restart [service]                  - 重启生产服务"
                    echo "  status                             - 检查生产状态"
                    echo ""
                    echo "📊 监控工具:"
                    echo "  logs [service]                     - 查看生产日志"
                    echo "  monitor                            - 实时监控环境"
                    echo ""
                    echo "🛠️ 维护工具:"
                    echo "  backup                             - 生产环境备份"
                    echo "  restore <backup-file>              - 生产环境恢复"
                    echo "  cleanup                            - 清理生产资源"
                    echo ""
                    echo "用法示例:"
                    echo "  $0 production auto-deploy example.com mail.example.com"
                    echo "  $0 production configure example.com"
                    echo "  $0 production deploy unified"
                    echo "  $0 production start"
                    echo "  $0 production status"
                    echo "  $0 production logs backend"
                    echo ""
                    echo "💡 提示:"
                    echo "  • auto-deploy: 从零开始的完整自动部署"
                    echo "  • configure: 复用现有统一配置管理系统"
                    echo "  • deploy: 支持整合(unified)和分离(separate)模式"
                    echo "  • service: frontend, backend, postgres, meilisearch 等"
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