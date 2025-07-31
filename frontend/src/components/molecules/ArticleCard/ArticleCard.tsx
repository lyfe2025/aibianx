'use client'

import Link from 'next/link'
import { Avatar, Icon, TagList, CrownIcon, StarIcon } from '@/components/ui'

export interface ArticleCardData {
    id: string
    title: string
    excerpt?: string
    content?: string // 新增：文章正文内容
    coverImage?: string
    author: {
        name: string
        avatar?: string
    }
    publishedAt: string
    readingTime: string
    viewCount: string
    likeCount?: string // 新增：点赞数
    // 更新标签类型：使用字符串数组，由TagList组件处理样式
    tags: string[]
    slug: string
    isPremium?: boolean
    featured?: boolean // 是否置顶推荐
    // SEO优化字段
    seoTitle?: string
    seoDescription?: string
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
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    background: article.coverImage ? 'transparent' : 'var(--gradient-primary)'
                }}>
                    {article.coverImage ? (
                        <img 
                            src={article.coverImage}
                            alt={article.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 'var(--radius-lg)'
                            }}
                        />
                    ) : (
                        <span style={{
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '600'
                        }}>
                            封面图
                        </span>
                    )}

                    {/* 置顶推荐标识 - 放在最上面 */}
                    {article.featured && (
                        <div
                            className="featured-badge"
                            style={{
                                position: 'absolute',
                                top: 'var(--spacing-2)',
                                right: 'var(--spacing-2)',
                                fontSize: 'var(--font-size-xs)',
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                zIndex: 999, // 最高优先级
                                minWidth: 'auto',
                                whiteSpace: 'nowrap',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                WebkitFontSmoothing: 'antialiased',
                                MozOsxFontSmoothing: 'grayscale',
                                border: '1px solid var(--color-warning-border)', // 统一的警告色边框
                                background: 'var(--color-warning-bg)', // 统一的警告色背景
                                color: '#F59E0B !important', // 最强制的金橙色设置
                                WebkitTextFillColor: '#F59E0B !important', // Webkit强制颜色
                                fontWeight: '700',
                                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)' // 警告色阴影
                            }}>
                            <StarIcon size="xs" style={{ color: '#F59E0B !important' }} />
                            <span style={{ color: '#F59E0B !important', WebkitTextFillColor: '#F59E0B !important' }}>
                                置顶推荐
                            </span>
                        </div>
                    )}

                    {/* 会员专属标识 - 如果有置顶标识则往下偏移 */}
                    {article.isPremium && (
                        <div
                            className="premium-badge"
                            style={{
                                position: 'absolute',
                                top: article.featured ? 'calc(var(--spacing-2) + 40px)' : 'var(--spacing-2)', // 如果有置顶标识，则往下偏移
                                right: 'var(--spacing-2)',
                                fontSize: 'var(--font-size-xs)',
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                zIndex: 998, // 比置顶标识稍低
                                minWidth: 'auto',
                                whiteSpace: 'nowrap',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                WebkitFontSmoothing: 'antialiased',
                                MozOsxFontSmoothing: 'grayscale',
                                border: '1px solid var(--color-warning-border)', // 添加缺失的边框
                                background: 'var(--color-warning-bg)', // 确保背景色
                                color: '#F59E0B !important', // 最强制的金橙色设置
                                WebkitTextFillColor: '#F59E0B !important', // Webkit强制颜色
                                fontWeight: '700', // 确保字重一致
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' // 添加阴影
                            }}>
                            <CrownIcon size="xs" style={{ color: '#F59E0B !important' }} />
                            <span style={{ color: '#F59E0B !important', WebkitTextFillColor: '#F59E0B !important' }}>
                                会员专享
                            </span>
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

                        {/* 标签 - 使用新的TagList组件 */}
                        <TagList
                            tags={article.tags}
                            size="sm"
                            maxCount={3}
                            style={{
                                marginBottom: 'var(--spacing-3)',
                                gap: 'var(--spacing-2)'
                            }}
                        />
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
                            />
                            <div>
                                <div style={{
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: '500',
                                    color: 'var(--color-text-primary)',
                                    lineHeight: '1.2'
                                }}>
                                    {article.author.name}
                                </div>
                                <div style={{
                                    fontSize: 'var(--font-size-xs)',
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.2'
                                }}>
                                    {article.publishedAt}
                                </div>
                            </div>
                        </div>

                        {/* 元信息 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)',
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-muted)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <Icon name="clock-icon" size="xs" />
                                {article.readingTime}
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <Icon name="eye-icon" size="xs" />
                                {article.viewCount}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
} 