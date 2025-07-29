/**
 * useWeeklyLogicWithAPI Hook
 * 
 * 封装Weekly页面的状态管理和业务逻辑（API版本）
 * 包含搜索、筛选、分页等功能，使用真实Strapi API
 */

import { useState, useMemo, useEffect, useCallback } from 'react'
import { getArticles, checkStrapiConnection } from '@/lib/strapi'
import { scrollToTop } from '@/lib/weeklyUtils'
import { PAGE_CONFIG } from '@/constants/weeklyConfig'
import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

interface UseWeeklyLogicReturn {
    // 状态
    searchQuery: string
    activeFilter: string
    currentPage: number
    isSearching: boolean
    isLoading: boolean
    connectionError: boolean

    // 数据
    articles: ArticleCardData[]
    totalPages: number
    hasResults: boolean
    totalCount: number

    // 操作函数
    handleSearch: (query: string) => void
    handleFilterChange: (filterId: string) => void
    handlePageChange: (page: number) => void
    resetToDefaults: () => void
    clearSearch: () => void
    refetch: () => void
}

/**
 * Weekly页面逻辑Hook (API版本)
 */
export function useWeeklyLogicWithAPI(): UseWeeklyLogicReturn {
    // 状态管理
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('latest')
    const [currentPage, setCurrentPage] = useState(1)
    const [isSearching, setIsSearching] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [connectionError, setConnectionError] = useState(false)
    const [articles, setArticles] = useState<ArticleCardData[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    // 获取文章数据
    const fetchArticles = useCallback(async (
        search?: string,
        filter?: string,
        page?: number
    ) => {
        try {
            setIsLoading(true)
            setConnectionError(false)

            // 检查Strapi连接
            const isConnected = await checkStrapiConnection()
            if (!isConnected) {
                setConnectionError(true)
                setIsLoading(false)
                return
            }

            // 准备API参数
            const apiParams: any = {
                page: page || currentPage,
                pageSize: PAGE_CONFIG.itemsPerPage,
            }

            // 搜索参数
            if (search && search.trim()) {
                apiParams.search = search.trim()
            }

            // 筛选参数
            if (filter && filter !== 'latest') {
                switch (filter) {
                    case 'featured':
                        apiParams.featured = true
                        break
                    case 'ai-tools':
                        apiParams.tag = 'AI工具'
                        break
                    case 'monetization':
                        apiParams.tag = '变现指南'
                        break
                    case 'case-study':
                        apiParams.tag = '案例分析'
                        break
                    // 更多筛选条件可以在这里添加
                }
            }

            // 调用API
            const result = await getArticles(apiParams)

            setArticles(result.articles)
            setTotalPages(result.pagination.pageCount)
            setTotalCount(result.pagination.total)

        } catch (error) {
            console.error('获取文章失败:', error)
            setConnectionError(true)
            setArticles([])
            setTotalPages(1)
            setTotalCount(0)
        } finally {
            setIsLoading(false)
        }
    }, [currentPage])

    // 初始数据加载
    useEffect(() => {
        fetchArticles(searchQuery, activeFilter, currentPage)
    }, [])

    // 当搜索、筛选或分页变化时重新获取数据
    useEffect(() => {
        fetchArticles(searchQuery, activeFilter, currentPage)
    }, [searchQuery, activeFilter, currentPage, fetchArticles])

    // 是否有结果
    const hasResults = useMemo(() => {
        return articles.length > 0 && !connectionError
    }, [articles.length, connectionError])

    // 搜索处理
    const handleSearch = useCallback((query: string) => {
        setIsSearching(true)
        setSearchQuery(query)
        setCurrentPage(1) // 重置分页

        // 模拟搜索延迟（为了更好的用户体验）
        setTimeout(() => {
            setIsSearching(false)
        }, PAGE_CONFIG.searchDelay)
    }, [])

    // 筛选处理
    const handleFilterChange = useCallback((filterId: string) => {
        setActiveFilter(filterId)
        setCurrentPage(1) // 重置分页
    }, [])

    // 分页处理
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page)
        scrollToTop() // 滚动到顶部
    }, [])

    // 重置到默认状态
    const resetToDefaults = useCallback(() => {
        setSearchQuery('')
        setActiveFilter('latest')
        setCurrentPage(1)
        setIsSearching(false)
    }, [])

    // 清空搜索
    const clearSearch = useCallback(() => {
        handleSearch('')
    }, [handleSearch])

    // 重新获取数据
    const refetch = useCallback(() => {
        fetchArticles(searchQuery, activeFilter, currentPage)
    }, [fetchArticles, searchQuery, activeFilter, currentPage])

    return {
        // 状态
        searchQuery,
        activeFilter,
        currentPage,
        isSearching,
        isLoading,
        connectionError,

        // 数据
        articles,
        totalPages,
        hasResults,
        totalCount,

        // 操作函数
        handleSearch,
        handleFilterChange,
        handlePageChange,
        resetToDefaults,
        clearSearch,
        refetch
    }
} 