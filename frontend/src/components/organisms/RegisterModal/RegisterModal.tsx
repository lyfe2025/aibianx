'use client'

import { useState } from 'react'
import { useModalStore } from '@/stores'
import { BaseModal } from '@/components/ui'
import { RegisterForm } from '@/components/molecules/RegisterForm/RegisterForm'
import type { RegisterFormData } from '@/lib/validations'

export function RegisterModal() {
    const { isOpen, modalType, closeModal, openModal, isModalOpen } = useModalStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (data: RegisterFormData) => {
        setIsLoading(true)

        try {
            // TODO: 实现真实的注册逻辑
            console.log('注册数据:', data)

            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 2000))

            // 注册成功，关闭弹窗
            closeModal()

            // TODO: 显示成功消息，自动登录等
            console.log('注册成功')

        } catch (error) {
            console.error('注册失败:', error)
            // TODO: 显示错误信息
        } finally {
            setIsLoading(false)
        }
    }

    const handleSwitchToLogin = () => {
        openModal('login')
    }

    return (
        <BaseModal
            isOpen={isModalOpen('register')}
            onClose={closeModal}
            title="创建账号"
            subtitle="加入AI变现之路，开启您的AI变现旅程"
            maxWidth="md"
        >
            <RegisterForm
                onSubmit={handleRegister}
                onSwitchToLogin={handleSwitchToLogin}
                isLoading={isLoading}
            />
        </BaseModal>
    )
} 