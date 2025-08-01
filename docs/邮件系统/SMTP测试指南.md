# SMTP配置测试指南

## 🎯 概述

AI变现之路项目提供了**四种方式**来测试SMTP配置，满足不同使用场景的需求：

1. **🏢 Admin后台集成**（最推荐） - 在Strapi管理后台直接测试
2. **🌐 Web界面测试**（推荐） - 独立的图形化界面，最便捷
3. **📱 交互式脚本** - 命令行交互式菜单
4. **⌨️ 命令行工具** - 直接命令行操作

---

## 🏢 方式一：Admin后台集成（最推荐）

### 快速访问
1. **登录Admin后台** - 访问 [http://localhost:1337/admin](http://localhost:1337/admin)
2. **查看侧边栏菜单** - 寻找"SMTP测试"菜单项 📧
3. **一键启动测试** - 点击菜单项会自动打开SMTP测试界面

### 功能特点
- ✅ **无缝集成** - 直接在Admin界面中访问，无需切换页面
- ✅ **权限控制** - 仅管理员可以访问
- ✅ **快速跳转** - 一键打开专业的测试界面
- ✅ **统一管理** - 与其他SMTP配置管理功能集成

### 操作步骤
1. 在Admin界面管理SMTP配置
2. 使用侧边栏的"SMTP测试"功能进行验证
3. 在新标签页中进行详细测试
4. 返回Admin界面查看更新后的配置状态

---

## 🌐 方式二：Web界面测试（推荐）

### 快速启动
```bash
# 方法1: 命令行启动
./scripts.sh email web

# 方法2: 交互式菜单
./scripts.sh
# 选择 18) 打开SMTP测试Web界面

# 方法3: 直接访问
# 打开浏览器访问: http://localhost:1337/api/smtp-test
```

### 功能特点
- ✅ **实时配置列表** - 显示所有SMTP配置和状态
- ✅ **一键连接测试** - 快速验证SMTP服务器连接
- ✅ **测试邮件发送** - 发送真实邮件验证完整流程
- ✅ **健康状态监控** - 实时查看配置健康状态
- ✅ **美观用户界面** - 响应式设计，支持移动端
- ✅ **自动状态更新** - 测试后自动刷新配置状态

### 使用步骤
1. 访问 http://localhost:1337/api/smtp-test
2. 查看当前所有SMTP配置列表
3. 选择要测试的配置
4. 点击"仅测试连接"进行快速验证
5. 或输入邮箱地址，点击"发送测试邮件"进行完整测试
6. 查看实时测试结果和配置状态更新

---

## 📱 方式三：交互式脚本

### 启动方式
```bash
./scripts.sh
```

### 可用选项
- **16) 测试SMTP配置** - 交互式选择配置ID和测试邮箱
- **17) 查看SMTP配置列表** - 显示所有配置状态
- **18) 打开SMTP测试Web界面** - 启动浏览器Web界面

---

## ⌨️ 方式四：命令行工具

### 基本命令
```bash
# 查看帮助
./scripts.sh email

# 仅测试连接
./scripts.sh email test <config-id>

# 测试连接并发送邮件
./scripts.sh email test <config-id> <test-email>

# 查看配置列表
./scripts.sh email list

# 打开Web界面
./scripts.sh email web
```

### 使用示例
```bash
# 仅测试ID为1的SMTP配置连接
./scripts.sh email test 1

# 测试连接并发送邮件到指定地址
./scripts.sh email test 1 test@example.com

# 查看所有SMTP配置列表
./scripts.sh email list

# 打开Web测试界面
./scripts.sh email web
```

---

## 🔧 高级功能

### API端点直接调用
```bash
# 测试连接
curl -X POST http://localhost:1337/api/smtp-configs/1/test \
  -H "Content-Type: application/json" \
  -d '{}'

# 测试连接并发送邮件
curl -X POST http://localhost:1337/api/smtp-configs/1/test \
  -H "Content-Type: application/json" \
  -d '{"testEmail": "test@example.com"}'

# 健康检查
curl -X POST http://localhost:1337/api/smtp-configs/1/health-check

# 重置统计
curl -X POST http://localhost:1337/api/smtp-configs/1/reset-stats \
  -H "Content-Type: application/json" \
  -d '{"type": "daily"}'
```

### 专用测试脚本
```bash
# 直接使用测试脚本
./scripts/email/test-smtp.sh 1
./scripts/email/test-smtp.sh 1 test@example.com

# 设置管理员Token（命令行查看配置列表时需要）
export STRAPI_ADMIN_TOKEN="your-admin-jwt-token"
```

---

## 🎯 测试结果说明

### 健康状态
- **🟢 healthy** - 配置正常，可以正常发送邮件
- **🟡 warning** - 配置有问题但仍可使用
- **🔴 error** - 配置错误，无法发送邮件
- **⚪ unknown** - 未测试或测试中

### 测试成功后系统会自动：
- ✅ 更新配置的健康状态为'healthy'
- ✅ 重置错误计数为0
- ✅ 记录最后健康检查时间
- ✅ 记录最后使用时间

### 测试失败时系统会：
- ❌ 更新配置的健康状态为'error'
- ❌ 增加错误计数
- ❌ 记录最后健康检查时间
- ❌ 连续失败达到上限时自动禁用配置

---

## 🛠️ 故障排查

### 常见问题
1. **连接超时** - 检查网络和防火墙设置
2. **认证失败** - 验证用户名密码是否正确
3. **端口错误** - 确认SMTP端口配置正确
4. **SSL/TLS错误** - 检查安全连接设置

### 排查步骤
1. 使用Web界面进行可视化测试
2. 查看详细错误信息
3. 检查服务器日志：`tail -f logs/backend.log`
4. 验证SMTP服务器设置
5. 联系邮件服务提供商确认配置

---

## 💡 最佳实践

### 推荐使用顺序
1. **日常管理** - 在Admin后台中直接使用SMTP测试功能
2. **首次配置** - 使用独立Web界面进行全面测试
3. **快速检查** - 使用交互式脚本快速验证
4. **自动化集成** - 使用命令行工具或API

### 测试策略
- ✅ 配置完成后立即测试连接
- ✅ 定期进行健康检查
- ✅ 重要邮件发送前先测试
- ✅ 监控错误计数和状态变化

---

## 📞 技术支持

如遇到问题，请：
1. 查看Web界面的详细错误信息
2. 检查后端日志文件
3. 确认SMTP服务商设置
4. 联系系统管理员

---

**🎉 现在你已经掌握了所有SMTP测试方法！最推荐在Admin后台中直接使用SMTP测试功能，无缝集成，方便快捷！**