'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData, checkPasswordStrength } from '@/lib/validations'
import { Input, GradientButton, Icon } from '@/components/ui'

interface RegisterFormProps {
    onSubmit: (data: RegisterFormData) => void
    onSwitchToLogin: () => void
    isLoading?: boolean
}

export function RegisterForm({
    onSubmit,
    onSwitchToLogin,
    isLoading = false,
}: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        strength: 'weak' as const,
        strengthText: '弱',
        feedback: [] as string[],
    })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
        },
    })

    const watchedPassword = watch('password')

    // 监听密码变化，实时更新强度检查
    useEffect(() => {
        if (watchedPassword) {
            const strength = checkPasswordStrength(watchedPassword)
            setPasswordStrength(strength)
        } else {
            setPasswordStrength({
                score: 0,
                strength: 'weak',
                strengthText: '弱',
                feedback: [],
            })
        }
    }, [watchedPassword])

    const handleFormSubmit = async (data: RegisterFormData) => {
        try {
            await onSubmit(data)
        } catch (error) {
            console.error('注册失败:', error)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const getStrengthColor = (strength: string) => {
        switch (strength) {
            case 'weak': return '#EF4444'
            case 'medium': return '#F59E0B'
            case 'strong': return '#10B981'
            default: return '#6B7280'
        }
    }

    const getStrengthWidth = (score: number) => {
        return `${(score / 5) * 100}%`
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                {/* 邮箱输入框 */}
                <div className="input-container">
                    <label className="input-label">
                        邮箱地址
                    </label>
                    <div className="input-wrapper">
                        <Input
                            {...register('email')}
                            type="email"
                            placeholder="请输入邮箱地址"
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

                {/* 用户名输入框 */}
                <div className="input-container">
                    <label className="input-label">
                        用户名
                    </label>
                    <div className="input-wrapper">
                        <Input
                            {...register('username')}
                            type="text"
                            placeholder="请输入用户名"
                            error={!!errors.username}
                            disabled={isSubmitting || isLoading}
                            style={{
                                paddingLeft: 'var(--spacing-10)',
                            }}
                        />
                        <Icon
                            name="username-icon"
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
                    {errors.username && (
                        <span className="input-error">
                            {errors.username.message}
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
                            name="password-icon"
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
                                name="password-eye-icon"
                                size="sm"
                                style={{
                                    color: 'var(--color-text-muted)',
                                    opacity: showPassword ? 1 : 0.6,
                                }}
                            />
                        </button>
                    </div>

                    {/* 密码强度指示器 */}
                    {watchedPassword && (
                        <div style={{ marginTop: 'var(--spacing-2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-1)' }}>
                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                    密码强度
                                </span>
                                <span style={{
                                    fontSize: 'var(--font-size-xs)',
                                    color: getStrengthColor(passwordStrength.strength),
                                    fontWeight: 500
                                }}>
                                    {passwordStrength.strengthText}
                                </span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '4px',
                                background: 'var(--color-border-primary)',
                                borderRadius: '2px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: getStrengthWidth(passwordStrength.score),
                                    height: '100%',
                                    background: getStrengthColor(passwordStrength.strength),
                                    transition: 'all 0.3s ease',
                                }} />
                            </div>
                            {passwordStrength.feedback.length > 0 && (
                                <div style={{ marginTop: 'var(--spacing-1)' }}>
                                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                        建议: {passwordStrength.feedback.join('、')}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {errors.password && (
                        <span className="input-error">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                {/* 确认密码输入框 */}
                <div className="input-container">
                    <label className="input-label">
                        确认密码
                    </label>
                    <div className="input-wrapper">
                        <Input
                            {...register('confirmPassword')}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="请再次输入密码"
                            error={!!errors.confirmPassword}
                            disabled={isSubmitting || isLoading}
                            style={{
                                paddingLeft: 'var(--spacing-10)',
                                paddingRight: 'var(--spacing-10)',
                            }}
                        />
                        <Icon
                            name="password-icon"
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
                            onClick={toggleConfirmPasswordVisibility}
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
                            aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
                        >
                            <Icon
                                name="password-eye-icon"
                                size="sm"
                                style={{
                                    color: 'var(--color-text-muted)',
                                    opacity: showConfirmPassword ? 1 : 0.6,
                                }}
                            />
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <span className="input-error">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                {/* 用户协议复选框 */}
                <div className="input-container">
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--spacing-2)',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.4'
                        }}
                    >
                        <input
                            {...register('agreeToTerms')}
                            type="checkbox"
                            style={{
                                width: '16px',
                                height: '16px',
                                accentColor: 'var(--color-primary-blue)',
                                marginTop: '2px',
                                flexShrink: 0,
                            }}
                        />
                        <span>
                            我已阅读并同意
                            <button
                                type="button"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-primary-blue)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    margin: '0 2px',
                                }}
                                onClick={() => {
                                    // TODO: 打开用户协议弹窗
                                    console.log('打开用户协议')
                                }}
                            >
                                用户协议
                            </button>
                            和
                            <button
                                type="button"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-primary-blue)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    margin: '0 2px',
                                }}
                                onClick={() => {
                                    // TODO: 打开隐私政策弹窗
                                    console.log('打开隐私政策')
                                }}
                            >
                                隐私政策
                            </button>
                        </span>
                    </label>
                    {errors.agreeToTerms && (
                        <span className="input-error">
                            {errors.agreeToTerms.message}
                        </span>
                    )}
                </div>

                {/* 注册按钮 */}
                <GradientButton
                    type="submit"
                    size="lg"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting || isLoading}
                    loading={isSubmitting || isLoading}
                    style={{ marginTop: 'var(--spacing-2)' }}
                >
                    {isSubmitting || isLoading ? '注册中...' : '创建账号'}
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

                {/* 社交注册 */}
                <GradientButton
                    type="button"
                    size="lg"
                    variant="outline"
                    fullWidth
                    disabled={isSubmitting || isLoading}
                    onClick={() => {
                        // TODO: 实现GitHub注册
                        console.log('GitHub注册')
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-3)',
                    }}
                >
                    <Icon name="github-icon" size="sm" />
                    使用 GitHub 注册
                </GradientButton>

                {/* 登录链接 */}
                <div style={{
                    textAlign: 'center',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)'
                }}>
                    已有账号？
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-primary-blue)',
                            marginLeft: 'var(--spacing-1)',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                    >
                        立即登录
                    </button>
                </div>
            </div>
        </form>
    )
} 