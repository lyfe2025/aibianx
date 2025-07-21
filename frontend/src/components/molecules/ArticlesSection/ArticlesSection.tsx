'use client'

import { useState } from 'react'

export function ArticlesSection() {
    const [activeTab, setActiveTab] = useState('latest')

    // 文章数据
    const articles = [
        {
            id: 1,
            title: '如何利用ChatGPT API搭建付费咨询机器人',
            image: '/images/articles/chatgpt-api.jpg',
            tags: ['技术指南', '实战案例'],
            views: '1.2k',
            readTime: '8分钟'
        },
        {
            id: 2,
            title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
            image: '/images/articles/midjourney-guide.jpg',
            tags: ['变现心得', 'AI工具'],
            views: '2.4k',
            readTime: '12分钟'
        },
        {
            id: 3,
            title: '从入门到精通：如何用GPT-4打造高转化的AI文案系统',
            image: '/images/articles/gpt4-copywriting.jpg',
            tags: ['技术指南', 'AI工具'],
            views: '3.6k',
            readTime: '15分钟'
        }
    ]

    const tabs = [
        { id: 'latest', label: '最新', active: activeTab === 'latest' },
        { id: 'popular', label: '热门', active: activeTab === 'popular' },
        { id: 'free', label: '免费', active: activeTab === 'free' }
    ]

    return (
        <section style={{
            position: 'relative',
            zIndex: 1,
            padding: '0 309px',
            marginBottom: '142px'
        }}>
            <div style={{
                background: 'rgba(26, 26, 26, 0.30)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(42, 42, 42, 0.70)',
                borderRadius: '16px',
                padding: '37px 0 79px 0'
            }}>
                {/* 标签切换 */}
                <div style={{
                    display: 'flex',
                    gap: '48px',
                    marginLeft: '36px',
                    marginBottom: '20px'
                }}>
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                background: tab.active
                                    ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)'
                                    : 'transparent',
                                borderRadius: tab.active ? '9999px' : '0',
                                padding: tab.active ? '10px 24px' : '10px 0',
                                color: tab.active ? '#FFFFFF' : '#9CA3AF',
                                fontSize: '14px',
                                lineHeight: '20px',
                                cursor: 'pointer'
                            }}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>

                {/* 文章列表 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            style={{
                                background: 'rgba(18, 18, 18, 0.30)',
                                borderRadius: '12px',
                                padding: '16px',
                                margin: '0 1px',
                                display: 'flex',
                                gap: '16px'
                            }}
                        >
                            {/* 文章封面 */}
                            <div style={{
                                width: '240px',
                                height: '128px',
                                borderRadius: '8px',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: 600
                            }}>
                                封面图
                            </div>

                            {/* 文章内容 */}
                            <div style={{ flex: 1, paddingTop: '18px' }}>
                                <h3 style={{
                                    color: '#FFFFFF',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    lineHeight: '25px',
                                    marginBottom: '28px'
                                }}>
                                    {article.title}
                                </h3>

                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginBottom: '16px'
                                }}>
                                    {article.tags.map((tag, index) => (
                                        <div
                                            key={tag}
                                            style={{
                                                background: index === 0
                                                    ? 'rgba(12, 30, 71, 0.80)'
                                                    : 'rgba(30, 12, 71, 0.80)',
                                                border: index === 0
                                                    ? '1px solid rgba(59, 130, 246, 0.40)'
                                                    : '1px solid rgba(139, 92, 246, 0.40)',
                                                borderRadius: '8px',
                                                padding: '6px 12px',
                                                color: index === 0 ? '#3B82F6' : '#8B5CF6',
                                                fontSize: '12px',
                                                lineHeight: '16px'
                                            }}
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: '11px',
                                    color: '#6B7280',
                                    fontSize: '12px',
                                    lineHeight: '17px'
                                }}>
                                    <span>👁 {article.views}</span>
                                    <span>⏱ {article.readTime}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 查看更多按钮 */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button style={{
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '18px 24px',
                        color: '#FFFFFF',
                        fontSize: '13.33px',
                        lineHeight: '15px',
                        cursor: 'pointer'
                    }}>
                        查看更多
                    </button>
                </div>
            </div>
        </section>
    )
} 