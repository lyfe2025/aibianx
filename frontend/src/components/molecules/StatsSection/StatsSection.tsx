'use client'

import { Icon, GradientText } from '@/components/ui'

interface StatItem {
    icon: string
    value: string
    label: string
    description?: string
}

interface StatsSectionProps {
    title?: string
    subtitle?: string
    stats: StatItem[]
    className?: string
}

export function StatsSection({
    title = "平台数据",
    subtitle = "用数据说话，见证AI变现之路的成长",
    stats,
    className = ''
}: StatsSectionProps) {
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

            {/* 统计数据网格 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-6)',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="glass-card glass-card--hover"
                        style={{
                            padding: 'var(--spacing-6)',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* 背景装饰 */}
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            right: '-50%',
                            width: '100px',
                            height: '100px',
                            background: 'var(--gradient-primary)',
                            borderRadius: '50%',
                            opacity: 0.1,
                            filter: 'blur(30px)'
                        }} />

                        {/* 图标 */}
                        <div style={{
                            position: 'relative',
                            marginBottom: 'var(--title-margin-bottom-md)'
                        }}>
                            <Icon
                                name={stat.icon}
                                size="lg"
                                style={{
                                    color: 'var(--color-primary-blue)',
                                    filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))'
                                }}
                            />
                        </div>

                        {/* 数值 */}
                        <div style={{
                            fontSize: 'var(--font-size-8xl)',
                            fontWeight: '800',
                            background: 'var(--gradient-primary)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: 'var(--spacing-2)',
                            lineHeight: '1'
                        }}>
                            {stat.value}
                        </div>

                        {/* 标签 */}
                        <h3 style={{
                            fontSize: 'var(--font-size-2xl)',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)',
                            marginBottom: stat.description ? 'var(--spacing-2)' : '0'
                        }}>
                            {stat.label}
                        </h3>

                        {/* 描述 */}
                        {stat.description && (
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.5'
                            }}>
                                {stat.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
} 