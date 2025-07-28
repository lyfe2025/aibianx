'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, Icon, Avatar, TagList } from '@/components/ui'
import {
    ArticleContent,
    RelatedArticles
} from '@/components/molecules'
import { MOCK_ARTICLE_DATA, MOCK_RELATED_ARTICLES, WEEKLY_DETAIL_TEXT, type ArticleData } from '@/constants/weeklyDetail'

interface ArticleDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
    const [slug, setSlug] = useState<string>('')
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    // 解析params
    useEffect(() => {
        params.then(resolvedParams => {
            setSlug(resolvedParams.slug)
        })
    }, [params])

    // 根据slug获取文章数据（实际项目中应该从API获取）
    const article = slug ? MOCK_ARTICLE_DATA[slug as keyof typeof MOCK_ARTICLE_DATA] : null

    if (!slug) {
        // 加载中状态
        return (
            <div style={{
                color: 'var(--color-text-primary)',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '80px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Container size="md">
                        <div style={{
                            fontSize: 'var(--font-size-2xl)',
                            color: 'var(--color-text-secondary)'
                        }}>
                            {WEEKLY_DETAIL_TEXT.loading}
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    if (!article) {
        // 404页面
        return (
            <div style={{
                color: 'var(--color-text-primary)',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '80px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Container size="md">
                        <h1 style={{
                            fontSize: 'var(--font-size-8xl)',
                            fontWeight: '700',
                            color: 'var(--color-text-muted)',
                            marginBottom: 'var(--spacing-4)'
                        }}>
                            404
                        </h1>
                        <h2 style={{
                            fontSize: 'var(--font-size-3xl)',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-2)'
                        }}>
                            {WEEKLY_DETAIL_TEXT.notFound}
                        </h2>
                        <p style={{
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-6)'
                        }}>
                            抱歉，您访问的文章不存在或已被删除
                        </p>
                        <Link href="/weekly" style={{
                            display: 'inline-block',
                            padding: 'var(--spacing-3) var(--spacing-6)',
                            background: 'var(--gradient-primary)',
                            color: 'var(--color-text-primary)',
                            textDecoration: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '500'
                        }}>
                            {WEEKLY_DETAIL_TEXT.backToList}
                        </Link>
                    </Container>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            color: 'var(--color-text-primary)',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            minHeight: '100vh',
            paddingTop: '80px',
            paddingBottom: '48px'
        }}>
            <Container size="lg">
                {/* 文章详情内容 */}
                <div className="glass-card" style={{
                    borderRadius: '16px',
                    padding: '50px 48px',
                    marginTop: '48px',
                    marginBottom: '30px',
                    border: '1px solid var(--color-border-primary)',
                    background: 'var(--color-bg-glass)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    width: '100%',
                    margin: '48px auto 30px auto'
                }}>
                    {/* 标题 */}
                    <h1 style={{
                        fontSize: 'var(--font-size-5xl)',
                        fontWeight: '700',
                        lineHeight: '1.2',
                        margin: '0 0 32px 0',
                        color: 'var(--color-text-primary)',
                        width: '1000px'
                    }}>
                        {article.title}
                    </h1>

                    {/* 元信息 */}
                    <div className="meta-info" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '32px',
                        flexWrap: 'nowrap'
                    }}>
                        {/* 作者信息 */}
                        <div className="author-info" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            flexShrink: 0
                        }}>
                            <Avatar
                                src={article.author.avatar}
                                alt={article.author.name}
                                size="lg"
                            />
                            <div>
                                <div style={{
                                    fontSize: 'var(--font-size-lg)',
                                    fontWeight: '600',
                                    color: 'var(--color-text-primary)',
                                    marginBottom: '4px'
                                }}>
                                    {article.author.name}
                                </div>
                                <div style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-muted)'
                                }}>
                                    {article.author.bio}
                                </div>
                            </div>
                        </div>

                        {/* 标签和阅读信息 */}
                        <div className="tags-row" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            flexShrink: 0
                        }}>
                            <TagList
                                tags={article.tags}
                                size="md"
                                maxCount={3}
                            />
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)',
                                whiteSpace: 'nowrap'
                            }}>
                                <span>{article.publishedAt}</span>
                                <span>•</span>
                                <span>{article.readingTime}</span>
                                <span>•</span>
                                <span>{article.viewCount} 浏览</span>
                            </div>
                        </div>
                    </div>

                    {/* 文章内容 */}
                    <ArticleContent content={article.content} />

                    {/* 底部操作区域 */}
                    <div className="bottom-actions" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '48px',
                        paddingTop: '32px',
                        borderTop: '1px solid var(--color-border-primary)'
                    }}>
                        {/* 左侧操作按钮 */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center'
                        }}>
                            {/* 点赞按钮 */}
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                style={{
                                    background: 'var(--color-bg-glass)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    gap: '6px',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    color: isLiked ? '#EF4444' : 'var(--color-text-muted)'
                                }}
                            >
                                <Icon name="like-icon-detail" size="sm" />
                                <span style={{ fontSize: '14px' }}>
                                    {article.likeCount}
                                </span>
                            </button>

                            {/* 收藏按钮 */}
                            <button
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                style={{
                                    background: 'var(--color-bg-glass)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    gap: '6px',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    color: isBookmarked ? '#FFC107' : 'var(--color-text-muted)'
                                }}
                            >
                                <Icon name="collect-icon-detail" size="sm" />
                                <span style={{ fontSize: '14px' }}>
                                    {WEEKLY_DETAIL_TEXT.bookmarkAction}
                                </span>
                            </button>

                            {/* 调整按钮 */}
                            <button style={{
                                background: 'var(--color-bg-glass)',
                                borderRadius: '8px',
                                display: 'flex',
                                gap: '6px',
                                alignItems: 'center',
                                padding: '8px 12px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                color: 'var(--color-text-muted)'
                            }}>
                                <Icon name="adjust-icon-detail" size="sm" />
                                <span style={{ fontSize: '14px' }}>
                                    {WEEKLY_DETAIL_TEXT.adjustAction}
                                </span>
                            </button>
                        </div>

                        {/* 右侧分享按钮 */}
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center'
                        }}>
                            <button style={{
                                background: 'var(--color-bg-glass)',
                                borderRadius: '18px',
                                padding: '10px',
                                display: 'flex',
                                width: '36px',
                                height: '36px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}>
                                <Icon name="share-link-detail" size="sm" />
                            </button>
                            <button style={{
                                background: 'var(--color-bg-glass)',
                                borderRadius: '18px',
                                padding: '10px',
                                display: 'flex',
                                width: '36px',
                                height: '36px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}>
                                <Icon name="share-wechat-detail" size="sm" />
                            </button>
                            <button style={{
                                background: 'var(--color-bg-glass)',
                                borderRadius: '18px',
                                padding: '10px',
                                display: 'flex',
                                width: '36px',
                                height: '36px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}>
                                <Icon name="share-weibo-detail" size="sm" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 相关文章推荐 */}
                <RelatedArticles
                    articles={MOCK_RELATED_ARTICLES}
                    title={WEEKLY_DETAIL_TEXT.relatedTitle}
                />
            </Container>

            {/* 响应式样式 */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .glass-card {
                        margin: 0 10px !important;
                        padding: 20px 16px !important;
                    }
                    
                    h1 {
                        font-size: 24px !important;
                        width: 100% !important;
                        white-space: nowrap !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    }
                    
                    .bottom-actions {
                        flex-direction: column !important;
                        gap: 16px !important;
                        align-items: stretch !important;
                    }
                    
                    .meta-info {
                        flex-wrap: wrap !important;
                        gap: 8px !important;
                    }
                    
                    .tags-row {
                        flex-wrap: wrap !important;
                        gap: 8px !important;
                    }
                    
                    .author-info {
                        flex-wrap: nowrap !important;
                    }
                }
                
                @media (max-width: 480px) {
                    h1 {
                        font-size: 20px !important;
                        line-height: 1.3 !important;
                        white-space: normal !important;
                        overflow: visible !important;
                        text-overflow: clip !important;
                    }
                    
                    .meta-info {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                    
                    .tags-row {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                }
            `}</style>
        </div>
    )
} 