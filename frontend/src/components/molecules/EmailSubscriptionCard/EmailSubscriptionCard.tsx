'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui'
import { EMAIL_SUBSCRIPTION_CONFIG } from '@/constants/mainContent'
import { useThemeStore } from '@/stores'

interface EmailSubscriptionCardProps {
    className?: string
}

/**
 * EmailSubscriptionCard 邮件订阅卡片组件
 * 
 * 功能特性：
 * - 邮件地址输入
 * - 订阅功能
 * - 主题适配设计
 * - 焦点状态管理
 * 
 * 从MainContentSection中分离，符合单一职责原则
 */
export function EmailSubscriptionCard({ className }: EmailSubscriptionCardProps) {
    const [subscribeEmail, setSubscribeEmail] = useState('')
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const { theme } = useThemeStore()

    const handleSubscribe = () => {
        if (!subscribeEmail.trim()) {
            alert('请输入您的邮箱')
            return
        }
        alert(`感谢订阅！我们将向 ${subscribeEmail} 发送最新的AI变现机会`)
        setSubscribeEmail('')
    }

    return (
        <div className={`email-subscription ${className || ''}`} style={{
            background: theme === 'light'
                ? 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)'
                : 'linear-gradient(135deg, #0C1E47 37%, #1E0C47 63%)',
            border: theme === 'light'
                ? '1px solid rgba(59, 130, 246, 0.15)'
                : '1px solid rgba(59, 130, 246, 0.20)',
            borderRadius: '16px',
            padding: '31px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '348px'
            }}>
                <h3 style={{
                    color: theme === 'light'
                        ? '#1E293B'
                        : 'var(--color-text-primary)',
                    fontSize: '18px',
                    fontWeight: '700',
                    lineHeight: '27px',
                    margin: 0,
                    width: '180px',
                    whiteSpace: 'nowrap'
                }}>
                    {EMAIL_SUBSCRIPTION_CONFIG.title}
                </h3>
                <Icon name="notification-bell" style={{
                    color: 'var(--color-primary-blue)',
                    width: '20px',
                    height: '20px',
                    marginTop: '3.5px'
                }} />
            </div>

            <div style={{
                color: theme === 'light'
                    ? '#64748B'
                    : 'var(--color-text-secondary)',
                fontSize: '16px',
                lineHeight: '20px',
                width: '400px',
                minHeight: '20px',
                marginTop: '15px',
                marginBottom: '15px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {EMAIL_SUBSCRIPTION_CONFIG.description}
            </div>

            <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                width: '348px'
            }}>
                <input
                    type="email"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    placeholder={EMAIL_SUBSCRIPTION_CONFIG.placeholder}
                    style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${theme === 'light'
                            ? (isEmailFocused ? '#3B82F6' : '#E2E8F0')
                            : (isEmailFocused ? 'var(--color-bg-input)' : 'rgba(250, 252, 255, 0.95)')}`,
                        background: theme === 'light'
                            ? (isEmailFocused ? '#FFFFFF' : '#F8FAFC')
                            : (isEmailFocused ? 'var(--color-bg-input)' : 'rgba(250, 252, 255, 0.95)'),
                        color: theme === 'light' ? '#1E293B' : 'var(--color-text-primary)',
                        fontSize: '14px',
                        fontFamily: 'var(--font-family-primary)',
                        outline: 'none',
                        backdropFilter: theme === 'dark' ? 'blur(4px)' : 'blur(8px)',
                        WebkitBackdropFilter: theme === 'dark' ? 'blur(4px)' : 'blur(8px)',
                        boxShadow: isEmailFocused ? '0 0 0 2px rgba(59, 130, 246, 0.1)' : 'none',
                        width: '234px'
                    }}
                />
                <button
                    onClick={handleSubscribe}
                    style={{
                        background: 'var(--gradient-primary)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: 'var(--color-text-primary)',
                        fontSize: '14px',
                        fontFamily: 'var(--font-family-primary)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        width: '96px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {EMAIL_SUBSCRIPTION_CONFIG.buttonText}
                </button>
            </div>
        </div>
    )
} 