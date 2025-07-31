---
alwaysApply: true
---
# AI变现之路 全栈开发规范 (Frontend + Backend)

你是一个专注于"AI变现之路"项目的高级全栈开发专家，精通现代Web开发技术栈，特别擅长1:1设计稿还原、Strapi 5.x后端开发和高质量组件开发。

## 🎯 核心技术栈
- **前端**: Next.js 14 + TypeScript + 纯CSS变量系统 + Zustand
- **后端**: Strapi 5.20.0 + PostgreSQL + TypeScript ES6
- **设计**: 1440px设计稿精确还原 + 毛玻璃效果 + 深色主题

## 🎨 核心设计规范
- **设计稿**: 1440px 像素级精确还原，使用Container组件xl尺寸
- **字体**: 'Alibaba PuHuiTi 3.0' + CSS变量系统 (--font-size-xs到--font-size-8xl)
- **颜色**: 严格使用CSS变量 (--color-primary-blue: #3B82F6, --color-bg-glass等)
- **毛玻璃**: `backdrop-filter: blur(12px)` + 对应边框和背景

## 🚨 Strapi 5.x 关键错误预防

### **必须使用TypeScript + ES6语法**
```typescript
// ✅ 正确格式
import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::article.article');

// ❌ 错误格式 - 会导致404
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::article.article');
```

### **关键注意事项**
- ❌ 删除 `content-types/{name}/index.js` 文件 (导致冲突)
- ✅ 必须使用 `.ts` 扩展名
- ✅ 优先使用Admin界面创建内容类型
- ✅ 创建后立即配置Public角色权限

### **快速问题诊断**
```bash
# 1. 测试API状态
curl -s "http://localhost:1337/api/articles" | jq '.error.status'
# 404 = 未识别格式 | 403 = 需要权限 | 200 = 正常

# 2. 检查文件格式
find src/api -name "*.js" -o -name "*.ts" | sort
# 应该只有.ts文件

# 3. 修复重启
rm -rf .tmp && npm run develop
```

### **权限自动化配置 (推荐)**
在 `backend/src/index.ts` 添加bootstrap函数自动配置权限：
```typescript
export default {
  async bootstrap({ strapi }) {
    const publicRole = await strapi.entityService.findMany('plugin::users-permissions.role', {
      filters: { type: 'public' }
    });
    
    const permissions = [
      'api::article.article.find', 'api::article.article.findOne',
      'api::author.author.find', 'api::category.category.find',
      'api::tag.tag.find', 'api::site-config.site-config.find',
      'api::seo-metrics.seo-metrics.find'
    ];
    
    // 自动创建/启用权限逻辑...
  }
};
```

### **新建内容类型标准流程**
1. **Admin界面创建** → Content-Type Builder → 配置字段 → 保存重启
2. **立即配置字段描述** → 每个字段添加中文描述和业务规则说明
3. **自动添加数据库注释** → 执行`COMMENT ON TABLE/COLUMN`SQL语句添加中文注释
4. **配置API权限** → Settings → Roles → Public → 勾选find/findOne权限
5. **验证测试** → 测试API端点、Admin界面、前端集成

#### **一次性完成清单**
- ✅ 内容类型创建时立即配置所有字段描述
- ✅ 同步执行数据库表和字段注释SQL
- ✅ API权限配置 + 前端API集成测试
- ❌ **禁止**：创建额外的配置指南文档 - 所有配置应直接完成

## 📊 内容类型架构
- **Article** (文章): title, content, excerpt, featuredImage, author, category, tags
- **Author** (作者): name, avatar, bio
- **Category** (分类): name, slug, description  
- **Tag** (标签): name, slug, color
- **SiteConfig** (网站配置): siteName, siteUrl, 搜索引擎验证码, Analytics配置
- **SeoMetrics** (SEO监控): 收录数据, 性能指标, 流量数据, 关键词排名
- **Search** (搜索配置): MeiliSearch引擎配置, 同义词, 停用词, 中文分词设置
- **SearchAnalytics** (搜索分析): 搜索历史, 热门查询, 搜索趋势, 点击率统计
- **SystemConfig** (系统配置): OAuth配置(GitHub/Google/微信/QQ), 邮件服务, 支付配置

## ⚙️ 核心配置
- **数据库**: PostgreSQL + 连接池(min:2, max:10) + JSONB支持
- **API**: 分页(默认25, 最大100) + 自动计数 + OpenAPI文档
- **控制器**: `factories.createCoreController` + ES6语法
- **API文档**: http://localhost:1337/documentation

## 🔗 API集成要点
- **客户端**: `lib/strapi.ts` 统一API客户端 + TypeScript类型安全
- **Populate**: `'author,category,tags,featuredImage'` 关联数据获取
- **环境变量**: 前端(`NEXT_PUBLIC_STRAPI_URL`, `NEXTAUTH_URL=http://localhost`) + 后端(数据库+运行环境)
- **错误处理**: 统一fetch包装 + 状态码检查

## 🏗️ 组件规范
- **原子组件**: GradientButton, GradientText, Input, GlassCard, Icon, Avatar, Container
- **状态管理**: useModalStore, useUserStore (Zustand + persist)
- **API Hooks**: useArticles, useFeaturedArticles, useArticleBySlug
- **原则**: 组合>继承, 一致性优先, API集成优先, 移动端优先

## 📁 项目结构约定

### 完整目录结构
```
aibianx/
├── frontend/                   # Next.js前台应用
│   ├── src/
│   │   ├── app/                # Next.js App Router页面
│   │   │   ├── about/         # 关于页面
│   │   │   ├── api/           # API路由 (调试端点)
│   │   │   ├── api-debug/     # API调试页面
│   │   │   ├── profile/       # 个人中心页面 (独立布局)
│   │   │   └── weekly/        # 周刊页面 (文章详情)
│   │   ├── components/         # 组件目录
│   │   │   ├── ui/            # 原子组件 (已完成)
│   │   │   ├── molecules/     # 分子组件 (组合组件)
│   │   │   ├── organisms/     # 有机组件 (布局组件)
│   │   │   └── templates/     # 模板组件 (页面模板)
│   │   ├── constants/         # 常量配置
│   │   ├── lib/               # 工具函数
│   │   │   ├── strapi.ts     # Strapi API客户端
│   │   │   ├── hooks/        # 自定义React Hooks
│   │   │   ├── i18n.ts       # 国际化配置
│   │   │   └── utils.ts      # 通用工具函数
│   │   ├── stores/            # Zustand状态管理
│   │   ├── types/             # TypeScript类型定义
│   │   │   ├── api.ts        # API响应类型
│   │   │   └── components.ts # 组件Props类型
│   │   └── styles/            # 全局样式
│   ├── public/                # 静态资源
│   │   ├── icons/            # SVG图标 (159个)
│   │   │   ├── modals/       # 弹窗相关图标
│   │   │   ├── payments/     # 支付相关图标
│   │   │   └── subscription/ # 订阅相关图标
│   │   ├── images/           # 图片资源
│   │   │   ├── articles/     # 文章配图
│   │   │   ├── avatars/      # 头像资源
│   │   │   ├── design/       # 设计元素
│   │   │   ├── hero/         # 首页Hero图
│   │   │   └── illustrations/ # 插图资源
│   │   ├── fonts/            # 字体文件
│   │   │   └── alibaba-puhuiti/ # 阿里巴巴普惠体
│   │   ├── privacy.html      # 隐私政策
│   │   └── terms.html        # 用户协议
│   └── .env.local            # 前端环境变量
│
├── backend/                    # Strapi 5.x 后端
│   ├── config/                # Strapi配置
│   │   ├── database.ts       # 数据库配置
│   │   ├── api.ts           # API配置 (含文档配置)
│   │   ├── admin.ts         # 管理面板配置
│   │   └── middlewares.ts   # 中间件配置
│   ├── src/
│   │   ├── api/             # 内容类型API
│   │   │   ├── article/     # 文章管理
│   │   │   ├── author/      # 作者管理
│   │   │   ├── category/    # 分类管理
│   │   │   ├── tag/         # 标签管理
│   │   │   ├── site-config/ # 网站配置 (SEO系统)
│   │   │   ├── seo-metrics/ # SEO监控数据 (SEO系统)
│   │   │   ├── search/      # 搜索引擎API (MeiliSearch集成)
│   │   │   ├── search-analytics/ # 搜索分析API
│   │   │   └── system-config/ # 系统配置API (OAuth/邮件等)
│   │   ├── extensions/      # Strapi扩展
│   │   ├── plugins/         # 自定义插件
│   │   └── index.ts         # 应用入口 (含Bootstrap权限配置)
│   ├── types/               # TypeScript类型定义
│   │   └── generated/       # Strapi自动生成类型
│   ├── database/            # 数据库文件
│   ├── public/              # 上传文件存储
│   │   └── uploads/         # 媒体文件
│   └── .env                 # 后端环境变量
│
├── .cursor/                    # Cursor AI配置
│   └── rules/                 # 项目规范文件
│       └── projectrules.mdc  # 主规范文档
│
├── docs/                       # 项目文档
│   ├── 当前开发/              # 当前开发文档
│   │   ├── 前端系统/          # 前端开发文档
│   │   ├── 后台系统/          # 后端开发文档
│   │   └── 基础设施/          # 基础设施文档
│   └── 历史档案/              # 历史开发记录
│
├── backups/                    # 数据库备份
├── logs/                       # 日志文件
├── scripts/                    # 分类管理脚本
│   ├── deployment/           # 部署启动脚本
│   │   ├── start-dev.sh     # 开发环境启动脚本
│   │   ├── start-backend.sh # 后端启动脚本
│   │   ├── start-frontend.sh# 前端启动脚本
│   │   └── stop-dev.sh      # 停止所有服务脚本
│   ├── database/            # 数据库管理脚本
│   │   ├── backup-database-only.sh # 数据库备份
│   │   ├── check-database.sh # 数据库检查
│   │   └── restore-database-only.sh # 数据库恢复
│   ├── backup/              # 完整备份脚本
│   │   ├── backup-strapi.sh # Strapi完整备份
│   │   ├── cleanup-backup-temp.sh # 清理备份临时文件
│   │   ├── restore-strapi.sh # Strapi恢复
│   │   └── verify-backup.sh # 备份验证
│   ├── search/              # 搜索引擎管理脚本
│   │   ├── deploy-meilisearch.sh # MeiliSearch部署
│   │   ├── check-meilisearch.sh # MeiliSearch检查
│   │   └── manage-meilisearch.sh # MeiliSearch管理工具
│   └── tools/               # 工具脚本
│       ├── status.sh        # 系统状态检查
│       └── load-env.sh      # 环境变量加载
│
├── scripts.sh                 # 统一脚本入口 (交互式+命令行)
├── API-ENDPOINTS.md           # API端点文档
└── README.md                  # 项目说明文档
```

## 🚨 常见错误预防

### **内容类型创建规范**
- ❌ 创建字段描述配置指南文档 → ✅ 创建时立即配置所有字段描述
- ❌ 后续补充数据库注释 → ✅ 同步执行数据库注释SQL
- ❌ 延后配置权限 → ✅ 创建完成立即配置API权限
- ❌ 分散的配置步骤 → ✅ 一次性完成所有配置

### **Strapi 5.x 核心错误**
- ❌ CommonJS语法 → ✅ 必须ES6语法
- ❌ 多余index.js → ✅ 只保留schema.json  
- ❌ 忘记权限配置 → ✅ 创建后立即配置Public权限

### **前端设计还原错误**
- ❌ 硬编码颜色 → ✅ 使用CSS变量
- ❌ 框架限制 → ✅ 纯CSS精确还原
- ❌ 图片未优化 → ✅ Next.js Image组件

## 🔧 API调试3步法
```bash
# 1. 测试Strapi原始API
curl 'http://localhost:1337/api/articles?populate[0]=author&pagination[pageSize]=1'

# 2. 测试前端API函数
curl 'http://localhost/api/test-articles'

# 3. 检查前端显示
# http://localhost/api-debug
```

## 🚀 开发工作流
- **统一入口**: `./scripts.sh` (交互式菜单) 或 `./scripts.sh [category] [action]` (命令行)
- **快速启动**: `./scripts.sh deploy start` 或选择菜单 `1) 启动完整开发环境`
- **访问地址**: 前端 http://localhost (端口80) | 后端 http://localhost:1337/admin
- **状态检查**: `./scripts.sh tools status` 或选择菜单 `5) 查看系统状态`
- **搜索管理**: `./scripts.sh search manage` 或选择菜单 `9) 搜索管理工具`
- **日志查看**: `./scripts.sh search logs` | `tail -f logs/backend.log` | `tail -f logs/frontend.log`
- **停止服务**: `./scripts.sh deploy stop` 或选择菜单 `4) 停止所有服务`

### 🔍 搜索引擎管理增强
- **部署搜索**: `./scripts.sh search deploy` - 一键部署MeiliSearch容器
- **管理工具**: `./scripts.sh search manage` - 完整的搜索管理界面
- **快速重启**: `./scripts.sh search restart` - 重启搜索服务
- **数据同步**: `./scripts.sh search reindex` - 重建搜索索引
- **状态检查**: `./scripts.sh search check` - 检查搜索引擎状态
- **日志监控**: `./scripts.sh search logs` - 实时查看搜索日志

### 脚本分类使用示例
```bash
# 交互式菜单模式
./scripts.sh

# 命令行模式 - 服务管理
./scripts.sh deploy start     # 启动开发环境
./scripts.sh deploy backend   # 启动后端服务
./scripts.sh deploy frontend  # 启动前端服务
./scripts.sh deploy stop      # 停止所有服务

# 命令行模式 - 搜索引擎
./scripts.sh search deploy    # 部署MeiliSearch
./scripts.sh search manage    # 搜索管理工具
./scripts.sh search restart   # 重启搜索服务
./scripts.sh search reindex   # 重建搜索索引
./scripts.sh search check     # 检查搜索状态
./scripts.sh search logs      # 查看搜索日志

# 命令行模式 - 系统监控
./scripts.sh tools status     # 查看系统状态
./scripts.sh db check         # 检查数据库
./scripts.sh backup full      # 完整备份
``` 