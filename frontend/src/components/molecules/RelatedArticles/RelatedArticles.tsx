'use client'

import Link from 'next/link'
import { Icon } from '@/components/ui'

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
        <div className={`glass-card ${className}`} style={{
            padding: 'var(--spacing-6)'
        }}>
            {/* 标题 */}
            <h3 style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-5)',
                paddingBottom: 'var(--spacing-3)',
                borderBottom: '1px solid var(--color-border-primary)'
            }}>
                {title}
            </h3>

            {/* 文章列表 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)'
            }}>
                {articles.map((article) => (
                    <Link key={article.id} href={`/weekly/${article.slug}`}>
                        <article 
                            className="related-article-card"
                            style={{
                            padding: 'var(--spacing-4)',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid var(--color-border-primary)',
                            borderRadius: 'var(--radius-lg)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                        }}>
                            {/* 文章标题 */}
                            <h4 style={{
                                fontSize: 'var(--font-size-lg)',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)',
                                lineHeight: '1.4',
                                marginBottom: 'var(--spacing-2)',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {article.isPremium && (
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        color: '#FFD700',
                                        fontSize: 'var(--font-size-xs)',
                                        marginRight: 'var(--spacing-2)'
                                    }}>
                                        <Icon name="membership-exclusive" size="xs" />
                                    </span>
                                )}
                                {article.title}
                            </h4>

                            {/* 文章摘要 */}
                            {article.excerpt && (
                                <p style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: '1.5',
                                    marginBottom: 'var(--spacing-3)',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {article.excerpt}
                                </p>
                            )}

                            {/* 文章元信息 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-3)',
                                fontSize: 'var(--font-size-xs)',
                                color: 'var(--color-text-muted)'
                            }}>
                                <span>{new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                                    month: 'short',
                                    day: 'numeric'
                                })}</span>
                                <span>•</span>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <Icon name="reading-time-icon" size="xs" />
                                    {article.readingTime}
                                </span>
                                <span>•</span>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <Icon name="eye-icon" size="xs" />
                                    {article.viewCount}
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
} 