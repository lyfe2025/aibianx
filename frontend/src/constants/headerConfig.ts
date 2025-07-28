/**
 * AppHeader 组件配置数据
 * 
 * 包含导航菜单配置、样式常量、界面文本等
 * 分离数据与逻辑，提升维护性和可读性
 */

/**
 * 导航菜单配置
 */
export const NAVIGATION_MENU = [
    {
        id: 'home',
        href: '/',
        translationKey: 'nav.home',
        exactMatch: true
    },
    {
        id: 'weekly',
        href: '/weekly',
        translationKey: 'nav.weekly',
        exactMatch: false
    },
    {
        id: 'about',
        href: '/about',
        translationKey: 'nav.about',
        exactMatch: true
    }
] as const

/**
 * Header 样式常量
 */
export const HEADER_STYLES = {
    // 基础尺寸
    heights: {
        desktop: '98px',
        mobile: '64px'
    },

    // 容器配置
    container: {
        maxWidth: '1440px',
        padding: {
            desktop: '27.5px 32px',
            mobile: '10px 16px'
        }
    },

    // Logo配置
    logo: {
        size: 32,
        borderRadius: '4px',
        gap: '8px'
    },

    // 导航样式
    navigation: {
        gap: {
            desktop: '20px',
            medium: '16px',
            small: '12px'
        },
        activeIndicator: {
            width: '28px',
            height: '2px',
            gradient: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
            borderRadius: '1px'
        }
    },

    // 按钮样式
    buttons: {
        icon: {
            size: '40px',
            borderRadius: '8px',
            padding: '10px'
        },
        login: {
            height: '40px',
            padding: '10px 20px',
            fontSize: '13.33px',
            borderRadius: '8px'
        },
        mobile: {
            size: '48px',
            padding: '12px'
        }
    },

    // 移动端菜单
    mobileMenu: {
        width: '280px',
        padding: '98px 24px 32px',
        navigationGap: '24px',
        buttonGap: '16px'
    },

    // 动画配置
    transitions: {
        normal: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        scroll: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fast: 'all 0.3s ease'
    },

    // 汉堡菜单图标
    hamburger: {
        size: {
            width: '20px',
            height: '16px'
        },
        line: {
            height: '2px',
            borderRadius: '1px',
            background: '#FFFFFF'
        }
    }
} as const

/**
 * 滚动行为配置
 */
export const SCROLL_CONFIG = {
    threshold: 98, // 滚动阈值
    hideDelay: 300, // 隐藏延迟
    routeTransitionDelay: 300 // 路由切换延迟
} as const

/**
 * 背景和边框配置
 */
export const HEADER_BACKGROUND = {
    scrolled: {
        background: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(42, 42, 42, 0.15)'
    },
    transparent: {
        background: 'transparent',
        backdropFilter: 'none',
        borderBottom: '1px solid rgba(42, 42, 42, 0)'
    }
} as const

/**
 * 移动端菜单遮罩配置
 */
export const MOBILE_MENU_OVERLAY = {
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)'
} as const

/**
 * 响应式断点配置
 */
export const BREAKPOINTS = {
    mobile: 767,
    tablet: 768,
    desktop: 1024,
    large: 1200
} as const 