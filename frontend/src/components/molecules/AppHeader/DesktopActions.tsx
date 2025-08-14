'use client'

import { Icon } from '@/components/ui'
import { UserProfileDropdown } from '@/components/molecules'
import { useTranslation } from '@/lib'
import { getIconButtonStyles } from '@/lib/headerUtils'
import { HEADER_STYLES } from '@/constants/headerConfig'
import { useSession } from 'next-auth/react'

interface DesktopActionsProps {
    theme: string
    language: string
    isClient: boolean
    onLanguageToggle: () => void
    onThemeToggle: () => void
    onLogin: () => void
}

/**
 * DesktopActions 组件
 * 
 * 桌面端功能按钮组：语言切换、主题切换、登录
 * SSR兼容：确保服务端和客户端渲染一致
 */
export function DesktopActions({
    theme,
    language,
    isClient,
    onLanguageToggle,
    onThemeToggle,
    onLogin
}: DesktopActionsProps) {
    const { t } = useTranslation()
    const { data: session, status } = useSession()
    const { buttons, transitions } = HEADER_STYLES

    const iconButtonStyles = getIconButtonStyles(
        buttons.icon.size,
        buttons.icon.borderRadius,
        buttons.icon.padding
    )

    const loginButtonStyles = {
        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
        borderRadius: buttons.login.borderRadius,
        padding: buttons.login.padding,
        border: 'none',
        color: 'var(--color-text-primary)',
        fontSize: buttons.login.fontSize,
        fontWeight: '500',
        lineHeight: '20px',
        cursor: 'pointer',
        marginLeft: '16px',
        height: buttons.login.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap' as const,
        transition: transitions.normal,
        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
        flexShrink: 0
    }

    return (
        <div className="desktop-auth-buttons" style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px'
        }}>
            {/* 语言切换按钮 */}
            <button
                onClick={onLanguageToggle}
                style={{
                    ...iconButtonStyles,
                    marginLeft: '32px'
                }}
                className="icon-button"
                title={isClient ? (language === 'zh' ? `${t('language.switchTo')} English` : `${t('language.switchTo')}${t('language.chinese')}`) : t('language.switchTo')}
            >
                <Icon name="globe" size="sm" />
            </button>

            {/* 主题切换按钮 */}
            <button
                onClick={onThemeToggle}
                style={{
                    ...iconButtonStyles,
                    marginLeft: '8px'
                }}
                className="icon-button"
                title={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
            >
                <Icon
                    name={isClient ? (theme === 'dark' ? 'theme-toggle-light' : 'theme-toggle-dark') : 'theme-toggle-light'}
                    size="sm"
                />
            </button>

            {/* 登录状态相关 UI */}
            {isClient && status !== 'loading' && (
                session ? (
                    /* 已登录：显示用户头像下拉菜单 */
                    <UserProfileDropdown />
                ) : (
                    /* 未登录：显示登录按钮 */
                    <button
                        onClick={onLogin}
                        style={loginButtonStyles}
                        className="btn btn--gradient"
                    >
                        {t('buttons.login')}
                    </button>
                )
            )}
            
            {/* 加载状态占位符 */}
            {(status === 'loading' || !isClient) && (
                <div style={{
                    width: '72px',
                    height: '36px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: buttons.login.borderRadius,
                    marginLeft: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-xs)'
                }}>
                    ...
                </div>
            )}
        </div>
    )
} 