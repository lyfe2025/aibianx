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

### 第一次启动

```bash
# 1. 克隆项目
git clone <repository-url>
cd aibianx

# 2. 设置脚本权限
chmod +x *.sh

# 3. 启动完整开发环境
./start-dev.sh
```

### 日常开发

```bash
# 启动开发环境（前端+后端）
./start-dev.sh

# 仅启动前端（端口3000）
./start-frontend.sh

# 仅启动后端（端口1337）
./start-backend.sh

# 查看服务状态
./status.sh

# 停止所有服务
./stop-dev.sh
```

### 访问地址

- 🌐 **前端网站**: http://localhost
- ⚙️ **后端管理**: http://localhost:1337/admin
- 📡 **API测试**: http://localhost:1337/api/articles
- 📖 **API文档**: [API-ENDPOINTS.md](./API-ENDPOINTS.md)

## 💻 技术栈

### 前端技术
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: 纯CSS + CSS变量系统
- **状态管理**: Zustand + 持久化
- **表单**: React Hook Form + Zod验证
- **图标**: 自定义SVG图标库 (160+个)
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
│       ├── icons/               # SVG图标库 (159个)
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
├── 📚 docs/                      # 项目文档
│   ├── 当前开发/                 # 当前开发文档
│   │   ├── 前端系统/            # 前端开发文档
│   │   │   ├── 用户认证/        # 用户认证系统文档
│   │   │   ├── 搜索功能/        # 搜索引擎文档
│   │   │   └── 系统配置/        # 配置管理文档
│   │   ├── 后台系统/            # 后端开发文档
│   │   │   ├── 邮件营销/        # 邮件营销系统文档
│   │   │   ├── 内容管理/        # 内容管理文档
│   │   │   └── 数据库/          # 数据库设计文档
│   │   └── 基础设施/            # 基础设施文档
│   └── 历史档案/                # 历史开发记录
│
├── 🔍 logs/                      # 日志文件
│   ├── backend.log              # 后端服务日志
│   ├── frontend.log             # 前端服务日志
│   └── search.log               # 搜索引擎日志
│
├── 💾 backups/                   # 数据库备份
│   └── database-only/           # 仅数据库备份
│
├── 🛠️ scripts/                  # 分类管理脚本
│   ├── deployment/              # 部署启动脚本
│   │   ├── start-dev.sh        # 开发环境启动
│   │   ├── start-backend.sh    # 后端启动
│   │   └── start-frontend.sh   # 前端启动
│   ├── search/                  # 搜索引擎管理
│   │   ├── deploy-meilisearch.sh # MeiliSearch部署
│   │   ├── manage-meilisearch.sh # 搜索管理工具
│   │   └── check-meilisearch.sh  # 搜索状态检查
│   ├── database/                # 数据库管理
│   │   ├── backup-database-only.sh # 数据库备份
│   │   └── check-database.sh    # 数据库检查
│   ├── backup/                  # 完整备份脚本
│   └── tools/                   # 工具脚本
│       ├── status.sh           # 系统状态检查
│       ├── fix-fields.sh       # 字段描述修复
│       └── load-config.sh      # 配置加载
│
├── scripts.sh                   # 🚀 统一脚本入口 (交互式+命令行)
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
- **Node.js**: 18.x+
- **PostgreSQL**: 14.x+
- **npm**: 9.x+

### 代码规范
- **100%类型安全** - 零any使用
- **纯CSS方案** - 无框架依赖
- **原子设计** - 组件分层架构
- **响应式优先** - 移动端优先设计

### 详细文档
- 📖 [开发脚本使用指南](./DEV-SCRIPTS.md)
- 📋 [项目开发文档](./docs/)
- 🎨 [设计系统文档](./docs/设计系统/)
- 🔧 [API集成文档](./docs/API集成/)

## 🚨 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   ./stop-dev.sh  # 停止所有服务
   ```

2. **数据库连接失败**
   ```bash
   # macOS
   brew services start postgresql
   # Linux
   sudo systemctl start postgresql
   ```

3. **依赖安装失败**
   ```bash
   cd backend && rm -rf node_modules && npm install
   cd frontend && rm -rf node_modules && npm install
   ```

4. **服务状态异常**
   ```bash
   ./status.sh  # 检查详细状态
   tail -f logs/backend.log   # 查看后端日志
   tail -f logs/frontend.log  # 查看前端日志
   ```

## 📈 项目进度

- ✅ **第1-2周** - Strapi CMS + PostgreSQL + 前端API集成
- ✅ **第3周** - 用户认证UI + 支付系统UI + 开发脚本系统
- ✅ **第4周** - NextAuth.js集成 + 邮件营销系统完整实现
- ✅ **第5周** - MeiliSearch搜索引擎 + 用户认证API路由
- 🔄 **第6周** - 支付系统集成 + SEO优化
- 📅 **第7-8周** - 企业级功能 + 部署优化 + 性能监控

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