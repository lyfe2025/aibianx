'use client'

import {
  GradientButton,
  GradientText,
  Input,
  GlassCard,
  Icon,
  Avatar,
  PageLayout
} from '@/components'
import { useModalStore, useUserStore } from '@/stores'

export default function Home() {
  const { openModal } = useModalStore()
  const { user, isAuthenticated } = useUserStore()

  const heroStyle = {
    textAlign: 'center' as const,
    paddingTop: '80px',
    paddingBottom: '80px'
  }

  const heroContentStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '32px',
    alignItems: 'center'
  }

  const heroButtonsStyle = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const
  }

  const sectionStyle = {
    marginBottom: '64px'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginBottom: '64px'
  }

  const cardContentStyle = {
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  }

  const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'center'
  }

  const componentGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px'
  }

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  }

  const buttonGroupStyle = {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap' as const
  }

  const membershipGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
    maxWidth: '1024px',
    margin: '0 auto'
  }

  const checklistStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  }

  const checkItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }

  const statusBadgeStyle = {
    padding: '16px 0',
    borderTop: '1px solid var(--color-border-primary)'
  }

  return (
    <PageLayout>
      <div style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        {/* Hero区域 */}
        <div style={heroStyle}>
          <div style={heroContentStyle}>
            <GradientText as="h1" size="8xl" weight="bold">
              AI变现之路
            </GradientText>
            <GradientText
              as="p"
              size="xl"
              weight="medium"
              style={{ maxWidth: '512px', margin: '0 auto' }}
            >
              专注AI工具实用指南，帮助您在AI时代找到属于自己的变现之路
            </GradientText>
            <div style={heroButtonsStyle}>
              <GradientButton size="lg" onClick={() => openModal('membership')}>
                开始探索
              </GradientButton>
              <GradientButton size="lg" variant="outline">
                了解更多
              </GradientButton>
            </div>
          </div>
        </div>

        {/* 功能展示区域 */}
        <div style={sectionStyle}>
          <div style={gridStyle}>
            <GlassCard variant="hover" padding="lg">
              <div style={cardContentStyle}>
                <div style={iconContainerStyle}>
                  <Icon name="ai-tool-library" size="xl" style={{ color: 'var(--color-primary-blue)' }} />
                </div>
                <GradientText size="xl" weight="semibold">
                  AI工具库
                </GradientText>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  精选优质AI工具，涵盖写作、设计、编程等多个领域，助力效率提升
                </p>
              </div>
            </GlassCard>

            <GlassCard variant="hover" padding="lg">
              <div style={cardContentStyle}>
                <div style={iconContainerStyle}>
                  <Icon name="practical-experience" size="xl" style={{ color: 'var(--color-primary-purple)' }} />
                </div>
                <GradientText size="xl" weight="semibold">
                  实战经验
                </GradientText>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  分享真实的AI变现案例和实操经验，让您快速掌握变现技巧
                </p>
              </div>
            </GlassCard>

            <GlassCard variant="hover" padding="lg">
              <div style={cardContentStyle}>
                <div style={iconContainerStyle}>
                  <Icon name="community-support" size="xl" style={{ color: 'var(--color-primary-blue)' }} />
                </div>
                <GradientText size="xl" weight="semibold">
                  社区支持
                </GradientText>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  加入活跃的AI变现社区，与同行交流心得，共同成长进步
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* 原子组件展示区域 */}
        <GlassCard className="glass-card" style={{ padding: '32px', marginBottom: '64px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <GradientText as="h2" size="3xl" weight="bold" style={{ textAlign: 'center' }}>
              布局组件展示
            </GradientText>

            <div style={componentGridStyle}>
              {/* 按钮组件展示 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <GradientText size="lg" weight="semibold">
                  交互组件
                </GradientText>
                <div style={buttonGroupStyle}>
                  <GradientButton size="sm" onClick={() => openModal('login')}>
                    登录
                  </GradientButton>
                  <GradientButton size="md" onClick={() => openModal('register')}>
                    注册
                  </GradientButton>
                  <GradientButton size="md" variant="outline">
                    轮廓按钮
                  </GradientButton>
                </div>
              </div>

              {/* 输入框展示 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <GradientText size="lg" weight="semibold">
                  表单组件
                </GradientText>
                <div style={inputGroupStyle}>
                  <Input
                    placeholder="搜索AI工具..."
                    icon={<Icon name="search-icon" size="sm" />}
                  />
                  <Input
                    placeholder="邮箱地址"
                    type="email"
                    icon={<Icon name="email-icon" size="sm" />}
                  />
                </div>
              </div>
            </div>

            {/* 状态管理展示 */}
            <div style={statusBadgeStyle}>
              <GradientText size="lg" weight="semibold" style={{ marginBottom: '16px' }}>
                用户状态管理
              </GradientText>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>登录状态:</span>
                <span style={{ color: isAuthenticated ? '#10B981' : '#EF4444' }}>
                  {isAuthenticated ? '已登录' : '未登录'}
                </span>
                {user && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar size="sm" fallback={user.username?.[0] || 'U'} />
                    <span style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: 'var(--font-size-sm)'
                    }}>
                      {user.username || user.email}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 会员卡片区域 */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ marginBottom: '32px' }}>
            <GradientText as="h2" size="5xl" weight="bold">
              升级会员，解锁更多权益
            </GradientText>
          </div>

          <div style={membershipGridStyle}>
            <GlassCard variant="default" padding="lg">
              <div style={cardContentStyle}>
                <GradientText size="2xl" weight="bold">
                  免费会员
                </GradientText>
                <div style={checklistStyle}>
                  <div style={checkItemStyle}>
                    <Icon name="membership-check" size="sm" style={{ color: '#10B981' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>基础AI工具推荐</span>
                  </div>
                  <div style={checkItemStyle}>
                    <Icon name="membership-check" size="sm" style={{ color: '#10B981' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>每周精选内容</span>
                  </div>
                  <div style={checkItemStyle}>
                    <Icon name="membership-check" size="sm" style={{ color: '#10B981' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>社区基础权限</span>
                  </div>
                </div>
                <GradientButton size="md" variant="outline" fullWidth>
                  当前计划
                </GradientButton>
              </div>
            </GlassCard>

            <GlassCard variant="active" padding="lg">
              <div style={cardContentStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <GradientText size="2xl" weight="bold">
                    高级会员
                  </GradientText>
                  <Icon name="membership-exclusive" size="sm" style={{ color: 'var(--color-primary-purple)' }} />
                </div>
                <div style={checklistStyle}>
                  <div style={checkItemStyle}>
                    <Icon name="membership-check" size="sm" style={{ color: '#10B981' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>完整AI工具库访问</span>
                  </div>
                  <div style={checkItemStyle}>
                    <Icon name="membership-check" size="sm" style={{ color: '#10B981' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>独家变现案例分析</span>
                  </div>
                  <div style={checkItemStyle}>
                    <Icon name="membership-check" size="sm" style={{ color: '#10B981' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>一对一指导咨询</span>
                  </div>
                  <div style={checkItemStyle}>
                    <Icon name="membership-check" size="sm" style={{ color: '#10B981' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>VIP社群权限</span>
                  </div>
                </div>
                <GradientButton size="md" fullWidth onClick={() => openModal('membership')}>
                  立即升级
                </GradientButton>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
