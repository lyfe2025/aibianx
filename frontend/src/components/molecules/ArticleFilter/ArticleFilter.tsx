'use client'

interface FilterOption {
    id: string
    label: string
    count?: number
    colors?: {
        background: string
        border?: string
        text: string
    }
}

interface ArticleFilterProps {
    options: FilterOption[]
    activeFilter: string
    onFilterChange: (filterId: string) => void
    className?: string
}

export function ArticleFilter({
    options,
    activeFilter,
    onFilterChange,
    className = ''
}: ArticleFilterProps) {
    return (
        <div className={className} style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--spacing-3)',
            alignItems: 'center'
        }}>
            {options.map((option) => {
                const isActive = activeFilter === option.id

                return (
                    <button
                        key={option.id}
                        onClick={() => onFilterChange(option.id)}
                        style={{
                            background: isActive
                                ? (option.colors?.background || 'var(--gradient-primary)')
                                : (option.colors?.background || 'transparent'),
                            color: isActive || option.colors
                                ? (option.colors?.text || '#FFFFFF')
                                : 'var(--color-text-muted)',
                            border: isActive
                                ? 'none'
                                : option.colors?.border
                                    ? `1px solid ${option.colors.border}`
                                    : '1px solid var(--color-border-primary)',
                            borderRadius: '9999px',
                            padding: '9px 15px',
                            fontSize: '14px',
                            fontWeight: '400',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-1)',
                            whiteSpace: 'nowrap',
                            boxShadow: option.colors && !isActive ? '0px 0px 8px 0px rgba(0, 0, 0, 0.20)' : 'none'
                        }}
                        className={`article-filter-button ${isActive ? 'article-filter-button--active' : ''}`}
                    >
                        <span>{option.label}</span>
                        {option.count !== undefined && (
                            <span style={{
                                fontSize: 'var(--font-size-xs)',
                                opacity: 0.8,
                                marginLeft: '2px'
                            }}>
                                ({option.count})
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
} 