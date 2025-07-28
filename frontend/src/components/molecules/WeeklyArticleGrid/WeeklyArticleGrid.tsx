'use client'

import { ArticleCard } from '@/components/molecules'
import { getGridStyles } from '@/lib/weeklyUtils'
import { STYLES_CONFIG } from '@/constants/weeklyConfig'
import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

interface WeeklyArticleGridProps {
    articles: ArticleCardData[]
}

/**
 * WeeklyArticleGrid 组件
 * 
 * 文章网格显示，支持响应式布局
 */
export function WeeklyArticleGrid({ articles }: WeeklyArticleGridProps) {
    if (!articles || articles.length === 0) {
        return null
    }

    const gridStyles = getGridStyles(
        STYLES_CONFIG.articlesGrid.desktop,
        STYLES_CONFIG.articlesGrid.tablet,
        STYLES_CONFIG.articlesGrid.mobile,
        STYLES_CONFIG.articlesGrid.gap,
        STYLES_CONFIG.articlesGrid.maxWidth
    )

    return (
        <div
            className="articles-grid"
            style={gridStyles}
        >
            {articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    variant="vertical"
                    showExcerpt={true}
                />
            ))}
        </div>
    )
} 