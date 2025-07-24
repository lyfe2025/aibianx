'use client'

import React from 'react'

export interface InviteRulesSectionProps {
    className?: string
}

export const InviteRulesSection: React.FC<InviteRulesSectionProps> = ({
    className = ''
}) => {
    return (
        <div className={`invite-rules-section ${className}`}>
            <div className="rules-container">
                <div className="rules-header">
                    <h2>邀请奖励规则</h2>
                </div>

                {/* 奖励类型卡片 */}
                <div className="rewards-grid">
                    {/* 会员时长奖励 */}
                    <div className="reward-card">
                        <div className="reward-header">
                            <div className="reward-icon membership">
                                <img src="/icons/subscription/membership-reward.svg" alt="" />
                            </div>
                            <h3>会员时长奖励</h3>
                        </div>
                        <div className="reward-content">
                            <p>每成功邀请1位好友开通会员，您将获得15天会员时长奖励，无限叠加。</p>
                        </div>
                    </div>

                    {/* 现金返佣奖励 */}
                    <div className="reward-card">
                        <div className="reward-header">
                            <div className="reward-icon cash">
                                <img src="/icons/subscription/cash-reward.svg" alt="" />
                            </div>
                            <h3>现金返佣奖励</h3>
                        </div>
                        <div className="reward-content">
                            <p>每成功邀请1位好友开通会员，您将获得50元现金奖励，可随时提现。</p>
                        </div>
                    </div>
                </div>

                {/* 发放规则 */}
                <div className="distribution-rules">
                    <div className="rules-header-section">
                        <div className="rules-icon">
                            <img src="/icons/subscription/reward-rules.svg" alt="" />
                        </div>
                        <h3>奖励发放规则</h3>
                    </div>
                    <div className="rules-content">
                        <div className="rule-item">
                            <div className="rule-number">1</div>
                            <p>好友必须通过您的邀请链接或邀请码注册并开通会员。</p>
                        </div>
                        <div className="rule-item">
                            <div className="rule-number">2</div>
                            <p>会员时长奖励将在好友开通会员后24小时内自动发放。</p>
                        </div>
                        <div className="rule-item">
                            <div className="rule-number">3</div>
                            <p>现金奖励可在&quot;我的-邀请记录&quot;中申请提现，72小时内到账。</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .invite-rules-section {
          margin-top: 16px;
        }

        .rules-container {
          background: rgba(0, 0, 0, 0.30);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(42, 42, 42, 0.70);
          border-radius: 12px;
          padding: 25px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .rules-header h2 {
          color: var(--color-text-primary);
          font-size: var(--font-size-2xl);
          line-height: 28px;
          font-weight: 400;
          margin: 0;
        }

        .rewards-grid {
          display: flex;
          gap: 24px;
          margin-top: 8px;
        }

        .reward-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .reward-header {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .reward-icon {
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .reward-icon.membership {
          background: rgba(59, 130, 246, 0.10);
        }

        .reward-icon.cash {
          background: rgba(168, 85, 247, 0.10);
        }

        .reward-icon img {
          width: 24px;
          height: 24px;
        }

        .reward-header h3 {
          color: var(--color-text-primary);
          font-size: var(--font-size-xl);
          line-height: 28px;
          font-weight: 400;
          margin: 0;
        }

        .reward-content {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          min-height: 48px;
        }

        .reward-content p {
          color: var(--color-text-secondary);
          font-size: var(--font-size-lg);
          line-height: 24px;
          margin: 0;
          width: 438px;
        }

        .distribution-rules {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rules-header-section {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .rules-icon {
          background: rgba(234, 179, 8, 0.10);
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .rules-icon img {
          width: 24px;
          height: 24px;
        }

        .rules-header-section h3 {
          color: var(--color-text-primary);
          font-size: var(--font-size-xl);
          line-height: 28px;
          font-weight: 400;
          margin: 0;
        }

        .rules-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: 52px;
        }

        .rule-item {
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .rule-number {
          background: rgba(255, 255, 255, 0.10);
          border-radius: 9999px;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          margin-bottom: 6px;
          padding: 4.5px;
          flex-shrink: 0;
        }

        .rule-number {
          color: var(--color-text-secondary);
          font-size: var(--font-size-xs);
          line-height: 16px;
          text-align: center;
        }

        .rule-item p {
          color: var(--color-text-secondary);
          font-size: var(--font-size-lg);
          line-height: 24px;
          margin: 0;
        }
      `}</style>
        </div>
    )
} 