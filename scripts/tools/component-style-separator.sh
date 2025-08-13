#!/bin/bash

# AI变现之路 - 组件样式分离工具
# 帮助将混合在一起的样式分离到独立的组件样式文件中

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
SEPARATION_WORKSPACE="$PROJECT_ROOT/logs/style-separation"
mkdir -p "$SEPARATION_WORKSPACE"

# 打印标题
print_header() {
    echo ""
    echo -e "${CYAN}============================================${NC}"
    echo -e "${WHITE}✂️ 组件样式分离工具${NC}"
    echo -e "${CYAN}============================================${NC}"
    echo ""
}

# 分析globals.css中的页面特定样式
analyze_page_specific_styles() {
    echo -e "${BLUE}🔍 分析页面特定样式...${NC}"
    
    ANALYSIS_FILE="$SEPARATION_WORKSPACE/page-styles-analysis.txt"
    echo "=== 页面特定样式分析 ===" > "$ANALYSIS_FILE"
    echo "分析时间: $(date)" >> "$ANALYSIS_FILE"
    echo "" >> "$ANALYSIS_FILE"
    
    # 提取页面特定的CSS规则
    globals_file="$FRONTEND_DIR/src/app/globals.css"
    
    if [ -f "$globals_file" ]; then
        echo "=== 设置页面样式 (.settings-page) ===" >> "$ANALYSIS_FILE"
        grep -A 5 -B 1 "\.settings-page" "$globals_file" >> "$ANALYSIS_FILE"
        
        echo "" >> "$ANALYSIS_FILE"
        echo "=== 用户中心页面样式 (.profile-page) ===" >> "$ANALYSIS_FILE"
        grep -A 5 -B 1 "\.profile-page" "$globals_file" >> "$ANALYSIS_FILE"
        
        echo "" >> "$ANALYSIS_FILE"
        echo "=== 关于页面样式 (.about-) ===" >> "$ANALYSIS_FILE"
        grep -A 5 -B 1 "\.about-" "$globals_file" >> "$ANALYSIS_FILE"
        
        echo "" >> "$ANALYSIS_FILE"
        echo "=== 搜索相关样式 (.search-) ===" >> "$ANALYSIS_FILE"
        grep -A 5 -B 1 "\.search-" "$globals_file" >> "$ANALYSIS_FILE"
        
        # 统计各类样式数量
        echo "" >> "$ANALYSIS_FILE"
        echo "=== 样式数量统计 ===" >> "$ANALYSIS_FILE"
        settings_count=$(grep -c "\.settings-" "$globals_file" 2>/dev/null || echo "0")
        profile_count=$(grep -c "\.profile-" "$globals_file" 2>/dev/null || echo "0")
        about_count=$(grep -c "\.about-" "$globals_file" 2>/dev/null || echo "0")
        search_count=$(grep -c "\.search-" "$globals_file" 2>/dev/null || echo "0")
        
        echo "设置页面样式规则: $settings_count" >> "$ANALYSIS_FILE"
        echo "用户中心样式规则: $profile_count" >> "$ANALYSIS_FILE"
        echo "关于页面样式规则: $about_count" >> "$ANALYSIS_FILE"
        echo "搜索相关样式规则: $search_count" >> "$ANALYSIS_FILE"
    fi
    
    echo -e "${GREEN}✅ 页面样式分析完成: $ANALYSIS_FILE${NC}"
}

# 生成设置页面独立样式文件
generate_settings_styles() {
    echo -e "${BLUE}📝 生成设置页面独立样式...${NC}"
    
    SETTINGS_CSS="$SEPARATION_WORKSPACE/settings.css"
    cat > "$SETTINGS_CSS" << 'EOF'
/**
 * AI变现之路 - 设置页面专用样式
 * 
 * 从globals.css分离的设置页面相关样式
 * 使用方法：在设置页面组件中导入此CSS文件
 */

/* ===== 设置页面输入框样式 ===== */
.settings-page .input,
.settings-page input[type="text"],
.settings-page input[type="email"],
.settings-page input[type="password"],
.settings-page input[type="tel"],
.settings-page textarea {
  background: var(--color-bg-input);
  backdrop-filter: blur(var(--blur-sm));
  -webkit-backdrop-filter: blur(var(--blur-sm));
  border: 1px solid var(--color-border-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-3) var(--spacing-4);
  transition: var(--transition-normal);
}

.settings-page .input:focus,
.settings-page input[type="text"]:focus,
.settings-page input[type="email"]:focus,
.settings-page input[type="password"]:focus,
.settings-page input[type="tel"]:focus,
.settings-page textarea:focus {
  border-color: var(--color-border-active);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  outline: none;
}

.settings-page .bio-textarea:focus {
  border: 1px solid var(--color-border-active);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  outline: none;
}

/* ===== 设置页面占位符样式 ===== */
.settings-page .input::placeholder,
.settings-page input::placeholder,
.settings-page textarea::placeholder {
  color: var(--color-text-muted);
  opacity: 1;
}

/* ===== 设置页面标签和帮助文本 ===== */
.settings-page .input-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-bottom: var(--spacing-2);
  display: block;
}

.settings-page .input-helper {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-1);
}

.settings-page .input-error {
  color: var(--color-error);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-1);
}

/* ===== 设置页面头像相关样式 ===== */
.avatar-edit-button:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-button);
  transition: var(--transition-normal);
}

.avatar-edit-text:hover {
  color: var(--color-text-primary);
}

.avatar-container:hover {
  border-color: var(--color-border-active);
  box-shadow: 0 0 24px rgba(59, 130, 246, 0.15);
  transition: var(--transition-normal);
}

/* ===== 设置页面卡片样式 ===== */
.settings-form-card {
  background: var(--color-bg-glass);
  backdrop-filter: blur(var(--blur-md));
  -webkit-backdrop-filter: blur(var(--blur-md));
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  transition: var(--transition-normal);
}

.settings-form-card:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-border-secondary);
}

/* ===== 设置页面表单布局 ===== */
.settings-form-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.settings-form-label {
  flex: 0 0 120px;
  padding-top: var(--spacing-3);
  text-align: right;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.settings-form-field {
  flex: 1;
}

/* ===== 设置页面按钮区域 ===== */
.settings-buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-4);
  padding: var(--spacing-6) var(--spacing-8);
  border-top: 1px solid var(--color-border-primary);
  margin-top: var(--spacing-8);
}

/* ===== 设置页面头像样式 ===== */
.settings-avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-border-primary);
  object-fit: cover;
}

/* ===== 移动端响应式 ===== */
@media (max-width: 768px) {
  .settings-form-row {
    flex-direction: column;
    gap: var(--spacing-3);
  }

  .settings-form-label {
    text-align: left;
    width: 100%;
    padding-top: 0;
    flex: none;
  }

  .settings-form-card {
    margin: 0 var(--spacing-6);
    padding: var(--spacing-6);
  }

  .settings-avatar {
    width: 96px;
    height: 96px;
  }

  .settings-buttons {
    flex-direction: column;
    padding: var(--spacing-6);
  }

  .settings-buttons button {
    width: 100%;
  }
}

/* ===== 小屏设备优化 ===== */
@media (max-width: 480px) {
  .settings-form-card {
    margin: 0 var(--spacing-4);
    padding: var(--spacing-5);
  }

  .settings-buttons {
    padding: var(--spacing-4);
  }
}
EOF
    
    echo -e "${GREEN}✅ 设置页面样式文件生成: $SETTINGS_CSS${NC}"
}

# 生成用户中心页面独立样式文件
generate_profile_styles() {
    echo -e "${BLUE}📝 生成用户中心页面独立样式...${NC}"
    
    PROFILE_CSS="$SEPARATION_WORKSPACE/profile.css"
    cat > "$PROFILE_CSS" << 'EOF'
/**
 * AI变现之路 - 用户中心页面专用样式
 * 
 * 从globals.css分离的用户中心页面相关样式
 */

/* ===== 用户中心页面内容区域 ===== */
.profile-page-content {
  padding: var(--spacing-6) var(--spacing-4);
  max-width: 1200px;
  margin: 0 auto;
}

/* ===== 用户中心主要内容区域 ===== */
.profile-page-content > div:nth-child(2) > div {
  width: 100%;
  max-width: 280px;
  background: var(--color-bg-glass);
  backdrop-filter: blur(var(--blur-md));
  -webkit-backdrop-filter: blur(var(--blur-md));
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
}

/* ===== 用户中心卡片样式 ===== */
.profile-card {
  background: var(--color-bg-glass);
  backdrop-filter: blur(var(--blur-md));
  -webkit-backdrop-filter: blur(var(--blur-md));
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-6);
  transition: var(--transition-normal);
}

.profile-card:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-border-secondary);
}

/* ===== 用户信息展示 ===== */
.profile-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-border-primary);
  object-fit: cover;
}

.profile-details h2 {
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--spacing-1);
}

.profile-details p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* ===== 统计信息 ===== */
.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--spacing-4);
  margin: var(--spacing-6) 0;
}

.profile-stat {
  text-align: center;
  padding: var(--spacing-4);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.profile-stat-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary-blue);
  display: block;
}

.profile-stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* ===== 移动端响应式 ===== */
@media (max-width: 480px) {
  .profile-page-content {
    padding: var(--spacing-5) var(--spacing-3);
  }

  .profile-page-content > div:nth-child(2) > div {
    padding: var(--spacing-4);
    width: 100%;
    max-width: none;
  }

  .profile-info {
    flex-direction: column;
    text-align: center;
  }

  .profile-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 360px) {
  .profile-page-content {
    padding: var(--spacing-4) var(--spacing-2);
  }

  .profile-stats {
    grid-template-columns: 1fr;
  }
}
EOF
    
    echo -e "${GREEN}✅ 用户中心页面样式文件生成: $PROFILE_CSS${NC}"
}

# 生成关于页面独立样式文件
generate_about_styles() {
    echo -e "${BLUE}📝 生成关于页面独立样式...${NC}"
    
    ABOUT_CSS="$SEPARATION_WORKSPACE/about.css"
    cat > "$ABOUT_CSS" << 'EOF'
/**
 * AI变现之路 - 关于页面专用样式
 * 
 * 从globals.css分离的关于页面相关样式
 */

/* ===== 关于页面使命区域 ===== */
.about-mission-section {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: var(--spacing-18); /* 72px，接近原来的74px */
}

.about-mission-cards-container {
  display: flex;
  gap: var(--spacing-10); /* 40px */
  width: 1200px;
  max-width: 100%;
}

.about-mission-title-section {
  text-align: center;
  padding-top: var(--spacing-8);
  margin-bottom: var(--spacing-16);
}

/* ===== 关于页面会员区域 ===== */
.about-membership-section {
  text-align: center;
  margin-bottom: var(--spacing-18);
}

.about-membership-cards-layout {
  display: flex;
  gap: var(--spacing-8);
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}

.about-membership-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-8);
  width: 744px;
  max-width: 100%;
}

/* ===== 关于页面选择理由区域 ===== */
.about-why-choose-section {
  text-align: center;
  margin-bottom: var(--spacing-18);
}

.about-why-choose-cards {
  display: flex;
  justify-content: center;
  width: 100%;
}

.about-why-choose-container {
  display: flex;
  gap: var(--spacing-6);
  width: 1200px;
  max-width: 100%;
}

/* ===== 关于页面统计区域 ===== */
.about-stats-section {
  text-align: center;
  margin-bottom: var(--spacing-18);
}

.about-stats-cards {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: var(--spacing-16);
}

.about-stats-container {
  display: flex;
  gap: var(--spacing-6);
  width: 1200px;
  max-width: 100%;
}

/* ===== 关于页面联系区域 ===== */
.about-contact-section {
  text-align: center;
  margin-bottom: var(--spacing-18);
}

.about-contact-content {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: var(--spacing-16);
}

.about-contact-layout {
  display: flex;
  align-items: flex-start;
  width: 1200px;
  max-width: 100%;
  gap: 157px; /* 保留原有的精确间距 */
}

/* ===== 关于页面卡片通用样式 ===== */
.about-card {
  background: var(--color-bg-glass);
  backdrop-filter: blur(var(--blur-md));
  -webkit-backdrop-filter: blur(var(--blur-md));
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  transition: var(--transition-normal);
}

.about-card:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-border-secondary);
  transform: translateY(-2px);
}

/* ===== 移动端响应式 ===== */
@media (max-width: 1200px) {
  .about-mission-cards-container,
  .about-why-choose-container,
  .about-stats-container,
  .about-contact-layout {
    width: 100%;
    padding: 0 var(--spacing-6);
  }
}

@media (max-width: 768px) {
  .about-mission-cards-container,
  .about-why-choose-container,
  .about-stats-container {
    flex-direction: column;
    align-items: center;
  }

  .about-membership-cards-layout {
    flex-direction: column;
    align-items: center;
  }

  .about-membership-grid {
    grid-template-columns: 1fr;
    width: 100%;
    max-width: 400px;
  }

  .about-contact-layout {
    flex-direction: column;
    gap: var(--spacing-8);
    align-items: center;
  }
}

@media (max-width: 480px) {
  .about-mission-section,
  .about-membership-section,
  .about-why-choose-section,
  .about-stats-section,
  .about-contact-section {
    margin-bottom: var(--spacing-12);
  }

  .about-mission-title-section {
    padding-top: var(--spacing-6);
    margin-bottom: var(--spacing-10);
  }

  .about-stats-cards,
  .about-contact-content {
    padding-top: var(--spacing-8);
  }
}
EOF
    
    echo -e "${GREEN}✅ 关于页面样式文件生成: $ABOUT_CSS${NC}"
}

# 生成搜索组件独立样式文件
generate_search_styles() {
    echo -e "${BLUE}📝 生成搜索组件独立样式...${NC}"
    
    SEARCH_CSS="$SEPARATION_WORKSPACE/search.css"
    cat > "$SEARCH_CSS" << 'EOF'
/**
 * AI变现之路 - 搜索组件专用样式
 * 
 * 从globals.css分离的搜索相关样式
 */

/* ===== 搜索框基础样式 ===== */
.search-bar-input {
  background: var(--color-bg-input);
  backdrop-filter: blur(var(--blur-sm));
  -webkit-backdrop-filter: blur(var(--blur-sm));
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text-primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  width: 100%;
  transition: var(--transition-normal);
}

/* ===== 搜索框焦点状态 - 完全移除边框 ===== */
.search-bar-input:focus {
  border: none;
  box-shadow: none;
  outline: none;
  background: var(--color-bg-input);
}

/* ===== 无边框搜索容器 ===== */
.search-container-no-border,
.search-container-no-border:hover,
.search-container-no-border:focus,
.search-container-no-border:active {
  border: none;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  outline: none;
  box-shadow: none;
  background: transparent;
}

.search-container-no-border::before,
.search-container-no-border::after {
  display: none;
}

/* ===== 搜索容器 ===== */
.search-container {
  position: relative;
  width: 100%;
  max-width: 500px;
}

/* ===== 搜索图标 ===== */
.search-icon {
  position: absolute;
  left: var(--spacing-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-bar-input.with-icon {
  padding-left: var(--spacing-12);
}

/* ===== 搜索建议下拉框 ===== */
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-bg-glass);
  backdrop-filter: blur(var(--blur-md));
  -webkit-backdrop-filter: blur(var(--blur-md));
  border: 1px solid var(--color-border-primary);
  border-top: none;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  max-height: 300px;
  overflow-y: auto;
  z-index: var(--z-index-dropdown, 100);
  box-shadow: var(--shadow-card);
}

.search-suggestion-item {
  padding: var(--spacing-3) var(--spacing-4);
  cursor: pointer;
  transition: var(--transition-fast);
  border-bottom: 1px solid var(--color-border-primary);
}

.search-suggestion-item:last-child {
  border-bottom: none;
}

.search-suggestion-item:hover {
  background: var(--color-hover-primary);
}

.search-suggestion-item.active {
  background: var(--color-active-primary);
}

/* ===== 搜索结果高亮 ===== */
.search-highlight {
  background: var(--color-primary-blue);
  color: white;
  padding: 0 2px;
  border-radius: 2px;
}

/* ===== 搜索加载状态 ===== */
.search-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  color: var(--color-text-muted);
}

.search-loading::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border-primary);
  border-top: 2px solid var(--color-primary-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: var(--spacing-2);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ===== 搜索无结果状态 ===== */
.search-no-results {
  padding: var(--spacing-6);
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

/* ===== 搜索热门关键词 ===== */
.search-popular-keywords {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-border-primary);
}

.search-popular-title {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-2);
}

.search-keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

.search-keyword-tag {
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: var(--transition-fast);
}

.search-keyword-tag:hover {
  background: var(--color-primary-blue);
  color: white;
}

/* ===== 移动端响应式 ===== */
@media (max-width: 768px) {
  .search-container {
    max-width: 100%;
  }

  .search-suggestions {
    max-height: 250px;
  }

  .search-bar-input {
    font-size: 16px; /* 防止iOS缩放 */
  }
}

@media (max-width: 480px) {
  .search-bar-input {
    padding: var(--spacing-3);
  }

  .search-bar-input.with-icon {
    padding-left: var(--spacing-10);
  }

  .search-suggestion-item {
    padding: var(--spacing-4);
  }
}
EOF
    
    echo -e "${GREEN}✅ 搜索组件样式文件生成: $SEARCH_CSS${NC}"
}

# 生成新的精简版globals.css
generate_minimal_globals() {
    echo -e "${BLUE}📝 生成精简版globals.css...${NC}"
    
    MINIMAL_GLOBALS="$SEPARATION_WORKSPACE/globals-minimal.css"
    cat > "$MINIMAL_GLOBALS" << 'EOF'
/**
 * AI变现之路 - 精简版全局样式
 * 
 * 只包含真正的全局样式：重置、主题切换、无障碍支持
 * 页面特定样式已分离到独立文件中
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
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-primary-blue);
}

/* ===== 全局交互元素样式 ===== */
button {
  font-family: inherit;
  cursor: pointer;
}

input,
textarea,
select {
  font-family: inherit;
}

/* ===== 无障碍和性能优化 ===== */
/* 焦点可见性 */
*:focus-visible {
  outline: 2px solid var(--color-primary-blue);
  outline-offset: 2px;
}

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

/* ===== 通用工具类 ===== */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}
EOF
    
    echo -e "${GREEN}✅ 精简版globals.css生成: $MINIMAL_GLOBALS${NC}"
}

# 生成样式导入指南
generate_import_guide() {
    echo -e "${BLUE}📝 生成样式导入指南...${NC}"
    
    IMPORT_GUIDE="$SEPARATION_WORKSPACE/style-import-guide.md"
    cat > "$IMPORT_GUIDE" << 'EOF'
# 样式分离后的导入指南

## 📁 分离后的文件结构

```
src/
├── app/
│   └── globals.css (精简版，只包含全局样式)
├── styles/
│   ├── pages/
│   │   ├── settings.css
│   │   ├── profile.css
│   │   ├── about.css
│   │   └── search.css
│   └── ... (其他现有样式文件)
```

## 🔧 如何使用分离后的样式

### 1. 在页面组件中导入样式

#### 设置页面 (app/profile/settings/page.tsx)
```tsx
import './settings.css';

export default function SettingsPage() {
  return (
    <div className="settings-page">
      {/* 设置页面内容 */}
    </div>
  );
}
```

#### 用户中心页面 (app/profile/page.tsx)
```tsx
import './profile.css';

export default function ProfilePage() {
  return (
    <div className="profile-page">
      {/* 用户中心内容 */}
    </div>
  );
}
```

#### 关于页面 (app/about/page.tsx)
```tsx
import './about.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* 关于页面内容 */}
    </div>
  );
}
```

### 2. 在组件中导入样式

#### 搜索组件 (components/ui/SmartSearch/SmartSearch.tsx)
```tsx
import './search.css';

export default function SmartSearch() {
  return (
    <div className="search-container">
      {/* 搜索组件内容 */}
    </div>
  );
}
```

## 📋 迁移检查清单

### 第一阶段：创建新的样式文件
- [ ] 在 `src/styles/pages/` 目录下创建页面特定样式文件
- [ ] 复制分离工具生成的样式内容到对应文件
- [ ] 验证CSS语法和变量引用

### 第二阶段：更新页面组件
- [ ] 在相应页面组件中导入新的样式文件
- [ ] 测试页面样式是否正常显示
- [ ] 验证响应式设计在不同设备上的效果

### 第三阶段：清理原有样式
- [ ] 使用精简版globals.css替换原有文件
- [ ] 删除globals.css中已分离的页面特定样式
- [ ] 运行完整测试确保没有样式丢失

### 第四阶段：验证和优化
- [ ] 在所有支持的设备上测试
- [ ] 验证主题切换功能正常
- [ ] 检查样式加载性能
- [ ] 更新样式文档

## 🎯 分离的好处

1. **维护性提升**: 页面特定样式与页面组件放在一起，便于维护
2. **性能优化**: 按需加载样式，减少初始CSS体积
3. **避免冲突**: 减少全局样式冲突的可能性
4. **团队协作**: 不同页面的样式可以独立开发和维护

## ⚠️ 注意事项

1. **CSS变量依赖**: 确保所有分离的样式文件都能正确访问CSS变量
2. **导入顺序**: 样式导入应在组件导入之前
3. **构建配置**: 确认Next.js配置支持这种导入方式
4. **缓存清理**: 分离后记得清理浏览器缓存

## 🔧 故障排除

### 样式不生效
1. 检查CSS文件路径是否正确
2. 确认导入语句位置是否正确
3. 验证CSS变量是否可访问

### 样式冲突
1. 检查是否有重复的类名
2. 使用浏览器开发者工具查看样式优先级
3. 确认!important使用是否必要

### 响应式问题
1. 测试所有断点的样式
2. 检查媒体查询语法
3. 验证CSS变量在媒体查询中的使用
EOF
    
    echo -e "${GREEN}✅ 样式导入指南生成: $IMPORT_GUIDE${NC}"
}

# 执行完整的样式分离
execute_full_separation() {
    echo -e "${BLUE}🔄 执行完整的样式分离...${NC}"
    
    # 创建页面样式目录
    mkdir -p "$SEPARATION_WORKSPACE/pages"
    
    # 执行所有分离操作
    analyze_page_specific_styles
    generate_settings_styles
    generate_profile_styles
    generate_about_styles
    generate_search_styles
    generate_minimal_globals
    generate_import_guide
    
    # 移动文件到pages目录
    mv "$SEPARATION_WORKSPACE/settings.css" "$SEPARATION_WORKSPACE/pages/"
    mv "$SEPARATION_WORKSPACE/profile.css" "$SEPARATION_WORKSPACE/pages/"
    mv "$SEPARATION_WORKSPACE/about.css" "$SEPARATION_WORKSPACE/pages/"
    mv "$SEPARATION_WORKSPACE/search.css" "$SEPARATION_WORKSPACE/pages/"
    
    echo -e "${GREEN}✅ 完整样式分离完成！${NC}"
    echo -e "${YELLOW}📁 生成的文件位置：${NC}"
    echo -e "  - 页面样式: $SEPARATION_WORKSPACE/pages/"
    echo -e "  - 精简globals: $SEPARATION_WORKSPACE/globals-minimal.css"
    echo -e "  - 导入指南: $SEPARATION_WORKSPACE/style-import-guide.md"
    echo -e "  - 分析报告: $SEPARATION_WORKSPACE/page-styles-analysis.txt"
}

# 验证分离结果
validate_separation() {
    echo -e "${BLUE}✅ 验证样式分离结果...${NC}"
    
    VALIDATION_REPORT="$SEPARATION_WORKSPACE/separation-validation.txt"
    echo "=== 样式分离验证报告 ===" > "$VALIDATION_REPORT"
    echo "验证时间: $(date)" >> "$VALIDATION_REPORT"
    echo "" >> "$VALIDATION_REPORT"
    
    # 检查生成的文件
    echo "=== 生成文件检查 ===" >> "$VALIDATION_REPORT"
    for file in "pages/settings.css" "pages/profile.css" "pages/about.css" "pages/search.css" "globals-minimal.css"; do
        if [ -f "$SEPARATION_WORKSPACE/$file" ]; then
            lines=$(wc -l < "$SEPARATION_WORKSPACE/$file")
            echo "✅ $file: $lines 行" >> "$VALIDATION_REPORT"
        else
            echo "❌ $file: 文件不存在" >> "$VALIDATION_REPORT"
        fi
    done
    
    # 检查CSS语法
    echo "" >> "$VALIDATION_REPORT"
    echo "=== CSS语法检查 ===" >> "$VALIDATION_REPORT"
    for css_file in "$SEPARATION_WORKSPACE/pages"/*.css "$SEPARATION_WORKSPACE/globals-minimal.css"; do
        if [ -f "$css_file" ]; then
            filename=$(basename "$css_file")
            # 检查基本语法
            open_braces=$(grep -o "{" "$css_file" | wc -l)
            close_braces=$(grep -o "}" "$css_file" | wc -l)
            
            if [ "$open_braces" -eq "$close_braces" ]; then
                echo "✅ $filename: 语法检查通过" >> "$VALIDATION_REPORT"
            else
                echo "❌ $filename: 大括号不匹配" >> "$VALIDATION_REPORT"
            fi
        fi
    done
    
    # 统计分离效果
    echo "" >> "$VALIDATION_REPORT"
    echo "=== 分离效果统计 ===" >> "$VALIDATION_REPORT"
    original_lines=$(wc -l < "$FRONTEND_DIR/src/app/globals.css")
    minimal_lines=$(wc -l < "$SEPARATION_WORKSPACE/globals-minimal.css" 2>/dev/null || echo "0")
    reduced_lines=$((original_lines - minimal_lines))
    
    echo "原globals.css行数: $original_lines" >> "$VALIDATION_REPORT"
    echo "精简后行数: $minimal_lines" >> "$VALIDATION_REPORT"
    echo "减少行数: $reduced_lines" >> "$VALIDATION_REPORT"
    echo "减少比例: $(echo "scale=1; $reduced_lines * 100 / $original_lines" | bc)%" >> "$VALIDATION_REPORT"
    
    echo -e "${GREEN}✅ 分离验证完成: $VALIDATION_REPORT${NC}"
    cat "$VALIDATION_REPORT"
}

# 主菜单
print_menu() {
    echo -e "${BLUE}请选择操作：${NC}"
    echo ""
    echo -e "  ${YELLOW}1)${NC} 分析页面特定样式"
    echo -e "  ${YELLOW}2)${NC} 生成设置页面独立样式"
    echo -e "  ${YELLOW}3)${NC} 生成用户中心页面独立样式"
    echo -e "  ${YELLOW}4)${NC} 生成关于页面独立样式"
    echo -e "  ${YELLOW}5)${NC} 生成搜索组件独立样式"
    echo -e "  ${YELLOW}6)${NC} 生成精简版globals.css"
    echo -e "  ${YELLOW}7)${NC} 生成样式导入指南"
    echo -e "  ${YELLOW}8)${NC} 执行完整样式分离"
    echo -e "  ${YELLOW}9)${NC} 验证分离结果"
    echo ""
    echo -e "  ${YELLOW}q)${NC} 退出"
    echo ""
}

# 主函数
main() {
    print_header
    
    while true; do
        print_menu
        read -p "请选择操作 (1-9, q): " choice
        
        case $choice in
            1)
                analyze_page_specific_styles
                ;;
            2)
                generate_settings_styles
                ;;
            3)
                generate_profile_styles
                ;;
            4)
                generate_about_styles
                ;;
            5)
                generate_search_styles
                ;;
            6)
                generate_minimal_globals
                ;;
            7)
                generate_import_guide
                ;;
            8)
                execute_full_separation
                ;;
            9)
                validate_separation
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
