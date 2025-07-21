'use client'

import { useState } from 'react'
import { useModalStore } from '@/stores'
import { BaseModal, GradientButton, Icon } from '@/components/ui'
import { MembershipPlanCard } from '@/components/molecules/MembershipPlanCard/MembershipPlanCard'
import {
    membershipPlans,
    paymentMethods,
    getMembershipBenefits,
    type BillingCycle,
    type PaymentMethod
} from '@/lib/membership'

export function MembershipModal() {
    const { isOpen, modalType, closeModal, openModal, isModalOpen } = useModalStore()
    const [selectedPlan, setSelectedPlan] = useState('pro')
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('annually')
    const [selectedPayment, setSelectedPayment] = useState('wechat')
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState<'plan' | 'payment' | 'confirm'>('plan')

    const currentPlan = membershipPlans.find(plan => plan.id === selectedPlan)
    const currentPayment = paymentMethods.find(method => method.id === selectedPayment)
    const benefits = getMembershipBenefits()

    const handlePlanSelect = (planId: string) => {
        setSelectedPlan(planId)
        if (planId === 'free') {
            handleFreeSubscription()
        }
    }

    const handleFreeSubscription = async () => {
        setIsLoading(true)
        try {
            // TODO: 处理免费订阅逻辑
            console.log('选择免费版')
            await new Promise(resolve => setTimeout(resolve, 1000))
            closeModal()
        } catch (error) {
            console.error('订阅失败:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleContinue = () => {
        if (selectedPlan === 'free') {
            handleFreeSubscription()
        } else {
            setStep('payment')
        }
    }

    const handlePayment = async () => {
        setIsLoading(true)
        try {
            // TODO: 处理支付逻辑
            console.log('订阅计划:', {
                plan: selectedPlan,
                billingCycle,
                payment: selectedPayment,
                amount: currentPlan?.price[billingCycle]
            })

            await new Promise(resolve => setTimeout(resolve, 2000))

            setStep('confirm')

            // 3秒后关闭弹窗
            setTimeout(() => {
                closeModal()
                setStep('plan') // 重置状态
            }, 3000)

        } catch (error) {
            console.error('支付失败:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleBackToPlans = () => {
        setStep('plan')
    }

    const renderPlanSelection = () => (
        <>
            {/* 计费周期切换 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 'var(--spacing-6)'
            }}>
                <div style={{
                    background: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px',
                    display: 'flex',
                }}>
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        style={{
                            padding: '8px 20px',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: billingCycle === 'monthly' ? 'var(--gradient-primary)' : 'transparent',
                            color: 'white',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        按月付费
                    </button>
                    <button
                        onClick={() => setBillingCycle('annually')}
                        style={{
                            padding: '8px 20px',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: billingCycle === 'annually' ? 'var(--gradient-primary)' : 'transparent',
                            color: 'white',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                        }}
                    >
                        按年付费
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#10B981',
                            color: 'white',
                            fontSize: '10px',
                            padding: '2px 6px',
                            borderRadius: '8px',
                            fontWeight: 600,
                        }}>
                            省40%
                        </span>
                    </button>
                </div>
            </div>

            {/* 套餐卡片 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--spacing-4)',
                marginBottom: 'var(--spacing-6)',
            }}>
                {membershipPlans.map((plan) => (
                    <MembershipPlanCard
                        key={plan.id}
                        plan={plan}
                        billingCycle={billingCycle}
                        selected={selectedPlan === plan.id}
                        onSelect={handlePlanSelect}
                        loading={isLoading}
                    />
                ))}
            </div>

            {/* 继续按钮 */}
            {selectedPlan && selectedPlan !== 'free' && (
                <GradientButton
                    size="lg"
                    variant="primary"
                    fullWidth
                    onClick={handleContinue}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    继续订阅
                </GradientButton>
            )}
        </>
    )

    const renderPaymentSelection = () => (
        <>
            {/* 订单摘要 */}
            <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-4)',
                marginBottom: 'var(--spacing-6)',
            }}>
                <h4 style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-3)',
                }}>
                    订单摘要
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-1)',
                        }}>
                            {currentPlan?.name} - {billingCycle === 'monthly' ? '月费' : '年费'}
                        </div>
                        <div style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)',
                        }}>
                            {currentPlan?.description}
                        </div>
                    </div>
                    <div style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                    }}>
                        ¥{currentPlan?.price[billingCycle]}
                    </div>
                </div>
            </div>

            {/* 支付方式选择 */}
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <h4 style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-4)',
                }}>
                    选择支付方式
                </h4>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-3)',
                }}>
                    {paymentMethods.filter(method => method.enabled).map((method) => (
                        <div
                            key={method.id}
                            onClick={() => setSelectedPayment(method.id)}
                            style={{
                                padding: 'var(--spacing-4)',
                                border: selectedPayment === method.id
                                    ? '2px solid var(--color-primary-blue)'
                                    : '1px solid var(--color-border-primary)',
                                borderRadius: 'var(--radius-lg)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-3)',
                                transition: 'all 0.2s ease',
                                background: selectedPayment === method.id
                                    ? 'rgba(59, 130, 246, 0.05)'
                                    : 'transparent',
                            }}
                        >
                            <Icon name={method.icon} size="md" />
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: 'var(--font-size-base)',
                                    fontWeight: 500,
                                    color: 'var(--color-text-primary)',
                                    marginBottom: method.description ? 'var(--spacing-1)' : 0,
                                }}>
                                    {method.name}
                                </div>
                                {method.description && (
                                    <div style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-muted)',
                                    }}>
                                        {method.description}
                                    </div>
                                )}
                            </div>
                            {selectedPayment === method.id && (
                                <Icon
                                    name="payment-selected"
                                    size="sm"
                                    style={{ color: 'var(--color-primary-blue)' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 安全保障 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                marginBottom: 'var(--spacing-6)',
                padding: 'var(--spacing-3)',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: 'var(--radius-lg)',
            }}>
                <Icon
                    name="secure-payment"
                    size="sm"
                    style={{ color: '#10B981' }}
                />
                <span style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                }}>
                    安全支付保障 · 30天无理由退款
                </span>
            </div>

            {/* 操作按钮 */}
            <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                <GradientButton
                    size="lg"
                    variant="outline"
                    fullWidth
                    onClick={handleBackToPlans}
                    disabled={isLoading}
                >
                    返回
                </GradientButton>
                <GradientButton
                    size="lg"
                    variant="primary"
                    fullWidth
                    onClick={handlePayment}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    {isLoading ? '处理中...' : '立即支付'}
                </GradientButton>
            </div>
        </>
    )

    const renderConfirmation = () => (
        <div style={{ textAlign: 'center' }}>
            {/* 成功图标 */}
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <Icon
                    name="success-check"
                    size="xl"
                    style={{
                        color: '#10B981',
                        width: '64px',
                        height: '64px',
                        margin: '0 auto',
                    }}
                />
            </div>

            {/* 成功信息 */}
            <h3 style={{
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-3)',
            }}>
                订阅成功！
            </h3>

            <p style={{
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-6)',
                lineHeight: '1.5',
            }}>
                恭喜您成功订阅 {currentPlan?.name}，现在您可以享受所有专业功能。
                欢迎开始您的AI变现之旅！
            </p>

            {/* 下一步指引 */}
            <div style={{
                background: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-4)',
                marginBottom: 'var(--spacing-6)',
            }}>
                <h4 style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-2)',
                }}>
                    接下来您可以：
                </h4>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    textAlign: 'left',
                }}>
                    <li style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)',
                        marginBottom: 'var(--spacing-1)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                    }}>
                        <Icon name="membership-check" size="xs" style={{ color: '#10B981' }} />
                        探索完整的AI工具库
                    </li>
                    <li style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)',
                        marginBottom: 'var(--spacing-1)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                    }}>
                        <Icon name="membership-check" size="xs" style={{ color: '#10B981' }} />
                        查看独家变现案例
                    </li>
                    <li style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-2)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                    }}>
                        <Icon name="membership-check" size="xs" style={{ color: '#10B981' }} />
                        加入VIP专属社群
                    </li>
                </ul>
            </div>
        </div>
    )

    const getModalTitle = () => {
        switch (step) {
            case 'plan': return '选择订阅方案'
            case 'payment': return '完成支付'
            case 'confirm': return '订阅成功'
            default: return '会员升级'
        }
    }

    const getModalSubtitle = () => {
        switch (step) {
            case 'plan': return '选择最适合您的方案，立即解锁AI变现的无限可能'
            case 'payment': return '安全支付，享受专业级AI变现服务'
            case 'confirm': return '感谢您的信任，期待与您一起探索AI变现之路'
            default: return ''
        }
    }

    return (
        <BaseModal
            isOpen={isModalOpen('membership')}
            onClose={closeModal}
            title={getModalTitle()}
            subtitle={getModalSubtitle()}
            maxWidth="lg"
            showCloseButton={step !== 'confirm'}
        >
            {step === 'plan' && renderPlanSelection()}
            {step === 'payment' && renderPaymentSelection()}
            {step === 'confirm' && renderConfirmation()}
        </BaseModal>
    )
} 