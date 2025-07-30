/**
 * 搜索分析面板组件
 * 
 * 显示搜索统计数据、热门搜索、搜索趋势等分析信息
 * 主要用于管理后台或调试页面
 */

'use client'

import { useState } from 'react'
import { useSearchAnalytics } from '@/lib/hooks/useSearchAnalytics'
import { Icon, Loading, GradientButton } from '@/components/ui'

interface SearchAnalyticsPanelProps {
    className?: string
    showActions?: boolean
    compact?: boolean
}

export function SearchAnalyticsPanel({
    className = '',
    showActions = true,
    compact = false
}: SearchAnalyticsPanelProps) {
    const {
        analytics,
        suggestionAnalytics,
        isLoading,
        error,
        refreshAnalytics,
        clearAnalytics,
        getPopularSearches,
        getSearchHistory,
        getSearchTrend
    } = useSearchAnalytics()

    const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'suggestions'>('overview')

    if (isLoading) {
        return (
            <div className={`search-analytics-panel ${className}`}>
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    background: 'var(--color-bg-glass)',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border-primary)'
                }}>
                    <Loading size="lg" />
                    <p style={{
                        marginTop: '16px',
                        color: 'var(--color-text-muted)',
                        fontSize: '14px'
                    }}>
                        正在加载搜索分析数据...
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={`search-analytics-panel ${className}`}>
                <div style={{
                    padding: '32px',
                    textAlign: 'center',
                    background: 'var(--color-bg-glass)',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border-danger)'
                }}>
                    <Icon name="exclamation-circle" size="xl" style={{ color: 'var(--color-text-danger)' }} />
                    <h3 style={{
                        margin: '16px 0 8px',
                        color: 'var(--color-text-primary)',
                        fontSize: '18px',
                        fontWeight: 600
                    }}>
                        加载搜索分析失败
                    </h3>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '14px',
                        marginBottom: '16px'
                    }}>
                        {error}
                    </p>
                    {showActions && (
                        <GradientButton onClick={refreshAnalytics} size="sm">
                            重试
                        </GradientButton>
                    )}
                </div>
            </div>
        )
    }

    if (!analytics) {
        return (
            <div className={`search-analytics-panel ${className}`}>
                <div style={{
                    padding: '32px',
                    textAlign: 'center',
                    background: 'var(--color-bg-glass)',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border-primary)'
                }}>
                    <Icon name="chart-bar" size="xl" style={{ color: 'var(--color-text-muted)' }} />
                    <h3 style={{
                        margin: '16px 0 8px',
                        color: 'var(--color-text-primary)',
                        fontSize: '18px',
                        fontWeight: 600
                    }}>
                        暂无搜索数据
                    </h3>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '14px'
                    }}>
                        开始使用搜索功能后，这里将显示相关分析数据
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={`search-analytics-panel ${className}`}>
            {/* 头部操作栏 */}
            {showActions && !compact && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    padding: '16px 20px',
                    background: 'var(--color-bg-glass)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border-primary)'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        margin: 0
                    }}>
                        搜索分析
                    </h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={refreshAnalytics}
                            style={{
                                padding: '8px 16px',
                                background: 'transparent',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: '8px',
                                color: 'var(--color-text-muted)',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Icon name="arrow-path" size="sm" style={{ marginRight: '6px' }} />
                            刷新
                        </button>
                        <button
                            onClick={clearAnalytics}
                            style={{
                                padding: '8px 16px',
                                background: 'transparent',
                                border: '1px solid var(--color-border-danger)',
                                borderRadius: '8px',
                                color: 'var(--color-text-danger)',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Icon name="trash" size="sm" style={{ marginRight: '6px' }} />
                            清空数据
                        </button>
                    </div>
                </div>
            )}

            {/* 标签页导航 */}
            {!compact && (
                <div style={{
                    display: 'flex',
                    marginBottom: '24px',
                    background: 'var(--color-bg-glass)',
                    borderRadius: '12px',
                    padding: '4px',
                    border: '1px solid var(--color-border-primary)'
                }}>
                    {[
                        { key: 'overview', label: '概览', icon: 'chart-pie' },
                        { key: 'trends', label: '趋势', icon: 'chart-line' },
                        { key: 'suggestions', label: '建议分析', icon: 'light-bulb' }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                background: activeTab === tab.key
                                    ? 'var(--color-primary-blue)'
                                    : 'transparent',
                                color: activeTab === tab.key
                                    ? 'white'
                                    : 'var(--color-text-muted)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                            }}
                        >
                            <Icon name={tab.icon} size="sm" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}

            {/* 内容区域 */}
            <div className="analytics-content">
                {(activeTab === 'overview' || compact) && (
                    <div className="overview-section">
                        {/* 关键指标卡片 */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: compact ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                            gap: '16px',
                            marginBottom: '24px'
                        }}>
                            <MetricCard
                                title="索引文档"
                                value={analytics.totalDocuments.toLocaleString()}
                                icon="document-text"
                                status={analytics.isIndexing ? 'indexing' : 'ready'}
                            />
                            <MetricCard
                                title="总搜索次数"
                                value={analytics.totalSearches.toLocaleString()}
                                icon="magnifying-glass"
                                trend="+12%"
                            />
                            <MetricCard
                                title="唯一查询"
                                value={analytics.uniqueQueries.toLocaleString()}
                                icon="hashtag"
                                trend="+8%"
                            />
                            <MetricCard
                                title="平均查询长度"
                                value={`${analytics.averageQueryLength.toFixed(1)} 字符`}
                                icon="pencil"
                            />
                        </div>

                        {/* 热门搜索 */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: compact ? '1fr' : 'repeat(2, 1fr)',
                            gap: '24px'
                        }}>
                            <PopularSearchesCard
                                popularQueries={analytics.popularQueries}
                                compact={compact}
                            />

                            {!compact && (
                                <SearchResultsCard
                                    resultStats={analytics.resultStats}
                                />
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'trends' && !compact && (
                    <SearchTrendsCard
                        searchTrends={analytics.searchTrends}
                    />
                )}

                {activeTab === 'suggestions' && !compact && suggestionAnalytics && (
                    <SuggestionAnalyticsCard
                        suggestionAnalytics={suggestionAnalytics}
                    />
                )}
            </div>
        </div>
    )
}

// 指标卡片组件
function MetricCard({
    title,
    value,
    icon,
    trend,
    status
}: {
    title: string
    value: string
    icon: string
    trend?: string
    status?: 'ready' | 'indexing'
}) {
    return (
        <div style={{
            padding: '20px',
            background: 'var(--color-bg-glass)',
            borderRadius: '12px',
            border: '1px solid var(--color-border-primary)',
            position: 'relative'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
            }}>
                <Icon
                    name={icon}
                    size="lg"
                    style={{
                        color: status === 'indexing'
                            ? 'var(--color-warning)'
                            : 'var(--color-primary-blue)'
                    }}
                />
                {trend && (
                    <span style={{
                        fontSize: '12px',
                        color: trend.startsWith('+')
                            ? 'var(--color-success)'
                            : 'var(--color-danger)',
                        fontWeight: 500
                    }}>
                        {trend}
                    </span>
                )}
            </div>
            <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: '0 0 4px 0'
            }}>
                {value}
            </h3>
            <p style={{
                fontSize: '14px',
                color: 'var(--color-text-muted)',
                margin: 0
            }}>
                {title}
            </p>
            {status === 'indexing' && (
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '8px',
                    height: '8px',
                    background: 'var(--color-warning)',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                }} />
            )}
        </div>
    )
}

// 热门搜索卡片
function PopularSearchesCard({
    popularQueries,
    compact = false
}: {
    popularQueries: Array<{ query: string, count: number, percentage: number }>
    compact?: boolean
}) {
    return (
        <div style={{
            padding: '20px',
            background: 'var(--color-bg-glass)',
            borderRadius: '12px',
            border: '1px solid var(--color-border-primary)'
        }}>
            <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Icon name="fire" size="sm" style={{ color: 'var(--color-warning)' }} />
                热门搜索
            </h3>

            <div style={{ space: '12px' }}>
                {popularQueries.slice(0, compact ? 3 : 6).map((item, index) => (
                    <div key={item.query} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: index < popularQueries.length - 1
                            ? '1px solid var(--color-border-secondary)'
                            : 'none'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '20px',
                                height: '20px',
                                background: index < 3
                                    ? 'var(--color-primary-blue)'
                                    : 'var(--color-bg-secondary)',
                                color: index < 3 ? 'white' : 'var(--color-text-muted)',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: 600
                            }}>
                                {index + 1}
                            </span>
                            <span style={{
                                color: 'var(--color-text-primary)',
                                fontSize: '14px',
                                fontWeight: 500
                            }}>
                                {item.query}
                            </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                color: 'var(--color-text-primary)',
                                fontSize: '14px',
                                fontWeight: 600
                            }}>
                                {item.count}
                            </div>
                            <div style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '12px'
                            }}>
                                {item.percentage.toFixed(1)}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// 搜索结果统计卡片
function SearchResultsCard({
    resultStats
}: {
    resultStats: {
        averageResults: number
        zeroResultQueries: number
        topPerformingQueries: string[]
    }
}) {
    return (
        <div style={{
            padding: '20px',
            background: 'var(--color-bg-glass)',
            borderRadius: '12px',
            border: '1px solid var(--color-border-primary)'
        }}>
            <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Icon name="chart-bar" size="sm" style={{ color: 'var(--color-primary-blue)' }} />
                搜索结果分析
            </h3>

            <div style={{ space: '16px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid var(--color-border-secondary)'
                }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                        平均结果数
                    </span>
                    <span style={{
                        color: 'var(--color-text-primary)',
                        fontSize: '16px',
                        fontWeight: 600
                    }}>
                        {resultStats.averageResults.toFixed(1)}
                    </span>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0'
                }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                        零结果查询
                    </span>
                    <span style={{
                        color: resultStats.zeroResultQueries > 0
                            ? 'var(--color-warning)'
                            : 'var(--color-success)',
                        fontSize: '16px',
                        fontWeight: 600
                    }}>
                        {resultStats.zeroResultQueries}
                    </span>
                </div>
            </div>
        </div>
    )
}

// 搜索趋势卡片
function SearchTrendsCard({
    searchTrends
}: {
    searchTrends: Array<{ date: string, count: number, uniqueQueries: number }>
}) {
    return (
        <div style={{
            padding: '20px',
            background: 'var(--color-bg-glass)',
            borderRadius: '12px',
            border: '1px solid var(--color-border-primary)'
        }}>
            <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Icon name="chart-line" size="sm" style={{ color: 'var(--color-success)' }} />
                搜索趋势（最近7天）
            </h3>

            <div style={{ space: '8px' }}>
                {searchTrends.map((trend, index) => {
                    const date = new Date(trend.date)
                    const dayName = date.toLocaleDateString('zh-CN', { weekday: 'short' })
                    const dateStr = date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })

                    return (
                        <div key={trend.date} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            borderBottom: index < searchTrends.length - 1
                                ? '1px solid var(--color-border-secondary)'
                                : 'none'
                        }}>
                            <div>
                                <div style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}>
                                    {dayName}
                                </div>
                                <div style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: '12px'
                                }}>
                                    {dateStr}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '14px',
                                    fontWeight: 600
                                }}>
                                    {trend.count} 次搜索
                                </div>
                                <div style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: '12px'
                                }}>
                                    {trend.uniqueQueries} 个唯一查询
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// 建议分析卡片
function SuggestionAnalyticsCard({
    suggestionAnalytics
}: {
    suggestionAnalytics: any
}) {
    return (
        <div style={{
            padding: '20px',
            background: 'var(--color-bg-glass)',
            borderRadius: '12px',
            border: '1px solid var(--color-border-primary)'
        }}>
            <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Icon name="light-bulb" size="sm" style={{ color: 'var(--color-warning)' }} />
                搜索建议分析
            </h3>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                marginBottom: '16px'
            }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                    建议点击率
                </span>
                <span style={{
                    color: 'var(--color-primary-blue)',
                    fontSize: '18px',
                    fontWeight: 700
                }}>
                    {suggestionAnalytics.suggestionClickRate.toFixed(1)}%
                </span>
            </div>

            <div>
                <h4 style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 12px 0'
                }}>
                    建议类型分布
                </h4>
                <div style={{ space: '8px' }}>
                    {Object.entries(suggestionAnalytics.suggestionTypeDistribution).map(([type, count]) => (
                        <div key={type} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '6px 0'
                        }}>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                                {type === 'history' ? '历史' : type === 'suggestions' ? '建议' : '热门'}
                            </span>
                            <span style={{
                                color: 'var(--color-text-primary)',
                                fontSize: '14px',
                                fontWeight: 600
                            }}>
                                {count as number}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export { SearchAnalyticsPanel }