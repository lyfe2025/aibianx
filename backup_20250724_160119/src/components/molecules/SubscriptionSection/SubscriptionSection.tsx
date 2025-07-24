'use client'

import { useState } from 'react'

interface SubscriptionSectionProps {
    className?: string
}

export default function SubscriptionSection({ className }: SubscriptionSectionProps) {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(true)

    // 邮箱验证函数
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // 处理邮箱输入变化
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value
        setEmail(newEmail)
        
        // 实时验证邮箱格式（只在有输入时验证）
        if (newEmail.trim()) {
            setIsValidEmail(validateEmail(newEmail))
        } else {
            setIsValidEmail(true) // 空输入时不显示错误
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // 验证邮箱格式
        if (!email.trim()) {
            setIsValidEmail(false)
            return
        }
        
        if (!validateEmail(email)) {
            setIsValidEmail(false)
            return
        }
        
        if (isSubmitting) return

        setIsValidEmail(true)
        setIsSubmitting(true)
        
        try {
            // TODO: 处理邮箱订阅逻辑
            console.log('订阅邮箱:', email)
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1000))
            setSubmitted(true)
            setEmail('')
            // 3秒后重置状态
            setTimeout(() => setSubmitted(false), 3000)
        } catch (error) {
            console.error('订阅失败:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
                <div 
            className={`subscription-section ${className || ''}`}
            style={{
                width: '1374px',
                height: '149px',
                background: 'rgba(26, 26, 26, 0.30)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(42, 42, 42, 0.70)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'stretch',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                position: 'relative',
                margin: '0 auto',
                maxWidth: '100%'
            }}
        >
            {/* 左侧文本内容 */}
            <div
                style={{
                    padding: '32px 24px',
                    gap: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: '400px',
                    height: '100%'
                }}
            >
                <h3
                    style={{
                        color: '#FFFFFF',
                        fontSize: '24px',
                        fontWeight: 700,
                        lineHeight: '32px',
                        margin: 0,
                        whiteSpace: 'nowrap'
                    }}
                >
                    订阅AI变现周刊
                </h3>
                <p
                    style={{
                        color: '#9CA3AF',
                        fontSize: '16px',
                        lineHeight: '22px',
                        margin: 0,
                        whiteSpace: 'nowrap'
                    }}
                >
                    每周精选AI变现干货直达邮箱，掌握前沿技术与商业机会
                </p>
            </div>

            {/* 表单区域 */}
            <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', height: '100%' }}>
                {/* 邮箱输入框 - 精确定位 */}
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="请输入您的邮箱"
                    style={{
                        background: 'rgba(18, 18, 18, 0.50)',
                        border: `1px solid ${!isValidEmail ? '#EF4444' : '#2A2A2A'}`,
                        borderRight: 'none',
                        borderRadius: '8px 0 0 8px',
                        padding: '16px',
                        width: '334px',
                        height: '55px',
                        color: '#FFFFFF', // 用户输入的文字为白色
                        fontFamily: 'Arial',
                        fontSize: '13.33px',
                        lineHeight: '15px',
                        position: 'absolute',
                        top: '47px',
                        left: '424px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                        if (isValidEmail) {
                            e.target.style.borderColor = '#3B82F6'
                        }
                        e.target.style.background = 'rgba(18, 18, 18, 0.70)'
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = !isValidEmail ? '#EF4444' : '#2A2A2A'
                        e.target.style.background = 'rgba(18, 18, 18, 0.50)'
                    }}
                    required
                />

                {/* 订阅按钮 - 精确定位 */}
                <button
                type="submit"
                disabled={isSubmitting || submitted || !isValidEmail}
                style={{
                    background: submitted 
                        ? 'linear-gradient(90deg, #10B981 0%, #059669 100%)'
                        : !isValidEmail 
                        ? 'linear-gradient(90deg, #6B7280 0%, #4B5563 100%)'
                        : 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                    border: !isValidEmail ? '1px solid #EF4444' : 'none',
                    borderLeft: 'none',
                    borderRadius: '0 8px 8px 0',
                    width: '111px',
                    height: '55px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    lineHeight: '22px',
                    position: 'absolute',
                    top: '47px', // 与输入框对齐
                    left: '758px', // 424 + 334 = 758
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    cursor: (isSubmitting || submitted || !isValidEmail) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                    opacity: (isSubmitting || submitted || !isValidEmail) ? 0.8 : 1,
                    whiteSpace: 'nowrap' // 确保按钮文字不换行
                }}
                onMouseOver={(e) => {
                    if (!isSubmitting && !submitted && isValidEmail) {
                        e.currentTarget.style.opacity = '0.9'
                    }
                }}
                onMouseOut={(e) => {
                    if (!isSubmitting && !submitted && isValidEmail) {
                        e.currentTarget.style.opacity = '1'
                    }
                }}
            >
                {submitted ? '已订阅' : isSubmitting ? '订阅中...' : '立即订阅'}
            </button>
            </form>

            {/* 全局样式和响应式样式 */}
            <style jsx>{`
                .subscription-section input::placeholder {
                    color: #757575;
                    opacity: 1;
                    transition: opacity 0.2s ease;
                }
                
                .subscription-section input::-webkit-input-placeholder {
                    color: #757575;
                }
                
                .subscription-section input::-moz-placeholder {
                    color: #757575;
                    opacity: 1;
                }
                
                .subscription-section input:-ms-input-placeholder {
                    color: #757575;
                }
                
                .subscription-section input:-moz-placeholder {
                    color: #757575;
                }

                .subscription-section input:focus::placeholder {
                    opacity: 0.6;
                }

                .subscription-section button:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }

                .subscription-section input:focus {
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
                }

                @media (max-width: 768px) {
                    .subscription-section {
                        width: 100% !important;
                        height: auto !important;
                        flex-direction: column !important;
                        padding: 24px !important;
                    }
                    
                    .subscription-section > div:first-child {
                        width: 100% !important;
                        margin: 0 !important;
                        text-align: center !important;
                    }
                    
                    .subscription-section input {
                        position: static !important;
                        width: 100% !important;
                        margin: 16px 0 0 0 !important;
                        border-radius: 8px !important;
                        border: 1px solid #2A2A2A !important;
                    }
                    
                    .subscription-section button {
                        position: static !important;
                        width: 100% !important;
                        margin: 12px 0 0 0 !important;
                        border-radius: 8px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .subscription-section {
                        padding: 20px !important;
                    }
                    
                    .subscription-section h3 {
                        font-size: 20px !important;
                        width: 100% !important;
                    }
                    
                    .subscription-section p {
                        width: 100% !important;
                        font-size: 14px !important;
                    }
                }
            `}</style>
        </div>
    )
} 