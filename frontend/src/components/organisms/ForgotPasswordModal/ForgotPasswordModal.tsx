'use client'

import { useState } from 'react'
import { useModalStore } from '@/stores'
import { BaseModal } from '@/components/ui'
import { ForgotPasswordForm } from '@/components/molecules/ForgotPasswordForm/ForgotPasswordForm'
import type { ForgotPasswordFormData } from '@/lib/validations'

export function ForgotPasswordModal() {
    const { isOpen, modalType, closeModal, openModal, isModalOpen } = useModalStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleForgotPassword = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)

        try {
            // TODO: 实现真实的忘记密码逻辑
            console.log('忘记密码数据:', data)

            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1500))

            // TODO: 发送重置密码邮件
            console.log('重置密码邮件已发送')

        } catch (error) {
            console.error('发送重置密码邮件失败:', error)
            // TODO: 显示错误信息
        } finally {
            setIsLoading(false)
        }
    }

    const handleBackToLogin = () => {
        openModal('login')
    }

    return (
        <BaseModal
            isOpen={isModalOpen('forgot-password')}
            onClose={closeModal}
            title="重置密码"
            subtitle="输入您的邮箱地址，我们将发送重置密码的链接"
            maxWidth="md"
        >
            <ForgotPasswordForm
                onSubmit={handleForgotPassword}
                onBackToLogin={handleBackToLogin}
                isLoading={isLoading}
            />
        </BaseModal>
    )
} 