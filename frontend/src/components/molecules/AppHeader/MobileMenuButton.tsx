'use client'

import { getHamburgerLineStyles } from '@/lib/headerUtils'
import { HEADER_STYLES } from '@/constants/headerConfig'

interface MobileMenuButtonProps {
    isOpen: boolean
    onClick: () => void
}

/**
 * MobileMenuButton 组件
 * 
 * 移动端汉堡菜单按钮，带动画效果
 */
export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
    const { buttons, hamburger, transitions } = HEADER_STYLES

    const buttonStyles = {
        background: 'var(--color-bg-glass)',
        borderStyle: 'solid' as const,
        borderColor: 'var(--color-border-primary)',
        borderWidth: '1px',
        borderRadius: buttons.icon.borderRadius,
        padding: buttons.mobile.padding,
        display: 'none',
        width: buttons.mobile.size,
        height: buttons.mobile.size,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: transitions.normal,
        flexShrink: 0,
        touchAction: 'manipulation' as const,
        WebkitTapHighlightColor: 'transparent'
    }

    const iconContainerStyles = {
        position: 'relative' as const,
        width: hamburger.size.width,
        height: hamburger.size.height,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between'
    }

    return (
        <button
            onClick={onClick}
            className="mobile-menu-button"
            style={buttonStyles}
        >
            <div style={iconContainerStyles}>
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        style={getHamburgerLineStyles(
                            hamburger.line.background,
                            hamburger.line.height,
                            hamburger.line.borderRadius,
                            isOpen,
                            index
                        )}
                    />
                ))}
            </div>
        </button>
    )
} 