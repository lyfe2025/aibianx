import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui'
import { getArticleBySlug, getArticles } from '@/lib/strapi'
import { ArticleDetailClient } from './ArticleDetailClient'

interface ArticleDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

// 生成静态路径（ISR）
export async function generateStaticParams() {
    // 构建时返回空数组，避免API连接问题
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
        console.log('构建时跳过文章静态参数生成')
        return []
    }

    try {
        const { articles } = await getArticles({ pageSize: 100 })
        return articles.map((article) => ({
            slug: article.slug,
        }))
    } catch (error) {
        console.error('Failed to generate static params:', error)
        return []
    }
}

// 动态生成SEO元数据
export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
    const resolvedParams = await params
    const article = await getArticleBySlug(resolvedParams.slug)

    if (!article) {
        return {
            title: '文章未找到 - AI变现之路',
            description: '您访问的文章不存在或已被删除'
        }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aibianx.com'
    const articleUrl = `${siteUrl}/weekly/${article.slug}`

    // SEO优化：优先使用专用SEO字段，回退到默认字段
    const seoTitle = article.seoTitle || article.title
    const seoDescription = article.seoDescription || article.excerpt

    return {
        title: seoTitle,
        description: seoDescription,
        keywords: article.tags.join(',') + ',AI变现,AI工具,人工智能',
        authors: [
            {
                name: article.author.name,
                url: `/authors/${article.authorSlug}`,
            },
        ],
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            type: 'article',
            url: articleUrl,
            images: article.coverImage ? [
                {
                    url: article.coverImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                }
            ] : [],
            authors: [article.author.name],
            publishedTime: article.publishedAt,
            section: 'AI变现',
            tags: article.tags
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDescription,
            images: article.coverImage ? [article.coverImage] : []
        },
        alternates: {
            canonical: articleUrl,
        },
        // 结构化数据
        other: {
            'article:author': article.author.name,
            'article:published_time': article.publishedAt,
            'article:section': 'AI变现',
            'article:tag': article.tags.join(','),
            'article:reading_time': article.readingTime
        }
    }
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
    const resolvedParams = await params
    const article = await getArticleBySlug(resolvedParams.slug)

    if (!article) {
        notFound()
    }

    // SEO优化字段（在组件中也需要定义）
    const seoTitle = article.seoTitle || article.title
    const seoDescription = article.seoDescription || article.excerpt

    // 结构化数据 - 文章类型（使用SEO优化字段）
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": seoTitle,
        "description": seoDescription,
        "image": article.coverImage ? [article.coverImage] : [],
        "datePublished": article.publishedAt,
        "dateModified": article.publishedAt,
        "author": {
            "@type": "Person",
            "name": article.author.name,
        },
        "publisher": {
            "@type": "Organization",
            "name": "AI变现之路",
            "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aibianx.com'}/icons/logo-main.svg`,
            },
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aibianx.com'}/weekly/${article.slug}`,
        },
        "keywords": article.tags.join(', '),
        "articleSection": "AI变现",
        "wordCount": Math.ceil((article.excerpt?.length || 0) * 5), // 估算字数
        "timeRequired": article.readingTime,
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aibianx.com'}/weekly/${article.slug}`
    }

    return (
        <>
            {/* 结构化数据嵌入 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />

            {/* 主要内容 */}
            <div style={{
                color: 'var(--color-text-primary)',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                minHeight: '100vh',
                paddingTop: '80px'
            }}>
                <Container size="xl">
                    <ArticleDetailClient article={article} />
                </Container>
            </div>
        </>
    )
}

// ISR配置 - 提升SEO性能
export const revalidate = 3600 // 1小时重新验证 