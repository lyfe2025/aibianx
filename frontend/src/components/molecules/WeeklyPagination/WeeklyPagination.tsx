'use client'

import { Pagination } from '@/components/molecules'
import { STYLES_CONFIG } from '@/constants/weeklyConfig'

interface WeeklyPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

/**
 * WeeklyPagination 组件
 * 
 * 分页组件包装器，优化间距和样式
 */
export function WeeklyPagination({
    currentPage,
    totalPages,
    onPageChange
}: WeeklyPaginationProps) {
    if (totalPages <= 1) {
        return null
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '0px',
            marginBottom: STYLES_CONFIG.spacing.sectionGap
        }}>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showFirstLast={false}
            />
        </div>
    )
} 