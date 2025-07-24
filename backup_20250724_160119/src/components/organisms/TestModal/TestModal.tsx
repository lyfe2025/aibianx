'use client'

import { BaseModal } from '@/components/ui/Modal'
import { GradientButton } from '@/components/ui'
import { useModalStore } from '@/stores'

export function TestModal() {
    const { type, isOpen, closeModal } = useModalStore()

    const isThisModalOpen = isOpen && type === 'test'

    return (
        <BaseModal
            isOpen={isThisModalOpen}
            onClose={closeModal}
            title="测试弹窗"
            subtitle="这是一个用于测试的弹窗组件"
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-4) 0'
            }}>
                <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: '1.5'
                }}>
                    这是一个测试弹窗，用于验证弹窗系统的基本功能。
                </p>

                <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-3)',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={closeModal}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--color-border-primary)',
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--color-text-secondary)',
                            padding: '8px 16px',
                            fontSize: 'var(--font-size-sm)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        取消
                    </button>

                    <GradientButton
                        size="sm"
                        onClick={() => {
                            alert('测试按钮被点击！')
                            closeModal()
                        }}
                    >
                        确认
                    </GradientButton>
                </div>
            </div>
        </BaseModal>
    )
} 