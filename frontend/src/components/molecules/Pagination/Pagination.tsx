'use client'

import { Icon } from '@/components/ui'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    showFirstLast?: boolean
    className?: string
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    className = ''
}: PaginationProps) {
    const generatePageNumbers = () => {
        const pages = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            const start = Math.max(1, currentPage - 2)
            const end = Math.min(totalPages, start + maxVisible - 1)

            if (start > 1) {
                pages.push(1)
                if (start > 2) pages.push('...')
            }

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (end < totalPages) {
                if (end < totalPages - 1) pages.push('...')
                pages.push(totalPages)
            }
        }

        return pages
    }

    const pageNumbers = generatePageNumbers()

    const buttonStyle = {
        minWidth: '40px',
        height: '40px',
        padding: '0 var(--spacing-2)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-primary)',
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--font-size-sm)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
    }

    const activeButtonStyle = {
        ...buttonStyle,
        background: 'var(--gradient-primary)',
        color: '#FFFFFF',
        border: 'none'
    }

    const disabledButtonStyle = {
        ...buttonStyle,
        opacity: 0.5,
        cursor: 'not-allowed'
    }

    if (totalPages <= 1) return null

    return (
        <nav className={className} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-2)'
        }}>
            {/* 第一页按钮 */}
            {showFirstLast && (
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
                    title="第一页"
                >
                    <Icon name="arrow-left" size="sm" />
                    <Icon name="arrow-left" size="sm" style={{ marginLeft: '-4px' }} />
                </button>
            )}

            {/* 上一页按钮 */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
                title="上一页"
            >
                <Icon name="arrow-left" size="sm" />
            </button>

            {/* 页码按钮 */}
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            style={{
                                color: 'var(--color-text-muted)',
                                padding: '0 var(--spacing-2)'
                            }}
                        >
                            ...
                        </span>
                    )
                }

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page as number)}
                        style={currentPage === page ? activeButtonStyle : buttonStyle}
                    >
                        {page}
                    </button>
                )
            })}

            {/* 下一页按钮 */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={currentPage === totalPages ? disabledButtonStyle : buttonStyle}
                title="下一页"
            >
                <Icon name="arrow-right" size="sm" />
            </button>

            {/* 最后一页按钮 */}
            {showFirstLast && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    style={currentPage === totalPages ? disabledButtonStyle : buttonStyle}
                    title="最后一页"
                >
                    <Icon name="arrow-right" size="sm" />
                    <Icon name="arrow-right" size="sm" style={{ marginLeft: '-4px' }} />
                </button>
            )}
        </nav>
    )
} 