#!/bin/bash

# AI变现之路 - 环境管理子菜单
# 环境切换、配置管理、故障排查的专用管理界面

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 加载动态配置
source "$SCRIPT_DIR/load-config.sh"

# 检测当前环境
detect_current_environment() {
    local env_type="unknown"
    
    if [ -f "$PROJECT_ROOT/.production" ]; then
        env_type="production"
    elif [ -f "$PROJECT_ROOT/.development" ]; then
        env_type="development"  
    else
        if [ -f "$PROJECT_ROOT/backend/.env" ]; then
            local database_host=$(grep "DATABASE_HOST=" "$PROJECT_ROOT/backend/.env" 2>/dev/null | cut -d'=' -f2)
            if [ "$database_host" != "localhost" ]; then
                env_type="production"
            else
                env_type="development"
            fi
        else
            env_type="development"
        fi
    fi
    
    echo "$env_type"
}

# 显示环境管理菜单
show_environment_menu() {
    local current_env=$(detect_current_environment)
    
    clear
    echo -e "${CYAN}┌─────────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│        🌐 环境管理中心                  │${NC}"
    echo -e "${CYAN}└─────────────────────────────────────────┘${NC}"
    echo ""
    echo "📍 当前环境: $current_env"
    echo ""
    echo "📋 环境管理选项:"
    echo ""
    
    echo -e " ${CYAN}🔄 环境切换${NC}"
    echo "  1) 切换到开发环境       (localhost配置)"
    echo "  2) 切换到生产环境       (需要域名)"
    echo "  3) 查看当前环境信息     (详细状态)"
    echo ""
    
    echo -e " ${CYAN}⚙️ 配置管理${NC}"
    echo "  4) 生成开发配置         (自动配置.env文件)"
    echo "  5) 生成生产配置         (域名配置)"
    echo "  6) 验证配置文件         (检查配置完整性)"
    echo "  7) 备份配置文件         (安全备份)"
    echo "  8) 恢复配置文件         (从备份恢复)"
    echo ""
    
    echo -e " ${CYAN}🔧 故障排查${NC}"
    echo "  9) 系统诊断            (全面系统检查)"
    echo " 10) Docker诊断          (容器状态检查)"
    echo " 11) 网络诊断            (连接性检查)"
    echo " 12) 文件权限检查         (权限问题排查)"
    echo " 13) 修复常见问题         (自动修复工具)"
    echo ""
    
    echo -e " ${CYAN}🌐 快捷命令${NC}"
    echo "  0) 返回主菜单"
    echo ""
}

# 执行环境管理选择
execute_environment_choice() {
    local choice=$1
    
    case $choice in
        1) # 切换到开发环境
            echo -e "${BLUE}🔧 切换到开发环境...${NC}"
            if [ -f "$PROJECT_ROOT/deployment/configure-unified-env.sh" ]; then
                "$PROJECT_ROOT/deployment/configure-unified-env.sh" dev
            fi
            
            # 清理环境标记
            rm -f "$PROJECT_ROOT/.production" "$PROJECT_ROOT/.development"
            echo "development-$(date +%Y%m%d)" > "$PROJECT_ROOT/.development"
            
            echo -e "${GREEN}✅ 已切换到开发环境${NC}"
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        2) # 切换到生产环境
            echo ""
            echo "🌐 请输入生产环境域名:"
            read -p "网站域名: " domain
            read -p "邮件域名 (可选): " mail_domain
            
            if [ -z "$domain" ]; then
                echo -e "${RED}❌ 域名不能为空${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            
            echo ""
            echo -e "${BLUE}🚀 切换到生产环境...${NC}"
            
            if [ -n "$mail_domain" ]; then
                "$PROJECT_ROOT/deployment/configure-unified-env.sh" integrated "$domain" "$mail_domain"
            else
                "$PROJECT_ROOT/deployment/configure-unified-env.sh" integrated "$domain"
            fi
            
            # 清理环境标记
            rm -f "$PROJECT_ROOT/.production" "$PROJECT_ROOT/.development"
            echo "production-$(date +%Y%m%d)" > "$PROJECT_ROOT/.production"
            
            echo -e "${GREEN}✅ 已切换到生产环境${NC}"
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        3) # 查看当前环境信息
            echo -e "${CYAN}📋 详细环境信息${NC}"
            echo "================"
            echo ""
            
            # 基本环境信息
            local current_env=$(detect_current_environment)
            echo "📍 当前环境: $current_env"
            echo "📁 项目路径: $(pwd)"
            echo "⏰ 检查时间: $(date '+%Y-%m-%d %H:%M:%S')"
            echo ""
            
            # 系统信息
            echo -e "${CYAN}💻 系统信息:${NC}"
            echo "   操作系统: $(uname -s)"
            echo "   系统版本: $(uname -r)"
            echo "   架构: $(uname -m)"
            echo "   用户: $(whoami)"
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
            read -p "按回车键返回菜单..."
            return 1
            ;;
        4) # 生成开发配置
            echo -e "${BLUE}⚙️ 生成开发环境配置...${NC}"
            if [ -f "$PROJECT_ROOT/deployment/configure-unified-env.sh" ]; then
                exec "$PROJECT_ROOT/deployment/configure-unified-env.sh" dev
            else
                echo -e "${RED}❌ 配置脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        5) # 生成生产配置
            echo -e "${BLUE}⚙️ 生成生产环境配置...${NC}"
            echo "请输入生产环境信息:"
            read -p "域名: " domain
            read -p "邮件域名: " mail_domain
            if [ -n "$domain" ]; then
                if [ -f "$PROJECT_ROOT/deployment/configure-unified-env.sh" ]; then
                    exec "$PROJECT_ROOT/deployment/configure-unified-env.sh" integrated "$domain" "$mail_domain"
                else
                    echo -e "${RED}❌ 配置脚本不存在${NC}"
                    read -p "按回车键返回菜单..."
                    return 1
                fi
            else
                echo -e "${RED}❌ 域名不能为空${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        6) # 验证配置文件
            echo -e "${CYAN}🔍 验证配置文件${NC}"
            echo "==============="
            echo ""
            
            local errors=0
            
            # 检查前端配置
            if [ ! -f "frontend/.env.local" ]; then
                echo -e "${RED}❌ 前端配置文件不存在${NC}"
                errors=$((errors + 1))
            else
                echo -e "${GREEN}✅ 前端配置文件存在${NC}"
            fi
            
            # 检查后端配置
            if [ ! -f "backend/.env" ]; then
                echo -e "${RED}❌ 后端配置文件不存在${NC}"
                errors=$((errors + 1))
            else
                echo -e "${GREEN}✅ 后端配置文件存在${NC}"
            fi
            
            echo ""
            if [ $errors -eq 0 ]; then
                echo -e "${GREEN}🎉 配置文件验证通过${NC}"
            else
                echo -e "${RED}⚠️ 发现 $errors 个问题${NC}"
            fi
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        7) # 备份配置文件
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
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        8) # 恢复配置文件
            echo -e "${CYAN}🔄 恢复配置文件${NC}"
            echo "==============="
            echo ""
            echo "功能开发中..."
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        9) # 系统诊断
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
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        10) # Docker诊断
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
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        11) # 网络诊断
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
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        12) # 文件权限检查
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
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        13) # 修复常见问题
            echo -e "${CYAN}🔧 修复常见问题${NC}"
            echo "==============="
            echo ""
            
            echo "🔧 修复scripts.sh权限..."
            chmod +x scripts.sh && echo "✅ scripts.sh权限已修复" || echo "❌ 权限修复失败"
            
            echo ""
            echo "🔧 修复脚本目录权限..."
            find scripts/ -name "*.sh" -exec chmod +x {} \; && echo "✅ 脚本权限已修复" || echo "❌ 权限修复失败"
            
            echo ""
            echo "🔧 检查配置文件权限..."
            if [ -f "frontend/.env.local" ]; then
                chmod 600 "frontend/.env.local" && echo "✅ 前端配置权限已设置"
            fi
            
            if [ -f "backend/.env" ]; then
                chmod 600 "backend/.env" && echo "✅ 后端配置权限已设置"
            fi
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        0) # 返回主菜单
            exec "$PROJECT_ROOT/scripts.sh"
            ;;
        *) # 无效选择
            echo -e "${RED}❌ 无效选择: $choice${NC}"
            echo "请输入 0-13 之间的数字"
            echo ""
            read -p "按回车键继续..." 
            return 1
            ;;
    esac
}

# 主循环
main() {
    while true; do
        show_environment_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if execute_environment_choice "$choice"; then
            continue
        fi
    done
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main
fi