'use client'

import { useState } from 'react'
import { Container, GradientButton } from '@/components/ui'

/**
 * 移动端用户成功见证组件 - UserSuccessStories
 * 
 * 专为移动端优化的成功案例展示，增强信任度和转化率
 * 通过真实用户故事建立社会证明，激发用户行动
 * 
 * 设计目标：
 * - 展示真实的成功案例和收入数据
 * - 建立强烈的社会证明
 * - 激发用户的变现渴望
 * - 移动端友好的卡片轮播设计
 */

interface SuccessStory {
    id: number
    name: string
    avatar: string
    occupation: string
    timeframe: string
    income: string
    story: string
    highlight: string
    tags: string[]
}

export function UserSuccessStories() {
    const [currentStory, setCurrentStory] = useState(0)

    // 成功案例数据 - 基于优化方案中的用户见证
    const stories: SuccessStory[] = [
        {
            id: 1,
            name: '张明',
            avatar: '/images/avatars/user-1.jpg',
            occupation: '程序员',
            timeframe: '3个月',
            income: '月入5万',
            story: '通过AI写作工具和自动化脚本，我成功将副业收入提升到主业的3倍。现在每天只需2小时就能维持稳定收入。',
            highlight: '收入增长300%',
            tags: ['AI写作', '自动化', '副业']
        },
        {
            id: 2,
            name: '李小雨',
            avatar: '/images/avatars/user-2.jpg',
            occupation: '设计师',
            timeframe: '2个月',
            income: '月入3万',
            story: '学会使用AI设计工具后，我的工作效率提升了10倍，客户项目周期缩短一半，收费却提高了80%。',
            highlight: '效率提升10倍',
            tags: ['AI设计', '效率提升', '涨价']
        },
        {
            id: 3,
            name: '王创业',
            avatar: '/images/avatars/user-3.jpg',
            occupation: '电商老板',
            timeframe: '4个月',
            income: '月入8万',
            story: '用AI做商品文案和客服，店铺转化率提升60%，客服成本降低70%，现在是真正的躺赚模式。',
            highlight: '转化率提升60%',
            tags: ['电商AI', '文案生成', '客服自动化']
        },
        {
            id: 4,
            name: '陈老师',
            avatar: '/images/avatars/user-4.jpg',
            occupation: '教育工作者',
            timeframe: '3个月',
            income: '月入4万',
            story: '通过AI课程制作和在线教学，我的教育事业从线下转到线上，学生数量增长了5倍，收入翻了3倍。',
            highlight: '学生数量增长5倍',
            tags: ['在线教育', 'AI制作', '规模化']
        }
    ]

    const nextStory = () => {
        setCurrentStory((prev) => (prev + 1) % stories.length)
    }

    const prevStory = () => {
        setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length)
    }

    const currentData = stories[currentStory]

    return (
        <section className="user-success-stories">
            <Container size="xl">
                <div className="stories-content">
                    {/* 区域标题 */}
                    <div className="section-header">
                        <h2 className="section-title">
                            真实用户成功案例
                        </h2>
                        <p className="section-subtitle">
                            已有28,450+用户通过AI变现实现财务自由
                        </p>
                    </div>

                    {/* 成功案例展示卡片 */}
                    <div className="story-card">
                        {/* 用户信息 */}
                        <div className="user-info">
                            <div className="user-avatar">
                                <div className="avatar-placeholder">
                                    {currentData.name.charAt(0)}
                                </div>
                            </div>
                            
                            <div className="user-details">
                                <h3 className="user-name">
                                    {currentData.name}
                                </h3>
                                <p className="user-occupation">
                                    {currentData.occupation}
                                </p>
                            </div>

                            <div className="income-badge">
                                {currentData.income}
                            </div>
                        </div>

                        {/* 成功亮点 */}
                        <div className="success-highlight">
                            <div className="highlight-text">
                                {currentData.highlight}
                            </div>
                            <div className="timeframe">
                                仅用{currentData.timeframe}时间
                            </div>
                        </div>

                        {/* 成功故事 */}
                        <div className="success-story">
                            <p className="story-text">
                                "{currentData.story}"
                            </p>
                        </div>

                        {/* 技能标签 */}
                        <div className="skill-tags">
                            {currentData.tags.map((tag, index) => (
                                <span key={index} className="skill-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* 导航控制 */}
                        <div className="story-navigation">
                            <button
                                className="nav-button prev"
                                onClick={prevStory}
                                aria-label="上一个案例"
                            >
                                ‹
                            </button>
                            
                            <div className="story-indicators">
                                {stories.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`indicator ${index === currentStory ? 'active' : ''}`}
                                        onClick={() => setCurrentStory(index)}
                                        aria-label={`查看案例 ${index + 1}`}
                                    />
                                ))}
                            </div>
                            
                            <button
                                className="nav-button next"
                                onClick={nextStory}
                                aria-label="下一个案例"
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    {/* 行动召唤 */}
                    <div className="stories-cta">
                        <div className="cta-text">
                            <h3 className="cta-title">
                                你也想成为成功案例吗？
                            </h3>
                            <p className="cta-description">
                                立即订阅，获取同样的变现指南和工具
                            </p>
                        </div>
                        
                        <GradientButton
                            size="lg"
                            className="stories-cta-btn"
                            onClick={() => {
                                // 滚动到邮箱订阅区域
                                document.querySelector('.email-subscription-section')?.scrollIntoView({
                                    behavior: 'smooth'
                                })
                            }}
                        >
                            立即免费获取
                        </GradientButton>
                    </div>
                </div>
            </Container>

            {/* 移动端专用样式 */}
            <style jsx>{`
                .user-success-stories {
                    width: 100%;
                    padding: 60px 0;
                    background: var(--color-bg-primary);
                }

                .stories-content {
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

                .story-card {
                    width: 100%;
                    max-width: 380px;
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border-primary);
                    border-radius: 16px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .story-card:hover {
                    border-color: var(--color-primary-blue);
                    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .user-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    overflow: hidden;
                    background: linear-gradient(135deg, 
                        var(--color-primary-blue) 0%, 
                        var(--color-primary-purple) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .avatar-placeholder {
                    color: white;
                    font-size: var(--font-size-lg);
                    font-weight: bold;
                }

                .user-details {
                    flex: 1;
                }

                .user-name {
                    font-size: var(--font-size-base);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 4px 0;
                    line-height: 1.2;
                }

                .user-occupation {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    margin: 0;
                    line-height: 1.2;
                }

                .income-badge {
                    background: linear-gradient(135deg, 
                        var(--color-primary-blue) 0%, 
                        var(--color-primary-purple) 100%);
                    color: white;
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    padding: 6px 12px;
                    border-radius: 20px;
                    white-space: nowrap;
                }

                .success-highlight {
                    text-align: center;
                    padding: 16px;
                    background: var(--color-bg-glass);
                    border: 1px solid var(--color-border-glass);
                    border-radius: 12px;
                    backdrop-filter: blur(12px);
                }

                .highlight-text {
                    font-size: var(--font-size-lg);
                    font-weight: bold;
                    color: var(--color-primary-blue);
                    margin-bottom: 4px;
                }

                .timeframe {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                }

                .success-story {
                    padding: 0 8px;
                }

                .story-text {
                    font-size: var(--font-size-base);
                    color: var(--color-text-primary);
                    line-height: 1.6;
                    margin: 0;
                    font-style: italic;
                }

                .skill-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .skill-tag {
                    font-size: var(--font-size-xs);
                    color: var(--color-primary-blue);
                    background: rgba(59, 130, 246, 0.1);
                    padding: 4px 8px;
                    border-radius: 6px;
                    line-height: 1.2;
                }

                .story-navigation {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 8px;
                }

                .nav-button {
                    width: 36px;
                    height: 36px;
                    border: 1px solid var(--color-border-primary);
                    background: var(--color-bg-primary);
                    color: var(--color-text-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font-size-lg);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .nav-button:hover {
                    border-color: var(--color-primary-blue);
                    background: var(--color-primary-blue);
                    color: white;
                }

                .story-indicators {
                    display: flex;
                    gap: 8px;
                }

                .indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    border: none;
                    background: var(--color-border-primary);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .indicator.active {
                    background: var(--color-primary-blue);
                    transform: scale(1.2);
                }

                .stories-cta {
                    text-align: center;
                    max-width: 360px;
                    padding: 24px;
                    background: var(--color-bg-glass);
                    border: 1px solid var(--color-border-glass);
                    border-radius: 16px;
                    backdrop-filter: blur(12px);
                }

                .cta-title {
                    font-size: var(--font-size-lg);
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0 0 8px 0;
                    line-height: 1.3;
                }

                .cta-description {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    margin: 0 0 20px 0;
                    line-height: 1.4;
                }

                .stories-cta-btn {
                    width: 100%;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .user-success-stories {
                        padding: 40px 0;
                    }

                    .stories-content {
                        gap: 32px;
                        padding: 0 16px;
                    }

                    .section-title {
                        font-size: var(--font-size-xl);
                    }

                    .section-subtitle {
                        font-size: var(--font-size-sm);
                    }

                    .story-card {
                        max-width: 100%;
                        padding: 20px;
                        gap: 16px;
                    }

                    .stories-cta {
                        max-width: 100%;
                        padding: 20px;
                    }
                }

                /* 超小屏幕优化 */
                @media (max-width: 480px) {
                    .story-card {
                        padding: 16px;
                    }

                    .user-avatar {
                        width: 40px;
                        height: 40px;
                    }

                    .user-name {
                        font-size: var(--font-size-sm);
                    }

                    .income-badge {
                        font-size: var(--font-size-xs);
                        padding: 4px 8px;
                    }

                    .story-text {
                        font-size: var(--font-size-sm);
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .story-card,
                    .nav-button,
                    .indicator,
                    .stories-cta-btn {
                        touch-action: manipulation;
                    }

                    .nav-button:active {
                        transform: scale(0.95);
                    }

                    .stories-cta-btn:active {
                        transform: scale(0.98);
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .section-title,
                    .user-name,
                    .cta-title {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            `}</style>
        </section>
    )
}