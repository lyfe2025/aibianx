'use client'

import React from 'react'
import { Icon } from '@/components/ui'
import styles from './BookmarkCard.module.css'

interface BookmarkCardProps {
    title: string
    category: string
    image: string
    collectedAt: string
    className?: string
    onClick?: () => void
}

/**
 * 收藏内容卡片组件 - BookmarkCard
 * 
 * ✅ 功能特性：
 * 1. 图片展示 - 显示收藏内容的封面图
 * 2. 分类标签 - 显示内容分类（AI工具、教程、案例、文章等）
 * 3. 标题显示 - 显示收藏内容标题
 * 4. 收藏时间 - 显示收藏的时间信息
 * 5. 操作菜单 - 提供更多操作选项
 * 
 * 🎨 设计规范：
 * - 毛玻璃卡片效果：backdrop-filter: blur(12px)
 * - 圆角边框：border-radius: 12px
 * - 悬停效果：鼠标悬停时轻微的阴影变化
 * - 图片覆盖层：分类标签浮在图片上方
 */
export const BookmarkCard: React.FC<BookmarkCardProps> = ({
    title,
    category,
    image,
    collectedAt,
    className = '',
    onClick
}) => {
    return (
        <div
            className={`${styles.bookmarkCard} ${className}`}
            onClick={onClick}
        >
            {/* 封面图片区域 */}
            <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className={styles.categoryTag}>
                    {category}
                </div>
            </div>

            {/* 内容信息区域 */}
            <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{title}</h4>

                <div className={styles.cardMeta}>
                    <div className={styles.collectedInfo}>
                        <Icon name="star-icon" size="xs" className={styles.starIcon} />
                        <span className={styles.collectedText}>{collectedAt}</span>
                    </div>
                    <button
                        className={styles.moreButton}
                        onClick={(e) => {
                            e.stopPropagation()
                            // 更多操作逻辑
                        }}
                    >
                        <Icon name="more-icon" size="xs" className={styles.moreIcon} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookmarkCard 