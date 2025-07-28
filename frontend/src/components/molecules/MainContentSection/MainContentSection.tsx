'use client'

import { Container } from '@/components/ui'
import { ArticleList, WhyChooseCard, UserTestimonialCard, EmailSubscriptionCard } from '@/components/molecules'

/**
 * 主要内容区块组件 - MainContentSection (重构版)
 * 
 * 采用组件化架构：
 * - 左侧：ArticleList 组件
 * - 右侧：WhyChooseCard + UserTestimonialCard + EmailSubscriptionCard 组件
 * 
 * 重构优势：
 * - 符合单一职责原则
 * - 组件可复用
 * - 易于维护和测试
 * - 减少文件体积 (从989行减少到约50行)
 */
export function MainContentSection() {
    return (
        <section style={{
            paddingTop: '24px !important',
            paddingBottom: '32px !important',
            background: 'transparent'
        }}>
            <Container size="xl">
                <div className="main-content-layout" style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {/* 左侧文章列表区域 */}
                    <ArticleList />

                    {/* 右侧侧边栏 */}
                    <div className="main-content-sidebar" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '410px',
                        height: '100%',
                        alignSelf: 'stretch'
                    }}>
                        <WhyChooseCard />
                        <UserTestimonialCard />
                        <EmailSubscriptionCard />
                    </div>
                </div>

                {/* 移动端响应式样式 */}
                <style jsx>{`
                    /* 平板端适配 (768px - 1023px) */
                    @media (max-width: 1023px) {
                        .main-content-layout {
                            flex-direction: column !important;
                            align-items: center !important;
                            gap: 32px !important;
                        }
                        
                        .main-content-sidebar {
                            width: 100% !important;
                            max-width: 500px !important;
                        }
                    }
                    
                    /* 移动端适配 (767px及以下) */
                    @media (max-width: 767px) {
                        .main-content-sidebar {
                            max-width: 100% !important;
                            margin: 0 16px !important;
                        }
                    }
                    
                    /* 超小屏幕适配 (480px及以下) */
                    @media (max-width: 480px) {
                        .main-content-sidebar {
                            margin: 0 8px !important;
                        }
                    }
                `}</style>
            </Container>
        </section>
    )
} 