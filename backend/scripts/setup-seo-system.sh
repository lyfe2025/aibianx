#!/bin/bash

# SEO管理系统完整设置脚本
# 自动化设置包括：内容类型验证、权限配置、初始数据创建、字段描述配置

set -e  # 遇到错误立即退出

echo "🚀 开始设置SEO管理系统..."
echo "=================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查Strapi是否运行
check_strapi_status() {
    echo -e "${BLUE}📡 检查Strapi服务状态...${NC}"
    
    local max_retries=30
    local retry_count=0
    
    while [ $retry_count -lt $max_retries ]; do
        if curl -s http://localhost:1337/admin/init > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Strapi服务已启动${NC}"
            return 0
        fi
        
        echo "⏳ 等待Strapi启动... ($((retry_count + 1))/$max_retries)"
        sleep 2
        retry_count=$((retry_count + 1))
    done
    
    echo -e "${RED}❌ Strapi服务启动超时${NC}"
    return 1
}

# 验证内容类型是否存在
verify_content_types() {
    echo -e "${BLUE}🔍 验证内容类型...${NC}"
    
    # 检查site-config
    local site_config_status=$(curl -s -w "%{http_code}" http://localhost:1337/api/site-config -o /dev/null)
    if [ "$site_config_status" = "403" ]; then
        echo -e "${YELLOW}⚠️  SiteConfig内容类型已创建，需要配置权限${NC}"
    elif [ "$site_config_status" = "404" ]; then
        echo -e "${RED}❌ SiteConfig内容类型未找到，需要重新创建${NC}"
        return 1
    elif [ "$site_config_status" = "200" ]; then
        echo -e "${GREEN}✅ SiteConfig内容类型正常${NC}"
    else
        echo -e "${RED}❌ SiteConfig API状态异常: $site_config_status${NC}"
    fi
    
    # 检查seo-metrics
    local seo_metrics_status=$(curl -s -w "%{http_code}" http://localhost:1337/api/seo-metrics -o /dev/null)
    if [ "$seo_metrics_status" = "403" ]; then
        echo -e "${YELLOW}⚠️  SeoMetrics内容类型已创建，需要配置权限${NC}"
    elif [ "$seo_metrics_status" = "404" ]; then
        echo -e "${RED}❌ SeoMetrics内容类型未找到，需要重新创建${NC}"
        return 1
    elif [ "$seo_metrics_status" = "200" ]; then
        echo -e "${GREEN}✅ SeoMetrics内容类型正常${NC}"
    else
        echo -e "${RED}❌ SeoMetrics API状态异常: $seo_metrics_status${NC}"
    fi
}

# 检查数据库表是否创建
verify_database_tables() {
    echo -e "${BLUE}🗄️  验证数据库表...${NC}"
    
    # 检查site_configs表
    if psql postgresql://aibianx_dev:aibianx_password@localhost:5432/aibianx_dev -c "SELECT 1 FROM site_configs LIMIT 1;" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ site_configs表已创建${NC}"
    else
        echo -e "${RED}❌ site_configs表不存在${NC}"
    fi
    
    # 检查seo_metrics表
    if psql postgresql://aibianx_dev:aibianx_password@localhost:5432/aibianx_dev -c "SELECT 1 FROM seo_metrics LIMIT 1;" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ seo_metrics表已创建${NC}"
    else
        echo -e "${RED}❌ seo_metrics表不存在${NC}"
    fi
}

# 添加数据库表备注
add_database_comments() {
    echo -e "${BLUE}📝 添加数据库表备注...${NC}"
    
    if [ -f "scripts/add-table-comments.sql" ]; then
        if psql postgresql://aibianx_dev:aibianx_password@localhost:5432/aibianx_dev -f scripts/add-table-comments.sql > /dev/null 2>&1; then
            echo -e "${GREEN}✅ 数据库表备注添加成功${NC}"
        else
            echo -e "${YELLOW}⚠️  数据库表备注添加失败（可能表不存在）${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  表备注脚本不存在${NC}"
    fi
}

# 生成字段描述配置
setup_field_descriptions() {
    echo -e "${BLUE}🏷️  设置字段描述...${NC}"
    
    if [ -f "scripts/setup-field-descriptions.js" ]; then
        if node scripts/setup-field-descriptions.js; then
            echo -e "${GREEN}✅ 字段描述配置生成成功${NC}"
            
            # 尝试导入配置
            echo -e "${BLUE}📥 导入字段描述配置...${NC}"
            if npx strapi configuration:restore -f seo-field-descriptions.json > /dev/null 2>&1; then
                echo -e "${GREEN}✅ 字段描述配置导入成功${NC}"
            else
                echo -e "${YELLOW}⚠️  字段描述配置导入失败，可能需要手动导入${NC}"
            fi
        else
            echo -e "${YELLOW}⚠️  字段描述配置生成失败${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  字段描述配置脚本不存在${NC}"
    fi
}

# 创建初始数据
create_initial_data() {
    echo -e "${BLUE}📊 创建初始数据...${NC}"
    
    if [ -f "scripts/init-seo-config.js" ]; then
        if node scripts/init-seo-config.js; then
            echo -e "${GREEN}✅ 初始数据创建成功${NC}"
        else
            echo -e "${YELLOW}⚠️  初始数据创建失败，可能需要先配置API权限${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  初始数据脚本不存在${NC}"
    fi
}

# 显示手动配置指南
show_manual_steps() {
    echo -e "${BLUE}📋 手动配置步骤：${NC}"
    echo ""
    echo "如果自动设置遇到问题，请按以下步骤手动操作："
    echo ""
    echo "1. 📱 访问Strapi管理界面："
    echo "   http://localhost:1337/admin"
    echo ""
    echo "2. 🔧 在Content-Type Builder中验证内容类型："
    echo "   - Site Config (网站配置) - singleType"
    echo "   - Seo Metrics (SEO监控数据) - collectionType"
    echo ""
    echo "3. 🔐 配置API权限："
    echo "   Settings → Roles → Public → Permissions"
    echo "   勾选Site Config和Seo Metrics的find/findOne权限"
    echo ""
    echo "4. 📝 创建初始数据："
    echo "   Content Manager → Site Config → 添加网站基本信息"
    echo "   Content Manager → Seo Metrics → 添加示例监控数据"
    echo ""
    echo "5. 🧪 测试API："
    echo "   http://localhost:3000/seo-test"
    echo ""
}

# 主执行流程
main() {
    echo "🎯 执行环境检查..."
    
    # 检查必要的命令
    command -v curl >/dev/null 2>&1 || { echo -e "${RED}❌ curl未安装${NC}"; exit 1; }
    command -v psql >/dev/null 2>&1 || { echo -e "${RED}❌ psql未安装${NC}"; exit 1; }
    command -v node >/dev/null 2>&1 || { echo -e "${RED}❌ node未安装${NC}"; exit 1; }
    
    # 步骤1：检查Strapi状态
    if ! check_strapi_status; then
        echo -e "${RED}❌ 请先启动Strapi: npm run develop${NC}"
        exit 1
    fi
    
    # 步骤2：验证内容类型
    echo ""
    verify_content_types
    
    # 步骤3：验证数据库表
    echo ""
    verify_database_tables
    
    # 步骤4：添加数据库备注
    echo ""
    add_database_comments
    
    # 步骤5：设置字段描述
    echo ""
    setup_field_descriptions
    
    # 步骤6：创建初始数据
    echo ""
    create_initial_data
    
    # 显示完成信息
    echo ""
    echo "=================================="
    echo -e "${GREEN}🎉 SEO管理系统设置完成！${NC}"
    echo ""
    echo -e "${BLUE}🌐 访问地址：${NC}"
    echo "- 前端测试页面: http://localhost:3000/seo-test"
    echo "- Strapi管理后台: http://localhost:1337/admin"
    echo ""
    echo -e "${BLUE}📊 数据库表：${NC}"
    echo "- site_configs (网站配置表)"
    echo "- seo_metrics (SEO监控数据表)"
    echo ""
    
    # 显示手动步骤（以防自动化有问题）
    echo ""
    show_manual_steps
}

# 执行主函数
main "$@"