'use client'

import { Avatar, GradientButton } from '@/components/ui'

interface AuthorCardProps {
    author: {
        name: string
        avatar?: string
        bio: string
        followersCount?: string
        articlesCount?: string
        specialties?: string[]
    }
    onFollow?: () => void
    isFollowing?: boolean
    className?: string
}

export function AuthorCard({
    author,
    onFollow,
    isFollowing = false,
    className = ''
}: AuthorCardProps) {
    return (
        <div
            className={`glass-card ${className}`}
            style={{
                padding: 'var(--spacing-6)',
                textAlign: 'center'
            }}
        >
            {/* 作者头像 */}
            <Avatar
                src={author.avatar}
                alt={author.name}
                size="xl"
                fallback={author.name.charAt(0)}
                style={{
                    margin: '0 auto var(--spacing-4)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
            />

            {/* 作者姓名 */}
            <h3 style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-2)'
            }}>
                {author.name}
            </h3>

            {/* 作者统计 */}
            {(author.followersCount || author.articlesCount) && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 'var(--spacing-6)',
                    marginBottom: 'var(--spacing-4)'
                }}>
                    {author.followersCount && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: 'var(--font-size-lg)',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)'
                            }}>
                                {author.followersCount}
                            </div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)'
                            }}>
                                关注者
                            </div>
                        </div>
                    )}
                    {author.articlesCount && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: 'var(--font-size-lg)',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)'
                            }}>
                                {author.articlesCount}
                            </div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)'
                            }}>
                                文章
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 作者简介 */}
            <p style={{
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
                marginBottom: 'var(--spacing-4)',
                textAlign: 'left'
            }}>
                {author.bio}
            </p>

            {/* 专业领域标签 */}
            {author.specialties && author.specialties.length > 0 && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--spacing-2)',
                    justifyContent: 'center',
                    marginBottom: 'var(--spacing-5)'
                }}>
                    {author.specialties.map((specialty, index) => (
                        <span
                            key={index}
                            style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: 'var(--color-primary-blue)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '4px 10px',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: '500'
                            }}
                        >
                            {specialty}
                        </span>
                    ))}
                </div>
            )}

            {/* 关注按钮 */}
            {onFollow && (
                <GradientButton
                    size="md"
                    variant={isFollowing ? 'outline' : 'primary'}
                    fullWidth
                    onClick={onFollow}
                >
                    {isFollowing ? '已关注' : '关注作者'}
                </GradientButton>
            )}
        </div>
    )
} 