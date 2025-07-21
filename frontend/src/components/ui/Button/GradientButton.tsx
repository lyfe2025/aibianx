'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

export interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'outline'
    fullWidth?: boolean
    loading?: boolean
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
    ({
        children,
        size = 'md',
        variant = 'primary',
        fullWidth = false,
        loading = false,
        className = '',
        disabled,
        ...props
    }, ref) => {
        const baseClass = 'btn'
        const sizeClass = `btn--${size}`
        const variantClass = variant === 'primary' ? 'btn--gradient' : 'btn--outline'
        const fullWidthClass = fullWidth ? 'w-full' : ''

        const classes = [
            baseClass,
            sizeClass,
            variantClass,
            fullWidthClass,
            className
        ].filter(Boolean).join(' ')

        return (
            <button
                ref={ref}
                className={classes}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="loading-spinner"></span>
                        {children}
                    </span>
                ) : (
                    children
                )}
            </button>
        )
    }
)

GradientButton.displayName = 'GradientButton' 