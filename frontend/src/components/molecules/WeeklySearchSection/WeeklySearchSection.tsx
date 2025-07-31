'use client'

import { SearchBar, ArticleFilter } from '@/components/molecules'
import { getSearchResultStats, getClearSearchButtonStyles, applyClearSearchButtonHover } from '@/lib/weeklyUtils'
import { FILTER_OPTIONS, PAGE_CONFIG, STYLES_CONFIG } from '@/constants/weeklyConfig'
import { useThemeStore } from '@/stores'

interface WeeklySearchSectionProps {
    searchQuery: string
    activeFilter: string
    isSearching: boolean
    totalResults: number
    searchMode?: 'strapi' | 'meilisearch' // 新增：搜索引擎模式
    onSearch: (query: string) => void
    onFilterChange: (filterId: string) => void
    onClearSearch: () => void
}

/**
 * WeeklySearchSection 组件
 * 
 * 搜索和筛选区域，包含搜索栏、结果统计、筛选器
 */
export function WeeklySearchSection({
    searchQuery,
    activeFilter,
    isSearching,
    totalResults,
    searchMode = 'strapi', // 默认使用Strapi
    onSearch,
    onFilterChange,
    onClearSearch
}: WeeklySearchSectionProps) {
    const { theme } = useThemeStore()
    const searchStats = getSearchResultStats(totalResults, searchQuery, isSearching)
    const clearButtonStyles = getClearSearchButtonStyles()

    // 调试：输出当前主题状态
    console.log('🔍 WeeklySearchSection - 当前主题:', theme)

    return (
        <div
            className="search-filter-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: STYLES_CONFIG.spacing.searchFilterGap,
                marginBottom: STYLES_CONFIG.spacing.sectionGap
            }}
        >
            {/* 搜索栏 */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div
                    className="search-container"
                    style={{
                        width: '100%',
                        maxWidth: STYLES_CONFIG.searchContainer.maxWidth
                    }}
                >
                    <SearchBar
                        placeholder={PAGE_CONFIG.searchPlaceholder}
                        onSearch={onSearch}
                        isLoading={isSearching}
                    />
                </div>
            </div>

            {/* 搜索结果统计 */}
            {searchStats.showStats && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '24px'
                }}>
                    <div
                        className="search-result-stats"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: STYLES_CONFIG.searchContainer.maxWidth,
                            color: 'var(--color-text-muted)',
                            fontSize: '14px',
                            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                            paddingLeft: '4px',
                            paddingRight: '4px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {isSearching ? (
                                <span>搜索中...</span>
                            ) : searchQuery ? (
                                <>
                                    <span>
                                        搜索 &ldquo;{searchQuery}&rdquo; 找到{' '}
                                        <strong style={{ color: 'var(--color-text-secondary)' }}>
                                            {totalResults}
                                        </strong>{' '}
                                        个相关结果
                                    </span>
                                    {/* 搜索引擎模式标识 - 低调版本 */}
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            color: theme === 'dark' ? '#FFFFFF' : '#000000',
                                            opacity: 0.2,
                                            whiteSpace: 'nowrap'
                                        }}
                                        className="search-mode-indicator"
                                    >
                                        {searchMode === 'meilisearch' ? 'MeiliSearch' : 'Strapi'}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span>
                                        浏览模式 • {totalResults} 篇文章
                                    </span>
                                    {/* 浏览模式标识 - 低调版本 */}
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            color: theme === 'dark' ? '#FFFFFF' : '#000000',
                                            opacity: 0.2,
                                            whiteSpace: 'nowrap'
                                        }}
                                        className="browse-mode-indicator"
                                    >
                                        浏览
                                    </span>
                                </>
                            )}
                        </div>
                        {totalResults > 0 && (
                            <button
                                onClick={onClearSearch}
                                style={clearButtonStyles}
                                onMouseEnter={(e) => applyClearSearchButtonHover(e.currentTarget, true)}
                                onMouseLeave={(e) => applyClearSearchButtonHover(e.currentTarget, false)}
                            >
                                清空搜索
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* 筛选器 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                <ArticleFilter
                    options={FILTER_OPTIONS}
                    activeFilter={activeFilter}
                    onFilterChange={onFilterChange}
                    className="article-filter"
                />
            </div>

            {/* 强制覆盖样式的CSS */}
            <style jsx>{`
                .search-mode-indicator {
                    color: ${theme === 'dark' ? '#FFFFFF' : '#000000'} !important;
                    opacity: 0.2 !important;
                }
                .browse-mode-indicator {
                    color: ${theme === 'dark' ? '#FFFFFF' : '#000000'} !important;
                    opacity: 0.2 !important;
                }
            `}</style>
        </div>
    )
} 