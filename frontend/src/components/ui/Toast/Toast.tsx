'use client'

import { useEffect, useState } from 'react'
import { Icon } from '../Icon/Icon'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
    id: string
    type: ToastType
    title: string
    message?: string
    duration?: number
    persistent?: boolean
}

interface ToastProps {
    toast: ToastItem
    onClose: (id: string) => void
}

/**
 * Toast 通知组件
 * 
 * 功能特性：
 * - 四种通知类型：成功、错误、警告、信息
 * - 自动消失和手动关闭
 * - 移动端优化布局
 * - 滑动手势关闭（移动端）
 * - 渐入渐出动画
 * - 可配置持续时间
 * 
 * 设计规范：
 * - 最小高度: 64px (移动端) / 56px (桌面端)
 * - 圆角: 12px
 * - 毛玻璃背景效果
 * - 类型色彩区分
 * - 触摸友好的关闭按钮 (44x44px)
 */
export function Toast({ toast, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [startX, setStartX] = useState(0)
    const [currentX, setCurrentX] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    // 渐入动画
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50)
        return () => clearTimeout(timer)
    }, [])

    // 自动消失
    useEffect(() => {
        if (toast.persistent) return

        const duration = toast.duration || 4000
        const timer = setTimeout(() => {
            handleClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [toast.duration, toast.persistent])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => onClose(toast.id), 300)
    }

    // 移动端滑动关闭
    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX)
        setCurrentX(0)
        setIsDragging(false)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        const touchX = e.touches[0].clientX
        const deltaX = touchX - startX
        setCurrentX(deltaX)
        setIsDragging(Math.abs(deltaX) > 10)
    }

    const handleTouchEnd = () => {
        if (Math.abs(currentX) > 100) {
            handleClose()
        } else {
            setCurrentX(0)
        }
        setIsDragging(false)
    }

    const getTypeStyles = () => {
        const baseStyles = {
            background: 'rgba(26, 26, 26, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid',
            borderRadius: '12px',
        }

        switch (toast.type) {
            case 'success':
                return {
                    ...baseStyles,
                    borderColor: 'rgba(34, 197, 94, 0.30)',
                    background: 'rgba(34, 197, 94, 0.10)',
                }
            case 'error':
                return {
                    ...baseStyles,
                    borderColor: 'rgba(239, 68, 68, 0.30)',
                    background: 'rgba(239, 68, 68, 0.10)',
                }
            case 'warning':
                return {
                    ...baseStyles,
                    borderColor: 'rgba(251, 191, 36, 0.30)',
                    background: 'rgba(251, 191, 36, 0.10)',
                }
            case 'info':
                return {
                    ...baseStyles,
                    borderColor: 'rgba(59, 130, 246, 0.30)',
                    background: 'rgba(59, 130, 246, 0.10)',
                }
            default:
                return baseStyles
        }
    }

    const getTypeIcon = () => {
        switch (toast.type) {
            case 'success':
                return 'check-circle'
            case 'error':
                return 'x-circle'
            case 'warning':
                return 'exclamation-triangle'
            case 'info':
                return 'information-circle'
            default:
                return 'information-circle'
        }
    }

    const getTypeColor = () => {
        switch (toast.type) {
            case 'success':
                return '#22C55E'
            case 'error':
                return '#EF4444'
            case 'warning':
                return '#FBBF24'
            case 'info':
                return '#3B82F6'
            default:
                return '#3B82F6'
        }
    }

    return (
        <div
            style={{
                ...getTypeStyles(),
                transform: `translateX(${currentX}px) translateY(${isVisible ? '0' : '20px'})`,
                opacity: isVisible ? 1 : 0,
                transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '16px',
                minHeight: '64px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                maxWidth: '400px',
                position: 'relative',
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* 类型图标 */}
            <div style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Icon
                    name={getTypeIcon()}
                    size="lg"
                    style={{
                        width: '24px',
                        height: '24px',
                        color: getTypeColor(),
                    }}
                />
            </div>

            {/* 内容区域 */}
            <div style={{
                flex: 1,
                minWidth: 0,
            }}>
                <div style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    marginBottom: toast.message ? '4px' : '0',
                }}>
                    {toast.title}
                </div>
                {toast.message && (
                    <div style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: 1.4,
                    }}>
                        {toast.message}
                    </div>
                )}
            </div>

            {/* 关闭按钮 */}
            <button
                onClick={handleClose}
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                    borderRadius: '8px',
                    padding: '8px',
                    minWidth: '44px',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.10)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                }}
            >
                <Icon
                    name="x-mark"
                    size="sm"
                    style={{
                        width: '16px',
                        height: '16px',
                        color: 'var(--color-text-secondary)',
                    }}
                />
            </button>

            {/* 进度条（非持久化通知） */}
            {!toast.persistent && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'rgba(255, 255, 255, 0.10)',
                    borderRadius: '0 0 12px 12px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        height: '100%',
                        background: getTypeColor(),
                        animation: `toast-progress ${toast.duration || 4000}ms linear`,
                        transform: 'translateX(-100%)',
                    }} />
                </div>
            )}

            {/* 动画样式 */}
            <style jsx>{`
        @keyframes toast-progress {
          to {
            transform: translateX(0);
          }
        }
      `}</style>
        </div>
    )
} 