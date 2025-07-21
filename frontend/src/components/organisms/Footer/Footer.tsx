'use client'

import Link from 'next/link'
import {
    GradientText,
    Icon,
    Container
} from '@/components/ui'

export const Footer = () => {
    const currentYear = new Date().getFullYear()

    const navigationLinks = [
        { href: '/', label: '首页' },
        { href: '/weekly', label: '周刊' },
        { href: '/articles', label: '文章' },
        { href: '/about', label: '关于' }
    ]

    const socialLinks = [
        {
            id: 'wechat',
            href: '#wechat',
            icon: 'social-wechat',
            label: '微信公众号',
            hoverColor: '#10B981'
        },
        {
            id: 'weibo',
            href: '#weibo',
            icon: 'social-weibo',
            label: '微博',
            hoverColor: '#EF4444'
        },
        {
            id: 'other',
            href: '#other',
            icon: 'social-other',
            label: '其他社交媒体',
            hoverColor: '#3B82F6'
        }
    ]

    const contactInfo = [
        { icon: 'email-footer-icon', text: 'contact@aibianx.com' },
        { icon: 'phone-contact', text: '+86 138-0000-0000' }
    ]

    return (
        <footer
            style={{
                background: 'var(--color-bg-glass)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderTop: '1px solid var(--color-border-primary)',
                marginTop: 'auto'
            }}
        >
            <Container size="xl">
                <div style={{ padding: 'var(--spacing-12) var(--spacing-8)' }}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: 'var(--spacing-8)',
                        }}
                    >
                        {/* Logo和简介 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                                <div
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--gradient-primary)',
                                        boxShadow: 'var(--shadow-button)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Icon name="logo-footer" size="sm" style={{ color: 'white' }} />
                                </div>
                                <GradientText size="lg" weight="bold">
                                    AI变现之路
                                </GradientText>
                            </div>
                            <p
                                style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: 'var(--font-size-sm)',
                                    lineHeight: '1.6'
                                }}
                            >
                                专注AI工具实用指南，帮助您在AI时代找到属于自己的变现之路，实现技术价值的最大化。
                            </p>
                        </div>

                        {/* 导航链接 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                            <h3
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontWeight: 600,
                                    fontSize: 'var(--font-size-base)'
                                }}
                            >
                                快速导航
                            </h3>
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                                {navigationLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="footer-nav-link"
                                        style={{
                                            color: 'var(--color-text-muted)',
                                            fontSize: 'var(--font-size-sm)',
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 'var(--spacing-2)',
                                            transition: 'color 0.2s ease',
                                        }}
                                    >
                                        <Icon name="arrow-right" size="xs" />
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* 联系方式 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                            <h3
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontWeight: 600,
                                    fontSize: 'var(--font-size-base)'
                                }}
                            >
                                联系我们
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                                {contactInfo.map((contact, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                                        <Icon
                                            name={contact.icon}
                                            size="sm"
                                            style={{ color: 'var(--color-primary-blue)' }}
                                        />
                                        <span
                                            style={{
                                                color: 'var(--color-text-muted)',
                                                fontSize: 'var(--font-size-sm)'
                                            }}
                                        >
                                            {contact.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 社交媒体 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                            <h3
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontWeight: 600,
                                    fontSize: 'var(--font-size-base)'
                                }}
                            >
                                关注我们
                            </h3>
                            <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.id}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="footer-social-link"
                                        style={{
                                            padding: 'var(--spacing-3)',
                                            borderRadius: 'var(--radius-lg)',
                                            background: 'var(--color-bg-secondary)',
                                            border: '1px solid var(--color-border-primary)',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Icon name={social.icon} size="md" />
                                    </Link>
                                ))}
                            </div>

                            {/* 二维码提示 */}
                            <div
                                style={{
                                    marginTop: 'var(--spacing-4)',
                                    padding: 'var(--spacing-3)',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'rgba(26, 26, 26, 0.3)',
                                    border: '1px solid var(--color-border-primary)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                                    <Icon name="social-wechat" size="sm" style={{ color: '#10B981' }} />
                                    <span
                                        style={{
                                            color: 'var(--color-text-secondary)',
                                            fontSize: 'var(--font-size-sm)',
                                            fontWeight: 500
                                        }}
                                    >
                                        微信扫码关注
                                    </span>
                                </div>
                                <p
                                    style={{
                                        color: 'var(--color-text-muted)',
                                        fontSize: 'var(--font-size-xs)'
                                    }}
                                >
                                    获取最新AI工具资讯和变现技巧
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 底部版权信息 */}
                    <div
                        style={{
                            marginTop: 'var(--spacing-12)',
                            paddingTop: 'var(--spacing-8)',
                            borderTop: '1px solid var(--color-border-primary)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 'var(--spacing-4)',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-6)',
                                color: 'var(--color-text-muted)',
                                fontSize: 'var(--font-size-sm)',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}
                        >
                            <span>© {currentYear} AI变现之路. 保留所有权利.</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                                <Link
                                    href="/privacy"
                                    className="footer-legal-link"
                                    style={{
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    隐私政策
                                </Link>
                                <Link
                                    href="/terms"
                                    className="footer-legal-link"
                                    style={{
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    使用条款
                                </Link>
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-2)',
                                color: 'var(--color-text-muted)',
                                fontSize: 'var(--font-size-xs)'
                            }}
                        >
                            <Icon name="rocket-icon" size="xs" style={{ color: 'var(--color-primary-purple)' }} />
                            <span>Powered by Next.js & AI</span>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
} 