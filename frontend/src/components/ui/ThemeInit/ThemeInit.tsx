'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/stores'

/**
 * ThemeInit 组件 - 主题初始化
 * 
 * 功能特性：
 * - 在客户端初始化时应用主题
 * - 确保主题状态与DOM属性同步
 * - 处理SSR水合时的主题应用
 */
export function ThemeInit() {
    const { theme, setTheme } = useThemeStore()

    useEffect(() => {
        // 应用当前主题到document
        document.documentElement.setAttribute('data-theme', theme)

        // 监听系统主题变化（可选功能）
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

            const handleSystemThemeChange = (_: MediaQueryListEvent) => {
      // 只有在用户没有明确设置主题时才跟随系统
      // 这里暂时不实现自动跟随，保持用户选择
    }

        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [theme, setTheme])

    // 不渲染任何内容，纯功能组件
    return null
} 