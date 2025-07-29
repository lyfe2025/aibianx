'use client'

import { useState, useEffect } from 'react'
import type { ReadingProgressProps } from './ReadingProgress.types'

/**
 * ReadingProgress 阅读进度组件
 * 
 * 🎯 功能：
 * - 追踪文章阅读进度
 * - 固定在屏幕底部显示进度条
 * - 毛玻璃设计风格
 * - 自动计算基于内容区域的进度
 * 
 * 📱 响应式：
 * - 自适应屏幕宽度
 * - 智能定位和样式
 */
export function ReadingProgress({ targetSelector = '.glass-card' }: ReadingProgressProps) {
    const [readingProgress, setReadingProgress] = useState(0)

    // 阅读进度追踪
    useEffect(() => {
        const handleScroll = () => {
            const articleContentElement = document.querySelector(targetSelector)
            if (!articleContentElement) {
                setReadingProgress(0)
                return
            }

            const scrollY = window.pageYOffset
            const windowHeight = window.innerHeight
            const contentRect = articleContentElement.getBoundingClientRect()
            const contentTop = scrollY + contentRect.top
            const contentHeight = contentRect.height
            const contentEndScrollY = contentTop + contentHeight - windowHeight

            let progress = 0
            if (scrollY <= contentTop) {
                progress = 0
            } else if (scrollY >= contentEndScrollY) {
                progress = 100
            } else {
                const readableHeight = contentEndScrollY - contentTop
                const readProgress = scrollY - contentTop
                progress = (readProgress / readableHeight) * 100
            }

            setReadingProgress(Math.min(Math.max(progress, 0), 100))
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll, { passive: true })
            setTimeout(handleScroll, 200)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [targetSelector])

    // 渲染固定进度条
    useEffect(() => {
        if (typeof window === 'undefined') return

        const existingProgress = document.getElementById('reading-progress-fixed')
        if (existingProgress) {
            document.body.removeChild(existingProgress)
        }

        const progressContainer = document.createElement('div')
        progressContainer.id = 'reading-progress-fixed'
        progressContainer.style.cssText = `
            position: fixed !important;
            bottom: 24px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 320px !important;
            height: 48px !important;
            background: var(--color-bg-glass) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border: 1px solid var(--color-border-primary) !important;
            border-radius: 24px !important;
            padding: 12px 20px !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            z-index: 99999 !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        `

        const icon = document.createElement('div')
        icon.textContent = '📖'
        icon.style.cssText = `
            width: 16px !important;
            height: 16px !important;
            border-radius: 50% !important;
            background: var(--gradient-primary) !important;
            flex-shrink: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 8px !important;
            color: white !important;
            font-weight: 600 !important;
        `

        const progressBg = document.createElement('div')
        progressBg.style.cssText = `
            flex: 1 !important;
            height: 4px !important;
            background: rgba(255, 255, 255, 0.1) !important;
            border-radius: 2px !important;
            overflow: hidden !important;
            position: relative !important;
        `

        const progressFill = document.createElement('div')
        progressFill.id = 'progress-fill'
        progressFill.style.cssText = `
            width: 0% !important;
            height: 100% !important;
            background: var(--gradient-primary) !important;
            border-radius: 2px !important;
            transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            box-shadow: 0 0 8px rgba(59, 130, 246, 0.4) !important;
        `

        const percentage = document.createElement('div')
        percentage.id = 'progress-percentage'
        percentage.textContent = '0%'
        percentage.style.cssText = `
            font-size: var(--font-size-xs) !important;
            font-weight: 500 !important;
            color: var(--color-text-primary) !important;
            font-family: var(--font-family-primary) !important;
            min-width: 35px !important;
            text-align: right !important;
            flex-shrink: 0 !important;
        `

        progressBg.appendChild(progressFill)
        progressContainer.appendChild(icon)
        progressContainer.appendChild(progressBg)
        progressContainer.appendChild(percentage)
        document.body.appendChild(progressContainer)

        return () => {
            const existingProgress = document.getElementById('reading-progress-fixed')
            if (existingProgress) {
                document.body.removeChild(existingProgress)
            }
        }
    }, [])

    // 更新进度条显示
    useEffect(() => {
        const progressFill = document.getElementById('progress-fill')
        const percentage = document.getElementById('progress-percentage')

        if (progressFill && percentage) {
            progressFill.style.width = `${readingProgress}%`
            percentage.textContent = `${Math.round(readingProgress)}%`
        }
    }, [readingProgress])

    // 这个组件不渲染任何可见内容，只是管理进度条状态
    return null
} 