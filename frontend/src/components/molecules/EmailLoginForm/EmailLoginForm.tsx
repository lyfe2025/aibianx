/**
 * 邮件登录表单组件
 * 支持通过邮箱魔法链接登录，集成NextAuth
 */

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { GradientButton, Icon, Input } from '@/components/ui'

interface EmailLoginFormProps {
    onSuccess?: () => void
    onError?: (error: string) => void
    className?: string
}

export function EmailLoginForm({
    onSuccess,
    onError,
    className
}: EmailLoginFormProps) {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [emailSent, setEmailSent] = useState(false)

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        // 表单验证
        const newErrors: Record<string, string> = {}

        if (!email) {
            newErrors.email = '请输入邮箱地址'
        } else if (!validateEmail(email)) {
            newErrors.email = '请输入有效的邮箱地址'
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }

        setIsLoading(true)

        try {
            const result = await signIn('email', {
                email,
                redirect: false,
                callbackUrl: '/'
            })

            if (result?.error) {
                setErrors({ email: '邮件发送失败，请稍后重试' })
                onError?.('邮件发送失败，请稍后重试')
            } else {
                setEmailSent(true)
                onSuccess?.()
            }
        } catch (error) {
            console.error('邮件登录失败:', error)
            setErrors({ email: '登录请求失败，请稍后重试' })
            onError?.('登录请求失败，请稍后重试')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGitHubLogin = async () => {
        try {
            await signIn('github', {
                callbackUrl: '/',
                redirect: true
            })
        } catch (error) {
            console.error('GitHub登录失败:', error)
            onError?.('GitHub登录失败，请稍后重试')
        }
    }

    // 邮件已发送状态
    if (emailSent) {
        return (
            <div className={className} style={{
                textAlign: 'center',
                padding: 'var(--spacing-6)',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-primary-blue) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Icon name="mail-check" size="md" style={{ color: 'white' }} />
                    </div>
                </div>

                <h3 style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-2)',
                }}>
                    邮件已发送！
                </h3>

                <p style={{
                    fontSize: 'var(--font-size-md)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.5',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    我们已向 <strong>{email}</strong> 发送了登录链接
                </p>

                <p style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    请检查您的邮箱并点击链接完成登录
                </p>

                <GradientButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setEmailSent(false)
                        setEmail('')
                    }}
                >
                    重新输入邮箱
                </GradientButton>
            </div>
        )
    }

    return (
        <div className={className}>
            <form onSubmit={handleEmailLogin} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
            }}>
                {/* 邮箱输入 */}
                <div>
                    <Input
                        type="email"
                        placeholder="输入您的邮箱地址"
                        value={email}
                        onChange={(value) => {
                            setEmail(value)
                            if (errors.email) {
                                setErrors(prev => ({ ...prev, email: '' }))
                            }
                        }}
                        error={errors.email}
                        disabled={isLoading}
                        icon="mail"
                        style={{
                            fontSize: 'var(--font-size-md)',
                        }}
                    />
                </div>

                {/* 邮件登录按钮 */}
                <GradientButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    disabled={!email || isLoading}
                    style={{
                        width: '100%',
                    }}
                >
                    {isLoading ? '发送中...' : '发送登录邮件'}
                </GradientButton>
            </form>

            {/* 分割线 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-3)',
                margin: 'var(--spacing-6) 0',
            }}>
                <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'var(--color-border-muted)',
                }} />
                <span style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-muted)',
                    padding: '0 var(--spacing-2)',
                }}>
                    或
                </span>
                <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'var(--color-border-muted)',
                }} />
            </div>

            {/* GitHub登录按钮 */}
            <GradientButton
                variant="outline"
                size="lg"
                onClick={handleGitHubLogin}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-2)',
                }}
            >
                <Icon name="github" size="sm" />
                使用 GitHub 登录
            </GradientButton>

            {/* 说明文字 */}
            <p style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
                lineHeight: '1.5',
                marginTop: 'var(--spacing-4)',
            }}>
                我们会向您的邮箱发送一个安全的登录链接，<br />
                无需记住密码，安全快捷
            </p>
        </div>
    )
}