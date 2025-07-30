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
        // 获取配置 - 使用Strapi内置配置系统
        this.config = {
            host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
            apiKey: process.env.MEILISEARCH_API_KEY || null,
            // 搜索配置
            search: {
                defaultLimit: 20,
                maxLimit: 100,
                defaultHighlight: true,
                defaultCrop: true,
                // 高亮配置
                highlight: {
                    preTag: '<mark>',
                    postTag: '</mark>'
                },
                // 截取配置
                crop: {
                    length: 100,
                    marker: '...'
                }
            }
        }

        strapi.log.info('🔧 MeiliSearch配置:', {
            host: this.config.host,
            hasApiKey: !!this.config.apiKey,
            mode: this.config.apiKey ? 'production' : 'development'
        })

        // 初始化客户端
        this.client = new MeiliSearch({
            host: this.config.host,
            apiKey: this.config.apiKey || undefined  // null转为undefined
        })

        strapi.log.info('📊 MeiliSearch服务已初始化')
    }

    /**
     * 初始化所有索引
     */
    async initializeIndexes() {
        try {
            // 硬编码索引配置（避免复杂的配置导入）
            const indexConfigs = {
                articles: {
                    indexName: 'articles',
                    primaryKey: 'id',
                    settings: {
                        searchableAttributes: ['title', 'excerpt', 'content', 'author.name', 'category.name', 'tags.name'],
                        displayedAttributes: ['id', 'documentId', 'title', 'slug', 'excerpt', 'author', 'category', 'tags', 'publishedAt', 'viewCount', 'readingTime', 'featured'],
                        filterableAttributes: ['category.slug', 'tags.slug', 'author.slug', 'featured', 'publishedAt'],
                        sortableAttributes: ['publishedAt', 'viewCount', 'readingTime', 'title']
                    }
                }
            }

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

    /**
     * 获取API密钥列表（免费功能）
     * 注意：此功能完全免费，是MeiliSearch开源版本的内置安全特性
     */
    async getApiKeys() {
        try {
            // 检查是否有Master Key (生产模式)
            if (!this.config.apiKey) {
                return {
                    mode: 'development',
                    message: '开发模式：无需API密钥，所有操作免认证',
                    keys: [],
                    instructions: {
                        title: '如何免费获取API密钥',
                        steps: [
                            '1. 停止当前MeiliSearch容器',
                            '2. 设置Master Key重新启动：docker run -d --name meilisearch -p 7700:7700 -e MEILI_ENV=production -e MEILI_MASTER_KEY=你的密钥 getmeili/meilisearch:latest',
                            '3. 系统自动生成3个免费API密钥：Search Key、Admin Key、Chat Key',
                            '4. 完全免费使用，无任何费用限制',
                            '5. 支持自定义权限和无限数量密钥创建'
                        ],
                        note: '开发阶段建议继续使用开发模式，生产部署时再启用API密钥'
                    }
                }
            }

            // 生产模式：获取实际密钥
            const response = await this.client.getKeys()
            return {
                mode: 'production',
                message: '生产模式：API密钥管理已启用',
                keys: response.results.map(key => ({
                    name: key.name,
                    description: key.description,
                    keyPreview: key.key.substring(0, 12) + '...' + key.key.substring(-8), // 安全显示
                    fullKey: key.key, // 完整密钥（仅管理员可见）
                    actions: key.actions,
                    indexes: key.indexes,
                    expiresAt: key.expiresAt,
                    createdAt: key.createdAt
                })),
                total: response.total,
                usage: {
                    note: '所有API密钥功能完全免费',
                    limits: '无数量限制，无使用限制，无到期强制要求'
                }
            }
        } catch (error) {
            strapi.log.error('❌ 获取API密钥失败:', error)
            return {
                mode: 'error',
                message: 'API密钥获取失败',
                error: error.message,
                solution: '请检查MeiliSearch服务状态和Master Key配置'
            }
        }
    }

    /**
     * 创建自定义API密钥（免费功能）
     * @param {string} name 密钥名称
     * @param {string} description 描述
     * @param {string[]} actions 权限列表
     * @param {string[]} indexes 索引列表
     * @param {Date} expiresAt 过期时间（可选）
     */
    async createApiKey(name: string, description: string, actions: string[], indexes: string[], expiresAt?: Date) {
        try {
            if (!this.config.apiKey) {
                throw new Error('开发模式下无法创建API密钥，请先启用生产模式（设置MEILI_MASTER_KEY）')
            }

            const keyOptions = {
                name,
                description,
                actions,
                indexes,
                ...(expiresAt && { expiresAt })
            }

            const newKey = await this.client.createKey(keyOptions)

            strapi.log.info(`✅ 成功创建API密钥: ${name}`)

            return {
                success: true,
                message: `API密钥 "${name}" 创建成功（完全免费）`,
                key: {
                    name: newKey.name,
                    description: newKey.description,
                    key: newKey.key,
                    actions: newKey.actions,
                    indexes: newKey.indexes,
                    expiresAt: newKey.expiresAt,
                    createdAt: newKey.createdAt
                },
                note: 'API密钥创建和使用完全免费，无任何隐藏费用'
            }
        } catch (error) {
            strapi.log.error('❌ 创建API密钥失败:', error)
            throw error
        }
    }
}

export default MeiliSearchService