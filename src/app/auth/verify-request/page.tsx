/**
 * 邮箱验证请求页面
 * 用户点击邮箱登录后显示，提示用户检查邮箱
 */

'use client'

import { useSearchParams } from 'next/navigation'
import { Container, GradientText, Icon } from '@/components/ui'
import { useEffect, useState } from 'react'

export default function VerifyRequest() {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const [countdown, setCountdown] = useState(60)
    const [canResend, setCanResend] = useState(false)

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [countdown])

    const handleResend = () => {
        // TODO: 实现重新发送邮件功能
        setCountdown(60)
        setCanResend(false)
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg-primary)',
            padding: 'var(--spacing-4)',
        }}>
            <Container size="sm" style={{
                textAlign: 'center',
                padding: 'var(--spacing-8)',
            }}>
                {/* 邮件图标 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 'var(--spacing-6)',
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-primary-purple) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 'var(--spacing-4)',
                    }}>
                        <Icon name="email-verification" size="lg" style={{ color: 'white' }} />
                    </div>
                </div>

                {/* 标题 */}
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-2)',
                        lineHeight: '1.2',
                    }}>
                        <GradientText>检查您的邮箱</GradientText>
                    </h1>

                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                        marginBottom: 'var(--spacing-4)',
                    }}>
                        我们已向 {email ? <strong>{email}</strong> : '您的邮箱'} 发送了登录链接
                    </p>
                </div>

                {/* 指引内容 */}
                <div style={{
                    background: 'var(--color-bg-glass)',
                    border: '1px solid var(--color-border-glass)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: 'var(--spacing-6)',
                    marginBottom: 'var(--spacing-6)',
                    backdropFilter: 'blur(12px)',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--spacing-3)',
                        marginBottom: 'var(--spacing-4)',
                    }}>
                        <Icon name="mail-check" size="sm" style={{
                            color: 'var(--color-success)',
                            marginTop: '2px',
                            flexShrink: 0,
                        }} />
                        <div>
                            <h3 style={{
                                fontSize: 'var(--font-size-md)',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)',
                                marginBottom: 'var(--spacing-1)',
                            }}>
                                点击邮件中的链接登录
                            </h3>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                lineHeight: '1.5',
                            }}>
                                登录链接有效期为1小时，点击即可安全登录到AI变现之路平台
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--spacing-3)',
                    }}>
                        <Icon name="shield-check" size="sm" style={{
                            color: 'var(--color-primary-blue)',
                            marginTop: '2px',
                            flexShrink: 0,
                        }} />
                        <div>
                            <h3 style={{
                                fontSize: 'var(--font-size-md)',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)',
                                marginBottom: 'var(--spacing-1)',
                            }}>
                                安全提醒
                            </h3>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                lineHeight: '1.5',
                            }}>
                                如果没有收到邮件，请检查垃圾邮件文件夹
                            </p>
                        </div>
                    </div>
                </div>

                {/* 重新发送按钮 */}
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                    {canResend ? (
                        <button
                            onClick={handleResend}
                            style={{
                                background: 'linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-primary-purple) 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--border-radius-md)',
                                padding: 'var(--spacing-3) var(--spacing-6)',
                                fontSize: 'var(--font-size-md)',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            重新发送邮件
                        </button>
                    ) : (
                        <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)',
                        }}>
                            {countdown}秒后可重新发送邮件
                        </p>
                    )}
                </div>

                {/* 返回首页 */}
                <a
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        fontSize: 'var(--font-size-md)',
                        fontWeight: '500',
                        transition: 'color 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--color-primary-blue)'
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-secondary)'
                    }}
                >
                    <Icon name="arrow-left" size="sm" />
                    返回首页
                </a>
            </Container>
        </div>
    )
}