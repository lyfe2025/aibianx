import type { Metadata } from 'next'
import { AppFooter } from '@/components/molecules/AppFooter/AppFooter'
import { BackToTopButton } from '@/components/ui'
import {
    LoginModal,
    RegisterModal,
    ForgotPasswordModal,
    MembershipModal,
    PaymentModal
} from '@/components/organisms'

/**
 * 个人中心专用布局组件 - ProfileLayout
 * 
 * ✅ 布局特点：
 * 1. 无顶部导航栏 - 个人中心使用左侧UserSidebar导航，不需要AppHeader
 * 2. 统一底部菜单栏 - 使用全站公共的AppFooter组件
 * 3. 完整的弹窗支持 - 包含所有全局弹窗组件
 * 4. 返回顶部功能 - 保持与主站一致的用户体验
 * 
 * 🎯 适用页面：
 * - 个人中心主页 (/profile)
 * - 我的收藏 (/profile/bookmarks)
 * - 我的订阅 (/profile/subscription)
 * - 设置 (/profile/settings)
 * 
 * 📍 组件构成：
 * - UserSidebar：左侧导航菜单（在各页面中单独引用）
 * - AppFooter：公共底部菜单栏（统一样式和功能）
 * - BackToTopButton：返回顶部按钮
 * - 全局弹窗：登录、注册、会员、支付等弹窗
 * 
 * ⚠️ 重要说明：
 * - 与主站布局(layout.tsx)的区别：移除了AppHeader顶部导航
 * - 使用相同的AppFooter确保全站底部导航的一致性
 * - 个人中心页面不需要搜索引擎索引，设置了robots配置
 */

export const metadata: Metadata = {
    title: {
        default: '个人中心 - AI变现之路',
        template: '%s - 个人中心 | AI变现之路'
    },
    description: '管理您的个人信息、收藏内容、订阅服务和账户设置',
    robots: {
        index: false, // 个人中心页面不需要搜索引擎索引
        follow: false,
    },
}

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* 个人中心页面结构 - 专用布局，无顶部导航栏 */}
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--color-bg-primary)'
            }}>
                {/* 
                  页面主要内容区域
                  包含：UserSidebar（左侧导航） + 页面内容（右侧）
                */}
                <main style={{ flex: 1 }}>
                    {children}
                </main>

                {/* 
                  全站统一底部导航 - AppFooter
                  ✅ 与主站使用相同的底部菜单栏，确保一致性
                  ✅ 包含：导航链接、资源链接、联系方式、社交媒体、版权信息
                */}
                <AppFooter />
            </div>

            {/* 
              全站返回顶部按钮 - BackToTopButton
              保持与主站一致的用户体验
            */}
            <BackToTopButton />

            {/* 
              全站弹窗组件 - 确保在个人中心也能正常使用
              包含：登录、注册、忘记密码、会员升级、支付等弹窗
            */}
            <LoginModal />
            <RegisterModal />
            <ForgotPasswordModal />
            <MembershipModal />
            <PaymentModal />
        </>
    )
} 