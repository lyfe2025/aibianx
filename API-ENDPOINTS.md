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

## 📧 **邮件营销系统 (新增)**

### 📥 **邮件订阅**

#### 邮件订阅
```http
POST /api/email-subscription/subscribe
```

**请求体:**
```json
{
  "email": "user@example.com",
  "name": "用户名",
  "source": "homepage",
  "tags": ["newsletter"]
}
```

**响应格式:**
```json
{
  "status": "success",
  "message": "订阅成功",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "status": "active",
    "tags": ["newsletter"]
  }
}
```

#### 邮件取消订阅
```http
POST /api/email-subscription/unsubscribe
```

#### 获取订阅状态
```http
GET /api/email-subscription/status?email=user@example.com
```

### 📨 **邮件服务**

#### 发送邮件
```http
POST /api/email-service/send
```

#### 发送批量邮件
```http
POST /api/email-service/send-bulk
```

#### 邮件发送统计
```http
GET /api/email-service/stats
```

### ⚙️ **SMTP配置管理**

#### 获取SMTP配置列表
```http
GET /api/smtp-configs
```

#### 获取可用SMTP配置
```http
GET /api/smtp-configs/available
```

**响应格式:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "阿里云邮件服务",
      "provider": "aliyun",
      "fromEmail": "noreply@example.com",
      "fromName": "AI变现之路",
      "priority": 1,
      "healthStatus": "healthy",
      "dailySent": 25,
      "dailyLimit": 1000,
      "errorCount": 0,
      "lastUsed": "2024-01-20T10:30:00Z"
    }
  ]
}
```

#### 🧪 **SMTP连接测试**
```http
POST /api/smtp-configs/:id/test
```

**请求体 (可选):**
```json
{
  "testEmail": "test@example.com"  // 可选: 发送测试邮件到此地址
}
```

**响应格式 (成功):**
```json
{
  "success": true,
  "message": "连接测试成功，测试邮件已发送",
  "data": {
    "configName": "阿里云邮件服务",
    "testEmail": "test@example.com",
    "timestamp": "2024-01-20T15:30:45.123Z"
  }
}
```

**响应格式 (失败):**
```json
{
  "message": "SMTP连接测试失败",
  "error": "Invalid login: 535 Login Fail",
  "details": "EAUTH"
}
```

**功能说明:**
- ✅ **验证SMTP服务器连接**
- ✅ **可选发送真实测试邮件**
- ✅ **自动更新healthStatus状态**
- ✅ **重置errorCount错误计数**
- ✅ **记录lastHealthCheck时间**

#### 🔍 **SMTP健康检查**
```http
POST /api/smtp-configs/:id/health-check
```

**响应格式:**
```json
{
  "data": {
    "configId": "1",
    "configName": "阿里云邮件服务",
    "healthStatus": "healthy",
    "errorMessage": null,
    "lastHealthCheck": "2024-01-20T15:30:45.123Z",
    "errorCount": 0,
    "maxErrorCount": 3
  }
}
```

#### 📊 **重置SMTP统计**
```http
POST /api/smtp-configs/:id/reset-stats
```

**请求体:**
```json
{
  "type": "daily"    // "daily" | "monthly" | "all"
}
```

**响应格式:**
```json
{
  "message": "每日统计已重置",
  "data": {
    "id": 1,
    "dailySent": 0,
    "monthlySent": 150,
    "errorCount": 0
  }
}
```

#### 🌐 **SMTP测试Web界面**
```
GET /api/smtp-test
```

**功能说明:**
- ✅ **完整的Web界面** - 无需命令行，直接在浏览器中操作
- ✅ **实时配置列表** - 显示所有SMTP配置和状态
- ✅ **一键连接测试** - 快速验证SMTP服务器连接
- ✅ **测试邮件发送** - 发送真实邮件验证完整流程
- ✅ **健康状态监控** - 实时查看配置健康状态
- ✅ **美观的用户界面** - 响应式设计，支持移动端
- ✅ **Admin后台集成** - 在Strapi管理界面侧边栏直接访问

**快速访问:**
- 🏢 **Admin后台** - 登录 [http://localhost:1337/admin](http://localhost:1337/admin)，点击侧边栏"SMTP测试"菜单
- 🌐 **直接访问**: [http://localhost:1337/api/smtp-test](http://localhost:1337/api/smtp-test)
- 📱 **移动端友好** - 支持手机、平板访问
- 🔄 **实时更新** - 测试结果实时显示，状态自动刷新

**使用方法:**
1. **推荐方式**: 在Admin后台侧边栏点击"SMTP测试"菜单
2. 或直接打开浏览器访问测试页面
3. 查看当前所有SMTP配置列表
4. 选择要测试的配置
5. 点击"仅测试连接"进行快速验证
6. 或输入邮箱地址，点击"发送测试邮件"进行完整测试
7. 查看实时测试结果和配置状态更新

---

## 🔐 **用户认证系统 (新增)**

### 📝 **用户注册**

#### 用户注册
```http
POST /api/auth/register
```

**请求体:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "name": "用户姓名"
}
```

**响应格式:**
```json
{
  "success": true,
  "message": "注册成功",
  "user": {
    "id": 1,
    "username": "username",
    "email": "user@example.com",
    "name": "用户姓名"
  },
  "jwt": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 🔑 **密码管理**

#### 发送密码重置邮件
```http
POST /api/auth/forgot-password
```

**请求体:**
```json
{
  "email": "user@example.com"
}
```

#### 发送邮箱验证码
```http
POST /api/auth/send-verification
```

#### 验证邮箱验证码
```http
POST /api/auth/verify-code
```

**请求体:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

---

## 📧 **邮件系统 (重构后)**

### 📨 **SMTP配置管理**

#### 获取SMTP配置列表
```http
GET /api/smtp-configs
```

#### 创建SMTP配置
```http
POST /api/smtp-configs
```

**请求体:**
```json
{
  "data": {
    "name": "Gmail SMTP",
    "provider": "gmail",
    "host": "smtp.gmail.com",
    "port": 587,
    "username": "your-email@gmail.com",
    "password": "your-app-password",
    "from_address": "noreply@yourdomain.com",
    "from_name": "AI变现之路",
    "use_tls": true,
    "usage_type": "verification",
    "daily_limit": 1000,
    "is_active": true
  }
}
```

### 📤 **统一邮件发送服务**

#### 发送验证码邮件
```http
POST /api/email-service/send-verification-code
```

**请求体:**
```json
{
  "email": "user@example.com",
  "code": "123456",
  "type": "register"
}
```

#### 发送测试邮件
```http
POST /api/email-service/send-test
```

#### 发送营销邮件
```http
POST /api/email-service/send-marketing
```

### 📬 **邮件订阅管理**

#### 订阅邮件
```http
POST /api/email-subscription/subscribe
```

**请求体:**
```json
{
  "email": "user@example.com",
  "source": "homepage",
  "tags": ["newsletter"]
}
```

#### 取消订阅
```http
POST /api/email-subscription/unsubscribe
```

### 📊 **邮件营销活动**

#### 创建邮件活动
```http
POST /api/email-campaigns
```

#### 发送邮件活动
```http
POST /api/email-campaign/send/:id
```

---

## 🔍 **搜索引擎 (MeiliSearch集成)**

### 🔍 **文章搜索**

#### 搜索文章
```http
GET /api/search/articles?q=搜索关键词&limit=20&offset=0
```

**查询参数:**
- `q` - 搜索关键词 (支持中文)
- `limit` - 返回数量 (默认20，最大100)
- `offset` - 偏移量 (默认0)
- `filters` - 过滤条件 (逗号分隔)
- `highlight` - 是否高亮显示 (默认true)

**响应格式:**
```json
{
  "data": {
    "hits": [
      {
        "id": 1,
        "title": "文章标题",
        "content": "文章内容...",
        "_formatted": {
          "title": "<mark>搜索关键词</mark>匹配的标题",
          "content": "包含<mark>搜索关键词</mark>的内容..."
        }
      }
    ],
    "estimatedTotalHits": 25,
    "limit": 20,
    "offset": 0,
    "processingTimeMs": 12
  },
  "meta": {
    "query": "搜索关键词",
    "totalHits": 25,
    "processingTime": 12
  }
}
```

#### 搜索建议
```http
GET /api/search/suggestions?query=关键词&limit=5
```

#### 搜索统计
```http
GET /api/search/stats
```

#### 搜索健康检查
```http
GET /api/search/health
```

#### 重建搜索索引
```http
POST /api/search/reindex
```

---

## ⚙️ **系统配置 (扩展)**

### 🔧 **系统配置管理**

#### 获取公开配置
```http
GET /api/system-config/public
```

#### 获取注册配置
```http
GET /api/system-config/registration
```

#### 获取维护状态
```http
GET /api/system-config/maintenance
```

#### 获取OAuth配置 (内部API)
```http
GET /api/system-config/oauth
```

#### 📧 邮件系统架构说明

**邮件功能已重构为分离架构：**

- **SMTP技术配置** → 使用 `smtp-configs` 内容类型管理
- **业务逻辑配置** → 保留在 `system-config` 中管理

**新架构优势：**
- ✅ 支持多SMTP配置和负载均衡
- ✅ 支持故障转移和健康检查
- ✅ 分离技术配置和业务配置
- ✅ 统一邮件发送服务

**相关API端点：**
```http
GET /api/smtp-configs          # SMTP配置管理
POST /api/email-service/send   # 统一邮件发送
GET /api/system-config/public  # 业务配置查询
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

- **2025-01-23**: 新增邮件营销系统完整API，包含订阅管理、SMTP配置、模板系统
- **2025-01-23**: 新增用户认证系统前端API路由，支持注册、密码重置、邮箱验证
- **2025-01-23**: 集成MeiliSearch搜索引擎，提供高性能文章搜索功能
- **2025-01-23**: 扩展系统配置API，支持OAuth、邮件服务等配置管理
- **2025-07-31**: 更新Strapi版本到5.20.0，同步所有相关文档
- **2025-07-29**: 创建API文档，替代不可用的documentation插件
- **当前版本**: Strapi 5.20.0，邮件营销系统 v1.0，搜索引擎 v1.0
- **数据状态**: 8篇文章，60+个数据库表，完整邮件营销系统

---

*💡 **提示**: 由于Strapi 5.x不支持自动API文档生成，请收藏此页面作为开发参考。如果API有更新，请及时更新此文档。* 