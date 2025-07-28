'use client'

import { GradientText, GlassCard, Icon } from '@/components/ui'
import { MISSION_CARDS, ABOUT_CONTENT } from '@/constants/about'

interface MissionSectionProps {
    className?: string
}

/**
 * MissionSection 我们的使命组件
 * 
 * 功能特性：
 * - 展示三个核心使命卡片
 * - 分享知识、推动创新、构建社区
 * - 毛玻璃卡片设计
 * - 图标和描述展示
 * 
 * 从about/page.tsx中分离，符合单一职责原则
 */
export function MissionSection({ className }: MissionSectionProps) {
    return (
        <>
            {/* 我们的使命标题 */}
            <div className="about-mission-title-section">
                <GradientText
                    size="6xl"
                    weight="bold"
                    style={{
                        lineHeight: '57.6px'
                    }}
                >
                    {ABOUT_CONTENT.missionTitle}
                </GradientText>
            </div>

            {/* 三个使命卡片 */}
            <section className={`about-mission-section ${className || ''}`}>
                <div className="about-mission-cards-container">
                    {MISSION_CARDS.map((card) => (
                        <GlassCard key={card.id} variant="default" style={{
                            flex: 1,
                            padding: '34px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px'
                        }}>
                            <div style={{
                                background: card.backgroundColor,
                                borderRadius: '50%',
                                padding: '14px',
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '10px',
                                boxShadow: `0 4px 12px ${card.backgroundColor}`
                            }}>
                                <Icon
                                    name={card.icon}
                                    size="lg"
                                    style={{ color: card.color }}
                                />
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

                            <p style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '16px',
                                lineHeight: '25.6px',
                                margin: '0'
                            }}>
                                {card.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </section>
        </>
    )
} 