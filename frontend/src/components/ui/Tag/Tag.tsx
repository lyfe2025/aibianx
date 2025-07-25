'use client'

import { type HTMLAttributes } from 'react'
import { Icon } from '@/components/ui/Icon/Icon'
import { getTagByName, getTagById, DEFAULT_TAG, type Tag as TagData } from '@/lib/tags'
import { useThemeStore } from '@/stores'

/**
 * 标签组件属性接口
 */
export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
    /** 标签名称或标签ID */
    tag: string | TagData
    /** 标签尺寸 */
    size?: 'sm' | 'md' | 'lg'
    /** 是否显示图标 */
    showIcon?: boolean
    /** 自定义类名 */
    className?: string
    /** 是否可点击 */
    clickable?: boolean
    /** 点击回调 */
    onClick?: () => void
}

/**
 * 通用标签组件
 * 
 * 支持主题自动切换，从标签管理系统获取样式配置
 * 确保在亮色和暗色模式下都有良好的显示效果
 * 
 * @param props 标签组件属性
 * @returns 标签组件
 */
export const Tag = ({
    tag,
    size = 'md',
    showIcon = false,
    className = '',
    clickable = false,
    onClick,
    ...props
}: TagProps) => {
    const { theme } = useThemeStore()

    // 获取标签数据，传入当前主题
    const tagData = typeof tag === 'string'
        ? getTagByName(tag, theme) || getTagById(tag, theme) || DEFAULT_TAG
        : tag

    // 尺寸配置
    const sizeConfig = {
        sm: {
            fontSize: '10px',
            padding: '2px 6px',
            iconSize: 'xs' as const,
            lineHeight: '14px'
        },
        md: {
            fontSize: '12px',
            padding: '4px 8px',
            iconSize: 'xs' as const,
            lineHeight: '16px'
        },
        lg: {
            fontSize: '14px',
            padding: '6px 12px',
            iconSize: 'sm' as const,
            lineHeight: '20px'
        }
    }

    const config = sizeConfig[size]

    return (
        <span
            className={`tag tag--${size} ${clickable ? 'tag--clickable' : ''} ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: showIcon ? '6px' : '0',
                background: tagData.backgroundColor,
                color: tagData.color,
                border: `1px solid ${tagData.borderColor}`,
                borderRadius: '6px',
                padding: showIcon ? (
                    size === 'sm' ? '2px 8px' :
                        size === 'md' ? '4px 10px' :
                            '6px 14px'
                ) : config.padding,
                fontSize: config.fontSize,
                fontWeight: '500',
                lineHeight: config.lineHeight,
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                whiteSpace: 'nowrap',
                flexShrink: 0,
                cursor: clickable ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                opacity: clickable ? 1 : 1,
                ...props.style
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                if (clickable) {
                    e.currentTarget.style.opacity = '0.8'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                }
            }}
            onMouseLeave={(e) => {
                if (clickable) {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                }
            }}
            onMouseDown={(e) => {
                if (clickable) {
                    e.currentTarget.style.transform = 'translateY(0)'
                }
            }}
            {...props}
        >
            {/* 可选图标 */}
            {showIcon && tagData.iconName && (
                <Icon
                    name={tagData.iconName}
                    size={config.iconSize}
                    style={{
                        flexShrink: 0,
                        minWidth: size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px',
                        display: 'inline-block'
                    }}
                />
            )}

            {/* 标签文字 */}
            <span style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {tagData.name}
            </span>
        </span>
    )
}

/**
 * 标签列表组件
 * 用于渲染多个标签，自动处理间距和换行
 * 支持主题自动切换
 * 
 * @param props 标签列表属性
 */
export interface TagListProps {
    /** 标签数据数组 */
    tags: Array<string | TagData>
    /** 标签尺寸 */
    size?: 'sm' | 'md' | 'lg'
    /** 是否显示图标 */
    showIcon?: boolean
    /** 最大显示数量 */
    maxCount?: number
    /** 是否可点击 */
    clickable?: boolean
    /** 标签点击回调 */
    onTagClick?: (tag: TagData) => void
    /** 自定义类名 */
    className?: string
    /** 自定义样式 */
    style?: React.CSSProperties
}

export const TagList = ({
    tags,
    size = 'md',
    showIcon = false,
    maxCount = 3,
    clickable = false,
    onTagClick,
    className = '',
    style
}: TagListProps) => {
    const { theme } = useThemeStore()

    // 限制显示数量
    const displayTags = tags.slice(0, maxCount)
    const hasMore = tags.length > maxCount

    return (
        <div
            className={`tag-list ${className}`}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center',
                ...style
            }}
        >
            {displayTags.map((tag, index) => {
                const tagData = typeof tag === 'string'
                    ? getTagByName(tag, theme) || getTagById(tag, theme) || DEFAULT_TAG
                    : tag

                return (
                    <Tag
                        key={`${tagData.id}-${index}`}
                        tag={tagData}
                        size={size}
                        showIcon={showIcon}
                        clickable={clickable}
                        onClick={() => onTagClick?.(tagData)}
                    />
                )
            })}

            {/* 显示更多提示 */}
            {hasMore && (
                <span
                    style={{
                        color: 'var(--color-text-muted)',
                        fontSize: size === 'sm' ? '10px' : size === 'md' ? '12px' : '14px',
                        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif"
                    }}
                >
                    +{tags.length - maxCount}
                </span>
            )}
        </div>
    )
} 