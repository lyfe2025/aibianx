'use client'

import React, { forwardRef, ReactElement, cloneElement, ComponentProps } from 'react'
import { useGestures, useSimpleGestures } from '@/lib/hooks/useGestures'
import { useTouchFeedback, useSimpleTouchFeedback } from '@/lib/hooks/useTouchFeedback'

/**
 * 移动端触控优化组件 - TouchOptimized
 * 
 * 为任何组件添加移动端触控优化功能
 * 包括手势识别、触控反馈、性能优化等
 * 
 * 设计目标：
 * - 无侵入式的触控增强
 * - 可配置的手势和反馈
 * - 保持原组件的所有props
 * - TypeScript类型安全
 */

interface TouchOptimizedProps {
    children: ReactElement
    
    // 手势配置
    enableGestures?: boolean
    onTap?: () => void
    onDoubleTap?: () => void
    onLongPress?: () => void
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSwipeDown?: () => void
    
    // 触控反馈配置
    enableFeedback?: boolean
    feedbackType?: 'simple' | 'advanced'
    hapticEnabled?: boolean
    visualFeedback?: boolean
    soundFeedback?: boolean
    
    // 性能优化
    optimizeRendering?: boolean
    preventScrollWhenDragging?: boolean
    
    // 可访问性
    accessibilityRole?: string
    accessibilityLabel?: string
    
    className?: string
}

export const TouchOptimized = forwardRef<HTMLElement, TouchOptimizedProps>(
    ({
        children,
        enableGestures = true,
        onTap,
        onDoubleTap,
        onLongPress,
        onSwipeLeft,
        onSwipeRight,
        onSwipeUp,
        onSwipeDown,
        enableFeedback = true,
        feedbackType = 'simple',
        hapticEnabled = true,
        visualFeedback = true,
        soundFeedback = false,
        optimizeRendering = true,
        preventScrollWhenDragging = true,
        accessibilityRole,
        accessibilityLabel,
        className = ''
    }, ref) => {
        
        // 手势处理
        const { elementRef: gestureRef, gestureState } = useGestures(
            {
                enableTap: !!onTap,
                enableLongPress: !!onLongPress,
                enableSwipe: !!(onSwipeLeft || onSwipeRight || onSwipeUp || onSwipeDown),
                preventDefault: preventScrollWhenDragging
            },
            {
                onTap,
                onDoubleTap,
                onLongPress,
                onSwipeLeft,
                onSwipeRight,
                onSwipeUp,
                onSwipeDown
            }
        )

        // 触控反馈
        const { elementRef: feedbackRef } = feedbackType === 'simple' 
            ? useSimpleTouchFeedback(enableFeedback)
            : useTouchFeedback({
                enableVisualFeedback: visualFeedback,
                enableHapticFeedback: hapticEnabled,
                enableSoundFeedback: soundFeedback,
                disabled: !enableFeedback
            })

        // 合并refs
        const mergedRef = React.useCallback((element: HTMLElement | null) => {
            // 设置手势ref
            if (gestureRef.current !== element) {
                ;(gestureRef as React.MutableRefObject<HTMLElement | null>).current = element
            }
            
            // 设置反馈ref
            if (feedbackRef.current !== element) {
                ;(feedbackRef as React.MutableRefObject<HTMLElement | null>).current = element
            }
            
            // 设置外部ref
            if (ref) {
                if (typeof ref === 'function') {
                    ref(element)
                } else {
                    ref.current = element
                }
            }
        }, [gestureRef, feedbackRef, ref])

        // 优化渲染的组件属性
        const optimizedProps = React.useMemo(() => {
            const props: Record<string, any> = {}
            
            // 性能优化
            if (optimizeRendering) {
                props.style = {
                    ...children.props.style,
                    touchAction: preventScrollWhenDragging ? 'manipulation' : 'auto',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                    WebkitTapHighlightColor: 'transparent'
                }
            }
            
            // 可访问性
            if (accessibilityRole) {
                props.role = accessibilityRole
            }
            
            if (accessibilityLabel) {
                props['aria-label'] = accessibilityLabel
            }
            
            // 触控优化
            if (onTap) {
                props['aria-expanded'] = gestureState.isPressed
            }
            
            // CSS类名
            const gestureClasses = []
            if (gestureState.isPressed) gestureClasses.push('touch-pressed')
            if (gestureState.isDragging) gestureClasses.push('touch-dragging')
            if (gestureState.isPinching) gestureClasses.push('touch-pinching')
            
            props.className = [
                children.props.className,
                className,
                'touch-optimized',
                ...gestureClasses
            ].filter(Boolean).join(' ')
            
            return props
        }, [
            children.props.style,
            children.props.className,
            optimizeRendering,
            preventScrollWhenDragging,
            accessibilityRole,
            accessibilityLabel,
            onTap,
            gestureState,
            className
        ])

        // 克隆子组件并添加优化属性
        const enhancedChild = cloneElement(children, {
            ...optimizedProps,
            ref: mergedRef
        })

        return (
            <>
                {enhancedChild}
                
                {/* 添加全局触控优化样式 */}
                <style jsx global>{`
                    .touch-optimized {
                        /* 基础触控优化 */
                        -webkit-tap-highlight-color: transparent;
                        -webkit-touch-callout: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        
                        /* 触控区域优化 */
                        min-height: 44px;
                        min-width: 44px;
                        
                        /* 性能优化 */
                        will-change: transform, opacity;
                        transform: translateZ(0);
                    }
                    
                    .touch-optimized.touch-pressed {
                        /* 按压状态样式 */
                        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    
                    .touch-optimized.touch-dragging {
                        /* 拖拽状态样式 */
                        cursor: grabbing;
                        z-index: 1000;
                    }
                    
                    .touch-optimized.touch-pinching {
                        /* 缩放状态样式 */
                        pointer-events: none;
                    }
                    
                    /* 移动端特定优化 */
                    @media (hover: none) and (pointer: coarse) {
                        .touch-optimized {
                            /* 确保触摸目标足够大 */
                            min-height: max(44px, 2.75rem);
                            min-width: max(44px, 2.75rem);
                            
                            /* 触摸设备专用样式 */
                            touch-action: manipulation;
                        }
                        
                        .touch-optimized:active {
                            /* 激活状态反馈 */
                            opacity: 0.8;
                            transform: scale(0.98);
                        }
                    }
                    
                    /* 高分辨率显示优化 */
                    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                        .touch-optimized {
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                        }
                    }
                    
                    /* 减少动画偏好 */
                    @media (prefers-reduced-motion: reduce) {
                        .touch-optimized,
                        .touch-optimized.touch-pressed {
                            transition: none !important;
                            animation: none !important;
                        }
                    }
                    
                    /* 深色模式优化 */
                    @media (prefers-color-scheme: dark) {
                        .touch-optimized {
                            /* 深色模式下的触控反馈 */
                        }
                    }
                `}</style>
            </>
        )
    }
)

TouchOptimized.displayName = 'TouchOptimized'

/**
 * 高阶组件版本 - withTouchOptimization
 * 
 * 用于包装现有组件，添加触控优化功能
 */
export function withTouchOptimization<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    defaultOptions: Partial<TouchOptimizedProps> = {}
) {
    const TouchOptimizedComponent = forwardRef<HTMLElement, P & TouchOptimizedProps>(
        (props, ref) => {
            const { ...touchProps } = props
            const componentProps = { ...props }
            
            // 分离TouchOptimized的props
            const touchOptimizedProps = {
                ...defaultOptions,
                ...touchProps
            }
            
            return (
                <TouchOptimized {...touchOptimizedProps} ref={ref}>
                    <WrappedComponent {...componentProps as P} />
                </TouchOptimized>
            )
        }
    )
    
    TouchOptimizedComponent.displayName = `withTouchOptimization(${WrappedComponent.displayName || WrappedComponent.name})`
    
    return TouchOptimizedComponent
}

/**
 * 预设配置的触控优化组件
 */

// 按钮优化
export const TouchOptimizedButton = forwardRef<HTMLButtonElement, ComponentProps<'button'> & TouchOptimizedProps>(
    (props, ref) => (
        <TouchOptimized 
            {...props} 
            accessibilityRole="button"
            hapticEnabled={true}
            visualFeedback={true}
        >
            <button {...props} ref={ref} />
        </TouchOptimized>
    )
)

TouchOptimizedButton.displayName = 'TouchOptimizedButton'

// 卡片优化
export const TouchOptimizedCard = forwardRef<HTMLDivElement, ComponentProps<'div'> & TouchOptimizedProps>(
    (props, ref) => (
        <TouchOptimized 
            {...props}
            feedbackType="simple"
            enableGestures={true}
        >
            <div {...props} ref={ref} />
        </TouchOptimized>
    )
)

TouchOptimizedCard.displayName = 'TouchOptimizedCard'