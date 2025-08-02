'use client'

import { useEffect, useCallback, useState, ReactNode } from 'react'

/**
 * 移动端性能优化组件 - PerformanceOptimizer
 * 
 * 提供多种移动端性能优化功能
 * 包括预加载、代码分割、资源优化等
 * 
 * 设计目标：
 * - 提升移动端加载速度
 * - 减少资源消耗
 * - 智能预加载策略
 * - 监控性能指标
 */

interface PerformanceOptimizerProps {
    children: ReactNode
    
    // 预加载配置
    enablePreload?: boolean
    preloadRoutes?: string[]
    preloadImages?: string[]
    preloadCriticalCSS?: boolean
    
    // 资源优化
    enableResourceOptimization?: boolean
    compressImages?: boolean
    minifyCSS?: boolean
    deferNonCriticalJS?: boolean
    
    // 性能监控
    enablePerformanceMonitoring?: boolean
    reportWebVitals?: boolean
    
    // 移动端专用优化
    enableMobileOptimizations?: boolean
    reducedMotionDetection?: boolean
    lowDataModeDetection?: boolean
    
    className?: string
}

export function PerformanceOptimizer({
    children,
    enablePreload = true,
    preloadRoutes = [],
    preloadImages = [],
    preloadCriticalCSS = true,
    enableResourceOptimization = true,
    compressImages = true,
    minifyCSS = true,
    deferNonCriticalJS = true,
    enablePerformanceMonitoring = true,
    reportWebVitals = true,
    enableMobileOptimizations = true,
    reducedMotionDetection = true,
    lowDataModeDetection = true,
    className = ''
}: PerformanceOptimizerProps) {
    
    const [performanceMetrics, setPerformanceMetrics] = useState<Record<string, number>>({})
    const [connectionInfo, setConnectionInfo] = useState<any>(null)
    const [isLowDataMode, setIsLowDataMode] = useState(false)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    // 检测网络连接信息
    useEffect(() => {
        if (!enableMobileOptimizations) return

        const updateConnectionInfo = () => {
            const connection = (navigator as any).connection || 
                              (navigator as any).mozConnection || 
                              (navigator as any).webkitConnection

            if (connection) {
                setConnectionInfo({
                    effectiveType: connection.effectiveType,
                    downlink: connection.downlink,
                    saveData: connection.saveData,
                    rtt: connection.rtt
                })
                
                // 检测低数据模式
                setIsLowDataMode(
                    connection.saveData || 
                    connection.effectiveType === 'slow-2g' || 
                    connection.effectiveType === '2g'
                )
            }
        }

        updateConnectionInfo()
        
        if ('connection' in navigator) {
            (navigator as any).connection.addEventListener('change', updateConnectionInfo)
        }

        return () => {
            if ('connection' in navigator) {
                (navigator as any).connection.removeEventListener('change', updateConnectionInfo)
            }
        }
    }, [enableMobileOptimizations])

    // 检测减少动画偏好
    useEffect(() => {
        if (!reducedMotionDetection) return

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [reducedMotionDetection])

    // 预加载路由
    const preloadRoute = useCallback((route: string) => {
        if (!enablePreload || isLowDataMode) return

        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = route
        document.head.appendChild(link)
    }, [enablePreload, isLowDataMode])

    // 预加载图片
    const preloadImage = useCallback((src: string) => {
        if (!enablePreload || isLowDataMode) return

        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
    }, [enablePreload, isLowDataMode])

    // 预加载关键CSS
    const preloadCriticalStyles = useCallback(() => {
        if (!preloadCriticalCSS || isLowDataMode) return

        const criticalStyles = [
            '/styles/critical.css',
            '/styles/mobile.css'
        ]

        criticalStyles.forEach(href => {
            const link = document.createElement('link')
            link.rel = 'preload'
            link.as = 'style'
            link.href = href
            document.head.appendChild(link)
        })
    }, [preloadCriticalCSS, isLowDataMode])

    // 延迟加载非关键JavaScript
    const deferNonCriticalScripts = useCallback(() => {
        if (!deferNonCriticalJS) return

        const scripts = document.querySelectorAll('script[data-defer]')
        scripts.forEach(script => {
            const newScript = document.createElement('script')
            newScript.src = script.getAttribute('src') || ''
            newScript.async = true
            newScript.defer = true
            document.head.appendChild(newScript)
        })
    }, [deferNonCriticalJS])

    // 性能指标收集
    const collectPerformanceMetrics = useCallback(() => {
        if (!enablePerformanceMonitoring) return

        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType('paint')
        
        const metrics = {
            // 导航时间
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            
            // 首次绘制
            firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
            
            // 网络指标
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            ttfb: navigation.responseStart - navigation.requestStart
        }

        setPerformanceMetrics(metrics)

        // 报告Web Vitals
        if (reportWebVitals) {
            console.log('Performance Metrics:', metrics)
        }
    }, [enablePerformanceMonitoring, reportWebVitals])

    // Core Web Vitals监控
    useEffect(() => {
        if (!reportWebVitals) return

        // LCP (Largest Contentful Paint)
        const observeLCP = () => {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries()
                const lastEntry = entries[entries.length - 1]
                console.log('LCP:', lastEntry.startTime)
            })
            observer.observe({ entryTypes: ['largest-contentful-paint'] })
        }

        // FID (First Input Delay)
        const observeFID = () => {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries()
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime)
                })
            })
            observer.observe({ entryTypes: ['first-input'] })
        }

        // CLS (Cumulative Layout Shift)
        const observeCLS = () => {
            let clsValue = 0
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries()
                entries.forEach(entry => {
                    if (!(entry as any).hadRecentInput) {
                        clsValue += (entry as any).value
                    }
                })
                console.log('CLS:', clsValue)
            })
            observer.observe({ entryTypes: ['layout-shift'] })
        }

        if ('PerformanceObserver' in window) {
            observeLCP()
            observeFID()
            observeCLS()
        }
    }, [reportWebVitals])

    // 执行预加载策略
    useEffect(() => {
        if (!enablePreload) return

        // 延迟执行预加载，避免阻塞关键资源
        const timeoutId = setTimeout(() => {
            preloadCriticalStyles()
            
            preloadRoutes.forEach(route => {
                preloadRoute(route)
            })
            
            preloadImages.forEach(src => {
                preloadImage(src)
            })
            
            deferNonCriticalScripts()
        }, 1000)

        return () => clearTimeout(timeoutId)
    }, [
        enablePreload, 
        preloadRoutes, 
        preloadImages,
        preloadCriticalStyles,
        preloadRoute,
        preloadImage,
        deferNonCriticalScripts
    ])

    // 页面加载完成后收集指标
    useEffect(() => {
        const handleLoad = () => {
            setTimeout(collectPerformanceMetrics, 100)
        }

        if (document.readyState === 'complete') {
            handleLoad()
        } else {
            window.addEventListener('load', handleLoad)
            return () => window.removeEventListener('load', handleLoad)
        }
    }, [collectPerformanceMetrics])

    // 内存清理
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // 页面不可见时清理不必要的资源
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(() => {
                        // 执行内存清理
                        performance.clearResourceTimings()
                    })
                }
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, [])

    return (
        <div 
            className={`performance-optimizer ${className}`}
            data-low-data-mode={isLowDataMode}
            data-reduced-motion={prefersReducedMotion}
        >
            {children}
            
            {/* 性能优化相关的全局样式 */}
            <style jsx global>{`
                /* 基础性能优化 */
                * {
                    box-sizing: border-box;
                }
                
                html {
                    /* 启用硬件加速 */
                    -webkit-transform: translateZ(0);
                    transform: translateZ(0);
                    
                    /* 优化字体渲染 */
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-rendering: optimizeLegibility;
                }
                
                /* 图片优化 */
                img {
                    /* 默认懒加载 */
                    loading: lazy;
                    
                    /* 图片渲染优化 */
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: crisp-edges;
                }
                
                /* 低数据模式优化 */
                [data-low-data-mode="true"] img {
                    /* 降低图片质量以节省流量 */
                    image-rendering: pixelated;
                }
                
                [data-low-data-mode="true"] video {
                    /* 禁用自动播放 */
                    autoplay: none !important;
                }
                
                /* 减少动画偏好支持 */
                [data-reduced-motion="true"] *,
                [data-reduced-motion="true"] *::before,
                [data-reduced-motion="true"] *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
                
                /* 触摸设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    /* 禁用hover效果以提升性能 */
                    .performance-optimizer * {
                        -webkit-tap-highlight-color: transparent;
                    }
                    
                    /* 优化滚动性能 */
                    .performance-optimizer {
                        -webkit-overflow-scrolling: touch;
                        overflow-scrolling: touch;
                    }
                }
                
                /* 移动端特定优化 */
                @media (max-width: 768px) {
                    /* 减少阴影和渐变以提升性能 */
                    .performance-optimizer {
                        --shadow-optimized: none;
                        --gradient-optimized: none;
                    }
                    
                    /* 启用GPU加速的元素 */
                    .performance-optimizer [data-gpu-accelerated] {
                        will-change: transform;
                        transform: translateZ(0);
                    }
                }
                
                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .performance-optimizer {
                        /* 高DPI显示优化 */
                        image-rendering: -webkit-optimize-contrast;
                    }
                }
                
                /* 内存优化 */
                .performance-optimizer {
                    /* 启用合成层 */
                    transform: translateZ(0);
                    
                    /* 优化重绘 */
                    contain: layout style paint;
                }
            `}</style>
            
            {/* 性能监控信息（开发环境） */}
            {process.env.NODE_ENV === 'development' && enablePerformanceMonitoring && (
                <div style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    zIndex: 9999,
                    fontFamily: 'monospace'
                }}>
                    <div>LCP: {performanceMetrics.firstContentfulPaint?.toFixed(0)}ms</div>
                    <div>TTFB: {performanceMetrics.ttfb?.toFixed(0)}ms</div>
                    {connectionInfo && (
                        <div>网络: {connectionInfo.effectiveType}</div>
                    )}
                    {isLowDataMode && <div style={{color: 'orange'}}>省流模式</div>}
                </div>
            )}
        </div>
    )
}