'use client'

import { Pagination } from '@/components/ui'

interface BookmarksPaginationProps {
    currentPage?: number
    totalPages?: number
    onPageChange?: (page: number) => void
}

/**
 * BookmarksPagination 组件
 * 
 * 收藏页面的分页导航 - 使用统一的Pagination组件compact模式
 */
export function BookmarksPagination({
    currentPage = 1,
    totalPages = 3,
    onPageChange
}: BookmarksPaginationProps) {

    const handlePageChange = (page: number) => {
        if (onPageChange) {
            onPageChange(page)
        }
    }

    return (
        <div style={{
            marginTop: '16px',
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
} 