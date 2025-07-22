'use client'

import { usePathname } from 'next/navigation'
import { AppHeader } from '@/components/molecules/AppHeader/AppHeader'
import { AppFooter } from '@/components/molecules/AppFooter/AppFooter'
import { PageTransition } from '@/components/ui'

interface LayoutControllerProps {
    children: React.ReactNode
}

/**
 * 布局控制器组件 - LayoutController
 * 
 * 🎯 功能：
 * - 个人中心页面(/profile/*)：不显示AppHeader，但显示AppFooter
 * - 其他页面：正常显示AppHeader + AppFooter
 * 
 * ⚠️ 客户端组件：
 * - 使用usePathname检测当前路径
 * - 根据路径动态控制AppHeader的渲染
 * - AppFooter在所有页面统一显示，确保一致性
 * 
 * 📍 布局逻辑：
 * - 个人中心：只显示AppFooter，不显示AppHeader（使用左侧UserSidebar导航）
 * - 其他页面：显示AppHeader + AppFooter（标准布局）
 * 
 * ✅ 全站底部菜单栏统一：
 * - 所有页面都使用相同的AppFooter组件
 * - 确保样式、内容、交互完全一致
 */
export function LayoutController({ children }: LayoutControllerProps) {
    const pathname = usePathname()

    // 检查是否为个人中心页面
    const isProfilePage = pathname?.startsWith('/profile')

    return (
        <div id="root" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--color-bg-primary)' // 确保根容器背景色
        }}>
            {/* 
              智能头部导航控制 - AppHeader
              个人中心：不显示（使用左侧UserSidebar）
              其他页面：正常显示
            */}
            {!isProfilePage && <AppHeader />}

            {/* 页面主要内容区域 - 使用过渡效果包装 */}
            <main style={{ 
                flex: 1,
                background: 'var(--color-bg-primary)', // 确保主内容区背景色
                marginTop: !isProfilePage ? '-98px' : '0', // 个人中心外的页面内容上移到菜单下方
                paddingTop: !isProfilePage ? '98px' : '0', // 保证内容不被菜单遮挡
                position: 'relative',
                zIndex: 1
            }}>
                <PageTransition 
                    animationType="fade"
                    duration={600}
                    className={isProfilePage ? 'profile-page' : 'standard-page'}
                >
                    {children}
                </PageTransition>
            </main>

            {/* 
              全站统一底部导航 - AppFooter
              ✅ 所有页面都显示相同的底部菜单栏
              ✅ 包含：导航链接、资源链接、联系方式、社交媒体、版权信息
              ✅ 确保个人中心和其他页面的底部菜单栏完全一致
            */}
            <AppFooter />
        </div>
    )
} 