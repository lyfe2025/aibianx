'use client'

import { useState } from 'react'
import { Container, GradientButton, GradientText, Icon, Input } from '@/components/ui'
import Link from 'next/link'

/**
 * 主要内容区块组件 - MainContentSection
 * 
 * 包含左侧文章列表和右侧侧边栏：
 * - 左侧：文章筛选标签、文章列表、查看更多按钮
 * - 右侧：为什么选择我们、用户见证、邮件订阅
 */
export function MainContentSection() {
    const [activeFilter, setActiveFilter] = useState('最新')
    const [subscribeEmail, setSubscribeEmail] = useState('')

    // 筛选标签
    const filterOptions = ['最新', '热门', '免费']

    // 模拟文章数据
    const articles = [
        {
            id: 1,
            title: '如何利用ChatGPT API搭建付费咨询机器人',
            image: '/images/articles/chatgpt-article.jpeg',
            tags: ['技术指南', '实战案例'],
            views: '1.2k',
            readTime: '8分钟'
        },
        {
            id: 2,
            title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
            image: '/images/articles/midjourney-article.jpeg',
            tags: ['变现心得', 'AI工具'],
            views: '2.4k',
            readTime: '12分钟'
        },
        {
            id: 3,
            title: '从入门到精通：如何用GPT-4打造高转化的AI文案系统',
            image: '/images/articles/gpt4-article.jpeg',
            tags: ['技术指南', 'AI工具'],
            views: '3.6k',
            readTime: '15分钟'
        }
    ]

    const handleSubscribe = () => {
        if (!subscribeEmail.trim()) {
            alert('请输入您的邮箱')
            return
        }
        alert(`感谢订阅！我们将向 ${subscribeEmail} 发送最新的AI变现机会`)
        setSubscribeEmail('')
    }

    return (
        <section style={{
            paddingTop: '48px',
            paddingBottom: '112px',
            background: 'var(--color-bg-primary)'
        }}>
            <Container>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 444px',
                    gap: '48px',
                    alignItems: 'flex-start'
                }}>
                    {/* 左侧文章列表区域 */}
                    <div style={{
                        background: 'rgba(26, 26, 26, 0.30)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(42, 42, 42, 0.70)',
                        borderRadius: '16px',
                        padding: '37px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        {/* 筛选标签 */}
                        <div style={{
                            display: 'flex',
                            gap: '48px'
                        }}>
                            {filterOptions.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    style={{
                                        background: filter === activeFilter
                                            ? 'var(--gradient-primary)'
                                            : 'transparent',
                                        border: 'none',
                                        borderRadius: '9999px',
                                        padding: filter === activeFilter ? '8px 24px' : '8px 0',
                                        color: filter === activeFilter ? '#FFFFFF' : 'var(--color-text-muted)',
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        minWidth: '76px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* 文章列表 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            {articles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/weekly/article-${article.id}`}
                                    className="main-content-article-card"
                                    style={{
                                        background: 'rgba(18, 18, 18, 0.30)',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        display: 'flex',
                                        gap: '16px',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {/* 文章图片 */}
                                    <div style={{
                                        width: '240px',
                                        height: '128px',
                                        borderRadius: '8px',
                                        background: `url(${article.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        flexShrink: 0
                                    }} />

                                    {/* 文章信息 */}
                                    <div style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px'
                                    }}>
                                        {/* 标题 */}
                                        <h3 style={{
                                            color: '#FFFFFF',
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            lineHeight: '28px',
                                            margin: 0
                                        }}>
                                            {article.title}
                                        </h3>

                                        {/* 标签 */}
                                        <div style={{
                                            display: 'flex',
                                            gap: '8px',
                                            marginTop: '6px'
                                        }}>
                                            {article.tags.map((tag, index) => (
                                                <span
                                                    key={tag}
                                                    style={{
                                                        background: index === 0
                                                            ? 'rgba(12, 30, 71, 0.80)'
                                                            : 'rgba(30, 12, 71, 0.80)',
                                                        border: `1px solid ${index === 0
                                                            ? 'rgba(59, 130, 246, 0.40)'
                                                            : 'rgba(139, 92, 246, 0.40)'}`,
                                                        borderRadius: '9999px',
                                                        padding: '9px 12px',
                                                        color: index === 0 ? '#3B82F6' : '#8B5CF6',
                                                        fontSize: '12px',
                                                        lineHeight: '16px'
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* 统计信息 */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <Icon name="eye-icon" size="xs" style={{ color: 'var(--color-text-disabled)' }} />
                                                <span style={{
                                                    color: 'var(--color-text-disabled)',
                                                    fontSize: '12px',
                                                    lineHeight: '16px'
                                                }}>
                                                    {article.views}
                                                </span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <Icon name="clock-icon" size="xs" style={{ color: 'var(--color-text-disabled)' }} />
                                                <span style={{
                                                    color: 'var(--color-text-disabled)',
                                                    fontSize: '12px',
                                                    lineHeight: '16px'
                                                }}>
                                                    {article.readTime}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* 查看更多按钮 */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '24px'
                        }}>
                            <GradientButton
                                onClick={() => window.location.href = '/weekly'}
                                style={{
                                    padding: '16px 24px'
                                }}
                            >
                                查看更多
                            </GradientButton>
                        </div>
                    </div>

                    {/* 右侧侧边栏 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px'
                    }}>
                        {/* 为什么选择我们 */}
                        <div style={{
                            background: 'rgba(26, 26, 26, 0.30)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(42, 42, 42, 0.70)',
                            borderRadius: '16px',
                            padding: '37px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <h3 style={{
                                color: '#FFFFFF',
                                fontSize: '20px',
                                fontWeight: '700',
                                lineHeight: '28px',
                                margin: 0
                            }}>
                                为什么选择我们？
                            </h3>

                            {/* 优势列表 */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}>
                                {[
                                    {
                                        icon: 'quality-icon',
                                        title: '高质量内容',
                                        description: '每周精心筛选，确保只提供最有价值的AI变现知识'
                                    },
                                    {
                                        icon: 'practical-experience',
                                        title: '实战经验',
                                        description: '来自实际变现过万的案例分析，切实可行的策略'
                                    },
                                    {
                                        icon: 'continuous-update',
                                        title: '持续更新',
                                        description: '紧跟AI发展前沿，第一时间更新最新变现机会'
                                    }
                                ].map((feature) => (
                                    <div key={feature.title}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            marginBottom: '8px'
                                        }}>
                                            <Icon name={feature.icon} size="sm" style={{ color: '#3B82F6' }} />
                                            <span style={{
                                                color: '#FFFFFF',
                                                fontSize: 'var(--font-size-base)',
                                                lineHeight: '24px',
                                                fontWeight: '500'
                                            }}>
                                                {feature.title}
                                            </span>
                                        </div>
                                        <p style={{
                                            color: 'var(--color-text-muted)',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            margin: '0 0 0 40px'
                                        }}>
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 他们都在用 */}
                        <div style={{
                            background: 'rgba(26, 26, 26, 0.30)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(42, 42, 42, 0.70)',
                            borderRadius: '16px',
                            padding: '37px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <h3 style={{
                                color: '#FFFFFF',
                                fontSize: '20px',
                                fontWeight: '700',
                                lineHeight: '28px',
                                margin: 0
                            }}>
                                他们都在用
                            </h3>

                            {/* 用户头像网格 */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 32px)',
                                gap: '4px',
                                marginBottom: '12px'
                            }}>
                                {Array.from({ length: 8 }, (_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'var(--gradient-primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <span style={{
                                            color: '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: '500'
                                        }}>
                                            {String.fromCharCode(65 + i)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* 统计信息 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '12px'
                            }}>
                                <span style={{
                                    color: '#FFFFFF',
                                    fontSize: 'var(--font-size-base)',
                                    lineHeight: '24px',
                                    fontWeight: '500'
                                }}>
                                    5000+ 用户
                                </span>
                                <span style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: '14px',
                                    lineHeight: '20px'
                                }}>
                                    已加入社区
                                </span>
                            </div>

                            {/* 用户见证 */}
                            <div style={{
                                background: 'rgba(18, 18, 18, 0.50)',
                                borderRadius: '8px',
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}>
                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: 'var(--font-size-base)',
                                    lineHeight: '24px',
                                    margin: 0
                                }}>
                                    "通过AI变现之路的指导，我在两个月内实现了月入过万的目标，资源非常实用！"
                                </p>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: `url('/images/avatars/user-zhang.jpeg')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }} />
                                    <span style={{
                                        color: '#FFFFFF',
                                        fontSize: '12px',
                                        lineHeight: '16px'
                                    }}>
                                        张先生，自由职业者
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 不要错过任何机会 */}
                        <div style={{
                            background: 'linear-gradient(135deg, #0C1E47 15%, #1E0C47 85%)',
                            border: '1px solid rgba(59, 130, 246, 0.20)',
                            borderRadius: '16px',
                            padding: '33px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <h3 style={{
                                    color: '#FFFFFF',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    lineHeight: '28px',
                                    margin: 0
                                }}>
                                    不要错过任何机会
                                </h3>
                                <Icon name="notification-icon" size="sm" style={{ color: '#3B82F6' }} />
                            </div>

                            <p style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: 'var(--font-size-base)',
                                lineHeight: '24px',
                                margin: 0
                            }}>
                                订阅我们的邮件，获取最新AI变现机会和独家资源
                            </p>

                            {/* 邮箱订阅表单 */}
                            <div style={{
                                display: 'flex',
                                marginTop: '4px'
                            }}>
                                <div style={{
                                    flex: 1,
                                    background: 'rgba(18, 18, 18, 0.50)',
                                    border: '1px solid #2A2A2A',
                                    borderRight: 'none',
                                    borderRadius: '8px 0 0 8px',
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <input
                                        type="email"
                                        placeholder="您的邮箱"
                                        value={subscribeEmail}
                                        onChange={(e) => setSubscribeEmail(e.target.value)}
                                        style={{
                                            width: '100%',
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: 'var(--color-text-primary)',
                                            fontSize: '14px',
                                            '::placeholder': {
                                                color: 'var(--color-text-muted)'
                                            }
                                        }}
                                    />
                                </div>
                                <GradientButton
                                    onClick={handleSubscribe}
                                    style={{
                                        borderRadius: '0 8px 8px 0',
                                        padding: '14px 20px',
                                        fontSize: '14px'
                                    }}
                                >
                                    订阅
                                </GradientButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
} 