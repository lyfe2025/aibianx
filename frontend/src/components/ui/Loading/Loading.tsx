'use client'

import { useEffect, useState } from 'react'

export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl'
export type LoadingVariant = 'spinner' | 'dots' | 'pulse' | 'skeleton'
export type LoadingColor = 'primary' | 'secondary' | 'white'

interface LoadingProps {
    size?: LoadingSize
    variant?: LoadingVariant
    color?: LoadingColor
    text?: string
    overlay?: boolean
    fullscreen?: boolean
    className?: string
    style?: React.CSSProperties
}

/**
 * Loading 加载状态组件
 * 
 * 功能特性：
 * - 多种加载动画样式（旋转器、点阵、脉冲、骨架屏）
 * - 响应式尺寸（sm/md/lg/xl）
 * - 覆盖层模式（局部/全屏）
 * - 颜色主题适配
 * - 移动端触摸友好
 * - 无障碍标签支持
 * 
 * 设计规范：
 * - 动画时长: 0.8s-1.2s
 * - 缓动函数: ease-in-out
 * - 覆盖层: 半透明毛玻璃
 * - 最小触摸目标: 44px
 */
export function Loading({
    size = 'md',
    variant = 'spinner',
    color = 'primary',
    text,
    overlay = false,
    fullscreen = false,
    className = '',
    style = {},
}: LoadingProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return { width: '16px', height: '16px' }
            case 'md':
                return { width: '24px', height: '24px' }
            case 'lg':
                return { width: '32px', height: '32px' }
            case 'xl':
                return { width: '48px', height: '48px' }
            default:
                return { width: '24px', height: '24px' }
        }
    }

    const getColorStyles = () => {
        switch (color) {
            case 'primary':
                return {
                    color: 'var(--color-primary-blue)',
                    borderColor: 'var(--color-primary-blue)',
                }
            case 'secondary':
                return {
                    color: 'var(--color-text-secondary)',
                    borderColor: 'var(--color-text-secondary)',
                }
            case 'white':
                return {
                    color: '#FFFFFF',
                    borderColor: '#FFFFFF',
                }
            default:
                return {
                    color: 'var(--color-primary-blue)',
                    borderColor: 'var(--color-primary-blue)',
                }
        }
    }

    const renderSpinner = () => (
        <div
            className="loading-spinner"
            style={{
                ...getSizeStyles(),
                ...getColorStyles(),
                border: '2px solid transparent',
                borderTopColor: 'currentColor',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }}
            aria-label="加载中"
            role="status"
        />
    )

    const renderDots = () => (
        <div
            className="loading-dots"
            style={{
                display: 'flex',
                gap: size === 'sm' ? '2px' : size === 'md' ? '4px' : '6px',
                alignItems: 'center',
            }}
            aria-label="加载中"
            role="status"
        >
            {[0, 1, 2].map((index) => (
                <div
                    key={index}
                    style={{
                        width: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
                        height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
                        backgroundColor: getColorStyles().color,
                        borderRadius: '50%',
                        animation: `loading-dots 1.4s infinite ease-in-out ${index * 0.16}s`,
                    }}
                />
            ))}
        </div>
    )

    const renderPulse = () => (
        <div
            className="loading-pulse"
            style={{
                ...getSizeStyles(),
                backgroundColor: getColorStyles().color,
                borderRadius: '50%',
                animation: 'loading-pulse 1.5s infinite ease-in-out',
            }}
            aria-label="加载中"
            role="status"
        />
    )

    const renderSkeleton = () => (
        <div
            className="loading-skeleton"
            style={{
                width: '100%',
                height: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
                backgroundSize: '200% 100%',
                borderRadius: '4px',
                animation: 'loading-skeleton 1.5s infinite',
            }}
            aria-label="加载中"
            role="status"
        />
    )

    const renderLoadingContent = () => {
        let loadingElement

        switch (variant) {
            case 'dots':
                loadingElement = renderDots()
                break
            case 'pulse':
                loadingElement = renderPulse()
                break
            case 'skeleton':
                loadingElement = renderSkeleton()
                break
            default:
                loadingElement = renderSpinner()
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: text ? '12px' : '0',
                }}
            >
                {loadingElement}
                {text && (
                    <div
                        style={{
                            color: getColorStyles().color,
                            fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-base)',
                            fontWeight: 500,
                            textAlign: 'center',
                            marginTop: '8px',
                        }}
                    >
                        {text}
                    </div>
                )}
            </div>
        )
    }

    if (!mounted) return null

    if (overlay || fullscreen) {
        return (
            <div
                className={`loading-overlay ${className}`}
                style={{
                    position: fullscreen ? 'fixed' : 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.50)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: fullscreen ? 9998 : 10,
                    ...style,
                }}
                aria-live="polite"
                aria-busy="true"
            >
                <div
                    style={{
                        background: 'rgba(26, 26, 26, 0.90)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '16px',
                        padding: size === 'sm' ? '16px' : size === 'md' ? '24px' : '32px',
                        border: '1px solid rgba(42, 42, 42, 0.50)',
                        minWidth: '120px',
                        textAlign: 'center',
                    }}
                >
                    {renderLoadingContent()}
                </div>

                {/* 动画样式 */}
                <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes loading-dots {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes loading-pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.7;
            }
          }

          @keyframes loading-skeleton {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
            </div>
        )
    }

    return (
        <div
            className={`loading-inline ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }}
            aria-live="polite"
            aria-busy="true"
        >
            {renderLoadingContent()}

            {/* 内联动画样式 */}
            <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes loading-dots {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes loading-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes loading-skeleton {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
        </div>
    )
} 