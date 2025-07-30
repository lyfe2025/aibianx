# 🚀 AI变现之路 (aibianx)

> 探索人工智能商业化的无限可能

AI变现之路是一个完整的AI内容平台，包含会员订阅系统、专业内容管理和用户社区功能。

## ✨ 项目特色

- 🎨 **像素级设计还原** - 1440px设计稿100%精确还原
- 🔮 **毛玻璃美学** - 现代化深色主题界面
- ⚡ **高性能架构** - Next.js 14 + Strapi 5.x + PostgreSQL
- 🛡️ **类型安全** - 100% TypeScript，零any使用
- 📱 **完全响应式** - 支持桌面端和移动端
- 🌍 **国际化支持** - 中英文多语言切换

## 🎯 核心功能

### 🏠 前端平台
- ✅ **用户认证系统** - 登录/注册/密码找回
- ✅ **内容浏览** - 文章列表/详情/搜索/筛选
- ✅ **会员订阅** - 多种会员方案/支付集成
- ✅ **个人中心** - 用户资料/收藏/订阅管理
- ✅ **主题切换** - 亮色/暗色模式无缝切换

### ⚙️ 后端管理
- ✅ **内容管理** - Strapi 5.x 专业CMS
- ✅ **用户管理** - 完整的用户权限体系
- ✅ **数据分析** - 文章阅读量/用户行为统计
- ✅ **API接口** - RESTful API + 自动文档生成

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

### 后端技术
- **CMS**: Strapi 5.x
- **数据库**: PostgreSQL
- **ORM**: Strapi内置ORM
- **认证**: JWT + Session
- **文件存储**: 本地存储/云存储

### 开发工具
- **包管理**: npm
- **代码规范**: ESLint + Prettier
- **类型检查**: TypeScript Strict Mode
- **版本控制**: Git

## 📁 项目结构

```
aibianx/
├── 🌐 frontend/          # Next.js前端应用
│   ├── src/
│   │   ├── app/          # Next.js App Router页面
│   │   ├── components/   # React组件库
│   │   │   ├── ui/      # 原子组件
│   │   │   ├── molecules/ # 分子组件
│   │   │   └── organisms/ # 有机组件
│   │   ├── stores/       # Zustand状态管理
│   │   ├── lib/          # 工具函数和API客户端
│   │   └── types/        # TypeScript类型定义
│   └── public/           # 静态资源
│       ├── icons/        # SVG图标库
│       ├── images/       # 图片资源
│       └── fonts/        # 字体文件
│
├── ⚙️ backend/           # Strapi后端应用
│   ├── src/
│   │   ├── api/          # API路由和控制器
│   │   └── extensions/   # Strapi扩展
│   ├── config/           # 配置文件
│   └── database/         # 数据库相关
│
├── 📚 docs/              # 项目文档
├── 🛠️ sh/               # 开发脚本
└── 🔧 配置文件            # 各种配置文件
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
- 🔄 **第4周** - NextAuth.js集成 + 真实支付功能
- 📅 **第5-6周** - 邮件营销 + SEO优化 + 性能优化
- 📅 **第7-8周** - 企业级功能 + 部署优化

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