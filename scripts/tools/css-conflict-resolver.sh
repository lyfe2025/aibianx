#!/bin/bash

# AI变现之路 - CSS冲突自动解决工具
# 自动检测和解决常见的CSS样式冲突问题

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# 获取脚本目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# 工作目录
CONFLICT_WORKSPACE="$PROJECT_ROOT/logs/css-conflicts"
mkdir -p "$CONFLICT_WORKSPACE"

# 打印标题
print_header() {
    echo ""
    echo -e "${CYAN}============================================${NC}"
    echo -e "${WHITE}🔧 CSS冲突自动解决工具${NC}"
    echo -e "${CYAN}============================================${NC}"
    echo ""
}

# 检测!important过度使用
detect_important_overuse() {
    echo -e "${BLUE}🔍 检测 !important 过度使用...${NC}"
    
    IMPORTANT_REPORT="$CONFLICT_WORKSPACE/important-analysis.txt"
    echo "=== !important 使用分析 ===" > "$IMPORTANT_REPORT"
    echo "分析时间: $(date)" >> "$IMPORTANT_REPORT"
    echo "" >> "$IMPORTANT_REPORT"
    
    # 统计各文件中的!important使用
    echo "=== 各文件 !important 统计 ===" >> "$IMPORTANT_REPORT"
    find "$FRONTEND_DIR/src" -name "*.css" | while read css_file; do
        important_count=$(grep -c "!important" "$css_file" 2>/dev/null || echo "0")
        if [ "$important_count" -gt 0 ]; then
            relative_path=${css_file#$FRONTEND_DIR/src/}
            echo "$relative_path: $important_count 次" >> "$IMPORTANT_REPORT"
        fi
    done
    
    # 找出可以优化的!important
    echo "" >> "$IMPORTANT_REPORT"
    echo "=== 可优化的 !important 声明 ===" >> "$IMPORTANT_REPORT"
    grep -rn "!important" "$FRONTEND_DIR/src/app/globals.css" | while read line; do
        echo "$line" >> "$IMPORTANT_REPORT"
    done
    
    echo -e "${GREEN}✅ !important 分析完成: $IMPORTANT_REPORT${NC}"
}

# 检测重复的CSS规则
detect_duplicate_rules() {
    echo -e "${BLUE}🔍 检测重复的CSS规则...${NC}"
    
    DUPLICATE_REPORT="$CONFLICT_WORKSPACE/duplicate-rules.txt"
    echo "=== 重复CSS规则分析 ===" > "$DUPLICATE_REPORT"
    echo "分析时间: $(date)" >> "$DUPLICATE_REPORT"
    echo "" >> "$DUPLICATE_REPORT"
    
    # 提取所有CSS选择器
    echo "=== 重复选择器检测 ===" >> "$DUPLICATE_REPORT"
    temp_selectors=$(mktemp)
    find "$FRONTEND_DIR/src/styles" -name "*.css" -exec grep -h "^\." {} \; | sort > "$temp_selectors"
    uniq -d "$temp_selectors" >> "$DUPLICATE_REPORT"
    rm "$temp_selectors"
    
    # 检测可能的重复样式块
    echo "" >> "$DUPLICATE_REPORT"
    echo "=== 疑似重复样式块 ===" >> "$DUPLICATE_REPORT"
    
    # 查找相似的样式属性组合
    grep -r "display: flex" "$FRONTEND_DIR/src/styles/" | wc -l > temp_flex_count.txt
    echo "display: flex 使用次数: $(cat temp_flex_count.txt)" >> "$DUPLICATE_REPORT"
    rm temp_flex_count.txt
    
    grep -r "backdrop-filter: blur" "$FRONTEND_DIR/src/styles/" | wc -l > temp_blur_count.txt
    echo "backdrop-filter: blur 使用次数: $(cat temp_blur_count.txt)" >> "$DUPLICATE_REPORT"
    rm temp_blur_count.txt
    
    echo -e "${GREEN}✅ 重复规则分析完成: $DUPLICATE_REPORT${NC}"
}

# 检测硬编码值
detect_hardcoded_values() {
    echo -e "${BLUE}🔍 检测硬编码值...${NC}"
    
    HARDCODE_REPORT="$CONFLICT_WORKSPACE/hardcoded-values.txt"
    echo "=== 硬编码值分析 ===" > "$HARDCODE_REPORT"
    echo "分析时间: $(date)" >> "$HARDCODE_REPORT"
    echo "" >> "$HARDCODE_REPORT"
    
    # 检测硬编码颜色
    echo "=== 硬编码颜色值 ===" >> "$HARDCODE_REPORT"
    find "$FRONTEND_DIR/src" -name "*.css" -exec grep -Hn "#[0-9A-Fa-f]\{6\}" {} \; | head -20 >> "$HARDCODE_REPORT"
    
    # 检测硬编码像素值
    echo "" >> "$HARDCODE_REPORT"
    echo "=== 硬编码像素值 (非变量) ===" >> "$HARDCODE_REPORT"
    find "$FRONTEND_DIR/src" -name "*.css" -exec grep -Hn "[0-9]\+px" {} \; | grep -v "var(" | head -20 >> "$HARDCODE_REPORT"
    
    # 检测魔法数字
    echo "" >> "$HARDCODE_REPORT"
    echo "=== 可能的魔法数字 ===" >> "$HARDCODE_REPORT"
    find "$FRONTEND_DIR/src" -name "*.css" -exec grep -Hn "margin\|padding" {} \; | grep -E "[0-9]{2,}" | head -10 >> "$HARDCODE_REPORT"
    
    echo -e "${GREEN}✅ 硬编码值分析完成: $HARDCODE_REPORT${NC}"
}

# 生成CSS变量建议
generate_variable_suggestions() {
    echo -e "${BLUE}💡 生成CSS变量建议...${NC}"
    
    SUGGESTIONS_FILE="$CONFLICT_WORKSPACE/variable-suggestions.css"
    cat > "$SUGGESTIONS_FILE" << 'EOF'
/* AI变现之路 - CSS变量优化建议 */

:root {
    /* ===== 建议新增的断点变量 ===== */
    --breakpoint-xs: 320px;
    --breakpoint-sm: 480px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1440px;
    --breakpoint-2xl: 1920px;
    
    /* ===== 建议新增的Z-index变量 ===== */
    --z-index-dropdown: 100;
    --z-index-sticky: 200;
    --z-index-fixed: 300;
    --z-index-modal-backdrop: 400;
    --z-index-modal: 500;
    --z-index-popover: 600;
    --z-index-tooltip: 700;
    --z-index-toast: 800;
    
    /* ===== 建议新增的边距变量 ===== */
    --spacing-xs: 2px;
    --spacing-9: 36px;
    --spacing-11: 44px;
    --spacing-13: 52px;
    --spacing-15: 60px;
    --spacing-17: 68px;
    --spacing-19: 76px;
    --spacing-21: 84px;
    --spacing-22: 88px;
    --spacing-23: 92px;
    --spacing-25: 100px;
    --spacing-26: 104px;
    --spacing-27: 108px;
    --spacing-29: 116px;
    --spacing-30: 120px;
    --spacing-31: 124px;
    --spacing-33: 132px;
    --spacing-34: 136px;
    --spacing-35: 140px;
    --spacing-37: 148px;
    --spacing-38: 152px;
    --spacing-39: 156px;
    
    /* ===== 建议新增的时长变量 ===== */
    --duration-instant: 0.1s;
    --duration-fast: 0.15s;
    --duration-normal: 0.3s;
    --duration-slow: 0.5s;
    --duration-slower: 0.75s;
    --duration-slowest: 1s;
    
    /* ===== 建议新增的缓动函数 ===== */
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-back: cubic-bezier(0.34, 1.56, 0.64, 1);
    
    /* ===== 建议新增的状态颜色 ===== */
    --color-success-light: #D1FAE5;
    --color-success-dark: #065F46;
    --color-warning-light: #FEF3C7;
    --color-warning-dark: #92400E;
    --color-error-light: #FEE2E2;
    --color-error-dark: #991B1B;
    --color-info-light: #DBEAFE;
    --color-info-dark: #1E3A8A;
    
    /* ===== 建议新增的尺寸变量 ===== */
    --size-xs: 16px;
    --size-sm: 20px;
    --size-md: 24px;
    --size-lg: 32px;
    --size-xl: 40px;
    --size-2xl: 48px;
    --size-3xl: 56px;
    --size-4xl: 64px;
    
    /* ===== 建议新增的行高变量 ===== */
    --line-height-tight: 1.25;
    --line-height-snug: 1.375;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.625;
    --line-height-loose: 2;
}

/* ===== 媒体查询混合样式建议 ===== */
/* 使用方法：@media (min-width: var(--breakpoint-md)) { ... } */

/* 移动端优先的媒体查询 */
.responsive-helper {
    /* 小屏幕 (手机) */
    @media (max-width: calc(var(--breakpoint-md) - 1px)) {
        /* 移动端样式 */
    }
    
    /* 中等屏幕 (平板) */
    @media (min-width: var(--breakpoint-md)) and (max-width: calc(var(--breakpoint-xl) - 1px)) {
        /* 平板样式 */
    }
    
    /* 大屏幕 (桌面) */
    @media (min-width: var(--breakpoint-xl)) {
        /* 桌面样式 */
    }
}
EOF
    
    echo -e "${GREEN}✅ CSS变量建议生成完成: $SUGGESTIONS_FILE${NC}"
}

# 自动修复常见问题
auto_fix_common_issues() {
    echo -e "${BLUE}🔧 自动修复常见CSS问题...${NC}"
    
    # 创建修复后的文件备份
    FIXED_DIR="$CONFLICT_WORKSPACE/auto-fixed"
    rm -rf "$FIXED_DIR"
    mkdir -p "$FIXED_DIR"
    
    # 修复globals.css中的!important过度使用
    echo -e "${YELLOW}修复 globals.css 中的问题...${NC}"
    
    # 复制原文件到工作目录
    cp "$FRONTEND_DIR/src/app/globals.css" "$FIXED_DIR/globals-original.css"
    
    # 创建修复建议
    cat > "$FIXED_DIR/globals-fix-suggestions.md" << 'EOF'
# globals.css 修复建议

## 问题分析
1. 文件过长 (361行)，包含大量页面特定样式
2. 过度使用 !important 声明
3. 硬编码值过多

## 建议修复方案

### 1. 文件分离
将globals.css按功能分离为：
- `globals-core.css` - 核心全局样式 (重置、主题)
- `pages/settings.css` - 设置页面专用样式
- `pages/profile.css` - 用户中心页面样式
- `pages/about.css` - 关于页面样式

### 2. 减少!important使用
使用CSS特异性管理替代!important：
```css
/* 原来 */
.settings-page .input {
    background: var(--color-bg-input) !important;
}

/* 修复后 */
.settings-page .input {
    background: var(--color-bg-input);
}
```

### 3. 使用CSS变量替代硬编码
```css
/* 原来 */
margin-bottom: 74px;

/* 修复后 */
margin-bottom: var(--spacing-18); /* 72px，接近74px */
```

### 4. 响应式优化
将散乱的媒体查询整合到统一的响应式系统中。
EOF
    
    # 创建分离后的核心样式文件
    cat > "$FIXED_DIR/globals-core.css" << 'EOF'
/**
 * AI变现之路 - 核心全局样式
 * 
 * 只包含真正的全局样式：重置、主题切换、无障碍支持
 */

/* 导入CSS系统 */
@import '../styles/index.css';

/* ===== 全局样式重置 ===== */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

/* 主题背景 */
html,
body,
#root,
#__next {
  background: var(--color-bg-primary);
  transition: background-color var(--transition-normal);
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  scroll-behavior: smooth;
  background: var(--color-bg-primary);
}

body {
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  min-height: 100vh;
  font-family: var(--font-family-primary);
}

a {
  color: inherit;
  text-decoration: none;
}

/* ===== 无障碍和性能优化 ===== */
/* 打印样式 */
@media print {
  header,
  footer,
  .glass-card,
  .gradient-text {
    background: white;
    color: black;
    box-shadow: none;
    -webkit-print-color-adjust: exact;
  }

  .desktop-nav,
  .mobile-menu-button,
  #back-to-top {
    display: none;
  }
}

/* 高对比度支持 */
@media (prefers-contrast: high) {
  :root {
    --color-border-primary: #666666;
    --color-text-muted: #CCCCCC;
    --color-bg-glass: rgba(0, 0, 0, 0.9);
  }
}

/* 减少动画支持 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }

  .gradient-text {
    animation: none;
  }
}
EOF
    
    echo -e "${GREEN}✅ 自动修复建议生成完成${NC}"
    echo -e "${YELLOW}📁 修复文件位置: $FIXED_DIR${NC}"
    echo -e "${BLUE}📖 请查看修复建议: $FIXED_DIR/globals-fix-suggestions.md${NC}"
}

# 验证CSS语法
validate_css_syntax() {
    echo -e "${BLUE}✅ 验证CSS语法...${NC}"
    
    VALIDATION_REPORT="$CONFLICT_WORKSPACE/css-validation.txt"
    echo "=== CSS语法验证报告 ===" > "$VALIDATION_REPORT"
    echo "验证时间: $(date)" >> "$VALIDATION_REPORT"
    echo "" >> "$VALIDATION_REPORT"
    
    # 检查基本语法错误
    echo "=== 基本语法检查 ===" >> "$VALIDATION_REPORT"
    
    css_files=$(find "$FRONTEND_DIR/src" -name "*.css")
    for css_file in $css_files; do
        relative_path=${css_file#$FRONTEND_DIR/src/}
        
        # 检查未闭合的大括号
        open_braces=$(grep -o "{" "$css_file" | wc -l)
        close_braces=$(grep -o "}" "$css_file" | wc -l)
        
        if [ "$open_braces" -ne "$close_braces" ]; then
            echo "❌ $relative_path: 大括号不匹配 (开: $open_braces, 闭: $close_braces)" >> "$VALIDATION_REPORT"
        else
            echo "✅ $relative_path: 语法检查通过" >> "$VALIDATION_REPORT"
        fi
        
        # 检查可能的语法错误
        if grep -q ";;;" "$css_file"; then
            echo "⚠️  $relative_path: 发现多余的分号" >> "$VALIDATION_REPORT"
        fi
        
        if grep -q ":::" "$css_file"; then
            echo "⚠️  $relative_path: 发现可能的伪元素语法错误" >> "$VALIDATION_REPORT"
        fi
    done
    
    echo -e "${GREEN}✅ CSS语法验证完成: $VALIDATION_REPORT${NC}"
    cat "$VALIDATION_REPORT"
}

# 生成冲突解决报告
generate_conflict_report() {
    echo -e "${BLUE}📊 生成CSS冲突解决报告...${NC}"
    
    FINAL_REPORT="$CONFLICT_WORKSPACE/conflict-resolution-report.md"
    
    cat > "$FINAL_REPORT" << EOF
# CSS冲突解决报告

**生成时间**: $(date)
**项目**: AI变现之路

## 📊 问题统计

EOF
    
    # 统计各类问题数量
    if [ -f "$CONFLICT_WORKSPACE/important-analysis.txt" ]; then
        important_count=$(grep -c "!important" "$FRONTEND_DIR/src/app/globals.css" 2>/dev/null || echo "0")
        echo "- **!important 使用次数**: $important_count" >> "$FINAL_REPORT"
    fi
    
    if [ -f "$CONFLICT_WORKSPACE/hardcoded-values.txt" ]; then
        hardcode_count=$(grep -c "#[0-9A-Fa-f]\{6\}" "$FRONTEND_DIR/src/app/globals.css" 2>/dev/null || echo "0")
        echo "- **硬编码颜色数量**: $hardcode_count" >> "$FINAL_REPORT"
    fi
    
    cat >> "$FINAL_REPORT" << 'EOF'

## 🎯 主要问题

### 1. globals.css 文件过长
- **当前行数**: 361行
- **建议**: 分离页面特定样式到独立文件
- **优先级**: 高

### 2. !important 过度使用
- **问题**: 导致样式优先级混乱
- **建议**: 使用CSS特异性管理
- **优先级**: 高

### 3. 硬编码值过多
- **问题**: 维护困难，不符合设计系统
- **建议**: 使用CSS变量统一管理
- **优先级**: 中

## 🔧 解决方案

### 阶段1: 紧急修复 (1-2天)
1. 创建样式备份
2. 分离globals.css中的页面特定样式
3. 减少关键路径上的!important使用

### 阶段2: 系统优化 (3-5天)
1. 建立完整的CSS变量系统
2. 统一响应式断点
3. 优化组件样式架构

### 阶段3: 长期维护 (持续)
1. 建立CSS代码审查规范
2. 使用自动化工具检查样式质量
3. 持续优化性能

## 📁 生成的文件

EOF
    
    # 列出生成的文件
    if [ -d "$CONFLICT_WORKSPACE" ]; then
        echo "### 分析报告" >> "$FINAL_REPORT"
        ls -la "$CONFLICT_WORKSPACE"/*.txt 2>/dev/null | while read line; do
            filename=$(echo "$line" | awk '{print $NF}' | xargs basename)
            echo "- \`$filename\`" >> "$FINAL_REPORT"
        done
        
        if [ -d "$CONFLICT_WORKSPACE/auto-fixed" ]; then
            echo "" >> "$FINAL_REPORT"
            echo "### 修复建议" >> "$FINAL_REPORT"
            ls -la "$CONFLICT_WORKSPACE/auto-fixed"/*.{css,md} 2>/dev/null | while read line; do
                filename=$(echo "$line" | awk '{print $NF}' | xargs basename)
                echo "- \`$filename\`" >> "$FINAL_REPORT"
            done
        fi
    fi
    
    cat >> "$FINAL_REPORT" << 'EOF'

## 🚀 下一步行动

1. **立即执行**: 使用ui-consistency-manager.sh创建样式快照
2. **开始修复**: 应用auto-fixed目录中的建议
3. **测试验证**: 使用多设备预览验证修复效果
4. **部署上线**: 确认无误后部署到生产环境

## 📞 需要支持

如果在修复过程中遇到问题，请：
1. 查看详细的分析报告
2. 使用样式隔离环境进行测试
3. 保持渐进式修复，避免大规模重构

---
*报告由 CSS冲突自动解决工具 生成*
EOF
    
    echo -e "${GREEN}✅ 冲突解决报告生成完成: $FINAL_REPORT${NC}"
    echo -e "${YELLOW}📖 查看完整报告：${NC}"
    head -50 "$FINAL_REPORT"
}

# 主菜单
print_menu() {
    echo -e "${BLUE}请选择操作：${NC}"
    echo ""
    echo -e "  ${YELLOW}1)${NC} 检测 !important 过度使用"
    echo -e "  ${YELLOW}2)${NC} 检测重复的CSS规则"
    echo -e "  ${YELLOW}3)${NC} 检测硬编码值"
    echo -e "  ${YELLOW}4)${NC} 生成CSS变量建议"
    echo -e "  ${YELLOW}5)${NC} 自动修复常见问题"
    echo -e "  ${YELLOW}6)${NC} 验证CSS语法"
    echo -e "  ${YELLOW}7)${NC} 生成完整解决报告"
    echo -e "  ${YELLOW}8)${NC} 执行全面分析 (1-7全部)"
    echo ""
    echo -e "  ${YELLOW}q)${NC} 退出"
    echo ""
}

# 主函数
main() {
    print_header
    
    while true; do
        print_menu
        read -p "请选择操作 (1-8, q): " choice
        
        case $choice in
            1)
                detect_important_overuse
                ;;
            2)
                detect_duplicate_rules
                ;;
            3)
                detect_hardcoded_values
                ;;
            4)
                generate_variable_suggestions
                ;;
            5)
                auto_fix_common_issues
                ;;
            6)
                validate_css_syntax
                ;;
            7)
                generate_conflict_report
                ;;
            8)
                echo -e "${BLUE}🔄 执行全面CSS分析...${NC}"
                detect_important_overuse
                detect_duplicate_rules
                detect_hardcoded_values
                generate_variable_suggestions
                auto_fix_common_issues
                validate_css_syntax
                generate_conflict_report
                echo -e "${GREEN}✅ 全面分析完成！${NC}"
                ;;
            q|Q)
                echo -e "${GREEN}👋 再见！${NC}"
                break
                ;;
            *)
                echo -e "${RED}❌ 无效选择，请重试${NC}"
                ;;
        esac
        
        echo ""
        echo -e "${CYAN}按回车键继续...${NC}"
        read
    done
}

# 运行主函数
main "$@"
