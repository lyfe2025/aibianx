'use client'

import { FC, ReactNode, ElementType } from 'react'
import { cn } from '@/lib/utils'

interface GradientTextProps {
    children: ReactNode
    as?: ElementType
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'
    weight?: 'normal' | 'medium' | 'semibold' | 'bold'
    className?: string
}

export const GradientText: FC<GradientTextProps> = ({
    children,
    as: Component = 'span',
    size = 'base',
    weight = 'normal',
    className
}) => {
    const sizeClasses = {
        xs: 'text-xs',       // 12px - 小标签
        sm: 'text-sm',       // 13.33px - 按钮文字
        base: 'text-base',   // 14px - 正文
        lg: 'text-lg',       // 16px - 基础大小
        xl: 'text-xl',       // 18px - 卡片标题
        '2xl': 'text-2xl',   // 20px - 副标题
        '3xl': 'text-3xl',   // 24px - 大标题
        '4xl': 'text-4xl',   // 28px - 弹窗标题
        '5xl': 'text-5xl',   // 32px - 区块标题
        '6xl': 'text-6xl',   // 36px - 页面大标题
        '7xl': 'text-7xl',   // 48px - 关于页标题
        '8xl': 'text-8xl'    // 64px - Hero 标题
    }

    const weightClasses = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold'
    }

    return (
        <Component
            className={cn(
                // 渐变文字效果 - 精确还原设计稿
                'bg-gradient-to-r from-primary-blue to-primary-purple',
                'bg-clip-text text-transparent',
                'leading-tight',
                // 尺寸和字重
                sizeClasses[size],
                weightClasses[weight],
                className
            )}
        >
            {children}
        </Component>
    )
} 