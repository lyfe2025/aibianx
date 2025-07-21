'use client'

import { useState } from 'react'
import { GradientButton, Icon, Input } from '@/components/ui'

export function LoginForm() {
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: '',
        rememberMe: false
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
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

        setIsLoading(true)

        try {
            // TODO: 实现登录API调用
            console.log('登录数据:', formData)
            await new Promise(resolve => setTimeout(resolve, 2000)) // 模拟API调用

            // 登录成功
            alert('登录成功！')
        } catch (error) {
            setErrors({ submit: '登录失败，请检查用户名和密码' })
        } finally {
            setIsLoading(false)
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
                label="邮箱或用户名"
                type="text"
                placeholder="请输入邮箱或用户名"
                value={formData.emailOrUsername}
                onChange={(e) => handleInputChange('emailOrUsername', e.target.value)}
                error={errors.emailOrUsername}
                icon={<Icon name="user" size="sm" />}
                autoComplete="username"
            />

            {/* 密码输入 */}
            <Input
                label="密码"
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                icon={<Icon name="lock" size="sm" />}
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
                            <Icon name="check" size="xs" style={{ color: '#FFFFFF' }} />
                        )}
                    </button>
                    记住我
                </label>

                <button
                    type="button"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary-blue)',
                        fontSize: 'var(--font-size-sm)',
                        cursor: 'pointer',
                        textDecoration: 'none'
                    }}
                    onClick={() => {
                        // TODO: 打开忘记密码弹窗
                        console.log('忘记密码')
                    }}
                >
                    忘记密码？
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
                    color: '#EF4444'
                }}>
                    {errors.submit}
                </div>
            )}

            {/* 登录按钮 */}
            <GradientButton
                type="submit"
                size="lg"
                fullWidth
                disabled={isLoading}
            >
                {isLoading ? '登录中...' : '登录'}
            </GradientButton>

            {/* 社交登录 */}
            <div style={{
                position: 'relative',
                margin: 'var(--spacing-4) 0'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'var(--color-border-primary)'
                }} />
                <div style={{
                    position: 'relative',
                    textAlign: 'center',
                    background: 'var(--color-bg-primary)',
                    padding: '0 var(--spacing-4)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-muted)'
                }}>
                    或
                </div>
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
                    background: 'transparent',
                    border: '1px solid var(--color-border-primary)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-base)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                onClick={() => {
                    // TODO: 实现GitHub登录
                    console.log('GitHub登录')
                }}
            >
                <Icon name="github" size="sm" />
                使用 GitHub 登录
            </button>
        </form>
    )
} 