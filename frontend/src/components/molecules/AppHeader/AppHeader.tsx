'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModalStore, useThemeStore, useLanguageStore } from '@/stores'
import { Icon, GradientText, GradientButton } from '@/components/ui'
import { useTranslation } from '@/lib'
import Image from 'next/image'

/**
 * AppHeader 组件 - 应用顶部导航栏
 * 
 * 功能特性：
 * - 品牌Logo和名称展示
 * - 主导航菜单（首页、周刊、关于）
 * - 搜索和用户功能按钮
 * - 登录/注册入口
 * - 滚动隐藏/显示效果
 * - 移动端响应式布局
 * - 移动端侧边栏菜单
 * - SSR兼容处理，避免水合错误
 * 
 * 设计规范：
 * - 高度: 98px（桌面端）/ 64px（移动端）
 * - 背景: 半透明毛玻璃效果 + 模糊
 * - Logo尺寸: 与文字等高对齐
 * - 字体: Alibaba PuHuiTi 3.0
 * - 最大宽度: 响应式适配 (1504px/1200px/1024px/768px)
 * - 选中指示器: 渐变下划线
 * - 动画过渡: 平滑过渡效果
 * - 移动端菜单: 侧边栏滑动显示
 */
export function AppHeader() {
    const pathname = usePathname()
    const { openModal } = useModalStore()
    const { theme, toggleTheme } = useThemeStore()
    const { language, toggleLanguage } = useLanguageStore()
    const { t } = useTranslation()
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isPageTransitioning, setIsPageTransitioning] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // 移动端菜单状态

    // SSR兼容：确保服务端和客户端初始状态一致
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    /**
     * SSR兼容的路由匹配函数
     * 避免服务端和客户端路径检测不一致导致的水合错误
     */
    const isActiveRoute = (href: string) => {
        // SSR期间返回false，避免水合错误
        if (!isClient) {
            return false
        }

        if (href === '/') {
            return pathname === '/'
        }

        if (href === '/about') {
            return pathname === '/about'
        }

        if (href === '/weekly') {
            return pathname.startsWith('/weekly')
        }

        return false
    }

    // 监听路由变化，在页面切换时暂时禁用滚动隐藏并关闭移动端菜单
    useEffect(() => {
        setIsPageTransitioning(true)
        setIsVisible(true)
        setIsMobileMenuOpen(false) // 路由切换时关闭移动端菜单

        const timer = setTimeout(() => {
            setIsPageTransitioning(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [pathname])

    // 监听滚动事件：滚动时隐藏导航栏，顶部时显示
    useEffect(() => {
        const handleScroll = () => {
            if (isPageTransitioning) {
                return
            }

            const currentScrollY = window.scrollY
            setIsScrolled(currentScrollY > 98)

            if (currentScrollY > lastScrollY && currentScrollY > 98) {
                setTimeout(() => {
                    if (!isPageTransitioning) {
                        setIsVisible(false)
                    }
                }, 300)
            } else {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY, isPageTransitioning])

    // 监听移动端菜单的body滚动锁定
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    const handleLogin = () => {
        openModal('login')
        setIsMobileMenuOpen(false)
    }

    const handleRegister = () => {
        openModal('register')
        setIsMobileMenuOpen(false)
    }

    const handleUserMenu = () => {
        console.log('User menu clicked')
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                background: isScrolled
                    ? 'rgba(0, 0, 0, 0.25)'
                    : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(42, 42, 42, 0.15)' : '1px solid rgba(42, 42, 42, 0)',
                height: '98px',
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform, background-color, border-color, backdrop-filter'
            }}>
                <div style={{
                    maxWidth: '1440px', // 🔧 从1504px调整为1440px，与Container系统一致
                    margin: '0 auto',
                    padding: '27.5px 32px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    overflow: 'hidden',
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: '16px',
                    fontWeight: 400,
                    minHeight: '98px',
                    background: 'transparent'
                }}>
                    {/* Logo 区域 */}
                    <Link href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                        height: '32px'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <Image
                                src="/icons/logo-main.svg"
                                alt="AI变现之路"
                                width={32}
                                height={32}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                        <GradientText
                            as="span"
                            size="3xl"
                            weight="semibold"
                            style={{
                                lineHeight: '1',
                                display: 'flex',
                                alignItems: 'center',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            AI变现之路
                        </GradientText>
                    </Link>

                    {/* 右侧导航区域 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        {/* 桌面端导航菜单 */}
                        <nav className="desktop-nav" style={{
                            display: 'none',
                            alignItems: 'center',
                            gap: '20px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px'
                            }}>
                                {/* 首页 */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    position: 'relative'
                                }}>
                                    <Link
                                        href="/"
                                        style={{
                                            color: isActiveRoute('/') ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                            lineHeight: '24px',
                                            height: '24px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            transition: 'color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            padding: '0 4px',
                                            whiteSpace: 'nowrap'
                                        }}
                                        className="nav-link"
                                    >
                                        {t('nav.home')}
                                    </Link>
                                    {isActiveRoute('/') && (
                                        <div style={{
                                            width: '28px',
                                            height: '2px',
                                            background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                            borderRadius: '1px',
                                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                        }} />
                                    )}
                                </div>

                                {/* 周刊 */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    position: 'relative'
                                }}>
                                    <Link
                                        href="/weekly"
                                        style={{
                                            color: isActiveRoute('/weekly') ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                            lineHeight: '24px',
                                            height: '24px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            transition: 'color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            padding: '0 4px',
                                            whiteSpace: 'nowrap'
                                        }}
                                        className="nav-link"
                                    >
                                        {t('nav.weekly')}
                                    </Link>
                                    {isActiveRoute('/weekly') && (
                                        <div style={{
                                            width: '28px',
                                            height: '2px',
                                            background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                            borderRadius: '1px',
                                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                        }} />
                                    )}
                                </div>

                                {/* 关于 */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    position: 'relative'
                                }}>
                                    <Link
                                        href="/about"
                                        style={{
                                            color: isActiveRoute('/about') ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                            lineHeight: '24px',
                                            height: '24px',
                                            alignItems: 'center',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            transition: 'color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            padding: '0 4px',
                                            whiteSpace: 'nowrap'
                                        }}
                                        className="nav-link"
                                    >
                                        {t('nav.about')}
                                    </Link>
                                    {isActiveRoute('/about') && (
                                        <div style={{
                                            width: '28px',
                                            height: '2px',
                                            background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                            borderRadius: '1px',
                                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                        }} />
                                    )}
                                </div>
                            </div>
                        </nav>

                        {/* 桌面端按钮组 */}
                        <div className="desktop-auth-buttons" style={{
                            display: 'none',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <button
                                onClick={toggleLanguage}
                                style={{
                                    background: 'var(--color-bg-glass)',
                                    borderStyle: 'solid',
                                    borderColor: 'var(--color-border-primary)',
                                    borderWidth: '1px',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    display: 'flex',
                                    width: '40px',
                                    height: '40px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: '32px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                    flexShrink: 0
                                }}
                                className="icon-button"
                                title={isClient ? (language === 'zh' ? `${t('language.switchTo')} English` : `${t('language.switchTo')}${t('language.chinese')}`) : t('language.switchTo')}
                            >
                                <Icon
                                    name="globe"
                                    size="sm"
                                />
                            </button>

                            <button
                                onClick={toggleTheme}
                                style={{
                                    background: 'var(--color-bg-glass)',
                                    borderStyle: 'solid',
                                    borderColor: 'var(--color-border-primary)',
                                    borderWidth: '1px',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    display: 'flex',
                                    width: '40px',
                                    height: '40px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                    flexShrink: 0
                                }}
                                className="icon-button"
                                title={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
                            >
                                <Icon
                                    name={isClient ? (theme === 'dark' ? 'theme-toggle-light' : 'theme-toggle-dark') : 'theme-toggle-light'}
                                    size="sm"
                                    style={{
                                        color: 'var(--color-text-muted)'
                                    }}
                                />
                            </button>

                            <button
                                onClick={handleLogin}
                                style={{
                                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    border: 'none',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '13.33px',
                                    fontWeight: '500',
                                    lineHeight: '20px',
                                    cursor: 'pointer',
                                    marginLeft: '16px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                                    flexShrink: 0
                                }}
                                className="btn btn--gradient"
                            >
                                {t('buttons.login')}
                            </button>
                        </div>

                        {/* 移动端汉堡菜单按钮 */}
                        <button
                            onClick={toggleMobileMenu}
                            className="mobile-menu-button"
                            style={{
                                background: 'var(--color-bg-glass)',
                                borderStyle: 'solid',
                                borderColor: 'var(--color-border-primary)',
                                borderWidth: '1px',
                                borderRadius: '8px',
                                padding: '12px',
                                display: 'none',
                                width: '48px',
                                height: '48px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                flexShrink: 0,
                                touchAction: 'manipulation', // 提升触摸体验
                                WebkitTapHighlightColor: 'transparent'
                            }}
                        >
                            {/* CSS创建的汉堡菜单图标 */}
                            <div style={{
                                position: 'relative',
                                width: '20px',
                                height: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: '2px',
                                    background: '#FFFFFF',
                                    borderRadius: '1px',
                                    transition: 'all 0.3s ease',
                                    transform: isMobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none'
                                }} />
                                <div style={{
                                    width: '100%',
                                    height: '2px',
                                    background: '#FFFFFF',
                                    borderRadius: '1px',
                                    transition: 'all 0.3s ease',
                                    opacity: isMobileMenuOpen ? 0 : 1
                                }} />
                                <div style={{
                                    width: '100%',
                                    height: '2px',
                                    background: '#FFFFFF',
                                    borderRadius: '1px',
                                    transition: 'all 0.3s ease',
                                    transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'
                                }} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* 移动端侧边栏菜单 */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 60,
                    visibility: isMobileMenuOpen ? 'visible' : 'hidden',
                    pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
                }}
            >
                {/* 遮罩层 */}
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        opacity: isMobileMenuOpen ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                />

                {/* 侧边栏菜单 */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '280px',
                        height: '100%',
                        background: 'var(--color-bg-glass)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderLeft: '1px solid var(--color-border-primary)',
                        padding: '98px 24px 32px', // 为header留出空间
                        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                        overflowY: 'auto'
                    }}
                >
                    {/* 导航菜单 */}
                    <nav style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                color: isActiveRoute('/') ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                fontSize: '18px',
                                fontWeight: isActiveRoute('/') ? '600' : '400',
                                textDecoration: 'none',
                                padding: '12px 0',
                                borderBottom: '1px solid rgba(42, 42, 42, 0.3)',
                                transition: 'color 0.3s ease',
                                touchAction: 'manipulation'
                            }}
                        >
                            {t('nav.home')}
                        </Link>

                        <Link
                            href="/weekly"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                color: isActiveRoute('/weekly') ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                fontSize: '18px',
                                fontWeight: isActiveRoute('/weekly') ? '600' : '400',
                                textDecoration: 'none',
                                padding: '12px 0',
                                borderBottom: '1px solid rgba(42, 42, 42, 0.3)',
                                transition: 'color 0.3s ease',
                                touchAction: 'manipulation'
                            }}
                        >
                            {t('nav.weekly')}
                        </Link>

                        <Link
                            href="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                color: isActiveRoute('/about') ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                fontSize: '18px',
                                fontWeight: isActiveRoute('/about') ? '600' : '400',
                                textDecoration: 'none',
                                padding: '12px 0',
                                borderBottom: '1px solid rgba(42, 42, 42, 0.3)',
                                transition: 'color 0.3s ease',
                                touchAction: 'manipulation'
                            }}
                        >
                            {t('nav.about')}
                        </Link>
                    </nav>

                    {/* 功能按钮区域 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        marginTop: 'auto'
                    }}>
                        {/* 语言切换按钮 */}
                        <button
                            onClick={toggleLanguage}
                            style={{
                                background: 'var(--color-bg-glass)',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: '12px',
                                padding: '16px',
                                color: 'var(--color-text-secondary)',
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                touchAction: 'manipulation',
                                WebkitTapHighlightColor: 'transparent',
                                minHeight: '56px'
                            }}
                        >
                            <Icon name="globe" size="sm" />
                            {isClient ? (language === 'zh' ? t('language.english') : t('language.chinese')) : t('language.chinese')}
                        </button>

                        {/* 主题切换按钮 */}
                        <button
                            onClick={toggleTheme}
                            style={{
                                background: 'var(--color-bg-glass)',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: '12px',
                                padding: '16px',
                                color: 'var(--color-text-secondary)',
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                touchAction: 'manipulation',
                                WebkitTapHighlightColor: 'transparent',
                                minHeight: '56px'
                            }}
                        >
                            <Icon name={isClient ? (theme === 'dark' ? 'theme-toggle-light' : 'theme-toggle-dark') : 'theme-toggle-light'} size="sm" />
                            {isClient ? (theme === 'dark' ? t('theme.light') : t('theme.dark')) : t('theme.light')}
                        </button>



                        {/* 登录按钮 */}
                        <GradientButton
                            size="lg"
                            fullWidth
                            onClick={handleLogin}
                            style={{
                                minHeight: '56px',
                                fontSize: '16px',
                                fontWeight: '600',
                                touchAction: 'manipulation',
                                WebkitTapHighlightColor: 'transparent'
                            }}
                        >
                            {t('buttons.login')}
                        </GradientButton>

                        {/* 注册按钮 */}
                        <button
                            onClick={handleRegister}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(59, 130, 246, 0.40)',
                                borderRadius: '12px',
                                padding: '16px',
                                color: 'var(--color-primary-blue)',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                minHeight: '56px',
                                touchAction: 'manipulation',
                                WebkitTapHighlightColor: 'transparent'
                            }}
                        >
                            {t('buttons.register')}
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS内联样式 - 响应式设计 */}
            <style jsx>{`
                /* 桌面端显示桌面导航，隐藏移动端按钮 */
                @media (min-width: 768px) {
                    .desktop-nav {
                        display: flex !important;
                    }
                    
                    .desktop-auth-buttons {
                        display: flex !important;
                    }
                    
                    .mobile-menu-button {
                        display: none !important;
                    }
                }
                
                /* 移动端显示汉堡菜单，隐藏桌面导航 */
                @media (max-width: 767px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    
                    .desktop-auth-buttons {
                        display: none !important;
                    }
                    
                    .mobile-menu-button {
                        display: flex !important;
                    }
                    
                    /* 移动端头部高度调整 */
                    header {
                        height: 64px !important;
                    }
                    
                    header > div {
                        padding: 10px 16px !important;
                        min-height: 64px !important;
                    }
                }
                
                /* 中等屏幕导航间距优化 */
                @media (min-width: 768px) and (max-width: 1200px) {
                    .desktop-nav {
                        gap: 16px !important;
                    }
                }
                
                @media (min-width: 768px) and (max-width: 1024px) {
                    .desktop-nav {
                        gap: 12px !important;
                    }
                }
                
                /* 悬停效果优化 */
                .nav-link:hover {
                    color: #D1D5DB !important;
                }
                
                /* 移动端触摸优化 */
                @media (hover: none) and (pointer: coarse) {
                    .mobile-menu-button:active {
                        background: rgba(59, 130, 246, 0.20) !important;
                        transform: scale(0.95);
                    }
                    
                    .btn--gradient:active {
                        transform: scale(0.95) !important;
                    }
                }
            `}</style>
        </>
    )
} 