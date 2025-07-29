'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon, Avatar, TagList } from '@/components/ui'
import { ArticleContent, RelatedArticles } from '@/components/molecules'
import { MOCK_RELATED_ARTICLES, WEEKLY_DETAIL_TEXT } from '@/constants/weeklyDetail'
import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

interface ArticleDetailClientProps {
    article: ArticleCardData
}

export function ArticleDetailClient({ article }: ArticleDetailClientProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    return (
        <>
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
                            src={article.author.avatar || "/images/avatars/author-li-mingyang.jpeg"}
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
                                AI变现专家
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
                {article.excerpt && (
                    <div style={{
                        fontSize: 'var(--font-size-lg)',
                        lineHeight: '1.6',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '32px',
                        padding: '24px',
                        background: 'var(--color-bg-secondary)',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border-primary)'
                    }}>
                        {article.excerpt}
                    </div>
                )}

                {/* 如果有content字段，显示文章内容，否则显示占位符 */}
                {(article as any).content ? (
                    <ArticleContent content={(article as any).content} />
                ) : (
                    <div style={{
                        fontSize: 'var(--font-size-lg)',
                        lineHeight: '1.8',
                        color: 'var(--color-text-primary)',
                        marginBottom: '32px'
                    }}>
                        <p style={{ marginBottom: '24px' }}>
                            这是文章的详细内容部分。在实际应用中，这里会显示从Strapi CMS获取的完整文章内容。
                        </p>
                        <p style={{ marginBottom: '24px' }}>
                            目前显示的是基于API数据的动态内容，包括：
                        </p>
                        <ul style={{
                            paddingLeft: '24px',
                            marginBottom: '24px',
                            listStyle: 'disc'
                        }}>
                            <li style={{ marginBottom: '8px' }}>✅ 真实的文章标题和摘要</li>
                            <li style={{ marginBottom: '8px' }}>✅ 动态SEO元数据生成</li>
                            <li style={{ marginBottom: '8px' }}>✅ 结构化数据嵌入</li>
                            <li style={{ marginBottom: '8px' }}>✅ 服务端渲染和ISR支持</li>
                            <li style={{ marginBottom: '8px' }}>✅ 完整的社交媒体分享优化</li>
                        </ul>
                        <p>
                            文章内容可以通过在Strapi CMS中编辑文章的content字段来更新。
                        </p>
                    </div>
                )}

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
                                {parseInt(article.viewCount) || 0}
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
        </>
    )
} 