# GitHub OAuth配置指南

> **适用场景**：AI变现之路项目线上部署时的GitHub第三方登录配置

---

## 🎯 **配置目的**

为AI变现之路网站启用GitHub OAuth第三方登录，允许用户使用GitHub账号快速注册和登录。

---

## 🔧 **配置步骤**

### **第一步：创建GitHub OAuth应用**

1. **访问GitHub开发者设置**
   - 前往 https://github.com/settings/developers
   - 点击 "OAuth Apps" 标签
   - 点击 "New OAuth App" 按钮

2. **填写应用信息**
   ```
   Application name: AI变现之路 (或 AI Monetization Hub)
   Homepage URL: https://your-domain.com
   Application description: AI变现知识分享平台，助力AI技术商业化
   Authorization callback URL: https://your-domain.com/api/auth/callback/github
   ```

3. **重要配置项说明**
   - **Application name**: 用户授权时显示的应用名称
   - **Homepage URL**: 必须是线上正式域名，不能是localhost
   - **Authorization callback URL**: NextAuth.js标准回调地址，必须精确匹配

### **第二步：获取OAuth凭据**

1. **保存Client ID和Secret**
   - 创建应用后，GitHub会生成 `Client ID`（公开）
   - 点击 "Generate a new client secret" 生成 `Client Secret`（保密）

2. **安全提醒**
   - `Client Secret` 只显示一次，务必立即保存
   - 不要将Secret提交到版本控制系统

### **第三步：配置环境变量**

更新生产环境的环境变量配置：

```bash
# GitHub OAuth配置
GITHUB_CLIENT_ID=你的实际Client_ID
GITHUB_CLIENT_SECRET=你的实际Client_Secret

# NextAuth配置  
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=生产环境用的安全密钥（至少32字符）
```

### **第四步：NextAuth Secret生成**

```bash
# 生成安全的NextAuth密钥
openssl rand -base64 32

# 或使用在线工具
# https://generate-secret.vercel.app/32
```

---

## 🔒 **安全最佳实践**

### **环境变量管理**
- 开发环境：使用 `.env.local`
- 生产环境：使用平台环境变量配置（Vercel、Netlify等）
- 永远不要将Secret硬编码到代码中

### **域名配置**
- **开发环境**：`http://localhost:3000`
- **生产环境**：`https://your-actual-domain.com`
- **回调URL必须精确匹配**，包括协议(http/https)

### **用户权限**
- GitHub OAuth默认请求用户的基本信息（用户名、邮箱、头像）
- 如需额外权限，在NextAuth配置中修改scope

---

## 🧪 **测试验证**

### **功能测试清单**
- [ ] GitHub登录按钮正常显示
- [ ] 点击登录跳转到GitHub授权页面
- [ ] 授权后正确跳转回网站
- [ ] 用户信息正确显示（姓名、头像、邮箱）
- [ ] 登出功能正常工作
- [ ] Session状态正确持久化

### **常见问题排查**
1. **回调URL不匹配** - 检查GitHub应用配置与环境变量
2. **Client Secret错误** - 重新生成并更新环境变量
3. **CORS错误** - 确认域名配置正确
4. **Session问题** - 检查NEXTAUTH_SECRET配置

---

## 📚 **相关文档**

- [NextAuth.js GitHub Provider](https://next-auth.js.org/providers/github)
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps)
- [AI变现之路认证系统文档](../用户认证/README.md)

---

**配置负责人**：开发团队  
**最后更新**：2025年1月3日  
**版本**：v1.0