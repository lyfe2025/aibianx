'use client'

import React from 'react'
import { GradientButton } from '@/components/ui'

export interface SubscriptionCardProps {
    className?: string
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
    className = ''
}) => {
    return (
        <div className={`subscription-card ${className}`}>
            {/* 订阅信息卡片 */}
            <div className="subscription-info">
                <div className="info-header">
                    <div className="plan-info">
                        <div className="plan-title-row">
                            <h2 className="plan-title">高级会员</h2>
                            <div className="current-plan-badge">
                                <span>当前方案</span>
                            </div>
                        </div>
                        <p className="expiry-info">
                            到期时间：2024年12月31日（剩余245天）
                        </p>
                    </div>
                    <div className="action-buttons">
                        <GradientButton variant="primary" size="md">
                            立即续费
                            <img
                                src="/icons/subscription/renew-arrow.svg"
                                alt=""
                                className="renew-arrow"
                            />
                        </GradientButton>
                        <div className="manage-payment-btn">
                            <img
                                src="/icons/subscription/payment-manage.svg"
                                alt=""
                                className="payment-icon"
                            />
                            <span>管理支付方式</span>
                        </div>
                    </div>
                </div>
                <div className="benefits-info">
                    <p>订阅内容：全站资源、专属社群、一对一咨询（每月1次）</p>
                </div>
            </div>

            {/* 专属会员权益入口 */}
            <div className="member-privileges">
                <div className="privilege-content">
                    <div className="privilege-icon">
                        <img
                            src="/icons/subscription/member-privilege.svg"
                            alt=""
                        />
                    </div>
                    <div className="privilege-text">
                        <h3>专属会员权益</h3>
                        <p>查看您的专属会员权益和使用方式</p>
                    </div>
                </div>
                <img
                    src="/icons/subscription/arrow-right.svg"
                    alt=""
                    className="privilege-arrow"
                />
            </div>

            <style jsx>{`
        .subscription-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 16px;
        }

        .subscription-info {
          background: rgba(0, 0, 0, 0.30);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(42, 42, 42, 0.70);
          border-radius: 12px;
          padding: 25px;
        }

        .info-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .plan-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .plan-title-row {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .plan-title {
          color: var(--color-text-primary);
          font-size: var(--font-size-2xl);
          line-height: 28px;
          font-weight: 400;
          margin: 0;
        }

        .current-plan-badge {
          background: linear-gradient(90deg, #EAB308 0%, #CA8A04 100%);
          border-radius: 9999px;
          padding: 2px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .current-plan-badge span {
          color: var(--color-text-primary);
          font-size: var(--font-size-xs);
          line-height: 16px;
        }

        .expiry-info {
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
          line-height: 20px;
          margin: 0;
          width: 268px;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
          padding-bottom: 10px;
        }

        .renew-arrow {
          width: 16px;
          height: 16px;
          margin-left: 8px;
        }

        .manage-payment-btn {
          border: 1px solid rgba(255, 255, 255, 0.20);
          border-radius: 8px;
          padding: 11px 20px;
          display: flex;
          gap: 8px;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .manage-payment-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .payment-icon {
          width: 16px;
          height: 16px;
        }

        .manage-payment-btn span {
          color: var(--color-text-primary);
          font-size: var(--font-size-lg);
          line-height: 24px;
          text-align: center;
        }

        .benefits-info {
          margin-top: 16px;
        }

        .benefits-info p {
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
          line-height: 20px;
          margin: 0;
        }

        .member-privileges {
          border-top: 1px solid rgba(255, 255, 255, 0.10);
          padding-top: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .member-privileges:hover {
          opacity: 0.8;
        }

        .privilege-content {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .privilege-icon {
          background: rgba(234, 179, 8, 0.10);
          border-radius: 9999px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        .privilege-icon img {
          width: 16px;
          height: 12.8px;
        }

        .privilege-text h3 {
          color: var(--color-text-primary);
          font-size: var(--font-size-lg);
          line-height: 24px;
          font-weight: 400;
          margin: 0 0 4px 0;
        }

        .privilege-text p {
          color: var(--color-text-muted);
          font-size: var(--font-size-xs);
          line-height: 16px;
          margin: 0;
        }

        .privilege-arrow {
          width: 16px;
          height: 16px;
          margin-top: 12px;
        }
      `}</style>
        </div>
    )
} 