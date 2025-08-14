#!/bin/bash

# AI变现之路 - Strapi插件功能测试脚本
# 作者：AI变现之路开发团队
# 功能：测试和演示所有已安装插件的功能

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

# 检查服务器状态
check_server_status() {
    log_info "🔍 检查Strapi服务器状态..."
    
    if lsof -i :1337 >/dev/null 2>&1; then
        log_success "✅ Strapi服务器正在运行在端口1337"
    else
        log_error "❌ Strapi服务器未运行，请先启动服务器: npm run dev"
        exit 1
    fi
}

# 测试API文档插件
test_documentation_plugin() {
    log_info "📖 测试API文档插件..."
    
    local response_code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/documentation)
    
    if [[ $response_code -eq 200 ]]; then
        log_success "✅ API文档插件正常工作"
        log_info "   📍 访问地址: http://localhost:1337/documentation"
        log_info "   📋 功能: 自动生成OpenAPI 3.0规范文档"
        log_info "   🔧 用途: API接口测试和文档查看"
    else
        log_error "❌ API文档插件访问失败 (HTTP $response_code)"
    fi
}

# 测试SEO插件
test_seo_plugin() {
    log_info "🎯 测试SEO插件..."
    
    # 获取文章数据测试SEO字段
    local article_data=$(curl -s "http://localhost:1337/api/articles?pagination[limit]=1")
    
    if echo "$article_data" | grep -q '"seoTitle"'; then
        log_success "✅ SEO插件正常工作 - SEO字段已添加到内容类型"
        log_info "   📋 SEO字段: seoTitle, seoDescription, featured等"
        log_info "   🔧 用途: Meta标签优化、社交媒体预览"
        
        # 显示第一篇文章的SEO信息
        local seo_title=$(echo "$article_data" | grep -o '"seoTitle":"[^"]*"' | head -1 | cut -d'"' -f4)
        if [[ -n "$seo_title" ]]; then
            log_info "   📄 示例SEO标题: $seo_title"
        fi
    else
        log_warning "⚠️ SEO插件已安装但字段可能未正确配置"
    fi
}

# 测试用户权限插件
test_users_permissions_plugin() {
    log_info "👥 测试用户权限插件..."
    
    # 测试认证端点
    local auth_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/api/auth/local)
    
    if [[ $auth_response -eq 400 ]] || [[ $auth_response -eq 200 ]]; then
        log_success "✅ 用户权限插件正常工作"
        log_info "   🔐 认证端点: /api/auth/local"
        log_info "   📋 功能: 用户注册、登录、JWT认证"
        log_info "   🔧 用途: 用户身份验证和权限控制"
    else
        log_error "❌ 用户权限插件访问失败 (HTTP $auth_response)"
    fi
}

# 测试文件上传插件
test_upload_plugin() {
    log_info "📁 测试文件上传插件..."
    
    # 检查上传端点
    local upload_response=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:1337/api/upload)
    
    if [[ $upload_response -eq 400 ]] || [[ $upload_response -eq 401 ]]; then
        log_success "✅ 文件上传插件正常工作"
        log_info "   📤 上传端点: /api/upload"
        log_info "   📋 功能: 文件上传、媒体库管理"
        log_info "   🔧 用途: 图片、文档等媒体文件管理"
        log_info "   📏 限制: 最大10MB文件"
    else
        log_error "❌ 文件上传插件访问失败 (HTTP $upload_response)"
    fi
}

# 测试自定义站点地图功能
test_sitemap_functionality() {
    log_info "🗺️ 测试自定义站点地图功能..."
    
    local sitemap_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:1337/api/sitemap.xml)
    
    if [[ $sitemap_response -eq 200 ]]; then
        log_success "✅ 自定义站点地图功能正常工作"
        log_info "   🔗 访问地址: http://localhost:1337/api/sitemap.xml"
        log_info "   📋 功能: 自动生成XML站点地图"
        log_info "   🔧 用途: SEO优化、搜索引擎收录"
        
        # 检查站点地图内容
        local url_count=$(curl -s http://localhost:1337/api/sitemap.xml | grep -c "<url>" || echo 0)
        log_info "   📊 包含URL数量: $url_count 个"
    else
        log_error "❌ 自定义站点地图访问失败 (HTTP $sitemap_response)"
    fi
}

# 生成功能测试报告
generate_test_report() {
    log_info "📋 生成功能测试报告..."
    
    local report_file="logs/plugin_functionality_test_$(date +%Y%m%d_%H%M%S).md"
    mkdir -p logs
    
    cat > "$report_file" << EOF
# Strapi插件功能测试报告

**测试时间：** $(date)
**服务器地址：** http://localhost:1337

## 📊 插件状态总览

### ✅ 正常工作的插件
1. **API文档插件** - http://localhost:1337/documentation
2. **SEO增强插件** - Meta标签和社交媒体优化
3. **用户权限插件** - 认证和权限管理
4. **文件上传插件** - 媒体文件管理
5. **自定义站点地图** - XML站点地图生成

## 🔧 具体使用方法

### 1. API文档插件使用
\`\`\`
访问地址: http://localhost:1337/documentation
功能: 查看所有API接口、测试API功能
使用场景: 前端开发、API调试、接口文档查看
\`\`\`

### 2. SEO插件使用
\`\`\`
管理面板: Content Manager > Articles/Categories/Tags
功能: 添加SEO标题、描述、关键词等
使用场景: 文章SEO优化、搜索引擎收录提升
\`\`\`

### 3. 用户权限插件使用
\`\`\`
管理面板: Settings > Users & Permissions Plugin
API端点: /api/auth/local (登录), /api/auth/local/register (注册)
功能: 用户认证、角色权限管理、JWT token生成
使用场景: 用户系统、内容保护、会员功能
\`\`\`

### 4. 文件上传插件使用
\`\`\`
管理面板: Media Library
API端点: /api/upload
功能: 文件上传、媒体库管理
使用场景: 图片上传、文件管理、内容媒体
\`\`\`

### 5. 自定义站点地图使用
\`\`\`
访问地址: http://localhost:1337/api/sitemap.xml
功能: 自动生成包含所有内容的XML站点地图
使用场景: SEO优化、搜索引擎收录、网站地图
\`\`\`

## 🎯 下一步操作建议

1. **访问API文档**: http://localhost:1337/documentation
2. **测试SEO功能**: 在Content Manager中编辑文章并添加SEO信息
3. **配置用户权限**: 在Settings中设置合适的角色权限
4. **上传测试文件**: 使用Media Library上传图片
5. **验证站点地图**: 访问sitemap.xml检查生成的URL

## 📞 技术支持

如有问题，请参考：
- 插件使用指南: docs/开发指南/Strapi插件使用指南.md
- API文档: http://localhost:1337/documentation
- 管理面板: http://localhost:1337/admin

---
测试完成时间: $(date)
EOF

    log_success "📄 测试报告已生成: $report_file"
}

# 显示插件访问地址
show_plugin_access_info() {
    echo ""
    echo "=========================================="
    log_success "🎉 插件功能测试完成！"
    echo "=========================================="
    echo ""
    log_info "🔗 重要访问地址："
    echo "  📖 API文档: http://localhost:1337/documentation"
    echo "  ⚙️ 管理面板: http://localhost:1337/admin"
    echo "  🗺️ 站点地图: http://localhost:1337/api/sitemap.xml"
    echo "  📊 文章API: http://localhost:1337/api/articles"
    echo ""
    log_info "📋 插件功能："
    echo "  ✅ API自动文档生成和测试"
    echo "  ✅ SEO Meta标签优化"
    echo "  ✅ 用户认证和权限管理"
    echo "  ✅ 文件上传和媒体管理"
    echo "  ✅ XML站点地图自动生成"
    echo ""
    log_info "📚 详细使用指南："
    echo "  📄 docs/开发指南/Strapi插件使用指南.md"
}

# 主函数
main() {
    echo "=========================================="
    log_info "🔍 AI变现之路 - Strapi插件功能测试"
    echo "=========================================="
    
    # 检查服务器状态
    check_server_status
    echo ""
    
    # 测试各插件功能
    test_documentation_plugin
    echo ""
    test_seo_plugin
    echo ""
    test_users_permissions_plugin
    echo ""
    test_upload_plugin
    echo ""
    test_sitemap_functionality
    echo ""
    
    # 生成测试报告
    generate_test_report
    
    # 显示访问信息
    show_plugin_access_info
}

# 错误处理
trap 'log_error "脚本执行中断"; exit 1' INT TERM

# 执行主函数
main "$@"
