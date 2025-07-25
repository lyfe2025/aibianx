'use client'

import React, { useEffect } from 'react'
import { useCountdownStore, startGlobalCountdown, stopGlobalCountdown } from '@/stores'

interface CountdownTimerProps {
    className?: string
    targetDate?: Date
}

export function CountdownTimer({ className, targetDate }: CountdownTimerProps) {
    const { timeLeft, isActive, initializeCountdown } = useCountdownStore()

    useEffect(() => {
        // 初始化倒计时（如果提供了targetDate就使用，否则使用默认值）
        if (targetDate) {
            initializeCountdown(targetDate)
        } else if (!useCountdownStore.getState().targetDate) {
            initializeCountdown()
        }

        // 启动全局倒计时
        startGlobalCountdown()

        return () => {
            // 组件卸载时不停止全局倒计时，让其他组件可以继续使用
        }
    }, [targetDate, initializeCountdown])

    return (
        <div className={className}>
            {/* 倒计时数字 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                marginBottom: '9px'
            }}>
                <div style={{
                    background: 'var(--color-info-bg)',
                    borderRadius: '6px',
                    padding: '5.8px 8px',
                    minWidth: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{
                        color: 'var(--color-text-primary)',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '25.6px',
                        textAlign: 'center'
                    }}>
                        {timeLeft.days}
                    </span>
                </div>
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    margin: '0 0px'
                }}>:</span>
                <div style={{
                    background: 'var(--color-info-bg)',
                    borderRadius: '6px',
                    padding: '5.8px 8px',
                    minWidth: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{
                        color: 'var(--color-text-primary)',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '25.6px',
                        textAlign: 'center'
                    }}>
                        {timeLeft.hours}
                    </span>
                </div>
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    margin: '0 0px'
                }}>:</span>
                <div style={{
                    background: 'var(--color-info-bg)',
                    borderRadius: '6px',
                    padding: '5.8px 8px',
                    minWidth: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{
                        color: 'var(--color-text-primary)',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '25.6px',
                        textAlign: 'center'
                    }}>
                        {timeLeft.minutes}
                    </span>
                </div>
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    margin: '0 0px'
                }}>:</span>
                <div style={{
                    background: 'var(--color-info-bg)',
                    borderRadius: '6px',
                    padding: '5.8px 8px',
                    minWidth: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{
                        color: 'var(--color-text-primary)',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '25.6px',
                        textAlign: 'center'
                    }}>
                        {timeLeft.seconds}
                    </span>
                </div>
            </div>

            {/* 时间单位标签 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px'
            }}>
                <span style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '10px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    minWidth: '35px',
                    textAlign: 'center'
                }}>天</span>
                <span style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '10px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    minWidth: '35px',
                    textAlign: 'center'
                }}>时</span>
                <span style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '10px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    minWidth: '35px',
                    textAlign: 'center'
                }}>分</span>
                <span style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '10px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    minWidth: '35px',
                    textAlign: 'center'
                }}>秒</span>
            </div>
        </div>
    )
} 