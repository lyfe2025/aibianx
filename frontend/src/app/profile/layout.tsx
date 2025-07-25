import type { Metadata } from 'next'
import { UserSidebar } from '@/components/molecules'
import { AppHeader } from '@/components/molecules'
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
 * 1. 公共顶部菜单 - AppHeader统一的顶部导航栏
 * 2. 左侧固定菜单 - UserSidebar统一管理个人中心导航
 * 3. 右侧内容区域 - 动态展示各个子页面内容
 * 4. 完整的弹窗支持 - 包含所有全局弹窗组件
 * 5. 继承主布局的公共组件 - 返回顶部按钮由主布局提供，避免重复
 * 
 * 🎯 适用页面：
 * - 个人中心主页 (/profile)
 * - 我的收藏 (/profile/bookmarks)
 * - 我的订阅 (/profile/subscription)
 * - 设置 (/profile/settings)
 * 
 * 📍 组件构成：
 * - AppHeader：公共顶部导航菜单
 * - UserSidebar：左侧固定导航菜单（个人中心专用）
 * - 页面内容区域：右侧动态内容，由子页面控制
 * - 全局弹窗：登录、注册、会员、支付等弹窗
 * 
 * ⚠️ 重要说明：
 * - 与主站布局(layout.tsx)保持一致：都使用AppHeader顶部导航
 * - AppFooter底部菜单栏由根布局的LayoutController统一管理，确保全站一致性
 * - 个人中心页面不需要搜索引擎索引，设置了robots配置
 * - 左侧菜单在所有profile子页面间共享，避免重复代码
 * - 已删除左侧菜单中的首页菜单项，避免导航冗余
 * - BackToTopButton由主布局提供，不在此重复添加
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
            {/* 公共顶部导航栏 */}
            <AppHeader />

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
                  添加marginTop以适应固定顶部菜单高度(98px)
                */}
                <main style={{
                    flex: 1,
                    display: 'flex',
                    marginTop: '98px' // 适应AppHeader的固定高度
                }}>
                    {/* 左侧导航栏 - UserSidebar */}
                    <UserSidebar />

                    {/* 右侧内容区域 */}
                    <div style={{
                        flex: 1,
                        minHeight: 'calc(100vh - 98px)', // 减去AppHeader高度
                        background: 'transparent'
                    }}>
                        {children}
                    </div>
                </main>
            </div>

            {/* 
              全站弹窗组件 - 确保在个人中心也能正常使用
              包含：登录、注册、忘记密码、会员升级、支付等弹窗
              注意：BackToTopButton已由主布局提供，此处不重复添加
            */}
            <LoginModal />
            <RegisterModal />
            <ForgotPasswordModal />
            <MembershipModal />
            <PaymentModal />
        </>
    )
} 