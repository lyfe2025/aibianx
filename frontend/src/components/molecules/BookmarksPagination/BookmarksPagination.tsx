'use client'

import { BOOKMARKS_STYLES } from '@/constants/bookmarksConfig'

interface BookmarksPaginationProps {
    currentPage?: number
    totalPages?: number
    onPageChange?: (page: number) => void
}

/**
 * BookmarksPagination 组件
 * 
 * 收藏页面的分页导航
 */
export function BookmarksPagination({
    currentPage = 1,
    totalPages = 3,
    onPageChange
}: BookmarksPaginationProps) {

    const handlePageClick = (page: number) => {
        if (onPageChange && page !== currentPage) {
            onPageChange(page)
        }
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageClick(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageClick(currentPage + 1)
        }
    }

    return (
        <div style={{
            gap: '8px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '16px',
            marginBottom: '32px'
        }}>
            {/* 上一页按钮 */}
            <div
                onClick={handlePrevious}
                style={{
                    ...BOOKMARKS_STYLES.paginationButton,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
                    opacity: currentPage > 1 ? 1 : 0.5
                }}>
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-lg)',
                    lineHeight: '24px'
                }}>&lt;</span>
            </div>

            {/* 页码按钮 */}
            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1
                const isActive = page === currentPage

                return (
                    <div
                        key={page}
                        onClick={() => handlePageClick(page)}
                        style={{
                            background: isActive
                                ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)'
                                : BOOKMARKS_STYLES.paginationButton.background,
                            border: isActive ? 'none' : BOOKMARKS_STYLES.paginationButton.border,
                            borderRadius: BOOKMARKS_STYLES.paginationButton.borderRadius,
                            width: BOOKMARKS_STYLES.paginationButton.width,
                            height: BOOKMARKS_STYLES.paginationButton.height,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}>
                        <span style={{
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-lg)',
                            lineHeight: '24px',
                            fontWeight: isActive ? '600' : 'normal'
                        }}>{page}</span>
                    </div>
                )
            })}

            {/* 下一页按钮 */}
            <div
                onClick={handleNext}
                style={{
                    ...BOOKMARKS_STYLES.paginationButton,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: currentPage < totalPages ? 'pointer' : 'not-allowed',
                    opacity: currentPage < totalPages ? 1 : 0.5
                }}>
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-lg)',
                    lineHeight: '24px'
                }}>&gt;</span>
            </div>
        </div>
    )
} 