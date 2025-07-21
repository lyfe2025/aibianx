import type { Metadata } from 'next'
import { AppHeader } from '@/components/molecules/AppHeader/AppHeader'
import { AppFooter } from '@/components/molecules/AppFooter/AppFooter'
import { BackToTopButton } from '@/components/ui'
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
 * 📍 包含的公共组件：
 * 1. AppHeader - 顶部导航栏（Logo、菜单、登录按钮）- 个人中心页面除外
 * 2. AppFooter - 底部导航栏（链接、社交媒体、版权信息）- 个人中心有独立控制
 * 3. BackToTopButton - 返回顶部按钮
 * 
 * 🔧 布局控制逻辑：
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
 * 🎨 公共样式和SEO：
 * - 全站SEO元数据配置
 * - 结构化数据配置
 * - 全局样式引用
 */

export const metadata: Metadata = {
  title: {
    default: 'AI变现之路 - 专业的AI商业化平台',
    template: '%s | AI变现之路'
  },
  description: '汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具。从技术指南到商业案例，助你掌握AI变现技能，实现财务突破。',
  keywords: ['AI变现', 'ChatGPT', 'Midjourney', 'AI工具', 'AI创业', '人工智能', '技术变现', 'AI应用'],
  authors: [{ name: 'AI变现之路团队' }],
  creator: 'AI变现之路',
  publisher: 'AI变现之路',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://aibianx.com',
    siteName: 'AI变现之路',
    title: 'AI变现之路 - 专业的AI商业化平台',
    description: '汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具。助你掌握AI变现技能，实现财务突破。',
    images: [
      {
        url: 'https://aibianx.com/images/og-image.jpg',
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
    images: ['https://aibianx.com/images/og-image.jpg'],
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
                  "url": "https://aibianx.com/images/logo.png"
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
          全站页面结构 - 根据页面路径动态控制布局
          个人中心页面不包含AppHeader，其他页面正常显示
        */}
        <LayoutContent>{children}</LayoutContent>

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
      </body>
    </html>
  )
}

/**
 * 布局内容组件 - 根据路径动态控制AppHeader显示
 * 
 * 🎯 功能：
 * - 个人中心页面(/profile/*)：不显示AppHeader
 * - 其他页面：正常显示AppHeader + AppFooter
 */
function LayoutContent({ children }: { children: React.ReactNode }) {
  'use client'

  const { usePathname } = require('next/navigation')
  const pathname = usePathname()

  // 检查是否为个人中心页面
  const isProfilePage = pathname?.startsWith('/profile')

  if (isProfilePage) {
    // 个人中心页面：不渲染AppHeader和AppFooter，由profile/layout.tsx完全控制
    return (
      <div id="root" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* 个人中心页面内容 - 无AppHeader */}
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    )
  }

  // 其他页面：正常布局，包含AppHeader + AppFooter
  return (
    <div id="root" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 
        全站公共头部导航 - AppHeader
        只在非个人中心页面显示
      */}
      <AppHeader />

      {/* 页面主要内容区域 - 各页面独立内容在此渲染 */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* 
        全站公共底部导航 - AppFooter
        只在非个人中心页面显示（个人中心由profile/layout.tsx控制）
      */}
      <AppFooter />
    </div>
  )
}
