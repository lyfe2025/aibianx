'use client'

import React from 'react'
import { GradientButton } from '@/components/ui'

export interface InviteRewardSectionProps {
    className?: string
}

export const InviteRewardSection: React.FC<InviteRewardSectionProps> = ({
    className = ''
}) => {
    return (
        <div className={`invite-reward-section ${className}`}>
            {/* 邀请好友双重奖励卡片 */}
            <div className="invite-reward-header">
                <h2>邀请好友 双重奖励</h2>
                <div className="header-buttons">
                    <div className="invite-guide-btn">
                        <img src="/icons/subscription/invite-guide.svg" alt="" />
                        <span>邀请攻略</span>
                    </div>
                    <div className="withdraw-record-btn">
                        <img src="/icons/subscription/withdraw-record.svg" alt="" />
                        <span>提现记录</span>
                    </div>
                </div>
            </div>

            <div className="invite-description">
                <p>邀请好友注册并开通会员，你和好友都将获得额外会员时长+返现奖励</p>
            </div>

            <div className="invite-stats">
                <div className="stats-left">
                    {/* 邀请码区块 */}
                    <div className="invite-code-section">
                        <div className="invite-code-icon">
                            <img src="/icons/subscription/invite-code.svg" alt="" />
                        </div>
                        <div className="invite-code-content">
                            <div className="code-label">您的专属邀请码</div>
                            <div className="code-display">
                                <span className="code-value">AI7859</span>
                                <div className="copy-action">
                                    <img src="/icons/subscription/copy-icon.svg" alt="" />
                                    <span>复制</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 统计数据 */}
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <img src="/icons/subscription/invited-users.svg" alt="" />
                            </div>
                            <div className="stat-label">已邀请人数</div>
                            <div className="stat-value">18</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <img src="/icons/subscription/pending-users.svg" alt="" />
                            </div>
                            <div className="stat-label">待激活人数</div>
                            <div className="stat-value">5</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <img src="/icons/subscription/commission-amount.svg" alt="" />
                            </div>
                            <div className="stat-label">累计返佣金额</div>
                            <div className="stat-value">¥1,235</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <div className="copy-invite-btn">
                    <img src="/icons/subscription/copy-invite-link.svg" alt="" />
                    <span>复制邀请链接</span>
                </div>
                <GradientButton variant="primary" size="md">
                    <img
                        src="/icons/subscription/generate-poster.svg"
                        alt=""
                        className="poster-icon"
                    />
                    生成邀请海报
                </GradientButton>
            </div>

            <style jsx>{`
        .invite-reward-section {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.20) 0%, rgba(168, 85, 247, 0.20) 100%);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 12px;
          padding: 25px;
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .invite-reward-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .invite-reward-header h2 {
          color: var(--color-text-primary);
          font-size: var(--font-size-2xl);
          line-height: 28px;
          font-weight: 400;
          margin: 0;
        }

        .header-buttons {
          display: flex;
          gap: 12px;
        }

        .invite-guide-btn,
        .withdraw-record-btn {
          background: rgba(255, 255, 255, 0.10);
          border-radius: 8px;
          padding: 8px 16px;
          display: flex;
          gap: 8px;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .invite-guide-btn:hover,
        .withdraw-record-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .invite-guide-btn img,
        .withdraw-record-btn img {
          width: 16px;
          height: 16px;
        }

        .invite-guide-btn span,
        .withdraw-record-btn span {
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
          line-height: 20px;
          text-align: center;
        }

        .invite-description {
          margin-top: -8px;
        }

        .invite-description p {
          color: var(--color-text-secondary);
          font-size: var(--font-size-lg);
          line-height: 24px;
          margin: 0;
          width: 482px;
        }

        .invite-stats {
          display: flex;
          justify-content: space-between;
          margin-top: -8px;
        }

        .stats-left {
          display: flex;
          gap: 25px;
        }

        .invite-code-section {
          border-right: 1px solid rgba(255, 255, 255, 0.10);
          padding-right: 25px;
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .invite-code-icon {
          background: rgba(255, 255, 255, 0.10);
          border-radius: 8px;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        .invite-code-icon img {
          width: 32px;
          height: 32px;
        }

        .invite-code-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .code-label {
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
          line-height: 20px;
        }

        .code-display {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 156px;
        }

        .code-value {
          color: var(--color-text-primary);
          font-size: var(--font-size-2xl);
          line-height: 28px;
          font-weight: 400;
        }

        .copy-action {
          display: flex;
          gap: 4px;
          align-items: center;
          cursor: pointer;
          padding: 4px;
        }

        .copy-action img {
          width: 14px;
          height: 14px;
        }

        .copy-action span {
          color: #60A5FA;
          font-size: var(--font-size-base);
          line-height: 20px;
        }

        .copy-action:hover span {
          text-decoration: underline;
        }

        .stats-grid {
          display: flex;
          gap: 36px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 69px;
        }

        .stat-icon {
          background: rgba(255, 255, 255, 0.10);
          border-radius: 8px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        .stat-icon img {
          width: 24px;
          height: 24px;
        }

        .stat-label {
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
          line-height: 20px;
          text-align: center;
          margin-top: 4px;
        }

        .stat-value {
          color: var(--color-text-primary);
          font-size: var(--font-size-2xl);
          line-height: 28px;
          font-weight: 400;
          text-align: center;
        }

        .action-buttons {
          display: flex;
          gap: 16px;
          margin-left: 365px;
        }

        .copy-invite-btn {
          background: rgba(255, 255, 255, 0.10);
          border-radius: 8px;
          padding: 12px 24px;
          display: flex;
          gap: 8px;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-invite-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .copy-invite-btn img {
          width: 20px;
          height: 20px;
        }

        .copy-invite-btn span {
          color: var(--color-text-primary);
          font-size: var(--font-size-lg);
          line-height: 24px;
        }

        .poster-icon {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
      `}</style>
        </div>
    )
} 