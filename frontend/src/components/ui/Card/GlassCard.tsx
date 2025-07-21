'use client'

import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
    children: ReactNode
    variant?: 'default' | 'hover' | 'active'
    padding?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
    onClick?: () => void
}

export const GlassCard: FC<GlassCardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    className,
    onClick
}) => {
    const paddingClasses = {
        sm: 'p-4',      // 16px
        md: 'p-6',      // 24px
        lg: 'p-8',      // 32px
        xl: 'p-12'      // 48px
    }

    const variantClasses = {
        default: cn(
            'bg-background-glass backdrop-blur-[12px]',
            'border border-border-primary'
        ),
        hover: cn(
            'bg-background-glass backdrop-blur-[12px]',
            'border border-border-primary',
            'hover:bg-background-secondary/50 hover:border-border-primary/80',
            'transition-all duration-200 cursor-pointer'
        ),
        active: cn(
            'bg-background-secondary backdrop-blur-[12px]',
            'border border-primary-blue/30',
            'shadow-[0px_0px_0px_1px_rgba(59,130,246,0.2)]'
        )
    }

    const Component = onClick ? 'button' : 'div'

    return (
        <Component
            onClick={onClick}
            className={cn(
                // 基础毛玻璃样式 - 精确还原设计稿
                'rounded-lg',
                // 内边距
                paddingClasses[padding],
                // 变体样式
                variantClasses[variant],
                // 点击状态
                onClick && 'active:scale-[0.98]',
                className
            )}
        >
            {children}
        </Component>
    )
} 