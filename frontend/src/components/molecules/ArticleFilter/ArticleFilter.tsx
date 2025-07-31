'use client'

import { useThemeStore } from '@/stores'

interface FilterOption {
    id: string
    label: string
    count?: number
    colors?: {
        background: string
        border?: string
        text: string
    }
}

interface ArticleFilterProps {
    options: FilterOption[]
    activeFilter: string
    onFilterChange: (filterId: string) => void
    className?: string
}

export function ArticleFilter({
    options,
    activeFilter,
    onFilterChange,
    className = ''
}: ArticleFilterProps) {
    const { theme } = useThemeStore()
    
    // 🎯 智能颜色处理函数 - 只针对技术指南按钮在暗色主题下做特殊处理
    const getTextColor = (option: FilterOption, isActive: boolean) => {
        if (isActive) {
            return 'var(--color-text-primary)'
        }
        
        // 🎯 特殊处理：只针对技术指南按钮在暗色主题下调整颜色
        if (option.id === 'tech-guide' && theme === 'dark') {
            return '#60A5FA' // 更亮的蓝色，提升对比度
        }
        
        // 其他按钮保持原有的自定义颜色
        if (option.colors?.text) {
            return option.colors.text
        }
        
        return isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)'
    }
    
    return (
        <div className={className} style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--spacing-3)',
            alignItems: 'center'
        }}>
            {options.map((option) => {
                const isActive = activeFilter === option.id

                return (
                    <button
                        key={option.id}
                        onClick={() => onFilterChange(option.id)}
                        style={{
                            // 🎯 优化背景切换 - 统一使用渐变，避免透明和渐变之间的突然变化
                            background: isActive
                                ? (option.colors?.background || 'var(--gradient-primary)')
                                : 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(139, 92, 246, 0) 100%)', // 使用透明的相同渐变
                            // 🎯 修复主题颜色问题 - 使用智能颜色处理函数
                            color: getTextColor(option, isActive),
                            // 🎯 统一边框处理 - 避免边框的突然出现和消失
                            border: '1px solid transparent', // 统一使用透明边框，避免无边框到有边框的突变
                            borderColor: isActive
                                ? 'transparent'
                                : option.colors?.border
                                    ? option.colors.border
                                    : 'var(--color-border-primary)',
                            borderRadius: '9999px',
                            padding: '9px 15px',
                            fontSize: '14px',
                            fontWeight: '400',
                            cursor: 'pointer',
                            // 🎯 优化过渡效果 - 使用更快的过渡和平滑的缓动函数
                            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-1)',
                            whiteSpace: 'nowrap',
                            // 🎯 优化阴影效果 - 使用更平滑的阴影过渡
                            boxShadow: isActive
                                ? '0 2px 8px rgba(59, 130, 246, 0.3)'
                                : option.colors && !isActive
                                    ? '0px 0px 8px 0px rgba(0, 0, 0, 0.20)'
                                    : '0 2px 8px rgba(0, 0, 0, 0)',
                            // 🔧 防止点击时的突兀效果
                            WebkitTapHighlightColor: 'transparent',
                            userSelect: 'none'
                        }}
                        className={`article-filter-button ${isActive ? 'article-filter-button--active' : ''}`}
                        // 🎯 添加悬停和点击状态的平滑处理
                        onMouseEnter={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.background = 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                                e.currentTarget.style.borderColor = 'var(--color-border-active)'
                                // 悬停时也使用智能颜色
                                e.currentTarget.style.color = getTextColor(option, false)
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.background = 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(139, 92, 246, 0) 100%)'
                                e.currentTarget.style.borderColor = option.colors?.border || 'var(--color-border-primary)'
                                // 恢复原始颜色
                                e.currentTarget.style.color = getTextColor(option, false)
                            }
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'translateY(1px)'
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        <span>{option.label}</span>
                        {option.count !== undefined && (
                            <span style={{
                                fontSize: 'var(--font-size-xs)',
                                opacity: 0.8,
                                marginLeft: '2px'
                            }}>
                                ({option.count})
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
} 