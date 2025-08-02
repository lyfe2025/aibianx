'use client'

import { BaseModal } from '@/components/ui/Modal'
import { LoginForm } from '@/components/molecules/LoginForm/LoginForm'
import { useModalStore } from '@/stores'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useOAuthAvailability } from '@/lib/hooks'

interface LoginFormData {
    emailOrUsername: string
    password: string
    rememberMe: boolean
}

export function LoginModal() {
    const { type, isOpen, closeModal } = useModalStore()
    const [isLoading, setIsLoading] = useState(false)

    // 获取OAuth配置
    const {
        isOAuthEnabled,
        isGitHubEnabled,
        isGoogleEnabled,
        isWeChatEnabled,
        isQQEnabled,
        isLoading: oauthLoading
    } = useOAuthAvailability()

    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true)
        try {
            // 使用NextAuth Credentials登录
            const result = await signIn('credentials', {
                email: data.emailOrUsername,
                password: data.password,
                redirect: false
            })

            if (result?.ok) {
                // 登录成功，关闭弹窗
                closeModal()
            } else {
                throw new Error(result?.error || '登录失败')
            }
        } catch (error) {
            console.error('登录失败:', error)
            alert('登录失败，请检查邮箱和密码')
        } finally {
            setIsLoading(false)
        }
    }

    const isThisModalOpen = isOpen && type === 'login'

    return (
        <BaseModal
            isOpen={isThisModalOpen}
            onClose={closeModal}
            title="登录 AI变现之路"
            subtitle="输入账号密码，继续您的AI之旅"
        >
            {/* 加载OAuth配置时的占位符 */}
            {oauthLoading ? (
                <div style={{
                    padding: 'var(--spacing-4)',
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-sm)'
                }}>
                    正在加载登录选项...
                </div>
            ) : (
                /* 邮箱密码登录表单 - 所有OAuth登录都在底部显示 */
                <LoginForm 
                    onSubmit={handleLogin} 
                    isLoading={isLoading} 
                    showOAuth={true} 
                    oauthConfig={{
                        isOAuthEnabled,
                        isGitHubEnabled,
                        isGoogleEnabled,
                        isWeChatEnabled,
                        isQQEnabled
                    }}
                />
            )}
        </BaseModal>
    )
} 