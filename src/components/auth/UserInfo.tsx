/**
 * 用户信息显示组件
 * 显示当前登录用户的基本信息
 */

'use client'

import { useSession } from 'next-auth/react'
import { Avatar, Icon } from '@/components/ui'
import { SignOutButton } from './SignOutButton'

interface UserInfoProps {
    showSignOut?: boolean
    className?: string
}

export function UserInfo({ showSignOut = true, className }: UserInfoProps) {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return (
            <div className={className} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-3)',
                padding: 'var(--spacing-3)'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-bg-muted)',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }} />
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-1)'
                }}>
                    <div style={{
                        height: '16px',
                        backgroundColor: 'var(--color-bg-muted)',
                        borderRadius: '4px',
                        width: '120px'
                    }} />
                    <div style={{
                        height: '14px',
                        backgroundColor: 'var(--color-bg-muted)',
                        borderRadius: '4px',
                        width: '80px'
                    }} />
                </div>
            </div>
        )
    }

    if (!session?.user) {
        return null
    }

    const user = session.user
    const strapiUser = session.strapiUser

    return (
        <div className={className} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3)',
            padding: 'var(--spacing-3)',
            backgroundColor: 'var(--color-bg-glass)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-glass)'
        }}>
            {/* 用户头像 */}
            <Avatar
                src={user.image || strapiUser?.avatar}
                alt={user.name || strapiUser?.name || '用户头像'}
                size="md"
                fallback={
                    <Icon name="profile-sidebar-center" size="sm" />
                }
            />

            {/* 用户信息 */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-1)'
            }}>
                <div style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    lineHeight: '1.4'
                }}>
                    {user.name || strapiUser?.name || strapiUser?.username || '用户'}
                </div>
                <div style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.4'
                }}>
                    {user.email}
                </div>
                {strapiUser?.membershipLevel && (
                    <div style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-primary-blue)',
                        fontWeight: '500',
                        lineHeight: '1.4'
                    }}>
                        {strapiUser.membershipLevel === 'premium' ? '高级会员' : '普通会员'}
                    </div>
                )}
            </div>

            {/* 登出按钮 */}
            {showSignOut && (
                <SignOutButton variant="outline">
                    退出
                </SignOutButton>
            )}
        </div>
    )
}