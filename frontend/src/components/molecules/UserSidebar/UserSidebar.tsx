'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Icon, Avatar, CrownIcon } from '@/components/ui'
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
 * 4. 精确路由高亮 - 只有当前页面的菜单项高亮显示，避免多选
 * 5. SSR兼容 - 解决服务端渲染水合错误
 * 6. 会员标识 - 高级会员用户显示皇冠图标
 * 
 * 🎯 导航路径：
 * - 首页: / (直接跳转)
 * - 个人中心: /profile
 * - 我的收藏: /profile/bookmarks
 * - 我的订阅: /profile/subscription
 * - 设置: /profile/settings
 * - 退出: 执行logout()并跳转到首页
 * 
 * 🔧 路径匹配逻辑：
 * - 精确匹配：首页和个人中心必须完全匹配路径
 * - 前缀匹配：子页面使用startsWith，但排除父级路径
 * - 优先级：子路径优先于父路径匹配
 * - SSR兼容：服务端期间始终返回非激活状态，客户端水合后正常显示
 * 
 * 🎨 头像设计：
 * - 84x84像素圆形头像，渐变边框效果
 * - 高级会员显示右上角皇冠图标
 * - 用户名18px字体，会员标签12px
 * - 会员有效期提示，温馨的倒计时显示
 * 
 * 🎨 图标资源：
 * - 使用从设计稿下载的本地SVG图标
 * - 确保图标风格与设计稿完全一致
 */
export const UserSidebar: React.FC<UserSidebarProps> = ({ className = '' }) => {
    const pathname = usePathname()
    const router = useRouter()
    const { logout } = useUserStore()

    // SSR兼容：确保服务端和客户端初始状态一致
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const navigationItems = [
        {
            href: '/profile',
            label: '个人中心',
            icon: 'profile-sidebar-center'
        },
        {
            href: '/profile/bookmarks',
            label: '我的收藏',
            icon: 'profile-sidebar-bookmark'
        },
        {
            href: '/profile/subscription',
            label: '我的订阅',
            icon: 'profile-sidebar-subscription'
        }
    ]

    const settingsItems = [
        {
            href: '/profile/settings',
            label: '设置',
            icon: 'profile-sidebar-settings'
        }
    ]

    /**
     * 精确的路由匹配函数 - 完整SSR兼容版本
     * 解决多个菜单项同时高亮的问题和SSR水合错误
     */
    const isActiveRoute = (href: string) => {
        // SSR期间返回false，避免水合错误
        if (!isClient) {
            return false
        }

        // 首页：必须完全匹配 "/"
        if (href === '/') {
            return pathname === '/'
        }

        // 个人中心主页：必须完全匹配 "/profile"
        if (href === '/profile') {
            return pathname === '/profile'
        }

        // 子页面：精确匹配，避免父路径干扰
        if (href.startsWith('/profile/')) {
            return pathname === href
        }

        // 其他路径：使用startsWith匹配
        return pathname?.startsWith(href) || false
    }

    // 退出登录处理：清除用户状态并跳转到首页
    const handleLogout = () => {
        logout()
        router.push('/')
    }

    // SSR期间返回带占位符的布局，确保水合兼容性
    if (!isClient) {
        return (
            <div className={`${styles.userSidebar} ${className}`}>
                {/* 用户信息区域 - SSR占位符 */}
                <div className={styles.userProfile}>
                    <div className={styles.userAvatar}>
                        <div className={styles.avatarImage} style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--color-bg-secondary)' }} />
                        {/* 会员皇冠标识占位符 */}
                        <div className={styles.crownBadge}>
                            <div style={{ width: 16, height: 16 }} />
                        </div>
                    </div>
                    <h3 className={styles.userName}>张智创</h3>
                    <div className={styles.memberBadge}>
                        <span className={styles.memberText}>高级会员</span>
                    </div>
                    <p className={styles.memberExpiry}>会员有效期：还剩 245 天</p>
                </div>

                {/* 主导航菜单 - SSR占位符，使用Icon组件的SSR占位符 */}
                <nav className={styles.mainNavigation}>
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={styles.navItem}
                        >
                            <Icon name={item.icon} size="sm" className={styles.navIcon} />
                            <span className={styles.navLabel}>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* 分割线 */}
                <div className={styles.navDivider} />

                {/* 设置菜单 - SSR占位符，使用Icon组件的SSR占位符 */}
                <nav className={styles.settingsNavigation}>
                    {settingsItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={styles.navItem}
                        >
                            <Icon name={item.icon} size="sm" className={styles.navIcon} />
                            <span className={styles.navLabel}>{item.label}</span>
                        </Link>
                    ))}

                    {/* 退出按钮 - SSR占位符，使用Icon组件的SSR占位符 */}
                    <button
                        className={styles.navItem}
                        title="退出登录并返回首页"
                        disabled
                    >
                        <Icon name="profile-sidebar-logout" size="sm" className={styles.navIcon} />
                        <span className={styles.navLabel}>退出</span>
                    </button>
                </nav>
            </div>
        )
    }

    // 客户端渲染：带有路径高亮功能
    return (
        <div className={`${styles.userSidebar} ${className}`}>
            {/* 用户信息区域 */}
            <div className={styles.userProfile}>
                <div className={styles.userAvatar}>
                    <Avatar
                        src="/images/avatars/user-zhang-zhichuang.svg"
                        alt="张智创"
                        size="xxl"
                        className={styles.avatarImage}
                    />
                    {/* 会员皇冠标识 - 高级会员显示 */}
                    <div className={styles.crownBadge}>
                        <Icon
                            name="crown-premium-white"
                            size="sm"
                            preserveColor={true}
                            style={{
                                filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))'
                            }}
                        />
                    </div>
                </div>
                <h3 className={styles.userName}>张智创</h3>
                <div className={styles.memberBadge}>
                    <span className={styles.memberText}>高级会员</span>
                </div>
                <p className={styles.memberExpiry}>会员有效期：还剩 245 天</p>
            </div>

            {/* 主导航菜单 */}
            <nav className={styles.mainNavigation}>
                {navigationItems.map((item) => {
                    const isActive = isActiveRoute(item.href)
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                        >
                            <Icon
                                name={item.icon}
                                size="sm"
                                className={styles.navIcon}
                                style={{ color: 'var(--color-text-muted)' }}
                            />
                            <span className={styles.navLabel}>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* 分割线 */}
            <div className={styles.navDivider} />

            {/* 设置菜单 */}
            <nav className={styles.settingsNavigation}>
                {settingsItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActiveRoute(item.href) ? styles.navItemActive : ''}`}
                    >
                        <Icon name={item.icon} size="sm" className={styles.navIcon} style={{ color: 'var(--color-text-muted)' }} />
                        <span className={styles.navLabel}>{item.label}</span>
                    </Link>
                ))}

                {/* 退出按钮 - 执行登出并跳转到首页 */}
                <button
                    onClick={handleLogout}
                    className={styles.navItem}
                    title="退出登录并返回首页"
                >
                    <Icon name="profile-sidebar-logout" size="sm" className={styles.navIcon} style={{ color: 'var(--color-text-muted)' }} />
                    <span className={styles.navLabel}>退出</span>
                </button>
            </nav>
        </div>
    )
}

export default UserSidebar 