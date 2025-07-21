'use client'

import { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GradientButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
    children: ReactNode
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    variant?: 'primary' | 'outline'
}

export const GradientButton: FC<GradientButtonProps> = ({
    children,
    size = 'md',
    fullWidth = false,
    variant = 'primary',
    disabled = false,
    className,
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-7 py-3 text-sm',          // 登录按钮：28px左右内边距，12px上下
        md: 'px-7 py-3.5 text-sm',       // 订阅按钮：28px左右，14px上下  
        lg: 'px-28 py-4.5 text-sm'       // 大按钮：114px左右，18px上下
    }

    const variantClasses = {
        primary: cn(
            'bg-gradient-to-r from-primary-blue to-primary-purple',
            'text-white',
            'shadow-[0px_4px_12px_0px_rgba(139,92,246,0.25)]',
            'hover:shadow-[0px_6px_16px_0px_rgba(139,92,246,0.35)]'
        ),
        outline: cn(
            'border border-border-primary bg-transparent',
            'text-text-primary',
            'hover:bg-background-secondary'
        )
    }

    return (
        <button
            disabled={disabled}
            className={cn(
                // 基础样式 - 严格按设计稿
                'rounded-full font-medium transition-all duration-200',
                'leading-[15px] cursor-pointer',
                'active:scale-[0.98]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                // 尺寸
                sizeClasses[size],
                // 变体
                variantClasses[variant],
                // 全宽
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
} 