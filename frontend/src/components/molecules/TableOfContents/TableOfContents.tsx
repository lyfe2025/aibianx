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

            // 跳过页面主标题（通常是文章标题的h1，不在文章内容中）
            // 只获取文章内容区域的标题
            const isInArticleContent = headingElement.closest('.article-content') ||
                headingElement.parentElement?.style.fontSize ||
                !headingElement.style.background?.includes('gradient')

            if (!isInArticleContent && level === 1) {
                return // 跳过页面主标题
            }

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

    // 点击标题跳转 - 修复重复点击问题
    const handleHeadingClick = (headingId: string) => {
        console.log('目录导航：点击标题', headingId)

        const element = document.getElementById(headingId)
        if (!element) {
            console.log('目录导航：找不到标题元素', headingId)
            return
        }

        // 临时禁用IntersectionObserver，避免干扰
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        // 精确计算偏移量，考虑固定头部和一些缓冲空间
        const headerHeight = 80 // 固定头部高度
        const buffer = 20 // 额外缓冲空间，让标题不紧贴顶部
        const elementRect = element.getBoundingClientRect()
        const offsetTop = window.pageYOffset + elementRect.top - headerHeight - buffer

        // 立即更新活动标题状态
        setActiveHeading(headingId)

        // 平滑滚动到目标位置
        window.scrollTo({
            top: Math.max(0, offsetTop), // 确保不会滚动到负数位置
            behavior: 'smooth'
        })

        console.log('目录导航：滚动到位置', offsetTop)

        // 移动端点击后自动收起
        if (window.innerWidth <= 1439) { // 与断点保持一致
            setIsCollapsed(true)
        }

        // 延迟重新启用IntersectionObserver
        setTimeout(() => {
            if (observerRef.current && headings.length > 0) {
                setupIntersectionObserver(headings)
            }
        }, 1000) // 给滚动动画足够时间完成
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
            {/* 桌面端一体化目录导航 */}
            <div
                className={`toc-sidebar ${className}`}
                style={{
                    position: 'sticky',
                    top: '0', // 相对于父容器顶部
                    width: isCollapsed ? '40px' : '100%', // 填满左侧容器
                    height: 'auto', // 自适应高度
                    background: 'none', // 去掉背景，使用父容器的背景
                    border: 'none', // 去掉边框
                    borderRadius: '0', // 去掉圆角
                    padding: isCollapsed ? '8px' : '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    flexShrink: 0, // 防止被压缩
                    alignSelf: 'flex-start' // 顶部对齐
                }}
            >
                {/* 顶部标题栏 */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isCollapsed ? 'center' : 'space-between',
                        marginBottom: isCollapsed ? '0' : '8px',
                        padding: '0'
                    }}
                >
                    {!isCollapsed && (
                        <span style={{
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)',
                            userSelect: 'none'
                        }}>
                            目录导航
                        </span>
                    )}

                    {/* 收缩/展开按钮 */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                            e.currentTarget.style.color = 'var(--color-text-primary)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                            e.currentTarget.style.color = 'var(--color-text-muted)'
                        }}
                        title={isCollapsed ? '展开目录' : '收起目录'}
                    >
                        {isCollapsed ? (
                            // 展开图标 - 三条横线
                            <div style={{
                                width: '14px',
                                height: '14px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: '2px',
                                    background: 'currentColor',
                                    borderRadius: '1px'
                                }}></div>
                                <div style={{
                                    width: '100%',
                                    height: '2px',
                                    background: 'currentColor',
                                    borderRadius: '1px'
                                }}></div>
                                <div style={{
                                    width: '100%',
                                    height: '2px',
                                    background: 'currentColor',
                                    borderRadius: '1px'
                                }}></div>
                            </div>
                        ) : (
                            // 收起图标 - 双箭头向左
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>«</span>
                        )}
                    </button>
                </div>

                {/* 目录内容 */}
                {!isCollapsed && (
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        paddingRight: '4px', // 为滚动条留出空间
                        marginTop: '0px' // 移除间距，让标题栏和内容完全连接
                    }}>
                        {headings.map((heading) => (
                            <button
                                key={heading.id}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleHeadingClick(heading.id)
                                }}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'left',
                                    background: activeHeading === heading.id
                                        ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))'
                                        : 'transparent',
                                    border: 'none',
                                    borderLeft: activeHeading === heading.id
                                        ? '3px solid var(--color-primary-blue)'
                                        : '3px solid transparent',
                                    borderRadius: '0 6px 6px 0',
                                    padding: `4px ${8 + (heading.level - 1) * 12}px`,
                                    marginBottom: '1px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    fontSize: heading.level <= 2 ? 'var(--font-size-sm)' : 'var(--font-size-xs)',
                                    fontWeight: activeHeading === heading.id ? '500' : 'normal',
                                    color: activeHeading === heading.id
                                        ? 'var(--color-text-primary)'
                                        : 'var(--color-text-muted)',
                                    lineHeight: '1.5',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeHeading !== heading.id) {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                        e.currentTarget.style.color = 'var(--color-text-primary)'
                                        e.currentTarget.style.borderLeft = '3px solid rgba(59, 130, 246, 0.5)'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeHeading !== heading.id) {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.color = 'var(--color-text-muted)'
                                        e.currentTarget.style.borderLeft = '3px solid transparent'
                                    }
                                }}
                                title={heading.text}
                            >
                                {heading.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>



            {/* 响应式样式 */}
            <style jsx>{`
                /* 自定义滚动条样式 */
                .toc-sidebar div[style*="overflowY: auto"]::-webkit-scrollbar {
                    width: 4px;
                }

                .toc-sidebar div[style*="overflowY: auto"]::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }

                .toc-sidebar div[style*="overflowY: auto"]::-webkit-scrollbar-thumb {
                    background: linear-gradient(90deg, #3B82F6, #8B5CF6);
                    border-radius: 2px;
                }

                .toc-sidebar div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(90deg, #2563EB, #7C3AED);
                }

                /* 移动端隐藏目录 */
                @media (max-width: 768px) {
                    .toc-sidebar {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    )
} 