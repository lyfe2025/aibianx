'use client'

import Link from 'next/link'
import { Avatar, Icon } from '@/components/ui'

export interface ArticleCardData {
    id: string
    title: string
    excerpt?: string
    coverImage?: string
    author: {
        name: string
        avatar?: string
    }
    publishedAt: string
    readingTime: string
    viewCount: string
    tags: Array<{
        name: string
        color: string
    }>
    slug: string
    isPremium?: boolean
}

interface ArticleCardProps {
    article: ArticleCardData
    variant?: 'horizontal' | 'vertical'
    showExcerpt?: boolean
    className?: string
}

export function ArticleCard({
    article,
    variant = 'horizontal',
    showExcerpt = true,
    className = ''
}: ArticleCardProps) {
    const isHorizontal = variant === 'horizontal'

    return (
        <Link href={`/weekly/${article.slug}`}>
            <article
                className={`glass-card glass-card--hover ${className}`}
                style={{
                    padding: 'var(--spacing-4)',
                    display: 'flex',
                    flexDirection: isHorizontal ? 'row' : 'column',
                    gap: 'var(--spacing-4)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
            >
                {/* 文章封面 */}
                <div style={{
                    width: isHorizontal ? '200px' : '100%',
                    height: isHorizontal ? '120px' : '200px',
                    flexShrink: 0,
                    borderRadius: 'var(--radius-lg)',
                    background: article.coverImage
                        ? `url(${article.coverImage})`
                        : 'var(--gradient-primary)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600',
                    position: 'relative'
                }}>
                    {!article.coverImage && '封面图'}

                    {/* 会员专属标识 */}
                    {article.isPremium && (
                        <div style={{
                            position: 'absolute',
                            top: 'var(--spacing-2)',
                            right: 'var(--spacing-2)',
                            background: 'rgba(0, 0, 0, 0.7)',
                            color: '#FFD700',
                            fontSize: 'var(--font-size-xs)',
                            padding: '4px 8px',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <Icon name="membership-exclusive" size="xs" />
                            会员专享
                        </div>
                    )}
                </div>

                {/* 文章内容 */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    {/* 标题和摘要 */}
                    <div>
                        <h3 style={{
                            fontSize: isHorizontal ? 'var(--font-size-xl)' : 'var(--font-size-2xl)',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)',
                            lineHeight: '1.3',
                            marginBottom: 'var(--spacing-2)',
                            display: '-webkit-box',
                            WebkitLineClamp: isHorizontal ? 2 : 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {article.title}
                        </h3>

                        {showExcerpt && article.excerpt && (
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

                        {/* 标签 */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'var(--spacing-2)',
                            marginBottom: 'var(--spacing-3)'
                        }}>
                            {article.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    style={{
                                        background: `rgba(${tag.color === '#3B82F6' ? '59, 130, 246' :
                                                tag.color === '#8B5CF6' ? '139, 92, 246' :
                                                    tag.color === '#10B981' ? '16, 185, 129' :
                                                        tag.color === '#F97316' ? '249, 115, 22' : '107, 114, 128'
                                            }, 0.1)`,
                                        color: tag.color,
                                        border: `1px solid ${tag.color}40`,
                                        borderRadius: 'var(--radius-sm)',
                                        padding: '4px 8px',
                                        fontSize: 'var(--font-size-xs)',
                                        fontWeight: '500'
                                    }}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 作者和元信息 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--spacing-3)'
                    }}>
                        {/* 作者信息 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-2)'
                        }}>
                            <Avatar
                                src={article.author.avatar}
                                alt={article.author.name}
                                size="sm"
                                fallback={article.author.name.charAt(0)}
                            />
                            <span style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)'
                            }}>
                                {article.author.name}
                            </span>
                        </div>

                        {/* 文章元信息 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)',
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-muted)'
                        }}>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <Icon name="eye-icon" size="xs" />
                                {article.viewCount}
                            </span>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <Icon name="reading-time-icon" size="xs" />
                                {article.readingTime}
                            </span>
                            <span>{article.publishedAt}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
} 