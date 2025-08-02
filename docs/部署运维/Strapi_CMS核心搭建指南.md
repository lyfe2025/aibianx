# Strapi CMS核心搭建指南 🏗️

> 📋 **第1周执行指南**：PostgreSQL + Strapi CMS + 核心内容类型搭建

## 📚 文档说明

本文档是 **[开发执行步骤总览](../开发执行步骤总览.md)** 的第1周详细实施指南，专注于Strapi CMS核心搭建。

---

## 🎯 **第1周目标**

将精美的前端UI从静态Mock数据转换为真正的动态内容管理系统，建立真实的内容创作和发布流程。

### 📋 **成功标准**
- PostgreSQL数据库正常运行
- Strapi CMS管理界面可访问
- 4个核心内容类型创建完成
- Mock数据成功迁移到Strapi
- API端点返回正确的JSON格式

---

## ⚡ **Day 1-2：环境搭建**

### **第1步：PostgreSQL数据库准备**

#### **选择1：本地开发环境**
```bash
# macOS安装
brew install postgresql@14
brew services start postgresql@14

# 创建开发数据库
createuser aibianx_dev --createdb --login
createdb aibianx_dev --owner=aibianx_dev

# 设置密码（可选）
psql -U aibianx_dev -d aibianx_dev
\password aibianx_dev
```

#### **选择2：云服务（推荐生产）**
```bash
# Supabase - 免费额度，管理界面友好
# 1. 访问 https://supabase.com
# 2. 创建新项目：aibianx-dev
# 3. 获取连接字符串：
# postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres

# Railway - 简单部署
# 1. 访问 https://railway.app
# 2. 创建PostgreSQL插件
# 3. 获取连接信息
```

### **第2步：Strapi CMS部署**

```bash
# 创建项目目录
mkdir aibianx && cd aibianx
mkdir backend && cd backend

# 创建Strapi项目（PostgreSQL版本）
npx create-strapi-app@latest . --dbclient=postgres \
  --dbhost=localhost \
  --dbport=5432 \
  --dbname=aibianx_dev \
  --dbusername=aibianx_dev \
  --dbpassword=your_password

# 安装核心插件
npm install @strapi/plugin-users-permissions
npm install @strapi/plugin-upload  
npm install @strapi/plugin-i18n
npm install strapi-plugin-seo
npm install strapi-plugin-sitemap

# 启动开发服务器
npm run develop
```

### **第3步：Strapi基础配置**

```bash
# 访问 http://localhost:1337/admin
# 1. 创建管理员账号
# 2. 完成初始设置向导
# 3. 验证管理界面正常加载
```

---

## ⚡ **Day 3-4：内容模型配置**

### **核心内容类型创建**

> **💡 为什么只创建4个核心模型？**
> 
> 基于**MVP优先**策略，第1周专注于替换Mock数据，实现真实的内容展示。完整的25个数据模型将分阶段创建：
> - **第1周**：内容管理（4个模型）- 实现文章展示
> - **第7周**：用户系统（3个模型）- 实现用户注册登录
> - **第8周**：会员订阅（3个模型）- 实现付费功能
> - **第9-12周**：其他高级功能模型

#### **第1步：Article（文章）内容类型**

在Strapi管理界面：**Content-Types Builder → Create new collection type**

```typescript
// 字段配置：
1. title (Text) - 必填，用于标题显示和SEO
2. slug (UID) - 基于title自动生成，用于URL
3. excerpt (Text) - 文章摘要，用于卡片显示和SEO描述
4. content (Rich Text) - 文章正文，支持Markdown
5. coverImage (Media) - 封面图片
6. publishedAt (DateTime) - 发布时间
7. readingTime (Text) - 阅读时长，如"12分钟"
8. isPremium (Boolean) - 是否付费内容
9. viewCount (Number) - 浏览量，默认0

// SEO字段组：
10. seoTitle (Text) - SEO标题
11. seoDescription (Text) - SEO描述
12. seoKeywords (Text) - SEO关键词

// 关联字段：
13. author (Relation) - 关联Author，Many-to-One
14. tags (Relation) - 关联Tag，Many-to-Many
15. category (Relation) - 关联Category，Many-to-One
```

#### **第2步：Author（作者）内容类型**

```typescript
// 字段配置：
1. name (Text) - 作者姓名
2. slug (UID) - 基于name生成
3. avatar (Media) - 头像图片
4. bio (Text) - 个人简介
5. socialLinks (JSON) - 社交媒体链接
6. articlesCount (Number) - 文章数量，默认0
```

#### **第3步：Tag（标签）内容类型**

```typescript
// 字段配置：
1. name (Text) - 标签名称
2. slug (UID) - 基于name生成
3. color (Text) - 显示颜色，如"#3B82F6"
4. description (Text) - 标签描述
5. articlesCount (Number) - 文章数量，默认0
```

#### **第4步：Category（分类）内容类型**

```typescript
// 字段配置：
1. name (Text) - 分类名称
2. slug (UID) - 基于name生成
3. description (Text) - 分类描述
4. icon (Text) - 图标名称
5. sortOrder (Number) - 排序权重
6. articlesCount (Number) - 文章数量，默认0
```

### **权限配置**

访问：**Settings → Users & Permissions → Roles**

```bash
# 角色配置：
1. Public（公开访问）
   - Article: find, findOne
   - Author: find, findOne  
   - Tag: find, findOne
   - Category: find, findOne

2. Authenticated（认证用户）
   - 继承Public权限
   - 暂不添加额外权限

3. Editor（编辑者）
   - 所有内容类型的CRUD权限
   - 媒体库管理权限

4. Administrator（管理员）
   - 所有权限
```

---

## ⚡ **Day 5-7：数据迁移和测试**

### **第1步：Mock数据迁移**

创建迁移脚本：`scripts/migrate-mock-data.js`

```javascript
const mockArticles = [
  {
    title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
    slug: 'midjourney-monetization-guide',
    excerpt: '在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星...',
    content: '完整的文章内容...',
    coverImage: '/images/articles/midjourney-guide.svg',
    publishedAt: '2023-11-22',
    readingTime: '12分钟',
    isPremium: false,
    seoTitle: 'Midjourney变现指南：AI绘画月入过万实战教程',
    seoDescription: '详细介绍如何利用Midjourney进行商业化变现，包含接单技巧、定价策略等实用方法',
    seoKeywords: 'Midjourney变现,AI绘画赚钱,数字艺术变现'
  },
  {
    title: 'ChatGPT-4赚钱秘籍：普通人如何利用AI写作月入5万',
    slug: 'chatgpt-4-writing-monetization',
    excerpt: 'ChatGPT-4的强大写作能力为普通人提供了前所未有的赚钱机会...',
    content: '详细的变现指南内容...',
    coverImage: '/images/articles/chatgpt-writing.svg',
    publishedAt: '2023-11-20',
    readingTime: '15分钟',
    isPremium: true,
    seoTitle: 'ChatGPT-4写作变现：月入5万实战指南',
    seoDescription: 'ChatGPT-4写作变现的完整指南，包含接单平台、定价策略和质量提升技巧',
    seoKeywords: 'ChatGPT赚钱,AI写作,副业变现'
  }
  // ... 更多文章
];

// 执行迁移
// node scripts/migrate-mock-data.js
```

### **第2步：API测试**

```bash
# 测试API端点
curl http://localhost:1337/api/articles?populate=*
curl http://localhost:1337/api/articles/midjourney-monetization-guide?populate=*
curl http://localhost:1337/api/authors?populate=*
curl http://localhost:1337/api/tags
curl http://localhost:1337/api/categories

# 验证响应格式
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Midjourney变现指南",
        "slug": "midjourney-monetization-guide",
        "excerpt": "在AI技术飞速发展的今天...",
        "publishedAt": "2023-11-22T00:00:00.000Z",
        "author": {
          "data": {
            "attributes": {
              "name": "李明阳",
              "avatar": { "data": { "attributes": { "url": "/uploads/..." } } }
            }
          }
        }
      }
    }
  ]
}
```

### **第3步：媒体库配置**

```bash
# 配置文件上传
# config/plugins.js
module.exports = {
  upload: {
    config: {
      provider: 'local', // 本地存储
      providerOptions: {
        sizeLimit: 10000000, // 10MB
      },
    },
  },
};

# 上传测试图片
# 1. 访问 http://localhost:1337/admin/plugins/upload
# 2. 上传作者头像和文章封面图片
# 3. 验证图片URL可正常访问
```

---

## ✅ **第1周完成检查清单**

### **系统检查**
```markdown
- [ ] PostgreSQL数据库正常运行
- [ ] Strapi CMS管理界面可访问（http://localhost:1337/admin）
- [ ] 4个核心内容类型创建完成（Article、Author、Tag、Category）
- [ ] 权限配置正确，API可公开访问内容
- [ ] Mock数据成功迁移到Strapi
- [ ] API端点返回正确的JSON格式
- [ ] 管理员可以在界面中创建和编辑文章
- [ ] 图片上传功能正常工作
- [ ] SEO插件安装和配置完成
```

### **API验证**
```bash
# 文章API测试
curl -s "http://localhost:1337/api/articles?populate=author,category,tags,coverImage" | jq '.data[0].attributes.title'

# 响应时间测试（应 < 200ms）
time curl -s "http://localhost:1337/api/articles" > /dev/null

# 权限测试（公开访问）
curl -s "http://localhost:1337/api/articles" | jq '.data | length'
```

### **数据质量检查**
```markdown
- [ ] 至少导入8篇真实文章内容
- [ ] 每篇文章都有作者、分类、标签关联
- [ ] 所有文章都有封面图片和SEO信息
- [ ] 文章内容格式正确，无乱码
- [ ] 发布时间设置正确
- [ ] 阅读时长计算准确
```

---

## 🚨 **故障排除**

### **常见问题**

#### **1. 数据库连接失败**
```bash
# 检查PostgreSQL状态
brew services list | grep postgresql
psql -U aibianx_dev -d aibianx_dev -c "SELECT version();"

# 重启数据库服务
brew services restart postgresql@14
```

#### **2. Strapi启动失败**
```bash
# 清理依赖重新安装
rm -rf node_modules package-lock.json
npm install

# 检查端口占用
lsof -i :1337
kill -9 <PID>

# 重新生成数据库表
npm run strapi build
npm run develop
```

#### **3. API权限问题**
```bash
# 重新配置权限
# 1. 访问 Settings → Users & Permissions → Roles
# 2. 选择 Public 角色
# 3. 为所有内容类型启用 find 和 findOne 权限
# 4. 保存并重启Strapi
```

#### **4. 图片上传失败**
```bash
# 检查上传目录权限
ls -la public/uploads/
chmod 755 public/uploads/

# 检查配置文件
cat config/plugins.js
```

---

## 📈 **性能优化**

### **数据库优化**
```sql
-- 创建索引提升查询性能
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_articles_category ON articles_category_links(article_id);
```

### **API响应优化**
```javascript
// config/api.js
module.exports = {
  responses: {
    privateAttributes: ['created_by', 'updated_by'],
  },
  pagination: {
    defaultLimit: 25,
    maxLimit: 100,
  },
};
```

---

## 🎯 **下一步**

### **第2周准备**
- [ ] 确认所有API端点正常工作
- [ ] 准备前端环境变量配置
- [ ] 测试跨域访问配置
- [ ] 准备前端API客户端开发

### **文档引用**
- **下一步**: [前端API集成指南](../前端系统/前端API集成指南.md)
- **参考**: [数据库表结构设计](../数据库表结构设计.md)
- **总览**: [开发执行步骤总览](../开发执行步骤总览.md)

---

**🎉 第1周：Strapi CMS核心搭建完成！准备进入第2周前端API集成阶段！**

**📅 预计完成时间**: 7天  
**⏰ 关键里程碑**: Mock数据迁移完成，API正常响应  
**🎯 下一目标**: 前端完全API化