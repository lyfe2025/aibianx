'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@/components/ui'

interface SearchBarProps {
    placeholder?: string
    onSearch: (query: string) => void
    className?: string
    disabled?: boolean
    isLoading?: boolean
}

export function SearchBar({
    placeholder = "搜索文章、工具、案例...", // P0-1: 简化占位符文字
    onSearch,
    className = '',
    disabled = false,
    isLoading = false
}: SearchBarProps) {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [showShortcut, setShowShortcut] = useState(true)
    const [shortcutKey, setShortcutKey] = useState('') // 修复SSR问题：初始为空
    const [isClient, setIsClient] = useState(false) // 追踪是否在客户端
    const inputRef = useRef<HTMLInputElement>(null)
    const debounceTimeoutRef = useRef<NodeJS.Timeout>()

    // 修复SSR问题：只在客户端设置快捷键
    useEffect(() => {
        setIsClient(true)
        const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
        setShortcutKey(isMac ? '⌘K' : 'Ctrl+K')
    }, [])

    // 键盘快捷键支持
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+K 或 Cmd+K 聚焦搜索框
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    // 检测键盘快捷键显示
    useEffect(() => {
        setShowShortcut(!isFocused && !query && !isLoading && isClient && shortcutKey)
    }, [isFocused, query, isLoading, isClient, shortcutKey])

    // 防抖搜索 - P0-2: 优化搜索门槛，1字符时延迟更长
    const debouncedSearch = useCallback((searchQuery: string, delay?: number) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }

        const debounceDelay = delay || (searchQuery.length === 1 ? 500 : 300) // 1字符500ms，其他300ms
        debounceTimeoutRef.current = setTimeout(() => {
            onSearch(searchQuery.trim())
        }, debounceDelay)
    }, [onSearch])

    // 清理防抖定时器
    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
            }
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // 立即搜索，清除防抖
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }
        onSearch(query.trim())
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        // P0-2: 优化搜索门槛 - 1字符即可搜索，但延迟更长
        if (value.trim().length >= 1) {
            debouncedSearch(value)
        } else if (value.trim().length === 0) {
            // 立即清空结果
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
            }
            onSearch('')
        }
    }

    const handleClear = () => {
        setQuery('')
        onSearch('')
        inputRef.current?.focus()
        // 清除防抖定时器
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }
    }

    // 键盘快捷键支持
    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                // ESC键清空搜索
                handleClear()
                e.preventDefault()
                break
            case 'Enter':
                // Enter键确认搜索
                handleSubmit(e as React.FormEvent)
                break
        }
    }

    // 焦点处理
    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    // P0-3: 修复SSR问题的占位符文本生成
    const getPlaceholderText = () => {
        if (isLoading) return "搜索中..."
        if (showShortcut && shortcutKey) {
            return `${placeholder} (${shortcutKey})`
        }
        return placeholder
    }

    return (
        <div className={className}>
            <form onSubmit={handleSubmit} role="search">
                {/* 外层毛玻璃容器 - 移除灰色背景，保持透明 */}
                <div style={{
                    background: 'transparent', // 移除灰色背景，保持完全透明
                    backdropFilter: 'blur(8px)', // 减少模糊效果
                    WebkitBackdropFilter: 'blur(8px)',
                    border: isFocused
                        ? '1px solid rgba(59, 130, 246, 0.40)' // 聚焦时蓝色边框
                        : '1px solid rgba(42, 42, 42, 0.30)', // 非聚焦时更淡的边框
                    borderRadius: '16px',
                    padding: '16px 20px',
                    width: '100%',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    opacity: disabled ? 0.5 : 1,
                    // 保持微妙的阴影效果
                    boxShadow: isFocused
                        ? '0 4px 20px rgba(59, 130, 246, 0.15)'
                        : '0 2px 8px rgba(0, 0, 0, 0.05)',
                }}>
                    {/* 内层搜索输入框 - 优化视觉设计 */}
                    <div style={{
                        background: 'rgba(18, 18, 18, 0.40)', // 稍微降低背景透明度
                        border: 'none',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px', // 增加间距让布局更舒适
                        paddingLeft: '18px', // 优化内边距
                        paddingRight: '18px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        overflow: 'hidden',
                        position: 'relative',
                        minHeight: '44px' // 确保最小高度，优化视觉比例
                    }}>
                        {/* 搜索图标或加载指示器 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '18px',
                            minHeight: '18px'
                        }}>
                            {isLoading ? (
                                // 加载状态 - 旋转动画
                                <div
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        border: '2px solid rgba(59, 130, 246, 0.2)',
                                        borderTop: '2px solid #3B82F6',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}
                                />
                            ) : (
                                <Icon
                                    name="search-icon"
                                    size="md"
                                    style={{
                                        width: '18px', // 稍微减小尺寸，更精致
                                        height: '18px',
                                        flexShrink: 0,
                                        transition: 'filter 0.3s ease',
                                        // 优化颜色过渡
                                        filter: isFocused
                                            ? 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(2976%) hue-rotate(214deg) brightness(102%) contrast(98%)'
                                            : 'brightness(0) saturate(100%) invert(75%) sepia(8%) saturate(345%) hue-rotate(183deg) brightness(95%) contrast(92%)' // 稍微更亮的灰色
                                    }}
                                />
                            )}
                        </div>

                        {/* 搜索输入框 - 精确还原设计稿样式 */}
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={getPlaceholderText()}
                            disabled={disabled}
                            aria-label="搜索AI变现内容"
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: query ? '#FFFFFF' : '#9CA3AF',
                                fontSize: '15px', // 稍微增大字体，提升可读性
                                lineHeight: '22px',
                                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                                height: '40px', // 优化高度
                                display: 'flex',
                                alignItems: 'center',
                                padding: 0,
                                width: '100%',
                                transition: 'color 0.3s ease'
                            }}
                        />

                        {/* 清空按钮 - 优化视觉设计 */}
                        {query && !disabled && (
                            <button
                                type="button"
                                onClick={handleClear}
                                aria-label="清空搜索"
                                style={{
                                    background: 'rgba(107, 114, 128, 0.15)', // 更淡的背景
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px', // 稍微减小尺寸
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#9CA3AF',
                                    fontSize: '12px',
                                    lineHeight: '1',
                                    flexShrink: 0,
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // 更平滑的过渡
                                    opacity: 0.6
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.25)'
                                    e.currentTarget.style.opacity = '1'
                                    e.currentTarget.style.transform = 'scale(1.1)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.15)'
                                    e.currentTarget.style.opacity = '0.6'
                                    e.currentTarget.style.transform = 'scale(1)'
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {/* 内联CSS样式 */}
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* 输入框聚焦时的高亮效果 */
                input:focus::placeholder {
                    color: rgba(156, 163, 175, 0.8);
                    transition: color 0.3s ease;
                }

                /* 搜索框整体的微动画 */
                form {
                    transition: transform 0.2s ease;
                }

                form:focus-within {
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    )
}