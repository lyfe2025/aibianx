'use client'

import { useState, useEffect } from 'react'
import { Container, GradientButton, GradientText, Input, BackgroundDecoration, HeroBackground3D, AIBrainModel } from '@/components/ui'

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
    const [isFocused, setIsFocused] = useState(false)

    // 🔧 确保副标题颜色在所有阶段都正确
    useEffect(() => {
        const forceSubtitleColor = () => {
            const subtitles = document.querySelectorAll('.hero-subtitle')
            subtitles.forEach(subtitle => {
                const element = subtitle as HTMLElement
                element.style.color = '#D1D5DB'
                element.style.webkitTextFillColor = '#D1D5DB'
                element.style.setProperty('color', '#D1D5DB', 'important')
            })
        }

        // 立即执行一次
        forceSubtitleColor()

        // 延迟执行确保覆盖任何延迟加载的样式
        const timeouts = [100, 300, 500, 1000].map(delay =>
            setTimeout(forceSubtitleColor, delay)
        )

        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout))
        }
    }, [])

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
            paddingBottom: '80px', // 适中的底部空间
            overflow: 'visible', // 允许3D模型溢出显示，不被切割
            background: 'transparent', // 改为透明，让粒子可见
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh' // 恰好一个屏幕高度，3D模型现在使用绝对定位
        }}>
            {/* 
                渐变过渡遮罩层 - 实现3D粒子到CSS粒子的自然过渡
                顶部完全遮挡，底部逐渐透明，形成平滑衔接
            */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(
                    to bottom,
                    var(--color-bg-primary) 0%,          /* 顶部完全遮挡 */
                    var(--color-bg-primary) 60%,         /* 中上部分继续遮挡 */
                    rgba(3, 3, 3, 0.8) 75%,             /* 开始过渡 */
                    rgba(3, 3, 3, 0.4) 85%,             /* 渐变透明 */
                    rgba(3, 3, 3, 0.1) 95%,             /* 接近透明 */
                    transparent 100%                     /* 底部完全透明 */
                )`,
                zIndex: 1 // 高于CSS粒子背景(0.5)，低于3D效果(2+)
            }} />

            {/* 3D背景装饰 - 淡淡的AI元素 */}
            <HeroBackground3D />

            {/* 背景装饰 - 设计稿蓝色渐变 */}
            <BackgroundDecoration
                position="top-left"
                animation={{ type: 'float', duration: '8s' }}
                zIndex={2} // 确保在遮罩层之上
            />



            {/* 主要内容容器 - 彻底避免SSR水合问题 */}
            <div style={{
                width: '100%', // 🔧 使用100%避免固定像素值造成的问题
                maxWidth: '800px', // 🔧 使用固定最大宽度，避免vw单位造成的SSR差异
                margin: '0 auto', // 居中显示
                padding: '0 20px', // 添加内边距确保小屏幕显示正常
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                fontSize: '13.33px',
                fontWeight: '400',
                color: 'inherit', // 重置颜色继承，让子元素可以正确设置自己的颜色
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                paddingTop: '42.78px',
                position: 'relative',
                zIndex: 10 // 确保显示在所有背景层之上
            }}>
                {/* 主标题 - 使用GradientText组件统一样式 */}
                <GradientText
                    as="h1"
                    size="8xl"
                    weight="bold"
                    style={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        whiteSpace: 'nowrap', // 防止换行
                        overflow: 'hidden',
                        lineHeight: '76.8px',
                        marginLeft: '2px',
                        marginRight: '2px',
                        minHeight: '77px',
                        marginBottom: '9.90px' // 替代gap使用margin
                    }}
                >
                    AI变现从这里开始
                </GradientText>

                {/* 第一行副标题 - 完全移除CSS类，直接强制内联样式 */}
                <div
                    style={{
                        color: '#D1D5DB !important',
                        fontSize: '20px',
                        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                        lineHeight: '30px',
                        textAlign: 'center' as const,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        whiteSpace: 'nowrap' as const,
                        overflow: 'hidden',
                        marginLeft: '9px',
                        marginRight: '9px',
                        minHeight: '30px',
                        marginBottom: '0px'
                    }}
                >
                    每周获取独家AI变现策略和工具，助你快速实现财务自由
                </div>

                {/* 第二行副标题 - 强制浅灰色显示，防止被覆盖 */}
                <div
                    className="hero-subtitle"
                    style={{
                        color: '#D1D5DB', // 🔧 浅灰色副标题文字
                        WebkitTextFillColor: '#D1D5DB', // 🔧 防止渐变文字样式影响
                        background: 'none', // 🔧 清除可能的背景渐变
                        backgroundClip: 'initial', // 🔧 重置背景裁剪
                        WebkitBackgroundClip: 'initial', // 🔧 重置WebKit背景裁剪
                        fontSize: 'var(--font-size-2xl)',
                        fontFamily: 'var(--font-family-primary)',
                        lineHeight: '30px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        whiteSpace: 'nowrap', // 防止换行
                        overflow: 'hidden',
                        minHeight: '30px',
                        marginBottom: '40px' // 替代表单的marginTop
                    }}
                >
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
                        background: isFocused ? 'rgba(18, 18, 18, 0.70)' : 'rgba(18, 18, 18, 0.50)',
                        border: `1px solid ${isFocused ? '#3B82F6' : '#2A2A2A'}`,
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
                        flexShrink: 0, // 防止压缩
                        transition: 'all 0.2s ease',
                        boxShadow: isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.1)' : 'none'
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
                                placeholder="请输入您的邮箱"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
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

                    {/* 订阅按钮 - 修复换行问题 */}
                    <div style={{
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        borderRadius: '0 8px 8px 0',
                        width: '120px', // 增加宽度确保中文不换行
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingTop: '19px',
                        paddingBottom: '18.99px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        flexShrink: 0 // 防止压缩
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
                            color: '#FFFFFF',
                            fontFamily: 'Arial',
                            fontSize: '14px',
                            lineHeight: '18px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            whiteSpace: 'nowrap', // 防止换行
                            overflow: 'hidden',
                            minHeight: '18px'
                        }}>
                            {isSubmitting ? '订阅中...' : '立即订阅'}
                        </div>
                    </div>
                </div>

                {/* AI神经网络大脑3D模型 - 绝对定位，避免被容器切割 */}
                <div style={{
                    position: 'absolute',
                    bottom: '-300px', // 大幅向下延伸，确保完全不被切割
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '800px',
                    zIndex: 8, // 在背景3D之上，但在主要内容之下
                    pointerEvents: 'none' // 不干扰用户交互
                }}>
                    <AIBrainModel />
                </div>
            </div>

            {/* 响应式样式 - 修复换行问题 */}
            <style jsx>{`
                /* 中等屏幕适配 (768px - 1199px) */
                @media (max-width: 1199px) {
                    section > div {
                        width: 100% !important;
                        max-width: 90vw !important;
                        padding: 0 var(--spacing-6) !important;
                    }
                    
                    /* 主标题在中等屏幕确保不换行 */
                    section > div > div:first-child {
                        font-size: 48px !important;
                        line-height: 56px !important;
                        white-space: nowrap !important;
                    }
                    
                    /* 副标题在中等屏幕允许换行 */
                    section > div > div:nth-child(2),
                    section > div > div:nth-child(3) {
                        white-space: normal !important;
                        text-align: center !important;
                        max-width: 600px !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    
                    /* 表单布局调整 */
                    section > div > div:nth-child(4) {
                        flex-direction: column !important;
                        align-items: center !important;
                        gap: 16px !important;
                    }
                    
                    /* 输入框调整 */
                    section > div > div:nth-child(4) > div:first-child {
                        width: 100% !important;
                        max-width: 400px !important;
                        border-radius: 8px !important;
                    }
                    
                    /* 按钮调整 */
                    section > div > div:nth-child(4) > div:last-child {
                        width: 200px !important;
                        border-radius: 8px !important;
                    }
                }
                
                /* 移动端适配 (767px及以下) */
                @media (max-width: 767px) {
                    section {
                        padding-top: 100px !important;
                        padding-bottom: 40px !important;
                    }
                    
                    section > div {
                        width: 95vw !important;
                        padding: 0 var(--spacing-4) !important;
                    }
                    
                    /* 主标题字体调整，确保不换行 */
                    section > div > div:first-child {
                        font-size: 36px !important;
                        line-height: 44px !important;
                        white-space: nowrap !important;
                        overflow: hidden !important;
                    }
                    
                    /* 副标题字体调整，允许换行 */
                    section > div > div:nth-child(2),
                    section > div > div:nth-child(3) {
                        font-size: 16px !important;
                        line-height: 24px !important;
                        white-space: normal !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        text-align: center !important;
                    }
                }
                
                /* 超小屏幕 (480px及以下) */
                @media (max-width: 480px) {
                    /* 主标题进一步缩小，确保不换行 */
                    section > div > div:first-child {
                        font-size: 28px !important;
                        line-height: 36px !important;
                        white-space: nowrap !important;
                    }
                    
                    /* 副标题进一步缩小 */
                    section > div > div:nth-child(2),
                    section > div > div:nth-child(3) {
                        font-size: 14px !important;
                        line-height: 20px !important;
                        white-space: normal !important;
                    }
                    
                    /* 表单在超小屏幕的调整 */
                    section > div > div:nth-child(4) > div:first-child {
                        width: 100% !important;
                        max-width: 280px !important;
                    }
                    
                    section > div > div:nth-child(4) > div:last-child {
                        width: 150px !important;
                    }
                }
            `}</style>
        </section>
    )
} 