'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * BackToTopButton 组件 - 全站公共返回顶部按钮
 * 
 * 🎯 功能特性：
 * - 全站唯一公共组件，所有页面共享使用
 * - 智能显示：滚动超过300px时显示
 * - 平滑过渡：多重动画效果，避免突兀出现
 * - 响应式设计：移动端和桌面端自适应
 * - 性能优化：防抖滚动监听，requestAnimationFrame优化
 * 
 * 🎨 设计规范：
 * - 位置：右下角固定定位
 * - 尺寸：48x48px (桌面端)，40x40px (移动端)
 * - 背景：品牌渐变色 + 毛玻璃效果
 * - 动画：cubic-bezier缓动 + 多重过渡效果
 * - 阴影：品牌色阴影增强视觉层次
 * 
 * ⚠️ 重要说明：
 * - 这是全站唯一的置顶按钮组件
 * - 已在 layout.tsx 和 profile/layout.tsx 中全局引用
 * - 禁止在单个页面中重复实现置顶功能
 * - 所有页面的置顶功能都必须使用这个公共组件
 * 
 * 📍 使用位置：
 * - 主布局：frontend/src/app/layout.tsx (第144行)
 * - 个人中心布局：frontend/src/app/profile/layout.tsx (第80行)
 * 
 * 🔧 技术实现：
 * - 始终渲染到DOM，使用CSS控制可见性
 * - 多重过渡效果：opacity + transform + scale
 * - 防抖滚动监听，优化性能
 * - 响应式断点：768px以下调整尺寸和位置
 */
export function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)

    // 防抖滚动处理 - 优化性能
    const handleScroll = useCallback(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // 滚动阈值：300px后显示按钮
        const shouldShow = scrollTop > 300

        if (shouldShow !== isVisible) {
            setIsVisible(shouldShow)
        }

        // 滚动状态：用于微妙的视觉反馈
        setIsScrolling(true)

        // 清除滚动状态
        const scrollTimeout = setTimeout(() => {
            setIsScrolling(false)
        }, 150)

        return () => clearTimeout(scrollTimeout)
    }, [isVisible])

    // 滚动监听 - 性能优化版本
    useEffect(() => {
        let ticking = false

        const optimizedScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll()
                    ticking = false
                })
                ticking = true
            }
        }

        // 监听滚动事件，passive: true 优化性能
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true })

        // 清理函数
        return () => {
            window.removeEventListener('scroll', optimizedScrollHandler)
        }
    }, [handleScroll])

    // 返回顶部处理函数
    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <button
            onClick={scrollToTop}
            className="back-to-top-button"
            style={{
                // 基础定位和层级
                position: 'fixed',
                bottom: '32px', // 桌面端位置
                right: '32px',
                zIndex: 100,

                // 尺寸和形状
                width: '48px', // 桌面端尺寸
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',

                // 布局
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                // 视觉样式
                background: 'var(--gradient-primary)', // 使用项目主题渐变色
                boxShadow: isVisible
                    ? '0 8px 25px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(139, 92, 246, 0.3)'
                    : '0 4px 12px rgba(59, 130, 246, 0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',

                // 🎭 多重平滑过渡效果 - 核心优化
                opacity: isVisible ? 1 : 0,
                transform: `
                    translateY(${isVisible ? '0' : '20px'}) 
                    scale(${isVisible ? (isScrolling ? '1.05' : '1') : '0.8'})
                `,
                visibility: isVisible ? 'visible' : 'hidden',

                // 🌊 平滑过渡动画 - 使用三次贝塞尔曲线
                transition: `
                    opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    visibility 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
                `,

                // 性能优化
                willChange: 'opacity, transform, box-shadow'
            }}
            // 鼠标悬停效果
            onMouseEnter={(e) => {
                if (isVisible) {
                    e.currentTarget.style.transform = `
                        translateY(-2px) 
                        scale(1.1)
                    `
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.5), 0 6px 15px rgba(139, 92, 246, 0.4)'
                }
            }}
            onMouseLeave={(e) => {
                if (isVisible) {
                    e.currentTarget.style.transform = `
                        translateY(0) 
                        scale(1)
                    `
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(139, 92, 246, 0.3)'
                }
            }}
            // 点击反馈效果
            onMouseDown={(e) => {
                if (isVisible) {
                    e.currentTarget.style.transform = `
                        translateY(0) 
                        scale(0.95)
                    `
                }
            }}
            onMouseUp={(e) => {
                if (isVisible) {
                    e.currentTarget.style.transform = `
                        translateY(-2px) 
                        scale(1.1)
                    `
                }
            }}
            // 无障碍支持
            aria-label="返回页面顶部"
            aria-hidden={!isVisible}
            disabled={!isVisible}
        >
            {/* 向上箭头图标 - 使用内联SVG确保渲染稳定性 */}
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    transition: 'transform 0.2s ease',
                    transform: isScrolling ? 'translateY(-1px)' : 'translateY(0)'
                }}
            >
                <path
                    d="M12 19V5M5 12L12 5L19 12"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
} 