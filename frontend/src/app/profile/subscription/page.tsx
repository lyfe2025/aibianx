'use client'

import {
  SubscriptionCard,
  InviteRewardSection,
  InviteRecordTable,
  InviteRulesSection
} from '@/components/molecules'

export default function MySubscriptionPage() {
  return (
    <div className="subscription-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">我的订阅</h1>
      </div>

      {/* 订阅信息卡片 */}
      <SubscriptionCard />

      {/* 邀请奖励区块 */}
      <InviteRewardSection />

      {/* 最近邀请记录 */}
      <div className="invite-records">
        <div className="section-header">
          <h2 className="section-title">最近邀请记录</h2>
          <div className="view-all-link">
            <span className="link-text">查看全部</span>
            <img
              src="/icons/subscription/view-all-arrow.svg"
              alt=""
              className="arrow-icon"
            />
          </div>
        </div>
        <InviteRecordTable />
      </div>

      {/* 邀请奖励规则 */}
      <InviteRulesSection />

      <style jsx>{`
        .subscription-page {
          padding: 32px 40px;
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-family: var(--font-family-primary);
          color: var(--color-text-primary);
        }

        .page-header {
          display: flex;
          align-items: flex-start;
          min-height: 32px;
        }

        .page-title {
          color: var(--color-text-primary);
          font-size: var(--font-size-3xl);
          line-height: 32px;
          font-weight: 400;
          margin: 0;
        }

        .invite-records {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-title {
          color: var(--color-text-primary);
          font-size: var(--font-size-2xl);
          line-height: 28px;
          font-weight: 400;
          margin: 0;
        }

        .view-all-link {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 4px 0;
        }

        .link-text {
          color: #60A5FA;
          font-size: var(--font-size-base);
          line-height: 20px;
        }

        .arrow-icon {
          width: 14px;
          height: 14px;
        }

        .view-all-link:hover .link-text {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
} 