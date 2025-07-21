'use client'

import { Container, GradientText, Icon } from '@/components/ui'
import Link from 'next/link'

/**
 * 全站公共底部导航组件 - AppFooter
 * 
 * ⚠️ 重要说明：这是全站公共组件，在所有页面中统一使用
 * 
 * 🔧 客户端组件：
 * - 使用 'use client' 指令避免SSR hydration错误
 * - CSS变量在客户端正确解析，确保样式一致性
 * - Footer组件不需要SEO优化，客户端渲染性能更佳
 * 
 * 📍 使用位置：
 * - 通过 LayoutController 在所有页面底部统一渲染
 * - 确保个人中心和其他页面的底部菜单栏完全一致
 * 
 * 🎨 包含功能：
 * - 品牌Logo和描述
 * - 网站导航链接（复制顶部导航）
 * - 资源链接（入门指南、工具推荐等）
 * - 联系方式（邮箱、在线客服）
 * - 社交媒体链接
 * - 版权信息和法律条款
 * - 响应式布局适配
 * 
 * ✅ Hydration修复：
 * - 避免服务端和客户端样式不匹配
 * - 确保CSS变量正确解析
 * - 消除控制台hydration警告
 */
export function AppFooter() {
    // 主导航配置 - 与头部导航保持一致
    const mainNavItems = [
        { href: '/', label: '首页' },
        { href: '/weekly', label: '周刊' },
        { href: '/about', label: '关于' }
    ]

    // 资源导航配置 - 工具和指南相关链接
    const resourceItems = [
        { href: '/guide', label: '入门指南' },
        { href: '/tools', label: '工具推荐' },
        { href: '/resources', label: '学习资源' },
        { href: '/community', label: '社区交流' }
    ]

    // 联系方式配置 - 客服和支持渠道
    const contactItems = [
        { href: '/contact', label: '联系我们' },
        { href: '/support', label: '技术支持' },
        { href: '/feedback', label: '问题反馈' },
        { href: '/business', label: '商务合作' }
    ]

    // 法律条款配置 - 网站法律相关链接
    const legalItems = [
        { href: '/privacy', label: '隐私政策' },
        { href: '/terms', label: '服务条款' },
        { href: '/cookies', label: 'Cookie 设置' }
    ]

    return (
        <footer style={{
            background: 'rgba(18, 18, 18, 0.50)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(42, 42, 42, 0.60)',
            paddingTop: 'var(--spacing-12)',
            paddingBottom: 'var(--spacing-8)'
        }}>
            <Container>
                {/* 主要内容区域 */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'var(--spacing-12)',
                    paddingBottom: 'var(--spacing-8)',
                    borderBottom: '1px solid rgba(42, 42, 42, 0.60)'
                }}>
                    {/* 品牌信息区域 - 包含Logo、描述和社交链接 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-6)'
                    }}>
                        {/* Logo和品牌名 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)'
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: 'var(--gradient-primary)',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Icon name="logo-footer" size="sm" style={{ color: '#FFFFFF' }} />
                            </div>
                            <GradientText size="lg" weight="bold">
                                AI变现之路
                            </GradientText>
                        </div>

                        {/* 品牌描述 */}
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: '1.6',
                            maxWidth: '300px'
                        }}>
                            专注AI商业化应用，分享最新变现机会与实用工具，助你掌握AI时代的财富密码。
                        </p>

                        {/* 社交媒体链接 */}
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-4)',
                            marginTop: 'var(--spacing-2)'
                        }}>
                            {[
                                { icon: 'social-wechat', href: '#wechat', label: '微信公众号' },
                                { icon: 'social-weibo', href: '#weibo', label: '微博' },
                                { icon: 'social-other', href: '#other', label: '更多平台' }
                            ].map((social) => (
                                <Link
                                    key={social.icon}
                                    href={social.href}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        transition: 'all 0.2s ease',
                                        color: 'var(--color-text-muted)'
                                    }}
                                    className="footer-social-link"
                                    title={social.label}
                                >
                                    <Icon name={social.icon} size="sm" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 主导航区域 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-4)'
                    }}>
                        <h4 style={{
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: '600',
                            marginBottom: 'var(--spacing-2)'
                        }}>网站导航</h4>
                        <nav style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-3)'
                        }}>
                            {mainNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    style={{
                                        color: 'var(--color-text-muted)',
                                        fontSize: 'var(--font-size-base)',
                                        lineHeight: '1.5',
                                        transition: 'color 0.2s ease'
                                    }}
                                    className="footer-nav-link"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* 资源导航区域 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-4)'
                    }}>
                        <h4 style={{
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: '600',
                            marginBottom: 'var(--spacing-2)'
                        }}>精选资源</h4>
                        <nav style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-3)'
                        }}>
                            {resourceItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    style={{
                                        color: 'var(--color-text-muted)',
                                        fontSize: 'var(--font-size-base)',
                                        lineHeight: '1.5',
                                        transition: 'color 0.2s ease'
                                    }}
                                    className="footer-nav-link"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* 联系支持区域 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-4)'
                    }}>
                        <h4 style={{
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: '600',
                            marginBottom: 'var(--spacing-2)'
                        }}>联系我们</h4>

                        {/* 联系方式链接 */}
                        <nav style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-3)',
                            marginBottom: 'var(--spacing-4)'
                        }}>
                            {contactItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    style={{
                                        color: 'var(--color-text-muted)',
                                        fontSize: 'var(--font-size-base)',
                                        lineHeight: '1.5',
                                        transition: 'color 0.2s ease'
                                    }}
                                    className="footer-contact-link"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* 直接联系信息 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-2)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-2)'
                            }}>
                                <Icon name="email-contact" size="xs" style={{ color: 'var(--color-text-muted)' }} />
                                <span style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: 'var(--font-size-sm)'
                                }}>contact@aibianx.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 底部版权和法律信息 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-4)',
                    paddingTop: 'var(--spacing-6)',
                    textAlign: 'center'
                }}>
                    {/* 法律条款链接 */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 'var(--spacing-6)',
                        flexWrap: 'wrap'
                    }}>
                        {legalItems.map((item, index) => (
                            <span key={item.href} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                                <Link
                                    href={item.href}
                                    style={{
                                        color: 'var(--color-text-muted)',
                                        fontSize: 'var(--font-size-sm)',
                                        transition: 'color 0.2s ease'
                                    }}
                                    className="footer-legal-link"
                                >
                                    {item.label}
                                </Link>
                                {index < legalItems.length - 1 && (
                                    <span style={{
                                        color: 'var(--color-text-muted)',
                                        fontSize: 'var(--font-size-sm)'
                                    }}>|</span>
                                )}
                            </span>
                        ))}
                    </div>

                    {/* 版权信息 */}
                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-sm)',
                        lineHeight: '1.5'
                    }}>
                        © {new Date().getFullYear()} AI变现之路. 保留所有权利.
                        <span style={{ margin: '0 8px' }}>|</span>
                        专注AI商业化应用与变现实践
                    </p>
                </div>
            </Container>
        </footer>
    )
} 