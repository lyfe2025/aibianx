#!/bin/bash

# AI变现之路 - 提交前快速检查脚本
# 基于 .cursor/rules/hardcode-prevention.mdc 和 workflow-verification.mdc 规范

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo -e "${BLUE}🚀 AI变现之路 - 提交前快速检查${NC}"
echo "==========================================="

TOTAL_ERRORS=0
TOTAL_WARNINGS=0

# 记录错误函数
record_error() {
    echo -e "${RED}❌ $1${NC}"
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
}

record_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    TOTAL_WARNINGS=$((TOTAL_WARNINGS + 1))
}

record_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 🚨 第0步：硬编码检查（最高优先级）
echo -e "${BLUE}0️⃣ 硬编码和语法检查${NC}"
echo "   运行硬编码检查工具..."

if [ -f "$PROJECT_ROOT/scripts/tools/check-hardcode.sh" ]; then
    # 显示进度，不隐藏输出
    echo "   📋 正在扫描项目文件..."
    "$PROJECT_ROOT/scripts/tools/check-hardcode.sh"
    HARDCODE_CHECK=$?
    
    echo ""
    if [ $HARDCODE_CHECK -eq 1 ]; then
        record_error "发现严重硬编码问题，必须立即修复！"
        echo "   💡 查看详细问题: ./scripts/tools/check-hardcode.sh"
    elif [ $HARDCODE_CHECK -eq 2 ]; then
        record_warning "发现硬编码警告，建议修复"
        echo "   💡 查看详细问题: ./scripts/tools/check-hardcode.sh"
    else
        record_success "硬编码检查通过"
    fi
else
    record_warning "硬编码检查工具不存在"
fi

# ✅ 第0.5步：根目录NPM文件检查
echo -e "${BLUE}0️⃣.5️⃣ 根目录NPM文件检查${NC}"
echo "   检查根目录是否有意外的npm文件..."

if [ -f "$PROJECT_ROOT/scripts/tools/check-root-npm.sh" ]; then
    "$PROJECT_ROOT/scripts/tools/check-root-npm.sh" > /dev/null 2>&1
    ROOT_NPM_CHECK=$?
    
    if [ $ROOT_NPM_CHECK -eq 0 ]; then
        record_success "根目录npm文件检查通过"
    else
        record_error "根目录发现不应该的npm文件！"
        echo "   💡 查看详细问题: ./scripts/tools/check-root-npm.sh"
        echo "   🧹 自动清理: ./scripts/tools/check-root-npm.sh --clean"
    fi
else
    record_warning "根目录npm检查工具不存在"
fi

# ✅ 第1步：基础语法检查
echo -e "${BLUE}1️⃣ 基础语法检查${NC}"

# 检查Shell脚本语法
echo "   检查Shell脚本语法..."
SYNTAX_ERRORS=0
find "$PROJECT_ROOT/scripts/" -name "*.sh" | while read -r script_file; do
    if ! bash -n "$script_file" 2>/dev/null; then
        echo "   ❌ 语法错误: $script_file"
        SYNTAX_ERRORS=$((SYNTAX_ERRORS + 1))
    fi
done

if [ $SYNTAX_ERRORS -eq 0 ]; then
    record_success "Shell脚本语法检查通过"
else
    record_error "发现 $SYNTAX_ERRORS 个Shell脚本语法错误"
fi

# ✅ 第2步：环境配置检查
echo -e "${BLUE}2️⃣ 环境配置检查${NC}"

echo "   检查必需的环境变量文件..."
if [ -f "$PROJECT_ROOT/backend/.env" ] && [ -f "$PROJECT_ROOT/frontend/.env.local" ]; then
    record_success "环境变量文件存在"
else
    record_error "环境变量文件缺失"
fi

echo "   检查动态配置加载..."
if source "$PROJECT_ROOT/deployment/configure-unified-env.sh" 2>/dev/null; then
    record_success "动态配置加载成功"
    echo "      FRONTEND_URL: $FRONTEND_URL"
    echo "      BACKEND_URL: $BACKEND_URL"
    echo "      ADMIN_URL: $ADMIN_URL"
else
    record_error "动态配置加载失败"
fi

# ✅ 第3步：服务可用性检查（可选）
echo -e "${BLUE}3️⃣ 服务可用性检查 (可选)${NC}"

if command -v curl > /dev/null 2>&1; then
    echo "   检查后端API可访问性..."
    if [ -n "$BACKEND_URL" ]; then
        if curl -s --max-time 5 "${BACKEND_URL}/api/articles" > /dev/null 2>&1; then
            record_success "后端API正常"
        else
            record_warning "后端API不可访问（可能服务未启动）"
        fi
    else
        record_warning "BACKEND_URL 未设置"
    fi

    echo "   检查前端页面可访问性..."
    if [ -n "$FRONTEND_URL" ]; then
        if curl -s --max-time 5 "$FRONTEND_URL" > /dev/null 2>&1; then
            record_success "前端页面正常"
        else
            record_warning "前端页面不可访问（可能服务未启动）"
        fi
    else
        record_warning "FRONTEND_URL 未设置"
    fi
else
    record_warning "curl 命令不可用，跳过服务检查"
fi

# ✅ 第4步：文件大小检查
echo -e "${BLUE}4️⃣ 文件大小检查${NC}"

echo "   检查是否有文件超过500行..."
LARGE_FILES=0
find "$PROJECT_ROOT/scripts/" -name "*.sh" | while read -r script_file; do
    LINES=$(wc -l < "$script_file")
    if [ "$LINES" -gt 500 ]; then
        echo "   ⚠️  文件过大: $script_file ($LINES 行)"
        LARGE_FILES=$((LARGE_FILES + 1))
    fi
done

if [ $LARGE_FILES -eq 0 ]; then
    record_success "所有文件大小合适"
else
    record_warning "发现 $LARGE_FILES 个超过500行的文件"
fi

# 总结
echo ""
echo "==========================================="
echo -e "${BLUE}📊 检查结果总结${NC}"
echo "==========================================="

if [ $TOTAL_ERRORS -eq 0 ] && [ $TOTAL_WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 所有检查通过！可以安全提交代码${NC}"
    echo -e "${GREEN}✨ 代码质量良好，符合项目规范${NC}"
elif [ $TOTAL_ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  发现 $TOTAL_WARNINGS 个警告，建议修复后提交${NC}"
    echo -e "${BLUE}💡 提示: 警告不会阻止提交，但建议修复以提升代码质量${NC}"
else
    echo -e "${RED}❌ 发现 $TOTAL_ERRORS 个错误，$TOTAL_WARNINGS 个警告${NC}"
    echo -e "${RED}🚨 必须修复所有错误才能提交代码！${NC}"
fi

echo ""
echo -e "${BLUE}📋 快速修复建议${NC}"
echo "• 硬编码问题: 运行 ./scripts/tools/check-hardcode.sh"
echo "• 语法错误: 使用 bash -n script.sh 检查具体语法"
echo "• 配置问题: 检查 deployment/config/deploy.conf 和运行 ./deployment/configure-unified-env.sh"
echo "• 服务启动: 运行 ./scripts.sh 选择选项2启动环境"

# 退出码
if [ $TOTAL_ERRORS -gt 0 ]; then
    exit 1
elif [ $TOTAL_WARNINGS -gt 0 ]; then
    exit 2
else
    exit 0
fi