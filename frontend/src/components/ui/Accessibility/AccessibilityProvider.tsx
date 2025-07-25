'use client'

import { useEffect, useState, useRef, ReactNode } from 'react'

interface AccessibilityProviderProps {
    children: ReactNode
    skipToContentId?: string
    enableFocusVisible?: boolean
    enableHighContrast?: boolean
    enableReducedMotion?: boolean
}

/**
 * AccessibilityProvider 无障碍功能提供者
 * 
 * 功能特性：
 * - 跳转到主内容的快捷链接
 * - 键盘导航支持
 * - 焦点可见性管理
 * - 高对比度模式
 * - 减少动画模式
 * - 屏幕阅读器友好
 * - 颜色对比度优化
 * 
 * 设计规范：
 * - 符合WCAG 2.1 AA标准
 * - 键盘导航完整支持
 * - 焦点指示器清晰可见
 * - 语义化HTML结构
 */
export function AccessibilityProvider({
    children,
    skipToContentId = 'main-content',
    enableFocusVisible = true,
    enableHighContrast = true,
    enableReducedMotion = true,
}: AccessibilityProviderProps) {
    const [focusVisible, setFocusVisible] = useState(false)
    const [highContrast, setHighContrast] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [isKeyboardUser, setIsKeyboardUser] = useState(false)
    const skipLinkRef = useRef<HTMLAnchorElement>(null)

    // 检测用户偏好设置
    useEffect(() => {
        // 检测高对比度偏好
        if (enableHighContrast) {
            const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
            setHighContrast(highContrastQuery.matches)

            const handleHighContrastChange = (e: MediaQueryListEvent) => {
                setHighContrast(e.matches)
            }

            highContrastQuery.addEventListener('change', handleHighContrastChange)
            return () => highContrastQuery.removeEventListener('change', handleHighContrastChange)
        }
    }, [enableHighContrast])

    useEffect(() => {
        // 检测减少动画偏好
        if (enableReducedMotion) {
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
            setReducedMotion(motionQuery.matches)

            const handleMotionChange = (e: MediaQueryListEvent) => {
                setReducedMotion(e.matches)
            }

            motionQuery.addEventListener('change', handleMotionChange)
            return () => motionQuery.removeEventListener('change', handleMotionChange)
        }
    }, [enableReducedMotion])

    // 键盘导航检测
    useEffect(() => {
        let isUsingKeyboard = false

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                isUsingKeyboard = true
                setIsKeyboardUser(true)
                setFocusVisible(true)
            }
        }

        const handleMouseDown = () => {
            if (isUsingKeyboard) {
                isUsingKeyboard = false
                setIsKeyboardUser(false)
                setFocusVisible(false)
            }
        }

        const handleFocus = () => {
            if (isUsingKeyboard) {
                setFocusVisible(true)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('focusin', handleFocus)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('focusin', handleFocus)
        }
    }, [])

    // 跳转到主内容
    const handleSkipToContent = (e: React.MouseEvent) => {
        e.preventDefault()
        const mainContent = document.getElementById(skipToContentId)
        if (mainContent) {
            mainContent.focus()
            mainContent.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // 全局键盘快捷键
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            // Alt + 1: 跳转到主内容
            if (e.altKey && e.key === '1') {
                e.preventDefault()
                const mainContent = document.getElementById(skipToContentId)
                if (mainContent) {
                    mainContent.focus()
                    mainContent.scrollIntoView({ behavior: 'smooth' })
                }
            }

            // Alt + 2: 跳转到搜索
            if (e.altKey && e.key === '2') {
                e.preventDefault()
                const searchInput = document.querySelector('input[type="search"], input[aria-label*="搜索"]') as HTMLElement
                if (searchInput) {
                    searchInput.focus()
                }
            }

            // Alt + 3: 跳转到导航
            if (e.altKey && e.key === '3') {
                e.preventDefault()
                const navigation = document.querySelector('nav, [role="navigation"]') as HTMLElement
                if (navigation) {
                    navigation.focus()
                }
            }
        }

        document.addEventListener('keydown', handleGlobalKeyDown)
        return () => document.removeEventListener('keydown', handleGlobalKeyDown)
    }, [skipToContentId])

    return (
        <>
            {/* 跳转到主内容链接 */}
            <a
                ref={skipLinkRef}
                href={`#${skipToContentId}`}
                onClick={handleSkipToContent}
                style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '8px',
                    background: '#000000',
                    color: '#FFFFFF',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    zIndex: 10000,
                    transition: 'top 0.3s ease',
                    border: '2px solid #3B82F6',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                }}
                onFocus={(e) => {
                    e.currentTarget.style.top = '8px'
                }}
                onBlur={(e) => {
                    e.currentTarget.style.top = '-40px'
                }}
                aria-label="跳转到主要内容区域"
            >
                跳转到主内容 (Alt+1)
            </a>

            {/* 主要内容 */}
            {children}

            {/* 全局无障碍样式 */}
            <style jsx global>{`
        /* 焦点可见性样式 */
        ${enableFocusVisible ? `
          *:focus {
            outline: ${focusVisible ? '2px solid #3B82F6' : 'none'} !important;
            outline-offset: 2px !important;
          }
          
          .keyboard-user *:focus {
            outline: 2px solid #3B82F6 !important;
            outline-offset: 2px !important;
          }
          
          button:focus,
          input:focus,
          textarea:focus,
          select:focus,
          a:focus,
          [tabindex]:focus {
            box-shadow: ${focusVisible ? '0 0 0 3px rgba(59, 130, 246, 0.3)' : 'none'} !important;
          }
        ` : ''}

        /* 高对比度模式样式 */
        ${enableHighContrast && highContrast ? `
          @media (prefers-contrast: high) {
            * {
              background-color: #000000 !important;
              color: #FFFFFF !important;
              border-color: #FFFFFF !important;
            }
            
            a {
              color: #00FFFF !important;
            }
            
            button {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #FFFFFF !important;
            }
            
            input, textarea, select {
              background-color: #FFFFFF !important;
              color: #000000 !important;
              border: 2px solid #000000 !important;
            }
            
            .gradient-text {
              color: #FFFFFF !important;
              background: none !important;
              -webkit-background-clip: unset !important;
              -webkit-text-fill-color: #FFFFFF !important;
            }
          }
        ` : ''}

        /* 减少动画模式样式 */
        ${enableReducedMotion && reducedMotion ? `
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        ` : ''}

        /* 屏幕阅读器专用样式 */
        .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        .sr-only-focusable:focus {
          position: static !important;
          width: auto !important;
          height: auto !important;
          padding: inherit !important;
          margin: inherit !important;
          overflow: visible !important;
          clip: auto !important;
          white-space: normal !important;
        }

        /* 键盘导航指示器 */
        ${isKeyboardUser ? `
          body {
            --focus-ring: 2px solid #3B82F6;
            --focus-ring-offset: 2px;
          }
        ` : ''}

        /* 改善文本可读性 */
        body {
          line-height: 1.6 !important;
          font-size: ${reducedMotion ? '16px' : 'inherit'} !important;
        }

        /* 改善链接可识别性 */
        a:not([class*="button"]):not([class*="btn"]) {
          text-decoration: underline !important;
        }

        a:hover, a:focus {
          text-decoration: underline !important;
        }

        /* 改善按钮可识别性 */
        button, [role="button"] {
          cursor: pointer !important;
          min-height: 44px !important;
          min-width: 44px !important;
        }

        /* 改善表单控件可访问性 */
        input, textarea, select {
          min-height: 44px !important;
        }

        input:invalid, textarea:invalid, select:invalid {
          border-color: #EF4444 !important;
          box-shadow: 0 0 0 1px #EF4444 !important;
        }

        /* 改善对比度 */
        ::placeholder {
          color: #9CA3AF !important;
          opacity: 1 !important;
        }

        /* 跳过导航链接样式优化 */
        a[href^="#"]:focus {
          position: relative !important;
          z-index: 10000 !important;
        }
      `}</style>

            {/* 动态类名管理 */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            if (${isKeyboardUser}) {
              document.body.classList.add('keyboard-user');
            } else {
              document.body.classList.remove('keyboard-user');
            }
            
            if (${highContrast}) {
              document.body.classList.add('high-contrast');
            } else {
              document.body.classList.remove('high-contrast');
            }
            
            if (${reducedMotion}) {
              document.body.classList.add('reduced-motion');
            } else {
              document.body.classList.remove('reduced-motion');
            }
          `,
                }}
            />
        </>
    )
} 