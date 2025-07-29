/**
 * Strapi API 客户端
 * 处理与Strapi CMS的所有API交互
 */

import { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

// Strapi API配置
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
const API_TOKEN = process.env.STRAPI_API_TOKEN

// Strapi响应类型定义
interface StrapiResponse<T> {
    data: T
    meta?: {
        pagination?: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

interface StrapiArticle {
    id: number
    documentId: string
    title: string
    slug: string
    content: string
    excerpt?: string | null
    publishedAt: string
    viewCount: number
    readingTime: number
    likeCount?: number | null // 新增：点赞数
    seoTitle?: string | null
    seoDescription?: string | null
    featured: boolean
    createdAt: string
    updatedAt: string
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
        bio?: string | null
        email?: string | null
        website?: string | null
        position?: string | null
        company?: string | null
        avatar?: {
            id: number
            documentId: string
            name: string
            url: string
            alternativeText?: string | null
        } | null
    } | null
    category?: {
        id: number
        documentId: string
        name: string
        slug: string
        description?: string | null
        icon?: string | null
        color?: string | null
    } | null
    tags?: Array<{
        id: number
        documentId: string
        name: string
        slug: string
        color: string
        description?: string | null
        icon?: string | null
    }> | null
}

// API请求头配置
const getHeaders = () => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`
    }

    return headers
}

/**
 * 获取文章列表
 */
export async function getArticles(params: {
    page?: number
    pageSize?: number
    category?: string
    tag?: string
    search?: string
    featured?: boolean
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
} = {}): Promise<{
    articles: ArticleCardData[]
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
}> {
    try {
        const searchParams = new URLSearchParams()

        // 分页参数
        searchParams.append('pagination[page]', String(params.page || 1))
        searchParams.append('pagination[pageSize]', String(params.pageSize || 10))

        // 关联数据 - 使用简化的populate格式
        searchParams.append('populate', '*')

        // 排序
        if (params.sortBy) {
            const sortOrder = params.sortOrder || 'desc'
            searchParams.append('sort[0]', `${params.sortBy}:${sortOrder}`)
        } else {
            searchParams.append('sort[0]', 'publishedAt:desc')
        }

        // 筛选条件
        if (params.category) {
            searchParams.append('filters[category][slug][$eq]', params.category)
        }

        if (params.tag) {
            searchParams.append('filters[tags][slug][$in]', params.tag)
        }

        if (params.search) {
            searchParams.append('filters[$or][0][title][$containsi]', params.search)
            searchParams.append('filters[$or][1][excerpt][$containsi]', params.search)
        }

        if (params.featured !== undefined) {
            searchParams.append('filters[featured][$eq]', String(params.featured))
        }

        const response = await fetch(
            `${STRAPI_URL}/api/articles?${searchParams}`,
            {
                headers: getHeaders(),
                next: { revalidate: 300 }, // 5分钟缓存
            }
        )

        if (!response.ok) {
            throw new Error(`Strapi API error: ${response.status}`)
        }

        const data: StrapiResponse<StrapiArticle[]> = await response.json()

        return {
            articles: data.data.map(transformStrapiArticle),
            pagination: data.meta?.pagination || {
                page: 1,
                pageSize: 10,
                pageCount: 1,
                total: data.data.length
            }
        }
    } catch (error) {
        console.error('获取文章列表失败:', error)

        // 返回空结果而不是抛出错误，保证前端不崩溃
        return {
            articles: [],
            pagination: {
                page: 1,
                pageSize: 10,
                pageCount: 0,
                total: 0
            }
        }
    }
}

/**
 * 根据slug获取单篇文章
 */
export async function getArticleBySlug(slug: string): Promise<ArticleCardData | null> {
    try {
        const searchParams = new URLSearchParams()
        searchParams.append('filters[slug][$eq]', slug)
        searchParams.append('populate', '*')

        const response = await fetch(
            `${STRAPI_URL}/api/articles?${searchParams}`,
            {
                headers: getHeaders(),
                next: { revalidate: 300 },
            }
        )

        if (!response.ok) {
            throw new Error(`Strapi API error: ${response.status}`)
        }

        const data: StrapiResponse<StrapiArticle[]> = await response.json()

        if (data.data.length === 0) {
            return null
        }

        return transformStrapiArticle(data.data[0])
    } catch (error) {
        console.error('获取文章详情失败:', error)
        return null
    }
}

/**
 * 获取精选文章
 */
export async function getFeaturedArticles(limit: number = 6): Promise<ArticleCardData[]> {
    try {
        const { articles } = await getArticles({
            pageSize: limit,
            featured: true
        })
        return articles
    } catch (error) {
        console.error('获取精选文章失败:', error)
        return []
    }
}

/**
 * 增加文章浏览量
 */
export async function incrementArticleView(articleId: string): Promise<void> {
    try {
        // 先获取当前文章数据
        const response = await fetch(
            `${STRAPI_URL}/api/articles/${articleId}`,
            {
                headers: getHeaders(),
            }
        )

        if (!response.ok) return

        const { data } = await response.json()
        const currentViewCount = data.attributes.viewCount || 0

        // 更新浏览量
        await fetch(`${STRAPI_URL}/api/articles/${articleId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({
                data: {
                    viewCount: currentViewCount + 1
                }
            })
        })
    } catch (error) {
        console.error('更新浏览量失败:', error)
        // 静默失败，不影响用户体验
    }
}

/**
 * 数据转换函数：将Strapi文章数据转换为前端需要的格式
 */
function transformStrapiArticle(strapiArticle: StrapiArticle): ArticleCardData {
    if (!strapiArticle || !strapiArticle.title || !strapiArticle.slug) {
        console.error('Invalid article data - missing required fields:', strapiArticle)
        throw new Error('Article data is missing required fields (title or slug)')
    }

    return {
        id: String(strapiArticle.id),
        title: strapiArticle.title,
        slug: strapiArticle.slug,
        excerpt: strapiArticle.excerpt || '',
        publishedAt: formatDate(strapiArticle.publishedAt),
        readingTime: `${strapiArticle.readingTime || 5}分钟`,
        viewCount: String(strapiArticle.viewCount || 0),
        isPremium: false, // 暂时设为false，后续可根据需要调整
        coverImage: strapiArticle.featuredImage?.url
            ? `${STRAPI_URL}${strapiArticle.featuredImage.url}`
            : undefined,
        author: {
            name: strapiArticle.author?.name || '匿名作者',
            avatar: strapiArticle.author?.avatar?.url
                ? `${STRAPI_URL}${strapiArticle.author.avatar.url}`
                : undefined
        },
        tags: strapiArticle.tags?.map(tag => tag.name).filter(Boolean) || [],
        // SEO优化字段
        seoTitle: strapiArticle.seoTitle || undefined,
        seoDescription: strapiArticle.seoDescription || undefined,
        // 新增字段
        content: strapiArticle.content || undefined,
        likeCount: String(strapiArticle.likeCount || 0)
    }
}

/**
 * 格式化日期
 */
function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString)
        return date.toISOString().split('T')[0] // 返回 YYYY-MM-DD 格式
    } catch (error) {
        return new Date().toISOString().split('T')[0]
    }
}

/**
 * 检查Strapi连接状态
 */
export async function checkStrapiConnection(): Promise<boolean> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/articles?pagination[pageSize]=1`, {
            headers: getHeaders(),
        })
        return response.ok
    } catch (error) {
        console.error('Strapi连接检查失败:', error)
        return false
    }
} 