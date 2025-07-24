'use client'

import { memo, useState, useEffect, useCallback } from 'react'

/**
 * 粒子配置接口
 */
interface ParticleConfig {
    id: number
    size: number
    left: number
    top: number
    animationDuration: number
    animationDelay: number
    opacity: number
    animation: string
    color: string
}

/**
 * 纯客户端CSS粒子背景组件 - CSSParticleBackgroundClient
 * 
 * 🎯 设计理念：
 * - 100%客户端渲染，避免SSR水合不匹配
 * - 轻量高效，零依赖，完美兼容
 * - 智能区域分布，与首屏3D效果完美配合
 * 
 * ✨ 技术特性：
 * - 80个动态粒子，6种不同动画轨迹（稀疏优雅）
 * - 蓝紫渐变色调，符合AI科技主题
 * - position: fixed 确保滚动时始终可见
 * - 完全避免SSR问题，仅在客户端渲染
 */
export const CSSParticleBackgroundClient = memo(function CSSParticleBackgroundClient() {
    const [particles, setParticles] = useState<ParticleConfig[]>([])
    const [mounted, setMounted] = useState(false)

    // 生成粒子配置 - 使用useCallback优化性能
    const generateParticles = useCallback((): ParticleConfig[] => {
        const particles: ParticleConfig[] = []

        for (let i = 0; i < 80; i++) {
            // 随机粒子属性 - 智能分布版本
            const size = Math.random() * 3 + 1.5 // 1.5-4.5px (更小更精致)
            const left = Math.random() * 100 // 0-100%
            const top = Math.random() * 100 // 0-100% 全屏分布
            // 创造快慢交替的速度层次
            const speedType = Math.random()
            let animationDuration
            if (speedType < 0.3) {
                animationDuration = Math.random() * 4 + 3 // 3-7秒 (快速粒子30%)
            } else if (speedType < 0.7) {
                animationDuration = Math.random() * 6 + 8 // 8-14秒 (中速粒子40%)
            } else {
                animationDuration = Math.random() * 8 + 16 // 16-24秒 (慢速粒子30%)
            }
            const animationDelay = Math.random() * 15 // 0-15秒随机延迟，增加自由度
            const opacity = Math.random() * 0.4 + 0.2 // 0.2-0.6 (更加subtle)

            // 6种不同的动画类型
            const animationType = i % 6
            const animations = [
                'floatUp', 'floatDiagonal', 'floatZigzag',
                'floatSway', 'floatSpiral', 'floatSine'
            ]

            // 颜色变化 - AI科技主题蓝紫色调
            const colorType = i % 3
            const colors = [
                '#3B82F6', // 主蓝色
                '#8B5CF6', // 主紫色
                '#60A5FA'  // 淡蓝色
            ]

            particles.push({
                id: i,
                size,
                left,
                top,
                animationDuration,
                animationDelay,
                opacity,
                animation: animations[animationType],
                color: colors[colorType]
            })
        }

        return particles
    }, [])

    // 仅在客户端挂载后生成粒子
    useEffect(() => {
        setMounted(true)
        setParticles(generateParticles())
    }, [generateParticles])

    // 挂载前不渲染任何内容
    if (!mounted) {
        return null
    }

    return (
        <div
            className="css-particle-background"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0.5, // 在背景层，配合第一屏渐变过渡
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
        >
            {/* 渲染所有粒子 */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className={`particle particle-${particle.animation}`}
                    style={{
                        position: 'absolute',
                        left: `${particle.left}%`,
                        top: `${particle.top}%`, // 恢复百分比，全屏分布
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                        borderRadius: '50%',
                        opacity: particle.opacity,
                        animation: `${particle.animation} ${particle.animationDuration}s infinite linear`,
                        animationDelay: `${particle.animationDelay}s`
                    }}
                />
            ))}

            {/* CSS动画定义 */}
            <style jsx>{`
                /* 轻微上下漂浮 - 增加自由度 */
                @keyframes floatUp {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-15px) translateX(5px);
                    }
                    50% {
                        transform: translateY(-30px) translateX(0);
                    }
                    75% {
                        transform: translateY(-15px) translateX(-5px);
                    }
                }

                /* 对角自由漂浮 */
                @keyframes floatDiagonal {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    33% {
                        transform: translateY(-20px) translateX(20px);
                    }
                    66% {
                        transform: translateY(-10px) translateX(25px);
                    }
                }

                /* Z字形自由摆动 */
                @keyframes floatZigzag {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    20% {
                        transform: translateY(-8px) translateX(15px);
                    }
                    40% {
                        transform: translateY(-16px) translateX(-8px);
                    }
                    60% {
                        transform: translateY(-24px) translateX(12px);
                    }
                    80% {
                        transform: translateY(-12px) translateX(-15px);
                    }
                }

                /* 椭圆形自由摆动 */
                @keyframes floatSway {
                    0% {
                        transform: translateY(0) translateX(0);
                    }
                    20% {
                        transform: translateY(-12px) translateX(15px);
                    }
                    40% {
                        transform: translateY(-20px) translateX(5px);
                    }
                    60% {
                        transform: translateY(-25px) translateX(-10px);
                    }
                    80% {
                        transform: translateY(-15px) translateX(-18px);
                    }
                    100% {
                        transform: translateY(0) translateX(0);
                    }
                }

                /* 螺旋自由旋转 */
                @keyframes floatSpiral {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-8px) translateX(12px) rotate(90deg);
                    }
                    50% {
                        transform: translateY(-20px) translateX(8px) rotate(180deg);
                    }
                    75% {
                        transform: translateY(-15px) translateX(-5px) rotate(270deg);
                    }
                    100% {
                        transform: translateY(0) translateX(0) rotate(360deg);
                    }
                }

                /* 正弦波自由流动 */
                @keyframes floatSine {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    16% {
                        transform: translateY(-8px) translateX(10px);
                    }
                    33% {
                        transform: translateY(-18px) translateX(-5px);
                    }
                    50% {
                        transform: translateY(-12px) translateX(15px);
                    }
                    66% {
                        transform: translateY(-25px) translateX(-8px);
                    }
                    83% {
                        transform: translateY(-15px) translateX(12px);
                    }
                }

                /* 性能优化 */
                .particle {
                    will-change: transform, opacity;
                    backface-visibility: hidden;
                    transform-style: preserve-3d;
                }
            `}</style>
        </div>
    )
}) 