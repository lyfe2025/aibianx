'use client'

import { useState, useEffect, useRef } from 'react'
import { Icon } from '@/components/ui'
import type { SidebarTableOfContentsProps, HeadingItem } from './SidebarTableOfContents.types'

/**
 * SidebarTableOfContents 极简可拖拽目录导航组件
 * 
 * 🎯 设计原则：
 * - 极简设计，无图标无装饰
 * - 通过字体大小和缩进区分层级
 * - 可拖拽到任意位置
 * - 极高透明度，几乎不遮挡内容
 * - 简洁直观的交互
 * 
 * 📱 响应式：
 * - 桌面端：可拖拽的浮动窗口
 * - 移动端：智能隐藏
 * 
 * 🎨 视觉特性：
 * - 极高透明毛玻璃背景
 * - 纯文字层级指示
 * - 清晰的文字排版
 * - 简单的拖拽交互
 */
export function SidebarTableOfContents({
  content,
  targetSelector = '.glass-card',
  className = '',
  isVisible = true
}: SidebarTableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([])
  const [activeHeading, setActiveHeading] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 24, y: 0 })
  const observerRef = useRef<IntersectionObserver | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // 客户端状态检测
  useEffect(() => {
    setIsClient(true)

    // 检测是否为移动端
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // 从localStorage恢复位置，如果没有保存的位置则使用默认的垂直居中位置
    const savedPosition = localStorage.getItem('toc-position')
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition)
        setPosition(parsed)
      } catch (e) {
        console.log('Failed to parse saved position')
        // 如果解析失败，设置默认的垂直居中位置
        setPosition({ x: 24, y: window.innerHeight / 2 })
      }
    } else {
      // 如果没有保存的位置，设置默认的垂直居中位置
      setPosition({ x: 24, y: window.innerHeight / 2 })
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // 保存位置到localStorage
  const savePosition = (newPosition: { x: number; y: number }) => {
    localStorage.setItem('toc-position', JSON.stringify(newPosition))
  }

  // 简化的拖拽处理
  const handleMouseDown = (e: MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).textContent?.includes('目录导航')) {
      e.preventDefault()
      setIsDragging(true)

      const startX = e.clientX - position.x
      const startY = e.clientY - position.y

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newX = Math.max(0, Math.min(moveEvent.clientX - startX, window.innerWidth - 300))
        const newY = Math.max(0, Math.min(moveEvent.clientY - startY, window.innerHeight - 200))
        setPosition({ x: newX, y: newY })
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        savePosition(position)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }

  // 提取标题
  useEffect(() => {
    if (!isClient || !content || !isVisible) return

    const timer = setTimeout(() => {
      extractHeadings()
    }, 2000)

    const retryTimer = setTimeout(() => {
      if (headings.length === 0) {
        console.log('固定目录导航：重试提取标题...')
        extractHeadings()
      }
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearTimeout(retryTimer)
    }
  }, [isClient, content, isVisible])

  // 提取文章中的标题
  const extractHeadings = () => {
    const articleContainer = document.querySelector(targetSelector)
    if (!articleContainer) {
      console.log('固定目录导航：找不到目标容器', targetSelector)
      return
    }

    const headingElements = articleContainer.querySelectorAll('h1, h2, h3, h4')
    console.log('固定目录导航：找到标题元素数量:', headingElements.length)
    const headingList: HeadingItem[] = []

    headingElements.forEach((element, index) => {
      const headingElement = element as HTMLElement
      const level = parseInt(headingElement.tagName.charAt(1))
      const text = headingElement.textContent?.trim() || ''

      // 跳过页面主标题
      const isInArticleContent = headingElement.closest('.article-content') ||
        headingElement.parentElement?.style.fontSize ||
        !headingElement.style.background?.includes('gradient')

      if (!isInArticleContent && level === 1) {
        return
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
    initializeActiveHeading(headingList)
  }

  // 初始化活动标题
  const initializeActiveHeading = (headingList: HeadingItem[]) => {
    if (headingList.length === 0) return

    const viewportTop = window.pageYOffset + 120
    let activeHeading = headingList[0].id

    for (const heading of headingList) {
      if (heading.element) {
        const elementTop = heading.element.offsetTop
        if (elementTop <= viewportTop + 50) {
          activeHeading = heading.id
        } else {
          break
        }
      }
    }

    setActiveHeading(activeHeading)
  }

  // 设置交叉观察器
  const setupIntersectionObserver = (headingList: HeadingItem[]) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const options = {
      rootMargin: '-100px 0px -60% 0px',
      threshold: [0, 0.1, 0.5]
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const visibleHeadings = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => ({
          id: entry.target.id,
          ratio: entry.intersectionRatio,
          top: entry.boundingClientRect.top
        }))

      if (visibleHeadings.length === 0) return

      const nearestHeading = visibleHeadings.reduce((prev, current) => {
        return Math.abs(current.top) < Math.abs(prev.top) ? current : prev
      })

      if (nearestHeading) {
        setActiveHeading(nearestHeading.id)
      }
    }, options)

    headingList.forEach(heading => {
      if (heading.element) {
        observerRef.current?.observe(heading.element)
      }
    })
  }

  // 点击标题跳转
  const handleHeadingClick = (headingId: string) => {
    const element = document.getElementById(headingId)
    if (!element) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const offsetTop = element.offsetTop - 120

    window.scrollTo({
      top: Math.max(0, offsetTop),
      behavior: 'smooth'
    })

    if (isMobile) {
      setIsCollapsed(true)
    }

    setTimeout(() => {
      if (observerRef.current && headings.length > 0) {
        setupIntersectionObserver(headings)
      }
    }, 1000)
  }

  // 清理观察器
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // 获取标题层级样式 - 简化版本，无圆点
  const getHeadingStyle = (heading: HeadingItem, isActive: boolean) => {
    const baseIndent = (heading.level - 1) * 20

    const baseStyle = {
      display: 'inline-block',
      width: 'auto',
      maxWidth: '100%',
      padding: '6px 12px',
      marginLeft: `${baseIndent}px`,
      background: 'transparent',
      border: 'none',
      borderRadius: '6px',
      textAlign: 'left' as const,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      lineHeight: '1.4',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }

    if (isActive) {
      return {
        ...baseStyle,
        background: 'rgba(59, 130, 246, 0.1)',
        color: '#60A5FA',
        fontWeight: '600',
        fontSize: heading.level === 1 ? 'var(--font-size-base)' :
          heading.level === 2 ? 'var(--font-size-sm)' : 'var(--font-size-xs)'
      }
    }

    // 根据层级设置样式
    let fontSize: string
    let fontWeight: string
    let color: string

    switch (heading.level) {
      case 1:
        fontSize = 'var(--font-size-base)'
        fontWeight = '600'
        color = 'var(--color-text-primary)'
        break
      case 2:
        fontSize = 'var(--font-size-sm)'
        fontWeight = '500'
        color = 'var(--color-text-primary)'
        break
      default:
        fontSize = 'var(--font-size-xs)'
        fontWeight = '400'
        color = 'var(--color-text-muted)'
    }

    return {
      ...baseStyle,
      fontSize,
      fontWeight,
      color
    }
  }

  // 渲染目录导航
  useEffect(() => {
    if (!isClient || !isVisible || headings.length === 0) {
      const existingToc = document.getElementById('sidebar-toc-fixed')
      if (existingToc) {
        document.body.removeChild(existingToc)
      }
      return
    }

    const existingToc = document.getElementById('sidebar-toc-fixed')
    if (existingToc) {
      document.body.removeChild(existingToc)
    }

    // 创建容器
    const tocContainer = document.createElement('div')
    tocContainer.id = 'sidebar-toc-fixed'
    tocContainer.className = `sidebar-toc-fixed ${className}`

    // 极高透明度样式
    tocContainer.style.cssText = `
      position: fixed !important;
      top: ${position.y}px !important;
      left: ${position.x}px !important;
      transform: translateY(-50%) !important;
      width: ${isCollapsed ? '56px' : '280px'} !important;
      max-height: 60vh !important;
      background: rgba(0, 0, 0, 0.05) !important;
      backdrop-filter: blur(4px) !important;
      -webkit-backdrop-filter: blur(4px) !important;
      border: 1px solid rgba(255, 255, 255, 0.02) !important;
      border-radius: 12px !important;
      padding: ${isCollapsed ? '12px' : '16px'} !important;
      z-index: 9999 !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      transition: all 0.2s ease !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      cursor: ${isDragging ? 'grabbing' : 'default'} !important;
      ${isMobile ? 'display: none !important;' : ''}
    `

    // 创建标题栏 - 无图标
    const headerDiv = document.createElement('div')
    headerDiv.style.cssText = `
      display: flex !important;
      align-items: center !important;
      justify-content: ${isCollapsed ? 'center' : 'space-between'} !important;
      margin-bottom: ${isCollapsed ? '0' : '12px'} !important;
      padding: 4px 8px !important;
      cursor: grab !important;
      user-select: none !important;
      border-radius: 6px !important;
      background: rgba(255, 255, 255, 0.01) !important;
    `

    // 绑定拖拽事件到标题栏
    headerDiv.addEventListener('mousedown', handleMouseDown as any)

    if (!isCollapsed) {
      const titleSpan = document.createElement('span')
      titleSpan.textContent = '目录导航'
      titleSpan.style.cssText = `
        font-size: var(--font-size-sm) !important;
        font-weight: 600 !important;
        color: var(--color-text-secondary) !important;
        user-select: none !important;
        cursor: grab !important;
      `
      headerDiv.appendChild(titleSpan)
    }

    // 收起展开按钮
    const toggleButton = document.createElement('button')
    toggleButton.innerHTML = isCollapsed ? '≡' : '×'
    toggleButton.style.cssText = `
      background: rgba(255, 255, 255, 0.02) !important;
      border: 1px solid rgba(255, 255, 255, 0.02) !important;
      color: var(--color-text-secondary) !important;
      cursor: pointer !important;
      padding: 4px !important;
      width: 20px !important;
      height: 20px !important;
      border-radius: 4px !important;
      font-size: 12px !important;
      font-weight: bold !important;
    `

    toggleButton.addEventListener('mousedown', (e) => {
      e.stopPropagation()
    })

    toggleButton.addEventListener('click', () => {
      setIsCollapsed(!isCollapsed)
    })

    headerDiv.appendChild(toggleButton)
    tocContainer.appendChild(headerDiv)

    // 创建目录列表
    if (!isCollapsed) {
      const tocList = document.createElement('div')
      tocList.style.cssText = `
        display: flex !important;
        flex-direction: column !important;
        gap: 2px !important;
      `

      headings.forEach((heading) => {
        // 创建目录项容器
        const tocItemContainer = document.createElement('div')
        tocItemContainer.style.cssText = `
          display: block !important;
          width: 100% !important;
          margin-bottom: 2px !important;
          padding-left: ${(heading.level - 1) * 20}px !important;
        `

        // 创建目录项按钮
        const tocItem = document.createElement('button')
        const isActive = activeHeading === heading.id
        const itemStyle = getHeadingStyle(heading, isActive)

        // 重置marginLeft，因为已经在容器中设置了paddingLeft
        const adjustedStyle = {
          ...itemStyle,
          marginLeft: '0'
        }

        Object.assign(tocItem.style, adjustedStyle)

        // 只显示文本，无圆点
        const displayText = heading.text.length > 30 ? heading.text.substring(0, 30) + '…' : heading.text
        tocItem.textContent = displayText
        tocItem.title = heading.text

        // 悬停效果
        tocItem.addEventListener('mouseenter', () => {
          if (activeHeading !== heading.id) {
            tocItem.style.background = 'rgba(255, 255, 255, 0.03) !important'
            tocItem.style.color = 'var(--color-text-primary) !important'
          }
        })

        tocItem.addEventListener('mouseleave', () => {
          if (activeHeading !== heading.id) {
            const resetStyle = getHeadingStyle(heading, false)
            const adjustedResetStyle = {
              ...resetStyle,
              marginLeft: '0'
            }
            Object.assign(tocItem.style, adjustedResetStyle)
          }
        })

        // 点击事件
        tocItem.addEventListener('click', () => {
          handleHeadingClick(heading.id)
        })

        tocItemContainer.appendChild(tocItem)
        tocList.appendChild(tocItemContainer)
      })

      tocContainer.appendChild(tocList)
    }

    // 添加到页面
    document.body.appendChild(tocContainer)
    containerRef.current = tocContainer

    return () => {
      if (containerRef.current && document.body.contains(containerRef.current)) {
        document.body.removeChild(containerRef.current)
      }
    }
  }, [isClient, isVisible, headings, activeHeading, isCollapsed, isMobile, position, isDragging])

  // 更新容器位置
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.top = `${position.y}px`
      containerRef.current.style.left = `${position.x}px`
      containerRef.current.style.width = isCollapsed ? '56px' : '280px'
      containerRef.current.style.padding = isCollapsed ? '12px' : '16px'
    }
  }, [position, isCollapsed])

  if (!isClient || !isVisible || isMobile) {
    return null
  }

  return null
} 