'use client'

import Link from 'next/link'
import { Icon, GradientButton } from '@/components/ui'
import { useTranslation } from '@/lib'
import { isActiveRoute, getMobileMenuStyles, getMobileNavLinkStyles } from '@/lib/headerUtils'
import { NAVIGATION_MENU, HEADER_STYLES } from '@/constants/headerConfig'

interface MobileMenuProps {
    isOpen: boolean
    pathname: string
    isClient: boolean
    theme: string
    language: string
    onClose: () => void
    onLanguageToggle: () => void
    onThemeToggle: () => void
    onLogin: () => void
    onRegister: () => void
}

/**
 * MobileMenu 组件
 * 
 * 移动端侧边栏菜单，包含导航链接和功能按钮
 */
export function MobileMenu({
    isOpen,
    pathname,
    isClient,
    theme,
    language,
    onClose,
    onLanguageToggle,
    onThemeToggle,
    onLogin,
    onRegister
}: MobileMenuProps) {
    const { t } = useTranslation()
    const { mobileMenu, transitions } = HEADER_STYLES

    const menuStyles = getMobileMenuStyles(
        isOpen,
        mobileMenu.width,
        mobileMenu.padding,
        transitions.normal
    )

    const buttonStyles = {
        background: 'var(--color-bg-glass)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '12px',
        padding: '16px',
        color: 'var(--color-text-secondary)',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: transitions.fast,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        touchAction: 'manipulation' as const,
        WebkitTapHighlightColor: 'transparent',
        minHeight: '56px'
    }

    const registerButtonStyles = {
        background: 'transparent',
        border: '1px solid rgba(59, 130, 246, 0.40)',
        borderRadius: '12px',
        padding: '16px',
        color: 'var(--color-primary-blue)',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: transitions.fast,
        minHeight: '56px',
        touchAction: 'manipulation' as const,
        WebkitTapHighlightColor: 'transparent'
    }

    return (
        <div style={menuStyles.overlay}>
            {/* 遮罩层 */}
            <div onClick={onClose} style={menuStyles.backdrop} />

            {/* 侧边栏菜单 */}
            <div style={menuStyles.menu}>
                {/* 导航菜单 */}
                <nav style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: mobileMenu.navigationGap
                }}>
                    {NAVIGATION_MENU.map((item) => {
                        const isActive = isActiveRoute(pathname, item.href, isClient)

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={onClose}
                                style={getMobileNavLinkStyles(isActive)}
                            >
                                {t(item.translationKey)}
                            </Link>
                        )
                    })}
                </nav>

                {/* 功能按钮区域 */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: mobileMenu.buttonGap,
                    marginTop: 'auto'
                }}>
                    {/* 语言切换按钮 */}
                    <button onClick={onLanguageToggle} style={buttonStyles}>
                        <Icon name="globe" size="sm" />
                        {isClient ? (language === 'zh' ? t('language.english') : t('language.chinese')) : t('language.chinese')}
                    </button>

                    {/* 主题切换按钮 */}
                    <button onClick={onThemeToggle} style={buttonStyles}>
                        <Icon name={isClient ? (theme === 'dark' ? 'theme-toggle-light' : 'theme-toggle-dark') : 'theme-toggle-light'} size="sm" />
                        {isClient ? (theme === 'dark' ? t('theme.light') : t('theme.dark')) : t('theme.light')}
                    </button>

                    {/* 登录按钮 */}
                    <GradientButton
                        size="lg"
                        fullWidth
                        onClick={onLogin}
                        style={{
                            minHeight: '56px',
                            fontSize: '16px',
                            fontWeight: '600',
                            touchAction: 'manipulation',
                            WebkitTapHighlightColor: 'transparent'
                        }}
                    >
                        {t('buttons.login')}
                    </GradientButton>

                    {/* 注册按钮 */}
                    <button onClick={onRegister} style={registerButtonStyles}>
                        {t('buttons.register')}
                    </button>
                </div>
            </div>
        </div>
    )
} 