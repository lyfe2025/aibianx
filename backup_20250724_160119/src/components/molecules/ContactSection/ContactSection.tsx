'use client'

import { useState } from 'react'
import { GradientButton, Icon, GradientText } from '@/components/ui'

interface ContactMethod {
    icon: string
    label: string
    value: string
    href?: string
}

interface ContactSectionProps {
    title?: string
    subtitle?: string
    methods: ContactMethod[]
    className?: string
}

export function ContactSection({
    title = "联系我们",
    subtitle = "有任何问题或建议，欢迎与我们联系",
    methods,
    className = ''
}: ContactSectionProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // TODO: 实现表单提交逻辑
            console.log('提交表单:', formData)
            await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟API调用

            // 提交成功
            alert('消息发送成功！我们会尽快回复您。')
            setFormData({ name: '', email: '', message: '' })
        } catch (error) {
            alert('发送失败，请稍后重试。')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className={className} style={{
            padding: 'var(--page-padding-top-md) 0 var(--page-padding-bottom-md)'
        }}>
            {/* 标题区域 */}
            <div style={{
                textAlign: 'center',
                marginBottom: 'var(--section-spacing-md)'
            }}>
                <GradientText
                    as="h2"
                    size="7xl"
                    weight="bold"
                    style={{
                        marginBottom: 'var(--title-margin-bottom-md)'
                    }}
                >
                    {title}
                </GradientText>
                <p style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontFamily: 'var(--font-family-primary)',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: '1.5'
                }}>
                    {subtitle}
                </p>
            </div>

            {/* 内容区域 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'start',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {/* 联系方式 */}
                <div>
                    <h3 style={{
                        fontSize: 'var(--font-size-4xl)',
                        fontWeight: '700',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-6)'
                    }}>
                        联系方式
                    </h3>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-6)'
                    }}>
                        {methods.map((method, index) => (
                            <div
                                key={index}
                                className="contact-method-card"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-4)',
                                    padding: 'var(--spacing-4)',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid var(--color-border-primary)',
                                    borderRadius: 'var(--radius-lg)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {/* 图标 */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'var(--gradient-primary)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon name={method.icon} size="sm" style={{ color: '#FFFFFF' }} />
                                </div>

                                {/* 内容 */}
                                <div>
                                    <div style={{
                                        fontSize: 'var(--font-size-lg)',
                                        fontWeight: '600',
                                        color: 'var(--color-text-primary)',
                                        marginBottom: '4px'
                                    }}>
                                        {method.label}
                                    </div>
                                    {method.href ? (
                                        <a
                                            href={method.href}
                                            className="contact-method-link"
                                            style={{
                                                fontSize: 'var(--font-size-base)',
                                                color: 'var(--color-primary-blue)',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            {method.value}
                                        </a>
                                    ) : (
                                        <span style={{
                                            fontSize: 'var(--font-size-base)',
                                            color: 'var(--color-text-secondary)'
                                        }}>
                                            {method.value}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 联系表单 */}
                <div className="glass-card" style={{
                    padding: 'var(--spacing-8)'
                }}>
                    <h3 style={{
                        fontSize: 'var(--font-size-4xl)',
                        fontWeight: '700',
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-6)',
                        textAlign: 'center'
                    }}>
                        发送消息
                    </h3>

                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-5)'
                    }}>
                        {/* 姓名输入 */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: '500',
                                color: 'var(--color-text-primary)',
                                marginBottom: 'var(--spacing-2)'
                            }}>
                                姓名 *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    padding: '0 var(--spacing-4)',
                                    background: 'var(--color-bg-input)',
                                    backdropFilter: 'blur(var(--blur-sm))',
                                    border: '1px solid var(--color-border-primary)',
                                    borderRadius: 'var(--radius-lg)',
                                    fontSize: 'var(--font-size-base)',
                                    color: 'var(--color-text-primary)',
                                    transition: 'all 0.2s ease'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-border-active)'
                                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--color-border-primary)'
                                    e.target.style.boxShadow = 'none'
                                }}
                                placeholder="请输入您的姓名"
                            />
                        </div>

                        {/* 邮箱输入 */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: '500',
                                color: 'var(--color-text-primary)',
                                marginBottom: 'var(--spacing-2)'
                            }}>
                                邮箱 *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    padding: '0 var(--spacing-4)',
                                    background: 'var(--color-bg-input)',
                                    backdropFilter: 'blur(var(--blur-sm))',
                                    border: '1px solid var(--color-border-primary)',
                                    borderRadius: 'var(--radius-lg)',
                                    fontSize: 'var(--font-size-base)',
                                    color: 'var(--color-text-primary)',
                                    transition: 'all 0.2s ease'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-border-active)'
                                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--color-border-primary)'
                                    e.target.style.boxShadow = 'none'
                                }}
                                placeholder="请输入您的邮箱"
                            />
                        </div>

                        {/* 消息输入 */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: '500',
                                color: 'var(--color-text-primary)',
                                marginBottom: 'var(--spacing-2)'
                            }}>
                                消息 *
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: 'var(--spacing-4)',
                                    background: 'var(--color-bg-input)',
                                    backdropFilter: 'blur(var(--blur-sm))',
                                    border: '1px solid var(--color-border-primary)',
                                    borderRadius: 'var(--radius-lg)',
                                    fontSize: 'var(--font-size-base)',
                                    color: 'var(--color-text-primary)',
                                    transition: 'all 0.2s ease',
                                    resize: 'vertical'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-border-active)'
                                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--color-border-primary)'
                                    e.target.style.boxShadow = 'none'
                                }}
                                placeholder="请输入您的消息内容..."
                            />
                        </div>

                        {/* 提交按钮 */}
                        <GradientButton
                            type="submit"
                            size="lg"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '发送中...' : '发送消息'}
                        </GradientButton>
                    </form>
                </div>
            </div>

            {/* 响应式样式 */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .content-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                }
            `}</style>
        </section>
    )
} 