'use client'

import { GradientText, GlassCard, AnimatedNumber } from '@/components/ui'
import { PLATFORM_STATS, ABOUT_CONTENT } from '@/constants/about'

interface StatsSectionProps {
    className?: string
}

/**
 * StatsSection 平台数据统计组件
 * 
 * 功能特性：
 * - 平台统计数据展示
 * - 数字动画效果
 * - 响应式布局
 * - 毛玻璃卡片设计
 * 
 * 从about/page.tsx中分离，符合单一职责原则
 */
export function StatsSection({ className }: StatsSectionProps) {
    return (
        <section className={`about-stats-section ${className || ''}`}>
            <GradientText
                size="6xl"
                weight="bold"
                style={{
                    marginBottom: '0px',
                    lineHeight: '57.6px'
                }}
            >
                {ABOUT_CONTENT.statsTitle}
            </GradientText>

            <div className="about-stats-cards">
                <div className="about-stats-container">
                    {PLATFORM_STATS.map((stat, index) => (
                        <GlassCard key={index} variant="default" style={{
                            flex: 1,
                            padding: '27px 75px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '9px',
                            alignItems: 'center'
                        }}>
                            <AnimatedNumber
                                value={stat.value}
                                duration={2000}
                                delay={index * 200}
                                size="7xl"
                                weight="bold"
                                style={{
                                    lineHeight: '76.8px'
                                }}
                            />

                            <span style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '16px',
                                lineHeight: '25.6px'
                            }}>
                                {stat.label}
                            </span>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    )
} 