# AI变现之路 React + 纯CSS 项目 Cursor Rules

你是一个专注于"AI变现之路"项目的高级全栈开发专家，精通现代Web开发技术栈，特别擅长1:1设计稿还原和高质量组件开发。

## 🎯 项目概述
- **项目名称**: AI变现之路 (aibianx)
- **项目类型**: AI内容平台 + 会员订阅系统
- **设计标准**: 1440px设计稿，要求像素级精确还原
- **核心特色**: 毛玻璃效果、渐变设计、深色主题
- **技术方案**: React 18 + 纯CSS实现，确保100%设计稿还原

## 💻 核心技术栈

### 前端架构
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript (100%类型安全，零any使用)
- **UI库**: React 18
- **样式**: 纯CSS + CSS变量系统 + CSS Modules (已移除Tailwind CSS)
- **状态管理**: Zustand + persist中间件
- **表单**: React Hook Form + Zod验证
- **动画**: CSS原生动画 + transition
- **图标**: 自定义SVG图标库 (124个本地化图标)

### 样式架构 (重要更新)
- **设计模式**: 原子设计 (Atoms → Molecules → Organisms → Templates → Pages)
- **样式方案**: CSS变量 + 语义化类名 + CSS Modules
- **精确还原**: 直接使用设计稿数值，无框架限制
- **毛玻璃效果**: 原生backdrop-filter实现
- **响应式**: 原生CSS媒体查询
- **模块化样式**: 每个组件都有独立的 .module.css 文件

## 🎨 设计系统要求

### 1:1设计稿还原标准 (纯CSS优势)
- **设计稿宽度**: 1440px (使用Container组件的xl尺寸)
- **还原精度**: 像素级精确，包括颜色、字体、间距、效果
- **优先级**: 设计还原度 > 代码简洁度
- **技术优势**: 纯CSS无限制，可精确匹配任何设计稿数值

### CSS变量系统 (严格使用)
```css
/* 主色调 */
--color-primary-blue: #3B82F6
--color-primary-purple: #8B5CF6
--gradient-primary: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)

/* 背景色 */
--color-bg-primary: #030303
--color-bg-secondary: rgba(26, 26, 26, 0.30)
--color-bg-glass: rgba(26, 26, 26, 0.85)
--color-bg-input: rgba(18, 18, 18, 0.50)

/* 文字色 */
--color-text-primary: #FFFFFF
--color-text-secondary: #D1D5DB
--color-text-muted: #9CA3AF
--color-text-disabled: #6B7280

/* 边框色 */
--color-border-primary: rgba(42, 42, 42, 0.70)
--color-border-secondary: #2A2A2A
--color-border-active: #3B82F6
```

### 字体系统 (精确使用)
```css
/* 字体家族 */
--font-family-primary: 'Alibaba PuHuiTi 3.0', sans-serif

/* 字体大小 (严格按设计稿) */
--font-size-xs: 12px      /* 小标签 */
--font-size-sm: 13.33px   /* 按钮文字 */
--font-size-base: 14px    /* 正文 */
--font-size-lg: 16px      /* 基础大小 */
--font-size-xl: 18px      /* 卡片标题 */
--font-size-2xl: 20px     /* 副标题 */
--font-size-3xl: 24px     /* 大标题 */
--font-size-4xl: 28px     /* 弹窗标题 */
--font-size-5xl: 32px     /* 区块标题 */
--font-size-6xl: 36px     /* 页面大标题 */
--font-size-7xl: 48px     /* 关于页标题 */
--font-size-8xl: 64px     /* Hero标题 */
```

### 毛玻璃效果 (核心特色)
```css
/* 标准毛玻璃卡片 */
background: var(--color-bg-glass);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid var(--color-border-primary);

/* 导航栏毛玻璃 */
backdrop-filter: blur(64px);
border-bottom: 1px solid rgba(42, 42, 42, 0.60);

/* 输入框毛玻璃 */
background: var(--color-bg-input);
backdrop-filter: blur(4px);
```

## 🏗️ 组件库架构

### 已完成原子组件 (UI库基础)
```typescript
// 从统一入口导入
import { 
  GradientButton,    // 渐变按钮 (sm/md/lg, primary/outline)
  GradientText,      // 渐变文字 (xs-8xl尺寸, normal-bold字重)
  Input,             // 输入框 (支持图标、错误状态、标签)
  GlassCard,         // 毛玻璃卡片 (default/hover/active变体)
  Icon,              // 图标组件 (xs-xl尺寸, 自动路径映射)
  Avatar,            // 头像组件 (图片+占位符)
  Container          // 容器组件 (sm-xl尺寸, xl=1440px)
} from '@/components/ui'
```

### 已完成分子组件 (功能组合)
```typescript
// 从molecules导入业务组件
import {
  // 首页相关组件
  ArticleCard,       // 文章卡片 (图片+标题+描述+标签)
  FeatureCard,       // 特性卡片 (图标+标题+描述)
  TestimonialCard,   // 推荐卡片 (头像+姓名+评价)
  SearchBar,         // 搜索栏 (输入框+筛选)
  StatsSection,      // 统计区块 (数字展示)
  PricingCard,       // 价格卡片 (套餐展示)
  RelatedArticles,   // 相关文章 (文章列表)
  ResourcesSection,  // 资源区块 (资源展示)
  
  // 认证相关组件
  LoginForm,         // 登录表单 (邮箱+密码)
  RegisterForm,      // 注册表单 (邮箱+密码+确认)
  ForgotPasswordForm,// 忘记密码表单 (邮箱重置)
  
  // 个人中心相关组件 ✨ 新增
  UserSidebar,       // 用户侧边栏 (用户信息+导航菜单)
  StatCard,          // 统计卡片 (图标+数字+标题)
  CollectionCard,    // 收藏卡片 (封面+标题+时间)
  SearchFilter,      // 搜索筛选 (筛选按钮+搜索框+视图切换)
  InviteSection,     // 邀请奖励 (邀请码+统计+奖励规则)
  SettingsForm,      // 设置表单 (标签页+表单项+开关)
} from '@/components/molecules'
```

### 已完成有机组件 (布局容器)
```typescript
// 从organisms导入布局组件
import {
  Header,            // 网站头部 (导航+用户菜单)
  Footer,            // 网站尾部 (链接+版权)
  Hero,              // 首页英雄区 (标题+描述+CTA)
  
  // 弹窗组件
  LoginModal,        // 登录弹窗 (表单+社交登录)
  RegisterModal,     // 注册弹窗 (表单+协议)
  ForgotPasswordModal, // 忘记密码弹窗 (重置表单)
  MembershipModal,   // 会员弹窗 (套餐选择+支付)
} from '@/components/organisms'
```

### 状态管理 (Zustand)
```typescript
// 全局状态管理
import { useModalStore, useUserStore } from '@/stores'

// modalStore: 弹窗状态管理
// - 登录弹窗、注册弹窗、忘记密码弹窗、会员弹窗等
// userStore: 用户状态管理
// - 用户认证状态、会员状态、个人信息等
```

## 📁 项目目录结构 (完整版)

```
aibianx/
├── frontend/                   # Next.js前台应用
│   ├── src/
│   │   ├── app/                # Next.js App Router页面
│   │   │   ├── globals.css     # 全局样式和CSS变量
│   │   │   ├── layout.tsx      # 根布局组件
│   │   │   ├── page.tsx        # 首页
│   │   │   ├── about/          # 关于我们页面
│   │   │   ├── articles/       # 文章列表和详情页面
│   │   │   └── profile/        # 个人中心页面组 ✨ 新增
│   │   │       ├── page.tsx         # 个人中心主页
│   │   │       ├── bookmarks/       # 收藏页面
│   │   │       │   └── page.tsx
│   │   │       ├── subscription/    # 订阅页面
│   │   │       │   └── page.tsx
│   │   │       └── settings/        # 设置页面
│   │   │           └── page.tsx
│   │   │
│   │   ├── components/         # 组件目录
│   │   │   ├── ui/            # 原子组件 (已完成7个)
│   │   │   │   ├── GradientButton/
│   │   │   │   │   ├── GradientButton.tsx
│   │   │   │   │   ├── GradientButton.module.css
│   │   │   │   │   └── index.ts
│   │   │   │   ├── GradientText/
│   │   │   │   ├── Input/
│   │   │   │   ├── GlassCard/
│   │   │   │   ├── Icon/
│   │   │   │   ├── Avatar/
│   │   │   │   ├── Container/
│   │   │   │   └── index.ts    # 统一导出
│   │   │   │
│   │   │   ├── molecules/     # 分子组件 (已完成16个)
│   │   │   │   ├── ArticleCard/
│   │   │   │   ├── FeatureCard/
│   │   │   │   ├── TestimonialCard/
│   │   │   │   ├── SearchBar/
│   │   │   │   ├── StatsSection/
│   │   │   │   ├── PricingCard/
│   │   │   │   ├── RelatedArticles/
│   │   │   │   ├── ResourcesSection/
│   │   │   │   ├── LoginForm/
│   │   │   │   ├── RegisterForm/
│   │   │   │   ├── ForgotPasswordForm/
│   │   │   │   ├── UserSidebar/     # ✨ 新增用户侧边栏
│   │   │   │   ├── StatCard/        # ✨ 新增统计卡片
│   │   │   │   ├── CollectionCard/  # ✨ 新增收藏卡片
│   │   │   │   ├── SearchFilter/    # ✨ 新增搜索筛选
│   │   │   │   ├── InviteSection/   # ✨ 新增邀请奖励
│   │   │   │   ├── SettingsForm/    # ✨ 新增设置表单
│   │   │   │   └── index.ts    # 统一导出
│   │   │   │
│   │   │   ├── organisms/     # 有机组件 (已完成8个)
│   │   │   │   ├── Header/
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Header.module.css
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Footer/
│   │   │   │   ├── Hero/
│   │   │   │   ├── LoginModal/
│   │   │   │   ├── RegisterModal/
│   │   │   │   ├── ForgotPasswordModal/
│   │   │   │   ├── MembershipModal/
│   │   │   │   └── index.ts    # 统一导出
│   │   │   │
│   │   │   └── templates/     # 模板组件 (预留)
│   │   │       └── index.ts
│   │   │
│   │   ├── stores/            # Zustand状态管理
│   │   │   ├── modalStore.ts  # 弹窗状态
│   │   │   ├── userStore.ts   # 用户状态
│   │   │   └── index.ts       # 统一导出
│   │   │
│   │   ├── lib/               # 工具函数
│   │   │   ├── utils.ts       # 通用工具
│   │   │   ├── constants.ts   # 常量定义
│   │   │   └── validations.ts # 表单验证
│   │   │
│   │   └── types/             # TypeScript类型定义
│   │       ├── user.ts        # 用户相关类型
│   │       ├── article.ts     # 文章相关类型
│   │       └── common.ts      # 通用类型
│   │
│   ├── public/                # 静态资源
│   │   ├── icons/            # SVG图标 (124个)
│   │   │   ├── logo-*.svg              # 品牌标识 (6个变体)
│   │   │   ├── nav-indicator-*.svg     # 导航指示器 (4个页面变体)
│   │   │   ├── social-*.svg            # 社交媒体图标 (6个平台)
│   │   │   ├── tag-*.svg               # 标签图标 (4种分类)
│   │   │   ├── user-*.svg              # 用户相关图标
│   │   │   ├── date-*.svg              # 时间相关图标
│   │   │   ├── share-*.svg             # 分享功能图标
│   │   │   ├── contact-*.svg           # 联系方式图标
│   │   │   ├── modals/                 # 弹窗专用图标 (31个)
│   │   │   │   ├── close-button-*.svg
│   │   │   │   ├── email-icon-*.svg
│   │   │   │   ├── password-*.svg
│   │   │   │   └── ...
│   │   │   └── payments/               # 支付方式图标 (4个)
│   │   │       ├── alipay-icon.svg
│   │   │       ├── wechat-pay-icon.svg
│   │   │       └── ...
│   │   │
│   │   ├── images/           # 图片资源
│   │   │   ├── articles/     # 文章配图 (14个)
│   │   │   ├── avatars/      # 用户头像 (2个)
│   │   │   ├── hero/         # 首页展示设备 (3个)
│   │   │   └── illustrations/ # 功能插图 (5个)
│   │   │
│   │   ├── fonts/            # 字体文件
│   │   │   └── alibaba-puhuiti/ # 阿里巴巴普惠体 3.0 (7个字重)
│   │   │
│   │   ├── favicon.ico       # 网站图标
│   │   └── ...
│   │
│   ├── package.json          # 项目依赖
│   ├── tsconfig.json         # TypeScript配置
│   ├── next.config.js        # Next.js配置
│   └── tailwind.config.js    # 已移除，使用纯CSS
│
├── admin/                    # 管理后台 (预留)
├── docs/                     # 项目文档
│   ├── 架构文档/             # 架构设计文档
│   ├── 设计稿/               # UI设计稿
│   └── 修复记录/             # 开发记录
└── sh/                       # 脚本工具
    ├── build.sh             # 构建脚本
    └── deploy.sh            # 部署脚本
```

## 🎨 CSS Modules 使用规范

### 命名约定
```typescript
// 组件文件命名
ComponentName.tsx         // 组件主文件
ComponentName.module.css  // 对应样式文件
index.ts                  // 导出文件

// CSS类名约定 (camelCase)
.componentName           // 组件根类名
.componentNameHeader     // 子元素类名
.componentNameActive     // 状态类名
```

### 导入和使用
```typescript
// 组件中导入样式
import styles from './ComponentName.module.css'

// 使用方式
<div className={styles.componentName}>
  <h1 className={styles.componentNameHeader}>标题</h1>
  <div className={`${styles.content} ${active ? styles.active : ''}`}>
    内容
  </div>
</div>
```

### 全局样式变量
```css
/* globals.css中定义CSS变量 */
:root {
  --color-primary-blue: #3B82F6;
  --font-size-lg: 16px;
  /* ... 其他变量 */
}

/* 组件样式中使用 */
.button {
  color: var(--color-primary-blue);
  font-size: var(--font-size-lg);
}
```

## 🛠️ 组件开发流程

### 1. 组件创建标准流程
```bash
# 1. 创建组件目录
mkdir src/components/molecules/NewComponent

# 2. 创建必需文件
touch NewComponent.tsx
touch NewComponent.module.css  
touch index.ts
```

### 2. 组件文件模板
```typescript
// NewComponent.tsx
'use client'

import React from 'react'
import styles from './NewComponent.module.css'

interface NewComponentProps {
  className?: string
  // 其他属性...
}

export const NewComponent: React.FC<NewComponentProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`${styles.newComponent} ${className}`}>
      {/* 组件内容 */}
    </div>
  )
}

export default NewComponent
```

```css
/* NewComponent.module.css */
.newComponent {
  /* 组件样式 */
}
```

```typescript
// index.ts
export { NewComponent, default } from './NewComponent'
```

### 3. 更新导出索引
```typescript
// 在对应的index.ts中添加导出
export * from './NewComponent'
```

## 📱 页面路由架构

### 已完成页面结构
```
/ (首页)
├── /about (关于我们)
├── /articles (文章列表)
│   └── /articles/[slug] (文章详情)
└── /profile (个人中心) ✨ 新增
    ├── /profile (个人中心主页)
    ├── /profile/bookmarks (我的收藏)
    ├── /profile/subscription (我的订阅)
    └── /profile/settings (设置)
```

### 页面组件模板
```typescript
// 标准页面组件结构
'use client'

import React from 'react'
import { Container } from '@/components/ui'
import { Header, Footer } from '@/components/organisms'

export default function PageName() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />
      
      <main className="page-main">
        <Container size="xl">
          {/* 页面内容 */}
        </Container>
      </main>

      <Footer />
      
      <style jsx>{`
        .page-main {
          padding: 32px 0 80px;
          min-height: calc(100vh - 80px);
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
          .page-main {
            padding: 20px 0 60px;
          }
        }
      `}</style>
    </div>
  )
}
```

## 🚀 开发进度追踪

### ✅ 已完成功能
- **基础UI组件库** (7个原子组件)
- **首页完整功能** (Hero区、文章展示、统计数据)
- **认证系统** (登录、注册、忘记密码弹窗)
- **会员订阅** (价格展示、支付弹窗)
- **个人中心系统** ✨ (用户管理、收藏、订阅、设置)

### 🔄 进行中功能
- **文章详情页** (内容展示、相关推荐)
- **搜索功能** (全文搜索、筛选排序)

### 📋 待开发功能
- **评论系统** (文章评论、回复)
- **通知系统** (站内消息、邮件通知)
- **管理后台** (内容管理、用户管理)
- **数据分析** (用户行为、内容统计)

## 🎯 性能优化要求

### 图片优化
- 强制使用 Next.js Image 组件
- 首屏图片设置 priority={true}
- 非首屏图片自动懒加载

### 代码分割
- 页面级别自动代码分割
- 组件按需加载
- 第三方库动态导入

### CSS优化
- CSS变量减少重复计算
- CSS Modules避免样式冲突
- 关键CSS内联，非关键CSS延迟加载

### 状态管理优化
- Zustand选择器避免过度渲染
- 状态持久化减少初始化时间
- 合理的状态分片

记住：这是一个追求极致设计还原度和用户体验的高端项目，每个细节都要精雕细琢！纯CSS + CSS Modules方案让我们有能力实现100%的设计稿还原，同时保持代码的可维护性和性能。