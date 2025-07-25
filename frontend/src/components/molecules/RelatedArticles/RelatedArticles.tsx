'use client'

import Link from 'next/link'
import { Icon, CrownIcon } from '@/components/ui'

interface RelatedArticle {
    id: string
    title: string
    excerpt?: string
    publishedAt: string
    readingTime: string
    viewCount: string
    slug: string
    isPremium?: boolean
}

interface RelatedArticlesProps {
    articles: RelatedArticle[]
    title?: string
    className?: string
}

export function RelatedArticles({
    articles,
    title = "相关推荐",
    className = ''
}: RelatedArticlesProps) {
    if (articles.length === 0) return null

    return (
        <div
            className={`glass-card ${className}`}
            style={{
                background: 'var(--color-bg-glass)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid var(--color-border-primary)',
                borderRadius: '12px',
                padding: '32px 36px 36px 36px',
                marginTop: '48px'
            }}
        >
            {/* 标题 */}
            <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                marginBottom: '28px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--color-border-primary)',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                lineHeight: '28px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {title}
            </h3>

            {/* 文章列表 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                {articles.map((article, index) => (
                    <Link key={article.id} href={`/weekly/${article.slug}`}>
                        <article
                            className="related-article-card"
                            style={{
                                padding: '20px',
                                background: 'var(--color-bg-secondary)',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                marginBottom: index < articles.length - 1 ? '0' : '0'
                            }}
                        >
                            {/* 文章标题 */}
                            <h4 style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)',
                                lineHeight: '24px',
                                marginBottom: '8px',
                                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0',
                                minHeight: '24px',
                                position: 'relative'
                            }}>
                                {article.isPremium && (
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        color: 'var(--color-warning)',
                                        fontSize: '12px',
                                        marginRight: '8px',
                                        flexShrink: 0,
                                        position: 'relative',
                                        zIndex: 10
                                    }}>
                                        <CrownIcon size="sm" />
                                    </span>
                                )}
                                <span style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    flex: 1,
                                    minWidth: 0
                                }}>
                                    {article.title}
                                </span>
                            </h4>

                            {/* 文章摘要 */}
                            {article.excerpt && (
                                <p style={{
                                    fontSize: '14px',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: '20px',
                                    marginBottom: '12px',
                                    fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    wordBreak: 'break-word'
                                }}>
                                    {article.excerpt}
                                </p>
                            )}

                            {/* 文章元信息 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '12px',
                                color: 'var(--color-text-muted)',
                                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                                flexWrap: 'nowrap',
                                overflow: 'hidden'
                            }}>
                                <span style={{
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0
                                }}>
                                    {new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>

                                <span style={{
                                    flexShrink: 0,
                                    color: 'var(--color-text-disabled)'
                                }}>•</span>

                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0
                                }}>
                                    <Icon
                                        name="clock-icon"
                                        size="xs"
                                        style={{
                                            width: '12px',
                                            height: '12px'
                                        }}
                                    />
                                    {article.readingTime}
                                </span>

                                <span style={{
                                    flexShrink: 0,
                                    color: 'var(--color-text-disabled)'
                                }}>•</span>

                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0
                                }}>
                                    <Icon
                                        name="eye-icon"
                                        size="xs"
                                        style={{
                                            width: '12px',
                                            height: '12px'
                                        }}
                                    />
                                    {article.viewCount}
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* 响应式样式 */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .glass-card {
                        margin: 0 10px !important;
                        padding: 20px 16px !important;
                        margin-top: 32px !important;
                    }
                    
                    h3 {
                        font-size: 18px !important;
                        margin-bottom: 20px !important;
                        padding-bottom: 12px !important;
                    }
                    
                    .related-article-card {
                        padding: 16px !important;
                    }
                    
                    h4 {
                        font-size: 15px !important;
                        line-height: 22px !important;
                    }
                    
                    p {
                        font-size: 13px !important;
                        line-height: 18px !important;
                        margin-bottom: 10px !important;
                    }
                    
                    .meta-info {
                        font-size: 11px !important;
                        gap: 8px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .glass-card {
                        padding: 16px 12px !important;
                    }
                    
                    h3 {
                        font-size: 16px !important;
                        margin-bottom: 16px !important;
                    }
                }
            `}</style>
        </div>
    )
} 