/**
 * Weekly页面配置数据
 * 
 * 包含模拟文章数据、筛选选项、页面常量等
 * 分离数据与逻辑，提升维护性和可读性
 */

import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

/**
 * 模拟文章数据
 */
export const MOCK_ARTICLES: ArticleCardData[] = [
    {
        id: 'midjourney-monetization-guide',
        title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
        excerpt: '在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。',
        coverImage: '/images/articles/midjourney-guide.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2023-11-22',
        readingTime: '12分钟',
        viewCount: '2.4k',
        tags: ['变现心得', 'AI工具'],
        slug: 'midjourney-monetization-guide',
        isPremium: false
    },
    {
        id: '1',
        title: '如何利用ChatGPT API搭建付费咨询机器人，月入过万的实战指南',
        excerpt: '从零开始教你搭建一个基于ChatGPT API的智能咨询机器人，包含完整的技术方案、商业模式设计和变现策略，助你实现AI创业的第一桶金。',
        coverImage: '/images/articles/chatgpt-bot.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-12-10',
        readingTime: '15分钟',
        viewCount: '2.4k',
        tags: ['技术指南', 'AI工具'],
        slug: 'chatgpt-api-consulting-bot',
        isPremium: false
    },
    {
        id: '2',
        title: 'GPT-4文案系统搭建：打造高转化的AI内容营销机器',
        excerpt: '揭秘如何构建基于GPT-4的自动化文案系统，涵盖prompt工程、内容策略、转化优化等核心技能。',
        coverImage: '/images/articles/gpt4-copywriting.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-12-06',
        readingTime: '18分钟',
        viewCount: '1.8k',
        tags: ['技术指南', '前沿技术'],
        slug: 'gpt4-copywriting-system',
        isPremium: false
    },
    {
        id: '3',
        title: 'Midjourney变现完整指南：从新手到月入万元的实战路径',
        excerpt: '详细拆解Midjourney的商业变现模式，包含接单技巧、定价策略、客户开发等实用方法，适合零基础用户。',
        coverImage: '/images/articles/midjourney-guide.svg',
        author: {
            name: '张先生',
            avatar: '/images/avatars/user-zhang-zhichuang.svg'
        },
        publishedAt: '2024-12-04',
        readingTime: '12分钟',
        viewCount: '3.1k',
        tags: ['AI工具', '实战案例'],
        slug: 'midjourney-monetization-guide',
        isPremium: false
    },
    {
        id: '4',
        title: '无代码AI应用开发：零基础打造你的第一个AI产品',
        excerpt: '使用无代码平台快速构建AI应用的完整教程，包含工具选择、产品设计、部署上线等关键步骤。',
        coverImage: '/images/articles/nocode-platform.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-12-02',
        readingTime: '14分钟',
        viewCount: '1.5k',
        tags: ['技术指南', '前沿技术'],
        slug: 'nocode-ai-development',
        isPremium: false
    },
    {
        id: '5',
        title: 'AI内容自动化：搭建智能内容生产流水线',
        excerpt: '学会整合多个AI工具，构建高效的内容自动化生产流程，从创意生成到发布全流程自动化。',
        coverImage: '/images/articles/ai-content-automation.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-11-28',
        readingTime: '16分钟',
        viewCount: '2.2k',
        tags: ['增长黑客', 'AI工具'],
        slug: 'ai-content-automation',
        isPremium: true
    },
    {
        id: '6',
        title: 'AI辅助创业：从想法到产品的完整路径',
        excerpt: '利用AI工具降低创业门槛，包括市场调研、产品设计、营销推广等各个环节的AI应用实践。',
        coverImage: '/images/articles/ai-assistant.svg',
        author: {
            name: '张先生',
            avatar: '/images/avatars/user-zhang-zhichuang.svg'
        },
        publishedAt: '2024-11-25',
        readingTime: '20分钟',
        viewCount: '1.9k',
        tags: ['实战案例', '增长黑客'],
        slug: 'ai-assisted-entrepreneurship',
        isPremium: true
    },
    {
        id: '7',
        title: 'AI艺术变现全攻略：数字艺术的商业化之路',
        excerpt: '深入探讨AI艺术创作的各种变现模式，从NFT销售到定制服务，帮你找到适合的商业路径。',
        coverImage: '/images/articles/ai-art-guide.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-11-22',
        readingTime: '13分钟',
        viewCount: '2.8k',
        tags: ['变现心得', 'AI工具'],
        slug: 'ai-art-monetization',
        isPremium: false
    },
    {
        id: '8',
        title: 'ChatGPT私域运营：AI驱动的用户增长策略',
        excerpt: '运用ChatGPT优化私域运营流程，提升用户留存和转化率，打造高效的AI驱动增长体系。',
        coverImage: '/images/articles/ai-mcn.svg',
        author: {
            name: '张先生',
            avatar: '/images/avatars/user-zhang-zhichuang.svg'
        },
        publishedAt: '2024-11-20',
        readingTime: '17分钟',
        viewCount: '1.7k',
        tags: ['增长黑客', '技术指南'],
        slug: 'chatgpt-private-domain',
        isPremium: true
    }
]

/**
 * 筛选选项配置
 */
export const FILTER_OPTIONS = [
    {
        id: 'latest',
        label: '最新发布',
        count: 12,
        colors: {
            background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
            text: '#FFFFFF'
        }
    },
    {
        id: 'tech-guide',
        label: '技术指南',
        count: 5,
        colors: {
            background: 'rgba(12, 30, 71, 0.80)',
            border: 'rgba(59, 130, 246, 0.40)',
            text: '#3B82F6'
        }
    },
    {
        id: 'monetization',
        label: '变现心得',
        count: 3,
        colors: {
            background: 'rgba(58, 23, 8, 0.80)',
            border: 'rgba(249, 115, 22, 0.40)',
            text: '#F97316'
        }
    },
    {
        id: 'case-study',
        label: '实战案例',
        count: 4,
        colors: {
            background: 'rgba(12, 40, 23, 0.80)',
            border: 'rgba(16, 185, 129, 0.40)',
            text: '#10B981'
        }
    },
    {
        id: 'ai-tools',
        label: 'AI工具',
        count: 7,
        colors: {
            background: 'rgba(30, 12, 71, 0.80)',
            border: 'rgba(139, 92, 246, 0.40)',
            text: '#8B5CF6'
        }
    },
    {
        id: 'trending',
        label: '前沿技术',
        count: 3,
        colors: {
            background: 'rgba(30, 58, 138, 0.80)',
            border: 'rgba(96, 165, 250, 0.40)',
            text: '#60A5FA'
        }
    },
    {
        id: 'hot',
        label: '热门趋势',
        count: 12,
        colors: {
            background: 'rgba(127, 29, 29, 0.80)',
            border: 'rgba(252, 165, 165, 0.40)',
            text: '#FCA5A5'
        }
    }
]

/**
 * 页面配置常量
 */
export const PAGE_CONFIG = {
    // 分页配置
    itemsPerPage: 6,

    // 搜索配置
    searchPlaceholder: '搜索文章、工具、案例...',
    searchDelay: 300,

    // 页面标题
    title: '精选AI变现周刊',
    subtitle: '每周精选AI变现干货，助你快速实现财务自由',

    // 搜索建议
    searchSuggestions: ['ChatGPT', 'AI工具', 'Midjourney', '变现', 'GPT-4', '无代码'],

    // 空状态文案
    emptyState: {
        search: {
            title: '未找到相关内容',
            description: '没有找到包含搜索词的内容',
            actionText: '查看全部文章'
        },
        category: {
            title: '该分类暂无文章',
            description: '敬请期待更多精彩内容',
            actionText: '查看最新文章'
        }
    }
} as const

/**
 * 样式配置常量
 */
export const STYLES_CONFIG = {
    // 容器样式
    container: {
        paddingTop: '80px',
        paddingBottom: '80px'
    },

    // 搜索容器
    searchContainer: {
        maxWidth: '800px'
    },

    // 文章网格
    articlesGrid: {
        desktop: 'repeat(3, 1fr)',
        tablet: 'repeat(2, 1fr)',
        mobile: '1fr',
        gap: '24px',
        maxWidth: '1375px'
    },

    // 间距配置
    spacing: {
        sectionGap: '60px',
        searchFilterGap: 'var(--spacing-6)',
        gridGap: '24px',
        paginationGap: '48px'
    }
} as const 