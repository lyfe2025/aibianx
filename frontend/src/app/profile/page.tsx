'use client'

import React from 'react'
import { Icon } from '@/components/ui'
import { InviteRewardSection } from '@/components/molecules'

export default function ProfilePage() {
  // 统计数据 - 只保留收藏资源
  const userStats = [
    {
      title: '收藏资源',
      value: '28',
      icon: 'resources-icon',
      gradient: 'linear-gradient(135deg, #A855F7 15%, #EC4899 85%)'
    }
  ]

  return (
    <div
      style={{
        padding: '32px 8px', // 补偿外层profileMain的32px左右padding，总计40px
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px', // 与我的收藏页面保持一致的元素间距
        // 添加防换行保护
        overflow: 'hidden'
      }}
    >
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
        }}>个人中心</h1>
      </div>

      {/* 统计卡片 */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start', // 左对齐
        // 防换行保护
        overflow: 'hidden'
      }}>
        {userStats.map((stat, index) => (
          <div key={index} style={{
            background: 'var(--color-bg-secondary)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--color-border-primary)',
            borderRadius: 'var(--radius-lg)', // 使用圆角变量
            padding: 'var(--spacing-6)', // 使用间距变量: 24px
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-1)', // 使用间距变量: 4px
            // 防换行保护，固定宽度让卡片更美观
            width: '280px', // 固定宽度
            overflow: 'hidden'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: stat.gradient,
              borderRadius: 'var(--radius-md)', // 使用圆角变量
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--spacing-3)', // 使用间距变量: 12px
              flexShrink: 0 // 防止收缩
            }}>
              <Icon name={stat.icon} size="md" style={{ color: 'var(--color-text-primary)' }} />
            </div>
            <div style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-lg)', // 使用字体变量
              lineHeight: '24px',
              marginBottom: 'var(--spacing-1)', // 使用间距变量: 4px
              // 防换行保护 - 统计标题
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: '120px' // 为中文标题预留空间
            }}>{stat.title}</div>
            <div style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-3xl)', // 使用字体变量
              fontWeight: '600',
              lineHeight: '32px',
              // 防换行保护 - 统计数值
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* 邀请奖励区域 */}
      <InviteRewardSection />
    </div>
  )
} 