'use client'

import React, { useState, useEffect } from 'react'
import { Icon } from '@/components/ui'

interface CountdownTimerProps {
    targetDate: Date
    className?: string
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
    targetDate,
    className = ''
}) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date()

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                }
            }

            return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        setTimeLeft(calculateTimeLeft())

        return () => clearInterval(timer)
    }, [targetDate])

    return (
        <div className={`countdown-timer ${className}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            justifyContent: 'center',
            marginLeft: '73px'
        }}>
            {/* 天数 */}
            <div style={{
                background: '#1A1A1A',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
                minWidth: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: '500',
                    lineHeight: '24px'
                }}>
                    {timeLeft.days}
                </span>
            </div>

            {/* 分隔符 */}
            <Icon name="modals/countdown-separator" size="sm" style={{
                color: 'var(--color-primary-blue)',
                marginTop: '4px'
            }} />

            {/* 小时 */}
            <div style={{
                background: '#1A1A1A',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
                minWidth: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: '500',
                    lineHeight: '24px'
                }}>
                    {timeLeft.hours.toString().padStart(2, '0')}
                </span>
            </div>

            {/* 分隔符 */}
            <Icon name="modals/countdown-separator" size="sm" style={{
                color: 'var(--color-primary-blue)',
                marginTop: '4px'
            }} />

            {/* 分钟 */}
            <div style={{
                background: '#1A1A1A',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
                minWidth: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: '500',
                    lineHeight: '24px'
                }}>
                    {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
            </div>

            {/* 分隔符 */}
            <Icon name="modals/countdown-separator" size="sm" style={{
                color: 'var(--color-primary-blue)',
                marginTop: '4px'
            }} />

            {/* 秒数 */}
            <div style={{
                background: '#1A1A1A',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
                minWidth: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: '500',
                    lineHeight: '24px'
                }}>
                    {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
            </div>
        </div>
    )
} 