'use client'

import { type CSSProperties } from 'react'

interface CrownIconProps {
    size?: 'xs' | 'sm' | 'md' | 'lg'
    className?: string
    style?: CSSProperties
}

export const CrownIcon = ({
    size = 'xs',
    className = '',
    style = {}
}: CrownIconProps) => {
    const sizeMap = {
        xs: 14,
        sm: 16,
        md: 18,
        lg: 20
    }

    const iconSize = sizeMap[size]

    return (
        <span
            className={`crown-icon crown-icon--${size} ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: iconSize,
                height: iconSize,
                flexShrink: 0,
                ...style
            }}
        >
            <img
                src="/icons/membership-premium.svg"
                alt="会员专享"
                style={{
                    display: 'block',
                    width: iconSize,
                    height: iconSize,
                    objectFit: 'contain',
                    // 专业级颜色转换：白色SVG转金色
                    filter: 'brightness(0) saturate(100%) invert(76%) sepia(84%) saturate(2485%) hue-rotate(33deg) brightness(103%) contrast(103%) drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))'
                }}
            />
        </span>
    )
} 