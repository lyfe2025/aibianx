'use client'

import { useState } from 'react'
import { Icon, GradientText, GradientButton } from '@/components/ui'

/**
 * ContactSectionNew 组件
 * 
 * 联系我们区域，包含联系方式和表单
 */
export function ContactSectionNew() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    // 联系方式配置
    const contactMethods = [
        {
            id: 'email',
            icon: 'email-icon',
            iconColor: 'var(--color-primary-blue)',
            background: 'rgba(59, 130, 246, 0.12)',
            shadow: '0 2px 8px rgba(59, 130, 246, 0.12)',
            text: 'contact@aibianzai.com'
        },
        {
            id: 'phone',
            icon: 'clock-icon',
            iconColor: 'var(--color-success)',
            background: 'rgba(34, 197, 94, 0.12)',
            shadow: '0 2px 8px rgba(34, 197, 94, 0.12)',
            text: '400-888-XXXX'
        },
        {
            id: 'address',
            icon: 'user-icon',
            iconColor: 'var(--color-orange)',
            background: 'rgba(251, 146, 60, 0.12)',
            shadow: '0 2px 8px rgba(251, 146, 60, 0.12)',
            text: '北京市海淀区科技园区88号'
        }
    ]

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = () => {
        console.log('Form submitted:', formData)
        // 这里可以添加表单提交逻辑
    }

    const getInputStyles = () => ({
        background: 'var(--color-bg-input)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '8px',
        padding: '12px 16px',
        width: '100%',
        color: 'var(--color-text-primary)',
        fontSize: '14px',
        lineHeight: '20px',
        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
        outline: 'none',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        transition: 'all 0.2s ease'
    })

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.target.style.borderColor = 'var(--color-border-active)'
        e.target.style.background = 'var(--color-bg-primary)'
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.target.style.borderColor = 'var(--color-border-primary)'
        e.target.style.background = 'var(--color-bg-input)'
    }

    return (
        <section className="about-contact-section">
            <GradientText
                size="6xl"
                weight="bold"
                style={{
                    marginBottom: '0px',
                    lineHeight: '57.6px'
                }}
            >
                联系我们
            </GradientText>

            <div className="about-contact-content">
                <div className="about-contact-layout">
                    {/* 左侧联系信息容器 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '400px'
                    }}>
                        {/* 联系方式列表 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px'
                        }}>
                            {contactMethods.map((method) => (
                                <div key={method.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px'
                                }}>
                                    <div style={{
                                        background: method.background,
                                        borderRadius: '50%',
                                        padding: '8px',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        boxShadow: method.shadow
                                    }}>
                                        <Icon name={method.icon} size="sm" style={{ color: method.iconColor }} />
                                    </div>
                                    <span style={{
                                        color: 'var(--color-text-muted)',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        textAlign: 'left'
                                    }}>
                                        {method.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* 说明文字 */}
                        <div style={{
                            marginTop: '32px'
                        }}>
                            <p style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '16px',
                                lineHeight: '25.6px',
                                textAlign: 'left',
                                margin: '0'
                            }}>
                                我们欢迎各类合作洽谈，包括内容贡献、案例分享、品牌合作、投资咨询等。如果您对AI变现有独特见解或实践经验，也欢迎与我们联系，共同推动AI产业发展！
                            </p>
                        </div>
                    </div>

                    {/* 右侧表单区域 - 垂直布局 */}
                    <div style={{
                        flex: 1,
                        marginLeft: '157px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0px'
                    }}>
                        {/* 联系邮箱标签 */}
                        <div style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '16px',
                            lineHeight: '25.6px',
                            textAlign: 'left',
                            marginBottom: '8px'
                        }}>
                            联系邮箱
                        </div>

                        {/* 姓名输入框 */}
                        <input
                            placeholder="请输入您的姓名"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            style={{
                                ...getInputStyles(),
                                height: '46px',
                                marginBottom: '9px'
                            }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />

                        {/* 邮箱输入框 */}
                        <input
                            placeholder="请输入您的邮箱"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            style={{
                                ...getInputStyles(),
                                height: '46px'
                            }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />

                        {/* 留言内容标签 */}
                        <div style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '16px',
                            lineHeight: '25.6px',
                            textAlign: 'left',
                            whiteSpace: 'nowrap',
                            marginTop: '29px',
                            marginBottom: '8px'
                        }}>
                            留言内容
                        </div>

                        {/* 留言文本框 */}
                        <textarea
                            placeholder="请输入您想咨询或合作的内容"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            style={{
                                ...getInputStyles(),
                                height: '172px',
                                resize: 'none'
                            }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                    </div>
                </div>
            </div>

            {/* 提交按钮 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginTop: '24px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '1200px'
                }}>
                    <GradientButton
                        size="sm"
                        variant="primary"
                        onClick={handleSubmit}
                        style={{
                            borderRadius: '9999px',
                            padding: '17px 28px',
                            fontSize: '13.33px',
                            fontFamily: 'Arial',
                            lineHeight: '15px',
                            width: '110px'
                        }}
                    >
                        提交信息
                    </GradientButton>
                </div>
            </div>
        </section>
    )
} 