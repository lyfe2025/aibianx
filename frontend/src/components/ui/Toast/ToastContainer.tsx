'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { Toast, ToastData, ToastPosition } from './Toast'

/**
 * Toast容器组件 - ToastContainer
 * 
 * 负责管理和渲染所有Toast通知
 * 支持不同位置的Toast展示
 * 
 * 设计目标：
 * - 统一管理Toast显示
 * - 支持多个位置显示
 * - 移动端友好的布局
 * - Portal渲染避免样式冲突
 */

interface ToastContainerProps {
    toasts: ToastData[]
    onRemoveToast: (id: string) => void
    className?: string
}

export function ToastContainer({ 
    toasts, 
    onRemoveToast, 
    className = '' 
}: ToastContainerProps) {
    const [mounted, setMounted] = useState(false)

    // 确保只在客户端渲染
    useEffect(() => {
        setMounted(true)
    }, [])

    // 按位置分组Toast
    const groupToastsByPosition = (toasts: ToastData[]) => {
        const groups: Record<ToastPosition, ToastData[]> = {
            top: [],
            center: [],
            bottom: []
        }

        toasts.forEach(toast => {
            const position = toast.position || 'bottom'
            groups[position].push(toast)
        })

        return groups
    }

    const toastGroups = groupToastsByPosition(toasts)

    // 如果没有Toast或者还没有挂载，不渲染
    if (!mounted || toasts.length === 0) {
        return null
    }

    // 渲染Toast组
    const renderToastGroup = (toasts: ToastData[], position: ToastPosition) => {
        if (toasts.length === 0) return null

        return (
            <div 
                className={`toast-group toast-group-${position}`}
                key={position}
            >
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onClose={onRemoveToast}
                    />
                ))}
                
                {/* 位置特定样式 */}
                <style jsx>{`
                    .toast-group {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        width: 100%;
                        max-width: 400px;
                        pointer-events: none;
                    }

                    .toast-group > :global(*) {
                        pointer-events: auto;
                    }

                    .toast-group-top {
                        align-items: center;
                        justify-content: flex-start;
                    }

                    .toast-group-center {
                        align-items: center;
                        justify-content: center;
                    }

                    .toast-group-bottom {
                        align-items: center;
                        justify-content: flex-end;
                    }

                    /* 移动端优化 */
                    @media (max-width: 768px) {
                        .toast-group {
                            max-width: calc(100vw - 32px);
                            gap: 6px;
                        }
                    }
                `}</style>
            </div>
        )
    }

    // 使用Portal渲染到document.body
    return createPortal(
        <div className={`toast-container ${className}`}>
            {/* 顶部Toast */}
            <div className="toast-position toast-position-top">
                {renderToastGroup(toastGroups.top, 'top')}
            </div>

            {/* 中心Toast */}
            <div className="toast-position toast-position-center">
                {renderToastGroup(toastGroups.center, 'center')}
            </div>

            {/* 底部Toast */}
            <div className="toast-position toast-position-bottom">
                {renderToastGroup(toastGroups.bottom, 'bottom')}
            </div>

            {/* 容器样式 */}
            <style jsx>{`
                .toast-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 9999;
                    pointer-events: none;
                    display: flex;
                    flex-direction: column;
                }

                .toast-position {
                    position: absolute;
                    left: 0;
                    right: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    pointer-events: none;
                }

                .toast-position-top {
                    top: env(safe-area-inset-top, 20px);
                    padding-top: 20px;
                }

                .toast-position-center {
                    top: 50%;
                    transform: translateY(-50%);
                }

                .toast-position-bottom {
                    bottom: env(safe-area-inset-bottom, 20px);
                    padding-bottom: 20px;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .toast-position-top {
                        padding-top: 16px;
                    }

                    .toast-position-bottom {
                        padding-bottom: 16px;
                    }
                }

                /* iPhone X等设备的安全区域适配 */
                @supports (padding: max(0px)) {
                    .toast-position-top {
                        padding-top: max(20px, env(safe-area-inset-top, 20px));
                    }

                    .toast-position-bottom {
                        padding-bottom: max(20px, env(safe-area-inset-bottom, 20px));
                    }
                }

                /* 横屏适配 */
                @media (orientation: landscape) and (max-height: 500px) {
                    .toast-position-top {
                        padding-top: 10px;
                    }

                    .toast-position-bottom {
                        padding-bottom: 10px;
                    }
                }
            `}</style>
        </div>,
        document.body
    )
}