'use client'

import { type ReactNode, type ElementType, type CSSProperties, type HTMLAttributes } from 'react'

export interface GradientTextProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode
    as?: ElementType
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'
    weight?: 'normal' | 'medium' | 'semibold' | 'bold'
    className?: string
    style?: CSSProperties
}

export const GradientText = ({
    children,
    as: Component = 'span',
    size = 'base',
    weight = 'normal',
    className = '',
    style,
    ...props
}: GradientTextProps) => {
    const sizeClass = `text-${size}`
    const weightClass = `font-${weight}`

    const classes = [
        'gradient-text',
        sizeClass,
        weightClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <Component className={classes} style={style} {...props}>
            {children}
        </Component>
    )
} 