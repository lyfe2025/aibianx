# API文档 📡

> 📋 **接口文档、数据格式、调用示例**

## 📚 目录说明

本目录包含AI变现之路项目的API接口文档、数据格式说明和调用示例。

---

## 📁 **文档分类**

### 🔗 **核心API文档**
- **[API-ENDPOINTS.md](../../API-ENDPOINTS.md)** - 完整的API端点文档，包含所有接口说明
- **[Strapi API](../当前开发/后台系统/)** - Strapi CMS自动生成的API接口

### 📊 **API分类**

#### **内容管理API**
- **文章API** (`/api/articles`)
  - 获取文章列表
  - 获取单篇文章
  - 文章搜索和筛选
  - 文章分页查询

- **作者API** (`/api/authors`)
  - 获取作者列表
  - 获取作者详情
  - 作者文章列表

- **分类标签API** (`/api/categories`, `/api/tags`)
  - 获取分类/标签列表
  - 按分类/标签筛选文章

#### **邮件营销API**
- **邮件订阅API** (`/api/email-subscription`)
  - 邮件订阅
  - 取消订阅
  - 订阅状态查询

- **SMTP配置API** (`/api/smtp-configs`)
  - SMTP配置管理
  - 连接测试
  - 健康检查

#### **用户认证API**
- **用户注册** (`/api/auth/register`)
- **密码管理** (`/api/auth/forgot-password`)
- **邮箱验证** (`/api/auth/verify-code`)

#### **搜索引擎API**
- **文章搜索** (`/api/search/articles`)
- **搜索建议** (`/api/search/suggestions`)
- **搜索统计** (`/api/search/stats`)

---

## 🔗 **API基础信息**

### **基础配置**
```
API Base URL: http://localhost:1337/api
管理后台: http://localhost:1337/admin
认证方式: JWT Bearer Token (生产环境)
数据格式: JSON
API版本: Strapi 5.20.0
```

### **通用响应格式**
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "unique-doc-id",
      "attributes": {
        "title": "标题",
        "content": "内容"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 10,
      "total": 250
    }
  }
}
```

### **错误响应格式**
```json
{
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "参数验证失败",
    "details": {
      "field": "email",
      "message": "邮箱格式不正确"
    }
  }
}
```

---

## 📖 **API使用指南**

### **认证方式**

#### **公开访问**
```bash
# 获取文章列表（无需认证）
curl -X GET "http://localhost:1337/api/articles?populate=*"
```

#### **需要认证的API**
```bash
# 使用JWT Token
curl -X POST "http://localhost:1337/api/articles" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"data": {"title": "新文章"}}'
```

### **查询参数**

#### **分页参数**
```bash
# 分页查询
GET /api/articles?pagination[page]=1&pagination[pageSize]=10
```

#### **关联查询**
```bash
# 包含关联数据
GET /api/articles?populate=author,category,tags,featuredImage
```

#### **筛选查询**
```bash
# 按分类筛选
GET /api/articles?filters[category][slug][$eq]=tech-guide

# 搜索文章
GET /api/articles?filters[title][$containsi]=AI变现
```

#### **排序参数**
```bash
# 按发布时间降序
GET /api/articles?sort[0]=publishedAt:desc
```

---

## 🛠️ **开发工具**

### **API测试工具**
- **命令行**: curl, httpie
- **图形界面**: Postman, Insomnia
- **浏览器**: 直接访问GET接口
- **开发工具**: VS Code REST Client

### **API客户端库**

#### **前端客户端**
```typescript
// frontend/src/lib/strapi.ts
import { strapiApi } from '@/lib/api'

// 获取文章列表
const articles = await strapiApi.getArticles({
  pagination: { pageSize: 10, page: 1 },
  filters: { featured: { $eq: true } }
})
```

#### **Node.js客户端**
```javascript
// backend/src/lib/billionmail.ts
import { billionMail } from '@/lib/billionmail'

// 发送邮件
await billionMail.sendEmail({
  to: 'user@example.com',
  subject: '欢迎订阅',
  content: '感谢您的订阅！'
})
```

---

## 📊 **API规范**

### **RESTful设计原则**
- **资源导向**: URL表示资源，HTTP方法表示操作
- **无状态**: 每个请求包含所有必要信息
- **统一接口**: 一致的HTTP状态码和响应格式
- **分层系统**: 客户端不需要知道服务器内部结构

### **HTTP状态码**
| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 200 | 成功 | GET, PUT请求成功 |
| 201 | 已创建 | POST请求成功创建资源 |
| 204 | 无内容 | DELETE请求成功 |
| 400 | 请求错误 | 参数验证失败 |
| 401 | 未授权 | 需要认证 |
| 403 | 禁止访问 | 权限不足 |
| 404 | 未找到 | 资源不存在 |
| 500 | 服务器错误 | 内部错误 |

### **命名规范**
- **URL**: 小写字母，连字符分隔 (`/api/articles`)
- **字段名**: 驼峰命名 (`firstName`, `publishedAt`)
- **枚举值**: 下划线分隔 (`user_role`, `payment_status`)

---

## 🧪 **API测试**

### **基础测试**
```bash
# 健康检查
curl -s http://localhost:1337/_health

# 获取文章总数
curl -s 'http://localhost:1337/api/articles' | jq '.meta.pagination.total'

# 测试搜索功能
curl -s 'http://localhost:1337/api/search/articles?q=AI变现' | jq '.data.hits | length'
```

### **性能测试**
```bash
# API响应时间测试
time curl -s 'http://localhost:1337/api/articles' > /dev/null

# 并发测试
ab -n 100 -c 10 http://localhost:1337/api/articles
```

### **集成测试**
```bash
# 完整API流程测试
./scripts.sh test api-integration
```

---

## 📈 **API监控**

### **性能指标**
- **响应时间**: < 200ms
- **成功率**: > 99.9%
- **并发处理**: 100 req/s
- **错误率**: < 0.1%

### **监控工具**
```bash
# API健康检查
curl -s http://localhost:1337/api/health

# 系统状态监控
./scripts.sh tools status

# 错误日志监控
tail -f logs/backend.log | grep ERROR
```

---

## 🔐 **API安全**

### **安全措施**
- **HTTPS**: 生产环境强制HTTPS
- **CORS**: 跨域访问控制
- **Rate Limiting**: 请求频率限制
- **Input Validation**: 输入参数验证
- **SQL Injection**: 参数化查询防护

### **认证授权**
```typescript
// JWT Token验证
const token = req.headers.authorization?.replace('Bearer ', '');
const user = await verifyJWTToken(token);
```

---

## 📝 **API版本管理**

### **版本策略**
- **URL版本**: `/api/v1/articles`, `/api/v2/articles`
- **Header版本**: `Accept: application/vnd.api+json; version=1`
- **向后兼容**: 保持旧版本API的稳定性

### **变更记录**
- **v1.0.0** (2024-01): 初始版本，基础CRUD功能
- **v1.1.0** (2024-01): 新增搜索API和邮件订阅
- **v1.2.0** (计划中): 用户认证和权限管理

---

## 🔗 **相关资源**

### **内部文档**
- [架构文档](../架构文档/README.md) - 系统架构设计
- [开发指南](../开发指南/README.md) - 开发规范
- [部署运维](../部署运维/README.md) - 部署和运维

### **外部资源**
- [Strapi API文档](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/)
- [REST API设计指南](https://restfulapi.net/)
- [HTTP状态码](https://httpstatuses.com/)
- [JWT Token](https://jwt.io/)

---

**📡 API文档 - 让AI变现之路的API接口清晰易用！**

**📅 最后更新**: 2024年1月  
**📝 维护团队**: 后端开发组  
**🎯 下一步**: 完善API文档和增加更多示例