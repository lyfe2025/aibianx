'use client'

import { useState } from 'react'
import { GradientButton } from '@/components/ui'
import Link from 'next/link'

/**
 * 移动端会员预览组件 - MemberPreview
 * 
 * 专为移动端设计的会员专享内容预览
 * 向免费用户展示会员价值，促进升级转化
 * 
 * 设计目标：
 * - 吸引人的会员专享内容预览
 * - 清晰的会员权益对比
 * - 强力的升级转化引导
 * - 移动端优化的用户体验
 */

interface MemberPreviewContent {
    id: string
    title: string
    description: string
    type: 'article' | 'resource' | 'course' | 'tool'
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    estimatedTime: string
    value: string
    preview: string
}

interface MemberBenefit {
    icon: string
    title: string
    description: string
    isPremium: boolean
}

interface MemberPreviewProps {
    className?: string
    showDetailedBenefits?: boolean
    variant?: 'compact' | 'detailed'
}

export function MemberPreview({ 
    className = '', 
    showDetailedBenefits = true,
    variant = 'detailed' 
}: MemberPreviewProps) {
    const [activeTab, setActiveTab] = useState<'content' | 'benefits'>('content')

    // 会员专享内容预览
    const previewContent: MemberPreviewContent[] = [
        {
            id: '1',
            title: 'AI变现实战案例深度解析',
            description: '从0到月入10万的完整复盘，包含具体操作步骤和避坑指南',
            type: 'article',
            difficulty: 'intermediate',
            estimatedTime: '25分钟',
            value: '¥199',
            preview: '揭秘如何通过AI工具批量生成高质量内容，实现自动化营销...'
        },
        {
            id: '2',
            title: '独家AI工具资源包',
            description: '100+精选AI工具合集，包含使用教程和最佳实践',
            type: 'resource',
            difficulty: 'beginner',
            estimatedTime: '5小时',
            value: '¥299',
            preview: '包含GPT-4 API优化技巧、Midjourney进阶指令、Claude应用场景...'
        },
        {
            id: '3',
            title: '1对1创业指导服务',
            description: '资深AI创业导师在线答疑，个性化成长路径规划',
            type: 'course',
            difficulty: 'advanced',
            estimatedTime: '60分钟',
            value: '¥599',
            preview: '针对您的具体情况制定专属的AI变现策略，解答遇到的实际问题...'
        }
    ]

    // 会员权益对比
    const memberBenefits: MemberBenefit[] = [
        {
            icon: '📚',
            title: '无限制阅读',
            description: '畅读所有会员专享文章和深度案例',
            isPremium: true
        },
        {
            icon: '🔧',
            title: '独家工具包',
            description: '获得价值超过1000元的AI工具资源包',
            isPremium: true
        },
        {
            icon: '👨‍🏫',
            title: '专家指导',
            description: '每月1次1对1创业指导，加速成长',
            isPremium: true
        },
        {
            icon: '⚡',
            title: '优先更新',
            description: '第一时间获得最新AI工具和变现机会',
            isPremium: true
        },
        {
            icon: '💬',
            title: '会员社群',
            description: '加入500+AI创业者专属交流群',
            isPremium: true
        },
        {
            icon: '📖',
            title: '基础内容',
            description: '免费的入门指南和基础教程',
            isPremium: false
        }
    ]

    const handleContentClick = (content: MemberPreviewContent) => {
        // 模拟点击事件，显示升级提示
        alert(`这是会员专享内容"${content.title}"，升级会员即可完整阅读！`)
    }

    return (
        <div className={`member-preview ${variant} ${className}`}>
            {variant === 'detailed' && (
                <>
                    {/* 标题区域 */}
                    <div className="preview-header">
                        <h2 className="preview-title">
                            会员专享预览
                        </h2>
                        <p className="preview-subtitle">
                            升级解锁所有高价值内容
                        </p>
                    </div>

                    {/* 标签导航 */}
                    <div className="tab-navigation">
                        <button
                            className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                            onClick={() => setActiveTab('content')}
                        >
                            专享内容
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
                            onClick={() => setActiveTab('benefits')}
                        >
                            会员权益
                        </button>
                    </div>
                </>
            )}

            {/* 内容区域 */}
            <div className="preview-content">
                {(activeTab === 'content' || variant === 'compact') && (
                    <div className="content-section">
                        <div className="content-grid">
                            {previewContent.map((content) => (
                                <div
                                    key={content.id}
                                    className="content-card"
                                    onClick={() => handleContentClick(content)}
                                >
                                    <div className="content-header">
                                        <div className="content-meta">
                                            <span className="content-type">
                                                {content.type === 'article' ? '📄 文章' : 
                                                 content.type === 'resource' ? '📦 资源' : 
                                                 content.type === 'course' ? '🎓 课程' : '🔧 工具'}
                                            </span>
                                            <span className="content-value">
                                                价值 {content.value}
                                            </span>
                                        </div>
                                        <div className="content-lock">
                                            🔒
                                        </div>
                                    </div>
                                    
                                    <h3 className="content-title">
                                        {content.title}
                                    </h3>
                                    
                                    <p className="content-description">
                                        {content.description}
                                    </p>
                                    
                                    <div className="content-preview">
                                        <p className="preview-text">
                                            {content.preview}
                                        </p>
                                        <div className="preview-blur" />
                                    </div>
                                    
                                    <div className="content-footer">
                                        <div className="content-info">
                                            <span className="content-time">
                                                ⏱️ {content.estimatedTime}
                                            </span>
                                            <span className="content-difficulty">
                                                {content.difficulty === 'beginner' ? '🟢 入门' :
                                                 content.difficulty === 'intermediate' ? '🟡 进阶' : '🔴 高级'}
                                            </span>
                                        </div>
                                        
                                        <button className="unlock-btn">
                                            解锁阅读
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'benefits' && variant === 'detailed' && (
                    <div className="benefits-section">
                        <div className="benefits-comparison">
                            <div className="comparison-header">
                                <h3 className="comparison-title">
                                    会员权益对比
                                </h3>
                                <p className="comparison-subtitle">
                                    免费 vs 会员的差别
                                </p>
                            </div>
                            
                            <div className="benefits-grid">
                                {memberBenefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className={`benefit-item ${benefit.isPremium ? 'premium' : 'free'}`}
                                    >
                                        <div className="benefit-icon">
                                            {benefit.icon}
                                        </div>
                                        <div className="benefit-content">
                                            <h4 className="benefit-title">
                                                {benefit.title}
                                                {benefit.isPremium && (
                                                    <span className="premium-badge">
                                                        会员专享
                                                    </span>
                                                )}
                                            </h4>
                                            <p className="benefit-description">
                                                {benefit.description}
                                            </p>
                                        </div>
                                        <div className="benefit-status">
                                            {benefit.isPremium ? (
                                                <span className="status-premium">🔒</span>
                                            ) : (
                                                <span className="status-free">✅</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 升级按钮 */}
            <div className="upgrade-section">
                <div className="upgrade-stats">
                    <div className="stat-item">
                        <span className="stat-number">2,845+</span>
                        <span className="stat-label">会员用户</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">专享内容</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">¥1000+</span>
                        <span className="stat-label">价值资源</span>
                    </div>
                </div>
                
                <Link href="/membership">
                    <GradientButton size="lg" className="upgrade-cta">
                        立即升级会员
                    </GradientButton>
                </Link>
                
                <p className="upgrade-guarantee">
                    💰 30天无理由退款保障
                </p>
            </div>

            {/* 移动端专用样式 */}
            <style jsx>{`
                .member-preview {
                    width: 100%;
                    background: var(--color-bg-primary);
                    border-radius: 16px;
                    overflow: hidden;
                }

                .member-preview.compact {
                    padding: 20px;
                }

                .member-preview.detailed {
                    padding: 0;
                }

                /* 标题区域 */
                .preview-header {
                    padding: 24px 20px;
                    background: linear-gradient(135deg, 
                        var(--color-primary-blue) 0%, 
                        var(--color-primary-purple) 100%);
                    color: white;
                    text-align: center;
                }

                .preview-title {
                    font-size: var(--font-size-xl);
                    font-weight: bold;
                    margin: 0 0 8px 0;
                    line-height: 1.3;
                }

                .preview-subtitle {
                    font-size: var(--font-size-sm);
                    opacity: 0.9;
                    margin: 0;
                    line-height: 1.4;
                }

                /* 标签导航 */
                .tab-navigation {
                    display: flex;
                    background: var(--color-bg-secondary);
                    border-bottom: 1px solid var(--color-border-primary);
                }

                .tab-btn {
                    flex: 1;
                    padding: 16px;
                    background: transparent;
                    border: none;
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .tab-btn.active {
                    color: var(--color-primary-blue);
                    background: var(--color-bg-primary);
                }

                .tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: var(--color-primary-blue);
                }

                /* 内容区域 */
                .preview-content {
                    padding: 20px;
                }

                /* 内容网格 */
                .content-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .content-card {
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border-primary);
                    border-radius: 12px;
                    padding: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .content-card:hover {
                    border-color: var(--color-primary-blue);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
                }

                .content-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .content-meta {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .content-type {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                    background: var(--color-bg-glass);
                    padding: 4px 8px;
                    border-radius: 12px;
                    border: 1px solid var(--color-border-glass);
                }

                .content-value {
                    font-size: var(--font-size-xs);
                    color: var(--color-primary-blue);
                    font-weight: 600;
                }

                .content-lock {
                    font-size: 18px;
                    opacity: 0.7;
                }

                .content-title {
                    font-size: var(--font-size-base);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 8px 0;
                    line-height: 1.4;
                }

                .content-description {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    margin: 0 0 12px 0;
                    line-height: 1.5;
                }

                .content-preview {
                    position: relative;
                    margin-bottom: 16px;
                }

                .preview-text {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    line-height: 1.5;
                    margin: 0;
                    position: relative;
                    z-index: 1;
                }

                .preview-blur {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 50%;
                    background: linear-gradient(transparent, var(--color-bg-secondary));
                    pointer-events: none;
                }

                .content-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                }

                .content-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    flex: 1;
                }

                .content-time,
                .content-difficulty {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                }

                .unlock-btn {
                    background: linear-gradient(135deg, 
                        var(--color-primary-blue) 0%, 
                        var(--color-primary-purple) 100%);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .unlock-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }

                /* 权益对比 */
                .comparison-header {
                    text-align: center;
                    margin-bottom: 20px;
                }

                .comparison-title {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 8px 0;
                }

                .comparison-subtitle {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    margin: 0;
                }

                .benefits-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .benefit-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                }

                .benefit-item.premium {
                    background: rgba(59, 130, 246, 0.05);
                    border: 1px solid rgba(59, 130, 246, 0.2);
                }

                .benefit-item.free {
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border-primary);
                }

                .benefit-icon {
                    font-size: 24px;
                    flex-shrink: 0;
                }

                .benefit-content {
                    flex: 1;
                    min-width: 0;
                }

                .benefit-title {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 4px 0;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .premium-badge {
                    font-size: var(--font-size-xs);
                    background: linear-gradient(135deg, 
                        var(--color-primary-blue) 0%, 
                        var(--color-primary-purple) 100%);
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 500;
                }

                .benefit-description {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                    margin: 0;
                    line-height: 1.4;
                }

                .benefit-status {
                    flex-shrink: 0;
                    font-size: 16px;
                }

                .status-premium {
                    opacity: 0.7;
                }

                .status-free {
                    color: #10B981;
                }

                /* 升级区域 */
                .upgrade-section {
                    padding: 24px 20px;
                    background: var(--color-bg-glass);
                    border-top: 1px solid var(--color-border-glass);
                    text-align: center;
                    backdrop-filter: blur(12px);
                }

                .upgrade-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .stat-number {
                    font-size: var(--font-size-lg);
                    font-weight: bold;
                    color: var(--color-primary-blue);
                    line-height: 1.2;
                }

                .stat-label {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                    line-height: 1.2;
                }

                .upgrade-cta {
                    width: 100%;
                    margin-bottom: 12px;
                }

                .upgrade-guarantee {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                    margin: 0;
                    line-height: 1.4;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .preview-header {
                        padding: 20px 16px;
                    }

                    .preview-content {
                        padding: 16px;
                    }

                    .content-card {
                        padding: 14px;
                    }

                    .content-title {
                        font-size: var(--font-size-sm);
                    }

                    .upgrade-section {
                        padding: 20px 16px;
                    }

                    .upgrade-stats {
                        gap: 16px;
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .content-card,
                    .tab-btn {
                        touch-action: manipulation;
                    }

                    .content-card:active {
                        transform: scale(0.98);
                    }
                }
            `}</style>
        </div>
    )
}