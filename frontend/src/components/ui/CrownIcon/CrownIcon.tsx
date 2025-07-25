'use client'

import { type CSSProperties, useState, useEffect } from 'react'
import Image from 'next/image'

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
    // SSR兼容：确保服务端和客户端初始状态一致
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const sizeMap = {
        xs: 14,
        sm: 16,
        md: 18,
        lg: 20
    }

    const iconSize = sizeMap[size]

    // SSR期间显示占位符，避免水合错误
    if (!isClient) {
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
                    background: 'rgba(255, 215, 0, 0.1)',
                    borderRadius: '2px',
                    ...style
                }}
                aria-label="Crown"
            />
        )
    }

    // 客户端渲染：显示实际图标
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
            <Image
                src="/icons/membership-crown-design.svg"
                alt="Crown"
                width={iconSize}
                height={iconSize}
                style={{
                    display: 'block',
                    width: iconSize,
                    height: iconSize,
                    objectFit: 'contain'
                }}
            />
        </span>
    )
} 