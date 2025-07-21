'use client'

import { type ReactNode } from 'react'

export interface ContainerProps {
    children: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    className?: string
}

export const Container = ({
    children,
    size = 'xl',
    className = ''
}: ContainerProps) => {
    const baseClass = 'container'
    const sizeClass = size !== 'full' ? `container--${size}` : ''

    const classes = [
        baseClass,
        sizeClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={classes}>
            {children}
        </div>
    )
} 