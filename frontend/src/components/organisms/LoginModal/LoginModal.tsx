'use client'

import { BaseModal } from '@/components/ui/Modal'
import { LoginForm } from '@/components/molecules'
import { GradientButton, Icon } from '@/components/ui'
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

    // OAuth登录处理函数
    const handleOAuthLogin = async (provider: string) => {
        try {
            const result = await signIn(provider, {
                callbackUrl: '/',
                redirect: false
            })

            if (result?.ok) {
                closeModal()
            }
        } catch (error) {
            console.error(`${provider}登录失败:`, error)
            alert(`${provider}登录失败，请稍后重试`)
        }
    }

    // 获取OAuth按钮配置
    const getOAuthButtons = () => {
        const buttons = []

        if (isGitHubEnabled) {
            buttons.push({
                provider: 'github',
                label: '使用 GitHub 快速登录',
                icon: 'github'
            })
        }

        if (isGoogleEnabled) {
            buttons.push({
                provider: 'google',
                label: '使用 Google 快速登录',
                icon: 'google'
            })
        }

        if (isWeChatEnabled) {
            buttons.push({
                provider: 'wechat',
                label: '使用微信快速登录',
                icon: 'wechat'
            })
        }

        if (isQQEnabled) {
            buttons.push({
                provider: 'qq',
                label: '使用 QQ 快速登录',
                icon: 'qq'
            })
        }

        return buttons
    }

    const oauthButtons = getOAuthButtons()
    const hasOAuthOptions = isOAuthEnabled && oauthButtons.length > 0

    const isThisModalOpen = isOpen && type === 'login'

    return (
        <BaseModal
            isOpen={isThisModalOpen}
            onClose={closeModal}
            title="登录 AI变现之路"
            subtitle="输入您的邮箱和密码进行登录"
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)'
            }}>
                {/* 动态OAuth登录选项 */}
                {!oauthLoading && hasOAuthOptions && (
                    <>
                        {/* OAuth登录按钮列表 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-3)'
                        }}>
                            {oauthButtons.map((oauth) => (
                                <GradientButton
                                    key={oauth.provider}
                                    variant="outline"
                                    size="lg"
                                    onClick={() => handleOAuthLogin(oauth.provider)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 'var(--spacing-2)',
                                    }}
                                >
                                    <Icon name={oauth.icon} size="sm" />
                                    {oauth.label}
                                </GradientButton>
                            ))}
                        </div>

                        {/* 分割线 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)',
                            margin: 'var(--spacing-2) 0'
                        }}>
                            <div style={{
                                flex: 1,
                                height: '1px',
                                backgroundColor: 'var(--color-border-light)'
                            }} />
                            <span style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)',
                                padding: '0 var(--spacing-2)'
                            }}>
                                或使用邮箱登录
                            </span>
                            <div style={{
                                flex: 1,
                                height: '1px',
                                backgroundColor: 'var(--color-border-light)'
                            }} />
                        </div>
                    </>
                )}

                {/* 加载OAuth配置时的占位符 */}
                {oauthLoading && (
                    <div style={{
                        padding: 'var(--spacing-4)',
                        textAlign: 'center',
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-sm)'
                    }}>
                        正在加载登录选项...
                    </div>
                )}

                {/* 邮箱密码登录表单 */}
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            </div>
        </BaseModal>
    )
} 