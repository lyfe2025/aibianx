'use client'

import { useState } from 'react'
import { GradientButton, GradientText } from '@/components/ui'
import { useThemeStore } from '@/stores'

export function CTASection() {
    const [finalFormData, setFinalFormData] = useState({
        name: '',
        email: ''
    })
    const { theme } = useThemeStore()

    const handleFinalSubscribe = () => {
        if (finalFormData.name && finalFormData.email) {
            alert(`感谢订阅！\n姓名：${finalFormData.name}\n邮箱：${finalFormData.email}`)
            setFinalFormData({ name: '', email: '' })
        } else {
            alert('请填写完整信息')
        }
    }

    const privileges = [
        { icon: '🎯', text: '掌握前沿AI工具和变现策略' },
        { icon: '📈', text: '每周更新实战案例和变现干货' },
        { icon: '🚀', text: '专业指导快速实现AI创业' }
    ]

    return (
        <section style={{
            position: 'relative',
            zIndex: 1,
            background: theme === 'light'
                ? 'rgba(248, 250, 252, 0.95)' // 亮色模式：浅灰蓝色背景
                : 'var(--color-bg-secondary)', // 暗色模式：保持原有设置
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            margin: '0 64px 62px 64px',
            padding: '40px',
            border: theme === 'light'
                ? '1px solid rgba(59, 130, 246, 0.08)' // 亮色模式：淡蓝色边框
                : 'none' // 暗色模式：无边框
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '35px',
                alignItems: 'center'
            }}>
                {/* 左侧：成为AI时代的赢家 */}
                <div>
                    <div style={{
                        fontSize: '72px',
                        marginBottom: '20px'
                    }}>
                        🚀
                    </div>

                    <GradientText
                        as="h2"
                        size="6xl"
                        weight="bold"
                        style={{
                            lineHeight: '40px',
                            marginBottom: '20px'
                        }}
                    >
                        成为AI时代的赢家
                    </GradientText>

                    <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-2xl)',
                        fontFamily: 'var(--font-family-primary)',
                        lineHeight: '28px',
                        marginBottom: '30px'
                    }}>
                        加入10000+已实现AI变现的先行者
                    </p>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        {privileges.map((item, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                gap: '16px',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'linear-gradient(135deg, #3B82F6 15%, #06B6D4 85%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
                                }}>
                                    {item.icon}
                                </div>
                                <div style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '18px',
                                    lineHeight: '25px'
                                }}>
                                    {item.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 右侧：获取独家AI变现指南表单 */}
                <div style={{
                    width: '468px',
                    background: theme === 'light'
                        ? 'rgba(255, 255, 255, 0.90)' // 亮色模式：纯白背景
                        : 'var(--color-bg-secondary)', // 暗色模式：保持原有设置
                    backdropFilter: 'blur(16px)',
                    border: theme === 'light'
                        ? '1px solid rgba(59, 130, 246, 0.12)' // 亮色模式：淡蓝色边框
                        : '1px solid var(--color-border-primary)', // 暗色模式：原有边框
                    borderRadius: '16px',
                    padding: '32px 21px 0 21px',
                    boxShadow: theme === 'light'
                        ? '0 4px 24px rgba(59, 130, 246, 0.08)' // 亮色模式：淡蓝色阴影
                        : 'none' // 暗色模式：无阴影
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px'
                    }}>
                        <h3 style={{
                            color: 'var(--color-text-primary)',
                            fontSize: '24px',
                            fontWeight: 700,
                            lineHeight: '34px',
                            textAlign: 'center',
                            flex: 1
                        }}>
                            获取独家AI变现指南
                        </h3>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(90deg, rgba(79, 172, 254, 0.20) 0%, rgba(0, 242, 254, 0.15) 100%)',
                            filter: 'blur(30px)',
                            borderRadius: '40px',
                            opacity: 0.78
                        }} />
                    </div>

                    <p style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '16px',
                        lineHeight: '22px',
                        textAlign: 'center',
                        marginBottom: '25px'
                    }}>
                        订阅周刊，每周获取精选AI变现干货和独家资源
                    </p>

                    {/* 表单 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginBottom: '42px'
                    }}>
                        <div style={{
                            background: 'var(--color-bg-input)', // 使用主题适配的背景色
                            border: theme === 'light'
                                ? '1px solid rgba(59, 130, 246, 0.20)' // 亮色模式：更明显的蓝色边框
                                : '1px solid rgba(59, 130, 246, 0.30)', // 暗色模式：原有设置
                            borderRadius: '8px',
                            padding: '17.5px 17px',
                            display: 'flex',
                            gap: '14px',
                            alignItems: 'center',
                            transition: 'all 0.2s ease'
                        }}>
                            <div style={{ color: 'var(--color-primary-blue)', fontSize: '20px' }}>👤</div>
                            <input
                                type="text"
                                placeholder="您的称呼"
                                value={finalFormData.name}
                                onChange={(e) => setFinalFormData(prev => ({ ...prev, name: e.target.value }))}
                                onFocus={(e) => {
                                    const container = e.target.parentElement
                                    if (container) {
                                        container.style.borderColor = '#3B82F6'
                                        container.style.background = 'var(--color-bg-primary)'
                                        container.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)'
                                    }
                                }}
                                onBlur={(e) => {
                                    const container = e.target.parentElement
                                    if (container) {
                                        container.style.borderColor = theme === 'light'
                                            ? 'rgba(59, 130, 246, 0.20)'
                                            : 'rgba(59, 130, 246, 0.30)'
                                        container.style.background = 'var(--color-bg-input)'
                                        container.style.boxShadow = 'none'
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-text-primary)', // 使用主题适配的文字颜色
                                    fontSize: '13.33px',
                                    lineHeight: '19px',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{
                            background: 'var(--color-bg-input)', // 使用主题适配的背景色
                            border: theme === 'light'
                                ? '1px solid rgba(59, 130, 246, 0.20)' // 亮色模式：更明显的蓝色边框
                                : '1px solid rgba(59, 130, 246, 0.30)', // 暗色模式：原有设置
                            borderRadius: '8px',
                            padding: '17.5px 17px',
                            display: 'flex',
                            gap: '14px',
                            alignItems: 'center',
                            transition: 'all 0.2s ease'
                        }}>
                            <div style={{ color: 'var(--color-primary-blue)', fontSize: '20px' }}>📧</div>
                            <input
                                type="email"
                                placeholder="请输入您的邮箱"
                                value={finalFormData.email}
                                onChange={(e) => setFinalFormData(prev => ({ ...prev, email: e.target.value }))}
                                onFocus={(e) => {
                                    const container = e.target.parentElement
                                    if (container) {
                                        container.style.borderColor = '#3B82F6'
                                        container.style.background = 'var(--color-bg-primary)'
                                        container.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)'
                                    }
                                }}
                                onBlur={(e) => {
                                    const container = e.target.parentElement
                                    if (container) {
                                        container.style.borderColor = theme === 'light'
                                            ? 'rgba(59, 130, 246, 0.20)'
                                            : 'rgba(59, 130, 246, 0.30)'
                                        container.style.background = 'var(--color-bg-input)'
                                        container.style.boxShadow = 'none'
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-text-primary)', // 使用主题适配的文字颜色
                                    fontSize: '13.33px',
                                    lineHeight: '19px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '0' }}>
                        <GradientButton
                            size="md"
                            fullWidth
                            onClick={handleFinalSubscribe}
                        >
                            立即免费获取
                        </GradientButton>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(90deg, rgba(255, 154, 158, 0.20) 0%, rgba(254, 207, 239, 0.15) 100%)',
                            filter: 'blur(30px)',
                            borderRadius: '40px',
                            opacity: 0.78
                        }} />
                        <p style={{
                            color: 'var(--color-text-disabled)',
                            fontSize: '14px',
                            lineHeight: '20px',
                            textAlign: 'center',
                            margin: 0
                        }}>
                            已有5000+读者订阅
                        </p>
                    </div>
                </div>
            </div>

            {/* 主题适配样式 */}
            <style jsx>{`
                input::placeholder {
                    color: ${theme === 'light' ? '#6B7280' : 'var(--color-text-muted)'};
                    opacity: 1;
                }
                
                input::-webkit-input-placeholder {
                    color: ${theme === 'light' ? '#6B7280' : 'var(--color-text-muted)'};
                }
                
                input::-moz-placeholder {
                    color: ${theme === 'light' ? '#6B7280' : 'var(--color-text-muted)'};
                    opacity: 1;
                }
                
                input:-ms-input-placeholder {
                    color: ${theme === 'light' ? '#6B7280' : 'var(--color-text-muted)'};
                }
                
                input:-moz-placeholder {
                    color: ${theme === 'light' ? '#6B7280' : 'var(--color-text-muted)'};
                }
            `}</style>
        </section>
    )
} 