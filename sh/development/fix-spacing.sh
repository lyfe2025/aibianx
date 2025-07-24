#!/bin/bash

# ===================================
# AI变现之路 - 间距规范修复脚本
# ===================================

set -e  # 遇到错误立即退出

echo "🚀 开始执行间距规范修复..."
echo "=============================="

# 检查是否在正确的目录
if [ ! -d "frontend/src" ]; then
    echo "❌ 错误：请在项目根目录执行此脚本"
    exit 1
fi

# 创建备份目录
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
echo "📁 创建备份目录: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# 复制需要修复的文件到备份目录
echo "💾 备份原始文件..."
cp -r frontend/src "$BACKUP_DIR/"

echo ""
echo "🔧 开始修复间距规范..."
echo "------------------------"

# 计数器
fixed_count=0

# 定义保护文件列表 (首屏和3D相关组件不修改)
PROTECTED_FILES=(
    "frontend/src/components/molecules/HeroSection/HeroSection.tsx"
    "frontend/src/components/molecules/HeroSectionNew/HeroSectionNew.tsx"
    "frontend/src/components/molecules/ThreeDSection/ThreeDSection.tsx"
    "frontend/src/components/ui/HeroBackground3D/HeroBackground3D.tsx"
    "frontend/src/components/ui/AIBrainModel/AIBrainModel.tsx"
    "frontend/src/components/ui/CSSParticleBackground/CSSParticleBackground.tsx"
    "frontend/src/components/ui/CSSParticleBackground/CSSParticleBackgroundClient.tsx"
    "frontend/src/app/weekly"
)

echo "🛡️  保护区域："
echo "   以下组件的间距保持不变 (首屏和3D效果)："
for file in "${PROTECTED_FILES[@]}"; do
    if [ -e "$file" ]; then
        echo "     ✅ $file"
    fi
done
echo ""

# 创建文件过滤函数 (排除保护文件)
filter_protected_files() {
    local pattern="$1"
    while IFS= read -r file; do
        local is_protected=false
        for protected in "${PROTECTED_FILES[@]}"; do
            if [[ "$file" == *"$protected"* ]]; then
                is_protected=true
                break
            fi
        done
        if [ "$is_protected" = false ]; then
            echo "$file"
        fi
    done < <(find frontend/src -name "*.tsx" -type f -exec grep -l "$pattern" {} \; 2>/dev/null)
}

# 第一阶段：页面级间距修复
echo "📏 第一阶段：修复页面级间距"

# 修复标准页面间距 80px 0
echo "  - 修复标准页面间距 (80px 0)"
files_to_fix=$(filter_protected_files "padding: '80px 0'")
if [ -n "$files_to_fix" ]; then
    echo "$files_to_fix" | while IFS= read -r file; do
        sed -i.tmp "s/padding: '80px 0'/padding: 'var(--page-padding-top-md) 0 var(--page-padding-bottom-md)'/g" "$file"
    done
    ((fixed_count++))
    echo "    ✅ 已修复"
else
    echo "    ⏸️  未找到需要修复的项"
fi

# 修复大页面间距 120px 0
echo "  - 修复大页面间距 (120px 0)"
files_to_fix=$(filter_protected_files "padding: '120px 0'")
if [ -n "$files_to_fix" ]; then
    echo "$files_to_fix" | while IFS= read -r file; do
        sed -i.tmp "s/padding: '120px 0'/padding: 'var(--page-padding-top-xl) 0 var(--page-padding-bottom-xl)'/g" "$file"
    done
    ((fixed_count++))
    echo "    ✅ 已修复"
else
    echo "    ⏸️  未找到需要修复的项"
fi

echo ""
echo "📦 第二阶段：修复区块间距"

# 修复标题底部间距 60px
echo "  - 修复标题底部间距 (60px)"
files_to_fix=$(filter_protected_files "marginBottom: '60px'")
if [ -n "$files_to_fix" ]; then
    echo "$files_to_fix" | while IFS= read -r file; do
        sed -i.tmp "s/marginBottom: '60px'/marginBottom: 'var(--section-spacing-md)'/g" "$file"
    done
    ((fixed_count++))
    echo "    ✅ 已修复"
else
    echo "    ⏸️  未找到需要修复的项"
fi

# 修复大标题底部间距 80px
echo "  - 修复大标题底部间距 (80px)"
files_to_fix=$(filter_protected_files "marginBottom: '80px'")
if [ -n "$files_to_fix" ]; then
    echo "$files_to_fix" | while IFS= read -r file; do
        sed -i.tmp "s/marginBottom: '80px'/marginBottom: 'var(--section-spacing-lg)'/g" "$file"
    done
    ((fixed_count++))
    echo "    ✅ 已修复"
else
    echo "    ⏸️  未找到需要修复的项"
fi

# 修复卡片间距 32px
echo "  - 修复卡片间距 (32px)"
files_to_fix=$(filter_protected_files "marginBottom: '32px'")
if [ -n "$files_to_fix" ]; then
    echo "$files_to_fix" | while IFS= read -r file; do
        sed -i.tmp "s/marginBottom: '32px'/marginBottom: 'var(--card-gap-lg)'/g" "$file"
    done
    ((fixed_count++))
    echo "    ✅ 已修复"
else
    echo "    ⏸️  未找到需要修复的项"
fi

echo ""
echo "🎯 第三阶段：修复标题间距变量"

# 修复标题间距变量
echo "  - 修复标题间距变量 (--spacing-4)"
files_to_fix=$(filter_protected_files "marginBottom: 'var(--spacing-4)'")
if [ -n "$files_to_fix" ]; then
    echo "$files_to_fix" | while IFS= read -r file; do
        sed -i.tmp "s/marginBottom: 'var(--spacing-4)'/marginBottom: 'var(--title-margin-bottom-md)'/g" "$file"
    done
    ((fixed_count++))
    echo "    ✅ 已修复"
else
    echo "    ⏸️  未找到需要修复的项"
fi

# 修复标题间距变量
echo "  - 修复标题间距变量 (--spacing-6)"
files_to_fix=$(filter_protected_files "marginBottom: 'var(--spacing-6)'")
if [ -n "$files_to_fix" ]; then
    echo "$files_to_fix" | while IFS= read -r file; do
        sed -i.tmp "s/marginBottom: 'var(--spacing-6)'/marginBottom: 'var(--title-margin-bottom-md)'/g" "$file"
    done
    ((fixed_count++))
    echo "    ✅ 已修复"
else
    echo "    ⏸️  未找到需要修复的项"
fi

echo ""
echo "🧹 清理临时文件..."
find frontend/src -name "*.tmp" -delete

echo ""
echo "📊 修复完成报告"
echo "=================="
echo "✅ 共修复了 $fixed_count 个间距模式"
echo "💾 原始文件已备份到: $BACKUP_DIR"

# 检查剩余的固定像素值 (排除保护文件)
echo ""
echo "🔍 检查剩余的固定像素值 (排除首屏和3D组件)..."

# 获取非保护文件中的固定间距
remaining_padding_files=()
remaining_margin_files=()

while IFS= read -r file; do
    local is_protected=false
    for protected in "${PROTECTED_FILES[@]}"; do
        if [[ "$file" == *"$protected"* ]]; then
            is_protected=true
            break
        fi
    done
    if [ "$is_protected" = false ]; then
        remaining_padding_files+=("$file")
    fi
done < <(find frontend/src -name "*.tsx" -exec grep -l "padding:.*[0-9]px" {} \; 2>/dev/null)

while IFS= read -r file; do
    local is_protected=false
    for protected in "${PROTECTED_FILES[@]}"; do
        if [[ "$file" == *"$protected"* ]]; then
            is_protected=true
            break
        fi
    done
    if [ "$is_protected" = false ]; then
        remaining_margin_files+=("$file")
    fi
done < <(find frontend/src -name "*.tsx" -exec grep -l "margin.*[0-9]px" {} \; 2>/dev/null)

echo "📋 剩余统计 (排除保护区域)："
echo "  - 包含固定padding的文件：${#remaining_padding_files[@]} 个"
echo "  - 包含固定margin的文件：${#remaining_margin_files[@]} 个"

if [ ${#remaining_padding_files[@]} -gt 0 ] || [ ${#remaining_margin_files[@]} -gt 0 ]; then
    echo ""
    echo "⚠️  仍有文件包含固定像素值，建议手动检查："
    if [ ${#remaining_padding_files[@]} -gt 0 ]; then
        echo "    固定padding文件："
        printf '      %s\n' "${remaining_padding_files[@]:0:5}"
    fi
    if [ ${#remaining_margin_files[@]} -gt 0 ]; then
        echo "    固定margin文件："
        printf '      %s\n' "${remaining_margin_files[@]:0:5}"
    fi
    echo ""
    echo "💡 注意：首屏和3D组件的固定间距已被保护，无需修改"
fi

echo ""
echo "🎉 间距规范修复完成！"
echo "========================="
echo "💡 建议："
echo "  1. 测试修改后的页面显示效果"
echo "  2. 检查响应式设计是否正常"
echo "  3. 如有问题，可从备份目录恢复：$BACKUP_DIR"
echo ""
echo "📖 查看完整指南："
echo "  docs/开发指南/间距规范指南.md"
echo "  docs/开发指南/间距规范实施计划.md" 