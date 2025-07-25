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
    showFirstLast = false, // 默认不显示首页末页按钮，符合设计稿
    className = ''
}: PaginationProps) {
    const generatePageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 7 // 最多显示7个元素（包括省略号）

        if (totalPages <= 5) {
            // 5页以内全部显示
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // 复杂分页逻辑，提供最佳用户体验
            if (currentPage <= 3) {
                // 当前页在前面：1 2 3 4 ... 20
                pages.push(1, 2, 3, 4, '...', totalPages)
            } else if (currentPage >= totalPages - 2) {
                // 当前页在后面：1 ... 17 18 19 20
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                // 当前页在中间：1 ... 8 9 10 ... 20
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
            }
        }

        return pages
    }

    const pageNumbers = generatePageNumbers()

    if (totalPages <= 1) return null

    return (
        <nav
            className={className}
            style={{
                display: 'flex',
                gap: '16px', // 按设计稿使用16px间距
                alignItems: 'stretch', // 确保元素高度一致
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                fontSize: '16px',
                fontWeight: '400'
            }}
        >
            {/* 左箭头按钮 */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    width: '24px',
                    height: '24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '8px', // 垂直居中对齐
                    marginBottom: '8px',
                    opacity: currentPage === 1 ? 0.3 : 1,
                    transition: 'opacity 0.2s ease'
                }}
                title="上一页"
                aria-label="上一页"
            >
                <Icon
                    name="arrow-left"
                    size="md"
                    style={{
                        width: '24px',
                        height: '24px',
                        filter: 'brightness(0) saturate(100%) invert(75%) sepia(8%) saturate(345%) hue-rotate(183deg) brightness(95%) contrast(92%)', // 灰色
                        transition: 'filter 0.2s ease'
                    }}
                />
            </button>

            {/* 页码按钮和省略号 */}
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '16px',
                                fontWeight: '400',
                                lineHeight: '40px', // 与按钮高度对齐
                                padding: '0 8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif"
                            }}
                        >
                            ...
                        </span>
                    )
                }

                const isActive = currentPage === page

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page as number)}
                        style={{
                            background: isActive
                                ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.20) 0%, rgba(139, 92, 246, 0.20) 100%)'
                                : 'transparent',
                            border: isActive
                                ? '1px solid rgba(59, 130, 246, 0.30)'
                                : 'none',
                            borderRadius: '8px',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: '15px',
                            paddingRight: '15px',
                            paddingTop: '9px',
                            paddingBottom: '9px',
                            color: isActive ? '#FFFFFF' : '#9CA3AF',
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: '22px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif"
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.color = '#D1D5DB'
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.color = '#9CA3AF'
                                e.currentTarget.style.background = 'transparent'
                            }
                        }}
                    >
                        {page}
                    </button>
                )
            })}

            {/* 右箭头按钮 */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                    width: '24px',
                    height: '24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '8px', // 垂直居中对齐
                    marginBottom: '8px',
                    opacity: currentPage === totalPages ? 0.3 : 1,
                    transition: 'opacity 0.2s ease'
                }}
                title="下一页"
                aria-label="下一页"
            >
                <Icon
                    name="arrow-right"
                    size="md"
                    style={{
                        width: '24px',
                        height: '24px',
                        filter: 'brightness(0) saturate(100%) invert(75%) sepia(8%) saturate(345%) hue-rotate(183deg) brightness(95%) contrast(92%)', // 灰色
                        transition: 'filter 0.2s ease'
                    }}
                />
            </button>
        </nav>
    )
} 