'use client'

import { BaseModal } from '@/components/ui/Modal'
import { ForgotPasswordForm } from '@/components/molecules'
import { useModalStore } from '@/stores'
import { useState } from 'react'

interface ForgotPasswordFormData {
    email: string
}

export function ForgotPasswordModal() {
    const { type, isOpen, closeModal } = useModalStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleForgotPassword = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)
        try {
            // TODO: 实现忘记密码API调用
            console.log('忘记密码请求:', data)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // 成功后可以关闭弹窗或显示成功状态
            alert('密码重置链接已发送到您的邮箱')
            closeModal()
        } catch (error) {
            console.error('忘记密码失败:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const isThisModalOpen = isOpen && type === 'forgotPassword'

    return (
        <BaseModal
            isOpen={isThisModalOpen}
            onClose={closeModal}
            title="找回密码"
            subtitle="输入您的邮箱地址，我们将发送密码重置链接给您"
        >
            <ForgotPasswordForm />
        </BaseModal>
    )
} 