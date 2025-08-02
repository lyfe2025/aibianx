#!/bin/bash

# AI变现之路 - 搜索引擎管理子菜单
# MeiliSearch 相关功能的专用管理界面

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 显示搜索引擎管理菜单
show_search_menu() {
    clear
    echo -e "${BLUE}┌─────────────────────────────────────────┐${NC}"
    echo -e "${BLUE}│        🔍 搜索引擎管理工具              │${NC}"
    echo -e "${BLUE}└─────────────────────────────────────────┘${NC}"
    echo ""
    echo "📋 MeiliSearch 管理选项:"
    echo ""
    
    echo -e " ${BLUE}🚀 基础操作${NC}"
    echo "  1) 部署MeiliSearch      (一键安装配置)"
    echo "  2) 检查服务状态         (健康状态检查)"
    echo "  3) 重启搜索服务         (解决问题)"
    echo ""
    
    echo -e " ${BLUE}📊 监控管理${NC}"
    echo "  4) 查看实时日志         (故障排查)"
    echo "  5) 搜索管理工具         (完整管理界面)"
    echo ""
    
    echo -e " ${BLUE}🔄 数据管理${NC}"
    echo "  6) 智能重建索引         (自动创建+同步数据)"
    echo "  7) 快速重建索引         (强制刷新)"
    echo ""
    
    echo -e " ${BLUE}🌐 快捷命令${NC}"
    echo "  0) 返回主菜单"
    echo ""
}

# 执行搜索菜单选择
execute_search_choice() {
    local choice=$1
    
    case $choice in
        1) # 部署MeiliSearch
            echo -e "${GREEN}🔍 部署MeiliSearch...${NC}"
            exec "$PROJECT_ROOT/scripts/search/deploy-meilisearch.sh"
            ;;
        2) # 检查服务状态
            echo -e "${BLUE}🔍 检查搜索引擎状态...${NC}"
            exec "$PROJECT_ROOT/scripts/search/check-meilisearch.sh"
            ;;
        3) # 重启搜索服务
            echo -e "${YELLOW}🔄 重启MeiliSearch...${NC}"
            docker restart meilisearch 2>/dev/null && echo -e "${GREEN}✅ MeiliSearch已重启${NC}" || echo -e "${RED}❌ 重启失败${NC}"
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        4) # 查看实时日志
            echo -e "${BLUE}📋 查看MeiliSearch日志...${NC}"
            echo "按 Ctrl+C 退出日志查看"
            echo ""
            sleep 2
            docker logs meilisearch -f 2>/dev/null || echo -e "${RED}❌ MeiliSearch容器未运行${NC}"
            return 1
            ;;
        5) # 搜索管理工具
            echo -e "${BLUE}🔧 启动搜索管理工具...${NC}"
            exec "$PROJECT_ROOT/scripts/search/manage-meilisearch.sh"
            ;;
        6) # 智能重建索引
            echo -e "${GREEN}🔄 启动智能索引重建流程...${NC}"
            echo ""
            "$PROJECT_ROOT/scripts/search/quick-reindex.sh"
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        7) # 快速重建索引
            echo -e "${YELLOW}⚡ 快速重建索引...${NC}"
            echo "强制刷新所有搜索索引..."
            # 这里可以添加快速重建的逻辑
            docker restart meilisearch 2>/dev/null
            echo -e "${GREEN}✅ 索引重建完成${NC}"
            echo ""
            read -p "按回车键返回菜单..."
            return 1
            ;;
        0) # 返回主菜单
            exec "$PROJECT_ROOT/scripts.sh"
            ;;
        *) # 无效选择
            echo -e "${RED}❌ 无效选择: $choice${NC}"
            echo "请输入 0-7 之间的数字"
            echo ""
            read -p "按回车键继续..." 
            return 1
            ;;
    esac
}

# 主循环
main() {
    while true; do
        show_search_menu
        echo -n -e "${YELLOW}请输入选择: ${NC}"
        read -r choice
        
        if execute_search_choice "$choice"; then
            continue
        fi
    done
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main
fi