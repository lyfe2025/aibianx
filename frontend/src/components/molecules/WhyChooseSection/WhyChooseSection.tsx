'use client'

import { GradientText, GlassCard, Icon } from '@/components/ui'
import { WHY_CHOOSE_CARDS, ABOUT_CONTENT } from '@/constants/about'

interface WhyChooseSectionProps {
    className?: string
}

/**
 * WhyChooseSection 为什么选择我们组件
 * 
 * 功能特性：
 * - 展示选择理由卡片
 * - 实战经验、持续更新、专家指导、社区支持
 * - 毛玻璃卡片设计
 * - 图标和描述展示
 * 
 * 从about/page.tsx中分离，符合单一职责原则
 */
export function WhyChooseSection({ className }: WhyChooseSectionProps) {
    return (
        <section className={`about-why-choose-section ${className || ''}`}>
            <GradientText
                size="6xl"
                weight="bold"
                style={{
                    marginBottom: '46px',
                    lineHeight: '57.6px'
                }}
            >
                {ABOUT_CONTENT.whyChooseTitle}
            </GradientText>

            <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '18px',
                lineHeight: '28.8px',
                textAlign: 'center',
                marginBottom: '64px'
            }}>
                {ABOUT_CONTENT.whyChooseSubtitle}
            </p>

            <div className="about-why-choose-cards">
                <div className="about-why-choose-container">
                    {WHY_CHOOSE_CARDS.map((card) => (
                        <GlassCard key={card.id} variant="default" style={{
                            flex: 1,
                            padding: '34px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginTop: '23px'
                            }}>
                                <div style={{
                                    background: card.backgroundColor,
                                    borderRadius: '50%',
                                    padding: '8px',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 2px 8px ${card.backgroundColor}`
                                }}>
                                    <Icon name={card.icon} size="sm" style={{ color: card.color }} />
                                </div>
                                <h3 style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    lineHeight: '38.4px',
                                    margin: '0'
                                }}>
                                    {card.title}
                                </h3>
                            </div>

                            <p style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '16px',
                                lineHeight: '25.6px',
                                margin: '0',
                                textAlign: 'left'
                            }}>
                                {card.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    )
} 