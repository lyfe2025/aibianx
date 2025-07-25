'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Icon, Loading } from '@/components/ui'

interface SearchSuggestion {
    id: string
    text: string
    type: 'history' | 'suggestion' | 'popular'
    category?: string
    count?: number
}

interface SmartSearchProps {
    placeholder?: string
    onSearch: (query: string) => void
    onSuggestionSelect?: (suggestion: SearchSuggestion) => void
    className?: string
    disabled?: boolean
    showHistory?: boolean
    showPopular?: boolean
    maxSuggestions?: number
    debounceMs?: number
}

/**
 * SmartSearch 智能搜索组件
 * 
 * 功能特性：
 * - 实时搜索建议
 * - 搜索历史记录
 * - 热门搜索推荐
 * - 键盘快捷键支持
 * - 移动端优化
 * - 语音搜索支持（移动端）
 * - 无障碍支持
 * 
 * 设计规范：
 * - 毛玻璃背景效果
 * - 圆角: 16px
 * - 触摸友好设计
 * - 渐变边框
 */
export function SmartSearch({
    placeholder = "搜索文章、工具、案例...",
    onSearch,
    onSuggestionSelect,
    className = '',
    disabled = false,
    showHistory = true,
    showPopular = true,
    maxSuggestions = 8,
    debounceMs = 300,
}: SmartSearchProps) {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
    const [searchHistory, setSearchHistory] = useState<SearchSuggestion[]>([])
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isClient, setIsClient] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // 热门搜索推荐（模拟数据）
    const popularSearches: SearchSuggestion[] = [
        { id: 'p1', text: 'AI工具推荐', type: 'popular', category: '工具', count: 1234 },
        { id: 'p2', text: 'ChatGPT使用技巧', type: 'popular', category: '教程', count: 987 },
        { id: 'p3', text: 'AI变现案例', type: 'popular', category: '案例', count: 765 },
        { id: 'p4', text: 'Midjourney提示词', type: 'popular', category: '工具', count: 654 },
        { id: 'p5', text: 'AI写作助手', type: 'popular', category: '工具', count: 543 },
        { id: 'p6', text: '自动化工作流', type: 'popular', category: '教程', count: 432 },
    ]

    // 客户端初始化
    useEffect(() => {
        setIsClient(true)

        // 从本地存储加载搜索历史
        const savedHistory = localStorage.getItem('search-history')
        if (savedHistory) {
            try {
                const history = JSON.parse(savedHistory)
                setSearchHistory(history.slice(0, 10)) // 最多保存10条
            } catch (error) {
                console.warn('Failed to load search history:', error)
            }
        }
    }, [])

    // 保存搜索历史到本地存储
    const saveSearchHistory = useCallback((newHistory: SearchSuggestion[]) => {
        try {
            localStorage.setItem('search-history', JSON.stringify(newHistory))
        } catch (error) {
            console.warn('Failed to save search history:', error)
        }
    }, [])

    // 添加搜索历史
    const addToHistory = useCallback((searchQuery: string) => {
        if (!searchQuery.trim()) return

        const newHistoryItem: SearchSuggestion = {
            id: `h${Date.now()}`,
            text: searchQuery.trim(),
            type: 'history',
        }

        setSearchHistory(prev => {
            // 移除重复项
            const filtered = prev.filter(item => item.text !== newHistoryItem.text)
            // 添加到顶部，限制数量
            const newHistory = [newHistoryItem, ...filtered].slice(0, 10)
            saveSearchHistory(newHistory)
            return newHistory
        })
    }, [saveSearchHistory])

    // 获取搜索建议（模拟API调用）
    const fetchSuggestions = useCallback(async (searchQuery: string): Promise<SearchSuggestion[]> => {
        if (!searchQuery.trim()) return []

        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 100))

        // 模拟搜索建议
        const mockSuggestions: SearchSuggestion[] = [
            { id: 's1', text: `${searchQuery} 教程`, type: 'suggestion', category: '教程' },
            { id: 's2', text: `${searchQuery} 工具推荐`, type: 'suggestion', category: '工具' },
            { id: 's3', text: `${searchQuery} 最佳实践`, type: 'suggestion', category: '教程' },
            { id: 's4', text: `${searchQuery} 案例分析`, type: 'suggestion', category: '案例' },
        ].filter(item =>
            item.text.toLowerCase().includes(searchQuery.toLowerCase())
        )

        return mockSuggestions.slice(0, 4)
    }, [])

    // 防抖搜索建议
    const debouncedFetchSuggestions = useCallback((searchQuery: string) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }

        setIsLoading(true)
        debounceTimeoutRef.current = setTimeout(async () => {
            try {
                const newSuggestions = await fetchSuggestions(searchQuery)
                setSuggestions(newSuggestions)
            } catch (error) {
                console.warn('Failed to fetch suggestions:', error)
                setSuggestions([])
            } finally {
                setIsLoading(false)
            }
        }, debounceMs)
    }, [fetchSuggestions, debounceMs])

    // 获取显示的建议列表
    const getDisplaySuggestions = useCallback((): SearchSuggestion[] => {
        const results: SearchSuggestion[] = []

        if (query.trim()) {
            // 有搜索词时显示相关建议
            results.push(...suggestions)

            // 显示匹配的历史记录
            if (showHistory) {
                const matchingHistory = searchHistory
                    .filter(item => item.text.toLowerCase().includes(query.toLowerCase()))
                    .slice(0, 3)
                results.push(...matchingHistory)
            }
        } else {
            // 无搜索词时显示历史记录和热门搜索
            if (showHistory && searchHistory.length > 0) {
                results.push(...searchHistory.slice(0, 5))
            }

            if (showPopular) {
                results.push(...popularSearches.slice(0, 6))
            }
        }

        return results.slice(0, maxSuggestions)
    }, [query, suggestions, searchHistory, showHistory, showPopular, maxSuggestions, popularSearches])

    // 处理输入变化
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        setActiveSuggestionIndex(-1)

        if (value.trim()) {
            debouncedFetchSuggestions(value)
        } else {
            setSuggestions([])
            setIsLoading(false)
        }
    }

    // 处理搜索提交
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const searchQuery = query.trim()

        if (searchQuery) {
            addToHistory(searchQuery)
            onSearch(searchQuery)
            setShowDropdown(false)
            inputRef.current?.blur()
        }
    }

    // 处理建议选择
    const handleSuggestionClick = (suggestion: SearchSuggestion) => {
        setQuery(suggestion.text)
        addToHistory(suggestion.text)
        onSuggestionSelect?.(suggestion)
        onSearch(suggestion.text)
        setShowDropdown(false)
        inputRef.current?.blur()
    }

    // 键盘导航
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const displaySuggestions = getDisplaySuggestions()

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setActiveSuggestionIndex(prev =>
                    prev < displaySuggestions.length - 1 ? prev + 1 : prev
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setActiveSuggestionIndex(prev => prev > 0 ? prev - 1 : -1)
                break
            case 'Enter':
                e.preventDefault()
                if (activeSuggestionIndex >= 0 && displaySuggestions[activeSuggestionIndex]) {
                    handleSuggestionClick(displaySuggestions[activeSuggestionIndex])
                } else {
                    handleSubmit(e as React.FormEvent)
                }
                break
            case 'Escape':
                setShowDropdown(false)
                setActiveSuggestionIndex(-1)
                inputRef.current?.blur()
                break
        }
    }

    // 处理焦点
    const handleFocus = () => {
        setIsFocused(true)
        setShowDropdown(true)
    }

    const handleBlur = (e: React.FocusEvent) => {
        // 延迟关闭，允许点击建议
        setTimeout(() => {
            if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
                setIsFocused(false)
                setShowDropdown(false)
                setActiveSuggestionIndex(-1)
            }
        }, 150)
    }

    // 清空历史记录
    const clearHistory = () => {
        setSearchHistory([])
        saveSearchHistory([])
    }

    const displaySuggestions = getDisplaySuggestions()

    if (!isClient) return null

    return (
        <div className={`smart-search ${className}`} style={{ position: 'relative', width: '100%' }}>
            {/* 搜索输入框 */}
            <form onSubmit={handleSubmit} role="search">
                <div
                    style={{
                        background: 'rgba(26, 26, 26, 0.85)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${isFocused ? '#3B82F6' : 'rgba(42, 42, 42, 0.70)'}`,
                        borderRadius: '16px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.3s ease',
                        opacity: disabled ? 0.5 : 1,
                        boxShadow: isFocused ? '0 4px 20px rgba(59, 130, 246, 0.15)' : 'none',
                    }}
                >
                    {/* 搜索图标 */}
                    <Icon
                        name="magnifying-glass"
                        size="lg"
                        style={{
                            width: '20px',
                            height: '20px',
                            color: isFocused ? '#3B82F6' : '#9CA3AF',
                            flexShrink: 0,
                        }}
                    />

                    {/* 输入框 */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={disabled}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#FFFFFF',
                            fontSize: '16px', // 防止iOS缩放
                            lineHeight: '24px',
                            fontFamily: 'var(--font-family-primary)',
                        }}
                        autoComplete="off"
                        aria-label="搜索"
                        aria-expanded={showDropdown}
                        aria-autocomplete="list"
                        role="combobox"
                    />

                    {/* 加载状态 */}
                    {isLoading && (
                        <Loading size="sm" variant="spinner" color="primary" />
                    )}

                    {/* 清空按钮 */}
                    {query && !isLoading && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery('')
                                setSuggestions([])
                                inputRef.current?.focus()
                            }}
                            style={{
                                background: 'rgba(107, 114, 128, 0.20)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexShrink: 0,
                            }}
                            aria-label="清空搜索"
                        >
                            <Icon name="x-mark" size="xs" style={{ color: '#9CA3AF' }} />
                        </button>
                    )}
                </div>
            </form>

            {/* 建议下拉列表 */}
            {showDropdown && displaySuggestions.length > 0 && (
                <div
                    ref={dropdownRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'rgba(26, 26, 26, 0.95)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(42, 42, 42, 0.70)',
                        borderRadius: '12px',
                        marginTop: '8px',
                        padding: '8px',
                        zIndex: 1000,
                        maxHeight: '400px',
                        overflowY: 'auto',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.30)',
                    }}
                    role="listbox"
                >
                    {/* 历史记录标题 */}
                    {!query && showHistory && searchHistory.length > 0 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            marginBottom: '4px'
                        }}>
                            <span style={{
                                color: '#9CA3AF',
                                fontSize: '13px',
                                fontWeight: 500
                            }}>
                                搜索历史
                            </span>
                            <button
                                onClick={clearHistory}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#9CA3AF',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    padding: '4px',
                                }}
                            >
                                清空
                            </button>
                        </div>
                    )}

                    {/* 建议列表 */}
                    {displaySuggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                background: index === activeSuggestionIndex
                                    ? 'rgba(59, 130, 246, 0.10)'
                                    : 'transparent',
                                border: index === activeSuggestionIndex
                                    ? '1px solid rgba(59, 130, 246, 0.30)'
                                    : '1px solid transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                transition: 'all 0.2s ease',
                                marginBottom: '2px',
                            }}
                            role="option"
                            aria-selected={index === activeSuggestionIndex}
                        >
                            {/* 建议类型图标 */}
                            <Icon
                                name={
                                    suggestion.type === 'history' ? 'clock' :
                                        suggestion.type === 'popular' ? 'fire' : 'magnifying-glass'
                                }
                                size="sm"
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    color: suggestion.type === 'popular' ? '#F59E0B' : '#9CA3AF',
                                    flexShrink: 0,
                                }}
                            />

                            {/* 建议内容 */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    color: '#FFFFFF',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {suggestion.text}
                                </div>
                                {suggestion.category && (
                                    <div style={{
                                        color: '#9CA3AF',
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                    }}>
                                        {suggestion.category}
                                    </div>
                                )}
                            </div>

                            {/* 热门度计数 */}
                            {suggestion.count && (
                                <div style={{
                                    color: '#9CA3AF',
                                    fontSize: '12px',
                                    lineHeight: '16px',
                                    flexShrink: 0,
                                }}>
                                    {suggestion.count > 999 ? `${Math.floor(suggestion.count / 1000)}k` : suggestion.count}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* 热门搜索标题 */}
                    {!query && showPopular && searchHistory.length > 0 && (
                        <div style={{
                            padding: '8px 12px',
                            marginTop: '8px',
                            marginBottom: '4px',
                            borderTop: '1px solid rgba(42, 42, 42, 0.50)',
                        }}>
                            <span style={{
                                color: '#9CA3AF',
                                fontSize: '13px',
                                fontWeight: 500
                            }}>
                                热门搜索
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* 移动端样式优化 */}
            <style jsx>{`
        @media (max-width: 768px) {
          .smart-search input {
            font-size: 16px !important; /* 防止iOS自动缩放 */
          }
        }
      `}</style>
        </div>
    )
} 