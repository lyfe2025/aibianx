import type { Metadata } from 'next'
import { AppHeader } from '@/components/molecules/AppHeader/AppHeader'
import { AppFooter } from '@/components/molecules/AppFooter/AppFooter'
import { BackToTopButton } from '@/components/ui'
import './globals.css'

/**
 * 全站根布局组件 - RootLayout
 * 
 * ⚠️ 重要说明：这是全站公共布局，为所有页面提供统一的结构
 * 
 * 📍 包含的公共组件：
 * 1. AppHeader - 顶部导航栏（Logo、菜单、登录按钮）
 * 2. AppFooter - 底部导航栏（链接、社交媒体、版权信息）
 * 3. BackToTopButton - 返回顶部按钮
 * 
 * 🔧 修改影响：
 * - 对本文件的修改会影响到以下所有页面：
 *   • 主页 (/)
 *   • 周刊页面 (/weekly)
 *   • 关于页面 (/about)
 *   • 文章详情页面 (/weekly/[slug])
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
        {/* 全站页面结构 - 包含公共头部和底部 */}
        <div id="root" style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* 
            全站公共头部导航 - AppHeader
            修改 /src/components/molecules/AppHeader/AppHeader.tsx 会影响所有页面
          */}
          <AppHeader />

          {/* 页面主要内容区域 - 各页面独立内容在此渲染 */}
          <main style={{ flex: 1 }}>
            {children}
          </main>

          {/* 
            全站公共底部导航 - AppFooter
            修改 /src/components/molecules/AppFooter/AppFooter.tsx 会影响所有页面
          */}
          <AppFooter />
        </div>

        {/* 
          全站返回顶部按钮 - BackToTopButton
          客户端组件，在所有页面中可用
        */}
        <BackToTopButton />
      </body>
    </html>
  )
}
