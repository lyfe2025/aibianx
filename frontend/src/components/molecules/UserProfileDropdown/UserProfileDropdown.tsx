'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Icon, Avatar } from '@/components/ui'
import { getIconButtonStyles } from '@/lib/headerUtils'
import { HEADER_STYLES } from '@/constants/headerConfig'

interface UserProfileDropdownProps {
    className?: string
}

/**
 * UserProfileDropdown 组件
 * 
 * 用户头像下拉菜单组件
 * - 显示用户头像
 * - 点击展开下拉菜单
 * - 包含个人中心、退出登录等选项
 * - 符合前台毛玻璃风格
 */
export function UserProfileDropdown({ className = '' }: UserProfileDropdownProps) {
    const { data: session } = useSession()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleProfileClick = () => {
        setIsOpen(false)
        router.push('/profile')
    }

    const handleLogout = async () => {
        setIsOpen(false)
        await signOut({ callbackUrl: '/' })
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    if (!session?.user) {
        return null
    }

    const user = session.user
    const userName = user.name || user.email?.split('@')[0] || '用户'
    const userEmail = user.email || ''
    
    // 与头部其它图标按钮保持一致的外观
    const { buttons } = HEADER_STYLES
    const iconButtonStyles = getIconButtonStyles(
        buttons.icon.size,
        buttons.icon.borderRadius,
        buttons.icon.padding
    )

    return (
        <div 
            className={`user-profile-dropdown ${className}`} 
            ref={dropdownRef} 
            style={{ 
                position: 'relative',
                zIndex: 1000  // 确保容器也有足够高的z-index
            }}
        >
            {/* 用户头像按钮 */}
            <button
                onClick={toggleDropdown}
                style={{
                    ...iconButtonStyles,
                    position: 'relative',
                    overflow: 'hidden'
                }}
                className="avatar-button"
                title={`${userName} - 点击查看菜单`}
            >
                <Avatar 
                    src={user.image ?? undefined} 
                    alt={userName}
                    size="sm"
                    fallback={userName.charAt(0).toUpperCase()}
                />
            </button>

            {/* 下拉菜单 */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    marginTop: '8px',
                    width: '280px',
                    // 自适应亮暗主题的毛玻璃卡片
                    background: 'var(--color-bg-glass)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid var(--color-border-primary)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-card)',
                    zIndex: 9999,
                    overflow: 'hidden',
                    animation: 'fadeInDown 0.3s ease-out'
                }}>
                    {/* 用户信息头部 */}
                    <div style={{
                        padding: 'var(--spacing-4)',
                        borderBottom: '1px solid var(--color-border-primary)',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10) 0%, rgba(139, 92, 246, 0.10) 100%)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)'
                        }}>
                            <Avatar 
                                src={user.image ?? undefined} 
                                alt={userName}
                                size="lg"
                                fallback={userName.charAt(0).toUpperCase()}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontSize: 'var(--font-size-base)',
                                    fontWeight: '600',
                                    color: 'var(--color-text-primary)',
                                    marginBottom: 'var(--spacing-1)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {userName}
                                </div>
                                <div style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-muted)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {userEmail}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 菜单选项 */}
                    <div style={{ padding: 'var(--spacing-2)' }}>
                        {/* 个人中心 */}
                        <button
                            onClick={handleProfileClick}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-3)',
                                background: 'transparent',
                                border: '1px solid transparent',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-3)',
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-primary)',
                                transition: 'all 0.2s ease',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--color-hover-primary)'
                                e.currentTarget.style.borderColor = 'var(--color-border-primary)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'none'
                                e.currentTarget.style.borderColor = 'transparent'
                            }}
                        >
                            <Icon name="user-icon" size="sm" style={{ color: 'var(--color-primary-blue)' }} />
                            <div>
                                <div style={{ fontWeight: '500' }}>个人中心</div>
                                <div style={{ 
                                    fontSize: 'var(--font-size-xs)', 
                                    color: 'var(--color-text-muted)',
                                    marginTop: '2px'
                                }}>
                                    查看和编辑个人信息
                                </div>
                            </div>
                        </button>

                        {/* 分隔线 */}
                        <div style={{
                            height: '1px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            margin: 'var(--spacing-2) 0'
                        }} />

                        {/* 退出登录 */}
                        <button
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                padding: 'var(--spacing-3)',
                                background: 'transparent',
                                border: '1px solid transparent',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-3)',
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-error)',
                                transition: 'all 0.2s ease',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--color-hover-primary)'
                                e.currentTarget.style.borderColor = 'var(--color-border-primary)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'none'
                                e.currentTarget.style.borderColor = 'transparent'
                            }}
                        >
                            <Icon
                                name="profile-sidebar-logout"
                                size="sm"
                                style={{
                                    color: 'var(--color-primary-blue)',
                                    filter:
                                        'brightness(0) saturate(100%) invert(44%) sepia(78%) saturate(2601%) hue-rotate(214deg) brightness(97%) contrast(94%)'
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: '500' }}>退出登录</div>
                                <div style={{ 
                                    fontSize: 'var(--font-size-xs)', 
                                    color: 'var(--color-text-muted)',
                                    marginTop: '2px'
                                }}>
                                    安全退出当前账户
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* 内联样式动画 */}
            <style jsx global>{`
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .user-profile-dropdown .avatar-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                }

                .user-profile-dropdown .avatar-button:active {
                    transform: scale(0.95);
                }
                
                /* 确保下拉菜单可见 */
                .user-profile-dropdown {
                    position: relative !important;
                    z-index: 1000 !important;
                }
            `}</style>
        </div>
    )
}
