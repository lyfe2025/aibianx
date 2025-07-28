/**
 * MainContentSection页面静态数据常量
 * 
 * 从MainContentSection组件中分离的数据配置，符合单一职责原则
 * 便于维护和复用
 */

// 筛选标签选项
export const FILTER_OPTIONS = ['最新', '热门', '免费'] as const

// 文章列表数据
export const ARTICLES_DATA = [
    {
        id: 1,
        title: '如何利用ChatGPT API搭建付费咨询机器人',
        image: '/images/articles/chatgpt-article.jpeg',
        tags: ['技术指南', '实战案例'],
        views: '1.2k',
        readTime: '8分钟'
    },
    {
        id: 2,
        title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
        image: '/images/articles/midjourney-article.jpeg',
        tags: ['变现心得', 'AI工具'],
        views: '2.4k',
        readTime: '12分钟'
    },
    {
        id: 3,
        title: '从入门到精通：如何用GPT-4打造高转化的AI文案系统',
        image: '/images/articles/gpt4-article.jpeg',
        tags: ['技术指南', 'AI工具'],
        views: '3.6k',
        readTime: '15分钟'
    }
]

// "为什么选择我们"特性数据
export const WHY_CHOOSE_FEATURES = [
    {
        id: 'high-quality-content',
        title: '高质量内容',
        description: '每周精心筛选，确保只提供最有价值的AI变现知识',
        icon: 'community-advantage-new',
        iconColor: 'var(--color-primary-blue)'
    },
    {
        id: 'practical-experience',
        title: '实战经验',
        description: '来自实际变现过万的案例分析，切实可行的策略',
        icon: 'community-support-new',
        iconColor: 'var(--color-primary-blue)'
    },
    {
        id: 'continuous-update',
        title: '持续更新',
        description: '紧跟AI发展前沿，第一时间更新最新变现机会',
        icon: 'continuous-update-new',
        iconColor: 'var(--color-primary-blue)'
    }
] as const

// 用户见证数据
export const USER_TESTIMONIAL = {
    quote: '通过AI变现之路的指导，我在两个月内实现了月入过万的目标，资源非常实用！',
    author: '张先生',
    role: '自由职业者',
    avatar: '/images/avatars/user-zhang-zhichuang.svg'
} as const

// 邮件订阅配置
export const EMAIL_SUBSCRIPTION_CONFIG = {
    title: '不要错过任何机会',
    description: '订阅后获取：每周AI变现趋势 + 独家案例分析',
    placeholder: '输入您的邮箱地址',
    buttonText: '立即订阅',
    userCount: '5000+ 用户',
    userCountDescription: '已加入社区'
} as const

// 页面文案常量
export const MAIN_CONTENT_TEXT = {
    whyChooseTitle: '为什么选择我们？',
    userTestimonialTitle: '他们都在用',
    viewMoreButtonText: '查看更多'
} as const 