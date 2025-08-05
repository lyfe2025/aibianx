# 🚀 BillionMail 5分钟快速上手

> **你的理解完全正确！配置超级简单**

---

## 🎯 配置原理（你理解对了）

```
用户注册 → AI变现之路后端 → 调用BillionMail API → BillionMail发送邮件
```

**你只需要做两件事：**
1. 在BillionMail管理界面配置邮箱和模板
2. 获取API Key填入我们的配置文件

---

## ✅ 第一步：启动BillionMail

```bash
# 一键启动（如果还没启动）
./scripts.sh billionmail deploy

# 检查状态
./scripts.sh billionmail check
```

---

## ✅ 第二步：BillionMail管理界面配置

### 访问管理界面
- **地址**：http://localhost:8080/billion
- **用户名**：`billion`
- **密码**：`billion`

### 在管理界面完成这些配置：

#### 1. 添加域名
- 进入"域名管理" → 添加域名：`localhost.test`
- 暂时跳过DNS验证（开发环境）

#### 2. 创建邮箱
- 进入"邮箱管理" → 添加邮箱
- 系统邮箱：`noreply@localhost.test` / 密码：`noreply123`
- 测试邮箱：`test@localhost.test` / 密码：`test123`

#### 3. 获取API密钥
- 进入"API管理" → 生成API密钥
- 复制生成的API Key（类似：`bm_1234567890abcdef`）

#### 4. 创建邮件模板（可选）
- 进入"邮件模板" → 新建模板
- 模板ID：`user_welcome`（用户注册欢迎邮件）
- 模板ID：`email_verification`（邮箱验证邮件）

---

## ✅ 第三步：更新我们项目的API配置

我们的配置文件已经准备好了，你只需要更新一个值：

### 编辑 `backend/.env`：

```bash
# 找到这一行，把API Key替换为你刚才获取的
BILLIONMAIL_API_KEY=bm_1234567890abcdef  # 替换为你的真实API Key
```

**其他配置都已经设置好了！**

---

## ✅ 第四步：重启服务

```bash
# 重启后端服务（让配置生效）
cd backend && npm run develop
```

---

## ✅ 第五步：测试

### 自动测试：
```bash
./scripts/billionmail/quick-test-email.sh
```

### 手动测试：
1. 访问：http://localhost
2. 点击"注册"
3. 使用邮箱：`test@localhost.test`
4. 注册成功后，访问：http://localhost:8080/roundcube
5. 用邮箱和密码登录查看邮件

---

## 🎯 配置文件说明

我们的配置已经很完善了：

```bash
# backend/.env 中的BillionMail配置
BILLIONMAIL_DOMAIN=localhost      # BillionMail服务地址
BILLIONMAIL_PORT=8080            # BillionMail端口
BILLIONMAIL_PROTOCOL=http        # 协议
BILLIONMAIL_API_KEY=你的API密钥   # 👈 只需要更新这个
BILLIONMAIL_DEFAULT_LIST_ID=1    # 默认邮件列表
```

我们的代码会自动组装成：`http://localhost:8080/api/v1`

---

## 🔧 代码工作原理

你不需要关心实现细节，但如果好奇，我们的代码是这样工作的：

```typescript
// 用户注册时，自动调用BillionMail API
await billionMailClient.sendTemplateEmail(
  user.email,          // 收件人
  'user_welcome',      // 模板ID
  {                    // 模板变量
    user_name: user.name,
    site_name: 'AI变现之路'
  }
);
```

**你不需要配置SMTP，不需要配置Nodemailer，一切都通过API完成！**

---

## 🎉 总结

你的理解100%正确：

1. ✅ **BillionMail管理界面**：配置邮箱、模板、获取API Key
2. ✅ **我们的项目**：只需要填入API Key
3. ✅ **用户注册**：自动通过BillionMail API发送邮件

**配置完成后，直接测试用户注册功能即可！**

---

## 📞 如果有问题

```bash
# 一键诊断
./scripts.sh billionmail check

# 查看BillionMail日志
docker logs core-billionmail

# 测试API连接
curl http://localhost:8080/api/v1/health
```

*5分钟配置完成，享受企业级邮件服务！*