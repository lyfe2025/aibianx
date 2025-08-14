# AI变现之路 - Strapi插件使用指南

## 🎯 **当前已安装插件概览**

经过优化后，我们保留了以下稳定且兼容Strapi 5.x的插件：

| 插件名称 | 版本 | 功能描述 | 访问方式 |
|---------|------|----------|----------|
| `@strapi/plugin-documentation` | 5.22.0 | 自动API文档生成 | http://localhost:1337/documentation |
| `@strapi/plugin-seo` | 2.0.8 | SEO增强和Meta标签管理 | 管理面板 > Content Manager |
| `@strapi/plugin-users-permissions` | 5.22.0 | 用户权限和认证管理 | 管理面板 > Settings > Users & Permissions |
| `@strapi/plugin-cloud` | 5.22.0 | Strapi云服务集成 | 管理面板 > Settings > Strapi Cloud |

---

## 📖 **1. Documentation Plugin - API文档生成**

### **功能特性**
- ✅ 自动生成OpenAPI 3.0规范文档
- ✅ 实时API接口文档更新
- ✅ 交互式API测试界面
- ✅ 支持认证和权限测试

### **访问方式**
```
http://localhost:1337/documentation
```

### **使用指南**

#### **访问API文档**
1. 启动Strapi服务器：`npm run dev`
2. 访问文档地址：http://localhost:1337/documentation
3. 浏览所有可用的API端点

#### **测试API接口**
```bash
# 示例：获取文章列表
curl -X GET "http://localhost:1337/api/articles" -H "accept: application/json"

# 示例：获取特定文章
curl -X GET "http://localhost:1337/api/articles/1" -H "accept: application/json"

# 示例：创建文章（需要认证）
curl -X POST "http://localhost:1337/api/articles" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "data": {
      "title": "测试文章",
      "content": "文章内容...",
      "slug": "test-article"
    }
  }'
```

#### **API文档自定义配置**
当前配置位置：`config/plugins.ts`
```typescript
documentation: {
    enabled: true,
    config: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'AI变现之路 API 文档',
            description: 'AI变现之路网站的完整API文档',
            contact: {
                name: 'AI变现之路开发团队',
                email: 'dev@aibianx.com',
            },
        },
    },
}
```

---

## 🎯 **2. SEO Plugin - SEO增强功能**

### **功能特性**
- ✅ 自动Meta标签生成
- ✅ 社交媒体预览优化（Open Graph, Twitter Cards）
- ✅ 搜索引擎优化建议
- ✅ 内容类型SEO字段自动添加

### **使用指南**

#### **为内容添加SEO字段**
1. 登录管理面板：http://localhost:1337/admin
2. 进入 **Content Manager**
3. 选择 **Article**、**Category** 或 **Tag**
4. 创建或编辑内容时，会看到SEO相关字段：

**SEO字段说明：**
- **SEO Title**：搜索引擎显示的标题（建议50-60字符）
- **SEO Description**：搜索结果摘要（建议150-160字符）
- **Keywords**：关键词（用逗号分隔）
- **Canonical URL**：规范化URL
- **Social Share Image**：社交媒体分享图片

#### **SEO最佳实践**

**文章SEO优化：**
```markdown
标题：ChatGPT API咨询机器人搭建指南 - 月入过万实战教程
描述：详细教程：如何利用ChatGPT API搭建付费咨询机器人，包含技术方案、商业模式和变现策略，助你实现AI创业成功。
关键词：ChatGPT API,咨询机器人,AI创业,付费咨询,技术变现
```

**分类SEO优化：**
```markdown
标题：AI工具评测 - 最新人工智能工具深度测评
描述：专业AI工具评测分类，为您提供最新、最全面的人工智能工具深度测评和使用指南。
关键词：AI工具,人工智能工具,工具评测,AI测评
```

#### **查看SEO效果**
- **前端SEO检查**：查看页面源代码的`<head>`标签
- **社交媒体预览**：使用Facebook调试工具或Twitter卡片验证器
- **搜索引擎优化**：使用Google Search Console监控收录情况

---

## 👥 **3. Users & Permissions Plugin - 用户权限管理**

### **功能特性**
- ✅ 用户注册和登录管理
- ✅ 角色和权限精细控制
- ✅ JWT令牌认证
- ✅ 密码重置和邮箱验证
- ✅ OAuth第三方登录支持

### **使用指南**

#### **访问权限管理**
1. 登录管理面板：http://localhost:1337/admin
2. 进入 **Settings** > **Users & Permissions Plugin**

#### **角色管理**

**默认角色：**
- **Authenticated**：已认证用户（登录用户）
- **Public**：公开访问（未登录用户）

**权限配置示例：**
```
Public角色权限（未登录用户）：
✅ Article - find, findOne （可以查看文章）
✅ Category - find, findOne （可以查看分类）
✅ Tag - find, findOne （可以查看标签）
❌ Article - create, update, delete （不能修改文章）

Authenticated角色权限（登录用户）：
✅ Article - find, findOne （可以查看文章）  
✅ Profile - update （可以更新自己的资料）
❌ Article - create, update, delete （仍不能修改文章，除非是作者）
```

#### **API认证使用**

**用户注册：**
```bash
curl -X POST "http://localhost:1337/api/auth/local/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**用户登录：**
```bash
curl -X POST "http://localhost:1337/api/auth/local" \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "test@example.com",
    "password": "password123"
  }'
```

**使用JWT访问受保护资源：**
```bash
curl -X GET "http://localhost:1337/api/users/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## ☁️ **4. Strapi Cloud Plugin - 云服务集成**

### **功能特性**
- ✅ 云端部署管理
- ✅ 自动备份服务
- ✅ 性能监控
- ✅ CDN加速支持

### **使用指南**

#### **访问云服务设置**
1. 登录管理面板：http://localhost:1337/admin
2. 进入 **Settings** > **Strapi Cloud**

**注意**：此插件主要用于Strapi Cloud平台服务，本地开发环境可以忽略。

---

## 🔧 **内置插件使用指南**

### **Upload Plugin - 文件上传**

**功能特性：**
- ✅ 图片上传和管理
- ✅ 文件类型限制
- ✅ 文件大小限制（当前10MB）
- ✅ 媒体库管理

**使用方法：**
1. 管理面板 > **Media Library**
2. 上传图片或文件
3. 在内容中引用媒体文件

**API使用：**
```bash
# 上传文件
curl -X POST "http://localhost:1337/api/upload" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "files=@/path/to/your/image.jpg"
```

### **I18n Plugin - 国际化**

**功能特性：**
- ✅ 多语言内容管理
- ✅ 本地化字段
- ✅ 语言切换支持

**当前配置：**
- 主语言：中文（zh-Hans）
- 支持的内容类型：Article, Category, Tag

---

## 🛠️ **实用功能组合使用**

### **创建多语言SEO友好的文章**

1. **创建文章**：
   - 进入 Content Manager > Article
   - 填写基本信息（标题、内容、摘要）
   - 选择分类和标签

2. **优化SEO**：
   - 填写SEO Title（50-60字符）
   - 填写SEO Description（150-160字符）
   - 设置关键词
   - 上传特色图片

3. **设置权限**：
   - 确保Public角色可以查看（find, findOne）
   - 设置合适的发布权限

4. **验证效果**：
   - 查看API文档：http://localhost:1337/documentation
   - 测试API接口：`GET /api/articles`
   - 验证SEO字段是否正确返回

### **用户认证流程**

1. **配置权限**：
   - Settings > Users & Permissions > Roles
   - 配置Public和Authenticated角色权限

2. **用户注册/登录**：
   - 使用API进行用户注册
   - 获取JWT令牌

3. **访问受保护资源**：
   - 在请求头中添加Authorization
   - 访问需要认证的API接口

---

## 📊 **插件监控和维护**

### **性能监控**
- 定期检查API文档生成时间
- 监控SEO字段的使用情况
- 跟踪用户注册和认证成功率

### **更新维护**
```bash
# 检查插件更新
npm outdated | grep strapi

# 更新插件（谨慎执行）
npm update @strapi/plugin-seo
npm update @strapi/plugin-documentation
```

### **故障排查**
- **API文档无法访问**：检查插件配置和服务器状态
- **SEO字段不显示**：确认内容类型配置正确
- **用户认证失败**：检查JWT配置和权限设置

---

## 🎯 **最佳实践总结**

1. **定期使用API文档测试接口**
2. **为所有内容添加完整的SEO信息**
3. **合理配置用户权限，确保安全性**
4. **定期备份重要配置和数据**
5. **监控插件性能，及时更新版本**

---

**更新记录：**
- 2024-08-15：创建插件使用指南
- 2024-08-15：完成所有当前插件的使用说明
- 2024-08-15：添加实用功能组合和最佳实践
