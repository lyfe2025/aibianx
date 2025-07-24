'use client'

import React, { useState } from 'react'
import { BaseModal } from '@/components/ui/Modal/BaseModal'
import { GradientButton, Icon } from '@/components/ui'
import { CountdownTimer } from '@/components/molecules/CountdownTimer/CountdownTimer'
import { useCountdownStore } from '@/stores'
// PaymentMethodCard 已被内联实现，不再需要导入
interface PaymentMethod {
    id: string
    name: string
    icon: string
    color: string
}
import { useModalStore } from '@/stores'

// 支付方式配置
const PAYMENT_METHODS: PaymentMethod[] = [
    {
        id: 'alipay',
        name: '支付宝',
        icon: 'payments/alipay-icon',
        color: '#3B82F6'
    },
    {
        id: 'wechat',
        name: '微信支付',
        icon: 'payments/wechat-pay-icon',
        color: '#22C55E'
    },
    {
        id: 'unionpay',
        name: '银联支付',
        icon: 'payments/unionpay-icon',
        color: '#EF4444'
    }
]

// 默认会员信息
const DEFAULT_PLAN = {
    name: '年度会员',
    price: 299,
    originalPrice: 399,
    period: '年',
    features: [
        '200+ AI变现教程和指南',
        '每周更新实战案例',
        '专属社区和导师指导',
        'AI工具专属优惠'
    ]
}

export const PaymentModal: React.FC = () => {
    const { type, data, isOpen, closeModal } = useModalStore()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('alipay')
    const [isLoading, setIsLoading] = useState(false)

    const isThisModalOpen = isOpen && type === 'payment'

    // 获取计划信息，优先使用传入的数据，否则使用默认值
    const plan = data.payment?.plan || DEFAULT_PLAN

    // 使用全局倒计时状态
    const { targetDate } = useCountdownStore()

    const handlePaymentMethodSelect = (methodId: string) => {
        setSelectedPaymentMethod(methodId)
    }

    const handlePayment = async () => {
        setIsLoading(true)

        try {
            // TODO: 实现支付逻辑
            console.log('支付信息:', {
                plan,
                paymentMethod: selectedPaymentMethod,
                amount: plan.price
            })

            // 模拟支付处理
            await new Promise(resolve => setTimeout(resolve, 2000))

            // 支付成功后关闭弹窗
            closeModal()
            alert('支付成功！')
        } catch (error) {
            console.error('支付失败:', error)
            alert('支付失败，请稍后重试')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <BaseModal
            isOpen={isThisModalOpen}
            onClose={closeModal}
            title="开通会员"
            subtitle="立即享受AI变现资源和专业指导"
            maxWidth="md"
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}>
                {/* 价格和优惠信息区域 - 紧凑布局 */}
                <div style={{
                    background: 'rgba(59, 130, 246, 0.05)',
                    border: '1px dashed var(--color-primary-blue)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px'
                    }}>
                        <span style={{
                            background: 'var(--gradient-primary)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '32px',
                            fontWeight: '700',
                            lineHeight: '1'
                        }}>
                            ¥{plan.price}
                        </span>
                        <span style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '14px'
                        }}>
                            /{plan.period}
                        </span>
                        {plan.originalPrice && (
                            <span style={{
                                color: 'var(--color-text-disabled)',
                                fontSize: '14px',
                                textDecoration: 'line-through'
                            }}>
                                ¥{plan.originalPrice}
                            </span>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        {plan.originalPrice && (
                            <div style={{
                                background: '#EF4444',
                                borderRadius: '12px',
                                padding: '2px 8px'
                            }}>
                                <span style={{
                                    color: '#FFFFFF',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>
                                    7.5折
                                </span>
                            </div>
                        )}
                        <CountdownTimer />
                    </div>
                </div>

                {/* 会员特权 - 网格布局，更紧凑 */}
                <div>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: '0 0 12px 0'
                    }}>
                        会员特权
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px'
                    }}>
                        {plan.features.map((feature, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px'
                            }}>
                                <Icon
                                    name="modals/member-check-icon"
                                    size="sm"
                                    style={{ color: 'var(--color-primary-blue)', flexShrink: 0 }}
                                />
                                <span style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '14px',
                                    lineHeight: '20px'
                                }}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 支付方式 - 水平排列 */}
                <div>
                    <h3 style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '14px',
                        margin: '0 0 8px 0'
                    }}>
                        选择支付方式
                    </h3>

                    <div style={{
                        display: 'flex',
                        gap: '8px'
                    }}>
                        {PAYMENT_METHODS.map((method) => (
                            <div
                                key={method.id}
                                onClick={() => handlePaymentMethodSelect(method.id)}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: `2px solid ${selectedPaymentMethod === method.id ? 'var(--color-primary-blue)' : 'var(--color-border-primary)'}`,
                                    borderRadius: '8px',
                                    background: selectedPaymentMethod === method.id ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                <Icon name={method.icon} size="sm" />
                                <span style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '12px',
                                    textAlign: 'center'
                                }}>
                                    {method.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 支付按钮 */}
                <GradientButton
                    size="lg"
                    fullWidth
                    disabled={isLoading}
                    onClick={handlePayment}
                    style={{
                        marginTop: '8px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '600'
                    }}
                >
                    {isLoading ? '支付中...' : `立即支付 ¥${plan.price}`}
                </GradientButton>

                {/* 底部帮助信息 - 精简版 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    marginTop: '8px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--color-border-primary)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                    }}>
                        <Icon name="modals/help-icon" size="xs" style={{
                            color: 'var(--color-text-muted)'
                        }} />
                        <span style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '12px'
                        }}>
                            支付帮助
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <Icon name="modals/secure-payment" size="xs" style={{
                            color: 'var(--color-text-disabled)'
                        }} />
                        <span style={{
                            color: 'var(--color-text-disabled)',
                            fontSize: '12px'
                        }}>
                            安全支付
                        </span>
                    </div>
                </div>
            </div>
        </BaseModal>
    )
} 