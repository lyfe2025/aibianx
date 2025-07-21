'use client'

import { FC } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface IconProps {
    name: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    className?: string
    onClick?: () => void
}

export const Icon: FC<IconProps> = ({
    name,
    size = 'md',
    className,
    onClick
}) => {
      const getSizeProps = (size: string) => {
    const sizeMap = {
      xs: 12, sm: 16, md: 20, lg: 24, xl: 32
    }
    return sizeMap[size as keyof typeof sizeMap] || 20
  }

    return (
        <Image
            src={`/icons/${name}.svg`}
            alt={name}
            onClick={onClick}
                  width={getSizeProps(size)}
      height={getSizeProps(size)}
            className={cn(
                'inline-block',
                onClick && 'cursor-pointer',
                className
            )}
        />
    )
} 