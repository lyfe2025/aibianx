/**
 * useWeeklyLogic Hook
 * 
 * 封装Weekly页面的状态管理和业务逻辑
 * 包含搜索、筛选、分页等功能
 */

import { useState, useMemo } from 'react'
import { filterAndSearchArticles, paginateArticles, scrollToTop } from '@/lib/weeklyUtils'
import { MOCK_ARTICLES, PAGE_CONFIG } from '@/constants/weeklyConfig'
import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

interface UseWeeklyLogicReturn {
    // 状态
    searchQuery: string
    activeFilter: string
    currentPage: number
    isSearching: boolean

    // 数据
    filteredArticles: ArticleCardData[]
    paginatedArticles: ArticleCardData[]
    totalPages: number
    hasResults: boolean

    // 操作函数
    handleSearch: (query: string) => void
    handleFilterChange: (filterId: string) => void
    handlePageChange: (page: number) => void
    resetToDefaults: () => void
    clearSearch: () => void
}

/**
 * Weekly页面逻辑Hook
 */
export function useWeeklyLogic(): UseWeeklyLogicReturn {
    // 状态管理
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('latest')
    const [currentPage, setCurrentPage] = useState(1)
    const [isSearching, setIsSearching] = useState(false)

    // 筛选后的文章
    const filteredArticles = useMemo(() => {
        return filterAndSearchArticles(MOCK_ARTICLES, searchQuery, activeFilter)
    }, [searchQuery, activeFilter])

    // 分页后的文章
    const { paginatedArticles, totalPages } = useMemo(() => {
        return paginateArticles(filteredArticles, currentPage, PAGE_CONFIG.itemsPerPage)
    }, [filteredArticles, currentPage])

    // 是否有结果
    const hasResults = filteredArticles.length > 0

    // 搜索处理
    const handleSearch = (query: string) => {
        setIsSearching(true)
        setSearchQuery(query)
        setCurrentPage(1) // 重置分页

        // 模拟搜索延迟
        setTimeout(() => {
            setIsSearching(false)
        }, PAGE_CONFIG.searchDelay)
    }

    // 筛选处理
    const handleFilterChange = (filterId: string) => {
        setActiveFilter(filterId)
        setCurrentPage(1) // 重置分页
    }

    // 分页处理
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        scrollToTop() // 滚动到顶部
    }

    // 重置到默认状态
    const resetToDefaults = () => {
        setSearchQuery('')
        setActiveFilter('latest')
        setCurrentPage(1)
        setIsSearching(false)
    }

    // 清空搜索
    const clearSearch = () => {
        handleSearch('')
    }

    return {
        // 状态
        searchQuery,
        activeFilter,
        currentPage,
        isSearching,

        // 数据
        filteredArticles,
        paginatedArticles,
        totalPages,
        hasResults,

        // 操作函数
        handleSearch,
        handleFilterChange,
        handlePageChange,
        resetToDefaults,
        clearSearch
    }
} 