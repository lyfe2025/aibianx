'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GradientButton } from '@/components/ui'

/**
 * 移动端简化会员状态组件 - SimpleMembershipStatus
 * 
 * 专为移动端设计的简洁会员状态展示
 * 不复杂的付费墙，只显示状态和引导升级
 * 
 * 设计目标：
 * - 清晰显示用户会员状态
 * - 简洁的升级引导
 * - 跳转到现有membership页面
 * - 移动端友好的小巧设计
 */

interface MembershipStatus {
    isMember: boolean
    freeArticlesRead: number
    freeArticlesLimit: number
    membershipType?: string
}

interface SimpleMembershipStatusProps {
    className?: string
}

export function SimpleMembershipStatus({ className = '' }: SimpleMembershipStatusProps) {
    // 模拟用户状态 - 后续集成真实API
    const [userStatus] = useState<MembershipStatus>({
        isMember: false,
        freeArticlesRead: 3,
        freeArticlesLimit: 5,
        membershipType: undefined
    })

    const remainingArticles = userStatus.freeArticlesLimit - userStatus.freeArticlesRead

    return (
        <div className={`simple-membership-status ${className}`}>
            {userStatus.isMember ? (
                // 会员用户状态
                <div className="member-status">
                    <div className="status-info">
                        <span className="status-badge member">
                            ✨ 会员用户
                        </span>
                        <span className="status-text">
                            无限制阅读所有内容
                        </span>
                    </div>
                </div>
            ) : (
                // 免费用户状态
                <div className="free-user-status">
                    <div className="status-info">
                        <span className="status-badge free">
                            👤 免费用户
                        </span>
                        <span className="status-text">
                            今日可阅读 {remainingArticles}/{userStatus.freeArticlesLimit} 篇
                        </span>
                    </div>
                    
                    <Link href="/membership" className="upgrade-link">
                        <GradientButton size="sm" className="upgrade-btn">
                            升级解锁
                        </GradientButton>
                    </Link>
                </div>
            )}

            {/* 移动端专用样式 */}
            <style jsx>{`
                .simple-membership-status {
                    width: 100%;
                    background: var(--color-bg-glass);
                    border: 1px solid var(--color-border-glass);
                    border-radius: 12px;
                    padding: 16px;
                    backdrop-filter: blur(12px);
                    margin-bottom: 20px;
                }

                .member-status,
                .free-user-status {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }

                .status-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    flex: 1;
                }

                .status-badge {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    padding: 4px 8px;
                    border-radius: 6px;
                    line-height: 1.2;
                    display: inline-block;
                    width: fit-content;
                }

                .status-badge.member {
                    background: linear-gradient(135deg, 
                        var(--color-primary-blue) 0%, 
                        var(--color-primary-purple) 100%);
                    color: white;
                }

                .status-badge.free {
                    background: rgba(156, 163, 175, 0.2);
                    color: var(--color-text-secondary);
                    border: 1px solid rgba(156, 163, 175, 0.3);
                }

                .status-text {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-secondary);
                    line-height: 1.3;
                }

                .upgrade-link {
                    text-decoration: none;
                    flex-shrink: 0;
                }

                .upgrade-btn {
                    font-size: var(--font-size-xs) !important;
                    padding: 8px 16px !important;
                    white-space: nowrap;
                }

                /* 移动端优化 */
                @media (max-width: 768px) {
                    .simple-membership-status {
                        padding: 14px;
                    }

                    .member-status,
                    .free-user-status {
                        gap: 10px;
                    }

                    .status-badge {
                        font-size: var(--font-size-xs);
                        padding: 3px 6px;
                    }

                    .status-text {
                        font-size: 11px;
                    }

                    .upgrade-btn {
                        font-size: 11px !important;
                        padding: 6px 12px !important;
                    }
                }

                /* 超小屏幕优化 */
                @media (max-width: 480px) {
                    .free-user-status {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 12px;
                    }

                    .upgrade-link {
                        align-self: center;
                    }
                }

                /* 触控设备优化 */
                @media (hover: none) and (pointer: coarse) {
                    .upgrade-link:active {
                        transform: scale(0.98);
                    }
                }

                /* 高分辨率显示优化 */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .status-badge,
                    .status-text {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            `}</style>
        </div>
    )
}