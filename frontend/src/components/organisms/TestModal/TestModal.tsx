'use client'

import { useModalStore } from '@/stores'
import { BaseModal } from '@/components/ui'
import { GradientButton } from '@/components/ui'

export function TestModal() {
    const { isOpen, modalType, closeModal, isModalOpen } = useModalStore()

    return (
        <BaseModal
            isOpen={isModalOpen('login')}
            onClose={closeModal}
            title="测试弹窗"
            subtitle="这是一个用于测试BaseModal组件的示例弹窗"
            maxWidth="md"
        >
            <div style={{ padding: '20px 0' }}>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                    弹窗组件功能验证：
                </p>

                <ul style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-sm)',
                    listStyle: 'none',
                    padding: 0
                }}>
                    <li style={{ marginBottom: '8px' }}>✅ 毛玻璃背景效果</li>
                    <li style={{ marginBottom: '8px' }}>✅ 点击遮罩关闭</li>
                    <li style={{ marginBottom: '8px' }}>✅ ESC键关闭</li>
                    <li style={{ marginBottom: '8px' }}>✅ 关闭按钮功能</li>
                    <li style={{ marginBottom: '8px' }}>✅ 进入/退出动画</li>
                    <li style={{ marginBottom: '8px' }}>✅ 响应式布局</li>
                </ul>

                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                    <GradientButton
                        onClick={closeModal}
                        size="md"
                        variant="primary"
                    >
                        确认
                    </GradientButton>

                    <GradientButton
                        onClick={closeModal}
                        size="md"
                        variant="outline"
                    >
                        取消
                    </GradientButton>
                </div>
            </div>
        </BaseModal>
    )
} 