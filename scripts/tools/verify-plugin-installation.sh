#!/bin/bash

# AI变现之路 - 插件安装验证脚本
# 作者：AI变现之路开发团队
# 功能：验证已安装插件的配置和状态

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# 日志函数
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# 检查是否在正确的目录
check_directory() {
    if [[ ! -f "package.json" ]] || [[ ! -d "src/api" ]]; then
        log_error "请在Strapi后端项目根目录运行此脚本"
        exit 1
    fi
}

# 验证插件安装状态
verify_plugin_installation() {
    log_info "=== 🔍 验证插件安装状态 ==="
    echo ""
    
    # 期望安装的插件列表
    declare -A expected_plugins=(
        ["strapi-plugin-documentation"]="API文档生成插件"
        ["strapi-plugin-users-permissions"]="用户权限管理插件"
        ["strapi-plugin-seo"]="SEO优化增强插件"
        ["strapi-plugin-email-designer-v5"]="邮件模板设计器"
        ["strapi-plugin-slugify"]="SEO友好URL生成"
        ["strapi-plugin-config-sync"]="配置同步管理"
        ["strapi-plugin-transformer"]="API数据转换器"
        ["strapi-plugin-import-export-entries"]="数据导入导出工具"
    )
    
    local installed_count=0
    local total_count=${#expected_plugins[@]}
    
    for plugin in "${!expected_plugins[@]}"; do
        if npm list "$plugin" >/dev/null 2>&1; then
            log_success "✅ $plugin - ${expected_plugins[$plugin]}"
            ((installed_count++))
        else
            log_warning "❌ $plugin - ${expected_plugins[$plugin]} (未安装)"
        fi
    done
    
    echo ""
    log_info "📊 安装状态统计: $installed_count/$total_count 个插件已安装"
    
    if [[ $installed_count -eq $total_count ]]; then
        log_success "🎉 所有推荐插件已成功安装！"
    else
        log_warning "部分插件未安装，建议运行安装脚本"
    fi
}

# 验证插件配置
verify_plugin_configuration() {
    log_info "=== ⚙️ 验证插件配置状态 ==="
    echo ""
    
    if [[ ! -f "config/plugins.ts" ]]; then
        log_error "配置文件 config/plugins.ts 不存在"
        return 1
    fi
    
    # 检查关键配置项
    declare -A config_checks=(
        ["email-designer"]="邮件模板设计器配置"
        ["slugify"]="SEO友好URL配置"
        ["config-sync"]="配置同步设置"
        ["seo"]="SEO增强配置"
        ["transformer"]="数据转换器配置"
        ["import-export-entries"]="导入导出配置"
    )
    
    local configured_count=0
    local total_configs=${#config_checks[@]}
    
    for config in "${!config_checks[@]}"; do
        if grep -q "$config" "config/plugins.ts"; then
            log_success "✅ $config - ${config_checks[$config]}"
            ((configured_count++))
        else
            log_warning "❌ $config - ${config_checks[$config]} (配置缺失)"
        fi
    done
    
    echo ""
    log_info "📊 配置状态统计: $configured_count/$total_configs 个插件已配置"
    
    if [[ $configured_count -eq $total_configs ]]; then
        log_success "🎉 所有插件配置完成！"
    else
        log_warning "部分插件配置缺失，请检查配置文件"
    fi
}

# 验证自定义功能
verify_custom_features() {
    log_info "=== 🛠️ 验证自定义功能 ==="
    echo ""
    
    # 检查站点地图功能
    if [[ -f "src/api/sitemap/controllers/sitemap.ts" ]] && [[ -f "src/api/sitemap/routes/sitemap.ts" ]]; then
        log_success "✅ 自定义站点地图功能已创建"
    else
        log_warning "❌ 自定义站点地图功能缺失"
    fi
    
    # 检查插件管理脚本
    if [[ -f "../scripts/tools/install-recommended-plugins.sh" ]] && [[ -f "../scripts/tools/configure-strapi-plugins.sh" ]]; then
        log_success "✅ 插件管理脚本已创建"
    else
        log_warning "❌ 插件管理脚本缺失"
    fi
    
    # 检查配置模板
    if [[ -f "config/plugins.recommended.ts" ]]; then
        log_success "✅ 插件配置模板已创建"
    else
        log_warning "❌ 插件配置模板缺失"
    fi
}

# 生成功能测试指南
generate_test_guide() {
    log_info "=== 📋 生成功能测试指南 ==="
    
    local test_file="logs/plugin-test-guide_$(date +%Y%m%d_%H%M%S).md"
    mkdir -p logs
    
    cat > "$test_file" << 'EOF'
# Strapi插件功能测试指南

## 🎯 插件功能测试清单

### 1. Email Designer v5 - 邮件模板设计器
**测试步骤：**
1. 重启Strapi服务器: `npm run dev`
2. 访问: http://localhost:1337/admin/plugins/email-designer
3. 创建新邮件模板
4. 测试拖拽组件功能
5. 保存并预览模板

**预期结果：**
- 能够访问邮件设计器界面
- 可以创建和编辑邮件模板
- 模板保存功能正常

### 2. SEO Plugin - SEO优化工具
**测试步骤：**
1. 访问文章管理页面
2. 创建或编辑文章
3. 检查SEO字段是否出现
4. 填写Meta标题和描述
5. 保存并查看效果

**预期结果：**
- SEO字段正常显示
- Meta标签自动生成
- 社交媒体预览功能可用

### 3. Slugify - SEO友好URL
**测试步骤：**
1. 创建新文章并输入标题
2. 检查slug字段是否自动填充
3. 创建分类和标签测试同样功能
4. 验证生成的URL格式

**预期结果：**
- 输入标题后自动生成slug
- slug格式符合SEO规范
- 支持中文转换为拼音

### 4. Transformer - API格式优化
**测试步骤：**
1. 访问API文档: http://localhost:1337/documentation
2. 测试文章列表API: `/api/articles`
3. 检查响应格式是否简化
4. 对比配置前后的差异

**预期结果：**
- API响应格式更简洁
- 移除了冗余的data/attributes包装
- 前端数据处理更方便

### 5. Import Export - 数据管理
**测试步骤：**
1. 在管理面板查找导入导出功能
2. 尝试导出现有文章数据
3. 测试导入功能（小批量数据）
4. 验证数据完整性

**预期结果：**
- 能够成功导出数据
- 导入功能正常工作
- 数据格式正确

### 6. 自定义站点地图
**测试步骤：**
1. 访问: http://localhost:1337/api/sitemap.xml
2. 检查XML格式是否正确
3. 验证包含的URL是否完整
4. 测试更新内容后地图是否更新

**预期结果：**
- 生成标准XML格式站点地图
- 包含所有已发布内容
- 动态更新功能正常

## 🔧 故障排除

### 常见问题解决方案

#### 插件无法启动
1. 检查配置文件语法: `npm run build`
2. 重启服务器: `npm run dev`
3. 查看控制台错误信息
4. 检查插件版本兼容性

#### SEO功能不显示
1. 确认插件配置正确
2. 清除浏览器缓存
3. 重新构建Admin面板
4. 检查内容类型配置

#### API格式未改变
1. 确认transformer插件配置
2. 重启服务器使配置生效
3. 清除API缓存
4. 检查插件版本

#### 站点地图无法访问
1. 检查路由配置是否正确
2. 确认控制器文件存在
3. 检查权限设置
4. 查看服务器日志

## 📊 性能监控指标

### 关键指标监控
- API响应时间改善
- SEO收录数量变化
- 邮件模板使用效果
- 内容管理效率提升

### 监控工具推荐
- Google Search Console (SEO效果)
- API性能监控工具
- 邮件发送统计
- 用户体验反馈

---

**测试完成后记录结果，如有问题请参考故障排除部分或联系开发团队。**
EOF

    log_success "测试指南已生成: $test_file"
}

# 显示完成总结
show_verification_summary() {
    echo ""
    echo "=========================================="
    log_success "🎉 插件验证完成！"
    echo "=========================================="
    echo ""
    
    log_info "🔗 重要访问地址："
    echo "  📧 Email Designer: http://localhost:1337/admin/plugins/email-designer"
    echo "  🗺️ 站点地图: http://localhost:1337/api/sitemap.xml"
    echo "  📖 API文档: http://localhost:1337/documentation"
    echo "  ⚙️ 管理面板: http://localhost:1337/admin"
    echo ""
    
    log_info "🚀 下一步建议："
    echo "  1. 重启Strapi服务器: npm run dev"
    echo "  2. 按照测试指南验证各插件功能"
    echo "  3. 配置插件的具体参数"
    echo "  4. 监控插件性能和效果"
    echo ""
    
    log_info "📚 参考文档："
    echo "  📄 完整指南: docs/开发指南/Strapi插件优化指南.md"
    echo "  🔧 配置模板: backend/config/plugins.recommended.ts"
    echo "  📋 测试指南: logs/plugin-test-guide_[timestamp].md"
}

# 主函数
main() {
    echo "=========================================="
    log_info "🔍 AI变现之路 - 插件安装验证"
    echo "=========================================="
    
    # 环境检查
    check_directory
    
    # 验证插件安装
    verify_plugin_installation
    echo ""
    
    # 验证插件配置
    verify_plugin_configuration
    echo ""
    
    # 验证自定义功能
    verify_custom_features
    echo ""
    
    # 生成测试指南
    generate_test_guide
    
    # 显示完成总结
    show_verification_summary
}

# 错误处理
trap 'log_error "脚本执行中断"; exit 1' INT TERM

# 执行主函数
main "$@"
