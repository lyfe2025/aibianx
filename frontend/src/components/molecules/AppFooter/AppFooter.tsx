import { Container, GradientText, Icon } from '@/components/ui'
import Link from 'next/link'

/**
 * 全站公共底部导航组件 - AppFooter
 * 
 * ⚠️ 重要说明：这是全站公共组件，在以下四个页面中统一使用：
 * 1. 主页 (/)
 * 2. 周刊页面 (/weekly)
 * 3. 关于页面 (/about)
 * 4. 文章详情页面 (/weekly/[slug])
 * 
 * 🔧 修改影响：
 * - 任何对该组件的修改都会影响到上述所有页面
 * - 导航链接、社交媒体链接、版权信息的修改会全站生效
 * 
 * 📍 使用位置：
 * - 在 /src/app/layout.tsx 中引用
 * - 通过 RootLayout 组件在所有页面底部渲染
 * 
 * 🎨 包含功能：
 * - 品牌Logo和描述
 * - 网站导航链接（复制顶部导航）
 * - 资源链接（入门指南、工具推荐等）
 * - 联系方式（邮箱、在线客服）
 * - 社交媒体链接
 * - 版权信息和法律条款
 * - 响应式布局适配
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
        { href: '/tools', label: '工具推荐' }
    ]

    // 社交媒体配置 - 修改这里会影响所有页面的社交链接
    const socialItems = [
        { icon: 'social-wechat', href: '#', label: '微信公众号' },
        { icon: 'social-weibo', href: '#', label: '微博' },
        { icon: 'social-other', href: '#', label: '其他社交平台' }
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

                        {/* 品牌描述 - 网站核心价值展示 */}
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.6',
                            margin: 0,
                            maxWidth: '320px'
                        }}>
                            每周更新AI领域最新变现机会和实战经验，助你快速掌握AI工具，实现财务自由
                        </p>

                        {/* 社交媒体链接 - 修改socialItems会影响所有页面 */}
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-4)'
                        }}>
                            {socialItems.map((social) => (
                                <Link
                                    key={social.icon}
                                    href={social.href}
                                    className="social-link"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        background: '#1A1A1A',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    title={social.label}
                                >
                                    <Icon name={social.icon} size="xs" style={{ color: '#FFFFFF' }} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 导航链接区域 - 网站主要导航复制 */}
                    <div>
                        <h3 style={{
                            color: '#FFFFFF',
                            fontSize: 'var(--font-size-base)',
                            fontWeight: '700',
                            margin: '0 0 var(--spacing-6) 0'
                        }}>
                            导航
                        </h3>
                        <nav style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-3)'
                        }}>
                            {mainNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="footer-nav-link"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        fontSize: 'var(--font-size-base)',
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* 资源链接区域 - 工具和指南相关 */}
                    <div>
                        <h3 style={{
                            color: '#FFFFFF',
                            fontSize: 'var(--font-size-base)',
                            fontWeight: '700',
                            margin: '0 0 var(--spacing-6) 0'
                        }}>
                            资源
                        </h3>
                        <nav style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-3)'
                        }}>
                            {resourceItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="footer-nav-link"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        fontSize: 'var(--font-size-base)',
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* 联系方式区域 - 客服和邮箱信息 */}
                    <div>
                        <h3 style={{
                            color: '#FFFFFF',
                            fontSize: 'var(--font-size-base)',
                            fontWeight: '700',
                            margin: '0 0 var(--spacing-6) 0'
                        }}>
                            联系我们
                        </h3>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-3)'
                        }}>
                            {/* 在线客服时间 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-2)'
                            }}>
                                <Icon name="clock-icon" size="xs" style={{ color: 'var(--color-text-secondary)' }} />
                                <span style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: 'var(--font-size-base)'
                                }}>
                                    在线客服 9:00-18:00
                                </span>
                            </div>

                            {/* 联系邮箱 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-2)'
                            }}>
                                <Icon name="mail-icon" size="xs" style={{ color: 'var(--color-text-secondary)' }} />
                                <a
                                    href="mailto:support@ai-bianxian.com"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        fontSize: 'var(--font-size-base)',
                                        transition: 'color 0.2s ease'
                                    }}
                                    className="footer-contact-link"
                                >
                                    support@ai-bianxian.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 版权和法律条款区域 */}
                <div style={{
                    paddingTop: 'var(--spacing-6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 'var(--spacing-4)'
                }}>
                    {/* 版权信息 */}
                    <p style={{
                        color: 'var(--color-text-disabled)',
                        fontSize: 'var(--font-size-sm)',
                        margin: 0
                    }}>
                        © 2024 AI变现之路. 保留所有权利
                    </p>

                    {/* 法律条款链接 - 修改legalItems会影响所有页面 */}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-6)',
                        flexWrap: 'wrap'
                    }}>
                        {legalItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="footer-legal-link"
                                style={{
                                    color: 'var(--color-text-disabled)',
                                    textDecoration: 'none',
                                    fontSize: 'var(--font-size-sm)',
                                    transition: 'color 0.2s ease'
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    )
} 