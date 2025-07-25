'use client'

import { useState } from 'react'
import { Container, Icon } from '@/components/ui'
import Link from 'next/link'

/**
 * 主要内容区块组件 - MainContentSection
 * 
 * 包含左侧文章列表和右侧侧边栏：
 * - 左侧：文章筛选标签、文章列表、查看更多按钮
 * - 右侧：为什么选择我们、用户见证、邮件订阅
 * 
 * 设计稿1:1还原要求：
 * - 左侧宽度：822px，右侧宽度：410px，间距：48px
 * - 筛选标签间距：48px
 * - 文章卡片间距：22px（上下文章间）
 * - 右侧卡片间距：32px
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
            paddingTop: '24px !important',
            paddingBottom: '32px !important',
            background: 'transparent' // 改为透明，让粒子可见
        }}>
            <Container size="xl">
                <div style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {/* 左侧文章列表区域 - 精确宽度822px */}
                    <div style={{
                        background: 'var(--color-bg-secondary)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid var(--color-border-primary)',
                        borderRadius: '16px',
                        width: '822px',
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: '48px'
                    }}>
                        {/* 筛选标签 - 顶部间距36px，左边距36px */}
                        <div style={{
                            display: 'flex',
                            marginTop: '36px',
                            marginLeft: '36px'
                        }}>
                            {filterOptions.map((filter, index) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    style={{
                                        // 🎯 优化背景切换 - 使用渐变的不同透明度而不是突然变化
                                        background: filter === activeFilter
                                            ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)' // 完全不透明的渐变
                                            : 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(139, 92, 246, 0) 100%)', // 完全透明的相同渐变
                                        border: 'none',
                                        // 🎯 统一边框半径 - 避免形状突然变化
                                        borderRadius: '9999px', // 统一使用圆角，不再切换
                                        padding: '8px 24px', // 统一所有按钮的内边距，避免点击后挤压
                                        color: filter === activeFilter ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                        fontSize: '14px',
                                        lineHeight: '21px',
                                        cursor: 'pointer',
                                        // 🎯 优化过渡效果 - 使用更快的过渡和平滑的缓动函数
                                        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                        minWidth: '72px', // 增加最小宽度确保文字固定位置
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        whiteSpace: 'nowrap', // 防止文字换行
                                        marginRight: index < filterOptions.length - 1 ? '48px' : '0',
                                        // 🔧 防止点击时的突兀效果
                                        WebkitTapHighlightColor: 'transparent',
                                        userSelect: 'none',
                                        // 🎯 添加轻微的阴影效果增强视觉反馈
                                        boxShadow: filter === activeFilter
                                            ? '0 2px 8px rgba(59, 130, 246, 0.3)'
                                            : '0 2px 8px rgba(0, 0, 0, 0)',
                                        // 🎯 增强激活状态的视觉效果
                                        transform: filter === activeFilter ? 'translateY(0)' : 'translateY(0)',
                                    }}
                                    // 🎯 添加悬停和点击状态的平滑处理
                                    onMouseEnter={(e) => {
                                        if (filter !== activeFilter) {
                                            e.currentTarget.style.background = 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                                            e.currentTarget.style.color = '#D1D5DB'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (filter !== activeFilter) {
                                            e.currentTarget.style.background = 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(139, 92, 246, 0) 100%)'
                                            e.currentTarget.style.color = '#9CA3AF'
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.transform = 'translateY(1px)'
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* 文章列表 - 左右边距36px，顶部间距20px */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '20px 36px 0 36px'
                        }}>
                            {articles.map((article, index) => (
                                <Link
                                    key={article.id}
                                    href={`/weekly/article-${article.id}`}
                                    className="main-content-article-card"
                                    style={{
                                        background: 'rgba(18, 18, 18, 0.30)',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        width: '750px',
                                        marginBottom: index < articles.length - 1 ? '16px' : '0'
                                    }}
                                >
                                    {/* 文章内容区域 */}
                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        {/* 文章图片 */}
                                        <div style={{
                                            width: '240px',
                                            height: '128px',
                                            borderRadius: '8px',
                                            background: `url(${article.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            flexShrink: 0,
                                            marginRight: '16px'
                                        }} />

                                        {/* 文章信息 */}
                                        <div style={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            paddingTop: '18px'
                                        }}>
                                            {/* 标题 */}
                                            <h3 style={{
                                                color: 'var(--color-text-primary)',
                                                fontSize: '18px',
                                                fontWeight: '700',
                                                lineHeight: '28px',
                                                margin: 0,
                                                width: article.id === 2 ? '419px' : article.id === 3 ? '450px' : '380px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                marginBottom: '28px'
                                            }}>
                                                {article.title}
                                            </h3>

                                            {/* 标签 */}
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'stretch',
                                                flexWrap: 'nowrap',
                                                whiteSpace: 'nowrap'
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
                                                            padding: '8px 13px',
                                                            color: index === 0 ? '#3B82F6' : '#8B5CF6',
                                                            fontSize: '12px',
                                                            lineHeight: '18px',
                                                            width: index === 1 && article.id === 3 ? '61px' : '74px',
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginRight: index < article.tags.length - 1 ? '8px' : '0',
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 统计信息 */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: '256px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginRight: '8px'
                                        }}>
                                            <Icon name="eye-icon" style={{
                                                color: '#6B7280',
                                                width: '16px',
                                                height: '16px',
                                                marginRight: '4px'
                                            }} />
                                            <span style={{
                                                color: '#6B7280',
                                                fontSize: '12px',
                                                lineHeight: '18px',
                                                width: article.id === 1 ? '23px' : '24px'
                                            }}>
                                                {article.views}
                                            </span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginLeft: '8px'
                                        }}>
                                            <Icon name="clock-icon" style={{
                                                color: '#6B7280',
                                                width: '12px',
                                                height: '12px',
                                                marginRight: '4px'
                                            }} />
                                            <span style={{
                                                color: '#6B7280',
                                                fontSize: '12px',
                                                lineHeight: '18px',
                                                width: article.id === 1 ? '40px' : '48px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {article.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* 查看更多按钮 - 底部间距78px，顶部间距10px */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px',
                            marginBottom: '78px'
                        }}>
                            <button
                                onClick={() => window.location.href = '/weekly'}
                                style={{
                                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                    border: '2px solid #000000',
                                    borderRadius: '8px',
                                    padding: '16px 24px',
                                    color: '#FFFFFF',
                                    fontSize: '13.33px',
                                    lineHeight: '15px',
                                    cursor: 'pointer',
                                    fontFamily: 'Arial',
                                    textAlign: 'center',
                                    width: '120px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                查看更多
                            </button>
                        </div>
                    </div>

                    {/* 右侧侧边栏 - 精确宽度410px */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '410px',
                        height: '100%',
                        alignSelf: 'stretch'
                    }}>
                        {/* 为什么选择我们 */}
                        <div style={{
                            background: 'var(--color-bg-secondary)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid var(--color-border-primary)',
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: 'var(--card-gap-lg)'
                        }}>
                            <h3 style={{
                                color: '#FFFFFF',
                                fontSize: '20px',
                                fontWeight: '700',
                                lineHeight: '30px',
                                margin: 0,
                                marginTop: '36px',
                                paddingLeft: '36px',
                                width: '200px',
                                whiteSpace: 'nowrap'
                            }}>
                                为什么选择我们？
                            </h3>

                            {/* 优势列表 */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {/* 高质量内容 */}
                                <div style={{
                                    display: 'flex',
                                    paddingLeft: '36px',
                                    marginBottom: '16px'
                                }}>
                                    <Icon name="community-advantage-new" style={{
                                        color: '#3B82F6',
                                        width: '24px',
                                        height: '34px',
                                        marginTop: '8px',
                                        marginRight: '16px'
                                    }} />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '290.21px'
                                    }}>
                                        <div style={{
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            width: '120px',
                                            marginBottom: '5px',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            高质量内容
                                        </div>
                                        <div style={{
                                            color: '#9CA3AF',
                                            fontSize: '14px',
                                            lineHeight: '21px',
                                            minHeight: '42px'
                                        }}>
                                            每周精心筛选，确保只提供最有价值的AI变现知识
                                        </div>
                                    </div>
                                </div>

                                {/* 实战经验 */}
                                <div style={{
                                    display: 'flex',
                                    paddingLeft: '36px',
                                    marginBottom: '16px'
                                }}>
                                    <Icon name="community-support-new" style={{
                                        color: '#3B82F6',
                                        width: '24px',
                                        height: '32px',
                                        marginTop: '8px',
                                        marginRight: '16px'
                                    }} />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '290px'
                                    }}>
                                        <div style={{
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            width: '100px',
                                            marginBottom: '5px',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            实战经验
                                        </div>
                                        <div style={{
                                            color: '#9CA3AF',
                                            fontSize: '14px',
                                            lineHeight: '21px',
                                            minHeight: '21px'
                                        }}>
                                            来自实际变现过万的案例分析，切实可行的策略
                                        </div>
                                    </div>
                                </div>

                                {/* 持续更新 */}
                                <div style={{
                                    display: 'flex',
                                    paddingLeft: '36px',
                                    marginBottom: '24px'
                                }}>
                                    <Icon name="continuous-update-new" style={{
                                        color: '#3B82F6',
                                        width: '24px',
                                        height: '29px',
                                        marginTop: '8px',
                                        marginRight: '16px'
                                    }} />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '275px'
                                    }}>
                                        <div style={{
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            width: '100px',
                                            marginBottom: '5px',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            持续更新
                                        </div>
                                        <div style={{
                                            color: '#9CA3AF',
                                            fontSize: '14px',
                                            lineHeight: '21px',
                                            minHeight: '21px'
                                        }}>
                                            紧跟AI发展前沿，第一时间更新最新变现机会
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 他们都在用 */}
                        <div style={{
                            background: 'var(--color-bg-secondary)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid var(--color-border-primary)',
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: 'var(--card-gap-lg)'
                        }}>
                            <h3 style={{
                                color: '#FFFFFF',
                                fontSize: '20px',
                                fontWeight: '700',
                                lineHeight: '30px',
                                margin: 0,
                                marginTop: '36px',
                                paddingLeft: '36px',
                                width: '140px',
                                whiteSpace: 'nowrap'
                            }}>
                                他们都在用
                            </h3>

                            {/* 用户头像展示 */}
                            <div style={{
                                display: 'flex',
                                paddingLeft: '36px'
                            }}>
                                <Icon name="user-avatars-display" style={{
                                    width: '112px',
                                    height: '40px',
                                    marginTop: '1.5px',
                                    marginRight: '16px'
                                }} />
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div style={{
                                        color: '#FFFFFF',
                                        fontSize: '16px',
                                        lineHeight: '22px',
                                        width: '120px',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        5000+ 用户
                                    </div>
                                    <div style={{
                                        color: '#9CA3AF',
                                        fontSize: '14px',
                                        lineHeight: '21px',
                                        width: '100px',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        已加入社区
                                    </div>
                                </div>
                            </div>

                            {/* 用户见证 */}
                            <div style={{
                                background: 'rgba(18, 18, 18, 0.50)',
                                borderRadius: '8px',
                                padding: '16px',
                                margin: '5px 36px 36px 36px',
                                width: '338px',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative'
                            }}>
                                {/* 引用气泡 */}
                                <Icon name="quote-bubble" style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    left: '16px',
                                    width: '24px',
                                    height: '16px'
                                }} />

                                <div style={{
                                    color: '#D1D5DB',
                                    fontSize: '16px',
                                    lineHeight: '20px',
                                    minHeight: '40px',
                                    width: '306.57px',
                                    marginBottom: '16px'
                                }}>
                                    &ldquo;通过AI变现之路的指导，我在两个月内实现了月入过万的目标，资源非常实用！&rdquo;
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '16px',
                                        background: `url('/images/avatars/user-zhang-zhichuang.svg')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        marginRight: '8px'
                                    }} />
                                    <div style={{
                                        color: '#FFFFFF',
                                        fontSize: '12px',
                                        lineHeight: '18px',
                                        marginTop: '7px',
                                        width: '150px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        张先生，自由职业者
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 不要错过任何机会 */}
                        <div style={{
                            background: 'linear-gradient(135deg, #0C1E47 37%, #1E0C47 63%)',
                            border: '1px solid rgba(59, 130, 246, 0.20)',
                            borderRadius: '16px',
                            padding: '31px',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 'auto'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '348px'
                            }}>
                                <h3 style={{
                                    color: '#FFFFFF',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    lineHeight: '27px',
                                    margin: 0,
                                    width: '180px',
                                    whiteSpace: 'nowrap'
                                }}>
                                    不要错过任何机会
                                </h3>
                                <Icon name="notification-bell" style={{
                                    color: '#3B82F6',
                                    width: '20px',
                                    height: '20px',
                                    marginTop: '3.5px'
                                }} />
                            </div>

                            <div style={{
                                color: '#D1D5DB',
                                fontSize: '16px',
                                lineHeight: '20px',
                                width: '400px',
                                minHeight: '20px',
                                marginTop: '15px',
                                marginBottom: '15px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                订阅我们的邮件，获取最新AI变现机会和独家资源
                            </div>

                            {/* 邮箱订阅表单 */}
                            <div style={{
                                display: 'flex'
                            }}>
                                <div style={{
                                    background: 'var(--color-bg-input)',
                                    border: '1px solid var(--color-border-primary)',
                                    borderRadius: '8px 0 0 8px',
                                    padding: '12px 16px',
                                    width: '288px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <input
                                        type="email"
                                        placeholder="请输入您的邮箱"
                                        value={subscribeEmail}
                                        onChange={(e) => setSubscribeEmail(e.target.value)}
                                        onFocus={(e) => {
                                            const container = e.target.parentElement
                                            if (container) {
                                                container.style.borderColor = '#3B82F6'
                                                container.style.background = 'var(--color-bg-primary)'
                                                container.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)'
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const container = e.target.parentElement
                                            if (container) {
                                                container.style.borderColor = 'var(--color-border-primary)'
                                                container.style.background = 'var(--color-bg-input)'
                                                container.style.boxShadow = 'none'
                                            }
                                        }}
                                        style={{
                                            width: '256px',
                                            height: '20px',
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: '#757575',
                                            fontSize: '13.33px',
                                            lineHeight: '15px',
                                            fontFamily: 'Arial'
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={handleSubscribe}
                                    style={{
                                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                        border: 'none',
                                        borderRadius: '0 8px 8px 0',
                                        padding: '14px 16px',
                                        color: '#FFFFFF',
                                        fontSize: '14px',
                                        lineHeight: '16px',
                                        cursor: 'pointer',
                                        fontFamily: 'Arial',
                                        width: '100px',
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    订阅
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
} 