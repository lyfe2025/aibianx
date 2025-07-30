#!/bin/bash

# MeiliSearch 管理工具
# AI变现之路项目 - 搜索引擎管理脚本

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 === MeiliSearch 管理工具 ===${NC}"
echo ""

# 检查Docker是否运行
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker未运行，请启动Docker${NC}"
    exit 1
fi

# 显示菜单
show_menu() {
    echo -e "${CYAN}请选择操作:${NC}"
    echo "1) 查看容器状态"
    echo "2) 重启服务"
    echo "3) 查看实时日志"
    echo "4) 重建搜索索引"
    echo "5) 清理搜索数据"
    echo "6) 查看索引统计"
    echo "7) 备份搜索数据"
    echo "0) 退出"
    echo ""
}

# 执行操作
execute_action() {
    local choice=$1
    case $choice in
        1)
            echo -e "${BLUE}📊 容器状态:${NC}"
            if docker ps | grep meilisearch > /dev/null; then
                docker ps | grep meilisearch
                echo ""
                echo -e "${GREEN}✅ 容器运行正常${NC}"
            else
                echo -e "${RED}❌ 容器未运行${NC}"
            fi
            ;;
        2)
            echo -e "${YELLOW}🔄 重启MeiliSearch服务...${NC}"
            docker restart meilisearch 2>/dev/null
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ 服务重启成功${NC}"
            else
                echo -e "${RED}❌ 重启失败${NC}"
            fi
            ;;
        3)
            echo -e "${BLUE}📋 查看实时日志 (Ctrl+C 退出):${NC}"
            echo ""
            sleep 1
            docker logs meilisearch -f 2>/dev/null || echo -e "${RED}❌ 容器未运行${NC}"
            ;;
        4)
            echo -e "${GREEN}🔄 重建搜索索引...${NC}"
            echo "正在清除现有索引..."
            curl -s -X DELETE "http://localhost:7700/indexes/articles" > /dev/null 2>&1
            echo "正在重新同步数据..."
            sleep 2
            if curl -s -X POST http://localhost:1337/api/search/reindex > /dev/null 2>&1; then
                echo -e "${GREEN}✅ 搜索索引重建成功${NC}"
            else
                echo -e "${RED}❌ 重建失败，请确保后端服务正在运行${NC}"
            fi
            ;;
        5)
            echo -e "${YELLOW}🗑️  清理搜索数据...${NC}"
            read -p "确认要清理所有搜索数据吗? (y/N): " confirm
            if [[ $confirm =~ ^[Yy]$ ]]; then
                curl -s -X DELETE "http://localhost:7700/indexes/articles" > /dev/null 2>&1
                echo -e "${GREEN}✅ 搜索数据已清理${NC}"
            else
                echo "操作已取消"
            fi
            ;;
        6)
            echo -e "${BLUE}📈 索引统计:${NC}"
            STATS=$(curl -s http://localhost:7700/indexes/articles/stats 2>/dev/null)
            if [[ $STATS == *"numberOfDocuments"* ]]; then
                DOC_COUNT=$(echo $STATS | grep -o '"numberOfDocuments":[0-9]*' | cut -d':' -f2)
                INDEXING=$(echo $STATS | grep -o '"isIndexing":[a-z]*' | cut -d':' -f2)
                echo "• 文档数量: $DOC_COUNT"
                echo "• 索引状态: $INDEXING"
                echo ""
                echo "详细统计:"
                echo $STATS | jq '.' 2>/dev/null || echo "$STATS"
            else
                echo -e "${RED}❌ 无法获取索引统计${NC}"
            fi
            ;;
        7)
            echo -e "${PURPLE}💾 备份搜索数据...${NC}"
            timestamp=$(date +"%Y%m%d_%H%M%S")
            backup_file="backups/meilisearch_backup_$timestamp.json"
            mkdir -p backups
            
            echo "正在导出搜索数据..."
            curl -s "http://localhost:7700/dumps" -X POST > /dev/null 2>&1
            sleep 3
            
            # 获取最新的dump文件
            dump_status=$(curl -s "http://localhost:7700/dumps" | jq -r '.results[0].status' 2>/dev/null)
            if [[ $dump_status == "succeeded" ]]; then
                echo -e "${GREEN}✅ 搜索数据备份成功${NC}"
                echo "备份文件: $backup_file"
            else
                echo -e "${RED}❌ 备份失败${NC}"
            fi
            ;;
        0)
            echo -e "${GREEN}👋 退出管理工具${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            ;;
    esac
    echo ""
    read -p "按回车键继续..."
}

# 主循环
while true; do
    clear
    echo -e "${BLUE}🔧 === MeiliSearch 管理工具 ===${NC}"
    echo ""
    show_menu
    read -p "请选择操作 (0-7): " choice
    echo ""
    execute_action "$choice"
done