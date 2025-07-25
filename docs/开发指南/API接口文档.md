# API接口文档 📡

> 🚀 AI变现之路项目后端API接口设计规范和文档，基于RESTful架构设计

## 📋 API概览

| 基础信息 | 详情 |
|---------|------|
| **API版本** | v1.0 |
| **认证方式** | JWT Token + OAuth2.0 |
| **数据格式** | JSON |
| **字符编码** | UTF-8 |
| **基础URL** | `https://api.aibianx.com/v1` |
| **状态** | 🔄 设计中，待开发 |

---

## 🔐 认证体系

### JWT Token认证
```http
Authorization: Bearer <access_token>
```

### OAuth2.0第三方登录
- **GitHub OAuth** - 开发者首选
- **微信登录** - 移动端主要方式
- **邮箱注册** - 传统注册方式

---

## 📊 标准响应格式

### 成功响应
```json
{
  "success": true,
  "code": 200,
  "message": "操作成功",
  "data": {
    // 具体数据
  },
  "timestamp": "2024-12-01T00:00:00Z"
}
```

### 错误响应
```json
{
  "success": false,
  "code": 400,
  "message": "请求参数错误",
  "error": {
    "field": "email",
    "message": "邮箱格式不正确"
  },
  "timestamp": "2024-12-01T00:00:00Z"
}
```

### HTTP状态码规范
| 状态码 | 含义 | 使用场景 |
|-------|------|----------|
| 200 | 成功 | 请求成功处理 |
| 201 | 创建成功 | 资源创建成功 |
| 400 | 请求错误 | 参数验证失败 |
| 401 | 未认证 | Token无效或过期 |
| 403 | 无权限 | 用户权限不足 |
| 404 | 未找到 | 资源不存在 |
| 429 | 限流 | 请求频率过高 |
| 500 | 服务器错误 | 内部服务器错误 |

---

## 👤 用户认证模块

### 用户注册
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "agreeTerms": true,
  "agreePrivacy": true
}
```

**响应示例**:
```json
{
  "success": true,
  "code": 201,
  "message": "注册成功",
  "data": {
    "userId": "user_123456",
    "email": "user@example.com",
    "status": "pending_verification"
  }
}
```

### 用户登录
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

**响应示例**:
```json
{
  "success": true,
  "code": 200,
  "message": "登录成功",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123456",
      "email": "user@example.com",
      "nickname": "AI学习者",
      "avatar": "/images/avatars/default.jpg",
      "membershipLevel": "free",
      "membershipExpire": null
    }
  }
}
```

### GitHub OAuth登录
```http
POST /auth/github
Content-Type: application/json

{
  "code": "github_oauth_code",
  "state": "random_state_string"
}
```

### 忘记密码
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### 重置密码
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset_token",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

---

## 📚 文章内容模块

### 获取文章列表
```http
GET /articles?page=1&limit=10&category=ai-tools&search=ChatGPT&tags=chatgpt,ai
```

**响应示例**:
```json
{
  "success": true,
  "code": 200,
  "message": "获取成功",
  "data": {
    "articles": [
      {
        "id": "article_123",
        "title": "ChatGPT变现完全指南",
        "slug": "chatgpt-monetization-guide",
        "excerpt": "详细介绍ChatGPT的各种变现方式...",
        "content": null,
        "coverImage": "/images/articles/chatgpt-guide.jpg",
        "category": {
          "id": "cat_001",
          "name": "AI工具",
          "slug": "ai-tools"
        },
        "tags": [
          {"id": "tag_001", "name": "ChatGPT", "slug": "chatgpt"},
          {"id": "tag_002", "name": "AI变现", "slug": "ai-monetization"}
        ],
        "author": {
          "id": "author_001",
          "name": "李明阳",
          "avatar": "/images/avatars/li-mingyang.jpg"
        },
        "stats": {
          "views": 2580,
          "likes": 156,
          "bookmarks": 89,
          "readTime": 8
        },
        "membership": {
          "required": false,
          "level": "free"
        },
        "publishedAt": "2024-11-28T10:00:00Z",
        "updatedAt": "2024-11-29T15:30:00Z"
      }
    ],
    "pagination": {
      "current": 1,
      "total": 12,
      "pages": 2,
      "limit": 10,
      "hasNext": true,
      "hasPrev": false
    },
    "filters": {
      "categories": [
        {"id": "cat_001", "name": "AI工具", "count": 15},
        {"id": "cat_002", "name": "变现心得", "count": 12}
      ],
      "tags": [
        {"id": "tag_001", "name": "ChatGPT", "count": 8},
        {"id": "tag_002", "name": "Midjourney", "count": 6}
      ]
    }
  }
}
```

### 获取文章详情
```http
GET /articles/{slug}
Authorization: Bearer <access_token>
```

**响应示例**:
```json
{
  "success": true,
  "code": 200,
  "message": "获取成功",
  "data": {
    "article": {
      "id": "article_123",
      "title": "ChatGPT变现完全指南",
      "slug": "chatgpt-monetization-guide",
      "content": "## 引言\n\nChatGPT作为当前最火的AI工具...",
      "excerpt": "详细介绍ChatGPT的各种变现方式...",
      "coverImage": "/images/articles/chatgpt-guide.jpg",
      "category": {
        "id": "cat_001",
        "name": "AI工具",
        "slug": "ai-tools"
      },
      "tags": [
        {"id": "tag_001", "name": "ChatGPT", "slug": "chatgpt"}
      ],
      "author": {
        "id": "author_001",
        "name": "李明阳",
        "avatar": "/images/avatars/li-mingyang.jpg",
        "bio": "AI领域专家，专注AI商业化应用",
        "socialLinks": {
          "github": "https://github.com/limingyang",
          "twitter": "https://twitter.com/limingyang"
        }
      },
      "stats": {
        "views": 2580,
        "likes": 156,
        "bookmarks": 89,
        "readTime": 8
      },
      "membership": {
        "required": false,
        "level": "free"
      },
      "userInteraction": {
        "liked": false,
        "bookmarked": true,
        "canAccess": true
      },
      "seo": {
        "metaTitle": "ChatGPT变现完全指南 - AI变现之路",
        "metaDescription": "详细介绍ChatGPT的各种变现方式...",
        "keywords": ["ChatGPT", "AI变现", "人工智能"]
      },
      "relatedArticles": [
        {
          "id": "article_124",
          "title": "Midjourney商业应用案例",
          "slug": "midjourney-business-cases",
          "coverImage": "/images/articles/midjourney-cases.jpg"
        }
      ],
      "publishedAt": "2024-11-28T10:00:00Z",
      "updatedAt": "2024-11-29T15:30:00Z"
    }
  }
}
```

### 文章搜索
```http
GET /articles/search?q=ChatGPT&category=ai-tools&page=1&limit=10
```

### 热门文章
```http
GET /articles/trending?period=week&limit=5
```

---

## 👤 用户管理模块

### 获取用户信息
```http
GET /user/profile
Authorization: Bearer <access_token>
```

**响应示例**:
```json
{
  "success": true,
  "code": 200,
  "message": "获取成功",
  "data": {
    "user": {
      "id": "user_123456",
      "email": "user@example.com",
      "nickname": "AI学习者",
      "avatar": "/images/avatars/user.jpg",
      "bio": "专注AI变现学习",
      "location": "北京",
      "website": "https://example.com",
      "membershipLevel": "premium",
      "membershipExpire": "2024-12-31T23:59:59Z",
      "stats": {
        "articlesRead": 156,
        "bookmarks": 23,
        "readTime": 1280
      },
      "preferences": {
        "emailNotifications": true,
        "weeklyDigest": true,
        "articleUpdates": false
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "lastLoginAt": "2024-12-01T08:30:00Z"
    }
  }
}
```

### 更新用户信息
```http
PUT /user/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "nickname": "新昵称",
  "bio": "新的个人简介",
  "location": "上海",
  "website": "https://newwebsite.com"
}
```

### 上传头像
```http
POST /user/avatar
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

avatar: <file>
```

---

## 📖 收藏和阅读历史

### 获取收藏列表
```http
GET /user/bookmarks?page=1&limit=10&category=ai-tools
Authorization: Bearer <access_token>
```

### 添加收藏
```http
POST /user/bookmarks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "articleId": "article_123"
}
```

### 取消收藏
```http
DELETE /user/bookmarks/{articleId}
Authorization: Bearer <access_token>
```

### 获取阅读历史
```http
GET /user/reading-history?page=1&limit=20
Authorization: Bearer <access_token>
```

---

## 💎 会员订阅模块

### 获取会员套餐
```http
GET /membership/plans
```

**响应示例**:
```json
{
  "success": true,
  "code": 200,
  "message": "获取成功",
  "data": {
    "plans": [
      {
        "id": "plan_monthly",
        "name": "月度会员",
        "type": "monthly",
        "price": 29.90,
        "originalPrice": 39.90,
        "currency": "CNY",
        "duration": 30,
        "features": [
          "无限制阅读所有文章",
          "下载PDF版本",
          "专属会员标识",
          "优先客服支持"
        ],
        "badge": {
          "text": "最受欢迎",
          "color": "#3B82F6"
        },
        "discount": {
          "type": "limited_time",
          "percentage": 25,
          "endTime": "2024-12-31T23:59:59Z"
        }
      },
      {
        "id": "plan_yearly",
        "name": "年度会员",
        "type": "yearly",
        "price": 299.00,
        "originalPrice": 479.00,
        "currency": "CNY",
        "duration": 365,
        "features": [
          "月度会员全部权益",
          "独家深度报告",
          "线上专题活动",
          "1对1专家咨询（1次/月）"
        ],
        "badge": {
          "text": "最超值",
          "color": "#8B5CF6"
        },
        "discount": {
          "type": "yearly_discount",
          "percentage": 38,
          "saveAmount": 180.00
        }
      }
    ],
    "countdown": {
      "title": "限时特惠倒计时",
      "endTime": "2024-12-31T23:59:59Z",
      "description": "错过再等一年"
    }
  }
}
```

### 创建订单
```http
POST /membership/orders
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "planId": "plan_monthly",
  "paymentMethod": "alipay",
  "couponCode": "WELCOME2024"
}
```

### 获取支付二维码
```http
GET /payments/{orderId}/qrcode
Authorization: Bearer <access_token>
```

### 查询订单状态
```http
GET /membership/orders/{orderId}
Authorization: Bearer <access_token>
```

---

## 💳 支付管理模块

### 支付方式
- **支付宝** - `alipay`
- **微信支付** - `wechat`
- **银联支付** - `unionpay`

### 创建支付
```http
POST /payments/create
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "orderId": "order_123456",
  "paymentMethod": "alipay",
  "amount": 29.90,
  "currency": "CNY",
  "returnUrl": "https://aibianx.com/payment/success",
  "notifyUrl": "https://api.aibianx.com/v1/payments/notify"
}
```

### 支付回调验证
```http
POST /payments/notify
Content-Type: application/json

{
  "orderId": "order_123456",
  "paymentId": "pay_abcdef",
  "status": "paid",
  "amount": 29.90,
  "currency": "CNY",
  "paidAt": "2024-12-01T10:30:00Z",
  "signature": "payment_signature"
}
```

---

## 📧 邮件订阅模块

### 订阅周刊
```http
POST /newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "categories": ["ai-tools", "monetization"],
  "frequency": "weekly"
}
```

### 取消订阅
```http
POST /newsletter/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "token": "unsubscribe_token"
}
```

### 更新订阅偏好
```http
PUT /newsletter/preferences
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "categories": ["ai-tools", "business"],
  "frequency": "bi-weekly",
  "emailNotifications": true
}
```

---

## 🔍 搜索和筛选

### 高级搜索
```http
GET /search?q=ChatGPT&type=article&category=ai-tools&author=li-mingyang&date_range=30d&membership=free&sort=relevance&page=1&limit=10
```

### 搜索建议
```http
GET /search/suggestions?q=Chat
```

### 热门搜索
```http
GET /search/trending
```

---

## 📊 数据统计模块

### 获取站点统计
```http
GET /stats/site
```

**响应示例**:
```json
{
  "success": true,
  "code": 200,
  "message": "获取成功",
  "data": {
    "stats": {
      "totalArticles": 156,
      "totalUsers": 12580,
      "totalViews": 2580000,
      "totalMembers": 1256,
      "growthRate": {
        "articles": 12.5,
        "users": 25.8,
        "views": 18.9,
        "members": 35.2
      },
      "popularCategories": [
        {"name": "AI工具", "count": 45, "growth": 20.5},
        {"name": "变现心得", "count": 38, "growth": 15.2}
      ],
      "updatedAt": "2024-12-01T00:00:00Z"
    }
  }
}
```

---

## 🚨 错误处理

### 常见错误码
| 错误码 | 含义 | 解决方案 |
|-------|------|----------|
| `AUTH_TOKEN_INVALID` | Token无效 | 重新登录获取新Token |
| `AUTH_TOKEN_EXPIRED` | Token过期 | 使用RefreshToken刷新 |
| `USER_NOT_FOUND` | 用户不存在 | 检查用户ID |
| `ARTICLE_NOT_FOUND` | 文章不存在 | 检查文章ID或slug |
| `MEMBERSHIP_REQUIRED` | 需要会员权限 | 引导用户开通会员 |
| `PAYMENT_FAILED` | 支付失败 | 检查支付参数和状态 |
| `RATE_LIMIT_EXCEEDED` | 请求频率过高 | 减少请求频率 |
| `VALIDATION_ERROR` | 参数验证失败 | 检查请求参数格式 |

### 错误响应示例
```json
{
  "success": false,
  "code": 401,
  "message": "Token无效或已过期",
  "error": {
    "type": "AUTH_TOKEN_INVALID",
    "details": "JWT token signature verification failed",
    "timestamp": "2024-12-01T10:30:00Z"
  }
}
```

---

## 🔒 安全规范

### 接口安全
- **HTTPS加密** - 所有API接口必须使用HTTPS
- **JWT认证** - 使用JWT Token进行用户认证
- **请求签名** - 敏感操作需要请求签名验证
- **IP白名单** - 管理后台接口限制IP访问
- **SQL注入防护** - 所有数据库查询使用预编译语句
- **XSS防护** - 用户输入数据进行转义处理

### 限流规则
| 接口类型 | 限制规则 | 说明 |
|---------|----------|------|
| 登录接口 | 5次/分钟 | 防止暴力破解 |
| 注册接口 | 3次/小时 | 防止恶意注册 |
| 搜索接口 | 100次/分钟 | 防止恶意搜索 |
| 文章接口 | 200次/分钟 | 正常阅读需求 |
| 支付接口 | 10次/分钟 | 支付安全保护 |

---

## 📚 开发规范

### 请求规范
- **Content-Type**: `application/json`
- **User-Agent**: 必须包含客户端信息
- **Request-ID**: 每个请求包含唯一ID，便于追踪
- **API-Version**: 指定API版本，默认v1

### 响应规范
- **统一格式**: 所有响应使用统一的JSON格式
- **状态码**: 正确使用HTTP状态码
- **错误信息**: 提供清晰的错误信息和解决建议
- **国际化**: 支持中英文错误信息

### 版本管理
- **URL版本**: `/v1/`, `/v2/`
- **向后兼容**: 新版本保持向后兼容
- **废弃通知**: 提前3个月通知接口废弃
- **文档更新**: 及时更新API文档

---

## 🚀 部署和运维

### 环境配置
```bash
# 开发环境
NODE_ENV=development
API_URL=http://localhost:8000/v1
DB_URL=mongodb://localhost:27017/aibianx_dev

# 生产环境  
NODE_ENV=production
API_URL=https://api.aibianx.com/v1
DB_URL=mongodb://cluster.mongodb.net/aibianx_prod
```

### 监控指标
- **响应时间** - 99%请求小于200ms
- **可用性** - 99.9%在线时间
- **错误率** - 小于0.1%
- **并发能力** - 支持1000+并发请求

---

## 📞 技术支持

### API调试工具
- **Postman集合** - 提供完整的API测试集合
- **API文档** - 在线交互式文档
- **SDK支持** - JavaScript/TypeScript SDK

### 联系方式
- **技术支持**: api-support@aibianx.com
- **问题反馈**: GitHub Issues
- **开发者群**: 微信群二维码

---

**文档版本**: v1.0  
**最后更新**: 2024年12月  
**维护团队**: AI变现之路后端团队  

*API正在积极开发中，预计2024年12月底上线* 🚀 