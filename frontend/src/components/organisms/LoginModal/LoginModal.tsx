'use client'

import { BaseModal } from '@/components/ui/Modal'
import { LoginForm } from '@/components/molecules'
import { useModalStore } from '@/stores'
import { useState } from 'react'

interface LoginFormData {
    emailOrUsername: string
    password: string
    rememberMe: boolean
}

export function LoginModal() {
    const { type, isOpen, closeModal } = useModalStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true)
        try {
            // TODO: 实现登录API调用
            console.log('登录请求:', data)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // 登录成功，关闭弹窗
            closeModal()
        } catch (error) {
            console.error('登录失败:', error)
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
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </BaseModal>
    )
} 