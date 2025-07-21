'use client'

import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
    children: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    className?: string
}

export const Container: FC<ContainerProps> = ({
    children,
    size = 'xl',
    className
}) => {
    const sizeClasses = {
        sm: 'max-w-2xl',      // 672px
        md: 'max-w-4xl',      // 896px
        lg: 'max-w-6xl',      // 1152px
        xl: 'max-w-[1440px]', // 1440px - 设计稿标准宽度
        full: 'max-w-full'
    }

    return (
        <div
            className={cn(
                'mx-auto px-4 sm:px-6 lg:px-8',
                sizeClasses[size],
                className
            )}
        >
            {children}
        </div>
    )
} 