'use client'

import React, { useState, useMemo } from 'react'
import { BaseModal } from '@/components/ui/Modal/BaseModal'
import { GradientButton, Icon } from '@/components/ui'
import { CountdownTimer } from '@/components/molecules/CountdownTimer/CountdownTimer'
import { PaymentMethodCard, PaymentMethod } from '@/components/molecules/PaymentMethodCard/PaymentMethodCard'
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

    // 计算限时优惠结束时间（3天后）
    const countdownTarget = useMemo(() => {
        const now = new Date()
        return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) // 3天后
    }, [])

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
            title="会员特权"
            subtitle="解锁全部AI变现资源和高级功能"
            maxWidth="sm"
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-6)'
            }}>
                {/* 价格区域 */}
                <div style={{
                    background: 'rgba(59, 130, 246, 0.05)',
                    border: '1px dashed var(--color-primary-blue)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '17px',
                    marginLeft: '6px',
                    width: '340px'
                }}>
                    {/* 价格信息 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 'var(--spacing-2)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-1)'
                        }}>
                            <span style={{
                                background: 'var(--gradient-primary)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: 'var(--font-size-4xl)',
                                fontWeight: '600',
                                lineHeight: '42px'
                            }}>
                                ¥{plan.price}
                            </span>
                            <span style={{
                                color: 'var(--color-text-muted)',
                                fontSize: 'var(--font-size-base)',
                                lineHeight: '20px',
                                marginTop: '11px'
                            }}>
                                /{plan.period}
                            </span>
                            {plan.originalPrice && (
                                <span style={{
                                    color: 'var(--color-text-disabled)',
                                    fontSize: 'var(--font-size-base)',
                                    textDecoration: 'line-through',
                                    lineHeight: '20px',
                                    marginTop: '11px',
                                    marginLeft: 'var(--spacing-2)'
                                }}>
                                    ¥{plan.originalPrice}
                                </span>
                            )}
                        </div>

                        {plan.originalPrice && (
                            <div style={{
                                background: '#EF4444',
                                borderRadius: 'var(--radius-full)',
                                padding: '2px 8px',
                                marginTop: '11px'
                            }}>
                                <span style={{
                                    color: '#FFFFFF',
                                    fontSize: 'var(--font-size-xs)',
                                    fontWeight: '500',
                                    lineHeight: '16px'
                                }}>
                                    7.5折
                                </span>
                            </div>
                        )}
                    </div>

                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: '20px',
                        margin: 0
                    }}>
                        会员特权包含所有AI变现资源和高级功能
                    </p>
                </div>

                {/* 会员特权列表 */}
                <div>
                    <h3 style={{
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: '500',
                        lineHeight: '24px',
                        margin: '0 0 var(--spacing-3) 6px'
                    }}>
                        会员特权
                    </h3>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-4)',
                        marginLeft: '6px'
                    }}>
                        {plan.features.map((feature, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-3)'
                            }}>
                                <Icon
                                    name="modals/member-check-icon"
                                    size="sm"
                                    style={{ color: 'var(--color-text-primary)' }}
                                />
                                <span style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: 'var(--font-size-lg)',
                                    lineHeight: '24px'
                                }}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 限时优惠倒计时 */}
                <div>
                    <h3 style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: '20px',
                        margin: '0 0 var(--spacing-2) 0'
                    }}>
                        限时优惠
                    </h3>

                    <CountdownTimer targetDate={countdownTarget} />
                </div>

                {/* 支付方式选择 */}
                <div>
                    <h3 style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: '20px',
                        margin: '0 0 var(--spacing-2) 0'
                    }}>
                        请选择支付方式
                    </h3>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-3)',
                        marginRight: '6px'
                    }}>
                        {PAYMENT_METHODS.map((method) => (
                            <PaymentMethodCard
                                key={method.id}
                                method={method}
                                isSelected={selectedPaymentMethod === method.id}
                                onSelect={handlePaymentMethodSelect}
                            />
                        ))}
                    </div>
                </div>

                {/* 支付按钮 */}
                <GradientButton
                    size="lg"
                    fullWidth
                    disabled={isLoading}
                    onClick={handlePayment}
                    style={{ marginRight: '6px' }}
                >
                    {isLoading ? '支付中...' : `确认支付 ¥${plan.price}`}
                </GradientButton>

                {/* 底部帮助信息 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--spacing-3)',
                    marginTop: 'var(--spacing-4)'
                }}>
                    {/* 帮助链接 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-1)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-1)',
                            cursor: 'pointer'
                        }}>
                            <Icon name="modals/help-icon" size="xs" style={{
                                color: 'var(--color-text-muted)'
                            }} />
                            <span style={{
                                color: 'var(--color-text-muted)',
                                fontSize: 'var(--font-size-base)',
                                lineHeight: '20px'
                            }}>
                                支付帮助
                            </span>
                        </div>

                        <Icon name="modals/divider-line" size="xs" style={{
                            color: 'var(--color-text-muted)',
                            margin: '0 var(--spacing-3)'
                        }} />

                        <span style={{
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: '20px',
                            cursor: 'pointer'
                        }}>
                            联系客服
                        </span>
                    </div>

                    {/* 安全提示 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-1)'
                    }}>
                        <Icon name="modals/secure-payment" size="xs" style={{
                            color: 'var(--color-text-disabled)'
                        }} />
                        <span style={{
                            color: 'var(--color-text-disabled)',
                            fontSize: 'var(--font-size-xs)',
                            lineHeight: '16px'
                        }}>
                            安全支付 全程加密
                        </span>
                    </div>
                </div>
            </div>
        </BaseModal>
    )
} 