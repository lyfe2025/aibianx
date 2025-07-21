'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    GradientButton,
    GradientText,
    Icon,
    Container
} from '@/components/ui'
import { useModalStore, useUserStore } from '@/stores'

export const Header = () => {
    const pathname = usePathname()
    const { openModal } = useModalStore()
    const { user, isAuthenticated, logout } = useUserStore()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navItems = [
        { href: '/', label: '首页', icon: 'nav-indicator' },
        { href: '/weekly', label: '周刊', icon: 'nav-indicator-weekly' },
        { href: '/articles', label: '文章', icon: 'nav-indicator-detail' },
        { href: '/about', label: '关于', icon: 'nav-indicator-about' }
    ]

    // 内联样式定义
    const headerStyle = {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50
    }

    const navbarStyle = {
        background: 'rgba(26, 26, 26, 0.30)',
        backdropFilter: 'blur(64px)',
        WebkitBackdropFilter: 'blur(64px)',
        borderBottom: '1px solid rgba(42, 42, 42, 0.60)'
    }

    const logoIconStyle = {
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
        boxShadow: '0px 0px 15px 0px rgba(139, 92, 246, 0.50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const navLinkStyle = {
        fontSize: 'var(--font-size-base)',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        textDecoration: 'none'
    }

    const activeNavLinkStyle = {
        ...navLinkStyle,
        color: 'var(--color-text-primary)'
    }

    const inactiveNavLinkStyle = {
        ...navLinkStyle,
        color: 'var(--color-text-muted)'
    }

    const mobileMenuStyle = {
        background: 'var(--color-bg-glass)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border-primary)'
    }

    return (
        <header style={headerStyle}>
            {/* 毛玻璃导航栏 */}
            <div style={navbarStyle}>
                <Container size="xl" className="py-6">
                    <div className="flex items-center justify-between">
                        {/* Logo区域 */}
                        <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                            <div style={logoIconStyle}>
                                <Icon name="logo-detail" size="sm" style={{ color: 'white' }} />
                            </div>
                            <GradientText size="lg" weight="bold">
                                AI变现之路
                            </GradientText>
                        </Link>

                        {/* 桌面端导航菜单 */}
                        <nav className="hidden lg:flex items-center gap-12">
                            <div className="flex flex-col items-center gap-2">
                                {/* 导航链接 */}
                                <div className="flex items-center gap-8">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            style={pathname === item.href ? activeNavLinkStyle : inactiveNavLinkStyle}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>

                                {/* 当前页面指示器 - 仅在非首页显示 */}
                                {pathname !== '/' && (
                                    <div style={{
                                        height: '2px',
                                        width: '64px',
                                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                        borderRadius: '2px'
                                    }} />
                                )}
                            </div>

                            {/* 用户操作区域 */}
                            <div className="flex items-center gap-4">
                                {isAuthenticated ? (
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <Icon name="user-icon" size="sm" />
                                            <span style={{
                                                color: 'var(--color-text-secondary)',
                                                fontSize: 'var(--font-size-sm)'
                                            }}>
                                                {user?.username || user?.email}
                                            </span>
                                        </div>
                                        <GradientButton
                                            size="sm"
                                            variant="outline"
                                            onClick={logout}
                                        >
                                            退出
                                        </GradientButton>
                                    </div>
                                ) : (
                                    <GradientButton
                                        size="sm"
                                        onClick={() => openModal('login')}
                                    >
                                        登录
                                    </GradientButton>
                                )}
                            </div>
                        </nav>

                        {/* 移动端菜单按钮 */}
                        <button
                            className="lg:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="切换菜单"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '8px'
                            }}
                        >
                            <Icon
                                name={isMobileMenuOpen ? "close-button" : "search-icon"}
                                size="md"
                                style={{ color: 'var(--color-text-primary)' }}
                            />
                        </button>
                    </div>
                </Container>
            </div>

            {/* 移动端菜单 */}
            {isMobileMenuOpen && (
                <div style={mobileMenuStyle}>
                    <Container size="xl" className="py-6">
                        <div className="flex flex-col gap-6">
                            {/* 移动端导航链接 */}
                            <nav className="flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-3"
                                        style={{
                                            fontSize: 'var(--font-size-lg)',
                                            fontWeight: '500',
                                            color: pathname === item.href ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Icon name={item.icon} size="sm" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* 移动端用户操作 */}
                            <div style={{
                                paddingTop: '16px',
                                borderTop: '1px solid var(--color-border-primary)'
                            }}>
                                {isAuthenticated ? (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Icon name="user-icon" size="md" />
                                            <span style={{ color: 'var(--color-text-secondary)' }}>
                                                {user?.username || user?.email}
                                            </span>
                                        </div>
                                        <GradientButton
                                            size="md"
                                            variant="outline"
                                            fullWidth
                                            onClick={() => {
                                                logout()
                                                setIsMobileMenuOpen(false)
                                            }}
                                        >
                                            退出登录
                                        </GradientButton>
                                    </div>
                                ) : (
                                    <GradientButton
                                        size="md"
                                        fullWidth
                                        onClick={() => {
                                            openModal('login')
                                            setIsMobileMenuOpen(false)
                                        }}
                                    >
                                        登录
                                    </GradientButton>
                                )}
                            </div>
                        </div>
                    </Container>
                </div>
            )}
        </header>
    )
} 