/**
 * 搜索分析Hook
 * 
 * 提供搜索相关的统计分析功能
 * 包含搜索历史、热门搜索、搜索趋势等
 */

import { useState, useEffect, useCallback } from 'react'
import { getSearchStats, SearchHistoryManager } from '@/lib/meilisearch'

// 搜索统计数据类型
export interface SearchAnalytics {
    // 搜索引擎统计
    totalDocuments: number
    isIndexing: boolean
    lastUpdate: string

    // 搜索历史统计
    totalSearches: number
    uniqueQueries: number
    averageQueryLength: number

    // 热门搜索
    popularQueries: Array<{
        query: string
        count: number
        percentage: number
    }>

    // 搜索趋势（最近7天）
    searchTrends: Array<{
        date: string
        count: number
        uniqueQueries: number
    }>

    // 搜索结果分析
    resultStats: {
        averageResults: number
        zeroResultQueries: number
        topPerformingQueries: string[]
    }
}

// 搜索建议分析
export interface SearchSuggestionAnalytics {
    // 建议点击率
    suggestionClickRate: number

    // 热门建议
    topSuggestions: Array<{
        text: string
        category: string
        clicks: number
    }>

    // 建议类型分布
    suggestionTypeDistribution: {
        history: number
        suggestions: number
        popular: number
    }
}

interface UseSearchAnalyticsReturn {
    // 数据状态
    analytics: SearchAnalytics | null
    suggestionAnalytics: SearchSuggestionAnalytics | null
    isLoading: boolean
    error: string | null

    // 操作函数
    refreshAnalytics: () => Promise<void>
    recordSearch: (query: string, resultCount: number) => void
    recordSuggestionClick: (suggestion: string, type: string) => void
    clearAnalytics: () => void

    // 便捷访问器
    getPopularSearches: (limit?: number) => Array<{ query: string, count: number }>
    getSearchHistory: (limit?: number) => Array<{ query: string, timestamp: string }>
    getSearchTrend: (days?: number) => Array<{ date: string, count: number }>
}

/**
 * 搜索分析Hook
 */
export function useSearchAnalytics(): UseSearchAnalyticsReturn {
    const [analytics, setAnalytics] = useState<SearchAnalytics | null>(null)
    const [suggestionAnalytics, setSuggestionAnalytics] = useState<SearchSuggestionAnalytics | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // 本地存储键名
    const SEARCH_STATS_KEY = 'search-analytics'
    const SUGGESTION_STATS_KEY = 'suggestion-analytics'

    /**
     * 从本地存储获取搜索统计
     */
    const getLocalSearchStats = useCallback(() => {
        try {
            const saved = localStorage.getItem(SEARCH_STATS_KEY)
            if (saved) {
                return JSON.parse(saved)
            }
        } catch (error) {
            console.warn('读取本地搜索统计失败:', error)
        }
        return {
            totalSearches: 0,
            queries: [],
            dailyStats: []
        }
    }, [])

    /**
     * 保存搜索统计到本地存储
     */
    const saveLocalSearchStats = useCallback((stats: any) => {
        try {
            localStorage.setItem(SEARCH_STATS_KEY, JSON.stringify(stats))
        } catch (error) {
            console.warn('保存搜索统计失败:', error)
        }
    }, [])

    /**
     * 分析搜索历史数据
     */
    const analyzeSearchHistory = useCallback(() => {
        const history = SearchHistoryManager.getHistory()
        const localStats = getLocalSearchStats()

        if (history.length === 0) {
            return {
                totalSearches: 0,
                uniqueQueries: 0,
                averageQueryLength: 0,
                popularQueries: [],
                searchTrends: [],
                resultStats: {
                    averageResults: 0,
                    zeroResultQueries: 0,
                    topPerformingQueries: []
                }
            }
        }

        // 统计唯一查询
        const queryMap = new Map<string, number>()
        let totalLength = 0

        history.forEach(item => {
            const count = queryMap.get(item.query) || 0
            queryMap.set(item.query, count + item.count)
            totalLength += item.query.length
        })

        // 计算热门查询
        const popularQueries = Array.from(queryMap.entries())
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([query, count]) => ({
                query,
                count,
                percentage: (count / history.length) * 100
            }))

        // 计算搜索趋势（最近7天）
        const now = new Date()
        const searchTrends = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(now)
            date.setDate(date.getDate() - i)
            const dateStr = date.toISOString().split('T')[0]

            const daySearches = history.filter(item =>
                item.timestamp.startsWith(dateStr)
            )

            return {
                date: dateStr,
                count: daySearches.length,
                uniqueQueries: new Set(daySearches.map(item => item.query)).size
            }
        }).reverse()

        return {
            totalSearches: history.length,
            uniqueQueries: queryMap.size,
            averageQueryLength: totalLength / history.length,
            popularQueries,
            searchTrends,
            resultStats: {
                averageResults: localStats.averageResults || 0,
                zeroResultQueries: localStats.zeroResultQueries || 0,
                topPerformingQueries: localStats.topPerformingQueries || []
            }
        }
    }, [getLocalSearchStats])

    /**
     * 分析搜索建议数据
     */
    const analyzeSuggestionData = useCallback(() => {
        try {
            const saved = localStorage.getItem(SUGGESTION_STATS_KEY)
            if (saved) {
                const data = JSON.parse(saved)
                return {
                    suggestionClickRate: data.suggestionClickRate || 0,
                    topSuggestions: data.topSuggestions || [],
                    suggestionTypeDistribution: data.suggestionTypeDistribution || {
                        history: 0,
                        suggestions: 0,
                        popular: 0
                    }
                }
            }
        } catch (error) {
            console.warn('读取建议统计失败:', error)
        }

        return {
            suggestionClickRate: 0,
            topSuggestions: [],
            suggestionTypeDistribution: {
                history: 0,
                suggestions: 0,
                popular: 0
            }
        }
    }, [])

    /**
     * 刷新分析数据
     */
    const refreshAnalytics = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            // 获取MeiliSearch统计
            const searchStats = await getSearchStats()

            // 分析本地搜索历史
            const historyAnalysis = analyzeSearchHistory()

            // 合并数据
            const combinedAnalytics: SearchAnalytics = {
                // MeiliSearch统计
                totalDocuments: searchStats.totalDocuments,
                isIndexing: searchStats.isIndexing,
                lastUpdate: searchStats.lastUpdate,

                // 本地搜索统计
                ...historyAnalysis
            }

            // 建议统计
            const suggestionStats = analyzeSuggestionData()

            setAnalytics(combinedAnalytics)
            setSuggestionAnalytics(suggestionStats)

        } catch (error) {
            console.error('刷新搜索分析失败:', error)
            setError(error instanceof Error ? error.message : '获取分析数据失败')

            // 降级：只使用本地数据
            const historyAnalysis = analyzeSearchHistory()
            const suggestionStats = analyzeSuggestionData()

            setAnalytics({
                totalDocuments: 0,
                isIndexing: false,
                lastUpdate: new Date().toISOString(),
                ...historyAnalysis
            })
            setSuggestionAnalytics(suggestionStats)

        } finally {
            setIsLoading(false)
        }
    }, [analyzeSearchHistory, analyzeSuggestionData])

    /**
     * 记录搜索操作
     */
    const recordSearch = useCallback((query: string, resultCount: number) => {
        try {
            const stats = getLocalSearchStats()

            // 更新统计
            stats.totalSearches = (stats.totalSearches || 0) + 1
            stats.queries = stats.queries || []
            stats.queries.push({
                query,
                resultCount,
                timestamp: new Date().toISOString()
            })

            // 保持最近100次搜索记录
            if (stats.queries.length > 100) {
                stats.queries = stats.queries.slice(-100)
            }

            // 更新结果统计
            const allResults = stats.queries.map(q => q.resultCount || 0)
            stats.averageResults = allResults.reduce((a, b) => a + b, 0) / allResults.length
            stats.zeroResultQueries = allResults.filter(r => r === 0).length

            saveLocalSearchStats(stats)

        } catch (error) {
            console.warn('记录搜索统计失败:', error)
        }
    }, [getLocalSearchStats, saveLocalSearchStats])

    /**
     * 记录建议点击
     */
    const recordSuggestionClick = useCallback((suggestion: string, type: string) => {
        try {
            const saved = localStorage.getItem(SUGGESTION_STATS_KEY)
            const stats = saved ? JSON.parse(saved) : {
                totalSuggestionShows: 0,
                totalSuggestionClicks: 0,
                suggestions: [],
                typeDistribution: { history: 0, suggestions: 0, popular: 0 }
            }

            stats.totalSuggestionClicks += 1
            stats.suggestions = stats.suggestions || []

            // 记录建议点击
            const existing = stats.suggestions.find(s => s.text === suggestion)
            if (existing) {
                existing.clicks += 1
            } else {
                stats.suggestions.push({
                    text: suggestion,
                    category: type,
                    clicks: 1,
                    firstClicked: new Date().toISOString()
                })
            }

            // 更新类型分布
            if (stats.typeDistribution[type]) {
                stats.typeDistribution[type] += 1
            }

            // 计算点击率
            stats.suggestionClickRate = stats.totalSuggestionShows > 0
                ? (stats.totalSuggestionClicks / stats.totalSuggestionShows) * 100
                : 0

            localStorage.setItem(SUGGESTION_STATS_KEY, JSON.stringify(stats))

        } catch (error) {
            console.warn('记录建议点击失败:', error)
        }
    }, [])

    /**
     * 清空分析数据
     */
    const clearAnalytics = useCallback(() => {
        try {
            localStorage.removeItem(SEARCH_STATS_KEY)
            localStorage.removeItem(SUGGESTION_STATS_KEY)
            SearchHistoryManager.clearHistory()

            setAnalytics(null)
            setSuggestionAnalytics(null)
            setError(null)

        } catch (error) {
            console.warn('清空分析数据失败:', error)
        }
    }, [])

    /**
     * 获取热门搜索
     */
    const getPopularSearches = useCallback((limit: number = 5) => {
        const popular = SearchHistoryManager.getPopularSearches(limit)
        return popular.map(item => ({
            query: item.text,
            count: item.count
        }))
    }, [])

    /**
     * 获取搜索历史
     */
    const getSearchHistory = useCallback((limit: number = 10) => {
        const history = SearchHistoryManager.getHistory()
        return history.slice(0, limit).map(item => ({
            query: item.query,
            timestamp: item.timestamp
        }))
    }, [])

    /**
     * 获取搜索趋势
     */
    const getSearchTrend = useCallback((days: number = 7) => {
        const history = SearchHistoryManager.getHistory()
        const now = new Date()

        return Array.from({ length: days }, (_, i) => {
            const date = new Date(now)
            date.setDate(date.getDate() - i)
            const dateStr = date.toISOString().split('T')[0]

            const daySearches = history.filter(item =>
                item.timestamp.startsWith(dateStr)
            )

            return {
                date: dateStr,
                count: daySearches.length
            }
        }).reverse()
    }, [])

    // 初始化时加载数据
    useEffect(() => {
        refreshAnalytics()
    }, [refreshAnalytics])

    return {
        // 数据状态
        analytics,
        suggestionAnalytics,
        isLoading,
        error,

        // 操作函数
        refreshAnalytics,
        recordSearch,
        recordSuggestionClick,
        clearAnalytics,

        // 便捷访问器
        getPopularSearches,
        getSearchHistory,
        getSearchTrend
    }
}

// 全局搜索分析实例（可选）
let globalSearchAnalytics: ReturnType<typeof useSearchAnalytics> | null = null

export const getGlobalSearchAnalytics = () => {
    return globalSearchAnalytics
}

export const setGlobalSearchAnalytics = (analytics: ReturnType<typeof useSearchAnalytics>) => {
    globalSearchAnalytics = analytics
}