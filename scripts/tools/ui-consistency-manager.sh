#!/bin/bash

# AI变现之路 - UI一致性管理工具
# 提供统一的界面调整工作流，确保Web和移动端的一致性

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
UI_WORKSPACE="$PROJECT_ROOT/logs/ui-adjustments"
BACKUP_DIR="$PROJECT_ROOT/backups/ui-snapshots"

# 确保目录存在
mkdir -p "$UI_WORKSPACE"
mkdir -p "$BACKUP_DIR"

# 打印标题
print_header() {
    echo ""
    echo -e "${CYAN}============================================${NC}"
    echo -e "${WHITE}🎨 AI变现之路 - UI一致性管理工具${NC}"
    echo -e "${CYAN}============================================${NC}"
    echo ""
}

# 打印菜单
print_menu() {
    echo -e "${BLUE}请选择操作：${NC}"
    echo ""
    echo -e "${WHITE}📋 分析和诊断${NC}"
    echo -e "  ${YELLOW}1)${NC} 分析当前样式架构"
    echo -e "  ${YELLOW}2)${NC} 检测样式冲突和问题"
    echo -e "  ${YELLOW}3)${NC} 生成组件样式地图"
    echo ""
    echo -e "${WHITE}🔧 界面调整工具${NC}"
    echo -e "  ${YELLOW}4)${NC} 创建样式隔离环境"
    echo -e "  ${YELLOW}5)${NC} 启动实时预览服务"
    echo -e "  ${YELLOW}6)${NC} 组件级样式编辑器"
    echo ""
    echo -e "${WHITE}📱 响应式测试${NC}"
    echo -e "  ${YELLOW}7)${NC} 多设备并行预览"
    echo -e "  ${YELLOW}8)${NC} 响应式一致性检查"
    echo -e "  ${YELLOW}9)${NC} 移动端触摸优化验证"
    echo ""
    echo -e "${WHITE}🛡️ 安全和备份${NC}"
    echo -e "  ${YELLOW}10)${NC} 创建样式快照"
    echo -e "  ${YELLOW}11)${NC} 回滚到指定版本"
    echo -e "  ${YELLOW}12)${NC} 批量样式修复"
    echo ""
    echo -e "${WHITE}📊 报告和文档${NC}"
    echo -e "  ${YELLOW}13)${NC} 生成调整报告"
    echo -e "  ${YELLOW}14)${NC} 导出样式指南"
    echo ""
    echo -e "  ${YELLOW}q)${NC} 退出"
    echo ""
}

# 样式架构分析
analyze_css_architecture() {
    echo -e "${BLUE}📊 分析CSS架构...${NC}"
    
    # 分析CSS文件结构
    echo "=== CSS文件统计 ===" > "$UI_WORKSPACE/css-analysis.txt"
    find "$FRONTEND_DIR/src/styles" -name "*.css" -exec wc -l {} + >> "$UI_WORKSPACE/css-analysis.txt"
    
    # 分析globals.css问题
    echo "" >> "$UI_WORKSPACE/css-analysis.txt"
    echo "=== globals.css 问题分析 ===" >> "$UI_WORKSPACE/css-analysis.txt"
    grep -n "!important" "$FRONTEND_DIR/src/app/globals.css" | wc -l > temp_important_count.txt
    echo "发现 $(cat temp_important_count.txt) 个 !important 声明" >> "$UI_WORKSPACE/css-analysis.txt"
    rm temp_important_count.txt
    
    # 分析组件样式分布
    echo "" >> "$UI_WORKSPACE/css-analysis.txt"
    echo "=== 组件样式分布 ===" >> "$UI_WORKSPACE/css-analysis.txt"
    find "$FRONTEND_DIR/src/components" -name "*.tsx" -exec grep -l "className\|style" {} \; | wc -l > temp_component_count.txt
    echo "发现 $(cat temp_component_count.txt) 个包含样式的组件" >> "$UI_WORKSPACE/css-analysis.txt"
    rm temp_component_count.txt
    
    echo -e "${GREEN}✅ 分析完成，报告保存到: $UI_WORKSPACE/css-analysis.txt${NC}"
    cat "$UI_WORKSPACE/css-analysis.txt"
}

# 检测样式冲突
detect_style_conflicts() {
    echo -e "${BLUE}🔍 检测样式冲突...${NC}"
    
    CONFLICT_REPORT="$UI_WORKSPACE/style-conflicts.txt"
    echo "=== 样式冲突检测报告 ===" > "$CONFLICT_REPORT"
    echo "检测时间: $(date)" >> "$CONFLICT_REPORT"
    echo "" >> "$CONFLICT_REPORT"
    
    # 检测重复的CSS选择器
    echo "=== 重复选择器检测 ===" >> "$CONFLICT_REPORT"
    find "$FRONTEND_DIR/src/styles" -name "*.css" -exec grep -h "^\." {} \; | sort | uniq -d >> "$CONFLICT_REPORT"
    
    # 检测!important过度使用
    echo "" >> "$CONFLICT_REPORT"
    echo "=== !important 使用统计 ===" >> "$CONFLICT_REPORT"
    find "$FRONTEND_DIR/src" -name "*.css" -exec grep -Hn "!important" {} \; >> "$CONFLICT_REPORT"
    
    # 检测硬编码颜色值
    echo "" >> "$CONFLICT_REPORT"
    echo "=== 硬编码颜色检测 ===" >> "$CONFLICT_REPORT"
    find "$FRONTEND_DIR/src" -name "*.css" -exec grep -Hn "#[0-9A-Fa-f]\{6\}" {} \; | head -20 >> "$CONFLICT_REPORT"
    
    echo -e "${GREEN}✅ 冲突检测完成，报告保存到: $CONFLICT_REPORT${NC}"
    echo -e "${YELLOW}📖 查看报告：${NC}"
    head -30 "$CONFLICT_REPORT"
}

# 生成组件样式地图
generate_component_map() {
    echo -e "${BLUE}🗺️ 生成组件样式地图...${NC}"
    
    COMPONENT_MAP="$UI_WORKSPACE/component-style-map.json"
    echo "{" > "$COMPONENT_MAP"
    echo "  \"generation_time\": \"$(date)\"," >> "$COMPONENT_MAP"
    echo "  \"components\": [" >> "$COMPONENT_MAP"
    
    # 扫描所有组件
    component_count=0
    find "$FRONTEND_DIR/src/components" -name "*.tsx" | while read component_file; do
        component_name=$(basename "$component_file" .tsx)
        relative_path=${component_file#$FRONTEND_DIR/src/}
        
        # 检查组件中的样式使用
        class_count=$(grep -o "className\|style" "$component_file" | wc -l)
        css_vars=$(grep -o "var(--[^)]*)" "$component_file" | wc -l)
        
        if [ $component_count -gt 0 ]; then
            echo "    ," >> "$COMPONENT_MAP"
        fi
        
        echo "    {" >> "$COMPONENT_MAP"
        echo "      \"name\": \"$component_name\"," >> "$COMPONENT_MAP"
        echo "      \"path\": \"$relative_path\"," >> "$COMPONENT_MAP"
        echo "      \"style_usage_count\": $class_count," >> "$COMPONENT_MAP"
        echo "      \"css_variables_count\": $css_vars" >> "$COMPONENT_MAP"
        echo "    }" >> "$COMPONENT_MAP"
        
        component_count=$((component_count + 1))
    done
    
    echo "  ]" >> "$COMPONENT_MAP"
    echo "}" >> "$COMPONENT_MAP"
    
    echo -e "${GREEN}✅ 组件样式地图生成完成: $COMPONENT_MAP${NC}"
}

# 创建样式隔离环境
create_isolated_environment() {
    echo -e "${BLUE}🔧 创建样式隔离环境...${NC}"
    
    # 创建隔离工作空间
    ISOLATED_DIR="$UI_WORKSPACE/isolated-workspace"
    rm -rf "$ISOLATED_DIR"
    mkdir -p "$ISOLATED_DIR"
    
    # 复制关键CSS文件到隔离环境
    cp -r "$FRONTEND_DIR/src/styles" "$ISOLATED_DIR/"
    
    # 创建隔离测试页面
    cat > "$ISOLATED_DIR/test-page.html" << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>样式隔离测试环境</title>
    <style>
        /* 基础重置 */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        
        /* 测试容器 */
        .test-container {
            display: flex;
            height: 100vh;
        }
        
        .preview-panel {
            flex: 1;
            border-right: 1px solid #ccc;
            overflow: auto;
        }
        
        .editor-panel {
            flex: 1;
            padding: 20px;
        }
        
        .device-preview {
            border: 1px solid #ddd;
            margin: 10px;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .device-header {
            background: #f5f5f5;
            padding: 10px;
            font-weight: bold;
            border-bottom: 1px solid #ddd;
        }
        
        .device-content {
            padding: 20px;
            min-height: 300px;
        }
        
        /* 移动端模拟 */
        .mobile-preview {
            width: 375px;
            margin: 20px auto;
        }
        
        .tablet-preview {
            width: 768px;
            margin: 20px auto;
        }
        
        .desktop-preview {
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="test-container">
        <div class="preview-panel">
            <div class="device-preview desktop-preview">
                <div class="device-header">💻 桌面端预览 (1440px)</div>
                <div class="device-content" id="desktop-content">
                    <!-- 测试内容将在这里渲染 -->
                </div>
            </div>
            
            <div class="device-preview tablet-preview">
                <div class="device-header">📱 平板端预览 (768px)</div>
                <div class="device-content" id="tablet-content">
                    <!-- 测试内容将在这里渲染 -->
                </div>
            </div>
            
            <div class="device-preview mobile-preview">
                <div class="device-header">📱 移动端预览 (375px)</div>
                <div class="device-content" id="mobile-content">
                    <!-- 测试内容将在这里渲染 -->
                </div>
            </div>
        </div>
        
        <div class="editor-panel">
            <h3>📝 样式编辑器</h3>
            <textarea id="css-editor" style="width: 100%; height: 400px; font-family: monospace;">
/* 在这里编写或修改CSS样式 */
.test-component {
    background: var(--color-bg-glass, rgba(26, 26, 26, 0.45));
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-border-primary, rgba(42, 42, 42, 0.70));
    border-radius: var(--radius-lg, 12px);
    padding: var(--spacing-6, 24px);
    color: var(--color-text-primary, #FFFFFF);
}

.test-button {
    background: var(--gradient-primary, linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%));
    border: none;
    border-radius: var(--radius-md, 8px);
    padding: var(--spacing-3, 12px) var(--spacing-6, 24px);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-normal, 0.3s ease);
}

.test-button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-button, 0px 0px 15px 0px rgba(139, 92, 246, 0.50));
}
            </textarea>
            
            <br><br>
            <button onclick="updatePreview()" style="padding: 10px 20px; background: #3B82F6; color: white; border: none; border-radius: 5px; cursor: pointer;">
                🔄 更新预览
            </button>
            
            <button onclick="exportCSS()" style="padding: 10px 20px; background: #10B981; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                💾 导出CSS
            </button>
            
            <br><br>
            <h4>📖 测试HTML模板</h4>
            <textarea id="html-template" style="width: 100%; height: 200px; font-family: monospace;">
<div class="test-component">
    <h2>测试组件标题</h2>
    <p>这是一个测试组件的内容区域，用于验证样式效果。</p>
    <button class="test-button">测试按钮</button>
</div>
            </textarea>
        </div>
    </div>

    <script>
        // 加载CSS变量
        const cssVariables = `
            :root {
                --color-primary-blue: #3B82F6;
                --color-primary-purple: #8B5CF6;
                --gradient-primary: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%);
                --font-family-primary: 'Alibaba PuHuiTi 3.0', -apple-system, BlinkMacSystemFont, sans-serif;
                --spacing-3: 12px;
                --spacing-6: 24px;
                --radius-md: 8px;
                --radius-lg: 12px;
                --transition-normal: 0.3s ease;
                --shadow-button: 0px 0px 15px 0px rgba(139, 92, 246, 0.50);
                --color-bg-primary: #030303;
                --color-bg-glass: rgba(26, 26, 26, 0.45);
                --color-text-primary: #FFFFFF;
                --color-border-primary: rgba(42, 42, 42, 0.70);
            }
        `;
        
        // 添加CSS变量到页面
        const styleEl = document.createElement('style');
        styleEl.textContent = cssVariables;
        document.head.appendChild(styleEl);
        
        function updatePreview() {
            const cssContent = document.getElementById('css-editor').value;
            const htmlContent = document.getElementById('html-template').value;
            
            // 更新样式
            let customStyle = document.getElementById('custom-style');
            if (!customStyle) {
                customStyle = document.createElement('style');
                customStyle.id = 'custom-style';
                document.head.appendChild(customStyle);
            }
            customStyle.textContent = cssContent;
            
            // 更新所有预览面板
            document.getElementById('desktop-content').innerHTML = htmlContent;
            document.getElementById('tablet-content').innerHTML = htmlContent;
            document.getElementById('mobile-content').innerHTML = htmlContent;
        }
        
        function exportCSS() {
            const cssContent = document.getElementById('css-editor').value;
            const blob = new Blob([cssContent], { type: 'text/css' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'exported-styles.css';
            a.click();
            URL.revokeObjectURL(url);
        }
        
        // 初始化预览
        updatePreview();
    </script>
</body>
</html>
EOF
    
    echo -e "${GREEN}✅ 隔离环境创建完成${NC}"
    echo -e "${YELLOW}📁 工作目录: $ISOLATED_DIR${NC}"
    echo -e "${YELLOW}🌐 测试页面: file://$ISOLATED_DIR/test-page.html${NC}"
    echo ""
    echo -e "${BLUE}💡 使用方法：${NC}"
    echo -e "  1. 在浏览器中打开测试页面"
    echo -e "  2. 在右侧编辑器中修改CSS样式"
    echo -e "  3. 点击'更新预览'查看效果"
    echo -e "  4. 同时查看桌面、平板、移动端效果"
    echo -e "  5. 满意后点击'导出CSS'保存样式"
}

# 启动实时预览服务
start_live_preview() {
    echo -e "${BLUE}🚀 启动实时预览服务...${NC}"
    
    cd "$FRONTEND_DIR"
    
    # 检查端口
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}⚠️ 端口3000已被占用，尝试使用端口3001...${NC}"
        PORT=3001
    else
        PORT=3000
    fi
    
    echo -e "${GREEN}✅ 启动开发服务器 (端口 $PORT)...${NC}"
    echo -e "${BLUE}📱 访问地址：${NC}"
    echo -e "  桌面端: http://localhost:$PORT"
    echo -e "  移动端测试: http://localhost:$PORT (使用浏览器开发者工具切换到移动端视图)"
    echo ""
    echo -e "${YELLOW}💡 提示：${NC}"
    echo -e "  - 使用 Ctrl+Shift+M 切换移动端视图"
    echo -e "  - 使用 F12 打开开发者工具"
    echo -e "  - 推荐同时打开多个标签页测试不同设备"
    echo ""
    echo -e "${PURPLE}按 Ctrl+C 停止服务${NC}"
    
    # 启动开发服务器
    npm run dev -- --port $PORT
}

# 多设备并行预览
multi_device_preview() {
    echo -e "${BLUE}📱 启动多设备并行预览...${NC}"
    
    # 创建多设备预览HTML
    PREVIEW_FILE="$UI_WORKSPACE/multi-device-preview.html"
    cat > "$PREVIEW_FILE" << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多设备并行预览</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
        }
        
        .preview-container {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .device-frame {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            overflow: hidden;
            position: relative;
        }
        
        .device-header {
            background: #333;
            color: white;
            padding: 10px 15px;
            font-weight: 600;
            text-align: center;
        }
        
        .device-screen {
            border: none;
            display: block;
        }
        
        /* 手机 */
        .mobile-frame {
            width: 375px;
        }
        .mobile-frame .device-screen {
            width: 375px;
            height: 667px;
        }
        
        /* 平板 */
        .tablet-frame {
            width: 768px;
        }
        .tablet-frame .device-screen {
            width: 768px;
            height: 1024px;
        }
        
        /* 桌面 */
        .desktop-frame {
            width: 1200px;
        }
        .desktop-frame .device-screen {
            width: 1200px;
            height: 800px;
        }
        
        .controls {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            z-index: 1000;
        }
        
        .url-input {
            width: 300px;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        
        .btn {
            background: #3B82F6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin: 2px;
        }
        
        .btn:hover {
            background: #2563EB;
        }
    </style>
</head>
<body>
    <div class="controls">
        <input type="text" class="url-input" id="urlInput" value="http://localhost:3000" placeholder="输入要预览的URL">
        <br>
        <button class="btn" onclick="updateAllFrames()">🔄 更新全部</button>
        <button class="btn" onclick="toggleDevice('mobile')">📱 切换手机</button>
        <button class="btn" onclick="toggleDevice('tablet')">📱 切换平板</button>
        <button class="btn" onclick="toggleDevice('desktop')">💻 切换桌面</button>
    </div>

    <div class="preview-container">
        <div class="device-frame mobile-frame" id="mobile-device">
            <div class="device-header">📱 iPhone (375×667)</div>
            <iframe class="device-screen" id="mobile-frame" src="http://localhost:3000"></iframe>
        </div>
        
        <div class="device-frame tablet-frame" id="tablet-device" style="display: none;">
            <div class="device-header">📱 iPad (768×1024)</div>
            <iframe class="device-screen" id="tablet-frame" src="http://localhost:3000"></iframe>
        </div>
        
        <div class="device-frame desktop-frame" id="desktop-device" style="display: none;">
            <div class="device-header">💻 Desktop (1200×800)</div>
            <iframe class="device-screen" id="desktop-frame" src="http://localhost:3000"></iframe>
        </div>
    </div>

    <script>
        function updateAllFrames() {
            const url = document.getElementById('urlInput').value;
            const frames = ['mobile-frame', 'tablet-frame', 'desktop-frame'];
            
            frames.forEach(frameId => {
                const frame = document.getElementById(frameId);
                if (frame) {
                    frame.src = url + '?t=' + new Date().getTime(); // 添加时间戳强制刷新
                }
            });
        }
        
        function toggleDevice(device) {
            const devices = ['mobile', 'tablet', 'desktop'];
            
            devices.forEach(d => {
                const element = document.getElementById(d + '-device');
                if (d === device) {
                    element.style.display = element.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
        
        // 自动刷新功能
        let autoRefresh = false;
        
        function startAutoRefresh() {
            if (!autoRefresh) {
                autoRefresh = true;
                setInterval(() => {
                    if (autoRefresh) {
                        updateAllFrames();
                    }
                }, 5000); // 每5秒刷新一次
            }
        }
        
        // 键盘快捷键
        document.addEventListener('keydown', function(e) {
            if (e.key === 'r' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                updateAllFrames();
            }
        });
    </script>
</body>
</html>
EOF
    
    echo -e "${GREEN}✅ 多设备预览页面创建完成${NC}"
    echo -e "${YELLOW}🌐 预览页面: file://$PREVIEW_FILE${NC}"
    echo ""
    echo -e "${BLUE}💡 使用说明：${NC}"
    echo -e "  1. 确保开发服务器已启动 (http://localhost:3000)"
    echo -e "  2. 在浏览器中打开预览页面"
    echo -e "  3. 使用右上角控制面板切换设备"
    echo -e "  4. 使用 Ctrl+R 快速刷新所有预览"
    echo -e "  5. 修改代码后点击'更新全部'查看效果"
    
    # 尝试自动打开浏览器
    if command -v open &> /dev/null; then
        open "file://$PREVIEW_FILE"
    elif command -v xdg-open &> /dev/null; then
        xdg-open "file://$PREVIEW_FILE"
    fi
}

# 响应式一致性检查
check_responsive_consistency() {
    echo -e "${BLUE}📏 执行响应式一致性检查...${NC}"
    
    CONSISTENCY_REPORT="$UI_WORKSPACE/responsive-consistency.txt"
    echo "=== 响应式一致性检查报告 ===" > "$CONSISTENCY_REPORT"
    echo "检查时间: $(date)" >> "$CONSISTENCY_REPORT"
    echo "" >> "$CONSISTENCY_REPORT"
    
    # 检查CSS媒体查询
    echo "=== 媒体查询分析 ===" >> "$CONSISTENCY_REPORT"
    find "$FRONTEND_DIR/src" -name "*.css" -exec grep -Hn "@media" {} \; >> "$CONSISTENCY_REPORT"
    
    # 检查断点一致性
    echo "" >> "$CONSISTENCY_REPORT"
    echo "=== 断点使用统计 ===" >> "$CONSISTENCY_REPORT"
    grep -r "max-width\|min-width" "$FRONTEND_DIR/src/styles/" | grep -o "[0-9]\+px" | sort | uniq -c >> "$CONSISTENCY_REPORT"
    
    # 生成一致性建议
    echo "" >> "$CONSISTENCY_REPORT"
    echo "=== 一致性建议 ===" >> "$CONSISTENCY_REPORT"
    echo "1. 统一使用CSS变量定义断点" >> "$CONSISTENCY_REPORT"
    echo "2. 避免硬编码像素值" >> "$CONSISTENCY_REPORT"
    echo "3. 遵循移动优先设计原则" >> "$CONSISTENCY_REPORT"
    echo "4. 确保关键元素在所有设备上可用" >> "$CONSISTENCY_REPORT"
    
    echo -e "${GREEN}✅ 一致性检查完成: $CONSISTENCY_REPORT${NC}"
    cat "$CONSISTENCY_REPORT"
}

# 创建样式快照
create_style_snapshot() {
    echo -e "${BLUE}📸 创建样式快照...${NC}"
    
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    SNAPSHOT_DIR="$BACKUP_DIR/snapshot_$TIMESTAMP"
    mkdir -p "$SNAPSHOT_DIR"
    
    # 备份所有样式文件
    cp -r "$FRONTEND_DIR/src/styles" "$SNAPSHOT_DIR/"
    cp "$FRONTEND_DIR/src/app/globals.css" "$SNAPSHOT_DIR/"
    
    # 创建快照信息
    cat > "$SNAPSHOT_DIR/snapshot_info.txt" << EOF
快照创建时间: $(date)
快照类型: 样式文件备份
包含文件:
- 所有 src/styles/ 目录下的CSS文件
- globals.css 文件

使用 ui-consistency-manager.sh 的选项11可以恢复到此快照
EOF
    
    echo -e "${GREEN}✅ 样式快照创建完成${NC}"
    echo -e "${YELLOW}📁 快照位置: $SNAPSHOT_DIR${NC}"
    
    # 列出最近的快照
    echo ""
    echo -e "${BLUE}📋 最近的快照：${NC}"
    ls -la "$BACKUP_DIR" | grep "snapshot_" | tail -5
}

# 回滚到指定版本
rollback_to_snapshot() {
    echo -e "${BLUE}⏪ 回滚样式到指定快照...${NC}"
    
    echo -e "${YELLOW}可用的快照：${NC}"
    snapshots=($(ls "$BACKUP_DIR" | grep "snapshot_" | sort -r))
    
    if [ ${#snapshots[@]} -eq 0 ]; then
        echo -e "${RED}❌ 没有找到可用的快照${NC}"
        return 1
    fi
    
    for i in "${!snapshots[@]}"; do
        echo -e "  ${YELLOW}$((i+1)))${NC} ${snapshots[$i]}"
    done
    
    echo ""
    read -p "请选择要回滚的快照编号 (1-${#snapshots[@]}): " choice
    
    if [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le ${#snapshots[@]} ]; then
        selected_snapshot="${snapshots[$((choice-1))]}"
        snapshot_dir="$BACKUP_DIR/$selected_snapshot"
        
        echo -e "${YELLOW}⚠️ 警告：这将覆盖当前的样式文件${NC}"
        read -p "确认回滚到 $selected_snapshot? (y/N): " confirm
        
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            # 创建当前状态的备份
            echo -e "${BLUE}📸 备份当前状态...${NC}"
            create_style_snapshot
            
            # 执行回滚
            echo -e "${BLUE}⏪ 执行回滚...${NC}"
            cp -r "$snapshot_dir/styles/"* "$FRONTEND_DIR/src/styles/"
            if [ -f "$snapshot_dir/globals.css" ]; then
                cp "$snapshot_dir/globals.css" "$FRONTEND_DIR/src/app/"
            fi
            
            echo -e "${GREEN}✅ 回滚完成${NC}"
            echo -e "${YELLOW}💡 提示：重启开发服务器以查看更改${NC}"
        else
            echo -e "${YELLOW}❌ 回滚已取消${NC}"
        fi
    else
        echo -e "${RED}❌ 无效的选择${NC}"
    fi
}

# 生成调整报告
generate_adjustment_report() {
    echo -e "${BLUE}📊 生成界面调整报告...${NC}"
    
    REPORT_FILE="$UI_WORKSPACE/ui-adjustment-report.md"
    
    cat > "$REPORT_FILE" << EOF
# AI变现之路 - 界面调整报告

**生成时间**: $(date)
**项目路径**: $PROJECT_ROOT

## 📊 项目样式概览

### CSS架构统计
EOF
    
    # 添加统计信息
    echo "" >> "$REPORT_FILE"
    echo "| 指标 | 数值 |" >> "$REPORT_FILE"
    echo "|------|------|" >> "$REPORT_FILE"
    echo "| CSS文件总数 | $(find "$FRONTEND_DIR/src/styles" -name "*.css" | wc -l) |" >> "$REPORT_FILE"
    echo "| 组件总数 | $(find "$FRONTEND_DIR/src/components" -name "*.tsx" | wc -l) |" >> "$REPORT_FILE"
    echo "| globals.css行数 | $(wc -l < "$FRONTEND_DIR/src/app/globals.css") |" >> "$REPORT_FILE"
    echo "| !important使用次数 | $(grep -r "!important" "$FRONTEND_DIR/src" | wc -l) |" >> "$REPORT_FILE"
    
    cat >> "$REPORT_FILE" << 'EOF'

## 🎯 优化建议

### 1. 样式架构优化
- [ ] 将globals.css中的页面特定样式分离到独立文件
- [ ] 减少!important的使用，改用CSS特异性管理
- [ ] 统一使用CSS变量，减少硬编码值

### 2. 响应式设计一致性
- [ ] 建立统一的断点系统
- [ ] 确保所有组件在移动端的可用性
- [ ] 优化触摸交互体验

### 3. 性能优化
- [ ] 合并重复的CSS规则
- [ ] 移除未使用的样式
- [ ] 优化CSS加载顺序

## 🛠️ 推荐工作流

1. **创建样式快照** - 使用选项10
2. **使用隔离环境测试** - 使用选项4
3. **多设备并行预览** - 使用选项7
4. **验证响应式一致性** - 使用选项8
5. **应用更改到项目**
6. **创建新快照备份**

## 📱 设备兼容性检查清单

- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1440px)
- [ ] Large Desktop (1920px)

## 🔧 工具使用记录

EOF
    
    # 添加工具使用历史
    if [ -f "$UI_WORKSPACE/tool-usage.log" ]; then
        echo "### 最近使用的工具" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        tail -10 "$UI_WORKSPACE/tool-usage.log" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
    fi
    
    echo -e "${GREEN}✅ 调整报告生成完成: $REPORT_FILE${NC}"
    echo -e "${YELLOW}📖 查看报告：${NC}"
    head -30 "$REPORT_FILE"
}

# 记录工具使用
log_tool_usage() {
    echo "$(date): $1" >> "$UI_WORKSPACE/tool-usage.log"
}

# 主函数
main() {
    print_header
    
    while true; do
        print_menu
        read -p "请选择操作 (1-14, q): " choice
        
        case $choice in
            1)
                log_tool_usage "样式架构分析"
                analyze_css_architecture
                ;;
            2)
                log_tool_usage "样式冲突检测"
                detect_style_conflicts
                ;;
            3)
                log_tool_usage "组件样式地图生成"
                generate_component_map
                ;;
            4)
                log_tool_usage "创建样式隔离环境"
                create_isolated_environment
                ;;
            5)
                log_tool_usage "启动实时预览服务"
                start_live_preview
                ;;
            6)
                echo -e "${BLUE}💡 组件级样式编辑器已集成在选项4的隔离环境中${NC}"
                ;;
            7)
                log_tool_usage "多设备并行预览"
                multi_device_preview
                ;;
            8)
                log_tool_usage "响应式一致性检查"
                check_responsive_consistency
                ;;
            9)
                echo -e "${BLUE}📱 移动端触摸优化验证${NC}"
                echo -e "${YELLOW}💡 请使用选项7的多设备预览，在真实设备上测试触摸交互${NC}"
                ;;
            10)
                log_tool_usage "创建样式快照"
                create_style_snapshot
                ;;
            11)
                log_tool_usage "回滚样式快照"
                rollback_to_snapshot
                ;;
            12)
                echo -e "${BLUE}🔧 批量样式修复${NC}"
                echo -e "${YELLOW}💡 请先使用选项2检测冲突，然后使用选项4的隔离环境进行修复${NC}"
                ;;
            13)
                log_tool_usage "生成调整报告"
                generate_adjustment_report
                ;;
            14)
                echo -e "${BLUE}📚 导出样式指南${NC}"
                echo -e "${YELLOW}💡 样式指南将在调整报告中包含，请使用选项13${NC}"
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
