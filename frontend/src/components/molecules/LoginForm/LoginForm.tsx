'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import { Input, GradientButton, Icon } from '@/components/ui'

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void
    onSwitchToRegister: () => void
    onForgotPassword: () => void
    isLoading?: boolean
}

export function LoginForm({
    onSubmit,
    onSwitchToRegister,
    onForgotPassword,
    isLoading = false,
}: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            emailOrUsername: '',
            password: '',
            rememberMe: false,
        },
    })

    const handleFormSubmit = async (data: LoginFormData) => {
        try {
            await onSubmit(data)
        } catch (error) {
            console.error('登录失败:', error)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
                {/* 邮箱/用户名输入框 */}
                <div className="input-container">
                    <label className="input-label">
                        邮箱或用户名
                    </label>
                    <div className="input-wrapper">
                        <Input
                            {...register('emailOrUsername')}
                            type="text"
                            placeholder="请输入邮箱或用户名"
                            error={!!errors.emailOrUsername}
                            disabled={isSubmitting || isLoading}
                            style={{
                                paddingLeft: 'var(--spacing-10)',
                            }}
                        />
                        <Icon
                            name="email-username-icon"
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
                    {errors.emailOrUsername && (
                        <span className="input-error">
                            {errors.emailOrUsername.message}
                        </span>
                    )}
                </div>

                {/* 密码输入框 */}
                <div className="input-container">
                    <label className="input-label">
                        密码
                    </label>
                    <div className="input-wrapper">
                        <Input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="请输入密码"
                            error={!!errors.password}
                            disabled={isSubmitting || isLoading}
                            style={{
                                paddingLeft: 'var(--spacing-10)',
                                paddingRight: 'var(--spacing-10)',
                            }}
                        />
                        <Icon
                            name="password-icon-login"
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
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: 'var(--spacing-3)',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            aria-label={showPassword ? '隐藏密码' : '显示密码'}
                        >
                            <Icon
                                name="password-eye-login"
                                size="sm"
                                style={{
                                    color: 'var(--color-text-muted)',
                                    opacity: showPassword ? 1 : 0.6,
                                }}
                            />
                        </button>
                    </div>
                    {errors.password && (
                        <span className="input-error">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                {/* 记住我选项 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-2)',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-secondary)'
                        }}
                    >
                        <input
                            {...register('rememberMe')}
                            type="checkbox"
                            style={{
                                width: '16px',
                                height: '16px',
                                accentColor: 'var(--color-primary-blue)',
                            }}
                        />
                        记住我
                    </label>

                    <button
                        type="button"
                        onClick={onForgotPassword}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-primary-blue)',
                            fontSize: 'var(--font-size-sm)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                        }}
                    >
                        忘记密码？
                    </button>
                </div>

                {/* 登录按钮 */}
                <GradientButton
                    type="submit"
                    size="lg"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting || isLoading}
                    loading={isSubmitting || isLoading}
                >
                    {isSubmitting || isLoading ? '登录中...' : '登录'}
                </GradientButton>

                {/* 分割线 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-4)',
                    margin: 'var(--spacing-2) 0'
                }}>
                    <div style={{
                        flex: 1,
                        height: '1px',
                        background: 'var(--color-border-primary)'
                    }} />
                    <span style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-sm)'
                    }}>
                        或
                    </span>
                    <div style={{
                        flex: 1,
                        height: '1px',
                        background: 'var(--color-border-primary)'
                    }} />
                </div>

                {/* 社交登录 */}
                <GradientButton
                    type="button"
                    size="lg"
                    variant="outline"
                    fullWidth
                    disabled={isSubmitting || isLoading}
                    onClick={() => {
                        // TODO: 实现GitHub登录
                        console.log('GitHub登录')
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-3)',
                    }}
                >
                    <Icon name="github-icon-login" size="sm" />
                    使用 GitHub 登录
                </GradientButton>

                {/* 注册链接 */}
                <div style={{
                    textAlign: 'center',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)'
                }}>
                    还没有账号？
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-primary-blue)',
                            marginLeft: 'var(--spacing-1)',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                    >
                        立即注册
                    </button>
                </div>
            </div>
        </form>
    )
} 