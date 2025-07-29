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

    return {
        title: article.title,
        description: article.excerpt,
        keywords: article.tags.join(',') + ',AI变现,AI工具,人工智能',
        authors: [
            {
                name: article.author,
                url: `/authors/${article.authorSlug}`,
            },
        ],
        openGraph: {
            title: article.title,
            description: article.excerpt,
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
            title: article.title,
            description: article.excerpt,
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

    // 结构化数据 - 文章类型
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
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