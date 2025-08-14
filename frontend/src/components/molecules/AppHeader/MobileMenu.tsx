'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon, GradientButton, Avatar } from '@/components/ui'
import { useTranslation } from '@/lib'
import { isActiveRoute, getMobileMenuStyles, getMobileNavLinkStyles } from '@/lib/headerUtils'
import { NAVIGATION_MENU, HEADER_STYLES } from '@/constants/headerConfig'
import { useSession, signOut } from 'next-auth/react'

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
    const { data: session, status } = useSession()
    const router = useRouter()
    const { mobileMenu, transitions } = HEADER_STYLES

    // 处理个人中心跳转
    const handleProfileClick = () => {
        onClose()
        router.push('/profile')
    }

    // 处理退出登录
    const handleLogout = async () => {
        onClose()
        await signOut({ callbackUrl: '/' })
    }

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

                    {/* 登录状态相关按钮 */}
                    {isClient && status !== 'loading' && (
                        session ? (
                            /* 已登录：显示用户信息和相关操作 */
                            <>
                                {/* 用户信息卡片 */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <Avatar 
                                        src={session.user?.image} 
                                        alt={session.user?.name || '用户'}
                                        size="md"
                                        fallback={session.user?.name?.charAt(0).toUpperCase() || 'U'}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            color: 'var(--color-text-primary)',
                                            marginBottom: '4px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {session.user?.name || session.user?.email?.split('@')[0] || '用户'}
                                        </div>
                                        <div style={{
                                            fontSize: '14px',
                                            color: 'var(--color-text-muted)',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {session.user?.email || ''}
                                        </div>
                                    </div>
                                </div>

                                {/* 个人中心按钮 */}
                                <button onClick={handleProfileClick} style={{
                                    ...buttonStyles,
                                    background: 'var(--color-bg-glass)',
                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                    color: 'var(--color-primary-blue)'
                                }}>
                                    <Icon name="user-icon" size="sm" />
                                    个人中心
                                </button>

                                {/* 退出登录按钮 */}
                                <button onClick={handleLogout} style={{
                                    ...buttonStyles,
                                    background: 'var(--color-bg-glass)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: 'var(--color-error)'
                                }}>
                                    <Icon
                                        name="profile-sidebar-logout"
                                        size="sm"
                                        style={{
                                            color: 'var(--color-primary-blue)',
                                            filter:
                                                'brightness(0) saturate(100%) invert(44%) sepia(78%) saturate(2601%) hue-rotate(214deg) brightness(97%) contrast(94%)'
                                        }}
                                    />
                                    退出登录
                                </button>
                            </>
                        ) : (
                            /* 未登录：显示登录/注册按钮 */
                            <>
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
                            </>
                        )
                    )}

                    {/* 加载状态占位符 */}
                    {(status === 'loading' || !isClient) && (
                        <div style={{
                            ...buttonStyles,
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            justifyContent: 'center',
                            color: 'var(--color-text-muted)',
                            fontSize: '14px'
                        }}>
                            加载中...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 