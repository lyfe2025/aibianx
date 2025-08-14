'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { ToastContainer } from './ToastContainer'
import { ToastData, ToastType, ToastPosition } from './Toast'

/**
 * Toast上下文和Provider - ToastContext
 * 
 * 提供全局Toast管理功能
 * 支持添加、移除和自动管理Toast
 * 
 * 设计目标：
 * - 全局Toast状态管理
 * - 简洁的API接口
 * - 自动ID生成和清理
 * - TypeScript类型安全
 */

interface ToastContextType {
    toasts: ToastData[]
    showToast: (options: ShowToastOptions) => string
    hideToast: (id: string) => void
    clearAllToasts: () => void
}

interface ShowToastOptions {
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

const ToastContext = createContext<ToastContextType | undefined>(undefined)

// 生成唯一ID
const generateId = () => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Toast Provider组件
 */
interface ToastProviderProps {
    children: ReactNode
    maxToasts?: number
    defaultDuration?: number
    defaultPosition?: ToastPosition
}

export function ToastProvider({ 
    children, 
    maxToasts = 5,
    defaultDuration = 4000,
    defaultPosition = 'bottom'
}: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastData[]>([])

    // 显示Toast
    const showToast = useCallback((options: ShowToastOptions): string => {
        const id = generateId()
        
        const newToast: ToastData = {
            id,
            type: options.type,
            title: options.title,
            message: options.message,
            duration: options.duration ?? defaultDuration,
            position: options.position ?? defaultPosition,
            showCloseButton: options.showCloseButton ?? true,
            action: options.action
        }

        setToasts(prevToasts => {
            const updatedToasts = [...prevToasts, newToast]
            
            // 如果超过最大数量，移除最旧的Toast
            if (updatedToasts.length > maxToasts) {
                return updatedToasts.slice(-maxToasts)
            }
            
            return updatedToasts
        })

        return id
    }, [defaultDuration, defaultPosition, maxToasts])

    // 隐藏特定Toast
    const hideToast = useCallback((id: string) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
    }, [])

    // 清除所有Toast
    const clearAllToasts = useCallback(() => {
        setToasts([])
    }, [])

    const contextValue: ToastContextType = {
        toasts,
        showToast,
        hideToast,
        clearAllToasts
    }

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer 
                toasts={toasts} 
                onRemoveToast={hideToast}
            />
        </ToastContext.Provider>
    )
}

/**
 * useToast Hook
 * 
 * 提供便捷的Toast操作方法
 */
export function useToast() {
    const context = useContext(ToastContext)
    
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }

    const { showToast, hideToast, clearAllToasts, toasts } = context

    // 便捷方法
    const toast = {
        success: (title: string, options?: Partial<ShowToastOptions>) =>
            showToast({ type: 'success', title, ...options }),
            
        error: (title: string, options?: Partial<ShowToastOptions>) =>
            showToast({ type: 'error', title, ...options }),
            
        warning: (title: string, options?: Partial<ShowToastOptions>) =>
            showToast({ type: 'warning', title, ...options }),
            
        info: (title: string, options?: Partial<ShowToastOptions>) =>
            showToast({ type: 'info', title, ...options }),

        // 自定义Toast
        custom: (options: ShowToastOptions) =>
            showToast(options),

        // 操作方法
        dismiss: hideToast,
        clear: clearAllToasts
    }

    return {
        toast,
        toasts,
        // 直接访问的方法（向后兼容）
        showToast,
        hideToast,
        clearAllToasts
    }
}

/**
 * 预定义的常用Toast配置
 */
export const ToastPresets = {
    // 邮件订阅成功
    emailSubscribed: {
        type: 'success' as ToastType,
        title: '邮件订阅成功',
        message: '感谢订阅！我们会定期向您发送高质量的AI变现资讯',
        duration: 5000,
        action: {
            label: '查看',
            onClick: () => {
                // 跳转到个人中心
                window.location.href = '/profile'
            }
        }
    },

    // 会员升级成功
    membershipUpgraded: {
        type: 'success' as ToastType,
        title: '会员升级成功',
        message: '欢迎成为会员！现在可以访问所有专享内容',
        duration: 6000,
        action: {
            label: '探索',
            onClick: () => {
                window.location.href = '/weekly'
            }
        }
    },

    // 收藏成功
    bookmarked: {
        type: 'success' as ToastType,
        title: '收藏成功',
        message: '已添加到收藏夹，可在个人中心查看',
        duration: 3000
    },

    // 分享成功
    shared: {
        type: 'success' as ToastType,
        title: '分享成功',
        message: '链接已复制到剪贴板',
        duration: 3000
    },

    // 登录成功
    loginSuccess: {
        type: 'success' as ToastType,
        title: '登录成功',
        message: '欢迎回来！',
        duration: 3000
    },

    // 注册成功
    registerSuccess: {
        type: 'success' as ToastType,
        title: '注册成功',
        message: '账户创建成功！您现在可以使用邮箱和密码登录了',
        duration: 4000,
        action: {
            label: '立即登录',
            onClick: () => {
                // 这个onClick会在RegisterForm中被覆盖为实际的登录逻辑
                console.log('切换到登录表单')
            }
        }
    },

    // 网络错误
    networkError: {
        type: 'error' as ToastType,
        title: '网络连接失败',
        message: '请检查网络连接后重试',
        duration: 5000,
        action: {
            label: '重试',
            onClick: () => {
                window.location.reload()
            }
        }
    },

    // 权限不足
    permissionDenied: {
        type: 'warning' as ToastType,
        title: '需要会员权限',
        message: '该内容仅限会员访问，升级会员解锁更多内容',
        duration: 6000,
        action: {
            label: '升级',
            onClick: () => {
                window.location.href = '/membership'
            }
        }
    },

    // 功能即将上线
    comingSoon: {
        type: 'info' as ToastType,
        title: '功能即将上线',
        message: '我们正在努力开发中，敬请期待',
        duration: 4000
    }
}