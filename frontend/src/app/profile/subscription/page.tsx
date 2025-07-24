'use client'

import React from 'react'
import { Container, Icon, GradientText, GradientButton } from '@/components/ui'
import { UserSidebar } from '@/components/molecules'

export default function SubscriptionPage() {
  // 当前订阅信息
  const currentSubscription = {
    plan: '高级会员',
    expiryDate: '2024年12月31日',
    remainingDays: 245,
    status: 'active',
    benefits: [
      '全站文章无限制阅读',
      'AI工具库完整访问',
      '高级教程专享权限',
      '专属社群交流机会',
      '一对一咨询服务 (每月1次)',
      '优先享受新功能'
    ]
  }

  // 历史订阅记录
  const subscriptionHistory = [
    {
      id: 'sub_001',
      plan: '高级会员',
      period: '2024.01.01 - 2024.12.31',
      price: '¥399',
      status: '有效',
      paymentMethod: '支付宝',
      purchaseDate: '2024-01-01'
    },
    {
      id: 'sub_002',
      plan: '基础会员',
      period: '2023.06.01 - 2023.12.31',
      price: '¥199',
      status: '已过期',
      paymentMethod: '微信支付',
      purchaseDate: '2023-06-01'
    },
    {
      id: 'sub_003',
      plan: '基础会员',
      period: '2023.01.01 - 2023.06.01',
      price: '¥199',
      status: '已过期',
      paymentMethod: '支付宝',
      purchaseDate: '2023-01-01'
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
                }}>我的订阅</h1>
              </div>

              {/* 当前订阅状态卡片 */}
              <div style={{
                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.20) 0%, rgba(139, 92, 246, 0.20) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: '12px',
                padding: '25px',
                marginBottom: 'var(--card-gap-lg)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <h2 style={{
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontWeight: '700',
                        lineHeight: '28px',
                        margin: 0
                      }}>{currentSubscription.plan}</h2>
                      <div style={{
                        background: 'linear-gradient(90deg, #FACC15 0%, #CA8A04 100%)',
                        borderRadius: '9999px',
                        padding: '2px 8px'
                      }}>
                        <span style={{
                          color: '#FFFFFF',
                          fontSize: '12px',
                          lineHeight: '16px'
                        }}>当前方案</span>
                      </div>
                    </div>
                    <p style={{
                      color: '#D1D5DB',
                      fontSize: '16px',
                      lineHeight: '24px',
                      margin: 0
                    }}>到期时间: {currentSubscription.expiryDate} (剩余{currentSubscription.remainingDays}天)</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <GradientButton size="md" variant="outline">
                      <Icon name="adjust-icon-detail" size="xs" style={{ marginRight: '8px' }} />
                      管理订阅
                    </GradientButton>
                    <GradientButton size="md" variant="primary">
                      立即续费
                      <Icon name="arrow-right" size="xs" style={{ marginLeft: '8px' }} />
                    </GradientButton>
                  </div>
                </div>

                {/* 订阅权益展示 */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.10)',
                  paddingTop: '20px'
                }}>
                  <h3 style={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '24px',
                    margin: '0 0 16px 0'
                  }}>专属会员权益</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '12px'
                  }}>
                    {currentSubscription.benefits.map((benefit, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <Icon name="success-check" size="xs" style={{ color: '#22C55E' }} />
                        <span style={{
                          color: '#D1D5DB',
                          fontSize: '14px',
                          lineHeight: '20px'
                        }}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 订阅历史 */}
              <div style={{ marginBottom: 'var(--card-gap-lg)' }}>
                <h2 style={{
                  color: '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: '700',
                  lineHeight: '28px',
                  margin: '0 0 20px 0'
                }}>订阅历史</h2>

                <div style={{
                  background: 'rgba(26, 26, 26, 0.30)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(42, 42, 42, 0.70)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  {/* 表头 */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '16px 20px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 200px 120px 100px 120px 80px',
                    gap: '16px',
                    borderBottom: '1px solid rgba(42, 42, 42, 0.70)'
                  }}>
                    <span style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '20px'
                    }}>套餐</span>
                    <span style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '20px'
                    }}>有效期</span>
                    <span style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '20px'
                    }}>金额</span>
                    <span style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '20px'
                    }}>状态</span>
                    <span style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '20px'
                    }}>支付方式</span>
                    <span style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '20px'
                    }}>操作</span>
                  </div>

                  {/* 订阅记录 */}
                  {subscriptionHistory.map((record, index) => (
                    <div key={record.id} style={{
                      padding: '16px 20px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 200px 120px 100px 120px 80px',
                      gap: '16px',
                      alignItems: 'center',
                      borderBottom: index < subscriptionHistory.length - 1 ? '1px solid rgba(42, 42, 42, 0.70)' : 'none'
                    }}>
                      <div>
                        <div style={{
                          color: '#FFFFFF',
                          fontSize: '16px',
                          fontWeight: '500',
                          lineHeight: '24px',
                          marginBottom: '4px'
                        }}>{record.plan}</div>
                        <div style={{
                          color: '#9CA3AF',
                          fontSize: '12px',
                          lineHeight: '16px'
                        }}>订单号: {record.id}</div>
                      </div>

                      <span style={{
                        color: '#D1D5DB',
                        fontSize: '14px',
                        lineHeight: '20px'
                      }}>{record.period}</span>

                      <span style={{
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: '600',
                        lineHeight: '24px'
                      }}>{record.price}</span>

                      <div style={{
                        background: record.status === '有效' ? 'rgba(34, 197, 94, 0.10)' : 'rgba(156, 163, 175, 0.10)',
                        color: record.status === '有效' ? '#22C55E' : '#9CA3AF',
                        fontSize: '12px',
                        lineHeight: '16px',
                        padding: '4px 8px',
                        borderRadius: '9999px',
                        textAlign: 'center'
                      }}>
                        {record.status}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Icon
                          name={record.paymentMethod === '支付宝' ? 'payments/alipay-icon' : 'payments/wechat-pay-icon'}
                          size="xs"
                        />
                        <span style={{
                          color: '#D1D5DB',
                          fontSize: '12px',
                          lineHeight: '16px'
                        }}>{record.paymentMethod}</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          color: '#60A5FA',
                          fontSize: '12px',
                          lineHeight: '16px'
                        }}>详情</span>
                        <Icon name="arrow-right" size="xs" style={{ color: '#60A5FA' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 常见问题和帮助 */}
              <div style={{
                background: 'rgba(26, 26, 26, 0.30)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(42, 42, 42, 0.70)',
                borderRadius: '12px',
                padding: '21px'
              }}>
                <h3 style={{
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: '600',
                  lineHeight: '28px',
                  margin: '0 0 16px 0'
                }}>订阅管理帮助</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      background: 'rgba(59, 130, 246, 0.20)',
                      borderRadius: '8px',
                      padding: '8px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon name="help-icon" size="sm" style={{ color: '#3B82F6' }} />
                    </div>
                    <div>
                      <div style={{
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontWeight: '500',
                        lineHeight: '20px',
                        marginBottom: '2px'
                      }}>如何取消订阅</div>
                      <div style={{
                        color: '#9CA3AF',
                        fontSize: '12px',
                        lineHeight: '16px'
                      }}>了解取消流程和注意事项</div>
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      background: 'rgba(34, 197, 94, 0.20)',
                      borderRadius: '8px',
                      padding: '8px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon name="success-check" size="sm" style={{ color: '#22C55E' }} />
                    </div>
                    <div>
                      <div style={{
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontWeight: '500',
                        lineHeight: '20px',
                        marginBottom: '2px'
                      }}>自动续费设置</div>
                      <div style={{
                        color: '#9CA3AF',
                        fontSize: '12px',
                        lineHeight: '16px'
                      }}>管理自动续费开关</div>
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      background: 'rgba(168, 85, 247, 0.20)',
                      borderRadius: '8px',
                      padding: '8px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon name="contact-icon" size="sm" style={{ color: '#A855F7' }} />
                    </div>
                    <div>
                      <div style={{
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontWeight: '500',
                        lineHeight: '20px',
                        marginBottom: '2px'
                      }}>联系客服</div>
                      <div style={{
                        color: '#9CA3AF',
                        fontSize: '12px',
                        lineHeight: '16px'
                      }}>专业客服团队为您服务</div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </main>
      </div>
    </div>
  )
} 