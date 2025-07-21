'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations'
import { Input, GradientButton, Icon } from '@/components/ui'

interface ForgotPasswordFormProps {
    onSubmit: (data: ForgotPasswordFormData) => void
    onBackToLogin: () => void
    isLoading?: boolean
}

export function ForgotPasswordForm({
    onSubmit,
    onBackToLogin,
    isLoading = false,
}: ForgotPasswordFormProps) {
    const [countdown, setCountdown] = useState(0)
    const [emailSent, setEmailSent] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    })

    // 倒计时逻辑
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown(countdown - 1)
            }, 1000)
        }

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [countdown])

    const handleFormSubmit = async (data: ForgotPasswordFormData) => {
        try {
            await onSubmit(data)
            setEmailSent(true)
            setCountdown(60) // 60秒倒计时
        } catch (error) {
            console.error('发送重置邮件失败:', error)
        }
    }

    const handleResendEmail = async () => {
        if (countdown > 0) return

        const email = getValues('email')
        if (email) {
            try {
                await onSubmit({ email })
                setCountdown(60) // 重新开始60秒倒计时
            } catch (error) {
                console.error('重新发送邮件失败:', error)
            }
        }
    }

    const isButtonDisabled = isSubmitting || isLoading || countdown > 0

    return (
        <div style={{ width: '100%' }}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
                    {/* 安全提示 */}
                    <div
                        style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--spacing-4)',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
                            <Icon
                                name="security-tips"
                                size="sm"
                                style={{
                                    color: 'var(--color-primary-blue)',
                                    marginTop: '2px',
                                    flexShrink: 0,
                                }}
                            />
                            <div>
                                <h4 style={{
                                    color: 'var(--color-primary-blue)',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: 600,
                                    marginBottom: 'var(--spacing-1)'
                                }}>
                                    安全提示
                                </h4>
                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: 'var(--font-size-xs)',
                                    lineHeight: '1.4'
                                }}>
                                    我们将向您的邮箱发送密码重置链接。出于安全考虑，该链接将在15分钟后失效。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 邮箱输入框 */}
                    <div className="input-container">
                        <label className="input-label">
                            邮箱地址
                        </label>
                        <div className="input-wrapper">
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="请输入您的注册邮箱"
                                error={!!errors.email}
                                disabled={isSubmitting || isLoading}
                                style={{
                                    paddingLeft: 'var(--spacing-10)',
                                }}
                            />
                            <Icon
                                name="email-icon"
                                size="sm"
                                style={{
                                    position: 'absolute',
                                    left: 'var(--spacing-3)',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-muted)',
                                    pointerEvents: 'none',
                                }}
                            />
                        </div>
                        {errors.email && (
                            <span className="input-error">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* 发送按钮 */}
                    <GradientButton
                        type="submit"
                        size="lg"
                        variant="primary"
                        fullWidth
                        disabled={isButtonDisabled}
                        loading={isSubmitting || isLoading}
                    >
                        {isSubmitting || isLoading
                            ? '发送中...'
                            : countdown > 0
                                ? `重新发送 (${countdown}s)`
                                : emailSent
                                    ? '重新发送重置邮件'
                                    : '发送重置邮件'
                        }
                    </GradientButton>

                    {/* 成功提示 */}
                    {emailSent && (
                        <div
                            style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                borderRadius: 'var(--radius-lg)',
                                padding: 'var(--spacing-4)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
                                <Icon
                                    name="success-check"
                                    size="sm"
                                    style={{
                                        color: '#10B981',
                                        marginTop: '2px',
                                        flexShrink: 0,
                                    }}
                                />
                                <div>
                                    <h4 style={{
                                        color: '#10B981',
                                        fontSize: 'var(--font-size-sm)',
                                        fontWeight: 600,
                                        marginBottom: 'var(--spacing-1)'
                                    }}>
                                        邮件已发送
                                    </h4>
                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: 'var(--font-size-xs)',
                                        lineHeight: '1.4'
                                    }}>
                                        重置密码的邮件已发送到您的邮箱，请查收并按照邮件中的指示重置密码。
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 帮助信息 */}
                    <div style={{
                        background: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-4)',
                    }}>
                        <h4 style={{
                            color: 'var(--color-text-primary)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 600,
                            marginBottom: 'var(--spacing-2)'
                        }}>
                            找不到重置邮件？
                        </h4>
                        <ul style={{
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-xs)',
                            lineHeight: '1.4',
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}>
                            <li style={{ marginBottom: 'var(--spacing-1)' }}>
                                • 检查垃圾邮件或促销邮件文件夹
                            </li>
                            <li style={{ marginBottom: 'var(--spacing-1)' }}>
                                • 确认邮箱地址输入正确
                            </li>
                            <li style={{ marginBottom: 'var(--spacing-1)' }}>
                                • 等待几分钟，邮件可能有延迟
                            </li>
                            <li>
                                • 如果仍有问题，请联系客服支持
                            </li>
                        </ul>
                    </div>

                    {/* 返回登录 */}
                    <div style={{
                        textAlign: 'center',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)'
                    }}>
                        想起密码了？
                        <button
                            type="button"
                            onClick={onBackToLogin}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-primary-blue)',
                                marginLeft: 'var(--spacing-1)',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                        >
                            返回登录
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
} 