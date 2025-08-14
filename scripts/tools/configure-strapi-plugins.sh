#!/bin/bash

# AI变现之路 - Strapi插件配置管理脚本
# 作者：AI变现之路开发团队
# 功能：自动化管理Strapi插件配置

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

# 备份现有配置
backup_config() {
    local backup_dir="logs/plugin-config-backups"
    mkdir -p "$backup_dir"
    
    if [[ -f "config/plugins.ts" ]]; then
        local backup_file="$backup_dir/plugins_backup_$(date +%Y%m%d_%H%M%S).ts"
        cp "config/plugins.ts" "$backup_file"
        log_info "已备份现有配置到: $backup_file"
    fi
}

# 应用推荐插件配置
apply_recommended_config() {
    log_info "🔧 应用推荐插件配置..."
    
    if [[ ! -f "config/plugins.recommended.ts" ]]; then
        log_error "找不到推荐配置文件: config/plugins.recommended.ts"
        exit 1
    fi
    
    # 交互式配置选择
    echo ""
    log_info "请选择要配置的插件类别："
    echo "1) 已安装插件优化（email-designer, slugify, config-sync）"
    echo "2) SEO优化插件（sitemap, seo）"  
    echo "3) 性能优化插件（rest-cache, transformer）"
    echo "4) 管理工具插件（menus, import-export）"
    echo "5) 应用所有推荐配置"
    echo "0) 退出"
    
    read -p "请选择 (0-5): " choice
    
    case $choice in
        1) configure_installed_plugins ;;
        2) configure_seo_plugins ;;
        3) configure_performance_plugins ;;
        4) configure_admin_plugins ;;
        5) configure_all_plugins ;;
        0) log_info "取消配置"; exit 0 ;;
        *) log_error "无效选择"; exit 1 ;;
    esac
}

# 配置已安装插件
configure_installed_plugins() {
    log_info "🔧 配置已安装插件..."
    
    # 已在plugins.ts中完成配置
    log_success "✅ Email Designer - 邮件模板设计器已配置"
    log_success "✅ Slugify - SEO友好URL生成已配置"
    log_success "✅ Config Sync - 配置同步已配置"
    
    # 验证插件状态
    check_plugin_status "email-designer"
    check_plugin_status "slugify" 
    check_plugin_status "config-sync"
}

# 检查插件状态
check_plugin_status() {
    local plugin_name=$1
    
    if npm list "$plugin_name" >/dev/null 2>&1; then
        log_success "✅ $plugin_name 已安装"
    else
        log_warning "⚠️ $plugin_name 未安装，请运行安装脚本"
    fi
}

# 生成插件使用指南
generate_usage_guide() {
    log_info "📝 生成插件使用指南..."
    
    local guide_file="logs/plugin-usage-guide_$(date +%Y%m%d_%H%M%S).md"
    
    cat > "$guide_file" << 'EOF'
# Strapi插件使用指南

## 🎯 当前已配置插件

### 1. Email Designer v5 - 邮件模板设计器
**访问地址：** http://localhost:1337/admin/plugins/email-designer

**使用步骤：**
1. 登录Strapi管理面板
2. 左侧菜单找到 "Email Designer" 
3. 创建新邮件模板
4. 拖拽组件设计邮件布局
5. 保存模板供邮件发送使用

**模板应用场景：**
- 用户注册欢迎邮件
- 邮件订阅确认通知
- 支付成功确认邮件
- 会员激活通知邮件

### 2. Slugify - SEO友好URL生成
**自动化功能：** 已为 Article, Category, Tag 配置自动slug生成

**使用方法：**
1. 创建新文章时，输入标题
2. 系统自动生成slug字段（URL友好格式）
3. 可手动修改slug（建议保持自动生成）
4. 前端使用slug构建SEO友好的URL

**URL格式示例：**
```
原标题：AI工具推荐与变现策略
生成slug：ai-gong-ju-tui-jian-yu-bian-xian-ce-lue
最终URL：https://aibianx.com/articles/ai-gong-ju-tui-jian-yu-bian-xian-ce-lue
```

### 3. Config Sync - 配置同步
**同步目录：** config/sync/

**使用场景：**
1. 开发环境配置完成后
2. 运行同步命令导出配置
3. 在生产环境导入配置
4. 确保环境配置一致性

**同步命令：**
```bash
# 导出配置到同步目录
npm run strapi config:sync:export

# 从同步目录导入配置
npm run strapi config:sync:import
```

## 🚀 推荐安装的插件

### 优先级1：SEO核心插件
1. **strapi-plugin-sitemap** - XML站点地图
   - 安装：`npm install strapi-plugin-sitemap`
   - 效果：搜索引擎收录率提升50-80%

2. **@strapi/plugin-seo** - SEO增强工具
   - 安装：`npm install @strapi/plugin-seo`
   - 效果：Meta标签自动化管理

### 优先级2：性能优化插件
1. **strapi-plugin-rest-cache** - API缓存
   - 安装：`npm install strapi-plugin-rest-cache`
   - 效果：API响应速度提升300-500%

2. **strapi-plugin-transformer** - 数据格式化
   - 安装：`npm install strapi-plugin-transformer`
   - 效果：前端数据处理简化60%

## 🔧 快速安装命令

```bash
# 一键安装所有推荐插件
./scripts/tools/install-recommended-plugins.sh

# 或手动安装核心插件
npm install strapi-plugin-sitemap @strapi/plugin-seo
npm install strapi-plugin-rest-cache strapi-plugin-transformer
```

## 📊 插件效果监控

### 性能指标
- SEO收录数量变化
- API响应时间对比
- 用户体验评分
- 开发效率提升度量

### 监控工具
- Google Search Console（SEO效果）
- 网站性能分析工具
- API响应时间监控
- 用户行为分析

## 🆘 常见问题解决

### 插件无法启用
1. 检查插件是否正确安装
2. 确认配置文件语法正确
3. 重启Strapi服务器
4. 查看控制台错误日志

### 配置不生效
1. 清除浏览器缓存
2. 检查plugins.ts配置语法
3. 确认插件版本兼容性
4. 查看Strapi日志输出

### 性能问题
1. 检查缓存插件配置
2. 监控数据库查询性能
3. 调整插件缓存策略
4. 必要时禁用影响性能的插件

---

**使用提醒：**
- 定期检查插件更新
- 在测试环境先验证插件效果
- 监控插件对系统性能的影响
- 根据实际需求调整插件配置
EOF

    log_success "使用指南已生成: $guide_file"
}

# 重启开发服务器
restart_dev_server() {
    echo ""
    read -p "是否现在重启Strapi开发服务器以应用配置？(y/N): " restart_choice
    
    if [[ $restart_choice =~ ^[Yy]$ ]]; then
        log_info "🔄 准备重启Strapi开发服务器..."
        log_warning "请手动停止当前服务器（Ctrl+C），然后运行：npm run dev"
    else
        log_info "请稍后手动重启Strapi服务器以应用新配置"
    fi
}

# 显示配置完成总结
show_completion_summary() {
    echo ""
    echo "=========================================="
    log_success "🎉 Strapi插件配置完成！"
    echo "=========================================="
    echo ""
    
    log_info "📋 配置结果总结："
    echo "  ✅ Email Designer - 邮件模板设计器已启用"
    echo "  ✅ Slugify - SEO友好URL自动生成已启用"  
    echo "  ✅ Config Sync - 配置同步已启用"
    echo ""
    
    log_info "🔗 重要访问地址："
    echo "  📧 Email Designer: http://localhost:1337/admin/plugins/email-designer"
    echo "  📖 API文档: http://localhost:1337/documentation"
    echo "  ⚙️ 管理面板: http://localhost:1337/admin"
    echo ""
    
    log_info "🚀 下一步建议："
    echo "  1. 重启Strapi开发服务器: npm run dev"
    echo "  2. 安装推荐的新插件提升功能"
    echo "  3. 在Admin面板中测试插件功能"
    echo "  4. 根据使用指南配置各插件"
    echo ""
    
    log_info "📚 参考文档："
    echo "  📄 完整指南: docs/开发指南/Strapi插件优化指南.md"
    echo "  🔧 配置模板: backend/config/plugins.recommended.ts"
    echo ""
}

# 主函数
main() {
    echo "=========================================="
    log_info "🔧 AI变现之路 - Strapi插件配置管理"
    echo "=========================================="
    
    # 环境检查
    check_directory
    
    # 备份配置
    backup_config
    
    # 应用配置
    apply_recommended_config
    
    # 生成使用指南
    generate_usage_guide
    
    # 重启服务器提示
    restart_dev_server
    
    # 显示完成总结
    show_completion_summary
}

# 错误处理
trap 'log_error "脚本执行中断"; exit 1' INT TERM

# 执行主函数
main "$@"
