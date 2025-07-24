'use client'

import { useState } from 'react'
import { BaseModal } from '@/components/ui/Modal'
import { GradientButton, Icon } from '@/components/ui'
import { useModalStore } from '@/stores'

interface Plan {
    id: string
    name: string
    price: number
    originalPrice?: number
    period: string
    features: string[]
    popular?: boolean
}

export function MembershipModal() {
    const { type, isOpen, closeModal, openModal } = useModalStore()
    const [selectedPlan, setSelectedPlan] = useState<string>('annual')
    const [isLoading, setIsLoading] = useState(false)

    const plans: Plan[] = [
        {
            id: 'monthly',
            name: '月度会员',
            price: 29,
            period: '月',
            features: [
                '所有付费内容访问权限',
                '会员专属AI工具',
                '每周专家在线答疑',
                '优先客服支持'
            ]
        },
        {
            id: 'annual',
            name: '年度会员',
            price: 299,
            originalPrice: 399,
            period: '年',
            popular: true,
            features: [
                '200+ AI变现教程和指南',
                '每周更新实战案例',
                '专属社区和导师指导',
                'AI工具专属优惠'
            ]
        }
    ]

    const handleSubscribe = async () => {
        const selectedPlanData = plans.find(p => p.id === selectedPlan)
        if (!selectedPlanData) return
        
        // 直接打开支付弹窗，传递选中的计划信息
        openModal('payment', {
            payment: { plan: selectedPlanData }
        })
    }

    const isThisModalOpen = isOpen && type === 'membership'

    return (
        <BaseModal
            isOpen={isThisModalOpen}
            onClose={closeModal}
            title="会员特权"
            subtitle="解锁全部AI变现资源和高级功能"
            maxWidth="lg"
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-6)'
            }}>
                {/* 会员计划选择 */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--spacing-4)'
                }}>
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            style={{
                                padding: 'var(--spacing-5)',
                                background: selectedPlan === plan.id
                                    ? 'rgba(59, 130, 246, 0.1)'
                                    : 'var(--color-bg-secondary)',
                                border: `2px solid ${selectedPlan === plan.id
                                    ? 'var(--color-primary-blue)'
                                    : 'var(--color-border-primary)'}`,
                                borderRadius: 'var(--radius-lg)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative'
                            }}
                        >
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'var(--gradient-primary)',
                                    color: '#FFFFFF',
                                    padding: '4px 12px',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: 'var(--font-size-xs)',
                                    fontWeight: '600'
                                }}>
                                    推荐
                                </div>
                            )}

                            <div style={{
                                textAlign: 'center',
                                marginBottom: 'var(--title-margin-bottom-md)'
                            }}>
                                <h3 style={{
                                    fontSize: 'var(--font-size-lg)',
                                    fontWeight: '600',
                                    color: 'var(--color-text-primary)',
                                    marginBottom: 'var(--spacing-2)'
                                }}>
                                    {plan.name}
                                </h3>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'center',
                                    gap: 'var(--spacing-2)'
                                }}>
                                    <span style={{
                                        fontSize: 'var(--font-size-3xl)',
                                        fontWeight: '700',
                                        color: 'var(--color-text-primary)'
                                    }}>
                                        ¥{plan.price}
                                    </span>
                                    <span style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-muted)'
                                    }}>
                                        /{plan.period}
                                    </span>
                                </div>

                                {plan.originalPrice && (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-2)',
                                        marginTop: 'var(--spacing-1)'
                                    }}>
                                        <span style={{
                                            fontSize: 'var(--font-size-sm)',
                                            color: 'var(--color-text-muted)',
                                            textDecoration: 'line-through'
                                        }}>
                                            ¥{plan.originalPrice}
                                        </span>
                                        <span style={{
                                            background: '#EF4444',
                                            color: '#FFFFFF',
                                            fontSize: 'var(--font-size-xs)',
                                            fontWeight: '500',
                                            padding: '2px 8px',
                                            borderRadius: 'var(--radius-full)'
                                        }}>
                                            7.5折
                                        </span>
                                    </div>
                                )}
                            </div>

                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-2)'
                            }}>
                                {plan.features.map((feature, index) => (
                                    <li key={index} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 'var(--spacing-2)',
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-secondary)'
                                    }}>
                                        <Icon
                                            name="success-check"
                                            size="xs"
                                            style={{
                                                color: 'var(--color-primary-blue)',
                                                marginTop: '2px'
                                            }}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 订阅按钮 */}
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
                            padding: '12px 24px',
                            fontSize: 'var(--font-size-base)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        取消
                    </button>

                    <GradientButton
                        size="md"
                        onClick={handleSubscribe}
                    >
                        立即升级会员
                    </GradientButton>
                </div>
            </div>
        </BaseModal>
    )
} 