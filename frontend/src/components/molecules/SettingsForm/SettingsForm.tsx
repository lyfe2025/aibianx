'use client'

import React, { useState } from 'react'
import { Icon, Input, GradientButton, Avatar } from '@/components/ui'
import styles from './SettingsForm.module.css'

interface SettingsFormProps {
    className?: string
}

interface FormData {
    nickname: string
    email: string
    phone: string
    bio: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
    notifications: {
        email: boolean
        push: boolean
        marketing: boolean
    }
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ className = '' }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile')
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        nickname: '李明阳',
        email: 'liming***@gmail.com',
        phone: '138****8888',
        bio: 'AI 创业者，专注于人工智能变现和商业化应用研究。',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        notifications: {
            email: true,
            push: true,
            marketing: false
        }
    })

    const tabs = [
        { key: 'profile', label: '个人资料', icon: 'user-icon' },
        { key: 'security', label: '安全设置', icon: 'password-icon' },
        { key: 'notifications', label: '通知设置', icon: 'notification-icon' }
    ]

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleNotificationChange = (key: keyof FormData['notifications'], value: boolean) => {
        setFormData(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: value
            }
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // 处理表单提交
        console.log('Settings updated:', formData)
        setIsEditing(false)
    }

    const renderProfileTab = () => (
        <div className={`${className} settings-form__profile`}>
            <div className="settings-form__section">
                <div className="section-header">
                    <h3 className="section-title">头像</h3>
                </div>
                <div className="avatar-section">
                    <Avatar
                        src="/images/avatars/author-li-mingyang.jpeg"
                        alt="用户头像"
                        size="lg"
                        className="avatar-large"
                    />
                    <div className="avatar-actions">
                        <GradientButton variant="outline" size="sm">
                            <Icon name="upload-icon" size="xs" />
                            更换头像
                        </GradientButton>
                        <p className="avatar-tip">支持 JPG、PNG 格式，文件大小不超过 5MB</p>
                    </div>
                </div>
            </div>

            <div className="settings-form__section">
                <div className="section-header">
                    <h3 className="section-title">基本信息</h3>
                </div>
                <div className="form-grid">
                    <Input
                        label="昵称"
                        value={formData.nickname}
                        onChange={(value) => handleInputChange('nickname', value)}
                        disabled={!isEditing}
                        placeholder="请输入昵称"
                    />
                    <Input
                        label="邮箱"
                        type="email"
                        value={formData.email}
                        onChange={(value) => handleInputChange('email', value)}
                        disabled={!isEditing}
                        placeholder="请输入邮箱地址"
                    />
                    <Input
                        label="手机号"
                        value={formData.phone}
                        onChange={(value) => handleInputChange('phone', value)}
                        disabled={!isEditing}
                        placeholder="请输入手机号"
                    />
                </div>
                <div className="form-field">
                    <label className="field-label">个人简介</label>
                    <textarea
                        className="bio-textarea"
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        placeholder="介绍一下自己..."
                        rows={4}
                    />
                </div>
            </div>

            <div className="form-actions">
                {!isEditing ? (
                    <GradientButton onClick={() => setIsEditing(true)}>
                        编辑资料
                    </GradientButton>
                ) : (
                    <div className="edit-actions">
                        <GradientButton variant="outline" onClick={() => setIsEditing(false)}>
                            取消
                        </GradientButton>
                        <GradientButton onClick={handleSubmit}>
                            保存修改
                        </GradientButton>
                    </div>
                )}
            </div>
        </div>
    )

    const renderSecurityTab = () => (
        <div className="settings-form__security">
            <div className="settings-form__section">
                <div className="section-header">
                    <h3 className="section-title">修改密码</h3>
                    <p className="section-description">定期更新密码，保障账户安全</p>
                </div>
                <div className="form-grid">
                    <Input
                        label="当前密码"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(value) => handleInputChange('currentPassword', value)}
                        placeholder="请输入当前密码"
                    />
                    <Input
                        label="新密码"
                        type="password"
                        value={formData.newPassword}
                        onChange={(value) => handleInputChange('newPassword', value)}
                        placeholder="请输入新密码"
                    />
                    <Input
                        label="确认密码"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(value) => handleInputChange('confirmPassword', value)}
                        placeholder="请再次输入新密码"
                    />
                </div>
            </div>

            <div className="settings-form__section">
                <div className="section-header">
                    <h3 className="section-title">登录设备</h3>
                    <p className="section-description">管理登录过的设备</p>
                </div>
                <div className="device-list">
                    <div className="device-item">
                        <div className="device-icon">
                            <Icon name="device-desktop" size="md" />
                        </div>
                        <div className="device-info">
                            <h4 className="device-name">Chrome 浏览器 (当前设备)</h4>
                            <p className="device-detail">Windows 10 • 上海 • 刚刚活跃</p>
                        </div>
                        <span className="device-status">当前设备</span>
                    </div>
                    <div className="device-item">
                        <div className="device-icon">
                            <Icon name="device-mobile" size="md" />
                        </div>
                        <div className="device-info">
                            <h4 className="device-name">iPhone Safari</h4>
                            <p className="device-detail">iOS 17.1 • 北京 • 2天前</p>
                        </div>
                        <button className="device-action">移除</button>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <GradientButton onClick={handleSubmit}>
                    更新密码
                </GradientButton>
            </div>
        </div>
    )

    const renderNotificationsTab = () => (
        <div className="settings-form__notifications">
            <div className="settings-form__section">
                <div className="section-header">
                    <h3 className="section-title">通知偏好</h3>
                    <p className="section-description">管理您接收通知的方式</p>
                </div>

                <div className="notification-list">
                    <div className="notification-item">
                        <div className="notification-info">
                            <h4 className="notification-title">邮件通知</h4>
                            <p className="notification-description">接收重要更新和账户相关邮件</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={formData.notifications.email}
                                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="notification-item">
                        <div className="notification-info">
                            <h4 className="notification-title">推送通知</h4>
                            <p className="notification-description">接收浏览器推送消息</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={formData.notifications.push}
                                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="notification-item">
                        <div className="notification-info">
                            <h4 className="notification-title">营销邮件</h4>
                            <p className="notification-description">接收产品更新和推广信息</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={formData.notifications.marketing}
                                onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <GradientButton onClick={handleSubmit}>
                    保存设置
                </GradientButton>
            </div>
        </div>
    )

      return (
    <div className={`${styles.settingsForm} ${className}`}>
      <div className={styles.settingsFormTabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            <Icon name={tab.icon} size="sm" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.settingsFormContent}>
                {activeTab === 'profile' && renderProfileTab()}
                {activeTab === 'security' && renderSecurityTab()}
                {activeTab === 'notifications' && renderNotificationsTab()}
            </div>
        </div>
    )
}

export default SettingsForm 