'use client'

import Image from 'next/image'
import { type HTMLAttributes } from 'react'

export interface IconProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    name: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

export const Icon = ({
    name,
    size = 'md',
    className = '',
    ...props
}: IconProps) => {
    const sizeMap = {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
        xl: 32
    }

    const iconSize = sizeMap[size]

    return (
        <span
            className={`icon icon--${size} ${className}`}
            style={{ display: 'inline-block', lineHeight: 0 }}
            {...props}
        >
            <Image
                src={`/icons/${name}.svg`}
                alt={name}
                width={iconSize}
                height={iconSize}
                style={{ display: 'block' }}
            />
        </span>
    )
} 