'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib'
import { isActiveRoute, getNavLinkStyles, getActiveIndicatorStyles } from '@/lib/headerUtils'
import { NAVIGATION_MENU, HEADER_STYLES } from '@/constants/headerConfig'

interface DesktopNavigationProps {
    pathname: string
    isClient: boolean
}

/**
 * DesktopNavigation 组件
 * 
 * 桌面端导航菜单，包含活动状态指示器
 */
export function DesktopNavigation({ pathname, isClient }: DesktopNavigationProps) {
    const { t } = useTranslation()
    const { transitions, navigation } = HEADER_STYLES

    return (
        <nav className="desktop-nav" style={{
            display: 'none',
            alignItems: 'center',
            gap: navigation.gap.desktop
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: navigation.gap.desktop
            }}>
                {NAVIGATION_MENU.map((item) => {
                    const isActive = isActiveRoute(pathname, item.href, isClient)

                    return (
                        <div
                            key={item.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                position: 'relative'
                            }}
                        >
                            <Link
                                href={item.href}
                                style={getNavLinkStyles(isActive, transitions.normal)}
                                className="nav-link"
                            >
                                {t(item.translationKey)}
                            </Link>
                            {isActive && (
                                <div
                                    style={getActiveIndicatorStyles(
                                        navigation.activeIndicator.width,
                                        navigation.activeIndicator.height,
                                        navigation.activeIndicator.gradient,
                                        navigation.activeIndicator.borderRadius,
                                        transitions.normal
                                    )}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </nav>
    )
} 