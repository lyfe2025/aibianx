'use client'

import { Icon, GradientText, GlassCard, GradientButton, CrownIcon } from '@/components/ui'
import { CountdownTimer } from '@/components/molecules'
import { useModalStore } from '@/stores'
import { DEFAULT_MEMBERSHIP_PLAN } from '@/constants/about'

/**
 * MembershipSectionNew 组件
 * 
 * 成为会员区域，包含功能卡片和会员专享卡片
 */
export function MembershipSectionNew() {
    const { openModal } = useModalStore()

    // 处理立即开通会员按钮点击
    const handleUpgrade = () => {
        openModal('payment', {
            payment: { plan: DEFAULT_MEMBERSHIP_PLAN }
        })
    }

    // 功能卡片配置
    const featureCards = [
        {
            id: 'ai-tools',
            icon: 'ai-tool-library-new',
            iconColor: 'var(--color-primary-blue)',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 15%, rgba(6, 182, 212, 0.15) 85%)',
            shadow: '0 2px 8px rgba(59, 130, 246, 0.12)',
            title: '实时更新的AI工具库',
            description: '我们持续跟踪和评估最新的AI工具，为会员提供详细的使用指南和变现策略，让你始终站在技术前沿。'
        },
        {
            id: 'success-cases',
            icon: 'success-cases-new',
            iconColor: 'var(--color-success)',
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 15%, rgba(52, 211, 153, 0.15) 85%)',
            shadow: '0 2px 8px rgba(34, 197, 94, 0.12)',
            title: '成功案例库',
            description: '学习1000+成功案例的实操步骤和策略，涵盖各个行业和技能水平，快速找到适合你的变现方式。'
        },
        {
            id: 'community',
            icon: 'community-support-new',
            iconColor: 'var(--color-primary-purple)',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 15%, rgba(236, 72, 153, 0.15) 85%)',
            shadow: '0 2px 8px rgba(168, 85, 247, 0.12)',
            title: '专业社区支持',
            description: '加入由成功AI创业者和专家组成的私密社区，随时获取指导、分享经验并发现合作机会。'
        },
        {
            id: 'consulting',
            icon: 'one-on-one-consulting-new',
            iconColor: 'var(--color-orange)',
            background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 15%, rgba(245, 158, 11, 0.15) 85%)',
            shadow: '0 2px 8px rgba(251, 146, 60, 0.12)',
            title: '一对一咨询',
            description: '高级会员每月可享受与AI领域专家的一对一咨询，解决你在AI创业和变现过程中遇到的具体问题。'
        }
    ]

    // 会员权益配置
    const membershipBenefits = [
        { text: '200+ AI变现教程和指南', badge: 'New!', badgeColor: '#FF6B6B' },
        { text: '每周更新实战案例', badge: '独家', badgeColor: 'var(--color-primary-blue)' },
        { text: '专属社区和导师指导' },
        { text: 'AI工具专属优惠', badge: '高达7折', badgeColor: 'var(--color-success)' }
    ]

    return (
        <section style={{
            textAlign: 'center',
            marginBottom: '74px'
        }}>
            <GradientText
                size="6xl"
                weight="bold"
                style={{
                    marginBottom: '46px',
                    lineHeight: '57.6px'
                }}
            >
                成为会员，加速你的AI变现之路
            </GradientText>

            <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '18px',
                lineHeight: '28.8px',
                textAlign: 'center',
                marginBottom: '64px'
            }}>
                开通会员，获取完整的AI变现资源和专业指导，快速启动你的AI赚钱之旅。
            </p>

            {/* 会员专享卡片和功能卡片 */}
            <div style={{
                display: 'flex',
                gap: '32px',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%'
            }}>
                {/* 左侧功能卡片 - 2x2 布局 */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '32px',
                    width: '744px'
                }}>
                    {featureCards.map((card) => (
                        <GlassCard key={card.id} variant="default" style={{
                            padding: '34px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px'
                        }}>
                            <div style={{
                                background: card.background,
                                borderRadius: '50%',
                                padding: '20px',
                                width: '64px',
                                height: '64px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: card.shadow
                            }}>
                                {/* 
                  注意：此图标颜色故意保持固定的暗色模式样式，不随主题变化
                  设计决策：会员功能图标需要保持一致的品牌色彩识别度
                  请勿修改为CSS变量 - 这不是硬编码错误！
                */}
                                <Icon name={card.icon} size="md" style={{ color: card.iconColor }} />
                            </div>

                            <h3 style={{
                                color: 'var(--color-text-primary)',
                                fontSize: '24px',
                                fontWeight: '700',
                                lineHeight: '38.4px',
                                margin: '0',
                                textAlign: 'left'
                            }}>
                                {card.title}
                            </h3>

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

                {/* 右侧会员专享卡片 */}
                <GlassCard variant="default" style={{
                    width: '391px',
                    padding: '34px',
                    background: 'var(--color-bg-glass)',
                    boxShadow: '0px 8px 24px 0px rgba(0, 0, 0, 0.20)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    {/* 头部 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '29px'
                    }}>
                        <div style={{
                            background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                            boxShadow: '0px 0px 15px 0px rgba(139, 92, 246, 0.30)',
                            borderRadius: '24px',
                            padding: '12px',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CrownIcon size="lg" />
                        </div>

                        <h3 style={{
                            color: 'var(--color-text-primary)',
                            fontSize: '24px',
                            fontWeight: '700',
                            lineHeight: '38.4px',
                            margin: '0'
                        }}>
                            会员专享
                        </h3>

                        <div style={{
                            background: 'rgba(255, 107, 107, 0.10)',
                            borderRadius: '12px',
                            padding: '4px 8px',
                            color: 'var(--color-error)',
                            fontSize: '14px',
                            fontWeight: '600',
                            lineHeight: '22.4px'
                        }}>
                            限时活动
                        </div>
                    </div>

                    {/* 倒计时 */}
                    <div style={{ marginBottom: '19px' }}>
                        <CountdownTimer />
                    </div>

                    {/* 特权介绍 */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 25%, rgba(139, 92, 246, 0.15) 75%)',
                        borderRadius: '8px',
                        padding: '10px 18px 10px 10px',
                        marginBottom: '36px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '2px'
                        }}>
                            <Icon name="check-icon" size="md" />
                            <span style={{
                                color: 'var(--color-text-primary)',
                                fontWeight: '600',
                                fontSize: '16px',
                                lineHeight: '25.6px'
                            }}>
                                立即开通，享独家特权
                            </span>
                        </div>

                        <p style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '14px',
                            lineHeight: '19.6px',
                            margin: '0',
                            textAlign: 'right'
                        }}>
                            首次开通即可获得价值￥199的AI工具大礼包
                        </p>
                    </div>

                    {/* 功能列表 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '11px',
                        marginBottom: '31px'
                    }}>
                        {membershipBenefits.map((item, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <Icon name="check-icon" size="md" />
                                <span style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '16px',
                                    lineHeight: '25.6px'
                                }}>
                                    {item.text}
                                </span>
                                {item.badge && (
                                    <div style={{
                                        background: item.badgeColor === '#3B82F6' ? 'rgba(59, 130, 246, 0.20)' : 'transparent',
                                        borderRadius: '4px',
                                        padding: '0px 6px',
                                        color: item.badgeColor,
                                        fontSize: item.badgeColor === '#3B82F6' ? '12px' : '14px',
                                        fontWeight: '600',
                                        lineHeight: item.badgeColor === '#3B82F6' ? '19.2px' : '22.4px'
                                    }}>
                                        {item.badge}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 价格 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '11px',
                        marginBottom: '16px'
                    }}>
                        <span style={{
                            color: 'var(--color-text-disabled)',
                            fontSize: '16px',
                            lineHeight: '25.6px',
                            textDecoration: 'line-through'
                        }}>
                            ¥399
                        </span>
                        <div style={{
                            background: '#FF6B6B',
                            borderRadius: '12px',
                            padding: '2px 8px',
                            color: 'var(--color-text-primary)',
                            fontSize: '12px',
                            fontWeight: '600',
                            lineHeight: '19.2px'
                        }}>
                            7.5折
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'center',
                        gap: '7px',
                        marginBottom: '16px'
                    }}>
                        <GradientText
                            size="6xl"
                            weight="bold"
                            style={{
                                lineHeight: '57.6px'
                            }}
                        >
                            ¥299
                        </GradientText>
                        <span style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '16px',
                            lineHeight: '25.6px'
                        }}>
                            /年
                        </span>
                    </div>

                    {/* 开通按钮 */}
                    <GradientButton
                        size="lg"
                        variant="primary"
                        fullWidth
                        onClick={handleUpgrade}
                        style={{
                            borderRadius: '9999px',
                            padding: '15px 114px',
                            boxShadow: '0px 4px 12px 0px rgba(139, 92, 246, 0.25)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        立即开通会员
                    </GradientButton>
                </GlassCard>
            </div>
        </section>
    )
} 