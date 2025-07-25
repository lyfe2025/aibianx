'use client'

import { useState, useEffect, useRef } from 'react'
import { Container, GradientButton, GradientText, Input, BackgroundDecoration, HeroBackground3D, AIBrainModel, useToast, ToastContainer } from '@/components/ui'

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
    const subtitle1Ref = useRef<HTMLDivElement>(null)
    const { toasts, showSuccess, showError, removeToast } = useToast()
    const subtitle2Ref = useRef<HTMLDivElement>(null)

    // 🔧 使用ref直接控制副标题颜色，实时监控并修复
    useEffect(() => {
        const forceSubtitleColor = (element: HTMLElement, label: string) => {
            if (!element) return

            // 移除所有可能干扰的样式
            element.style.removeProperty('background')
            element.style.removeProperty('background-image')
            element.style.removeProperty('background-clip')
            element.style.removeProperty('-webkit-background-clip')
            element.style.removeProperty('-webkit-text-fill-color')

            // 强制设置颜色 - 多种方式确保生效（使用与周刊相同的颜色）
            element.style.setProperty('color', '#9CA3AF', 'important')
            element.style.setProperty('background', 'none', 'important')
            element.style.setProperty('-webkit-text-fill-color', 'unset', 'important')
            element.style.setProperty('text-fill-color', 'unset', 'important')

            // 直接设置属性
            element.setAttribute('style',
                element.getAttribute('style')?.replace(/color:\s*[^;]+;?/g, '') +
                ';color: #9CA3AF !important;'
            )

            console.log(`🔧 修复${label}颜色`, element.style.color)
        }

        // 立即修复两个副标题
        if (subtitle1Ref.current) {
            forceSubtitleColor(subtitle1Ref.current, '第一行副标题')
        }
        if (subtitle2Ref.current) {
            forceSubtitleColor(subtitle2Ref.current, '第二行副标题')
        }

        // 创建MutationObserver监控这两个特定元素
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target as HTMLElement
                    if (target === subtitle1Ref.current) {
                        const currentColor = target.style.color
                        if (!currentColor.includes('#9CA3AF') && !currentColor.includes('156, 163, 175')) {
                            console.log('🚨 第一行副标题颜色被修改，立即修复:', currentColor)
                            forceSubtitleColor(target, '第一行副标题')
                        }
                    }
                    if (target === subtitle2Ref.current) {
                        const currentColor = target.style.color
                        if (!currentColor.includes('#9CA3AF') && !currentColor.includes('156, 163, 175')) {
                            console.log('🚨 第二行副标题颜色被修改，立即修复:', currentColor)
                            forceSubtitleColor(target, '第二行副标题')
                        }
                    }
                }
            })
        })

        // 监控两个副标题元素
        if (subtitle1Ref.current) {
            observer.observe(subtitle1Ref.current, {
                attributes: true,
                attributeFilter: ['style']
            })
        }
        if (subtitle2Ref.current) {
            observer.observe(subtitle2Ref.current, {
                attributes: true,
                attributeFilter: ['style']
            })
        }

        // 定期强制检查（作为最后防线）
        const intervalId = setInterval(() => {
            if (subtitle1Ref.current) {
                const computedStyle = window.getComputedStyle(subtitle1Ref.current)
                if (computedStyle.color !== 'rgb(156, 163, 175)') {
                    console.log('🔄 定期检查：第一行副标题颜色异常，强制修复:', computedStyle.color)
                    forceSubtitleColor(subtitle1Ref.current, '第一行副标题')
                }
            }
            if (subtitle2Ref.current) {
                const computedStyle = window.getComputedStyle(subtitle2Ref.current)
                if (computedStyle.color !== 'rgb(156, 163, 175)') {
                    console.log('🔄 定期检查：第二行副标题颜色异常，强制修复:', computedStyle.color)
                    forceSubtitleColor(subtitle2Ref.current, '第二行副标题')
                }
            }
        }, 500) // 每500ms检查一次

        return () => {
            observer.disconnect()
            clearInterval(intervalId)
        }
    }, []) // 空依赖数组，确保只在组件挂载时运行

    const handleSubscribe = async () => {
        if (!email.trim()) {
            showError('请输入邮箱', '邮箱地址不能为空')
            return
        }

        // 简单的邮箱验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            showError('邮箱格式不正确', '请输入有效的邮箱地址')
            return
        }

        setIsSubmitting(true)

        // 模拟订阅请求
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            showSuccess(
                '订阅成功！',
                `感谢订阅！我们将向 ${email} 发送最新的AI变现干货`,
                { duration: 5000 }
            )
            setEmail('')
        } catch (error) {
            showError('订阅失败', '网络错误，请稍后重试')
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
                亮色模式下隐藏此效果
            */}
            {theme === 'dark' && (
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
            )}

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
                {/* 主标题 - 使用GradientText组件，添加与周刊相同的动画 */}
                <GradientText
                    as="h1"
                    size="8xl"
                    weight="bold"
                    className="hero-title-animation"
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

                {/* 第一行副标题 - 使用与周刊相同的颜色和动画 */}
                <h2
                    ref={subtitle1Ref}
                    className="hero-subtitle-animation"
                    style={{
                        color: '#9CA3AF', // 与周刊PageHeader完全相同的颜色
                        fontSize: '20px',
                        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                        fontWeight: '400',
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
                        marginBottom: '0px',
                        margin: '0'
                    }}
                >
                    每周获取独家AI变现策略和工具，助你快速实现财务自由
                </h2>

                {/* 第二行副标题 - 使用与周刊相同的颜色和动画 */}
                <h2
                    ref={subtitle2Ref}
                    className="hero-subtitle-animation"
                    style={{
                        color: '#9CA3AF', // 与周刊PageHeader完全相同的颜色
                        fontSize: '20px',
                        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                        fontWeight: '400',
                        lineHeight: '30px',
                        textAlign: 'center' as const,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        whiteSpace: 'nowrap' as const,
                        overflow: 'hidden',
                        minHeight: '30px',
                        marginBottom: '40px',
                        margin: '0 0 40px 0'
                    }}
                >
                    订阅每周精选的AI变现干货，抢占AI红利时代的第一波机会
                </h2>

                {/* 邮箱订阅表单 - 响应式布局优化 */}
                <div className="hero-email-form" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    gap: '0px' // 桌面端无间距，移动端通过CSS控制
                }}>
                    {/* 邮箱输入框 - 响应式优化 */}
                    <div className="hero-email-input" style={{
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
                        flexShrink: 0,
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
                                    color: email ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                    fontFamily: 'Arial',
                                    fontSize: '14px',
                                    lineHeight: '18px',
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    whiteSpace: 'nowrap',
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

                    {/* 订阅按钮 - 响应式优化 */}
                    <div className="hero-subscribe-button" style={{
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        borderRadius: '0 8px 8px 0',
                        width: '120px',
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
                        flexShrink: 0,
                        touchAction: 'manipulation', // 触摸优化
                        WebkitTapHighlightColor: 'transparent'
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
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            minHeight: '18px'
                        }}>
                            {isSubmitting ? '订阅中...' : '立即订阅'}
                        </div>
                    </div>
                </div>

                {/* AI神经网络大脑3D模型 - 响应式显示控制 */}
                <div className="hero-3d-model" style={{
                    position: 'absolute',
                    top: '420px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '200px',
                    zIndex: 5,
                    pointerEvents: 'none',
                    overflow: 'hidden'
                }}>
                    <AIBrainModel />
                </div>
            </div>

            {/* 响应式样式 - 完整移动端优化 */}
            <style jsx>{`
                /* 标题动画 - 与周刊页面保持一致 */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .hero-title-animation {
                    animation: fadeInUp 1s ease-out;
                    transform: translateZ(0);
                }

                .hero-subtitle-animation {
                    animation: fadeInUp 1s ease-out 0.2s both;
                    transform: translateZ(0);
                }

                /* 平板端适配 (768px - 1023px) */
                @media (min-width: 768px) and (max-width: 1023px) {
                    section {
                        padding-top: 120px !important;
                        padding-bottom: 60px !important;
                    }
                    
                    section > div {
                        max-width: 90% !important;
                        padding: 0 24px !important;
                    }
                    
                    /* 主标题适配 */
                    section > div > div:first-child {
                        font-size: 52px !important;
                        line-height: 60px !important;
                        margin-bottom: 16px !important;
                    }
                    
                    /* 副标题适配 */
                    section > div > div:nth-child(2),
                    section > div > div:nth-child(3) {
                        font-size: 18px !important;
                        line-height: 26px !important;
                        max-width: 600px !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    
                    /* 表单布局保持水平 */
                    .hero-email-form {
                        max-width: 500px !important;
                        margin: 0 auto !important;
                    }
                    
                    .hero-email-input {
                        width: 300px !important;
                    }
                    
                    .hero-subscribe-button {
                        width: 140px !important;
                    }
                }
                
                /* 移动端适配 (767px及以下) */
                @media (max-width: 767px) {
                    section {
                        padding-top: 80px !important;
                        padding-bottom: 40px !important;
                        min-height: auto !important;
                    }
                    
                    section > div {
                        width: 100% !important;
                        max-width: 100% !important;
                        padding: 0 16px !important;
                    }
                    
                    /* 主标题移动端优化 */
                    section > div > div:first-child {
                        font-size: 32px !important;
                        line-height: 38px !important;
                        margin-bottom: 16px !important;
                        white-space: normal !important;
                        text-align: center !important;
                    }
                    
                    /* 副标题移动端优化 */
                    section > div > div:nth-child(2),
                    section > div > div:nth-child(3) {
                        font-size: 16px !important;
                        line-height: 22px !important;
                        white-space: normal !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        margin-bottom: 12px !important;
                        padding: 0 8px !important;
                    }
                    
                    section > div > div:nth-child(3) {
                        margin-bottom: 32px !important;
                    }
                    
                    /* 表单移动端垂直布局 */
                    .hero-email-form {
                        flex-direction: column !important;
                        gap: 12px !important;
                        align-items: center !important;
                        width: 100% !important;
                        max-width: 360px !important;
                        margin: 0 auto !important;
                    }
                    
                    /* 输入框移动端优化 */
                    .hero-email-input {
                        width: 100% !important;
                        max-width: 320px !important;
                        border-radius: 12px !important;
                        height: 52px !important;
                        min-height: 52px !important;
                        padding: 16px 20px !important;
                    }
                    
                    .hero-email-input input {
                        font-size: 16px !important; /* 防止iOS缩放 */
                        height: 20px !important;
                        min-height: 20px !important;
                    }
                    
                    /* 按钮移动端优化 */
                    .hero-subscribe-button {
                        width: 100% !important;
                        max-width: 320px !important;
                        border-radius: 12px !important;
                        height: 52px !important;
                        min-height: 52px !important;
                        padding: 16px 24px !important;
                        font-weight: 600 !important;
                        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
                    }
                    
                    .hero-subscribe-button:active {
                        transform: scale(0.98) !important;
                        transition: transform 0.1s ease !important;
                    }
                    
                    .hero-subscribe-button div {
                        font-size: 16px !important;
                        font-weight: 600 !important;
                    }
                    
                    /* 3D模型移动端隐藏 */
                    .hero-3d-model {
                        display: none !important;
                    }
                }
                
                /* 小屏幕移动端优化 (480px及以下) */
                @media (max-width: 480px) {
                    section {
                        padding-top: 60px !important;
                        padding-bottom: 30px !important;
                    }
                    
                    section > div {
                        padding: 0 12px !important;
                    }
                    
                    /* 主标题小屏优化 */
                    section > div > div:first-child {
                        font-size: 28px !important;
                        line-height: 34px !important;
                        margin-bottom: 12px !important;
                    }
                    
                    /* 副标题小屏优化 */
                    section > div > div:nth-child(2),
                    section > div > div:nth-child(3) {
                        font-size: 14px !important;
                        line-height: 20px !important;
                        margin-bottom: 10px !important;
                        padding: 0 4px !important;
                    }
                    
                    section > div > div:nth-child(3) {
                        margin-bottom: 28px !important;
                    }
                    
                    /* 表单小屏优化 */
                    .hero-email-form {
                        max-width: 300px !important;
                        gap: 10px !important;
                    }
                    
                    .hero-email-input {
                        max-width: 280px !important;
                        height: 48px !important;
                        min-height: 48px !important;
                        padding: 14px 16px !important;
                    }
                    
                    .hero-subscribe-button {
                        max-width: 280px !important;
                        height: 48px !important;
                        min-height: 48px !important;
                        padding: 14px 20px !important;
                    }
                    
                    .hero-subscribe-button div {
                        font-size: 14px !important;
                    }
                }
                
                /* 触摸设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .hero-subscribe-button {
                        touch-action: manipulation !important;
                        -webkit-tap-highlight-color: transparent !important;
                    }
                    
                    .hero-subscribe-button:active {
                        transform: scale(0.95) !important;
                        transition: transform 0.1s ease !important;
                    }
                    
                    .hero-email-input input {
                        font-size: 16px !important; /* 防止iOS Safari缩放 */
                        touch-action: manipulation !important;
                    }
                    
                    .hero-email-input input:focus {
                        outline: 2px solid #3B82F6 !important;
                        outline-offset: 2px !important;
                    }
                }
                
                /* 高分辨率屏幕优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    section > div > div:first-child {
                        text-rendering: optimizeLegibility !important;
                        -webkit-font-smoothing: antialiased !important;
                        -moz-osx-font-smoothing: grayscale !important;
                    }
                }
                
                /* 减少动画的用户偏好 */
                @media (prefers-reduced-motion: reduce) {
                    .hero-title-animation,
                    .hero-subtitle-animation {
                        animation: none !important;
                    }
                    
                    .hero-subscribe-button {
                        transition: none !important;
                    }
                }
                
                /* 高对比度模式优化 */
                @media (prefers-contrast: high) {
                    .hero-email-input {
                        border: 2px solid #FFFFFF !important;
                    }
                    
                    .hero-subscribe-button {
                        border: 2px solid #FFFFFF !important;
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