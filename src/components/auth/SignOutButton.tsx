/**
 * NextAuth登出按钮组件
 */

'use client'

import { signOut } from 'next-auth/react'
import { GradientButton } from '@/components/ui'
import { useState } from 'react'

interface SignOutButtonProps {
    className?: string
    children?: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
}

export function SignOutButton({
    className,
    children,
    variant = 'outline'
}: SignOutButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSignOut = async () => {
        setIsLoading(true)
        try {
            await signOut({ callbackUrl: '/' })
        } catch (error) {
            console.error('登出失败:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <GradientButton
            variant={variant}
            size="md"
            onClick={handleSignOut}
            isLoading={isLoading}
            className={className}
        >
            {children || '退出登录'}
        </GradientButton>
    )
}