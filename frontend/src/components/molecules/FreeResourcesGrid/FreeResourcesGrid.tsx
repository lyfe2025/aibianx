'use client'

import { useState } from 'react'
import { Container, Tag, GradientButton, useToast } from '@/components/ui'
import { EmailSubscribeForm } from '@/components/molecules'

/**
 * 移动端免费资源网格组件 - FreeResourcesGrid
 * 
 * 专为移动端优化的免费资源展示，专注邮件获取转化
 * 基于现有4个资源内容，但针对移动端重新设计
 * 
 * 设计目标：
 * - 突出免费资源价值
 * - 简化邮件订阅流程
 * - 移动端友好的触控体验
 * - 强调邮件发送而非下载
 */

interface FreeResource {
    id: number
    title: string
    description: string
    image: string
    tag: string
    highlights: string[]
}

export function FreeResourcesGrid() {
    const [selectedResource, setSelectedResource] = useState<number | null>(null)
    const { toasts, removeToast } = useToast()

    // 免费资源数据 - 基于现有内容优化
    const resources: FreeResource[] = [
        {
            id: 1,
            title: '技术入门指南',
            description: '零基础快速上手AI工具，掌握核心技能',
            image: '/images/illustrations/tech-guide.svg',
            tag: 'tech-guide',
            highlights: ['零基础友好', '实操教程', '核心技能']
        },
        {
            id: 2,
            title: '变现秘籍手册',
            description: '10种经过验证的AI赚钱模式详解',
            image: '/images/illustrations/monetization-guide.svg',
            tag: 'monetization',
            highlights: ['验证可行', '详细方法', '立即上手']
        },
        {
            id: 3,
            title: '创业案例集',
            description: '5个月入过万的AI创业成功故事',
            image: '/images/illustrations/case-studies.svg',
            tag: 'case-study',
            highlights: ['真实案例', '月入过万', '成功经验']
        },
        {
            id: 4,
            title: '工具速查手册',
            description: '50+必备AI工具清单及使用指南',
            image: '/images/illustrations/tools-handbook.svg',
            tag: 'ai-tools',
            highlights: ['50+工具', '使用指南', '随时查阅']
        }
    ]

    const handleResourceSelect = (resourceId: number) => {
        setSelectedResource(selectedResource === resourceId ? null : resourceId)
    }

    return (
        <section className="free-resources-grid">
            <Container size="xl">
                <div className="resources-content">
                    {/* 区域标题 */}
                    <div className="section-header">
                        <h2 className="section-title">
                            免费资源展示
                        </h2>
                        <p className="section-subtitle">
                            立即订阅邮箱，获取这4份高价值AI变现指南
                        </p>
                    </div>

                    {/* 资源网格 */}
                    <div className="resources-grid">
                        {resources.map((resource) => (
                            <div
                                key={resource.id}
                                className={`resource-card ${
                                    selectedResource === resource.id ? 'selected' : ''
                                }`}
                                onClick={() => handleResourceSelect(resource.id)}
                            >
                                {/* 资源图片 */}
                                <div className="resource-image">
                                    <div
                                        className="image-placeholder"
                                        style={{
                                            backgroundImage: `url(${resource.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                </div>

                                {/* 标签 */}
                                <div className="resource-tag">
                                    <Tag tag={resource.tag} size="sm" />
                                </div>

                                {/* 内容区域 */}
                                <div className="resource-content">
                                    <h3 className="resource-title">
                                        {resource.title}
                                    </h3>
                                    
                                    <p className="resource-description">
                                        {resource.description}
                                    </p>
                                    
                                    {/* 特色亮点 */}
                                    <div className="resource-highlights">
                                        {resource.highlights.map((highlight, index) => (
                                            <span key={index} className="highlight-item">
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 获取按钮 */}
                                <div className="resource-action">
                                    <GradientButton
                                        size="sm"
                                        className="get-resource-btn"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            // 滚动到邮箱订阅区域
                                            document.querySelector('.email-subscription-section')?.scrollIntoView({
                                                behavior: 'smooth'
                                            })
                                        }}
                                    >
                                        立即获取
                                    </GradientButton>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 邮箱订阅引导 */}
                    <div className="email-subscription-section">
                        <div className="subscription-header">
                            <h3 className="subscription-title">
                                订阅邮箱即可获取全部资源
                            </h3>
                            <p className="subscription-description">
                                订阅成功后，我们会立即通过邮件发送所有免费资源给您
                            </p>
                        </div>

                        <EmailSubscribeForm className="resources-email-form" />

                        <div className="subscription-note">
                            <p>📧 订阅后立即发送 | 🔒 绝不泄露您的邮箱 | ✅ 随时可以取消订阅</p>
                        </div>
                    </div>
                </div>
            </Container>

            {/* 移动端专用样式 */}
            <style jsx>{`
                .free-resources-grid {
                    width: 100%;
                    padding: 60px 0;
                    background: var(--color-bg-primary);
                }

                .resources-content {
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

                .resources-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                    width: 100%;
                    max-width: 400px;
                }

                .resource-card {
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border-primary);
                    border-radius: 12px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    min-height: 200px;
                }

                .resource-card:hover,
                .resource-card.selected {
                    border-color: var(--color-primary-blue);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
                }

                .resource-image {
                    width: 100%;
                    height: 60px;
                    border-radius: 8px;
                    overflow: hidden;
                    background: var(--color-bg-glass);
                    border: 1px solid var(--color-border-glass);
                }

                .image-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, 
                        var(--color-primary-blue) 0%, 
                        var(--color-primary-purple) 100%);
                    opacity: 0.8;
                }

                .resource-tag {
                    display: flex;
                    justify-content: flex-start;
                }

                .resource-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .resource-title {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0;
                    line-height: 1.3;
                }

                .resource-description {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                    margin: 0;
                    line-height: 1.4;
                    flex: 1;
                }

                .resource-highlights {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                }

                .highlight-item {
                    font-size: var(--font-size-xs);
                    color: var(--color-primary-blue);
                    background: rgba(59, 130, 246, 0.1);
                    padding: 2px 6px;
                    border-radius: 4px;
                    line-height: 1.2;
                }

                .resource-action {
                    margin-top: auto;
                }

                .get-resource-btn {
                    width: 100%;
                    font-size: var(--font-size-xs) !important;
                    padding: 8px 12px !important;
                }

                .email-subscription-section {
                    width: 100%;
                    max-width: 400px;
                    background: var(--color-bg-glass);
                    border: 1px solid var(--color-border-glass);
                    border-radius: 16px;
                    padding: 24px;
                    backdrop-filter: blur(12px);
                    text-align: center;
                }

                .subscription-header {
                    margin-bottom: 20px;
                }

                .subscription-title {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 8px 0;
                    line-height: 1.3;
                }

                .subscription-description {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    margin: 0;
                    line-height: 1.4;
                }

                .resources-email-form {
                    margin: 16px 0;
                }

                .subscription-note {
                    margin-top: 16px;
                }

                .subscription-note p {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                    margin: 0;
                    line-height: 1.4;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .free-resources-grid {
                        padding: 40px 0;
                    }

                    .resources-content {
                        gap: 32px;
                        padding: 0 16px;
                    }

                    .section-title {
                        font-size: var(--font-size-xl);
                    }

                    .section-subtitle {
                        font-size: var(--font-size-sm);
                    }

                    .resources-grid {
                        max-width: 100%;
                        gap: 12px;
                    }

                    .resource-card {
                        padding: 12px;
                        gap: 10px;
                        min-height: 180px;
                    }

                    .resource-image {
                        height: 50px;
                    }

                    .email-subscription-section {
                        max-width: 100%;
                        padding: 20px;
                    }
                }

                /* 超小屏幕优化 */
                @media (max-width: 480px) {
                    .resources-grid {
                        grid-template-columns: 1fr;
                        gap: 10px;
                    }

                    .resource-card {
                        min-height: 160px;
                    }

                    .subscription-title {
                        font-size: var(--font-size-base);
                    }

                    .subscription-description {
                        font-size: var(--font-size-xs);
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .resource-card {
                        touch-action: manipulation;
                    }

                    .resource-card:active {
                        transform: scale(0.98);
                    }

                    .get-resource-btn:active {
                        transform: scale(0.95);
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .section-title,
                    .resource-title,
                    .subscription-title {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            `}</style>
        </section>
    )
}