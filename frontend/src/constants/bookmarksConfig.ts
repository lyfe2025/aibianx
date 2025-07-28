/**
 * 收藏页面配置常量
 * 
 * 包含统计数据、书签数据、过滤器配置、样式常量等
 */

// 收藏统计数据
export const COLLECTION_STATS = [
    {
        title: '文章',
        count: '12',
        icon: 'article-stat-icon',
        gradient: 'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)'
    },
    {
        title: '教程',
        count: '8',
        icon: 'tutorial-stat-icon',
        gradient: 'linear-gradient(90deg, #22C55E 0%, #34D399 100%)'
    },
    {
        title: 'AI工具',
        count: '6',
        icon: 'ai-tool-stat-icon',
        gradient: 'linear-gradient(90deg, #A855F7 0%, #EC4899 100%)'
    },
    {
        title: '案例',
        count: '2',
        icon: 'case-stat-icon',
        gradient: 'linear-gradient(90deg, #FB923C 0%, #F59E0B 100%)'
    }
]

// 收藏的内容数据
export const BOOKMARKED_ITEMS = [
    {
        title: 'Midjourney高级提示词大全',
        category: 'AI工具',
        image: '/images/bookmark-midjourney.jpeg',
        collectedAt: '收藏于 3 天前'
    },
    {
        title: 'AI辅助内容创作工作流',
        category: '教程',
        image: '/images/bookmark-ai-workflow.jpeg',
        collectedAt: '收藏于 3 天前'
    },
    {
        title: 'GPT-4高级应用案例',
        category: '案例',
        image: '/images/bookmark-gpt4-cases.jpeg',
        collectedAt: '收藏于 3 天前'
    },
    {
        title: 'AI变现新思路：垂直领域应用',
        category: '文章',
        image: '/images/bookmark-ai-monetization.jpeg',
        collectedAt: '收藏于 3 天前'
    },
    {
        title: 'ChatGPT高效提示词技巧',
        category: 'AI工具',
        image: '/images/bookmark-chatgpt-tips.jpeg',
        collectedAt: '收藏于 5 天前'
    },
    {
        title: 'AI绘画入门到精通课程',
        category: '教程',
        image: '/images/bookmark-ai-art-course.jpeg',
        collectedAt: '收藏于 7 天前'
    },
    {
        title: '人工智能创业商业模式分析',
        category: '文章',
        image: '/images/bookmark-ai-business.jpeg',
        collectedAt: '收藏于 10 天前'
    },
    {
        title: 'AI数据分析工作流实战',
        category: '教程',
        image: '/images/bookmark-ai-data-analysis.jpeg',
        collectedAt: '收藏于 12 天前'
    }
]

// 过滤器配置
export const FILTERS = [
    { label: '全部', icon: 'dropdown-arrow' },
    { label: '最近收藏', icon: 'dropdown-arrow' },
    { label: '筛选', icon: 'filter-icon', isFilterIcon: true }
]

// 视图模式配置
export const VIEW_MODES = {
    GRID: 'grid' as const,
    LIST: 'list' as const
}

export type ViewMode = typeof VIEW_MODES[keyof typeof VIEW_MODES]

// 样式配置
export const BOOKMARKS_STYLES = {
    page: {
        padding: '32px 40px',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    statsCard: {
        background: 'rgba(26, 26, 26, 0.30)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(42, 42, 42, 0.70)',
        borderRadius: '12px',
        padding: '21px'
    },
    bookmarkCard: {
        background: 'rgba(26, 26, 26, 0.30)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(42, 42, 42, 0.70)',
        borderRadius: '12px'
    },
    filterButton: {
        background: 'rgba(26, 26, 26, 0.60)',
        border: '1px solid rgba(42, 42, 42, 0.70)',
        borderRadius: '8px',
        padding: '9px 17px'
    },
    paginationButton: {
        background: 'rgba(26, 26, 26, 0.30)',
        border: '1px solid rgba(42, 42, 42, 0.70)',
        borderRadius: '6px',
        width: '32px',
        height: '32px'
    }
} as const

// 页面配置
export const PAGE_CONFIG = {
    title: '我的收藏',
    totalItems: 28,
    searchPlaceholder: '搜索收藏内容',
    batchManageText: '批量管理',
    statsTitle: '收藏统计',
    statsDescription: '当前共有 28 个收藏项目'
} 