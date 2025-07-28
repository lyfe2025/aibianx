'use client'

import Image from 'next/image'
import { type HTMLAttributes } from 'react'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  fallback?: string
  className?: string
}

export const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  className = '',
  ...props
}: AvatarProps) => {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    xxl: 84  // 支持UserSidebar的84x84头像尺寸
  }

  const avatarSize = sizeMap[size]

  const avatarStyle = {
    width: `${avatarSize}px`,
    height: `${avatarSize}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text-primary)',
    fontSize: `${avatarSize * 0.4}px`,
    fontWeight: '500',
    overflow: 'hidden'
  }

  return (
    <div
      className={`avatar avatar--${size} ${className}`}
      style={avatarStyle}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={avatarSize}
          height={avatarSize}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span>{fallback || '?'}</span>
      )}
    </div>
  )
} 