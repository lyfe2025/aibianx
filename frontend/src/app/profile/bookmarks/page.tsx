'use client'

import React, { useState } from 'react'
import { Container, Icon, GradientText } from '@/components/ui'
import { UserSidebar } from '@/components/molecules'

export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('全部')

  // 收藏统计数据
  const collectionStats = [
    {
      title: '文章',
      count: '12',
      icon: 'article-icon',
      gradient: 'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)'
    },
    {
      title: '教程',
      count: '8',
      icon: 'tutorial-icon',
      gradient: 'linear-gradient(90deg, #22C55E 0%, #34D399 100%)'
    },
    {
      title: 'AI工具',
      count: '6',
      icon: 'tool-icon',
      gradient: 'linear-gradient(90deg, #A855F7 0%, #EC4899 100%)'
    },
    {
      title: '案例',
      count: '2',
      icon: 'case-icon',
      gradient: 'linear-gradient(90deg, #FB923C 0%, #F59E0B 100%)'
    }
  ]

  // 收藏的内容数据
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
    },
    {
      title: 'ChatGPT高效提示词技巧',
      category: 'AI工具',
      image: '/images/articles/chatgpt-article.jpeg',
      collectedAt: '收藏于 5 天前'
    },
    {
      title: 'AI绘画入门到精通课程',
      category: '教程',
      image: '/images/articles/ai-art-guide.svg',
      collectedAt: '收藏于 7 天前'
    },
    {
      title: '人工智能创业商业模式分析',
      category: '文章',
      image: '/images/articles/ai-startup-guide.jpeg',
      collectedAt: '收藏于 10 天前'
    },
    {
      title: 'AI数据分析工作流实战',
      category: '教程',
      image: '/images/articles/ai-data-analysis.jpeg',
      collectedAt: '收藏于 12 天前'
    }
  ]

  const filters = ['全部', '最近收藏', '筛选']

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="flex">
        {/* 左侧导航栏 - 使用UserSidebar组件 */}
        <UserSidebar />

        {/* 右侧主内容区域 */}
        <main style={{ flex: 1 }}>
          <div style={{ padding: '32px 40px' }}>
            <Container size="xl">
              <div style={{ marginBottom: '32px' }}>
                {/* 页面标题 */}
                <h1 style={{
                  color: '#FFFFFF',
                  fontSize: '24px',
                  fontWeight: '700',
                  lineHeight: '32px',
                  margin: '0 0 24px 0'
                }}>我的收藏</h1>

                {/* 筛选控制栏 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}>
                  {/* 左侧筛选标签 */}
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center'
                  }}>
                    {filters.map((filter) => (
                      <div key={filter} style={{
                        background: 'rgba(26, 26, 26, 0.60)',
                        border: '1px solid rgba(42, 42, 42, 0.70)',
                        borderRadius: '8px',
                        padding: '9px 17px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}>
                        <span style={{
                          color: '#FFFFFF',
                          fontSize: '14px',
                          lineHeight: '20px'
                        }}>{filter}</span>
                        <Icon name="arrow-down" size="xs" style={{ color: '#FFFFFF' }} />
                      </div>
                    ))}
                  </div>

                  {/* 右侧搜索和视图控制 */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {/* 搜索框 */}
                    <div style={{
                      background: 'rgba(26, 26, 26, 0.60)',
                      border: '1px solid rgba(42, 42, 42, 0.70)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      width: '256px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <Icon name="search-icon" size="sm" style={{ color: '#9CA3AF' }} />
                      <input
                        type="text"
                        placeholder="搜索收藏内容"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          color: '#9CA3AF',
                          fontSize: '14px',
                          width: '100%'
                        }}
                      />
                    </div>

                    {/* 视图切换 */}
                    <div style={{
                      background: 'rgba(26, 26, 26, 0.60)',
                      border: '1px solid rgba(42, 42, 42, 0.70)',
                      borderRadius: '8px',
                      padding: '1px',
                      display: 'flex',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: 'rgba(59, 130, 246, 0.20)',
                        padding: '8px'
                      }}>
                        <Icon name="grid-view" size="sm" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div style={{ padding: '8px' }}>
                        <Icon name="list-view" size="sm" style={{ color: '#9CA3AF' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 收藏统计卡片 */}
              <div style={{
                background: 'rgba(26, 26, 26, 0.30)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(42, 42, 42, 0.70)',
                borderRadius: '12px',
                padding: '21px',
                marginBottom: '32px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h3 style={{
                      color: '#FFFFFF',
                      fontSize: '20px',
                      fontWeight: '700',
                      lineHeight: '28px',
                      margin: '0 0 4px 0'
                    }}>收藏统计</h3>
                    <p style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      lineHeight: '20px',
                      margin: 0
                    }}>当前共有 28 个收藏项目</p>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.10)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Icon name="manage-icon" size="xs" style={{ color: '#FFFFFF' }} />
                    <span style={{
                      color: '#FFFFFF',
                      fontSize: '14px',
                      lineHeight: '20px'
                    }}>批量管理</span>
                  </div>
                </div>

                {/* 统计数据 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px'
                }}>
                  {collectionStats.map((stat, index) => (
                    <div key={index} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        background: stat.gradient,
                        borderRadius: '8px',
                        padding: '10px',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon name={stat.icon} size="sm" style={{ color: '#FFFFFF' }} />
                      </div>
                      <div>
                        <div style={{
                          color: '#9CA3AF',
                          fontSize: '12px',
                          lineHeight: '16px',
                          marginBottom: '4px'
                        }}>{stat.title}</div>
                        <div style={{
                          color: '#FFFFFF',
                          fontSize: '18px',
                          fontWeight: '600',
                          lineHeight: '28px'
                        }}>{stat.count}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 收藏内容网格 */}
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
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '24px',
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

              {/* 分页导航 */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginTop: '32px'
              }}>
                <div style={{
                  background: 'rgba(26, 26, 26, 0.30)',
                  border: '1px solid rgba(42, 42, 42, 0.70)',
                  borderRadius: '6px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  <span style={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    lineHeight: '24px'
                  }}>&lt;</span>
                </div>

                <div style={{
                  background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                  borderRadius: '6px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: '600'
                  }}>1</span>
                </div>

                {[2, 3].map((page) => (
                  <div key={page} style={{
                    background: 'rgba(26, 26, 26, 0.30)',
                    border: '1px solid rgba(42, 42, 42, 0.70)',
                    borderRadius: '6px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}>
                    <span style={{
                      color: '#FFFFFF',
                      fontSize: '16px',
                      lineHeight: '24px'
                    }}>{page}</span>
                  </div>
                ))}

                <div style={{
                  background: 'rgba(26, 26, 26, 0.30)',
                  border: '1px solid rgba(42, 42, 42, 0.70)',
                  borderRadius: '6px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  <span style={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    lineHeight: '24px'
                  }}>&gt;</span>
                </div>
              </div>
            </Container>
          </div>
        </main>
      </div>
    </div>
  )
} 