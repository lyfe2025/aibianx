'use client'

import React from 'react'
import { Icon, GradientText, GradientButton } from '@/components/ui'
import { BookmarkCard } from '@/components/molecules'

export default function ProfilePage() {
  // 统计数据
  const userStats = [
    {
      title: '已购课程',
      value: '12',
      icon: 'courses-icon',
      gradient: 'linear-gradient(135deg, #3B82F6 15%, #06B6D4 85%)'
    },
    {
      title: '学习进度',
      value: '45%',
      icon: 'progress-icon',
      gradient: 'linear-gradient(135deg, #22C55E 15%, #34D399 85%)'
    },
    {
      title: '收藏资源',
      value: '28',
      icon: 'resources-icon',
      gradient: 'linear-gradient(135deg, #A855F7 15%, #EC4899 85%)'
    },
    {
      title: '积分',
      value: '3,250',
      icon: 'points-icon',
      gradient: 'linear-gradient(135deg, #FB923C 15%, #F59E0B 85%)'
    }
  ]

  // 收藏内容示例数据
  const bookmarkedItems = [
    {
      title: 'Midjourney高级提示词大全',
      category: 'AI工具',
      image: '/images/midjourney-prompts.jpeg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'AI辅助内容创作工作流',
      category: '教程',
      image: '/images/ai-content-workflow.jpeg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'GPT-4高级应用案例',
      category: '案例',
      image: '/images/gpt4-advanced-cases.jpeg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'AI变现新思路：垂直领域应用',
      category: '文章',
      image: '/images/ai-monetization-vertical.jpeg',
      collectedAt: '收藏于 3 天前'
    }
  ]

  const handleBookmarkClick = (item: typeof bookmarkedItems[0]) => {
    console.log('点击收藏内容:', item.title)
    // 这里可以添加跳转到文章详情页面的逻辑
  }

  return (
    <div style={{
      padding: '32px 40px',
      maxWidth: '1440px',
      margin: '0 auto',
      // 添加防换行保护
      overflow: 'hidden'
    }}>
      {/* 页面标题 */}
      <div style={{
        marginBottom: 'var(--card-gap-lg)',
        // 防换行保护
        overflow: 'hidden'
      }}>
        <h1 style={{
          color: '#FFFFFF',
          fontSize: '24px',
          fontWeight: '700',
          lineHeight: '32px',
          margin: 0,
          // 防换行保护
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>个人中心</h1>
      </div>

      {/* 统计卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // 增加最小宽度为中文预留空间
        gap: '24px',
        marginBottom: '40px',
        // 防换行保护
        overflow: 'hidden'
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
            gap: '4px',
            // 防换行保护
            minWidth: '280px', // 为中文文字预留充足宽度
            overflow: 'hidden'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: stat.gradient,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              flexShrink: 0 // 防止收缩
            }}>
              <Icon name={stat.icon} size="md" style={{ color: '#FFFFFF' }} />
            </div>
            <div style={{
              color: '#9CA3AF',
              fontSize: '16px',
              lineHeight: '24px',
              marginBottom: '4px',
              // 防换行保护 - 统计标题
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: '120px' // 为中文标题预留空间
            }}>{stat.title}</div>
            <div style={{
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: '600',
              lineHeight: '32px',
              // 防换行保护 - 统计数值
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
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
        gap: '24px',
        // 防换行保护
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          // 防换行保护
          flexWrap: 'nowrap',
          overflow: 'hidden',
          gap: '16px' // 添加间距防止挤压
        }}>
          <div style={{
            flex: 1,
            minWidth: '300px', // 为中文文字预留充足宽度
            // 防换行保护
            overflow: 'hidden'
          }}>
            <h3 style={{
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: '700',
              lineHeight: '28px',
              margin: '0 0 4px 0',
              // 防换行保护 - 标题
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>邀请好友 双重奖励</h3>
            <p style={{
              color: '#D1D5DB',
              fontSize: '16px',
              lineHeight: '24px',
              margin: 0,
              // 防换行保护 - 描述文字适当宽度
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>邀请好友注册并开通会员，你和好友都将获得额外会员时长奖励</p>
          </div>
          <div style={{
            display: 'flex',
            gap: '16px',
            flexShrink: 0, // 防止按钮被压缩
            // 防换行保护
            flexWrap: 'nowrap'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: '8px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              // 防换行保护
              whiteSpace: 'nowrap',
              minWidth: '100px', // 为中文按钮文字预留空间
              overflow: 'hidden'
            }}>
              <Icon name="strategy-icon" size="xs" style={{ color: '#FFFFFF', flexShrink: 0 }} />
              <span style={{
                color: '#FFFFFF',
                fontSize: '14px',
                // 防换行保护
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>邀请攻略</span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: '8px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              // 防换行保护
              whiteSpace: 'nowrap',
              minWidth: '100px', // 为中文按钮文字预留空间
              overflow: 'hidden'
            }}>
              <Icon name="record-icon" size="xs" style={{ color: '#FFFFFF', flexShrink: 0 }} />
              <span style={{
                color: '#FFFFFF',
                fontSize: '14px',
                // 防换行保护
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>提现记录</span>
            </div>
          </div>
        </div>

        {/* 邀请统计 */}
        <div style={{
          display: 'flex',
          gap: '50px',
          alignItems: 'center',
          // 防换行保护
          flexWrap: 'nowrap',
          overflow: 'hidden'
        }}>
          {/* 邀请码 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingRight: '25px',
            borderRight: '1px solid rgba(255, 255, 255, 0.10)',
            // 防换行保护
            flexShrink: 0,
            minWidth: '260px', // 为邀请码区域预留充足宽度
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: '8px',
              padding: '12px',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon name="invite-code-icon" size="lg" style={{ color: '#FFFFFF' }} />
            </div>
            <div style={{
              flex: 1,
              minWidth: '160px', // 为邀请码文字预留空间
              overflow: 'hidden'
            }}>
              <div style={{
                color: '#D1D5DB',
                fontSize: '14px',
                lineHeight: '20px',
                marginBottom: '8px',
                // 防换行保护
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>您的专属邀请码</div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                // 防换行保护
                flexWrap: 'nowrap',
                overflow: 'hidden'
              }}>
                <span style={{
                  color: '#FFFFFF',
                  fontSize: '20px',
                  lineHeight: '28px',
                  flexShrink: 0 // 邀请码不能收缩
                }}>AI7859</span>
                <Icon name="copy-icon" size="xs" style={{ color: '#60A5FA', flexShrink: 0 }} />
                <span style={{
                  color: '#60A5FA',
                  fontSize: '14px',
                  // 防换行保护
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>复制</span>
              </div>
            </div>
          </div>

          {/* 统计数据 */}
          <div style={{
            display: 'flex',
            gap: '50px',
            // 防换行保护
            flexWrap: 'nowrap',
            overflow: 'hidden'
          }}>
            <div style={{
              textAlign: 'center',
              minWidth: '80px', // 为统计项预留空间
              // 防换行保护
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.10)',
                borderRadius: '8px',
                padding: '12px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px',
                flexShrink: 0
              }}>
                <Icon name="invited-count-icon" size="md" style={{ color: '#FFFFFF' }} />
              </div>
              <div style={{
                color: '#D1D5DB',
                fontSize: '14px',
                lineHeight: '20px',
                marginBottom: '4px',
                // 防换行保护
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>已邀请人数</div>
              <div style={{
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: '28px',
                // 防换行保护
                whiteSpace: 'nowrap'
              }}>18</div>
            </div>

            <div style={{
              textAlign: 'center',
              minWidth: '80px', // 为统计项预留空间
              // 防换行保护
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.10)',
                borderRadius: '8px',
                padding: '12px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px',
                flexShrink: 0
              }}>
                <Icon name="pending-activation-icon" size="md" style={{ color: '#FFFFFF' }} />
              </div>
              <div style={{
                color: '#D1D5DB',
                fontSize: '14px',
                lineHeight: '20px',
                marginBottom: '4px',
                // 防换行保护
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>待激活人数</div>
              <div style={{
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: '28px',
                // 防换行保护
                whiteSpace: 'nowrap'
              }}>5</div>
            </div>

            <div style={{
              textAlign: 'center',
              minWidth: '100px', // 为金额数字预留更多空间
              // 防换行保护
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.10)',
                borderRadius: '8px',
                padding: '12px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px',
                flexShrink: 0
              }}>
                <Icon name="commission-icon" size="md" style={{ color: '#FFFFFF' }} />
              </div>
              <div style={{
                color: '#D1D5DB',
                fontSize: '14px',
                lineHeight: '20px',
                marginBottom: '4px',
                // 防换行保护
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>累计返佣金额</div>
              <div style={{
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: '28px',
                // 防换行保护
                whiteSpace: 'nowrap'
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
        marginBottom: '20px',
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden',
        gap: '16px' // 添加间距防止挤压
      }}>
        <h3 style={{
          color: '#FFFFFF',
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: '28px',
          margin: 0,
          // 防换行保护 - 标题
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: '100px' // 为中文标题预留空间
        }}>收藏内容</h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: '#60A5FA',
          fontSize: '14px',
          cursor: 'pointer',
          // 防换行保护
          flexShrink: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          gap: '4px' // 添加图标间距
        }}>
          <span style={{
            // 防换行保护
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>查看全部</span>
          <Icon name="arrow-right-blue" size="xs" style={{ color: '#60A5FA', flexShrink: 0 }} />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(285px, 1fr))', // 增加最小宽度为收藏卡片预留空间
        gap: '20px',
        marginBottom: '40px',
        // 防换行保护
        overflow: 'hidden'
      }}>
        {bookmarkedItems.map((item, index) => (
          <BookmarkCard
            key={index}
            title={item.title}
            category={item.category}
            image={item.image}
            collectedAt={item.collectedAt}
            onClick={() => handleBookmarkClick(item)}
          />
        ))}
      </div>

      {/* 订阅管理区域 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        // 防换行保护
        flexWrap: 'nowrap',
        overflow: 'hidden',
        gap: '16px' // 添加间距防止挤压
      }}>
        <h3 style={{
          color: '#FFFFFF',
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: '28px',
          margin: 0,
          // 防换行保护 - 标题
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: '100px' // 为中文标题预留空间
        }}>订阅管理</h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: '#60A5FA',
          fontSize: '14px',
          cursor: 'pointer',
          // 防换行保护
          flexShrink: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          gap: '4px' // 添加图标间距
        }}>
          <span style={{
            // 防换行保护
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>订阅历史</span>
          <Icon name="arrow-right-blue" size="xs" style={{ color: '#60A5FA', flexShrink: 0 }} />
        </div>
      </div>

      <div style={{
        background: 'rgba(26, 26, 26, 0.30)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(42, 42, 42, 0.70)',
        borderRadius: '12px',
        padding: '21px',
        // 防换行保护
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
          // 防换行保护
          flexWrap: 'nowrap',
          overflow: 'hidden',
          gap: '16px' // 添加间距防止挤压
        }}>
          <div style={{
            flex: 1,
            minWidth: '250px', // 为会员信息文字预留充足宽度
            // 防换行保护
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
              // 防换行保护
              flexWrap: 'nowrap',
              overflow: 'hidden'
            }}>
              <span style={{
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: '600',
                lineHeight: '28px',
                // 防换行保护
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>高级会员</span>
              <div style={{
                background: 'linear-gradient(90deg, #FACC15 0%, #CA8A04 100%)',
                borderRadius: '9999px',
                padding: '2px 8px',
                flexShrink: 0 // 防止徽章被压缩
              }}>
                <span style={{
                  color: '#FFFFFF',
                  fontSize: '12px',
                  lineHeight: '16px',
                  // 防换行保护
                  whiteSpace: 'nowrap'
                }}>当前方案</span>
              </div>
            </div>
            <p style={{
              color: '#D1D5DB',
              fontSize: '14px',
              lineHeight: '20px',
              margin: 0,
              // 防换行保护 - 到期时间
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>到期时间: 2024年12月31日 (剩余245天)</p>
          </div>
          <div style={{ flexShrink: 0 }}> {/* 防止按钮被压缩 */}
            <GradientButton size="md" variant="primary">
              <span style={{
                // 防换行保护
                whiteSpace: 'nowrap'
              }}>立即续费</span>
              <Icon name="renew-icon" size="xs" style={{ marginLeft: '8px', flexShrink: 0 }} />
            </GradientButton>
          </div>
        </div>

        <p style={{
          color: '#D1D5DB',
          fontSize: '14px',
          lineHeight: '20px',
          margin: '0 0 20px 0',
          // 防换行保护 - 订阅内容描述
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>订阅内容: 全站资源、专属社群、一对一咨询 (每月1次)</p>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.10)',
          paddingTop: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // 防换行保护
          flexWrap: 'nowrap',
          overflow: 'hidden',
          gap: '16px' // 添加间距防止挤压
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flex: 1,
            minWidth: '200px', // 为权益文字预留充足宽度
            // 防换行保护
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: '50%',
              padding: '10px',
              flexShrink: 0 // 防止图标被压缩
            }}>
              <Icon name="privilege-icon" size="sm" style={{ color: '#EAB308' }} />
            </div>
            <div style={{
              flex: 1,
              // 防换行保护
              overflow: 'hidden'
            }}>
              <div style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '24px',
                marginBottom: '2px',
                // 防换行保护 - 权益标题
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>专属会员权益</div>
              <div style={{
                color: '#9CA3AF',
                fontSize: '12px',
                lineHeight: '16px',
                // 防换行保护 - 权益描述
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>查看您的专属会员权益和使用方式</div>
            </div>
          </div>
          <Icon name="privilege-arrow" size="sm" style={{ color: '#60A5FA', flexShrink: 0 }} />
        </div>
      </div>
    </div>
  )
} 