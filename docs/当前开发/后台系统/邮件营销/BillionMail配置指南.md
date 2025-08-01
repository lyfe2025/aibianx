# BillionMail 真实系统配置指南

## 🎯 配置概览

BillionMail真实系统已成功部署！现在需要完成初始配置以让我们的网站集成工作。

### 📍 访问信息
- **管理界面**: http://localhost:8080/billion
- **WebMail**: http://localhost:8080/roundcube  
- **默认账户**: `billion` / `billion`

## 🔧 必需完成的配置步骤

### **步骤1: 登录管理界面**
1. 打开浏览器访问：http://localhost:8080/billion
2. 使用账户：`billion` / `billion` 登录

### **步骤2: 获取API密钥**
在管理界面中：
1. 找到 **API设置** 或 **API Keys** 菜单
2. 创建新的API密钥或获取现有密钥  
3. 复制API密钥（类似：`bm_xxxxxxxxxxxxxxxxx`）

### **步骤3: 创建邮件列表**
1. 在管理界面中找到 **邮件列表** 或 **Lists** 菜单
2. 创建新列表：
   - **名称**: `newsletter` 
   - **描述**: 网站订阅用户
3. 记录列表ID（通常是数字，如：`1`）

### **步骤4: 创建邮件模板**
在管理界面中创建以下邮件模板：

#### **A. 邮箱验证模板**
- **模板ID**: `email_verification`
- **名称**: 邮箱验证码
- **变量**: `user_name`, `verification_code`, `expiry_time`, `site_name`, `site_url`
- **示例内容**:
```html
<!DOCTYPE html>
<html>
<head><title>邮箱验证</title></head>
<body>
<h2>{{site_name}} - 邮箱验证</h2>
<p>亲爱的 {{user_name}}，</p>
<p>您的验证码是：<strong style="font-size:24px;color:#007bff;">{{verification_code}}</strong></p>
<p>验证码有效期：{{expiry_time}}</p>
<p>如果您没有请求此验证码，请忽略此邮件。</p>
<p>此致，<br>{{site_name}} 团队</p>
</body>
</html>
```

#### **B. 登录验证模板**  
- **模板ID**: `login_verification`
- **名称**: 登录验证码
- **变量**: `user_name`, `verification_code`, `expiry_time`, `site_name`, `login_time`, `client_ip`

#### **C. 欢迎邮件模板**
- **模板ID**: `welcome_email`
- **名称**: 欢迎新用户
- **变量**: `user_name`, `site_name`, `site_url`, `dashboard_url`, `support_email`

### **步骤5: 配置SMTP设置**
1. 在管理界面中找到 **SMTP设置** 或 **邮件服务器配置**
2. 配置您的SMTP服务商信息（如腾讯企业邮、阿里云邮件等）

## 🔑 更新系统配置

### **后端配置更新**
获得API密钥后，更新 `backend/.env` 文件：

```bash
# 更新API密钥
BILLIONMAIL_API_KEY=您的实际API密钥

# 更新默认列表ID  
BILLIONMAIL_DEFAULT_LIST_ID=您的列表ID
```

### **重启服务**
配置更新后重启后端服务：
```bash
./scripts.sh deploy backend
```

## 🧪 测试集成

### **1. 测试API连接**
```bash
./scripts.sh email check
```

### **2. 测试邮件订阅功能**
在网站前端测试邮箱订阅表单

### **3. 测试验证码发送**
在用户注册流程中测试验证码邮件发送

## 📧 邮箱账户管理

### **WebMail访问**
1. 访问：http://localhost:8080/roundcube
2. 需要先在管理界面创建邮箱账户：
   - 设置域名（如：`aibianx.local`）
   - 创建邮箱用户（如：`admin@aibianx.local`）
   - 设置密码
3. 用创建的邮箱账户登录WebMail

## 🔍 故障排查

### **API调用失败**
- 检查API密钥是否正确
- 确认API路径为 `/api/v1`
- 查看BillionMail服务日志：`./scripts.sh email logs`

### **邮件发送失败**  
- 检查SMTP配置是否正确
- 确认邮件模板是否已创建
- 查看邮件服务日志

### **服务状态检查**
```bash
./scripts.sh email check
```

## 📝 当前系统状态

### ✅ 已完成
- [x] BillionMail真实系统部署
- [x] 前端后端配置文件更新  
- [x] API路径调整为 `/api/v1`
- [x] 脚本系统集成

### ⏳ 待完成
- [ ] 管理界面初始配置
- [ ] API密钥获取和配置
- [ ] 邮件模板创建
- [ ] 集成测试验证

## 🆘 需要帮助？

如果在配置过程中遇到问题：
1. 查看BillionMail官方文档
2. 检查容器日志：`./scripts.sh email logs`
3. 检查服务状态：`./scripts.sh email check`
4. 重启服务：`./scripts.sh email restart`

---

**下一步**: 请按照上述步骤完成BillionMail管理界面配置，获取API密钥后我们将进行最终的集成测试。