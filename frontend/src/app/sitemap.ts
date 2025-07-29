import type { MetadataRoute } from 'next'

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// 获取所有文章
async function getArticles() {
    try {
        const response = await fetch(`${STRAPI_API_URL}/api/articles?populate=*`)
        if (!response.ok) return []
        const data = await response.json()
        return data.data || []
    } catch (error) {
        console.error('Failed to fetch articles:', error)
        return []
    }
}

// 获取所有分类
async function getCategories() {
    try {
        const response = await fetch(`${STRAPI_API_URL}/api/categories`)
        if (!response.ok) return []
        const data = await response.json()
        return data.data || []
    } catch (error) {
        console.error('Failed to fetch categories:', error)
        return []
    }
}

// 获取所有作者
async function getAuthors() {
    try {
        const response = await fetch(`${STRAPI_API_URL}/api/authors`)
        if (!response.ok) return []
        const data = await response.json()
        return data.data || []
    } catch (error) {
        console.error('Failed to fetch authors:', error)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 获取动态数据
    const [articles, categories, authors] = await Promise.all([
        getArticles(),
        getCategories(),
        getAuthors()
    ])

    // 静态页面
    const staticPages = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${SITE_URL}/weekly`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ]

    // 文章页面
    const articlePages = articles.map((article: any) => ({
        url: `${SITE_URL}/weekly/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // 分类页面
    const categoryPages = categories.map((category: any) => ({
        url: `${SITE_URL}/categories/${category.slug}`,
        lastModified: new Date(category.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    }))

    // 作者页面
    const authorPages = authors.map((author: any) => ({
        url: `${SITE_URL}/authors/${author.slug}`,
        lastModified: new Date(author.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
    }))

    return [
        ...staticPages,
        ...articlePages,
        ...categoryPages,
        ...authorPages,
    ]
} 