import type { Metadata } from 'next'
import { BackToTopButton, GlobalCountdownInit } from '@/components/ui'
import { LayoutController } from '@/components/molecules/LayoutController'
import {
  LoginModal,
  RegisterModal,
  ForgotPasswordModal,
  MembershipModal,
  PaymentModal
} from '@/components/organisms'
import './globals.css'

/**
 * 全站根布局组件 - RootLayout
 * 
 * ⚠️ 重要说明：这是全站公共布局，为大部分页面提供统一的结构
 * 
 * 📍 布局控制逻辑：
 * - 个人中心页面(/profile/*)：不渲染AppHeader，使用左侧UserSidebar导航
 * - 其他页面：正常渲染AppHeader + AppFooter
 * 
 * 🎯 适用页面：
 * - 主页 (/) - 包含AppHeader
 * - 周刊页面 (/weekly) - 包含AppHeader
 * - 关于页面 (/about) - 包含AppHeader  
 * - 文章详情页面 (/weekly/[slug]) - 包含AppHeader
 * - 个人中心页面 (/profile/*) - 不包含AppHeader，由profile/layout.tsx控制
 * 
 * 🔧 组件构成：
 * - LayoutController：动态布局控制器（客户端组件）
 * - BackToTopButton：返回顶部按钮
 * - 全局弹窗：登录、注册、会员、支付等弹窗
 * 
 * 🎨 公共样式和SEO：
 * - 全站SEO元数据配置
 * - 结构化数据配置
 * - 全局样式引用
 */

const siteConfig = {
  name: 'AI变现之路',
  description: '汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具。助你掌握AI变现技能，实现财务突破。',
  keywords: ['AI变现', 'AI商业化', 'ChatGPT', 'Midjourney', '人工智能', 'AI工具', 'AI赚钱', 'AI创业', 'AI教程', 'AI应用'],
}

const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - 专业的AI商业化平台`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'AI变现之路团队',
      url: '/about',
    },
  ],
  creator: 'AI变现之路',
  metadataBase: new URL('https://aibianx.com'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://aibianx.com',
    siteName: 'AI变现之路',
    title: 'AI变现之路 - 专业的AI商业化平台',
    description: '汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具。助你掌握AI变现技能，实现财务突破。',
    images: [
      {
        url: '/og-image.jpg', // 使用本地资源
        width: 1200,
        height: 630,
        alt: 'AI变现之路 - 专业的AI商业化平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aibianx',
    creator: '@aibianx',
    title: 'AI变现之路 - 专业的AI商业化平台',
    description: '汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具。助你掌握AI变现技能，实现财务突破。',
    images: ['/og-image.jpg'], // 使用本地资源
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://aibianx.com',
    languages: {
      'zh-CN': 'https://aibianx.com',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 结构化数据 - 增强SEO效果 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI变现之路",
              "description": "汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具",
              "url": "https://aibianx.com",
              "publisher": {
                "@type": "Organization",
                "name": "AI变现之路",
                "logo": {
                  "@type": "ImageObject",
                  "url": "/icons/logo-main.svg"
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://aibianx.com/weekly?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body>
        {/* 
          动态布局控制器 - LayoutController
          根据页面路径智能控制AppHeader的显示
          个人中心页面不包含AppHeader，其他页面正常显示
        */}
        <LayoutController>{children}</LayoutController>

        {/* 
          全站返回顶部按钮 - BackToTopButton
          客户端组件，在所有页面中可用
        */}
        <BackToTopButton />

        {/* 
          全站弹窗组件 - 所有页面共享
          确保登录、注册、支付等弹窗在任何页面都能正常显示
        */}
        <LoginModal />
        <RegisterModal />
        <ForgotPasswordModal />
        <MembershipModal />
        <PaymentModal />

        {/* 全局倒计时初始化 */}
        <GlobalCountdownInit />
      </body>
    </html>
  )
}
