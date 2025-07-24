'use client'

import React from 'react'
import { Icon } from '@/components/ui'

export interface PaymentMethod {
    id: string
    name: string
    icon: string
    color?: string
}

interface PaymentMethodCardProps {
    method: PaymentMethod
    isSelected?: boolean
    onSelect?: (methodId: string) => void
    className?: string
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
    method,
    isSelected = false,
    onSelect,
    className = ''
}) => {
    const handleClick = () => {
        onSelect?.(method.id)
    }

    return (
        <div
            className={`payment-method-card ${className}`}
            style={{
                background: 'rgba(18, 18, 18, 0.50)',
                border: `1px solid ${isSelected ? 'var(--color-border-active)' : 'var(--color-border-secondary)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%'
            }}
            onClick={handleClick}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-3)'
            }}>
                <Icon
                    name={method.icon}
                    size="md"
                    style={{
                        color: method.color || 'var(--color-text-primary)'
                    }}
                />
                <span style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-lg)',
                    lineHeight: '24px'
                }}>
                    {method.name}
                </span>
            </div>

            {isSelected && (
                <Icon
                    name="payments/payment-selected"
                    size="sm"
                    style={{ color: 'var(--color-primary-blue)' }}
                />
            )}
        </div>
    )
} 