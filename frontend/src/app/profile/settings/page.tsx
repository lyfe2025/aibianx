'use client'

import React, { useState } from 'react'
import { Icon, GradientButton, Input, SettingsAvatar } from '@/components/ui'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    username: '张智创',
    phone: '138****5678',
    email: 'zhang****@example.com',
    bio: '介绍一下自己...'
  })

  // 安全设置相关状态
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    devices: [
      {
        id: 1,
        name: 'Chrome (macOS)',
        location: '北京',
        lastActive: '当前设备',
        isActive: true,
        icon: 'device-desktop'
      },
      {
        id: 2,
        name: 'iPhone App',
        location: '上海',
        lastActive: '3天前',
        isActive: false,
        icon: 'device-mobile'
      },
      {
        id: 3,
        name: 'Edge (Windows)',
        location: '深圳',
        lastActive: '1周前',
        isActive: false,
        icon: 'device-desktop'
      }
    ]
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecurityData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleReset = () => {
    if (activeTab === 'profile') {
      setFormData({
        username: '张智创',
        phone: '138****5678',
        email: 'zhang****@example.com',
        bio: '介绍一下自己...'
      })
    } else if (activeTab === 'security') {
      setSecurityData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }))
    }
  }

  const handleSave = () => {
    if (activeTab === 'profile') {
      console.log('保存个人信息:', formData)
    } else if (activeTab === 'security') {
      console.log('保存安全设置:', securityData)
    }
  }

  const handleRemoveDevice = (deviceId: number) => {
    setSecurityData(prev => ({
      ...prev,
      devices: prev.devices.filter(device => device.id !== deviceId)
    }))
  }

  return (
    <div
      className="settings-page"
      style={{
        padding: '32px 40px',
        maxWidth: '1440px',
        margin: '0 auto'
      }}>
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
        background: 'rgba(26, 26, 26, 0.30)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(42, 42, 42, 0.70)',
        borderRadius: '12px',
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
        <div style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.10)',
          display: 'flex',
          alignItems: 'stretch',
          paddingBottom: '1px',
          flexWrap: 'nowrap',
          overflow: 'hidden'
        }}>
          <div
            onClick={() => setActiveTab('profile')}
            style={{
              background: activeTab === 'profile'
                ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.10) 0%, rgba(139, 92, 246, 0.10) 100%)'
                : 'transparent',
              display: 'flex',
              minWidth: '140px',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '16px',
              paddingBottom: '16px',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <div style={{
              color: activeTab === 'profile' ? '#FFFFFF' : '#9CA3AF',
              fontWeight: '600',
              lineHeight: '24px',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              minHeight: '24px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: '90px'
            }}>
              个人信息
            </div>
          </div>
          <div
            onClick={() => setActiveTab('security')}
            style={{
              background: activeTab === 'security'
                ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.10) 0%, rgba(139, 92, 246, 0.10) 100%)'
                : 'transparent',
              display: 'flex',
              minWidth: '140px',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '16px',
              paddingBottom: '16px',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <div style={{
              color: activeTab === 'security' ? '#FFFFFF' : '#9CA3AF',
              fontWeight: '600',
              lineHeight: '24px',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              minHeight: '24px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: '90px'
            }}>
              密码安全
            </div>
          </div>
        </div>

        {/* 个人信息界面 */}
        {activeTab === 'profile' && (
          <>
            {/* 头像区域 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '24px',
              marginBottom: '32px',
              gap: '16px',
              paddingBottom: '32px'
            }}>
              <SettingsAvatar
                src="/images/avatars/user-zhang-zhichuang.svg"
                alt="张智创"
                onEdit={() => {
                  console.log('Edit avatar clicked')
                  // 这里可以添加头像编辑逻辑
                }}
              />

              {/* 上传提示 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}>
                <div
                  className="avatar-edit-text"
                  style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: '20px',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    fontWeight: '500'
                  }}>
                  更换头像
                </div>
                <div style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--font-size-xs)',
                  lineHeight: '16px',
                  textAlign: 'center'
                }}>
                  支持 JPG、PNG 格式，文件大小不超过 2MB
                </div>
              </div>
            </div>



            {/* 表单区域 */}
            <div
              className="settings-form-card"
              style={{
                background: 'rgba(26, 26, 26, 0.3)',
                borderRadius: '12px',
                padding: '32px',
                margin: '0 48px',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(42, 42, 42, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '28px'
              }}>
              {/* 用户名 */}
              <div
                className="settings-form-row"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: '24px'
                }}>
                <div
                  className="settings-form-label"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: '20px',
                    textAlign: 'right',
                    width: '100px',
                    paddingTop: '14px',
                    flexShrink: 0,
                    fontWeight: '500'
                  }}>
                  用户名
                </div>
                <div style={{ flex: 1, maxWidth: '544px' }}>
                  <Input
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="请输入用户名"
                    fullWidth={true}
                  />
                </div>
              </div>

              {/* 手机号码 */}
              <div
                className="settings-form-row"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: '24px'
                }}>
                <div
                  className="settings-form-label"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: '20px',
                    textAlign: 'right',
                    width: '100px',
                    paddingTop: '14px',
                    flexShrink: 0,
                    fontWeight: '500'
                  }}>
                  手机号码
                </div>
                <div style={{ flex: 1, maxWidth: '544px' }}>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="请输入手机号码"
                    fullWidth={true}
                  />
                </div>
              </div>

              {/* 邮箱地址 */}
              <div
                className="settings-form-row"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: '24px'
                }}>
                <div
                  className="settings-form-label"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: '20px',
                    textAlign: 'right',
                    width: '100px',
                    paddingTop: '14px',
                    flexShrink: 0,
                    fontWeight: '500'
                  }}>
                  邮箱地址
                </div>
                <div style={{ flex: 1, maxWidth: '544px' }}>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="请输入邮箱地址"
                    fullWidth={true}
                  />
                </div>
              </div>

              {/* 个人简介 */}
              <div
                className="settings-form-row"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: '24px'
                }}>
                <div
                  className="settings-form-label"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: '20px',
                    textAlign: 'right',
                    width: '100px',
                    paddingTop: '16px',
                    flexShrink: 0,
                    fontWeight: '500'
                  }}>
                  个人简介
                </div>
                <div style={{ flex: 1, maxWidth: '544px' }}>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="介绍一下自己..."
                    className="bio-textarea"
                    style={{
                      width: '100%',
                      minHeight: '96px',
                      padding: '16px',
                      background: 'rgba(18, 18, 18, 0.50)',
                      border: '1px solid rgba(42, 42, 42, 0.70)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                      color: 'var(--color-text-primary)',
                      fontSize: '14px',
                      lineHeight: '20px',
                      resize: 'vertical',
                      fontFamily: 'var(--font-family-primary)',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* 密码安全界面 */}
        {activeTab === 'security' && (
          <div style={{
            marginTop: '32px',
            paddingLeft: '48px',
            paddingRight: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            {/* 修改密码区域 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <div style={{
                color: 'var(--color-text-primary)',
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '28px',
                marginBottom: '24px'
              }}>
                修改密码
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* 当前密码 */}
                <Input
                  label="当前密码"
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                  placeholder="请输入当前密码"
                  fullWidth={true}
                />

                {/* 新密码 */}
                <Input
                  label="新密码"
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                  placeholder="请输入新密码"
                  helperText="密码长度至少8位，包含字母、数字和特殊字符"
                  fullWidth={true}
                />

                {/* 确认新密码 */}
                <Input
                  label="确认新密码"
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                  placeholder="请再次输入新密码"
                  fullWidth={true}
                />
              </div>
            </div>

            {/* 两步验证区域 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <div style={{
                    color: 'var(--color-text-primary)',
                    fontSize: '18px',
                    fontWeight: '600',
                    lineHeight: '28px',
                    marginBottom: '8px'
                  }}>
                    两步验证
                  </div>
                  <div style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '14px',
                    lineHeight: '20px',
                    marginBottom: '8px'
                  }}>
                    增强账户安全性，推荐开启
                  </div>
                  <div style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '12px',
                    lineHeight: '16px'
                  }}>
                    启用后登录时需要验证码确认身份
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    color: securityData.twoFactorEnabled ? '#22C55E' : '#9CA3AF',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {securityData.twoFactorEnabled ? '已启用' : '未启用'}
                  </div>
                  <button
                    onClick={() => handleSecurityChange('twoFactorEnabled', !securityData.twoFactorEnabled)}
                    style={{
                      background: securityData.twoFactorEnabled
                        ? 'rgba(255, 255, 255, 0.10)'
                        : 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                      border: securityData.twoFactorEnabled ? '1px solid rgba(255, 255, 255, 0.20)' : 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      color: 'var(--color-text-primary)',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    {securityData.twoFactorEnabled ? '关闭' : '启用'}
                  </button>
                </div>
              </div>
            </div>

            {/* 登录设备管理 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <div style={{
                color: 'var(--color-text-primary)',
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '28px',
                marginBottom: '24px'
              }}>
                登录设备管理
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {securityData.devices.map((device) => (
                  <div
                    key={device.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255, 255, 255, 0.10)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon
                          name={device.icon}
                          size="sm"
                          style={{
                            color: device.isActive ? '#22C55E' : '#9CA3AF'
                          }}
                        />
                      </div>
                      <div>
                        <div style={{
                          color: 'var(--color-text-primary)',
                          fontSize: '16px',
                          fontWeight: '500',
                          lineHeight: '24px'
                        }}>
                          {device.name}
                        </div>
                        <div style={{
                          color: 'var(--color-text-muted)',
                          fontSize: '12px',
                          lineHeight: '16px'
                        }}>
                          {device.lastActive} • {device.location}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      {device.isActive ? (
                        <span style={{
                          color: 'var(--color-success)',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: 'rgba(34, 197, 94, 0.10)',
                          padding: '4px 8px',
                          borderRadius: '4px'
                        }}>
                          活跃
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRemoveDevice(device.id)}
                          style={{
                            color: 'var(--color-error)',
                            fontSize: '12px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          移除
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 安全提示 */}
            <div style={{
              background: 'rgba(34, 197, 94, 0.10)',
              border: '1px solid rgba(34, 197, 94, 0.30)',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <Icon
                name="shield-check"
                size="sm"
                style={{ color: 'var(--color-success)', marginTop: '2px' }}
              />
              <div>
                <div style={{
                  color: 'var(--color-success)',
                  fontSize: '14px',
                  fontWeight: '600',
                  lineHeight: '20px',
                  marginBottom: '4px'
                }}>
                  安全提示
                </div>
                <div style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '13px',
                  lineHeight: '18px'
                }}>
                  • 定期更新密码，使用强密码组合
                  <br />
                  • 启用两步验证提高账户安全性
                  <br />
                  • 及时清理不使用的登录设备
                  <br />
                  • 不在公共场所或他人设备上登录
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 底部按钮 */}
        <div
          className="settings-buttons"
          style={{
            marginTop: '40px',
            paddingLeft: '48px',
            paddingRight: '48px',
            paddingBottom: '24px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            borderTop: '1px solid rgba(42, 42, 42, 0.3)',
            paddingTop: '24px'
          }}>
          <GradientButton
            variant="outline"
            size="md"
            onClick={handleReset}
            style={{
              minWidth: '100px',
              height: '44px'
            }}
          >
            重置
          </GradientButton>
          <GradientButton
            variant="primary"
            size="md"
            onClick={handleSave}
            style={{
              minWidth: '100px',
              height: '44px'
            }}
          >
            保存更改
          </GradientButton>
        </div>
      </div>
    </div>
  )
} 