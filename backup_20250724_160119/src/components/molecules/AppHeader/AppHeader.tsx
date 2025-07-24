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

    // 滚动监听效果 - 优化用户体验
    useEffect(() => {
        // 页面切换时禁用滚动监听
        if (isPageTransitioning) {
            return
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // 检测是否已滚动，用于调整背景透明度
            setIsScrolled(currentScrollY > 10)

            // 优化滚动阈值，减少触发频率
            const scrollThreshold = 80

            // 向下滚动且滚动距离大于阈值时隐藏导航栏
            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                setIsVisible(false)
            }
            // 向上滚动时显示导航栏
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        // 使用 requestAnimationFrame 优化性能
        let ticking = false
        const optimizedHandleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', optimizedHandleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', optimizedHandleScroll)
        }
    }, [lastScrollY, isPageTransitioning]) // 添加isPageTransitioning依赖

    const handleLogin = () => {
        openModal('login')
    }

    const handleSearch = () => {
        // TODO: 实现搜索功能
        console.log('Search clicked')
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
                                        color: pathname === '/' ? '#FFFFFF' : '#9CA3AF',
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
                                {pathname === '/' && (
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
                                        color: pathname.startsWith('/weekly') ? '#FFFFFF' : '#9CA3AF',
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
                                {pathname.startsWith('/weekly') && (
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
                                        color: pathname === '/about' ? '#FFFFFF' : '#9CA3AF',
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
                                {pathname === '/about' && (
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

                    {/* 搜索图标按钮 - 精确位置和样式 */}
                    <button
                        onClick={handleSearch}
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
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // 平滑hover效果
                        }}
                        className="icon-button inner-border"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.40)'
                            e.currentTarget.style.background = 'rgba(26, 26, 26, 0.70)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.20)'
                            e.currentTarget.style.background = 'rgba(26, 26, 26, 0.50)'
                        }}
                    >
                        <Icon
                            name="search-icon"
                            style={{
                                color: 'rgb(156, 163, 175)',
                                width: '20px',
                                height: '20px',
                                backgroundSize: 'cover'
                            }}
                        />
                    </button>

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
                            marginLeft: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        }}
                        className="icon-button inner-border"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.40)'
                            e.currentTarget.style.background = 'rgba(26, 26, 26, 0.70)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.20)'
                            e.currentTarget.style.background = 'rgba(26, 26, 26, 0.50)'
                        }}
                    >
                        <Icon
                            name="user-icon"
                            style={{
                                color: 'rgb(156, 163, 175)',
                                width: '20px',
                                height: '20px',
                                backgroundSize: 'cover'
                            }}
                        />
                    </button>

                    {/* 桌面端登录按钮 - 精确还原设计稿样式 */}
                    <div className="desktop-auth-buttons" style={{
                        display: 'none', // 默认隐藏，通过CSS媒体查询控制显示
                        alignItems: 'center'
                    }}>
                        <button
                            onClick={handleLogin}
                            style={{
                                background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                borderRadius: '9999px',
                                border: 'none',
                                display: 'flex',
                                width: '88px',
                                height: '40px', // 与其他按钮高度一致
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '12px',
                                paddingLeft: '28px',
                                paddingRight: '28px',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                boxShadow: '0px 0px 15px 0px rgba(139, 92, 246, 0.30)' // 减弱阴影
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)'
                                e.currentTarget.style.boxShadow = '0px 0px 20px 0px rgba(139, 92, 246, 0.50)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0px 0px 15px 0px rgba(139, 92, 246, 0.30)'
                            }}
                        >
                            <span style={{
                                color: '#FFFFFF',
                                fontFamily: 'var(--font-family-primary)',
                                lineHeight: '18px',
                                textAlign: 'center',
                                width: '32px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                textOverflow: 'ellipsis',
                                minHeight: '18px',
                                fontSize: '14px'
                            }}>
                                登录
                            </span>
                        </button>
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
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
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
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
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
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        }} />
                    </button>
                </div>
            </div>

            {/* 响应式样式优化 */}
            <style jsx>{`
                /* 大屏桌面端 - 1440px及以上 */
                @media (min-width: 1440px) {
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

                /* 中等桌面端 - 1200px-1439px */
                @media (min-width: 1200px) and (max-width: 1439px) {
                    .desktop-nav {
                        display: flex !important;
                    }
                    
                    .desktop-auth-buttons {
                        display: flex !important;
                    }
                    
                    .mobile-menu-button {
                        display: none !important;
                    }

                    /* 调整按钮间距 */
                    .desktop-nav {
                        gap: 16px !important;
                    }
                }

                /* 小桌面端 - 1024px-1199px */
                @media (min-width: 1024px) and (max-width: 1199px) {
                    .desktop-nav {
                        display: flex !important;
                    }
                    
                    .desktop-auth-buttons {
                        display: flex !important;
                    }
                    
                    .mobile-menu-button {
                        display: none !important;
                    }

                    /* 调整间距和字体 */
                    .desktop-nav {
                        gap: 12px !important;
                    }
                }

                /* 平板端 - 768px-1023px */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    
                    .desktop-auth-buttons {
                        display: none !important;
                    }
                    
                    .mobile-menu-button {
                        display: block !important;
                    }

                    /* 调整padding */
                    header > div {
                        padding: 20px 24px !important;
                    }
                }

                /* 移动端 - 767px及以下 */
                @media (max-width: 767px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    
                    .desktop-auth-buttons {
                        display: none !important;
                    }
                    
                    .mobile-menu-button {
                        display: block !important;
                    }

                    /* 调整移动端布局 */
                    header {
                        height: 80px !important;
                    }

                    header > div {
                        padding: 20px 16px !important;
                        min-height: 80px !important;
                    }

                    /* 调整Logo尺寸 */
                    header img {
                        width: 28px !important;
                        height: 28px !important;
                    }

                    /* 调整品牌文字 */
                    header div[style*="fontSize: '24px'"] {
                        font-size: 20px !important;
                    }
                }

                /* 超小屏幕 - 480px及以下 */
                @media (max-width: 480px) {
                    header > div {
                        padding: 16px 12px !important;
                    }

                    /* 进一步缩小Logo */
                    header img {
                        width: 24px !important;
                        height: 24px !important;
                    }

                    /* 进一步缩小品牌文字 */
                    header div[style*="fontSize: '24px'"] {
                        font-size: 18px !important;
                    }
                }
            `}</style>
        </header>
    )
} 