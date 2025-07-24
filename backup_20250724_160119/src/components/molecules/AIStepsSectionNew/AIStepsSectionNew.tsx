import { Container, GradientText } from '@/components/ui'

/**
 * AI变现步骤区块组件 - AIStepsSectionNew
 * 
 * 根据设计稿1:1还原的AI变现步骤展示：
 * - 主标题："AI 变现之路"
 * - 副标题："从入门到精通"
 * - 5个步骤圆圈 + 标题 + 描述
 * - 装饰性背景效果
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
            paddingTop: '30px',
            paddingBottom: '60px',
            background: 'transparent', // 改为透明，让粒子可见
            position: 'relative'
        }}>
            {/* 主容器 - 严格按设计稿1060px宽度 */}
            <div style={{
                width: '1060px',
                margin: '0 auto',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                fontSize: '18px',
                fontWeight: '400',
                position: 'relative'
            }}>
                {/* 标题区域 - 精确按设计稿间距 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: '5px',
                    paddingLeft: '1.94px',
                    paddingRight: '1.50px',
                    paddingTop: '30.01px',
                    paddingBottom: '83px'
                }}>
                    {/* 主标题 - AI 变现之路 */}
                    <GradientText
                        as="h2"
                        size="5xl"
                        weight="bold"
                        style={{
                            lineHeight: '40px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            textOverflow: 'ellipsis',
                            minHeight: '40px',
                            margin: '0 auto'
                        }}
                    >
                        AI 变现之路
                    </GradientText>

                    {/* 副标题 - 从入门到精通 */}
                    <div style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-xl)',
                        fontFamily: 'var(--font-family-primary)',
                        lineHeight: '28px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        textOverflow: 'ellipsis',
                        minHeight: '28px',
                        margin: '0 auto'
                    }}>
                        从入门到精通
                    </div>
                </div>

                {/* 步骤区域 - 每个步骤垂直对齐：圆圈、标题、描述 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '43px',
                    position: 'relative',
                    flexWrap: 'nowrap'
                }}>
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '176px',
                                minWidth: '176px',
                                textAlign: 'center'
                            }}
                        >
                            {/* 步骤圆圈 */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.20) 32%, rgba(139, 92, 246, 0.20) 68%)',
                                border: '1px solid rgba(59, 130, 246, 0.60)',
                                borderRadius: '24px',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '13px'
                            }}>
                                <div style={{
                                    color: '#FFFFFF',
                                    fontSize: '20px',
                                    lineHeight: '28px',
                                    fontWeight: '600'
                                }}>
                                    {step.id}
                                </div>
                            </div>

                            {/* 步骤标题 */}
                            <div style={{
                                color: '#FFFFFF',
                                fontWeight: '700',
                                fontSize: '18px',
                                lineHeight: '25px',
                                marginBottom: '8px',
                                whiteSpace: 'nowrap'
                            }}>
                                {step.title}
                            </div>

                            {/* 步骤描述 */}
                            <div style={{
                                color: '#9CA3AF',
                                fontSize: '16px',
                                lineHeight: '20px',
                                textAlign: 'center',
                                minHeight: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {step.description}
                            </div>
                        </div>
                    ))}

                    {/* 装饰性背景 - 精确按设计稿定位 */}
                    <div style={{
                        position: 'absolute',
                        top: '-200px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '238px',
                        height: '234px',
                        opacity: '0.80',
                        background: 'radial-gradient(50% 50% at 50% 50%, rgba(59, 130, 246, 0.40) 0%, rgba(139, 92, 246, 0.20) 50%, rgba(0, 0, 0, 0.00) 70%, rgba(0, 0, 0, 0.00) 70%)',
                        filter: 'blur(40px)',
                        borderRadius: '100px',
                        pointerEvents: 'none'
                    }} />
                </div>
            </div>

            {/* 响应式样式 */}
            <style jsx>{`
                /* 中等屏幕适配 (768px - 1199px) */
                @media (max-width: 1199px) {
                    section > div {
                        width: 100% !important;
                        max-width: 1024px !important;
                        padding: 0 var(--spacing-6) !important;
                    }
                    
                    /* 步骤容器间距调整 */
                    section > div > div:nth-child(2) {
                        gap: 20px !important;
                    }
                    
                    /* 单个步骤宽度调整 */
                    section > div > div:nth-child(2) > div {
                        width: 140px !important;
                        min-width: 140px !important;
                    }
                }
                
                /* 移动端适配 (767px及以下) */
                @media (max-width: 767px) {
                    section {
                        padding-top: 40px !important;
                        padding-bottom: 40px !important;
                    }
                    
                    section > div {
                        padding: 0 var(--spacing-4) !important;
                    }
                    
                    /* 标题区域间距调整 */
                    section > div > div:first-child {
                        padding-bottom: 40px !important;
                    }
                    
                    /* 主标题字体调整 */
                    section > div > div:first-child > div:first-child {
                        font-size: 28px !important;
                        line-height: 36px !important;
                    }
                    
                    /* 副标题字体调整 */
                    section > div > div:first-child > div:last-child {
                        font-size: 16px !important;
                        line-height: 24px !important;
                    }
                    
                    /* 步骤容器垂直布局 */
                    section > div > div:nth-child(2) {
                        flex-direction: column !important;
                        gap: 32px !important;
                        align-items: center !important;
                    }
                    
                    /* 单个步骤宽度调整 */
                    section > div > div:nth-child(2) > div {
                        width: 100% !important;
                        max-width: 300px !important;
                        min-width: auto !important;
                    }
                    
                    /* 装饰背景隐藏 */
                    section > div > div:nth-child(2) > div:last-child {
                        display: none !important;
                    }
                }
                
                /* 超小屏幕 (480px及以下) */
                @media (max-width: 480px) {
                    section > div > div:nth-child(2) > div {
                        max-width: 280px !important;
                    }
                    
                    /* 步骤标题可以换行 */
                    section > div > div:nth-child(2) > div > div:nth-child(2) {
                        white-space: normal !important;
                        line-height: 22px !important;
                    }
                }
            `}</style>
        </section>
    )
} 