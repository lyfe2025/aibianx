#!/bin/bash

# AI变现之路 - 生产环境管理子菜单
# 生产环境专用功能的管理界面

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

# 显示生产环境管理菜单
show_production_menu() {
    clear
    echo -e "${RED}┌─────────────────────────────────────────┐${NC}"
    echo -e "${RED}│        🚀 生产环境管理中心              │${NC}"
    echo -e "${RED}└─────────────────────────────────────────┘${NC}"
    echo ""
    echo -e "${RED}⚠️ 生产环境操作 - 请谨慎操作${NC}"
    echo ""
    echo "📋 生产环境管理选项:"
    echo ""
    
    echo -e " ${RED}🚀 部署管理${NC}"
    echo "  1) 全自动部署          (从零开始完整部署)"
    echo "  2) 安装基础环境         (Docker+环境依赖)"
    echo "  3) 克隆项目代码         (Git代码拉取)"
    echo "  4) 生成生产配置         (域名配置生成)"
    echo "  5) 执行服务部署         (Docker容器部署)"
    echo ""
    
    echo -e " ${RED}🎛️ 服务管理${NC}"
    echo "  6) 启动生产服务         (启动所有容器)"
    echo "  7) 停止生产服务         (安全停止)"
    echo "  8) 重启生产服务         (重启所有服务)"
    echo "  9) 检查服务状态         (健康状态检查)"
    echo ""
    
    echo -e " ${RED}📊 监控管理${NC}"
    echo " 10) 查看服务日志         (实时日志监控)"
    echo " 11) 实时性能监控         (系统资源监控)"
    echo " 12) 告警状态检查         (异常告警)"
    echo ""
    
    echo -e " ${RED}🛠️ 维护工具${NC}"
    echo " 13) 生产环境备份         (完整备份)"
    echo " 14) 从备份恢复          (数据恢复)"
    echo " 15) 系统更新           (代码+依赖更新)"
    echo " 16) 清理系统资源         (磁盘清理)"
    echo ""
    
    echo -e " ${RED}🔍 诊断工具${NC}"
    echo " 17) 部署状态检查         (验证部署完整性)"
    echo " 18) 配置文件验证         (检查配置正确性)"
    echo " 19) 网络连通性测试       (域名解析+端口)"
    echo ""
    
    echo -e " ${RED}🌐 快捷命令${NC}"
    echo "  0) 返回主菜单"
    echo ""
}

# 执行生产环境选择
execute_production_choice() {
    local choice=$1
    
    case $choice in
        1) # 全自动部署
            echo -e "${GREEN}🚀 全自动生产部署...${NC}"
            echo ""
            echo "请输入域名信息："
            read -p "网站域名: " domain
            read -p "邮件域名 (可选): " mail_domain
            
            if [ -z "$domain" ]; then
                echo -e "${RED}❌ 域名不能为空${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            
            if [ -f "$PROJECT_ROOT/scripts/production/auto-deploy.sh" ]; then
                if [ -n "$mail_domain" ]; then
                    exec "$PROJECT_ROOT/scripts/production/auto-deploy.sh" "$domain" "$mail_domain"
                else
                    exec "$PROJECT_ROOT/scripts/production/auto-deploy.sh" "$domain"
                fi
            else
                echo -e "${RED}❌ 自动部署脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        2) # 安装基础环境
            echo -e "${BLUE}🔧 安装基础环境...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/install-environment.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/install-environment.sh"
            else
                echo -e "${RED}❌ 环境安装脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        3) # 克隆项目代码
            echo -e "${BLUE}📥 克隆项目代码...${NC}"
            echo "请输入Git仓库地址："
            read -p "Git URL: " git_url
            if [ -n "$git_url" ]; then
                if [ -f "$PROJECT_ROOT/scripts/production/manage-project.sh" ]; then
                    exec "$PROJECT_ROOT/scripts/production/manage-project.sh" clone "$git_url"
                else
                    echo -e "${RED}❌ 项目管理脚本不存在${NC}"
                    read -p "按回车键返回菜单..."
                    return 1
                fi
            else
                echo -e "${RED}❌ Git URL不能为空${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        4) # 生成生产配置
            echo -e "${BLUE}⚙️ 生成生产配置...${NC}"
            echo "请输入域名信息："
            read -p "网站域名: " domain
            read -p "邮件域名 (可选): " mail_domain
            
            if [ -z "$domain" ]; then
                echo -e "${RED}❌ 域名不能为空${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            
            if [ -f "$PROJECT_ROOT/deployment/configure-unified-env.sh" ]; then
                if [ -n "$mail_domain" ]; then
                    exec "$PROJECT_ROOT/deployment/configure-unified-env.sh" integrated "$domain" "$mail_domain"
                else
                    exec "$PROJECT_ROOT/deployment/configure-unified-env.sh" integrated "$domain"
                fi
            else
                echo -e "${RED}❌ 配置脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        5) # 执行服务部署
            echo -e "${GREEN}🚀 执行服务部署...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/deploy-production.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/deploy-production.sh" unified
            else
                echo -e "${RED}❌ 部署脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        6) # 启动生产服务
            echo -e "${GREEN}▶️ 启动生产服务...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/manage-services.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/manage-services.sh" start
            else
                echo -e "${RED}❌ 服务管理脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        7) # 停止生产服务
            echo -e "${YELLOW}⏹️ 停止生产服务...${NC}"
            echo -e "${YELLOW}⚠️ 确认要停止生产服务吗？${NC}"
            read -p "输入 'yes' 确认: " confirm
            if [ "$confirm" = "yes" ]; then
                if [ -f "$PROJECT_ROOT/scripts/production/manage-services.sh" ]; then
                    exec "$PROJECT_ROOT/scripts/production/manage-services.sh" stop
                else
                    echo -e "${RED}❌ 服务管理脚本不存在${NC}"
                    read -p "按回车键返回菜单..."
                    return 1
                fi
            else
                echo "操作已取消"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        8) # 重启生产服务
            echo -e "${BLUE}🔄 重启生产服务...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/manage-services.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/manage-services.sh" restart
            else
                echo -e "${RED}❌ 服务管理脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        9) # 检查服务状态
            echo -e "${BLUE}📈 检查服务状态...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/manage-services.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/manage-services.sh" status
            else
                echo -e "${RED}❌ 服务管理脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        10) # 查看服务日志
            echo -e "${BLUE}📋 查看服务日志...${NC}"
            echo "选择要查看的服务："
            echo "  1) 前端服务"
            echo "  2) 后端服务"
            echo "  3) 数据库服务"
            echo "  4) 所有服务"
            read -p "请选择 [1-4]: " log_choice
            
            local service="all"
            case $log_choice in
                1) service="frontend" ;;
                2) service="backend" ;;
                3) service="postgres" ;;
                4) service="all" ;;
                *) service="all" ;;
            esac
            
            if [ -f "$PROJECT_ROOT/scripts/production/monitor-production.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/monitor-production.sh" logs "$service"
            else
                echo -e "${RED}❌ 监控脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        11) # 实时性能监控
            echo -e "${BLUE}📊 启动实时监控...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/monitor-production.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/monitor-production.sh" monitor
            else
                echo -e "${RED}❌ 监控脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        12) # 告警状态检查
            echo -e "${BLUE}🚨 告警状态检查...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/monitor-production.sh" ]; then
                "$PROJECT_ROOT/scripts/production/monitor-production.sh" alerts
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            else
                echo -e "${RED}❌ 监控脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        13) # 生产环境备份
            echo -e "${PURPLE}💾 生产环境备份...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/maintain-production.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/maintain-production.sh" backup
            else
                echo -e "${RED}❌ 维护脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        14) # 从备份恢复
            echo -e "${YELLOW}🔄 从备份恢复...${NC}"
            echo ""
            echo -e "${YELLOW}⚠️ 恢复操作将覆盖现有数据！${NC}"
            echo "请指定备份文件路径："
            read -p "备份文件: " backup_file
            if [ -n "$backup_file" ] && [ -f "$backup_file" ]; then
                echo -e "${YELLOW}⚠️ 确认要从备份恢复吗？${NC}"
                read -p "输入 'yes' 确认: " confirm
                if [ "$confirm" = "yes" ]; then
                    if [ -f "$PROJECT_ROOT/scripts/production/maintain-production.sh" ]; then
                        exec "$PROJECT_ROOT/scripts/production/maintain-production.sh" restore "$backup_file"
                    else
                        echo -e "${RED}❌ 维护脚本不存在${NC}"
                        read -p "按回车键返回菜单..."
                        return 1
                    fi
                else
                    echo "操作已取消"
                    read -p "按回车键返回菜单..."
                    return 1
                fi
            else
                echo -e "${RED}❌ 备份文件不存在或未指定${NC}"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        15) # 系统更新
            echo -e "${BLUE}🔄 系统更新...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/maintain-production.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/maintain-production.sh" update
            else
                echo -e "${RED}❌ 维护脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        16) # 清理系统资源
            echo -e "${YELLOW}🧹 清理系统资源...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/maintain-production.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/maintain-production.sh" cleanup
            else
                echo -e "${RED}❌ 维护脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        17) # 部署状态检查
            echo -e "${BLUE}🔍 部署状态检查...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/deploy-production.sh" ]; then
                "$PROJECT_ROOT/scripts/production/deploy-production.sh" check
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            else
                echo -e "${RED}❌ 部署脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        18) # 配置文件验证
            echo -e "${BLUE}🔍 配置文件验证...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/production/configure-production.sh" ]; then
                exec "$PROJECT_ROOT/scripts/production/configure-production.sh" validate
            else
                echo -e "${RED}❌ 配置验证脚本不存在${NC}"
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        19) # 网络连通性测试
            echo -e "${BLUE}🌐 网络连通性测试...${NC}"
            echo ""
            echo "🔗 基础网络检查:"
            if ping -c 1 google.com &>/dev/null; then
                echo "   ✅ 互联网连接正常"
            else
                echo "   ❌ 互联网连接异常"
            fi
            
            echo ""
            echo "📡 关键端口检查:"
            local ports=("80" "443" "1337" "5432" "7700" "8080")
            for port in "${ports[@]}"; do
                if netstat -tuln 2>/dev/null | grep -q ":$port "; then
                    echo "   ✅ 端口 $port 正在监听"
                else
                    echo "   ❌ 端口 $port 未开放"
                fi
            done
            
            echo ""
            echo "🌐 域名解析测试:"
            if [ -f "frontend/.env.local" ]; then
                local domain=$(grep "NEXT_PUBLIC_FRONTEND_DOMAIN=" "frontend/.env.local" 2>/dev/null | cut -d'=' -f2)
                if [ -n "$domain" ]; then
                    if nslookup "$domain" &>/dev/null; then
                        echo "   ✅ 域名 $domain 解析正常"
                    else
                        echo "   ❌ 域名 $domain 解析失败"
                    fi
                fi
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
            echo "请输入 0-19 之间的数字"
            echo ""
            read -p "按回车键继续..." 
            return 1
            ;;
    esac
}

# 主循环
main() {
    while true; do
        show_production_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if execute_production_choice "$choice"; then
            continue
        fi
    done
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main
fi