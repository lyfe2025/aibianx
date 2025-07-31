#!/bin/bash

# 加载统一配置
source "$(dirname "$0")/./load-config.sh"
load_config
# Strapi 5.x 通用字段描述配置工具
# 支持任何内容类型的字段描述配置
# 使用方法: ./configure-any-field-descriptions.sh [content-type] [field-descriptions-file]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Strapi 5.x 通用字段描述配置工具${NC}"
echo "=========================================="

# 检查参数
CONTENT_TYPE=${1:-""}
DESCRIPTIONS_FILE=${2:-""}

if [ -z "$CONTENT_TYPE" ]; then
    echo -e "${YELLOW}📋 可用的内容类型:${NC}"
    echo "  article       - 文章管理"
    echo "  author        - 作者管理"
    echo "  category      - 分类管理"
    echo "  tag           - 标签管理"
    echo "  site-config   - 网站配置"
    echo "  seo-metrics   - SEO监控"
    echo ""
    echo -e "${YELLOW}使用方法:${NC}"
    echo "  $0 article"
    echo "  $0 author"
    echo "  $0 category custom-descriptions.json"
    echo ""
    exit 1
fi

echo -e "${BLUE}📌 配置内容类型: ${CONTENT_TYPE}${NC}"

# 定义各种内容类型的字段描述
get_field_descriptions() {
    local content_type=$1
    
    case $content_type in
        "article")
            cat << 'EOF'
{
  "title": "文章标题：必填字段，1-255字符，用于显示和SEO优化",
  "slug": "URL友好标识符：基于标题自动生成的唯一标识，用于友好URL",
  "content": "文章正文内容：富文本格式，必填字段，支持HTML标记",
  "excerpt": "文章摘要简介：最长500字符，用于列表页面和搜索结果展示",
  "featuredImage": "文章特色图片：封面图，仅支持图片格式，用于文章展示",
  "publishedAt": "文章发布时间：为空表示草稿状态，有值表示已发布",
  "viewCount": "文章浏览次数：默认为0，系统自动统计的文章访问量",
  "readingTime": "预估阅读时长：单位为分钟，默认5分钟，用于用户体验优化",
  "seoTitle": "SEO标题：最长60字符，用于搜索引擎结果页面显示",
  "seoDescription": "SEO描述：最长160字符，用于搜索引擎结果页面的摘要显示",
  "featured": "是否置顶推荐：用于首页精选推荐，置顶显示优质内容，提升文章曝光度",
  "isPremium": "是否会员专享：标记为会员专享的文章需要会员权限才能查看完整内容，用于付费内容管理",
  "tags": "文章标签：多对多关系，可选择多个标签进行文章分类",
  "category": "文章分类：多对一关系，每篇文章属于一个分类",
  "author": "文章作者：多对一关系，每篇文章有一个作者"
}
EOF
            ;;
        "author")
            cat << 'EOF'
{
  "name": "作者姓名：必填，最长100字符，显示在文章署名处",
  "slug": "作者URL标识符：基于姓名自动生成，用于作者页面URL",
  "bio": "作者个人简介：最长500字符，介绍作者背景和专业领域",
  "avatar": "作者头像图片：仅支持图片格式，用于作者身份展示",
  "email": "作者邮箱地址：用于联系和通知，可选字段",
  "website": "作者个人网站：可选，外部链接，展示作者更多信息",
  "twitter": "Twitter账号：社交媒体链接，增强作者可信度",
  "github": "GitHub账号：技术作者必填，展示技术能力",
  "linkedin": "LinkedIn账号：职业社交网络链接",
  "position": "作者职位：当前工作职位，增强专业性",
  "company": "所在公司：当前工作单位，建立权威性",
  "featured": "是否特色作者：用于作者推荐和重点展示",
  "articles": "作者文章列表：一对多关系，显示该作者的所有文章"
}
EOF
            ;;
        "category")
            cat << 'EOF'
{
  "name": "分类名称：必填，唯一，最长50字符，用于文章分类",
  "slug": "分类URL标识符：基于分类名自动生成，用于分类页面URL",
  "description": "分类描述说明：最长200字符，SEO友好，说明分类用途",
  "icon": "分类图标：图标名称或路径，用于界面展示",
  "color": "分类主题颜色：十六进制格式（如#8B5CF6），用于UI区分",
  "featuredImage": "分类封面图片：仅支持图片格式，用于分类页面展示",
  "sortOrder": "分类排序权重：数字越小越靠前，默认为0",
  "featured": "是否特色分类：用于首页分类推荐和重点展示",
  "seoTitle": "SEO标题：分类页面专用SEO标题，最长60字符",
  "seoDescription": "SEO描述：分类页面专用SEO描述，最长160字符",
  "articles": "分类文章列表：一对多关系，显示该分类下的所有文章"
}
EOF
            ;;
        "tag")
            cat << 'EOF'
{
  "name": "标签名称：必填，唯一，最长50字符，用于文章标记",
  "slug": "标签URL标识符：基于标签名自动生成，用于标签页面URL",
  "description": "标签描述说明：最长200字符，说明标签的具体用途",
  "color": "标签颜色：十六进制格式（如#3B82F6），用于界面标签显示",
  "icon": "标签图标：图标名称或路径，增强标签的视觉识别",
  "featured": "是否特色标签：用于推荐标签显示和热门标签推荐",
  "sortOrder": "标签排序权重：数字越小越靠前，默认为0",
  "articles": "标签文章列表：多对多关系，显示使用该标签的所有文章"
}
EOF
            ;;
        "site-config")
            cat << 'EOF'
{
  "siteName": "网站名称：显示在浏览器标题栏、搜索结果和社交分享中",
  "siteUrl": "网站主域名：完整的网站URL，用于SEO和社交分享",
  "siteDescription": "网站描述：简要介绍网站用途，用于搜索引擎和社交媒体",
  "seoTitle": "默认SEO标题：页面未设置标题时的后备标题",
  "seoDescription": "默认SEO描述：页面未设置描述时的后备描述",
  "googleSiteVerification": "Google站点验证码：用于Google Search Console验证",
  "bingSiteVerification": "Bing站点验证码：用于Bing网站管理工具验证",
  "baiduSiteVerification": "百度站点验证码：用于百度搜索资源平台验证",
  "googleAnalyticsId": "Google Analytics ID：用于网站流量统计和分析",
  "baiduAnalyticsId": "百度统计ID：用于国内用户访问统计分析"
}
EOF
            ;;
        "seo-metrics")
            cat << 'EOF'
{
  "date": "统计日期：记录当天的SEO数据，格式为YYYY-MM-DD",
  "googleIndexed": "Google收录数：Google搜索引擎收录的页面数量",
  "bingIndexed": "Bing收录数：Bing搜索引擎收录的页面数量",
  "baiduIndexed": "百度收录数：百度搜索引擎收录的页面数量",
  "totalBacklinks": "外链总数：指向网站的外部链接数量",
  "domainRating": "域名权重：第三方SEO工具评估的域名权威度",
  "organicTraffic": "自然流量：来自搜索引擎的访问量",
  "avgSessionDuration": "平均会话时长：用户在网站的平均停留时间（秒）",
  "bounceRate": "跳出率：用户只浏览一个页面就离开的比例（0-100）",
  "topKeywords": "热门关键词：JSON格式存储排名靠前的关键词列表",
  "coreWebVitals": "核心网页指标：JSON格式存储LCP、FID、CLS等性能数据"
}
EOF
            ;;
        *)
            echo -e "${RED}❌ 未知的内容类型: $content_type${NC}"
            echo "支持的类型: article, author, category, tag, site-config, seo-metrics"
            return 1
            ;;
    esac
}

# 生成SQL更新脚本
generate_sql_script() {
    local content_type=$1
    local sql_file="update-${content_type}-descriptions.sql"
    
    echo -e "${YELLOW}📝 生成${content_type}的SQL更新脚本...${NC}"
    
    cat > "$sql_file" << EOF
-- 自动生成的${content_type}字段描述配置脚本
-- 生成时间: $(date)
-- 内容类型: api::${content_type}.${content_type}

EOF

    # 根据内容类型生成对应的SQL语句
    case $content_type in
        "article")
            cat >> "$sql_file" << 'EOF'
-- 更新Article字段描述
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,title,edit,description}', '"文章标题：必填字段，1-255字符，用于显示和SEO优化"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'title';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,slug,edit,description}', '"URL友好标识符：基于标题自动生成的唯一标识，用于友好URL"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'slug';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,content,edit,description}', '"文章正文内容：富文本格式，必填字段，支持HTML标记"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'content';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,excerpt,edit,description}', '"文章摘要简介：最长500字符，用于列表页面和搜索结果展示"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'excerpt';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,featuredImage,edit,description}', '"文章特色图片：封面图，仅支持图片格式，用于文章展示"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'featuredImage';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,viewCount,edit,description}', '"文章浏览次数：默认为0，系统自动统计的文章访问量"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'viewCount';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,readingTime,edit,description}', '"预估阅读时长：单位为分钟，默认5分钟，用于用户体验优化"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'readingTime';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,seoTitle,edit,description}', '"SEO标题：最长60字符，用于搜索引擎结果页面显示"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'seoTitle';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,seoDescription,edit,description}', '"SEO描述：最长160字符，用于搜索引擎结果页面的摘要显示"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'seoDescription';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,featured,edit,description}', '"是否置顶推荐：用于首页精选推荐，置顶显示优质内容，提升文章曝光度"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'featured';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,isPremium,edit,description}', '"是否会员专享：标记为会员专享的文章需要会员权限才能查看完整内容，用于付费内容管理"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'isPremium';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,tags,edit,description}', '"文章标签：多对多关系，可选择多个标签进行文章分类"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'tags';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,category,edit,description}', '"文章分类：多对一关系，每篇文章属于一个分类"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'category';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,author,edit,description}', '"文章作者：多对一关系，每篇文章有一个作者"') WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article' AND value::jsonb->'metadatas' ? 'author';
EOF
            ;;
        "author")
            cat >> "$sql_file" << 'EOF'
-- 更新Author字段描述
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,name,edit,description}', '"作者姓名：必填，最长100字符，显示在文章署名处"') WHERE key = 'plugin_content_manager_configuration_content_types::api::author.author' AND value::jsonb->'metadatas' ? 'name';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,slug,edit,description}', '"作者URL标识符：基于姓名自动生成，用于作者页面URL"') WHERE key = 'plugin_content_manager_configuration_content_types::api::author.author' AND value::jsonb->'metadatas' ? 'slug';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,bio,edit,description}', '"作者个人简介：最长500字符，介绍作者背景和专业领域"') WHERE key = 'plugin_content_manager_configuration_content_types::api::author.author' AND value::jsonb->'metadatas' ? 'bio';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,avatar,edit,description}', '"作者头像图片：仅支持图片格式，用于作者身份展示"') WHERE key = 'plugin_content_manager_configuration_content_types::api::author.author' AND value::jsonb->'metadatas' ? 'avatar';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,email,edit,description}', '"作者邮箱地址：用于联系和通知，可选字段"') WHERE key = 'plugin_content_manager_configuration_content_types::api::author.author' AND value::jsonb->'metadatas' ? 'email';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,website,edit,description}', '"作者个人网站：可选，外部链接，展示作者更多信息"') WHERE key = 'plugin_content_manager_configuration_content_types::api::author.author' AND value::jsonb->'metadatas' ? 'website';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,featured,edit,description}', '"是否特色作者：用于作者推荐和重点展示"') WHERE key = 'plugin_content_manager_configuration_content_types::api::author.author' AND value::jsonb->'metadatas' ? 'featured';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,articles,edit,description}', '"作者文章列表：一对多关系，显示该作者的所有文章"') WHERE key = 'plugin_content_manager_configuration_content_types::api::author.author' AND value::jsonb->'metadatas' ? 'articles';
EOF
            ;;
        "category")
            cat >> "$sql_file" << 'EOF'
-- 更新Category字段描述
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,name,edit,description}', '"分类名称：必填，唯一，最长50字符，用于文章分类"') WHERE key = 'plugin_content_manager_configuration_content_types::api::category.category' AND value::jsonb->'metadatas' ? 'name';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,slug,edit,description}', '"分类URL标识符：基于分类名自动生成，用于分类页面URL"') WHERE key = 'plugin_content_manager_configuration_content_types::api::category.category' AND value::jsonb->'metadatas' ? 'slug';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,description,edit,description}', '"分类描述说明：最长200字符，SEO友好，说明分类用途"') WHERE key = 'plugin_content_manager_configuration_content_types::api::category.category' AND value::jsonb->'metadatas' ? 'description';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,icon,edit,description}', '"分类图标：图标名称或路径，用于界面展示"') WHERE key = 'plugin_content_manager_configuration_content_types::api::category.category' AND value::jsonb->'metadatas' ? 'icon';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,color,edit,description}', '"分类主题颜色：十六进制格式（如#8B5CF6），用于UI区分"') WHERE key = 'plugin_content_manager_configuration_content_types::api::category.category' AND value::jsonb->'metadatas' ? 'color';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,featured,edit,description}', '"是否特色分类：用于首页分类推荐和重点展示"') WHERE key = 'plugin_content_manager_configuration_content_types::api::category.category' AND value::jsonb->'metadatas' ? 'featured';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,articles,edit,description}', '"分类文章列表：一对多关系，显示该分类下的所有文章"') WHERE key = 'plugin_content_manager_configuration_content_types::api::category.category' AND value::jsonb->'metadatas' ? 'articles';
EOF
            ;;
        "tag")
            cat >> "$sql_file" << 'EOF'
-- 更新Tag字段描述
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,name,edit,description}', '"标签名称：必填，唯一，最长50字符，用于文章标记"') WHERE key = 'plugin_content_manager_configuration_content_types::api::tag.tag' AND value::jsonb->'metadatas' ? 'name';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,slug,edit,description}', '"标签URL标识符：基于标签名自动生成，用于标签页面URL"') WHERE key = 'plugin_content_manager_configuration_content_types::api::tag.tag' AND value::jsonb->'metadatas' ? 'slug';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,description,edit,description}', '"标签描述说明：最长200字符，说明标签的具体用途"') WHERE key = 'plugin_content_manager_configuration_content_types::api::tag.tag' AND value::jsonb->'metadatas' ? 'description';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,color,edit,description}', '"标签颜色：十六进制格式（如#3B82F6），用于界面标签显示"') WHERE key = 'plugin_content_manager_configuration_content_types::api::tag.tag' AND value::jsonb->'metadatas' ? 'color';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,icon,edit,description}', '"标签图标：图标名称或路径，增强标签的视觉识别"') WHERE key = 'plugin_content_manager_configuration_content_types::api::tag.tag' AND value::jsonb->'metadatas' ? 'icon';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,featured,edit,description}', '"是否特色标签：用于推荐标签显示和热门标签推荐"') WHERE key = 'plugin_content_manager_configuration_content_types::api::tag.tag' AND value::jsonb->'metadatas' ? 'featured';
UPDATE strapi_core_store_settings SET value = jsonb_set(value::jsonb, '{metadatas,articles,edit,description}', '"标签文章列表：多对多关系，显示使用该标签的所有文章"') WHERE key = 'plugin_content_manager_configuration_content_types::api::tag.tag' AND value::jsonb->'metadatas' ? 'articles';
EOF
            ;;
        *)
            echo -e "${RED}❌ 不支持的内容类型: $content_type${NC}"
            return 1
            ;;
    esac
    
    # 添加验证查询
    cat >> "$sql_file" << EOF
-- 验证更新结果
SELECT 
    '${content_type}字段描述配置完成' as status,
    value::jsonb->'metadatas'->>'name' as name_desc,
    value::jsonb->'metadatas'->>'featured' as featured_desc
FROM strapi_core_store_settings 
WHERE key = 'plugin_content_manager_configuration_content_types::api::${content_type}.${content_type}';
EOF
    
    echo "   ✅ SQL脚本已生成: $sql_file"
    return 0
}

# 主要执行流程
main() {
    echo -e "${YELLOW}🛑 步骤1: 停止所有服务...${NC}"
    cd "$PROJECT_ROOT"
    ./scripts.sh deploy stop 2>/dev/null || true

    echo -e "${YELLOW}🧹 步骤2: 彻底清除所有缓存...${NC}"
    cd "$PROJECT_ROOT/backend"
    rm -rf .tmp .cache build dist node_modules/.cache 2>/dev/null || true
    echo "   ✅ 后端缓存已清除"

    cd "$PROJECT_ROOT/frontend"
    rm -rf .next node_modules/.cache 2>/dev/null || true
    echo "   ✅ 前端缓存已清除"

    echo -e "${YELLOW}📝 步骤3: 生成字段描述配置...${NC}"
    cd "$PROJECT_ROOT/backend"
    
    # 获取字段描述
    local descriptions_json
    if [ -n "$DESCRIPTIONS_FILE" ] && [ -f "$DESCRIPTIONS_FILE" ]; then
        echo "   📖 使用自定义描述文件: $DESCRIPTIONS_FILE"
        descriptions_json=$(cat "$DESCRIPTIONS_FILE")
    else
        echo "   📋 使用预设的${CONTENT_TYPE}字段描述"
        descriptions_json=$(get_field_descriptions "$CONTENT_TYPE")
    fi
    
    # 生成SQL脚本
    if ! generate_sql_script "$CONTENT_TYPE" "$descriptions_json"; then
        echo -e "${RED}❌ SQL脚本生成失败${NC}"
        exit 1
    fi

    echo -e "${YELLOW}🚀 步骤4: 启动后端服务...${NC}"
    cd "$PROJECT_ROOT"
    ./scripts.sh deploy backend >/dev/null 2>&1 &

    # 等待后端启动
    echo "   ⏳ 等待后端服务启动..."
    for i in {1..30}; do
        if curl -s http://localhost:1337/admin >/dev/null 2>&1; then
            echo "   ✅ 后端服务已启动"
            break
        fi
        if [ $i -eq 30 ]; then
            echo -e "${RED}   ❌ 后端服务启动超时${NC}"
            exit 1
        fi
        sleep 2
    done

    echo -e "${YELLOW}💾 步骤5: 执行数据库更新...${NC}"
    cd "$PROJECT_ROOT/backend"
    local sql_file="update-${CONTENT_TYPE}-descriptions.sql"
    
    if psql -U aibianx_dev -d aibianx_dev -f "$sql_file"; then
        echo -e "${GREEN}   ✅ 数据库更新成功${NC}"
    else
        echo -e "${RED}   ❌ 数据库更新失败${NC}"
        exit 1
    fi

    echo -e "${YELLOW}🔄 步骤6: 重启完整服务...${NC}"
    cd "$PROJECT_ROOT"
    ./scripts.sh deploy stop >/dev/null 2>&1 || true
    sleep 2
    ./scripts.sh deploy start >/dev/null 2>&1 &

    # 等待服务启动
    echo "   ⏳ 等待服务完全启动..."
    for i in {1..60}; do
        if curl -s http://localhost:1337/admin >/dev/null 2>&1 && curl -s http://localhost >/dev/null 2>&1; then
            echo -e "${GREEN}   ✅ 所有服务已启动${NC}"
            break
        fi
        if [ $i -eq 60 ]; then
            echo -e "${RED}   ❌ 服务启动超时${NC}"
            exit 1
        fi
        sleep 2
    done

    # 完成
    echo ""
    echo -e "${GREEN}🎉 ${CONTENT_TYPE} 字段描述配置完成！${NC}"
    echo "=========================================="
    echo -e "${BLUE}📍 后续操作：${NC}"
    echo "1. 访问后台: http://localhost:1337/admin"
    echo "2. 强制刷新浏览器: Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)"
    echo "3. 进入 Content Manager → ${CONTENT_TYPE} 验证字段描述显示"
    echo ""
    echo -e "${YELLOW}💡 提示：如果描述仍不显示，请再次强制刷新浏览器${NC}"
    
    # 清理临时文件
    rm -f "$sql_file" 2>/dev/null || true
}

# 执行主流程
main