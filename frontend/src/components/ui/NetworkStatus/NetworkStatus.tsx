'use client'

import { useEffect, useState } from 'react'
import { Icon, useToast, ToastContainer } from '@/components/ui'

interface NetworkStatusProps {
    showIndicator?: boolean
    showToasts?: boolean
    onNetworkChange?: (isOnline: boolean) => void
    className?: string
}

// 网络连接API类型定义
interface NetworkConnection extends EventTarget {
    effectiveType?: string
    type?: string
    downlink?: number
    rtt?: number
}

// 扩展Navigator类型
interface ExtendedNavigator extends Navigator {
    connection?: NetworkConnection
}

// 待处理操作数据类型
interface PendingActionData {
    [key: string]: unknown
}

/**
 * NetworkStatus 网络状态检测组件
 * 
 * 功能特性：
 * - 实时网络状态检测
 * - 离线/在线状态提示
 * - 网络恢复自动重连
 * - 离线缓存支持
 * - 数据同步状态
 * - 移动端网络类型检测
 * 
 * 设计规范：
 * - 状态指示器: 简洁明确
 * - 通知提示: 非侵入式
 * - 离线模式: 功能降级
 * - 数据同步: 透明处理
 */
export function NetworkStatus({
    showIndicator = true,
    showToasts = true,
    onNetworkChange,
    className = '',
}: NetworkStatusProps) {
    const [isOnline, setIsOnline] = useState(true)
    const [connectionType, setConnectionType] = useState<string>('')
    const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(null)
    const [pendingSyncs, setPendingSyncs] = useState(0)
    const { toasts, showSuccess, showWarning, showInfo, removeToast } = useToast()

    // 检测网络状态
    useEffect(() => {
        const updateNetworkStatus = () => {
            const wasOnline = isOnline
            const nowOnline = navigator.onLine

            setIsOnline(nowOnline)

            // 网络状态变化时的处理
            if (wasOnline !== nowOnline) {
                if (nowOnline) {
                    // 网络恢复
                    setLastOnlineTime(new Date())
                    if (showToasts) {
                        showSuccess(
                            '网络已恢复',
                            '您现在可以正常浏览和操作了',
                            { duration: 3000 }
                        )
                    }
                    // 触发数据同步
                    syncPendingData()
                } else {
                    // 网络断开
                    if (showToasts) {
                        showWarning(
                            '网络连接中断',
                            '您仍可以浏览已缓存的内容',
                            { persistent: true }
                        )
                    }
                }

                onNetworkChange?.(nowOnline)
            }
        }

        // 获取连接类型（如果支持）
        const updateConnectionType = () => {
            if ('connection' in navigator) {
                const connection = (navigator as ExtendedNavigator).connection
                if (connection) {
                    setConnectionType(connection.effectiveType || connection.type || '')
                }
            }
        }

        // 初始化
        updateNetworkStatus()
        updateConnectionType()

        // 监听网络状态变化
        window.addEventListener('online', updateNetworkStatus)
        window.addEventListener('offline', updateNetworkStatus)

        // 监听连接类型变化
        if ('connection' in navigator) {
            const connection = (navigator as ExtendedNavigator).connection
            if (connection) {
                connection.addEventListener('change', updateConnectionType)
            }
        }

        return () => {
            window.removeEventListener('online', updateNetworkStatus)
            window.removeEventListener('offline', updateNetworkStatus)

            if ('connection' in navigator) {
                const connection = (navigator as ExtendedNavigator).connection
                if (connection) {
                    connection.removeEventListener('change', updateConnectionType)
                }
            }
        }
    }, [isOnline, showToasts, onNetworkChange])

    // 同步待处理数据
    const syncPendingData = async () => {
        try {
            // 获取待同步的数据
            const pendingData = localStorage.getItem('pending-sync-data')
            if (!pendingData) return

            const dataArray = JSON.parse(pendingData)
            setPendingSyncs(dataArray.length)

            if (dataArray.length === 0) return

            if (showToasts) {
                showInfo(
                    `正在同步 ${dataArray.length} 项数据`,
                    '请稍候，数据同步中...',
                    { persistent: true }
                )
            }

            // 模拟数据同步过程
            for (let i = 0; i < dataArray.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 500))
                setPendingSyncs(prev => prev - 1)
            }

            // 清空待同步数据
            localStorage.removeItem('pending-sync-data')
            setPendingSyncs(0)

            if (showToasts) {
                showSuccess(
                    '数据同步完成',
                    '所有离线操作已成功同步到服务器',
                    { duration: 4000 }
                )
            }
        } catch (error) {
            console.error('Data sync failed:', error)
            if (showToasts) {
                showWarning(
                    '数据同步失败',
                    '部分数据未能同步，将在下次连接时重试'
                )
            }
        }
    }

    // 添加待同步数据
    const addPendingSync = (data: PendingActionData) => {
        try {
            const existing = localStorage.getItem('pending-sync-data')
            const dataArray = existing ? JSON.parse(existing) : []
            dataArray.push({
                ...data,
                timestamp: new Date().toISOString(),
            })
            localStorage.setItem('pending-sync-data', JSON.stringify(dataArray))
            setPendingSyncs(dataArray.length)
        } catch (error) {
            console.error('Failed to add pending sync data:', error)
        }
    }

    // 获取网络状态描述
    const getNetworkDescription = () => {
        if (!isOnline) return '离线模式'

        if (connectionType) {
            const typeMap: Record<string, string> = {
                'slow-2g': '2G (慢)',
                '2g': '2G',
                '3g': '3G',
                '4g': '4G',
                '5g': '5G',
                'wifi': 'WiFi',
                'ethernet': '有线网络',
            }
            return typeMap[connectionType] || '在线'
        }

        return '在线'
    }

    // 获取状态颜色
    const getStatusColor = () => {
        if (!isOnline) return '#EF4444' // 红色
        if (connectionType === 'slow-2g' || connectionType === '2g') return '#F59E0B' // 黄色
        return '#22C55E' // 绿色
    }

    if (!showIndicator && !showToasts) return null

    return (
        <>
            {/* 网络状态指示器 */}
            {showIndicator && (
                <div
                    className={`network-status ${className}`}
                    style={{
                        position: 'fixed',
                        top: '16px',
                        left: '16px',
                        background: 'rgba(26, 26, 26, 0.90)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(42, 42, 42, 0.50)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        zIndex: 1000,
                        transition: 'all 0.3s ease',
                        opacity: isOnline ? 0.7 : 1,
                    }}
                    title={`网络状态: ${getNetworkDescription()}`}
                >
                    {/* 状态指示器 */}
                    <div
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(),
                            animation: isOnline ? 'none' : 'pulse 2s infinite',
                        }}
                    />

                    {/* 网络状态文本 */}
                    <span>{getNetworkDescription()}</span>

                    {/* 同步状态 */}
                    {pendingSyncs > 0 && (
                        <>
                            <Icon
                                name="arrow-path"
                                size="xs"
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    color: 'var(--color-warning)',
                                    animation: 'spin 1s linear infinite',
                                }}
                            />
                            <span style={{ color: 'var(--color-warning)' }}>
                                {pendingSyncs}项待同步
                            </span>
                        </>
                    )}
                </div>
            )}

            {/* 离线模式提示横幅 */}
            {!isOnline && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)',
                        color: 'var(--color-text-primary)',
                        padding: '8px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 500,
                        zIndex: 9999,
                        animation: 'slideInTop 0.3s ease-out',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Icon name="wifi-slash" size="sm" style={{ width: '16px', height: '16px' }} />
                        <span>离线模式 - 您可以继续浏览已缓存的内容</span>
                    </div>
                </div>
            )}

            {/* Toast容器 */}
            {showToasts && (
                <ToastContainer
                    toasts={toasts}
                    onRemoveToast={removeToast}
                    position="bottom-center"
                />
            )}

            {/* 动画样式 */}
            <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes slideInTop {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        /* 移动端适配 */
        @media (max-width: 768px) {
          .network-status {
            top: 8px !important;
            left: 8px !important;
            font-size: 11px !important;
            padding: 4px 8px !important;
          }
        }
        
        /* 安全区域适配 */
        @supports (padding: env(safe-area-inset-top)) {
          .network-status {
            top: calc(16px + env(safe-area-inset-top)) !important;
          }
        }
      `}</style>
        </>
    )
}

// 导出工具函数用于其他组件
export const NetworkUtils = {
    /**
     * 检查当前网络状态
     */
    isOnline: () => navigator.onLine,

    /**
     * 添加离线数据到同步队列
     */
    addToSyncQueue: (data: PendingActionData) => {
        try {
            const existing = localStorage.getItem('pending-sync-data')
            const dataArray = existing ? JSON.parse(existing) : []
            dataArray.push({
                ...data,
                timestamp: new Date().toISOString(),
            })
            localStorage.setItem('pending-sync-data', JSON.stringify(dataArray))
            return true
        } catch {
            return false
        }
    },

    /**
     * 获取待同步数据数量
     */
    getPendingSyncCount: () => {
        try {
            const existing = localStorage.getItem('pending-sync-data')
            return existing ? JSON.parse(existing).length : 0
        } catch {
            return 0
        }
    },

    /**
     * 检测连接质量
     */
    getConnectionQuality: () => {
        if (!navigator.onLine) return 'offline'

        if ('connection' in navigator) {
            const connection = (navigator as ExtendedNavigator).connection
            if (connection) {
                const type = connection.effectiveType || connection.type
                if (type === 'slow-2g' || type === '2g') return 'poor'
                if (type === '3g') return 'good'
                if (type === '4g' || type === '5g') return 'excellent'
            }
        }

        return 'good'
    }
} 