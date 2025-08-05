# 🚀 AI变现之路 - 全栈项目管理系统

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-20+-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)

**现代化全栈Web应用，提供内容管理、搜索引擎、邮件营销等完整解决方案**

[快速开始](#-快速开始) • [在线演示](#) • [文档中心](#-文档导航) • [贡献指南](#-贡献指南)

</div>

---

## ✨ 项目特色

> 🎯 **一次配置，终身受用** - 统一配置管理，智能化部署流程

### 🚀 **核心优势**

| 特性 | 描述 | 优势 |
|------|------|------|
| 🎯 **极简配置** | 单文件配置 `deploy.conf` | 减少90%配置复杂度 |
| 🔄 **智能部署** | 一键自动化部署流程 | 从零到生产仅需5分钟 |
| 🚫 **零硬编码** | 完全动态配置架构 | 跨环境无缝迁移 |
| 🛡️ **安全可靠** | 内置安全最佳实践 | 企业级安全标准 |
| 📦 **开箱即用** | 完整功能生态系统 | 无需额外集成 |
| 🔧 **灵活扩展** | 模块化架构设计 | 轻松定制和扩展 |

## 🏗️ 技术架构

<div align="center">

```mermaid
graph TB
    subgraph "🌐 前端层"
        A[Next.js 14 + TypeScript]
        B[纯CSS变量系统]
        C[Zustand状态管理]
    end
    
    subgraph "⚙️ 后端层"
        D[Strapi 5.20.0]
        E[RESTful API]
        F[OpenAPI文档]
    end
    
    subgraph "🗄️ 数据层"
        G[PostgreSQL 14+]
        H[Redis缓存]
        I[MeiliSearch搜索]
    end
    
    subgraph "📧 服务层"
        J[BillionMail邮件系统]
        K[Docker容器编排]
    end
    
    A --> D
    D --> G
    D --> H
    D --> I
    D --> J
    K --> D
    K --> G
    K --> H
    K --> I
    K --> J
```

</div>

### 💻 **技术栈详情**

#### 🎨 **前端技术**
- **Next.js 14** - React全栈框架，支持SSR/SSG
- **TypeScript** - 类型安全的JavaScript超集
- **纯CSS变量系统** - 主题化设计，毛玻璃效果
- **Zustand** - 轻量级状态管理
- **响应式设计** - 1440px设计稿精确还原

#### ⚙️ **后端技术**
- **Strapi 5.20.0** - 无头CMS，TypeScript支持
- **PostgreSQL 14+** - 企业级关系型数据库
- **RESTful API** - 标准化API接口
- **OpenAPI 3.0** - 自动生成API文档

#### 🔧 **基础设施**
- **Docker Compose** - 容器编排和管理
- **MeiliSearch** - 高性能全文搜索引擎
- **BillionMail** - 专业邮件营销系统
- **Redis** - 内存缓存和会话存储

## 🚀 快速开始

### 🎯 **30秒快速体验**

#### 方式一：一键部署（推荐）
```bash
# 一键安装并启动完整系统
bash <(curl -s https://raw.githubusercontent.com/lyfe2025/aibianx/main/scripts/bootstrap.sh)
```

#### 方式二：手动部署
```bash
# 1. 克隆项目
git clone https://github.com/lyfe2025/aibianx.git && cd aibianx

# 2. 配置和启动系统
./scripts.sh deploy config    # 先配置
./scripts.sh deploy start     # 再启动

# 3. 查看访问地址
./scripts.sh tools services   # 获取所有服务地址
```

### ⚙️ **详细部署流程**

<details>
<summary><b>🔧 点击展开详细配置说明</b></summary>

#### 📋 **Step 1: 项目克隆**
```bash
git clone https://github.com/lyfe2025/aibianx.git
cd aibianx
```

#### 📝 **Step 2: 配置文件设置**
编辑唯一配置文件：`deployment/config/deploy.conf`

```bash
# 🌐 基础配置
DEPLOY_MODE=dev                     # 部署模式: dev | production
DOMAIN=localhost                    # 主域名
MAIL_DOMAIN=localhost              # 邮件域名

# 📦 仓库配置 (一键部署使用)
REPO_ORG=lyfe2025                  # GitHub组织/用户名
PROJECT_NAME=aibianx               # 项目名称
REPO_URL=https://github.com/${REPO_ORG}/${PROJECT_NAME}.git

# 🔐 安全配置  
DB_ADMIN_PASSWORD=aibianx_2024     # 数据库管理员密码
BILLIONMAIL_USERNAME=admin         # 邮件系统用户名
BILLIONMAIL_PASSWORD=secure123     # 邮件系统密码

# 📦 自动化配置
BACKUP_VERSION=latest              # 备份版本选择
AUTO_RESTORE_BACKUP=true           # 自动数据恢复
AUTO_DEPLOY_SEARCH=true            # 自动搜索引擎
AUTO_DEPLOY_EMAIL=true             # 自动邮件系统

# 🌐 端口配置 (可选，使用默认值)
FRONTEND_PORT=80                   # 前端端口
BACKEND_PORT=1337                  # 后端端口  
MEILISEARCH_PORT=7700              # 搜索引擎端口
BILLIONMAIL_PORT=8080              # 邮件系统端口
```

#### 🔧 **Step 3: 系统配置**
```bash
# 自动配置所有服务
./scripts.sh deploy config
```

#### 🚀 **Step 4: 服务启动**
```bash
# 启动完整系统
./scripts.sh deploy start

# 检查系统状态和访问地址
./scripts.sh tools status
./scripts.sh tools services    # 查看所有服务访问地址
```

</details>

## 🌐 系统访问地址

<div align="center">

### 🎯 **服务访问面板**

> **💡 提示**: 部署完成后，运行 `./scripts.sh tools services` 获取最新的访问地址

| 服务 | 开发环境地址 | 说明 | 状态检查 |
|------|------|------|----------|
| 🌐 **前端网站** | [http://localhost](http://localhost) | 用户访问界面 | `curl localhost` |
| ⚙️ **后端管理** | [http://localhost:1337/admin](http://localhost:1337/admin) | Strapi管理后台 | `curl localhost:1337/admin` |
| 🔍 **搜索引擎** | [http://localhost:7700](http://localhost:7700) | MeiliSearch控制台 | `curl localhost:7700/health` |
| 📧 **邮件管理** | [http://localhost:8080/billion](http://localhost:8080/billion) | BillionMail管理界面 | `curl localhost:8080/billion` |
| 📮 **WebMail** | [http://localhost:8080/roundcube](http://localhost:8080/roundcube) | 邮件收发界面 | `curl localhost:8080/roundcube` |

**📝 注意**: 生产环境地址将根据 `deployment/config/deploy.conf` 中的域名配置自动调整

</div>

#### 🔐 **默认访问凭据**

<details>
<summary><b>📋 点击查看各系统登录信息</b></summary>

- **Strapi后台** (首次需创建管理员)
  - 访问: http://localhost:1337/admin
  - 建议账号: `admin` / `admin@aibianx.com`

- **BillionMail邮件系统**
  - 访问: http://localhost:8080/billion  
  - 默认账号: `admin` / `billionmail2024`

- **MeiliSearch搜索**
  - 访问: http://localhost:7700
  - 开发模式: 无需认证

</details>

## 📁 项目结构

<details>
<summary><b>🗂️ 点击展开完整目录结构</b></summary>

```
aibianx/
├── 📁 deployment/               # 🚀 部署配置
│   ├── config/
│   │   └── deploy.conf         # 🎯 核心配置文件
│   ├── docker-compose.yml      # 容器编排配置
│   └── configs/                # 服务配置文件
│
├── 📦 backups/                  # 🛡️ 数据备份
│   ├── strapi_backup_*/        # 解压后备份目录
│   └── *.tar.gz               # 压缩包备份
│
├── 🌐 frontend/                 # 前端应用
│   ├── src/
│   │   ├── app/               # Next.js 14 App Router
│   │   ├── components/        # React组件
│   │   ├── lib/              # 工具函数
│   │   └── styles/           # CSS样式
│   └── public/               # 静态资源
│
├── ⚙️ backend/                  # 后端API
│   ├── src/
│   │   ├── api/              # API端点
│   │   ├── components/       # Strapi组件
│   │   └── services/         # 业务逻辑
│   └── config/               # 配置文件
│
├── 🔧 scripts/                  # 自动化脚本
│   ├── deployment/           # 部署脚本
│   ├── tools/               # 开发工具
│   ├── backup/              # 备份脚本
│   └── search/              # 搜索管理
│
├── 📚 docs/                     # 项目文档
│   ├── 架构文档/             # 系统设计
│   ├── 开发指南/             # 开发规范
│   └── API文档/              # 接口文档
│
├── 🗄️ logs/                     # 系统日志
└── 🚀 scripts.sh                # 统一管理入口
```

</details>

### 🎯 **核心目录说明**

| 目录 | 作用 | 重要文件 |
|------|------|----------|
| `deployment/` | 🚀 部署配置中心 | `deploy.conf` - 唯一配置文件 |
| `scripts/` | 🔧 自动化脚本 | `scripts.sh` - 统一管理入口 |
| `frontend/` | 🌐 Next.js前端 | App Router架构 |
| `backend/` | ⚙️ Strapi后端 | 无头CMS系统 |
| `docs/` | 📚 项目文档 | 分类文档管理 |

## 🔧 常用命令

### 🚀 **部署管理**
```bash
# 💡 完整部署流程（推荐）
./scripts.sh deploy config      # 1. 先配置所有服务
./scripts.sh deploy start       # 2. 再启动完整环境

# 🔧 服务管理
./scripts.sh deploy stop        # 停止所有服务  
./scripts.sh deploy restart     # 重启所有服务
./scripts.sh tools services     # 查看所有服务访问地址
```

### 📊 **系统监控**
```bash
# 🔍 状态检查
./scripts.sh tools status       # 系统整体状态
./scripts.sh tools check        # 代码质量检查
./scripts.sh tools health       # 健康状态检查

# 📊 性能监控
./scripts.sh monitor start      # 启动实时监控
./scripts.sh logs view          # 查看系统日志
```

### 💾 **备份管理**
```bash
# 📦 备份操作
./scripts.sh backup create      # 创建新备份
./scripts.sh backup list        # 查看可用备份
./scripts.sh backup restore     # 从备份恢复

# 🔄 数据同步
./scripts.sh sync database      # 同步数据库
./scripts.sh sync files         # 同步文件
```

### 🔍 **搜索管理**
```bash
# 🔍 搜索引擎
./scripts.sh search deploy      # 部署搜索引擎
./scripts.sh search manage      # 搜索管理界面
./scripts.sh search reindex     # 重建搜索索引
```

### 📧 **邮件系统**
```bash
# 📧 邮件服务
./scripts.sh email deploy       # 部署邮件系统
./scripts.sh email check        # 检查邮件状态
./scripts.sh email admin        # 打开邮件管理界面
./scripts.sh billionmail check  # 检查BillionMail状态
```

<details>
<summary><b>📋 更多高级命令</b></summary>

```bash
# 🛠️ 开发工具
./scripts.sh dev setup          # 开发环境配置
./scripts.sh dev clean          # 清理开发环境
./scripts.sh dev rebuild        # 重新构建

# 🔐 安全管理
./scripts.sh security scan      # 安全扫描
./scripts.sh security update    # 安全更新

# 📈 性能优化
./scripts.sh optimize images    # 图片优化
./scripts.sh optimize database  # 数据库优化
./scripts.sh optimize cache     # 缓存优化
```

</details>

## 📚 文档导航

<div align="center">

### 🗂️ **文档中心**

| 📋 分类 | 📖 文档 | 📝 说明 |
|---------|---------|---------|
| 🚀 **入门指南** | [极简部署指南](docs/部署运维/) | 30秒快速上手部署 |
| 🏗️ **架构设计** | [技术架构文档](docs/架构文档/) | 系统设计和技术选型 |
| 💻 **开发规范** | [开发指南](docs/开发指南/) | 编码规范和最佳实践 |
| 📡 **API接口** | [API文档](docs/API文档/) | 接口文档和调用示例 |
| 🛠️ **问题解决** | [故障排查](docs/问题解决/) | 常见问题和解决方案 |

</div>

### 🔧 **故障排除**

#### 常见问题解决

<details>
<summary><b>❓ 缺失系统依赖</b></summary>

**问题**: 提示缺少Git、Docker、Node.js等

**解决方案**:
```bash
# 项目内置依赖检查和安装工具
./scripts.sh tools check      # 检查依赖状态
./scripts/production/install-environment.sh  # 自动安装
```

</details>

<details>
<summary><b>❓ 服务启动失败</b></summary>

**问题**: 部分服务未启动或端口冲突

**解决方案**:
```bash
./scripts.sh tools status     # 检查服务状态
./scripts.sh deploy restart   # 重启服务
./scripts.sh tools services   # 查看访问地址
```

</details>

### 📖 **快速导航**

<details>
<summary><b>🔍 按需求查找文档</b></summary>

#### 🆕 **新手用户**
- [📋 30秒快速开始](#-快速开始)
- [🔧 系统要求](#-系统要求)
- [🌐 访问地址](#-系统访问地址)

#### 👨‍💻 **开发者**
- [🏗️ 技术架构](docs/架构文档/)
- [💻 开发指南](docs/开发指南/)
- [📡 API文档](docs/API文档/)

#### 🔧 **运维人员**
- [🚀 部署指南](docs/部署运维/)
- [🛠️ 故障排查](docs/问题解决/)
- [📊 性能监控](#-系统监控)

</details>

## 🌟 特色功能

<div align="center">

### ✨ **功能特色一览**

</div>

#### 🎨 **现代化UI设计**
- 🎭 **毛玻璃效果** - 现代化视觉体验
- 🌙 **深色主题** - 护眼夜间模式  
- 📱 **响应式设计** - 完美适配各种设备
- 🎯 **像素级还原** - 1440px设计稿精确实现

#### 🔍 **智能搜索引擎**
- ⚡ **全文搜索** - MeiliSearch高性能引擎
- 🇨🇳 **中文分词** - 智能中文内容解析
- 💡 **实时建议** - 搜索过程中的智能提示
- 🎯 **结果高亮** - 关键词精准标记

#### 📧 **专业邮件营销**
- 🚀 **BillionMail集成** - 企业级邮件解决方案
- 📝 **模板管理** - 可视化邮件模板编辑
- 👥 **订阅者管理** - 精细化用户分组
- 📊 **营销分析** - 详细的发送效果统计

#### 📊 **强大内容管理**
- ✍️ **文章发布** - 富文本编辑器支持
- 🏷️ **分类标签** - 灵活的内容组织
- 👨‍💼 **权限管理** - 多角色协作支持
- 🔍 **SEO优化** - 内置搜索引擎优化

#### 🛡️ **企业级安全**
- 🔐 **访问控制** - 基于角色的权限管理
- 🛡️ **数据加密** - 敏感信息安全保护
- 📝 **操作日志** - 完整的审计追踪
- 🔍 **安全扫描** - 自动化安全检测

#### ⚙️ **智能配置管理**
- 🚫 **零硬编码架构** - 所有配置动态读取，无硬编码依赖
- 📦 **单文件配置** - `deploy.conf` 统一管理所有参数
- 🔄 **环境自适应** - 开发/生产环境自动切换
- 🌐 **动态URL构建** - 根据域名和端口自动生成访问地址
- 🔧 **现有工具优先** - 充分利用已有脚本，避免重复开发

<details>
<summary><b>🔧 更多技术特性</b></summary>

#### 📦 **备份恢复系统**
```bash
backups/
├── strapi_backup_20250805_231325/     # 📁 解压后目录 (系统使用)
├── strapi_backup_20250805_231325.tar.gz  # 📦 压缩包 (存储)
└── latest -> strapi_backup_20250805_231325/  # 🔗 最新备份链接
```

**版本管理特性:**
- 🤖 **智能版本选择** - `latest` 自动选择最新备份
- 📅 **时间戳版本** - 如 `20250805_231325` 精确版本控制
- 🔄 **一键恢复** - 自动解压和数据恢复

**快速操作:**
```bash
# 🔄 解压备份 (如果需要)
tar -xzf backups/strapi_backup_*.tar.gz -C backups/

# 📦 创建备份
./scripts.sh backup create

# 🔄 恢复数据  
./scripts.sh backup restore latest
```

</details>

## 🛠️ 系统要求

<div align="center">

### 💻 **环境依赖**

| 组件 | 版本要求 | 说明 |
|------|----------|------|
| 🟢 **Node.js** | `20+` | JavaScript运行环境 |
| 🐳 **Docker** | `24+` | 容器运行环境 |
| 🐘 **PostgreSQL** | `14+` | 关系型数据库 |
| 📦 **Git** | `2.30+` | 版本控制工具 |
| 💾 **内存** | `4GB+` | 推荐运行内存 |
| 💿 **存储** | `20GB+` | 可用磁盘空间 |

</div>

### 🔧 **环境配置**

#### 🖥️ **开发环境**
```bash
# ⚡ 快速开发启动
DEPLOY_MODE=dev ./scripts.sh deploy start

# 🔍 开发环境检查
./scripts.sh tools status
./scripts.sh dev setup
```

#### 🚀 **生产环境**
```bash
# 📝 修改生产配置
vim deployment/config/deploy.conf

# 🌐 生产配置示例
DEPLOY_MODE=production
DOMAIN=yourdomain.com
MAIL_DOMAIN=mail.yourdomain.com

# 🚀 生产部署
./scripts.sh deploy config
./scripts.sh deploy start
```

### 🔐 **安全建议**

#### ⚠️ **必须修改项**
- 🔑 **数据库密码** - 修改默认数据库密码
- 🔐 **管理员密码** - 修改Strapi管理员密码  
- 📧 **邮件密码** - 修改BillionMail登录密码
- 🌐 **域名配置** - 配置正确的生产域名

#### 🛡️ **安全加固**
- 🔒 **HTTPS启用** - 配置SSL证书
- 🔥 **防火墙配置** - 限制不必要端口访问
- 📝 **定期备份** - 建立自动备份策略
- 🔍 **监控日志** - 建立日志监控机制

<details>
<summary><b>🔧 高级安全配置</b></summary>

```bash
# 🔐 安全检查
./scripts.sh security scan

# 🔒 SSL证书配置  
./scripts.sh ssl setup yourdomain.com

# 🔥 防火墙配置
./scripts.sh firewall config

# 📊 监控配置
./scripts.sh monitor setup
```

</details>

## 🤝 贡献指南

<div align="center">

**🌟 我们欢迎所有形式的贡献！**

</div>

### 📋 **贡献流程**

```mermaid
flowchart LR
    A[🍴 Fork项目] --> B[🌿 创建分支]
    B --> C[✍️ 开发功能]
    C --> D[✅ 测试验证] 
    D --> E[📤 提交PR]
    E --> F[🔍 代码审查]
    F --> G[🎉 合并代码]
```

#### 🚀 **快速开始贡献**
```bash
# 1. 🍴 Fork 并克隆项目
git clone https://github.com/lyfe2025/aibianx.git
cd aibianx

# 2. 🌿 创建功能分支
git checkout -b feature/amazing-feature

# 3. ✍️ 进行开发
# 编写代码、测试、文档...

# 4. 📤 提交更改
git commit -m "feat: 添加了惊人的新功能"
git push origin feature/amazing-feature

# 5. 🔗 创建 Pull Request
# 在GitHub上创建PR，等待审查
```

### 🎯 **贡献类型**

| 类型 | 说明 | 标签 |
|------|------|------|
| 🐛 **Bug修复** | 修复已知问题 | `bug` |
| ✨ **新功能** | 添加新特性 | `feature` |
| 📚 **文档** | 改进文档 | `docs` |
| 🎨 **样式** | UI/UX改进 | `ui` |
| ⚡ **性能** | 性能优化 | `perf` |
| 🔧 **工具** | 开发工具改进 | `tools` |

### 📝 **代码规范**

<details>
<summary><b>💻 查看详细规范</b></summary>

#### 🎯 **提交规范**
```bash
# 格式: type(scope): description
feat(frontend): 添加用户登录功能
fix(backend): 修复API响应错误
docs(readme): 更新部署文档
style(ui): 优化按钮样式
```

#### 🔍 **代码质量**
- ✅ 遵循项目现有代码风格
- 📝 添加必要的注释和文档
- 🧪 确保测试通过
- 🔒 遵循安全最佳实践

</details>

---

<div align="center">

## 📄 开源协议

**本项目采用 [MIT](LICENSE) 协议** - 自由使用、修改和分发

## 🙏 致谢

<table>
  <tr>
    <td align="center">
      <b>🚀 核心技术</b><br>
      感谢 Next.js、Strapi、Docker 等优秀开源项目
    </td>
    <td align="center">
      <b>👥 社区贡献</b><br>
      感谢所有贡献者的代码、文档和反馈
    </td>
    <td align="center">
      <b>🌟 用户支持</b><br>
      感谢每一位使用者的信任和建议
    </td>
  </tr>
</table>

---

### 🎯 **开始你的AI变现之路**

<p>
<a href="#-快速开始">
  <img src="https://img.shields.io/badge/立即开始-30秒部署-brightgreen?style=for-the-badge&logo=rocket" alt="立即开始">
</a>
<a href="docs/">
  <img src="https://img.shields.io/badge/查看文档-详细指南-blue?style=for-the-badge&logo=book" alt="查看文档">
</a>
<a href="#-贡献指南">
  <img src="https://img.shields.io/badge/参与贡献-欢迎加入-orange?style=for-the-badge&logo=github" alt="参与贡献">
</a>
</p>

**🚀 享受极简配置带来的高效开发体验！**

</div>