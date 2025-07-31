'use client'

import { useHomeArticles } from '@/lib/hooks'
import { Icon, TagList } from '@/components/ui'
import { FILTER_OPTIONS, MAIN_CONTENT_TEXT } from '@/constants/mainContent'
import Link from 'next/link'

interface ArticleListProps {
    className?: string
}

/**
 * ArticleList 文章列表组件 (API版本)
 * 
 * 功能特性：
 * - 筛选标签功能 (最新、热门)
 * - 真实API文章列表展示
 * - 查看更多按钮
 * - 加载和错误状态处理
 * - 响应式设计
 * 
 * 从MainContentSection中分离，符合单一职责原则
 */
export function ArticleList({ className }: ArticleListProps) {
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



    return (
        <div className={`main-content-articles ${className || ''}`} style={{
            background: 'var(--color-bg-secondary)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: '16px',
            width: '822px',
            display: 'flex',
            flexDirection: 'column',
            marginRight: '48px'
        }}>
            {/* 筛选标签 - 顶部间距36px，左边距36px */}
            <div className="filter-tags" style={{
                display: 'flex',
                marginTop: '36px',
                marginLeft: '36px',
                marginRight: '36px',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '48px'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '48px'
                }}>
                    {FILTER_OPTIONS.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleFilterChange(option === '最新' ? 'latest' : 'popular')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: (activeFilter === 'latest' && option === '最新') || (activeFilter === 'popular' && option === '热门') 
                                    ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                fontSize: '16px',
                                lineHeight: '24px',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-family-primary)',
                                position: 'relative',
                                padding: 0,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {option}
                            {((activeFilter === 'latest' && option === '最新') || (activeFilter === 'popular' && option === '热门')) && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-8px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '20px',
                                    height: '2px',
                                    background: 'var(--gradient-primary)'
                                }} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 文章列表 */}
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
                        暂无{activeFilter === 'latest' ? '最新' : '热门'}文章
                    </div>
                </div>
            ) : (
            <div className="articles-list" style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 36px',
                gap: '22px'
            }}>
                    {articles.map((article) => {
                        return (
                    <Link
                        key={article.id}
                            href={`/weekly/${article.slug}`}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            background: 'transparent',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                            }}>
                            <div style={{
                                    width: '180px',
                                    height: '120px',
                                    borderRadius: '8px',
                                    marginRight: '24px',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                background: !article.coverImage ? 'var(--gradient-primary)' : 'transparent'
                            }}>
                                {article.coverImage ? (
                                    <img 
                                        src={article.coverImage}
                                        alt={article.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}

                                    />
                                ) : (
                                    <span style={{
                                        color: 'var(--color-text-primary)',
                                        fontSize: '14px',
                                        fontWeight: 600
                                    }}>
                                        封面图
                                    </span>
                                )}
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flex: 1,
                                paddingTop: '8px',
                                paddingBottom: '8px'
                            }}>
                                <div>
                                    <h3 style={{
                                        color: 'var(--color-text-primary)',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        lineHeight: '24px',
                                        margin: 0,
                                        marginBottom: '12px',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {article.title}
                                    </h3>
                                    <TagList
                                        tags={article.tags}
                                        size="sm"
                                        style={{ marginBottom: '12px' }}
                                    />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Icon name="eye-icon" style={{
                                            color: 'var(--color-text-disabled)',
                                            width: '16px',
                                            height: '16px',
                                            marginRight: '6px',
                                            flexShrink: 0,
                                            minWidth: '16px'
                                        }} />
                                        <span style={{
                                            color: 'var(--color-text-disabled)',
                                            fontSize: '12px',
                                            lineHeight: '18px',
                                            minWidth: '24px'
                                        }}>
                                            {article.viewCount}
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: '12px'
                                    }}>
                                        <Icon name="clock-icon" style={{
                                            color: 'var(--color-text-disabled)',
                                            width: '12px',
                                            height: '12px',
                                            marginRight: '6px',
                                            flexShrink: 0,
                                            minWidth: '12px'
                                        }} />
                                        <span style={{
                                            color: 'var(--color-text-disabled)',
                                            fontSize: '12px',
                                            lineHeight: '18px',
                                            minWidth: '48px',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {article.readingTime}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                        )
                    })}
            </div>
            )}

            {/* 查看更多按钮 - 上下间距一致 */}
            {!isLoading && !connectionError && articles.length > 0 && (
            <div className="view-more-container" style={{
                display: 'flex',
                justifyContent: 'center',
                    marginTop: '48px',
                    marginBottom: '48px'
            }}>
                    <Link
                        href="/weekly"
                    style={{
                        background: 'var(--gradient-primary)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '16px 24px',
                        color: 'var(--color-text-primary)',
                        fontSize: '13.33px',
                        lineHeight: '15px',
                        cursor: 'pointer',
                        fontFamily: 'Arial',
                        textAlign: 'center',
                        width: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            textDecoration: 'none'
                    }}
                >
                    {MAIN_CONTENT_TEXT.viewMoreButtonText}
                    </Link>
            </div>
            )}
        </div>
    )
} 