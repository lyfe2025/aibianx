'use client'

import { GradientText } from '@/components/ui'

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
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif"
            }}
        >
            <div style={{
                width: '787.34px',
                maxWidth: '787.34px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '9px'
            }}>
                <GradientText
                    size="7xl"
                    weight="bold"
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
                    <h2 style={{
                        color: '#9CA3AF',
                        fontSize: '20px',
                        fontWeight: '400',
                        lineHeight: '28px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        textOverflow: 'ellipsis',
                        minHeight: description ? '28px' : '56px',
                        margin: '0'
                    }}>
                        {subtitle}
                    </h2>
                )}

                {description && (
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.6',
                        textAlign: textAlign,
                        margin: '0'
                    }}>
                        {description}
                    </p>
                )}

                {children}
            </div>
        </header>
    )
} 