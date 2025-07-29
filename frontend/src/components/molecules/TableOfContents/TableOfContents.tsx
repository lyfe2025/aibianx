'use client'

import { useState, useEffect, useRef } from 'react'

interface HeadingItem {
    id: string
    text: string
    level: number // 1, 2, 3, 4
    element?: HTMLElement
}

interface TableOfContentsProps {
    content: string
    className?: string
}

/**
 * TableOfContents 目录导航组件
 * 
 * 🎯 功能：
 * - 从文章内容中提取标题（h1-h4）
 * - 生成可点击的目录导航
 * - 滚动时高亮当前章节
 * - 毛玻璃设计风格
 * 
 * 📱 响应式：
 * - 桌面端：固定右侧显示
 * - 移动端：收起/展开切换
 * 
 * 🎨 设计风格：
 * - 毛玻璃背景效果
 * - 渐变激活状态
 * - 平滑滚动动画
 */
export function TableOfContents({ content, className = '' }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<HeadingItem[]>([])
    const [activeHeading, setActiveHeading] = useState<string>('')
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)

    // 客户端状态检测
    useEffect(() => {
        setIsClient(true)
    }, [])

    // 提取标题
    useEffect(() => {
        if (!isClient || !content) return

        // 延迟执行，确保DOM完全渲染，特别是ArticleContent客户端水合
        const timer = setTimeout(() => {
            extractHeadings()
        }, 2000) // 增加延迟时间确保ArticleContent完成客户端渲染
        
        // 额外的重试机制，确保能找到标题
        const retryTimer = setTimeout(() => {
            if (headings.length === 0) {
                console.log('目录导航：重试提取标题...')
                extractHeadings()
            }
        }, 4000)

        return () => {
            clearTimeout(timer)
            clearTimeout(retryTimer)
        }
    }, [content, isClient])

    // 提取文章中的标题
    const extractHeadings = () => {
        // 查找文章容器中的标题元素
        const articleContainer = document.querySelector('.glass-card')
        if (!articleContainer) {
            console.log('目录导航：找不到.glass-card容器')
            return
        }

        const headingElements = articleContainer.querySelectorAll('h1, h2, h3, h4')
        console.log('目录导航：找到标题元素数量:', headingElements.length)
        const headingList: HeadingItem[] = []

        headingElements.forEach((element, index) => {
            const headingElement = element as HTMLElement
            const level = parseInt(headingElement.tagName.charAt(1))
            const text = headingElement.textContent?.trim() || ''

            // 生成唯一ID
            let id = headingElement.id
            if (!id) {
                id = `heading-${index}-${text.replace(/[^\w\u4e00-\u9fa5]/g, '').substring(0, 20)}`
                headingElement.id = id
            }

            headingList.push({
                id,
                text,
                level,
                element: headingElement
            })
        })

        setHeadings(headingList)
        setupIntersectionObserver(headingList)
        
        // 初始化时检查当前可见的标题
        initializeActiveHeading(headingList)
    }

    // 初始化活动标题
    const initializeActiveHeading = (headingList: HeadingItem[]) => {
        if (headingList.length === 0) return
        
        const viewportTop = window.pageYOffset + 120 // 考虑固定头部
        let activeHeading = headingList[0].id
        
        for (const heading of headingList) {
            if (heading.element) {
                const elementTop = heading.element.offsetTop
                if (elementTop <= viewportTop + 50) { // 50px缓冲
                    activeHeading = heading.id
                } else {
                    break
                }
            }
        }
        
        setActiveHeading(activeHeading)
    }

    // 设置交叉观察器，用于高亮当前章节
    const setupIntersectionObserver = (headingList: HeadingItem[]) => {
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        const options = {
            rootMargin: '-100px 0px -60% 0px', // 优化观察器触发区域
            threshold: [0, 0.1, 0.5] // 多个阈值，提高检测精度
        }

        observerRef.current = new IntersectionObserver((entries) => {
            const visibleHeadings = entries
                .filter(entry => entry.isIntersecting)
                .map(entry => ({
                    id: entry.target.id,
                    ratio: entry.intersectionRatio,
                    rect: entry.boundingClientRect
                }))
                .sort((a, b) => {
                    // 优先选择在视窗上方区域的标题
                    const aDistance = Math.abs(a.rect.top - 120) // 距离导航栏的距离
                    const bDistance = Math.abs(b.rect.top - 120)
                    return aDistance - bDistance
                })

            if (visibleHeadings.length > 0) {
                // 使用距离最优的标题作为活动标题
                setActiveHeading(visibleHeadings[0].id)
            } else {
                // 如果没有可见标题，找到最近的标题
                const allHeadings = headingList.map(heading => {
                    const element = heading.element
                    if (element) {
                        const rect = element.getBoundingClientRect()
                        return {
                            id: heading.id,
                            top: rect.top
                        }
                    }
                    return null
                }).filter((h): h is { id: string; top: number } => h !== null)

                if (allHeadings.length > 0) {
                    // 找到最接近视窗顶部的标题
                    const closestHeading = allHeadings
                        .filter(h => h.top <= 200) // 只考虑已经滚过的标题
                        .sort((a, b) => b.top - a.top)[0] // 选择最下面的一个

                    if (closestHeading) {
                        setActiveHeading(closestHeading.id)
                    }
                }
            }
        }, options)

        headingList.forEach(heading => {
            if (heading.element) {
                observerRef.current?.observe(heading.element)
            }
        })
    }

        // 点击标题跳转 - 优化跳转精度
    const handleHeadingClick = (headingId: string) => {
        const element = document.getElementById(headingId)
        if (element) {
            // 精确计算偏移量，考虑固定头部和一些缓冲空间
            const headerHeight = 80 // 固定头部高度
            const buffer = 20 // 额外缓冲空间，让标题不紧贴顶部
            const elementRect = element.getBoundingClientRect()
            const offsetTop = window.pageYOffset + elementRect.top - headerHeight - buffer
            
            // 平滑滚动到目标位置
            window.scrollTo({
                top: Math.max(0, offsetTop), // 确保不会滚动到负数位置
                behavior: 'smooth'
            })
            
            // 更新活动标题
            setActiveHeading(headingId)
            
            // 移动端点击后自动收起
            if (window.innerWidth <= 1439) { // 与断点保持一致
                setIsCollapsed(true)
            }
        }
    }

    // 切换收起/展开（移动端）
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    // 清理观察器
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [])

    // 如果没有标题，不显示目录
    if (!isClient || headings.length === 0) {
        return null
    }

    return (
        <>
                        {/* 桌面端固定目录 - 左侧显示 */}
            <div 
                className={`toc-desktop ${className}`}
                style={{
                    position: 'fixed',
                    top: '120px', // 避开固定头部
                    left: '24px',
                    width: '280px',
                    maxHeight: 'calc(100vh - 140px)', // 确保不会超出视窗
                    background: 'var(--color-bg-glass)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid var(--color-border-primary)',
                    borderRadius: '16px',
                    padding: '20px',
                    zIndex: 1000,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden',
                    display: 'none'
                }}
            >
                <div style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    📖 <span>目录导航</span>
                </div>

                <div style={{
                    maxHeight: 'calc(100vh - 200px)', // 适配新的高度计算
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}>
                    {headings.map((heading) => (
                        <button
                            key={heading.id}
                            onClick={() => handleHeadingClick(heading.id)}
                            style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'left',
                                background: activeHeading === heading.id
                                    ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                                    : 'transparent',
                                border: activeHeading === heading.id
                                    ? '1px solid rgba(59, 130, 246, 0.3)'
                                    : '1px solid transparent',
                                borderRadius: '8px',
                                padding: `8px ${12 + (heading.level - 1) * 12}px`,
                                marginBottom: '4px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                fontSize: heading.level <= 2 ? 'var(--font-size-sm)' : 'var(--font-size-xs)',
                                fontWeight: activeHeading === heading.id ? '500' : 'normal',
                                color: activeHeading === heading.id
                                    ? 'var(--color-text-primary)'
                                    : 'var(--color-text-muted)',
                                lineHeight: '1.4',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                                if (activeHeading !== heading.id) {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                    e.currentTarget.style.color = 'var(--color-text-primary)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeHeading !== heading.id) {
                                    e.currentTarget.style.background = 'transparent'
                                    e.currentTarget.style.color = 'var(--color-text-muted)'
                                }
                            }}
                            title={heading.text}
                        >
                            {heading.text}
                        </button>
                    ))}
                </div>
            </div>

                        {/* 移动端浮动目录按钮 - 保持右侧位置 */}
            <div 
                className="toc-mobile"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '16px', // 移动端也改为左侧
                    transform: 'translateY(-50%)',
                    zIndex: 1000,
                    display: 'none'
                }}
            >
                {/* 目录按钮 */}
                <button
                    onClick={toggleCollapse}
                    style={{
                        width: '48px',
                        height: '48px',
                        background: 'var(--color-bg-glass)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid var(--color-border-primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: 'var(--color-text-primary)',
                        fontSize: '18px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.background = 'var(--color-bg-glass)'
                    }}
                    title="目录导航"
                >
                    📖
                </button>

                {/* 移动端目录面板 */}
                {!isCollapsed && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '56px', // 移动端面板也改为左侧展开
                            width: '280px',
                            maxHeight: '60vh',
                            background: 'var(--color-bg-glass)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid var(--color-border-primary)',
                            borderRadius: '16px',
                            padding: '16px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            overflow: 'hidden',
                            animation: 'fadeIn 0.2s ease'
                        }}
                    >
                        <div style={{
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)',
                            marginBottom: '12px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            paddingBottom: '8px'
                        }}>
                            目录导航
                        </div>

                        <div style={{
                            maxHeight: 'calc(60vh - 50px)',
                            overflowY: 'auto'
                        }}>
                            {headings.map((heading) => (
                                <button
                                    key={heading.id}
                                    onClick={() => handleHeadingClick(heading.id)}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        textAlign: 'left',
                                        background: activeHeading === heading.id
                                            ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                                            : 'transparent',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: `6px ${8 + (heading.level - 1) * 8}px`,
                                        marginBottom: '2px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        fontSize: 'var(--font-size-xs)',
                                        fontWeight: activeHeading === heading.id ? '500' : 'normal',
                                        color: activeHeading === heading.id
                                            ? 'var(--color-text-primary)'
                                            : 'var(--color-text-muted)',
                                        lineHeight: '1.3',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                    title={heading.text}
                                >
                                    {heading.text}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 响应式样式 */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(-10px); // 左侧展开动画
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* 桌面端显示 - 调整断点 */
                @media (min-width: 1440px) {
                    .toc-desktop {
                        display: block !important;
                    }
                    .toc-mobile {
                        display: none !important;
                    }
                }

                /* 移动端显示 - 调整断点 */
                @media (max-width: 1439px) {
                    .toc-desktop {
                        display: none !important;
                    }
                    .toc-mobile {
                        display: block !important;
                    }
                }

                /* 平板端优化 */
                @media (max-width: 768px) {
                    .toc-mobile div[style*="width: 280px"] {
                        width: 260px !important;
                        left: 52px !important;
                    }
                }

                /* 小屏幕优化 */
                @media (max-width: 480px) {
                    .toc-mobile div[style*="width: 260px"] {
                        width: calc(100vw - 80px) !important;
                        left: 52px !important;
                        max-width: 240px !important;
                    }
                }

                /* 自定义滚动条样式 */
                .toc-desktop div[style*="overflowY: auto"]::-webkit-scrollbar,
                .toc-mobile div[style*="overflowY: auto"]::-webkit-scrollbar {
                    width: 4px;
                }

                .toc-desktop div[style*="overflowY: auto"]::-webkit-scrollbar-track,
                .toc-mobile div[style*="overflowY: auto"]::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }

                .toc-desktop div[style*="overflowY: auto"]::-webkit-scrollbar-thumb,
                .toc-mobile div[style*="overflowY: auto"]::-webkit-scrollbar-thumb {
                    background: linear-gradient(90deg, #3B82F6, #8B5CF6);
                    border-radius: 2px;
                }

                .toc-desktop div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover,
                .toc-mobile div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(90deg, #2563EB, #7C3AED);
                }
            `}</style>
        </>
    )
} 