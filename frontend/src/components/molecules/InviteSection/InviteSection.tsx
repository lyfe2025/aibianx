'use client'

import React, { useState } from 'react'
import { Icon, GradientButton } from '@/components/ui'
import styles from './InviteSection.module.css'

interface InviteSectionProps {
    inviteCode?: string
    invitedCount?: number
    pendingCount?: number
    totalReward?: string
    className?: string
}

export const InviteSection: React.FC<InviteSectionProps> = ({
    inviteCode = 'AI7859',
    invitedCount = 18,
    pendingCount = 5,
    totalReward = '¥1,235',
    className = ''
}) => {
    const [copied, setCopied] = useState(false)

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(inviteCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('复制失败:', err)
        }
    }

    const handleCopyLink = () => {
        const inviteLink = `${window.location.origin}/register?invite=${inviteCode}`
        navigator.clipboard.writeText(inviteLink)
    }

    const handleGeneratePoster = () => {
        // 生成邀请海报的逻辑
        console.log('生成邀请海报')
    }

    return (
        <div className={`${styles.inviteSection} ${className}`}>
            {/* 邀请奖励卡片 */}
            <div className={styles.inviteCard}>
                <div className={styles.inviteCardHeader}>
                    <div className={styles.inviteInfo}>
                        <h3 className={styles.inviteTitle}>邀请好友 双重奖励</h3>
                        <p className={styles.inviteDescription}>
                            邀请好友注册并开通会员，你和好友都将获得额外会员时长奖励
                        </p>
                    </div>

                    <div className="invite-actions">
                        <button className="action-button">
                            <Icon name="guide-icon" size="xs" />
                            <span>邀请攻略</span>
                        </button>
                        <button className="action-button">
                            <Icon name="history-icon" size="xs" />
                            <span>提现记录</span>
                        </button>
                    </div>
                </div>

                <div className="invite-stats">
                    {/* 邀请码 */}
                    <div className="invite-code-section">
                        <div className="invite-code-container">
                            <div className="invite-code-icon">
                                <Icon name="qr-code" size="lg" />
                            </div>
                            <div className="invite-code-info">
                                <p className="invite-code-label">您的专属邀请码</p>
                                <div className="invite-code-display">
                                    <span className="invite-code-text">{inviteCode}</span>
                                    <button
                                        className="copy-button"
                                        onClick={handleCopyCode}
                                        disabled={copied}
                                    >
                                        <Icon name="copy-icon" size="xs" />
                                        <span>{copied ? '已复制' : '复制'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 统计数据 */}
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <Icon name="users-icon" size="md" />
                            </div>
                            <p className="stat-label">已邀请人数</p>
                            <div className="stat-value">{invitedCount}</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <Icon name="pending-icon" size="md" />
                            </div>
                            <p className="stat-label">待激活人数</p>
                            <div className="stat-value">{pendingCount}</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <Icon name="reward-icon" size="md" />
                            </div>
                            <p className="stat-label">累计返佣金额</p>
                            <div className="stat-value">{totalReward}</div>
                        </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="invite-buttons">
                        <button className="secondary-button" onClick={handleCopyLink}>
                            <Icon name="link-icon" size="sm" />
                            <span>复制邀请链接</span>
                        </button>
                        <GradientButton
                            variant="primary"
                            size="md"
                            onClick={handleGeneratePoster}
                        >
                            <Icon name="image-icon" size="sm" />
                            <span>生成邀请海报</span>
                        </GradientButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InviteSection 