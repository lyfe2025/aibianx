'use client'

import { BaseModal } from '@/components/ui/Modal'
import { RegisterForm } from '@/components/molecules'
import { useModalStore } from '@/stores'
import { useState } from 'react'

interface RegisterFormData {
    username: string
    email: string
    password: string
    confirmPassword: string
    agreeToTerms: boolean
}

export function RegisterModal() {
    const { type, isOpen, closeModal } = useModalStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (data: RegisterFormData) => {
        setIsLoading(true)
        try {
            // TODO: 实现注册API调用
            console.log('注册请求:', data)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // 注册成功，关闭弹窗
            closeModal()
        } catch (error) {
            console.error('注册失败:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const isThisModalOpen = isOpen && type === 'register'

    return (
        <BaseModal
            isOpen={isThisModalOpen}
            onClose={closeModal}
            title="创建账户"
            subtitle="加入AI变现之路，开启您的AI创业之旅"
        >
            <RegisterForm />
        </BaseModal>
    )
} 