'use client'

import Image from 'next/image'
import { type HTMLAttributes, useEffect, useState } from 'react'

export interface IconProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    name: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    className?: string
    preserveColor?: boolean // 是否保持图标原色，不应用颜色filter。适用于品牌logo、应用图标等已有完整设计的图标
}

// 图标路径映射 - 解决子目录问题
const iconPathMap: Record<string, string> = {
    // 弹窗相关图标 (modals目录)
    'close-button': 'modals/close-button',
    'close-button-login': 'modals/close-button-login',
    'close-button-forgot': 'modals/close-button-forgot',
    'email-icon': 'modals/email-icon',
    'email-icon-forgot': 'modals/email-icon-forgot',
    'email-username-icon': 'modals/email-username-icon',
    'username-icon': 'modals/username-icon',
    'password-icon': 'modals/password-icon',
    'password-icon-login': 'modals/password-icon-login',
    'password-eye-icon': 'modals/password-eye-icon',
    'password-eye-login': 'modals/password-eye-login',
    'password-strength': 'modals/password-strength',
    'github-icon': 'modals/github-icon',
    'github-icon-login': 'modals/github-icon-login',
    'secure-payment': 'modals/secure-payment',
    'help-icon': 'modals/help-icon',
    'member-check-icon': 'modals/member-check-icon',
    'remember-me-checkbox': 'modals/remember-me-checkbox',
    'checkbox-icon': 'modals/checkbox-icon',
    'divider-line': 'modals/divider-line',
    'divider-line-login': 'modals/divider-line-login',
    'arrow-separator': 'modals/arrow-separator',
    'countdown-separator': 'modals/countdown-separator',

    // 支付相关图标 (payments目录)
    'payment-selected': 'payments/payment-selected',
    'wechat-pay-icon': 'payments/wechat-pay-icon',
    'alipay-icon': 'payments/alipay-icon',
    'unionpay-icon': 'payments/unionpay-icon',

    // 订阅相关图标 - 映射到根目录实际存在的文件
    'subscription/renew-arrow': 'arrow-right',
    'subscription/payment-manage': 'settings-icon',
    'subscription/member-privilege': 'privilege-icon',
    'subscription/arrow-right': 'arrow-right',
    'subscription/view-all-arrow': 'arrow-right',
    'subscription/invite-guide': 'strategy-icon',
    'subscription/withdraw-record': 'record-icon',
    'subscription/invite-code': 'invite-code-icon',
    'subscription/copy-icon': 'copy-icon',
    'subscription/invited-users': 'invited-count-icon',
    'subscription/pending-users': 'pending-activation-icon',
    'subscription/commission-amount': 'commission-icon',
    'subscription/copy-invite-link': 'copy-icon',
    'subscription/generate-poster': 'resources-icon',
    'subscription/cash-reward': 'commission-icon',
    'subscription/membership-reward': 'privilege-icon',
    'subscription/reward-rules': 'strategy-icon',

    // 侧边栏图标 - 直接映射到根目录
    'profile-sidebar-home': 'profile-sidebar-home',
    'profile-sidebar-center': 'profile-sidebar-center',
    'profile-sidebar-bookmark': 'profile-sidebar-bookmark',
    'profile-sidebar-subscription': 'profile-sidebar-subscription',
    'profile-sidebar-settings': 'profile-sidebar-settings',
    'profile-sidebar-logout': 'profile-sidebar-logout',

    // 根目录常用图标直接映射
    'invited-count-icon': 'invited-count-icon',
    'pending-activation-icon': 'pending-activation-icon',
    'commission-icon': 'commission-icon',
    'invite-code-icon': 'invite-code-icon',
    'copy-icon': 'copy-icon',
    'strategy-icon': 'strategy-icon',
    'record-icon': 'record-icon',
    'resources-icon': 'resources-icon',
    'user-icon': 'user-icon',
    'search-icon': 'search-icon',
    'renew-icon': 'renew-icon',
    'privilege-icon': 'privilege-icon',
    'privilege-arrow': 'privilege-arrow',
    'arrow-right-blue': 'arrow-right-blue',

    // 多语言相关图标
    'globe': 'globe', // 地球图标，用于多语言切换
}

export const Icon = ({
    name,
    size = 'md',
    className = '',
    preserveColor = false,
    ...props
}: IconProps) => {
    const [isClient, setIsClient] = useState(false)
    const [currentTheme, setCurrentTheme] = useState<string>('dark')

    // SSR兼容的客户端状态检测
    useEffect(() => {
        setIsClient(true)
        
        if (typeof window !== 'undefined') {
            // 初始主题检测
            const theme = document.documentElement.getAttribute('data-theme') || 'dark'
            setCurrentTheme(theme)

            // 监听主题变化
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                        const newTheme = document.documentElement.getAttribute('data-theme') || 'dark'
                        setCurrentTheme(newTheme)
                    }
                })
            })

            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme']
            })

            return () => observer.disconnect()
        }
    }, [])

    const sizeMap = {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
        xl: 32
    }

    // 从style中提取width和height，如果存在则优先使用
    const parseSize = (size: string | number | undefined): number | null => {
        if (!size) return null
        if (typeof size === 'number') return size
        // 提取数字部分，如 "24px" -> 24
        const match = String(size).match(/(\d+)/)
        return match ? parseInt(match[1]) : null
    }

    const customWidth = parseSize(props.style?.width)
    const customHeight = parseSize(props.style?.height)

    const iconWidth = customWidth || sizeMap[size]
    const iconHeight = customHeight || sizeMap[size]

    // 获取图标路径，优先使用映射，否则使用根目录
    const iconPath = iconPathMap[name] ? `icons/${iconPathMap[name]}.svg` : `icons/${name}.svg`

        // 自动识别需要保持原色的图标
    const shouldPreserveColor = preserveColor || 
        name.includes('logo') || 
        name.includes('app-icon') ||
        name.includes('brand') ||
        name.startsWith('logo-') ||
        name.endsWith('-logo') ||
        name.includes('-app-') ||
        name.includes('application') ||
        name.includes('favicon') ||
        // 某些已经有完整设计的图标也保持原色
        name === 'membership-crown-design' ||
        name === 'membership-premium' ||
        // 应用类型的图标（通常有深色背景和白色图标内容）
        name.includes('article-stat') ||
        name.includes('tutorial-stat') ||
        name.includes('ai-tool-stat') ||
        name.includes('case-stat') ||
        // 其他可能有完整设计的图标
        name.includes('-stat-') ||
        name.endsWith('-stat') ||
        name.includes('app-') ||
        name.includes('-brand')

        // 检查是否设置了color样式，如果有且没有设置preserveColor则应用filter来改变图标颜色
    const hasColor = props.style?.color
    let filterStyle = {}
    
    // 注意：由于CSS类可能会覆盖style中的color，我们需要在组件挂载后读取计算后的颜色
    // 但在SSR期间我们使用传入的style color
    if (hasColor && !shouldPreserveColor) {
        // SSR兼容的颜色映射 - 只在客户端应用动态filter
        if (isClient) {
            // 根据颜色CSS变量生成对应的filter (根据主题自适应)
            const getDynamicColorMap = (): Record<string, string> => {
                if (currentTheme === 'light') {
                    // 亮色模式的颜色映射
                    return {
                        'var(--color-text-primary)': 'brightness(0) saturate(100%) invert(16%) sepia(15%) saturate(1142%) hue-rotate(202deg) brightness(93%) contrast(90%)', // #1E293B
                        'var(--color-text-secondary)': 'brightness(0) saturate(100%) invert(31%) sepia(15%) saturate(549%) hue-rotate(202deg) brightness(95%) contrast(89%)', // #475569
                        'var(--color-text-muted)': 'brightness(0) saturate(100%) invert(45%) sepia(13%) saturate(692%) hue-rotate(202deg) brightness(91%) contrast(87%)', // #64748B
                        'var(--color-text-disabled)': 'brightness(0) saturate(100%) invert(46%) sepia(7%) saturate(442%) hue-rotate(202deg) brightness(91%) contrast(84%)', // #6B7280
                        'var(--color-primary-blue)': 'brightness(0) saturate(100%) invert(44%) sepia(78%) saturate(2601%) hue-rotate(214deg) brightness(97%) contrast(94%)', // #3B82F6
                        'var(--color-bg-primary)': '', // 特殊处理
                    }
                } else {
                    // 暗色模式的颜色映射
                    return {
                        'var(--color-text-primary)': 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(105%) contrast(105%)', // #FFFFFF
                        'var(--color-text-secondary)': 'brightness(0) saturate(100%) invert(73%) sepia(8%) saturate(348%) hue-rotate(202deg) brightness(91%) contrast(87%)', // #D1D5DB
                        'var(--color-text-muted)': 'brightness(0) saturate(100%) invert(64%) sepia(8%) saturate(645%) hue-rotate(202deg) brightness(92%) contrast(84%)', // #9CA3AF
                        'var(--color-text-disabled)': 'brightness(0) saturate(100%) invert(46%) sepia(7%) saturate(442%) hue-rotate(202deg) brightness(91%) contrast(84%)', // #6B7280
                        'var(--color-primary-blue)': 'brightness(0) saturate(100%) invert(44%) sepia(78%) saturate(2601%) hue-rotate(214deg) brightness(97%) contrast(94%)', // #3B82F6
                        'var(--color-bg-primary)': '', // 特殊处理
                    }
                }
            }

            const colorMap = getDynamicColorMap()
            const colorValue = String(hasColor)

            // 对于背景色，需要根据当前主题判断
            if (colorValue === 'var(--color-bg-primary)') {
                // 背景色的反色：在亮色模式下是深色，在暗色模式下是白色
                if (currentTheme === 'light') {
                    // 亮色模式：使用深色图标
                    filterStyle = {
                        filter: 'brightness(0) saturate(100%) invert(13%) sepia(17%) saturate(1026%) hue-rotate(203deg) brightness(89%) contrast(97%)'
                    }
                } else {
                    // 暗色模式：使用白色图标
                    filterStyle = {
                        filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(105%) contrast(105%)'
                    }
                }
            } else if (colorMap[colorValue]) {
                filterStyle = { filter: colorMap[colorValue] }
            } else {
                // 如果不是预定义的CSS变量，保持原样
                filterStyle = {}
            }
        }
    }

    return (
        <span
            className={`icon icon--${size} ${className}`}
            style={{ display: 'inline-block', lineHeight: 0, ...props.style }}
            {...props}
        >
            <Image
                src={`/${iconPath}`}
                alt={name}
                width={iconWidth}
                height={iconHeight}
                style={{ display: 'block', ...filterStyle }}
            />
        </span>
    )
} 