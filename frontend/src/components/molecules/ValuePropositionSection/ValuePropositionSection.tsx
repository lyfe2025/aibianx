'use client'

import { Container } from '@/components/ui'

/**
 * 移动端价值承诺组件 - ValuePropositionSection
 * 
 * 专为移动端优化的价值展示区域，增强用户信任度和转化率
 * 重点展示AI变现之路的核心价值主张
 * 
 * 设计目标：
 * - 清晰展示为什么选择我们
 * - 建立权威性和可信度
 * - 移动端友好的卡片式布局
 * - 强化转化动机
 */

interface ValuePoint {
    icon: string
    title: string
    description: string
    highlight?: string
}

export function ValuePropositionSection() {
    // 核心价值点数据
    const valuePoints: ValuePoint[] = [
        {
            icon: '🎯',
            title: '验证可行的赚钱模式',
            description: '10种经过市场验证的AI变现方法',
            highlight: '成功率90%+'
        },
        {
            icon: '📈',
            title: '真实成功案例分享',
            description: '5个月入过万的创业者故事',
            highlight: '最高月收入50万'
        },
        {
            icon: '🛠️',
            title: '完整工具和资源',
            description: '50+必备AI工具清单及使用教程',
            highlight: '价值10万+'
        },
        {
            icon: '👥',
            title: '专业社群支持',
            description: '28,450+活跃创业者交流圈',
            highlight: '24小时互助'
        }
    ]

    return (
        <section className="value-proposition-section">
            <Container size="xl">
                <div className="value-proposition-content">
                    {/* 区域标题 */}
                    <div className="section-header">
                        <h2 className="section-title">
                            为什么选择AI变现之路？
                        </h2>
                        <p className="section-subtitle">
                            超过28,450位创业者的共同选择，助你快速实现AI变现
                        </p>
                    </div>

                    {/* 价值点网格 */}
                    <div className="value-points-grid">
                        {valuePoints.map((point, index) => (
                            <div key={index} className="value-point-card">
                                <div className="value-icon">
                                    <span className="icon-emoji">{point.icon}</span>
                                </div>
                                
                                <div className="value-content">
                                    <h3 className="value-title">
                                        {point.title}
                                    </h3>
                                    
                                    <p className="value-description">
                                        {point.description}
                                    </p>
                                    
                                    {point.highlight && (
                                        <div className="value-highlight">
                                            {point.highlight}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 信任指标 */}
                    <div className="trust-indicators">
                        <div className="trust-item">
                            <span className="trust-number">28,450+</span>
                            <span className="trust-label">订阅用户</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-number">95%</span>
                            <span className="trust-label">满意度</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-number">3年+</span>
                            <span className="trust-label">专业经验</span>
                        </div>
                    </div>
                </div>
            </Container>

            {/* 移动端专用样式 */}
            <style jsx>{`
                .value-proposition-section {
                    width: 100%;
                    padding: 60px 0;
                    background: var(--color-bg-secondary);
                    border-top: 1px solid var(--color-border-primary);
                }

                .value-proposition-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 40px;
                }

                .section-header {
                    text-align: center;
                    max-width: 480px;
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

                .value-points-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                    width: 100%;
                    max-width: 400px;
                }

                .value-point-card {
                    background: var(--color-bg-primary);
                    border: 1px solid var(--color-border-primary);
                    border-radius: 12px;
                    padding: 24px;
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .value-point-card:hover {
                    border-color: var(--color-primary-blue);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
                }

                .value-icon {
                    flex-shrink: 0;
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--color-bg-glass);
                    border-radius: 12px;
                    border: 1px solid var(--color-border-glass);
                }

                .icon-emoji {
                    font-size: 24px;
                    line-height: 1;
                }

                .value-content {
                    flex: 1;
                    min-width: 0;
                }

                .value-title {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 8px 0;
                    line-height: 1.3;
                }

                .value-description {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    margin: 0 0 8px 0;
                    line-height: 1.4;
                }

                .value-highlight {
                    font-size: var(--font-size-xs);
                    color: var(--color-primary-blue);
                    font-weight: 600;
                    padding: 4px 8px;
                    background: rgba(59, 130, 246, 0.1);
                    border-radius: 6px;
                    display: inline-block;
                }

                .trust-indicators {
                    display: flex;
                    justify-content: center;
                    gap: 32px;
                    margin-top: 20px;
                }

                .trust-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                }

                .trust-number {
                    font-size: var(--font-size-xl);
                    font-weight: bold;
                    color: var(--color-primary-blue);
                    line-height: 1;
                }

                .trust-label {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                    text-align: center;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .value-proposition-section {
                        padding: 40px 0;
                    }

                    .value-proposition-content {
                        gap: 32px;
                        padding: 0 16px;
                    }

                    .section-title {
                        font-size: var(--font-size-xl);
                    }

                    .section-subtitle {
                        font-size: var(--font-size-sm);
                    }

                    .value-points-grid {
                        max-width: 100%;
                        gap: 16px;
                    }

                    .value-point-card {
                        padding: 20px;
                        gap: 12px;
                    }

                    .value-icon {
                        width: 40px;
                        height: 40px;
                    }

                    .icon-emoji {
                        font-size: 20px;
                    }

                    .value-title {
                        font-size: var(--font-size-base);
                    }

                    .trust-indicators {
                        gap: 24px;
                    }

                    .trust-number {
                        font-size: var(--font-size-lg);
                    }
                }

                /* 超小屏幕优化 */
                @media (max-width: 480px) {
                    .value-points-grid {
                        gap: 12px;
                    }

                    .value-point-card {
                        padding: 16px;
                        gap: 10px;
                    }

                    .value-icon {
                        width: 36px;
                        height: 36px;
                    }

                    .icon-emoji {
                        font-size: 18px;
                    }

                    .trust-indicators {
                        gap: 20px;
                    }

                    .trust-item {
                        gap: 2px;
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .value-point-card {
                        touch-action: manipulation;
                    }

                    .value-point-card:active {
                        transform: scale(0.98);
                    }
                }

                /* 暗色主题优化 */
                @media (prefers-color-scheme: dark) {
                    .value-point-card {
                        backdrop-filter: blur(12px);
                    }

                    .value-highlight {
                        background: rgba(59, 130, 246, 0.2);
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .section-title,
                    .value-title {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            `}</style>
        </section>
    )
}