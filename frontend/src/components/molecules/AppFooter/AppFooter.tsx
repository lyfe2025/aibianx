'use client'

import { Icon } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'

/**
 * ⭐ 全站唯一公共底部菜单组件 - AppFooter
 * 
 * ⚠️ 重要说明：这是项目中唯一的底部菜单组件，请勿创建其他Footer组件！
 * 
 * 📍 使用位置：
 * - 通过 LayoutController 在所有页面底部统一渲染
 * - 确保主页、周刊、关于、个人中心等所有页面的底部菜单完全一致
 * 
 * 🎯 设计稿1:1还原：
 * - 🚨 重要：logo和文字必须与 AppHeader 组件完全一致！
 * - Logo图标：使用 Image 组件加载 /icons/logo-main.svg（不是Icon组件）
 * - 文字样式：渐变色文字，不是普通白色文字
 * - 严格按照1440px设计稿的间距和尺寸（232.27px、159.64px、128.64px等）
 * - 毛玻璃效果：rgba(18, 18, 18, 0.50) + blur(12px)
 * - 精确的颜色值：#FFFFFF、#9CA3AF、#6B7280
 * 
 * 🔧 技术特性：
 * - 客户端组件：使用 'use client' 指令，避免SSR hydration错误
 * - 响应式设计：桌面端精确还原，移动端自适应布局
 * - 悬停效果：链接悬停时变为白色文字
 * - 性能优化：CSS变量在客户端正确解析
 * 
 * 📐 布局结构：
 * 1. 顶部区域：Logo + 导航标题 + 关注我们标题 + 联系我们标题
 * 2. 主要内容：描述文字 + 导航链接 + 社交链接 + 联系信息
 * 3. 底部导航：关于 + 视频频道链接
 * 4. 社交图标：4个圆形图标（#1A1A1A背景）
 * 5. 版权区域：版权信息 + 法律条款 + Cookie设置
 * 
 * ⚠️ 修改注意事项：
 * - 任何样式或内容修改都会影响全站所有页面
 * - 修改前请确认设计稿要求，保持1:1精确还原
 * - 🚨 Logo必须与 AppHeader 组件保持完全一致！
 * - 使用 AppHeader 作为参考，不是 Header 组件
 * - Logo使用 Image 组件，文字使用渐变色
 * - 响应式断点：1200px、768px、480px
 * 
 * 🚫 禁止操作：
 * - 禁止创建其他名为 Footer 的组件
 * - 禁止在页面中直接使用其他底部菜单组件
 * - 禁止移除 'use client' 指令（会导致hydration错误）
 * - 🚨 禁止使用 Icon 组件作为logo（必须使用Image组件）
 * - 🚨 禁止使用普通白色文字（必须使用渐变色文字）
 */
export function AppFooter() {
    // 使用 useMemo 优化性能，避免每次渲染都重新计算
    const currentYear = new Date().getFullYear()

    // 主导航配置 - 与 Header 组件的导航保持一致
    const mainNavItems = [
        { href: '/', label: '首页' },
        { href: '/weekly', label: '周刊' },
        { href: '/about', label: '关于' }
    ]

    // 社交媒体图标配置 - 4个圆形图标
    const socialIcons = [
        { href: '#wechat', icon: 'social-wechat', label: '微信公众号' },
        { href: '#weibo', icon: 'social-weibo', label: '微博' },
        { href: '#other1', icon: 'social-other', label: '其他社交平台1' },
        { href: '#other2', icon: 'social-other', label: '其他社交平台2' }
    ]

    // 法律条款配置 - 底部版权区域链接
    const legalItems = [
        { href: '/privacy', label: '隐私政策' },
        { href: '/terms', label: '服务条款' },
        { href: '/cookies', label: 'Cookie 设置' }
    ]

    return (
        <footer
            style={{
                // 毛玻璃效果 - 严格按设计稿
                background: 'rgba(18, 18, 18, 0.50)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(42, 42, 42, 0.60)',
                marginTop: 'auto'
            }}
        >
            {/* 使用与顶部菜单一致的容器样式 */}
            <div style={{
                maxWidth: '1504px',
                margin: '0 auto',
                padding: '0 32px',
                width: '100%'
            }}>
                <div style={{
                    // 主要内容区域的内边距 - 与顶部菜单保持一致
                    paddingTop: '60px',
                    paddingBottom: '48px'
                }}>
                    {/* 主要内容区域 - 与上面红色区域保持一致的左右两列布局 */}
                    <div className="footer-main-content" style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '120px',
                        minHeight: '120px'
                    }}>
                        {/* 左侧品牌区域 - 与上面红色区域左侧保持一致 */}
                        <div className="footer-brand-section" style={{
                            width: '50%',
                            flexShrink: 0
                        }}>
                            {/* Logo区域 - 与AppHeader组件完全一致 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '16px'
                            }}>
                                {/* Logo图标 - 与AppHeader完全一致 */}
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
                                {/* 品牌名称 - 渐变文字，与AppHeader完全一致 */}
                                <div style={{
                                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontFamily: 'var(--font-family-primary)',
                                    fontSize: '24px',
                                    lineHeight: '1',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    whiteSpace: 'nowrap'
                                }}>
                                    AI变现之路
                                </div>
                            </div>

                            {/* 品牌描述 */}
                            <div style={{
                                color: '#9CA3AF',
                                fontSize: 'var(--font-size-lg)',
                                lineHeight: '24px',
                                marginBottom: '20px'
                            }}>
                                每周更新AI领域最新变现机会和实战经验，助你快速掌握AI工具，实现财务自由
                            </div>
                        </div>

                        {/* 右侧功能区域 - 与上面红色区域右侧保持一致 */}
                        <div className="footer-nav-section" style={{
                            width: '50%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '60px'
                        }}>
                            {/* 第一列：导航链接 */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                minWidth: '80px'
                            }}>
                                <div style={{
                                    color: '#FFFFFF',
                                    fontWeight: '700',
                                    fontSize: 'var(--font-size-lg)',
                                    lineHeight: '24px',
                                    marginBottom: '8px'
                                }}>
                                    导航
                                </div>
                                {mainNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        style={{
                                            color: '#9CA3AF',
                                            fontSize: 'var(--font-size-lg)',
                                            lineHeight: '24px',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s ease',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* 第二列：关注我们 */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                minWidth: '120px'
                            }}>
                                <div style={{
                                    color: '#FFFFFF',
                                    fontWeight: '700',
                                    fontSize: 'var(--font-size-lg)',
                                    lineHeight: '24px',
                                    marginBottom: '8px'
                                }}>
                                    关注我们
                                </div>
                                <Link href="#wechat" style={{
                                    color: '#9CA3AF',
                                    fontSize: 'var(--font-size-lg)',
                                    lineHeight: '24px',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                    whiteSpace: 'nowrap'
                                }}>
                                    微信公众号
                                </Link>
                                <Link href="#zhishixingqiu" style={{
                                    color: '#9CA3AF',
                                    fontSize: 'var(--font-size-lg)',
                                    lineHeight: '24px',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                    whiteSpace: 'nowrap'
                                }}>
                                    知识星球
                                </Link>
                            </div>

                            {/* 第三列：联系我们 - 优化布局 */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                minWidth: '200px'
                            }}>
                                <div style={{
                                    color: '#FFFFFF',
                                    fontWeight: '700',
                                    fontSize: 'var(--font-size-lg)',
                                    lineHeight: '24px',
                                    marginBottom: '8px'
                                }}>
                                    联系我们
                                </div>
                                {/* 联系信息行1：在线客服 */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <Icon name="phone-icon" size="sm" style={{ color: '#9CA3AF' }} />
                                    <span style={{
                                        color: '#9CA3AF',
                                        fontSize: 'var(--font-size-lg)',
                                        lineHeight: '24px'
                                    }}>
                                        在线客服 9:00-18:00
                                    </span>
                                </div>

                                {/* 联系信息行2：邮箱 */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <Icon name="email-icon" size="sm" style={{ color: '#9CA3AF' }} />
                                    <span style={{
                                        color: '#9CA3AF',
                                        fontSize: 'var(--font-size-lg)',
                                        lineHeight: '24px'
                                    }}>
                                        support@ai-bianxian.com
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 底部版权区域 - 移到最底部，增加与上方内容的间距 */}
                <div style={{
                    borderTop: '1px solid rgba(42, 42, 42, 0.60)',
                    paddingTop: '32px',
                    paddingBottom: '32px',
                    marginTop: '48px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {/* 版权信息 - 左侧 */}
                    <div style={{
                        color: '#6B7280',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: '22px'
                    }}>
                        © {currentYear} AI变现之路. 保留所有权利
                    </div>

                    {/* 法律条款链接 - 中间 */}
                    <div style={{
                        display: 'flex',
                        gap: '24px'
                    }}>
                        {legalItems.slice(0, 2).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    color: '#6B7280',
                                    fontSize: 'var(--font-size-base)',
                                    lineHeight: '22px',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease'
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Cookie设置 - 右侧 */}
                    <div style={{
                        color: '#6B7280',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: '22px'
                    }}>
                        <Link href="/cookies" style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease'
                        }}>
                            Cookie 设置
                        </Link>
                    </div>
                </div>
            </div>

            {/* 响应式样式和悬停效果 - 与顶部菜单保持一致的断点 */}
            <style jsx>{`
                    /* 悬停效果 - 所有链接悬停时变为白色 */
                    a:hover {
                        color: var(--color-text-primary) !important;
                    }

                    /* 大屏桌面端 - 1440px及以上 */
                    @media (min-width: 1440px) {
                        .footer-main-content {
                            gap: 120px !important;
                        }
                        
                        .footer-nav-section {
                            gap: 60px !important;
                        }
                    }

                    /* 中等桌面端 - 1200px-1439px */
                    @media (min-width: 1200px) and (max-width: 1439px) {
                        .footer-main-content {
                            gap: 100px !important;
                        }
                        
                        .footer-nav-section {
                            gap: 50px !important;
                        }
                    }

                    /* 小桌面端 - 1024px-1199px */
                    @media (min-width: 1024px) and (max-width: 1199px) {
                        .footer-main-content {
                            gap: 80px !important;
                        }
                        
                        .footer-nav-section {
                            gap: 40px !important;
                        }
                    }

                    /* 平板端 - 768px-1023px */
                    @media (min-width: 768px) and (max-width: 1023px) {
                        .footer-main-content {
                            flex-direction: column !important;
                            gap: 40px !important;
                        }
                        
                        .footer-brand-section,
                        .footer-nav-section {
                            width: 100% !important;
                        }
                        
                        .footer-nav-section {
                            justify-content: space-around !important;
                            gap: 30px !important;
                        }
                    }

                    /* 移动端 - 767px及以下 */
                    @media (max-width: 767px) {
                        .footer-main-content {
                            flex-direction: column !important;
                            gap: 32px !important;
                        }
                        
                        .footer-brand-section,
                        .footer-nav-section {
                            width: 100% !important;
                        }
                        
                        .footer-nav-section {
                            flex-direction: column !important;
                            gap: 24px !important;
                            align-items: flex-start !important;
                        }
                        
                        /* 调整Logo尺寸 */
                        .footer-brand-section img {
                            width: 28px !important;
                            height: 28px !important;
                        }
                        
                        /* 调整品牌文字 */
                        .footer-brand-section div[style*="fontSize: '24px'"] {
                            font-size: 20px !important;
                        }
                        
                        /* 调整内边距 */
                        div[style*="paddingTop: '60px'"] {
                            padding-top: 40px !important;
                            padding-bottom: 32px !important;
                        }
                    }

                    /* 超小屏幕 - 480px及以下 */
                    @media (max-width: 480px) {
                        .footer-nav-section {
                            gap: 20px !important;
                        }
                        
                        /* 进一步缩小Logo */
                        .footer-brand-section img {
                            width: 24px !important;
                            height: 24px !important;
                        }
                        
                        /* 进一步缩小品牌文字 */
                        .footer-brand-section div[style*="fontSize: '24px'"] {
                            font-size: 18px !important;
                        }
                        
                        /* 调整内边距 */
                        div[style*="paddingTop: '60px'"] {
                            padding-top: 32px !important;
                            padding-bottom: 24px !important;
                        }
                        
                        /* 社交图标换行 */
                        div[style*="gap: '12px'"] {
                            flex-wrap: wrap !important;
                            justify-content: center !important;
                        }
                    }
                `}</style>
        </footer>
    )
} 