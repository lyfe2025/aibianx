#!/bin/bash

# AI变现之路 - 开发工具子菜单
# 开发相关工具的专用管理界面

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 显示开发工具菜单
show_dev_tools_menu() {
    clear
    echo -e "${BLUE}┌─────────────────────────────────────────┐${NC}"
    echo -e "${BLUE}│        🛠️ 开发工具管理中心              │${NC}"
    echo -e "${BLUE}└─────────────────────────────────────────┘${NC}"
    echo ""
    echo "📋 开发工具选项:"
    echo ""
    
    echo -e " ${BLUE}🔍 代码质量${NC}"
    echo "  1) 硬编码检查          (检查硬编码问题)"
    echo "  2) 预提交检查          (完整代码质量检查)"
    echo "  3) 语法检查            (Shell脚本语法)"
    echo ""
    
    echo -e " ${BLUE}🔧 配置管理${NC}"
    echo "  4) 字段描述配置         (Article字段专用)"
    echo "  5) 通用字段配置         (任意内容类型)"
    echo "  6) 用户字段配置         (用户系统字段)"
    echo "  7) 环境变量配置         (自动生成.env)"
    echo ""
    
    echo -e " ${BLUE}💾 数据管理${NC}"
    echo "  8) 备份系统数据         (数据库+文件)"
    echo "  9) 清理临时文件         (释放空间)"
    echo " 10) 验证备份文件         (检查完整性)"
    echo ""
    
    echo -e " ${BLUE}🧪 测试工具${NC}"
    echo " 11) 完整集成测试         (前端+后端+邮件)"
    echo " 12) API连接测试          (BillionMail API)"
    echo ""
    
    echo -e " ${BLUE}🌐 快捷命令${NC}"
    echo "  0) 返回主菜单"
    echo ""
}

# 执行开发工具选择
execute_dev_tools_choice() {
    local choice=$1
    
    case $choice in
        1) # 硬编码检查
            echo -e "${BLUE}🔍 启动硬编码检查工具...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/check-hardcode.sh"
            ;;
        2) # 预提交检查
            echo -e "${BLUE}🚀 启动预提交检查工具...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/pre-commit-check.sh"
            ;;
        3) # 语法检查
            echo -e "${BLUE}📝 检查Shell脚本语法...${NC}"
            echo ""
            SYNTAX_ERRORS=0
            echo "正在检查所有Shell脚本..."
            find "$PROJECT_ROOT/scripts/" -name "*.sh" | while read -r script_file; do
                if ! bash -n "$script_file" 2>/dev/null; then
                    echo -e "${RED}❌ 语法错误: $script_file${NC}"
                    SYNTAX_ERRORS=$((SYNTAX_ERRORS + 1))
                else
                    echo -e "${GREEN}✅ $script_file${NC}"
                fi
            done
            echo ""
            if [ $SYNTAX_ERRORS -eq 0 ]; then
                echo -e "${GREEN}🎉 所有Shell脚本语法正确${NC}"
            else
                echo -e "${RED}⚠️ 发现 $SYNTAX_ERRORS 个语法错误${NC}"
            fi
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        4) # 字段描述配置
            echo -e "${BLUE}🔧 启动字段描述配置修复工具 (Article专用)...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/configure-field-descriptions.sh"
            ;;
        5) # 通用字段配置
            echo -e "${BLUE}🔧 启动通用字段描述配置工具...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/configure-any-field-descriptions.sh"
            ;;
        6) # 用户字段配置
            echo -e "${BLUE}🔧 启动用户字段描述配置工具...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/configure-user-field-descriptions.sh"
            ;;
        7) # 环境变量配置
            echo -e "${BLUE}🔧 启动环境变量自动配置工具...${NC}"
            exec "$PROJECT_ROOT/scripts/tools/setup-env.sh"
            ;;
        8) # 备份系统数据
            echo -e "${PURPLE}📦 完整系统备份...${NC}"
            exec "$PROJECT_ROOT/scripts/backup/backup-strapi.sh"
            ;;
        9) # 清理临时文件
            echo -e "${YELLOW}🧹 清理备份临时文件...${NC}"
            exec "$PROJECT_ROOT/scripts/backup/cleanup-backup-temp.sh"
            ;;
        10) # 验证备份文件
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
        11) # 完整集成测试
            echo -e "${BLUE}🧪 完整集成测试（前端+后端）...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/test-full-integration.sh" ]; then
                exec "$PROJECT_ROOT/scripts/test-full-integration.sh"
            else
                echo -e "${YELLOW}⚠️ 集成测试脚本开发中...${NC}"
                echo ""
                read -p "按回车键返回菜单..."
                return 1
            fi
            ;;
        12) # API连接测试
            echo -e "${BLUE}🧪 测试BillionMail API连接...${NC}"
            if [ -f "$PROJECT_ROOT/scripts/billionmail/test-api.sh" ]; then
                exec "$PROJECT_ROOT/scripts/billionmail/test-api.sh"
            else
                echo -e "${YELLOW}⚠️ API测试脚本开发中...${NC}"
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
        show_dev_tools_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if execute_dev_tools_choice "$choice"; then
            continue
        fi
    done
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main
fi