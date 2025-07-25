'use client'

import { useState } from 'react'
import { GradientButton, Icon, Input } from '@/components/ui'
import { getPasswordStrength } from '@/lib/validations'
import { useModalStore } from '@/stores'

interface RegisterFormProps {
    onSubmit?: (data: RegisterFormData) => Promise<void>
    isLoading?: boolean
    onShowTerms?: () => void
    onShowPrivacy?: () => void
}

interface RegisterFormData {
    username: string
    email: string
    password: string
    confirmPassword: string
    agreeToTerms: boolean
}

export function RegisterForm({ onSubmit, isLoading: externalLoading, onShowTerms, onShowPrivacy }: RegisterFormProps = {}) {
    const { openModal } = useModalStore()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const effectiveLoading = externalLoading ?? isLoading
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // 密码强度
    const passwordStrength = getPasswordStrength(formData.password)

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        // 清除对应字段的错误
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        // 用户名验证
        if (!formData.username) {
            newErrors.username = '请输入用户名'
        } else if (formData.username.length < 2) {
            newErrors.username = '用户名至少需要2个字符'
        }

        // 邮箱验证
        if (!formData.email) {
            newErrors.email = '请输入邮箱'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = '请输入有效的邮箱地址'
        }

        // 密码验证
        if (!formData.password) {
            newErrors.password = '请输入密码'
        } else if (formData.password.length < 8) {
            newErrors.password = '密码至少需要8个字符'
        }

        // 确认密码验证
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = '请确认密码'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '两次输入的密码不一致'
        }

        // 同意条款验证
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = '请同意用户协议和隐私政策'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        if (onSubmit) {
            // 使用外部传入的处理函数
            try {
                await onSubmit(formData)
            } catch (error) {
                setErrors({ submit: '注册失败，请稍后重试' })
            }
        } else {
            // 使用默认处理逻辑
            setIsLoading(true)
            try {
                console.log('注册数据:', formData)
                await new Promise(resolve => setTimeout(resolve, 2000))
                alert('注册成功！请查收邮箱验证邮件。')
            } catch (error) {
                setErrors({ submit: '注册失败，请稍后重试' })
            } finally {
                setIsLoading(false)
            }
        }
    }

    const getPasswordStrengthColor = (score: number) => {
        if (score <= 2) return '#EF4444' // 红色
        if (score <= 4) return '#F59E0B' // 黄色
        return '#10B981' // 绿色
    }

    const getPasswordStrengthText = (score: number) => {
        if (score <= 2) return '弱'
        if (score <= 4) return '中等'
        return '强'
    }

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)'
        }}>
            {/* 个人信息标签 */}
            <div style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                marginTop: 'var(--spacing-2)'
            }}>
                个人信息
            </div>

            {/* 用户名输入 */}
            <Input
                type="text"
                placeholder="用户名"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                error={errors.username}
                icon={<Icon name="modals/username-icon" size="sm" />}
                autoComplete="username"
            />

            {/* 邮箱输入 */}
            <Input
                type="email"
                placeholder="电子邮箱"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                icon={<Icon name="modals/email-icon" size="sm" />}
                autoComplete="email"
            />

            {/* 安全信息标签 */}
            <div style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                marginTop: 'var(--spacing-2)'
            }}>
                安全信息
            </div>

            {/* 密码输入 */}
            <div>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="密码"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    error={errors.password}
                    icon={<Icon name="modals/password-icon" size="sm" />}
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
                                name={showPassword ? "modals/password-eye-icon" : "eye-icon"}
                                size="sm"
                                style={{
                                    color: showPassword ? 'var(--color-primary-blue)' : 'var(--color-text-muted)'
                                }}
                            />
                        </button>
                    }
                    autoComplete="new-password"
                />

                {/* 密码强度指示器 */}
                {formData.password && (
                    <div style={{
                        marginTop: 'var(--spacing-2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)'
                    }}>
                        <div style={{
                            flex: 1,
                            height: '4px',
                            background: 'var(--color-border-primary)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${(passwordStrength.score / 6) * 100}%`,
                                height: '100%',
                                background: getPasswordStrengthColor(passwordStrength.score),
                                transition: 'all 0.3s ease'
                            }} />
                        </div>
                        <span style={{
                            fontSize: 'var(--font-size-xs)',
                            color: getPasswordStrengthColor(passwordStrength.score),
                            fontWeight: '500'
                        }}>
                            {getPasswordStrengthText(passwordStrength.score)}
                        </span>
                    </div>
                )}
            </div>

            {/* 确认密码输入 */}
            <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="确认密码"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                icon={<Icon name="modals/password-icon" size="sm" />}
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
                            name={showConfirmPassword ? "modals/password-eye-icon" : "eye-icon"}
                            size="sm"
                            style={{
                                color: showConfirmPassword ? 'var(--color-primary-blue)' : 'var(--color-text-muted)'
                            }}
                        />
                    </button>
                }
                autoComplete="new-password"
            />

            {/* 用户协议 */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--spacing-3)',
                margin: 'var(--spacing-2) 0'
            }}>
                <button
                    type="button"
                    onClick={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
                    style={{
                        width: '20px',
                        height: '20px',
                        border: `2px solid ${formData.agreeToTerms ? 'var(--color-primary-blue)' : 'var(--color-border-primary)'}`,
                        borderRadius: '4px',
                        background: formData.agreeToTerms ? 'var(--color-primary-blue)' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                        marginTop: '2px'
                    }}
                >
                    {formData.agreeToTerms && (
                        <Icon name="modals/checkbox-icon" size="xs" style={{ color: 'var(--color-text-primary)' }} />
                    )}
                </button>
                <div style={{ flex: 1 }}>
                    <span style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.5'
                    }}>
                        我已阅读并同意
                        <button
                            type="button"
                            onClick={onShowTerms}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-primary-blue)',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                fontSize: 'inherit',
                                fontFamily: 'inherit',
                                marginLeft: '4px',
                                marginRight: '4px',
                                padding: 0
                            }}
                        >
                            《用户协议》
                        </button>
                        和
                        <button
                            type="button"
                            onClick={onShowPrivacy}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-primary-blue)',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                fontSize: 'inherit',
                                fontFamily: 'inherit',
                                marginLeft: '4px',
                                padding: 0
                            }}
                        >
                            《隐私政策》
                        </button>
                    </span>
                    {errors.agreeToTerms && (
                        <div style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-error)',
                            marginTop: 'var(--spacing-1)'
                        }}>
                            {errors.agreeToTerms}
                        </div>
                    )}
                </div>
            </div>

            {/* 提交错误 */}
            {errors.submit && (
                <div style={{
                    padding: 'var(--spacing-3)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-error)'
                }}>
                    {errors.submit}
                </div>
            )}

            {/* 注册按钮 */}
            <GradientButton
                type="submit"
                size="lg"
                fullWidth
                disabled={effectiveLoading}
            >
                {effectiveLoading ? '注册中...' : '注册'}
            </GradientButton>



            {/* 登录链接 */}
            <div style={{
                textAlign: 'center',
                marginTop: 'var(--spacing-4)',
                fontSize: 'var(--font-size-base)'
            }}>
                <span style={{ color: 'var(--color-text-muted)' }}>
                    已有账号？
                </span>
                <button
                    type="button"
                    onClick={() => {
                        openModal('login')
                    }}
                    style={{
                        border: 'none',
                        background: 'var(--gradient-primary)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '500',
                        marginLeft: '4px',
                        cursor: 'pointer'
                    }}
                >
                    登录
                </button>
            </div>
        </form>
    )
} 