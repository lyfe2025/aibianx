'use client'

import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
    className?: string
}

export function CountdownTimer({ className }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 23,
        minutes: 59,
        seconds: 57
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev

                if (seconds > 0) {
                    seconds--
                } else if (minutes > 0) {
                    seconds = 59
                    minutes--
                } else if (hours > 0) {
                    seconds = 59
                    minutes = 59
                    hours--
                } else if (days > 0) {
                    seconds = 59
                    minutes = 59
                    hours = 23
                    days--
                }

                return { days, hours, minutes, seconds }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

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
                    background: 'rgba(59, 130, 246, 0.15)',
                    borderRadius: '6px',
                    padding: '5.8px 8px',
                    minWidth: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '25.6px',
                        textAlign: 'center'
                    }}>
                        {timeLeft.days}
                    </span>
                </div>
                <span style={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    margin: '0 0px'
                }}>:</span>
                <div style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    borderRadius: '6px',
                    padding: '5.8px 8px',
                    minWidth: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '25.6px',
                        textAlign: 'center'
                    }}>
                        {timeLeft.hours}
                    </span>
                </div>
                <span style={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    margin: '0 0px'
                }}>:</span>
                <div style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    borderRadius: '6px',
                    padding: '5.8px 8px',
                    minWidth: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '25.6px',
                        textAlign: 'center'
                    }}>
                        {timeLeft.minutes}
                    </span>
                </div>
                <span style={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    margin: '0 0px'
                }}>:</span>
                <div style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    borderRadius: '6px',
                    padding: '5.8px 8px',
                    minWidth: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '25.6px',
                        textAlign: 'center'
                    }}>
                        {timeLeft.seconds}
                    </span>
                </div>
            </div>

            {/* 标签 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '36px'
            }}>
                <span style={{
                    color: '#9CA3AF',
                    fontSize: '12px',
                    lineHeight: '19.2px',
                    textAlign: 'center'
                }}>
                    天
                </span>
                <span style={{
                    color: '#9CA3AF',
                    fontSize: '12px',
                    lineHeight: '19.2px',
                    textAlign: 'center'
                }}>
                    时
                </span>
                <span style={{
                    color: '#9CA3AF',
                    fontSize: '12px',
                    lineHeight: '19.2px',
                    textAlign: 'center'
                }}>
                    分
                </span>
                <span style={{
                    color: '#9CA3AF',
                    fontSize: '12px',
                    lineHeight: '19.2px',
                    textAlign: 'center'
                }}>
                    秒
                </span>
            </div>
        </div>
    )
} 