# BillionMail SMTP配置与前台测试完整指引

## 📋 概述

本文档提供BillionMail系统的SMTP邮件服务配置和前台功能测试的完整指引，帮助您快速配置邮件服务并验证所有集成功能。

---

## 🔧 第一步：SMTP邮件服务配置

### 1.1 BillionMail SMTP基础配置

#### 访问BillionMail管理界面
```bash
# 启动BillionMail服务
./scripts.sh billionmail start

# 访问管理界面
http://localhost:8080/admin
```

#### SMTP服务器配置参数
```yaml
# 推荐的SMTP服务商配置

# 1. 腾讯企业邮箱
SMTP_HOST: smtp.exmail.qq.com
SMTP_PORT: 465
SMTP_SECURE: true (SSL)
SMTP_AUTH_USER: your-email@your-domain.com
SMTP_AUTH_PASS: your-email-password

# 2. 阿里云邮箱
SMTP_HOST: smtp.mxhichina.com  
SMTP_PORT: 465
SMTP_SECURE: true (SSL)
SMTP_AUTH_USER: your-email@your-domain.com
SMTP_AUTH_PASS: your-email-password

# 3. Gmail (开发测试用)
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587
SMTP_SECURE: false (STARTTLS)
SMTP_AUTH_USER: your-gmail@gmail.com
SMTP_AUTH_PASS: app-specific-password

# 4. 163邮箱 (国内测试用)
SMTP_HOST: smtp.163.com
SMTP_PORT: 465
SMTP_SECURE: true (SSL)
SMTP_AUTH_USER: your-email@163.com
SMTP_AUTH_PASS: authorization-code
```

### 1.2 BillionMail配置步骤

#### Step 1: 配置SMTP设置
1. 登录BillionMail管理界面
2. 进入 **系统设置** → **邮件配置**
3. 填写SMTP服务器信息：
   ```
   SMTP服务器: smtp.exmail.qq.com
   端口: 465
   加密方式: SSL
   用户名: your-email@your-domain.com
   密码: your-email-password
   发件人名称: AI变现之路
   发件人邮箱: noreply@your-domain.com
   ```

#### Step 2: 测试SMTP连接
```bash
# 在BillionMail管理界面点击"测试连接"
# 或使用命令行测试
./scripts/billionmail/test-smtp-connection.sh
```

#### Step 3: 配置邮件模板
创建以下必需的邮件模板：

**1. 注册验证码模板 (ID: email_verification)**
```html
<h2>邮箱验证码</h2>
<p>亲爱的 {{user_name}}，</p>
<p>您的邮箱验证码是：<strong style="font-size: 24px; color: #3B82F6;">{{verification_code}}</strong></p>
<p>验证码有效期：{{expiry_time}}</p>
<p>如果您没有请求此验证码，请忽略此邮件。</p>
<hr>
<p>{{site_name}}<br>{{site_url}}</p>
```

**2. 登录验证码模板 (ID: login_verification)**  
```html
<h2>登录验证码</h2>
<p>亲爱的 {{user_name}}，</p>
<p>您的登录验证码是：<strong style="font-size: 24px; color: #3B82F6;">{{verification_code}}</strong></p>
<p>验证码有效期：{{expiry_time}}</p>
<p>登录时间：{{login_time}}</p>
<p>如果不是您本人操作，请立即修改密码。</p>
<hr>
<p>{{site_name}}<br>{{site_url}}</p>
```

**3. 欢迎邮件模板 (ID: user_welcome)**
```html
<h2>欢迎加入AI变现之路！</h2>
<p>亲爱的 {{user_name}}，</p>
<p>欢迎加入{{site_name}}社区！我们很高兴您成为我们的一员。</p>
<p>在这里，您可以：</p>
<ul>
  <li>🎯 学习最新的AI变现技巧</li>
  <li>💡 获取独家的行业洞察</li>  
  <li>🤝 与同行交流经验心得</li>
  <li>🚀 获得实战项目指导</li>
</ul>
<p><a href="{{dashboard_url}}" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">立即开始探索 →</a></p>
<p>如有任何问题，请联系我们：{{support_email}}</p>
<hr>
<p>{{site_name}}<br>{{site_url}}</p>
```

### 1.3 环境变量配置

#### 后端环境变量配置
在 `backend/.env` 中添加：
```env
# BillionMail配置
BILLIONMAIL_API_URL=http://localhost:8080/api/v1
BILLIONMAIL_API_KEY=your_billionmail_api_key
BILLIONMAIL_DEFAULT_LIST_ID=newsletter
BILLIONMAIL_ADMIN_URL=http://localhost:8080/admin

# SMTP配置（如果BillionMail需要）
SMTP_HOST=smtp.exmail.qq.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@your-domain.com
SMTP_PASS=your-email-password
```

#### 前端环境变量配置  
在 `frontend/.env.local` 中添加：
```env
# BillionMail前端配置
NEXT_PUBLIC_BILLIONMAIL_API_URL=http://localhost:8081/api
NEXT_PUBLIC_BILLIONMAIL_PROTOCOL=http
NEXT_PUBLIC_BILLIONMAIL_DOMAIN=localhost
NEXT_PUBLIC_BILLIONMAIL_PORT=8081
```

---

## 🧪 第二步：前台功能测试

### 2.1 准备测试环境

#### 启动完整开发环境
```bash
# 1. 启动后端服务
cd backend
npm run develop

# 2. 启动前端服务  
cd frontend
npm run dev

# 3. 启动BillionMail服务
./scripts.sh billionmail start

# 4. 检查所有服务状态
./scripts.sh tools status
```

#### 验证服务可用性
```bash
# 检查BillionMail健康状态
curl http://localhost:8080/api/v1/health

# 检查Strapi后端
curl http://localhost:1337/api/articles

# 检查前端
curl http://localhost:3000
```

### 2.2 邮箱验证码功能测试

#### 测试场景1：用户注册验证码
1. **访问注册页面**
   ```
   http://localhost:3000/register
   ```

2. **输入测试邮箱**
   - 使用您配置的SMTP邮箱域名的邮箱
   - 例如：test@your-domain.com

3. **点击"发送验证码"**
   - 观察按钮变为倒计时状态
   - 检查浏览器开发者工具Network面板
   - 确认API调用 `/api/auth/send-verification` 成功

4. **检查邮箱**
   - 查看收件箱是否收到验证码邮件
   - 验证邮件模板格式是否正确
   - 确认验证码为6位数字

5. **输入验证码**
   - 在注册表单中输入收到的验证码
   - 完成用户注册流程
   - 验证注册成功提示

#### 测试场景2：登录验证码
1. **访问登录页面**
   ```
   http://localhost:3000/login
   ```

2. **选择邮箱验证码登录**
   - 输入已注册的邮箱
   - 点击"发送登录验证码"

3. **验证邮件接收和内容**
   - 确认登录验证码邮件模板
   - 验证码5分钟有效期提示
   - 包含登录时间等安全信息

### 2.3 邮件订阅功能测试

#### 测试场景3：首页邮件订阅
1. **访问首页**
   ```
   http://localhost:3000
   ```

2. **找到邮件订阅组件**
   - 通常在首页底部或侧边栏
   - 输入测试邮箱地址

3. **提交订阅**
   - 点击"订阅"按钮
   - 观察成功提示信息
   - 确认API调用 `/api/email-subscription/subscribe` 成功

4. **验证后台数据**
   ```bash
   # 检查BillionMail中的订阅者
   # 访问BillionMail管理界面查看订阅列表
   ```

5. **测试重复订阅**
   - 使用相同邮箱再次订阅
   - 验证系统提示"已经订阅过了"

#### 测试场景4：取消订阅
1. **获取取消订阅链接**
   - 从欢迎邮件或订阅确认邮件中找到
   - 或直接访问 `/unsubscribe?email=test@domain.com`

2. **执行取消订阅**
   - 点击取消订阅链接
   - 确认取消订阅成功提示

3. **验证取消状态**
   - 检查BillionMail中订阅者状态
   - 尝试重新订阅确认可以再次订阅

### 2.4 OAuth登录邮件测试

#### 测试场景5：GitHub登录
1. **配置GitHub OAuth**
   - 确认GitHub OAuth应用配置正确
   - 回调URL: `http://localhost:3000/api/auth/callback/github`

2. **执行GitHub登录**
   ```
   http://localhost:3000/login
   ```
   - 点击"GitHub登录"
   - 完成OAuth授权流程

3. **验证自动订阅**
   - 新GitHub用户应自动订阅邮件列表
   - 收到OAuth欢迎邮件
   - 检查用户标签包含 `oauth_github`

#### 测试场景6：Google登录
1. **配置Google OAuth**
   - 确认Google OAuth客户端配置
   - 回调URL: `http://localhost:3000/api/auth/callback/google`

2. **执行测试流程**
   - 与GitHub登录类似
   - 验证自动订阅和欢迎邮件

### 2.5 业务邮件通知测试

#### 测试场景7：邀请返佣邮件
1. **创建邀请链接**
   - 使用已有用户的邀请码
   - 构造邀请链接：`http://localhost:3000/register?invite=INVITE_CODE`

2. **邀请用户注册**
   - 通过邀请链接注册新用户
   - 验证邀请关系建立成功

3. **邀请用户首次付费**
   - 模拟订单支付流程
   - 验证邀请人收到返佣通知邮件

#### 测试场景8：购买确认邮件
1. **模拟购买流程**
   - 选择商品并完成支付
   - 确认支付成功回调处理

2. **验证购买确认邮件**
   - 检查邮件包含订单信息
   - 确认金额、商品名称等详情正确

---

## 🔍 第三步：问题排查指南

### 3.1 常见问题及解决方案

#### 问题1：验证码邮件发送失败
**症状**：点击发送验证码后无响应或报错

**排查步骤**：
```bash
# 1. 检查BillionMail服务状态
./scripts/billionmail/check-billionmail.sh

# 2. 查看BillionMail日志
docker logs billionmail-core

# 3. 测试SMTP连接
./scripts/billionmail/test-smtp.sh

# 4. 检查后端日志
cd backend && npm run develop
# 观察控制台邮件发送相关日志
```

**解决方案**：
- 确认SMTP配置正确
- 检查邮箱密码（可能需要应用专用密码）
- 验证防火墙设置
- 确认邮箱服务商SMTP设置

#### 问题2：邮件模板变量未替换
**症状**：收到的邮件显示 `{{user_name}}` 等原始变量

**排查步骤**：
1. 检查BillionMail模板配置
2. 验证API调用时的变量传递
3. 查看BillionMail模板引擎日志

**解决方案**：
- 在BillionMail中重新保存邮件模板
- 确认变量名称拼写正确
- 检查模板语法格式

#### 问题3：订阅用户未同步到BillionMail
**症状**：本地数据库有订阅记录，但BillionMail中没有

**排查步骤**：
```bash
# 检查API密钥配置
echo $BILLIONMAIL_API_KEY

# 测试BillionMail API连接  
curl -H "Authorization: Bearer $BILLIONMAIL_API_KEY" \
     http://localhost:8080/api/v1/health

# 查看订阅API日志
cd backend && npm run develop
# 观察订阅相关API调用日志
```

**解决方案**：
- 验证API密钥正确性
- 检查网络连接
- 确认BillionMail API版本兼容性

### 3.2 日志查看和调试

#### 后端调试日志
```bash
# Strapi开发模式（显示详细日志）
cd backend
npm run develop

# 查看特定模块日志
DEBUG=strapi:* npm run develop
```

#### BillionMail日志
```bash
# 查看BillionMail核心服务日志
docker logs billionmail-core -f

# 查看邮件发送日志
docker logs billionmail-postfix -f

# 查看数据库日志
docker logs billionmail-postgresql -f
```

#### 前端调试
```bash
# 前端开发模式
cd frontend  
npm run dev

# 查看浏览器网络面板
# 检查API调用和响应状态
```

### 3.3 性能监控

#### 邮件发送性能测试
```bash
# 批量测试邮件发送
./scripts/test/test-email-performance.sh

# 监控BillionMail性能
./scripts/billionmail/monitor-performance.sh
```

#### API响应时间监控
```bash
# 测试验证码API响应时间
curl -w "@curl-format.txt" -o /dev/null -s \
     "http://localhost:3000/api/auth/send-verification" \
     -d '{"email":"test@example.com","type":"register"}' \
     -H "Content-Type: application/json"
```

---

## 📊 第四步：测试验证清单

### 4.1 功能测试清单

- [ ] **SMTP配置测试**
  - [ ] SMTP连接测试成功
  - [ ] 邮件模板配置完成
  - [ ] 发件人信息正确

- [ ] **邮箱验证码功能**
  - [ ] 注册验证码发送成功
  - [ ] 登录验证码发送成功
  - [ ] 验证码格式正确（6位数字）
  - [ ] 验证码有效期控制正常
  - [ ] 频率限制生效（1分钟1次）

- [ ] **邮件订阅功能**
  - [ ] 首页订阅表单正常
  - [ ] 重复订阅检测正常
  - [ ] 取消订阅功能正常
  - [ ] 订阅确认邮件发送

- [ ] **OAuth登录邮件**
  - [ ] GitHub登录自动订阅
  - [ ] Google登录自动订阅  
  - [ ] OAuth欢迎邮件发送
  - [ ] 用户标签正确设置

- [ ] **业务邮件通知**
  - [ ] 购买确认邮件
  - [ ] 邀请返佣通知邮件
  - [ ] 会员升级通知邮件

### 4.2 技术测试清单

- [ ] **API集成测试**
  - [ ] 前端API调用正常
  - [ ] 后端服务响应正常
  - [ ] 错误处理机制正常
  - [ ] 日志记录完整

- [ ] **数据同步测试**
  - [ ] 本地数据库同步正常
  - [ ] BillionMail数据同步正常
  - [ ] 订阅状态一致性正常

- [ ] **性能测试**
  - [ ] 邮件发送延迟可接受（<3秒）
  - [ ] API响应时间正常（<1秒）
  - [ ] 并发处理能力满足需求

### 4.3 用户体验测试清单

- [ ] **界面交互**
  - [ ] 发送验证码按钮倒计时正常
  - [ ] 成功/错误提示清晰
  - [ ] 加载状态显示友好

- [ ] **邮件体验**
  - [ ] 邮件标题吸引人
  - [ ] 邮件内容格式美观
  - [ ] 移动端显示正常
  - [ ] 退订链接有效

---

## 🚀 第五步：生产环境部署准备

### 5.1 生产环境配置调整

#### 域名和SSL配置
```env
# 生产环境变量配置
NEXT_PUBLIC_BILLIONMAIL_PROTOCOL=https
NEXT_PUBLIC_BILLIONMAIL_DOMAIN=mail.yourdomain.com
NEXT_PUBLIC_BILLIONMAIL_PORT=443

BILLIONMAIL_API_URL=https://mail.yourdomain.com/api/v1
BILLIONMAIL_ADMIN_URL=https://mail.yourdomain.com/admin
```

#### SMTP生产配置
```yaml
# 推荐生产环境SMTP配置
SMTP_HOST: smtp.yourdomain.com  # 使用自有域名SMTP
SMTP_PORT: 587
SMTP_SECURE: STARTTLS
SMTP_AUTH_USER: noreply@yourdomain.com
SMTP_AUTH_PASS: strong-password
```

### 5.2 性能优化配置

#### 邮件发送队列配置
- 配置邮件发送队列，避免阻塞主业务
- 设置合理的重试机制
- 配置邮件发送频率限制

#### 监控和告警
```bash
# 设置邮件服务监控
./scripts/production/setup-monitoring.sh

# 配置告警通知
./scripts/production/setup-alerts.sh
```

### 5.3 安全配置

#### API密钥安全
- 使用环境变量存储敏感信息
- 定期轮换API密钥
- 限制API访问IP白名单

#### 邮件安全
- 配置SPF、DKIM、DMARC记录
- 使用专用发件域名
- 监控邮件送达率

---

## 📞 技术支持

### 遇到问题时的联系方式

1. **查看项目文档**：`docs/` 目录下的相关文档
2. **检查系统日志**：使用本文档的调试指南
3. **社区支持**：项目GitHub Issues
4. **紧急支持**：技术团队邮箱

### 相关资源链接

- [BillionMail官方文档](https://billionmail.org/docs)
- [Strapi邮件插件文档](https://docs.strapi.io/dev-docs/plugins/email)
- [Next.js API路由文档](https://nextjs.org/docs/api-routes/introduction)

---

**文档版本**：v1.0  
**更新时间**：2025年1月5日  
**适用版本**：AI变现之路 v2.0+

---

🎯 **使用此文档，您将能够完成BillionMail的SMTP配置，并全面测试所有邮件相关功能，确保系统在生产环境中的稳定运行！**