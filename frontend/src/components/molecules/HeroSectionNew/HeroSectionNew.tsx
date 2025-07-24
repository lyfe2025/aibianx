'use client'

import { useState } from 'react'
import { Container, GradientButton, GradientText, Input, BackgroundDecoration } from '@/components/ui'

/**
 * 新版英雄区块组件 - HeroSectionNew
 * 
 * 根据设计稿精确还原的英雄区块，包含：
 * - 主标题 "AI变现从这里开始"
 * - 副标题描述
 * - 邮箱订阅表单
 * - 手机/设备展示图
 * - 背景装饰效果
 */
export function HeroSectionNew() {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubscribe = async () => {
        if (!email.trim()) {
            alert('请输入您的邮箱')
            return
        }

        setIsSubmitting(true)

        // 模拟订阅请求
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert(`感谢订阅！我们将向 ${email} 发送最新的AI变现干货`)
            setEmail('')
        } catch (error) {
            alert('订阅失败，请稍后重试')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section style={{
            position: 'relative',
            paddingTop: '135px', // 为固定头部留出空间
            paddingBottom: '64px',
            overflow: 'hidden',
            background: 'var(--color-bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '500px'
        }}>
            {/* 背景装饰 - 设计稿蓝色渐变 */}
            <BackgroundDecoration 
                position="top-left"
                animation={{ type: 'float', duration: '8s' }}
            />

            {/* 右侧装饰效果 - 粉色渐变 */}
            <BackgroundDecoration 
                position="custom"
                customPosition={{
                    top: '300px',
                    right: '-125px'
                }}
                size={{ width: '500px', height: '500px' }}
                gradient={{
                    fromColor: '255, 154, 158',
                    toColor: '254, 207, 239',
                    fromOpacity: 0.15,
                    toOpacity: 0.08
                }}
                blur={80}
                animation={{ type: 'pulse', duration: '6s', delay: '2s' }}
            />

            {/* 主要内容容器 - 修复换行问题，增加宽度 */}
            <div style={{
                width: '800px', // 增加宽度确保中文文字不换行
                maxWidth: '90vw', // 在小屏幕上自适应
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                fontSize: '13.33px',
                fontWeight: '400',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                paddingTop: '42.78px',
                position: 'relative',
                zIndex: 1
            }}>
                {/* 主标题 - 修复换行问题 */}
                <div style={{
                    background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '64px',
                    fontWeight: '700',
                    lineHeight: '76.8px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    whiteSpace: 'nowrap', // 防止换行
                    overflow: 'hidden',
                    marginLeft: '2px',
                    marginRight: '2px',
                    minHeight: '77px',
                    marginBottom: '9.90px' // 替代gap使用margin
                }}>
                    AI变现从这里开始
                </div>

                {/* 第一行副标题 - 修复换行问题 */}
                <div style={{
                    color: '#D1D5DB',
                    fontSize: '20px',
                    lineHeight: '30px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    whiteSpace: 'nowrap', // 防止换行
                    overflow: 'hidden',
                    marginLeft: '9px',
                    marginRight: '9px',
                    minHeight: '30px',
                    marginBottom: '0px' // 与第二行紧密连接
                }}>
                    每周获取独家AI变现策略和工具，助你快速实现财务自由
                </div>

                {/* 第二行副标题 - 修复换行问题 */}
                <div style={{
                    color: '#D1D5DB',
                    fontSize: '20px',
                    lineHeight: '30px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    whiteSpace: 'nowrap', // 防止换行
                    overflow: 'hidden',
                    minHeight: '30px',
                    marginBottom: '40px' // 替代表单的marginTop
                }}>
                    订阅每周精选的AI变现干货，抢占AI红利时代的第一波机会
                </div>

                {/* 邮箱订阅表单 - 修复换行问题 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    justifyContent: 'center' // 居中表单
                }}>
                    {/* 邮箱输入框 - 修复换行问题 */}
                    <div style={{
                        background: 'rgba(18, 18, 18, 0.50)',
                        border: '1px solid #2A2A2A',
                        borderRadius: '8px 0 0 8px',
                        width: '327px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingTop: '16px',
                        paddingBottom: '15.99px',
                        flexShrink: 0 // 防止压缩
                    }}>
                        <div style={{
                            width: '287px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: '24px'
                        }}>
                            <input
                                type="email"
                                placeholder="输入您的邮箱"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '24px',
                                    color: email ? '#FFFFFF' : '#757575',
                                    fontFamily: 'Arial',
                                    fontSize: '14px',
                                    lineHeight: '18px',
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    whiteSpace: 'nowrap', // 防止换行
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    minHeight: '24px'
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubscribe()
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* 订阅按钮 - 精确按设计稿样式 */}
                    <div style={{
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        borderRadius: '0 8px 8px 0',
                        width: '113px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: '29.5px',
                        paddingRight: '29.5px',
                        paddingTop: '19px',
                        paddingBottom: '18.99px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={handleSubscribe}
                    onMouseOver={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.opacity = '0.9'
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.opacity = '1'
                        }
                    }}
                    >
                        <div style={{
                            width: '54px',
                            color: '#FFFFFF',
                            fontFamily: 'Arial',
                            fontSize: '13.33px',
                            lineHeight: '18px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            textOverflow: 'ellipsis',
                            minHeight: '18px'
                        }}>
                            {isSubmitting ? '订阅中...' : '立即订阅'}
                        </div>
                    </div>
                </div>
            </div>

            {/* 响应式样式 */}
            <style jsx>{`
                /* 中等屏幕适配 (768px - 1199px) */
                @media (max-width: 1199px) {
                    section > div {
                        width: 100% !important;
                        max-width: 800px !important;
                        padding: 0 var(--spacing-6) !important;
                    }
                    
                    /* 表单布局调整 */
                    section > div > div:nth-child(4) {
                        flex-direction: column !important;
                        gap: 16px !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                    }
                    
                    /* 输入框调整 */
                    section > div > div:nth-child(4) > div:first-child {
                        width: 100% !important;
                        margin-left: 0 !important;
                        border-radius: 8px !important;
                    }
                    
                    /* 按钮调整 */
                    section > div > div:nth-child(4) > div:last-child {
                        width: 100% !important;
                        border-radius: 8px !important;
                        max-width: 200px !important;
                        margin: 0 auto !important;
                    }
                }
                
                /* 移动端适配 (767px及以下) */
                @media (max-width: 767px) {
                    section {
                        padding-top: 100px !important;
                        padding-bottom: 40px !important;
                    }
                    
                    section > div {
                        padding: 0 var(--spacing-4) !important;
                    }
                    
                    /* 主标题字体调整 */
                    section > div > div:first-child {
                        font-size: 48px !important;
                        line-height: 56px !important;
                    }
                    
                    /* 副标题字体调整 */
                    section > div > div:nth-child(2),
                    section > div > div:nth-child(3) {
                        font-size: 18px !important;
                        line-height: 26px !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                    }
                    
                    /* 表单间距调整 */
                    section > div > div:nth-child(4) {
                        margin-top: 32px !important;
                    }
                }
                
                /* 超小屏幕 (480px及以下) */
                @media (max-width: 480px) {
                    /* 主标题进一步缩小 */
                    section > div > div:first-child {
                        font-size: 36px !important;
                        line-height: 44px !important;
                    }
                    
                    /* 副标题进一步缩小 */
                    section > div > div:nth-child(2),
                    section > div > div:nth-child(3) {
                        font-size: 16px !important;
                        line-height: 24px !important;
                    }
                }
            `}</style>
        </section>
    )
} 