/**
 * useWeeklyLogicWithAPI Hook
 * 
 * 封装Weekly页面的状态管理和业务逻辑（API版本）
 * 包含搜索、筛选、分页等功能，使用真实Strapi API
 */

import { useState, useMemo, useEffect, useCallback } from 'react'
import { getArticles, checkStrapiConnection } from '@/lib/strapi'
import { searchArticles, checkSearchHealth, SearchHistoryManager } from '@/lib/meilisearch'
import type { MeiliSearchArticle } from '@/lib/meilisearch'
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
    searchMode: 'strapi' | 'meilisearch'

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
    const [searchMode, setSearchMode] = useState<'strapi' | 'meilisearch'>('strapi')

    // 转换MeiliSearch文章为组件所需格式
    const transformMeiliSearchArticle = (article: MeiliSearchArticle): ArticleCardData => {
        // 格式化日期函数
        const formatDate = (dateString: string): string => {
            try {
                const date = new Date(dateString)
                if (isNaN(date.getTime())) {
                    return '日期未知'
                }
                return date.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })
            } catch {
                return '日期未知'
            }
        }

        return {
            id: article.documentId,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt || '',
            coverImage: article.featuredImage?.url
                ? `http://localhost:1337${article.featuredImage.url}`
                : undefined,
            author: {
                name: article.author?.name || '匿名作者',
                avatar: article.author?.avatar?.url
                    ? `http://localhost:1337${article.author.avatar.url}`
                    : undefined
            },
            // 修复：使用正确的字段名和格式
            publishedAt: formatDate(article.publishedAt),
            readingTime: `${article.readingTime}分钟`,
            viewCount: String(article.viewCount),
            // 修复：标签应该是字符串数组，不是对象数组
            tags: article.tags?.map(tag => tag.name) || [],
            isPremium: article.featured || false,
            // 可选字段
            content: undefined,
            likeCount: '0'
        }
    }

    // 获取文章数据（智能选择搜索引擎）
    const fetchArticles = useCallback(async (
        search?: string,
        filter?: string,
        page?: number
    ) => {
        try {
            setIsLoading(true)
            setConnectionError(false)

            const hasSearchQuery = search && search.trim()

            // 智能选择搜索引擎：有搜索词时优先使用MeiliSearch
            let useSearch = false
            if (hasSearchQuery) {
                try {
                    console.log('🔍 检查MeiliSearch健康状态...')
                    const searchHealth = await checkSearchHealth()
                    console.log('🔍 健康检查结果:', searchHealth)

                    if (searchHealth.status === 'healthy') {
                        useSearch = true
                        setSearchMode('meilisearch')
                        console.log('✅ 使用MeiliSearch搜索引擎')
                    } else {
                        console.warn('⚠️ MeiliSearch不可用，降级到Strapi搜索:', searchHealth.message)
                        setSearchMode('strapi')
                    }
                } catch (error) {
                    console.error('❌ MeiliSearch健康检查失败，使用Strapi搜索:', error)
                    setSearchMode('strapi')
                }
            } else {
                setSearchMode('strapi')
            }

            if (useSearch && hasSearchQuery) {
                // 使用MeiliSearch搜索
                console.log('🔍 使用MeiliSearch搜索:', search)

                // 准备MeiliSearch参数
                const searchParams: any = {
                    query: search.trim(),
                    page: page || currentPage,
                    pageSize: PAGE_CONFIG.itemsPerPage,
                    highlight: true,
                    sortBy: 'relevance'
                }

                // 添加筛选条件
                if (filter && filter !== 'latest') {
                    switch (filter) {
                        case 'featured':
                            searchParams.featured = true
                            break
                        case 'ai-tools':
                            searchParams.tags = 'ai-tools'
                            break
                        case 'monetization':
                            searchParams.tags = 'monetization'
                            break
                        case 'case-study':
                            searchParams.tags = 'case-study'
                            break
                    }
                }

                const searchResult = await searchArticles(searchParams)

                // 转换结果
                const transformedArticles = searchResult.articles.map(transformMeiliSearchArticle)

                setArticles(transformedArticles)
                setTotalPages(searchResult.pagination.pageCount)
                setTotalCount(searchResult.pagination.total)

                // 保存搜索历史
                SearchHistoryManager.addToHistory(search.trim())

                console.log(`✅ MeiliSearch搜索完成: ${transformedArticles.length} 篇文章`)

            } else {
                // 使用Strapi原生搜索
                console.log('📝 使用Strapi搜索:', search || '(无搜索词)')

                // 检查Strapi连接
                const isConnected = await checkStrapiConnection()
                if (!isConnected) {
                    setConnectionError(true)
                    setIsLoading(false)
                    return
                }

                // 准备Strapi API参数
                const apiParams: any = {
                    page: page || currentPage,
                    pageSize: PAGE_CONFIG.itemsPerPage,
                }

                // 搜索参数
                if (hasSearchQuery) {
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
                    }
                }

                // 调用Strapi API
                const result = await getArticles(apiParams)

                setArticles(result.articles)
                setTotalPages(result.pagination.pageCount)
                setTotalCount(result.pagination.total)

                console.log(`✅ Strapi搜索完成: ${result.articles.length} 篇文章`)
            }

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
        searchMode,

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