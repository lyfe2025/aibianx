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
    // 字体大小映射
    const fontSizeMap = {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        '7xl': 'var(--font-size-7xl)',
        '8xl': 'var(--font-size-8xl)'
    }

    // 字体粗细映射
    const fontWeightMap = {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700'
    }

    const combinedStyle = {
        fontSize: fontSizeMap[size],
        fontWeight: fontWeightMap[weight],
        ...style
    }

    const classes = [
        'gradient-text',
        className
    ].filter(Boolean).join(' ')

    return (
        <Component className={classes} style={combinedStyle} {...props}>
            {children}
        </Component>
    )
} 