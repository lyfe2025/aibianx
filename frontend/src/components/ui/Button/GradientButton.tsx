'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: 'primary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    loading?: boolean
    className?: string
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
    ({
        children,
        variant = 'primary',
        size = 'md',
        fullWidth = false,
        loading = false,
        className = '',
        disabled,
        ...props
    }, ref) => {
        const buttonClasses = [
            'btn',
            `btn--${size}`,
            variant === 'primary' ? 'btn--gradient' : 'btn--outline',
            fullWidth && 'w-full',
            className
        ].filter(Boolean).join(' ')

        const isDisabled = disabled || loading

        return (
            <button
                ref={ref}
                className={buttonClasses}
                disabled={isDisabled}
                {...props}
            >
                {loading && (
                    <span className="loading-spinner" style={{ marginRight: 'var(--spacing-2)' }} />
                )}
                {children}
            </button>
        )
    }
)

GradientButton.displayName = 'GradientButton' 