#!/bin/bash

# Strapi 5.x 字段描述配置工具
# 用于解决字段描述配置失败的问题
# 使用方法: ./configure-field-descriptions.sh [content-type] [force]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Strapi 5.x 字段描述配置工具 (Article专用)${NC}"
echo "=================================="
echo -e "${YELLOW}💡 这是Article专用的配置工具${NC}"
echo -e "${YELLOW}   如需配置其他内容类型，请使用: ./configure-any-field-descriptions.sh${NC}"
echo ""

# 检查参数
CONTENT_TYPE=${1:-"article"}
FORCE_MODE=${2:-""}

if [ "$FORCE_MODE" = "force" ]; then
    echo -e "${YELLOW}⚠️  强制模式：将彻底清除所有缓存并重建配置${NC}"
fi

# 步骤1：停止所有服务
echo -e "${YELLOW}🛑 步骤1: 停止所有服务...${NC}"
cd "$PROJECT_ROOT"
./scripts.sh deploy stop 2>/dev/null || true

# 步骤2：彻底清除缓存
echo -e "${YELLOW}🧹 步骤2: 彻底清除所有缓存...${NC}"
cd "$PROJECT_ROOT/backend"
rm -rf .tmp .cache build dist node_modules/.cache 2>/dev/null || true
echo "   ✅ 后端缓存已清除"

cd "$PROJECT_ROOT/frontend"
rm -rf .next node_modules/.cache 2>/dev/null || true
echo "   ✅ 前端缓存已清除"

# 步骤3：生成字段描述SQL脚本
echo -e "${YELLOW}📝 步骤3: 生成字段描述配置脚本...${NC}"
cd "$PROJECT_ROOT/backend"

cat > update-field-descriptions-auto.sql << 'EOF'
-- 自动生成的字段描述配置脚本
-- 生成时间: $(date)

-- Article字段描述配置
UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,title,edit,description}', 
    '"文章标题：必填字段，1-255字符，用于显示和SEO优化"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'title';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,slug,edit,description}', 
    '"URL友好标识符：基于标题自动生成的唯一标识，用于友好URL"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'slug';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,content,edit,description}', 
    '"文章正文内容：富文本格式，必填字段，支持HTML标记"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'content';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,excerpt,edit,description}', 
    '"文章摘要简介：最长500字符，用于列表页面和搜索结果展示"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'excerpt';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,featuredImage,edit,description}', 
    '"文章特色图片：封面图，仅支持图片格式，用于文章展示"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'featuredImage';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,viewCount,edit,description}', 
    '"文章浏览次数：默认为0，系统自动统计的文章访问量"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'viewCount';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,readingTime,edit,description}', 
    '"预估阅读时长：单位为分钟，默认5分钟，用于用户体验优化"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'readingTime';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,seoTitle,edit,description}', 
    '"SEO标题：最长60字符，用于搜索引擎结果页面显示"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'seoTitle';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,seoDescription,edit,description}', 
    '"SEO描述：最长160字符，用于搜索引擎结果页面的摘要显示"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'seoDescription';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,featured,edit,description}', 
    '"是否置顶推荐：用于首页精选推荐，置顶显示优质内容，提升文章曝光度"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'featured';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,isPremium,edit,description}', 
    '"是否会员专享：标记为会员专享的文章需要会员权限才能查看完整内容，用于付费内容管理"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'isPremium';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,tags,edit,description}', 
    '"文章标签：多对多关系，可选择多个标签进行文章分类"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'tags';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,category,edit,description}', 
    '"文章分类：多对一关系，每篇文章属于一个分类"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'category';

UPDATE strapi_core_store_settings 
SET value = jsonb_set(
    value::jsonb, 
    '{metadatas,author,edit,description}', 
    '"文章作者：多对一关系，每篇文章有一个作者"'
) 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article'
AND value::jsonb->'metadatas' ? 'author';

-- 验证更新结果
SELECT 
    'Article字段描述配置完成' as status,
    value::jsonb->'metadatas'->'featured'->'edit'->>'description' as featured_desc,
    value::jsonb->'metadatas'->'isPremium'->'edit'->>'description' as isPremium_desc
FROM strapi_core_store_settings 
WHERE key = 'plugin_content_manager_configuration_content_types::api::article.article';
EOF

echo "   ✅ SQL脚本已生成: update-field-descriptions-auto.sql"

# 步骤4：启动后端服务
echo -e "${YELLOW}🚀 步骤4: 启动后端服务...${NC}"
cd "$PROJECT_ROOT"
./scripts.sh deploy backend >/dev/null 2>&1 &
BACKEND_PID=$!

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

# 步骤5：执行数据库更新
echo -e "${YELLOW}💾 步骤5: 执行数据库更新...${NC}"
cd "$PROJECT_ROOT/backend"
if psql -U aibianx_dev -d aibianx_dev -f update-field-descriptions-auto.sql; then
    echo -e "${GREEN}   ✅ 数据库更新成功${NC}"
else
    echo -e "${RED}   ❌ 数据库更新失败${NC}"
    exit 1
fi

# 步骤6：重启完整服务
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
echo -e "${GREEN}🎉 字段描述配置完成！${NC}"
echo "=================================="
echo -e "${BLUE}📍 后续操作：${NC}"
echo "1. 访问后台: http://localhost:1337/admin"
echo "2. 强制刷新浏览器: Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)"
echo "3. 进入 Content Manager → Article 验证字段描述显示"
echo ""
echo -e "${YELLOW}💡 提示：如果描述仍不显示，请再次强制刷新浏览器${NC}"