'use client'

import {
    getEmptyStateConfig,
    getSuggestionButtonStyles,
    applySuggestionButtonHover,
    getPrimaryButtonStyles,
    applyPrimaryButtonHover
} from '@/lib/weeklyUtils'
import { PAGE_CONFIG } from '@/constants/weeklyConfig'

interface WeeklyEmptyStateProps {
    searchQuery: string
    onSearch: (query: string) => void
    onResetToDefaults: () => void
}

/**
 * WeeklyEmptyState 组件
 * 
 * 空状态显示，包含搜索无结果和分类无内容两种状态
 */
export function WeeklyEmptyState({
    searchQuery,
    onSearch,
    onResetToDefaults
}: WeeklyEmptyStateProps) {
    const hasSearchQuery = Boolean(searchQuery.trim())
    const config = getEmptyStateConfig(hasSearchQuery, searchQuery)
    const primaryButtonStyles = getPrimaryButtonStyles()

    return (
        <div
            className="empty-state"
            style={{
                textAlign: 'center',
                padding: '80px 0',
                color: 'var(--color-text-secondary)'
            }}
        >
            {config.type === 'search' ? (
                // 搜索无结果状态
                <>
                    <div style={{
                        fontSize: '48px',
                        marginBottom: '20px',
                        opacity: 0.4,
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>
                        🔍
                    </div>
                    <h3 style={{
                        fontSize: 'var(--font-size-2xl)',
                        color: 'var(--color-text-primary)',
                        marginBottom: '12px',
                        fontWeight: '600'
                    }}>
                        {config.title}
                    </h3>
                    <p style={{
                        fontSize: 'var(--font-size-base)',
                        marginBottom: '32px',
                        lineHeight: '1.6',
                        color: 'var(--color-text-muted)'
                    }}>
                        {config.description}
                    </p>

                    {/* 搜索建议 */}
                    {config.showSearchSuggestions && (
                        <div style={{ marginBottom: '32px' }}>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)',
                                marginBottom: '16px'
                            }}>
                                试试这些热门搜索：
                            </p>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px',
                                justifyContent: 'center',
                                marginBottom: '24px'
                            }}>
                                {PAGE_CONFIG.searchSuggestions.map((suggestion, index) => (
                                    <button
                                        key={suggestion}
                                        className="suggestion-button"
                                        onClick={() => onSearch(suggestion)}
                                        style={getSuggestionButtonStyles(index)}
                                        onMouseEnter={(e) => applySuggestionButtonHover(e.currentTarget, true)}
                                        onMouseLeave={(e) => applySuggestionButtonHover(e.currentTarget, false)}
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={onResetToDefaults}
                        style={primaryButtonStyles}
                        onMouseEnter={(e) => applyPrimaryButtonHover(e.currentTarget, true)}
                        onMouseLeave={(e) => applyPrimaryButtonHover(e.currentTarget, false)}
                    >
                        {config.actionText}
                    </button>
                </>
            ) : (
                // 分类无内容状态
                <>
                    <div style={{
                        fontSize: '72px',
                        marginBottom: '24px',
                        opacity: 0.3
                    }}>
                        📝
                    </div>
                    <h3 style={{
                        fontSize: 'var(--font-size-3xl)',
                        color: 'var(--color-text-primary)',
                        marginBottom: '16px'
                    }}>
                        {config.title}
                    </h3>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        marginBottom: '32px'
                    }}>
                        {config.description}
                    </p>
                    <button
                        onClick={onResetToDefaults}
                        style={{
                            background: 'var(--gradient-primary)',
                            color: 'var(--color-text-primary)',
                            border: 'none',
                            borderRadius: 'var(--radius-lg)',
                            padding: '12px 24px',
                            fontSize: 'var(--font-size-base)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            minWidth: '150px',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {config.actionText}
                    </button>
                </>
            )}
        </div>
    )
} 