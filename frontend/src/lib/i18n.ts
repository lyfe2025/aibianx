export type Language = 'zh' | 'en'

export const translations = {
    zh: {
        nav: {
            home: '首页',
            weekly: '周刊',
            about: '关于'
        },
        buttons: {
            login: '登录',
            register: '注册',
            subscribe: '立即订阅',
            readMore: '阅读更多',
            viewAll: '查看全部',
            download: '下载'
        },
        common: {
            loading: '加载中...',
            search: '搜索',
            more: '更多',
            date: '日期',
            author: '作者',
            tags: '标签',
            views: '浏览量',
            likes: '点赞'
        },
        hero: {
            title: 'AI变现之路',
            subtitle: '探索人工智能商业化的无限可能',
            description: '从技术到商业，从创意到现实，我们为您提供最前沿的AI变现策略和实战经验'
        },
        sections: {
            featuredArticles: '精选文章',
            latestNews: '最新资讯',
            resources: '免费资源',
            caseStudies: '成功案例'
        },
        footer: {
            copyright: '© 2024 AI变现之路. 保留所有权利.',
            privacy: '隐私政策',
            terms: '服务条款',
            contact: '联系我们'
        }
    },
    en: {
        nav: {
            home: 'Home',
            weekly: 'Weekly',
            about: 'About'
        },
        buttons: {
            login: 'Login',
            register: 'Register',
            subscribe: 'Subscribe Now',
            readMore: 'Read More',
            viewAll: 'View All',
            download: 'Download'
        },
        common: {
            loading: 'Loading...',
            search: 'Search',
            more: 'More',
            date: 'Date',
            author: 'Author',
            tags: 'Tags',
            views: 'Views',
            likes: 'Likes'
        },
        hero: {
            title: 'AI Monetization Path',
            subtitle: 'Explore Unlimited AI Business Opportunities',
            description: 'From technology to business, from ideas to reality, we provide cutting-edge AI monetization strategies and practical experience'
        },
        sections: {
            featuredArticles: 'Featured Articles',
            latestNews: 'Latest News',
            resources: 'Free Resources',
            caseStudies: 'Case Studies'
        },
        footer: {
            copyright: '© 2024 AI Monetization Path. All rights reserved.',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            contact: 'Contact Us'
        }
    }
}

export const getTranslation = (language: Language, key: string): string => {
    const keys = key.split('.')
    let translation: any = translations[language]

    for (const k of keys) {
        if (translation && typeof translation === 'object' && k in translation) {
            translation = translation[k]
        } else {
            // 如果找不到翻译，回退到中文
            translation = translations.zh
            for (const fallbackKey of keys) {
                if (translation && typeof translation === 'object' && fallbackKey in translation) {
                    translation = translation[fallbackKey]
                } else {
                    return key // 如果中文也找不到，返回key本身
                }
            }
            break
        }
    }

    return typeof translation === 'string' ? translation : key
} 