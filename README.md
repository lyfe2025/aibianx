# 🚀 AI变现之路 - 极简部署版

> **基于统一配置的极简化全栈项目管理系统**

## 📋 项目概述

AI变现之路是一个现代化的全栈Web应用，提供内容管理、搜索、邮件营销等完整功能。采用**极简配置方式**，只需要配置一个文件就能完成整个系统的部署。

## 🎯 **极简特色**

- ✅ **一个配置文件** - 只需配置 `deployment/config/deploy.conf`
- ✅ **一键自动部署** - 自动从备份恢复数据和文件
- ✅ **智能版本管理** - 自动选择最新备份或指定版本
- ✅ **完整功能集成** - 前端+后端+搜索+邮件系统
- ✅ **零配置错误** - 全自动化配置生成

## 🔧 技术栈

### **前端**
- **Next.js 14** + TypeScript
- **纯CSS变量系统** + 毛玻璃效果
- **Zustand** 状态管理
- **响应式设计** (1440px设计稿)

### **后端**
- **Strapi 5.20.0** + TypeScript
- **PostgreSQL** 数据库
- **RESTful API** + OpenAPI文档

### **基础设施**
- **Docker + Docker Compose** 容器编排
- **MeiliSearch** 搜索引擎
- **BillionMail** 邮件营销系统
- **Redis** 缓存

## 🚀 **极简快速开始**

### **一键部署命令**
```bash
# 一键安装和部署 (推荐)
bash <(curl -s https://raw.githubusercontent.com/你的用户名/aibianx/master/scripts/bootstrap.sh)
```

### **手动部署流程**

#### **Step 1: 克隆项目**
```bash
git clone https://github.com/你的用户名/aibianx.git
cd aibianx
```

#### **Step 2: 配置唯一文件**
```bash
# 编辑唯一的配置文件
vim deployment/config/deploy.conf
```

配置内容示例：
```bash
# 🌐 部署配置
DEPLOY_MODE=dev                     # dev | production
DOMAIN=localhost                    # 域名
MAIL_DOMAIN=localhost              # 邮件域名

# 🔐 管理员密码
DB_ADMIN_PASSWORD=aibianx_2024     # 数据库密码
BILLIONMAIL_USERNAME=admin         # 邮件系统用户名
BILLIONMAIL_PASSWORD=billionmail2024 # 邮件系统密码

# 🗄️ 备份恢复配置
BACKUP_VERSION=latest              # 自动使用最新备份版本

# 🚀 自动化开关
AUTO_RESTORE_BACKUP=true           # 自动从备份恢复数据
AUTO_DEPLOY_SEARCH=true            # 自动部署搜索引擎
AUTO_DEPLOY_EMAIL=true             # 自动部署邮件系统
```

#### **Step 3: 一键配置**
```bash
# 自动配置并恢复数据
./scripts.sh deploy config
```

#### **Step 4: 启动系统**
```bash
# 启动完整环境
./scripts.sh deploy start
```

## 🌐 **系统访问地址**

部署完成后，访问以下地址：

- **🌐 前端网站**: http://localhost
- **⚙️ 后端管理**: http://localhost:1337/admin  
- **🔍 搜索管理**: http://localhost:7700
- **📧 邮件管理**: http://localhost:8080

## 📁 **项目结构**

```
aibianx/
├── deployment/
│   └── config/
│       └── deploy.conf          # 📁 唯一配置文件
├── backups/                     # 📦 备份目录
│   ├── strapi_backup_latest/    # 解压后的备份
│   └── *.tar.gz                # 压缩包备份
├── frontend/                    # 🌐 Next.js前端
├── backend/                     # ⚙️ Strapi后端
├── scripts/                     # 🔧 管理脚本
│   └── tools/
│       └── simple-deploy.sh     # 极简部署脚本
├── scripts.sh                   # 🚀 主管理入口
└── docs/                       # 📚 项目文档
```

## 🔧 **常用命令**

```bash
# 🔧 配置管理
./scripts.sh deploy config      # 极简一键配置
./scripts.sh deploy start       # 启动完整环境
./scripts.sh deploy stop        # 停止所有服务

# 📦 备份管理
./scripts.sh backup list        # 查看可用备份
./scripts.sh backup create      # 创建新备份
./scripts.sh backup restore     # 从备份恢复

# 🛠️ 开发工具
./scripts.sh tools status       # 系统状态检查
./scripts.sh tools check        # 代码质量检查

# 🔍 搜索管理
./scripts.sh search manage      # 搜索引擎管理
./scripts.sh search check       # 检查搜索状态

# 📧 邮件管理
./scripts.sh email check        # 检查邮件系统
./scripts.sh email admin        # 打开邮件管理界面
```

## 📚 **文档导航**

- 📖 **[极简部署指南](docs/部署运维/极简部署指南.md)** - 详细的部署说明
- 🏗️ **[架构设计文档](docs/架构文档/)** - 技术架构和设计方案
- 🔧 **[开发指南](docs/开发指南/)** - 开发规范和最佳实践
- 📊 **[API文档](docs/API文档/)** - 接口文档和使用说明
- 🛠️ **[问题解决](docs/问题解决/)** - 常见问题和解决方案

## 🔐 **管理员账号**

### **Strapi后台管理**
- **访问地址**: http://localhost:1337/admin
- **首次访问**: 需要创建管理员账号
- **推荐设置**: 
  - 用户名: admin
  - 邮箱: admin@aibianx.com
  - 密码: 自己设置

### **BillionMail邮件系统**
- **访问地址**: http://localhost:8080
- **默认账号**: admin / billionmail2024
- **配置位置**: deployment/config/deploy.conf

### **MeiliSearch搜索引擎**
- **访问地址**: http://localhost:7700
- **开发模式**: 无需密钥访问

## 🗄️ **备份管理**

### **自动备份恢复**
系统支持从解压后的备份目录自动恢复：

```
backups/
├── strapi_backup_20250805_231325/     # 解压后目录 (系统使用)
├── strapi_backup_20250805_231325.tar.gz  # 压缩包 (存储)
└── ...
```

### **备份版本选择**
- **`latest`**: 自动选择最新备份 (默认推荐)
- **指定版本**: 如 `20250805_231325`

### **解压备份文件**
如果只有压缩包，需要先解压：
```bash
tar -xzf backups/strapi_backup_*.tar.gz -C backups/
```

## 🌟 **特色功能**

### **🎨 现代化UI设计**
- 毛玻璃效果界面
- 深色主题支持
- 响应式设计
- 1440px设计稿精确还原

### **🔍 强大的搜索功能**
- MeiliSearch全文搜索
- 中文分词支持
- 实时搜索建议
- 搜索结果高亮

### **📧 完整邮件营销**
- BillionMail集成
- 邮件模板管理
- 订阅者管理
- 营销活动追踪

### **📊 内容管理系统**
- 文章发布管理
- 分类标签系统
- 作者权限管理
- SEO优化支持

## 🔧 **开发环境**

### **系统要求**
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 14+
- Git

### **开发启动**
```bash
# 配置开发环境
DEPLOY_MODE=dev ./scripts.sh deploy config

# 启动开发服务
./scripts.sh deploy start

# 检查系统状态
./scripts.sh tools status
```

## 🚀 **生产部署**

### **生产环境配置**
```bash
# 修改配置文件
DEPLOY_MODE=production
DOMAIN=yourdomain.com
MAIL_DOMAIN=mail.yourdomain.com

# 部署到生产
./scripts.sh deploy config
./scripts.sh deploy start
```

### **安全建议**
- 修改所有默认密码
- 启用HTTPS访问
- 配置防火墙
- 定期备份数据

## 🤝 **贡献指南**

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 **开源协议**

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 **致谢**

感谢所有为这个项目做出贡献的开发者和用户！

---

**开始使用AI变现之路，享受极简配置带来的高效体验！** 🚀