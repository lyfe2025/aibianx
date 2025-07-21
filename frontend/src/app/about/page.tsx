'use client'

import { Container } from '@/components/ui'
import {
    PageHeader,
    MissionSection,
    MembershipSection,
    StatsSection,
    ContactSection
} from '@/components/molecules'

// 使命数据
const missions = [
    {
        icon: 'share-knowledge',
        title: '分享知识',
        description: '汇聚AI领域顶尖专家的实战经验，打造最权威的AI变现知识库',
        highlight: '100+位行业专家贡献内容'
    },
    {
        icon: 'drive-innovation',
        title: '推动创新',
        description: '探索AI技术的无限可能，为创业者和开发者提供前沿的技术洞察',
        highlight: '每周发布5+创新应用案例'
    },
    {
        icon: 'enable-monetization',
        title: '赋能变现',
        description: '从理论到实践，帮助每个人掌握AI变现技能，实现财务自由梦想',
        highlight: '平均帮助用户月收入提升300%'
    }
]

// 会员特权数据
const membershipFeatures = [
    {
        icon: 'membership-exclusive',
        title: '专享深度内容',
        description: '获得会员专属的深度技术分析、完整项目源码和详细实施方案，让你的AI项目从想法变为现实。'
    },
    {
        icon: 'one-on-one-consulting',
        title: '一对一专家咨询',
        description: '每月可预约1小时专家咨询，解决你在AI变现过程中遇到的具体问题，获得个性化指导建议。'
    },
    {
        icon: 'community-support',
        title: '专属社群支持',
        description: '加入会员专属微信群，与同行交流经验，获得最新行业资讯，建立有价值的人脉网络。'
    },
    {
        icon: 'continuous-update',
        title: '持续更新资源',
        description: '优先获得最新的AI工具测评、商业模式分析和市场机会洞察，确保你始终走在行业前沿。'
    }
]

// 平台数据统计
const stats = [
    {
        icon: 'users-stat',
        value: '10K+',
        label: '注册用户',
        description: '来自全球的AI创业者和开发者'
    },
    {
        icon: 'success-cases',
        value: '500+',
        label: '成功案例',
        description: '用户通过我们的指导实现的变现项目'
    },
    {
        icon: 'update-weekly-icon',
        value: '52',
        label: '周刊期数',
        description: '持续一年的高质量内容输出'
    },
    {
        icon: 'community-advantage',
        value: '100+',
        label: '合作伙伴',
        description: '与我们建立合作关系的AI公司'
    }
]

// 联系方式数据
const contactMethods = [
    {
        icon: 'email-contact',
        label: '客服邮箱',
        value: 'support@aibianx.com',
        href: 'mailto:support@aibianx.com'
    },
    {
        icon: 'phone-contact',
        label: '客服电话',
        value: '400-888-0123',
        href: 'tel:400-888-0123'
    },
    {
        icon: 'social-wechat',
        label: '微信客服',
        value: 'aibianx-service',
    },
    {
        icon: 'contact-icon',
        label: '工作时间',
        value: '周一至周五 9:00-18:00'
    }
]

export default function AboutPage() {
    return (
        <div style={{
            background: '#030303',
            color: '#FFFFFF',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            minHeight: '100vh',
            paddingTop: '80px' // 为固定头部留出空间
        }}>
            {/* 背景装饰光效 */}
            <div style={{
                position: 'fixed',
                top: '200px',
                right: '-200px',
                width: '600px',
                height: '600px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.10) 100%)',
                filter: 'blur(120px)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'fixed',
                bottom: '200px',
                left: '-200px',
                width: '400px',
                height: '400px',
                background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'relative',
                zIndex: 1,
                paddingBottom: '80px'
            }}>
                <Container size="xl">
                    {/* 页面头部 */}
                    <PageHeader
                        title="关于AI变现之路"
                        subtitle="专业的AI商业化平台"
                        description="我们致力于帮助每个人掌握AI变现技能，通过专业的内容、实用的工具和贴心的服务，让AI技术真正为你创造价值。"
                    />

                    {/* 使命介绍区块 */}
                    <div style={{ marginBottom: '120px' }}>
                        <MissionSection
                            title="我们的使命"
                            subtitle="致力于让每个人都能掌握AI变现技能"
                            missions={missions}
                        />
                    </div>

                    {/* 会员特权展示 */}
                    <div style={{ marginBottom: '120px' }}>
                        <MembershipSection
                            title="会员特权"
                            subtitle="解锁全部内容，加速你的AI变现之路"
                            features={membershipFeatures}
                            pricing={{
                                originalPrice: 399,
                                currentPrice: 299,
                                discount: "限时7.5折",
                                period: "年"
                            }}
                        />
                    </div>

                    {/* 平台数据统计 */}
                    <div style={{ marginBottom: '120px' }}>
                        <StatsSection
                            title="平台数据"
                            subtitle="用数据说话，见证AI变现之路的成长"
                            stats={stats}
                        />
                    </div>

                    {/* 选择我们的理由 */}
                    <section style={{
                        padding: '80px 0',
                        textAlign: 'center',
                        marginBottom: '120px'
                    }}>
                        <div style={{
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
                                为什么选择我们
                            </h2>
                            <p style={{
                                fontSize: 'var(--font-size-2xl)',
                                color: 'var(--color-text-secondary)',
                                maxWidth: '600px',
                                margin: '0 auto',
                                lineHeight: '1.5'
                            }}>
                                三大核心优势，助你在AI变现路上走得更远
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 'var(--spacing-8)',
                            maxWidth: '1000px',
                            margin: '0 auto'
                        }}>
                            {[
                                {
                                    icon: 'practical-experience',
                                    title: '实战经验',
                                    description: '所有内容都来自真实的项目实践，确保每个方法都经过验证，让你少走弯路。',
                                    highlight: '100%实战验证'
                                },
                                {
                                    icon: 'continuous-update',
                                    title: '持续更新',
                                    description: '紧跟AI技术发展趋势，每周更新最新的变现机会和实用工具，保持内容的时效性。',
                                    highlight: '每周5+更新'
                                },
                                {
                                    icon: 'community-support',
                                    title: '社区支持',
                                    description: '活跃的用户社区，专业的答疑团队，让你在学习和实践过程中从不孤单。',
                                    highlight: '24小时响应'
                                }
                            ].map((reason, index) => (
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
                                        marginBottom: 'var(--spacing-4)'
                                    }}>
                                        {reason.title}
                                    </h3>

                                    {/* 描述 */}
                                    <p style={{
                                        fontSize: 'var(--font-size-lg)',
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: '1.6',
                                        marginBottom: 'var(--spacing-4)'
                                    }}>
                                        {reason.description}
                                    </p>

                                    {/* 突出显示文字 */}
                                    <div style={{
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        color: '#10B981',
                                        padding: 'var(--spacing-3) var(--spacing-4)',
                                        borderRadius: 'var(--radius-lg)',
                                        fontSize: 'var(--font-size-base)',
                                        fontWeight: '600',
                                        border: '1px solid rgba(16, 185, 129, 0.3)'
                                    }}>
                                        {reason.highlight}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 联系我们 */}
                    <ContactSection
                        title="联系我们"
                        subtitle="有任何问题或建议，欢迎与我们联系"
                        methods={contactMethods}
                    />
                </Container>
            </div>
        </div>
    )
} 