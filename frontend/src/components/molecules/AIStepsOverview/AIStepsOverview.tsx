'use client'

import { Container } from '@/components/ui'

/**
 * 移动端AI步骤概览组件 - AIStepsOverview
 * 
 * 专为移动端优化的AI变现步骤展示，简化版设计
 * 基于现有AIStepsSectionNew的5个步骤，但针对移动端重新设计
 * 
 * 设计目标：
 * - 清晰展示AI变现路径
 * - 增强用户信心和期待
 * - 移动端友好的纵向布局
 * - 简洁明了的视觉设计
 */

interface AIStep {
    id: number
    title: string
    description: string
    icon: string
}

export function AIStepsOverview() {
    // AI变现步骤数据 - 基于现有内容优化
    const steps: AIStep[] = [
        {
            id: 1,
            title: '认识AI工具',
            description: '了解主流AI工具基本功能',
            icon: '🔍'
        },
        {
            id: 2,
            title: '掌握技能',
            description: '学习高级技巧和变现方法',
            icon: '🎯'
        },
        {
            id: 3,
            title: '项目实战',
            description: '构建你的AI商业项目',
            icon: '🚀'
        },
        {
            id: 4,
            title: '实现变现',
            description: '转化为稳定收入来源',
            icon: '💰'
        },
        {
            id: 5,
            title: '扩展规模',
            description: '实现被动收入和财务自由',
            icon: '📈'
        }
    ]

    return (
        <section className="ai-steps-overview">
            <Container size="xl">
                <div className="steps-content">
                    {/* 区域标题 */}
                    <div className="section-header">
                        <h2 className="section-title">
                            AI变现5步骤
                        </h2>
                        <p className="section-subtitle">
                            从零开始到财务自由的完整路径
                        </p>
                    </div>

                    {/* 步骤流程 */}
                    <div className="steps-flow">
                        {steps.map((step, index) => (
                            <div key={step.id} className="step-item">
                                {/* 步骤圆圈和图标 */}
                                <div className="step-circle">
                                    <div className="step-number">
                                        {step.id}
                                    </div>
                                    <div className="step-icon">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* 步骤内容 */}
                                <div className="step-content">
                                    <h3 className="step-title">
                                        {step.title}
                                    </h3>
                                    <p className="step-description">
                                        {step.description}
                                    </p>
                                </div>

                                {/* 连接线（除了最后一个） */}
                                {index < steps.length - 1 && (
                                    <div className="step-connector" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 成功指标 */}
                    <div className="success-metrics">
                        <div className="metric-item">
                            <span className="metric-number">5步</span>
                            <span className="metric-label">系统化流程</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-number">3-6月</span>
                            <span className="metric-label">见效时间</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-number">∞</span>
                            <span className="metric-label">成长潜力</span>
                        </div>
                    </div>
                </div>
            </Container>

            {/* 移动端专用样式 */}
            <style jsx>{`
                .ai-steps-overview {
                    width: 100%;
                    padding: 60px 0;
                    background: var(--color-bg-secondary);
                    border-top: 1px solid var(--color-border-primary);
                    border-bottom: 1px solid var(--color-border-primary);
                }

                .steps-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 40px;
                }

                .section-header {
                    text-align: center;
                    max-width: 400px;
                }

                .section-title {
                    font-size: var(--font-size-2xl);
                    font-weight: bold;
                    color: var(--color-text-primary);
                    margin: 0 0 12px 0;
                    line-height: 1.3;
                }

                .section-subtitle {
                    font-size: var(--font-size-base);
                    color: var(--color-text-secondary);
                    margin: 0;
                    line-height: 1.5;
                }

                .steps-flow {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    width: 100%;
                    max-width: 360px;
                    position: relative;
                }

                .step-item {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    position: relative;
                    background: var(--color-bg-primary);
                    border: 1px solid var(--color-border-primary);
                    border-radius: 12px;
                    padding: 16px;
                    transition: all 0.3s ease;
                }

                .step-item:hover {
                    border-color: var(--color-primary-blue);
                    transform: translateX(4px);
                    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
                }

                .step-circle {
                    flex-shrink: 0;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, 
                        var(--color-primary-blue) 0%, 
                        var(--color-primary-purple) 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
                }

                .step-number {
                    font-size: var(--font-size-xs);
                    font-weight: bold;
                    color: white;
                    line-height: 1;
                }

                .step-icon {
                    font-size: 16px;
                    line-height: 1;
                    margin-top: 2px;
                }

                .step-content {
                    flex: 1;
                    min-width: 0;
                }

                .step-title {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 6px 0;
                    line-height: 1.3;
                }

                .step-description {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    margin: 0;
                    line-height: 1.4;
                }

                .step-connector {
                    position: absolute;
                    left: 44px;
                    bottom: -24px;
                    width: 2px;
                    height: 16px;
                    background: linear-gradient(to bottom, 
                        var(--color-primary-blue), 
                        transparent);
                    z-index: 1;
                }

                .success-metrics {
                    display: flex;
                    justify-content: center;
                    gap: 32px;
                    margin-top: 20px;
                    padding: 20px;
                    background: var(--color-bg-glass);
                    border: 1px solid var(--color-border-glass);
                    border-radius: 12px;
                    backdrop-filter: blur(12px);
                }

                .metric-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                }

                .metric-number {
                    font-size: var(--font-size-lg);
                    font-weight: bold;
                    color: var(--color-primary-blue);
                    line-height: 1;
                }

                .metric-label {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                    text-align: center;
                    white-space: nowrap;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .ai-steps-overview {
                        padding: 40px 0;
                    }

                    .steps-content {
                        gap: 32px;
                        padding: 0 16px;
                    }

                    .section-title {
                        font-size: var(--font-size-xl);
                    }

                    .section-subtitle {
                        font-size: var(--font-size-sm);
                    }

                    .steps-flow {
                        max-width: 100%;
                        gap: 20px;
                    }

                    .step-item {
                        padding: 14px;
                        gap: 14px;
                    }

                    .step-circle {
                        width: 48px;
                        height: 48px;
                    }

                    .step-icon {
                        font-size: 14px;
                    }

                    .step-title {
                        font-size: var(--font-size-base);
                    }

                    .step-description {
                        font-size: var(--font-size-xs);
                    }

                    .step-connector {
                        left: 38px;
                        bottom: -20px;
                        height: 12px;
                    }

                    .success-metrics {
                        gap: 24px;
                        padding: 16px;
                    }

                    .metric-number {
                        font-size: var(--font-size-base);
                    }
                }

                /* 超小屏幕优化 */
                @media (max-width: 480px) {
                    .steps-flow {
                        gap: 16px;
                    }

                    .step-item {
                        padding: 12px;
                        gap: 12px;
                    }

                    .step-circle {
                        width: 40px;
                        height: 40px;
                    }

                    .step-number {
                        font-size: 10px;
                    }

                    .step-icon {
                        font-size: 12px;
                    }

                    .success-metrics {
                        gap: 20px;
                        padding: 14px;
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .step-item {
                        touch-action: manipulation;
                    }

                    .step-item:active {
                        transform: scale(0.98);
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .section-title,
                    .step-title {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            `}</style>
        </section>
    )
}