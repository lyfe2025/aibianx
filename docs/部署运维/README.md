# 部署运维 🚀

> 📋 **部署文档、运维手册、环境配置**

## 📚 目录说明

本目录包含AI变现之路项目的部署指南、运维手册和环境配置相关文档。

---

## 📁 **文档分类**

### 🎯 **开发执行**
- **[开发执行步骤总览](../当前开发/开发执行步骤总览.md)** - 分阶段开发计划和实施指南
- **[生产环境部署指南](../当前开发/生产环境部署指南.md)** - 完整的生产环境部署方案

### 🏗️ **系统部署**
- **[Strapi CMS核心搭建指南](../当前开发/后台系统/Strapi_CMS核心搭建指南.md)** - Strapi CMS部署指南
- **[BillionMail部署指南](../当前开发/后台系统/邮件营销/BillionMail_部署指南.md)** - 邮件系统部署指南

### 🔧 **脚本管理**
- **[DEV-SCRIPTS.md](../../DEV-SCRIPTS.md)** - 统一脚本管理系统使用指南
- **[scripts/README.md](../../scripts/README.md)** - 脚本分类和使用说明

### 📊 **基础设施**
- **[基础设施文档](../当前开发/基础设施/README.md)** - 基础设施项目部署和运维

---

## 🚀 **快速部署**

### **本地开发环境**
```bash
# 1. 克隆项目
git clone https://github.com/lyfe2025/aibianx.git
cd aibianx

# 2. 设置脚本权限
chmod +x *.sh scripts/**/*.sh

# 3. 启动开发环境
./scripts.sh deploy start
```

### **生产环境部署**
```bash
# 1. 使用一键部署脚本
curl -fsSL https://raw.githubusercontent.com/lyfe2025/aibianx/master/deployment/install.sh | bash

# 2. 或手动部署
./deployment/deploy.sh
```

### **访问地址**
- 🌐 **前端网站**: http://localhost
- ⚙️ **后端管理**: http://localhost:1337/admin
- 📡 **API接口**: http://localhost:1337/api
- 📖 **API文档**: [API-ENDPOINTS.md](../../API-ENDPOINTS.md)

---

## 🛠️ **运维管理**

### **日常运维命令**
```bash
# 查看系统状态
./scripts.sh tools status

# 启动所有服务
./scripts.sh deploy start

# 停止所有服务
./scripts.sh deploy stop

# 重启服务
./scripts.sh deploy restart

# 检查数据库
./scripts.sh db check

# 备份数据库
./scripts.sh db backup
```

### **监控检查**
```bash
# 检查服务进程
ps aux | grep -E "(node|strapi|next)"

# 检查端口占用
lsof -i :80,1337,7700

# 查看系统资源
top
df -h
```

### **日志管理**
```bash
# 查看实时日志
tail -f logs/backend.log
tail -f logs/frontend.log
tail -f logs/search.log

# 查看错误日志
grep -i error logs/*.log

# 日志清理
find logs -name "*.log" -mtime +7 -delete
```

---

## 🔧 **环境配置**

### **必需环境**
- **Node.js**: 18.x+
- **PostgreSQL**: 14.x+
- **Docker**: 用于MeiliSearch和BillionMail
- **Git**: 版本控制

### **环境变量配置**

#### **前端环境变量 (.env.local)**
```bash
# 基础配置
NEXT_PUBLIC_FRONTEND_DOMAIN=localhost
NEXT_PUBLIC_FRONTEND_PORT=80
NEXT_PUBLIC_FRONTEND_PROTOCOL=http

# 后端配置
NEXT_PUBLIC_BACKEND_DOMAIN=localhost
NEXT_PUBLIC_BACKEND_PORT=1337
NEXT_PUBLIC_BACKEND_PROTOCOL=http

# 搜索配置
NEXT_PUBLIC_SEARCH_DOMAIN=localhost
NEXT_PUBLIC_SEARCH_PORT=7700
NEXT_PUBLIC_SEARCH_PROTOCOL=http

# 认证配置
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost
```

#### **后端环境变量 (.env)**
```bash
# 服务配置
BACKEND_DOMAIN=localhost
BACKEND_PORT=1337
BACKEND_PROTOCOL=http

# 数据库配置
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=aibianx_dev
DATABASE_USERNAME=aibianx_dev
DATABASE_PASSWORD=aibianx_password

# 安全配置
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=api-token-salt
ADMIN_JWT_SECRET=admin-jwt-secret
JWT_SECRET=jwt-secret
```

---

## 📊 **系统监控**

### **性能指标**
- **页面加载速度**: < 3秒
- **API响应时间**: < 200ms
- **数据库查询**: < 100ms
- **内存使用**: < 80%
- **磁盘空间**: < 80%

### **监控工具**
- **系统状态**: `./scripts.sh tools status`
- **Google Analytics**: 用户行为分析
- **搜索引擎**: Google Search Console
- **错误监控**: 日志文件分析

### **告警机制**
- **服务异常**: 自动重启
- **磁盘空间**: 80%使用率告警
- **内存使用**: 90%使用率告警
- **错误频率**: 异常错误频率告警

---

## 🔄 **备份恢复**

### **备份策略**
```bash
# 每日自动备份
./scripts.sh db backup

# 完整系统备份
./scripts.sh backup full

# 验证备份文件
./scripts.sh backup verify
```

### **恢复流程**
```bash
# 数据库恢复
./scripts.sh db restore [备份文件]

# 完整系统恢复
./scripts.sh backup restore [备份文件]
```

### **备份文件管理**
- **本地备份**: `backups/` 目录
- **云端备份**: 定期上传到云存储
- **保留策略**: 本地7天，云端30天

---

## 🆘 **故障排除**

### **常见问题**

#### **服务无法启动**
```bash
# 检查端口占用
lsof -i :80,1337,7700

# 杀死占用进程
./scripts.sh deploy stop

# 重新启动
./scripts.sh deploy start
```

#### **数据库连接失败**
```bash
# 检查PostgreSQL状态
systemctl status postgresql

# 启动数据库
sudo systemctl start postgresql

# 测试连接
./scripts.sh db check
```

#### **网站访问异常**
```bash
# 检查Nginx状态
systemctl status nginx

# 重启Nginx
sudo systemctl restart nginx

# 检查配置
nginx -t
```

### **紧急恢复**
```bash
# 快速恢复脚本
./scripts.sh tools emergency-recovery

# 回滚到上一个稳定版本
git checkout HEAD~1
./scripts.sh deploy restart
```

---

## 📋 **维护清单**

### **每日检查**
- [ ] 服务运行状态
- [ ] 系统资源使用
- [ ] 错误日志检查
- [ ] 备份执行状态

### **每周维护**
- [ ] 系统更新检查
- [ ] 日志文件清理
- [ ] 备份文件验证
- [ ] 性能指标分析

### **每月维护**
- [ ] 数据库优化
- [ ] 磁盘空间清理
- [ ] 安全补丁更新
- [ ] 备份策略优化

---

## 🔗 **相关资源**

### **技术文档**
- [架构文档](../架构文档/README.md) - 系统架构设计
- [开发指南](../开发指南/README.md) - 开发规范
- [API文档](../API文档/README.md) - 接口文档

### **外部资源**
- [Docker官方文档](https://docs.docker.com/)
- [PostgreSQL文档](https://www.postgresql.org/docs/)
- [Next.js部署指南](https://nextjs.org/docs/deployment)
- [Strapi部署文档](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/)

---

**🚀 部署运维 - 确保AI变现之路稳定运行！**

**📅 最后更新**: 2024年1月  
**📝 维护团队**: 运维团队  
**🎯 下一步**: 持续优化部署流程和监控体系