/**
 * About页面静态数据常量
 * 
 * 从about/page.tsx中分离的数据配置，符合单一职责原则
 * 便于维护和复用
 */

// 默认会员套餐数据
export const DEFAULT_MEMBERSHIP_PLAN = {
    name: '年度会员',
    price: 299,
    originalPrice: 399,
    period: '年',
    features: [
        '200+ AI变现教程和指南',
        '每周更新实战案例',
        '专属社区和导师指导',
        'AI工具专属优惠'
    ]
}

// 平台统计数据
export const PLATFORM_STATS = [
    { value: '30万+', label: '月活跃用户' },
    { value: '500+', label: '精选案例' },
    { value: '120+', label: '周刊期数' },
    { value: '50+', label: '合作伙伴' }
] as const

// 使命卡片数据
export const MISSION_CARDS = [
    {
        id: 'share-knowledge',
        title: '分享知识',
        description: '汇集AI领域最前沿的变现技巧与商业模式，为读者提供实用且深入的AI应用知识，帮助大家快速掌握AI技术的商业化路径。',
        icon: 'share-knowledge-feature',
        color: 'var(--color-primary-blue)',
        backgroundColor: 'rgba(59, 130, 246, 0.15)'
    },
    {
        id: 'drive-innovation',
        title: '推动创新',
        description: '激发创作者和企业的创新思维，探索AI与各行业的融合可能性，推动新兴商业模式的孵化与发展，创造更多商业价值。',
        icon: 'drive-innovation-new',
        color: 'var(--color-success)',
        backgroundColor: 'rgba(34, 197, 94, 0.15)'
    },
    {
        id: 'enable-monetization',
        title: '赋能变现',
        description: '提供可落地的AI变现方法与工具，帮助个人创作者和企业挖掘AI技术的盈利潜力，实现技术到财富的高效转化。',
        icon: 'enable-monetization-new',
        color: 'var(--color-orange)',
        backgroundColor: 'rgba(251, 146, 60, 0.15)'
    }
] as const

// 选择理由卡片数据
export const WHY_CHOOSE_CARDS = [
    {
        id: 'practical-experience',
        title: '实战经验',
        description: '所有内容都基于实际变现案例和经验，而非纯理论。我们的团队成员都有丰富的AI变现实战经历，能够提供有价值的指导。',
        icon: 'practical-experience-new',
        color: 'var(--color-primary-blue)',
        backgroundColor: 'rgba(59, 130, 246, 0.12)'
    },
    {
        id: 'continuous-update',
        title: '持续更新',
        description: '我们每周更新最新的AI工具、变现策略和成功案例，确保您始终站在行业前沿，把握最新的AI变现机会。',
        icon: 'continuous-update-new',
        color: 'var(--color-success)',
        backgroundColor: 'rgba(34, 197, 94, 0.12)'
    },
    {
        id: 'community-support',
        title: '社区支持',
        description: '加入我们活跃的会员社区，与其他AI变现实践者交流经验，结识志同道合的伙伴，共同成长。',
        icon: 'community-advantage-new',
        color: 'var(--color-primary-purple)',
        backgroundColor: 'rgba(168, 85, 247, 0.12)'
    }
] as const

// 联系表单初始值
export const CONTACT_FORM_INITIAL = {
    name: '',
    email: '',
    subject: '',
    message: ''
} as const

// 页面文案常量
export const ABOUT_CONTENT = {
    pageTitle: '关于AI变现之路',
    pageSubtitle: '我们致力于探索AI技术的商业价值，帮助创作者、开发者和企业 通过人工智能技术实现商业创新与价值转化',
    missionTitle: '我们的使命',
    whyChooseTitle: '为什么选择我们',
    whyChooseSubtitle: '在AI快速发展的时代，我们提供的不仅是知识，更是实用的变现路径和专业的指导支持',
    statsTitle: '平台数据',
    contactTitle: '联系我们',
    contactSubtitle: '有任何问题或建议？我们很乐意听到您的声音',
    submitButtonText: '提交信息'
} as const 