'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon, Avatar } from '@/components/ui'
import styles from './UserSidebar.module.css'

interface UserSidebarProps {
    className?: string
}

export const UserSidebar: React.FC<UserSidebarProps> = ({ className = '' }) => {
    const pathname = usePathname()

    const navigationItems = [
        {
            href: '/',
            label: '首页',
            icon: 'nav-indicator'
        },
        {
            href: '/profile',
            label: '个人中心',
            icon: 'user-icon'
        },
        {
            href: '/profile/bookmarks',
            label: '我的收藏',
            icon: 'collect-icon-detail'
        },
        {
            href: '/profile/subscription',
            label: '我的订阅',
            icon: 'rocket-icon'
        }
    ]

    const settingsItems = [
        {
            href: '/profile/settings',
            label: '设置',
            icon: 'adjustment-icon'
        },
        {
            href: '/logout',
            label: '退出',
            icon: 'logout-icon'
        }
    ]

    const isActiveRoute = (href: string) => {
        if (href === '/profile') {
            return pathname === '/profile'
        }
        return pathname?.startsWith(href)
    }

    return (
        <div className={`${styles.userSidebar} ${className}`}>
            {/* 用户信息区域 */}
            <div className={styles.userProfile}>
                <div className={styles.userAvatar}>
                    <Avatar
                        src="/images/avatars/author-li-mingyang.jpeg"
                        alt="张智创"
                        size="lg"
                        className={styles.avatarImage}
                    />
                </div>
                <h3 className={styles.userName}>张智创</h3>
                <div className={styles.memberBadge}>
                    <span className={styles.memberText}>高级会员</span>
                </div>
                <p className={styles.memberExpiry}>会员有效期：还剩 245 天</p>
            </div>

            {/* 主导航菜单 */}
            <nav className={styles.mainNavigation}>
                {navigationItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActiveRoute(item.href) ? styles.navItemActive : ''}`}
                    >
                        <Icon name={item.icon} size="sm" className={styles.navIcon} />
                        <span className={styles.navLabel}>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* 分割线 */}
            <div className={styles.navDivider}></div>

            {/* 设置菜单 */}
            <nav className={styles.settingsNavigation}>
                {settingsItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActiveRoute(item.href) ? styles.navItemActive : ''}`}
                    >
                        <Icon name={item.icon} size="sm" className={styles.navIcon} />
                        <span className={styles.navLabel}>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default UserSidebar 