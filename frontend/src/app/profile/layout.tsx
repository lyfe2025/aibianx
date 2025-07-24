import type { Metadata } from 'next'
import { BackToTopButton } from '@/components/ui'
import { UserSidebar } from '@/components/molecules'
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
 * 1. 左侧固定菜单 - UserSidebar统一管理个人中心导航
 * 2. 右侧内容区域 - 动态展示各个子页面内容
 * 3. 无顶部导航栏 - 个人中心使用左侧UserSidebar导航，不需要AppHeader
 * 4. 无底部菜单栏 - 由根布局的LayoutController统一控制，确保全站一致性
 * 5. 完整的弹窗支持 - 包含所有全局弹窗组件
 * 6. 返回顶部功能 - 保持与主站一致的用户体验
 * 
 * 🎯 适用页面：
 * - 个人中心主页 (/profile)
 * - 我的收藏 (/profile/bookmarks)
 * - 我的订阅 (/profile/subscription)
 * - 设置 (/profile/settings)
 * 
 * 📍 组件构成：
 * - UserSidebar：左侧固定导航菜单（公共组件）
 * - 页面内容区域：右侧动态内容，由子页面控制
 * - BackToTopButton：返回顶部按钮
 * - 全局弹窗：登录、注册、会员、支付等弹窗
 * 
 * ⚠️ 重要说明：
 * - 与主站布局(layout.tsx)的区别：移除了AppHeader顶部导航
 * - AppFooter底部菜单栏由根布局的LayoutController统一管理，确保全站一致性
 * - 个人中心页面不需要搜索引擎索引，设置了robots配置
 * - 左侧菜单在所有profile子页面间共享，避免重复代码
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
            {/* 个人中心页面结构 - 左右分栏布局 */}
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'transparent' // 改为透明，让粒子可见
            }}>
                {/* 
                  页面主要内容区域 - 左右分栏布局
                  左侧：UserSidebar固定导航菜单
                  右侧：动态页面内容区域
                */}
                <main style={{
                    flex: 1,
                    display: 'flex'
                }}>
                    {/* 左侧导航栏 - UserSidebar */}
                    <UserSidebar />

                    {/* 右侧内容区域 */}
                    <div style={{
                        flex: 1,
                        minHeight: '100vh',
                        background: 'transparent'
                    }}>
                        {children}
                    </div>
                </main>
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