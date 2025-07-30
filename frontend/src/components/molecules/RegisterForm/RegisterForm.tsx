'use client'

import { useState } from 'react'
import { GradientButton, Icon, Input } from '@/components/ui'
// import { getPasswordStrength } from '@/lib/validations' // 已使用动态密码强度评估
import { useModalStore } from '@/stores'
import { usePasswordPolicy, usePasswordValidation } from '@/lib/hooks'

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
    verificationCode: string
    agreeToTerms: boolean
}

export function RegisterForm({ onSubmit, isLoading: externalLoading, onShowTerms, onShowPrivacy }: RegisterFormProps = {}) {
    const { openModal } = useModalStore()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
        agreeToTerms: false
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const effectiveLoading = externalLoading ?? isLoading
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // 验证码相关状态
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isSendingCode, setIsSendingCode] = useState(false)
    const [isVerifyingCode, setIsVerifyingCode] = useState(false)
    const [isCodeVerified, setIsCodeVerified] = useState(false)
    const [countdown, setCountdown] = useState(0)

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

    // 发送验证码
    const handleSendVerificationCode = async () => {
        if (!formData.email) {
            setErrors(prev => ({ ...prev, email: '请先输入邮箱地址' }))
            return
        }

        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setErrors(prev => ({ ...prev, email: '邮箱格式不正确' }))
            return
        }

        setIsSendingCode(true)
        try {
            const response = await fetch('/api/auth/send-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            })

            const data = await response.json()

            if (response.ok) {
                setIsCodeSent(true)
                setCountdown(60) // 60秒倒计时

                // 启动倒计时
                const timer = setInterval(() => {
                    setCountdown(prev => {
                        if (prev <= 1) {
                            clearInterval(timer)
                            return 0
                        }
                        return prev - 1
                    })
                }, 1000)

                // 清除邮箱错误
                setErrors(prev => ({ ...prev, email: '' }))
            } else {
                setErrors(prev => ({ ...prev, email: data.error }))
            }
        } catch (error) {
            console.error('发送验证码失败:', error)
            setErrors(prev => ({ ...prev, email: '发送验证码失败，请稍后重试' }))
        } finally {
            setIsSendingCode(false)
        }
    }

    // 验证验证码
    const handleVerifyCode = async () => {
        if (!formData.verificationCode) {
            setErrors(prev => ({ ...prev, verificationCode: '请输入验证码' }))
            return
        }

        setIsVerifyingCode(true)
        try {
            const response = await fetch('/api/auth/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    code: formData.verificationCode
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setIsCodeVerified(true)
                setErrors(prev => ({ ...prev, verificationCode: '' }))
            } else {
                setErrors(prev => ({ ...prev, verificationCode: data.error }))
            }
        } catch (error) {
            console.error('验证验证码失败:', error)
            setErrors(prev => ({ ...prev, verificationCode: '验证失败，请稍后重试' }))
        } finally {
            setIsVerifyingCode(false)
        }
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        // 清除对应字段的错误
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }

        // 如果邮箱改变，重置验证码状态
        if (field === 'email') {
            setIsCodeSent(false)
            setIsCodeVerified(false)
            setCountdown(0)
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

        // 验证码验证
        if (!formData.verificationCode) {
            newErrors.verificationCode = '请输入验证码'
        } else if (!isCodeVerified) {
            newErrors.verificationCode = '请先验证邮箱验证码'
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
                        code: formData.verificationCode,
                        username: formData.username,
                    }),
                })

                const data = await response.json()

                if (response.ok) {
                    alert('注册成功！您现在可以使用邮箱和密码登录了。')
                    // 可以在这里切换到登录弹窗
                    openModal('login')
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

                {/* 发送验证码按钮 */}
                {formData.email && !isCodeSent && (
                    <div style={{ marginTop: 'var(--spacing-2)' }}>
                        <GradientButton
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleSendVerificationCode}
                            loading={isSendingCode}
                            disabled={isSendingCode}
                        >
                            {isSendingCode ? '发送中...' : '发送验证码'}
                        </GradientButton>
                    </div>
                )}

                {/* 验证码发送成功提示 */}
                {isCodeSent && (
                    <div style={{
                        marginTop: 'var(--spacing-2)',
                        padding: 'var(--spacing-2)',
                        background: 'var(--color-bg-success)',
                        border: '1px solid var(--color-border-success)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-success)',
                    }}>
                        ✅ 验证码已发送到您的邮箱，请查收！
                        {countdown > 0 && (
                            <span style={{ marginLeft: 'var(--spacing-2)' }}>
                                ({countdown}s后可重新发送)
                            </span>
                        )}
                        {countdown === 0 && (
                            <button
                                type="button"
                                onClick={handleSendVerificationCode}
                                style={{
                                    marginLeft: 'var(--spacing-2)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-primary-blue)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    fontSize: 'var(--font-size-sm)',
                                }}
                            >
                                重新发送
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* 验证码输入 */}
            {isCodeSent && (
                <div>
                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-2)',
                        alignItems: 'flex-end',
                    }}>
                        <div style={{ flex: 1 }}>
                            <Input
                                type="text"
                                placeholder="请输入6位验证码"
                                value={formData.verificationCode}
                                onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                                error={errors.verificationCode}
                                icon={<Icon name="modals/verification-code-icon" size="sm" />}
                                maxLength={6}
                            />
                        </div>
                        <GradientButton
                            type="button"
                            variant="primary"
                            size="md"
                            onClick={handleVerifyCode}
                            loading={isVerifyingCode}
                            disabled={!formData.verificationCode || isVerifyingCode || isCodeVerified}
                        >
                            {isCodeVerified ? '已验证' : isVerifyingCode ? '验证中...' : '验证'}
                        </GradientButton>
                    </div>

                    {/* 验证成功提示 */}
                    {isCodeVerified && (
                        <div style={{
                            marginTop: 'var(--spacing-2)',
                            padding: 'var(--spacing-2)',
                            background: 'var(--color-bg-success)',
                            border: '1px solid var(--color-border-success)',
                            borderRadius: 'var(--border-radius-md)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-success)',
                        }}>
                            ✅ 邮箱验证成功！
                        </div>
                    )}
                </div>
            )}

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