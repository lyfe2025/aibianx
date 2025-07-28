'use client'

import { SearchBar, ArticleFilter } from '@/components/molecules'
import { getSearchResultStats, getClearSearchButtonStyles, applyClearSearchButtonHover } from '@/lib/weeklyUtils'
import { FILTER_OPTIONS, PAGE_CONFIG, STYLES_CONFIG } from '@/constants/weeklyConfig'

interface WeeklySearchSectionProps {
    searchQuery: string
    activeFilter: string
    isSearching: boolean
    totalResults: number
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
    onSearch,
    onFilterChange,
    onClearSearch
}: WeeklySearchSectionProps) {
    const searchStats = getSearchResultStats(totalResults, searchQuery, isSearching)
    const clearButtonStyles = getClearSearchButtonStyles()

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
                        <div>
                            {isSearching ? (
                                <span>搜索中...</span>
                            ) : (
                                <span>
                                    搜索 &ldquo;{searchQuery}&rdquo; 找到{' '}
                                    <strong style={{ color: 'var(--color-text-secondary)' }}>
                                        {totalResults}
                                    </strong>{' '}
                                    个相关结果
                                </span>
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
        </div>
    )
} 