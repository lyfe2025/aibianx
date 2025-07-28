'use client'

import { Icon } from '@/components/ui'
import { WHY_CHOOSE_FEATURES, MAIN_CONTENT_TEXT } from '@/constants/mainContent'

interface WhyChooseCardProps {
    className?: string
}

/**
 * WhyChooseCard 为什么选择我们卡片组件
 * 
 * 功能特性：
 * - 展示选择理由特性列表
 * - 图标和描述展示
 * - 毛玻璃卡片设计
 * 
 * 从MainContentSection中分离，符合单一职责原则
 */
export function WhyChooseCard({ className }: WhyChooseCardProps) {
    return (
        <div className={`why-choose-us ${className || ''}`} style={{
            background: 'var(--color-bg-secondary)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '32px'
        }}>
            <h3 style={{
                color: 'var(--color-text-primary)',
                fontSize: '20px',
                fontWeight: '700',
                lineHeight: '30px',
                margin: 0,
                marginTop: '36px',
                marginBottom: '24px',
                paddingLeft: '36px',
                width: '200px',
                whiteSpace: 'nowrap'
            }}>
                {MAIN_CONTENT_TEXT.whyChooseTitle}
            </h3>

            {/* 优势列表 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                paddingBottom: '36px'
            }}>
                {WHY_CHOOSE_FEATURES.map((feature) => (
                    <div key={feature.id} style={{
                        display: 'flex',
                        paddingLeft: '36px'
                    }}>
                        <Icon name={feature.icon} style={{
                            color: feature.iconColor,
                            width: '24px',
                            height: feature.id === 'high-quality-content' ? '34px'
                                : feature.id === 'practical-experience' ? '32px'
                                    : '29px',
                            marginTop: '8px',
                            marginRight: '16px'
                        }} />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: feature.id === 'high-quality-content' ? '290.21px'
                                : feature.id === 'practical-experience' ? '290px'
                                    : '275px'
                        }}>
                            <div style={{
                                color: 'var(--color-text-primary)',
                                fontSize: '16px',
                                lineHeight: '24px',
                                width: feature.id === 'high-quality-content' ? '120px' : '100px',
                                marginBottom: '5px',
                                whiteSpace: 'nowrap'
                            }}>
                                {feature.title}
                            </div>
                            <div style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '14px',
                                lineHeight: '21px',
                                minHeight: feature.id === 'high-quality-content' ? '42px' : '21px'
                            }}>
                                {feature.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 