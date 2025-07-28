'use client'

import { type CSSProperties } from 'react'
import { Icon } from '../Icon'

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
    // 直接使用Icon组件显示privilege-icon图标
    // 该图标是黄色的皇冠设计，适合各种背景
    return (
        <Icon
            name="privilege-icon"
            size={size}
            className={`crown-icon crown-icon--${size} ${className}`}
            style={{
                flexShrink: 0,
                transition: 'all 0.2s ease',
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
                ...style
            }}
            preserveColor={true}
        />
    )
} 