'use client'

import { useState } from 'react'
import { Container, Icon, Avatar, GradientButton } from '@/components/ui'
import { useModalStore, useUserStore } from '@/stores'

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { openModal } = useModalStore()

    // 从userStore获取用户状态
    const { user, isAuthenticated } = useUserStore()

    // 导航菜单项
    const navItems = [
        { label: 'AI工具库', href: '#tools', active: false },
        { label: '变现方法', href: '#monetization', active: false },
        { label: '成功案例', href: '#cases', active: false },
        { label: '技术指南', href: '#tech', active: false },
        { label: '周刊', href: '#weekly', active: false },
        { label: '关于', href: '#about', active: true },
    ]

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'var(--color-bg-glass)',
                backdropFilter: 'blur(64px)',
                WebkitBackdropFilter: 'blur(64px)',
                borderBottom: '1px solid rgba(42, 42, 42, 0.60)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Container size="xl">
                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%'
                }}>
                    {/* Logo */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-3)'
                    }}>
                        <Icon name="logo" size="lg" />
                        <span style={{
                            fontSize: 'var(--font-size-xl)',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)'
                        }}>
                            AI变现之路
                        </span>
                    </div>

                    {/* 桌面端导航菜单 */}
                    <div
                        className="desktop-nav"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-8)'
                        }}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                style={{
                                    fontSize: 'var(--font-size-base)',
                                    color: item.active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    fontWeight: item.active ? '600' : '400',
                                    transition: 'color 0.2s ease'
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* 右侧操作区 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                        {/* 搜索图标 */}
                        <button
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 'var(--spacing-2)',
                                color: 'var(--color-text-secondary)',
                                transition: 'color 0.2s ease'
                            }}
                        >
                            <Icon name="search-icon" size="md" />
                        </button>

                        {/* 用户状态区域 */}
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
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-3)'
                                    }}
                                >
                                    <button
                                        onClick={() => openModal('login')}
                                        style={{
                                            background: 'none',
                                            border: '1px solid var(--color-border-primary)',
                                            borderRadius: 'var(--radius-lg)',
                                            color: 'var(--color-text-secondary)',
                                            padding: '8px 16px',
                                            fontSize: 'var(--font-size-sm)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        登录
                                    </button>

                                    <GradientButton
                                        size="sm"
                                        onClick={() => openModal('register')}
                                    >
                                        注册
                                    </GradientButton>
                                </div>

                                {/* 移动端菜单按钮 */}
                                <button
                                    className="mobile-menu-toggle"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 'var(--spacing-2)',
                                        color: 'var(--color-text-secondary)',
                                        display: 'none' // 通过CSS控制显示
                                    }}
                                >
                                    <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size="md" />
                                </button>
                            </div>
                        )}
                    </div>
                </nav>

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
                            backdropFilter: 'blur(64px)',
                            WebkitBackdropFilter: 'blur(64px)',
                            borderBottom: '1px solid var(--color-border-primary)',
                            padding: 'var(--spacing-4) 0',
                            display: 'none' // 通过CSS控制显示
                        }}
                    >
                        <Container size="xl">
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-4)'
                            }}>
                                {/* 移动端导航菜单 */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--spacing-3)'
                                }}>
                                    {navItems.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            style={{
                                                fontSize: 'var(--font-size-lg)',
                                                color: item.active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                                textDecoration: 'none',
                                                fontWeight: item.active ? '600' : '400',
                                                padding: 'var(--spacing-2) 0'
                                            }}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>

                                {/* 移动端登录注册按钮 */}
                                {!isAuthenticated && (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'var(--spacing-3)',
                                        paddingTop: 'var(--spacing-4)',
                                        borderTop: '1px solid var(--color-border-primary)'
                                    }}>
                                        <button
                                            onClick={() => {
                                                openModal('login')
                                                setIsMobileMenuOpen(false)
                                            }}
                                            style={{
                                                background: 'none',
                                                border: '1px solid var(--color-border-primary)',
                                                borderRadius: 'var(--radius-lg)',
                                                color: 'var(--color-text-secondary)',
                                                padding: '12px 0',
                                                fontSize: 'var(--font-size-base)',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            登录
                                        </button>

                                        <GradientButton
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
                        </Container>
                    </div>
                )}
            </Container>

            {/* 响应式样式 */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    
                    .desktop-auth-buttons {
                        display: none !important;
                    }
                    
                    .mobile-menu-toggle {
                        display: block !important;
                    }
                    
                    .mobile-menu {
                        display: block !important;
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-menu-toggle {
                        display: none !important;
                    }
                    
                    .mobile-menu {
                        display: none !important;
                    }
                }
            `}</style>
        </header>
    )
} 