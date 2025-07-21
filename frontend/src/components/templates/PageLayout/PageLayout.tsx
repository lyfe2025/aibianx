'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { Container } from '@/components/ui'

interface PageLayoutProps {
    children: ReactNode
    className?: string
    showHeader?: boolean
    showFooter?: boolean
    containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    paddingTop?: boolean
    fullHeight?: boolean
}

export const PageLayout = ({
    children,
    className = '',
    showHeader = true,
    showFooter = true,
    containerSize = 'xl',
    paddingTop = true,
    fullHeight = false
}: PageLayoutProps) => {
    const layoutStyle = {
        minHeight: fullHeight ? '100vh' : '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)'
    }

    const mainStyle = {
        flex: 1,
        paddingTop: showHeader && paddingTop ? '96px' : '0',
        paddingBottom: showFooter ? '0' : '0'
    }

    const mainClasses = [
        'main-content',
        className
    ].filter(Boolean).join(' ')

    return (
        <div style={layoutStyle}>
            {/* Header导航栏 */}
            {showHeader && <Header />}

            {/* 主要内容区域 */}
            <main className={mainClasses} style={mainStyle}>
                {containerSize === 'full' ? (
                    children
                ) : (
                    <Container size={containerSize}>
                        {children}
                    </Container>
                )}
            </main>

            {/* Footer页脚 */}
            {showFooter && <Footer />}
        </div>
    )
} 