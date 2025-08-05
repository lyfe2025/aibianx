import type { Metadata } from 'next'
import { BackToTopButton, GlobalCountdownInit, DynamicParticleBackground, ThemeInit, ToastProvider } from '@/components/ui'
import { LayoutController } from '@/components/molecules/LayoutController'
import {
  LoginModal,
  RegisterModal,
  ForgotPasswordModal,
  MembershipModal,
  PaymentModal
} from '@/components/organisms'
import { AuthProvider } from '@/components/auth'
import { getSiteConfig } from '@/lib/strapi'
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
 * - GlobalBackground3D：全站3D背景效果
 * - LayoutController：动态布局控制器（客户端组件）
 * - BackToTopButton：返回顶部按钮
 * - 全局弹窗：登录、注册、会员、支付等弹窗
 * 
 * 🎨 公共样式和SEO：
 * - 全站SEO元数据配置
 * - 结构化数据配置
 * - 全局样式引用
 */

/**
 * 生成动态metadata
 */
async function generateRootMetadata(): Promise<Metadata> {
  // 获取动态网站配置
  const siteConfig = await getSiteConfig()

  return {
    title: {
      default: `${siteConfig.siteName} - 专业的AI商业化平台`,
      template: `%s | ${siteConfig.siteName}`,
    },
    description: siteConfig.siteDescription,
    keywords: siteConfig.primaryKeywords,
    authors: [
      {
        name: `${siteConfig.siteName}团队`,
        url: '/about',
      },
    ],
    creator: siteConfig.siteName,
    metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url: siteConfig.siteUrl,
      siteName: siteConfig.siteName,
      title: `${siteConfig.siteName} - 专业的AI商业化平台`,
      description: siteConfig.siteDescription,
      images: [
        {
          url: siteConfig.defaultOgImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${siteConfig.siteName} - 专业的AI商业化平台`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: `${siteConfig.siteName} - 专业的AI商业化平台`,
      description: siteConfig.siteDescription,
      images: [siteConfig.defaultOgImage || '/og-image.jpg'],
    },
    verification: {
      google: siteConfig.verificationCodes.google || undefined,
      yandex: siteConfig.verificationCodes.yandex || undefined,
      other: {
        baidu: siteConfig.verificationCodes.baidu || undefined,
        bing: siteConfig.verificationCodes.bing || undefined,
      },
    },
    alternates: {
      canonical: siteConfig.siteUrl,
      languages: {
        'zh-CN': siteConfig.siteUrl,
      },
    },
    other: {
      // Google Analytics
      ...(siteConfig.analyticsId && {
        'google-site-verification': siteConfig.verificationCodes.google,
      }),
    },
  }
}

// 导出动态生成的metadata
export const metadata = await generateRootMetadata()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 获取动态网站配置
  const siteConfig = await getSiteConfig()
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 阻塞式主题初始化脚本 - 防止主题颜色闪烁 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const storedTheme = localStorage.getItem('theme-storage');
                if (storedTheme) {
                  const { state } = JSON.parse(storedTheme);
                  if (state && state.theme) {
                    document.documentElement.setAttribute('data-theme', state.theme);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            })();
          `
        }} />
        
        {/* 防止SSR水合时样式闪烁 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 强制修复：确保渐变背景按钮文字始终为白色 - 内联样式最高优先级 */
            div[style*="background: linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"],
            div[style*="background: linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"] *,
            div[style*="background: linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"] span,
            div[style*="background: linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"] div,
            div[style*="background:linear-gradient(90deg,#3B82F6 0%,#A855F7 100%)"],
            div[style*="background:linear-gradient(90deg,#3B82F6 0%,#A855F7 100%)"] *,
            div[style*="background:linear-gradient(90deg,#3B82F6 0%,#A855F7 100%)"] span,
            div[style*="background:linear-gradient(90deg,#3B82F6 0%,#A855F7 100%)"] div {
              color: #FFFFFF !important;
            }
            
            /* 强制修复：渐变背景按钮图标为白色 */
            div[style*="background: linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"] .icon img,
            div[style*="background:linear-gradient(90deg,#3B82F6 0%,#A855F7 100%)"] .icon img {
              filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(105%) contrast(105%) !important;
            }
          `
        }} />
        {/* 动态结构化数据 - 增强SEO效果 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": siteConfig.siteName,
              "description": siteConfig.siteDescription,
              "url": siteConfig.siteUrl,
              "publisher": {
                "@type": "Organization",
                "name": siteConfig.siteName,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteConfig.siteUrl}/icons/logo-main.svg`
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${siteConfig.siteUrl}/weekly?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              },
              "keywords": siteConfig.primaryKeywords.join(', '),
              "sameAs": [
                `https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`
              ]
            }),
          }}
        />

        {/* Google Analytics (如果配置了) */}
        {siteConfig.analyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analyticsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.analyticsId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {/* NextAuth Session Provider - 为整个应用提供认证状态 */}
        <AuthProvider>
          {/* Toast Provider - 为整个应用提供Toast通知功能 */}
          <ToastProvider>
            {/* 主题初始化 - 确保主题正确应用 */}
            <ThemeInit />

          {/* 
            全站粒子背景效果 - DynamicParticleBackground
            使用动态导入，完全避免SSR水合问题，绝对稳定可靠
          */}
          <DynamicParticleBackground />

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
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
