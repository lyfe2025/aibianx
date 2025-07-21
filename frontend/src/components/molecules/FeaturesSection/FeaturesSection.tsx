'use client'

import { GradientButton, GradientText } from '@/components/ui'

interface Feature {
    icon: string
    title: string
    description: string
}

interface FeaturesSectionProps {
    title?: string
    subtitle?: string
    features: Feature[]
    className?: string
}

export function FeaturesSection({
    title = "核心特色",
    subtitle = "为什么选择AI变现之路",
    features,
    className = ''
}: FeaturesSectionProps) {
    return (
        <section className={className} style={{
            padding: '120px 0',
            position: 'relative'
        }}>
            {/* 背景装饰 */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '-10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none'
            }} />

            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 var(--spacing-8)',
                position: 'relative',
                zIndex: 1
            }}>
                {/* 标题区域 */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '80px'
                }}>
                    <GradientText
                        size="7xl"
                        weight="bold"
                        style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-6)'
                        }}
                    >
                        {title}
                    </GradientText>
                    <p style={{
                        fontSize: 'var(--font-size-2xl)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {subtitle}
                    </p>
                </div>

                {/* 特色功能网格 */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: 'var(--spacing-8)',
                    marginBottom: '80px'
                }}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card glass-card--hover"
                            style={{
                                padding: 'var(--spacing-8)',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* 卡片背景装饰 */}
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
                                width: '80px',
                                height: '80px',
                                margin: '0 auto var(--spacing-6)',
                                background: 'var(--gradient-primary)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: '#FFFFFF',
                                    borderRadius: '50%'
                                }} />
                            </div>

                            {/* 标题 */}
                            <h3 style={{
                                fontSize: 'var(--font-size-3xl)',
                                fontWeight: '700',
                                color: 'var(--color-text-primary)',
                                marginBottom: 'var(--spacing-4)',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                {feature.title}
                            </h3>

                            {/* 描述 */}
                            <p style={{
                                fontSize: 'var(--font-size-lg)',
                                color: 'var(--color-text-secondary)',
                                lineHeight: '1.6',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 行动召唤 */}
                <div style={{
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: 'var(--font-size-xl)',
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--spacing-6)',
                        lineHeight: '1.6'
                    }}>
                        准备好开始你的AI变现之旅了吗？立即加入我们，解锁更多专业内容和工具！
                    </p>
                    <GradientButton size="lg">
                        立即开始
                    </GradientButton>
                </div>
            </div>
        </section>
    )
} 