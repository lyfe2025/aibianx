# 01 - BillionMail邮件系统配置

> **第一步：配置企业级邮件系统**

---

## 🎯 配置原理

```
用户注册 → AI变现之路后端 → 调用BillionMail API → BillionMail发送邮件
```

**简单配置：**
1. 在BillionMail管理界面配置邮箱和模板
2. 获取API Key填入我们的配置文件

---

## ✅ 步骤1：启动BillionMail

```bash
# 一键启动
./scripts.sh billionmail deploy

# 检查状态
./scripts.sh billionmail check
```

---

## ✅ 步骤2：BillionMail管理界面配置

### 访问管理界面
- **地址**：http://localhost:8080/billion
- **用户名**：`billion`
- **密码**：`billion`

### 配置步骤：

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

#### 4. 创建邮件模板
- 进入"邮件模板" → 新建模板
- 模板ID：`user_welcome`（用户注册欢迎邮件）
- 模板ID：`email_verification`（邮箱验证邮件）

---

## ✅ 步骤3：更新API配置

### 编辑 `backend/.env`：

```bash
# 找到这一行，把API Key替换为你刚才获取的
BILLIONMAIL_API_KEY=bm_1234567890abcdef  # 替换为你的真实API Key
```

**其他配置都已经设置好了！**

---

## ✅ 步骤4：验证配置

```bash
# 一键验证配置
./scripts/billionmail/validate-config.sh

# 快速测试邮件发送
./scripts/billionmail/quick-test-email.sh
```

---

## ✅ 步骤5：测试用户注册邮件

### 手动测试：
1. 重启后端：`cd backend && npm run develop`
2. 访问：http://localhost
3. 点击"注册"，使用邮箱：`test@localhost.test`
4. 访问：http://localhost:8080/roundcube 查收邮件

---

## 🎯 配置完成标志

- ✅ BillionMail服务正常运行
- ✅ 管理界面可以访问
- ✅ API Key已配置
- ✅ 测试邮件发送成功
- ✅ 用户注册邮件正常

**完成后进入下一步：搜索引擎配置**