/**
 * 重置密码页面
 * 用户通过邮件链接访问此页面设置新密码
 */

'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Container, GradientText, GradientButton, Icon, Input } from '@/components/ui'
import { useState, useEffect } from 'react'

export default function ResetPassword() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isValidating, setIsValidating] = useState(true)
    const [isTokenValid, setIsTokenValid] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // 验证token有效性
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsValidating(false)
                return
            }

            try {
                const response = await fetch(`/api/auth/reset-password?token=${token}`)
                const data = await response.json()

                if (response.ok && data.valid) {
                    setIsTokenValid(true)
                    setUserEmail(data.email)
                }
            } catch (error) {
                console.error('验证token失败:', error)
            } finally {
                setIsValidating(false)
            }
        }

        validateToken()
    }, [token])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!password) {
            newErrors.password = '请输入新密码'
        } else if (password.length < 6) {
            newErrors.password = '密码长度至少6位'
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = '请确认新密码'
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = '两次输入的密码不一致'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setIsSuccess(true)
            } else {
                setErrors({ submit: data.error || '重置密码失败，请稍后重试' })
            }
        } catch (error) {
            console.error('重置密码失败:', error)
            setErrors({ submit: '重置密码失败，请稍后重试' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoToLogin = () => {
        router.push('/')
    }

    // 验证中
    if (isValidating) {
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 'var(--spacing-4)',
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '4px solid var(--color-border-muted)',
                            borderTop: '4px solid var(--color-primary-blue)',
                            animation: 'spin 1s linear infinite',
                        }} />
                    </div>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-secondary)',
                    }}>
                        验证重置链接...
                    </p>
                </Container>
            </div>
        )
    }

    // Token无效
    if (!token || !isTokenValid) {
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 'var(--spacing-6)',
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-error)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon name="alert-triangle" size="lg" style={{ color: 'white' }} />
                        </div>
                    </div>

                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-3)',
                    }}>
                        <GradientText>链接无效</GradientText>
                    </h1>

                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                        marginBottom: 'var(--spacing-6)',
                    }}>
                        重置密码链接无效或已过期，请重新申请密码重置。
                    </p>

                    <GradientButton
                        variant="primary"
                        onClick={handleGoToLogin}
                    >
                        返回首页
                    </GradientButton>
                </Container>
            </div>
        )
    }

    // 重置成功
    if (isSuccess) {
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 'var(--spacing-6)',
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-primary-blue) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon name="check" size="lg" style={{ color: 'white' }} />
                        </div>
                    </div>

                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-3)',
                    }}>
                        <GradientText>密码重置成功！</GradientText>
                    </h1>

                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                        marginBottom: 'var(--spacing-6)',
                    }}>
                        您的密码已成功重置，现在可以使用新密码登录了。
                    </p>

                    <GradientButton
                        variant="primary"
                        onClick={handleGoToLogin}
                    >
                        立即登录
                    </GradientButton>
                </Container>
            </div>
        )
    }

    // 重置密码表单
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
                padding: 'var(--spacing-8)',
            }}>
                <div style={{
                    background: 'var(--color-bg-glass)',
                    border: '1px solid var(--color-border-glass)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: 'var(--spacing-8)',
                    backdropFilter: 'blur(12px)',
                }}>
                    {/* 标题 */}
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
                        <h1 style={{
                            fontSize: 'var(--font-size-3xl)',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-2)',
                        }}>
                            <GradientText>重置密码</GradientText>
                        </h1>

                        <p style={{
                            fontSize: 'var(--font-size-md)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.6',
                        }}>
                            为账户 <strong>{userEmail}</strong> 设置新密码
                        </p>
                    </div>

                    {/* 表单 */}
                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-4)',
                    }}>
                        {/* 新密码输入 */}
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="请输入新密码"
                            value={password}
                            onChange={(value) => {
                                setPassword(value)
                                if (errors.password) {
                                    setErrors(prev => ({ ...prev, password: '' }))
                                }
                            }}
                            error={errors.password}
                            icon="lock"
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Icon
                                        name={showPassword ? "eye-off" : "eye"}
                                        size="sm"
                                        style={{
                                            color: showPassword ? 'var(--color-primary-blue)' : 'var(--color-text-muted)'
                                        }}
                                    />
                                </button>
                            }
                        />

                        {/* 确认密码输入 */}
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="请确认新密码"
                            value={confirmPassword}
                            onChange={(value) => {
                                setConfirmPassword(value)
                                if (errors.confirmPassword) {
                                    setErrors(prev => ({ ...prev, confirmPassword: '' }))
                                }
                            }}
                            error={errors.confirmPassword}
                            icon="lock"
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Icon
                                        name={showConfirmPassword ? "eye-off" : "eye"}
                                        size="sm"
                                        style={{
                                            color: showConfirmPassword ? 'var(--color-primary-blue)' : 'var(--color-text-muted)'
                                        }}
                                    />
                                </button>
                            }
                        />

                        {/* 错误提示 */}
                        {errors.submit && (
                            <div style={{
                                color: 'var(--color-error)',
                                fontSize: 'var(--font-size-sm)',
                                textAlign: 'center',
                            }}>
                                {errors.submit}
                            </div>
                        )}

                        {/* 提交按钮 */}
                        <GradientButton
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isLoading}
                            disabled={!password || !confirmPassword || isLoading}
                            style={{ width: '100%', marginTop: 'var(--spacing-2)' }}
                        >
                            {isLoading ? '重置中...' : '重置密码'}
                        </GradientButton>
                    </form>

                    {/* 返回链接 */}
                    <div style={{ textAlign: 'center', marginTop: 'var(--spacing-6)' }}>
                        <button
                            onClick={handleGoToLogin}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-text-secondary)',
                                fontSize: 'var(--font-size-md)',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                        >
                            返回首页
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
}