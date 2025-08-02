'use client'

import { useState, useRef, useEffect, forwardRef } from 'react'

/**
 * 移动端懒加载图片组件 - LazyImage
 * 
 * 专为移动端优化的图片懒加载解决方案
 * 支持渐进式增强、错误处理、响应式图片
 * 
 * 设计目标：
 * - 减少初始页面加载时间
 * - 节省移动端数据流量
 * - 平滑的加载体验
 * - 自适应图片质量
 */

interface LazyImageProps {
    src: string
    alt: string
    width?: number | string
    height?: number | string
    placeholder?: string
    blurDataURL?: string
    className?: string
    loading?: 'lazy' | 'eager'
    priority?: boolean
    quality?: number
    sizes?: string
    onLoad?: () => void
    onError?: () => void
    fallback?: string
    
    // 移动端优化选项
    optimizeForMobile?: boolean
    webpSupport?: boolean
    progressive?: boolean
    preloadCritical?: boolean
}

export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(({
    src,
    alt,
    width,
    height,
    placeholder,
    blurDataURL,
    className = '',
    loading = 'lazy',
    priority = false,
    quality = 75,
    sizes,
    onLoad,
    onError,
    fallback = '/images/placeholder.jpg',
    optimizeForMobile = true,
    webpSupport = true,
    progressive = true,
    preloadCritical = false
}, ref) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isError, setIsError] = useState(false)
    const [currentSrc, setCurrentSrc] = useState<string>('')
    const imgRef = useRef<HTMLImageElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    // 检测WebP支持
    const [supportsWebP, setSupportsWebP] = useState(false)
    
    useEffect(() => {
        if (!webpSupport) return
        
        const checkWebPSupport = () => {
            const webP = new Image()
            webP.onload = webP.onerror = () => {
                setSupportsWebP(webP.height === 2)
            }
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
        }
        
        checkWebPSupport()
    }, [webpSupport])

    // 优化图片URL
    const getOptimizedSrc = (originalSrc: string) => {
        if (!optimizeForMobile) return originalSrc
        
        // 如果是相对路径，进行优化处理
        if (originalSrc.startsWith('/')) {
            const params = new URLSearchParams()
            
            if (quality !== 75) params.set('q', quality.toString())
            if (width) params.set('w', width.toString())
            if (height) params.set('h', height.toString())
            if (supportsWebP) params.set('f', 'webp')
            
            const queryString = params.toString()
            return queryString ? `${originalSrc}?${queryString}` : originalSrc
        }
        
        return originalSrc
    }

    // 生成响应式图片源
    const generateSrcSet = () => {
        if (!optimizeForMobile || !width) return undefined
        
        const widthNum = typeof width === 'string' ? parseInt(width) : width
        const srcSet = [
            `${getOptimizedSrc(src)} 1x`,
            `${getOptimizedSrc(src).replace(/w=\d+/, `w=${widthNum * 2}`)} 2x`,
            `${getOptimizedSrc(src).replace(/w=\d+/, `w=${widthNum * 3}`)} 3x`
        ]
        
        return srcSet.join(', ')
    }

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (loading === 'eager' || priority) {
            setCurrentSrc(getOptimizedSrc(src))
            return
        }

        const img = imgRef.current
        if (!img) return

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentSrc(getOptimizedSrc(src))
                        observerRef.current?.unobserve(img)
                    }
                })
            },
            {
                rootMargin: '50px',
                threshold: 0.1
            }
        )

        observerRef.current.observe(img)

        return () => {
            observerRef.current?.disconnect()
        }
    }, [src, loading, priority, optimizeForMobile, supportsWebP, quality, width, height])

    // 图片加载处理
    const handleLoad = () => {
        setIsLoaded(true)
        setIsError(false)
        onLoad?.()
    }

    const handleError = () => {
        setIsError(true)
        setIsLoaded(false)
        if (fallback && currentSrc !== fallback) {
            setCurrentSrc(fallback)
        }
        onError?.()
    }

    // 预加载关键图片
    useEffect(() => {
        if (preloadCritical || priority) {
            const link = document.createElement('link')
            link.rel = 'preload'
            link.as = 'image'
            link.href = getOptimizedSrc(src)
            document.head.appendChild(link)
            
            return () => {
                document.head.removeChild(link)
            }
        }
    }, [src, preloadCritical, priority])

    // 合并refs
    const mergedRef = (element: HTMLImageElement | null) => {
        if (imgRef.current !== element) {
            imgRef.current = element
        }
        
        if (ref) {
            if (typeof ref === 'function') {
                ref(element)
            } else {
                ref.current = element
            }
        }
    }

    return (
        <div className={`lazy-image-container ${className}`}>
            {/* 占位符 */}
            {!isLoaded && (placeholder || blurDataURL) && (
                <div className="lazy-image-placeholder">
                    {blurDataURL ? (
                        <img 
                            src={blurDataURL}
                            alt=""
                            className="blur-placeholder"
                            aria-hidden="true"
                        />
                    ) : (
                        <div 
                            className="color-placeholder"
                            style={{ 
                                backgroundColor: placeholder || '#f3f4f6',
                                width: width || '100%',
                                height: height || 'auto'
                            }}
                        />
                    )}
                </div>
            )}

            {/* 实际图片 */}
            <img
                ref={mergedRef}
                src={currentSrc}
                srcSet={generateSrcSet()}
                sizes={sizes}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
                className={`lazy-image ${isLoaded ? 'loaded' : ''} ${isError ? 'error' : ''}`}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: progressive ? 'opacity 0.3s ease-in-out' : 'none'
                }}
            />

            {/* 错误状态 */}
            {isError && !fallback && (
                <div className="lazy-image-error">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">图片加载失败</span>
                </div>
            )}

            {/* 样式 */}
            <style jsx>{`
                .lazy-image-container {
                    position: relative;
                    overflow: hidden;
                    background-color: var(--color-bg-secondary, #f9fafb);
                }

                .lazy-image-placeholder {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1;
                }

                .blur-placeholder {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: blur(10px);
                    transform: scale(1.1);
                }

                .color-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, 
                        var(--color-bg-secondary, #f9fafb) 25%, 
                        transparent 25%), 
                    linear-gradient(-45deg, 
                        var(--color-bg-secondary, #f9fafb) 25%, 
                        transparent 25%), 
                    linear-gradient(45deg, 
                        transparent 75%, 
                        var(--color-bg-secondary, #f9fafb) 75%), 
                    linear-gradient(-45deg, 
                        transparent 75%, 
                        var(--color-bg-secondary, #f9fafb) 75%);
                    background-size: 20px 20px;
                    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                    animation: loading-shimmer 1.5s ease-in-out infinite;
                }

                @keyframes loading-shimmer {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }

                .lazy-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: relative;
                    z-index: 2;
                }

                .lazy-image.loaded {
                    opacity: 1 !important;
                }

                .lazy-image.error {
                    display: none;
                }

                .lazy-image-error {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--color-bg-secondary, #f9fafb);
                    color: var(--color-text-muted, #6b7280);
                    font-size: var(--font-size-sm, 14px);
                    z-index: 3;
                }

                .error-icon {
                    font-size: 24px;
                    margin-bottom: 8px;
                }

                .error-text {
                    font-size: var(--font-size-xs, 12px);
                    text-align: center;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .lazy-image-container {
                        /* 移动端特定优化 */
                        -webkit-transform: translateZ(0);
                        transform: translateZ(0);
                    }

                    .lazy-image {
                        /* 移动端图片优化 */
                        image-rendering: -webkit-optimize-contrast;
                        image-rendering: crisp-edges;
                    }
                }

                /* 减少动画偏好 */
                @media (prefers-reduced-motion: reduce) {
                    .lazy-image {
                        transition: none !important;
                    }
                    
                    .color-placeholder {
                        animation: none !important;
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .lazy-image {
                        image-rendering: -webkit-optimize-contrast;
                    }
                }
            `}</style>
        </div>
    )
})

LazyImage.displayName = 'LazyImage'