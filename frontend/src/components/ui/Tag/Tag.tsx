'use client'

import { type HTMLAttributes } from 'react'
import { Icon } from '@/components/ui/Icon/Icon'
import { getTagByName, getTagById, DEFAULT_TAG, type Tag as TagData } from '@/lib/tags'

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
 * 使用周刊页面的简洁样式，支持多种尺寸和配置
 * 自动从标签管理系统获取颜色和样式配置
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
    // 获取标签数据
    const tagData = typeof tag === 'string'
        ? getTagByName(tag) || getTagById(tag) || DEFAULT_TAG
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
                gap: showIcon ? '4px' : '0',
                background: tagData.backgroundColor,
                color: tagData.color,
                border: `1px solid ${tagData.borderColor}`,
                borderRadius: '6px',
                padding: config.padding,
                fontSize: config.fontSize,
                fontWeight: '500',
                lineHeight: config.lineHeight,
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                whiteSpace: 'nowrap',
                flexShrink: 0,
                cursor: clickable ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                ...props.style
            }}
            onClick={onClick}
            {...props}
        >
            {/* 可选图标 */}
            {showIcon && tagData.iconName && (
                <Icon
                    name={tagData.iconName}
                    size={config.iconSize}
                    style={{ flexShrink: 0 }}
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

            {/* CSS样式 */}
            <style jsx>{`
        .tag--clickable:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        .tag--clickable:active {
          transform: translateY(0);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
          .tag--lg {
            font-size: 12px !important;
            padding: 4px 8px !important;
          }
          
          .tag--md {
            font-size: 11px !important;
            padding: 3px 6px !important;
          }
          
          .tag--sm {
            font-size: 10px !important;
            padding: 2px 4px !important;
          }
        }
      `}</style>
        </span>
    )
}

/**
 * 标签列表组件
 * 用于渲染多个标签，自动处理间距和换行
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
                    ? getTagByName(tag) || getTagById(tag) || DEFAULT_TAG
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
                        color: '#9CA3AF',
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