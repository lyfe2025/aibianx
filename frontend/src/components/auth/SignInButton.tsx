/**
 * NextAuth登录按钮组件
 * 支持GitHub OAuth和邮箱登录
 */

'use client'

import { signIn } from 'next-auth/react'
import { GradientButton, Icon } from '@/components/ui'
import { useState } from 'react'

interface SignInButtonProps {
    provider?: 'github' | 'email'
    email?: string
    className?: string
    children?: React.ReactNode
    onClick?: () => void
}

export function SignInButton({
    provider = 'github',
    email,
    className,
    children,
    onClick
}: SignInButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSignIn = async () => {
        if (onClick) {
            onClick()
            return
        }

        setIsLoading(true)
        try {
            if (provider === 'github') {
                await signIn('github', { callbackUrl: '/' })
            } else if (provider === 'email' && email) {
                await signIn('email', { email, callbackUrl: '/' })
            }
        } catch (error) {
            console.error('登录失败:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (provider === 'github') {
        return (
            <GradientButton
                variant="primary"
                size="md"
                onClick={handleSignIn}
                isLoading={isLoading}
                className={className}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    width: '100%'
                }}
            >
                <Icon name="github" size="sm" />
                {children || '使用GitHub登录'}
            </GradientButton>
        )
    }

    return (
        <GradientButton
            variant="primary"
            size="md"
            onClick={handleSignIn}
            isLoading={isLoading}
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                width: '100%'
            }}
        >
            <Icon name="modals/email-username-icon" size="sm" />
            {children || '使用邮箱登录'}
        </GradientButton>
    )
}