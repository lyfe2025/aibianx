'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Toast, ToastItem } from './Toast'

interface ToastContainerProps {
    toasts: ToastItem[]
    onRemoveToast: (id: string) => void
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
    maxToasts?: number
}

/**
 * ToastContainer 组件
 * 
 * 功能特性：
 * - 管理多个Toast通知的显示
 * - 响应式定位（移动端底部，桌面端右上角）
 * - 堆叠动画效果
 * - 最大数量限制
 * - 自动清理过期通知
 * - Portal渲染避免层级问题
 * 
 * 移动端优化：
 * - 底部居中显示
 * - 全宽布局适配
 * - 安全区域适配
 * - 滑动手势支持
 */
export function ToastContainer({
    toasts,
    onRemoveToast,
    position = 'top-right',
    maxToasts = 5
}: ToastContainerProps) {
    const [mounted, setMounted] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // 确保组件在客户端挂载
    useEffect(() => {
        setMounted(true)

        // 检测移动端
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // 限制Toast数量
    const visibleToasts = toasts.slice(0, maxToasts)

    const getContainerStyles = () => {
        const baseStyles = {
            position: 'fixed' as const,
            zIndex: 9999,
            pointerEvents: 'none' as const,
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '12px',
        }

        if (isMobile) {
            // 移动端：底部居中，全宽布局
            return {
                ...baseStyles,
                bottom: '20px',
                left: '16px',
                right: '16px',
                alignItems: 'center',
                paddingBottom: 'env(safe-area-inset-bottom)',
            }
        }

        // 桌面端：根据position定位
        switch (position) {
            case 'top-right':
                return {
                    ...baseStyles,
                    top: '24px',
                    right: '24px',
                    alignItems: 'flex-end',
                }
            case 'top-left':
                return {
                    ...baseStyles,
                    top: '24px',
                    left: '24px',
                    alignItems: 'flex-start',
                }
            case 'bottom-right':
                return {
                    ...baseStyles,
                    bottom: '24px',
                    right: '24px',
                    alignItems: 'flex-end',
                }
            case 'bottom-left':
                return {
                    ...baseStyles,
                    bottom: '24px',
                    left: '24px',
                    alignItems: 'flex-start',
                }
            case 'top-center':
                return {
                    ...baseStyles,
                    top: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    alignItems: 'center',
                }
            case 'bottom-center':
                return {
                    ...baseStyles,
                    bottom: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    alignItems: 'center',
                }
            default:
                return {
                    ...baseStyles,
                    top: '24px',
                    right: '24px',
                    alignItems: 'flex-end',
                }
        }
    }

    const getToastStyles = (index: number) => {
        const isStacked = visibleToasts.length > 1
        const stackOffset = isStacked ? index * 4 : 0
        const scaleOffset = isStacked ? (visibleToasts.length - index - 1) * 0.02 : 0

        return {
            pointerEvents: 'auto' as const,
            transform: `translateY(-${stackOffset}px) scale(${1 - scaleOffset})`,
            zIndex: visibleToasts.length - index,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }
    }

    if (!mounted) return null

    return createPortal(
        <div style={getContainerStyles()}>
            {visibleToasts.map((toast, index) => (
                <div key={toast.id} style={getToastStyles(index)}>
                    <Toast
                        toast={toast}
                        onClose={onRemoveToast}
                    />
                </div>
            ))}

            {/* 全局Toast样式 */}
            <style jsx global>{`
        @media (max-width: 768px) {
          /* 移动端Toast容器样式 */
          .toast-container-mobile {
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
        
        /* Toast容器动画 */
        @keyframes toast-slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes toast-slide-in-left {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes toast-slide-in-bottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes toast-slide-in-top {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>,
        document.body
    )
} 