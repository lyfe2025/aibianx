'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useModalStore, useThemeStore, useLanguageStore } from '@/stores'
import { useHeaderScroll } from '@/lib/hooks'
import { createEventHandlers } from '@/lib/headerUtils'
import { HEADER_STYLES, HEADER_BACKGROUND } from '@/constants/headerConfig'
import {
    HeaderLogo,
    DesktopNavigation,
    DesktopActions,
    MobileMenuButton,
    MobileMenu
} from './index'

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
 * - 最大宽度: 响应式适配 (1440px)
 * - 选中指示器: 渐变下划线
 * - 动画过渡: 平滑过渡效果
 * - 移动端菜单: 侧边栏滑动显示
 */
export function AppHeader() {
    const pathname = usePathname()
    const { openModal } = useModalStore()
    const { theme, toggleTheme } = useThemeStore()
    const { language, toggleLanguage } = useLanguageStore()

    // 使用自定义Hook处理滚动逻辑
    const { isVisible, isScrolled } = useHeaderScroll(pathname)

    // 移动端菜单状态
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // SSR兼容：确保服务端和客户端初始状态一致
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

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

    // 创建事件处理器
    const {
        handleLogin,
        handleRegister,
        toggleMobileMenu,
        closeMobileMenu,
        handleThemeToggle,
        handleLanguageToggle
    } = createEventHandlers(
        openModal,
        setIsMobileMenuOpen,
        toggleTheme,
        toggleLanguage
    )

    // 关闭移动端菜单（路由变化时）
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    // Header样式配置
    const headerStyles = {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: isScrolled
            ? HEADER_BACKGROUND.scrolled.background
            : HEADER_BACKGROUND.transparent.background,
        backdropFilter: isScrolled
            ? HEADER_BACKGROUND.scrolled.backdropFilter
            : HEADER_BACKGROUND.transparent.backdropFilter,
        WebkitBackdropFilter: isScrolled
            ? HEADER_BACKGROUND.scrolled.backdropFilter
            : HEADER_BACKGROUND.transparent.backdropFilter,
        borderBottom: isScrolled
            ? HEADER_BACKGROUND.scrolled.borderBottom
            : HEADER_BACKGROUND.transparent.borderBottom,
        height: HEADER_STYLES.heights.desktop,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: HEADER_STYLES.transitions.scroll,
        willChange: 'transform, background-color, border-color, backdrop-filter'
    }

    const containerStyles = {
        maxWidth: HEADER_STYLES.container.maxWidth,
        margin: '0 auto',
        padding: HEADER_STYLES.container.padding.desktop,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        overflow: 'hidden',
        fontFamily: 'var(--font-family-primary)',
        fontSize: '16px',
        fontWeight: 400,
        minHeight: HEADER_STYLES.heights.desktop,
        background: 'transparent'
    }

    return (
        <>
            <header style={headerStyles}>
                <div style={containerStyles}>
                    {/* Logo 区域 */}
                    <HeaderLogo />

                    {/* 右侧导航区域 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        {/* 桌面端导航菜单 */}
                        <DesktopNavigation
                            pathname={pathname}
                            isClient={isClient}
                        />

                        {/* 桌面端按钮组 */}
                        <DesktopActions
                            theme={theme}
                            language={language}
                            isClient={isClient}
                            onLanguageToggle={handleLanguageToggle}
                            onThemeToggle={handleThemeToggle}
                            onLogin={handleLogin}
                        />

                        {/* 移动端汉堡菜单按钮 */}
                        <MobileMenuButton
                            isOpen={isMobileMenuOpen}
                            onClick={toggleMobileMenu}
                        />
                    </div>
                </div>
            </header>

            {/* 移动端侧边栏菜单 */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                pathname={pathname}
                isClient={isClient}
                theme={theme}
                language={language}
                onClose={closeMobileMenu}
                onLanguageToggle={handleLanguageToggle}
                onThemeToggle={handleThemeToggle}
                onLogin={handleLogin}
                onRegister={handleRegister}
            />

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