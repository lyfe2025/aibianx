'use client'

/**
 * MeiliSearch搜索功能演示页面
 */

import { useState } from 'react'
import { Container } from '@/components/ui'
import { SmartSearch } from '@/components/ui/SmartSearch/SmartSearch'
import { SearchAnalyticsPanel } from '@/components/molecules/SearchAnalyticsPanel/SearchAnalyticsPanel'
import { searchArticles, getSearchStats } from '@/lib/meilisearch'
import type { MeiliSearchArticle } from '@/lib/meilisearch'

export default function SearchDemoPage() {
    const [searchResults, setSearchResults] = useState<MeiliSearchArticle[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [searchStats, setSearchStats] = useState<any>(null)

    const handleSearch = async (query: string) => {
        setSearchQuery(query)
        setError(null)

        if (!query.trim()) {
            setSearchResults([])
            return
        }

        setIsLoading(true)
        try {
            const response = await searchArticles({
                query: query.trim(),
                pageSize: 10,
                highlight: true
            })

            setSearchResults(response.articles)
            console.log('🔍 搜索结果:', response)

        } catch (err) {
            console.error('搜索失败:', err)
            setError(err instanceof Error ? err.message : '搜索失败')
            setSearchResults([])
        } finally {
            setIsLoading(false)
        }
    }

    const loadSearchStats = async () => {
        try {
            const stats = await getSearchStats()
            setSearchStats(stats)
        } catch (err) {
            console.error('获取搜索统计失败:', err)
        }
    }

    return (
        <Container size="xl">
            <div style={{ padding: '40px 0' }}>
                {/* 页面标题 */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '48px'
                }}>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        marginBottom: '16px'
                    }}>
                        MeiliSearch 搜索演示
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        color: 'var(--color-text-muted)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        测试AI变现之路网站的智能搜索功能，支持中文分词、搜索建议、高亮显示等高级特性
                    </p>
                </div>

                {/* 搜索区域 */}
                <div style={{
                    marginBottom: '48px',
                    maxWidth: '800px',
                    margin: '0 auto 48px'
                }}>
                    <SmartSearch
                        placeholder="搜索AI工具、教程、案例..."
                        onSearch={handleSearch}
                        showHistory={true}
                        showPopular={true}
                        maxSuggestions={8}
                    />
                </div>

                {/* 操作按钮 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    <button
                        onClick={loadSearchStats}
                        style={{
                            padding: '12px 24px',
                            background: 'var(--color-primary-blue)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer'
                        }}
                    >
                        获取搜索统计
                    </button>
                </div>

                {/* 搜索状态显示 */}
                {isLoading && (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        color: 'var(--color-text-muted)'
                    }}>
                        正在搜索中...
                    </div>
                )}

                {error && (
                    <div style={{
                        padding: '20px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '12px',
                        color: 'var(--color-text-danger)',
                        marginBottom: '24px'
                    }}>
                        搜索错误: {error}
                    </div>
                )}

                {/* 搜索结果显示 */}
                {searchQuery && !isLoading && searchResults.length > 0 && (
                    <div style={{ marginBottom: '48px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                            marginBottom: '24px'
                        }}>
                            搜索结果 ({searchResults.length} 篇文章)
                        </h2>

                        <div style={{ space: '16px' }}>
                            {searchResults.map((article) => (
                                <div
                                    key={article.documentId}
                                    style={{
                                        padding: '20px',
                                        background: 'var(--color-bg-glass)',
                                        borderRadius: '12px',
                                        border: '1px solid var(--color-border-primary)',
                                        marginBottom: '16px'
                                    }}
                                >
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        color: 'var(--color-text-primary)',
                                        marginBottom: '8px'
                                    }}>
                                        {/* 显示高亮的标题 */}
                                        <span dangerouslySetInnerHTML={{
                                            __html: article._formatted?.title || article.title
                                        }} />
                                    </h3>

                                    {article.excerpt && (
                                        <p style={{
                                            color: 'var(--color-text-muted)',
                                            fontSize: '14px',
                                            lineHeight: 1.6,
                                            marginBottom: '12px'
                                        }}>
                                            {/* 显示高亮的摘要 */}
                                            <span dangerouslySetInnerHTML={{
                                                __html: article._formatted?.excerpt || article.excerpt
                                            }} />
                                        </p>
                                    )}

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        fontSize: '12px',
                                        color: 'var(--color-text-muted)'
                                    }}>
                                        {article.author && (
                                            <span>作者: {article.author.name}</span>
                                        )}
                                        {article.category && (
                                            <span>分类: {article.category.name}</span>
                                        )}
                                        <span>阅读时间: {article.readingTime} 分钟</span>
                                        <span>浏览量: {article.viewCount}</span>
                                        {article.featured && (
                                            <span style={{
                                                background: 'var(--color-primary-blue)',
                                                color: 'white',
                                                padding: '2px 6px',
                                                borderRadius: '4px'
                                            }}>
                                                精选
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 无搜索结果 */}
                {searchQuery && !isLoading && searchResults.length === 0 && !error && (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        color: 'var(--color-text-muted)'
                    }}>
                        没有找到相关文章，请尝试其他关键词
                    </div>
                )}

                {/* 搜索统计显示 */}
                {searchStats && (
                    <div style={{ marginBottom: '48px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                            marginBottom: '24px'
                        }}>
                            搜索引擎统计
                        </h2>

                        <div style={{
                            padding: '20px',
                            background: 'var(--color-bg-glass)',
                            borderRadius: '12px',
                            border: '1px solid var(--color-border-primary)'
                        }}>
                            <pre style={{
                                color: 'var(--color-text-primary)',
                                fontSize: '14px',
                                lineHeight: 1.6,
                                margin: 0,
                                whiteSpace: 'pre-wrap'
                            }}>
                                {JSON.stringify(searchStats, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}

                {/* 搜索分析面板 */}
                <div>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: '24px'
                    }}>
                        搜索分析
                    </h2>

                    <SearchAnalyticsPanel
                        showActions={true}
                        compact={false}
                    />
                </div>
            </div>
        </Container>
    )
}