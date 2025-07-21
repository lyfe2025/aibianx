'use client'

import { PageLayout } from '@/components/templates/PageLayout/PageLayout'
import { Container, GradientText, GradientButton, Icon } from '@/components/ui'
import Image from 'next/image'
import { LoginModal } from '@/components/organisms/LoginModal/LoginModal'
import { RegisterModal } from '@/components/organisms/RegisterModal/RegisterModal'
import { ForgotPasswordModal } from '@/components/organisms/ForgotPasswordModal/ForgotPasswordModal'
import { MembershipModal } from '@/components/organisms/MembershipModal/MembershipModal'

export default function HomePage() {
  return (
    <PageLayout>
      {/* 添加弹窗组件 */}
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <MembershipModal />

      {/* Hero Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: 'var(--color-bg-primary)',
          paddingTop: '72px' // Header height
        }}
      >
        <Container size="xl">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 'var(--spacing-8)',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {/* 主标题 */}
            <div>
              <GradientText
                size="8xl"
                weight="bold"
                style={{
                  lineHeight: '1.1',
                  marginBottom: 'var(--spacing-6)'
                }}
              >
                AI变现之路
              </GradientText>
              <p
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                掌握AI工具，开启变现之路。从零基础到专业应用，助您在AI时代抢占先机。
              </p>
            </div>

            {/* 设备展示图 */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                margin: 'var(--spacing-12) 0'
              }}
            >
              <Image
                src="/images/hero/devices-main.svg"
                alt="AI变现之路设备展示"
                width={600}
                height={400}
                priority
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0px 20px 40px rgba(139, 92, 246, 0.3))'
                }}
              />
            </div>

            {/* CTA按钮 */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--spacing-4)',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <GradientButton
                size="lg"
                variant="primary"
                onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
              >
                立即开始
              </GradientButton>

              <GradientButton
                size="lg"
                variant="outline"
                onClick={() => window.open('#about', '_self')}
              >
                了解更多
              </GradientButton>
            </div>

            {/* 统计数据 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 'var(--spacing-8)',
                width: '100%',
                maxWidth: '500px',
                marginTop: 'var(--spacing-16)'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  className="gradient-text font-bold"
                  style={{ fontSize: 'var(--font-size-5xl)', marginBottom: 'var(--spacing-2)' }}
                >
                  10K+
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  活跃用户
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div
                  className="gradient-text font-bold"
                  style={{ fontSize: 'var(--font-size-5xl)', marginBottom: 'var(--spacing-2)' }}
                >
                  100+
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  AI工具
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div
                  className="gradient-text font-bold"
                  style={{ fontSize: 'var(--font-size-5xl)', marginBottom: 'var(--spacing-2)' }}
                >
                  95%
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  成功率
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}
