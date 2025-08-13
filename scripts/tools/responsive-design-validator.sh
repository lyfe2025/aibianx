#!/bin/bash

# AI变现之路 - 响应式设计验证工具
# 自动验证Web和移动端界面的一致性和可用性

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
VALIDATION_WORKSPACE="$PROJECT_ROOT/logs/responsive-validation"
mkdir -p "$VALIDATION_WORKSPACE"

# 设备配置
declare -A DEVICES=(
    ["mobile_small"]="320x568"
    ["mobile_medium"]="375x667"
    ["mobile_large"]="414x736"
    ["tablet_portrait"]="768x1024"
    ["tablet_landscape"]="1024x768"
    ["desktop_small"]="1366x768"
    ["desktop_medium"]="1440x900"
    ["desktop_large"]="1920x1080"
)

# 断点配置
declare -A BREAKPOINTS=(
    ["xs"]="320px"
    ["sm"]="480px"
    ["md"]="768px"
    ["lg"]="1024px"
    ["xl"]="1440px"
    ["2xl"]="1920px"
)

# 打印标题
print_header() {
    echo ""
    echo -e "${CYAN}============================================${NC}"
    echo -e "${WHITE}📱 响应式设计验证工具${NC}"
    echo -e "${CYAN}============================================${NC}"
    echo ""
}

# 检查断点一致性
check_breakpoint_consistency() {
    echo -e "${BLUE}📏 检查断点一致性...${NC}"
    
    BREAKPOINT_REPORT="$VALIDATION_WORKSPACE/breakpoint-analysis.txt"
    echo "=== 断点一致性分析报告 ===" > "$BREAKPOINT_REPORT"
    echo "分析时间: $(date)" >> "$BREAKPOINT_REPORT"
    echo "" >> "$BREAKPOINT_REPORT"
    
    # 检查CSS文件中的断点使用
    echo "=== CSS文件中的断点使用 ===" >> "$BREAKPOINT_REPORT"
    find "$FRONTEND_DIR/src" -name "*.css" | while read css_file; do
        relative_path=${css_file#$FRONTEND_DIR/src/}
        
        # 提取媒体查询中的断点
        if grep -q "@media" "$css_file"; then
            echo "" >> "$BREAKPOINT_REPORT"
            echo "文件: $relative_path" >> "$BREAKPOINT_REPORT"
            grep -n "@media" "$css_file" | head -10 >> "$BREAKPOINT_REPORT"
        fi
    done
    
    # 分析断点使用频率
    echo "" >> "$BREAKPOINT_REPORT"
    echo "=== 断点使用频率统计 ===" >> "$BREAKPOINT_REPORT"
    
    # 统计常见断点值
    temp_breakpoints=$(mktemp)
    find "$FRONTEND_DIR/src" -name "*.css" -exec grep -o "max-width:\s*[0-9]\+px\|min-width:\s*[0-9]\+px" {} \; | \
        grep -o "[0-9]\+px" | sort | uniq -c | sort -nr > "$temp_breakpoints"
    
    echo "最常用的断点值：" >> "$BREAKPOINT_REPORT"
    head -10 "$temp_breakpoints" >> "$BREAKPOINT_REPORT"
    rm "$temp_breakpoints"
    
    # 建议标准断点
    echo "" >> "$BREAKPOINT_REPORT"
    echo "=== 建议的标准断点系统 ===" >> "$BREAKPOINT_REPORT"
    for key in "${!BREAKPOINTS[@]}"; do
        echo "$key: ${BREAKPOINTS[$key]}" >> "$BREAKPOINT_REPORT"
    done
    
    echo -e "${GREEN}✅ 断点一致性检查完成: $BREAKPOINT_REPORT${NC}"
}

# 生成设备测试矩阵
generate_device_matrix() {
    echo -e "${BLUE}📋 生成设备测试矩阵...${NC}"
    
    MATRIX_HTML="$VALIDATION_WORKSPACE/device-test-matrix.html"
    cat > "$MATRIX_HTML" << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>设备测试矩阵</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .device-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .device-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border: 2px solid #e5e5e5;
        }
        
        .device-card.testing {
            border-color: #3B82F6;
            background: #EFF6FF;
        }
        
        .device-card.passed {
            border-color: #10B981;
            background: #ECFDF5;
        }
        
        .device-card.failed {
            border-color: #EF4444;
            background: #FEF2F2;
        }
        
        .device-name {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 10px;
            color: #1F2937;
        }
        
        .device-specs {
            color: #6B7280;
            font-size: 14px;
            margin-bottom: 15px;
        }
        
        .device-iframe {
            width: 100%;
            height: 200px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        
        .test-controls {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .btn {
            background: #3B82F6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
        }
        
        .btn:hover {
            background: #2563EB;
        }
        
        .btn.success {
            background: #10B981;
        }
        
        .btn.danger {
            background: #EF4444;
        }
        
        .test-status {
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
        }
        
        .status-pending {
            background: #FEF3C7;
            color: #92400E;
        }
        
        .status-testing {
            background: #DBEAFE;
            color: #1E40AF;
        }
        
        .status-passed {
            background: #D1FAE5;
            color: #065F46;
        }
        
        .status-failed {
            background: #FEE2E2;
            color: #991B1B;
        }
        
        .checklist {
            margin-top: 15px;
            font-size: 12px;
        }
        
        .checklist label {
            display: block;
            margin-bottom: 5px;
            cursor: pointer;
        }
        
        .checklist input[type="checkbox"] {
            margin-right: 8px;
        }
        
        .summary {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-top: 20px;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }
        
        .summary-card {
            text-align: center;
            padding: 15px;
            border-radius: 8px;
            background: #F9FAFB;
        }
        
        .summary-number {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .url-input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📱 AI变现之路 - 设备测试矩阵</h1>
        <p>验证Web和移动端界面的响应式设计一致性</p>
        
        <input type="text" class="url-input" id="testUrl" 
               value="http://localhost:3000" 
               placeholder="输入要测试的URL">
        <button class="btn" onclick="loadAllDevices()">🔄 加载所有设备</button>
        <button class="btn success" onclick="markAllPassed()">✅ 标记全部通过</button>
        <button class="btn danger" onclick="resetAllTests()">🔄 重置测试</button>
    </div>

    <div class="device-grid" id="deviceGrid">
        <!-- 设备卡片将通过JavaScript生成 -->
    </div>

    <div class="summary">
        <h2>📊 测试汇总</h2>
        <div class="summary-grid">
            <div class="summary-card">
                <div class="summary-number" id="totalDevices">0</div>
                <div>总设备数</div>
            </div>
            <div class="summary-card">
                <div class="summary-number" id="passedDevices">0</div>
                <div>通过设备</div>
            </div>
            <div class="summary-card">
                <div class="summary-number" id="failedDevices">0</div>
                <div>失败设备</div>
            </div>
            <div class="summary-card">
                <div class="summary-number" id="passRate">0%</div>
                <div>通过率</div>
            </div>
        </div>
    </div>

    <script>
        const devices = {
            "mobile_small": { name: "iPhone SE", size: "320×568", category: "手机" },
            "mobile_medium": { name: "iPhone 12", size: "375×667", category: "手机" },
            "mobile_large": { name: "iPhone 12 Pro Max", size: "414×736", category: "手机" },
            "tablet_portrait": { name: "iPad", size: "768×1024", category: "平板" },
            "tablet_landscape": { name: "iPad (横屏)", size: "1024×768", category: "平板" },
            "desktop_small": { name: "笔记本", size: "1366×768", category: "桌面" },
            "desktop_medium": { name: "桌面显示器", size: "1440×900", category: "桌面" },
            "desktop_large": { name: "大屏显示器", size: "1920×1080", category: "桌面" }
        };

        const testChecklist = [
            "页面布局完整显示",
            "导航菜单可正常使用",
            "按钮和链接可点击",
            "文字大小适中易读",
            "图片正常显示",
            "表单可正常填写",
            "滚动操作流畅",
            "无水平滚动条"
        ];

        function createDeviceCard(deviceId, deviceInfo) {
            const card = document.createElement('div');
            card.className = 'device-card';
            card.id = `device-${deviceId}`;
            
            const [width, height] = deviceInfo.size.split('×');
            
            card.innerHTML = `
                <div class="device-name">${deviceInfo.name}</div>
                <div class="device-specs">${deviceInfo.size} • ${deviceInfo.category}</div>
                
                <iframe class="device-iframe" 
                        id="iframe-${deviceId}"
                        style="width: 100%; height: ${Math.min(200, height * 0.3)}px;">
                </iframe>
                
                <div class="test-controls">
                    <button class="btn" onclick="loadDevice('${deviceId}')">🔄 刷新</button>
                    <button class="btn success" onclick="markPassed('${deviceId}')">✅ 通过</button>
                    <button class="btn danger" onclick="markFailed('${deviceId}')">❌ 失败</button>
                </div>
                
                <div class="test-status status-pending" id="status-${deviceId}">
                    ⏳ 待测试
                </div>
                
                <div class="checklist">
                    <strong>检查项目：</strong>
                    ${testChecklist.map((item, index) => `
                        <label>
                            <input type="checkbox" id="check-${deviceId}-${index}">
                            ${item}
                        </label>
                    `).join('')}
                </div>
            `;
            
            return card;
        }

        function initializeDeviceGrid() {
            const grid = document.getElementById('deviceGrid');
            grid.innerHTML = '';
            
            Object.entries(devices).forEach(([deviceId, deviceInfo]) => {
                const card = createDeviceCard(deviceId, deviceInfo);
                grid.appendChild(card);
            });
            
            updateSummary();
        }

        function loadDevice(deviceId) {
            const url = document.getElementById('testUrl').value;
            const iframe = document.getElementById(`iframe-${deviceId}`);
            const status = document.getElementById(`status-${deviceId}`);
            const card = document.getElementById(`device-${deviceId}`);
            
            // 更新状态为测试中
            status.className = 'test-status status-testing';
            status.textContent = '🔄 测试中...';
            card.className = 'device-card testing';
            
            // 加载页面
            iframe.src = url + '?device=' + deviceId + '&t=' + Date.now();
            
            // 模拟加载完成
            setTimeout(() => {
                status.className = 'test-status status-pending';
                status.textContent = '⏳ 请手动验证';
            }, 2000);
        }

        function loadAllDevices() {
            Object.keys(devices).forEach(deviceId => {
                setTimeout(() => loadDevice(deviceId), Math.random() * 1000);
            });
        }

        function markPassed(deviceId) {
            const status = document.getElementById(`status-${deviceId}`);
            const card = document.getElementById(`device-${deviceId}`);
            
            status.className = 'test-status status-passed';
            status.textContent = '✅ 测试通过';
            card.className = 'device-card passed';
            
            // 自动勾选所有检查项
            testChecklist.forEach((_, index) => {
                const checkbox = document.getElementById(`check-${deviceId}-${index}`);
                if (checkbox) checkbox.checked = true;
            });
            
            updateSummary();
        }

        function markFailed(deviceId) {
            const status = document.getElementById(`status-${deviceId}`);
            const card = document.getElementById(`device-${deviceId}`);
            
            status.className = 'test-status status-failed';
            status.textContent = '❌ 测试失败';
            card.className = 'device-card failed';
            
            updateSummary();
        }

        function markAllPassed() {
            Object.keys(devices).forEach(deviceId => {
                markPassed(deviceId);
            });
        }

        function resetAllTests() {
            Object.keys(devices).forEach(deviceId => {
                const status = document.getElementById(`status-${deviceId}`);
                const card = document.getElementById(`device-${deviceId}`);
                
                status.className = 'test-status status-pending';
                status.textContent = '⏳ 待测试';
                card.className = 'device-card';
                
                // 取消勾选所有检查项
                testChecklist.forEach((_, index) => {
                    const checkbox = document.getElementById(`check-${deviceId}-${index}`);
                    if (checkbox) checkbox.checked = false;
                });
            });
            
            updateSummary();
        }

        function updateSummary() {
            const totalDevices = Object.keys(devices).length;
            const passedDevices = document.querySelectorAll('.status-passed').length;
            const failedDevices = document.querySelectorAll('.status-failed').length;
            const passRate = totalDevices > 0 ? Math.round((passedDevices / totalDevices) * 100) : 0;
            
            document.getElementById('totalDevices').textContent = totalDevices;
            document.getElementById('passedDevices').textContent = passedDevices;
            document.getElementById('failedDevices').textContent = failedDevices;
            document.getElementById('passRate').textContent = passRate + '%';
        }

        // 初始化
        document.addEventListener('DOMContentLoaded', () => {
            initializeDeviceGrid();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                loadAllDevices();
            }
        });
    </script>
</body>
</html>
EOF
    
    echo -e "${GREEN}✅ 设备测试矩阵生成完成: $MATRIX_HTML${NC}"
    echo -e "${YELLOW}🌐 测试页面: file://$MATRIX_HTML${NC}"
}

# 检查触摸友好性
check_touch_friendliness() {
    echo -e "${BLUE}👆 检查触摸友好性...${NC}"
    
    TOUCH_REPORT="$VALIDATION_WORKSPACE/touch-friendliness.txt"
    echo "=== 触摸友好性分析报告 ===" > "$TOUCH_REPORT"
    echo "分析时间: $(date)" >> "$TOUCH_REPORT"
    echo "" >> "$TOUCH_REPORT"
    
    # 检查按钮尺寸
    echo "=== 按钮尺寸检查 ===" >> "$TOUCH_REPORT"
    echo "建议最小触摸目标尺寸: 44px × 44px (Apple), 48dp (Android)" >> "$TOUCH_REPORT"
    echo "" >> "$TOUCH_REPORT"
    
    # 搜索CSS中的按钮样式
    if find "$FRONTEND_DIR/src" -name "*.css" -exec grep -l "button\|\.btn" {} \; | head -5 | while read css_file; do
        relative_path=${css_file#$FRONTEND_DIR/src/}
        echo "文件: $relative_path" >> "$TOUCH_REPORT"
        grep -n "padding\|width\|height\|min-width\|min-height" "$css_file" | grep -i "button\|btn" | head -5 >> "$TOUCH_REPORT"
        echo "" >> "$TOUCH_REPORT"
    done; then
        true
    fi
    
    # 检查间距设置
    echo "=== 间距检查 ===" >> "$TOUCH_REPORT"
    echo "建议最小间距: 8px，推荐间距: 16px" >> "$TOUCH_REPORT"
    echo "" >> "$TOUCH_REPORT"
    
    # 触摸优化建议
    echo "=== 触摸优化建议 ===" >> "$TOUCH_REPORT"
    cat >> "$TOUCH_REPORT" << 'EOF'
1. 按钮最小尺寸: 44px × 44px
2. 链接垂直间距: 至少 8px
3. 表单控件高度: 至少 44px
4. 滑动手势支持: 左右滑动导航
5. 长按菜单: 提供额外功能
6. 双击缩放: 支持内容放大
7. 避免悬停效果: 移动端不支持悬停
8. 快速点击响应: 避免300ms延迟
EOF
    
    echo -e "${GREEN}✅ 触摸友好性检查完成: $TOUCH_REPORT${NC}"
}

# 生成响应式CSS模板
generate_responsive_template() {
    echo -e "${BLUE}📝 生成响应式CSS模板...${NC}"
    
    TEMPLATE_CSS="$VALIDATION_WORKSPACE/responsive-template.css"
    cat > "$TEMPLATE_CSS" << 'EOF'
/**
 * AI变现之路 - 响应式设计标准模板
 * 
 * 使用移动优先的设计方法，确保在所有设备上的一致性
 */

/* ===== 标准断点系统 ===== */
:root {
  /* 断点变量 */
  --breakpoint-xs: 320px;
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
  --breakpoint-2xl: 1920px;
  
  /* 容器最大宽度 */
  --container-xs: 100%;
  --container-sm: 100%;
  --container-md: 100%;
  --container-lg: 1024px;
  --container-xl: 1200px;
  --container-2xl: 1400px;
  
  /* 响应式间距 */
  --spacing-responsive-xs: var(--spacing-2);
  --spacing-responsive-sm: var(--spacing-4);
  --spacing-responsive-md: var(--spacing-6);
  --spacing-responsive-lg: var(--spacing-8);
  --spacing-responsive-xl: var(--spacing-12);
}

/* ===== 响应式容器 ===== */
.responsive-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-responsive-xs);
}

/* 小屏设备 (320px+) */
@media (min-width: 320px) {
  .responsive-container {
    max-width: var(--container-xs);
    padding: 0 var(--spacing-responsive-sm);
  }
}

/* 中小屏设备 (480px+) */
@media (min-width: 480px) {
  .responsive-container {
    max-width: var(--container-sm);
    padding: 0 var(--spacing-responsive-md);
  }
}

/* 平板设备 (768px+) */
@media (min-width: 768px) {
  .responsive-container {
    max-width: var(--container-md);
    padding: 0 var(--spacing-responsive-lg);
  }
}

/* 小桌面设备 (1024px+) */
@media (min-width: 1024px) {
  .responsive-container {
    max-width: var(--container-lg);
  }
}

/* 大桌面设备 (1440px+) */
@media (min-width: 1440px) {
  .responsive-container {
    max-width: var(--container-xl);
  }
}

/* 超大屏设备 (1920px+) */
@media (min-width: 1920px) {
  .responsive-container {
    max-width: var(--container-2xl);
  }
}

/* ===== 响应式网格系统 ===== */
.responsive-grid {
  display: grid;
  gap: var(--spacing-responsive-sm);
  
  /* 移动端: 单列 */
  grid-template-columns: 1fr;
}

/* 平板端: 2列 */
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-responsive-md);
  }
}

/* 桌面端: 3列 */
@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-responsive-lg);
  }
}

/* 大屏: 4列 */
@media (min-width: 1440px) {
  .responsive-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ===== 响应式文字 ===== */
.responsive-text {
  /* 移动端基础字号 */
  font-size: var(--font-size-base);
  line-height: 1.6;
}

@media (min-width: 768px) {
  .responsive-text {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 1024px) {
  .responsive-text {
    font-size: var(--font-size-xl);
    line-height: 1.5;
  }
}

/* ===== 响应式标题 ===== */
.responsive-heading {
  font-size: var(--font-size-2xl);
  line-height: 1.3;
  margin-bottom: var(--spacing-responsive-sm);
}

@media (min-width: 768px) {
  .responsive-heading {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-responsive-md);
  }
}

@media (min-width: 1024px) {
  .responsive-heading {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--spacing-responsive-lg);
  }
}

@media (min-width: 1440px) {
  .responsive-heading {
    font-size: var(--font-size-5xl);
  }
}

/* ===== 响应式按钮 ===== */
.responsive-button {
  /* 移动端: 全宽按钮，大触摸目标 */
  width: 100%;
  min-height: 44px;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: var(--transition-normal);
  
  /* 触摸友好 */
  touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .responsive-button {
    /* 平板端: 自适应宽度 */
    width: auto;
    min-width: 120px;
    padding: var(--spacing-3) var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .responsive-button {
    /* 桌面端: 悬停效果 */
    min-height: 40px;
  }
  
  .responsive-button:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-button);
  }
}

/* ===== 响应式卡片 ===== */
.responsive-card {
  background: var(--color-bg-glass);
  backdrop-filter: blur(var(--blur-md));
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-responsive-sm);
  margin-bottom: var(--spacing-responsive-sm);
  transition: var(--transition-normal);
}

@media (min-width: 768px) {
  .responsive-card {
    padding: var(--spacing-responsive-md);
    margin-bottom: var(--spacing-responsive-md);
  }
}

@media (min-width: 1024px) {
  .responsive-card {
    padding: var(--spacing-responsive-lg);
  }
  
  .responsive-card:hover {
    transform: translateY(-2px);
    border-color: var(--color-border-active);
  }
}

/* ===== 响应式导航 ===== */
.responsive-nav {
  /* 移动端: 汉堡菜单 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
}

.responsive-nav-menu {
  /* 移动端: 隐藏菜单 */
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-bg-glass);
  backdrop-filter: blur(var(--blur-md));
  border-top: 1px solid var(--color-border-primary);
  flex-direction: column;
  padding: var(--spacing-4);
}

.responsive-nav-menu.open {
  display: flex;
}

@media (min-width: 768px) {
  .responsive-nav-menu {
    /* 平板端: 显示菜单 */
    display: flex;
    position: static;
    flex-direction: row;
    background: transparent;
    backdrop-filter: none;
    border: none;
    padding: 0;
    gap: var(--spacing-6);
  }
}

/* ===== 响应式表单 ===== */
.responsive-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-responsive-sm);
}

.responsive-form-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

@media (min-width: 768px) {
  .responsive-form {
    gap: var(--spacing-responsive-md);
  }
  
  .responsive-form-row {
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-4);
  }
  
  .responsive-form-label {
    flex: 0 0 120px;
    text-align: right;
  }
  
  .responsive-form-field {
    flex: 1;
  }
}

.responsive-input {
  width: 100%;
  min-height: 44px;
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  background: var(--color-bg-input);
  color: var(--color-text-primary);
  font-size: 16px; /* 防止iOS缩放 */
  transition: var(--transition-normal);
}

.responsive-input:focus {
  border-color: var(--color-border-active);
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

@media (min-width: 1024px) {
  .responsive-input {
    font-size: var(--font-size-base);
    min-height: 40px;
  }
}

/* ===== 实用工具类 ===== */
/* 显示/隐藏工具 */
.show-mobile {
  display: block;
}

.show-tablet {
  display: none;
}

.show-desktop {
  display: none;
}

@media (min-width: 768px) {
  .show-mobile {
    display: none;
  }
  
  .show-tablet {
    display: block;
  }
}

@media (min-width: 1024px) {
  .show-tablet {
    display: none;
  }
  
  .show-desktop {
    display: block;
  }
}

/* 文本对齐 */
.text-center-mobile {
  text-align: center;
}

@media (min-width: 768px) {
  .text-left-tablet {
    text-align: left;
  }
}

/* 间距工具 */
.margin-responsive {
  margin: var(--spacing-responsive-sm);
}

.padding-responsive {
  padding: var(--spacing-responsive-sm);
}

@media (min-width: 768px) {
  .margin-responsive {
    margin: var(--spacing-responsive-md);
  }
  
  .padding-responsive {
    padding: var(--spacing-responsive-md);
  }
}

@media (min-width: 1024px) {
  .margin-responsive {
    margin: var(--spacing-responsive-lg);
  }
  
  .padding-responsive {
    padding: var(--spacing-responsive-lg);
  }
}
EOF
    
    echo -e "${GREEN}✅ 响应式CSS模板生成完成: $TEMPLATE_CSS${NC}"
}

# 运行自动化测试
run_automated_tests() {
    echo -e "${BLUE}🤖 运行自动化响应式测试...${NC}"
    
    # 检查Cypress是否可用
    if [ -d "$FRONTEND_DIR/cypress" ]; then
        echo -e "${YELLOW}📱 检测到Cypress测试环境${NC}"
        
        # 生成响应式测试脚本
        CYPRESS_TEST="$VALIDATION_WORKSPACE/responsive-test.cy.js"
        cat > "$CYPRESS_TEST" << 'EOF'
describe('响应式设计测试', () => {
  const devices = [
    { name: 'iPhone SE', viewport: [320, 568] },
    { name: 'iPhone 12', viewport: [375, 667] },
    { name: 'iPad', viewport: [768, 1024] },
    { name: 'Desktop', viewport: [1440, 900] }
  ];

  const testPages = [
    '/',
    '/about',
    '/profile',
    '/profile/settings'
  ];

  devices.forEach(device => {
    context(`${device.name} (${device.viewport[0]}x${device.viewport[1]})`, () => {
      beforeEach(() => {
        cy.viewport(device.viewport[0], device.viewport[1]);
      });

      testPages.forEach(page => {
        it(`应该在 ${page} 页面正确显示`, () => {
          cy.visit(page);
          
          // 检查页面是否正确加载
          cy.get('body').should('be.visible');
          
          // 检查是否有水平滚动条
          cy.window().then((win) => {
            expect(win.document.body.scrollWidth).to.be.at.most(win.innerWidth);
          });
          
          // 检查导航是否可用
          cy.get('nav, header').should('be.visible');
          
          // 检查主要内容是否可见
          cy.get('main, .main-content, #main').should('be.visible');
          
          // 检查按钮是否足够大（移动端）
          if (device.viewport[0] < 768) {
            cy.get('button, .btn').each(($btn) => {
              cy.wrap($btn).invoke('outerHeight').should('be.gte', 44);
            });
          }
        });
      });

      it('应该支持触摸友好的交互', () => {
        if (device.viewport[0] < 768) {
          cy.visit('/');
          
          // 检查链接间距
          cy.get('a').each(($link) => {
            cy.wrap($link).invoke('outerHeight').should('be.gte', 32);
          });
          
          // 检查表单控件大小
          cy.get('input, textarea, select').each(($input) => {
            cy.wrap($input).invoke('outerHeight').should('be.gte', 44);
          });
        }
      });
    });
  });
});
EOF
        
        echo -e "${GREEN}✅ Cypress响应式测试脚本生成: $CYPRESS_TEST${NC}"
        echo -e "${YELLOW}💡 使用方法: 复制到 cypress/e2e/ 目录并运行测试${NC}"
    else
        echo -e "${YELLOW}⚠️ 未检测到Cypress环境，跳过自动化测试${NC}"
    fi
    
    # 生成简单的测试报告
    TEST_REPORT="$VALIDATION_WORKSPACE/automated-test-results.txt"
    echo "=== 自动化测试结果 ===" > "$TEST_REPORT"
    echo "测试时间: $(date)" >> "$TEST_REPORT"
    echo "" >> "$TEST_REPORT"
    echo "测试状态: 脚本已生成，等待执行" >> "$TEST_REPORT"
    echo "测试覆盖: 4种设备 × 4个页面 = 16个测试用例" >> "$TEST_REPORT"
    echo "" >> "$TEST_REPORT"
    echo "手动执行步骤:" >> "$TEST_REPORT"
    echo "1. 复制 $CYPRESS_TEST 到 cypress/e2e/" >> "$TEST_REPORT"
    echo "2. 启动开发服务器: npm run dev" >> "$TEST_REPORT"
    echo "3. 运行测试: npm run cypress:open" >> "$TEST_REPORT"
    
    echo -e "${GREEN}✅ 自动化测试准备完成: $TEST_REPORT${NC}"
}

# 生成完整的验证报告
generate_validation_report() {
    echo -e "${BLUE}📊 生成响应式设计验证报告...${NC}"
    
    FINAL_REPORT="$VALIDATION_WORKSPACE/responsive-validation-report.md"
    cat > "$FINAL_REPORT" << EOF
# 响应式设计验证报告

**生成时间**: $(date)  
**项目**: AI变现之路  
**验证范围**: Web端 + 移动端界面一致性

## 📊 验证概览

### 支持的设备和断点
| 类型 | 设备 | 尺寸 | 断点 |
|------|------|------|------|
| 手机 | iPhone SE | 320×568 | xs |
| 手机 | iPhone 12 | 375×667 | sm |
| 手机 | iPhone 12 Pro Max | 414×736 | sm |
| 平板 | iPad | 768×1024 | md |
| 平板 | iPad (横屏) | 1024×768 | lg |
| 桌面 | 笔记本 | 1366×768 | lg |
| 桌面 | 桌面显示器 | 1440×900 | xl |
| 桌面 | 大屏显示器 | 1920×1080 | 2xl |

### 验证工具和文件
EOF
    
    # 列出生成的工具和文件
    echo "" >> "$FINAL_REPORT"
    echo "### 生成的验证工具" >> "$FINAL_REPORT"
    if [ -f "$VALIDATION_WORKSPACE/device-test-matrix.html" ]; then
        echo "- **设备测试矩阵**: 可视化多设备并行测试" >> "$FINAL_REPORT"
    fi
    if [ -f "$VALIDATION_WORKSPACE/responsive-template.css" ]; then
        echo "- **响应式CSS模板**: 标准化的响应式设计模板" >> "$FINAL_REPORT"
    fi
    if [ -f "$VALIDATION_WORKSPACE/responsive-test.cy.js" ]; then
        echo "- **Cypress自动化测试**: 自动化响应式测试脚本" >> "$FINAL_REPORT"
    fi
    
    cat >> "$FINAL_REPORT" << 'EOF'

## 🎯 验证检查清单

### 基础响应式检查
- [ ] 所有页面在不同设备上正确显示
- [ ] 没有水平滚动条出现
- [ ] 导航菜单在移动端正常工作
- [ ] 文字大小在所有设备上易读
- [ ] 图片正确缩放和显示

### 触摸友好性检查
- [ ] 按钮最小尺寸 44×44px
- [ ] 链接垂直间距至少 8px
- [ ] 表单控件高度至少 44px
- [ ] 避免悬停效果的依赖
- [ ] 支持快速点击响应

### 内容适配检查
- [ ] 重要内容在小屏幕上可见
- [ ] 表单在移动端易于填写
- [ ] 卡片布局适配不同屏幕
- [ ] 网格系统响应式调整

### 性能和用户体验
- [ ] 页面加载速度在移动端可接受
- [ ] 滚动操作流畅
- [ ] 动画效果适中
- [ ] 无障碍性支持

## 🛠️ 推荐使用流程

### 第一步：快速检查
1. 打开设备测试矩阵 (`device-test-matrix.html`)
2. 输入要测试的页面URL
3. 点击"加载所有设备"
4. 目视检查各设备的显示效果

### 第二步：详细验证
1. 使用浏览器开发者工具模拟不同设备
2. 逐一检查各个页面的关键功能
3. 验证触摸交互的易用性
4. 测试表单填写体验

### 第三步：自动化测试
1. 运行Cypress响应式测试脚本
2. 检查自动化测试结果
3. 修复发现的问题
4. 重新运行测试验证

### 第四步：真机测试
1. 在真实移动设备上测试
2. 验证触摸体验
3. 检查加载性能
4. 收集用户反馈

## 📋 常见问题和解决方案

### 问题1: 移动端按钮太小
**解决**: 使用 `min-height: 44px` 和充足的 `padding`

### 问题2: 文字在小屏幕上难以阅读
**解决**: 设置移动端 `font-size: 16px` 防止缩放，使用合适的行高

### 问题3: 水平滚动条出现
**解决**: 检查固定宽度元素，使用 `max-width: 100%` 和 `overflow-x: hidden`

### 问题4: 表单在移动端难以使用
**解决**: 增大输入框，简化表单布局，使用适当的输入类型

## 🔧 CSS最佳实践

### 1. 移动优先设计
```css
/* 基础样式：移动端 */
.component {
  font-size: 16px;
  padding: 12px;
}

/* 平板端增强 */
@media (min-width: 768px) {
  .component {
    font-size: 18px;
    padding: 16px;
  }
}
```

### 2. 使用CSS变量管理断点
```css
:root {
  --breakpoint-md: 768px;
}

@media (min-width: var(--breakpoint-md)) {
  /* 平板及以上样式 */
}
```

### 3. 触摸友好的按钮
```css
.touch-button {
  min-height: 44px;
  padding: 12px 24px;
  touch-action: manipulation;
}
```

## 📈 性能监控

### 关键指标
- **首次内容绘制 (FCP)**: < 1.5s
- **最大内容绘制 (LCP)**: < 2.5s
- **累积布局偏移 (CLS)**: < 0.1
- **首次输入延迟 (FID)**: < 100ms

### 移动端特别注意
- 避免大型图片
- 优化字体加载
- 减少JavaScript执行时间
- 使用适当的图片格式

---

*报告由响应式设计验证工具自动生成*
EOF
    
    echo -e "${GREEN}✅ 响应式验证报告生成完成: $FINAL_REPORT${NC}"
}

# 主菜单
print_menu() {
    echo -e "${BLUE}请选择操作：${NC}"
    echo ""
    echo -e "  ${YELLOW}1)${NC} 检查断点一致性"
    echo -e "  ${YELLOW}2)${NC} 生成设备测试矩阵"
    echo -e "  ${YELLOW}3)${NC} 检查触摸友好性"
    echo -e "  ${YELLOW}4)${NC} 生成响应式CSS模板"
    echo -e "  ${YELLOW}5)${NC} 运行自动化测试"
    echo -e "  ${YELLOW}6)${NC} 生成完整验证报告"
    echo -e "  ${YELLOW}7)${NC} 执行全面验证 (1-6全部)"
    echo ""
    echo -e "  ${YELLOW}q)${NC} 退出"
    echo ""
}

# 主函数
main() {
    print_header
    
    while true; do
        print_menu
        read -p "请选择操作 (1-7, q): " choice
        
        case $choice in
            1)
                check_breakpoint_consistency
                ;;
            2)
                generate_device_matrix
                ;;
            3)
                check_touch_friendliness
                ;;
            4)
                generate_responsive_template
                ;;
            5)
                run_automated_tests
                ;;
            6)
                generate_validation_report
                ;;
            7)
                echo -e "${BLUE}🔄 执行全面响应式验证...${NC}"
                check_breakpoint_consistency
                generate_device_matrix
                check_touch_friendliness
                generate_responsive_template
                run_automated_tests
                generate_validation_report
                echo -e "${GREEN}✅ 全面验证完成！${NC}"
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
