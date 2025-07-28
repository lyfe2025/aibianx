'use client'

import { Container } from '@/components/ui'
import {
    PageHeader,
    StatsSection,
    MissionSection,
    WhyChooseSection,
    MembershipSectionNew,
    ContactSectionNew
} from '@/components/molecules'
import { ABOUT_CONTENT } from '@/constants/about'

/**
 * AboutPage 组件 - 关于我们页面
 * 
 * 功能特性：
 * - 页面标题和描述
 * - 我们的使命区域
 * - 成为会员区域
 * - 为什么选择我们
 * - 平台数据展示
 * - 联系我们区域
 * 
 * 设计规范：
 * - 1440px容器最大宽度
 * - 毛玻璃效果和渐变设计
 * - 响应式适配移动端
 * - 组件化模块设计
 */
export default function AboutPage() {
    return (
        <div style={{
            color: 'var(--color-text-primary)',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            minHeight: '100vh',
            paddingTop: '80px' // 为固定头部留出空间
        }}>
            <div style={{ paddingBottom: '80px' }}>
                <Container size="xl">
                    {/* Hero 区域 */}
                    <PageHeader
                        title={ABOUT_CONTENT.pageTitle}
                        subtitle={ABOUT_CONTENT.pageSubtitle}
                        description=""
                        alignment="center"
                        className="page-header"
                    />

                    {/* 我们的使命 */}
                    <MissionSection />

                    {/* 成为会员区域 */}
                    <MembershipSectionNew />

                    {/* 为什么选择我们 */}
                    <WhyChooseSection />

                    {/* 平台数据 */}
                    <StatsSection />

                    {/* 联系我们 */}
                    <ContactSectionNew />
                </Container>
            </div>
        </div>
    )
} 