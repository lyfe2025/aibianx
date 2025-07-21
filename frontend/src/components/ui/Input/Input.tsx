'use client'

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode
    error?: string
    label?: string
    helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    icon,
    error,
    label,
    helperText,
    className,
    ...props
}, ref) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-text-muted text-base font-medium">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-blue">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        // 精确还原设计稿样式
                        'w-full rounded-lg border',
                        'bg-background-input backdrop-blur-sm',
                        'text-text-primary placeholder:text-text-muted',
                        'font-medium text-base leading-[18px]',
                        'transition-all duration-200',
                        // 内边距 - 根据是否有图标调整
                        icon ? 'pl-12 pr-4 py-4' : 'px-4 py-4',
                        // 边框状态
                        error
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-border-secondary focus:border-primary-blue',
                        // 焦点状态
                        'focus:outline-none focus:ring-0',
                        'focus:shadow-[0px_0px_0px_2px_rgba(59,130,246,0.1)]',
                        // 禁用状态
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-text-muted text-sm">{helperText}</p>
            )}
        </div>
    )
})

Input.displayName = 'Input' 