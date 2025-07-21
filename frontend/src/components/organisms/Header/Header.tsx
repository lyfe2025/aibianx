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
            className="header"
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
                    className="flex items-center justify-between"
                    style={{
                        height: '72px',
                        padding: '0 24px'
                    }}
                >
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Icon name="logo-footer" size="lg" />
                        <span
                            className="gradient-text font-bold"
                            style={{ fontSize: 'var(--font-size-xl)' }}
                        >
                            AI变现之路
                        </span>
                    </div>

                    {/* 桌面端导航 */}
                    <nav
                        className="hidden lg:flex items-center gap-8"
                        style={{ display: 'none' }}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`nav-link ${item.active ? 'nav-link--active' : ''}`}
                                style={{
                                    color: item.active ? 'var(--color-primary-blue)' : 'var(--color-text-secondary)',
                                    fontSize: 'var(--font-size-base)',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                    padding: '8px 0',
                                    position: 'relative'
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
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            // 已登录状态
                            <div className="flex items-center gap-3">
                                <Icon name="notification-icon" size="md" />
                                <Avatar
                                    src={user?.avatar}
                                    alt={user?.username || '用户头像'}
                                    size="sm"
                                />
                            </div>
                        ) : (
                            // 未登录状态
                            <div className="flex items-center gap-3">
                                {/* 桌面端按钮 */}
                                <div
                                    className="hidden lg:flex items-center gap-3"
                                    style={{ display: 'flex' }}
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
                                    className="lg:hidden"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        padding: '8px',
                                        cursor: 'pointer'
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
                        className="lg:hidden mobile-menu"
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
                        <nav className="flex flex-col gap-4 mb-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`nav-link ${item.active ? 'nav-link--active' : ''}`}
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
                            <div className="flex gap-3">
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