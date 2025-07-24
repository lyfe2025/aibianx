'use client'

import { Icon, GradientText } from '@/components/ui'

interface MissionItem {
    icon: string
    title: string
    description: string
    highlight?: string
}

interface MissionSectionProps {
    title?: string
    subtitle?: string
    missions: MissionItem[]
    className?: string
}

export function MissionSection({
    title = "我们的使命",
    subtitle = "致力于让每个人都能掌握AI变现技能",
    missions,
    className = ''
}: MissionSectionProps) {
    return (
        <section className={className} style={{
            padding: 'var(--page-padding-top-md) 0 var(--page-padding-bottom-md)',
            textAlign: 'center'
        }}>
            {/* 标题区域 */}
            <div style={{
                marginBottom: 'var(--section-spacing-md)'
            }}>
                <GradientText
                    as="h2"
                    size="7xl"
                    weight="bold"
                    style={{
                        marginBottom: 'var(--title-margin-bottom-md)'
                    }}
                >
                    {title}
                </GradientText>
                <p style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontFamily: 'var(--font-family-primary)',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: '1.5'
                }}>
                    {subtitle}
                </p>
            </div>

            {/* 使命卡片网格 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--spacing-8)',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {missions.map((mission, index) => (
                    <div
                        key={index}
                        className="glass-card glass-card--hover"
                        style={{
                            padding: 'var(--spacing-8)',
                            textAlign: 'center',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* 图标 */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto var(--spacing-6)',
                            background: 'var(--gradient-primary)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
                        }}>
                            <Icon name={mission.icon} size="xl" style={{ color: '#FFFFFF' }} />
                        </div>

                        {/* 标题 */}
                        <h3 style={{
                            fontSize: 'var(--font-size-3xl)',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--title-margin-bottom-md)'
                        }}>
                            {mission.title}
                        </h3>

                        {/* 描述 */}
                        <p style={{
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.6',
                            marginBottom: mission.highlight ? 'var(--spacing-4)' : '0'
                        }}>
                            {mission.description}
                        </p>

                        {/* 突出显示文字 */}
                        {mission.highlight && (
                            <div style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: 'var(--color-primary-blue)',
                                padding: 'var(--spacing-3) var(--spacing-4)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: 'var(--font-size-base)',
                                fontWeight: '600',
                                border: '1px solid rgba(59, 130, 246, 0.3)'
                            }}>
                                {mission.highlight}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
} 