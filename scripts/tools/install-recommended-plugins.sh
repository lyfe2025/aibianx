#!/bin/bash

# AI变现之路 - Strapi推荐插件自动安装脚本
# 作者：AI变现之路开发团队
# 功能：一键安装项目推荐的Strapi插件

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
if [[ ! -f "package.json" ]] || [[ ! -d "src/api" ]]; then
    log_error "请在Strapi后端项目根目录运行此脚本"
    exit 1
fi

log_info "🚀 开始安装AI变现之路推荐的Strapi插件..."

# 创建插件安装记录目录
mkdir -p logs/plugin-installation

# 插件列表（按优先级排序）
declare -A PLUGINS=(
    ["strapi-plugin-sitemap"]="XML站点地图自动生成 - 提升SEO收录效果"
    ["strapi-plugin-menus"]="可视化菜单管理 - 动态导航菜单系统" 
    ["@strapi/plugin-seo"]="SEO增强工具 - Meta标签和社交媒体预览"
    ["strapi-plugin-transformer"]="数据转换处理器 - API响应格式统一"
    ["strapi-plugin-rest-cache"]="API响应缓存 - 提升网站性能"
    ["strapi-plugin-import-export-entries"]="数据导入导出增强 - 批量内容管理"
)

# 高级插件（可选安装）
declare -A ADVANCED_PLUGINS=(
    ["strapi-plugin-comments"]="评论系统 - 文章互动功能"
    ["strapi-plugin-react-icons"]="图标库集成 - 丰富的图标选择"
    ["strapi-plugin-publisher"]="发布调度器 - 定时发布内容"
)

# 安装插件函数
install_plugin() {
    local plugin_name=$1
    local description=$2
    local log_file="logs/plugin-installation/${plugin_name//\//_}_$(date +%Y%m%d_%H%M%S).log"
    
    log_info "📦 安装插件: ${PURPLE}$plugin_name${NC}"
    log_info "   功能描述: $description"
    
    # 检查插件是否已安装
    if npm list "$plugin_name" >/dev/null 2>&1; then
        log_warning "插件 $plugin_name 已经安装，跳过..."
        return 0
    fi
    
    # 安装插件
    if npm install "$plugin_name" >> "$log_file" 2>&1; then
        log_success "✅ $plugin_name 安装成功"
        echo "$(date): $plugin_name 安装成功" >> "logs/plugin-installation/installation_history.log"
        return 0
    else
        log_error "❌ $plugin_name 安装失败，查看日志: $log_file"
        echo "$(date): $plugin_name 安装失败" >> "logs/plugin-installation/installation_history.log"
        return 1
    fi
}

# 主安装流程
main_installation() {
    log_info "=== 🎯 核心推荐插件安装 ==="
    
    local success_count=0
    local total_count=${#PLUGINS[@]}
    
    for plugin in "${!PLUGINS[@]}"; do
        if install_plugin "$plugin" "${PLUGINS[$plugin]}"; then
            ((success_count++))
        fi
        echo "" # 空行分隔
    done
    
    log_info "=== 📊 安装结果统计 ==="
    log_success "成功安装: $success_count/$total_count 个插件"
    
    if [[ $success_count -eq $total_count ]]; then
        log_success "🎉 所有推荐插件安装完成！"
    else
        log_warning "部分插件安装失败，请查看日志文件"
    fi
}

# 高级插件安装（可选）
advanced_installation() {
    echo ""
    read -p "是否安装高级插件？(y/N): " install_advanced
    
    if [[ $install_advanced =~ ^[Yy]$ ]]; then
        log_info "=== 🔧 高级插件安装 ==="
        
        for plugin in "${!ADVANCED_PLUGINS[@]}"; do
            echo ""
            log_info "插件: ${PURPLE}$plugin${NC}"
            log_info "功能: ${ADVANCED_PLUGINS[$plugin]}"
            read -p "是否安装此插件？(y/N): " install_this
            
            if [[ $install_this =~ ^[Yy]$ ]]; then
                install_plugin "$plugin" "${ADVANCED_PLUGINS[$plugin]}"
            else
                log_info "跳过 $plugin"
            fi
        done
    fi
}

# 生成插件配置建议
generate_config_suggestions() {
    log_info "=== 📝 生成插件配置建议 ==="
    
    local config_file="logs/plugin-installation/plugin_config_suggestions_$(date +%Y%m%d_%H%M%S).md"
    
    cat > "$config_file" << 'EOF'
# Strapi插件配置建议

## 必需配置的插件

### 1. strapi-plugin-sitemap
在 `config/plugins.ts` 中添加：
```typescript
sitemap: {
  enabled: true,
  config: {
    autoGenerate: true,
    allowedFields: ['id', 'title', 'slug', 'updatedAt'],
    contentTypes: {
      article: {
        priority: 0.8,
        changefreq: 'weekly'
      },
      category: {
        priority: 0.6,
        changefreq: 'monthly'
      }
    }
  }
}
```

### 2. strapi-plugin-menus  
在 `config/plugins.ts` 中添加：
```typescript
menus: {
  enabled: true,
  config: {
    maxDepth: 3
  }
}
```

### 3. @strapi/plugin-seo
在 `config/plugins.ts` 中添加：
```typescript
seo: {
  enabled: true,
  config: {
    contentTypes: ['article', 'category']
  }
}
```

## 下一步操作
1. 重启Strapi服务器
2. 在Admin面板中配置各插件
3. 测试插件功能是否正常
EOF

    log_success "配置建议已生成: $config_file"
}

# 主执行流程
main() {
    # 创建必要目录
    mkdir -p logs/plugin-installation
    
    # 显示项目信息
    log_info "🏷️  项目名称: AI变现之路"
    log_info "🔧  Strapi版本: $(npm list @strapi/strapi --depth=0 2>/dev/null | grep @strapi/strapi | cut -d@ -f3 || echo '未知')"
    echo ""
    
    # 主安装流程
    main_installation
    
    # 高级插件安装（可选）
    advanced_installation
    
    # 生成配置建议
    generate_config_suggestions
    
    echo ""
    log_info "=== 🎯 下一步操作建议 ==="
    log_info "1. 重启Strapi开发服务器: npm run dev"
    log_info "2. 访问Admin面板配置新安装的插件"
    log_info "3. 根据生成的配置建议更新 config/plugins.ts"
    log_info "4. 测试各插件功能是否正常工作"
    
    log_success "🎉 插件安装脚本执行完成！"
}

# 错误处理
trap 'log_error "脚本执行中断"; exit 1' INT TERM

# 执行主函数
main "$@"
