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
            background: 'var(--color-bg-primary)'
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

            <Container>
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    gap: '64px',
                    minHeight: '500px'
                }}>
                    {/* 左侧内容区域 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '24px',
                        paddingTop: '64px'
                    }}>
                        {/* 副标题描述 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            maxWidth: '520px'
                        }}>
                            <p style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: '20px',
                                lineHeight: '28px',
                                margin: 0
                            }}>
                                每周获取独家AI变现策略和工具，助你快速实现财务自由
                            </p>
                            <p style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: '20px',
                                lineHeight: '28px',
                                margin: 0
                            }}>
                                订阅每周精选的AI变现干货，抢占AI红利时代的第一波机会
                            </p>
                        </div>

                        {/* 邮箱订阅表单 */}
                        <div style={{
                            display: 'flex',
                            maxWidth: '500px',
                            width: '100%',
                            marginTop: '24px'
                        }}>
                            <div style={{
                                flex: 1,
                                background: 'rgba(18, 18, 18, 0.50)',
                                border: '1px solid #2A2A2A',
                                borderRight: 'none',
                                borderRadius: '8px 0 0 8px',
                                padding: '16px 20px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <input
                                    type="email"
                                    placeholder="输入您的邮箱"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        color: 'var(--color-text-primary)',
                                        fontSize: 'var(--font-size-base)'
                                    }}
                                    className="hero-email-input"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubscribe()
                                        }
                                    }}
                                />
                            </div>
                            <GradientButton
                                onClick={handleSubscribe}
                                disabled={isSubmitting}
                                style={{
                                    borderRadius: '0 8px 8px 0',
                                    padding: '17px 32px',
                                    fontSize: 'var(--font-size-base)',
                                    fontWeight: '500'
                                }}
                            >
                                {isSubmitting ? '订阅中...' : '立即订阅'}
                            </GradientButton>
                        </div>
                    </div>

                    {/* 中心设备展示区域 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {/* 手机设备1 */}
                        <div style={{
                            width: '143px',
                            height: '300px',
                            background: '#000000',
                            border: '4px solid #374151',
                            borderRadius: '24px',
                            padding: '8px 4px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}>
                            {/* 状态栏 */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0 16px',
                                marginBottom: '4px'
                            }}>
                                <span style={{
                                    color: '#FFFFFF',
                                    fontSize: '12px',
                                    lineHeight: '16px'
                                }}>
                                    9:41
                                </span>
                                <div style={{
                                    display: 'flex',
                                    gap: '4px',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ width: '12px', height: '12px', background: '#FFFFFF', borderRadius: '2px' }} />
                                    <div style={{ width: '12px', height: '12px', background: '#FFFFFF', borderRadius: '2px' }} />
                                    <div style={{ width: '12px', height: '12px', background: '#FFFFFF', borderRadius: '2px' }} />
                                </div>
                            </div>

                            {/* 应用内容 */}
                            <div style={{
                                flex: 1,
                                background: 'linear-gradient(180deg, #1E3A8A 0%, #312E81 100%)',
                                borderRadius: '16px',
                                padding: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                {/* Logo */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--gradient-primary)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        background: '#FFFFFF',
                                        borderRadius: '4px'
                                    }} />
                                </div>

                                {/* 应用名称 */}
                                <div style={{
                                    color: '#FFFFFF',
                                    fontSize: '10px',
                                    fontWeight: '500',
                                    textAlign: 'center'
                                }}>
                                    AI变现之路
                                </div>

                                {/* 进度条 */}
                                <div style={{
                                    width: '119px',
                                    background: 'rgba(255, 255, 255, 0.10)',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        background: 'var(--gradient-primary)',
                                        borderRadius: '4px'
                                    }} />
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        background: 'rgba(255, 255, 255, 0.20)',
                                        borderRadius: '4px'
                                    }} />
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        background: 'rgba(255, 255, 255, 0.20)',
                                        borderRadius: '4px'
                                    }} />
                                </div>
                            </div>
                        </div>

                        {/* 手机设备2 */}
                        <div style={{
                            width: '143px',
                            height: '300px',
                            background: '#000000',
                            border: '4px solid #374151',
                            borderRadius: '24px',
                            padding: '8px 4px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}>
                            {/* 状态栏 */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0 16px',
                                marginBottom: '4px'
                            }}>
                                <span style={{
                                    color: '#FFFFFF',
                                    fontSize: '12px',
                                    lineHeight: '16px'
                                }}>
                                    9:41
                                </span>
                                <div style={{
                                    display: 'flex',
                                    gap: '4px',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ width: '12px', height: '12px', background: '#FFFFFF', borderRadius: '2px' }} />
                                    <div style={{ width: '12px', height: '12px', background: '#FFFFFF', borderRadius: '2px' }} />
                                    <div style={{ width: '12px', height: '12px', background: '#FFFFFF', borderRadius: '2px' }} />
                                </div>
                            </div>

                            {/* 应用内容 */}
                            <div style={{
                                flex: 1,
                                background: 'linear-gradient(180deg, #1E3A8A 0%, #312E81 100%)',
                                borderRadius: '16px',
                                padding: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '7px'
                            }}>
                                {/* Logo */}
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    background: 'var(--gradient-primary)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        background: '#FFFFFF',
                                        borderRadius: '6px'
                                    }} />
                                </div>

                                {/* 应用名称 */}
                                <div style={{
                                    color: '#FFFFFF',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                    textAlign: 'center'
                                }}>
                                    AI变现之路
                                </div>

                                {/* 进度条 */}
                                <div style={{
                                    width: '119px',
                                    background: 'rgba(255, 255, 255, 0.10)',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        background: 'var(--gradient-primary)',
                                        borderRadius: '4px'
                                    }} />
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        background: 'rgba(255, 255, 255, 0.20)',
                                        borderRadius: '4px'
                                    }} />
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        background: 'rgba(255, 255, 255, 0.20)',
                                        borderRadius: '4px'
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧品牌区域 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        paddingTop: '64px'
                    }}>
                        <GradientText
                            size="xl"
                            weight="bold"
                            style={{
                                fontSize: '30px',
                                lineHeight: '36px',
                                textAlign: 'center'
                            }}
                        >
                            AI 变现之路
                        </GradientText>
                        <div style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '18px',
                            lineHeight: '28px',
                            textAlign: 'center'
                        }}>
                            从入门到精通
                        </div>
                    </div>
                </div>

                {/* 主标题 - 绝对定位到顶部 */}
                <div style={{
                    position: 'absolute',
                    top: '227px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    textAlign: 'center'
                }}>
                    <GradientText
                        size="8xl"
                        weight="bold"
                        style={{
                            fontSize: '60px',
                            lineHeight: '60px',
                            textAlign: 'center',
                            width: '475px'
                        }}
                    >
                        AI变现从这里开始
                    </GradientText>
                </div>
            </Container>
        </section>
    )
} 