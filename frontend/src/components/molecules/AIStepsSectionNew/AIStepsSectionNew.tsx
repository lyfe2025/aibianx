import { Container, GradientText } from '@/components/ui'

/**
 * AI变现步骤区块组件 - AIStepsSectionNew
 * 
 * 根据设计稿展示AI变现的5个步骤：
 * 1. 认识AI工具
 * 2. 掌握技能
 * 3. 项目实战
 * 4. 实现变现
 * 5. 扩展规模
 */
export function AIStepsSectionNew() {
    const steps = [
        {
            id: 1,
            title: '认识AI工具',
            description: '了解主流AI工具的基本功能和应用场景'
        },
        {
            id: 2,
            title: '掌握技能',
            description: '深入学习AI工具的高级技巧和变现方法'
        },
        {
            id: 3,
            title: '项目实战',
            description: '从零开始构建你的AI商业项目'
        },
        {
            id: 4,
            title: '实现变现',
            description: '通过多种渠道将AI技能转化为稳定收入'
        },
        {
            id: 5,
            title: '扩展规模',
            description: '优化业务模式，实现被动收入和财务自由'
        }
    ]

    return (
        <section style={{
            paddingTop: '64px',
            paddingBottom: '144px',
            background: 'var(--color-bg-primary)'
        }}>
            <Container>
                {/* 步骤指示器 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '171px',
                    marginBottom: '12px'
                }}>
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            style={{
                                width: '48px',
                                height: '48px',
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.20) 15%, rgba(139, 92, 246, 0.20) 85%)',
                                border: '1px solid rgba(59, 130, 246, 0.60)',
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <span style={{
                                color: '#FFFFFF',
                                fontSize: '20px',
                                lineHeight: '28px',
                                fontWeight: '600'
                            }}>
                                {step.id}
                            </span>
                        </div>
                    ))}
                </div>

                {/* 步骤标题 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '139px',
                    marginBottom: '2px'
                }}>
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            style={{
                                textAlign: 'center',
                                width: '90px'
                            }}
                        >
                            <h3 style={{
                                color: '#FFFFFF',
                                fontSize: '18px',
                                fontWeight: '700',
                                lineHeight: '28px',
                                margin: 0
                            }}>
                                {step.title}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* 步骤描述 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: '45px',
                    paddingLeft: '130px',
                    paddingRight: '130px'
                }}>
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            style={{
                                width: '173.5px',
                                textAlign: 'center'
                            }}
                        >
                            <p style={{
                                color: 'var(--color-text-muted)',
                                fontSize: 'var(--font-size-base)',
                                lineHeight: '24px',
                                margin: 0,
                                minHeight: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
} 