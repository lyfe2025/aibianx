'use client'

import { useEffect, useState } from 'react'
import { Icon } from '../Icon/Icon'

interface FontSizeControllerProps {
    target?: string // 目标元素选择器
    minSize?: number // 最小字体大小
    maxSize?: number // 最大字体大小
    step?: number // 调节步长
    defaultSize?: number // 默认字体大小
    position?: 'fixed' | 'static' // 定位方式
    className?: string
    onSizeChange?: (size: number) => void
}

/**
 * FontSizeController 字体大小调节组件
 * 
 * 功能特性：
 * - 字体大小调节（+/-按钮）
 * - 实时预览效果
 * - 本地存储记忆功能
 * - 移动端触摸友好
 * - 无障碍支持
 * - 重置功能
 * 
 * 设计规范：
 * - 按钮尺寸: 44x44px (移动端友好)
 * - 毛玻璃背景效果
 * - 圆角: 12px
 * - 渐变边框
 */
export function FontSizeController({
    target = '.article-content, .content-body, article',
    minSize = 12,
    maxSize = 24,
    step = 2,
    defaultSize = 16,
    position = 'fixed',
    className = '',
    onSizeChange,
}: FontSizeControllerProps) {
    const [fontSize, setFontSize] = useState(defaultSize)
    const [isVisible, setIsVisible] = useState(false)

    // 从本地存储加载字体大小设置
    useEffect(() => {
        const savedSize = localStorage.getItem('reading-font-size')
        if (savedSize) {
            const size = parseInt(savedSize, 10)
            if (size >= minSize && size <= maxSize) {
                setFontSize(size)
            }
        }
    }, [minSize, maxSize])

    // 应用字体大小
    useEffect(() => {
        const elements = document.querySelectorAll(target)
        elements.forEach(element => {
            const htmlElement = element as HTMLElement
            htmlElement.style.fontSize = `${fontSize}px`
            htmlElement.style.lineHeight = '1.6'
        })

        // 保存到本地存储
        localStorage.setItem('reading-font-size', fontSize.toString())

        // 回调通知
        onSizeChange?.(fontSize)
    }, [fontSize, target, onSizeChange])

    // 检测滚动显示控制器
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            setIsVisible(scrollTop > 200)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const increaseFontSize = () => {
        setFontSize(prev => Math.min(prev + step, maxSize))
    }

    const decreaseFontSize = () => {
        setFontSize(prev => Math.max(prev - step, minSize))
    }

    const resetFontSize = () => {
        setFontSize(defaultSize)
    }

    const containerStyles = position === 'fixed' ? {
        position: 'fixed' as const,
        bottom: '24px',
        right: '24px',
        zIndex: 100,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' as const : 'hidden' as const,
        transition: 'all 0.3s ease',
    } : {}

    return (
        <div
            className={`font-size-controller ${className}`}
            style={{
                ...containerStyles,
                background: 'rgba(26, 26, 26, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(42, 42, 42, 0.70)',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.30)',
            }}
            role="toolbar"
            aria-label="字体大小调节"
        >
            {/* 减小字体按钮 */}
            <button
                onClick={decreaseFontSize}
                disabled={fontSize <= minSize}
                style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    border: '1px solid rgba(42, 42, 42, 0.50)',
                    background: fontSize <= minSize
                        ? 'rgba(42, 42, 42, 0.30)'
                        : 'rgba(59, 130, 246, 0.10)',
                    color: fontSize <= minSize
                        ? 'var(--color-text-disabled)'
                        : 'var(--color-primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: fontSize <= minSize ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                    if (fontSize > minSize) {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.20)'
                    }
                }}
                onMouseLeave={(e) => {
                    if (fontSize > minSize) {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.10)'
                    }
                }}
                aria-label="减小字体"
                title="减小字体"
            >
                <Icon
                    name="minus"
                    size="sm"
                    style={{
                        width: '16px',
                        height: '16px',
                    }}
                />
            </button>

            {/* 当前字体大小显示 */}
            <div
                style={{
                    minWidth: '48px',
                    textAlign: 'center',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 500,
                    userSelect: 'none',
                }}
                aria-live="polite"
            >
                {fontSize}px
            </div>

            {/* 增大字体按钮 */}
            <button
                onClick={increaseFontSize}
                disabled={fontSize >= maxSize}
                style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    border: '1px solid rgba(42, 42, 42, 0.50)',
                    background: fontSize >= maxSize
                        ? 'rgba(42, 42, 42, 0.30)'
                        : 'rgba(59, 130, 246, 0.10)',
                    color: fontSize >= maxSize
                        ? 'var(--color-text-disabled)'
                        : 'var(--color-primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: fontSize >= maxSize ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                    if (fontSize < maxSize) {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.20)'
                    }
                }}
                onMouseLeave={(e) => {
                    if (fontSize < maxSize) {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.10)'
                    }
                }}
                aria-label="增大字体"
                title="增大字体"
            >
                <Icon
                    name="plus"
                    size="sm"
                    style={{
                        width: '16px',
                        height: '16px',
                    }}
                />
            </button>

            {/* 重置按钮 */}
            {fontSize !== defaultSize && (
                <button
                    onClick={resetFontSize}
                    style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        border: '1px solid rgba(42, 42, 42, 0.50)',
                        background: 'rgba(107, 114, 128, 0.10)',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        userSelect: 'none',
                        marginLeft: '4px',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(107, 114, 128, 0.20)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(107, 114, 128, 0.10)'
                    }}
                    aria-label="重置字体大小"
                    title="重置字体大小"
                >
                    <Icon
                        name="arrow-path"
                        size="sm"
                        style={{
                            width: '16px',
                            height: '16px',
                        }}
                    />
                </button>
            )}

            {/* 移动端优化样式 */}
            <style jsx>{`
        @media (max-width: 768px) {
          .font-size-controller {
            bottom: 80px !important;
            right: 16px !important;
            transform: scale(1.1);
          }
        }
        
        /* 安全区域适配 */
        @supports (padding: env(safe-area-inset-bottom)) {
          .font-size-controller {
            bottom: calc(24px + env(safe-area-inset-bottom)) !important;
          }
        }
      `}</style>
        </div>
    )
} 