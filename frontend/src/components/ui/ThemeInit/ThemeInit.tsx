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
        // 检查主题是否已经正确应用（由阻塞式脚本设置）
        const currentDataTheme = document.documentElement.getAttribute('data-theme')
        const needsUpdate = currentDataTheme !== theme

        const applyTheme = () => {
            document.documentElement.setAttribute('data-theme', theme)
            
            // 只有在主题实际发生变化时才触发重排
            if (needsUpdate) {
                // 使用更轻量的方式触发CSS重新计算
                const rootElement = document.documentElement
                rootElement.style.setProperty('--theme-update', Date.now().toString())
            }
        }

        // 如果需要更新主题，立即应用
        if (needsUpdate) {
            applyTheme()
        }
        
        // 添加小延迟确保路由切换完成后再检查一次
        const timer = setTimeout(() => {
            if (document.documentElement.getAttribute('data-theme') !== theme) {
                applyTheme()
            }
        }, 50)

        // 主题切换后的优化已通过阻塞式脚本和CSS处理，这里不再需要额外处理

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

    // 额外的路径变化监听 - 确保路由切换时主题保持一致
    useEffect(() => {
        // 路径变化时检查并确保主题正确
        const ensureThemeConsistency = () => {
            const currentDataTheme = document.documentElement.getAttribute('data-theme')
            if (currentDataTheme !== theme) {
                document.documentElement.setAttribute('data-theme', theme)
            }
        }

        // 添加小延迟确保路由切换完成
        const timer = setTimeout(ensureThemeConsistency, 100)
        
        return () => clearTimeout(timer)
    }, [pathname, theme]) // 路径变化时重新检查主题

    // 不渲染任何内容，纯功能组件
    return null
} 