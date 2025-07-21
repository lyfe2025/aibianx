'use client'

import React from 'react'
import { Container } from '@/components/ui'
import { UserSidebar, SettingsForm } from '@/components/molecules'
import { Header, Footer } from '@/components/organisms'

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)]">
            <Header />

            <main className="settings-page">
                <Container size="xl" className="settings-container">
                    <div className="settings-layout">
                        {/* 左侧边栏 */}
                        <UserSidebar />

                        {/* 右侧主内容 */}
                        <div className="settings-main">
                            <div className="settings-header">
                                <h1 className="page-title">设置</h1>
                                <p className="page-description">管理您的个人信息、安全设置和偏好</p>
                            </div>

                            {/* 设置表单 */}
                            <SettingsForm />
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />

            <style jsx>{`
        .settings-page {
          padding: 32px 0 80px;
          min-height: calc(100vh - 80px);
        }

        .settings-container {
          max-width: 1440px;
        }

        .settings-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }

        .settings-main {
          flex: 1;
          max-width: calc(100% - 280px);
        }

        .settings-header {
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

        /* 响应式设计 */
        @media (max-width: 1024px) {
          .settings-layout {
            flex-direction: column;
          }

          .settings-main {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .settings-page {
            padding: 20px 0 60px;
          }

          .settings-layout {
            gap: 24px;
          }
        }
      `}</style>
        </div>
    )
} 