#!/bin/bash

# AI变现之路 - 服务分离架构强制执行脚本
# 确保下次重启时保持合理的服务分离架构

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🛡️ AI变现之路 - 服务分离架构强制执行${NC}"
echo "=================================================="
echo ""

# 检查服务冲突
check_service_conflicts() {
    echo -e "${BLUE}🔍 检查服务架构冲突...${NC}"
    echo ""
    
    local conflicts_found=0
    
    # 检查PostgreSQL服务数量
    local postgres_count=$(docker ps --format "{{.Names}}" | grep postgres | wc -l)
    echo "📊 PostgreSQL服务数量: $postgres_count"
    
    if [ "$postgres_count" -eq 2 ]; then
        echo "✅ PostgreSQL服务分离正常 (主项目 + 邮件系统)"
        
        # 验证端口分离
        local main_postgres=$(docker ps --format "{{.Names}} {{.Ports}}" | grep "aibianx-postgres" | grep "5432")
        local mail_postgres=$(docker ps --format "{{.Names}} {{.Ports}}" | grep "billionmail.*postgres" | grep "25432")
        
        if [ -n "$main_postgres" ] && [ -n "$mail_postgres" ]; then
            echo "✅ PostgreSQL端口分离正确 (5432 + 25432)"
        else
            echo "⚠️ PostgreSQL端口分离可能有问题"
            conflicts_found=1
        fi
    elif [ "$postgres_count" -gt 2 ]; then
        echo "❌ PostgreSQL服务过多 ($postgres_count > 2)，存在冗余"
        conflicts_found=1
    elif [ "$postgres_count" -lt 2 ]; then
        echo "⚠️ PostgreSQL服务不足 ($postgres_count < 2)，可能缺失服务"
        conflicts_found=1
    fi
    
    echo ""
    
    # 检查Redis服务数量
    local redis_count=$(docker ps --format "{{.Names}}" | grep redis | wc -l)
    echo "📊 Redis服务数量: $redis_count"
    
    if [ "$redis_count" -eq 2 ]; then
        echo "✅ Redis服务分离正常 (主项目 + 邮件系统)"
        
        # 验证端口分离
        local main_redis=$(docker ps --format "{{.Names}} {{.Ports}}" | grep "aibianx-redis" | grep "6379")
        local mail_redis=$(docker ps --format "{{.Names}} {{.Ports}}" | grep "billionmail.*redis" | grep "26379")
        
        if [ -n "$main_redis" ] && [ -n "$mail_redis" ]; then
            echo "✅ Redis端口分离正确 (6379 + 26379)"
        else
            echo "⚠️ Redis端口分离可能有问题"
            conflicts_found=1
        fi
    elif [ "$redis_count" -gt 2 ]; then
        echo "❌ Redis服务过多 ($redis_count > 2)，存在冗余"
        conflicts_found=1
    elif [ "$redis_count" -lt 2 ]; then
        echo "⚠️ Redis服务不足 ($redis_count < 2)，可能缺失服务"
        conflicts_found=1
    fi
    
    echo ""
    
    # 检查rspamd冗余
    local rspamd_count=$(docker ps --format "{{.Names}}" | grep rspamd | wc -l)
    echo "📊 rspamd服务数量: $rspamd_count"
    
    if [ "$rspamd_count" -eq 1 ]; then
        local mail_rspamd=$(docker ps --format "{{.Names}}" | grep "billionmail.*rspamd")
        if [ -n "$mail_rspamd" ]; then
            echo "✅ rspamd服务正确 (仅BillionMail)"
        else
            echo "⚠️ rspamd服务不是BillionMail的"
            conflicts_found=1
        fi
    elif [ "$rspamd_count" -gt 1 ]; then
        echo "❌ rspamd服务冗余 ($rspamd_count > 1)"
        conflicts_found=1
    elif [ "$rspamd_count" -eq 0 ]; then
        echo "⚠️ 没有rspamd服务"
        conflicts_found=1
    fi
    
    return $conflicts_found
}

# 自动修复冲突
auto_fix_conflicts() {
    echo -e "${YELLOW}🔧 自动修复服务冲突...${NC}"
    echo ""
    
    # 修复rspamd冗余
    local unified_rspamd=$(docker ps --format "{{.Names}}" | grep "aibianx-rspamd")
    if [ -n "$unified_rspamd" ]; then
        echo "🛑 停止冗余的统一部署rspamd..."
        cd "$PROJECT_ROOT/deployment"
        docker-compose -f docker-compose.unified.yml stop rspamd
        echo "✅ 已停止冗余rspamd"
        cd "$PROJECT_ROOT"
    fi
    
    # 检查其他冗余的邮件服务
    local unified_postfix=$(docker ps --format "{{.Names}}" | grep "aibianx.*postfix")
    if [ -n "$unified_postfix" ]; then
        echo "🛑 停止冗余的统一部署postfix..."
        cd "$PROJECT_ROOT/deployment"
        docker-compose -f docker-compose.unified.yml stop postfix
        echo "✅ 已停止冗余postfix"
        cd "$PROJECT_ROOT"
    fi
    
    local unified_dovecot=$(docker ps --format "{{.Names}}" | grep "aibianx.*dovecot")
    if [ -n "$unified_dovecot" ]; then
        echo "🛑 停止冗余的统一部署dovecot..."
        cd "$PROJECT_ROOT/deployment"
        docker-compose -f docker-compose.unified.yml stop dovecot
        echo "✅ 已停止冗余dovecot"
        cd "$PROJECT_ROOT"
    fi
}

# 生成配置修复建议
generate_config_fixes() {
    echo -e "${CYAN}📝 生成永久配置修复建议...${NC}"
    echo ""
    
    local config_file="$PROJECT_ROOT/deployment/docker-compose.unified.yml"
    local backup_file="$PROJECT_ROOT/deployment/docker-compose.unified.yml.backup.$(date +%Y%m%d_%H%M%S)"
    
    echo "💡 为了永久避免冲突，建议修改配置文件："
    echo "   📁 文件: $config_file"
    echo ""
    echo "🔧 建议的修改："
    echo "   1. 注释或删除以下服务定义："
    echo "      - rspamd (使用BillionMail的)"
    echo "      - postfix (使用BillionMail的)"  
    echo "      - dovecot (使用BillionMail的)"
    echo "      - webmail (使用BillionMail的)"
    echo ""
    echo "   2. 保留以下主项目服务："
    echo "      - postgres (主项目数据库)"
    echo "      - redis (主项目缓存)"
    echo "      - meilisearch (搜索引擎)"
    echo "      - backend (如果容器化)"
    echo "      - frontend (如果容器化)"
    echo ""
    
    echo -e "${YELLOW}是否现在自动修复配置文件? (y/n)${NC}"
    read -r fix_config
    
    if [[ $fix_config =~ ^[Yy]$ ]]; then
        echo "📋 备份原配置文件..."
        cp "$config_file" "$backup_file"
        echo "✅ 备份保存到: $backup_file"
        
        echo "🔧 修复配置文件..."
        
        # 注释掉邮件服务
        sed -i.tmp 's/^  rspamd:/  # rspamd:/' "$config_file"
        sed -i.tmp 's/^  postfix:/  # postfix:/' "$config_file"
        sed -i.tmp 's/^  dovecot:/  # dovecot:/' "$config_file"
        sed -i.tmp 's/^  webmail:/  # webmail:/' "$config_file"
        sed -i.tmp 's/^  billionmail-core:/  # billionmail-core:/' "$config_file"
        
        # 清理临时文件
        rm -f "$config_file.tmp"
        
        echo "✅ 配置文件修复完成"
        echo "💡 下次重启时将只启动主项目服务"
    else
        echo "⏭️ 跳过配置文件修复"
    fi
}

# 显示理想架构
show_ideal_architecture() {
    echo ""
    echo -e "${CYAN}🎯 理想的服务分离架构:${NC}"
    echo "=================================="
    echo ""
    
    echo -e "${GREEN}🔵 主项目系统 (统一部署):${NC}"
    echo "  📦 aibianx-postgres (端口5432) - 主项目数据库"
    echo "  📦 aibianx-redis (端口6379) - 主项目缓存"
    echo "  🔍 meilisearch (端口7700) - 搜索引擎"
    echo ""
    
    echo -e "${GREEN}🟢 BillionMail邮件系统 (独立部署):${NC}"
    echo "  📦 billionmail-postgres (端口25432) - 邮件数据库"
    echo "  📦 billionmail-redis (端口26379) - 邮件缓存"
    echo "  📧 billionmail-core (端口8080) - 邮件管理"
    echo "  📨 billionmail-postfix - SMTP服务器"
    echo "  📥 billionmail-dovecot - IMAP/POP3服务器"
    echo "  🛡️ billionmail-rspamd - 反垃圾邮件"
    echo "  📬 billionmail-webmail - WebMail界面"
    echo ""
    
    echo -e "${GREEN}🟡 应用服务 (本地开发):${NC}"
    echo "  🌐 前端 localhost:3000 (npm run dev)"
    echo "  ⚙️ 后端 localhost:1337 (npm run develop)"
    echo ""
    
    echo -e "${BLUE}💡 总计: 10个Docker容器，功能完全分离${NC}"
}

# 主函数
main() {
    if check_service_conflicts; then
        echo -e "${GREEN}✅ 服务架构检查通过！${NC}"
        show_ideal_architecture
    else
        echo -e "${RED}❌ 发现服务架构冲突${NC}"
        echo ""
        echo -e "${YELLOW}选择操作:${NC}"
        echo "  1) 🔧 自动修复冲突"
        echo "  2) 📝 生成配置修复建议"
        echo "  3) 👀 查看理想架构"
        echo "  4) 🚪 退出"
        echo ""
        echo -n "请输入选择 (1-4): "
        read -r action
        
        case "$action" in
            "1")
                auto_fix_conflicts
                echo ""
                if check_service_conflicts; then
                    echo -e "${GREEN}✅ 冲突修复成功！${NC}"
                    show_ideal_architecture
                else
                    echo -e "${RED}❌ 仍有冲突，建议手动检查${NC}"
                fi
                ;;
            "2")
                generate_config_fixes
                ;;
            "3")
                show_ideal_architecture
                ;;
            "4")
                echo -e "${GREEN}👋 退出${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}❌ 无效选择${NC}"
                exit 1
                ;;
        esac
    fi
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi