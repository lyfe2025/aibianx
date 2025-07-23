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
                        {/* 动画背景球体 - 精致小球效果 */}
            <div 
                className={styles.animatedBackground}
                style={{
                    position: 'absolute',
                    top: '-50px',
                    left: '-50px',
                    width: '180px',
                    height: '180px',
                    background: 'linear-gradient(90deg, rgba(79, 172, 254, 0.3) 0%, rgba(0, 242, 254, 0.15) 100%)',
                    filter: 'blur(50px)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />
            
            {/* 第二个小球 - 右上角 */}
            <div 
                className={styles.animatedBackgroundSecondary}
                style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-60px',
                    width: '150px',
                    height: '150px',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(59, 130, 246, 0.12) 100%)',
                    filter: 'blur(45px)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* 第三个小球 - 增强层次 */}
            <div 
                className={styles.animatedBackgroundAccent}
                style={{
                    position: 'absolute',
                    top: '50px',
                    right: '-30px',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(79, 172, 254, 0.08) 100%)',
                    filter: 'blur(40px)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* 第四个装饰小球 - 左侧微光 */}
            <div 
                className={styles.animatedBackgroundSmall}
                style={{
                    position: 'absolute',
                    top: '80px',
                    left: '-20px',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, rgba(168, 85, 247, 0.06) 100%)',
                    filter: 'blur(35px)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <div style={{
                width: '787.34px',
                maxWidth: '787.34px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '9px',
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
                        minHeight: '67px'
                    }}
                >
                    {title}
                </GradientText>

                {subtitle && (
                    <h2 className={styles.subtitleAnimation} style={{
                        color: '#9CA3AF',
                        fontSize: '20px',
                        fontWeight: '400',
                        lineHeight: '28px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        textOverflow: 'ellipsis',
                        minHeight: '56px',
                        margin: '0'
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
                        margin: '0'
                    }}>
                        {description}
                    </p>
                )}

                {children && (
                    <div className={styles.childrenAnimation}>
                        {children}
                    </div>
                )}
            </div>


        </header>
    )
}