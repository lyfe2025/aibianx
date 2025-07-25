'use client'

import { useEffect, useState } from 'react'

interface ReadingProgressProps {
    target?: string // 目标元素选择器，默认为整个文档
    height?: number // 进度条高度
    color?: string // 进度条颜色
    background?: string // 背景颜色
    position?: 'top' | 'bottom' // 位置
    showPercentage?: boolean // 是否显示百分比
    className?: string
}

/**
 * ReadingProgress 阅读进度条组件
 * 
 * 功能特性：
 * - 实时计算阅读进度
 * - 响应式设计（移动端/桌面端）
 * - 可配置样式和位置
 * - 可选百分比显示
 * - 平滑动画效果
 * - 自动隐藏机制
 * 
 * 设计规范：
 * - 高度: 2px-4px
 * - 颜色: 渐变蓝色主题
 * - 动画: 平滑过渡
 * - 层级: 固定在顶部/底部
 */
export function ReadingProgress({
    target,
    height = 3,
    color = 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
    background = 'rgba(42, 42, 42, 0.30)',
    position = 'top',
    showPercentage = false,
    className = '',
}: ReadingProgressProps) {
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const calculateProgress = () => {
            let element: Element | null = null

            if (target) {
                element = document.querySelector(target)
            }

            if (!element) {
                // 默认使用整个文档
                element = document.documentElement
            }

            if (!element) return

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const scrollHeight = element.scrollHeight - window.innerHeight

            if (scrollHeight <= 0) {
                setProgress(0)
                setIsVisible(false)
                return
            }

            const scrollProgress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
            setProgress(scrollProgress * 100)

            // 当开始滚动时显示进度条
            setIsVisible(scrollTop > 50)
        }

        // 初始计算
        calculateProgress()

        // 监听滚动事件
        const handleScroll = () => {
            requestAnimationFrame(calculateProgress)
        }

        // 监听窗口大小变化
        const handleResize = () => {
            calculateProgress()
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [target])

    if (!isVisible) return null

    return (
        <>
            {/* 进度条容器 */}
            <div
                className={`reading-progress ${className}`}
                style={{
                    position: 'fixed',
                    [position]: 0,
                    left: 0,
                    right: 0,
                    height: `${height}px`,
                    background,
                    zIndex: 1000,
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            >
                {/* 进度条 */}
                <div
                    style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: color,
                        transition: 'width 0.1s ease-out',
                        borderRadius: position === 'bottom' ? '2px 2px 0 0' : '0 0 2px 2px',
                    }}
                />
            </div>

            {/* 百分比显示 */}
            {showPercentage && (
                <div
                    style={{
                        position: 'fixed',
                        [position]: height + 8,
                        right: '16px',
                        background: 'rgba(26, 26, 26, 0.90)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 500,
                        padding: '4px 8px',
                        borderRadius: '12px',
                        border: '1px solid rgba(42, 42, 42, 0.50)',
                        zIndex: 1001,
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none',
                    }}
                >
                    {Math.round(progress)}%
                </div>
            )}

            {/* 移动端优化样式 */}
            <style jsx>{`
        @media (max-width: 768px) {
          .reading-progress {
            height: ${height + 1}px !important;
          }
        }
        
        /* 确保进度条在安全区域内 */
        @supports (padding: env(safe-area-inset-top)) {
          .reading-progress {
            ${position === 'top' ? 'top: env(safe-area-inset-top)' : ''};
            ${position === 'bottom' ? 'bottom: env(safe-area-inset-bottom)' : ''};
          }
        }
      `}</style>
        </>
    )
} 