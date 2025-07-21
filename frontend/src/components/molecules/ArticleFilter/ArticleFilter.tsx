'use client'

interface FilterOption {
    id: string
    label: string
    count?: number
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
                                ? 'var(--gradient-primary)'
                                : 'transparent',
                            color: isActive
                                ? '#FFFFFF'
                                : 'var(--color-text-muted)',
                            border: isActive
                                ? 'none'
                                : '1px solid var(--color-border-primary)',
                            borderRadius: 'var(--radius-full)',
                            padding: '8px 20px',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-1)',
                            whiteSpace: 'nowrap'
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