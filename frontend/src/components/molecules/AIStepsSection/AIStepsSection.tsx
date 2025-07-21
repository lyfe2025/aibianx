'use client'

export function AIStepsSection() {
    const steps = [
        {
            number: 1,
            title: '认识AI工具',
            description: '了解主流AI工具的基本功能和应用场景'
        },
        {
            number: 2,
            title: '掌握技能',
            description: '深入学习AI工具的高级技巧和变现方法'
        },
        {
            number: 3,
            title: '项目实战',
            description: '从零开始构建你的AI商业项目'
        },
        {
            number: 4,
            title: '实现变现',
            description: '通过多种渠道将AI技能转化为稳定收入'
        },
        {
            number: 5,
            title: '扩展规模',
            description: '优化业务模式，实现被动收入和财务自由'
        }
    ]

    return (
        <section style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            paddingTop: '188px',
            paddingBottom: '176px'
        }}>
            {/* 标题 */}
            <h2 style={{
                background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '32px',
                fontWeight: 700,
                lineHeight: '45px',
                margin: '0 0 5px 0'
            }}>
                AI 变现之路
            </h2>

            <div style={{
                color: '#9CA3AF',
                fontSize: '18px',
                lineHeight: '25px',
                marginBottom: '42px'
            }}>
                从入门到精通
            </div>

            {/* 5个步骤圆圈 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '120px',
                marginBottom: '46px'
            }}>
                {steps.map((step) => (
                    <div
                        key={step.number}
                        style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.20) 37%, rgba(139, 92, 246, 0.20) 63%)',
                            border: '1px solid rgba(59, 130, 246, 0.60)',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            lineHeight: '22px'
                        }}
                    >
                        {step.number}
                    </div>
                ))}
            </div>

            {/* 步骤标题 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '70px',
                marginBottom: '29px'
            }}>
                {steps.map((step) => (
                    <div
                        key={step.number}
                        style={{
                            color: '#FFFFFF',
                            fontSize: '18px',
                            fontWeight: 700,
                            lineHeight: '25px',
                            width: '71px',
                            textAlign: 'center'
                        }}
                    >
                        {step.title}
                    </div>
                ))}
            </div>

            {/* 步骤描述 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '49px'
            }}>
                {steps.map((step) => (
                    <div
                        key={step.number}
                        style={{
                            color: '#9CA3AF',
                            fontSize: '14px',
                            lineHeight: '20px',
                            width: '166px',
                            textAlign: 'center'
                        }}
                    >
                        {step.description}
                    </div>
                ))}
            </div>
        </section>
    )
} 