# 🚀 AI变现之路 (aibianx)

> 探索人工智能商业化的无限可能

AI变现之路是一个完整的AI内容平台，包含会员订阅系统、专业内容管理和用户社区功能。

## ✨ 项目特色

- 🎨 **像素级设计还原** - 1440px设计稿100%精确还原
- 🔮 **毛玻璃美学** - 现代化深色主题界面
- ⚡ **高性能架构** - Next.js 14 + Strapi 5.x + PostgreSQL + MeiliSearch
- 🛡️ **类型安全** - 100% TypeScript，零any使用
- 📱 **完全响应式** - 支持桌面端和移动端
- 🌍 **国际化支持** - 中英文多语言切换
- 📧 **邮件营销系统** - 完整的订阅管理、模板系统、SMTP配置
- 🔍 **智能搜索引擎** - MeiliSearch驱动的高性能中文搜索
- 🔐 **完整认证体系** - 注册、登录、密码重置、邮箱验证

## 🎯 核心功能

### 🏠 前端平台
- ✅ **用户认证系统** - 登录/注册/密码找回/邮箱验证
- ✅ **内容浏览** - 文章列表/详情/智能搜索/高级筛选
- ✅ **会员订阅** - 多种会员方案/支付集成
- ✅ **个人中心** - 用户资料/收藏/订阅管理
- ✅ **主题切换** - 亮色/暗色模式无缝切换
- ✅ **邮件订阅** - 一键订阅新闻简报/个性化邮件推送
- ✅ **智能搜索** - 中文分词/高亮显示/搜索建议

### ⚙️ 后端管理
- ✅ **内容管理** - Strapi 5.x 专业CMS
- ✅ **用户管理** - 完整的用户权限体系
- ✅ **邮件营销** - 订阅管理/模板系统/批量发送/统计分析
- ✅ **搜索引擎** - MeiliSearch索引管理/搜索分析
- ✅ **系统配置** - OAuth配置/SMTP设置/维护模式
- ✅ **数据分析** - 文章阅读量/用户行为/邮件统计
- ✅ **API接口** - RESTful API + 完整文档

## 🚀 快速开始

### 🔥 全自动部署（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/lyfe2025/aibianx.git
cd aibianx

# 2. 设置脚本权限
chmod +x scripts.sh

# 3. 🚀 生产环境全自动部署
./scripts.sh production auto-deploy yourdomain.com mail.yourdomain.com
```

**或者使用交互式菜单：**
```bash
# 进入交互式菜单
./scripts.sh

# 在生产环境菜单中选择：
# 1) 全自动部署 (安装环境+代码+配置+部署)
```

### ✨ 全自动部署流程说明
scripts.sh会自动完成以下步骤：
1. **🔧 安装基础环境** - 自动安装Git、Docker、Docker Compose
2. **📥 更新项目代码** - 自动拉取最新代码
3. **⚙️ 生成配置** - 自动生成所有配置和密钥
4. **🐳 构建容器** - 自动构建Docker镜像
5. **📋 验证配置** - 自动验证配置文件完整性
6. **🚀 启动服务** - 自动启动所有生产服务

### 手动部署（开发者）

```bash
# 1. 克隆项目
git clone https://github.com/lyfe2025/aibianx.git
cd aibianx

# 2. 设置脚本权限
chmod +x scripts.sh

# 3. 启动完整开发环境（使用统一脚本系统）
./scripts.sh deploy start

# 4. 或者使用交互式菜单（推荐新手）
./scripts.sh
# 选择 "1) 启动完整开发环境"

# 5. 执行数据库迁移（首次部署后必需）
cd backend
psql -U aibianx_dev -d aibianx_dev -f database/migrations/add_missing_table_comments.sql
psql -U aibianx_dev -d aibianx_dev -f database/migrations/add_link_table_comments.sql
psql -U aibianx_dev -d aibianx_dev -f database/migrations/add_core_table_comments.sql
psql -U aibianx_dev -d aibianx_dev -f database/migrations/add_user_table_comments.sql
cd ..
```

⚠️ **重要说明**：第5步数据库迁移是**首次部署后必需的**，用于添加数据库的中文注释。执行后Strapi管理界面的字段将显示为中文描述，便于管理员使用。

### 🌐 生产环境部署

```bash
# 1. 克隆项目到生产服务器
git clone https://github.com/lyfe2025/aibianx.git
cd aibianx

# 2. 设置脚本权限
chmod +x scripts.sh

# 3. 🚀 生产环境全自动部署
./scripts.sh production auto-deploy yourdomain.com mail.yourdomain.com

# 4. 或分步部署
./scripts.sh production configure yourdomain.com mail.yourdomain.com  # 生成配置
./scripts.sh production deploy unified                                # 统一部署
./scripts.sh production status                                        # 检查状态
```

### 日常开发

```bash
# 🚀 启动完整开发环境（前端+后端+搜索引擎）
./scripts.sh deploy start

# 🌐 仅启动前端服务
./scripts.sh deploy frontend

# ⚙️ 仅启动后端服务  
./scripts.sh deploy backend

# 📊 查看系统状态
./scripts.sh tools status

# 🔍 管理搜索引擎
./scripts.sh search manage

# 🛑 停止所有服务
./scripts.sh deploy stop

# 📖 或使用交互式菜单（推荐）
./scripts.sh
```

### 访问地址

#### 🔥 生产环境访问（全自动部署后）
- 🌐 **前端网站**: https://yourdomain.com
- ⚙️ **后端管理**: https://yourdomain.com/admin  
- 📡 **API接口**: https://yourdomain.com/api
- 📧 **邮件管理**: https://yourdomain.com:8080 (BillionMail)
- 🔍 **搜索引擎**: https://yourdomain.com:7700 (MeiliSearch)

#### 开发环境访问
- 🌐 **前端网站**: http://localhost (端口80)
- ⚙️ **后端管理**: http://localhost:1337/admin
- 📡 **API测试**: http://localhost:1337/api/articles
- 🔍 **搜索引擎**: http://localhost:7700 (MeiliSearch)
- 📧 **邮件测试**: http://localhost:1337/api/smtp-test
- 📋 **开发文档**: [API-ENDPOINTS.md](./API-ENDPOINTS.md)
- 📖 **脚本指南**: [DEV-SCRIPTS.md](./DEV-SCRIPTS.md)

## 💻 技术栈

### 前端技术
- **框架**: Next.js 15.4.2 (App Router)
- **语言**: TypeScript
- **样式**: 纯CSS + CSS变量系统
- **状态管理**: Zustand + 持久化
- **表单**: React Hook Form + Zod验证
- **图标**: 自定义SVG图标库 (206个)
- **认证**: NextAuth.js + 自定义API路由

### 后端技术
- **CMS**: Strapi 5.x
- **数据库**: PostgreSQL
- **搜索**: MeiliSearch
- **ORM**: Strapi内置ORM
- **认证**: JWT + Session
- **邮件服务**: SMTP + 模板引擎
- **文件存储**: 本地存储/云存储

### 开发工具
- **包管理**: npm
- **代码规范**: ESLint + Prettier
- **类型检查**: TypeScript Strict Mode
- **版本控制**: Git

## 📁 项目结构

```
aibianx/
├── 🌐 frontend/                    # Next.js前端应用
│   ├── src/
│   │   ├── app/                    # Next.js App Router页面
│   │   │   ├── api/               # 前端API路由
│   │   │   │   └── auth/          # 用户认证API路由
│   │   │   │       ├── register/   # 用户注册
│   │   │   │       ├── forgot-password/ # 密码重置
│   │   │   │       ├── verify-code/ # 邮箱验证
│   │   │   │       └── send-verification/ # 发送验证码
│   │   │   ├── about/             # 关于页面
│   │   │   ├── profile/           # 个人中心页面
│   │   │   └── weekly/            # 周刊文章页面
│   │   ├── components/            # React组件库
│   │   │   ├── ui/               # 原子组件 (Button, Input, Modal等)
│   │   │   ├── molecules/        # 分子组件
│   │   │   │   ├── EmailSubscribeForm/    # 邮件订阅表单
│   │   │   │   ├── EmailSubscriptionCard/ # 邮件订阅卡片
│   │   │   │   ├── ArticleCard/          # 文章卡片
│   │   │   │   └── UserSidebar/          # 用户侧边栏
│   │   │   ├── organisms/        # 有机组件
│   │   │   │   ├── Header/              # 网站头部
│   │   │   │   ├── Footer/              # 网站底部
│   │   │   │   └── Layout/              # 页面布局
│   │   │   ├── auth/             # 认证相关组件
│   │   │   │   ├── LoginModal/          # 登录模态框
│   │   │   │   ├── RegisterForm/        # 注册表单
│   │   │   │   └── SocialLogin/         # 社交登录
│   │   │   └── templates/        # 模板组件
│   │   ├── stores/               # Zustand状态管理
│   │   │   ├── userStore.ts     # 用户状态管理
│   │   │   ├── modalStore.ts    # 模态框状态
│   │   │   └── languageStore.ts # 语言切换状态
│   │   ├── lib/                  # 工具函数和API客户端
│   │   │   ├── hooks/           # 自定义React Hooks
│   │   │   ├── strapi.ts        # Strapi API客户端
│   │   │   ├── auth.ts          # 认证相关工具
│   │   │   ├── config.ts        # 统一配置管理
│   │   │   └── utils.ts         # 通用工具函数
│   │   ├── types/                # TypeScript类型定义
│   │   │   ├── api.ts           # API响应类型
│   │   │   ├── auth.ts          # 认证相关类型
│   │   │   └── components.ts    # 组件Props类型
│   │   └── styles/               # 全局样式
│   │       ├── globals.css      # 全局样式
│   │       ├── components.css   # 组件样式
│   │       └── auth.css         # 认证组件样式
│   └── public/                   # 静态资源
│       ├── icons/               # SVG图标库 (206个)
│       │   ├── modals/         # 弹窗相关图标
│       │   ├── payments/       # 支付相关图标
│       │   └── subscription/   # 订阅相关图标
│       ├── images/              # 图片资源
│       ├── fonts/               # 字体文件
│       ├── privacy.html         # 隐私政策
│       └── terms.html           # 用户协议
│
├── ⚙️ backend/                    # Strapi 5.x 后端应用
│   ├── src/
│   │   ├── api/                 # 内容类型API
│   │   │   ├── article/         # 文章管理API
│   │   │   ├── author/          # 作者管理API
│   │   │   ├── category/        # 分类管理API
│   │   │   ├── tag/             # 标签管理API
│   │   │   ├── site-config/     # 网站配置API
│   │   │   ├── seo-metrics/     # SEO监控API
│   │   │   ├── system-config/   # 系统配置API (OAuth等)
│   │   │   ├── email-subscription/ # 邮件订阅API
│   │   │   ├── email-template/  # 邮件模板API
│   │   │   ├── email-service/   # 邮件发送API
│   │   │   ├── email-campaign/  # 邮件营销活动API
│   │   │   ├── smtp-config/     # SMTP配置API
│   │   │   ├── email-analytics/ # 邮件分析API
│   │   │   └── search-analytics/ # 搜索分析API
│   │   ├── extensions/          # Strapi扩展
│   │   │   └── documentation/   # API文档扩展
│   │   ├── lib/                 # 工具函数
│   │   │   └── config.ts        # 统一配置管理
│   │   ├── services/            # 业务服务
│   │   │   └── meilisearch.ts   # 搜索引擎服务
│   │   └── index.ts             # 应用入口 (自动初始化系统)
│   ├── config/                  # Strapi配置
│   │   ├── database.ts          # 数据库配置
│   │   ├── api.ts              # API配置
│   │   ├── admin.ts            # 管理面板配置
│   │   └── middlewares.ts      # 中间件配置
│   ├── database/                # 数据库相关
│   ├── scripts/                 # 初始化脚本
│   │   ├── init-email-system.js # 邮件系统初始化
│   │   └── db-seed.js          # 数据库种子
│   └── public/                  # 上传文件存储
│       └── uploads/            # 媒体文件
│
├── 📚 docs/                      # 标准化项目文档 (8个专业目录)
│   ├── 🏗️ 架构文档/            # 系统架构、技术选型、设计方案
│   │   ├── 技术架构设计方案.md   # Next.js + Strapi + PostgreSQL架构
│   │   ├── SEO优化策略指南.md    # 完整SEO策略和实施方案
│   │   └── 数据库表结构设计.md   # PostgreSQL数据库设计
│   ├── 📖 开发指南/             # 开发规范、编码标准、最佳实践
│   │   ├── 开发执行步骤总览.md   # 分阶段开发指南
│   │   ├── 前端API集成指南.md    # Next.js与Strapi集成
│   │   └── 纯CSS开发指南.md      # CSS规范和组件样式
│   ├── 🚀 部署运维/             # 部署文档、运维手册、环境配置
│   │   ├── 统一脚本管理方案.md   # scripts.sh系统详解
│   │   ├── 生产环境部署指南.md   # 完整部署流程
│   │   └── MeiliSearch部署配置.md # 搜索引擎部署
│   ├── 📡 API文档/              # 接口文档、数据格式、调用示例
│   │   ├── 轻量级支付集成方案.md # 多渠道支付系统
│   │   └── API调试速查指南.md    # API调试工具和方法
│   ├── 📖 用户手册/             # 使用指南、功能说明、常见问题
│   │   └── SEO内容创作指南.md    # 内容创作者SEO指南
│   ├── 📊 项目管理/             # 需求文档、测试计划、版本记录
│   │   ├── AI变现之路项目功能完成清单_v2.0.md # 94.2%完成度清单
│   │   └── 项目分阶段开发计划.md  # 完整开发计划
│   ├── ❓ 问题解决/             # 故障排查、解决方案、经验总结
│   │   ├── CSS优先级修复复盘.md  # CSS样式冲突解决方案
│   │   └── 分类标签系统重构.md   # 系统重构经验
│   ├── 🤝 团队协作/             # 团队规范、工作流程、沟通机制
│   └── 📜 历史档案/             # 重要历史记录说明
│
├── 🔍 logs/                      # 日志文件
│   ├── backend.log              # 后端服务日志
│   ├── frontend.log             # 前端服务日志
│   └── search.log               # 搜索引擎日志
│
├── 💾 backups/                   # 数据库备份
│   └── database-only/           # 仅数据库备份
│
├── 🛠️ scripts/                  # 分类管理脚本系统
│   ├── deployment/              # 部署启动脚本
│   │   ├── start-dev.sh        # 开发环境启动脚本
│   │   ├── start-backend.sh    # 后端服务启动
│   │   └── start-frontend.sh   # 前端服务启动
│   ├── search/                  # 搜索引擎管理
│   │   ├── deploy-meilisearch.sh # MeiliSearch Docker部署
│   │   ├── manage-meilisearch.sh # 搜索管理工具界面
│   │   └── check-meilisearch.sh  # 搜索引擎状态检查
│   ├── database/                # 数据库管理
│   │   ├── backup-database-only.sh # PostgreSQL数据库备份
│   │   ├── restore-database-only.sh # 数据库还原
│   │   └── check-database.sh    # 数据库连接检查
│   ├── production/              # 生产环境管理
│   │   ├── auto-deploy.sh      # 全自动生产部署
│   │   ├── configure-production.sh # 生产环境配置
│   │   └── deploy-production.sh # 生产环境部署
│   ├── billionmail/             # 邮件系统管理
│   │   ├── deploy-billionmail.sh # BillionMail部署
│   │   └── check-billionmail.sh  # 邮件系统检查
│   ├── backup/                  # 完整系统备份
│   └── tools/                   # 开发工具脚本
│       ├── configure-field-descriptions.sh # 字段描述配置
│       ├── system-check.sh     # 系统全面检查
│       └── environment-setup.sh # 环境变量配置
│
├── scripts.sh                   # 🚀 统一脚本入口 (智能菜单+命令行双模式)
├── API-ENDPOINTS.md             # 📡 API端点完整文档
├── DEV-SCRIPTS.md               # 📖 开发脚本使用指南
└── README.md                    # 📋 项目说明文档
```

## 🎨 设计系统

### 色彩体系
- **主色调**: 蓝紫渐变 (`#3B82F6` → `#8B5CF6`)
- **背景色**: 深色主题 (`#030303`, `#1A1A1A`)
- **文字色**: 白色层级 (`#FFFFFF`, `#D1D5DB`, `#9CA3AF`)
- **边框色**: 半透明灰色 (`rgba(42, 42, 42, 0.70)`)

### 字体系统
- **字体**: 阿里巴巴普惠体 3.0
- **尺寸**: 12px - 64px (8个层级)
- **字重**: Light, Regular, Medium, SemiBold, Bold

### 组件库
- **原子组件**: Button, Input, Icon, Avatar等
- **分子组件**: ArticleCard, UserSidebar等
- **有机组件**: Header, Footer, Layout等

## 📊 数据模型

### 核心实体
- **文章 (Article)** - 标题、内容、作者、分类、标签
- **作者 (Author)** - 姓名、简介、头像、社交链接
- **分类 (Category)** - 名称、描述、图标、颜色
- **标签 (Tag)** - 名称、描述、颜色、图标
- **邮件订阅 (EmailSubscription)** - 邮箱、订阅状态、标签分类
- **邮件模板 (EmailTemplate)** - 模板内容、变量配置、使用场景
- **SMTP配置 (SmtpConfig)** - 服务器设置、认证信息、健康状态
- **系统配置 (SystemConfig)** - OAuth设置、功能开关、维护模式

### 关系设计
- 文章 → 作者 (多对一)
- 文章 → 分类 (多对一)
- 文章 → 标签 (多对多)

## 🔧 开发指南

### 环境要求
- **Node.js**: 18.x+ (推荐 20.x+)
- **PostgreSQL**: 14.x+ (推荐 15.x+)
- **npm**: 9.x+ (推荐 10.x+)
- **Docker**: 24.x+ (生产环境部署)

### 代码规范
- **100%类型安全** - 零any使用
- **纯CSS方案** - 无框架依赖
- **原子设计** - 组件分层架构
- **响应式优先** - 移动端优先设计

### 详细文档
- 📖 [开发脚本使用指南](./DEV-SCRIPTS.md) - 统一脚本系统完整指南
- 📡 [API端点完整文档](./API-ENDPOINTS.md) - 所有API接口详细说明
- 🚀 [快速部署指南](./deployment/QUICKSTART.md) - 生产环境一键部署
- 📚 [项目文档总览](./docs/README.md) - 标准化文档导航
- 🏗️ [架构设计文档](./docs/架构文档/) - 技术架构和系统设计
- 📖 [开发指南文档](./docs/开发指南/) - 开发规范和最佳实践
- 🚀 [部署运维文档](./docs/部署运维/) - 部署流程和运维指南

## 🚨 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   ./scripts.sh deploy stop  # 停止所有服务
   ```

2. **数据库连接失败**
   ```bash
   # 检查数据库状态
   ./scripts.sh db check
   
   # 手动启动数据库
   # macOS
   brew services start postgresql
   # Linux
   sudo systemctl start postgresql
   ```

3. **搜索引擎无法启动**
   ```bash
   # 重新部署搜索引擎
   ./scripts.sh search deploy
   
   # 检查搜索引擎状态
   ./scripts.sh search check
   ```

4. **依赖安装失败**
   ```bash
   cd backend && rm -rf node_modules && npm install
   cd frontend && rm -rf node_modules && npm install
   ```

5. **服务状态异常**
   ```bash
   ./scripts.sh tools status  # 完整系统状态检查
   tail -f logs/backend.log   # 查看后端日志
   tail -f logs/frontend.log  # 查看前端日志
   tail -f logs/search.log    # 查看搜索引擎日志
   ```

6. **字段描述显示异常**
   ```bash
   ./scripts.sh tools fix-fields  # 修复Strapi字段描述
   ```

## 📈 项目状态 (v3.0)

### 🎯 **当前完成度: 94.2%** ✨

#### ✅ **已完成功能** (128项)
- ✅ **第1-2周** - Strapi CMS + PostgreSQL + 前端API集成
- ✅ **第3-4周** - 用户认证UI + 支付系统UI + 统一脚本系统  
- ✅ **第5-6周** - NextAuth.js + 邮件营销系统完整实现
- ✅ **第7-8周** - MeiliSearch + 用户认证API + 搜索功能
- ✅ **第9-10周** - 支付系统集成 + SEO优化 + 生产部署

#### 🎊 **核心系统状态**
- 🌐 **前端系统**: 100% 完成 - Next.js 15.4.2 + React 19.1.0
- ⚙️ **后端系统**: 100% 完成 - Strapi 5.20.0 + PostgreSQL  
- 🔐 **用户认证**: 100% 完成 - NextAuth.js + 自定义API
- 📧 **邮件营销**: 100% 完成 - SMTP + 模板 + 订阅管理
- 🔍 **搜索引擎**: 100% 完成 - MeiliSearch + 中文分词
- 💳 **支付系统**: 100% 完成 - 支付宝 + 微信 + Stripe
- 🚀 **部署系统**: 100% 完成 - 统一脚本 + 生产部署
- 📊 **文档体系**: 100% 完成 - 标准化专业文档 (59个)

#### 🔄 **进行中优化** (5.8%)
- 📈 **性能监控优化** - 进阶监控和告警系统
- 🌍 **国际化完善** - 多语言内容管理
- 🤖 **AI功能集成** - 智能推荐和内容生成
- 📱 **移动端优化** - PWA和原生体验
- 🔒 **安全加固** - 高级安全特性

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

<div align="center">

**🎉 祝您开发愉快！**

[📚 查看文档](./docs/) | [🐛 反馈问题](./issues) | [💬 讨论区](./discussions)

</div> 