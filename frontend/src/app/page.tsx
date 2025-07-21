'use client'

import {
  AppHeader,
  HeroSection,
  AIStepsSection,
  ArticlesSection,
  FeaturesSection,
  ResourcesSection,
  CTASection,
  AppFooter
} from '@/components/molecules'
import { LoginModal } from '@/components/organisms/LoginModal/LoginModal'
import { RegisterModal } from '@/components/organisms/RegisterModal/RegisterModal'
import { ForgotPasswordModal } from '@/components/organisms/ForgotPasswordModal/ForgotPasswordModal'
import { MembershipModal } from '@/components/organisms/MembershipModal/MembershipModal'

export default function HomePage() {
  return (
    <div style={{
      background: '#030303',
      color: '#FFFFFF',
      fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
      minHeight: '100vh'
    }}>
      {/* 背景装饰光效 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        background: 'linear-gradient(90deg, rgba(79, 172, 254, 0.10) 0%, rgba(0, 242, 254, 0.05) 100%)',
        filter: 'blur(100px)',
        borderRadius: '9999px',
        zIndex: 0
      }} />

      <div style={{
        position: 'fixed',
        top: '600px',
        left: '200px',
        width: '400px',
        height: '400px',
        background: 'linear-gradient(90deg, rgba(79, 172, 254, 0.10) 0%, rgba(0, 242, 254, 0.05) 100%)',
        filter: 'blur(100px)',
        borderRadius: '9999px',
        opacity: 0.8,
        zIndex: 0
      }} />

      {/* 弹窗组件 */}
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <MembershipModal />

      {/* 页面内容 */}
      <AppHeader />
      <HeroSection />
      <AIStepsSection />
      <ArticlesSection />
      <FeaturesSection />
      <ResourcesSection />
      <CTASection />
      <AppFooter />
    </div>
  )
}
