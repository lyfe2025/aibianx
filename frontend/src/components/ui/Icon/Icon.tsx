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

    const iconSize = sizeMap[size]

    // 获取图标路径，优先使用映射，否则使用根目录
    const iconPath = iconPathMap[name] ? `icons/${iconPathMap[name]}.svg` : `icons/${name}.svg`

    return (
        <span
            className={`icon icon--${size} ${className}`}
            style={{ display: 'inline-block', lineHeight: 0 }}
            {...props}
        >
            <Image
                src={`/${iconPath}`}
                alt={name}
                width={iconSize}
                height={iconSize}
                style={{ display: 'block' }}
            />
        </span>
    )
} 