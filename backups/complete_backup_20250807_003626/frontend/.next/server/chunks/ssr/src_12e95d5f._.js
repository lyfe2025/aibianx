module.exports = {

"[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useModalStore": ()=>useModalStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
'use client';
;
const useModalStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        type: null,
        data: {},
        isOpen: false,
        openModal: (type, data = {})=>{
            set({
                type,
                data,
                isOpen: true
            });
        },
        closeModal: ()=>{
            set({
                type: null,
                data: {},
                isOpen: false
            });
        }
    }));
}),
"[project]/src/stores/userStore.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useUserStore": ()=>useUserStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
'use client';
;
;
const useUserStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: (userData)=>{
            set({
                user: userData,
                isAuthenticated: true,
                isLoading: false
            });
        },
        logout: ()=>{
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });
        },
        updateUser: (userData)=>{
            const currentUser = get().user;
            if (currentUser) {
                set({
                    user: {
                        ...currentUser,
                        ...userData
                    }
                });
            }
        },
        upgradeMembership: (type, expiry)=>{
            const currentUser = get().user;
            if (currentUser) {
                set({
                    user: {
                        ...currentUser,
                        membership: type,
                        membershipExpiry: expiry
                    }
                });
            }
        },
        checkMembershipStatus: ()=>{
            const user = get().user;
            if (!user || !user.membership || user.membership === 'free') {
                return false;
            }
            if (user.membershipExpiry) {
                const expiryDate = new Date(user.membershipExpiry);
                const now = new Date();
                return expiryDate > now;
            }
            return false;
        }
    }), {
    name: 'user-storage',
    partialize: (state)=>({
            user: state.user,
            isAuthenticated: state.isAuthenticated
        })
}));
}),
"[project]/src/stores/themeStore.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useThemeStore": ()=>useThemeStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useThemeStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        theme: 'dark',
        toggleTheme: ()=>{
            const currentTheme = get().theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            set({
                theme: newTheme
            });
            // 应用主题到document
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        setTheme: (theme)=>{
            set({
                theme
            });
            // 应用主题到document
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }
    }), {
    name: 'theme-storage',
    onRehydrateStorage: ()=>(state)=>{
            // 水合后应用主题
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }
}));
}),
"[project]/src/stores/countdownStore.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "startGlobalCountdown": ()=>startGlobalCountdown,
    "stopGlobalCountdown": ()=>stopGlobalCountdown,
    "useCountdownStore": ()=>useCountdownStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
'use client';
;
;
// 默认倒计时：3天后
const getDefaultTargetDate = ()=>{
    const now = new Date();
    return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
};
const useCountdownStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        timeLeft: {
            days: 2,
            hours: 23,
            minutes: 59,
            seconds: 19
        },
        isActive: true,
        targetDate: null,
        initializeCountdown: (targetDate)=>{
            const target = targetDate || getDefaultTargetDate();
            // 确保 target 是有效的 Date 对象
            const validTarget = target instanceof Date && !isNaN(target.getTime()) ? target : getDefaultTargetDate();
            set({
                targetDate: validTarget,
                isActive: true
            });
            // 立即计算一次时间
            get().updateCountdown();
        },
        updateCountdown: ()=>{
            const { targetDate } = get();
            if (!targetDate) return;
            // 确保 targetDate 是 Date 对象，如果是字符串则转换为 Date
            const target = targetDate instanceof Date ? targetDate : new Date(targetDate);
            // 验证 Date 对象的有效性
            if (isNaN(target.getTime())) {
                console.warn('Invalid target date, resetting countdown');
                get().resetCountdown();
                return;
            }
            const now = new Date().getTime();
            const targetTime = target.getTime();
            const difference = targetTime - now;
            if (difference <= 0) {
                // 倒计时结束
                set({
                    timeLeft: {
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    },
                    isActive: false
                });
                return;
            }
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(difference % (1000 * 60) / 1000);
            set({
                timeLeft: {
                    days,
                    hours,
                    minutes,
                    seconds
                }
            });
        },
        resetCountdown: ()=>{
            const targetDate = getDefaultTargetDate();
            set({
                targetDate,
                isActive: true
            });
            get().updateCountdown();
        }
    }), {
    name: 'countdown-storage',
    partialize: (state)=>({
            targetDate: state.targetDate,
            isActive: state.isActive
        }),
    // 自定义存储配置，正确处理 Date 对象
    storage: {
        getItem: (name)=>{
            const str = localStorage.getItem(name);
            if (!str) return null;
            try {
                const data = JSON.parse(str);
                // 如果有 targetDate 字段，将其转换回 Date 对象
                if (data.state?.targetDate) {
                    data.state.targetDate = new Date(data.state.targetDate);
                }
                return data;
            } catch (error) {
                console.warn('Failed to parse countdown storage:', error);
                return null;
            }
        },
        setItem: (name, value)=>{
            try {
                localStorage.setItem(name, JSON.stringify(value));
            } catch (error) {
                console.warn('Failed to save countdown storage:', error);
            }
        },
        removeItem: (name)=>localStorage.removeItem(name)
    }
}));
// 全局倒计时定时器
let countdownInterval = null;
const startGlobalCountdown = ()=>{
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    const store = useCountdownStore.getState();
    // 如果没有目标日期或目标日期无效，重新初始化
    if (!store.targetDate || typeof store.targetDate === 'string' || store.targetDate instanceof Date && isNaN(store.targetDate.getTime())) {
        store.initializeCountdown();
    }
    countdownInterval = setInterval(()=>{
        const currentStore = useCountdownStore.getState();
        if (currentStore.isActive) {
            currentStore.updateCountdown();
        }
    }, 1000);
};
const stopGlobalCountdown = ()=>{
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
};
}),
"[project]/src/stores/languageStore.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useLanguageStore": ()=>useLanguageStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useLanguageStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        language: 'zh',
        toggleLanguage: ()=>{
            const currentLanguage = get().language;
            const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
            set({
                language: newLanguage
            });
        },
        setLanguage: (language)=>{
            set({
                language
            });
        }
    }), {
    name: 'language-storage'
}));
}),
"[project]/src/stores/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

// 状态管理统一导出
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$userStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/userStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/themeStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$countdownStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/countdownStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$languageStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/languageStore.ts [app-ssr] (ecmascript)");
;
;
;
;
;
}),
"[project]/src/stores/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$modalStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/modalStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$userStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/userStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$themeStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/themeStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$countdownStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/countdownStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$languageStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/languageStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-ssr] (ecmascript) <locals>");
}),
"[project]/src/constants/weeklyConfig.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Weekly页面配置数据
 * 
 * 包含模拟文章数据、筛选选项、页面常量等
 * 分离数据与逻辑，提升维护性和可读性
 */ __turbopack_context__.s({
    "FILTER_OPTIONS": ()=>FILTER_OPTIONS,
    "MOCK_ARTICLES": ()=>MOCK_ARTICLES,
    "PAGE_CONFIG": ()=>PAGE_CONFIG,
    "STYLES_CONFIG": ()=>STYLES_CONFIG
});
const MOCK_ARTICLES = [
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
        tags: [
            '变现心得',
            'AI工具'
        ],
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
        tags: [
            '技术指南',
            'AI工具'
        ],
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
        tags: [
            '技术指南',
            '前沿技术'
        ],
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
        tags: [
            'AI工具',
            '实战案例'
        ],
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
        tags: [
            '技术指南',
            '前沿技术'
        ],
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
        tags: [
            '增长黑客',
            'AI工具'
        ],
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
        tags: [
            '实战案例',
            '增长黑客'
        ],
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
        tags: [
            '变现心得',
            'AI工具'
        ],
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
        tags: [
            '增长黑客',
            '技术指南'
        ],
        slug: 'chatgpt-private-domain',
        isPremium: true
    }
];
const FILTER_OPTIONS = [
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
];
const PAGE_CONFIG = {
    // 分页配置
    itemsPerPage: 6,
    // 搜索配置
    searchPlaceholder: '搜索文章、工具、案例...',
    searchDelay: 300,
    // 页面标题
    title: '精选AI变现周刊',
    subtitle: '每周精选AI变现干货，助你快速实现财务自由',
    // 搜索建议
    searchSuggestions: [
        'ChatGPT',
        'AI工具',
        'Midjourney',
        '变现',
        'GPT-4',
        '无代码'
    ],
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
};
const STYLES_CONFIG = {
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
};
}),
"[project]/src/constants/headerConfig.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * AppHeader 组件配置数据
 * 
 * 包含导航菜单配置、样式常量、界面文本等
 * 分离数据与逻辑，提升维护性和可读性
 */ /**
 * 导航菜单配置 - 移动端优化版
 * 
 * 更新说明：
 * - 将"首页"替换为"发现" - 专注免费资源获取和邮箱订阅转化
 * - 保留"周刊" - 付费内容平台和会员升级转化
 * - 将"关于"替换为"个人中心" - 用户价值中心和会员管理
 */ __turbopack_context__.s({
    "BREAKPOINTS": ()=>BREAKPOINTS,
    "HEADER_BACKGROUND": ()=>HEADER_BACKGROUND,
    "HEADER_STYLES": ()=>HEADER_STYLES,
    "MOBILE_MENU_OVERLAY": ()=>MOBILE_MENU_OVERLAY,
    "NAVIGATION_MENU": ()=>NAVIGATION_MENU,
    "SCROLL_CONFIG": ()=>SCROLL_CONFIG
});
const NAVIGATION_MENU = [
    {
        id: 'discover',
        href: '/',
        translationKey: 'nav.discover',
        exactMatch: true
    },
    {
        id: 'weekly',
        href: '/weekly',
        translationKey: 'nav.weekly',
        exactMatch: false
    },
    {
        id: 'about',
        href: '/about',
        translationKey: 'nav.about',
        exactMatch: true
    }
];
const HEADER_STYLES = {
    // 基础尺寸
    heights: {
        desktop: '98px',
        mobile: '64px'
    },
    // 容器配置
    container: {
        maxWidth: '1440px',
        padding: {
            desktop: '27.5px 32px',
            mobile: '10px 16px'
        }
    },
    // Logo配置
    logo: {
        size: 32,
        borderRadius: '4px',
        gap: '8px'
    },
    // 导航样式
    navigation: {
        gap: {
            desktop: '20px',
            medium: '16px',
            small: '12px'
        },
        activeIndicator: {
            width: '28px',
            height: '2px',
            gradient: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
            borderRadius: '1px'
        }
    },
    // 按钮样式
    buttons: {
        icon: {
            size: '40px',
            borderRadius: '8px',
            padding: '10px'
        },
        login: {
            height: '40px',
            padding: '10px 20px',
            fontSize: '13.33px',
            borderRadius: '8px'
        },
        mobile: {
            size: '48px',
            padding: '12px'
        }
    },
    // 移动端菜单
    mobileMenu: {
        width: '280px',
        padding: '98px 24px 32px',
        navigationGap: '24px',
        buttonGap: '16px'
    },
    // 动画配置
    transitions: {
        normal: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        scroll: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fast: 'all 0.3s ease'
    },
    // 汉堡菜单图标
    hamburger: {
        size: {
            width: '20px',
            height: '16px'
        },
        line: {
            height: '2px',
            borderRadius: '1px',
            background: '#FFFFFF'
        }
    }
};
const SCROLL_CONFIG = {
    threshold: 98,
    hideDelay: 300,
    routeTransitionDelay: 300 // 路由切换延迟
};
const HEADER_BACKGROUND = {
    scrolled: {
        background: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(42, 42, 42, 0.15)'
    },
    transparent: {
        background: 'transparent',
        backdropFilter: 'none',
        borderBottom: '1px solid rgba(42, 42, 42, 0)'
    }
};
const MOBILE_MENU_OVERLAY = {
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)'
};
const BREAKPOINTS = {
    mobile: 767,
    tablet: 768,
    desktop: 1024,
    large: 1200
};
}),
"[project]/src/constants/bookmarksConfig.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * 收藏页面配置常量
 * 
 * 包含统计数据、书签数据、过滤器配置、样式常量等
 */ // 收藏统计数据
__turbopack_context__.s({
    "BOOKMARKED_ITEMS": ()=>BOOKMARKED_ITEMS,
    "BOOKMARKS_STYLES": ()=>BOOKMARKS_STYLES,
    "COLLECTION_STATS": ()=>COLLECTION_STATS,
    "FILTERS": ()=>FILTERS,
    "PAGE_CONFIG": ()=>PAGE_CONFIG,
    "VIEW_MODES": ()=>VIEW_MODES
});
const COLLECTION_STATS = [
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
];
const BOOKMARKED_ITEMS = [
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
];
const FILTERS = [
    {
        label: '全部',
        icon: 'dropdown-arrow'
    },
    {
        label: '最近收藏',
        icon: 'dropdown-arrow'
    },
    {
        label: '筛选',
        icon: 'filter-icon',
        isFilterIcon: true
    }
];
const VIEW_MODES = {
    GRID: 'grid',
    LIST: 'list'
};
const BOOKMARKS_STYLES = {
    page: {
        padding: '32px 8px',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    statsCard: {
        background: 'var(--color-bg-secondary)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '12px',
        padding: '21px'
    },
    bookmarkCard: {
        background: 'var(--color-bg-secondary)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '12px'
    },
    filterButton: {
        background: 'var(--color-bg-glass)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '8px',
        padding: '9px 17px'
    },
    paginationButton: {
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '6px',
        width: '32px',
        height: '32px'
    }
};
const PAGE_CONFIG = {
    title: '我的收藏',
    totalItems: 28,
    searchPlaceholder: '搜索收藏内容',
    batchManageText: '批量管理',
    statsTitle: '收藏统计',
    statsDescription: '当前共有 28 个收藏项目'
};
}),
"[project]/src/constants/settingsConfig.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * 设置页面配置常量
 * 
 * 包含标签页配置、设备数据、样式常量等
 */ // 标签页配置
__turbopack_context__.s({
    "AVATAR_CONFIG": ()=>AVATAR_CONFIG,
    "INITIAL_FORM_DATA": ()=>INITIAL_FORM_DATA,
    "INITIAL_SECURITY_DATA": ()=>INITIAL_SECURITY_DATA,
    "PASSWORD_CONFIG": ()=>PASSWORD_CONFIG,
    "SECURITY_TIPS": ()=>SECURITY_TIPS,
    "SETTINGS_STYLES": ()=>SETTINGS_STYLES,
    "SETTINGS_TABS": ()=>SETTINGS_TABS
});
const SETTINGS_TABS = [
    {
        id: 'profile',
        label: '个人信息',
        key: 'profile'
    },
    {
        id: 'security',
        label: '密码安全',
        key: 'security'
    }
];
const INITIAL_FORM_DATA = {
    username: '张智创',
    phone: '138****5678',
    email: 'zhang****@example.com',
    bio: '介绍一下自己...'
};
const INITIAL_SECURITY_DATA = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    devices: [
        {
            id: 1,
            name: 'Chrome (macOS)',
            location: '北京',
            lastActive: '当前设备',
            isActive: true,
            icon: 'device-desktop'
        },
        {
            id: 2,
            name: 'iPhone App',
            location: '上海',
            lastActive: '3天前',
            isActive: false,
            icon: 'device-mobile'
        },
        {
            id: 3,
            name: 'Edge (Windows)',
            location: '深圳',
            lastActive: '1周前',
            isActive: false,
            icon: 'device-desktop'
        }
    ]
};
const SECURITY_TIPS = [
    '定期更新密码，使用强密码组合',
    '启用两步验证提高账户安全性',
    '及时清理不使用的登录设备',
    '不在公共场所或他人设备上登录'
];
const SETTINGS_STYLES = {
    page: {
        padding: '32px 8px',
        maxWidth: '1440px',
        margin: '0 auto'
    },
    card: {
        background: 'var(--color-bg-secondary)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '12px'
    },
    sectionCard: {
        background: 'var(--color-accent-primary)',
        borderRadius: '12px',
        padding: '24px'
    },
    formCard: {
        background: 'var(--color-bg-secondary)',
        borderRadius: '12px',
        padding: '32px',
        margin: '0 48px',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-border-primary)'
    },
    deviceItem: {
        background: 'var(--color-accent-primary)',
        borderRadius: '8px',
        padding: '16px'
    }
};
const AVATAR_CONFIG = {
    src: '/images/avatars/user-zhang-zhichuang.svg',
    alt: '张智创',
    supportedFormats: 'JPG、PNG',
    maxFileSize: '2MB'
};
const PASSWORD_CONFIG = {
    minLength: 8,
    helperText: '密码长度至少8位，包含字母、数字和特殊字符'
};
}),
"[project]/src/constants/weeklyDetail.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Weekly详情页静态数据常量
 * 
 * 从weekly/[slug]/page.tsx中分离的数据配置，符合单一职责原则
 * 便于维护和复用
 */ // 文章详情数据类型定义
__turbopack_context__.s({
    "MOCK_ARTICLE_DATA": ()=>MOCK_ARTICLE_DATA,
    "MOCK_RELATED_ARTICLES": ()=>MOCK_RELATED_ARTICLES,
    "WEEKLY_DETAIL_TEXT": ()=>WEEKLY_DETAIL_TEXT
});
const MOCK_ARTICLE_DATA = {
    'midjourney-monetization-guide': {
        id: 'midjourney-monetization-guide',
        title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
        content: `
在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。这款强大的AI绘画工具不仅让没有绘画基础的普通人也能创作出精美图像，更为有远见的创作者开辟了全新的收入渠道。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。

# 一、了解Midjourney的核心优势

Midjourney作为顶级AI绘画工具，拥有以下几个核心优势：

- **惊人的艺术表现力**：Midjourney生成的图像具有极高的艺术性，风格多变，细节丰富
- **简单的学习曲线**：即使没有专业绘画背景，也能通过文字描述（Prompt）快速生成高质量图像
- **高效的创作速度**：几秒钟内可生成多个设计方案，大大提升工作效率
- **低成本高回报**：相比传统设计外包，成本极低但产出质量很高

这些优势为创作者提供了强有力的商业化基础。

# 二、核心变现途径详解

## 1. 数字艺术品销售

创作并销售数字艺术品是最直接的变现方式。你可以：

- 在Etsy、Redbubble等平台销售数字下载
- 创建NFT艺术品在OpenSea等平台交易
- 建立个人网站或社交媒体账号直接销售

成功的数字艺术品通常具有以下特征：
- 独特的视觉风格
- 明确的主题定位
- 高分辨率和优秀的构图
- 符合目标市场的审美需求

## 2. 定制设计服务

利用Midjourney为客户提供定制设计服务是一种高利润的变现方式。常见的定制服务包括：

- 品牌视觉素材设计
- 社交媒体配图定制
- 产品包装插画设计
- 书籍/电子书封面设计
- 个性化肖像或礼物定制

> "Midjourney让我能以惊人的速度为客户提供多种设计方案，大大缩短了反馈周期。以前需要一周的工作，现在几小时就能完成，客户满意度也大幅提升。" —— 资深设计师 王明

你可以通过Fiverr、Upwork等自由职业平台，或建立自己的设计服务网站来接单。一个成功的定制设计项目价格通常在300-2000元之间。

# 三、构建可持续的AI绘画变现体系

要实现长期稳定的收入，需要构建一个完整的变现体系：

## 1. 建立个人品牌

- 打造专业社交媒体账号，展示作品集
- 创建个人网站或作品集平台
- 树立特定风格或领域的专业定位
- 积极参与社区讨论，分享知识和经验

## 2. 提升技术能力

- 不断优化Prompt编写技巧
- 学习图像后期处理技术
- 探索Midjourney与其他AI工具的协同使用
- 关注AI绘画领域的最新发展和趋势

# 四、避坑指南与实用建议

## 1. 法律与版权问题

- 确保订阅适当的Midjourney会员计划，获得商业使用权
- 避免生成侵权内容(如知名IP、名人肖像等)
- 了解不同平台的版权政策和使用条款
- 建立清晰的客户合同和授权协议

## 2. 常见陷阱

- **低价竞争**：不要陷入价格战，而是通过提供更高价值的服务来区分自己
- **过度依赖**：不要完全依赖单一AI工具，保持技术多样性
- **忽视市场调研**：在创作前了解市场需求，针对性地生产有商业价值的内容

# 结语：未来展望
        `,
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg',
            bio: 'AI创业者 | 技术架构师 | 人工智能实践者'
        },
        publishedAt: '2024-12-10',
        readingTime: '15分钟阅读',
        viewCount: '2.4k',
        commentCount: '1.8k',
        likeCount: '892',
        tags: [
            '技术指南',
            'AI工具'
        ],
        isPremium: false
    },
    'chatgpt-consulting-bot': {
        id: 'chatgpt-consulting-bot',
        title: '如何利用ChatGPT API搭建付费咨询机器人',
        content: `
在人工智能快速发展的今天，ChatGPT已经展现出了强大的对话能力和知识处理能力。许多创业者和开发者开始思考如何将这项技术转化为商业价值。本文将详细介绍如何利用ChatGPT API搭建一个付费咨询机器人，实现技术变现。

# 一、项目概述与商业模式

## 1. 什么是付费咨询机器人

付费咨询机器人是基于ChatGPT API开发的智能对话系统，用户通过付费获得专业领域的咨询服务。与传统人工咨询相比，AI咨询机器人具有以下优势：

- **24小时服务**：不受时间限制，随时为用户提供咨询
- **成本低廉**：相比人工咨询师，运营成本大幅降低
- **专业性强**：通过精心设计的提示词，可以在特定领域提供专业建议
- **可扩展性**：一个机器人可以同时服务多个用户

## 2. 商业模式设计

成功的付费咨询机器人通常采用以下商业模式：

- **按次收费**：每次咨询收取固定费用（如5-20元/次）
- **订阅制**：用户购买月度或年度会员，享受无限次咨询
- **分层服务**：基础咨询免费，高级咨询付费
- **专家定制**：针对特定行业或专业领域收取更高费用

# 二、技术架构设计

## 第一步：环境准备

1. 获取OpenAI API密钥
2. 选择开发框架（推荐Node.js + Express）
3. 数据库设计（用户管理、对话记录、付费记录）
4. 部署环境准备（云服务器、域名、SSL证书）

## 第二步：核心功能开发

1. ChatGPT API集成
2. 会话管理系统
3. 用户额度管理
4. 对话历史记录

## 第三步：优化与推广

1. 响应速度优化
2. 用户体验提升
3. 营销推广策略
4. 数据分析与改进

# 结语

通过合理的技术架构和商业模式，ChatGPT API咨询机器人可以成为一个持续盈利的项目。关键在于提供有价值的服务，并不断优化用户体验。
        `,
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg',
            bio: 'AI创业者 | 技术架构师 | 人工智能实践者'
        },
        publishedAt: '2024-12-10',
        readingTime: '15分钟阅读',
        viewCount: '2.4k',
        commentCount: '1.8k',
        likeCount: '892',
        tags: [
            '技术指南',
            '实战案例'
        ],
        isPremium: false
    }
};
const MOCK_RELATED_ARTICLES = [
    {
        id: '2',
        title: 'GPT-4文案系统搭建：打造高转化的AI内容营销机器',
        excerpt: '揭秘如何构建基于GPT-4的自动化文案系统，涵盖prompt工程、内容策略、转化优化等核心技能。',
        publishedAt: '2024-12-06',
        readingTime: '18分钟',
        viewCount: '1.8k',
        slug: 'gpt4-copywriting-system',
        isPremium: false
    },
    {
        id: '3',
        title: '无代码AI应用开发：零基础打造你的第一个AI产品',
        excerpt: '使用无代码平台快速构建AI应用的完整教程，包含工具选择、产品设计、部署上线等关键步骤。',
        publishedAt: '2024-12-02',
        readingTime: '14分钟',
        viewCount: '2.2k',
        slug: 'no-code-ai-development',
        isPremium: false
    },
    {
        id: '4',
        title: 'AI语音克隆技术商业应用：声音变现的新蓝海',
        excerpt: '探索AI语音技术的商业化应用场景，从配音服务到个人IP打造，详解声音经济时代的变现机会。',
        publishedAt: '2024-12-04',
        readingTime: '10分钟',
        viewCount: '1.5k',
        slug: 'ai-voice-cloning-business',
        isPremium: true
    }
];
const WEEKLY_DETAIL_TEXT = {
    loading: '加载中...',
    notFound: '文章不存在',
    backToList: '返回列表',
    relatedTitle: '相关推荐',
    likeAction: '点赞',
    bookmarkAction: '收藏',
    adjustAction: '调整',
    shareAction: '分享'
};
}),
"[project]/src/constants/mainContent.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * MainContentSection页面静态数据常量
 * 
 * 从MainContentSection组件中分离的数据配置，符合单一职责原则
 * 便于维护和复用
 */ // 筛选标签选项 (首页只需要最新和热门)
__turbopack_context__.s({
    "ARTICLES_DATA": ()=>ARTICLES_DATA,
    "EMAIL_SUBSCRIPTION_CONFIG": ()=>EMAIL_SUBSCRIPTION_CONFIG,
    "FILTER_OPTIONS": ()=>FILTER_OPTIONS,
    "MAIN_CONTENT_TEXT": ()=>MAIN_CONTENT_TEXT,
    "USER_TESTIMONIAL": ()=>USER_TESTIMONIAL,
    "WHY_CHOOSE_FEATURES": ()=>WHY_CHOOSE_FEATURES
});
const FILTER_OPTIONS = [
    '最新',
    '热门'
];
const ARTICLES_DATA = [
    {
        id: 1,
        title: '如何利用ChatGPT API搭建付费咨询机器人',
        image: '/images/articles/chatgpt-article.jpeg',
        tags: [
            '技术指南',
            '实战案例'
        ],
        views: '1.2k',
        readTime: '8分钟'
    },
    {
        id: 2,
        title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
        image: '/images/articles/midjourney-article.jpeg',
        tags: [
            '变现心得',
            'AI工具'
        ],
        views: '2.4k',
        readTime: '12分钟'
    },
    {
        id: 3,
        title: '从入门到精通：如何用GPT-4打造高转化的AI文案系统',
        image: '/images/articles/gpt4-article.jpeg',
        tags: [
            '技术指南',
            'AI工具'
        ],
        views: '3.6k',
        readTime: '15分钟'
    }
];
const WHY_CHOOSE_FEATURES = [
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
];
const USER_TESTIMONIAL = {
    quote: '通过AI变现之路的指导，我在两个月内实现了月入过万的目标，资源非常实用！',
    author: '张先生',
    role: '自由职业者',
    avatar: '/images/avatars/user-zhang-zhichuang.svg'
};
const EMAIL_SUBSCRIPTION_CONFIG = {
    title: '不要错过任何机会',
    description: '订阅后获取：每周AI变现趋势 + 独家案例分析',
    placeholder: '输入您的邮箱地址',
    buttonText: '立即订阅',
    userCount: '5000+ 用户',
    userCountDescription: '已加入社区'
};
const MAIN_CONTENT_TEXT = {
    whyChooseTitle: '为什么选择我们？',
    userTestimonialTitle: '他们都在用',
    viewMoreButtonText: '查看更多'
};
}),
"[project]/src/constants/heroSection.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * HeroSection静态数据常量
 * 
 * 从HeroSectionNew组件中分离的数据配置，符合单一职责原则
 * 便于维护和复用
 */ // Hero区域文案配置
__turbopack_context__.s({
    "EMAIL_REGEX": ()=>EMAIL_REGEX,
    "HERO_ANIMATIONS": ()=>HERO_ANIMATIONS,
    "HERO_CONTENT": ()=>HERO_CONTENT,
    "HERO_STYLES": ()=>HERO_STYLES
});
const HERO_CONTENT = {
    mainTitle: 'AI变现从这里开始',
    subtitle1: '掌握最前沿的AI变现技巧，从工具应用到商业模式，',
    subtitle2: '助你在AI时代实现财富自由。',
    emailPlaceholder: '输入你的邮箱地址',
    subscribeButton: '立即订阅',
    subscribingText: '订阅中...',
    successMessage: '订阅成功！我们会将最新的AI变现资讯发送到您的邮箱。',
    errorMessage: '订阅失败，请稍后再试',
    invalidEmailMessage: '请输入有效的邮箱地址'
};
const HERO_STYLES = {
    // 主容器样式
    section: {
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        paddingTop: '120px',
        paddingBottom: '80px',
        background: 'transparent'
    },
    // 内容容器样式
    contentContainer: {
        position: 'relative',
        zIndex: 20,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        paddingTop: '0px'
    },
    // 主标题样式 (移除渐变相关样式，交给GradientText组件处理)
    mainTitle: {
        fontSize: '64px',
        fontWeight: '700',
        lineHeight: '76.8px',
        textAlign: 'center',
        margin: '0 0 24px 0',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        minHeight: '77px'
    },
    // 副标题样式
    subtitle: {
        color: '#9CA3AF',
        fontSize: '20px',
        fontWeight: '400',
        lineHeight: '32px',
        textAlign: 'center',
        margin: '0',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        minHeight: '32px'
    },
    // 表单容器样式
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginTop: '32px',
        width: '100%',
        maxWidth: '500px',
        flexWrap: 'nowrap'
    },
    // 输入框样式
    emailInput: {
        flex: 1,
        minWidth: '250px',
        height: '48px',
        padding: '14px 20px',
        background: 'var(--color-bg-input)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '24px',
        color: 'var(--color-text-primary)',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.2s ease'
    },
    // 订阅按钮样式
    subscribeButton: {
        flexShrink: 0,
        height: '48px',
        padding: '0 24px',
        background: 'var(--gradient-primary)',
        border: 'none',
        borderRadius: '24px',
        color: 'var(--color-text-primary)',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        minHeight: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // 3D模型容器样式
    modelContainer: {
        position: 'absolute',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '200px',
        zIndex: 5,
        pointerEvents: 'none',
        overflow: 'hidden'
    }
};
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HERO_ANIMATIONS = {
    fadeInUp: {
        keyframes: `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `,
        titleClass: 'hero-title-animation',
        subtitleClass: 'hero-subtitle-animation'
    }
};
}),
"[project]/src/constants/about.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * About页面静态数据常量
 * 
 * 从about/page.tsx中分离的数据配置，符合单一职责原则
 * 便于维护和复用
 */ // 默认会员套餐数据
__turbopack_context__.s({
    "ABOUT_CONTENT": ()=>ABOUT_CONTENT,
    "CONTACT_FORM_INITIAL": ()=>CONTACT_FORM_INITIAL,
    "DEFAULT_MEMBERSHIP_PLAN": ()=>DEFAULT_MEMBERSHIP_PLAN,
    "MISSION_CARDS": ()=>MISSION_CARDS,
    "PLATFORM_STATS": ()=>PLATFORM_STATS,
    "WHY_CHOOSE_CARDS": ()=>WHY_CHOOSE_CARDS
});
const DEFAULT_MEMBERSHIP_PLAN = {
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
};
const PLATFORM_STATS = [
    {
        value: '30万+',
        label: '月活跃用户'
    },
    {
        value: '500+',
        label: '精选案例'
    },
    {
        value: '120+',
        label: '周刊期数'
    },
    {
        value: '50+',
        label: '合作伙伴'
    }
];
const MISSION_CARDS = [
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
];
const WHY_CHOOSE_CARDS = [
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
];
const CONTACT_FORM_INITIAL = {
    name: '',
    email: '',
    subject: '',
    message: ''
};
const ABOUT_CONTENT = {
    pageTitle: '关于AI变现之路',
    pageSubtitle: '我们致力于探索AI技术的商业价值，帮助创作者、开发者和企业 通过人工智能技术实现商业创新与价值转化',
    missionTitle: '我们的使命',
    whyChooseTitle: '为什么选择我们',
    whyChooseSubtitle: '在AI快速发展的时代，我们提供的不仅是知识，更是实用的变现路径和专业的指导支持',
    statsTitle: '平台数据',
    contactTitle: '联系我们',
    contactSubtitle: '有任何问题或建议？我们很乐意听到您的声音',
    submitButtonText: '提交信息'
};
}),

};

//# sourceMappingURL=src_12e95d5f._.js.map