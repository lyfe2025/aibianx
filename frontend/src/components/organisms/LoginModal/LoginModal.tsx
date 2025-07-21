'use client'

import { useState } from 'react'
import { useModalStore } from '@/stores'
import { BaseModal } from '@/components/ui'
import { LoginForm } from '@/components/molecules/LoginForm/LoginForm'
import type { LoginFormData } from '@/lib/validations'

export function LoginModal() {
    const { isOpen, modalType, closeModal, openModal, isModalOpen } = useModalStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true)

        try {
            // TODO: 实现真实的登录逻辑
            console.log('登录数据:', data)

            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1500))

            // 登录成功，关闭弹窗
            closeModal()

            // TODO: 更新用户状态，跳转等
            console.log('登录成功')

        } catch (error) {
            console.error('登录失败:', error)
            // TODO: 显示错误信息
        } finally {
            setIsLoading(false)
        }
    }

    const handleSwitchToRegister = () => {
        openModal('register')
    }

    const handleForgotPassword = () => {
        openModal('forgot-password')
    }

    return (
        <BaseModal
            isOpen={isModalOpen('login')}
            onClose={closeModal}
            title="欢迎回来"
            subtitle="登录您的账号，继续AI变现之路"
            maxWidth="md"
        >
            <LoginForm
                onSubmit={handleLogin}
                onSwitchToRegister={handleSwitchToRegister}
                onForgotPassword={handleForgotPassword}
                isLoading={isLoading}
            />
        </BaseModal>
    )
} 