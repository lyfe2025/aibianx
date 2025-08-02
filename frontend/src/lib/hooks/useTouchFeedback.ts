'use client'

import { useRef, useCallback, useEffect } from 'react'

/**
 * 移动端触控反馈Hook - useTouchFeedback
 * 
 * 为移动端组件提供触控反馈效果
 * 包括视觉反馈、触觉震动、波纹效果等
 * 
 * 设计目标：
 * - 原生般的触控反馈体验
 * - 可配置的反馈类型和强度
 * - 性能优化的动画效果
 * - 无障碍访问支持
 */

interface TouchFeedbackOptions {
    // 视觉反馈
    enableVisualFeedback?: boolean
    scaleOnPress?: number
    pressedOpacity?: number
    animationDuration?: number
    
    // 触觉反馈
    enableHapticFeedback?: boolean
    hapticType?: 'light' | 'medium' | 'heavy' | 'selection' | 'impact'
    
    // 波纹效果
    enableRipple?: boolean
    rippleColor?: string
    rippleDuration?: number
    
    // 声音反馈
    enableSoundFeedback?: boolean
    soundType?: 'tap' | 'click' | 'success' | 'error'
    
    // 性能优化
    throttleDelay?: number
    disabled?: boolean
}

interface RippleEffect {
    id: string
    x: number
    y: number
    timestamp: number
}

export function useTouchFeedback(options: TouchFeedbackOptions = {}) {
    const elementRef = useRef<HTMLElement>(null)
    const ripplesRef = useRef<RippleEffect[]>([])
    const lastFeedbackRef = useRef<number>(0)
    const pressedRef = useRef<boolean>(false)
    
    // 默认配置
    const {
        enableVisualFeedback = true,
        scaleOnPress = 0.95,
        pressedOpacity = 0.8,
        animationDuration = 150,
        enableHapticFeedback = true,
        hapticType = 'light',
        enableRipple = false,
        rippleColor = 'rgba(255, 255, 255, 0.3)',
        rippleDuration = 600,
        enableSoundFeedback = false,
        soundType = 'tap',
        throttleDelay = 50,
        disabled = false
    } = options

    // 触觉反馈
    const triggerHapticFeedback = useCallback(() => {
        if (!enableHapticFeedback || disabled) return
        
        try {
            if ('vibrate' in navigator) {
                // 标准振动API
                switch (hapticType) {
                    case 'light':
                        navigator.vibrate(10)
                        break
                    case 'medium':
                        navigator.vibrate(20)
                        break
                    case 'heavy':
                        navigator.vibrate(40)
                        break
                    case 'selection':
                        navigator.vibrate([5, 5])
                        break
                    case 'impact':
                        navigator.vibrate([10, 5, 10])
                        break
                }
            }
            
            // iOS设备的触觉反馈（如果支持）
            if ('DeviceMotionEvent' in window && 'requestPermission' in (DeviceMotionEvent as any)) {
                // iOS 13+的触觉反馈
                // 这需要在用户交互后才能使用
            }
        } catch (error) {
            console.warn('Haptic feedback not supported:', error)
        }
    }, [enableHapticFeedback, hapticType, disabled])

    // 声音反馈
    const triggerSoundFeedback = useCallback(() => {
        if (!enableSoundFeedback || disabled) return
        
        try {
            // 使用Web Audio API播放反馈音
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()
            
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)
            
            // 根据声音类型设置频率
            switch (soundType) {
                case 'tap':
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
                    break
                case 'click':
                    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
                    break
                case 'success':
                    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
                    break
                case 'error':
                    oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
                    break
            }
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
            
            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.1)
            
        } catch (error) {
            console.warn('Sound feedback not supported:', error)
        }
    }, [enableSoundFeedback, soundType, disabled])

    // 视觉反馈
    const applyVisualFeedback = useCallback((pressed: boolean) => {
        const element = elementRef.current
        if (!element || !enableVisualFeedback || disabled) return

        if (pressed) {
            element.style.transform = `scale(${scaleOnPress})`
            element.style.opacity = pressedOpacity.toString()
            element.style.transition = `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
        } else {
            element.style.transform = 'scale(1)'
            element.style.opacity = '1'
            element.style.transition = `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
        }
    }, [enableVisualFeedback, scaleOnPress, pressedOpacity, animationDuration, disabled])

    // 波纹效果
    const createRipple = useCallback((x: number, y: number) => {
        if (!enableRipple || disabled) return

        const element = elementRef.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const relativeX = x - rect.left
        const relativeY = y - rect.top

        const ripple: RippleEffect = {
            id: `ripple-${Date.now()}-${Math.random()}`,
            x: relativeX,
            y: relativeY,
            timestamp: Date.now()
        }

        ripplesRef.current.push(ripple)

        // 创建波纹元素
        const rippleElement = document.createElement('div')
        rippleElement.style.position = 'absolute'
        rippleElement.style.left = `${relativeX}px`
        rippleElement.style.top = `${relativeY}px`
        rippleElement.style.width = '0'
        rippleElement.style.height = '0'
        rippleElement.style.borderRadius = '50%'
        rippleElement.style.background = rippleColor
        rippleElement.style.transform = 'translate(-50%, -50%)'
        rippleElement.style.pointerEvents = 'none'
        rippleElement.style.zIndex = '1'
        rippleElement.style.animation = `ripple-expand ${rippleDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`

        // 确保元素有相对定位
        const computedStyle = window.getComputedStyle(element)
        if (computedStyle.position === 'static') {
            element.style.position = 'relative'
        }

        element.appendChild(rippleElement)

        // 添加CSS动画
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style')
            style.id = 'ripple-styles'
            style.textContent = `
                @keyframes ripple-expand {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }
                    100% {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }
            `
            document.head.appendChild(style)
        }

        // 清理波纹元素
        setTimeout(() => {
            if (rippleElement.parentNode) {
                rippleElement.parentNode.removeChild(rippleElement)
            }
            ripplesRef.current = ripplesRef.current.filter(r => r.id !== ripple.id)
        }, rippleDuration)

    }, [enableRipple, rippleColor, rippleDuration, disabled])

    // 节流处理
    const isThrottled = useCallback(() => {
        const now = Date.now()
        if (now - lastFeedbackRef.current < throttleDelay) {
            return true
        }
        lastFeedbackRef.current = now
        return false
    }, [throttleDelay])

    // 触摸开始处理
    const handleTouchStart = useCallback((event: TouchEvent | MouseEvent) => {
        if (disabled || isThrottled()) return

        pressedRef.current = true
        applyVisualFeedback(true)
        triggerHapticFeedback()
        triggerSoundFeedback()

        // 获取触摸点坐标
        let clientX: number, clientY: number
        if ('touches' in event) {
            const touch = event.touches[0]
            clientX = touch.clientX
            clientY = touch.clientY
        } else {
            clientX = event.clientX
            clientY = event.clientY
        }

        createRipple(clientX, clientY)
    }, [disabled, isThrottled, applyVisualFeedback, triggerHapticFeedback, triggerSoundFeedback, createRipple])

    // 触摸结束处理
    const handleTouchEnd = useCallback(() => {
        if (disabled) return

        pressedRef.current = false
        applyVisualFeedback(false)
    }, [disabled, applyVisualFeedback])

    // 触摸取消处理
    const handleTouchCancel = useCallback(() => {
        if (disabled) return

        pressedRef.current = false
        applyVisualFeedback(false)
    }, [disabled, applyVisualFeedback])

    // 绑定事件监听器
    useEffect(() => {
        const element = elementRef.current
        if (!element || disabled) return

        // 触摸事件
        element.addEventListener('touchstart', handleTouchStart, { passive: true })
        element.addEventListener('touchend', handleTouchEnd, { passive: true })
        element.addEventListener('touchcancel', handleTouchCancel, { passive: true })

        // 鼠标事件（用于桌面测试）
        element.addEventListener('mousedown', handleTouchStart)
        element.addEventListener('mouseup', handleTouchEnd)
        element.addEventListener('mouseleave', handleTouchCancel)

        return () => {
            element.removeEventListener('touchstart', handleTouchStart)
            element.removeEventListener('touchend', handleTouchEnd)
            element.removeEventListener('touchcancel', handleTouchCancel)
            element.removeEventListener('mousedown', handleTouchStart)
            element.removeEventListener('mouseup', handleTouchEnd)
            element.removeEventListener('mouseleave', handleTouchCancel)
        }
    }, [handleTouchStart, handleTouchEnd, handleTouchCancel, disabled])

    // 清理函数
    useEffect(() => {
        return () => {
            // 清理所有波纹效果
            ripplesRef.current = []
            
            // 重置视觉状态
            const element = elementRef.current
            if (element) {
                element.style.transform = ''
                element.style.opacity = ''
                element.style.transition = ''
            }
        }
    }, [])

    return {
        elementRef,
        isPressed: pressedRef.current,
        triggerFeedback: handleTouchStart,
        // 手动控制方法
        startFeedback: () => handleTouchStart({} as TouchEvent),
        endFeedback: handleTouchEnd,
        // 配置方法
        updateOptions: (newOptions: Partial<TouchFeedbackOptions>) => {
            Object.assign(options, newOptions)
        }
    }
}

/**
 * 简化版本的触控反馈Hook，使用默认配置
 */
export function useSimpleTouchFeedback(enabled: boolean = true) {
    return useTouchFeedback({
        enableVisualFeedback: enabled,
        enableHapticFeedback: enabled,
        disabled: !enabled
    })
}