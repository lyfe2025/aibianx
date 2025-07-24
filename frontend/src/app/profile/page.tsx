'use client'

import React from 'react'
import { Container, Icon, GradientText, GradientButton } from '@/components/ui'
import { UserSidebar } from '@/components/molecules'

export default function ProfilePage() {
  // 统计数据
  const userStats = [
    {
      title: '已购课程',
      value: '12',
      icon: 'collect-icon-detail',
      gradient: 'linear-gradient(135deg, #3B82F6 15%, #06B6D4 85%)'
    },
    {
      title: '学习进度',
      value: '45%',
      icon: 'success-check',
      gradient: 'linear-gradient(135deg, #22C55E 15%, #34D399 85%)'
    },
    {
      title: '收藏资源',
      value: '28',
      icon: 'like-icon-detail',
      gradient: 'linear-gradient(135deg, #A855F7 15%, #EC4899 85%)'
    },
    {
      title: '积分',
      value: '3,250',
      icon: 'membership-check',
      gradient: 'linear-gradient(135deg, #FB923C 15%, #F59E0B 85%)'
    }
  ]

  // 收藏内容示例数据
  const bookmarkedItems = [
    {
      title: 'Midjourney高级提示词大全',
      category: 'AI工具',
      image: '/images/articles/midjourney-article.jpeg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'AI辅助内容创作工作流',
      category: '教程',
      image: '/images/articles/ai-content-automation.svg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'GPT-4高级应用案例',
      category: '案例',
      image: '/images/articles/gpt4-article.jpeg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'AI变现新思路：垂直领域应用',
      category: '文章',
      image: '/images/articles/ai-revenue-model.jpeg',
      collectedAt: '收藏于 3 天前'
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="flex">
        {/* 左侧导航栏 - 使用UserSidebar组件 */}
        <UserSidebar />

        {/* 右侧主内容区域 */}
        <main style={{ flex: 1 }}>
          <div style={{ padding: '32px 40px' }}>
            <Container size="xl">
              {/* 页面标题 */}
              <div style={{ marginBottom: '32px' }}>
                <h1 style={{
                  color: '#FFFFFF',
                  fontSize: '24px',
                  fontWeight: '700',
                  lineHeight: '32px',
                  margin: 0
                }}>个人中心</h1>
              </div>

              {/* 统计卡片 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(262px, 1fr))',
                gap: '24px',
                marginBottom: '40px'
              }}>
                {userStats.map((stat, index) => (
                  <div key={index} style={{
                    background: 'rgba(26, 26, 26, 0.30)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(42, 42, 42, 0.70)',
                    borderRadius: '12px',
                    padding: '21px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: stat.gradient,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px'
                    }}>
                      <Icon name={stat.icon} size="md" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div style={{
                      color: '#9CA3AF',
                      fontSize: '16px',
                      lineHeight: '24px',
                      marginBottom: '4px'
                    }}>{stat.title}</div>
                    <div style={{
                      color: '#FFFFFF',
                      fontSize: '24px',
                      fontWeight: '600',
                      lineHeight: '32px'
                    }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* 邀请奖励区域 */}
              <div style={{
                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.20) 0%, rgba(139, 92, 246, 0.20) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                borderRadius: '12px',
                padding: '25px',
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div>
                    <h3 style={{
                      color: '#FFFFFF',
                      fontSize: '20px',
                      fontWeight: '700',
                      lineHeight: '28px',
                      margin: '0 0 4px 0'
                    }}>邀请好友 双重奖励</h3>
                    <p style={{
                      color: '#D1D5DB',
                      fontSize: '16px',
                      lineHeight: '24px',
                      margin: 0
                    }}>邀请好友注册并开通会员，你和好友都将获得额外会员时长奖励</p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.10)',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Icon name="guidance-icon" size="xs" style={{ color: '#FFFFFF' }} />
                      <span style={{ color: '#FFFFFF', fontSize: '14px' }}>邀请攻略</span>
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.10)',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Icon name="rocket-icon" size="xs" style={{ color: '#FFFFFF' }} />
                      <span style={{ color: '#FFFFFF', fontSize: '14px' }}>提现记录</span>
                    </div>
                  </div>
                </div>

                {/* 邀请统计 */}
                <div style={{
                  display: 'flex',
                  gap: '50px',
                  alignItems: 'center'
                }}>
                  {/* 邀请码 */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    paddingRight: '25px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.10)'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.10)',
                      borderRadius: '8px',
                      padding: '12px',
                      width: '56px',
                      height: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon name="share-link-detail" size="lg" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div>
                      <div style={{
                        color: '#D1D5DB',
                        fontSize: '14px',
                        lineHeight: '20px',
                        marginBottom: '8px'
                      }}>您的专属邀请码</div>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          color: '#FFFFFF',
                          fontSize: '20px',
                          lineHeight: '28px'
                        }}>AI7859</span>
                        <Icon name="share-link-detail" size="xs" style={{ color: '#60A5FA' }} />
                        <span style={{ color: '#60A5FA', fontSize: '14px' }}>复制</span>
                      </div>
                    </div>
                  </div>

                  {/* 统计数据 */}
                  <div style={{ display: 'flex', gap: '50px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.10)',
                        borderRadius: '8px',
                        padding: '12px',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 8px'
                      }}>
                        <Icon name="users-stat" size="md" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div style={{
                        color: '#D1D5DB',
                        fontSize: '14px',
                        lineHeight: '20px',
                        marginBottom: '4px'
                      }}>已邀请人数</div>
                      <div style={{
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontWeight: '600',
                        lineHeight: '28px'
                      }}>18</div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.10)',
                        borderRadius: '8px',
                        padding: '12px',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 8px'
                      }}>
                        <Icon name="clock-icon" size="md" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div style={{
                        color: '#D1D5DB',
                        fontSize: '14px',
                        lineHeight: '20px',
                        marginBottom: '4px'
                      }}>待激活人数</div>
                      <div style={{
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontWeight: '600',
                        lineHeight: '28px'
                      }}>5</div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.10)',
                        borderRadius: '8px',
                        padding: '12px',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 8px'
                      }}>
                        <Icon name="rocket-icon" size="md" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div style={{
                        color: '#D1D5DB',
                        fontSize: '14px',
                        lineHeight: '20px',
                        marginBottom: '4px'
                      }}>累计返佣金额</div>
                      <div style={{
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontWeight: '600',
                        lineHeight: '28px'
                      }}>¥1,235</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 收藏内容区域 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  color: '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: '700',
                  lineHeight: '28px',
                  margin: 0
                }}>收藏内容</h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#60A5FA',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  <span style={{ marginRight: '4px' }}>查看全部</span>
                  <Icon name="arrow-right" size="xs" style={{ color: '#60A5FA' }} />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}>
                {bookmarkedItems.map((item, index) => (
                  <div key={index} style={{
                    background: 'rgba(26, 26, 26, 0.30)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(42, 42, 42, 0.70)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '128px',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      padding: '8px'
                    }}>
                      <div style={{
                        background: 'rgba(0, 0, 0, 0.50)',
                        borderRadius: '9999px',
                        padding: '4px 8px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        display: 'inline-block'
                      }}>{item.category}</div>
                    </div>
                    <div style={{ padding: '12px' }}>
                      <h4 style={{
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontWeight: '500',
                        lineHeight: '18px',
                        margin: '0 0 8px 0'
                      }}>{item.title}</h4>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <Icon name="clock-icon" size="xs" style={{ color: '#FACC15' }} />
                          <span style={{
                            color: '#FACC15',
                            fontSize: '12px',
                            lineHeight: '16px'
                          }}>{item.collectedAt}</span>
                        </div>
                        <Icon name="share-link-detail" size="xs" style={{ color: '#9CA3AF' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 订阅管理区域 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  color: '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: '700',
                  lineHeight: '28px',
                  margin: 0
                }}>订阅管理</h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#60A5FA',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  <span style={{ marginRight: '4px' }}>订阅历史</span>
                  <Icon name="arrow-right" size="xs" style={{ color: '#60A5FA' }} />
                </div>
              </div>

              <div style={{
                background: 'rgba(26, 26, 26, 0.30)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(42, 42, 42, 0.70)',
                borderRadius: '12px',
                padding: '21px'
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
                      <span style={{
                        color: '#FFFFFF',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '28px'
                      }}>高级会员</span>
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
                      fontSize: '14px',
                      lineHeight: '20px',
                      margin: 0
                    }}>到期时间: 2024年12月31日 (剩余245天)</p>
                  </div>
                  <GradientButton size="md" variant="primary">
                    立即续费
                    <Icon name="arrow-right" size="xs" style={{ marginLeft: '8px' }} />
                  </GradientButton>
                </div>

                <p style={{
                  color: '#D1D5DB',
                  fontSize: '14px',
                  lineHeight: '20px',
                  margin: '0 0 20px 0'
                }}>订阅内容: 全站资源、专属社群、一对一咨询 (每月1次)</p>

                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.10)',
                  paddingTop: '25px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.10)',
                      borderRadius: '50%',
                      padding: '10px'
                    }}>
                      <Icon name="membership-check" size="sm" style={{ color: '#EAB308' }} />
                    </div>
                    <div>
                      <div style={{
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '24px',
                        marginBottom: '2px'
                      }}>专属会员权益</div>
                      <div style={{
                        color: '#9CA3AF',
                        fontSize: '12px',
                        lineHeight: '16px'
                      }}>查看您的专属会员权益和使用方式</div>
                    </div>
                  </div>
                  <Icon name="arrow-right" size="sm" style={{ color: '#60A5FA' }} />
                </div>
              </div>
            </Container>
          </div>
        </main>
      </div>
    </div>
  )
} 