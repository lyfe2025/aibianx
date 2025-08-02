'use client'

import { useEffect, useState } from 'react'

/**
 * 移动端Toast通知组件 - Toast
 * 
 * 专为移动端优化的通知提示系统
 * 支持多种类型的消息展示和自动消失
 * 
 * 设计目标：
 * - 移动端友好的通知展示
 * - 多种消息类型支持
 * - 自动消失和手动关闭
 * - 优雅的动画效果
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top' | 'bottom' | 'center'

export interface ToastData {
    id: string
    type: ToastType
    title: string
    message?: string
    duration?: number
    position?: ToastPosition
    showCloseButton?: boolean
    action?: {
        label: string
        onClick: () => void
    }
}

interface ToastProps {
    toast: ToastData
    onClose: (id: string) => void
    className?: string
}

export function Toast({ toast, onClose, className = '' }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)

    // 获取Toast类型对应的图标和样式
    const getToastConfig = (type: ToastType) => {
        switch (type) {
            case 'success':
                return {
                    icon: '✅',
                    className: 'toast-success',
                    backgroundColor: '#10B981',
                    borderColor: '#059669'
                }
            case 'error':
                return {
                    icon: '❌',
                    className: 'toast-error',
                    backgroundColor: '#EF4444',
                    borderColor: '#DC2626'
                }
            case 'warning':
                return {
                    icon: '⚠️',
                    className: 'toast-warning',
                    backgroundColor: '#F59E0B',
                    borderColor: '#D97706'
                }
            case 'info':
                return {
                    icon: 'ℹ️',
                    className: 'toast-info',
                    backgroundColor: '#3B82F6',
                    borderColor: '#2563EB'
                }
            default:
                return {
                    icon: 'ℹ️',
                    className: 'toast-info',
                    backgroundColor: '#3B82F6',
                    borderColor: '#2563EB'
                }
        }
    }

    const config = getToastConfig(toast.type)

    // 处理关闭动画
    const handleClose = () => {
        setIsLeaving(true)
        setTimeout(() => {
            onClose(toast.id)
        }, 300) // 动画持续时间
    }

    // 自动消失逻辑
    useEffect(() => {
        setIsVisible(true)
        
        if (toast.duration && toast.duration > 0) {
            const timer = setTimeout(() => {
                handleClose()
            }, toast.duration)

            return () => clearTimeout(timer)
        }
    }, [toast.duration])

    // 处理操作按钮点击
    const handleActionClick = () => {
        if (toast.action?.onClick) {
            toast.action.onClick()
            handleClose()
        }
    }

    return (
        <div 
            className={`
                toast 
                ${config.className} 
                ${isVisible ? 'toast-visible' : ''} 
                ${isLeaving ? 'toast-leaving' : ''} 
                ${className}
            `}
            style={{
                backgroundColor: config.backgroundColor,
                borderColor: config.borderColor
            }}
        >
            {/* Toast内容 */}
            <div className="toast-content">
                {/* 图标 */}
                <div className="toast-icon">
                    {config.icon}
                </div>

                {/* 文本内容 */}
                <div className="toast-text">
                    <div className="toast-title">
                        {toast.title}
                    </div>
                    {toast.message && (
                        <div className="toast-message">
                            {toast.message}
                        </div>
                    )}
                </div>

                {/* 操作按钮 */}
                {toast.action && (
                    <button 
                        className="toast-action"
                        onClick={handleActionClick}
                    >
                        {toast.action.label}
                    </button>
                )}

                {/* 关闭按钮 */}
                {toast.showCloseButton && (
                    <button 
                        className="toast-close"
                        onClick={handleClose}
                        aria-label="关闭通知"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* 进度条（如果有持续时间） */}
            {toast.duration && toast.duration > 0 && (
                <div 
                    className="toast-progress"
                    style={{
                        animationDuration: `${toast.duration}ms`
                    }}
                />
            )}

            {/* 移动端专用样式 */}
            <style jsx>{`
                .toast {
                    position: relative;
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto 12px auto;
                    border-radius: 12px;
                    border: 1px solid;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(12px);
                    overflow: hidden;
                    transform: translateY(100px);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .toast-visible {
                    transform: translateY(0);
                    opacity: 1;
                }

                .toast-leaving {
                    transform: translateY(-100px);
                    opacity: 0;
                }

                .toast-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 16px;
                    position: relative;
                    z-index: 1;
                }

                .toast-icon {
                    font-size: 20px;
                    line-height: 1;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .toast-text {
                    flex: 1;
                    min-width: 0;
                }

                .toast-title {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    color: white;
                    margin: 0 0 4px 0;
                    line-height: 1.4;
                }

                .toast-message {
                    font-size: var(--font-size-xs);
                    color: rgba(255, 255, 255, 0.9);
                    margin: 0;
                    line-height: 1.4;
                }

                .toast-action {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                .toast-action:hover {
                    background: rgba(255, 255, 255, 0.3);
                    border-color: rgba(255, 255, 255, 0.5);
                }

                .toast-close {
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.8);
                    padding: 4px;
                    cursor: pointer;
                    font-size: var(--font-size-sm);
                    line-height: 1;
                    transition: color 0.3s ease;
                    flex-shrink: 0;
                }

                .toast-close:hover {
                    color: white;
                }

                .toast-progress {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.3);
                    transform-origin: left;
                    animation: progressBar linear;
                }

                @keyframes progressBar {
                    from {
                        transform: scaleX(1);
                    }
                    to {
                        transform: scaleX(0);
                    }
                }

                /* 类型特定样式 */
                .toast-success {
                    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                }

                .toast-error {
                    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                }

                .toast-warning {
                    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                }

                .toast-info {
                    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .toast {
                        max-width: calc(100vw - 32px);
                        margin: 0 16px 12px 16px;
                    }

                    .toast-content {
                        padding: 14px;
                        gap: 10px;
                    }

                    .toast-icon {
                        font-size: 18px;
                    }

                    .toast-title {
                        font-size: var(--font-size-xs);
                    }

                    .toast-message {
                        font-size: 11px;
                    }

                    .toast-action {
                        padding: 4px 8px;
                        font-size: 11px;
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .toast-action,
                    .toast-close {
                        touch-action: manipulation;
                        min-height: 44px;
                        min-width: 44px;
                    }

                    .toast-action:active {
                        transform: scale(0.95);
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .toast-title,
                    .toast-message {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }

                /* 可访问性增强 */
                @media (prefers-reduced-motion: reduce) {
                    .toast,
                    .toast-action,
                    .toast-close {
                        transition: none;
                    }

                    .toast-progress {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    )
}