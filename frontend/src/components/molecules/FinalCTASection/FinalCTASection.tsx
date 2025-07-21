'use client'

import { useState } from 'react'
import { Container, GradientText, GradientButton, Icon } from '@/components/ui'

/**
 * 最终行动召唤区块组件 - FinalCTASection
 * 
 * 根据设计稿创建的最终CTA区块，包含：
 * - "成为AI时代的赢家"主标题
 * - 用户数量统计
 * - 三大核心价值点
 * - 邮件订阅表单
 * - 装饰性背景效果
 */
export function FinalCTASection() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // 核心价值点
    const benefits = [
        {
            icon: 'drive-innovation',
            title: '掌握前沿AI工具和变现策略'
        },
        {
            icon: 'update-weekly-icon',
            title: '每周更新实战案例和变现干货'
        },
        {
            icon: 'rocket-icon',
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
            paddingTop: '112px',
            paddingBottom: '96px',
            background: 'var(--color-bg-primary)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* 装饰性背景效果 */}
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '400px',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(90deg, rgba(255, 154, 158, 0.20) 0%, rgba(254, 207, 239, 0.15) 100%)',
                filter: 'blur(30px)',
                borderRadius: '50%',
                opacity: 0.8,
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                bottom: '200px',
                right: '720px',
                width: '400px',
                height: '400px',
                background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <Container>
                <div style={{
                    background: 'rgba(26, 26, 26, 0.20)',
                    borderRadius: '16px',
                    padding: '48px',
                    position: 'relative',
                    zIndex: 1,
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: '1fr 592px',
                    gap: '320px',
                    alignItems: 'center'
                }}>
                    {/* 左侧内容 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px'
                    }}>
                        {/* 主标题 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <GradientText
                                size="6xl"
                                weight="bold"
                                style={{
                                    fontSize: '36px',
                                    lineHeight: '40px'
                                }}
                            >
                                成为AI时代的赢家
                            </GradientText>
                            <p style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: '20px',
                                lineHeight: '28px',
                                margin: 0
                            }}>
                                加入10000+已实现AI变现的先行者
                            </p>
                        </div>

                        {/* 价值点列表 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px'
                        }}>
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px'
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(30, 61, 89, 0.30)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Icon
                                            name={benefit.icon}
                                            size="sm"
                                            style={{
                                                color: index === 1 ? '#8B5CF6' : '#3B82F6'
                                            }}
                                        />
                                    </div>
                                    <span style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '18px',
                                        lineHeight: '28px'
                                    }}>
                                        {benefit.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右侧订阅表单 */}
                    <div style={{
                        background: 'rgba(26, 26, 26, 0.30)',
                        border: '1px solid rgba(42, 42, 42, 0.80)',
                        borderRadius: '16px',
                        padding: '33px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        position: 'relative'
                    }}>
                        {/* 装饰性光效 */}
                        <div style={{
                            position: 'absolute',
                            top: '-48px',
                            right: '48px',
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(90deg, rgba(79, 172, 254, 0.20) 0%, rgba(0, 242, 254, 0.15) 100%)',
                            filter: 'blur(30px)',
                            borderRadius: '50%',
                            opacity: 0.8,
                            zIndex: -1
                        }} />

                        {/* 表单标题 */}
                        <h3 style={{
                            color: '#FFFFFF',
                            fontSize: '24px',
                            fontWeight: '700',
                            lineHeight: '32px',
                            textAlign: 'center',
                            margin: 0
                        }}>
                            获取独家AI变现指南
                        </h3>

                        {/* 表单描述 */}
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-base)',
                            lineHeight: '24px',
                            textAlign: 'center',
                            margin: 0
                        }}>
                            订阅周刊，每周获取精选AI变现干货和独家资源
                        </p>

                        {/* 表单字段 */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            marginTop: '16px'
                        }}>
                            {/* 称呼输入框 */}
                            <div style={{
                                background: 'rgba(18, 18, 18, 0.50)',
                                border: '1px solid rgba(59, 130, 246, 0.30)',
                                borderRadius: '8px',
                                padding: '17px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <Icon name="user-icon" size="sm" style={{ color: '#3B82F6' }} />
                                <input
                                    type="text"
                                    placeholder="您的称呼"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        color: 'var(--color-text-primary)',
                                        fontSize: '14px',
                                        '::placeholder': {
                                            color: 'var(--color-text-muted)'
                                        }
                                    }}
                                />
                            </div>

                            {/* 邮箱输入框 */}
                            <div style={{
                                background: 'rgba(18, 18, 18, 0.50)',
                                border: '1px solid rgba(59, 130, 246, 0.30)',
                                borderRadius: '8px',
                                padding: '17px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <Icon name="email-icon" size="sm" style={{ color: '#3B82F6' }} />
                                <input
                                    type="email"
                                    placeholder="您的邮箱"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        color: 'var(--color-text-primary)',
                                        fontSize: '14px',
                                        '::placeholder': {
                                            color: 'var(--color-text-muted)'
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* 提交按钮 */}
                        <GradientButton
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            style={{
                                marginTop: '88px',
                                padding: '20px',
                                fontSize: '18px',
                                fontWeight: '500'
                            }}
                        >
                            {isSubmitting ? '提交中...' : '立即免费获取'}
                        </GradientButton>

                        {/* 统计信息 */}
                        <p style={{
                            color: 'var(--color-text-disabled)',
                            fontSize: '14px',
                            lineHeight: '20px',
                            textAlign: 'center',
                            margin: '16px 0 0 0'
                        }}>
                            已有5000+读者订阅
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
} 