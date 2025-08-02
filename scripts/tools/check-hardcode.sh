#!/bin/bash

# AI变现之路 - 硬编码检查工具
# 自动检测项目中的硬编码问题

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo -e "${BLUE}🔍 AI变现之路 - 硬编码检查工具${NC}"
echo "=================================================="

# 检查结果统计
TOTAL_ISSUES=0
CRITICAL_ISSUES=0
WARNING_ISSUES=0

# 错误记录
HARDCODE_ISSUES=""

# 记录问题函数
record_issue() {
    local severity="$1"
    local file="$2"
    local line="$3"
    local issue="$4"
    local suggestion="$5"
    
    if [ "$severity" = "CRITICAL" ]; then
        CRITICAL_ISSUES=$((CRITICAL_ISSUES + 1))
        echo -e "${RED}❌ CRITICAL${NC}: $file:$line"
    elif [ "$severity" = "WARNING" ]; then
        WARNING_ISSUES=$((WARNING_ISSUES + 1))
        echo -e "${YELLOW}⚠️  WARNING${NC}: $file:$line"
    fi
    
    echo "   问题: $issue"
    echo "   建议: $suggestion"
    echo ""
    
    TOTAL_ISSUES=$((TOTAL_ISSUES + 1))
    HARDCODE_ISSUES="${HARDCODE_ISSUES}[$severity] $file:$line - $issue\n"
}

echo -e "${BLUE}📋 检查范围:${NC}"
echo "   • 脚本文件: scripts/"
echo "   • 配置文件: deployment/"
echo "   • 源代码: frontend/src/, backend/src/"
echo -e "${YELLOW}   ⚠️  跳过: node_modules/ (第三方库)${NC}"
echo ""

# 1. 检查URL硬编码
echo -e "${BLUE}🔍 检查URL硬编码...${NC}"

# 检查 http://localhost 硬编码
while IFS= read -r line; do
    if [[ -n "$line" ]]; then
        file=$(echo "$line" | cut -d: -f1)
        line_num=$(echo "$line" | cut -d: -f2)
        content=$(echo "$line" | cut -d: -f3-)
        
        # 跳过注释行、文档和检查工具自身
        if [[ "$content" =~ ^[[:space:]]*# ]] || [[ "$file" =~ \.md$ ]] || [[ "$file" =~ check-hardcode\.sh$ ]]; then
            continue
        fi
        
        record_issue "CRITICAL" "$file" "$line_num" "硬编码URL: http://localhost" "使用动态变量 \${FRONTEND_URL} 或 \${BACKEND_URL}"
    fi
done < <(grep -rn "http://localhost" "$PROJECT_ROOT/scripts/" "$PROJECT_ROOT/deployment/" 2>/dev/null | grep -v "/node_modules/" || true)

# 检查 https://localhost 硬编码
while IFS= read -r line; do
    if [[ -n "$line" ]]; then
        file=$(echo "$line" | cut -d: -f1)
        line_num=$(echo "$line" | cut -d: -f2)
        content=$(echo "$line" | cut -d: -f3-)
        
        if [[ "$content" =~ ^[[:space:]]*# ]] || [[ "$file" =~ \.md$ ]] || [[ "$file" =~ check-hardcode\.sh$ ]]; then
            continue
        fi
        
        record_issue "CRITICAL" "$file" "$line_num" "硬编码HTTPS URL: https://localhost" "使用动态变量 \${FRONTEND_URL} 或 \${BACKEND_URL}"
    fi
done < <(grep -rn "https://localhost" "$PROJECT_ROOT/scripts/" "$PROJECT_ROOT/deployment/" 2>/dev/null | grep -v "/node_modules/" || true)

# 2. 检查端口硬编码
echo -e "${BLUE}🔍 检查端口硬编码...${NC}"

# 常见端口硬编码检查
HARDCODED_PORTS=("1337" "5432" "7700" "8000" "8001" "8080")
for port in "${HARDCODED_PORTS[@]}"; do
    while IFS= read -r line; do
        if [[ -n "$line" ]]; then
            file=$(echo "$line" | cut -d: -f1)
            line_num=$(echo "$line" | cut -d: -f2)
            content=$(echo "$line" | cut -d: -f3-)
            
            # 跳过已经使用变量的情况和注释
            if [[ "$content" =~ \$.*$port ]] || [[ "$content" =~ ^[[:space:]]*# ]] || [[ "$file" =~ \.md$ ]]; then
                continue
            fi
            
            # 跳过明显的端口定义行（如在配置文件中定义端口）
            if [[ "$content" =~ PORT.*=.*$port ]] || [[ "$content" =~ _PORT.*=.*$port ]]; then
                continue
            fi
            
            record_issue "WARNING" "$file" "$line_num" "硬编码端口: $port" "使用对应的端口变量，如 \${BACKEND_PORT}, \${DATABASE_PORT}"
        fi
    done < <(grep -rn ":$port\|=$port\|$port " "$PROJECT_ROOT/scripts/" "$PROJECT_ROOT/deployment/" 2>/dev/null | grep -v "\$" | grep -v "/node_modules/" || true)
done

# 3. 检查颜色硬编码
echo -e "${BLUE}🔍 检查颜色硬编码...${NC}"

while IFS= read -r line; do
    if [[ -n "$line" ]]; then
        file=$(echo "$line" | cut -d: -f1)
        line_num=$(echo "$line" | cut -d: -f2)
        content=$(echo "$line" | cut -d: -f3-)
        
        # 跳过颜色定义行和注释
        if [[ "$content" =~ (RED|GREEN|BLUE|YELLOW|NC).*= ]] || [[ "$content" =~ ^[[:space:]]*# ]] || [[ "$file" =~ \.md$ ]]; then
            continue
        fi
        
        record_issue "WARNING" "$file" "$line_num" "硬编码颜色代码" "使用预定义颜色变量 \${RED}, \${GREEN}, \${BLUE} 等"
    fi
done < <(grep -rn "\\033\[" "$PROJECT_ROOT/scripts/" 2>/dev/null | grep -v "\$" | grep -v "/node_modules/" || true)

# 4. 检查路径硬编码
echo -e "${BLUE}🔍 检查路径硬编码...${NC}"

# 检查绝对路径硬编码
while IFS= read -r line; do
    if [[ -n "$line" ]]; then
        file=$(echo "$line" | cut -d: -f1)
        line_num=$(echo "$line" | cut -d: -f2)
        content=$(echo "$line" | cut -d: -f3-)
        
        # 跳过注释、文档、检查工具自身和明显的正当用途
        if [[ "$content" =~ ^[[:space:]]*# ]] || [[ "$file" =~ \.md$ ]] || [[ "$file" =~ check-hardcode\.sh$ ]] || [[ "$content" =~ "SCRIPT_DIR.*=" ]]; then
            continue
        fi
        
        record_issue "WARNING" "$file" "$line_num" "绝对路径硬编码" "使用相对路径或 \${PROJECT_ROOT}, \${SCRIPT_DIR} 变量"
    fi
done < <(grep -rn "/Volumes/\|/Users/\|/home/" "$PROJECT_ROOT/scripts/" "$PROJECT_ROOT/deployment/" 2>/dev/null | grep -v "/node_modules/" || true)

# 5. 检查Bash语法问题
echo -e "${BLUE}🔍 检查Bash语法...${NC}"

find "$PROJECT_ROOT/scripts/" -name "*.sh" | while read -r script_file; do
    if ! bash -n "$script_file" 2>/dev/null; then
        record_issue "CRITICAL" "$script_file" "?" "Bash语法错误" "修复脚本语法，使用 bash -n 检查"
    fi
done

# 6. 检查条件判断语法
echo -e "${BLUE}🔍 检查条件判断语法...${NC}"

# 检查可能有问题的条件判断
while IFS= read -r line; do
    if [[ -n "$line" ]]; then
        file=$(echo "$line" | cut -d: -f1)
        line_num=$(echo "$line" | cut -d: -f2)
        content=$(echo "$line" | cut -d: -f3-)
        
        # 跳过注释
        if [[ "$content" =~ ^[[:space:]]*# ]] || [[ "$file" =~ \.md$ ]]; then
            continue
        fi
        
        # 检查复杂条件判断是否使用了括号
        if [[ "$content" =~ "&&.*\|\|" ]] && [[ ! "$content" =~ \( ]]; then
            record_issue "WARNING" "$file" "$line_num" "复杂条件判断缺少括号" "使用括号明确逻辑优先级: (condition1 && condition2) || condition3"
        fi
    fi
done < <(grep -rn "if.*&&.*||" "$PROJECT_ROOT/scripts/" 2>/dev/null | grep -v "/node_modules/" || true)

# 7. 检查未引用的变量
echo -e "${BLUE}🔍 检查变量引用...${NC}"

while IFS= read -r line; do
    if [[ -n "$line" ]]; then
        file=$(echo "$line" | cut -d: -f1)
        line_num=$(echo "$line" | cut -d: -f2)
        content=$(echo "$line" | cut -d: -f3-)
        
        # 跳过注释、文档、检查工具自身和正常的bash语法
        if [[ "$content" =~ ^[[:space:]]*# ]] || [[ "$file" =~ \.md$ ]] || [[ "$file" =~ check-hardcode\.sh$ ]] || 
           [[ "$content" =~ "for.*in.*\$" ]] || [[ "$content" =~ "\[\[.*==.*\*.*\*" ]] || [[ "$content" =~ "\[\[.*=~" ]] ||
           [[ "$content" =~ "\$REPLY" ]] || [[ "$content" =~ "read.*-p" ]]; then
            continue
        fi
        
        # 只检查真正有问题的变量引用模式
        if [[ "$content" =~ \[[[:space:]]*\$[A-Z_][A-Z0-9_]*[[:space:]]*[=!][^=] ]]; then
            record_issue "WARNING" "$file" "$line_num" "可能的未引用变量" "确保变量正确引用: \"\$VARIABLE\""
        fi
    fi
done < <(grep -rn '\[ *\$[A-Z_][A-Z0-9_]* *[=!]' "$PROJECT_ROOT/scripts/" 2>/dev/null | grep -v "/node_modules/" || true)

# 8. 生成报告
echo "=================================================="
echo -e "${BLUE}📊 检查结果统计${NC}"
echo "=================================================="

if [ $TOTAL_ISSUES -eq 0 ]; then
    echo -e "${GREEN}🎉 恭喜！未发现硬编码问题${NC}"
    echo -e "${GREEN}✅ 代码质量良好，符合项目规范${NC}"
else
    echo -e "${RED}❌ 发现 $TOTAL_ISSUES 个问题${NC}"
    echo -e "   • ${RED}严重问题: $CRITICAL_ISSUES 个${NC}"
    echo -e "   • ${YELLOW}警告问题: $WARNING_ISSUES 个${NC}"
    echo ""
    
    if [ $CRITICAL_ISSUES -gt 0 ]; then
        echo -e "${RED}🚨 严重问题需要立即修复！${NC}"
        echo "   • URL硬编码会导致环境切换失败"
        echo "   • 语法错误会导致脚本无法运行"
    fi
    
    if [ $WARNING_ISSUES -gt 0 ]; then
        echo -e "${YELLOW}⚠️  警告问题建议修复${NC}"
        echo "   • 提升代码可维护性"
        echo "   • 符合项目开发规范"
    fi
fi

echo ""
echo -e "${BLUE}📋 修复建议${NC}"
echo "=================================================="
echo "1. 查看详细规范: .cursor/rules/hardcode-prevention.mdc"
echo "2. 使用动态配置: deployment/configure-unified-env.sh"
echo "3. 定期运行检查: scripts/tools/check-hardcode.sh"
echo "4. 代码提交前检查: 确保无硬编码问题"

# 生成详细报告文件
if [ $TOTAL_ISSUES -gt 0 ]; then
    REPORT_FILE="$PROJECT_ROOT/logs/hardcode-check-$(date +%Y%m%d_%H%M%S).log"
    mkdir -p "$(dirname "$REPORT_FILE")"
    
    {
        echo "硬编码检查报告 - $(date)"
        echo "=================================="
        echo "总问题数: $TOTAL_ISSUES"
        echo "严重问题: $CRITICAL_ISSUES"
        echo "警告问题: $WARNING_ISSUES"
        echo ""
        echo "详细问题列表:"
        echo -e "$HARDCODE_ISSUES"
    } > "$REPORT_FILE"
    
    echo ""
    echo -e "${BLUE}📄 详细报告已保存到: $REPORT_FILE${NC}"
fi

# 退出码
if [ $CRITICAL_ISSUES -gt 0 ]; then
    exit 1
elif [ $WARNING_ISSUES -gt 0 ]; then
    exit 2
else
    exit 0
fi