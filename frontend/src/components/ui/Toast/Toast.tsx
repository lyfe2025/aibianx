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
            background: 'var(--color-bg-glass)',
            backdropFilter: 'blur(12px)',
            border: '1px solid',
            borderRadius: '12px',
        }

        switch (toast.type) {
            case 'success':
                return {
                    ...baseStyles,
                    borderColor: 'var(--color-success-border)',
                    background: 'var(--color-success-bg)',
                }
            case 'error':
                return {
                    ...baseStyles,
                    borderColor: 'var(--color-error-border)',
                    background: 'var(--color-error-bg)',
                }
            case 'warning':
                return {
                    ...baseStyles,
                    borderColor: 'var(--color-warning-border)',
                    background: 'var(--color-warning-bg)',
                }
            case 'info':
                return {
                    ...baseStyles,
                    borderColor: 'var(--color-info-border)',
                    background: 'var(--color-info-bg)',
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
                return 'var(--color-success)'
            case 'error':
                return 'var(--color-error)'
            case 'warning':
                return 'var(--color-warning)'
            case 'info':
                return 'var(--color-info)'
            default:
                return 'var(--color-info)'
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
                    background: 'var(--color-decoration-light)',
                    border: '1px solid var(--color-border-primary)',
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
                    e.currentTarget.style.background = 'var(--color-hover)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-decoration-light)'
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
                    background: 'var(--color-decoration-light)',
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

// 添加毛玻璃风格Toast通知函数
export function showToast(message: string, type: 'success' | 'error' = 'success') {
    // 创建临时Toast元素
    const toast = document.createElement('div')
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(26, 26, 26, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(42, 42, 42, 0.70);
        color: var(--color-text-primary, #FFFFFF);
        padding: 16px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        z-index: 100000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 90vw;
        text-align: center;
        font-family: var(--font-family-primary);
    `

    // 添加成功/错误指示器
    const indicator = type === 'success' ? '✅ ' : '❌ '
    toast.textContent = indicator + message
    document.body.appendChild(toast)

    // 动画显示
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)'
    }, 100)

    // 2.5秒后自动移除
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)'
        toast.style.opacity = '0'
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast)
            }
        }, 400)
    }, 2500)
} 