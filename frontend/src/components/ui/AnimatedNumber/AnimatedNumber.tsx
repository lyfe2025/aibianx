'use client'

import React, { useState, useEffect, useRef } from 'react'
import { GradientText } from '../Text/GradientText'

interface AnimatedNumberProps {
    value: string
    duration?: number
    delay?: number
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl'
    weight?: 'normal' | 'medium' | 'semibold' | 'bold'
    className?: string
    style?: React.CSSProperties
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
    value,
    duration = 2000,
    delay = 0,
    size = '7xl',
    weight = 'bold',
    className = '',
    style = {}
}) => {
    const [displayValue, setDisplayValue] = useState(value.endsWith('万+') ? '0万+' : '0+')
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number>()
    const hasAnimatedRef = useRef(false)

    // 解析目标数值
    const getTargetNumber = (val: string): number => {
        if (val === '30万+') return 30
        if (val === '500+') return 500
        if (val === '120+') return 120
        if (val === '50+') return 50
        return 0
    }

    const targetNumber = getTargetNumber(value)
    const isWanValue = value.includes('万')

    // 开始动画
    const startAnimation = () => {
        if (hasAnimatedRef.current) return
        hasAnimatedRef.current = true

        console.log('🚀 Starting animation for:', value, 'target:', targetNumber)

        let startTime: number | null = null

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp

            const elapsed = timestamp - startTime
            const progress = Math.min(elapsed / duration, 1)

            // 简单的线性插值，更容易调试
            const currentNumber = Math.round(progress * targetNumber)

            // 更新显示值
            const newDisplayValue = isWanValue ? `${currentNumber}万+` : `${currentNumber}+`
            setDisplayValue(newDisplayValue)

            console.log('📊 Animation update:', {
                progress: Math.round(progress * 100) + '%',
                currentNumber,
                newDisplayValue
            })

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate)
            } else {
                console.log('✅ Animation completed for:', value)
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    // Intersection Observer
    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    console.log('👁️ Element visible:', value, 'delay:', delay)

                    setTimeout(() => {
                        startAnimation()
                    }, delay)
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, []) // 空依赖数组，只在挂载时运行

    return (
        <div ref={elementRef}>
            <GradientText
                size={size}
                weight={weight}
                className={className}
                style={{
                    ...style,
                    whiteSpace: 'nowrap',
                    lineHeight: size === '7xl' ? '76.8px' : undefined
                }}
            >
                {displayValue}
            </GradientText>
        </div>
    )
} 