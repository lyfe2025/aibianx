'use client'

import React, { useState } from 'react'
import { Container, Icon, GradientText, GradientButton, Input } from '@/components/ui'
import { UserSidebar } from '@/components/molecules'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    username: '张智创',
    email: 'zhangzhichuang@example.com',
    phone: '138****8888',
    avatar: '/images/avatars/user-zhang.jpeg',
    bio: 'AI爱好者，专注于人工智能在商业场景的应用研究',
    company: '智创科技有限公司',
    position: '产品经理',
    website: 'https://zhangzhichuang.com',
    notifications: {
      email: true,
      push: true,
      updates: false,
      marketing: false
    },
    privacy: {
      profile: 'public',
      activity: 'friends',
      email: 'private'
    }
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleToggle = (section: string, field: string) => {
    setFormData(prev => {
      if (section === 'notifications') {
        return {
          ...prev,
          notifications: {
            ...prev.notifications,
            [field]: !prev.notifications[field as keyof typeof prev.notifications]
          }
        }
      } else if (section === 'privacy') {
        return {
          ...prev,
          privacy: {
            ...prev.privacy,
            [field]: prev.privacy[field as keyof typeof prev.privacy] === 'public' ? 'private' : 'public'
          }
        }
      }
      return prev
    })
  }

  const settingsSections = [
    {
      id: 'profile',
      title: '个人信息',
      icon: 'user-icon',
      description: '管理您的基本信息'
    },
    {
      id: 'security',
      title: '安全设置',
      icon: 'security-tips',
      description: '密码和安全相关设置'
    },
    {
      id: 'notifications',
      title: '通知设置',
      icon: 'notification-icon',
      description: '管理通知偏好'
    },
    {
      id: 'privacy',
      title: '隐私设置',
      icon: 'adjust-icon-detail',
      description: '控制信息可见性'
    }
  ]

  return (
    <div className="min-h-screen bg-transparent"> {/* 改为透明，让粒子可见 */}
      <div className="flex">
        {/* 左侧导航栏 - 使用UserSidebar组件 */}
        <UserSidebar />

        {/* 右侧主内容区域 */}
        <main style={{ flex: 1 }}>
          <div style={{ padding: '32px 40px' }}>
            <Container size="xl">
              {/* 页面标题 */}
              <div style={{ marginBottom: 'var(--card-gap-lg)' }}>
                <h1 style={{
                  color: '#FFFFFF',
                  fontSize: '24px',
                  fontWeight: '700',
                  lineHeight: '32px',
                  margin: 0
                }}>设置</h1>
              </div>

              <div style={{ display: 'flex', gap: '32px' }}>
                {/* 左侧设置导航 */}
                <div style={{
                  width: '280px',
                  background: 'rgba(26, 26, 26, 0.30)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(42, 42, 42, 0.70)',
                  borderRadius: '12px',
                  padding: '20px',
                  height: 'fit-content'
                }}>
                  <h3 style={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '24px',
                    margin: '0 0 16px 0'
                  }}>设置分类</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {settingsSections.map((section) => (
                      <div
                        key={section.id}
                        onClick={() => setActiveTab(section.id)}
                        style={{
                          background: activeTab === section.id ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.20) 0%, rgba(139, 92, 246, 0.20) 100%)' : 'transparent',
                          borderRadius: '8px',
                          padding: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                      >
                        <Icon
                          name={section.icon}
                          size="sm"
                          style={{
                            color: activeTab === section.id ? '#FFFFFF' : '#9CA3AF'
                          }}
                        />
                        <div>
                          <div style={{
                            color: activeTab === section.id ? '#FFFFFF' : '#D1D5DB',
                            fontSize: '14px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            marginBottom: '2px'
                          }}>{section.title}</div>
                          <div style={{
                            color: '#9CA3AF',
                            fontSize: '12px',
                            lineHeight: '16px'
                          }}>{section.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 右侧设置内容 */}
                <div style={{ flex: 1 }}>
                  {/* 个人信息设置 */}
                  {activeTab === 'profile' && (
                    <div style={{
                      background: 'rgba(26, 26, 26, 0.30)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(42, 42, 42, 0.70)',
                      borderRadius: '12px',
                      padding: '24px'
                    }}>
                      <h2 style={{
                        color: '#FFFFFF',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '28px',
                        margin: '0 0 20px 0'
                      }}>个人信息</h2>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* 头像设置 */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          paddingBottom: '20px',
                          borderBottom: '1px solid rgba(42, 42, 42, 0.50)'
                        }}>
                          <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(180deg, #374151 0%, #111827 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon name="user-icon" size="lg" style={{ color: '#FFFFFF' }} />
                          </div>
                          <div>
                            <div style={{
                              color: '#FFFFFF',
                              fontSize: '16px',
                              fontWeight: '500',
                              lineHeight: '24px',
                              marginBottom: '4px'
                            }}>更改头像</div>
                            <div style={{
                              color: '#9CA3AF',
                              fontSize: '12px',
                              lineHeight: '16px',
                              marginBottom: '8px'
                            }}>支持 JPG、PNG 格式，建议尺寸 200x200</div>
                            <GradientButton size="sm" variant="outline">
                              选择文件
                            </GradientButton>
                          </div>
                        </div>

                        {/* 基本信息表单 */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '16px'
                        }}>
                          <Input
                            label="用户名"
                            value={formData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            placeholder="请输入用户名"
                          />
                          <Input
                            label="邮箱地址"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="请输入邮箱地址"
                          />
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '16px'
                        }}>
                          <Input
                            label="手机号码"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="请输入手机号码"
                          />
                          <Input
                            label="职位"
                            value={formData.position}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            placeholder="请输入职位"
                          />
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '16px'
                        }}>
                          <Input
                            label="公司"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            placeholder="请输入公司名称"
                          />
                          <Input
                            label="个人网站"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            placeholder="请输入个人网站"
                          />
                        </div>

                        <div>
                          <label style={{
                            color: '#D1D5DB',
                            fontSize: '14px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            display: 'block',
                            marginBottom: '8px'
                          }}>个人简介</label>
                          <textarea
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            placeholder="请输入个人简介"
                            style={{
                              width: '100%',
                              height: '80px',
                              background: 'rgba(18, 18, 18, 0.50)',
                              backdropFilter: 'blur(4px)',
                              border: '1px solid rgba(42, 42, 42, 0.70)',
                              borderRadius: '8px',
                              padding: '12px',
                              color: '#FFFFFF',
                              fontSize: '14px',
                              lineHeight: '20px',
                              resize: 'vertical'
                            }}
                          />
                        </div>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: '12px',
                          paddingTop: '20px',
                          borderTop: '1px solid rgba(42, 42, 42, 0.50)'
                        }}>
                          <GradientButton variant="outline" size="md">
                            取消
                          </GradientButton>
                          <GradientButton variant="primary" size="md">
                            保存更改
                          </GradientButton>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 安全设置 */}
                  {activeTab === 'security' && (
                    <div style={{
                      background: 'rgba(26, 26, 26, 0.30)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(42, 42, 42, 0.70)',
                      borderRadius: '12px',
                      padding: '24px'
                    }}>
                      <h2 style={{
                        color: '#FFFFFF',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '28px',
                        margin: '0 0 20px 0'
                      }}>安全设置</h2>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* 密码修改 */}
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px',
                          padding: '20px'
                        }}>
                          <h3 style={{
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '500',
                            lineHeight: '24px',
                            margin: '0 0 12px 0'
                          }}>修改密码</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Input
                              label="当前密码"
                              type="password"
                              placeholder="请输入当前密码"
                            />
                            <Input
                              label="新密码"
                              type="password"
                              placeholder="请输入新密码"
                            />
                            <Input
                              label="确认新密码"
                              type="password"
                              placeholder="请再次输入新密码"
                            />
                            <div style={{ marginTop: '8px' }}>
                              <GradientButton variant="primary" size="md">
                                更新密码
                              </GradientButton>
                            </div>
                          </div>
                        </div>

                        {/* 两步验证 */}
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px',
                          padding: '20px'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '12px'
                          }}>
                            <div>
                              <h3 style={{
                                color: '#FFFFFF',
                                fontSize: '16px',
                                fontWeight: '500',
                                lineHeight: '24px',
                                margin: '0 0 4px 0'
                              }}>两步验证</h3>
                              <p style={{
                                color: '#9CA3AF',
                                fontSize: '14px',
                                lineHeight: '20px',
                                margin: 0
                              }}>增强账户安全性，推荐开启</p>
                            </div>
                            <GradientButton variant="outline" size="sm">
                              设置
                            </GradientButton>
                          </div>
                        </div>

                        {/* 登录设备管理 */}
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px',
                          padding: '20px'
                        }}>
                          <h3 style={{
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: '500',
                            lineHeight: '24px',
                            margin: '0 0 16px 0'
                          }}>登录设备</h3>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '12px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: '6px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Icon name="device-icon" size="sm" style={{ color: '#22C55E' }} />
                                <div>
                                  <div style={{
                                    color: '#FFFFFF',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    lineHeight: '20px'
                                  }}>Chrome (macOS)</div>
                                  <div style={{
                                    color: '#9CA3AF',
                                    fontSize: '12px',
                                    lineHeight: '16px'
                                  }}>当前设备 • 北京</div>
                                </div>
                              </div>
                              <span style={{
                                color: '#22C55E',
                                fontSize: '12px',
                                fontWeight: '500'
                              }}>活跃</span>
                            </div>

                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '12px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: '6px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Icon name="mobile-icon" size="sm" style={{ color: '#9CA3AF' }} />
                                <div>
                                  <div style={{
                                    color: '#FFFFFF',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    lineHeight: '20px'
                                  }}>iPhone App</div>
                                  <div style={{
                                    color: '#9CA3AF',
                                    fontSize: '12px',
                                    lineHeight: '16px'
                                  }}>3天前 • 上海</div>
                                </div>
                              </div>
                              <button style={{
                                color: '#EF4444',
                                fontSize: '12px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                              }}>移除</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 通知设置 */}
                  {activeTab === 'notifications' && (
                    <div style={{
                      background: 'rgba(26, 26, 26, 0.30)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(42, 42, 42, 0.70)',
                      borderRadius: '12px',
                      padding: '24px'
                    }}>
                      <h2 style={{
                        color: '#FFFFFF',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '28px',
                        margin: '0 0 20px 0'
                      }}>通知设置</h2>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                          { key: 'email', label: '邮件通知', description: '接收重要更新和提醒' },
                          { key: 'push', label: '推送通知', description: '浏览器推送消息' },
                          { key: 'updates', label: '产品更新', description: '新功能和改进通知' },
                          { key: 'marketing', label: '营销邮件', description: '促销活动和优惠信息' }
                        ].map((item) => (
                          <div key={item.key} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px'
                          }}>
                            <div>
                              <div style={{
                                color: '#FFFFFF',
                                fontSize: '16px',
                                fontWeight: '500',
                                lineHeight: '24px',
                                marginBottom: '4px'
                              }}>{item.label}</div>
                              <div style={{
                                color: '#9CA3AF',
                                fontSize: '14px',
                                lineHeight: '20px'
                              }}>{item.description}</div>
                            </div>
                            <label style={{
                              position: 'relative',
                              display: 'inline-block',
                              width: '44px',
                              height: '24px',
                              cursor: 'pointer'
                            }}>
                              <input
                                type="checkbox"
                                checked={formData.notifications[item.key as keyof typeof formData.notifications]}
                                onChange={() => handleToggle('notifications', item.key)}
                                style={{ opacity: 0, width: 0, height: 0 }}
                              />
                              <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: formData.notifications[item.key as keyof typeof formData.notifications]
                                  ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)'
                                  : 'rgba(55, 65, 81, 0.50)',
                                transition: 'all 0.2s ease',
                                borderRadius: '24px'
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  height: '18px',
                                  width: '18px',
                                  left: formData.notifications[item.key as keyof typeof formData.notifications] ? '23px' : '3px',
                                  bottom: '3px',
                                  background: '#FFFFFF',
                                  borderRadius: '50%',
                                  transition: 'all 0.2s ease'
                                }} />
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 隐私设置 */}
                  {activeTab === 'privacy' && (
                    <div style={{
                      background: 'rgba(26, 26, 26, 0.30)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(42, 42, 42, 0.70)',
                      borderRadius: '12px',
                      padding: '24px'
                    }}>
                      <h2 style={{
                        color: '#FFFFFF',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '28px',
                        margin: '0 0 20px 0'
                      }}>隐私设置</h2>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {[
                          { key: 'profile', label: '个人资料可见性', description: '控制他人查看您的基本信息', options: ['公开', '仅好友', '私密'] },
                          { key: 'activity', label: '活动状态', description: '显示您的在线状态和活动', options: ['公开', '仅好友', '隐藏'] },
                          { key: 'email', label: '邮箱可见性', description: '是否显示邮箱地址', options: ['公开', '仅好友', '私密'] }
                        ].map((item) => (
                          <div key={item.key} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            padding: '20px'
                          }}>
                            <div style={{
                              marginBottom: '16px'
                            }}>
                              <h3 style={{
                                color: '#FFFFFF',
                                fontSize: '16px',
                                fontWeight: '500',
                                lineHeight: '24px',
                                margin: '0 0 4px 0'
                              }}>{item.label}</h3>
                              <p style={{
                                color: '#9CA3AF',
                                fontSize: '14px',
                                lineHeight: '20px',
                                margin: 0
                              }}>{item.description}</p>
                            </div>
                            <div style={{
                              display: 'flex',
                              gap: '8px'
                            }}>
                              {item.options.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleInputChange(`privacy.${item.key}`, option.toLowerCase())}
                                  style={{
                                    background: formData.privacy[item.key as keyof typeof formData.privacy] === option.toLowerCase()
                                      ? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)'
                                      : 'rgba(255, 255, 255, 0.10)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '8px 16px',
                                    color: '#FFFFFF',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                  }}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </div>
        </main>
      </div>
    </div>
  )
} 