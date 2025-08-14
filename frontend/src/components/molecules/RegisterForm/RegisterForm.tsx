'use client'

import { useState } from 'react'
import { GradientButton, Icon, Input } from '@/components/ui'
// import { getPasswordStrength } from '@/lib/validations' // 已使用动态密码强度评估
import { useModalStore } from '@/stores'
import { usePasswordPolicy, usePasswordValidation } from '@/lib/hooks'
// 还原为弹窗内提示，不使用全局Toast

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
    // 不使用全局Toast
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    // 成功提示状态（弹窗内毛玻璃风格）
    const [isSuccess, setIsSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const effectiveLoading = externalLoading ?? isLoading
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // 验证码相关状态 - 已禁用邮箱验证功能
    // const [isCodeSent, setIsCodeSent] = useState(false)
    // const [isSendingCode, setIsSendingCode] = useState(false)
    // const [isVerifyingCode, setIsVerifyingCode] = useState(false)
    // const [isCodeVerified, setIsCodeVerified] = useState(false)
    // const [countdown, setCountdown] = useState(0)

    // 系统配置Hook
    const {
        minLength,
        requireSpecialChar,
        requireNumber,
        requireUppercase,
        getPolicyDescription
    } = usePasswordPolicy()
    // const { validatePassword: validatePasswordAsync, validationResult } = usePasswordValidation() // 暂未使用服务端验证

    // 动态密码强度评估（基于系统配置）
    const getDynamicPasswordStrength = (password: string) => {
        let score = 0
        const feedback: string[] = []

        // 长度检查
        if (password.length >= minLength) {
            score++
        } else {
            feedback.push(`至少${minLength}个字符`)
        }

        // 小写字母检查
        if (/[a-z]/.test(password)) {
            score++
        } else {
            feedback.push('包含小写字母')
        }

        // 大写字母检查（仅在系统要求时）
        if (requireUppercase) {
            if (/[A-Z]/.test(password)) {
                score++
            } else {
                feedback.push('包含大写字母')
            }
        } else if (/[A-Z]/.test(password)) {
            score++ // 即使不要求，也加分
        }

        // 数字检查（仅在系统要求时）
        if (requireNumber) {
            if (/\d/.test(password)) {
                score++
            } else {
                feedback.push('包含数字')
            }
        } else if (/\d/.test(password)) {
            score++ // 即使不要求，也加分
        }

        // 特殊字符检查（仅在系统要求时）
        if (requireSpecialChar) {
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                score++
            } else {
                feedback.push('包含特殊字符')
            }
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            score++ // 即使不要求，也加分
        }

        // 额外长度奖励
        if (password.length >= 12) score++

        return { score, feedback }
    }

    // 密码强度（使用动态配置）
    const passwordStrength = getDynamicPasswordStrength(formData.password)

    // 发送验证码和验证验证码功能已禁用 - 用户注册时不再需要邮箱验证
    // const handleSendVerificationCode = async () => { ... }
    // const handleVerifyCode = async () => { ... }

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        // 清除对应字段的错误
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }

        // 如果用户勾选了同意条款，清除相关的错误信息
        if (field === 'agreeToTerms' && value === true) {
            setErrors(prev => ({ ...prev, agreeToTerms: '', submit: '' }))
        }

        // 如果邮箱改变，重置验证码状态 - 已禁用邮箱验证功能
        // if (field === 'email') {
        //     setIsCodeSent(false)
        //     setIsCodeVerified(false)
        //     setCountdown(0)
        // }
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

        // 密码验证（使用动态策略）
        if (!formData.password) {
            newErrors.password = '请输入密码'
        } else {
            // 基于系统配置验证密码
            const passwordErrors = []

            if (formData.password.length < minLength) {
                passwordErrors.push(`密码长度至少需要${minLength}个字符`)
            }

            if (requireNumber && !/\d/.test(formData.password)) {
                passwordErrors.push('密码必须包含至少一个数字')
            }

            if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
                passwordErrors.push('密码必须包含至少一个特殊字符')
            }

            if (requireUppercase && !/[A-Z]/.test(formData.password)) {
                passwordErrors.push('密码必须包含至少一个大写字母')
            }

            if (passwordErrors.length > 0) {
                newErrors.password = passwordErrors[0] // 显示第一个错误
            }
        }

        // 确认密码验证
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = '请确认密码'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '两次输入的密码不一致'
        }

        // 验证码验证 - 已禁用邮箱验证码要求
        // 用户注册时不再需要邮箱验证码

        // 同意条款验证
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = '请同意用户协议和隐私政策'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // 清除之前的提交错误
        setErrors(prev => ({ ...prev, submit: '' }))

        if (!validateForm()) {
            // 验证失败，错误信息已在validateForm中设置
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
            // 使用默认处理逻辑 - 调用注册API
            setIsLoading(true)
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        username: formData.username,
                    }),
                })

                const data = await response.json()

                if (response.ok) {
                    // 弹窗内成功提示（毛玻璃风格）
                    setIsSuccess(true)
                    setSuccessMessage('🎉 注册成功！账户创建成功，您现在可以使用邮箱和密码登录了')
                    setErrors({})

                    setTimeout(() => {
                        setIsSuccess(false)
                        openModal('login')
                    }, 3000)
                } else {
                    setErrors({ submit: data.error || '注册失败，请稍后重试' })
                }
            } catch (error) {
                console.error('注册失败:', error)
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
            <div>
                <Input
                    type="email"
                    placeholder="电子邮箱"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    icon={<Icon name="modals/email-icon" size="sm" />}
                    autoComplete="email"
                />

                {/* 邮箱验证码功能已禁用 - 用户注册时不再需要邮箱验证 */}
            </div>

            {/* 验证码输入功能已禁用 - 用户注册时不再需要邮箱验证 */}

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

                {/* 密码策略提示 */}
                <div style={{
                    marginTop: 'var(--spacing-2)',
                    padding: 'var(--spacing-2)',
                    background: 'var(--color-bg-muted)',
                    border: '1px solid var(--color-border-light)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)'
                }}>
                    <div style={{ marginBottom: 'var(--spacing-1)', fontWeight: '500' }}>
                        {getPolicyDescription()}
                    </div>
                    {formData.password && passwordStrength.feedback.length > 0 && (
                        <div style={{ fontSize: 'var(--font-size-xs)' }}>
                            <span style={{ color: 'var(--color-warning)' }}>提示：</span>
                            {passwordStrength.feedback.join('、')}
                        </div>
                    )}
                </div>
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
                        border: `2px solid ${
                            errors.agreeToTerms ? 'var(--color-error)' : 
                            formData.agreeToTerms ? 'var(--color-primary-blue)' : 
                            'var(--color-border-primary)'
                        }`,
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

        {/* 注册成功提示 - 弹窗内毛玻璃风格 */}
        {isSuccess && (
            <div style={{
                padding: 'var(--spacing-4)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-success)',
                textAlign: 'center',
                fontWeight: '500',
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
                animation: 'fadeInScale 0.5s ease-out',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                    animation: 'shimmer 2s ease-in-out infinite'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {successMessage}
                    <div style={{
                        marginTop: 'var(--spacing-2)',
                        fontSize: 'var(--font-size-sm)',
                        opacity: 0.8
                    }}>
                        正在跳转到登录页面...
                    </div>
                </div>
                <style jsx>{`
                    @keyframes fadeInScale {
                        from { opacity: 0; transform: scale(0.9) translateY(10px); }
                        to { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}</style>
            </div>
        )}

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