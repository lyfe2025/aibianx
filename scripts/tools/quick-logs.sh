#!/bin/bash

# AI变现之路 - 快速日志查看工具
# 提供各种系统日志的快速访问入口

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOGS_DIR="$PROJECT_ROOT/logs"

# 加载动态配置
source "$SCRIPT_DIR/load-config.sh"

echo -e "${CYAN}🔍 AI变现之路 - 快速日志查看${NC}"
echo "========================================"
echo ""

# 检查logs目录
if [ ! -d "$LOGS_DIR" ]; then
    echo -e "${RED}❌ 日志目录不存在: $LOGS_DIR${NC}"
    exit 1
fi

# 显示日志菜单
show_log_menu() {
    echo -e "${BLUE}📋 可用日志类型:${NC}"
    echo ""
    
    # 实时日志
    echo -e " ${GREEN}🔴 实时日志${NC}"
    echo "  1) 后端实时日志      (backend.log - 实时)"
    echo "  2) 前端实时日志      (frontend.log - 实时)"
    echo "  3) 搜索同步日志      (search-sync.log - 实时)"
    echo ""
    
    # 历史日志
    echo -e " ${GREEN}📜 历史日志${NC}"
    echo "  4) 后端历史日志      (backend.log - 最近100行)"
    echo "  5) 前端历史日志      (frontend.log - 最近100行)"
    echo "  6) 硬编码检查日志    (最新的检查结果)"
    echo ""
    
    # 特殊日志
    echo -e " ${GREEN}🔧 系统日志${NC}"
    echo "  7) 邮件系统日志      (billionmail相关)"
    echo "  8) 所有错误日志      (包含ERROR的行)"
    echo "  9) 日志文件概览      (所有日志文件列表)"
    echo ""
    
    echo "  0) 返回主菜单"
    echo ""
}

# 显示日志文件
show_log() {
    local log_file="$1"
    local mode="$2"  # tail, head, cat, grep
    local lines="$3"
    
    if [ ! -f "$LOGS_DIR/$log_file" ]; then
        echo -e "${RED}❌ 日志文件不存在: $log_file${NC}"
        return 1
    fi
    
    echo -e "${BLUE}📖 查看日志: $log_file${NC}"
    echo "========================================"
    
    case $mode in
        "tail")
            echo -e "${YELLOW}📍 实时监控 (Ctrl+C 退出)${NC}"
            echo ""
            tail -f "$LOGS_DIR/$log_file"
            ;;
        "head")
            echo -e "${YELLOW}📍 最近 $lines 行${NC}"
            echo ""
            tail -n "$lines" "$LOGS_DIR/$log_file"
            ;;
        "errors")
            echo -e "${YELLOW}📍 错误信息${NC}"
            echo ""
            grep -i "error\|fail\|exception" "$LOGS_DIR/$log_file" | tail -20
            ;;
        *)
            echo -e "${YELLOW}📍 完整内容${NC}"
            echo ""
            cat "$LOGS_DIR/$log_file"
            ;;
    esac
}

# 显示最新硬编码检查日志
show_latest_hardcode_log() {
    local latest_log=$(ls -t "$LOGS_DIR"/hardcode-check-*.log 2>/dev/null | head -1)
    
    if [ -z "$latest_log" ]; then
        echo -e "${RED}❌ 未找到硬编码检查日志${NC}"
        return 1
    fi
    
    echo -e "${BLUE}📖 最新硬编码检查结果${NC}"
    echo "========================================"
    echo -e "${YELLOW}📍 文件: $(basename "$latest_log")${NC}"
    echo ""
    cat "$latest_log"
}

# 显示所有错误日志
show_all_errors() {
    echo -e "${BLUE}📖 所有系统错误${NC}"
    echo "========================================"
    echo ""
    
    local found_errors=false
    
    for log_file in "$LOGS_DIR"/*.log; do
        if [ -f "$log_file" ]; then
            local errors=$(grep -i "error\|fail\|exception" "$log_file" 2>/dev/null | tail -5)
            if [ -n "$errors" ]; then
                echo -e "${YELLOW}📍 $(basename "$log_file"):${NC}"
                echo "$errors"
                echo ""
                found_errors=true
            fi
        fi
    done
    
    if [ "$found_errors" = false ]; then
        echo -e "${GREEN}✅ 未发现错误信息${NC}"
    fi
}

# 显示日志概览
show_log_overview() {
    echo -e "${BLUE}📖 日志文件概览${NC}"
    echo "========================================"
    echo ""
    
    cd "$LOGS_DIR"
    
    echo -e "${YELLOW}📍 日志文件统计:${NC}"
    ls -lah *.log 2>/dev/null | while read -r line; do
        if [[ "$line" =~ ^- ]]; then
            local size=$(echo "$line" | awk '{print $5}')
            local name=$(echo "$line" | awk '{print $9}')
            local time=$(echo "$line" | awk '{print $6" "$7" "$8}')
            
            # 根据文件大小给出颜色提示
            if [[ "$size" =~ ^[0-9]+K$ ]] && [ "${size%K}" -gt 100 ]; then
                echo -e "  ${YELLOW}$name${NC} - $size (${time})"
            elif [[ "$size" =~ ^[0-9]+M$ ]]; then
                echo -e "  ${RED}$name${NC} - $size (${time}) ⚠️  大文件"
            else
                echo -e "  ${GREEN}$name${NC} - $size (${time})"
            fi
        fi
    done
    
    echo ""
    echo -e "${BLUE}💡 提示:${NC}"
    echo "  🔴 实时监控: 选择1-3查看实时日志"
    echo "  📜 历史查看: 选择4-6查看历史记录"
    echo "  🔧 问题排查: 选择8查看所有错误"
}

# 主菜单循环
main_menu() {
    while true; do
        show_log_menu
        echo -n -e "${CYAN}请选择日志类型 (0-9): ${NC}"
        read -r choice
        echo ""
        
        case $choice in
            1) # 后端实时日志
                show_log "backend.log" "tail"
                ;;
            2) # 前端实时日志
                show_log "frontend.log" "tail"
                ;;
            3) # 搜索同步实时日志
                show_log "search-sync.log" "tail"
                ;;
            4) # 后端历史日志
                show_log "backend.log" "head" "100"
                ;;
            5) # 前端历史日志
                show_log "frontend.log" "head" "100"
                ;;
            6) # 硬编码检查日志
                show_latest_hardcode_log
                ;;
            7) # 邮件系统日志
                show_log "billionmail-mock.log" "head" "100"
                ;;
            8) # 所有错误日志
                show_all_errors
                ;;
            9) # 日志概览
                show_log_overview
                ;;
            0) # 退出
                echo -e "${GREEN}👋 返回主菜单${NC}"
                break
                ;;
            *) # 无效选择
                echo -e "${RED}❌ 无效选择: $choice${NC}"
                echo "请输入 0-9 之间的数字"
                ;;
        esac
        
        if [ "$choice" != "0" ]; then
            echo ""
            echo -e "${YELLOW}按回车键返回日志菜单...${NC}"
            read -r
            clear
        fi
    done
}

# 如果直接执行此脚本
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main_menu
fi