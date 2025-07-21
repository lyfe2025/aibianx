'use client'

import { useState } from 'react'
import { Container, Icon, Avatar, GradientButton } from '@/components/ui'
import { useModalStore } from '@/stores'

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { openModal } = useModalStore()

    // 导航菜单项
    const navItems = [
        { label: 'AI工具库', href: '#tools', active: false },
        { label: '变现方法', href: '#monetization', active: false },
        { label: '成功案例', href: '#cases', active: false },
        { label: '技术指南', href: '#tech', active: false },
        { label: '周刊', href: '#weekly', active: false },
        { label: '关于', href: '#about', active: true },
    ]

    // 用户状态（模拟）
    const isAuthenticated = false
    const user = null

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                background: 'rgba(3, 3, 3, 0.85)',
                backdropFilter: 'blur(64px)',
                WebkitBackdropFilter: 'blur(64px)',
                borderBottom: '1px solid rgba(42, 42, 42, 0.60)',
            }}
        >
            <Container size="xl">
                <div
                    style={{
                        height: '72px',
                        padding: '0 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                        <Icon name="logo-footer" size="lg" />
                        <span
                            className="gradient-text"
                            style={{
                                fontSize: 'var(--font-size-xl)',
                                fontWeight: 700
                            }}
                        >
                            AI变现之路
                        </span>
                    </div>

                    {/* 桌面端导航 */}
                    <nav
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            gap: 'var(--spacing-8)'
                        }}
                        className="desktop-nav"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                style={{
                                    color: item.active ? 'var(--color-primary-blue)' : 'var(--color-text-secondary)',
                                    fontSize: 'var(--font-size-base)',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                    padding: '8px 0',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    if (!item.active) {
                                        e.currentTarget.style.color = 'var(--color-text-primary)'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!item.active) {
                                        e.currentTarget.style.color = 'var(--color-text-secondary)'
                                    }
                                }}
                            >
                                {item.label}
                                {item.active && (
                                    <Icon
                                        name="nav-indicator"
                                        size="xs"
                                        style={{
                                            position: 'absolute',
                                            bottom: '-12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)'
                                        }}
                                    />
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* 用户区域 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                        {isAuthenticated ? (
                            // 已登录状态
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                                <Icon name="notification-icon" size="md" />
                                <Avatar
                                    src={user?.avatar}
                                    alt={user?.username || '用户头像'}
                                    size="sm"
                                />
                            </div>
                        ) : (
                            // 未登录状态
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                                {/* 桌面端按钮 */}
                                <div
                                    className="desktop-auth-buttons"
                                    style={{
                                        display: 'none',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-3)'
                                    }}
                                >
                                    <GradientButton
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openModal('login')}
                                    >
                                        登录
                                    </GradientButton>
                                    <GradientButton
                                        variant="primary"
                                        size="sm"
                                        onClick={() => openModal('register')}
                                    >
                                        注册
                                    </GradientButton>
                                </div>

                                {/* 移动端菜单按钮 */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="mobile-menu-button"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        padding: '8px',
                                        cursor: 'pointer',
                                        display: 'block'
                                    }}
                                >
                                    <Icon name="search-icon" size="md" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 移动端菜单 */}
                {isMobileMenuOpen && (
                    <div
                        className="mobile-menu"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'var(--color-bg-glass)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid var(--color-border-primary)',
                            borderTop: 'none',
                            borderRadius: '0 0 16px 16px',
                            padding: '20px 24px',
                            animation: 'fadeIn 0.3s ease-out'
                        }}
                    >
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    style={{
                                        color: item.active ? 'var(--color-primary-blue)' : 'var(--color-text-secondary)',
                                        fontSize: 'var(--font-size-lg)',
                                        fontWeight: 500,
                                        textDecoration: 'none',
                                        padding: '12px 0',
                                        borderBottom: '1px solid var(--color-border-primary)'
                                    }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {!isAuthenticated && (
                            <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                                <GradientButton
                                    variant="outline"
                                    size="md"
                                    fullWidth
                                    onClick={() => {
                                        openModal('login')
                                        setIsMobileMenuOpen(false)
                                    }}
                                >
                                    登录
                                </GradientButton>
                                <GradientButton
                                    variant="primary"
                                    size="md"
                                    fullWidth
                                    onClick={() => {
                                        openModal('register')
                                        setIsMobileMenuOpen(false)
                                    }}
                                >
                                    注册
                                </GradientButton>
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </header>
    )
} 