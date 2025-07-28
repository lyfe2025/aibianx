'use client'

import { Icon } from '@/components/ui'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
    // 可选的记录信息显示
    totalRecords?: number
    recordsPerPage?: number
    showInfo?: boolean
}

// 统一的分页设计系统
const PAGINATION_STYLES = {
    // 统一字体系统
    fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
    fontSize: '14px',
    fontWeight: '400',

    // 统一颜色系统 - 使用主题变量
    colors: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
        disabled: 'var(--color-text-disabled)',
        border: 'var(--color-border-primary)',
        activeBg: 'var(--color-hover-primary)',
        activeBorder: 'var(--color-border-active)',
        hoverBg: 'var(--color-hover-secondary)'
    },

    // 统一间距系统
    spacing: {
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '6px'
    },

    // 统一动画
    transition: 'all 0.2s ease'
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = '',
    totalRecords,
    recordsPerPage,
    showInfo = false
}: PaginationProps) {

    // 统一的按钮样式
    const getButtonStyle = (isActive = false, isDisabled = false) => ({
        fontFamily: PAGINATION_STYLES.fontFamily,
        fontSize: PAGINATION_STYLES.fontSize,
        fontWeight: isActive ? '600' : PAGINATION_STYLES.fontWeight,
        border: `1px solid ${isActive ? PAGINATION_STYLES.colors.activeBorder : PAGINATION_STYLES.colors.border}`,
        borderRadius: PAGINATION_STYLES.spacing.borderRadius,
        background: isActive ? PAGINATION_STYLES.colors.activeBg : 'transparent',
        color: isDisabled ? PAGINATION_STYLES.colors.disabled : PAGINATION_STYLES.colors.primary,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: PAGINATION_STYLES.transition,
        whiteSpace: 'nowrap' as const,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: PAGINATION_STYLES.spacing.padding
    })

    // 智能页码生成算法
    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = []

        if (totalPages <= 5) {
            // 5页以内，显示所有页码
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // 大于5页，使用省略号算法
            if (currentPage <= 3) {
                // 当前页靠近开头
                pages.push(1, 2, 3, 4, 'ellipsis', totalPages)
            } else if (currentPage >= totalPages - 2) {
                // 当前页靠近结尾
                pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                // 当前页在中间
                pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages)
            }
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div
            className={className}
            style={{
                display: 'flex',
                justifyContent: showInfo ? 'space-between' : 'center',
                alignItems: 'center',
                gap: '16px',
                fontFamily: PAGINATION_STYLES.fontFamily,
                fontSize: PAGINATION_STYLES.fontSize,
                fontWeight: PAGINATION_STYLES.fontWeight,
                flexWrap: 'nowrap'
            }}
        >
            {/* 可选的记录信息显示 */}
            {showInfo && totalRecords && recordsPerPage && (
                <span style={{
                    color: PAGINATION_STYLES.colors.muted,
                    fontSize: PAGINATION_STYLES.fontSize,
                    lineHeight: '20px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                }}>
                    共 {totalRecords} 条记录
                </span>
            )}

            {/* 分页导航 */}
            <nav style={{
                display: 'flex',
                gap: PAGINATION_STYLES.spacing.gap,
                alignItems: 'center',
                flexShrink: 0
            }}>
                {/* 上一页箭头 */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        ...getButtonStyle(false, currentPage === 1),
                        width: '32px',
                        height: '32px',
                        padding: '0'
                    }}
                    title="上一页"
                >
                    <Icon
                        name="arrow-left"
                        size="sm"
                        style={{
                            color: currentPage === 1 ?
                                PAGINATION_STYLES.colors.disabled :
                                PAGINATION_STYLES.colors.primary
                        }}
                    />
                </button>

                {/* 页码按钮和省略号 */}
                {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                style={{
                                    color: PAGINATION_STYLES.colors.muted,
                                    fontSize: PAGINATION_STYLES.fontSize,
                                    padding: '0 4px',
                                    userSelect: 'none'
                                }}
                            >
                                ...
                            </span>
                        )
                    }

                    const isActive = page === currentPage

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            style={{
                                ...getButtonStyle(isActive),
                                width: '32px',
                                height: '32px',
                                padding: '0'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = PAGINATION_STYLES.colors.hoverBg
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = 'transparent'
                                }
                            }}
                        >
                            {page}
                        </button>
                    )
                })}

                {/* 下一页箭头 */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                        ...getButtonStyle(false, currentPage === totalPages),
                        width: '32px',
                        height: '32px',
                        padding: '0'
                    }}
                    title="下一页"
                >
                    <Icon
                        name="arrow-right"
                        size="sm"
                        style={{
                            color: currentPage === totalPages ?
                                PAGINATION_STYLES.colors.disabled :
                                PAGINATION_STYLES.colors.primary
                        }}
                    />
                </button>
            </nav>
        </div>
    )
} 