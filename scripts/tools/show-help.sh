#!/bin/bash

# AI变现之路 - 帮助信息和使用指南
# 显示完整的命令行使用帮助

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

# 显示完整帮助信息
show_complete_help() {
    clear
    echo -e "${CYAN}┌─────────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│        🚀 AI变现之路 - 使用指南          │${NC}"
    echo -e "${CYAN}└─────────────────────────────────────────┘${NC}"
    echo ""
    
    echo -e "${BLUE}📋 核心功能 (精简菜单)${NC}"
    echo "============================"
    echo "  1-3)   快速启动 (启动/停止/重启)"
    echo "  4-5)   状态检查 (系统状态/代码质量)"
    echo "  6-8)   核心工具 (搜索/邮件/数据库)"
    echo "  9-11)  高级功能 (开发工具/环境/生产)"
    echo ""
    
    echo -e "${BLUE}🔧 命令行模式${NC}"
    echo "============================"
    echo -e "${GREEN}部署管理:${NC}"
    echo "  ./scripts.sh deploy start           # 启动开发环境"
    echo "  ./scripts.sh deploy stop            # 停止所有服务"
    echo "  ./scripts.sh deploy frontend        # 仅启动前端"
    echo "  ./scripts.sh deploy backend         # 仅启动后端"
    echo ""
    
    echo -e "${GREEN}数据库管理:${NC}"
    echo "  ./scripts.sh db check               # 检查数据库连接"
    echo "  ./scripts.sh db backup              # 数据库备份"
    echo "  ./scripts.sh db restore <file>      # 数据库恢复"
    echo ""
    
    echo -e "${GREEN}搜索引擎:${NC}"
    echo "  ./scripts.sh search deploy          # 部署MeiliSearch"
    echo "  ./scripts.sh search check           # 检查搜索服务"
    echo "  ./scripts.sh search restart         # 重启搜索服务"
    echo "  ./scripts.sh search manage          # 搜索管理工具"
    echo ""
    
    echo -e "${GREEN}开发工具:${NC}"
    echo "  ./scripts.sh tools status           # 系统状态检查"
    echo "  ./scripts.sh tools check-hardcode   # 硬编码检查"
    echo "  ./scripts.sh tools pre-commit       # 预提交检查"
    echo "  ./scripts.sh tools fix-fields       # 字段配置修复"
    echo ""
    
    echo -e "${GREEN}邮件系统:${NC}"
    echo "  ./scripts.sh email deploy           # 部署BillionMail"
    echo "  ./scripts.sh email check            # 检查邮件服务"
    echo "  ./scripts.sh email admin            # 管理界面"
    echo "  ./scripts.sh email test             # API测试"
    echo ""
    
    echo -e "${GREEN}备份恢复:${NC}"
    echo "  ./scripts.sh backup full            # 完整备份"
    echo "  ./scripts.sh backup restore <file>  # 从备份恢复"
    echo "  ./scripts.sh backup verify <file>   # 验证备份"
    echo ""
    
    echo -e "${BLUE}🚀 生产环境${NC}"
    echo "============================"
    echo -e "${GREEN}完整部署:${NC}"
    echo "  ./scripts.sh production auto-deploy <domain> [mail-domain]"
    echo "  ./scripts.sh production configure <domain> [mail-domain]"
    echo "  ./scripts.sh production deploy unified"
    echo ""
    
    echo -e "${GREEN}服务管理:${NC}"
    echo "  ./scripts.sh production start       # 启动生产服务"
    echo "  ./scripts.sh production stop        # 停止生产服务"
    echo "  ./scripts.sh production status      # 检查生产状态"
    echo "  ./scripts.sh production logs        # 查看生产日志"
    echo ""
    
    echo -e "${BLUE}💡 使用技巧${NC}"
    echo "============================"
    echo "• 交互模式: 直接运行 ./scripts.sh"
    echo "• 命令模式: ./scripts.sh <类别> <操作> [参数]"
    echo "• 环境切换: 菜单中选择 'e' 进行环境切换"
    echo "• 故障排查: 菜单中选择 't' 进入故障排查模式"
    echo "• 配置管理: 菜单中选择 'c' 进入配置管理"
    echo ""
    
    echo -e "${BLUE}🔗 相关服务地址${NC}"
    echo "============================"
    # 加载动态配置
    if [ -f "$SCRIPT_DIR/load-config.sh" ]; then
        source "$SCRIPT_DIR/load-config.sh"
        echo "• 前端页面: ${FRONTEND_URL:-http://localhost}"
        echo "• 后端API: ${BACKEND_API_URL:-http://localhost:1337/api}"
        echo "• 后端管理: ${BACKEND_ADMIN_URL:-http://localhost:1337/admin}"
        echo "• 搜索引擎: ${SEARCH_URL:-http://localhost:7700}"
        echo "• 邮件管理: ${BILLIONMAIL_ADMIN_URL:-http://localhost:8080}"
        echo "• WebMail: ${BILLIONMAIL_WEBMAIL_URL:-http://localhost:8080/webmail}"
    else
        echo "• 前端页面: http://localhost"
        echo "• 后端API: http://localhost:1337/api"
        echo "• 后端管理: http://localhost:1337/admin"
        echo "• 搜索引擎: http://localhost:7700"
        echo "• 邮件管理: http://localhost:8080"
    fi
    echo ""
    
    echo -e "${BLUE}📚 更多信息${NC}"
    echo "============================"
    echo "• 项目文档: docs/"
    echo "• 脚本文档: scripts/README.md"
    echo "• 规范文件: .cursor/rules/"
    echo "• 问题反馈: 使用故障排查工具 (菜单选择 't')"
    echo ""
    
    read -p "按回车键返回主菜单..."
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    show_complete_help
    # 返回主菜单
    exec "$PROJECT_ROOT/scripts.sh"
fi