'use client'

import { Icon } from '@/components/ui'
import { FILTERS, ViewMode, VIEW_MODES, PAGE_CONFIG } from '@/constants/bookmarksConfig'

interface BookmarksHeaderProps {
  searchQuery: string
  viewMode: ViewMode
  isSearchFocused: boolean
  onSearchChange: (value: string) => void
  onSearchKeyDown: (e: React.KeyboardEvent) => void
  onSearchFocus: () => void
  onSearchBlur: () => void
  onSearchClear: () => void
  onFilterClick: (filter: string) => void
  onViewModeChange: (mode: ViewMode) => void
}

/**
 * BookmarksHeader 组件
 * 
 * 收藏页面的顶部控制栏，包含标题、筛选、搜索和视图切换
 */
export function BookmarksHeader({
  searchQuery,
  viewMode,
  isSearchFocused,
  onSearchChange,
  onSearchKeyDown,
  onSearchFocus,
  onSearchBlur,
  onSearchClear,
  onFilterClick,
  onViewModeChange
}: BookmarksHeaderProps) {
    return (
        <>
            {/* 页面标题 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '32px'
            }}>
                <h1 style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-3xl)',
                    lineHeight: '32px',
                    fontWeight: 'normal',
                    margin: 0,
                    whiteSpace: 'nowrap'
                }}>{PAGE_CONFIG.title}</h1>
            </div>

            {/* 筛选和搜索控制栏 */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'nowrap',
                gap: '24px'
            }}>
                {/* 左侧筛选标签 */}
                <div style={{
                    gap: '16px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    {FILTERS.map((filter) => (
                        <div
                            key={filter.label}
                            onClick={() => onFilterClick(filter.label)}
                            style={{
                                background: 'var(--color-bg-glass)',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: '8px',
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingLeft: '17px',
                                paddingRight: '17px',
                                paddingTop: '9px',
                                paddingBottom: '9px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                flexShrink: 0
                            }}>
                            {filter.isFilterIcon ? (
                                <>
                                    <Icon name={filter.icon} size="xs" style={{
                                        color: 'var(--color-text-primary)',
                                        width: '16px',
                                        height: '16px',
                                        flexShrink: 0
                                    }} />
                                    <span style={{
                                        color: 'var(--color-text-primary)',
                                        fontSize: 'var(--font-size-base)',
                                        lineHeight: '20px'
                                    }}>{filter.label}</span>
                                </>
                            ) : (
                                <>
                                    <span style={{
                                        color: 'var(--color-text-primary)',
                                        fontSize: 'var(--font-size-base)',
                                        lineHeight: '20px'
                                    }}>{filter.label}</span>
                                    <Icon name={filter.icon} size="xs" style={{
                                        color: 'var(--color-text-primary)',
                                        width: '16px',
                                        height: '16px',
                                        flexShrink: 0
                                    }} />
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* 右侧搜索和视图控制 */}
                <div style={{
                    gap: '16px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    {/* 搜索框 */}
                    <div style={{ width: '256px', minWidth: '256px' }}>
                        <div style={{
                            background: 'var(--color-bg-input)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)',
                            border: `1px solid ${isSearchFocused ? 'var(--color-border-active)' : 'var(--color-border-primary)'}`,
                            borderRadius: '8px',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            width: '256px',
                            height: '48px',
                            transition: 'all 0.2s ease',
                            boxShadow: isSearchFocused ? '0 0 0 2px rgba(59, 130, 246, 0.1)' : 'none'
                        }}>
                            <Icon name="search-bookmark-icon" size="sm" style={{
                                color: isSearchFocused ? 'var(--color-border-active)' : 'var(--color-text-muted)',
                                width: '18px',
                                height: '18px',
                                flexShrink: 0,
                                transition: 'color 0.2s ease'
                            }} />
                            <input
                                type="text"
                                placeholder={PAGE_CONFIG.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                onKeyDown={onSearchKeyDown}
                                onFocus={onSearchFocus}
                                onBlur={onSearchBlur}
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: 'var(--color-text-primary)',
                                    fontSize: 'var(--font-size-base)',
                                    lineHeight: '20px',
                                    fontFamily: 'var(--font-family-primary)'
                                }}
                            />

                            {/* 清空按钮 */}
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={onSearchClear}
                                    aria-label="清空搜索"
                                    style={{
                                        background: 'var(--color-accent-primary)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: 'var(--color-text-muted)',
                                        fontSize: '12px',
                                        lineHeight: '1',
                                        flexShrink: 0,
                                        transition: 'all 0.2s ease',
                                        opacity: 0.7
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--color-hover-secondary)'
                                        e.currentTarget.style.opacity = '1'
                                        e.currentTarget.style.transform = 'scale(1.1)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--color-accent-primary)'
                                        e.currentTarget.style.opacity = '0.7'
                                        e.currentTarget.style.transform = 'scale(1)'
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 视图切换 */}
                    <div style={{
                        background: 'var(--color-bg-glass)',
                        border: '1px solid var(--color-border-primary)',
                        borderRadius: '8px',
                        display: 'flex',
                        width: '70px',
                        height: '48px',
                        alignItems: 'center',
                        overflow: 'hidden',
                        flexDirection: 'row',
                        padding: '2px',
                        flexShrink: 0
                    }}>
                        <div style={{
                            background: viewMode === VIEW_MODES.GRID ? 'var(--color-hover-primary)' : 'transparent',
                            borderRadius: '6px',
                            width: '33px',
                            height: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }} onClick={() => onViewModeChange(VIEW_MODES.GRID)}>
                            <Icon name="grid-view-icon" size="sm" style={{
                                width: '18px',
                                height: '18px',
                                color: viewMode === VIEW_MODES.GRID ? 'var(--color-primary-blue)' : 'var(--color-text-muted)'
                            }} />
                        </div>
                        <div style={{
                            background: viewMode === VIEW_MODES.LIST ? 'var(--color-hover-primary)' : 'transparent',
                            borderRadius: '6px',
                            width: '33px',
                            height: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }} onClick={() => onViewModeChange(VIEW_MODES.LIST)}>
                            <Icon name="list-view-icon" size="sm" style={{
                                width: '18px',
                                height: '18px',
                                color: viewMode === VIEW_MODES.LIST ? 'var(--color-primary-blue)' : 'var(--color-text-muted)'
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 