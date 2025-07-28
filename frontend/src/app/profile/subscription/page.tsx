'use client'

import {
  SubscriptionCard,
  InviteRewardSection,
  InviteRecordTable,
  InviteRulesSection
} from '@/components/molecules'

export default function MySubscriptionPage() {
  return (
    <div style={{
      padding: '32px 8px', // 补偿外层profileMain的32px左右padding，总计40px
      maxWidth: '1440px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      // 防换行保护
      overflow: 'hidden'
    }}>
      {/* 页面标题 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '32px'
      }}>
        <h1 style={{
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-3xl)',
          lineHeight: '32px',
          fontWeight: 'normal',
          margin: 0,
          whiteSpace: 'nowrap'
        }}>我的订阅</h1>
      </div>

      {/* 订阅信息卡片 */}
      <SubscriptionCard />

      {/* 邀请奖励区块 */}
      <InviteRewardSection />

      {/* 最近邀请记录 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        // 防换行保护
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // 防换行保护
          flexWrap: 'nowrap',
          overflow: 'hidden',
          gap: '16px' // 添加间距防止挤压
        }}>
          <h2 style={{
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-2xl)',
            lineHeight: '28px',
            fontWeight: 'normal',
            margin: 0,
            // 防换行保护 - 区块标题
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: '140px' // 为"最近邀请记录"预留空间
          }}>最近邀请记录</h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            padding: '4px 0',
            // 防换行保护 - 查看全部链接
            flexShrink: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}>
            <span style={{
              color: 'var(--color-primary-blue)',
              fontSize: 'var(--font-size-base)',
              lineHeight: '20px',
              // 防换行保护
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>查看全部</span>
            <img
              src="/icons/subscription/view-all-arrow.svg"
              alt=""
              style={{
                width: '14px',
                height: '14px',
                flexShrink: 0 // 图标不能收缩
              }}
            />
          </div>
        </div>
        <InviteRecordTable />
      </div>

      {/* 邀请奖励规则 */}
      <InviteRulesSection />
    </div>
  )
} 