'use client'

import { type ReactNode, type HTMLAttributes } from 'react'

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    variant?: 'default' | 'hover' | 'active'
    padding?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

export const GlassCard = ({
    children,
    variant = 'default',
    padding = 'md',
    className = '',
    ...props
}: GlassCardProps) => {
    const baseClass = 'glass-card'
    const paddingClass = `p-${padding === 'sm' ? '4' : padding === 'md' ? '6' : padding === 'lg' ? '8' : '10'}`

    const variantStyles: Record<string, string> = {
        default: '',
        hover: 'glass-card--hover',
        active: 'glass-card--active'
    }

    const classes = [
        baseClass,
        variantStyles[variant],
        paddingClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    )
} 