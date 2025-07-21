'use client'

import React from 'react'
import { Container, Icon } from '@/components/ui'
import { UserSidebar, StatCard, InviteSection } from '@/components/molecules'
import { Header, Footer } from '@/components/organisms'

export default function ProfilePage() {
    // 模拟用户数据
    const userStats = [
        {
            title: '收藏内容',
            value: '18',
            icon: 'collect-icon-detail',
            iconColor: 'blue' as const
        },
        {
            title: '学习时长',
            value: '126h',
            icon: 'clock-icon',
            iconColor: 'green' as const
        },
        {
            title: '邀请奖励',
            value: '¥1,235',
            icon: 'rocket-icon',
            iconColor: 'purple' as const
        },
        {
            title: '积分余额',
            value: '2,480',
            icon: 'success-check',
            iconColor: 'orange' as const
        }
    ]

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)]">
            <Header />

            <main className="profile-page">
                <Container size="xl" className="profile-container">
                    <div className="profile-layout">
                        {/* 左侧边栏 */}
                        <UserSidebar />

                        {/* 右侧主内容 */}
                        <div className="profile-main">
                            <div className="profile-header">
                                <h1 className="page-title">个人中心</h1>
                                <p className="page-description">管理您的账户信息、查看学习进度</p>
                            </div>

                            {/* 统计卡片网格 */}
                            <div className="stats-grid">
                                {userStats.map((stat, index) => (
                                    <StatCard
                                        key={index}
                                        title={stat.title}
                                        value={stat.value}
                                        icon={stat.icon}
                                        iconColor={stat.iconColor}
                                    />
                                ))}
                            </div>

                            {/* 邀请奖励区域 */}
                            <InviteSection
                                inviteCode="AI7859"
                                invitedCount={18}
                                pendingCount={5}
                                totalReward="¥1,235"
                            />

                            {/* 快速操作区域 */}
                            <div className="quick-actions">
                                <h2 className="section-title">快速操作</h2>
                                <div className="actions-grid">
                                    <div className="action-card">
                                        <div className="action-icon">
                                            <Icon name="collect-icon-detail" size="lg" />
                                        </div>
                                        <div className="action-content">
                                            <h3 className="action-title">我的收藏</h3>
                                            <p className="action-description">查看收藏的文章、教程和工具</p>
                                        </div>
                                        <div className="action-arrow">
                                            <Icon name="arrow-right" size="sm" />
                                        </div>
                                    </div>

                                    <div className="action-card">
                                        <div className="action-icon">
                                            <Icon name="rocket-icon" size="lg" />
                                        </div>
                                        <div className="action-content">
                                            <h3 className="action-title">我的订阅</h3>
                                            <p className="action-description">管理会员订阅和权益</p>
                                        </div>
                                        <div className="action-arrow">
                                            <Icon name="arrow-right" size="sm" />
                                        </div>
                                    </div>

                                    <div className="action-card">
                                        <div className="action-icon">
                                            <Icon name="adjust-icon-detail" size="lg" />
                                        </div>
                                        <div className="action-content">
                                            <h3 className="action-title">账户设置</h3>
                                            <p className="action-description">修改个人信息和安全设置</p>
                                        </div>
                                        <div className="action-arrow">
                                            <Icon name="arrow-right" size="sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />

            <style jsx>{`
        .profile-page {
          padding: 32px 0 80px;
          min-height: calc(100vh - 80px);
        }

        .profile-container {
          max-width: 1440px;
        }

        .profile-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }

        .profile-main {
          flex: 1;
          max-width: calc(100% - 280px);
        }

        .profile-header {
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(262px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .quick-actions {
          margin-top: 40px;
        }

        .section-title {
          color: var(--color-text-primary);
          font-size: var(--font-size-2xl);
          font-weight: 600;
          line-height: 28px;
          margin: 0 0 24px 0;
        }

        .actions-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .action-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(26, 26, 26, 0.30);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(42, 42, 42, 0.70);
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-card:hover {
          border-color: rgba(59, 130, 246, 0.30);
          transform: translateY(-2px);
        }

        .action-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: rgba(59, 130, 246, 0.10);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-content {
          flex: 1;
        }

        .action-title {
          color: var(--color-text-primary);
          font-size: var(--font-size-xl);
          font-weight: 600;
          line-height: 28px;
          margin: 0 0 4px 0;
        }

        .action-description {
          color: var(--color-text-muted);
          font-size: var(--font-size-base);
          line-height: 20px;
          margin: 0;
        }

        .action-arrow {
          flex-shrink: 0;
          color: var(--color-text-muted);
        }

        /* 响应式设计 */
        @media (max-width: 1024px) {
          .profile-layout {
            flex-direction: column;
          }

          .profile-main {
            max-width: 100%;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .profile-page {
            padding: 20px 0 60px;
          }

          .profile-layout {
            gap: 24px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .action-card {
            padding: 20px;
          }
        }
      `}</style>
        </div>
    )
} 