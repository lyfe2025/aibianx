'use client'

import { memo, useState, useEffect, useCallback } from 'react'

/**
 * 粒子配置接口
 */
interface ParticleConfig {
    id: number
    size: number
    left: number
    top: number // 新增：垂直位置
    animationDuration: number
    animationDelay: number
    opacity: number
    animation: string
    color: string
}

/**
 * 纯CSS粒子背景组件 - CSSParticleBackground
 * 
 * 🎯 设计理念：
 * - 100%纯CSS实现，绝对稳定可靠
 * - 轻量高效，零依赖，完美兼容
 * - 视觉效果媲美Three.js，但维护成本极低
 * - 智能区域分布，与首屏3D效果完美配合
 * 
 * ✨ 技术特性：
 * - 150个动态粒子，6种不同动画轨迹
 * - 蓝紫渐变色调，符合AI科技主题
 * - position: fixed 确保滚动时始终可见
 * - 避开首屏区域（0-100vh），保持原有3D效果
 * - 从第二屏开始分布（100vh-400vh），提供一致背景
 */
export const CSSParticleBackground = memo(function CSSParticleBackground() {
    // 客户端渲染状态 - 解决SSR水合不匹配问题
    const [isClient, setIsClient] = useState(false)
    const [particles, setParticles] = useState<ParticleConfig[]>([])

    // 生成粒子配置 - 使用useCallback优化性能
    const generateParticles = useCallback((): ParticleConfig[] => {
        const particles: ParticleConfig[] = []

        for (let i = 0; i < 150; i++) {
            // 随机粒子属性 - 智能分布版本
            const size = Math.random() * 4 + 2 // 2-6px (适中大小，可见但不突兀)
            const left = Math.random() * 100 // 0-100%
            const top = Math.random() * 100 // 0-100% 全屏分布
            const animationDuration = Math.random() * 12 + 8 // 8-20秒 (缓慢优雅)
            const animationDelay = Math.random() * 10 // 0-10秒随机延迟
            const opacity = Math.random() * 0.6 + 0.4 // 0.4-1.0 (更强的可见性)

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
                top, // 新增：垂直位置
                animationDuration,
                animationDelay,
                opacity,
                animation: animations[animationType],
                color: colors[colorType]
            })
        }

        return particles
    }, [])

    // 客户端水合后生成粒子 - 避免SSR不匹配
    useEffect(() => {
        setIsClient(true)
        setParticles(generateParticles())
    }, [generateParticles])

    // 服务端渲染时返回null，避免水合不匹配
    if (!isClient) {
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
                height: '100vh', // 恢复视口高度
                zIndex: 0.5, // 在背景层，但高于body背景
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
                /* 轻微上下漂浮 */
                @keyframes floatUp {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    50% {
                        transform: translateY(-20px) translateX(0);
                    }
                }

                /* 对角轻微漂浮 */
                @keyframes floatDiagonal {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    50% {
                        transform: translateY(-15px) translateX(15px);
                    }
                }

                /* 左右摆动 */
                @keyframes floatZigzag {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-10px) translateX(10px);
                    }
                    75% {
                        transform: translateY(-10px) translateX(-10px);
                    }
                }

                /* 圆形摆动 */
                @keyframes floatSway {
                    0% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(-8px) translateX(8px);
                    }
                    50% {
                        transform: translateY(-16px) translateX(0);
                    }
                    75% {
                        transform: translateY(-8px) translateX(-8px);
                    }
                    100% {
                        transform: translateY(0) translateX(0);
                    }
                }

                /* 旋转漂浮 */
                @keyframes floatSpiral {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-12px) translateX(8px) rotate(180deg);
                    }
                    100% {
                        transform: translateY(0) translateX(0) rotate(360deg);
                    }
                }

                /* 正弦波漂浮 */
                @keyframes floatSine {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    20% {
                        transform: translateY(-6px) translateX(6px);
                    }
                    40% {
                        transform: translateY(-12px) translateX(-3px);
                    }
                    60% {
                        transform: translateY(-6px) translateX(6px);
                    }
                    80% {
                        transform: translateY(-12px) translateX(-3px);
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