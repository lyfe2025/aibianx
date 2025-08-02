'use client'

import { Container, GradientText } from '@/components/ui'
import { EmailSubscribeForm } from '@/components/molecules'

/**
 * 移动端最终邮件订阅组件 - FinalEmailCTA
 * 
 * 专为移动端优化的最终转化区域，页面的关键收尾
 * 基于现有FinalCTASection的成功文案，但针对移动端重新设计
 * 
 * 设计目标：
 * - 强力的最终转化召唤
 * - 突出核心价值和紧迫感
 * - 移动端友好的大按钮设计
 * - 社会证明强化决策信心
 */

export function FinalEmailCTA() {
    // 核心价值点 - 基于现有成功文案
    const benefits = [
        {
            icon: '🚀',
            title: '掌握前沿AI工具和变现策略',
            description: '第一时间获得最新AI工具和经过验证的变现方法'
        },
        {
            icon: '📈',
            title: '每周更新实战案例和变现干货',
            description: '持续获得新的创业案例和实操指南'
        },
        {
            icon: '👨‍💼',
            title: '专业指导快速实现AI创业',
            description: '专家级指导帮你避开弯路，快速变现'
        }
    ]

    return (
        <section className="final-email-cta">
            <Container size="xl">
                <div className="cta-content">
                    {/* 主标题区域 */}
                    <div className="cta-header">
                        <div className="main-title">
                            <GradientText
                                size="3xl"
                                weight="bold"
                                className="title-gradient"
                            >
                                成为AI时代的赢家
                            </GradientText>
                        </div>
                        
                        <p className="main-subtitle">
                            立即订阅，开启你的AI变现之路
                        </p>
                    </div>

                    {/* 用户统计 */}
                    <div className="user-stats">
                        <div className="stats-row">
                            <div className="stat-item">
                                <span className="stat-number">28,450+</span>
                                <span className="stat-label">创业者订阅</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">95%</span>
                                <span className="stat-label">满意度</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">50万+</span>
                                <span className="stat-label">累计收入</span>
                            </div>
                        </div>
                    </div>

                    {/* 核心价值点 */}
                    <div className="benefits-section">
                        <h3 className="benefits-title">
                            订阅后你将获得：
                        </h3>
                        
                        <div className="benefits-list">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <div className="benefit-icon">
                                        {benefit.icon}
                                    </div>
                                    <div className="benefit-content">
                                        <h4 className="benefit-title">
                                            {benefit.title}
                                        </h4>
                                        <p className="benefit-description">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 邮件订阅表单 */}
                    <div className="subscription-section">
                        <div className="subscription-header">
                            <h3 className="subscription-title">
                                免费订阅，立即开始
                            </h3>
                            <p className="subscription-subtitle">
                                无需任何费用，立即获得价值10万+的AI变现资源
                            </p>
                        </div>

                        <EmailSubscribeForm 
                            className="final-email-form"
                            placeholder="输入您的邮箱地址"
                        />

                        <div className="subscription-guarantee">
                            <div className="guarantee-item">
                                📧 订阅后立即发送免费资源
                            </div>
                            <div className="guarantee-item">
                                🔒 绝不泄露您的个人信息
                            </div>
                            <div className="guarantee-item">
                                ✅ 随时可以取消订阅
                            </div>
                        </div>
                    </div>

                    {/* 紧迫感元素 */}
                    <div className="urgency-section">
                        <div className="urgency-badge">
                            ⚡ 限时福利
                        </div>
                        <p className="urgency-text">
                            前1000名订阅者额外获得<strong>《AI创业避坑指南》</strong>
                        </p>
                        <div className="urgency-counter">
                            剩余名额：<span className="counter-number">327</span>
                        </div>
                    </div>

                    {/* 最终推荐引导 */}
                    <div className="final-recommendation">
                        <p className="recommendation-text">
                            "这是我见过的最实用的AI变现指南，真的帮我实现了月入过万的目标！"
                        </p>
                        <div className="recommender">
                            <span className="recommender-name">— 张明，程序员</span>
                            <span className="recommender-achievement">3个月实现月入5万</span>
                        </div>
                    </div>
                </div>
            </Container>

            {/* 移动端专用样式 */}
            <style jsx>{`
                .final-email-cta {
                    width: 100%;
                    padding: 60px 0;
                    background: linear-gradient(135deg, 
                        var(--color-bg-secondary) 0%, 
                        var(--color-bg-primary) 100%);
                    border-top: 1px solid var(--color-border-primary);
                    position: relative;
                    overflow: hidden;
                }

                .final-email-cta::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 30% 50%, 
                        rgba(59, 130, 246, 0.1) 0%, 
                        transparent 50%);
                    pointer-events: none;
                }

                .cta-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 40px;
                    position: relative;
                    z-index: 1;
                }

                .cta-header {
                    text-align: center;
                    max-width: 400px;
                }

                .main-title {
                    margin-bottom: 16px;
                }

                .title-gradient {
                    line-height: 1.2;
                }

                .main-subtitle {
                    font-size: var(--font-size-lg);
                    color: var(--color-text-secondary);
                    margin: 0;
                    line-height: 1.5;
                }

                .user-stats {
                    width: 100%;
                    max-width: 380px;
                    background: var(--color-bg-glass);
                    border: 1px solid var(--color-border-glass);
                    border-radius: 16px;
                    padding: 24px;
                    backdrop-filter: blur(12px);
                }

                .stats-row {
                    display: flex;
                    justify-content: space-around;
                    gap: 16px;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    flex: 1;
                }

                .stat-number {
                    font-size: var(--font-size-xl);
                    font-weight: bold;
                    color: var(--color-primary-blue);
                    line-height: 1;
                }

                .stat-label {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                    text-align: center;
                    white-space: nowrap;
                }

                .benefits-section {
                    width: 100%;
                    max-width: 400px;
                }

                .benefits-title {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    text-align: center;
                    margin: 0 0 24px 0;
                    line-height: 1.3;
                }

                .benefits-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .benefit-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 16px;
                    background: var(--color-bg-primary);
                    border: 1px solid var(--color-border-primary);
                    border-radius: 12px;
                    transition: all 0.3s ease;
                }

                .benefit-item:hover {
                    border-color: var(--color-primary-blue);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
                }

                .benefit-icon {
                    font-size: 24px;
                    line-height: 1;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .benefit-content {
                    flex: 1;
                    min-width: 0;
                }

                .benefit-title {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 6px 0;
                    line-height: 1.3;
                }

                .benefit-description {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                    margin: 0;
                    line-height: 1.4;
                }

                .subscription-section {
                    width: 100%;
                    max-width: 400px;
                    background: var(--color-bg-primary);
                    border: 2px solid var(--color-primary-blue);
                    border-radius: 16px;
                    padding: 24px;
                    text-align: center;
                    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
                }

                .subscription-header {
                    margin-bottom: 20px;
                }

                .subscription-title {
                    font-size: var(--font-size-xl);
                    font-weight: bold;
                    color: var(--color-text-primary);
                    margin: 0 0 8px 0;
                    line-height: 1.3;
                }

                .subscription-subtitle {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    margin: 0;
                    line-height: 1.4;
                }

                .final-email-form {
                    margin: 16px 0;
                }

                .subscription-guarantee {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-top: 16px;
                }

                .guarantee-item {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                    line-height: 1.3;
                }

                .urgency-section {
                    text-align: center;
                    max-width: 300px;
                    padding: 20px;
                    background: linear-gradient(135deg, 
                        rgba(255, 193, 7, 0.1) 0%, 
                        rgba(255, 152, 0, 0.1) 100%);
                    border: 1px solid rgba(255, 193, 7, 0.3);
                    border-radius: 12px;
                }

                .urgency-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #FFC107 0%, #FF9800 100%);
                    color: white;
                    font-size: var(--font-size-xs);
                    font-weight: bold;
                    padding: 4px 12px;
                    border-radius: 20px;
                    margin-bottom: 12px;
                }

                .urgency-text {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-primary);
                    margin: 0 0 8px 0;
                    line-height: 1.4;
                }

                .urgency-counter {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                }

                .counter-number {
                    font-weight: bold;
                    color: #FF5722;
                }

                .final-recommendation {
                    text-align: center;
                    max-width: 360px;
                    padding: 20px;
                    background: var(--color-bg-glass);
                    border: 1px solid var(--color-border-glass);
                    border-radius: 12px;
                    backdrop-filter: blur(12px);
                }

                .recommendation-text {
                    font-size: var(--font-size-base);
                    color: var(--color-text-primary);
                    margin: 0 0 12px 0;
                    line-height: 1.5;
                    font-style: italic;
                }

                .recommender {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .recommender-name {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    font-weight: 500;
                }

                .recommender-achievement {
                    font-size: var(--font-size-xs);
                    color: var(--color-primary-blue);
                    font-weight: 600;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .final-email-cta {
                        padding: 40px 0;
                    }

                    .cta-content {
                        gap: 32px;
                        padding: 0 16px;
                    }

                    .title-gradient {
                        font-size: var(--font-size-2xl) !important;
                    }

                    .main-subtitle {
                        font-size: var(--font-size-base);
                    }

                    .user-stats {
                        max-width: 100%;
                        padding: 20px;
                    }

                    .stats-row {
                        gap: 12px;
                    }

                    .stat-number {
                        font-size: var(--font-size-lg);
                    }

                    .benefits-section {
                        max-width: 100%;
                    }

                    .benefit-item {
                        padding: 14px;
                        gap: 10px;
                    }

                    .subscription-section {
                        max-width: 100%;
                        padding: 20px;
                    }

                    .subscription-title {
                        font-size: var(--font-size-lg);
                    }

                    .final-recommendation {
                        max-width: 100%;
                        padding: 16px;
                    }
                }

                /* 超小屏幕优化 */
                @media (max-width: 480px) {
                    .stats-row {
                        flex-direction: column;
                        gap: 16px;
                    }

                    .stat-item {
                        flex-direction: row;
                        justify-content: center;
                        gap: 8px;
                    }

                    .benefit-icon {
                        font-size: 20px;
                    }

                    .urgency-section {
                        max-width: 100%;
                    }

                    .recommendation-text {
                        font-size: var(--font-size-sm);
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .benefit-item {
                        touch-action: manipulation;
                    }

                    .benefit-item:active {
                        transform: scale(0.98);
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .subscription-title,
                    .benefits-title,
                    .benefit-title {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            `}</style>
        </section>
    )
}