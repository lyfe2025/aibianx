'use client'

import { GradientText } from '@/components/ui'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
    title: string
    subtitle?: string
    description?: string
    alignment?: 'left' | 'center' | 'right'
    className?: string
    children?: React.ReactNode
}

export function PageHeader({
    title,
    subtitle,
    description,
    alignment = 'center',
    className = '',
    children
}: PageHeaderProps) {
    const textAlign: 'left' | 'center' | 'right' = alignment

    return (
        <header
            className={className}
            style={{
                padding: '80px 0 40px',
                textAlign: textAlign,
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                position: 'relative',
                overflow: 'hidden'
            }}
        >


            <div style={{
                width: '787.34px',
                maxWidth: '787.34px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                position: 'relative',
                zIndex: 1
            }}>
                <GradientText
                    size="7xl"
                    weight="bold"
                    className={styles.titleAnimation}
                    style={{
                        fontSize: '48px',
                        fontWeight: '700',
                        lineHeight: '67px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        textOverflow: 'ellipsis',
                        height: '67px', // 使用固定高度而不是minHeight
                        margin: '0'
                    }}
                >
                    {title}
                </GradientText>

                {subtitle && (
                    <h2 className={styles.subtitleAnimation} style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '20px',
                        fontWeight: '400',
                        lineHeight: '28px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        textOverflow: 'ellipsis',
                        height: '56px', // 使用固定高度而不是minHeight
                        margin: '9px 0 0 0' // 精确控制上边距
                    }}>
                        {subtitle}
                    </h2>
                )}

                {description && (
                    <p className={styles.descriptionAnimation} style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.6',
                        textAlign: 'center',
                        margin: '16px 0 0 0' // 描述文字的上边距
                    }}>
                        {description}
                    </p>
                )}

                {children && (
                    <div className={styles.childrenAnimation} style={{
                        marginTop: '20px' // 子元素的上边距
                    }}>
                        {children}
                    </div>
                )}
            </div>


        </header>
    )
}