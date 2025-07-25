export type Language = 'zh' | 'en'

export const translations = {
    zh: {
        // 导航菜单
        nav: {
            home: '首页',
            weekly: '周刊',
            about: '关于',
            profile: '个人中心',
            bookmarks: '我的收藏',
            subscription: '我的订阅',
            settings: '设置'
        },

        // 按钮文字
        buttons: {
            login: '登录',
            register: '注册',
            subscribe: '立即订阅',
            learnMore: '了解更多',
            readMore: '阅读更多',
            viewAll: '查看全部',
            share: '分享',
            bookmark: '收藏',
            back: '返回',
            confirm: '确认',
            cancel: '取消',
            save: '保存',
            edit: '编辑',
            delete: '删除',
            search: '搜索',
            filter: '筛选',
            reset: '重置'
        },

        // 通用文字
        common: {
            loading: '加载中...',
            error: '出现错误',
            success: '操作成功',
            noData: '暂无数据',
            comingSoon: '敬请期待',
            more: '更多',
            less: '收起',
            all: '全部',
            latest: '最新',
            popular: '热门',
            recommended: '推荐'
        },

        // 首页内容
        home: {
            hero: {
                title: 'AI变现之路',
                subtitle: '掌握AI工具，开启变现新时代',
                description: '从零开始学习AI应用，打造个人品牌，实现技术变现',
                cta: '立即开始学习'
            },
            features: {
                title: '核心特色',
                aiTools: 'AI工具库',
                aiToolsDesc: '精选实用AI工具，提高工作效率',
                guidance: '变现指导',
                guidanceDesc: '从入门到精通的完整学习路径',
                community: '社区交流',
                communityDesc: '与同道中人分享经验和机会'
            },
            stats: {
                users: '用户',
                articles: '文章',
                tools: '工具',
                revenue: '变现案例'
            }
        },

        // 文章相关
        article: {
            author: '作者',
            publishedAt: '发布于',
            readTime: '阅读时长',
            views: '浏览量',
            likes: '点赞',
            comments: '评论',
            tags: '标签',
            relatedArticles: '相关文章',
            tableOfContents: '目录',
            shareArticle: '分享文章'
        },

        // 表单相关
        form: {
            email: '邮箱',
            password: '密码',
            confirmPassword: '确认密码',
            username: '用户名',
            nickname: '昵称',
            bio: '个人简介',
            rememberMe: '记住我',
            forgotPassword: '忘记密码？',
            noAccount: '还没有账号？',
            hasAccount: '已有账号？',
            agreeTo: '同意',
            termsOfService: '服务条款',
            privacyPolicy: '隐私政策'
        },

        // 会员订阅
        membership: {
            title: '会员订阅',
            benefits: '会员权益',
            unlimited: '无限制',
            exclusive: '专属内容',
            support: '优先支持',
            monthly: '月付',
            yearly: '年付',
            save: '节省',
            mostPopular: '最受欢迎',
            choosePlan: '选择套餐'
        },

        // 主题和语言
        theme: {
            light: '亮色主题',
            dark: '暗色主题',
            system: '跟随系统',
            switchTo: '切换到'
        },

        language: {
            chinese: '中文',
            english: 'English',
            switchTo: '切换到'
        },

        // 错误页面
        error: {
            404: '页面未找到',
            500: '服务器错误',
            networkError: '网络连接错误',
            retry: '重试',
            backHome: '返回首页'
        }
    },

    en: {
        // Navigation
        nav: {
            home: 'Home',
            weekly: 'Weekly',
            about: 'About',
            profile: 'Profile',
            bookmarks: 'Bookmarks',
            subscription: 'Subscription',
            settings: 'Settings'
        },

        // Buttons
        buttons: {
            login: 'Login',
            register: 'Register',
            subscribe: 'Subscribe Now',
            learnMore: 'Learn More',
            readMore: 'Read More',
            viewAll: 'View All',
            share: 'Share',
            bookmark: 'Bookmark',
            back: 'Back',
            confirm: 'Confirm',
            cancel: 'Cancel',
            save: 'Save',
            edit: 'Edit',
            delete: 'Delete',
            search: 'Search',
            filter: 'Filter',
            reset: 'Reset'
        },

        // Common
        common: {
            loading: 'Loading...',
            error: 'Error occurred',
            success: 'Success',
            noData: 'No data available',
            comingSoon: 'Coming Soon',
            more: 'More',
            less: 'Less',
            all: 'All',
            latest: 'Latest',
            popular: 'Popular',
            recommended: 'Recommended'
        },

        // Homepage
        home: {
            hero: {
                title: 'AI Monetization Journey',
                subtitle: 'Master AI Tools, Start Your Monetization Era',
                description: 'Learn AI applications from scratch, build personal brand, achieve tech monetization',
                cta: 'Start Learning Now'
            },
            features: {
                title: 'Core Features',
                aiTools: 'AI Tools Library',
                aiToolsDesc: 'Curated practical AI tools to boost productivity',
                guidance: 'Monetization Guide',
                guidanceDesc: 'Complete learning path from beginner to expert',
                community: 'Community',
                communityDesc: 'Share experiences and opportunities with peers'
            },
            stats: {
                users: 'Users',
                articles: 'Articles',
                tools: 'Tools',
                revenue: 'Success Stories'
            }
        },

        // Article
        article: {
            author: 'Author',
            publishedAt: 'Published',
            readTime: 'Read Time',
            views: 'Views',
            likes: 'Likes',
            comments: 'Comments',
            tags: 'Tags',
            relatedArticles: 'Related Articles',
            tableOfContents: 'Table of Contents',
            shareArticle: 'Share Article'
        },

        // Form
        form: {
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            username: 'Username',
            nickname: 'Nickname',
            bio: 'Bio',
            rememberMe: 'Remember me',
            forgotPassword: 'Forgot password?',
            noAccount: "Don't have an account?",
            hasAccount: 'Already have an account?',
            agreeTo: 'Agree to',
            termsOfService: 'Terms of Service',
            privacyPolicy: 'Privacy Policy'
        },

        // Membership
        membership: {
            title: 'Membership',
            benefits: 'Benefits',
            unlimited: 'Unlimited',
            exclusive: 'Exclusive Content',
            support: 'Priority Support',
            monthly: 'Monthly',
            yearly: 'Yearly',
            save: 'Save',
            mostPopular: 'Most Popular',
            choosePlan: 'Choose Plan'
        },

        // Theme
        theme: {
            light: 'Light Theme',
            dark: 'Dark Theme',
            system: 'System',
            switchTo: 'Switch to'
        },

        language: {
            chinese: '中文',
            english: 'English',
            switchTo: 'Switch to'
        },

        // Error
        error: {
            404: 'Page Not Found',
            500: 'Server Error',
            networkError: 'Network Error',
            retry: 'Retry',
            backHome: 'Back to Home'
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