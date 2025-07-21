export interface MembershipPlan {
    id: string
    name: string
    description: string
    price: {
        monthly: number
        annually: number
    }
    originalPrice?: {
        monthly: number
        annually: number
    }
    features: string[]
    highlighted?: boolean
    badge?: string
    popular?: boolean
}

export interface PaymentMethod {
    id: string
    name: string
    icon: string
    description?: string
    enabled: boolean
}

export type BillingCycle = 'monthly' | 'annually'

export const membershipPlans: MembershipPlan[] = [
    {
        id: 'free',
        name: '免费版',
        description: '体验AI变现的基础功能',
        price: {
            monthly: 0,
            annually: 0,
        },
        features: [
            '基础AI工具推荐',
            '每周精选内容',
            '社区基础权限',
            '有限的教程访问',
        ],
    },
    {
        id: 'pro',
        name: '专业版',
        description: '解锁完整功能，助力AI变现',
        price: {
            monthly: 99,
            annually: 999,
        },
        originalPrice: {
            monthly: 199,
            annually: 1999,
        },
        features: [
            '完整AI工具库访问',
            '独家变现案例分析',
            '专业技术指导',
            'VIP社群权限',
            '月度专家直播',
            '1对1咨询机会',
        ],
        highlighted: true,
        badge: '最受欢迎',
        popular: true,
    },
    {
        id: 'enterprise',
        name: '企业版',
        description: '为团队和企业量身定制',
        price: {
            monthly: 299,
            annually: 2999,
        },
        originalPrice: {
            monthly: 499,
            annually: 4999,
        },
        features: [
            '专业版所有功能',
            '团队协作工具',
            '企业级技术支持',
            '定制化咨询服务',
            '专属客户经理',
            '白标解决方案',
            'API访问权限',
        ],
        badge: '企业首选',
    },
]

export const paymentMethods: PaymentMethod[] = [
    {
        id: 'wechat',
        name: '微信支付',
        icon: 'wechat-pay-icon',
        description: '使用微信扫码支付',
        enabled: true,
    },
    {
        id: 'alipay',
        name: '支付宝',
        icon: 'alipay-icon',
        description: '使用支付宝扫码支付',
        enabled: true,
    },
    {
        id: 'unionpay',
        name: '银联支付',
        icon: 'unionpay-icon',
        description: '银行卡在线支付',
        enabled: true,
    },
]

export const calculateDiscount = (monthly: number, annually: number): number => {
    const monthlyTotal = monthly * 12
    const discount = ((monthlyTotal - annually) / monthlyTotal) * 100
    return Math.round(discount)
}

export const formatPrice = (price: number): string => {
    return price === 0 ? '免费' : `¥${price}`
}

export const getMembershipBenefits = () => [
    {
        icon: 'ai-tool-library',
        title: '海量AI工具库',
        description: '200+ 精选AI工具，覆盖创作、编程、设计等各个领域',
    },
    {
        icon: 'practical-experience',
        title: '实战案例分析',
        description: '真实的AI变现案例，详细的操作步骤和盈利数据',
    },
    {
        icon: 'one-on-one-consulting',
        title: '专家1对1指导',
        description: '资深AI变现专家提供个性化指导和答疑',
    },
    {
        icon: 'community-support',
        title: 'VIP专属社群',
        description: '与同行交流经验，获取第一手行业资讯',
    },
    {
        icon: 'continuous-update',
        title: '持续内容更新',
        description: '每周新增工具和案例，紧跟AI发展趋势',
    },
    {
        icon: 'success-cases',
        title: '成功保障',
        description: '30天内无效果，无条件退款保障',
    },
] 