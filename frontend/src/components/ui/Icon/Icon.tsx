'use client'

import Image from 'next/image'
import { type HTMLAttributes } from 'react'

export interface IconProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    name: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    className?: string
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

    // 订阅相关图标 (subscription目录)
    'subscription/renew-arrow': 'subscription/renew-arrow',
    'subscription/payment-manage': 'subscription/payment-manage',
    'subscription/member-privilege': 'subscription/member-privilege',
    'subscription/arrow-right': 'subscription/arrow-right',
    'subscription/view-all-arrow': 'subscription/view-all-arrow',
    'subscription/invite-guide': 'subscription/invite-guide',
    'subscription/withdraw-record': 'subscription/withdraw-record',
    'subscription/invite-code': 'subscription/invite-code',
    'subscription/copy-icon': 'subscription/copy-icon',
    'subscription/invited-users': 'subscription/invited-users',
    'subscription/pending-users': 'subscription/pending-users',
    'subscription/commission-amount': 'subscription/commission-amount',
    'subscription/copy-invite-link': 'subscription/copy-invite-link',
    'subscription/generate-poster': 'subscription/generate-poster',
    'subscription/cash-reward': 'subscription/cash-reward',
    'subscription/membership-reward': 'subscription/membership-reward',
    'subscription/reward-rules': 'subscription/reward-rules',

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
    ...props
}: IconProps) => {
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
                style={{ display: 'block' }}
            />
        </span>
    )
} 