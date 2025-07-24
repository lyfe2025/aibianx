'use client'

import { useEffect } from 'react'
import { startGlobalCountdown } from '@/stores'

/**
 * 全局倒计时初始化组件
 * 用于在应用启动时初始化全局倒计时系统
 */
export function GlobalCountdownInit() {
    useEffect(() => {
        // 启动全局倒计时
        startGlobalCountdown()

        // 清理函数
        return () => {
            // 组件卸载时不停止倒计时，让倒计时持续运行
        }
    }, [])

    // 这个组件不渲染任何内容
    return null
} 