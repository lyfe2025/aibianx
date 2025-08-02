'use client'

import { useRef } from 'react'
import { Container, GradientText, useToast } from '@/components/ui'
import { EmailSubscribeForm } from '@/components/molecules'
import { useSubtitleColorFix } from '@/lib/hooks'

/**
 * 移动端发现页面英雄区域组件 - DiscoverHeroSection
 * 
 * 专为移动端优化的英雄区域，专注邮箱订阅转化
 * 基于现有HeroSectionNew的成功文案，但针对移动端重新设计
 * 
 * 设计目标：
 * - 免费资源获取的价值感知
 * - 简洁明了的邮箱订阅流程
 * - 移动端友好的触控体验
 * - 社会证明增强信任度
 */
export function DiscoverHeroSection() {
    const titleRef = useRef<HTMLDivElement>(null)
    const subtitleRef = useRef<HTMLDivElement>(null)
    const { toasts, removeToast } = useToast()

    // 使用现有的颜色修复Hook
    useSubtitleColorFix(titleRef, subtitleRef)

    return (
        <section className="discover-hero-section">
            <Container size="xl">
                <div className="discover-hero-content">
                    {/* 主标题 - 专注免费资源价值 */}
                    <div
                        ref={titleRef}
                        className="discover-hero-title"
                    >
                        <GradientText
                            size="4xl"
                            weight="bold"
                            className="discover-title-text"
                        >
                            免费获取AI变现指南
                        </GradientText>
                    </div>

                    {/* 副标题 - 强化价值主张 */}
                    <div
                        ref={subtitleRef}
                        className="discover-hero-subtitle"
                    >
                        立即获取这些高质量的AI变现指南，加速你的成功之路
                    </div>

                    {/* 社会证明 - 增强信任度 */}
                    <div className="discover-social-proof">
                        <div className="subscriber-count">
                            <span className="count-number">28,450+</span>
                            <span className="count-text">创业者已订阅并开始变现之路</span>
                        </div>
                    </div>

                    {/* 邮箱订阅表单 - 核心转化组件 */}
                    <div className="discover-email-section">
                        <EmailSubscribeForm className="discover-email-form" />
                    </div>

                    {/* 价值承诺 - 快速展示核心价值 */}
                    <div className="discover-value-preview">
                        <div className="value-item">
                            ✓ 10种经过验证的AI赚钱模式
                        </div>
                        <div className="value-item">
                            ✓ 5个月入过万的创业成功故事
                        </div>
                        <div className="value-item">
                            ✓ 50+必备AI工具清单及使用指南
                        </div>
                    </div>
                </div>
            </Container>

            {/* 移动端专用样式 */}
            <style jsx>{`
                .discover-hero-section {
                    width: 100%;
                    min-height: 100vh;
                    background: var(--color-bg-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 0;
                    position: relative;
                }

                .discover-hero-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 24px;
                    max-width: 100%;
                }

                .discover-hero-title {
                    margin-bottom: 8px;
                }

                .discover-title-text {
                    line-height: 1.2;
                    margin: 0;
                }

                .discover-hero-subtitle {
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-lg);
                    line-height: 1.5;
                    max-width: 480px;
                    margin: 0 auto;
                }

                .discover-social-proof {
                    margin: 16px 0;
                }

                .subscriber-count {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                }

                .count-number {
                    font-size: var(--font-size-2xl);
                    font-weight: bold;
                    color: var(--color-primary-blue);
                }

                .count-text {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-muted);
                }

                .discover-email-section {
                    width: 100%;
                    max-width: 400px;
                    margin: 8px 0;
                }

                .discover-value-preview {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-top: 16px;
                    max-width: 320px;
                }

                .value-item {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                    text-align: left;
                    padding: 4px 0;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .discover-hero-section {
                        min-height: 80vh;
                        padding: 40px 0;
                    }

                    .discover-hero-content {
                        gap: 20px;
                        padding: 0 16px;
                    }

                    .discover-title-text {
                        font-size: var(--font-size-3xl) !important;
                    }

                    .discover-hero-subtitle {
                        font-size: var(--font-size-md);
                        max-width: 320px;
                    }

                    .count-number {
                        font-size: var(--font-size-xl);
                    }

                    .discover-email-section {
                        max-width: 100%;
                    }

                    .discover-value-preview {
                        max-width: 280px;
                    }
                }

                /* 超小屏幕优化 */
                @media (max-width: 480px) {
                    .discover-hero-content {
                        gap: 16px;
                    }

                    .discover-title-text {
                        font-size: var(--font-size-2xl) !important;
                    }

                    .discover-hero-subtitle {
                        font-size: var(--font-size-base);
                        max-width: 260px;
                    }

                    .subscriber-count {
                        flex-direction: row;
                        gap: 8px;
                        flex-wrap: wrap;
                        justify-content: center;
                    }

                    .count-number {
                        font-size: var(--font-size-lg);
                    }

                    .count-text {
                        font-size: var(--font-size-xs);
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .discover-hero-section {
                        touch-action: manipulation;
                    }

                    .value-item {
                        padding: 8px 0;
                        user-select: none;
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .discover-hero-title,
                    .discover-hero-subtitle {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            `}</style>
        </section>
    )
}