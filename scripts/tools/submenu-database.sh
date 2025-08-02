#!/bin/bash

# AI变现之路 - 数据库管理子菜单
# PostgreSQL 数据库相关功能的专用管理界面

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 显示数据库管理菜单
show_database_menu() {
    clear
    echo -e "${BLUE}┌─────────────────────────────────────────┐${NC}"
    echo -e "${BLUE}│        🗄️ 数据库管理中心               │${NC}"
    echo -e "${BLUE}└─────────────────────────────────────────┘${NC}"
    echo ""
    echo "📋 PostgreSQL 数据库管理选项:"
    echo ""
    
    echo -e " ${BLUE}🔍 状态检查${NC}"
    echo "  1) 检查数据库连接       (连接状态+基本信息)"
    echo "  2) 查看数据库状态       (详细状态信息)"
    echo "  3) 查看表信息          (表数量+大小统计)"
    echo ""
    
    echo -e " ${BLUE}💾 备份管理${NC}"
    echo "  4) 完整系统备份         (数据库+文件+配置)"
    echo "  5) 仅数据库备份         (PostgreSQL数据)"
    echo "  6) 验证备份文件         (检查备份完整性)"
    echo ""
    
    echo -e " ${BLUE}🔄 恢复管理${NC}"
    echo "  7) 完整系统恢复         (从完整备份恢复)"
    echo "  8) 仅数据库恢复         (从数据库备份恢复)"
    echo "  9) 列出可用备份         (查看备份文件列表)"
    echo ""
    
    echo -e " ${BLUE}🧹 维护工具${NC}"
    echo " 10) 清理临时文件         (释放磁盘空间)"
    echo " 11) 数据库优化          (性能优化)"
    echo " 12) 重建搜索索引         (MeiliSearch数据同步)"
    echo ""
    
    echo -e " ${BLUE}🌐 快捷命令${NC}"
    echo "  0) 返回主菜单"
    echo ""
}

# 执行数据库菜单选择
execute_database_choice() {
    local choice=$1
    
    case $choice in
        1) # 检查数据库连接
            echo -e "${BLUE}🔍 检查数据库连接...${NC}"
            exec "$PROJECT_ROOT/scripts/database/check-database.sh"
            ;;
        2) # 查看数据库状态
            echo -e "${BLUE}📊 查看数据库详细状态...${NC}"
            echo ""
            # 加载后端环境变量
            if [ -f "$PROJECT_ROOT/scripts/tools/load-env.sh" ]; then
                source "$PROJECT_ROOT/scripts/tools/load-env.sh"
                load_backend_env
            fi
            
            echo "🔍 数据库连接信息："
            echo "   主机: ${DATABASE_HOST:-localhost}"
            echo "   端口: ${DATABASE_PORT:-5432}"
            echo "   数据库: ${DATABASE_NAME:-aibianx_dev}"
            echo "   用户: ${DATABASE_USERNAME:-aibianx_dev}"
            echo ""
            
            echo "📊 数据库状态检查："
            if psql -h "${DATABASE_HOST:-localhost}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-aibianx_dev}" -d "${DATABASE_NAME:-aibianx_dev}" -c "\l" > /dev/null 2>&1; then
                echo -e "   ${GREEN}✅ 数据库连接正常${NC}"
                
                # 获取表数量
                table_count=$(psql -h "${DATABASE_HOST:-localhost}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-aibianx_dev}" -d "${DATABASE_NAME:-aibianx_dev}" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | tr -d ' ')
                echo "   📋 数据表数量: ${table_count:-0} 个"
                
                # 获取数据库大小
                db_size=$(psql -h "${DATABASE_HOST:-localhost}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-aibianx_dev}" -d "${DATABASE_NAME:-aibianx_dev}" -t -c "SELECT pg_size_pretty(pg_database_size('${DATABASE_NAME:-aibianx_dev}'));" 2>/dev/null | tr -d ' ')
                echo "   💾 数据库大小: ${db_size:-N/A}"
            else
                echo -e "   ${RED}❌ 数据库连接失败${NC}"
            fi
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        3) # 查看表信息
            echo -e "${BLUE}📋 查看数据库表信息...${NC}"
            echo ""
            # 加载后端环境变量
            if [ -f "$PROJECT_ROOT/scripts/tools/load-env.sh" ]; then
                source "$PROJECT_ROOT/scripts/tools/load-env.sh"
                load_backend_env
            fi
            
            if psql -h "${DATABASE_HOST:-localhost}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-aibianx_dev}" -d "${DATABASE_NAME:-aibianx_dev}" -c "\dt" 2>/dev/null; then
                echo ""
                echo "📊 表大小统计："
                psql -h "${DATABASE_HOST:-localhost}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-aibianx_dev}" -d "${DATABASE_NAME:-aibianx_dev}" -c "
                SELECT 
                    schemaname,
                    tablename,
                    attname,
                    pg_size_pretty(pg_total_relation_size(tablename::regclass)) as size
                FROM pg_tables, pg_attribute 
                WHERE schemaname = 'public' 
                AND pg_attribute.attrelid = tablename::regclass
                AND attnum > 0
                GROUP BY schemaname, tablename, attname
                ORDER BY pg_total_relation_size(tablename::regclass) DESC
                LIMIT 10;
                " 2>/dev/null || echo "获取表大小信息失败"
            else
                echo -e "${RED}❌ 无法连接到数据库${NC}"
            fi
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        4) # 完整系统备份
            echo -e "${PURPLE}📦 完整系统备份...${NC}"
            exec "$PROJECT_ROOT/scripts/backup/backup-strapi.sh"
            ;;
        5) # 仅数据库备份
            echo -e "${BLUE}💾 数据库备份...${NC}"
            exec "$PROJECT_ROOT/scripts/database/backup-database-only.sh"
            ;;
        6) # 验证备份文件
            echo -e "${PURPLE}🔍 验证备份文件...${NC}"
            echo ""
            echo "请指定要验证的备份文件路径："
            read -p "备份文件: " backup_file
            if [ -n "$backup_file" ] && [ -f "$backup_file" ]; then
                if [ -f "$PROJECT_ROOT/scripts/backup/verify-backup.sh" ]; then
                    exec "$PROJECT_ROOT/scripts/backup/verify-backup.sh" "$backup_file"
                else
                    echo -e "${RED}❌ 验证脚本不存在${NC}"
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
        7) # 完整系统恢复
            echo -e "${YELLOW}🔄 完整系统恢复...${NC}"
            echo ""
            echo -e "${YELLOW}⚠️ 恢复操作将覆盖现有数据！${NC}"
            echo "请指定备份文件路径："
            read -p "备份文件: " backup_file
            if [ -n "$backup_file" ] && [ -f "$backup_file" ]; then
                exec "$PROJECT_ROOT/scripts/backup/restore-strapi.sh" "$backup_file"
            else
                echo -e "${RED}❌ 备份文件不存在或未指定${NC}"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        8) # 仅数据库恢复
            echo -e "${YELLOW}🔄 数据库恢复...${NC}"
            echo ""
            echo -e "${YELLOW}⚠️ 恢复操作将覆盖现有数据库！${NC}"
            echo "请指定数据库备份文件路径："
            read -p "数据库备份文件: " backup_file
            if [ -n "$backup_file" ] && [ -f "$backup_file" ]; then
                exec "$PROJECT_ROOT/scripts/database/restore-database-only.sh" "$backup_file"
            else
                echo -e "${RED}❌ 备份文件不存在或未指定${NC}"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        9) # 列出可用备份
            echo -e "${BLUE}📋 可用备份文件列表...${NC}"
            echo ""
            echo "🗂️ 完整系统备份："
            if [ -d "$PROJECT_ROOT/backups" ]; then
                find "$PROJECT_ROOT/backups" -name "*.tar.gz" -type f -exec ls -lh {} \; 2>/dev/null | head -10 || echo "   暂无完整备份文件"
            else
                echo "   备份目录不存在"
            fi
            echo ""
            echo "🗃️ 数据库备份："
            if [ -d "$PROJECT_ROOT/backups/database-only" ]; then
                find "$PROJECT_ROOT/backups/database-only" -name "*.sql" -type f -exec ls -lh {} \; 2>/dev/null | head -10 || echo "   暂无数据库备份文件"
            else
                echo "   数据库备份目录不存在"
            fi
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        10) # 清理临时文件
            echo -e "${YELLOW}🧹 清理备份临时文件...${NC}"
            exec "$PROJECT_ROOT/scripts/backup/cleanup-backup-temp.sh"
            ;;
        11) # 数据库优化
            echo -e "${BLUE}🔧 数据库优化...${NC}"
            echo ""
            # 加载后端环境变量
            if [ -f "$PROJECT_ROOT/scripts/tools/load-env.sh" ]; then
                source "$PROJECT_ROOT/scripts/tools/load-env.sh"
                load_backend_env
            fi
            
            echo "正在执行数据库优化..."
            if psql -h "${DATABASE_HOST:-localhost}" -p "${DATABASE_PORT:-5432}" -U "${DATABASE_USERNAME:-aibianx_dev}" -d "${DATABASE_NAME:-aibianx_dev}" -c "VACUUM ANALYZE;" 2>/dev/null; then
                echo -e "${GREEN}✅ 数据库优化完成${NC}"
            else
                echo -e "${RED}❌ 数据库优化失败${NC}"
            fi
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        12) # 重建搜索索引
            echo -e "${GREEN}🔄 重建搜索索引...${NC}"
            echo "启动MeiliSearch数据同步..."
            echo ""
            if [ -f "$PROJECT_ROOT/scripts/search/quick-reindex.sh" ]; then
                "$PROJECT_ROOT/scripts/search/quick-reindex.sh"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            else
                echo -e "${YELLOW}⚠️ 搜索索引重建脚本不存在${NC}"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        0) # 返回主菜单
            exec "$PROJECT_ROOT/scripts.sh"
            ;;
        *) # 无效选择
            echo -e "${RED}❌ 无效选择: $choice${NC}"
            echo "请输入 0-12 之间的数字"
            echo ""
            read -p "按回车键继续..." 
            return 1
            ;;
    esac
}

# 主循环
main() {
    while true; do
        show_database_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if execute_database_choice "$choice"; then
            continue
        fi
    done
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main
fi