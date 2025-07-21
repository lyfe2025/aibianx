'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GradientButton, GradientText, Icon } from '@/components/ui'
import { useModalStore } from '@/stores'

/**
 * 全站公共头部导航组件 - AppHeader
 * 
 * ⚠️ 重要说明：这是全站公共组件，在以下四个页面中统一使用：
 * 1. 主页 (/)
 * 2. 周刊页面 (/weekly)
 * 3. 关于页面 (/about)
 * 4. 文章详情页面 (/weekly/[slug])
 * 
 * 🔧 修改影响：
 * - 任何对该组件的修改都会影响到上述所有页面
 * - 导航菜单、Logo、登录按钮的样式和行为修改会全站生效
 * 
 * 📍 使用位置：
 * - 在 /src/app/layout.tsx 中引用
 * - 通过 RootLayout 组件在所有页面中渲染
 * 
 * 🎨 包含功能：
 * - Logo 和品牌名称显示
 * - 主导航菜单（首页、周刊、关于）
 * - 当前页面高亮显示
 * - 登录按钮（桌面端）
 * - 移动端菜单按钮（待实现）
 * - 响应式布局适配
 */
export function AppHeader() {
    const pathname = usePathname()
    const { openModal } = useModalStore()

    // 导航菜单配置 - 修改这里会影响全站导航
    const navItems = [
        { href: '/', label: '首页', isActive: pathname === '/' },
        { href: '/weekly', label: '周刊', isActive: pathname.startsWith('/weekly') },
        { href: '/about', label: '关于', isActive: pathname === '/about' }
    ]

    const handleLogin = () => {
        openModal('login')
    }

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backdropFilter: 'blur(64px)',
            WebkitBackdropFilter: 'blur(64px)',
            borderBottom: '1px solid rgba(42, 42, 42, 0.60)',
            background: 'rgba(3, 3, 3, 0.8)'
        }}>
            <div style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '0 var(--spacing-8)',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Logo 区域 - 品牌标识，点击返回首页 */}
                <Link href="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-3)',
                    textDecoration: 'none'
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'var(--gradient-primary)',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Icon name="logo-detail" size="sm" style={{ color: '#FFFFFF' }} />
                    </div>
                    <GradientText size="lg" weight="bold">
                        AI变现之路
                    </GradientText>
                </Link>

                {/* 桌面端导航菜单 - 主要导航入口 */}
                <nav className="desktop-nav" style={{
                    display: 'none', // 默认隐藏，通过CSS媒体查询控制显示
                    alignItems: 'center',
                    gap: 'var(--spacing-8)'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)'
                    }}>
                        {/* 导航链接 - 修改navItems会影响所有页面的导航 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-8)'
                        }}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`nav-link ${item.isActive ? 'nav-link--active' : ''}`}
                                    style={{
                                        fontSize: 'var(--font-size-base)',
                                        fontWeight: '500',
                                        color: item.isActive ? '#FFFFFF' : 'var(--color-text-muted)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease',
                                        position: 'relative'
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* 当前页面指示器 - 显示用户当前所在页面 */}
                        <div style={{
                            height: '2px',
                            width: '64px',
                            background: navItems.some(item => item.isActive)
                                ? 'var(--gradient-primary)'
                                : 'transparent',
                            borderRadius: 'var(--radius-full)',
                            transition: 'all 0.3s ease'
                        }} />
                    </div>
                </nav>

                {/* 桌面端认证按钮 - 用户登录入口 */}
                <div className="desktop-auth-buttons" style={{
                    display: 'none', // 默认隐藏，通过CSS媒体查询控制显示
                    alignItems: 'center',
                    gap: 'var(--spacing-3)'
                }}>
                    <GradientButton
                        size="sm"
                        onClick={handleLogin}
                    >
                        登录
                    </GradientButton>
                </div>

                {/* 移动端菜单按钮 - 移动设备导航触发器 */}
                <button
                    className="mobile-menu-button"
                    style={{
                        display: 'none', // 默认隐藏，通过CSS媒体查询控制显示
                        width: '40px',
                        height: '40px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                    onClick={() => {
                        // TODO: 实现移动端菜单切换逻辑
                        console.log('Toggle mobile menu')
                    }}
                >
                    <div style={{
                        width: '24px',
                        height: '2px',
                        background: '#FFFFFF',
                        borderRadius: '1px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        transition: 'all 0.3s ease'
                    }} />
                    <div style={{
                        width: '24px',
                        height: '2px',
                        background: '#FFFFFF',
                        borderRadius: '1px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) translateY(-6px)',
                        transition: 'all 0.3s ease'
                    }} />
                    <div style={{
                        width: '24px',
                        height: '2px',
                        background: '#FFFFFF',
                        borderRadius: '1px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) translateY(6px)',
                        transition: 'all 0.3s ease'
                    }} />
                </button>
            </div>
        </header>
    )
} 