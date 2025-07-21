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
                textAlign: textAlign
            }}
        >
            <div style={{
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                <GradientText
                    size="6xl"
                    weight="bold"
                    style={{
                        marginBottom: 'var(--spacing-4)',
                        textAlign: textAlign
                    }}
                >
                    {title}
                </GradientText>

                {subtitle && (
                    <h2 style={{
                        fontSize: 'var(--font-size-2xl)',
                        color: 'var(--color-text-secondary)',
                        fontWeight: '500',
                        marginBottom: description ? 'var(--spacing-4)' : 'var(--spacing-6)',
                        textAlign: textAlign
                    }}>
                        {subtitle}
                    </h2>
                )}

                {description && (
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-text-muted)',
                        lineHeight: '1.6',
                        marginBottom: 'var(--spacing-6)',
                        maxWidth: '600px',
                        margin: alignment === 'center' ? '0 auto var(--spacing-6)' :
                            alignment === 'right' ? '0 0 var(--spacing-6) auto' :
                                '0 0 var(--spacing-6) 0',
                        textAlign: textAlign
                    }}>
                        {description}
                    </p>
                )}

                {children}
            </div>
        </header>
    )
} 