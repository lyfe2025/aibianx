/**
 * useHomeArticles Hook
 * 
 * 封装首页文章列表的API逻辑
 * 支持"最新"、"热门"、"免费"三种分类
 */

import { useState, useEffect, useCallback } from 'react'
import { getArticles, checkStrapiConnection } from '@/lib/strapi'
import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

interface UseHomeArticlesReturn {
    // 状态
    activeFilter: string
    isLoading: boolean
    connectionError: boolean

    // 数据
    articles: ArticleCardData[]
    totalCount: number

    // 操作函数
    handleFilterChange: (filterId: string) => void
    refetch: () => void
}

/**
 * 首页文章逻辑Hook (API版本)
 */
export function useHomeArticles(): UseHomeArticlesReturn {
    // 状态管理
    const [activeFilter, setActiveFilter] = useState('latest')
    const [isLoading, setIsLoading] = useState(true)
    const [connectionError, setConnectionError] = useState(false)
    const [articles, setArticles] = useState<ArticleCardData[]>([])
    const [totalCount, setTotalCount] = useState(0)

    // 获取文章数据
    const fetchArticles = useCallback(async (filter: string) => {
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
                pageSize: 5, // 首页显示5篇文章，让页面更饱满
            }

                        // 根据筛选类型配置参数
            switch (filter) {
                case 'latest':
                    // 最新：按发布时间倒序
                    // getArticles 默认就是按 publishedAt:desc 排序
                    break
                    
                case 'popular':
                    // 热门：按浏览量倒序
                    apiParams.sortBy = 'viewCount'
                    apiParams.sortOrder = 'desc'
                    break
            }

            // 调用API
            console.log('🔍 [useHomeArticles] Calling getArticles with params:', apiParams)
            const result = await getArticles(apiParams)
            console.log('🔍 [useHomeArticles] Raw API result:', result)

            // 🔍 调试：输出获取的文章数据
            if (process.env.NODE_ENV === 'development') {
                console.log('🔍 [useHomeArticles] Fetched articles:', result.articles.length)
                console.log('🔍 [useHomeArticles] Full result object:', result)
                result.articles.forEach((article, index) => {
                    console.log(`🔍 [useHomeArticles] Article ${index + 1}:`, {
                        title: article.title,
                        coverImage: article.coverImage,
                        hasImage: !!article.coverImage,
                        fullArticle: article
                    })
                })
            }

            setArticles(result.articles)
            setTotalCount(result.pagination.total)

        } catch (error) {
            console.error('获取首页文章失败:', error)
            setConnectionError(true)
            setArticles([])
            setTotalCount(0)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // 初始数据加载
    useEffect(() => {
        fetchArticles(activeFilter)
    }, [fetchArticles, activeFilter])

    // 筛选处理
    const handleFilterChange = useCallback((filterId: string) => {
        setActiveFilter(filterId)
    }, [])

    // 重新获取数据
    const refetch = useCallback(() => {
        fetchArticles(activeFilter)
    }, [fetchArticles, activeFilter])

    return {
        // 状态
        activeFilter,
        isLoading,
        connectionError,

        // 数据
        articles,
        totalCount,

        // 操作函数
        handleFilterChange,
        refetch
    }
} 