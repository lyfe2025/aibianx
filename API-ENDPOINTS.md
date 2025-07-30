# 🔗 AI变现之路 - API端点文档

> 由于Strapi 5.x不支持documentation插件，这里提供手动维护的API文档

## 📡 **基础信息**

- **API Base URL**: `http://localhost:1337/api`
- **管理后台**: `http://localhost:1337/admin`
- **认证方式**: JWT Bearer Token (生产环境)
- **数据格式**: JSON
- **API版本**: Strapi 5.20.0

---

## 📚 **核心API端点**

### 📄 **文章 (Articles)**

#### 获取所有文章
```http
GET /api/articles
```

**查询参数:**
- `populate[author]=*` - 包含作者信息
- `populate[category]=*` - 包含分类信息  
- `populate[tags]=*` - 包含标签信息
- `populate[featuredImage]=*` - 包含封面图片
- `sort[0]=publishedAt:desc` - 按发布时间降序
- `filters[featured][$eq]=true` - 仅推荐文章
- `pagination[pageSize]=10` - 每页条数
- `pagination[page]=1` - 页码

**完整示例:**
```http
GET /api/articles?populate[author]=*&populate[category]=*&populate[tags]=*&populate[featuredImage]=*&sort[0]=publishedAt:desc&pagination[pageSize]=6
```

**响应格式:**
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "unique-doc-id",
      "title": "文章标题",
      "slug": "article-slug",
      "content": "文章内容...",
      "excerpt": "文章摘要",
      "publishedAt": "2025-07-28T21:42:50.099Z",
      "viewCount": 2400,
      "readingTime": 12,
      "featured": true,
      "author": {
        "data": { /* 作者信息 */ }
      },
      "category": {
        "data": { /* 分类信息 */ }
      },
      "tags": {
        "data": [ /* 标签数组 */ ]
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 6,
      "pageCount": 2,
      "total": 8
    }
  }
}
```

#### 获取单篇文章
```http
GET /api/articles/{id}
GET /api/articles?filters[slug][$eq]=article-slug&populate[author]=*&populate[category]=*&populate[tags]=*
```

#### 获取推荐文章
```http
GET /api/articles?filters[featured][$eq]=true&populate[author]=*&populate[category]=*&populate[tags]=*&pagination[pageSize]=6
```

---

### 👤 **作者 (Authors)**

#### 获取所有作者
```http
GET /api/authors
```

#### 获取单个作者
```http
GET /api/authors/{id}
```

**响应格式:**
```json
{
  "data": {
    "id": 1,
    "name": "李明阳",
    "slug": "li-mingyang", 
    "bio": "AI技术专家...",
    "email": "contact@example.com",
    "position": "AI技术专家",
    "company": "AI变现之路",
    "website": "https://example.com",
    "twitter": "@username",
    "github": "username",
    "linkedin": "username",
    "featured": true
  }
}
```

---

### 🏷️ **分类 (Categories)**

#### 获取所有分类
```http
GET /api/categories
```

#### 获取单个分类
```http
GET /api/categories/{id}
```

**响应格式:**
```json
{
  "data": {
    "id": 1,
    "name": "技术指南",
    "slug": "tech-guide",
    "description": "技术相关的指南和教程",
    "icon": "tech-icon",
    "color": "#3B82F6",
    "featured": true
  }
}
```

---

### 🏷️ **标签 (Tags)**

#### 获取所有标签
```http
GET /api/tags
```

#### 获取单个标签
```http
GET /api/tags/{id}
```

**响应格式:**
```json
{
  "data": {
    "id": 1,
    "name": "AI工具",
    "slug": "ai-tools",
    "description": "AI相关工具推荐",
    "color": "#8B5CF6",
    "icon": "ai-icon",
    "featured": true,
    "sortOrder": 1
  }
}
```

---

## 🔍 **高级查询示例**

### 搜索文章
```http
GET /api/articles?filters[title][$containsi]=AI&populate[author]=*
```

### 按分类筛选
```http
GET /api/articles?filters[category][slug][$eq]=tech-guide&populate[author]=*&populate[category]=*
```

### 按标签筛选
```http
GET /api/articles?filters[tags][slug][$eq]=ai-tools&populate[author]=*&populate[tags]=*
```

### 按作者筛选
```http
GET /api/articles?filters[author][slug][$eq]=li-mingyang&populate[author]=*
```

### 分页查询
```http
GET /api/articles?pagination[page]=2&pagination[pageSize]=5&populate[author]=*
```

---

## 🛠️ **快速测试工具**

### 使用curl测试
```bash
# 获取所有文章
curl -s 'http://localhost:1337/api/articles?populate[author]=*&populate[category]=*&populate[tags]=*' | jq

# 获取推荐文章
curl -s 'http://localhost:1337/api/articles?filters[featured][$eq]=true&populate[author]=*' | jq

# 获取文章总数
curl -s 'http://localhost:1337/api/articles' | jq '.meta.pagination.total'
```

### 使用浏览器直接访问
- **所有文章**: http://localhost:1337/api/articles
- **推荐文章**: http://localhost:1337/api/articles?filters[featured][$eq]=true
- **所有作者**: http://localhost:1337/api/authors  
- **所有分类**: http://localhost:1337/api/categories
- **所有标签**: http://localhost:1337/api/tags

---

## 📊 **错误代码说明**

| 状态码 | 说明 | 解决方案 |
|-------|------|---------|
| 200 | 请求成功 | - |
| 400 | 请求参数错误 | 检查query参数格式 |
| 404 | 资源不存在 | 检查URL和ID是否正确 |
| 500 | 服务器错误 | 检查后端服务状态 |

---

## 🔧 **开发提示**

### 前端API调用示例
```typescript
// 使用我们的API客户端
import { strapiApi } from '@/lib/api'

// 获取推荐文章
const featuredArticles = await strapiApi.getFeaturedArticles(6)

// 获取所有文章
const articles = await strapiApi.getArticles({
  pagination: { pageSize: 10, page: 1 },
  filters: { featured: { $eq: true } }
})
```

### 数据转换
```typescript
// 使用我们的转换器
import { transformArticleList } from '@/lib/transforms'

const apiResponse = await strapiApi.getArticles()
const articleCards = transformArticleList(apiResponse.data)
```

---

## 📝 **更新日志**

- **2025-07-31**: 更新Strapi版本到5.20.0，同步所有相关文档
- **2025-07-29**: 创建API文档，替代不可用的documentation插件
- **当前版本**: Strapi 5.20.0，API稳定运行
- **数据状态**: 8篇文章，43个数据库表

---

*💡 **提示**: 由于Strapi 5.x不支持自动API文档生成，请收藏此页面作为开发参考。如果API有更新，请及时更新此文档。* 