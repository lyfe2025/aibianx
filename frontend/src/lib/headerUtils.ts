/**
 * AppHeader 组件工具函数
 * 
 * 包含路由匹配、滚动处理、事件处理等逻辑
 * 分离复杂逻辑，提升代码可读性和可测试性
 */

import { SCROLL_CONFIG } from '@/constants/headerConfig'

// 导入Modal类型定义
type ModalType = 'login' | 'register' | 'forgotPassword' | 'membership' | 'payment' | 'test' | null
type ModalData = Record<string, unknown>

/**
 * SSR兼容的路由匹配函数
 * 避免服务端和客户端路径检测不一致导致的水合错误
 */
export function isActiveRoute(pathname: string, href: string, isClient: boolean): boolean {
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

/**
 * 滚动处理逻辑
 * 返回新的可见状态和滚动状态
 */
export function handleScroll(
    currentScrollY: number,
    lastScrollY: number,
    isPageTransitioning: boolean
): {
    shouldBeVisible: boolean
    isScrolled: boolean
    shouldHideWithDelay: boolean
} {
    if (isPageTransitioning) {
        return {
            shouldBeVisible: true,
            isScrolled: currentScrollY > SCROLL_CONFIG.threshold,
            shouldHideWithDelay: false
        }
    }

    const isScrolled = currentScrollY > SCROLL_CONFIG.threshold
    const isScrollingDown = currentScrollY > lastScrollY
    const shouldHideWithDelay = isScrollingDown && currentScrollY > SCROLL_CONFIG.threshold

    return {
        shouldBeVisible: !shouldHideWithDelay,
        isScrolled,
        shouldHideWithDelay
    }
}

/**
 * 创建滚动事件处理器
 */
export function createScrollHandler(
    isPageTransitioning: boolean,
    lastScrollY: number,
    setIsVisible: (visible: boolean) => void,
    setIsScrolled: (scrolled: boolean) => void,
    setLastScrollY: (y: number) => void
) {
    return () => {
        const currentScrollY = window.scrollY
        const { shouldBeVisible, isScrolled, shouldHideWithDelay } = handleScroll(
            currentScrollY,
            lastScrollY,
            isPageTransitioning
        )

        setIsScrolled(isScrolled)

        if (shouldHideWithDelay) {
            setTimeout(() => {
                if (!isPageTransitioning) {
                    setIsVisible(false)
                }
            }, SCROLL_CONFIG.hideDelay)
        } else {
            setIsVisible(shouldBeVisible)
        }

        setLastScrollY(currentScrollY)
    }
}

/**
 * 获取Logo区域样式
 */
export function getLogoStyles(size: number, borderRadius: string, gap: string) {
    return {
        container: {
            display: 'flex',
            alignItems: 'center',
            gap,
            textDecoration: 'none',
            height: `${size}px`
        },
        iconContainer: {
            width: `${size}px`,
            height: `${size}px`,
            borderRadius,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        },
        image: {
            width: `${size}px`,
            height: `${size}px`,
            objectFit: 'contain' as const
        }
    }
}

/**
 * 获取导航链接样式
 */
export function getNavLinkStyles(isActive: boolean, transition: string) {
    return {
        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
        lineHeight: '24px',
        height: '24px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center' as const,
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '400',
        transition,
        padding: '0 4px',
        whiteSpace: 'nowrap' as const
    }
}

/**
 * 获取活动指示器样式
 */
export function getActiveIndicatorStyles(
    width: string,
    height: string,
    gradient: string,
    borderRadius: string,
    transition: string
) {
    return {
        width,
        height,
        background: gradient,
        borderRadius,
        transition
    }
}

/**
 * 获取图标按钮样式
 */
export function getIconButtonStyles(
    size: string,
    borderRadius: string,
    padding: string,
    marginLeft?: string,
    transition?: string
) {
    return {
        background: 'var(--color-bg-glass)',
        borderStyle: 'solid' as const,
        borderColor: 'var(--color-border-primary)',
        borderWidth: '1px',
        borderRadius,
        padding,
        display: 'flex',
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        ...(marginLeft && { marginLeft }),
        cursor: 'pointer',
        transition: transition || 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        flexShrink: 0
    }
}

/**
 * 获取汉堡菜单线条样式
 */
export function getHamburgerLineStyles(
    background: string,
    height: string,
    borderRadius: string,
    isOpen: boolean,
    lineIndex: number
) {
    const baseStyle = {
        width: '100%',
        height,
        background,
        borderRadius,
        transition: 'all 0.3s ease'
    }

    if (!isOpen) {
        return baseStyle
    }

    // 菜单打开时的变换
    switch (lineIndex) {
        case 0:
            return {
                ...baseStyle,
                transform: 'rotate(45deg) translateY(7px)'
            }
        case 1:
            return {
                ...baseStyle,
                opacity: 0
            }
        case 2:
            return {
                ...baseStyle,
                transform: 'rotate(-45deg) translateY(-7px)'
            }
        default:
            return baseStyle
    }
}

/**
 * 获取移动端菜单样式
 */
export function getMobileMenuStyles(
    isOpen: boolean,
    width: string,
    padding: string,
    transition: string
) {
    return {
        overlay: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 60,
            visibility: isOpen ? ('visible' as const) : ('hidden' as const),
            pointerEvents: isOpen ? ('auto' as const) : ('none' as const)
        },
        backdrop: {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
        },
        menu: {
            position: 'absolute' as const,
            top: 0,
            right: 0,
            width,
            height: '100%',
            background: 'var(--color-bg-glass)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderLeft: '1px solid var(--color-border-primary)',
            padding,
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transition,
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '32px',
            overflowY: 'auto' as const
        }
    }
}

/**
 * 获取移动端导航链接样式
 */
export function getMobileNavLinkStyles(isActive: boolean) {
    return {
        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        fontSize: '18px',
        fontWeight: isActive ? '600' : '400',
        textDecoration: 'none',
        padding: '12px 0',
        borderBottom: '1px solid rgba(42, 42, 42, 0.3)',
        transition: 'color 0.3s ease',
        touchAction: 'manipulation' as const
    }
}

/**
 * 创建事件处理器工厂
 */
export function createEventHandlers(
    openModal: (modalType: ModalType, data?: ModalData) => void,
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    toggleTheme: () => void,
    toggleLanguage: () => void
) {
    return {
        handleLogin: () => {
            openModal('login')
            setIsMobileMenuOpen(false)
        },

        handleRegister: () => {
            openModal('register')
            setIsMobileMenuOpen(false)
        },

        handleUserMenu: () => {
            console.log('User menu clicked')
        },

        toggleMobileMenu: () => {
            setIsMobileMenuOpen(prev => !prev)
        },

        closeMobileMenu: () => {
            setIsMobileMenuOpen(false)
        },

        handleThemeToggle: () => {
            toggleTheme()
        },

        handleLanguageToggle: () => {
            toggleLanguage()
        }
    }
} 