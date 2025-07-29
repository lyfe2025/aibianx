'use client'

import Image from 'next/image'
import { HTMLAttributes, useState } from 'react'

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
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

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
    backgroundColor: imageError || !src ? 'var(--color-bg-secondary)' : 'transparent',
    color: 'var(--color-text-primary)',
    fontSize: `${avatarSize * 0.4}px`,
    fontWeight: '500',
    overflow: 'hidden',
    position: 'relative' as const
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageError(false)
    setImageLoading(false)
  }

  // 生成fallback文字
  const getFallbackText = () => {
    if (fallback) return fallback
    if (alt && alt !== 'Avatar') {
      // 提取中文字符的第一个字符，或英文的首字母
      const match = alt.match(/[\u4e00-\u9fa5]/) || alt.match(/[A-Za-z]/)
      return match ? match[0].toUpperCase() : '?'
    }
    return '?'
  }

  return (
    <div
      className={`avatar avatar--${size} ${className}`}
      style={avatarStyle}
      {...props}
    >
      {src && !imageError ? (
        <>
          <Image
            src={src}
            alt={alt}
            width={avatarSize}
            height={avatarSize}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoading ? 0 : 1,
              transition: 'opacity 0.2s ease-in-out'
            }}
            onError={handleImageError}
            onLoad={handleImageLoad}
            unoptimized={process.env.NODE_ENV === 'development'}
          />
          {imageLoading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-bg-secondary)',
                fontSize: `${avatarSize * 0.3}px`,
                color: 'var(--color-text-muted)'
              }}
            >
              ⟳
            </div>
          )}
        </>
      ) : (
        <span style={{
          background: `linear-gradient(135deg, #3B82F6, #8B5CF6)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '600'
        }}>
          {getFallbackText()}
        </span>
      )}
    </div>
  )
} 