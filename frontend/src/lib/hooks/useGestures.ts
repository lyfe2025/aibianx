'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

/**
 * 移动端手势交互Hook - useGestures
 * 
 * 为移动端组件提供手势识别和处理功能
 * 支持点击、长按、滑动、拖拽等常见手势
 * 
 * 设计目标：
 * - 原生般的触控体验
 * - 多种手势类型支持
 * - 可配置的手势参数
 * - TypeScript类型安全
 */

interface GestureOptions {
    // 点击配置
    enableTap?: boolean
    tapThreshold?: number
    
    // 长按配置
    enableLongPress?: boolean
    longPressDelay?: number
    
    // 滑动配置
    enableSwipe?: boolean
    swipeThreshold?: number
    swipeVelocityThreshold?: number
    
    // 拖拽配置
    enableDrag?: boolean
    dragThreshold?: number
    
    // 通用配置
    preventDefault?: boolean
    passive?: boolean
}

interface GestureCallbacks {
    onTap?: (event: TouchEvent) => void
    onDoubleTap?: (event: TouchEvent) => void
    onLongPress?: (event: TouchEvent) => void
    onSwipeLeft?: (event: TouchEvent, distance: number) => void
    onSwipeRight?: (event: TouchEvent, distance: number) => void
    onSwipeUp?: (event: TouchEvent, distance: number) => void
    onSwipeDown?: (event: TouchEvent, distance: number) => void
    onDragStart?: (event: TouchEvent) => void
    onDragMove?: (event: TouchEvent, deltaX: number, deltaY: number) => void
    onDragEnd?: (event: TouchEvent) => void
    onPinchStart?: (event: TouchEvent) => void
    onPinchMove?: (event: TouchEvent, scale: number) => void
    onPinchEnd?: (event: TouchEvent) => void
}

interface TouchPoint {
    x: number
    y: number
    timestamp: number
}

export function useGestures(
    options: GestureOptions = {},
    callbacks: GestureCallbacks = {}
) {
    const elementRef = useRef<HTMLElement>(null)
    
    // 手势状态
    const [isPressed, setIsPressed] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isPinching, setIsPinching] = useState(false)
    
    // 触摸点状态
    const touchStartRef = useRef<TouchPoint | null>(null)
    const touchMoveRef = useRef<TouchPoint | null>(null)
    const lastTapRef = useRef<TouchPoint | null>(null)
    const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
    const dragStartRef = useRef<TouchPoint | null>(null)
    const pinchStartDistanceRef = useRef<number>(0)
    
    // 默认配置
    const {
        enableTap = true,
        tapThreshold = 10,
        enableLongPress = false,
        longPressDelay = 500,
        enableSwipe = false,
        swipeThreshold = 50,
        swipeVelocityThreshold = 0.3,
        enableDrag = false,
        dragThreshold = 10,
        preventDefault = true,
        passive = false
    } = options

    // 计算两点距离
    const getDistance = useCallback((point1: TouchPoint, point2: TouchPoint) => {
        const dx = point2.x - point1.x
        const dy = point2.y - point1.y
        return Math.sqrt(dx * dx + dy * dy)
    }, [])

    // 计算触摸点中心距离（用于双指手势）
    const getTouchDistance = useCallback((touches: TouchList) => {
        if (touches.length < 2) return 0
        
        const touch1 = touches[0]
        const touch2 = touches[1]
        const dx = touch1.clientX - touch2.clientX
        const dy = touch1.clientY - touch2.clientY
        
        return Math.sqrt(dx * dx + dy * dy)
    }, [])

    // 清除长按定时器
    const clearLongPressTimer = useCallback(() => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current)
            longPressTimerRef.current = null
        }
    }, [])

    // 触摸开始
    const handleTouchStart = useCallback((event: TouchEvent) => {
        if (preventDefault && !passive) {
            event.preventDefault()
        }

        const touch = event.touches[0]
        const now = Date.now()
        
        const touchPoint: TouchPoint = {
            x: touch.clientX,
            y: touch.clientY,
            timestamp: now
        }

        touchStartRef.current = touchPoint
        setIsPressed(true)

        // 检测双指手势
        if (event.touches.length === 2) {
            const distance = getTouchDistance(event.touches)
            pinchStartDistanceRef.current = distance
            setIsPinching(true)
            callbacks.onPinchStart?.(event)
            return
        }

        // 长按检测
        if (enableLongPress && callbacks.onLongPress) {
            longPressTimerRef.current = setTimeout(() => {
                callbacks.onLongPress?.(event)
                clearLongPressTimer()
            }, longPressDelay)
        }

        // 拖拽准备
        if (enableDrag) {
            dragStartRef.current = touchPoint
        }
    }, [
        preventDefault, passive, enableLongPress, enableDrag, 
        longPressDelay, callbacks, getTouchDistance, clearLongPressTimer
    ])

    // 触摸移动
    const handleTouchMove = useCallback((event: TouchEvent) => {
        if (!touchStartRef.current) return

        if (preventDefault && !passive) {
            event.preventDefault()
        }

        const touch = event.touches[0]
        const now = Date.now()
        
        const touchPoint: TouchPoint = {
            x: touch.clientX,
            y: touch.clientY,
            timestamp: now
        }

        touchMoveRef.current = touchPoint

        // 双指缩放
        if (isPinching && event.touches.length === 2) {
            const currentDistance = getTouchDistance(event.touches)
            const scale = currentDistance / pinchStartDistanceRef.current
            callbacks.onPinchMove?.(event, scale)
            return
        }

        // 计算移动距离
        const distance = getDistance(touchStartRef.current, touchPoint)

        // 如果移动距离超过阈值，清除长按
        if (distance > tapThreshold) {
            clearLongPressTimer()
        }

        // 拖拽处理
        if (enableDrag && dragStartRef.current) {
            const dragDistance = getDistance(dragStartRef.current, touchPoint)
            
            if (!isDragging && dragDistance > dragThreshold) {
                setIsDragging(true)
                callbacks.onDragStart?.(event)
            }
            
            if (isDragging) {
                const deltaX = touchPoint.x - dragStartRef.current.x
                const deltaY = touchPoint.y - dragStartRef.current.y
                callbacks.onDragMove?.(event, deltaX, deltaY)
            }
        }
    }, [
        preventDefault, passive, enableDrag, dragThreshold, tapThreshold,
        isPinching, isDragging, callbacks, getDistance, getTouchDistance, 
        clearLongPressTimer
    ])

    // 触摸结束
    const handleTouchEnd = useCallback((event: TouchEvent) => {
        if (preventDefault && !passive) {
            event.preventDefault()
        }

        setIsPressed(false)
        clearLongPressTimer()

        // 双指手势结束
        if (isPinching) {
            setIsPinching(false)
            callbacks.onPinchEnd?.(event)
            pinchStartDistanceRef.current = 0
        }

        // 拖拽结束
        if (isDragging) {
            setIsDragging(false)
            callbacks.onDragEnd?.(event)
        }

        // 重置拖拽状态
        dragStartRef.current = null

        if (!touchStartRef.current || !touchMoveRef.current) {
            touchStartRef.current = null
            touchMoveRef.current = null
            return
        }

        const startPoint = touchStartRef.current
        const endPoint = touchMoveRef.current || startPoint
        const distance = getDistance(startPoint, endPoint)
        const timeDiff = endPoint.timestamp - startPoint.timestamp
        const velocity = distance / timeDiff

        // 点击检测
        if (enableTap && distance < tapThreshold && !isDragging) {
            const now = Date.now()
            
            // 双击检测
            if (lastTapRef.current && 
                now - lastTapRef.current.timestamp < 300 &&
                getDistance(lastTapRef.current, endPoint) < tapThreshold) {
                callbacks.onDoubleTap?.(event)
                lastTapRef.current = null
            } else {
                callbacks.onTap?.(event)
                lastTapRef.current = endPoint
            }
        }

        // 滑动检测
        if (enableSwipe && distance > swipeThreshold && velocity > swipeVelocityThreshold) {
            const deltaX = endPoint.x - startPoint.x
            const deltaY = endPoint.y - startPoint.y
            const absX = Math.abs(deltaX)
            const absY = Math.abs(deltaY)

            if (absX > absY) {
                // 水平滑动
                if (deltaX > 0) {
                    callbacks.onSwipeRight?.(event, distance)
                } else {
                    callbacks.onSwipeLeft?.(event, distance)
                }
            } else {
                // 垂直滑动
                if (deltaY > 0) {
                    callbacks.onSwipeDown?.(event, distance)
                } else {
                    callbacks.onSwipeUp?.(event, distance)
                }
            }
        }

        // 重置状态
        touchStartRef.current = null
        touchMoveRef.current = null
    }, [
        preventDefault, passive, enableTap, enableSwipe, tapThreshold, 
        swipeThreshold, swipeVelocityThreshold, isPinching, isDragging,
        callbacks, getDistance, clearLongPressTimer
    ])

    // 绑定事件监听器
    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const touchStartOptions = { passive, capture: false }
        const touchMoveOptions = { passive, capture: false }
        const touchEndOptions = { passive, capture: false }

        element.addEventListener('touchstart', handleTouchStart, touchStartOptions)
        element.addEventListener('touchmove', handleTouchMove, touchMoveOptions)
        element.addEventListener('touchend', handleTouchEnd, touchEndOptions)

        return () => {
            element.removeEventListener('touchstart', handleTouchStart)
            element.removeEventListener('touchmove', handleTouchMove)
            element.removeEventListener('touchend', handleTouchEnd)
        }
    }, [handleTouchStart, handleTouchMove, handleTouchEnd, passive])

    // 清理函数
    useEffect(() => {
        return () => {
            clearLongPressTimer()
        }
    }, [clearLongPressTimer])

    return {
        elementRef,
        gestureState: {
            isPressed,
            isDragging,
            isPinching
        }
    }
}

/**
 * 简化版本的手势Hook，只支持最常用的手势
 */
export function useSimpleGestures(callbacks: {
    onTap?: () => void
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
}) {
    return useGestures(
        {
            enableTap: true,
            enableSwipe: true,
            tapThreshold: 10,
            swipeThreshold: 50
        },
        {
            onTap: callbacks.onTap,
            onSwipeLeft: callbacks.onSwipeLeft,
            onSwipeRight: callbacks.onSwipeRight
        }
    )
}