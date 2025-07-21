'use client'

import { FC } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AvatarProps {
    src?: string
    alt?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    fallback?: string
    className?: string
}

export const Avatar: FC<AvatarProps> = ({
    src,
    alt = '',
    size = 'md',
    fallback,
    className
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',      // 32px
        md: 'w-10 h-10',    // 40px
        lg: 'w-12 h-12',    // 48px
        xl: 'w-16 h-16'     // 64px
    }

    const textSizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg'
    }

      if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64}
        className={cn(
          'rounded-full object-cover',
          className
        )}
      />
    )
  }

    return (
        <div
            className={cn(
                'rounded-full bg-background-secondary border border-border-primary',
                'flex items-center justify-center',
                'text-text-muted font-medium',
                sizeClasses[size],
                textSizeClasses[size],
                className
            )}
        >
            {fallback || '?'}
        </div>
    )
} 