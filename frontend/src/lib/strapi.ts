/**
 * Strapi API 客户端
 * 处理与Strapi CMS的所有API交互
 */

import { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

// SiteConfig相关类型定义
interface StrapiSiteConfig {
    id: number
    documentId: string
    siteName: string
    siteDescription: string
    siteUrl: string
    googleVerificationCode?: string | null
    baiduVerificationCode?: string | null
    bingVerificationCode?: string | null
    yandexVerificationCode?: string | null
    twitterHandle?: string | null
    googleSubmissionStatus: '未提交' | '已提交' | '待审核' | '已收录'
    baiduSubmissionStatus: '未提交' | '已提交' | '待审核' | '已收录'
    lastSitemapUpdate?: string | null
    enablePerformanceTracking: boolean
    enableIndexingMonitoring: boolean
    primaryKeywords?: string | null
    analyticsId?: string | null
    gscPropertyUrl?: string | null
    baiduSiteToken?: string | null
    defaultOgImage?: {
        id: number
        documentId: string
        name: string
        url: string
        width: number
        height: number
        alternativeText?: string | null
    } | null
    createdAt: string
    updatedAt: string
}

// 前端使用的SiteConfig类型
interface SiteConfigData {
    siteName: string
    siteDescription: string
    siteUrl: string
    twitterHandle: string
    defaultOgImage: string | null
    primaryKeywords: string[]
    verificationCodes: {
        google: string
        baidu: string
        bing: string
        yandex: string
    }
    submissionStatus: {
        google: string
        baidu: string
    }
    analyticsId: string
}

// SEO监控数据类型
interface SeoMetricsData {
    date: string
    googleIndexedPages: number
    baiduIndexedPages: number
    totalPages: number
    mobileSpeedScore: number
    desktopSpeedScore: number
    organicTraffic: number
    avgPosition: number
    crawlErrors: number
    sitemapStatus: string
    robotsTxtStatus: string
}

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

        // 关联数据 - 使用简化的组合方式
        searchParams.append('populate[0]', 'author')
        searchParams.append('populate[1]', 'author.avatar')
        searchParams.append('populate[2]', 'featuredImage')
        searchParams.append('populate[3]', 'tags')
        searchParams.append('populate[4]', 'category')

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
        // 使用简化的组合方式
        searchParams.append('populate[0]', 'author')
        searchParams.append('populate[1]', 'author.avatar')
        searchParams.append('populate[2]', 'featuredImage')
        searchParams.append('populate[3]', 'tags')
        searchParams.append('populate[4]', 'category')

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
export async function incrementArticleView(articleId: string): Promise<number | null> {
    try {
        // 调用专用的浏览量增加API
        const response = await fetch(`${STRAPI_URL}/api/articles/${articleId}/view`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            console.error('增加浏览量失败:', response.status, response.statusText)
            return null
        }

        const result = await response.json()
        const newViewCount = result.data?.viewCount
        console.log('浏览量更新成功:', newViewCount)
        return newViewCount
    } catch (error) {
        console.error('更新浏览量失败:', error)
        // 静默失败，不影响用户体验
        return null
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
            // 🔥 修复：Strapi 5.x扁平化结构 + 多格式支持 + Fallback + 调试信息
            avatar: (() => {
                // 调试：输出作者头像数据结构（仅在开发环境）
                if (process.env.NODE_ENV === 'development' && strapiArticle.author) {
                    console.log('作者数据结构:', {
                        name: strapiArticle.author.name,
                        avatar: strapiArticle.author.avatar
                    })
                }

                // 尝试多种可能的头像路径
                if (strapiArticle.author?.avatar?.url) {
                    return `${STRAPI_URL}${strapiArticle.author.avatar.url}`
                }

                if (strapiArticle.author?.avatar?.formats?.thumbnail?.url) {
                    return `${STRAPI_URL}${strapiArticle.author.avatar.formats.thumbnail.url}`
                }

                if (strapiArticle.author?.avatar?.formats?.small?.url) {
                    return `${STRAPI_URL}${strapiArticle.author.avatar.formats.small.url}`
                }

                if (strapiArticle.author?.avatar?.formats?.medium?.url) {
                    return `${STRAPI_URL}${strapiArticle.author.avatar.formats.medium.url}`
                }

                return undefined
            })()
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

/**
 * 转换Strapi网站配置数据为前端使用格式
 */
function transformStrapiSiteConfig(strapiConfig: StrapiSiteConfig): SiteConfigData {
    return {
        siteName: strapiConfig.siteName || 'AI变现之路',
        siteDescription: strapiConfig.siteDescription || '汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具',
        siteUrl: strapiConfig.siteUrl || 'https://aibianx.com',
        twitterHandle: strapiConfig.twitterHandle || '@aibianx',
        defaultOgImage: strapiConfig.defaultOgImage?.url || null,
        primaryKeywords: strapiConfig.primaryKeywords
            ? strapiConfig.primaryKeywords.split(',').map(k => k.trim()).filter(k => k)
            : [],
        verificationCodes: {
            google: strapiConfig.googleVerificationCode || '',
            baidu: strapiConfig.baiduVerificationCode || '',
            bing: strapiConfig.bingVerificationCode || '',
            yandex: strapiConfig.yandexVerificationCode || '',
        },
        submissionStatus: {
            google: strapiConfig.googleSubmissionStatus || '未提交',
            baidu: strapiConfig.baiduSubmissionStatus || '未提交',
        },
        analyticsId: strapiConfig.analyticsId || '',
    }
}

/**
 * 获取网站配置
 */
export async function getSiteConfig(): Promise<SiteConfigData> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/site-config?populate=defaultOgImage`, {
            headers: getHeaders(),
            next: { revalidate: 300 }, // 5分钟缓存
        })

        if (!response.ok) {
            throw new Error(`获取网站配置失败: ${response.status}`)
        }

        const data: StrapiResponse<StrapiSiteConfig> = await response.json()

        // 处理singleType的响应格式 - 可能返回数组或单个对象
        const siteConfig = Array.isArray(data.data) ? data.data[0] : data.data || data

        if (!siteConfig) {
            throw new Error('No site config found')
        }

        return transformStrapiSiteConfig(siteConfig as StrapiSiteConfig)
    } catch (error) {
        console.error('获取网站配置失败:', error)

        // 返回默认配置
        return {
            siteName: 'AI变现之路',
            siteDescription: '汇聚AI领域专家实战经验，每周分享最新变现机会与实用工具',
            siteUrl: 'https://aibianx.com',
            twitterHandle: '@aibianx',
            defaultOgImage: null,
            primaryKeywords: ['AI变现', 'ChatGPT赚钱', 'AI工具', '人工智能创业'],
            verificationCodes: {
                google: '',
                baidu: '',
                bing: '',
                yandex: '',
            },
            submissionStatus: {
                google: 'status_not_submitted',
                baidu: 'status_not_submitted',
            },
            analyticsId: '',
        }
    }
}

/**
 * 获取搜索引擎验证代码（专用于前端meta标签）
 */
export async function getVerificationCodes(): Promise<{
    google: string
    baidu: string
    bing: string
    yandex: string
}> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/site-config/verification-codes`, {
            headers: getHeaders(),
            next: { revalidate: 3600 }, // 1小时缓存
        })

        if (!response.ok) {
            throw new Error(`获取验证代码失败: ${response.status}`)
        }

        const result = await response.json()
        return result.data
    } catch (error) {
        console.error('获取验证代码失败:', error)
        return {
            google: '',
            baidu: '',
            bing: '',
            yandex: '',
        }
    }
}

/**
 * 获取最新SEO监控数据
 */
export async function getLatestSeoMetrics(): Promise<SeoMetricsData | null> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/seo-metrics-data?sort[0]=date:desc&pagination[limit]=1&populate=*`, {
            headers: getHeaders(),
            next: { revalidate: 300 }, // 5分钟缓存
        })

        if (!response.ok) {
            throw new Error(`获取SEO监控数据失败: ${response.status}`)
        }

        const result = await response.json()

        if (!result.data || result.data.length === 0) {
            return null
        }

        return transformStrapiSeoMetrics(result.data[0])
    } catch (error) {
        console.error('获取SEO监控数据失败:', error)
        return null
    }
}

/**
 * 获取收录统计摘要
 */
export async function getIndexingSummary(days: number = 30): Promise<{
    lastUpdate: string | null
    totalPages: number
    indexedPages: { google: number; baidu: number; bing: number }
    indexingRate: { google: number; baidu: number; bing: number }
    crawlErrors: number
    sitemapStatus: string
    robotsTxtStatus: string
} | null> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/seo-metrics-data?sort[0]=date:desc&pagination[limit]=1&populate=*`, {
            headers: getHeaders(),
            next: { revalidate: 300 }, // 5分钟缓存
        })

        if (!response.ok) {
            throw new Error(`获取收录摘要失败: ${response.status}`)
        }

        const result = await response.json()

        if (!result.data || result.data.length === 0) {
            return null
        }

        const latest = result.data[0]
        const totalPages = latest.totalPages || 1

        return {
            lastUpdate: latest.date,
            totalPages: latest.totalPages || 0,
            indexedPages: {
                google: latest.googleIndexedPages || 0,
                baidu: latest.baiduIndexedPages || 0,
                bing: latest.bingIndexedPages || 0
            },
            indexingRate: {
                google: Math.round(((latest.googleIndexedPages || 0) / totalPages) * 100),
                baidu: Math.round(((latest.baiduIndexedPages || 0) / totalPages) * 100),
                bing: Math.round(((latest.bingIndexedPages || 0) / totalPages) * 100)
            },
            crawlErrors: latest.crawlErrors || 0,
            sitemapStatus: latest.sitemapStatus || 'status_not_submitted',
            robotsTxtStatus: latest.robotsTxtStatus || 'status_not_detected'
        }
    } catch (error) {
        console.error('获取收录摘要失败:', error)
        return null
    }
}

/**
 * 获取性能监控摘要
 */
export async function getPerformanceSummary(): Promise<{
    lastUpdate: string | null
    avgPageLoadTime: number
    speedScores: { mobile: number; desktop: number }
    coreWebVitals: { lcp: number; fid: number; cls: number }
} | null> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/seo-metrics-data?sort[0]=date:desc&pagination[limit]=1&populate=*`, {
            headers: getHeaders(),
            next: { revalidate: 300 }, // 5分钟缓存
        })

        if (!response.ok) {
            throw new Error(`获取性能摘要失败: ${response.status}`)
        }

        const result = await response.json()

        if (!result.data || result.data.length === 0) {
            return null
        }

        const latest = result.data[0]

        return {
            lastUpdate: latest.date,
            avgPageLoadTime: latest.avgPageLoadTime || 0,
            speedScores: {
                mobile: latest.mobileSpeedScore || 0,
                desktop: latest.desktopSpeedScore || 0
            },
            coreWebVitals: {
                lcp: latest.coreWebVitalsLCP || 0,
                fid: latest.coreWebVitalsFID || 0,
                cls: latest.coreWebVitalsCLS || 0
            }
        }
    } catch (error) {
        console.error('获取性能摘要失败:', error)
        return null
    }
}

/**
 * 更新sitemap时间戳
 */
export async function updateSitemapTimestamp(): Promise<boolean> {
    try {
        // 获取当前配置
        const getResponse = await fetch(`${STRAPI_URL}/api/site-config?populate=*`, {
            headers: getHeaders(),
        })

        if (!getResponse.ok) {
            throw new Error('获取配置失败')
        }

        const result = await getResponse.json()
        const data = Array.isArray(result.data) ? result.data[0] : result.data

        if (!data) {
            throw new Error('配置不存在')
        }

        // 更新时间戳
        const updateResponse = await fetch(`${STRAPI_URL}/api/site-config/${data.documentId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({
                data: {
                    lastSitemapUpdate: new Date().toISOString()
                }
            })
        })

        return updateResponse.ok
    } catch (error) {
        console.error('更新sitemap时间戳失败:', error)
        return false
    }
} 