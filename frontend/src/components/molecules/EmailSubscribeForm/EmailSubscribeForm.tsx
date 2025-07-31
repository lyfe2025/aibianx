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
            // 调用新的邮件订阅API
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/email-subscription/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.trim(),
                    source: 'homepage',
                    tags: ['newsletter'] // 默认订阅新闻简报
                })
            })

            const result = await response.json()

            if (response.ok) {
                if (result.status === 'success') {
                    showSuccess('订阅成功！欢迎加入AI变现之路社区，欢迎邮件已发送至您的邮箱')
                } else if (result.status === 'existing') {
                    showSuccess('您已经订阅过了，感谢支持！')
                } else if (result.status === 'resubscribed') {
                    showSuccess('欢迎回来！您已重新订阅我们的邮件列表')
                }
                setEmail('') // 清空输入框
            } else {
                showError(result.message || HERO_CONTENT.errorMessage)
            }
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