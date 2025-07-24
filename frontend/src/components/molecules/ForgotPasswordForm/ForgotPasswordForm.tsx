'use client'

import { useState } from 'react'
import { GradientButton, Icon, Input } from '@/components/ui'
import { useModalStore } from '@/stores'

interface ForgotPasswordFormProps {
    onSubmit?: (data: ForgotPasswordFormData) => Promise<void>
    isLoading?: boolean
}

interface ForgotPasswordFormData {
    email: string
}

export function ForgotPasswordForm({ onSubmit, isLoading: externalLoading }: ForgotPasswordFormProps = {}) {
    const { openModal } = useModalStore()
    const [formData, setFormData] = useState({
        email: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const effectiveLoading = externalLoading ?? isLoading
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        // 清除对应字段的错误
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        // 邮箱验证
        if (!formData.email) {
            newErrors.email = '请输入邮箱地址'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = '请输入有效的邮箱地址'
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
                setIsSubmitted(true)
            } catch (error) {
                setErrors({ submit: '发送失败，请稍后重试' })
            }
        } else {
            // 使用默认处理逻辑
            setIsLoading(true)
            try {
                console.log('找回密码数据:', formData)
                await new Promise(resolve => setTimeout(resolve, 2000))
                setIsSubmitted(true)
            } catch (error) {
                setErrors({ submit: '发送失败，请稍后重试' })
            } finally {
                setIsLoading(false)
            }
        }
    }

    if (isSubmitted) {
        return (
            <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-6) 0'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto var(--spacing-6)',
                    background: 'var(--gradient-primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
                }}>
                    <Icon name="modals/email-icon-forgot" size="lg" style={{ color: '#FFFFFF' }} />
                </div>

                <h3 style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: '700',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--title-margin-bottom-md)'
                }}>
                    邮件已发送
                </h3>

                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.5',
                    marginBottom: 'var(--title-margin-bottom-md)'
                }}>
                    我们已向 <span style={{ color: 'var(--color-text-primary)' }}>{formData.email}</span> 发送了密码重置链接
                    <br />
                    请查收邮件并按照说明操作
                </p>

                <div style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--spacing-4)',
                    marginBottom: 'var(--title-margin-bottom-md)'
                }}>
                    <p style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                        margin: 0
                    }}>
                        💡 没有收到邮件？请检查垃圾邮件文件夹，或等待2-3分钟后重试
                    </p>
                </div>

                <button
                    onClick={() => setIsSubmitted(false)}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--color-border-primary)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'var(--color-text-secondary)',
                        padding: '12px 24px',
                        fontSize: 'var(--font-size-base)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    重新输入邮箱
                </button>

                {/* 返回登录 */}
                <div style={{
                    textAlign: 'center',
                    marginTop: 'var(--spacing-4)'
                }}>
                    <button
                        type="button"
                        onClick={() => {
                            openModal('login')
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-sm)',
                            cursor: 'pointer'
                        }}
                    >
                        返回登录
                    </button>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)'
        }}>
            {/* 邮箱输入 */}
            <Input
                type="email"
                placeholder="请输入您的账号邮箱"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                icon={<Icon name="modals/email-icon-forgot" size="sm" />}
                autoComplete="email"
            />

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

            {/* 提交按钮 */}
            <GradientButton
                type="submit"
                size="lg"
                fullWidth
                disabled={effectiveLoading}
            >
                {effectiveLoading ? '发送中...' : '发送重置链接'}
            </GradientButton>

            {/* 返回登录 */}
            <div style={{
                textAlign: 'center',
                marginTop: 'var(--spacing-4)'
            }}>
                <button
                    type="button"
                    onClick={() => {
                        openModal('login')
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-sm)',
                        cursor: 'pointer'
                    }}
                >
                    返回登录
                </button>
            </div>
        </form>
    )
} 