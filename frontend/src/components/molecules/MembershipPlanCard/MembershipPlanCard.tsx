'use client'

import { GradientButton, Icon } from '@/components/ui'
import type { MembershipPlan, BillingCycle } from '@/lib/membership'
import { formatPrice, calculateDiscount } from '@/lib/membership'

interface MembershipPlanCardProps {
    plan: MembershipPlan
    billingCycle: BillingCycle
    selected: boolean
    onSelect: (planId: string) => void
    loading?: boolean
}

export function MembershipPlanCard({
    plan,
    billingCycle,
    selected,
    onSelect,
    loading = false,
}: MembershipPlanCardProps) {
    const currentPrice = plan.price[billingCycle]
    const originalPrice = plan.originalPrice?.[billingCycle]
    const discount = plan.originalPrice
        ? calculateDiscount(plan.price.monthly, plan.price.annually)
        : 0

    const handleSelect = () => {
        if (!loading) {
            onSelect(plan.id)
        }
    }

    return (
        <div
            className={`glass-card ${selected ? 'glass-card--active' : 'glass-card--hover'}`}
            style={{
                padding: 'var(--spacing-6)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
            }}
            onClick={handleSelect}
        >
            {/* 热门标签 */}
            {plan.popular && (
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--gradient-primary)',
                                            color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 600,
                    padding: '4px 16px',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--shadow-button)',
                }}>
                    {plan.badge}
                </div>
            )}

            {/* 选中状态指示器 */}
            {selected && (
                <div style={{
                    position: 'absolute',
                    top: 'var(--spacing-4)',
                    right: 'var(--spacing-4)',
                }}>
                    <Icon
                        name="payment-selected"
                        size="sm"
                        style={{ color: 'var(--color-primary-blue)' }}
                    />
                </div>
            )}

            {/* 套餐名称和描述 */}
            <div style={{ marginBottom: 'var(--spacing-5)' }}>
                <h3 style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-2)',
                }}>
                    {plan.name}
                </h3>
                <p style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.4',
                }}>
                    {plan.description}
                </p>
            </div>

            {/* 价格区域 */}
            <div style={{ marginBottom: 'var(--spacing-5)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-2)' }}>
                    <span style={{
                        fontSize: 'var(--font-size-5xl)',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                    }}>
                        {formatPrice(currentPrice)}
                    </span>
                    {currentPrice > 0 && (
                        <span style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-muted)',
                        }}>
                            / {billingCycle === 'monthly' ? '月' : '年'}
                        </span>
                    )}
                </div>

                {/* 原价和折扣 */}
                {originalPrice && originalPrice > currentPrice && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-1)' }}>
                        <span style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)',
                            textDecoration: 'line-through',
                        }}>
                            {formatPrice(originalPrice)}
                        </span>
                        {billingCycle === 'annually' && discount > 0 && (
                            <span style={{
                                fontSize: 'var(--font-size-xs)',
                                color: '#10B981',
                                background: 'rgba(16, 185, 129, 0.1)',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 500,
                            }}>
                                省{discount}%
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* 功能列表 */}
            <div style={{ marginBottom: 'var(--title-margin-bottom-md)' }}>
                <h4 style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-3)',
                }}>
                    包含功能：
                </h4>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-2)',
                }}>
                    {plan.features.map((feature, index) => (
                        <li
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 'var(--spacing-2)',
                            }}
                        >
                            <Icon
                                name="membership-check"
                                size="xs"
                                style={{
                                    color: '#10B981',
                                    marginTop: '2px',
                                    flexShrink: 0,
                                }}
                            />
                            <span style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                lineHeight: '1.4',
                            }}>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 选择按钮 */}
            <GradientButton
                size="md"
                variant={selected ? 'primary' : 'outline'}
                fullWidth
                disabled={loading}
                onClick={(e) => {
                    e.stopPropagation()
                    handleSelect()
                }}
            >
                {selected ? '已选择' : plan.id === 'free' ? '当前方案' : '选择此方案'}
            </GradientButton>
        </div>
    )
} 