'use client'

import { useState } from 'react'
import Image from 'next/image'

export function HeroSection() {
    const [heroEmail, setHeroEmail] = useState('')

    const handleHeroSubscribe = () => {
        if (heroEmail) {
            alert(`感谢订阅！邮箱：${heroEmail}`)
            setHeroEmail('')
        }
    }

    return (
        <section style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            paddingTop: '115px'
        }}>
            {/* 主标题 */}
            <h1 style={{
                background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '64px',
                fontWeight: 700,
                lineHeight: '76.8px',
                margin: '0 0 22px 0'
            }}>
                AI变现从这里开始
            </h1>

            {/* 副标题 */}
            <div style={{
                color: '#D1D5DB',
                fontSize: '20px',
                lineHeight: '30px',
                maxWidth: '511px',
                margin: '0 auto 79px auto'
            }}>
                每周获取独家AI变现策略和工具，助你快速实现财务自由<br />
                订阅每周精选的AI变现干货，抢占AI红利时代的第一波机会
            </div>

            {/* 邮箱订阅框 */}
            <div style={{
                display: 'flex',
                maxWidth: '381px',
                margin: '0 auto 79px auto'
            }}>
                <input
                    type="email"
                    placeholder="输入您的邮箱"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
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
                    onClick={handleHeroSubscribe}
                    style={{
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        border: 'none',
                        borderRadius: '0 8px 8px 0',
                        padding: '19px 20px',
                        color: '#FFFFFF',
                        fontSize: '13.33px',
                        fontWeight: 500,
                        lineHeight: '19px',
                        cursor: 'pointer'
                    }}
                >
                    立即订阅
                </button>
            </div>

            {/* 三屏设备展示 */}
            <div style={{
                position: 'relative',
                maxWidth: '800px',
                margin: '0 auto',
                height: '410px'
            }}>
                {/* 中心主设备 */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0',
                    transform: 'translateX(-50%)',
                    zIndex: 3
                }}>
                    <Image
                        src="/images/hero/devices-main.svg"
                        alt="主设备展示"
                        width={354}
                        height={410}
                        style={{ width: '354px', height: '410px' }}
                    />
                </div>

                {/* 左侧设备 */}
                <div style={{
                    position: 'absolute',
                    left: '13px',
                    bottom: '48px',
                    zIndex: 2
                }}>
                    <Image
                        src="/images/hero/device-left.svg"
                        alt="左侧设备展示"
                        width={143}
                        height={362}
                        style={{ width: '143px', height: '362px' }}
                    />
                </div>

                {/* 右侧设备 */}
                <div style={{
                    position: 'absolute',
                    right: '13px',
                    bottom: '48px',
                    zIndex: 2
                }}>
                    <Image
                        src="/images/hero/device-right.svg"
                        alt="右侧设备展示"
                        width={143}
                        height={362}
                        style={{ width: '143px', height: '362px' }}
                    />
                </div>
            </div>

            {/* 右侧装饰光效 */}
            <div style={{
                position: 'absolute',
                top: '54px',
                right: '-200px',
                width: '500px',
                height: '500px',
                background: 'linear-gradient(90deg, rgba(255, 154, 158, 0.15) 0%, rgba(254, 207, 239, 0.08) 100%)',
                filter: 'blur(80px)',
                borderRadius: '250px',
                zIndex: 0
            }} />
        </section>
    )
} 