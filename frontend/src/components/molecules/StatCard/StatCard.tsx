'use client'

import React from 'react'
import { Icon } from '@/components/ui'
import styles from './StatCard.module.css'

interface StatCardProps {
    title: string
    value: string | number
    icon: string
    iconColor?: 'blue' | 'green' | 'purple' | 'orange'
    className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    iconColor = 'blue',
    className = ''
}) => {
    const getIconBackground = () => {
        switch (iconColor) {
            case 'blue':
                return 'linear-gradient(135deg, #3B82F6 15%, #06B6D4 85%)'
            case 'green':
                return 'linear-gradient(135deg, #22C55E 15%, #34D399 85%)'
            case 'purple':
                return 'linear-gradient(135deg, #A855F7 15%, #EC4899 85%)'
            case 'orange':
                return 'linear-gradient(135deg, #FB923C 15%, #F59E0B 85%)'
            default:
                return 'linear-gradient(135deg, #3B82F6 15%, #06B6D4 85%)'
        }
    }

    return (
        <div className={`${styles.statCard} ${className}`}>
            <div className={styles.statCardContent}>
                <div
                    className={styles.statCardIcon}
                    style={{ background: getIconBackground() }}
                >
                    <Icon name={icon} size="md" className={styles.icon} />
                </div>

                <div className={styles.statCardInfo}>
                    <p className={styles.statCardTitle}>{title}</p>
                    <div className={styles.statCardValue}>{value}</div>
                </div>
            </div>
        </div>
    )
}

export default StatCard 