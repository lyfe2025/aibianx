'use client'

import { BaseModal } from '@/components/ui/Modal'
import { RegisterForm, TermsContent, PrivacyContent } from '@/components/molecules'
import { useModalStore } from '@/stores'
import { useState } from 'react'

interface RegisterFormData {
    username: string
    email: string
    password: string
    confirmPassword: string
    agreeToTerms: boolean
}

type ModalContent = 'register' | 'terms' | 'privacy'

export function RegisterModal() {
    const { type, isOpen, closeModal } = useModalStore()
    const [currentContent, setCurrentContent] = useState<ModalContent>('register')

    const handleShowTerms = () => {
        setCurrentContent('terms')
    }

    const handleShowPrivacy = () => {
        setCurrentContent('privacy')
    }

    const handleBackToRegister = () => {
        setCurrentContent('register')
    }

    const handleModalClose = () => {
        setCurrentContent('register') // 重置内容状态
        closeModal()
    }

    const isThisModalOpen = isOpen && type === 'register'

    // 根据当前内容类型设置标题和副标题
    const getModalProps = () => {
        switch (currentContent) {
            case 'terms':
                return {
                    title: "用户协议",
                    subtitle: "请仔细阅读以下服务条款"
                }
            case 'privacy':
                return {
                    title: "隐私政策", 
                    subtitle: "了解我们如何保护您的个人信息"
                }
            default:
                return {
                    title: "注册 AI变现之路",
                    subtitle: "创建您的账号，开启AI赚钱新旅程"
                }
        }
    }

    const { title, subtitle } = getModalProps()

    // 根据当前内容类型渲染不同的内容
    const renderContent = () => {
        switch (currentContent) {
            case 'terms':
                return <TermsContent onBack={handleBackToRegister} />
            case 'privacy':
                return <PrivacyContent onBack={handleBackToRegister} />
            default:
                return (
                    <RegisterForm 
                        onShowTerms={handleShowTerms}
                        onShowPrivacy={handleShowPrivacy}
                    />
                )
        }
    }

    return (
        <BaseModal
            isOpen={isThisModalOpen}
            onClose={handleModalClose}
            title={title}
            subtitle={subtitle}
        >
            {renderContent()}
        </BaseModal>
    )
} 