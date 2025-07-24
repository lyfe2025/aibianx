'use client'

import { GradientText } from '@/components/ui'

export function ResourcesSection() {
    // 免费资源数据
    const freeResources = [
        {
            id: 1,
            title: 'AI技术入门指南',
            description: '零基础快速上手AI工具，掌握核心技能',
            tag: '技术指南',
            tagColor: '#3B82F6',
            image: '/images/resources/ai-guide.svg'
        },
        {
            id: 2,
            title: 'AI变现秘籍手册',
            description: '10种经过验证的AI赚钱模式详解',
            tag: '变现心得',
            tagColor: '#F97316',
            image: '/images/resources/monetization-guide.svg'
        },
        {
            id: 3,
            title: 'AI创业案例集',
            description: '5个月入过万的AI创业成功故事',
            tag: '实战案例',
            tagColor: '#10B981',
            image: '/images/resources/startup-cases.svg'
        },
        {
            id: 4,
            title: 'AI工具速查手册',
            description: '50+必备AI工具清单及使用指南',
            tag: 'AI工具',
            tagColor: '#8B5CF6',
            image: '/images/resources/tools-handbook.svg'
        }
    ]

    return (
        <section style={{
            position: 'relative',
            zIndex: 1,
            padding: '0 120px',
            marginBottom: '142px'
        }}>
            {/* 区域标题 */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 'var(--section-spacing-md)'
            }}>
                <div style={{ fontSize: '72px' }}>📊</div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <GradientText
                        as="h2"
                        size="5xl"
                        weight="bold"
                        style={{
                            lineHeight: '45px',
                            margin: '0 0 20px 0'
                        }}
                    >
                        免费精选资源
                    </GradientText>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-xl)',
                        fontFamily: 'var(--font-family-primary)',
                        lineHeight: '25px'
                    }}>
                        立即获取这些高质量的AI变现指南，加速你的成功之路
                    </p>
                </div>
            </div>

            {/* 2x2资源网格 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px'
            }}>
                {freeResources.map((resource) => (
                    <div
                        key={resource.id}
                        style={{
                            width: '280px',
                            background: 'rgba(26, 26, 26, 0.30)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(42, 42, 42, 0.70)',
                            borderRadius: '16px',
                            padding: '25px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px'
                        }}
                    >
                        {/* 资源图片 */}
                        <div style={{
                            width: '230px',
                            height: '160px',
                            background: 'var(--gradient-primary)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '14px',
                            fontWeight: 600
                        }}>
                            资源图片
                        </div>

                        {/* 资源标签 */}
                        <div style={{
                            marginTop: '6px',
                            paddingLeft: '20px'
                        }}>
                            <div style={{
                                display: 'inline-block',
                                background: `rgba(${resource.tagColor === '#3B82F6' ? '12, 30, 71' :
                                    resource.tagColor === '#F97316' ? '58, 23, 8' :
                                        resource.tagColor === '#10B981' ? '12, 40, 23' : '30, 12, 71'}, 0.80)`,
                                border: `1px solid ${resource.tagColor}40`,
                                borderRadius: '8px',
                                padding: '6px 12px',
                                color: resource.tagColor,
                                fontSize: '12px',
                                lineHeight: '16px'
                            }}>
                                {resource.tag}
                            </div>
                        </div>

                        {/* 资源标题 */}
                        <div style={{
                            marginTop: '2px',
                            paddingLeft: '20px'
                        }}>
                            <h3 style={{
                                color: '#FFFFFF',
                                fontSize: '18px',
                                fontWeight: 700,
                                lineHeight: '25px',
                                margin: 0
                            }}>
                                {resource.title}
                            </h3>
                        </div>

                        {/* 资源描述 */}
                        <div style={{
                            paddingLeft: '20px'
                        }}>
                            <p style={{
                                color: '#9CA3AF',
                                fontSize: '14px',
                                lineHeight: '20px',
                                margin: 0
                            }}>
                                {resource.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
} 