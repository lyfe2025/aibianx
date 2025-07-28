'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useThemeStore } from '@/stores'

/**
 * ThemeInit 组件 - 主题初始化
 * 
 * 功能特性：
 * - 在客户端初始化时应用主题
 * - 确保主题状态与DOM属性同步
 * - 处理SSR水合时的主题应用
 * - 路由切换时强制重新应用主题
 */
export function ThemeInit() {
    const { theme } = useThemeStore()
    const pathname = usePathname()

    useEffect(() => {
        // 强制重新应用主题到document - 添加小延迟确保DOM准备就绪
        const applyTheme = () => {
            document.documentElement.setAttribute('data-theme', theme)
            
            // 强制重新计算CSS变量 - 触发重新渲染
            document.body.style.display = 'none'
            document.body.offsetHeight // 触发重排
            document.body.style.display = ''
        }

        // 立即应用主题
        applyTheme()
        
        // 添加小延迟再次应用，确保路由切换完成
        const timer = setTimeout(applyTheme, 50)

        // 轻量级修复：仅在主题切换时确保渐变按钮颜色正确
        const ensureGradientButtonColors = () => {
            // 延迟执行，确保主题已完全应用
            setTimeout(() => {
                const gradientButtons = document.querySelectorAll('div[style*="background: linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)"]')
                gradientButtons.forEach((button) => {
                    const textElements = button.querySelectorAll('*')
                    textElements.forEach((el) => {
                        if (el instanceof HTMLElement && el.style.color !== 'rgb(255, 255, 255)') {
                            el.style.setProperty('color', '#FFFFFF', 'important')
                        }
                    })
                })
            }, 100)
        }

        // 主题切换后确保颜色正确
        ensureGradientButtonColors()

        // 监听系统主题变化（可选功能）
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleSystemThemeChange = (_: MediaQueryListEvent) => {
            // 只有在用户没有明确设置主题时才跟随系统
            // 这里暂时不实现自动跟随，保持用户选择
        }

        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            clearTimeout(timer)
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [theme, pathname]) // 监听主题和路径变化

    // 额外的路径变化监听 - 确保路由切换时强制重新应用主题
    useEffect(() => {
        // 路径变化时强制重新应用当前主题
        const forceApplyTheme = () => {
            document.documentElement.setAttribute('data-theme', theme)
            // 强制触发CSS重新计算
            const rootElement = document.documentElement
            rootElement.style.setProperty('--force-reflow', Math.random().toString())
        }

        // 添加延迟确保路由切换完成
        const timer = setTimeout(forceApplyTheme, 100)
        
        return () => clearTimeout(timer)
    }, [pathname, theme]) // 路径变化时重新应用主题

    // 不渲染任何内容，纯功能组件
    return null
} 