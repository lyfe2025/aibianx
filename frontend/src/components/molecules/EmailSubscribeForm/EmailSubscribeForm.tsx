'use client'

import { useState } from 'react'
import { useToast } from '@/components/ui'
import { HERO_CONTENT, HERO_STYLES, EMAIL_REGEX } from '@/constants/heroSection'

interface EmailSubscribeFormProps {
    className?: string
}

/**
 * 邮箱订阅表单组件
 * 
 * 功能特性：
 * - 邮箱验证
 * - 提交状态管理
 * - Toast提示
 * - 响应式设计
 * 
 * 从HeroSectionNew中分离，符合单一职责原则
 */
export function EmailSubscribeForm({ className }: EmailSubscribeFormProps) {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const { showSuccess, showError } = useToast()

    const handleSubscribe = async () => {
        if (isSubmitting) return

        // 验证邮箱格式
        if (!email.trim()) {
            showError(HERO_CONTENT.invalidEmailMessage)
            return
        }

        if (!EMAIL_REGEX.test(email)) {
            showError(HERO_CONTENT.invalidEmailMessage)
            return
        }

        setIsSubmitting(true)

        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 2000))

            showSuccess(HERO_CONTENT.successMessage)
            setEmail('') // 清空输入框
        } catch (error) {
            console.error('订阅失败:', error)
            showError(HERO_CONTENT.errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubscribe()
        }
    }

    return (
        <div
            className={`hero-email-form ${className || ''}`}
            style={HERO_STYLES.formContainer}
        >
            {/* 邮箱输入框 */}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyPress={handleKeyPress}
                placeholder={HERO_CONTENT.emailPlaceholder}
                disabled={isSubmitting}
                className="hero-email-input hero-email-input-field"
                style={{
                    ...HERO_STYLES.emailInput,
                    borderColor: isFocused ? 'var(--color-border-active)' : 'var(--color-border-primary)',
                    opacity: isSubmitting ? 0.7 : 1
                }}
            />

            {/* 订阅按钮 */}
            <button
                onClick={handleSubscribe}
                disabled={isSubmitting}
                className="hero-subscribe-button"
                style={{
                    ...HERO_STYLES.subscribeButton,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
            >
                <div style={{
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    minHeight: '18px'
                }}>
                    {isSubmitting ? HERO_CONTENT.subscribingText : HERO_CONTENT.subscribeButton}
                </div>
            </button>
        </div>
    )
} 