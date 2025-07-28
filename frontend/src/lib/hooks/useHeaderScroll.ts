/**
 * useHeaderScroll Hook
 * 
 * 封装Header滚动显示/隐藏逻辑
 * 处理页面切换和滚动事件
 */

import { useState, useEffect } from 'react'
import { createScrollHandler } from '@/lib/headerUtils'
import { SCROLL_CONFIG } from '@/constants/headerConfig'

interface UseHeaderScrollReturn {
    isVisible: boolean
    isScrolled: boolean
    isPageTransitioning: boolean
}

/**
 * Header滚动处理Hook
 */
export function useHeaderScroll(pathname: string): UseHeaderScrollReturn {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isPageTransitioning, setIsPageTransitioning] = useState(false)

    // 监听路由变化，在页面切换时暂时禁用滚动隐藏
    useEffect(() => {
        setIsPageTransitioning(true)
        setIsVisible(true)

        const timer = setTimeout(() => {
            setIsPageTransitioning(false)
        }, SCROLL_CONFIG.routeTransitionDelay)

        return () => clearTimeout(timer)
    }, [pathname])

    // 监听滚动事件：滚动时隐藏导航栏，顶部时显示
    useEffect(() => {
        const handleScroll = createScrollHandler(
            isPageTransitioning,
            lastScrollY,
            setIsVisible,
            setIsScrolled,
            setLastScrollY
        )

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY, isPageTransitioning])

    return {
        isVisible,
        isScrolled,
        isPageTransitioning
    }
} 