'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModalStore } from '@/stores'
import { Icon, GradientText } from '@/components/ui'
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
 * - SSR兼容处理，避免水合错误
 * 
 * 设计规范：
 * - 高度: 98px
 * - 背景: 半透明毛玻璃效果 + 模糊
 * - Logo尺寸: 与文字等高对齐
 * - 字体: Alibaba PuHuiTi 3.0
 * - 最大宽度: 响应式适配 (1504px/1200px/1024px/768px)
 * - 选中指示器: 渐变下划线
 * - 动画过渡: 平滑过渡效果
 * - 响应式布局适配
 */
export function AppHeader() {
    const pathname = usePathname()
    const { openModal } = useModalStore()
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isPageTransitioning, setIsPageTransitioning] = useState(false) // 新增：页面切换状态

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

    // 监听路由变化，在页面切换时暂时禁用滚动隐藏
    useEffect(() => {
        setIsPageTransitioning(true)
        // 页面切换时强制显示导航栏
        setIsVisible(true)

        // 300ms后恢复滚动隐藏功能
        const timer = setTimeout(() => {
            setIsPageTransitioning(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [pathname])

    // 监听滚动事件：滚动时隐藏导航栏，顶部时显示
    useEffect(() => {
        const handleScroll = () => {
            // 页面切换期间禁用滚动隐藏
            if (isPageTransitioning) {
                return
            }

            const currentScrollY = window.scrollY

            // 滚动状态检测：滚动超过98px时启用毛玻璃效果
            setIsScrolled(currentScrollY > 98)

            // 方向判断：向下滚动隐藏，向上滚动显示
            if (currentScrollY > lastScrollY && currentScrollY > 98) {
                // 向下滚动，隐藏导航栏（延迟300ms）
                setTimeout(() => {
                    if (!isPageTransitioning) {
                        setIsVisible(false)
                    }
                }, 300)
            } else {
                // 向上滚动或接近顶部，立即显示导航栏
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY, isPageTransitioning])

    const handleLogin = () => {
        openModal('login')
    }

    const handleUserMenu = () => {
        // TODO: 实现用户菜单功能
        console.log('User menu clicked')
    }

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            // 智能背景效果：顶部透明，滚动时显示毛玻璃
            background: isScrolled
                ? 'rgba(0, 0, 0, 0.25)' // 滚动时深色半透明
                : 'transparent', // 顶部时完全透明，无白色
            backdropFilter: isScrolled ? 'blur(20px)' : 'none', // 滚动时启用模糊
            WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
            borderBottom: isScrolled ? '1px solid rgba(42, 42, 42, 0.15)' : '1px solid rgba(42, 42, 42, 0)',
            height: '98px',
            // 优化过渡效果，更平滑的动画
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // 平滑过渡所有属性
            willChange: 'transform, background-color, border-color, backdrop-filter'
        }}>
            <div style={{
                maxWidth: '1504px',
                margin: '0 auto',
                padding: '27.5px 32px',
                height: '100%',
                display: 'flex',
                alignItems: 'center', // 改为center确保垂直居中
                justifyContent: 'space-between',
                width: '100%', // 改为响应式宽度
                overflow: 'hidden',
                fontFamily: 'var(--font-family-primary)', // 使用CSS变量
                fontSize: '16px',
                fontWeight: 400,
                minHeight: '98px',
                background: 'transparent' // 确保内部容器也透明
            }}>
                {/* Logo 区域 - 品牌标识，点击返回首页 */}
                <Link href="/" style={{
                    display: 'flex',
                    alignItems: 'center', // 确保logo和文字在同一水平线
                    gap: '8px', // 减少间距使整体更紧凑
                    textDecoration: 'none',
                    height: '32px' // 调整为适应更大的logo
                }}>
                    {/* Logo图标 - 比文字稍大，增强视觉层次 */}
                    <div style={{
                        width: '32px', // 比文字稍大，增强视觉层次
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
                            lineHeight: '1', // 使用相对行高确保文字紧凑
                            display: 'flex',
                            alignItems: 'center', // 确保与logo在同一水平线
                            whiteSpace: 'nowrap' // 防止文字换行
                        }}
                    >
                        AI变现之路
                    </GradientText>
                </Link>

                {/* 右侧导航区域 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center', // 确保所有元素垂直居中
                    gap: '4px'
                }}>
                    {/* 桌面端导航菜单 - 统一间距和选中效果 */}
                    <nav className="desktop-nav" style={{
                        display: 'none', // 默认隐藏，通过CSS媒体查询控制显示
                        alignItems: 'center', // 导航菜单也居中对齐
                        gap: '20px'
                    }}>
                        {/* 导航菜单容器 - 确保统一间距 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center', // 垂直居中
                            gap: '20px'
                        }}>
                            {/* 首页 - 包含指示器 */}
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
                                        color: isActiveRoute('/') ? '#FFFFFF' : '#9CA3AF',
                                        lineHeight: '24px',
                                        height: '24px',
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        transition: 'color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // 平滑过渡
                                        padding: '0 4px',
                                        whiteSpace: 'nowrap'
                                    }}
                                    className="nav-link"
                                >
                                    首页
                                </Link>
                                {/* 首页指示器 - 精确对齐文字中心 */}
                                {isActiveRoute('/') && (
                                    <div style={{
                                        width: '28px',
                                        height: '2px',
                                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                        borderRadius: '1px',
                                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // 平滑出现动画
                                    }} />
                                )}
                            </div>

                            {/* 周刊 - 包含指示器 */}
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
                                        color: isActiveRoute('/weekly') ? '#FFFFFF' : '#9CA3AF',
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
                                    周刊
                                </Link>
                                {/* 周刊指示器 - 精确对齐文字中心 */}
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

                            {/* 关于 - 包含指示器 */}
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
                                        color: isActiveRoute('/about') ? '#FFFFFF' : '#9CA3AF',
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
                                    关于
                                </Link>
                                {/* 关于指示器 - 精确对齐文字中心 */}
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

                    {/* 用户图标按钮 - 精确位置和样式 */}
                    <button
                        onClick={handleUserMenu}
                        style={{
                            background: 'rgba(26, 26, 26, 0.50)',
                            borderStyle: 'solid',
                            borderColor: 'rgba(59, 130, 246, 0.20)',
                            borderWidth: '1px',
                            borderRadius: '8px',
                            padding: '10px',
                            display: 'flex',
                            width: '40px',
                            height: '40px', // 明确设置高度
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: '32px',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.40)'
                            e.currentTarget.style.background = 'rgba(26, 26, 26, 0.70)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.20)'
                            e.currentTarget.style.background = 'rgba(26, 26, 26, 0.50)'
                        }}
                    >
                        <Icon name="user-simple" size="sm" style={{
                            color: '#9CA3AF'
                        }} />
                    </button>

                    {/* 搜索图标按钮 - 对齐用户按钮 */}
                    <button style={{
                        background: 'rgba(26, 26, 26, 0.50)',
                        borderStyle: 'solid',
                        borderColor: 'rgba(59, 130, 246, 0.20)',
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
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.40)'
                            e.currentTarget.style.background = 'rgba(26, 26, 26, 0.70)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.20)'
                            e.currentTarget.style.background = 'rgba(26, 26, 26, 0.50)'
                        }}
                    >
                        <Icon name="search" size="sm" style={{
                            color: '#9CA3AF'
                        }} />
                    </button>

                    {/* 加入会员按钮 - 梯度样式，与图标对齐 */}
                    <button
                        onClick={handleLogin}
                        style={{
                            background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            border: 'none',
                            color: '#FFFFFF',
                            fontSize: '13.33px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            cursor: 'pointer',
                            marginLeft: '16px',
                            height: '40px', // 与图标按钮对齐
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)', // 添加按钮阴影
                            flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)'
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.4)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)'
                        }}
                    >
                        加入会员
                    </button>
                </div>
            </div>

            {/* CSS内联样式 - 响应式设计 */}
            <style jsx>{`
                @media (min-width: 768px) {
                    .desktop-nav {
                        display: flex !important;
                    }
                }
                
                @media (max-width: 1200px) {
                    .desktop-nav {
                        gap: 16px !important;
                    }
                }
                
                @media (max-width: 1024px) {
                    .desktop-nav {
                        gap: 12px !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none !important;
                    }
                }
                
                /* 悬停效果优化 */
                .nav-link:hover {
                    color: #D1D5DB !important;
                }
            `}</style>
        </header>
    )
} 