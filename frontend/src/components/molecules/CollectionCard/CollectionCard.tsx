'use client'

import React from 'react'
import Image from 'next/image'
import { Icon } from '@/components/ui'
import styles from './CollectionCard.module.css'

interface CollectionCardProps {
    title: string
    category: string
    coverImage: string
    collectedAt: string
    className?: string
    onClick?: () => void
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
    title,
    category,
    coverImage,
    collectedAt,
    className = '',
    onClick
}) => {
    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'ai工具':
                return 'rgba(0, 0, 0, 0.50)'
            case '教程':
                return 'rgba(0, 0, 0, 0.50)'
            case '案例':
                return 'rgba(0, 0, 0, 0.50)'
            case '文章':
                return 'rgba(0, 0, 0, 0.50)'
            default:
                return 'rgba(0, 0, 0, 0.50)'
        }
    }

    return (
        <div className={`${styles.collectionCard} ${className}`} onClick={onClick}>
            <div className={styles.collectionCardContent}>
                {/* 封面图片 */}
                <div className={styles.collectionCardCover}>
                    <Image
                        src={coverImage}
                        alt={title}
                        width={263}
                        height={128}
                        className={styles.coverImage}
                    />
                    <div
                        className={styles.categoryTag}
                        style={{ background: getCategoryColor(category) }}
                    >
                        <span className={styles.categoryText}>{category}</span>
                    </div>
                </div>

                {/* 标题 */}
                <div className={styles.collectionCardHeader}>
                    <h3 className={styles.collectionCardTitle}>{title}</h3>
                </div>

                {/* 收藏信息 */}
                <div className={styles.collectionCardFooter}>
                    <div className={styles.collectedInfo}>
                        <Icon name="bookmark-icon" size="xs" className={styles.bookmarkIcon} />
                        <span className={styles.collectedText}>收藏于 {collectedAt}</span>
                    </div>
                    <button className={styles.moreButton} aria-label="更多操作">
                        <Icon name="more-horizontal" size="xs" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CollectionCard 