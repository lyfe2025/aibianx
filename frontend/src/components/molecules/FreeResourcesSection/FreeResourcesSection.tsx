import { Container, GradientText, GradientButton } from '@/components/ui'
import Link from 'next/link'

/**
 * 免费精选资源区块组件 - FreeResourcesSection
 * 
 * 根据设计稿展示4个免费资源卡片：
 * - AI技术入门指南
 * - AI变现秘籍手册
 * - AI创业案例集
 * - AI工具速查手册
 */
export function FreeResourcesSection() {
    const resources = [
        {
            id: 1,
            title: 'AI技术入门指南',
            description: '零基础快速上手AI工具，掌握核心技能',
            image: '/images/illustrations/tech-guide.svg',
            tag: '技术指南',
            tagColor: '#3B82F6',
            tagBg: 'rgba(12, 30, 71, 0.80)',
            tagBorder: 'rgba(59, 130, 246, 0.40)'
        },
        {
            id: 2,
            title: 'AI变现秘籍手册',
            description: '10种经过验证的AI赚钱模式详解',
            image: '/images/illustrations/monetization-guide.svg',
            tag: '变现心得',
            tagColor: '#F97316',
            tagBg: 'rgba(58, 23, 8, 0.80)',
            tagBorder: 'rgba(249, 115, 22, 0.40)'
        },
        {
            id: 3,
            title: 'AI创业案例集',
            description: '5个月入过万的AI创业成功故事',
            image: '/images/illustrations/case-studies.svg',
            tag: '实战案例',
            tagColor: '#10B981',
            tagBg: 'rgba(12, 40, 23, 0.80)',
            tagBorder: 'rgba(16, 185, 129, 0.40)'
        },
        {
            id: 4,
            title: 'AI工具速查手册',
            description: '50+必备AI工具清单及使用指南',
            image: '/images/illustrations/tools-handbook.svg',
            tag: 'AI工具',
            tagColor: '#8B5CF6',
            tagBg: 'rgba(30, 12, 71, 0.80)',
            tagBorder: 'rgba(139, 92, 246, 0.40)'
        }
    ]

    return (
        <section style={{
            paddingTop: '212px',
            paddingBottom: '64px',
            background: 'var(--color-bg-primary)',
            position: 'relative'
        }}>
            {/* 装饰性渐变背景 */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '231px',
                height: '74px',
                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.20) 0%, rgba(139, 92, 246, 0.20) 100%)',
                borderRadius: '12px',
                marginTop: '5px'
            }} />

            <Container>
                {/* 区块标题 */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '64px'
                }}>
                    <GradientText
                        size="xl"
                        weight="bold"
                        style={{
                            fontSize: '30px',
                            lineHeight: '36px',
                            marginBottom: '20px',
                            display: 'block'
                        }}
                    >
                        免费精选资源
                    </GradientText>
                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '18px',
                        lineHeight: '28px',
                        margin: 0,
                        maxWidth: '425px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        立即获取这些高质量的AI变现指南，加速你的成功之路
                    </p>
                </div>

                {/* 资源卡片网格 */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '24px',
                    paddingLeft: '124px',
                    paddingRight: '124px'
                }}>
                    {resources.map((resource) => (
                        <Link
                            key={resource.id}
                            href={`/resources/${resource.id}`}
                            className="free-resource-card"
                            style={{
                                background: 'rgba(26, 26, 26, 0.30)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                border: '1px solid rgba(42, 42, 42, 0.70)',
                                borderRadius: '16px',
                                boxShadow: '0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                width: '280px'
                            }}
                        >
                            {/* 资源图片 */}
                            <div style={{
                                width: '278px',
                                height: '160px',
                                background: `url(${resource.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '16px',
                                margin: '1px 1px 0 1px'
                            }} />

                            {/* 卡片内容 */}
                            <div style={{
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                flex: 1
                            }}>
                                {/* 标签 */}
                                <div style={{
                                    background: resource.tagBg,
                                    border: `1px solid ${resource.tagBorder}`,
                                    borderRadius: '8px',
                                    padding: '5px 12px',
                                    alignSelf: 'flex-start'
                                }}>
                                    <span style={{
                                        color: resource.tagColor,
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        fontWeight: '500'
                                    }}>
                                        {resource.tag}
                                    </span>
                                </div>

                                {/* 标题 */}
                                <h3 style={{
                                    color: '#FFFFFF',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    lineHeight: '28px',
                                    margin: 0
                                }}>
                                    {resource.title}
                                </h3>

                                {/* 描述 */}
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    margin: 0,
                                    flex: 1
                                }}>
                                    {resource.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
} 