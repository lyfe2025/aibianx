'use client'

import { BaseModal } from '@/components/ui/Modal'
import { LoginForm } from '@/components/molecules/LoginForm/LoginForm'
import { useModalStore } from '@/stores'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useOAuthAvailability } from '@/lib/hooks'
// 还原为弹窗内提示，不使用全局Toast

interface LoginFormData {
    emailOrUsername: string
    password: string
    rememberMe: boolean
}

export function LoginModal() {
    const { type, isOpen, closeModal } = useModalStore()
    const [isLoading, setIsLoading] = useState(false)
    // 不使用全局Toast
    const [isSuccess, setIsSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    // 获取OAuth配置
    const {
        isOAuthEnabled,
        isGitHubEnabled,
        isGoogleEnabled,
        isWeChatEnabled,
        isQQEnabled,
        isLoading: oauthLoading
    } = useOAuthAvailability()

    const [loginError, setLoginError] = useState<string>('')

    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true)
        setLoginError('') // 清除之前的错误
        
        try {
            // 使用NextAuth Credentials登录
            const result = await signIn('credentials', {
                email: data.emailOrUsername,
                password: data.password,
                redirect: false
            })

            if (result?.ok) {
                // 登录成功，显示与注册一致的毛玻璃风格提示
                setLoginError('')
                setIsSuccess(true)
                setSuccessMessage('🎉 登录成功！欢迎回来')
                setTimeout(() => {
                    setIsSuccess(false)
                    closeModal()
                }, 2000)
            } else {
                // 处理不同类型的登录错误
                let errorMessage = '登录失败，请检查邮箱和密码'
                
                if (result?.error) {
                    switch (result.error) {
                        case 'CredentialsSignin':
                            errorMessage = '用户名或密码错误，请检查后重试'
                            break
                        case 'AccessDenied':
                            errorMessage = '账户被禁用，请联系管理员'
                            break
                        case 'Configuration':
                            errorMessage = '登录服务配置错误，请稍后重试'
                            break
                        default:
                            errorMessage = `登录失败: ${result.error}`
                    }
                }
                
                setLoginError(errorMessage)
                console.error('❌ 登录失败:', result)
            }
        } catch (error) {
            console.error('❌ 登录过程中出错:', error)
            setLoginError('网络错误，请检查网络连接后重试')
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
                <>
                    {/* 登录成功提示 - 与注册一致的毛玻璃风格 */}
                    {isSuccess && (
                        <div style={{
                            padding: 'var(--spacing-4)',
                            marginBottom: 'var(--spacing-4)',
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: 'var(--radius-lg)',
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-success)',
                            textAlign: 'center',
                            fontWeight: '500',
                            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
                            animation: 'fadeInScale 0.5s ease-out',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                                animation: 'shimmer 2s ease-in-out infinite'
                            }} />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                {successMessage}
                                <div style={{
                                    marginTop: 'var(--spacing-2)',
                                    fontSize: 'var(--font-size-sm)',
                                    opacity: 0.8
                                }}>
                                    正在关闭...
                                </div>
                            </div>
                            <style jsx>{`
                                @keyframes fadeInScale {
                                    from { opacity: 0; transform: scale(0.9) translateY(10px); }
                                    to { opacity: 1; transform: scale(1) translateY(0); }
                                }
                                @keyframes shimmer {
                                    0% { transform: translateX(-100%); }
                                    100% { transform: translateX(100%); }
                                }
                            `}</style>
                        </div>
                    )}

                    {/* 显示登录错误 */}
                    {loginError && (
                        <div style={{
                            padding: 'var(--spacing-3)',
                            marginBottom: 'var(--spacing-4)',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: 'var(--border-radius-md)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-error)',
                            textAlign: 'center'
                        }}>
                            ⚠️ {loginError}
                        </div>
                    )}
                    
                    {/* 邮箱密码登录表单 - 所有OAuth登录都在底部显示 */}
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
                        onInputChange={() => setLoginError('')} // 用户输入时清除错误
                    />
                </>
            )}
        </BaseModal>
    )
} 