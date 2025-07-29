'use client'

import { useHomeArticles } from '@/lib/hooks'
import { TagList } from '@/components/ui'
import Link from 'next/link'

export function ArticlesSection() {
    // 使用API版本的Hook
    const {
        activeFilter,
        isLoading,
        connectionError,
        articles,
        totalCount,
        handleFilterChange,
        refetch
    } = useHomeArticles()

    const tabs = [
        { id: 'latest', label: '最新', active: activeFilter === 'latest' },
        { id: 'popular', label: '热门', active: activeFilter === 'popular' }
    ]

    return (
        <section style={{
            position: 'relative',
            zIndex: 1,
            padding: '0 309px',
            marginBottom: '142px'
        }}>
            <div style={{
                                                background: 'var(--color-bg-secondary)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--color-border-primary)',
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
                            onClick={() => handleFilterChange(tab.id)}
                            style={{
                                // 🎯 优化背景切换 - 使用渐变的不同透明度而不是突然变化
                                background: tab.active
                                    ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)' // 完全不透明的渐变
                                    : 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(139, 92, 246, 0) 100%)', // 完全透明的相同渐变
                                // 🎯 统一边框半径 - 避免形状突然变化
                                borderRadius: '9999px', // 统一使用圆角，不再切换
                                // 🎯 统一内边距 - 避免布局抖动
                                padding: '10px 24px', // 统一内边距，不再切换
                                color: tab.active ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                fontSize: '14px',
                                lineHeight: '20px',
                                cursor: 'pointer',
                                // 🎯 添加平滑过渡效果
                                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                // 🔧 防止点击时的突兀效果
                                WebkitTapHighlightColor: 'transparent',
                                userSelect: 'none',
                                // 🎯 添加轻微的阴影效果增强视觉反馈
                                boxShadow: tab.active
                                    ? '0 2px 8px rgba(59, 130, 246, 0.3)'
                                    : '0 2px 8px rgba(0, 0, 0, 0)',
                                // 🎯 确保按钮有合适的最小宽度
                                minWidth: '60px',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            // 🎯 添加悬停状态的平滑处理
                            onMouseEnter={(e) => {
                                if (!tab.active) {
                                    e.currentTarget.style.background = 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                                    e.currentTarget.style.color = '#D1D5DB'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!tab.active) {
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
                            {tab.label}
                        </div>
                    ))}
                </div>

                {/* 加载状态 */}
                {isLoading ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <div style={{ fontSize: 'var(--font-size-lg)' }}>
                            加载文章中...
                        </div>
                    </div>
                ) : connectionError ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <div style={{ fontSize: 'var(--font-size-lg)', marginBottom: '16px' }}>
                            无法连接到后端服务
                        </div>
                        <button 
                            onClick={refetch}
                            style={{
                                background: 'var(--gradient-primary)',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            重试
                        </button>
                    </div>
                ) : articles.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <div style={{ fontSize: 'var(--font-size-lg)' }}>
                            暂无{tabs.find(t => t.id === activeFilter)?.label}文章
                        </div>
                    </div>
                ) : (
                    /* 文章列表 */
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {articles.map((article, index) => (
                            <Link
                            key={article.id}
                                href={`/weekly/${article.slug}`}
                            className="glass-card glass-card--hover"
                            style={{
                                borderRadius: '12px',
                                padding: '16px',
                                margin: '0 1px',
                                marginBottom: index < articles.length - 1 ? '16px' : '0',
                                display: 'flex',
                                cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textDecoration: 'none'
                            }}
                        >
                            {/* 文章封面 */}
                            <div style={{
                                width: '240px',
                                height: '128px',
                                borderRadius: '8px',
                                    background: article.coverImage 
                                        ? `url(${article.coverImage})` 
                                        : 'var(--gradient-primary)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-text-primary)',
                                fontSize: '14px',
                                fontWeight: 600,
                                marginRight: '16px',
                                flexShrink: 0
                            }}>
                                    {!article.coverImage && '封面图'}
                            </div>

                            {/* 文章内容 */}
                            <div style={{ flex: 1, paddingTop: '18px' }}>
                                <h3 style={{
                                    color: 'var(--color-text-primary)',
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
                                        <TagList 
                                            tags={article.tags}
                                            maxTags={2}
                                            size="sm"
                                        />
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: '11px',
                                    color: 'var(--color-text-disabled)',
                                    fontSize: '12px',
                                    lineHeight: '17px'
                                }}>
                                        <span>👁 {article.viewCount}</span>
                                        <span>⏱ {article.readingTime}</span>
                                    </div>
                                </div>
                            </Link>
                    ))}
                </div>
                )}

                {/* 查看更多按钮 */}
                {!isLoading && !connectionError && articles.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Link 
                            href="/weekly"
                            style={{
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '18px 24px',
                        color: 'var(--color-text-primary)',
                        fontSize: '13.33px',
                        lineHeight: '15px',
                        cursor: 'pointer',
                        minWidth: '120px',
                                whiteSpace: 'nowrap',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >
                        查看更多
                        </Link>
                </div>
                )}
            </div>
        </section>
    )
} 