'use client'

import {
  SettingsTabNavigation,
  SettingsProfileTab,
  SettingsSecurityTab,
  SettingsActions
} from '@/components/molecules'
import { useSettingsLogic } from '@/lib/hooks'
import { SETTINGS_STYLES } from '@/constants/settingsConfig'

/**
 * SettingsPage 组件 - 设置页面
 * 
 * 功能特性：
 * - 标签页导航 (个人信息/密码安全)
 * - 个人信息管理
 * - 密码安全设置
 * - 设备管理
 * - 两步验证
 * 
 * 设计规范：
 * - 1440px容器最大宽度
 * - 毛玻璃效果卡片设计
 * - 模块化组件架构
 * - 响应式交互设计
 */
export default function SettingsPage() {
  const {
    // 状态
    activeTab,
    formData,
    securityData,

    // 事件处理函数
    setActiveTab,
    handleInputChange,
    handleSecurityChange,
    handleReset,
    handleSave,
    handleRemoveDevice,
    handleAvatarEdit
  } = useSettingsLogic()

  return (
    <div
      className="settings-page"
      style={SETTINGS_STYLES.page}>
      {/* 页面标题 */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: '32px',
        marginBottom: '32px'
      }}>
        <div style={{
          color: 'var(--color-text-primary)',
          fontSize: '24px',
          fontWeight: '700',
          lineHeight: '32px',
          width: '48px',
          alignItems: 'center',
          display: 'flex'
        }}>
          设置
        </div>
      </div>

      {/* 主要内容卡片 */}
      <div style={{
        ...SETTINGS_STYLES.card,
        overflow: 'hidden',
        gap: '16px',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1px',
        paddingRight: '1px',
        paddingTop: '1px',
        paddingBottom: '33px'
      }}>
        {/* 标签页导航 */}
        <SettingsTabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* 个人信息标签页 */}
        {activeTab === 'profile' && (
          <SettingsProfileTab
            formData={formData}
            onInputChange={handleInputChange}
            onAvatarEdit={handleAvatarEdit}
          />
        )}

        {/* 密码安全标签页 */}
        {activeTab === 'security' && (
          <SettingsSecurityTab
            securityData={securityData}
            onSecurityChange={handleSecurityChange}
            onRemoveDevice={handleRemoveDevice}
          />
        )}

        {/* 底部操作按钮 */}
        <SettingsActions
          onReset={handleReset}
          onSave={handleSave}
        />
      </div>
    </div>
  )
} 