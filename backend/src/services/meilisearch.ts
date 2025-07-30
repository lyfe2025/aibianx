/**
 * MeiliSearch 服务类
 * 
 * 提供与MeiliSearch搜索引擎的交互功能
 * 包括索引管理、数据同步、搜索查询等核心功能
 */

import { MeiliSearch, Index, TaskStatus } from 'meilisearch'

interface SearchResult {
    id: string
    documentId: string
    title: string
    slug: string
    excerpt?: string
    author: {
        name: string
        slug: string
    }
    category: {
        name: string
        slug: string
    }
    tags: Array<{
        name: string
        slug: string
    }>
    publishedAt: string
    viewCount: number
    readingTime: number
    featured: boolean
    _formatted?: any
    _snippets?: any
}

interface SearchQuery {
    query: string
    limit?: number
    offset?: number
    filters?: string[]
    sort?: string[]
    highlight?: boolean
    crop?: boolean
    facets?: string[]
}

interface SearchResponse {
    hits: SearchResult[]
    query: string
    limit: number
    offset: number
    estimatedTotalHits: number
    totalPages: number
    currentPage: number
    processingTimeMs: number
    facetDistribution?: Record<string, Record<string, number>>
}

class MeiliSearchService {
    private client: MeiliSearch
    private config: any

    constructor() {
        // 获取配置
        this.config = strapi.config.get('meilisearch')

        // 初始化客户端
        this.client = new MeiliSearch({
            host: this.config.host,
            apiKey: this.config.apiKey
        })

        strapi.log.info('📊 MeiliSearch服务已初始化')
    }

    /**
     * 初始化所有索引
     */
    async initializeIndexes() {
        try {
            const indexConfigs = this.config.indexes

            for (const [key, config] of Object.entries(indexConfigs)) {
                const indexConfig = config as any
                await this.createOrUpdateIndex(indexConfig.indexName, indexConfig.settings, indexConfig.primaryKey)
            }

            strapi.log.info('✅ 所有MeiliSearch索引初始化完成')
        } catch (error) {
            strapi.log.error('❌ MeiliSearch索引初始化失败:', error)
            throw error
        }
    }

    /**
     * 创建或更新索引
     */
    private async createOrUpdateIndex(indexName: string, settings: any, primaryKey?: string) {
        try {
            // 尝试获取现有索引
            let index: Index
            try {
                index = this.client.index(indexName)
                await index.getStats() // 测试索引是否存在
                strapi.log.info(`📊 索引 ${indexName} 已存在，更新设置`)
            } catch {
                // 索引不存在，创建新索引
                const task = await this.client.createIndex(indexName, { primaryKey })
                // 等待索引创建完成
                let attempts = 0
                while (attempts < 10) {
                    try {
                        index = this.client.index(indexName)
                        await index.getStats()
                        break
                    } catch {
                        await new Promise(resolve => setTimeout(resolve, 500))
                        attempts++
                    }
                }
                strapi.log.info(`🆕 创建新索引: ${indexName}`)
            }

            // 更新索引设置
            if (settings) {
                const updateTask = await index.updateSettings(settings)
                // 等待设置更新完成，最多等待5秒
                await new Promise(resolve => setTimeout(resolve, 2000))
                strapi.log.info(`⚙️  索引 ${indexName} 设置已更新`)
            }

            return index
        } catch (error) {
            strapi.log.error(`❌ 索引 ${indexName} 创建/更新失败:`, error)
            throw error
        }
    }

    /**
     * 同步文章数据到搜索索引
     */
    async syncArticles(articles?: any[]) {
        try {
            const index = this.client.index('articles')

            // 如果没有提供文章数据，从数据库获取
            if (!articles) {
                articles = await strapi.entityService.findMany('api::article.article', {
                    populate: {
                        author: {
                            fields: ['name', 'slug']
                        },
                        category: {
                            fields: ['name', 'slug']
                        },
                        tags: {
                            fields: ['name', 'slug']
                        },
                        featuredImage: {
                            fields: ['url', 'alternativeText']
                        }
                    }
                })
            }

            // 转换数据格式以适配搜索索引
            const searchDocuments = articles
                .filter(article => article.publishedAt) // 只索引已发布的文章
                .map(article => ({
                    id: article.documentId,
                    documentId: article.documentId,
                    title: article.title,
                    slug: article.slug,
                    excerpt: article.excerpt,
                    content: this.stripHtml(article.content), // 移除HTML标签
                    author: {
                        name: article.author?.name || '',
                        slug: article.author?.slug || ''
                    },
                    category: {
                        name: article.category?.name || '',
                        slug: article.category?.slug || ''
                    },
                    tags: article.tags?.map(tag => ({
                        name: tag.name,
                        slug: tag.slug
                    })) || [],
                    publishedAt: article.publishedAt,
                    viewCount: article.viewCount || 0,
                    readingTime: article.readingTime || 5,
                    featured: article.featured || false,
                    featuredImage: article.featuredImage?.url || null
                }))

            // 批量添加文档到索引
            if (searchDocuments.length > 0) {
                const task = await index.addDocuments(searchDocuments)
                // 等待文档索引完成
                await new Promise(resolve => setTimeout(resolve, 1000))
                strapi.log.info(`📝 同步了 ${searchDocuments.length} 篇文章到搜索索引`)
            }

            return searchDocuments.length
        } catch (error) {
            strapi.log.error('❌ 文章搜索索引同步失败:', error)
            throw error
        }
    }

    /**
     * 同步单篇文章
     */
    async syncSingleArticle(articleId: string) {
        try {
            const article = await strapi.entityService.findOne('api::article.article', articleId, {
                populate: {
                    author: { fields: ['name', 'slug'] },
                    category: { fields: ['name', 'slug'] },
                    tags: { fields: ['name', 'slug'] },
                    featuredImage: { fields: ['url', 'alternativeText'] }
                }
            })

            if (article) {
                await this.syncArticles([article])
                strapi.log.info(`📝 单篇文章同步完成: ${article.title}`)
            }
        } catch (error) {
            strapi.log.error('❌ 单篇文章同步失败:', error)
            throw error
        }
    }

    /**
     * 删除文章索引
     */
    async deleteArticle(documentId: string) {
        try {
            const index = this.client.index('articles')
            const task = await index.deleteDocument(documentId)
            // 等待删除操作完成
            await new Promise(resolve => setTimeout(resolve, 500))
            strapi.log.info(`🗑️  删除文章索引: ${documentId}`)
        } catch (error) {
            strapi.log.error('❌ 删除文章索引失败:', error)
            throw error
        }
    }

    /**
     * 执行搜索查询
     */
    async search(searchQuery: SearchQuery): Promise<SearchResponse> {
        try {
            const index = this.client.index('articles')
            const { query, limit, offset, filters, sort, highlight, crop, facets } = searchQuery

            // 构建搜索参数
            const searchParams: any = {
                limit: Math.min(limit || this.config.search.defaultLimit, this.config.search.maxLimit),
                offset: offset || 0
            }

            // 添加筛选条件
            if (filters && filters.length > 0) {
                searchParams.filter = filters
            }

            // 添加排序条件
            if (sort && sort.length > 0) {
                searchParams.sort = sort
            }

            // 添加高亮设置
            if (highlight) {
                searchParams.attributesToHighlight = ['title', 'excerpt']
                searchParams.highlightPreTag = this.config.search.highlight.preTag
                searchParams.highlightPostTag = this.config.search.highlight.postTag
            }

            // 添加截取设置
            if (crop) {
                searchParams.attributesToCrop = ['excerpt', 'content']
                searchParams.cropLength = this.config.search.crop.length
                searchParams.cropMarker = this.config.search.crop.marker
            }

            // 添加分面搜索
            if (facets && facets.length > 0) {
                searchParams.facets = facets
            }

            // 执行搜索
            const results = await index.search(query, searchParams)

            // 计算分页信息
            const totalPages = Math.ceil(results.estimatedTotalHits / searchParams.limit)
            const currentPage = Math.floor(searchParams.offset / searchParams.limit) + 1

            strapi.log.info(`🔍 搜索查询: "${query}" - 找到 ${results.estimatedTotalHits} 条结果`)

            return {
                hits: results.hits as SearchResult[],
                query: results.query,
                limit: searchParams.limit,
                offset: searchParams.offset,
                estimatedTotalHits: results.estimatedTotalHits,
                totalPages,
                currentPage,
                processingTimeMs: results.processingTimeMs,
                facetDistribution: results.facetDistribution
            }
        } catch (error) {
            strapi.log.error('❌ 搜索查询失败:', error)
            throw error
        }
    }

    /**
     * 获取搜索建议
     */
    async getSuggestions(query: string, limit = 5) {
        try {
            const searchResults = await this.search({
                query,
                limit,
                highlight: true
            })

            return searchResults.hits.map(hit => ({
                id: hit.id,
                title: hit.title,
                category: hit.category.name,
                type: 'article' as const
            }))
        } catch (error) {
            strapi.log.error('❌ 获取搜索建议失败:', error)
            return []
        }
    }

    /**
     * 获取索引统计信息
     */
    async getIndexStats() {
        try {
            const articlesIndex = this.client.index('articles')
            const stats = await articlesIndex.getStats()

            return {
                totalDocuments: stats.numberOfDocuments,
                isIndexing: stats.isIndexing,
                fieldDistribution: stats.fieldDistribution
            }
        } catch (error) {
            strapi.log.error('❌ 获取索引统计失败:', error)
            throw error
        }
    }

    /**
     * 移除HTML标签
     */
    private stripHtml(html: string): string {
        if (!html) return ''
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    }

    /**
     * 健康检查
     */
    async healthCheck() {
        try {
            const health = await this.client.health()
            return { status: 'healthy', ...health }
        } catch (error) {
            return { status: 'unhealthy', error: error.message }
        }
    }
}

export default MeiliSearchService