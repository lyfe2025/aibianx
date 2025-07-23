'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@/components/ui'

interface SearchBarProps {
    placeholder?: string
    onSearch: (query: string) => void
    className?: string
    disabled?: boolean
    showResultCount?: boolean
    resultCount?: number
    isLoading?: boolean
}

export function SearchBar({
    placeholder = "搜索文章、工具、案例...", // P0-1: 简化占位符文字
    onSearch,
    className = '',
    disabled = false,
    showResultCount = false,
    resultCount = 0,
    isLoading = false
}: SearchBarProps) {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const debounceTimeoutRef = useRef<NodeJS.Timeout>()

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

        // P0-2: 防抖搜索：输入1个字符以上时触发，或者清空时立即触发
        if (value.trim().length >= 1) {
            debouncedSearch(value)
        } else if (value.trim().length === 0) {
            // 清空时立即触发
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
            }
            onSearch('')
        }
    }

    // 清空搜索
    const handleClear = () => {
        setQuery('')
        onSearch('')
        inputRef.current?.focus()
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
                handleSubmit(e as any)
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

    // P0-3: 简化占位符提示，移除重复信息
    const getPlaceholderText = () => {
        return placeholder // 直接返回简洁的占位符，不再添加ESC提示
    }

    return (
        <form onSubmit={handleSubmit} className={className} role="search">
            {/* 外层毛玻璃容器 - 按设计稿精确还原 */}
            <div style={{
                background: 'rgba(26, 26, 26, 0.30)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: isFocused
                    ? '1px solid rgba(59, 130, 246, 0.50)'
                    : '1px solid rgba(42, 42, 42, 0.80)',
                borderRadius: '16px',
                padding: '20px 24px',
                width: '100%',
                transition: 'border-color 0.2s ease',
                opacity: disabled ? 0.5 : 1
            }}>
                {/* 搜索结果统计 - 仅在有结果时显示 */}
                {showResultCount && query.trim() && !isLoading && (
                    <div style={{
                        color: '#9CA3AF',
                        fontSize: '12px',
                        lineHeight: '16px',
                        marginBottom: '8px',
                        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif"
                    }}>
                        找到 {resultCount} 个相关结果
                    </div>
                )}

                {/* 内层搜索输入框 - 按设计稿精确还原 */}
                <div style={{
                    background: 'rgba(18, 18, 18, 0.50)',
                    border: 'none', // 移除内层边框，避免双重边框效果
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    paddingLeft: '21px',
                    paddingRight: '21px',
                    paddingTop: '1px',
                    paddingBottom: '1px',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    {/* 搜索图标或加载指示器 */}
                    {isLoading ? (
                        <div style={{
                            width: '20px',
                            height: '20px',
                            flexShrink: 0,
                            marginTop: '14px',
                            marginBottom: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid rgba(59, 130, 246, 0.2)',
                                borderTop: '2px solid #3B82F6',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                        </div>
                    ) : (
                        <Icon
                            name="search-icon"
                            size="md"
                            style={{
                                width: '20px',
                                height: '20px',
                                flexShrink: 0,
                                marginTop: '14px',
                                marginBottom: '14px',
                                transition: 'filter 0.2s ease',
                                // 使用filter确保图标在黑色背景下可见
                                filter: isFocused
                                    ? 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(2976%) hue-rotate(214deg) brightness(102%) contrast(98%)' // 蓝色
                                    : 'brightness(0) saturate(100%) invert(83%) sepia(8%) saturate(345%) hue-rotate(183deg) brightness(95%) contrast(92%)' // 亮灰色，在黑背景下可见
                            }}
                        />
                    )}

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
                        aria-describedby={showResultCount ? "search-results-count" : undefined}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: query ? '#FFFFFF' : '#9CA3AF',
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: 0,
                            width: '100%',
                            transition: 'color 0.2s ease'
                        }}
                    />

                    {/* P1-5: 清空按钮 - 优化点击区域 */}
                    {query && !disabled && (
                        <button
                            type="button"
                            onClick={handleClear}
                            aria-label="清空搜索"
                            style={{
                                background: 'rgba(107, 114, 128, 0.2)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '28px', // 从20px增加到28px
                                height: '28px', // 从20px增加到28px
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#9CA3AF',
                                fontSize: '14px', // 从12px增加到14px
                                lineHeight: '1',
                                flexShrink: 0,
                                marginTop: '10px', // 从14px调整到10px保持居中
                                marginBottom: '10px', // 从14px调整到10px保持居中
                                transition: 'all 0.2s ease',
                                opacity: 0.7,
                                // 增加更大的点击区域
                                padding: '4px' // 内边距增加点击区域
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(107, 114, 128, 0.3)'
                                e.currentTarget.style.opacity = '1'
                                e.currentTarget.style.transform = 'scale(1.1)' // 添加悬浮放大效果
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(107, 114, 128, 0.2)'
                                e.currentTarget.style.opacity = '0.7'
                                e.currentTarget.style.transform = 'scale(1)'
                            }}
                        >
                            ×
                        </button>
                    )}
                </div>

                {/* P0-3: 移除重复的搜索提示文字，减少认知负担 */}
                {/* 原本的搜索提示已移除 */}
            </div>

            {/* 加载动画样式 */}
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </form>
    )
} 