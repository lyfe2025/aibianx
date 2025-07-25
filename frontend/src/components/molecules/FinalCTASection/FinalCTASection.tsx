'use client'

import { useState } from 'react'
import { Container, Icon, GradientText } from '@/components/ui'
import { useThemeStore } from '@/stores'

/**
 * 最终行动召唤区块组件 - FinalCTASection
 * 
 * 根据设计稿1:1还原的最终CTA区块，包含：
 * - "成为AI时代的赢家"主标题
 * - 用户数量统计
 * - 三大核心价值点（使用新下载的设计稿图标）
 * - 邮件订阅表单
 * - 装饰性背景效果
 */
export function FinalCTASection() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { theme } = useThemeStore()

    // 核心价值点 - 使用设计稿中的图标
    const benefits = [
        {
            icon: 'drive-innovation-feature',
            title: '掌握前沿AI工具和变现策略'
        },
        {
            icon: 'weekly-update-feature',
            title: '每周更新实战案例和变现干货'
        },
        {
            icon: 'ai-guidance-feature',
            title: '专业指导快速实现AI创业'
        }
    ]

    const handleSubmit = async () => {
        if (!name.trim() || !email.trim()) {
            alert('请填写完整信息')
            return
        }

        setIsSubmitting(true)

        try {
            // 模拟提交请求
            await new Promise(resolve => setTimeout(resolve, 1500))
            alert(`感谢 ${name}！我们将向 ${email} 发送独家AI变现指南`)
            setName('')
            setEmail('')
        } catch (error) {
            alert('提交失败，请稍后重试')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section style={{
            paddingTop: '48px',
            paddingBottom: '48px',
            background: 'transparent', // 改为透明，让粒子可见
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Container>
                {/* 主要内容容器 - 精确按设计稿尺寸 */}
                <div style={{
                    background: 'var(--color-bg-secondary)',
                    borderRadius: '16px',
                    position: 'relative',
                    zIndex: 1,
                    overflow: 'hidden',
                    width: '1200px',
                    height: '520px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: '32px'
                }}>
                    {/* 左侧内容 - 精确按设计稿布局 */}
                    <div style={{
                        marginTop: '32px',
                        marginBottom: 'var(--card-gap-lg)',
                        marginLeft: '32px',
                        gap: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        flex: '1',
                        minWidth: '450px'
                    }}>
                        {/* 主标题 - 使用GradientText统一样式 */}
                        <GradientText
                            as="h2"
                            size="6xl"
                            weight="bold"
                            style={{
                                lineHeight: '40px',
                                width: '400px',
                                alignItems: 'center',
                                display: 'flex',
                                textOverflow: 'ellipsis',
                                marginRight: '19px',
                                minHeight: '40px'
                            }}
                        >
                            成为AI时代的赢家
                        </GradientText>

                        {/* 副标题 - 深色背景专用白色文字 */}
                        <div style={{
                            color: '#FFFFFF', // 固定白色，确保在深色背景上清晰可见
                            fontSize: 'var(--font-size-2xl)',
                            fontFamily: 'var(--font-family-primary)',
                            lineHeight: '28px',
                            width: '400px',
                            alignItems: 'center',
                            display: 'flex',
                            textOverflow: 'ellipsis',
                            minHeight: '28px',
                            opacity: 0.9 // 稍微降低透明度，更柔和
                        }}>
                            加入10000+已实现AI变现的先行者
                        </div>

                        {/* 价值点列表 - 精确按设计稿布局 */}
                        <div style={{
                            marginTop: '24px',
                            marginRight: '32px',
                            gap: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch'
                        }}>
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    style={{
                                        gap: '16px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'stretch',
                                        paddingRight: index === 0 ? '19px' : '0'
                                    }}
                                >
                                    {/* 图标圆形背景 - 主题适配优化 */}
                                    <div style={{
                                        background: theme === 'light'
                                            ? 'linear-gradient(135deg, #3B82F6 15%, #06B6D4 85%)' // 亮色模式：蓝色渐变
                                            : 'linear-gradient(135deg, #3B82F6 15%, #06B6D4 85%)', // 暗色模式：蓝色渐变
                                        borderRadius: '50%',
                                        padding: '10px',
                                        display: 'flex',
                                        width: '40px',
                                        height: '40px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                                    }}>
                                        <Icon
                                            name={benefit.icon}
                                            size="sm"
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                color: '#FFFFFF'
                                            }}
                                        />
                                    </div>
                                    {/* 功能描述文字 - 深色背景专用白色文字 */}
                                    <div style={{
                                        color: '#FFFFFF', // 固定白色，确保在深色背景上清晰可见
                                        fontSize: 'var(--font-size-lg)',
                                        fontFamily: 'var(--font-family-primary)',
                                        lineHeight: '28px',
                                        width: '300px',
                                        alignItems: 'center',
                                        display: 'flex',
                                        textOverflow: 'ellipsis',
                                        marginTop: '6px',
                                        minHeight: '28px',
                                        opacity: 0.9 // 稍微降低透明度，更柔和
                                    }}>
                                        {benefit.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧订阅表单 - 精确按设计稿布局 */}
                    <div style={{
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border-primary)',
                        borderRadius: '16px',
                        width: '500px',
                        position: 'relative',
                        marginTop: '32px',
                        marginBottom: 'var(--card-gap-lg)',
                        marginRight: '32px',
                        gap: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch'
                    }}>
                        {/* 表单标题 - 使用GradientText统一样式 */}
                        <GradientText
                            as="h3"
                            size="3xl"
                            weight="bold"
                            style={{
                                lineHeight: '32px',
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                textOverflow: 'ellipsis',
                                marginTop: '32px',
                                marginLeft: '33px',
                                marginRight: '33px',
                                minHeight: '32px'
                            }}
                        >
                            获取独家AI变现指南
                        </GradientText>

                        {/* 表单描述 - 优化对比度 */}
                        <div style={{
                            color: '#9CA3AF', // 使用固定的中性灰色，确保在白色背景上有良好对比度
                            fontSize: 'var(--font-size-lg)',
                            fontFamily: 'var(--font-family-primary)',
                            lineHeight: '24px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            textOverflow: 'ellipsis',
                            marginTop: '16px',
                            marginLeft: '33px',
                            marginRight: '33px',
                            minHeight: '24px'
                        }}>
                            订阅周刊，每周获取精选AI变现干货和独家资源
                        </div>

                        {/* 称呼输入框 - 精确按设计稿样式 */}
                        <div
                            className="final-cta-input-container"
                            style={{
                                background: 'var(--color-bg-input)',
                                border: '1px solid var(--color-border-primary)',
                                borderRadius: '8px',
                                padding: '17px',
                                display: 'flex',
                                width: '434px',
                                gap: '12px',
                                alignItems: 'stretch',
                                marginTop: '24px',
                                marginLeft: '33px',
                                marginRight: '33px',
                                flexDirection: 'row',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Icon name="input-email-icon" size="sm" style={{
                                width: '20px',
                                height: '20px',
                                color: '#3B82F6'
                            }} />
                            <div style={{
                                width: '368px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'flex-start',
                                minHeight: '20px'
                            }}>
                                <input
                                    type="text"
                                    placeholder="您的称呼"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onFocus={(e) => {
                                        const container = e.target.parentElement?.parentElement
                                        if (container) {
                                            container.style.borderColor = '#3B82F6'
                                            container.style.background = 'var(--color-bg-primary)'
                                            container.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)'
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const container = e.target.parentElement?.parentElement
                                        if (container) {
                                            container.style.borderColor = 'rgba(59, 130, 246, 0.30)'
                                            container.style.background = 'var(--color-bg-input)'
                                            container.style.boxShadow = 'none'
                                        }
                                    }}
                                    style={{
                                        width: '368px',
                                        height: '20px',
                                        color: 'var(--color-text-muted)', // 使用主题变量
                                        fontSize: 'var(--font-size-base)', // 使用主题字体大小
                                        fontFamily: 'var(--font-family-primary)', // 统一字体
                                        lineHeight: '20px',
                                        alignItems: 'center',
                                        display: 'flex',
                                        textOverflow: 'ellipsis',
                                        minHeight: '20px',
                                        marginRight: '-1px',
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* 邮箱输入框 - 精确按设计稿样式 */}
                        <div style={{
                            background: 'var(--color-bg-input)',
                            border: '1px solid var(--color-border-primary)',
                            borderRadius: '8px',
                            padding: '17px',
                            display: 'flex',
                            width: '434px',
                            gap: '12px',
                            alignItems: 'stretch',
                            marginTop: '16px',
                            marginLeft: '33px',
                            marginRight: '33px',
                            flexDirection: 'row',
                            transition: 'all 0.2s ease'
                        }}>
                            <Icon name="input-email-icon" size="sm" style={{
                                width: '20px',
                                height: '20px',
                                color: '#3B82F6'
                            }} />
                            <div style={{
                                width: '368px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'flex-start',
                                minHeight: '20px'
                            }}>
                                <input
                                    type="email"
                                    placeholder="请输入您的邮箱"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={(e) => {
                                        const container = e.target.parentElement?.parentElement
                                        if (container) {
                                            container.style.borderColor = '#3B82F6'
                                            container.style.background = 'var(--color-bg-primary)'
                                            container.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)'
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const container = e.target.parentElement?.parentElement
                                        if (container) {
                                            container.style.borderColor = 'var(--color-border-primary)'
                                            container.style.background = 'var(--color-bg-input)'
                                            container.style.boxShadow = 'none'
                                        }
                                    }}
                                    style={{
                                        width: '368px',
                                        height: '20px',
                                        color: 'var(--color-text-muted)', // 使用主题变量
                                        fontSize: 'var(--font-size-base)', // 使用主题字体大小
                                        fontFamily: 'var(--font-family-primary)', // 统一字体
                                        lineHeight: '20px',
                                        alignItems: 'center',
                                        display: 'flex',
                                        textOverflow: 'ellipsis',
                                        minHeight: '20px',
                                        marginRight: '-1px',
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* 提交按钮 - 精确按设计稿样式 */}
                        <div style={{
                            background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            width: '434px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '16px',
                            marginLeft: '33px',
                            marginRight: '33px',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            cursor: 'pointer'
                        }} onClick={handleSubmit}>
                            <div style={{
                                color: '#FFFFFF',
                                lineHeight: '28px',
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                textOverflow: 'ellipsis',
                                minHeight: '28px'
                            }}>
                                {isSubmitting ? '提交中...' : '立即免费获取'}
                            </div>
                        </div>

                        {/* 统计信息 - 主题适配优化 */}
                        <div style={{
                            color: 'var(--color-text-disabled)', // 使用主题变量
                            fontSize: 'var(--font-size-base)', // 使用主题字体大小
                            fontFamily: 'var(--font-family-primary)', // 统一字体
                            lineHeight: '20px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            textOverflow: 'ellipsis',
                            marginTop: '16px',
                            marginBottom: 'var(--card-gap-lg)',
                            marginLeft: '33px',
                            marginRight: '33px',
                            minHeight: '20px'
                        }}>
                            已有5000+读者订阅
                        </div>
                    </div>

                    {/* 装饰性背景效果 - 主题适配优化 */}
                    <div style={{
                        position: 'absolute',
                        opacity: theme === 'light' ? '0.30' : '0.80', // 亮色模式降低透明度
                        background: theme === 'light'
                            ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%)' // 亮色模式：淡蓝色渐变
                            : 'linear-gradient(90deg, rgba(79, 172, 254, 0.20) 0%, rgba(0, 242, 254, 0.15) 100%)', // 暗色模式：保持原样
                        filter: 'blur(30px)',
                        borderRadius: '9999px',
                        width: '80px',
                        height: '80px',
                        top: '-48px',
                        left: '544px'
                    }} />

                    <div style={{
                        position: 'absolute',
                        opacity: theme === 'light' ? '0.25' : '0.80', // 亮色模式降低透明度
                        background: theme === 'light'
                            ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.06) 0%, rgba(59, 130, 246, 0.04) 100%)' // 亮色模式：淡紫蓝渐变
                            : 'linear-gradient(90deg, rgba(255, 154, 158, 0.20) 0%, rgba(254, 207, 239, 0.15) 100%)', // 暗色模式：保持原样
                        filter: 'blur(30px)',
                        borderRadius: '9999px',
                        width: '80px',
                        height: '80px',
                        bottom: '16px',
                        right: '400px'
                    }} />
                </div>
            </Container>
        </section>
    )
} 