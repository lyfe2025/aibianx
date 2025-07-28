/**
 * Weekly页面工具函数
 * 
 * 包含筛选、搜索、分页等业务逻辑
 * 分离复杂逻辑，提升代码可读性和可测试性
 */

import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

/**
 * 解析浏览量字符串为数字（用于排序）
 */
function parseViewCount(viewCount: string): number {
    const numStr = viewCount.replace('k', '000').replace('.', '')
    return parseInt(numStr, 10) || 0
}

/**
 * 搜索文章函数
 */
export function searchArticles(
    articles: ArticleCardData[],
    query: string
): ArticleCardData[] {
    if (!query.trim()) {
        return articles
    }

    const searchQuery = query.toLowerCase()

    return articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery) ||
        article.excerpt?.toLowerCase().includes(searchQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    )
}

/**
 * 根据筛选条件过滤文章
 */
export function filterArticles(
    articles: ArticleCardData[],
    filterId: string
): ArticleCardData[] {
    switch (filterId) {
        case 'latest':
            return [...articles].sort((a, b) =>
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            )

        case 'hot':
            return [...articles].sort((a, b) =>
                parseViewCount(b.viewCount) - parseViewCount(a.viewCount)
            )

        case 'ai-tools':
            return articles.filter(article =>
                article.tags.some(tag => tag === 'AI工具')
            )

        case 'monetization':
            return articles.filter(article =>
                article.tags.some(tag => tag === '变现心得')
            )

        case 'tech-guide':
            return articles.filter(article =>
                article.tags.some(tag => tag === '技术指南')
            )

        case 'case-study':
            return articles.filter(article =>
                article.tags.some(tag => tag === '实战案例')
            )

        case 'trending':
            return articles.filter(article =>
                article.tags.some(tag => tag === '前沿技术')
            )

        default:
            return articles
    }
}

/**
 * 综合筛选和搜索文章
 */
export function filterAndSearchArticles(
    articles: ArticleCardData[],
    searchQuery: string,
    filterId: string
): ArticleCardData[] {
    // 先应用搜索筛选
    let filtered = searchArticles(articles, searchQuery)

    // 再应用分类筛选
    filtered = filterArticles(filtered, filterId)

    return filtered
}

/**
 * 分页处理
 */
export function paginateArticles(
    articles: ArticleCardData[],
    currentPage: number,
    itemsPerPage: number
): {
    paginatedArticles: ArticleCardData[]
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
} {
    const totalPages = Math.ceil(articles.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedArticles = articles.slice(startIndex, startIndex + itemsPerPage)

    return {
        paginatedArticles,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1
    }
}

/**
 * 获取搜索结果统计信息
 */
export function getSearchResultStats(
    totalResults: number,
    searchQuery: string,
    isSearching: boolean
): {
    showStats: boolean
    message: string
} {
    if (!searchQuery.trim()) {
        return {
            showStats: false,
            message: ''
        }
    }

    if (isSearching) {
        return {
            showStats: true,
            message: '搜索中...'
        }
    }

    return {
        showStats: true,
        message: `搜索 "${searchQuery}" 找到 ${totalResults} 个相关结果`
    }
}

/**
 * 生成空状态配置
 */
export function getEmptyStateConfig(
    hasSearchQuery: boolean,
    searchQuery: string
): {
    type: 'search' | 'category'
    title: string
    description: string
    actionText: string
    showSearchSuggestions: boolean
} {
    if (hasSearchQuery) {
        return {
            type: 'search',
            title: '未找到相关内容',
            description: `没有找到包含 "${searchQuery}" 的内容`,
            actionText: '查看全部文章',
            showSearchSuggestions: true
        }
    }

    return {
        type: 'category',
        title: '该分类暂无文章',
        description: '敬请期待更多精彩内容',
        actionText: '查看最新文章',
        showSearchSuggestions: false
    }
}

/**
 * 平滑滚动到顶部
 */
export function scrollToTop(behavior: 'smooth' | 'auto' = 'smooth'): void {
    window.scrollTo({ top: 0, behavior })
}

/**
 * 获取响应式网格样式
 */
export function getGridStyles(
    desktopColumns: string,
    tabletColumns: string,
    mobileColumns: string,
    gap: string,
    maxWidth: string
) {
    return {
        display: 'grid',
        gridTemplateColumns: desktopColumns,
        gap,
        marginBottom: '48px',
        maxWidth,
        margin: '0 auto 48px auto'
    }
}

/**
 * 获取搜索容器样式
 */
export function getSearchContainerStyles(maxWidth: string) {
    return {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        searchContainer: {
            width: '100%',
            maxWidth
        }
    }
}

/**
 * 生成搜索建议按钮样式
 */
export function getSuggestionButtonStyles(index: number) {
    return {
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '20px',
        padding: '6px 16px',
        color: 'var(--color-primary-blue)',
        fontSize: 'var(--font-size-sm)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s forwards`
    }
}

/**
 * 生成搜索建议按钮悬停效果
 */
export function applySuggestionButtonHover(element: HTMLButtonElement, isHover: boolean) {
    if (isHover) {
        element.style.background = 'rgba(59, 130, 246, 0.2)'
        element.style.borderColor = 'rgba(59, 130, 246, 0.5)'
        element.style.transform = 'translateY(-1px)'
        element.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)'
    } else {
        element.style.background = 'rgba(59, 130, 246, 0.1)'
        element.style.borderColor = 'rgba(59, 130, 246, 0.3)'
        element.style.transform = 'translateY(0)'
        element.style.boxShadow = 'none'
    }
}

/**
 * 生成清空搜索按钮样式
 */
export function getClearSearchButtonStyles() {
    return {
        background: 'transparent',
        border: '1px solid rgba(42, 42, 42, 0.70)',
        borderRadius: '6px',
        padding: '4px 8px',
        color: 'var(--color-text-muted)',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    }
}

/**
 * 应用清空搜索按钮悬停效果
 */
export function applyClearSearchButtonHover(element: HTMLButtonElement, isHover: boolean) {
    if (isHover) {
        element.style.borderColor = 'rgba(59, 130, 246, 0.50)'
        element.style.color = '#D1D5DB'
    } else {
        element.style.borderColor = 'rgba(42, 42, 42, 0.70)'
        element.style.color = '#9CA3AF'
    }
}

/**
 * 生成主要操作按钮样式
 */
export function getPrimaryButtonStyles() {
    return {
        background: 'var(--gradient-primary)',
        color: 'var(--color-text-primary)',
        border: 'none',
        borderRadius: '12px',
        padding: '14px 28px',
        fontSize: 'var(--font-size-base)',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
        minWidth: '150px',
        whiteSpace: 'nowrap' as const
    }
}

/**
 * 应用主要操作按钮悬停效果
 */
export function applyPrimaryButtonHover(element: HTMLButtonElement, isHover: boolean) {
    if (isHover) {
        element.style.transform = 'translateY(-2px)'
        element.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)'
    } else {
        element.style.transform = 'translateY(0)'
        element.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)'
    }
} 