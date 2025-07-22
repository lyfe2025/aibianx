'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
    children: ReactNode
    /**
     * 过渡动画持续时间（毫秒）
     */
    duration?: number

    /**
     * 动画类型
     */
    animationType?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'none'

    /**
     * 是否启用过渡动画
     */
    enabled?: boolean

    /**
     * 自定义类名
     */
    className?: string
}

/**
 * 页面过渡效果组件 - PageTransition
 * 
 * 提供平滑的页面切换过渡效果，优化用户体验
 * 
 * 功能特性：
 * - 多种过渡动画类型
 * - 自动检测路由变化
 * - 与菜单栏过渡同步
 * - 性能优化的动画
 * - 响应式设计支持
 * 
 * 设计规范：
 * - 默认动画: fade淡入淡出
 * - 持续时间: 500ms
 * - 缓动函数: cubic-bezier(0.25, 0.46, 0.45, 0.94)
 * - 层级管理: 确保与Header组件不冲突
 */
export function PageTransition({
    children,
    duration = 500,
    animationType = 'fade',
    enabled = true,
    className = ''
}: PageTransitionProps) {
    const pathname = usePathname()
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [displayContent, setDisplayContent] = useState(children)

    // 监听路由变化，触发过渡动画
    useEffect(() => {
        if (!enabled) {
            setDisplayContent(children)
            return
        }

        // 开始过渡动画
        setIsTransitioning(true)

        // 延迟更新内容，确保退出动画完成
        const timer = setTimeout(() => {
            setDisplayContent(children)
            setIsTransitioning(false)
        }, duration / 2)

        return () => clearTimeout(timer)
    }, [pathname, children, duration, enabled])

    // 获取动画样式
    const getAnimationStyles = () => {
        const baseTransition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`

        switch (animationType) {
            case 'fade':
                return {
                    transition: baseTransition,
                    opacity: isTransitioning ? 0 : 1
                }

            case 'slide-up':
                return {
                    transition: baseTransition,
                    transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
                    opacity: isTransitioning ? 0 : 1
                }

            case 'slide-down':
                return {
                    transition: baseTransition,
                    transform: isTransitioning ? 'translateY(-20px)' : 'translateY(0)',
                    opacity: isTransitioning ? 0 : 1
                }

            case 'scale':
                return {
                    transition: baseTransition,
                    transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
                    opacity: isTransitioning ? 0 : 1
                }

            case 'none':
            default:
                return {}
        }
    }

    const containerStyles = {
        ...getAnimationStyles(),
        willChange: 'transform, opacity',
        minHeight: '100vh',
        position: 'relative' as const
    }

    return (
        <div
            className={`page-transition ${className}`}
            style={containerStyles}
        >
            {displayContent}

            {/* 过渡期间的加载指示器 */}
            {isTransitioning && (
                <div style={{
                    position: 'fixed',
                    top: '98px', // 菜单栏高度
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--gradient-primary)',
                    zIndex: 1000,
                    animation: 'progressBar 0.5s ease-out'
                }} />
            )}

            <style jsx>{`
                @keyframes progressBar {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
                
                .page-transition {
                    /* 确保内容区域与Header不重叠 */
                    margin-top: 0;
                }
                
                /* 为不同页面类型提供特殊处理 */
                .page-transition.profile-page {
                    margin-top: 0; /* 个人中心页面不需要Header间距 */
                }
                
                .page-transition.standard-page {
                    padding-top: 98px; /* 标准页面需要Header间距 */
                }
                
                /* 响应式优化 */
                @media (max-width: 768px) {
                    .page-transition.standard-page {
                        padding-top: 80px; /* 移动端Header高度调整 */
                    }
                }
                
                /* 减少不必要的重排重绘 */
                @media (prefers-reduced-motion: reduce) {
                    .page-transition {
                        transition: none !important;
                        transform: none !important;
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    )
} 