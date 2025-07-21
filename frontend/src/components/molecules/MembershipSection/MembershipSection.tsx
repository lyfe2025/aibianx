'use client'

import { useState } from 'react'
import { GradientButton, Icon } from '@/components/ui'
import { useModalStore } from '@/stores'

interface MembershipFeature {
    icon: string
    title: string
    description: string
}

interface MembershipSectionProps {
    title?: string
    subtitle?: string
    features: MembershipFeature[]
    pricing?: {
        originalPrice: number
        currentPrice: number
        discount: string
        period: string
    }
    className?: string
}

export function MembershipSection({
    title = "会员特权",
    subtitle = "解锁全部内容，加速你的AI变现之路",
    features,
    pricing = {
        originalPrice: 399,
        currentPrice: 299,
        discount: "限时7.5折",
        period: "年"
    },
    className = ''
}: MembershipSectionProps) {
    const { openModal } = useModalStore()
    const [timeLeft, setTimeLeft] = useState({
        days: 7,
        hours: 12,
        minutes: 35,
        seconds: 42
    })

    // 模拟倒计时（实际项目中应该使用真实的倒计时逻辑）
    useState(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev

                if (seconds > 0) {
                    seconds--
                } else if (minutes > 0) {
                    minutes--
                    seconds = 59
                } else if (hours > 0) {
                    hours--
                    minutes = 59
                    seconds = 59
                } else if (days > 0) {
                    days--
                    hours = 23
                    minutes = 59
                    seconds = 59
                }

                return { days, hours, minutes, seconds }
            })
        }, 1000)

        return () => clearInterval(timer)
    })

    const handleUpgrade = () => {
        // 直接打开支付弹窗，传递默认的年度会员计划信息
        const defaultPlan = {
            name: '年度会员',
            price: pricing.currentPrice,
            originalPrice: pricing.originalPrice,
            period: pricing.period,
            features: [
                '200+ AI变现教程和指南',
                '每周更新实战案例',
                '专属社区和导师指导',
                'AI工具专属优惠'
            ]
        }
        
        openModal('payment', {
            payment: { plan: defaultPlan }
        })
    }

    return (
        <section className={className} style={{
            padding: '80px 0'
        }}>
            {/* 标题区域 */}
            <div style={{
                textAlign: 'center',
                marginBottom: '60px'
            }}>
                <h2 style={{
                    fontSize: 'var(--font-size-7xl)',
                    fontWeight: '700',
                    background: 'var(--gradient-primary)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: 'var(--spacing-4)'
                }}>
                    {title}
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-2xl)',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: '1.5'
                }}>
                    {subtitle}
                </p>
            </div>

            {/* 内容区域 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* 左侧：会员特权卡片 */}
                <div className="glass-card" style={{
                    padding: 'var(--spacing-8)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* 背景装饰 */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200px',
                        height: '200px',
                        background: 'var(--gradient-primary)',
                        borderRadius: '50%',
                        opacity: 0.1,
                        filter: 'blur(60px)'
                    }} />

                    {/* 折扣标签 */}
                    <div style={{
                        position: 'absolute',
                        top: 'var(--spacing-6)',
                        right: 'var(--spacing-6)',
                        background: '#FF6B35',
                        color: '#FFFFFF',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: '600'
                    }}>
                        {pricing.discount}
                    </div>

                    {/* 倒计时 */}
                    <div style={{
                        position: 'relative',
                        marginBottom: 'var(--spacing-6)'
                    }}>
                        <h3 style={{
                            fontSize: 'var(--font-size-3xl)',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-3)'
                        }}>
                            限时优惠
                        </h3>

                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-3)',
                            marginBottom: 'var(--spacing-4)'
                        }}>
                            {[
                                { value: timeLeft.days, label: '天' },
                                { value: timeLeft.hours, label: '时' },
                                { value: timeLeft.minutes, label: '分' },
                                { value: timeLeft.seconds, label: '秒' }
                            ].map((item, index) => (
                                <div key={index} style={{
                                    background: 'var(--color-bg-secondary)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: 'var(--spacing-3)',
                                    textAlign: 'center',
                                    minWidth: '60px'
                                }}>
                                    <div style={{
                                        fontSize: 'var(--font-size-2xl)',
                                        fontWeight: '700',
                                        color: 'var(--color-text-primary)'
                                    }}>
                                        {item.value.toString().padStart(2, '0')}
                                    </div>
                                    <div style={{
                                        fontSize: 'var(--font-size-xs)',
                                        color: 'var(--color-text-muted)'
                                    }}>
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 价格信息 */}
                    <div style={{
                        position: 'relative',
                        marginBottom: 'var(--spacing-6)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 'var(--spacing-3)',
                            marginBottom: 'var(--spacing-2)'
                        }}>
                            <span style={{
                                fontSize: 'var(--font-size-8xl)',
                                fontWeight: '800',
                                background: 'var(--gradient-primary)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                ¥{pricing.currentPrice}
                            </span>
                            <span style={{
                                fontSize: 'var(--font-size-2xl)',
                                color: 'var(--color-text-muted)'
                            }}>
                                /{pricing.period}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-2)'
                        }}>
                            <span style={{
                                fontSize: 'var(--font-size-lg)',
                                color: 'var(--color-text-muted)',
                                textDecoration: 'line-through'
                            }}>
                                原价 ¥{pricing.originalPrice}
                            </span>
                            <span style={{
                                fontSize: 'var(--font-size-sm)',
                                color: '#10B981',
                                background: 'rgba(16, 185, 129, 0.1)',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: '500'
                            }}>
                                省¥{pricing.originalPrice - pricing.currentPrice}
                            </span>
                        </div>
                    </div>

                    {/* 会员特权列表 */}
                    <div style={{
                        position: 'relative',
                        marginBottom: 'var(--spacing-6)'
                    }}>
                        <h4 style={{
                            fontSize: 'var(--font-size-xl)',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-4)'
                        }}>
                            会员特权：
                        </h4>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-3)'
                        }}>
                            {features.map((feature, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-3)'
                                }}>
                                    <Icon
                                        name="membership-check"
                                        size="sm"
                                        style={{
                                            color: '#10B981',
                                            flexShrink: 0
                                        }}
                                    />
                                    <span style={{
                                        fontSize: 'var(--font-size-base)',
                                        color: 'var(--color-text-secondary)'
                                    }}>
                                        {feature.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 升级按钮 */}
                    <GradientButton
                        size="lg"
                        fullWidth
                        onClick={handleUpgrade}
                    >
                        立即升级会员
                    </GradientButton>
                </div>

                {/* 右侧：功能详情卡片 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-6)'
                }}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card glass-card--hover"
                            style={{
                                padding: 'var(--spacing-6)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 'var(--spacing-4)'
                            }}
                        >
                            {/* 图标 */}
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: 'var(--gradient-primary)',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Icon name={feature.icon} size="lg" style={{ color: '#FFFFFF' }} />
                            </div>

                            {/* 内容 */}
                            <div>
                                <h3 style={{
                                    fontSize: 'var(--font-size-xl)',
                                    fontWeight: '600',
                                    color: 'var(--color-text-primary)',
                                    marginBottom: 'var(--spacing-2)'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    fontSize: 'var(--font-size-base)',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: '1.6'
                                }}>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 响应式样式 */}
            <style jsx>{`
                @media (max-width: 1024px) {
                    .content-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                }
            `}</style>
        </section>
    )
} 