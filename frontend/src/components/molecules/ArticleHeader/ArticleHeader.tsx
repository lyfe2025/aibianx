'use client'

import { Avatar, Icon } from '@/components/ui'

interface ArticleHeaderProps {
    title: string
    author: {
        name: string
        avatar?: string
        bio?: string
        followersCount?: string
    }
    publishedAt: string
    readingTime: string
    viewCount: string
    likeCount?: string
    tags: Array<{
        name: string
        color: string
    }>
    isPremium?: boolean
    onLike?: () => void
    onBookmark?: () => void
    onShare?: () => void
    isLiked?: boolean
    isBookmarked?: boolean
}

export function ArticleHeader({
    title,
    author,
    publishedAt,
    readingTime,
    viewCount,
    likeCount = '0',
    tags,
    isPremium = false,
    onLike,
    onBookmark,
    onShare,
    isLiked = false,
    isBookmarked = false
}: ArticleHeaderProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <header style={{
            marginBottom: '40px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--color-border-primary)'
        }}>
            {/* 会员专属标识 */}
            {isPremium && (
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 215, 0, 0.1)',
                    color: '#FFD700',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '500',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--spacing-4)'
                }}>
                    <Icon name="membership-exclusive" size="xs" />
                    会员专享内容
                </div>
            )}

            {/* 文章标题 */}
            <h1 style={{
                fontSize: 'var(--font-size-6xl)',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                lineHeight: '1.2',
                marginBottom: 'var(--spacing-4)'
            }}>
                {title}
            </h1>

            {/* 文章标签 */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--spacing-2)',
                marginBottom: 'var(--spacing-5)'
            }}>
                {tags.map((tag, index) => (
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
                            padding: '6px 12px',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '500'
                        }}
                    >
                        {tag.name}
                    </span>
                ))}
            </div>

            {/* 作者和文章信息 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--spacing-4)'
            }}>
                {/* 作者信息 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-3)'
                }}>
                    <Avatar
                        src={author.avatar}
                        alt={author.name}
                        size="lg"
                        fallback={author.name.charAt(0)}
                    />
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-2)',
                            marginBottom: '4px'
                        }}>
                            <span style={{
                                fontSize: 'var(--font-size-lg)',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)'
                            }}>
                                {author.name}
                            </span>
                            {author.followersCount && (
                                <span style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-muted)'
                                }}>
                                    {author.followersCount} 关注者
                                </span>
                            )}
                        </div>
                        {author.bio && (
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                margin: 0
                            }}>
                                {author.bio}
                            </p>
                        )}
                    </div>
                </div>

                {/* 文章元信息和互动按钮 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-4)'
                }}>
                    {/* 文章元信息 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-3)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-muted)'
                    }}>
                        <span>{formatDate(publishedAt)}</span>
                        <span>•</span>
                        <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <Icon name="reading-time-icon" size="xs" />
                            {readingTime}
                        </span>
                        <span>•</span>
                        <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <Icon name="eye-icon" size="xs" />
                            {viewCount}
                        </span>
                    </div>

                    {/* 互动按钮 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)'
                    }}>
                        {/* 点赞按钮 */}
                        <button
                            onClick={onLike}
                            className={`article-action-button ${isLiked ? 'article-action-button--liked' : ''}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 12px',
                                background: isLiked ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                                color: isLiked ? '#EF4444' : 'var(--color-text-muted)',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: 'var(--font-size-sm)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Icon name="like-icon-detail" size="sm" />
                            {likeCount}
                        </button>

                        {/* 收藏按钮 */}
                        <button
                            onClick={onBookmark}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 12px',
                                background: isBookmarked ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                                color: isBookmarked ? '#FFC107' : 'var(--color-text-muted)',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: 'var(--font-size-sm)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            className={`article-action-button ${isBookmarked ? 'article-action-button--bookmarked' : ''}`}
                        >
                            <Icon name="collect-icon-detail" size="sm" />
                            收藏
                        </button>

                        {/* 分享按钮 */}
                        <button
                            onClick={onShare}
                            className="article-action-button"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 12px',
                                background: 'transparent',
                                color: 'var(--color-text-muted)',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: 'var(--font-size-sm)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Icon name="share-link-detail" size="sm" />
                            分享
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
} 