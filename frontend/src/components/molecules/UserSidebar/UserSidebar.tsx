'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Icon, Avatar } from '@/components/ui'
import { useUserStore } from '@/stores'
import styles from './UserSidebar.module.css'

interface UserSidebarProps {
    className?: string
}

/**
 * 个人中心侧边栏导航组件 - UserSidebar
 * 
 * ✅ 功能特性：
 * 1. 首页跳转 - 点击"首页"直接跳转到主页 (/)
 * 2. 退出登录 - 点击"退出"注销并跳转到首页
 * 3. 页面导航 - 个人中心各子页面间的跳转
 * 4. 路由高亮 - 当前页面的菜单项自动高亮显示
 * 
 * 🎯 导航路径：
 * - 首页: / (直接跳转)
 * - 个人中心: /profile
 * - 我的收藏: /profile/bookmarks
 * - 我的订阅: /profile/subscription
 * - 设置: /profile/settings
 * - 退出: 执行logout()并跳转到首页
 */
export const UserSidebar: React.FC<UserSidebarProps> = ({ className = '' }) => {
    const pathname = usePathname()
    const router = useRouter()
    const { logout } = useUserStore()

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
            icon: 'adjust-icon-detail'
        }
    ]

    const isActiveRoute = (href: string) => {
        if (href === '/profile') {
            return pathname === '/profile'
        }
        return pathname?.startsWith(href)
    }

    // 退出登录处理：清除用户状态并跳转到首页
    const handleLogout = () => {
        logout()
        router.push('/')
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

                {/* 退出按钮 - 执行登出并跳转到首页 */}
                <button
                    onClick={handleLogout}
                    className={styles.navItem}
                    title="退出登录并返回首页"
                >
                    <Icon name="arrow-left" size="sm" className={styles.navIcon} />
                    <span className={styles.navLabel}>退出</span>
                </button>
            </nav>
        </div>
    )
}

export default UserSidebar 