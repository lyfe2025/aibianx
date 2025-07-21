'use client'

import React from 'react'
import { Container, Icon, GradientButton } from '@/components/ui'
import { UserSidebar, StatCard } from '@/components/molecules'
import { Header, Footer } from '@/components/organisms'

export default function SubscriptionPage() {
    // 模拟订阅数据
    const subscriptionData = {
        plan: 'Pro 会员',
        status: 'active',
        expiryDate: '2024-06-15',
        autoRenew: true,
        nextBillingDate: '2024-06-15',
        price: '199',
        features: [
            '无限制访问所有内容',
            '专属 AI 工具库',
            '1对1 专家咨询',
            '优先客服支持',
            '独家案例分析',
            '高级模板下载'
        ]
    }

    const subscriptionHistory = [
        {
            date: '2024-03-15',
            plan: 'Pro 会员',
            period: '3个月',
            amount: '199',
            status: 'paid'
        },
        {
            date: '2023-12-15',
            plan: 'Basic 会员',
            period: '1个月',
            amount: '99',
            status: 'paid'
        },
        {
            date: '2023-11-15',
            plan: 'Basic 会员',
            period: '1个月',
            amount: '99',
            status: 'paid'
        }
    ]

    const membershipStats = [
        {
            title: '会员天数',
            value: '92',
            icon: 'clock-icon',
            iconColor: 'blue' as const
        },
        {
            title: '累计消费',
            value: '¥397',
            icon: 'rocket-icon',
            iconColor: 'green' as const
        },
        {
            title: '节省金额',
            value: '¥156',
            icon: 'success-check',
            iconColor: 'purple' as const
        },
        {
            title: '专享权益',
            value: '6项',
            icon: 'membership-exclusive',
            iconColor: 'orange' as const
        }
    ]

    const getDaysRemaining = () => {
        const expiry = new Date(subscriptionData.expiryDate)
        const today = new Date()
        const timeDiff = expiry.getTime() - today.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
        return daysDiff > 0 ? daysDiff : 0
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)]">
            <Header />

            <main className="subscription-page">
                <Container size="xl" className="subscription-container">
                    <div className="subscription-layout">
                        {/* 左侧边栏 */}
                        <UserSidebar />

                        {/* 右侧主内容 */}
                        <div className="subscription-main">
                            <div className="subscription-header">
                                <h1 className="page-title">我的订阅</h1>
                                <p className="page-description">管理您的会员订阅和权益</p>
                            </div>

                            {/* 当前订阅状态 */}
                            <div className="current-subscription">
                                <div className="subscription-card">
                                    <div className="subscription-card__header">
                                        <div className="plan-info">
                                            <h2 className="plan-name">{subscriptionData.plan}</h2>
                                            <div className="plan-status">
                                                <Icon name="success-check" size="sm" />
                                                <span>有效</span>
                                            </div>
                                        </div>
                                        <div className="plan-price">
                                            <span className="currency">¥</span>
                                            <span className="amount">{subscriptionData.price}</span>
                                            <span className="period">/3个月</span>
                                        </div>
                                    </div>

                                    <div className="subscription-card__content">
                                        <div className="expiry-info">
                                            <div className="expiry-date">
                                                <Icon name="clock-icon" size="sm" />
                                                <span>到期时间: {subscriptionData.expiryDate}</span>
                                            </div>
                                            <div className="days-remaining">
                                                剩余 <strong>{getDaysRemaining()}</strong> 天
                                            </div>
                                        </div>

                                        <div className="auto-renew">
                                            <div className="auto-renew__info">
                                                <Icon name="refresh-icon" size="sm" />
                                                <span>自动续费: {subscriptionData.autoRenew ? '已开启' : '已关闭'}</span>
                                            </div>
                                            <label className="toggle-switch">
                                                <input type="checkbox" defaultChecked={subscriptionData.autoRenew} />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="subscription-card__actions">
                                        <GradientButton variant="outline" size="sm">
                                            管理订阅
                                        </GradientButton>
                                        <GradientButton size="sm">
                                            立即续费
                                        </GradientButton>
                                    </div>
                                </div>

                                {/* 会员权益 */}
                                <div className="features-card">
                                    <h3 className="features-title">
                                        <Icon name="membership-exclusive" size="sm" />
                                        专享权益
                                    </h3>
                                    <div className="features-list">
                                        {subscriptionData.features.map((feature, index) => (
                                            <div key={index} className="feature-item">
                                                <Icon name="success-check" size="xs" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 会员统计 */}
                            <div className="membership-stats">
                                <h2 className="section-title">会员统计</h2>
                                <div className="stats-grid">
                                    {membershipStats.map((stat, index) => (
                                        <StatCard
                                            key={index}
                                            title={stat.title}
                                            value={stat.value}
                                            icon={stat.icon}
                                            iconColor={stat.iconColor}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* 订阅历史 */}
                            <div className="subscription-history">
                                <h2 className="section-title">订阅历史</h2>
                                <div className="history-table">
                                    <div className="history-header">
                                        <div className="header-cell">日期</div>
                                        <div className="header-cell">套餐</div>
                                        <div className="header-cell">周期</div>
                                        <div className="header-cell">金额</div>
                                        <div className="header-cell">状态</div>
                                        <div className="header-cell">操作</div>
                                    </div>

                                    {subscriptionHistory.map((record, index) => (
                                        <div key={index} className="history-row">
                                            <div className="history-cell">{record.date}</div>
                                            <div className="history-cell">{record.plan}</div>
                                            <div className="history-cell">{record.period}</div>
                                            <div className="history-cell">¥{record.amount}</div>
                                            <div className="history-cell">
                                                <span className={`status-badge status-badge--${record.status}`}>
                                                    {record.status === 'paid' ? '已支付' : '未支付'}
                                                </span>
                                            </div>
                                            <div className="history-cell">
                                                <button className="action-btn">查看发票</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />

            <style jsx>{`
        .subscription-page {
          padding: 32px 0 80px;
          min-height: calc(100vh - 80px);
        }

        .subscription-container {
          max-width: 1440px;
        }

        .subscription-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }

        .subscription-main {
          flex: 1;
          max-width: calc(100% - 280px);
        }

        .subscription-header {
          margin-bottom: 32px;
        }

        .page-title {
          color: var(--color-text-primary);
          font-size: var(--font-size-5xl);
          font-weight: 700;
          line-height: 44px;
          margin: 0 0 8px 0;
        }

        .page-description {
          color: var(--color-text-muted);
          font-size: var(--font-size-lg);
          line-height: 24px;
          margin: 0;
        }

        .current-subscription {
          display: flex;
          gap: 24px;
          margin-bottom: 40px;
        }

        .subscription-card {
          flex: 2;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.10) 0%, rgba(139, 92, 246, 0.10) 100%);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(59, 130, 246, 0.20);
          border-radius: 16px;
          padding: 32px;
        }

        .subscription-card__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .plan-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .plan-name {
          color: var(--color-text-primary);
          font-size: var(--font-size-3xl);
          font-weight: 700;
          line-height: 32px;
          margin: 0;
        }

        .plan-status {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #22C55E;
          font-size: var(--font-size-sm);
          font-weight: 500;
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .currency {
          color: var(--color-text-primary);
          font-size: var(--font-size-lg);
          font-weight: 500;
        }

        .amount {
          color: var(--color-text-primary);
          font-size: var(--font-size-4xl);
          font-weight: 700;
          line-height: 36px;
        }

        .period {
          color: var(--color-text-muted);
          font-size: var(--font-size-lg);
        }

        .subscription-card__content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }

        .expiry-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: rgba(0, 0, 0, 0.20);
          border-radius: 8px;
        }

        .expiry-date {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
        }

        .days-remaining {
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
          font-weight: 500;
        }

        .auto-renew {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .auto-renew__info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 28px;
          cursor: pointer;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(55, 65, 81, 0.50);
          border: 1px solid rgba(42, 42, 42, 0.70);
          transition: all 0.2s ease;
          border-radius: 28px;
        }

        .toggle-slider:before {
          position: absolute;
          content: '';
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: var(--color-text-primary);
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .toggle-switch input:checked + .toggle-slider {
          background: var(--gradient-primary);
          border-color: transparent;
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(20px);
        }

        .subscription-card__actions {
          display: flex;
          gap: 12px;
        }

        .features-card {
          flex: 1;
          background: rgba(26, 26, 26, 0.30);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(42, 42, 42, 0.70);
          border-radius: 16px;
          padding: 24px;
        }

        .features-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-text-primary);
          font-size: var(--font-size-xl);
          font-weight: 600;
          line-height: 28px;
          margin: 0 0 20px 0;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
          line-height: 20px;
        }

        .feature-item :global(.icon) {
          color: #22C55E;
        }

        .membership-stats {
          margin-bottom: 40px;
        }

        .section-title {
          color: var(--color-text-primary);
          font-size: var(--font-size-2xl);
          font-weight: 600;
          line-height: 28px;
          margin: 0 0 24px 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(262px, 1fr));
          gap: 24px;
        }

        .subscription-history {
          background: rgba(26, 26, 26, 0.30);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(42, 42, 42, 0.70);
          border-radius: 16px;
          padding: 24px;
        }

        .history-table {
          display: flex;
          flex-direction: column;
        }

        .history-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(42, 42, 42, 0.50);
        }

        .header-cell {
          color: var(--color-text-muted);
          font-size: var(--font-size-sm);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .history-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(42, 42, 42, 0.30);
        }

        .history-row:last-child {
          border-bottom: none;
        }

        .history-cell {
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
          line-height: 20px;
          display: flex;
          align-items: center;
        }

        .status-badge {
          background: rgba(34, 197, 94, 0.10);
          color: #22C55E;
          font-size: var(--font-size-xs);
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 12px;
        }

        .action-btn {
          background: none;
          border: 1px solid rgba(59, 130, 246, 0.50);
          color: var(--color-primary-blue);
          font-size: var(--font-size-sm);
          padding: 4px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: rgba(59, 130, 246, 0.10);
        }

        /* 响应式设计 */
        @media (max-width: 1024px) {
          .subscription-layout {
            flex-direction: column;
          }

          .subscription-main {
            max-width: 100%;
          }

          .current-subscription {
            flex-direction: column;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .subscription-page {
            padding: 20px 0 60px;
          }

          .subscription-layout {
            gap: 24px;
          }

          .subscription-card {
            padding: 24px;
          }

          .subscription-card__header {
            flex-direction: column;
            gap: 16px;
          }

          .history-header,
          .history-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .header-cell,
          .history-cell {
            padding: 8px 0;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    )
} 