'use client'

import {
  HeroSectionNew,
  AIStepsSectionNew,
  MainContentSection,
  FreeResourcesSection,
  FinalCTASection
} from '@/components/molecules'
import {
  LoginModal,
  RegisterModal,
  ForgotPasswordModal,
  MembershipModal
} from '@/components/organisms'

/**
 * 首页组件 - HomePage
 * 
 * 根据设计稿精确还原的首页，包含以下区块：
 * 1. HeroSectionNew - 英雄区块（主标题、副标题、设备展示、邮箱订阅）
 * 2. AIStepsSectionNew - AI变现5步骤展示
 * 3. MainContentSection - 主要内容区（文章列表 + 侧边栏）
 * 4. FreeResourcesSection - 免费精选资源4卡片
 * 5. FinalCTASection - 最终行动召唤区块
 * 
 * 注意：
 * - 顶部导航和底部导航使用公共组件（AppHeader、AppFooter），在layout.tsx中引用
 * - 所有组件都使用纯CSS实现，确保100%设计稿还原
 * - 响应式设计已内置在各个组件中
 * - 模态框组件用于处理用户登录、注册、会员订阅等交互
 */
export default function HomePage() {
  return (
    <>
      {/* 英雄区块 - "AI变现从这里开始" */}
      <HeroSectionNew />

      {/* AI变现步骤区块 - 5个步骤展示 */}
      <AIStepsSectionNew />

      {/* 主要内容区块 - 文章列表与侧边栏 */}
      <MainContentSection />

      {/* 免费精选资源区块 - 4个资源卡片 */}
      <FreeResourcesSection />

      {/* 最终行动召唤区块 - "成为AI时代的赢家" */}
      <FinalCTASection />

      {/* 模态框组件 - 用户交互功能 */}
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <MembershipModal />
    </>
  )
}
