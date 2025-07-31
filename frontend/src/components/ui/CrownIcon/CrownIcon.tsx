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
    // 尺寸映射 - 匹配StarIcon的尺寸系统
    const sizeMap = {
        xs: { width: 12, height: 12 }, // 匹配 --font-size-xs (12px)
        sm: { width: 14, height: 14 }, // 匹配 --font-size-sm (14px)
        md: { width: 16, height: 16 }, // 匹配 --font-size-base (16px)
        lg: { width: 20, height: 20 }  // 匹配 --font-size-lg (20px)
    }

    const { width, height } = sizeMap[size]

    // 重要：图标组件不设置颜色，完全继承父元素的文字颜色
    return (
        <span
            className={`crown-icon crown-icon--${size} ${className}`}
            style={{
                display: 'inline-block',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
                width,
                height,
                lineHeight: 0,
                verticalAlign: 'middle', // 与文字基线对齐
                // 不设置任何颜色，完全继承父元素
                ...style
            }}
        >
            <svg
                width={width}
                height={height}
                viewBox="0 0 20 20"
                fill="#F59E0B" // 直接强制设置金橙色
                xmlns="http://www.w3.org/2000/svg"
                style={{ 
                    display: 'block', 
                    color: '#F59E0B',
                    fill: '#F59E0B'
                }}
            >
                <path
                    d="M0 14.1667L16.6667 14.1667L16.6667 15.8333L0 15.8333L0 14.1667ZM0 2.5L4.16667 5L8.33335 0L12.5 5L16.6667 2.5L16.6667 12.5L0 12.5L0 2.5Z"
                    fillRule="nonzero"
                    transform="matrix(1 0 0 1 1.67073 1.66667)"
                />
            </svg>
        </span>
    )
} 