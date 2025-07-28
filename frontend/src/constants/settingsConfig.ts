/**
 * 设置页面配置常量
 * 
 * 包含标签页配置、设备数据、样式常量等
 */

// 标签页配置
export const SETTINGS_TABS = [
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
] as const

export type TabType = typeof SETTINGS_TABS[number]['key']

// 初始表单数据
export const INITIAL_FORM_DATA = {
    username: '张智创',
    phone: '138****5678',
    email: 'zhang****@example.com',
    bio: '介绍一下自己...'
}

// 初始安全设置数据
export const INITIAL_SECURITY_DATA = {
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
}

// 安全提示内容
export const SECURITY_TIPS = [
    '定期更新密码，使用强密码组合',
    '启用两步验证提高账户安全性',
    '及时清理不使用的登录设备',
    '不在公共场所或他人设备上登录'
]

// 样式配置
export const SETTINGS_STYLES = {
    page: {
        padding: '32px 40px',
        maxWidth: '1440px',
        margin: '0 auto'
    },
    card: {
        background: 'rgba(26, 26, 26, 0.30)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(42, 42, 42, 0.70)',
        borderRadius: '12px'
    },
    sectionCard: {
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        padding: '24px'
    },
    formCard: {
        background: 'rgba(26, 26, 26, 0.3)',
        borderRadius: '12px',
        padding: '32px',
        margin: '0 48px',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(42, 42, 42, 0.4)'
    },
    deviceItem: {
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '16px'
    }
} as const

// 头像配置
export const AVATAR_CONFIG = {
    src: '/images/avatars/user-zhang-zhichuang.svg',
    alt: '张智创',
    supportedFormats: 'JPG、PNG',
    maxFileSize: '2MB'
}

// 密码验证配置
export const PASSWORD_CONFIG = {
    minLength: 8,
    helperText: '密码长度至少8位，包含字母、数字和特殊字符'
} 