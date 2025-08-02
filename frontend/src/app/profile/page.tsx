'use client'

import React from 'react'
import { Container, GradientButton } from '@/components/ui'
import { 
  InviteRewardSection, 
  SimpleMembershipStatus,
  MemberOnlyBadge 
} from '@/components/molecules'
import Link from 'next/link'

/**
 * 移动端个人中心页面 - ProfilePage
 * 
 * 专为移动端优化的用户价值中心
 * 核心功能：会员管理 + 邮件订阅管理 + 用户价值展示
 * 
 * 页面结构：
 * 1. 用户头像区域 - 基本信息和会员状态
 * 2. 订阅统计卡片 - 收藏、阅读、分享数据
 * 3. 会员订阅状态 - 当前状态和管理入口
 * 4. 收藏内容管理 - 最近收藏的内容
 * 5. 会员专享预览 - 高级内容引导
 * 6. 邮件订阅管理 - 订阅偏好设置
 * 7. 推荐内容 - 个性化推荐
 */
export default function ProfilePage() {
  // 模拟用户数据 - 后续集成真实API
  const userData = {
    name: 'AI创业者',
    avatar: '/images/avatars/default.jpg',
    isMember: false,
    membershipType: undefined,
    emailSubscribed: true,
    joinDate: '2024年1月'
  }

  // 用户统计数据
  const userStats = [
    {
      title: '收藏',
      value: '28',
      label: '资源',
      icon: '📚'
    },
    {
      title: '阅读',
      value: '156',
      label: '文章',
      icon: '📖'
    },
    {
      title: '分享',
      value: '12',
      label: '次数',
      icon: '🔗'
    }
  ]

  // 最近收藏的内容
  const recentBookmarks = [
    {
      id: 1,
      title: 'ChatGPT提示词大全',
      type: '免费资源',
      date: '2天前'
    },
    {
      id: 2,
      title: 'AI工具推荐清单',
      type: '免费资源', 
      date: '5天前'
    },
    {
      id: 3,
      title: '变现案例深度分析',
      type: '会员专享',
      date: '1周前'
    }
  ]

  return (
    <main className="profile-page">
      <Container size="xl">
        <div className="profile-content">
          {/* 1. 用户头像区域 */}
          <div className="user-header">
            <div className="user-avatar">
              <div className="avatar-circle">
                {userData.name.charAt(0)}
              </div>
            </div>
            
            <div className="user-info">
              <h1 className="user-name">
                {userData.name}
              </h1>
              <p className="user-meta">
                加入时间：{userData.joinDate}
              </p>
            </div>

            <div className="user-status">
              {userData.isMember ? (
                <span className="status-badge member">
                  ✨ 会员用户
                </span>
              ) : (
                <span className="status-badge free">
                  👤 免费用户
                </span>
              )}
            </div>
          </div>

          {/* 2. 订阅统计卡片 */}
          <div className="stats-section">
            <div className="stats-grid">
              {userStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    {stat.icon}
                  </div>
                  <div className="stat-number">
                    {stat.value}
                  </div>
                  <div className="stat-label">
                    {stat.title}{stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 会员订阅状态 */}
          <div className="membership-section">
            <h2 className="section-title">
              会员订阅状态
            </h2>
            
            <div className="membership-card">
              <div className="membership-info">
                <div className="info-row">
                  <span className="info-label">当前状态:</span>
                  <span className="info-value">
                    {userData.isMember ? '会员用户' : '免费用户'}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">邮件订阅:</span>
                  <span className="info-value">
                    {userData.emailSubscribed ? '已订阅' : '未订阅'}
                  </span>
                </div>
              </div>
              
              <div className="membership-actions">
                {!userData.isMember && (
                  <Link href="/membership">
                    <GradientButton size="sm" className="upgrade-btn">
                      升级会员
                    </GradientButton>
                  </Link>
                )}
                <button className="manage-btn">
                  管理
                </button>
              </div>
            </div>
          </div>

          {/* 4. 收藏内容管理 */}
          <div className="bookmarks-section">
            <h2 className="section-title">
              收藏内容管理
            </h2>
            
            <div className="bookmarks-list">
              {recentBookmarks.map((bookmark) => (
                <div key={bookmark.id} className="bookmark-item">
                  <div className="bookmark-content">
                    <h3 className="bookmark-title">
                      {bookmark.title}
                    </h3>
                    <div className="bookmark-meta">
                      <span className="bookmark-type">
                        {bookmark.type}
                      </span>
                      <span className="bookmark-date">
                        {bookmark.date}
                      </span>
                    </div>
                  </div>
                  
                  {bookmark.type === '会员专享' && !userData.isMember && (
                    <MemberOnlyBadge size="sm" showUpgradeButton={false} />
                  )}
                </div>
              ))}
              
              <button className="view-all-btn">
                查看全部收藏
              </button>
            </div>
          </div>

          {/* 5. 会员专享预览 */}
          {!userData.isMember && (
            <div className="member-preview-section">
              <h2 className="section-title">
                会员专享预览
              </h2>
              
              <div className="preview-card">
                <div className="preview-content">
                  <h3 className="preview-title">
                    高级会员专享内容
                  </h3>
                  <ul className="preview-benefits">
                    <li>深度变现案例分析</li>
                    <li>专家1对1指导服务</li>
                    <li>独家AI工具资源包</li>
                    <li>优先获得最新资讯</li>
                  </ul>
                </div>
                
                <Link href="/membership">
                  <GradientButton size="md" className="preview-upgrade-btn">
                    立即升级
                  </GradientButton>
                </Link>
              </div>
            </div>
          )}

          {/* 6. 邮件订阅管理 */}
          <div className="email-section">
            <h2 className="section-title">
              邮件订阅管理
            </h2>
            
            <div className="email-card">
              <div className="email-info">
                <div className="info-row">
                  <span className="info-label">订阅状态:</span>
                  <span className="info-value">
                    {userData.emailSubscribed ? '已订阅' : '未订阅'}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">推送频率:</span>
                  <span className="info-value">每周更新</span>
                </div>
              </div>
              
              <button className="email-settings-btn">
                修改设置
              </button>
            </div>
          </div>

          {/* 7. 推荐内容 */}
          <div className="recommendations-section">
            <h2 className="section-title">
              推荐内容
            </h2>
            
            <div className="recommendations-grid">
              <div className="recommendation-item">
                <h3 className="recommendation-title">
                  最新AI工具评测
                </h3>
                <p className="recommendation-description">
                  基于你的阅读偏好推荐
                </p>
              </div>
              
              <div className="recommendation-item">
                <h3 className="recommendation-title">
                  热门变现案例
                </h3>
                <p className="recommendation-description">
                  其他用户都在关注
                </p>
              </div>
              
              {!userData.isMember && (
                <div className="recommendation-item member-only">
                  <h3 className="recommendation-title">
                    会员专享资源
                  </h3>
                  <p className="recommendation-description">
                    升级解锁更多内容
                  </p>
                  <MemberOnlyBadge size="sm" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* 移动端专用样式 */}
      <style jsx>{`
        .profile-page {
          width: 100%;
          min-height: 100vh;
          background: var(--color-bg-primary);
          padding: 20px 0;
        }

        .profile-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 100%;
        }

        /* 用户头像区域 */
        .user-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border-glass);
          border-radius: 16px;
          backdrop-filter: blur(12px);
        }

        .user-avatar {
          flex-shrink: 0;
        }

        .avatar-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            var(--color-primary-blue) 0%, 
            var(--color-primary-purple) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: var(--font-size-2xl);
          font-weight: bold;
        }

        .user-info {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-size: var(--font-size-xl);
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .user-meta {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.3;
        }

        .user-status {
          flex-shrink: 0;
        }

        .status-badge {
          font-size: var(--font-size-xs);
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 20px;
          line-height: 1.2;
          white-space: nowrap;
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

        /* 统计卡片 */
        .stats-section {
          width: 100%;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-card {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-primary);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: var(--color-primary-blue);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
        }

        .stat-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .stat-number {
          font-size: var(--font-size-2xl);
          font-weight: bold;
          color: var(--color-primary-blue);
          margin-bottom: 4px;
          line-height: 1;
        }

        .stat-label {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          line-height: 1.2;
        }

        /* 通用区域样式 */
        .section-title {
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0 0 16px 0;
          line-height: 1.3;
        }

        /* 会员订阅状态 */
        .membership-card,
        .email-card {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-primary);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .membership-info,
        .email-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

        .info-value {
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          font-weight: 500;
        }

        .membership-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .upgrade-btn {
          font-size: var(--font-size-xs) !important;
          padding: 8px 16px !important;
        }

        .manage-btn,
        .email-settings-btn {
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border-primary);
          color: var(--color-text-primary);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: var(--font-size-xs);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .manage-btn:hover,
        .email-settings-btn:hover {
          border-color: var(--color-primary-blue);
          background: var(--color-bg-glass);
        }

        /* 收藏内容管理 */
        .bookmarks-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bookmark-item {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-primary);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .bookmark-content {
          flex: 1;
          min-width: 0;
        }

        .bookmark-title {
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--color-text-primary);
          margin: 0 0 6px 0;
          line-height: 1.3;
        }

        .bookmark-meta {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .bookmark-type,
        .bookmark-date {
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
        }

        .view-all-btn {
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border-glass);
          color: var(--color-text-primary);
          padding: 12px;
          border-radius: 8px;
          font-size: var(--font-size-sm);
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
        }

        .view-all-btn:hover {
          border-color: var(--color-primary-blue);
          background: var(--color-bg-secondary);
        }

        /* 会员专享预览 */
        .preview-card {
          background: var(--color-bg-glass);
          border: 2px solid var(--color-primary-blue);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(12px);
          text-align: center;
        }

        .preview-title {
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0 0 16px 0;
          line-height: 1.3;
        }

        .preview-benefits {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .preview-benefits li {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        .preview-benefits li:before {
          content: '• ';
          color: var(--color-primary-blue);
          font-weight: bold;
        }

        .preview-upgrade-btn {
          width: 100%;
        }

        /* 推荐内容 */
        .recommendations-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .recommendation-item {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-primary);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .recommendation-item:hover {
          border-color: var(--color-primary-blue);
          transform: translateY(-1px);
        }

        .recommendation-item.member-only {
          border-color: rgba(156, 163, 175, 0.3);
          background: rgba(156, 163, 175, 0.05);
        }

        .recommendation-title {
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--color-text-primary);
          margin: 0 0 6px 0;
          line-height: 1.3;
        }

        .recommendation-description {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.4;
        }

        /* 移动端优化 */
        @media (max-width: 768px) {
          .profile-page {
            padding: 16px 0;
          }

          .profile-content {
            gap: 24px;
            padding: 0 16px;
          }

          .user-header {
            padding: 16px;
          }

          .avatar-circle {
            width: 56px;
            height: 56px;
            font-size: var(--font-size-xl);
          }

          .user-name {
            font-size: var(--font-size-lg);
          }

          .stats-grid {
            gap: 12px;
          }

          .stat-card {
            padding: 12px;
          }

          .stat-icon {
            font-size: 20px;
            margin-bottom: 6px;
          }

          .stat-number {
            font-size: var(--font-size-xl);
          }
        }

        /* 超小屏幕优化 */
        @media (max-width: 480px) {
          .user-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .membership-card,
          .email-card {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .membership-actions {
            justify-content: center;
          }

          .info-row {
            justify-content: center;
            gap: 8px;
          }
        }

        /* 触控设备优化 */
        @media (hover: none) and (pointer: coarse) {
          .stat-card,
          .bookmark-item,
          .recommendation-item {
            touch-action: manipulation;
          }

          .upgrade-btn:active,
          .manage-btn:active,
          .view-all-btn:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </main>
  )
} 