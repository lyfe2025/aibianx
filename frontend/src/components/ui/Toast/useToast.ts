'use client'

import { useState, useCallback } from 'react'
import { ToastItem, ToastType } from './Toast'

let toastId = 0

/**
 * useToast Hook
 * 
 * 功能特性：
 * - 简单的API来显示不同类型的Toast
 * - 自动生成唯一ID
 * - Toast生命周期管理
 * - 类型安全的接口
 * 
 * 使用方法：
 * ```ts
 * const { showToast, showSuccess, showError, showWarning, showInfo } = useToast()
 * 
 * showSuccess('操作成功', '您的操作已成功完成')
 * showError('操作失败', '请稍后重试')
 * ```
 */
export function useToast() {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const showToast = useCallback((
        type: ToastType,
        title: string,
        message?: string,
        options?: {
            duration?: number
            persistent?: boolean
        }
    ) => {
        const id = `toast-${++toastId}`
        const newToast: ToastItem = {
            id,
            type,
            title,
            message,
            duration: options?.duration,
            persistent: options?.persistent,
        }

        setToasts(prev => [...prev, newToast])
        return id
    }, [])

    const showSuccess = useCallback((
        title: string,
        message?: string,
        options?: { duration?: number; persistent?: boolean }
    ) => {
        return showToast('success', title, message, options)
    }, [showToast])

    const showError = useCallback((
        title: string,
        message?: string,
        options?: { duration?: number; persistent?: boolean }
    ) => {
        return showToast('error', title, message, options)
    }, [showToast])

    const showWarning = useCallback((
        title: string,
        message?: string,
        options?: { duration?: number; persistent?: boolean }
    ) => {
        return showToast('warning', title, message, options)
    }, [showToast])

    const showInfo = useCallback((
        title: string,
        message?: string,
        options?: { duration?: number; persistent?: boolean }
    ) => {
        return showToast('info', title, message, options)
    }, [showToast])

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }, [])

    const clearAllToasts = useCallback(() => {
        setToasts([])
    }, [])

    return {
        toasts,
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeToast,
        clearAllToasts,
    }
} 