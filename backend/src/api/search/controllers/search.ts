/**
 * 搜索控制器
 * 
 * 提供MeiliSearch搜索功能的API接口
 * 支持文章搜索、建议搜索、统计等功能
 */

import { factories } from '@strapi/strapi'
import MeiliSearchService from '../../../services/meilisearch'

let meilisearchService: MeiliSearchService

// 懒加载初始化MeiliSearch服务
const getMeiliSearchService = () => {
    if (!meilisearchService) {
        meilisearchService = new MeiliSearchService()
    }
    return meilisearchService
}

export default factories.createCoreController('api::search.search', ({ strapi }) => ({
    /**
     * 文章搜索
     * GET /api/search/articles
     */
    async articles(ctx) {
        try {
            const {
                q = '',              // 搜索关键词
                page = 1,            // 页码
                pageSize = 20,       // 每页数量
                category,            // 分类筛选
                tags,                // 标签筛选
                author,              // 作者筛选
                featured,            // 是否精选
                sortBy = 'relevance', // 排序方式: relevance, publishedAt, viewCount
                sortOrder = 'desc',   // 排序顺序: asc, desc
                highlight = true,     // 是否高亮
                facets = false       // 是否返回分面统计
            } = ctx.query

            // 参数验证
            const pageNum = Math.max(1, parseInt(page as string))
            const pageSizeNum = Math.min(100, Math.max(1, parseInt(pageSize as string)))
            const offset = (pageNum - 1) * pageSizeNum

            // 构建搜索查询
            const searchQuery: any = {
                query: q,
                limit: pageSizeNum,
                offset,
                highlight: highlight === 'true',
                crop: true
            }

            // 构建筛选条件
            const filters = []

            if (category) {
                filters.push(`category.slug = "${category}"`)
            }

            if (tags) {
                const tagList = Array.isArray(tags) ? tags : [tags]
                const tagFilters = tagList.map(tag => `tags.slug = "${tag}"`).join(' OR ')
                if (tagFilters) {
                    filters.push(`(${tagFilters})`)
                }
            }

            if (author) {
                filters.push(`author.slug = "${author}"`)
            }

            if (featured !== undefined) {
                filters.push(`featured = ${featured === 'true'}`)
            }

            if (filters.length > 0) {
                searchQuery.filters = filters
            }

            // 构建排序条件
            if (sortBy !== 'relevance') {
                const sortField = sortBy === 'publishedAt' ? 'publishedAt'
                    : sortBy === 'viewCount' ? 'viewCount'
                        : 'publishedAt'

                searchQuery.sort = [`${sortField}:${sortOrder}`]
            }

            // 添加分面搜索
            if (facets === 'true') {
                searchQuery.facets = ['category.slug', 'tags.slug', 'author.slug', 'featured']
            }

            // 执行搜索
            const service = getMeiliSearchService()
            const results = await service.search(searchQuery)

            // 返回搜索结果
            ctx.body = {
                data: results.hits,
                meta: {
                    pagination: {
                        page: results.currentPage,
                        pageSize: results.limit,
                        pageCount: results.totalPages,
                        total: results.estimatedTotalHits
                    },
                    search: {
                        query: results.query,
                        processingTimeMs: results.processingTimeMs,
                        facetDistribution: results.facetDistribution
                    }
                }
            }

            strapi.log.info(`🔍 搜索API调用: "${q}" - 返回 ${results.hits.length} 条结果`)

        } catch (error) {
            strapi.log.error('❌ 搜索API错误:', error)

            ctx.status = 500
            ctx.body = {
                error: {
                    status: 500,
                    name: 'SearchError',
                    message: '搜索服务暂时不可用，请稍后重试',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                }
            }
        }
    },

    /**
     * 搜索建议
     * GET /api/search/suggestions
     */
    async suggestions(ctx) {
        try {
            const { q = '', limit = 5 } = ctx.query
            const query = String(q)

            if (!query || query.length < 1) {
                ctx.body = {
                    data: [],
                    meta: { total: 0 }
                }
                return
            }

            const service = getMeiliSearchService()
            const suggestions = await service.getSuggestions(query, Math.min(10, parseInt(limit as string)))

            ctx.body = {
                data: suggestions,
                meta: {
                    total: suggestions.length,
                    query: query
                }
            }

        } catch (error) {
            strapi.log.error('❌ 搜索建议API错误:', error)

            ctx.status = 500
            ctx.body = {
                error: {
                    status: 500,
                    name: 'SuggestionsError',
                    message: '搜索建议服务暂时不可用',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                }
            }
        }
    },

    /**
     * 搜索统计信息
     * GET /api/search/stats
     */
    async stats(ctx) {
        try {
            const service = getMeiliSearchService()
            const stats = await service.getIndexStats()

            ctx.body = {
                data: stats,
                meta: {
                    timestamp: new Date().toISOString()
                }
            }

        } catch (error) {
            strapi.log.error('❌ 搜索统计API错误:', error)

            ctx.status = 500
            ctx.body = {
                error: {
                    status: 500,
                    name: 'StatsError',
                    message: '搜索统计服务暂时不可用',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                }
            }
        }
    },

    /**
     * 重建搜索索引
     * POST /api/search/reindex
     */
    async reindex(ctx) {
        try {
            const service = getMeiliSearchService()

            // 同步所有文章到搜索索引
            const count = await service.syncArticles()

            ctx.body = {
                data: {
                    message: '搜索索引重建完成',
                    syncedArticles: count
                },
                meta: {
                    timestamp: new Date().toISOString()
                }
            }

            strapi.log.info(`🔄 搜索索引重建完成，同步了 ${count} 篇文章`)

        } catch (error) {
            strapi.log.error('❌ 重建搜索索引失败:', error)

            ctx.status = 500
            ctx.body = {
                error: {
                    status: 500,
                    name: 'ReindexError',
                    message: '重建搜索索引失败',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                }
            }
        }
    },

    /**
     * 搜索健康检查
     * GET /api/search/health
     */
    async health(ctx) {
        try {
            const service = getMeiliSearchService()
            const health = await service.healthCheck()

            ctx.body = {
                data: health,
                meta: {
                    timestamp: new Date().toISOString()
                }
            }

        } catch (error) {
            strapi.log.error('❌ 搜索健康检查失败:', error)

            ctx.status = 503
            ctx.body = {
                error: {
                    status: 503,
                    name: 'HealthCheckError',
                    message: '搜索服务不可用',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                }
            }
        }
    },

    /**
     * 获取API密钥列表和使用指南（完全免费功能）
     * GET /api/search/api-keys
     */
    async getApiKeys(ctx) {
        try {
            const service = getMeiliSearchService()
            const keysInfo = await service.getApiKeys()

            ctx.body = {
                data: keysInfo,
                meta: {
                    timestamp: new Date().toISOString(),
                    note: 'API密钥功能完全免费，无任何使用限制',
                    documentation: {
                        title: 'MeiliSearch API密钥使用指南',
                        pricing: '完全免费 - 开源版本包含完整的API密钥管理功能',
                        modes: {
                            development: '开发模式：无需密钥，便于调试',
                            production: '生产模式：自动生成免费密钥，保障安全'
                        }
                    }
                }
            }

        } catch (error) {
            strapi.log.error('❌ 获取API密钥失败:', error)

            ctx.status = 500
            ctx.body = {
                error: {
                    status: 500,
                    name: 'ApiKeysError',
                    message: 'API密钥获取失败',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                }
            }
        }
    },

    /**
     * 创建自定义API密钥（完全免费功能）
     * POST /api/search/api-keys
     */
    async createApiKey(ctx) {
        try {
            const { name, description, actions, indexes, expiresAt } = ctx.request.body

            // 参数验证
            if (!name || !description || !actions || !indexes) {
                ctx.status = 400
                ctx.body = {
                    error: {
                        status: 400,
                        name: 'ValidationError',
                        message: '缺少必要参数：name, description, actions, indexes'
                    }
                }
                return
            }

            const service = getMeiliSearchService()
            const result = await service.createApiKey(
                name, 
                description, 
                actions, 
                indexes, 
                expiresAt ? new Date(expiresAt) : undefined
            )

            ctx.status = 201
            ctx.body = {
                data: result,
                meta: {
                    timestamp: new Date().toISOString(),
                    note: 'API密钥创建成功，完全免费使用'
                }
            }

        } catch (error) {
            strapi.log.error('❌ 创建API密钥失败:', error)

            ctx.status = 500
            ctx.body = {
                error: {
                    status: 500,
                    name: 'CreateApiKeyError',
                    message: '创建API密钥失败',
                    details: error.message
                }
            }
        }
    }
}))