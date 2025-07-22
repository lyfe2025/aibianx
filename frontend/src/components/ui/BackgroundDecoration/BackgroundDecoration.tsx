'use client'

import { CSSProperties } from 'react'

interface BackgroundDecorationProps {
    /**
     * 装饰元素的位置
     * - 'top-left': 左上角
     * - 'top-right': 右上角  
     * - 'bottom-left': 左下角
     * - 'bottom-right': 右下角
     * - 'center': 居中
     * - 'custom': 自定义位置
     */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'custom'

    /**
     * 自定义位置样式（当position为'custom'时使用）
     */
    customPosition?: {
        top?: string
        right?: string
        bottom?: string
        left?: string
    }

    /**
     * 装饰元素的尺寸
     */
    size?: {
        width: string
        height: string
    }

    /**
     * 渐变颜色配置
     */
    gradient?: {
        fromColor: string
        toColor: string
        fromOpacity: number
        toOpacity: number
    }

    /**
     * 模糊程度（px）
     */
    blur?: number

    /**
     * 层级
     */
    zIndex?: number

    /**
     * 动画效果
     */
    animation?: {
        duration?: string
        delay?: string
        type?: 'float' | 'pulse' | 'rotate' | 'none'
    }

    /**
     * 自定义类名
     */
    className?: string
}

/**
 * 背景装饰组件 - BackgroundDecoration
 * 
 * 基于设计稿的蓝色渐变模糊效果，可配置位置、颜色、大小等属性
 * 
 * 功能特性：
 * - 多种预设位置选项
 * - 自定义渐变颜色和透明度
 * - 可调节模糊程度
 * - 支持多种动画效果
 * - 响应式设计适配
 * 
 * 设计规范：
 * - 默认尺寸: 600x600px
 * - 默认渐变: 蓝色渐变（79, 172, 254 -> 0, 242, 254）
 * - 默认模糊: 100px
 * - 完全圆形: border-radius: 50%
 */
export function BackgroundDecoration({
    position = 'top-left',
    customPosition,
    size = { width: '600px', height: '600px' },
    gradient = {
        fromColor: '79, 172, 254',
        toColor: '0, 242, 254',
        fromOpacity: 0.10,
        toOpacity: 0.05
    },
    blur = 100,
    zIndex = 0,
    animation = { type: 'none' },
    className = ''
}: BackgroundDecorationProps) {

    // 预设位置配置
    const positionStyles: Record<string, CSSProperties> = {
        'top-left': {
            top: '-300px',
            left: '-200px'
        },
        'top-right': {
            top: '-300px',
            right: '-200px'
        },
        'bottom-left': {
            bottom: '-300px',
            left: '-200px'
        },
        'bottom-right': {
            bottom: '-300px',
            right: '-200px'
        },
        'center': {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        'custom': customPosition || {}
    }

    // 动画样式配置
    const animationStyles: Record<string, CSSProperties> = {
        'float': {
            animation: `backgroundFloat ${animation.duration || '6s'} ease-in-out infinite ${animation.delay || '0s'}`
        },
        'pulse': {
            animation: `backgroundPulse ${animation.duration || '4s'} ease-in-out infinite ${animation.delay || '0s'}`
        },
        'rotate': {
            animation: `backgroundRotate ${animation.duration || '20s'} linear infinite ${animation.delay || '0s'}`
        },
        'none': {}
    }

    const baseStyles: CSSProperties = {
        position: 'absolute',
        width: size.width,
        height: size.height,
        background: `linear-gradient(90deg, rgba(${gradient.fromColor}, ${gradient.fromOpacity}) 0%, rgba(${gradient.toColor}, ${gradient.toOpacity}) 100%)`,
        filter: `blur(${blur}px)`,
        borderRadius: '50%',
        zIndex: zIndex,
        pointerEvents: 'none',
        ...positionStyles[position],
        ...animationStyles[animation.type || 'none']
    }

    return (
        <>
            <div
                className={`background-decoration ${className}`}
                style={baseStyles}
            />

            {/* 动画关键帧样式 */}
            <style jsx>{`
                @keyframes backgroundFloat {
                    0%, 100% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-20px) scale(1.05);
                    }
                }
                
                @keyframes backgroundPulse {
                    0%, 100% {
                        opacity: ${gradient.fromOpacity};
                        transform: scale(1);
                    }
                    50% {
                        opacity: ${gradient.fromOpacity * 1.5};
                        transform: scale(1.1);
                    }
                }
                
                @keyframes backgroundRotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                /* 响应式适配 */
                @media (max-width: 768px) {
                    .background-decoration {
                        width: 400px !important;
                        height: 400px !important;
                        filter: blur(60px) !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .background-decoration {
                        width: 300px !important;
                        height: 300px !important;
                        filter: blur(40px) !important;
                    }
                }
            `}</style>
        </>
    )
} 