'use client'

import { type CSSProperties, useState, useEffect } from 'react'

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

    // 统一的样式，强制白色，不被CSS覆盖
    const iconStyles = {
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
        color: '#FFFFFF !important', // 强制白色
    }

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
                    minWidth: iconSize,
                    minHeight: iconSize,
                    color: '#FFFFFF !important',
                    ...style
                }}
                aria-label="Crown"
            >
                <svg
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                        display: 'block',
                        width: iconSize,
                        height: iconSize,
                        color: '#FFFFFF'
                    }}
                >
                    {/* 实心白色皇冠 - 强制白色，不被CSS覆盖 */}
                    <path
                        d="M5 16L3 8L8 11L12 5L16 11L21 8L19 16H5Z"
                        fill="#FFFFFF"
                        stroke="none"
                    />
                    <path
                        d="M6 16H18L17 19H7L6 16Z"
                        fill="#FFFFFF"
                        fillOpacity="0.9"
                        stroke="none"
                    />
                </svg>
            </span>
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
                minWidth: iconSize,
                minHeight: iconSize,
                ...iconStyles,
                transition: 'all 0.2s ease',
                ...style
            }}
        >
            <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="none"
                style={{
                    display: 'block',
                    width: iconSize,
                    height: iconSize,
                    color: '#FFFFFF'
                }}
            >
                {/* 实心白色皇冠 - 强制白色，不被CSS覆盖 */}
                <path
                    d="M5 16L3 8L8 11L12 5L16 11L21 8L19 16H5Z"
                    fill="#FFFFFF"
                    stroke="none"
                />
                <path
                    d="M6 16H18L17 19H7L6 16Z"
                    fill="#FFFFFF"
                    fillOpacity="0.9"
                    stroke="none"
                />
            </svg>
        </span>
    )
} 