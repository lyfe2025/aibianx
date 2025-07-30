/**
 * MeiliSearch 前端API客户端
 * 
 * 提供与后端MeiliSearch服务交互的统一接口
 * 包括搜索、建议、统计等功能
 */

// MeiliSearch搜索结果类型定义
export interface MeiliSearchArticle {
    id: number
    documentId: string
    title: string
    slug: string
    excerpt: string | null
    featuredImage?: {
        id: number
        documentId: string
        name: string
        url: string
        width: number
        height: number
        alternativeText?: string | null
    } | null
    author?: {
        id: number
        documentId: string
        name: string
        slug: string
        avatar?: {
            url: string
            alternativeText?: string | null
        } | null
    } | null
    category?: {
        id: number
        documentId: string
        name: string
        slug: string
    } | null
    tags?: Array<{
        id: number
        documentId: string
        name: string
        slug: string
    }>
    publishedAt: string
    viewCount: number
    readingTime: number
    featured: boolean
    // MeiliSearch特有的高亮字段
    _formatted?: {
        title?: string
        excerpt?: string
        content?: string
    }
}

// 搜索建议类型
export interface MeiliSearchSuggestion {
    id: string
    text: string
    type: 'article' | 'author' | 'category' | 'tag'
    category?: string
    metadata?: {
        slug?: string
        count?: number
        icon?: string
    }
}

// 搜索参数接口
export interface SearchParams {
    query?: string
    page?: number
    pageSize?: number
    category?: string
    tags?: string | string[]
    author?: string
    featured?: boolean
    sortBy?: 'relevance' | 'publishedAt' | 'viewCount'
    sortOrder?: 'asc' | 'desc'
    highlight?: boolean
    facets?: boolean
}

// 搜索响应接口
export interface SearchResponse {
    articles: MeiliSearchArticle[]
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
    meta: {
        query: string
        processingTimeMs: number
        facetDistribution?: Record<string, Record<string, number>>
    }
}

// 搜索建议响应接口
export interface SuggestionsResponse {
    suggestions: MeiliSearchSuggestion[]
    meta: {
        query: string
        total: number
    }
}

// 搜索统计响应接口
export interface SearchStatsResponse {
    totalDocuments: number
    isIndexing: boolean
    fieldDistribution: Record<string, number>
    lastUpdate: string
}

// API配置
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

/**
 * MeiliSearch API客户端类
 */
class MeiliSearchClient {
    private baseUrl: string

    constructor() {
        this.baseUrl = `${STRAPI_URL}/api/search`
    }

    /**
     * 执行HTTP请求的通用方法
     */
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            })

            if (!response.ok) {
                throw new Error(`MeiliSearch API请求失败: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()

            if (data.error) {
                throw new Error(data.error.message || 'MeiliSearch API错误')
            }

            return data
        } catch (error) {
            console.error('MeiliSearch API请求错误:', error)
            throw error
        }
    }

    /**
     * 文章搜索
     */
    async searchArticles(params: SearchParams = {}): Promise<SearchResponse> {
        const searchParams = new URLSearchParams()

        // 构建查询参数
        if (params.query) searchParams.append('q', params.query)
        if (params.page) searchParams.append('page', params.page.toString())
        if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString())
        if (params.category) searchParams.append('category', params.category)
        if (params.author) searchParams.append('author', params.author)
        if (params.featured !== undefined) searchParams.append('featured', params.featured.toString())
        if (params.sortBy) searchParams.append('sortBy', params.sortBy)
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder)
        if (params.highlight !== undefined) searchParams.append('highlight', params.highlight.toString())
        if (params.facets !== undefined) searchParams.append('facets', params.facets.toString())

        // 处理标签参数（支持数组）
        if (params.tags) {
            const tagsArray = Array.isArray(params.tags) ? params.tags : [params.tags]
            tagsArray.forEach(tag => searchParams.append('tags', tag))
        }

        const endpoint = `/articles?${searchParams.toString()}`
        const response = await this.request<{
            data: MeiliSearchArticle[]
            meta: {
                pagination: {
                    page: number
                    pageSize: number
                    pageCount: number
                    total: number
                }
                search: {
                    query: string
                    processingTimeMs: number
                    facetDistribution?: Record<string, Record<string, number>>
                }
            }
        }>(endpoint)

        return {
            articles: response.data,
            pagination: response.meta.pagination,
            meta: response.meta.search
        }
    }

    /**
     * 获取搜索建议
     */
    async getSuggestions(query: string, limit: number = 5): Promise<SuggestionsResponse> {
        if (!query.trim()) {
            return {
                suggestions: [],
                meta: { query: '', total: 0 }
            }
        }

        const searchParams = new URLSearchParams({
            q: query.trim(),
            limit: limit.toString()
        })

        const endpoint = `/suggestions?${searchParams.toString()}`
        const response = await this.request<{
            data: any[]
            meta: {
                query: string
                total: number
            }
        }>(endpoint)

        // 转换后端响应为前端格式
        const suggestions: MeiliSearchSuggestion[] = response.data.map((item, index) => ({
            id: `suggestion-${index}`,
            text: item.title || item.name || item.text,
            type: item.type || 'article',
            category: item.category?.name,
            metadata: {
                slug: item.slug,
                count: item.count
            }
        }))

        return {
            suggestions,
            meta: response.meta
        }
    }

    /**
     * 获取搜索统计信息
     */
    async getSearchStats(): Promise<SearchStatsResponse> {
        const endpoint = '/stats'
        const response = await this.request<{
            data: SearchStatsResponse
            meta: {
                timestamp: string
            }
        }>(endpoint)

        return response.data
    }

    /**
     * 检查搜索服务健康状态
     */
    async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy', message?: string }> {
        try {
            const endpoint = '/health'
            const response = await this.request<{
                data: {
                    status: 'healthy' | 'unhealthy'
                    message?: string
                }
            }>(endpoint)

            return response.data
        } catch (error) {
            return {
                status: 'unhealthy',
                message: error instanceof Error ? error.message : '搜索服务不可用'
            }
        }
    }

    /**
     * 重建搜索索引
     */
    async reindexArticles(): Promise<{ message: string, syncedArticles: number }> {
        const endpoint = '/reindex'
        const response = await this.request<{
            data: {
                message: string
                syncedArticles: number
            }
        }>(endpoint, { method: 'POST' })

        return response.data
    }
}

// 创建单例实例
const meilisearchClient = new MeiliSearchClient()

// 导出便捷函数
export const searchArticles = (params?: SearchParams) => meilisearchClient.searchArticles(params)
export const getSuggestions = (query: string, limit?: number) => meilisearchClient.getSuggestions(query, limit)
export const getSearchStats = () => meilisearchClient.getSearchStats()
export const checkSearchHealth = () => meilisearchClient.healthCheck()
export const reindexArticles = () => meilisearchClient.reindexArticles()

// 导出客户端实例（用于更复杂的用法）
export default meilisearchClient

// 搜索历史管理
export class SearchHistoryManager {
    private static readonly STORAGE_KEY = 'meilisearch-history'
    private static readonly MAX_HISTORY = 10

    /**
     * 添加搜索记录到历史
     */
    static addToHistory(query: string): void {
        if (!query.trim()) return

        try {
            const history = this.getHistory()

            // 移除重复项
            const filteredHistory = history.filter(item => item.query !== query.trim())

            // 添加新记录到顶部
            const newHistory = [
                {
                    id: `history-${Date.now()}`,
                    query: query.trim(),
                    timestamp: new Date().toISOString(),
                    count: 1
                },
                ...filteredHistory
            ].slice(0, this.MAX_HISTORY)

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newHistory))
        } catch (error) {
            console.warn('保存搜索历史失败:', error)
        }
    }

    /**
     * 获取搜索历史
     */
    static getHistory(): Array<{
        id: string
        query: string
        timestamp: string
        count: number
    }> {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY)
            return saved ? JSON.parse(saved) : []
        } catch (error) {
            console.warn('读取搜索历史失败:', error)
            return []
        }
    }

    /**
     * 清空搜索历史
     */
    static clearHistory(): void {
        try {
            localStorage.removeItem(this.STORAGE_KEY)
        } catch (error) {
            console.warn('清空搜索历史失败:', error)
        }
    }

    /**
     * 获取热门搜索词（基于历史记录）
     */
    static getPopularSearches(limit: number = 6): Array<{
        id: string
        text: string
        count: number
    }> {
        const history = this.getHistory()

        // 统计搜索频次
        const searchCounts = new Map<string, number>()
        history.forEach(item => {
            const current = searchCounts.get(item.query) || 0
            searchCounts.set(item.query, current + item.count)
        })

        // 排序并转换格式
        return Array.from(searchCounts.entries())
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit)
            .map(([query, count], index) => ({
                id: `popular-${index}`,
                text: query,
                count
            }))
    }
}