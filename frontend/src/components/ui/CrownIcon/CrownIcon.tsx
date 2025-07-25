'use client'

import { type CSSProperties, useState, useEffect } from 'react'
import { useThemeStore } from '@/stores'

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
    const { theme } = useThemeStore()

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

    // 主题适配的样式
    const getThemeStyles = () => {
        if (theme === 'light') {
            return {
                filter: 'drop-shadow(0 1px 3px rgba(245, 158, 11, 0.35))',
                color: '#F59E0B', // 亮色模式使用黄色
            }
        } else {
            return {
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))',
                color: 'currentColor', // 暗色模式保持原有行为
            }
        }
    }

    const themeStyles = getThemeStyles()

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
                    color: 'currentColor',
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
                        height: iconSize
                    }}
                >
                    <path
                        d="M5 16L3 8L8 11L12 5L16 11L21 8L19 16H5Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 16H18L17 19H7L6 16Z"
                        fill="currentColor"
                        fillOpacity="0.8"
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
                ...themeStyles,
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
                    height: iconSize
                }}
            >
                <path
                    d="M5 16L3 8L8 11L12 5L16 11L21 8L19 16H5Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6 16H18L17 19H7L6 16Z"
                    fill="currentColor"
                    fillOpacity="0.8"
                />
            </svg>
        </span>
    )
} 