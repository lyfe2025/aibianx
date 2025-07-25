'use client'

import { Container, Icon, GradientText, GlassCard, GradientButton, AnimatedNumber, CrownIcon } from '@/components/ui'
import { CountdownTimer, PageHeader } from '@/components/molecules'
import { useModalStore } from '@/stores'

export default function AboutPage() {
    const { openModal } = useModalStore()

    // 处理立即开通会员按钮点击
    const handleUpgrade = () => {
        const defaultPlan = {
            name: '年度会员',
            price: 299,
            originalPrice: 399,
            period: '年',
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
        <div style={{
            color: '#FFFFFF',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            minHeight: '100vh',
            paddingTop: '80px' // 为固定头部留出空间
        }}>
            <div style={{ paddingBottom: '80px' }}>
                <Container size="xl">
                    {/* Hero 区域 */}
                    <PageHeader
                        title="关于AI变现之路"
                        subtitle="我们致力于探索AI技术的商业价值，帮助创作者、开发者和企业 通过人工智能技术实现商业创新与价值转化"
                        description=""
                        alignment="center"
                        className="page-header"
                    />

                    {/* 我们的使命标题 */}
                    <div style={{
                        textAlign: 'center',
                        paddingTop: '32px',
                        marginBottom: '64px !important'
                        // 增加间距从46px到64px，使布局更加舒展
                    }}>
                        <GradientText
                            size="6xl"
                            weight="bold"
                            style={{
                                lineHeight: '57.6px'
                            }}
                        >
                            我们的使命
                        </GradientText>
                    </div>

                    {/* 三个使命卡片 */}
                    <section style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        marginBottom: '74px'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '40px',
                            width: '1200px'
                        }}>
                            {/* 分享知识 */}
                            <GlassCard variant="default" style={{
                                flex: 1,
                                padding: '34px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px'
                            }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 32%, rgba(139, 92, 246, 0.10) 68%)',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10px'
                                }}>
                                    <Icon name="share-knowledge-feature" size="lg" />
                                </div>

                                <h3 style={{
                                    color: '#FFFFFF',
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    lineHeight: '38.4px',
                                    margin: '0'
                                }}>
                                    分享知识
                                </h3>

                                <p style={{
                                    color: '#9CA3AF',
                                    fontSize: '16px',
                                    lineHeight: '25.6px',
                                    margin: '0'
                                }}>
                                    汇集AI领域最前沿的变现技巧与商业模式，为读者提供实用且深入的AI应用知识，帮助大家快速掌握AI技术的商业化路径。
                                </p>
                            </GlassCard>

                            {/* 推动创新 */}
                            <GlassCard variant="default" style={{
                                flex: 1,
                                padding: '34px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px'
                            }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 32%, rgba(139, 92, 246, 0.10) 68%)',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10px'
                                }}>
                                    <Icon name="drive-innovation-new" size="lg" />
                                </div>

                                <h3 style={{
                                    color: '#FFFFFF',
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    lineHeight: '38.4px',
                                    margin: '0'
                                }}>
                                    推动创新
                                </h3>

                                <p style={{
                                    color: '#9CA3AF',
                                    fontSize: '16px',
                                    lineHeight: '25.6px',
                                    margin: '0'
                                }}>
                                    激发创作者和企业的创新思维，探索AI与各行业的融合可能性，推动新兴商业模式的孵化与发展，创造更多商业价值。
                                </p>
                            </GlassCard>

                            {/* 赋能变现 */}
                            <GlassCard variant="default" style={{
                                flex: 1,
                                padding: '34px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px'
                            }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 32%, rgba(139, 92, 246, 0.10) 68%)',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10px'
                                }}>
                                    <Icon name="enable-monetization-new" size="lg" />
                                </div>

                                <h3 style={{
                                    color: '#FFFFFF',
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    lineHeight: '38.4px',
                                    margin: '0'
                                }}>
                                    赋能变现
                                </h3>

                                <p style={{
                                    color: '#9CA3AF',
                                    fontSize: '16px',
                                    lineHeight: '25.6px',
                                    margin: '0'
                                }}>
                                    提供可落地的AI变现方法与工具，帮助个人创作者和企业挖掘AI技术的盈利潜力，实现技术到财富的高效转化。
                                </p>
                            </GlassCard>
                        </div>
                    </section>

                    {/* 成为会员区域 */}
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
                            color: '#D1D5DB',
                            fontSize: '18px',
                            lineHeight: '28.8px',
                            textAlign: 'center',
                            marginBottom: 'var(--card-gap-lg)'
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
                                {/* 实时更新的AI工具库 */}
                                <GlassCard variant="default" style={{
                                    padding: '34px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '30px'
                                }}>
                                    <div style={{
                                        background: 'rgba(30, 61, 89, 0.30)',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        width: '64px',
                                        height: '64px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon name="ai-tool-library-new" size="md" />
                                    </div>

                                    <h3 style={{
                                        color: '#FFFFFF',
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        lineHeight: '38.4px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        实时更新的AI工具库
                                    </h3>

                                    <p style={{
                                        color: '#9CA3AF',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        我们持续跟踪和评估最新的AI工具，为会员提供详细的使用指南和变现策略，让你始终站在技术前沿。
                                    </p>
                                </GlassCard>

                                {/* 成功案例库 */}
                                <GlassCard variant="default" style={{
                                    padding: '34px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '30px'
                                }}>
                                    <div style={{
                                        background: 'rgba(30, 61, 89, 0.30)',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        width: '64px',
                                        height: '64px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon name="success-cases-new" size="md" />
                                    </div>

                                    <h3 style={{
                                        color: '#FFFFFF',
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        lineHeight: '38.4px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        成功案例库
                                    </h3>

                                    <p style={{
                                        color: '#9CA3AF',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        学习1000+成功案例的实操步骤和策略，涵盖各个行业和技能水平，快速找到适合你的变现方式。
                                    </p>
                                </GlassCard>

                                {/* 专业社区支持 */}
                                <GlassCard variant="default" style={{
                                    padding: '34px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '30px'
                                }}>
                                    <div style={{
                                        background: 'rgba(30, 61, 89, 0.30)',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        width: '64px',
                                        height: '64px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon name="community-support-new" size="md" />
                                    </div>

                                    <h3 style={{
                                        color: '#FFFFFF',
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        lineHeight: '38.4px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        专业社区支持
                                    </h3>

                                    <p style={{
                                        color: '#9CA3AF',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        加入由成功AI创业者和专家组成的私密社区，随时获取指导、分享经验并发现合作机会。
                                    </p>
                                </GlassCard>

                                {/* 一对一咨询 */}
                                <GlassCard variant="default" style={{
                                    padding: '34px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '30px'
                                }}>
                                    <div style={{
                                        background: 'rgba(30, 61, 89, 0.30)',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        width: '64px',
                                        height: '64px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon name="one-on-one-consulting-new" size="md" />
                                    </div>

                                    <h3 style={{
                                        color: '#FFFFFF',
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        lineHeight: '38.4px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        一对一咨询
                                    </h3>

                                    <p style={{
                                        color: '#9CA3AF',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        高级会员每月可享受与AI领域专家的一对一咨询，解决你在AI创业和变现过程中遇到的具体问题。
                                    </p>
                                </GlassCard>
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
                                        color: '#FFFFFF',
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
                                        color: '#FF6B6B',
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
                                            color: '#FFFFFF',
                                            fontWeight: '600',
                                            fontSize: '16px',
                                            lineHeight: '25.6px'
                                        }}>
                                            立即开通，享独家特权
                                        </span>
                                    </div>

                                    <p style={{
                                        color: '#D1D5DB',
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
                                    {[
                                        { text: '200+ AI变现教程和指南', badge: 'New!', badgeColor: '#FF6B6B' },
                                        { text: '每周更新实战案例', badge: '独家', badgeColor: '#3B82F6' },
                                        { text: '专属社区和导师指导' },
                                        { text: 'AI工具专属优惠', badge: '高达7折', badgeColor: '#10B981' }
                                    ].map((item, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            <Icon name="check-icon" size="md" />
                                            <span style={{
                                                color: '#D1D5DB',
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
                                        color: '#6B7280',
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
                                        color: '#FFFFFF',
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
                                        color: '#9CA3AF',
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

                    {/* 为什么选择我们 */}
                    <section style={{
                        textAlign: 'center',
                        marginBottom: '73px'
                    }}>
                        <GradientText
                            size="6xl"
                            weight="bold"
                            style={{
                                marginBottom: '46px',
                                lineHeight: '57.6px'
                            }}
                        >
                            为什么选择我们
                        </GradientText>

                        <p style={{
                            color: '#D1D5DB',
                            fontSize: '18px',
                            lineHeight: '28.8px',
                            textAlign: 'center',
                            marginBottom: '47px'
                        }}>
                            在AI快速发展的时代，我们提供的不仅是知识，更是实用的变现路径和专业的指导支持
                        </p>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%'
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '24px',
                                width: '1200px'
                            }}>
                                {/* 实战经验 */}
                                <GlassCard variant="default" style={{
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
                                        <Icon name="practical-experience-new" size="md" />
                                        <h3 style={{
                                            color: '#FFFFFF',
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            lineHeight: '38.4px',
                                            margin: '0'
                                        }}>
                                            实战经验
                                        </h3>
                                    </div>

                                    <p style={{
                                        color: '#9CA3AF',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        所有内容都基于实际变现案例和经验，而非纯理论。我们的团队成员都有丰富的AI变现实战经历，能够提供有价值的指导。
                                    </p>
                                </GlassCard>

                                {/* 持续更新 */}
                                <GlassCard variant="default" style={{
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
                                        marginTop: '21px'
                                    }}>
                                        <Icon name="continuous-update-new" size="md" />
                                        <h3 style={{
                                            color: '#FFFFFF',
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            lineHeight: '38.4px',
                                            margin: '0'
                                        }}>
                                            持续更新
                                        </h3>
                                    </div>

                                    <p style={{
                                        color: '#9CA3AF',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        我们每周更新最新的AI工具、变现策略和成功案例，确保您始终站在行业前沿，把握最新的AI变现机会。
                                    </p>
                                </GlassCard>

                                {/* 社区支持 */}
                                <GlassCard variant="default" style={{
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
                                        marginTop: '21px'
                                    }}>
                                        <Icon name="community-advantage-new" size="md" />
                                        <h3 style={{
                                            color: '#FFFFFF',
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            lineHeight: '38.4px',
                                            margin: '0'
                                        }}>
                                            社区支持
                                        </h3>
                                    </div>

                                    <p style={{
                                        color: '#9CA3AF',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        margin: '0',
                                        textAlign: 'left'
                                    }}>
                                        加入我们活跃的会员社区，与其他AI变现实践者交流经验，结识志同道合的伙伴，共同成长。
                                    </p>
                                </GlassCard>
                            </div>
                        </div>
                    </section>

                    {/* 平台数据 */}
                    <section style={{
                        textAlign: 'center',
                        marginBottom: '73px'
                    }}>
                        <GradientText
                            size="6xl"
                            weight="bold"
                            style={{
                                marginBottom: '0px',
                                lineHeight: '57.6px'
                            }}
                        >
                            平台数据
                        </GradientText>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            paddingTop: '64px !important'
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '24px',
                                width: '1200px'
                            }}>
                                {[
                                    { value: '30万+', label: '月活跃用户' },
                                    { value: '500+', label: '精选案例' },
                                    { value: '120+', label: '周刊期数' },
                                    { value: '50+', label: '合作伙伴' }
                                ].map((stat, index) => (
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
                                            color: '#9CA3AF',
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

                    {/* 联系我们 */}
                    <section style={{
                        textAlign: 'center',
                        marginBottom: '73px'
                    }}>
                        <GradientText
                            size="6xl"
                            weight="bold"
                            style={{
                                marginBottom: '0px',
                                lineHeight: '57.6px'
                            }}
                        >
                            联系我们
                        </GradientText>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            paddingTop: '64px !important'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                width: '1200px',
                                gap: '157px'
                            }}>
                                {/* 左侧联系信息容器 */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxWidth: '400px'
                                }}>
                                    {/* 联系方式列表 */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '24px'
                                    }}>
                                        {/* 邮箱联系方式 */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px'
                                        }}>
                                            <div style={{
                                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 32%, rgba(139, 92, 246, 0.10) 68%)',
                                                borderRadius: '8px',
                                                padding: '4px',
                                                width: '40px',
                                                height: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <Icon name="email-contact-new" size="lg" />
                                            </div>
                                            <span style={{
                                                color: '#9CA3AF',
                                                fontSize: '16px',
                                                lineHeight: '25.6px',
                                                textAlign: 'left'
                                            }}>
                                                contact@aibianzai.com
                                            </span>
                                        </div>

                                        {/* 电话联系方式 */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px'
                                        }}>
                                            <div style={{
                                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 32%, rgba(139, 92, 246, 0.10) 68%)',
                                                borderRadius: '8px',
                                                padding: '4px',
                                                width: '40px',
                                                height: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <Icon name="phone-contact-new" size="lg" />
                                            </div>
                                            <span style={{
                                                color: '#9CA3AF',
                                                fontSize: '16px',
                                                lineHeight: '25.6px',
                                                textAlign: 'left'
                                            }}>
                                                400-888-XXXX
                                            </span>
                                        </div>

                                        {/* 地址联系方式 */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px'
                                        }}>
                                            <div style={{
                                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 32%, rgba(139, 92, 246, 0.10) 68%)',
                                                borderRadius: '8px',
                                                padding: '4px',
                                                width: '40px',
                                                height: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <Icon name="email-contact-new" size="lg" />
                                            </div>
                                            <span style={{
                                                color: '#9CA3AF',
                                                fontSize: '16px',
                                                lineHeight: '25.6px',
                                                textAlign: 'left'
                                            }}>
                                                北京市海淀区科技园区88号
                                            </span>
                                        </div>
                                    </div>

                                    {/* 说明文字 */}
                                    <div style={{
                                        marginTop: '32px'
                                    }}>
                                        <p style={{
                                            color: '#9CA3AF',
                                            fontSize: '16px',
                                            lineHeight: '25.6px',
                                            textAlign: 'left',
                                            margin: '0'
                                        }}>
                                            我们欢迎各类合作洽谈，包括内容贡献、案例分享、品牌合作、投资咨询等。如果您对AI变现有独特见解或实践经验，也欢迎与我们联系，共同推动AI产业发展！
                                        </p>
                                    </div>
                                </div>

                                {/* 右侧表单区域 - 垂直布局 */}
                                <div style={{
                                    flex: 1,
                                    marginLeft: '157px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0px'
                                }}>
                                    {/* 联系邮箱标签 */}
                                    <div style={{
                                        color: '#9CA3AF',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        textAlign: 'left',
                                        marginBottom: '8px'
                                    }}>
                                        联系邮箱
                                    </div>

                                    {/* 姓名输入框 */}
                                    <input
                                        placeholder="请输入您的姓名"
                                        style={{
                                            background: 'rgba(18, 18, 18, 0.50)',
                                            border: '1px solid #2A2A2A',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            width: '100%',
                                            height: '46px',
                                            color: '#FFFFFF',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                                            outline: 'none',
                                            backdropFilter: 'blur(4px)',
                                            WebkitBackdropFilter: 'blur(4px)',
                                            transition: 'all 0.2s ease',
                                            marginBottom: '9px'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#3B82F6'
                                            e.target.style.background = 'rgba(18, 18, 18, 0.70)'
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'var(--color-border-primary)'
                                            e.target.style.background = 'var(--color-bg-input)'
                                        }}
                                    />

                                    {/* 邮箱输入框 */}
                                    <input
                                        placeholder="请输入您的邮箱"
                                        style={{
                                            background: 'rgba(18, 18, 18, 0.50)',
                                            border: '1px solid #2A2A2A',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            width: '100%',
                                            height: '46px',
                                            color: '#FFFFFF',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                                            outline: 'none',
                                            backdropFilter: 'blur(4px)',
                                            WebkitBackdropFilter: 'blur(4px)',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#3B82F6'
                                            e.target.style.background = 'rgba(18, 18, 18, 0.70)'
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#2A2A2A'
                                            e.target.style.background = 'rgba(18, 18, 18, 0.50)'
                                        }}
                                    />

                                    {/* 留言内容标签 */}
                                    <div style={{
                                        color: '#9CA3AF',
                                        fontSize: '16px',
                                        lineHeight: '25.6px',
                                        textAlign: 'left',
                                        whiteSpace: 'nowrap',
                                        marginTop: '29px',
                                        marginBottom: '8px'
                                    }}>
                                        留言内容
                                    </div>

                                    {/* 留言文本框 */}
                                    <textarea
                                        placeholder="请输入您想咨询或合作的内容"
                                        style={{
                                            background: 'rgba(18, 18, 18, 0.50)',
                                            border: '1px solid #2A2A2A',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            width: '100%',
                                            height: '172px',
                                            color: '#FFFFFF',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            resize: 'none',
                                            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                                            outline: 'none',
                                            backdropFilter: 'blur(4px)',
                                            WebkitBackdropFilter: 'blur(4px)',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#3B82F6'
                                            e.target.style.background = 'rgba(18, 18, 18, 0.70)'
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#2A2A2A'
                                            e.target.style.background = 'rgba(18, 18, 18, 0.50)'
                                        }}
                                    />


                                </div>
                            </div>
                        </div>



                        {/* 提交按钮 */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            marginTop: '24px'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                width: '1200px'
                            }}>
                                <GradientButton
                                    size="sm"
                                    variant="primary"
                                    style={{
                                        borderRadius: '9999px',
                                        padding: '17px 28px',
                                        fontSize: '13.33px',
                                        fontFamily: 'Arial',
                                        lineHeight: '15px',
                                        width: '110px'
                                    }}
                                >
                                    提交信息
                                </GradientButton>
                            </div>
                        </div>
                    </section>
                </Container>
            </div>
        </div>
    )
} 