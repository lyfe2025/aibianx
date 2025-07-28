'use client'

import { useRef } from 'react'
import { Container, GradientText, BackgroundDecoration, HeroBackground3D, AIBrainModel, ToastContainer, useToast } from '@/components/ui'
import { EmailSubscribeForm } from '@/components/molecules'
import { useSubtitleColorFix } from '@/lib/hooks'
import { HERO_CONTENT, HERO_STYLES, HERO_ANIMATIONS } from '@/constants/heroSection'

/**
 * 新版英雄区块组件 - HeroSectionNew (重构版)
 * 
 * 采用组件化架构：
 * - 数据配置：从constants/heroSection.ts导入
 * - 副标题修复：使用useSubtitleColorFix Hook
 * - 邮箱订阅：使用EmailSubscribeForm组件
 * - 3D模型：AIBrainModel组件
 * 
 * 重构优势：
 * - 符合单一职责原则
 * - 组件可复用
 * - 易于维护和测试
 * - 减少文件体积 (从843行减少到约200行)
 */
export function HeroSectionNew() {
    const subtitle1Ref = useRef<HTMLDivElement>(null)
    const subtitle2Ref = useRef<HTMLDivElement>(null)
    const { toasts, removeToast } = useToast()

    // 使用自定义Hook修复副标题颜色问题
    useSubtitleColorFix(subtitle1Ref, subtitle2Ref)

    return (
        <section style={HERO_STYLES.section}>
            {/* 背景装饰 */}
            <BackgroundDecoration />
            <HeroBackground3D />

            <Container size="xl">
                <div
                    className="hero-content-container"
                    style={HERO_STYLES.contentContainer}
                >
                    {/* 主标题 */}
                    <GradientText
                        size="8xl"
                        weight="bold"
                        className="hero-main-title hero-title-animation"
                    >
                        {HERO_CONTENT.mainTitle}
                    </GradientText>

                    {/* 第一行副标题 */}
                    <div
                        ref={subtitle1Ref}
                        className={`hero-subtitle-1 ${HERO_ANIMATIONS.fadeInUp.subtitleClass}`}
                        style={{
                            ...HERO_STYLES.subtitle,
                            animation: 'fadeInUp 1s ease-out 0.2s both'
                        }}
                    >
                        {HERO_CONTENT.subtitle1}
                    </div>

                    {/* 第二行副标题 */}
                    <div
                        ref={subtitle2Ref}
                        className={`hero-subtitle-2 ${HERO_ANIMATIONS.fadeInUp.subtitleClass}`}
                        style={{
                            ...HERO_STYLES.subtitle,
                            animation: 'fadeInUp 1s ease-out 0.3s both'
                        }}
                    >
                        {HERO_CONTENT.subtitle2}
                    </div>

                    {/* 邮箱订阅表单 */}
                    <EmailSubscribeForm />
                </div>

                {/* AI神经网络大脑3D模型 */}
                <div
                    className="hero-3d-model"
                    style={HERO_STYLES.modelContainer}
                >
                    <AIBrainModel />
                </div>
            </Container>

            {/* 动画样式 */}
            <style jsx>{`
                ${HERO_ANIMATIONS.fadeInUp.keyframes}

                .hero-title-animation {
                    animation: fadeInUp 1s ease-out;
                    transform: translateZ(0);
                    text-align: center;
                    margin: 0 0 24px 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100%;
                    min-height: 77px;
                }

                .${HERO_ANIMATIONS.fadeInUp.subtitleClass} {
                    animation: fadeInUp 1s ease-out 0.2s both;
                    transform: translateZ(0);
                }

                /* 输入框占位符样式 */
                .hero-email-input-field::placeholder {
                    color: var(--color-text-muted) !important;
                    opacity: 1 !important;
                }

                .hero-email-input-field::-webkit-input-placeholder {
                    color: var(--color-text-muted) !important;
                    opacity: 1 !important;
                }

                .hero-email-input-field::-moz-placeholder {
                    color: var(--color-text-muted) !important;
                    opacity: 1 !important;
                }

                .hero-email-input-field:-ms-input-placeholder {
                    color: var(--color-text-muted) !important;
                    opacity: 1 !important;
                }

                /* 平板端适配 (768px - 1023px) */
                @media (min-width: 768px) and (max-width: 1023px) {
                    section {
                        height: 100vh !important;
                        padding-top: 140px !important;
                        padding-bottom: 60px !important;
                    }
                    
                    .hero-3d-model {
                        bottom: 60px !important;
                        width: 500px !important;
                        height: 150px !important;
                    }
                    
                    .hero-content-container {
                        max-width: 90% !important;
                        padding: 0 24px !important;
                    }
                    
                    .hero-main-title {
                        font-size: 52px !important;
                        line-height: 60px !important;
                        margin-bottom: 16px !important;
                        text-align: center !important;
                        white-space: nowrap !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    }
                    
                    .hero-subtitle-1,
                    .hero-subtitle-2 {
                        font-size: 18px !important;
                        line-height: 26px !important;
                        max-width: 600px !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    
                    .hero-email-form {
                        max-width: 480px !important;
                    }
                    
                    .hero-email-input {
                        min-width: 280px !important;
                    }
                    
                    .hero-3d-model {
                        top: 380px !important;
                        width: 500px !important;
                        height: 150px !important;
                    }
                }

                /* 移动端适配 (小于768px) */
                @media (max-width: 767px) {
                    section {
                        height: 100vh !important;
                        padding-top: 100px !important;
                        padding-bottom: 40px !important;
                    }
                    
                    .hero-3d-model {
                        display: none !important;
                    }
                    
                                        .hero-content-container {
                        gap: 16px !important;
                    }
                      
                      .hero-email-form {
                        max-width: 100% !important;
                        padding: 0 16px !important;
                        padding-top: 24px !important;
                        gap: 20px !important;
                    }
                    
                    .hero-main-title {
                        font-size: 36px !important;
                        line-height: 44px !important;
                        min-height: 44px !important;
                        white-space: normal !important;
                        text-align: center !important;
                        margin-bottom: 20px !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    }
                    
                    .hero-subtitle-1,
                    .hero-subtitle-2 {
                        font-size: 16px !important;
                        line-height: 24px !important;
                        min-height: 24px !important;
                        white-space: normal !important;
                        text-align: center !important;
                        word-wrap: break-word !important;
                        overflow-wrap: break-word !important;
                    }
                    
                    .hero-email-form {
                        flex-direction: column !important;
                        max-width: 100% !important;
                        gap: 12px !important;
                    }
                    
                    .hero-email-input {
                        width: 100% !important;
                        min-width: auto !important;
                        padding: 14px 16px !important;
                        font-size: 16px !important;
                        border-radius: 8px !important;
                    }
                    
                    .hero-subscribe-button {
                        width: 100% !important;
                        padding: 14px 20px !important;
                        font-size: 16px !important;
                        border-radius: 8px !important;
                    }
                    
                    .hero-3d-model {
                        display: none !important;
                    }
                }
                
                /* 超小屏适配 (小于480px) */
                @media (max-width: 480px) {
                    .hero-content-container {
                        padding: 0 12px !important;
                        padding-top: 20px !important;
                    }
                    
                    .hero-main-title {
                        font-size: 28px !important;
                        line-height: 36px !important;
                        min-height: 36px !important;
                        margin-bottom: 16px !important;
                        text-align: center !important;
                        white-space: normal !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    }
                    
                    .hero-subtitle-1,
                    .hero-subtitle-2 {
                        font-size: 14px !important;
                        line-height: 20px !important;
                        min-height: 20px !important;
                    }
                    
                    .hero-email-input {
                        padding: 12px 14px !important;
                        font-size: 14px !important;
                    }
                    
                    .hero-subscribe-button {
                        padding: 12px 16px !important;
                        font-size: 14px !important;
                    }
                }
            `}</style>

            {/* Toast 通知容器 */}
            <ToastContainer
                toasts={toasts}
                onRemoveToast={removeToast}
                position="top-center"
            />
        </section>
    )
} 