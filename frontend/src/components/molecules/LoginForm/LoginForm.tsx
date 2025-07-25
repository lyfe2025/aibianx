'use client'

import { useState } from 'react'
import { GradientButton, Icon, Input } from '@/components/ui'
import { useModalStore } from '@/stores'

interface LoginFormProps {
    onSubmit?: (data: LoginFormData) => Promise<void>
    isLoading?: boolean
}

interface LoginFormData {
    emailOrUsername: string
    password: string
    rememberMe: boolean
}

export function LoginForm({ onSubmit, isLoading: externalLoading }: LoginFormProps = {}) {
    const { openModal } = useModalStore()
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: '',
        rememberMe: false
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const effectiveLoading = externalLoading ?? isLoading
    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        // 清除对应字段的错误
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        // 邮箱或用户名验证
        if (!formData.emailOrUsername) {
            newErrors.emailOrUsername = '请输入邮箱或用户名'
        }

        // 密码验证
        if (!formData.password) {
            newErrors.password = '请输入密码'
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
                setErrors({ submit: '登录失败，请检查用户名和密码' })
            }
        } else {
            // 使用默认处理逻辑
            setIsLoading(true)
            try {
                console.log('登录数据:', formData)
                await new Promise(resolve => setTimeout(resolve, 2000))
                alert('登录成功！')
            } catch (error) {
                setErrors({ submit: '登录失败，请检查用户名和密码' })
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)'
        }}>
            {/* 邮箱或用户名输入 */}
            <Input
                type="text"
                placeholder="电子邮箱/用户名"
                value={formData.emailOrUsername}
                onChange={(e) => handleInputChange('emailOrUsername', e.target.value)}
                error={errors.emailOrUsername}
                icon={<Icon name="modals/email-username-icon" size="sm" />}
                autoComplete="username"
            />

            {/* 密码输入 */}
            <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="密码"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                icon={<Icon name="modals/password-icon-login" size="sm" />}
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
                            name={showPassword ? "modals/password-eye-login" : "eye-icon"}
                            size="sm"
                            style={{
                                color: showPassword ? 'var(--color-primary-blue)' : 'var(--color-text-muted)'
                            }}
                        />
                    </button>
                }
                autoComplete="current-password"
            />

            {/* 记住我 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 'var(--spacing-2) 0'
            }}>
                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)'
                }}>
                    <button
                        type="button"
                        onClick={() => handleInputChange('rememberMe', !formData.rememberMe)}
                        style={{
                            width: '18px',
                            height: '18px',
                            border: `2px solid ${formData.rememberMe ? 'var(--color-primary-blue)' : 'var(--color-border-primary)'}`,
                            borderRadius: '4px',
                            background: formData.rememberMe ? 'var(--color-primary-blue)' : 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {formData.rememberMe && (
                            <Icon name="modals/checkbox-icon" size="xs" style={{ color: 'var(--color-text-primary)' }} />
                        )}
                    </button>
                    记住我
                </label>

                <button
                    type="button"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-sm)',
                        cursor: 'pointer',
                        textDecoration: 'none'
                    }}
                    onClick={() => {
                        // 打开忘记密码弹窗
                        openModal('forgotPassword')
                    }}
                >
                    忘记密码?
                </button>
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

            {/* 登录按钮 */}
            <GradientButton
                type="submit"
                size="lg"
                fullWidth
                disabled={effectiveLoading}
            >
                {effectiveLoading ? '登录中...' : '登录'}
            </GradientButton>

            {/* 社交登录分隔线 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                margin: 'var(--spacing-5) 0'
            }}>
                <div style={{
                    flex: 1,
                    height: '1px',
                    background: '#2A2A2A'
                }} />
                <div style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-disabled)',
                    lineHeight: '24px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                }}>
                    或
                </div>
                <div style={{
                    flex: 1,
                    height: '1px',
                    background: '#2A2A2A'
                }} />
            </div>

            {/* GitHub登录 */}
            <button
                type="button"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-3)',
                    width: '100%',
                    padding: '12px 24px',
                    background: 'rgba(18, 18, 18, 0.70)',
                    border: '1px solid var(--color-border-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-base)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                onClick={() => {
                    // TODO: 实现GitHub登录
                    console.log('GitHub登录')
                }}
            >
                <Icon name="modals/github-icon-login" size="sm" />
                使用 GitHub 登录
            </button>

            {/* 注册链接 */}
            <div style={{
                textAlign: 'center',
                marginTop: 'var(--spacing-4)',
                fontSize: 'var(--font-size-base)'
            }}>
                <span style={{ color: 'var(--color-text-muted)' }}>
                    还没有账号？
                </span>
                <button
                    type="button"
                    onClick={() => {
                        openModal('register')
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
                    注册
                </button>
            </div>
        </form>
    )
} 