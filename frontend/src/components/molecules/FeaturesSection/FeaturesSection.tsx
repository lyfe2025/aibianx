'use client'

import { useState } from 'react'

export function FeaturesSection() {
    const [ctaEmail, setCtaEmail] = useState('')

    const handleCtaSubscribe = () => {
        if (ctaEmail) {
            alert(`感谢订阅！邮箱：${ctaEmail}`)
            setCtaEmail('')
        }
    }

    const features = [
        { icon: '📚', title: '高质量内容', desc: '每周精心筛选，确保只提供最有价值的AI变现知识' },
        { icon: '🎯', title: '实战经验', desc: '来自实际变现过万的案例分析，切实可行的策略' },
        { icon: '🔄', title: '持续更新', desc: '紧跟AI发展前沿，第一时间更新最新变现机会' }
    ]

    return (
        <section style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            gap: '32px',
            padding: '0 294px',
            marginBottom: '168px'
        }}>
            {/* 左侧：为什么选择我们 */}
            <div style={{
                width: '410px',
                background: 'rgba(26, 26, 26, 0.30)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(42, 42, 42, 0.70)',
                borderRadius: '16px',
                padding: '25px 0 208px 0'
            }}>
                <h3 style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: 700,
                    lineHeight: '28px',
                    textAlign: 'center',
                    marginBottom: '35px'
                }}>
                    为什么选择我们？
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '33px' }}>
                    {features.map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            gap: '16px',
                            padding: '0 51px'
                        }}>
                            <div style={{
                                fontSize: '24px',
                                width: '42px',
                                height: '67px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {item.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{
                                    color: '#FFFFFF',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    lineHeight: '22px',
                                    marginBottom: '5px'
                                }}>
                                    {item.title}
                                </h4>
                                <p style={{
                                    color: '#9CA3AF',
                                    fontSize: '14px',
                                    lineHeight: '20px'
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 右侧：用户评价 + 邮件订阅 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* 用户评价 */}
                <div style={{
                    width: '410px',
                    background: 'rgba(26, 26, 26, 0.30)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(42, 42, 42, 0.70)',
                    borderRadius: '16px',
                    padding: '25px 61px 35px 61px'
                }}>
                    <h3 style={{
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: '28px',
                        marginBottom: '25px'
                    }}>
                        他们都在用
                    </h3>

                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        marginBottom: '35px'
                    }}>
                        <div style={{
                            fontSize: '24px',
                            width: '112px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            👥👥👥
                        </div>
                        <div>
                            <div style={{
                                color: '#FFFFFF',
                                fontSize: '16px',
                                lineHeight: '22px'
                            }}>
                                5000+ 用户
                            </div>
                            <div style={{
                                color: '#9CA3AF',
                                fontSize: '14px',
                                lineHeight: '20px'
                            }}>
                                已加入社区
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(18, 18, 18, 0.50)',
                        borderRadius: '8px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        <p style={{
                            color: '#D1D5DB',
                            fontSize: '16px',
                            lineHeight: '22px'
                        }}>
                            "通过AI变现之路的指导，我在两个月内实现了月入过万的目标，资源非常实用！"
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '16px',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: 600
                            }}>
                                张
                            </div>
                            <div style={{
                                color: '#FFFFFF',
                                fontSize: '12px',
                                lineHeight: '17px'
                            }}>
                                张先生，自由职业者
                            </div>
                        </div>
                    </div>
                </div>

                {/* 邮件订阅CTA */}
                <div style={{
                    width: '410px',
                    background: 'linear-gradient(135deg, #0C1E47 41%, #1E0C47 59%)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(59, 130, 246, 0.20)',
                    borderRadius: '16px',
                    padding: '25px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px'
                    }}>
                        <h3 style={{
                            color: '#FFFFFF',
                            fontSize: '18px',
                            fontWeight: 700,
                            lineHeight: '25px'
                        }}>
                            不要错过任何机会
                        </h3>
                        <div style={{
                            color: '#3B82F6',
                            fontSize: '20px'
                        }}>
                            🔔
                        </div>
                    </div>

                    <p style={{
                        color: '#D1D5DB',
                        fontSize: '16px',
                        lineHeight: '22px',
                        marginBottom: '25px'
                    }}>
                        订阅我们的邮件，获取最新AI变现机会和独家资源
                    </p>

                    <div style={{ display: 'flex' }}>
                        <input
                            type="email"
                            placeholder="您的邮箱"
                            value={ctaEmail}
                            onChange={(e) => setCtaEmail(e.target.value)}
                            style={{
                                flex: 1,
                                background: 'rgba(18, 18, 18, 0.50)',
                                border: '1px solid #2A2A2A',
                                borderRadius: '8px 0 0 8px',
                                padding: '20px 23px 18px 23px',
                                color: '#757575',
                                fontSize: '13.33px',
                                lineHeight: '19px',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleCtaSubscribe}
                            style={{
                                background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                                border: 'none',
                                borderRadius: '0 8px 8px 0',
                                padding: '19px 16px',
                                color: '#FFFFFF',
                                fontSize: '13.33px',
                                fontWeight: 500,
                                lineHeight: '19px',
                                cursor: 'pointer'
                            }}
                        >
                            订阅
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
} 