'use client'

import React, { useState } from 'react'
import { Icon, GradientText, Container, Input } from '@/components/ui'
import { BookmarkCard } from '@/components/molecules'

export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('全部')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // 收藏统计数据
  const collectionStats = [
    {
      title: '文章',
      count: '12',
      icon: 'article-stat-icon',
      gradient: 'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)'
    },
    {
      title: '教程',
      count: '8',
      icon: 'tutorial-stat-icon',
      gradient: 'linear-gradient(90deg, #22C55E 0%, #34D399 100%)'
    },
    {
      title: 'AI工具',
      count: '6',
      icon: 'ai-tool-stat-icon',
      gradient: 'linear-gradient(90deg, #A855F7 0%, #EC4899 100%)'
    },
    {
      title: '案例',
      count: '2',
      icon: 'case-stat-icon',
      gradient: 'linear-gradient(90deg, #FB923C 0%, #F59E0B 100%)'
    }
  ]

  // 收藏的内容数据 - 使用新下载的图片
  const bookmarkedItems = [
    {
      title: 'Midjourney高级提示词大全',
      category: 'AI工具',
      image: '/images/bookmark-midjourney.jpeg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'AI辅助内容创作工作流',
      category: '教程',
      image: '/images/bookmark-ai-workflow.jpeg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'GPT-4高级应用案例',
      category: '案例',
      image: '/images/bookmark-gpt4-cases.jpeg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'AI变现新思路：垂直领域应用',
      category: '文章',
      image: '/images/bookmark-ai-monetization.jpeg',
      collectedAt: '收藏于 3 天前'
    },
    {
      title: 'ChatGPT高效提示词技巧',
      category: 'AI工具',
      image: '/images/bookmark-chatgpt-tips.jpeg',
      collectedAt: '收藏于 5 天前'
    },
    {
      title: 'AI绘画入门到精通课程',
      category: '教程',
      image: '/images/bookmark-ai-art-course.jpeg',
      collectedAt: '收藏于 7 天前'
    },
    {
      title: '人工智能创业商业模式分析',
      category: '文章',
      image: '/images/bookmark-ai-business.jpeg',
      collectedAt: '收藏于 10 天前'
    },
    {
      title: 'AI数据分析工作流实战',
      category: '教程',
      image: '/images/bookmark-ai-data-analysis.jpeg',
      collectedAt: '收藏于 12 天前'
    }
  ]

  const filters = [
    { label: '全部', icon: 'dropdown-arrow' },
    { label: '最近收藏', icon: 'dropdown-arrow' },
    { label: '筛选', icon: 'filter-icon', isFilterIcon: true }
  ]

  const handleBookmarkClick = (item: typeof bookmarkedItems[0]) => {
    console.log('点击收藏内容:', item.title)
    // 这里可以添加跳转到详情页面的逻辑
  }

  const handleSearchClear = () => {
    setSearchQuery('')
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        handleSearchClear()
        e.preventDefault()
        break
      case 'Enter':
        // 这里可以添加搜索逻辑
        console.log('搜索:', searchQuery)
        break
    }
  }

  return (
    <div style={{
      padding: '32px 40px',
      maxWidth: '1440px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* 页面标题 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '32px'
      }}>
        <h1 style={{
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-3xl)',
          lineHeight: '32px',
          fontWeight: 'normal',
          margin: 0,
          whiteSpace: 'nowrap'
        }}>我的收藏</h1>
      </div>

      {/* 筛选和搜索控制栏 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: '24px'
      }}>
        {/* 左侧筛选标签 */}
        <div style={{
          gap: '16px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexShrink: 0
        }}>
          {filters.map((filter) => (
            <div key={filter.label} style={{
              background: 'rgba(26, 26, 26, 0.60)',
              border: '1px solid rgba(42, 42, 42, 0.70)',
              borderRadius: '8px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: '17px',
              paddingRight: '17px',
              paddingTop: '9px',
              paddingBottom: '9px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              {filter.isFilterIcon ? (
                <>
                  <Icon name={filter.icon} size="xs" style={{
                    color: 'var(--color-text-primary)',
                    width: '16px',
                    height: '16px',
                    flexShrink: 0
                  }} />
                  <span style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: '20px'
                  }}>{filter.label}</span>
                </>
              ) : (
                <>
                  <span style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: '20px'
                  }}>{filter.label}</span>
                  <Icon name={filter.icon} size="xs" style={{
                    color: 'var(--color-text-primary)',
                    width: '16px',
                    height: '16px',
                    flexShrink: 0
                  }} />
                </>
              )}
            </div>
          ))}
        </div>

        {/* 右侧搜索和视图控制 */}
        <div style={{
          gap: '16px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexShrink: 0
        }}>
          {/* 搜索框 */}
          <div style={{ width: '256px', minWidth: '256px' }}>
            <div style={{
              background: isSearchFocused ? 'rgba(18, 18, 18, 0.70)' : 'rgba(18, 18, 18, 0.50)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              border: `1px solid ${isSearchFocused ? 'var(--color-border-active)' : 'var(--color-border-primary)'}`,
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '256px',
              height: '48px',
              transition: 'all 0.2s ease',
              boxShadow: isSearchFocused ? '0 0 0 2px rgba(59, 130, 246, 0.1)' : 'none'
            }}>
              <Icon name="search-bookmark-icon" size="sm" style={{
                color: isSearchFocused ? 'var(--color-border-active)' : 'var(--color-text-muted)',
                width: '18px',
                height: '18px',
                flexShrink: 0,
                transition: 'color 0.2s ease'
              }} />
              <input
                type="text"
                placeholder="搜索收藏内容"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--font-size-base)',
                  lineHeight: '20px',
                  fontFamily: 'var(--font-family-primary)'
                }}
              />

              {/* 清空按钮 */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  aria-label="清空搜索"
                  style={{
                    background: 'rgba(107, 114, 128, 0.15)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)',
                    fontSize: '12px',
                    lineHeight: '1',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    opacity: 0.7
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.25)'
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.15)'
                    e.currentTarget.style.opacity = '0.7'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 视图切换 */}
          <div style={{
            background: 'rgba(26, 26, 26, 0.60)',
            border: '1px solid rgba(42, 42, 42, 0.70)',
            borderRadius: '8px',
            display: 'flex',
            width: '70px',
            height: '48px',
            alignItems: 'center',
            overflow: 'hidden',
            flexDirection: 'row',
            padding: '2px',
            flexShrink: 0
          }}>
            <div style={{
              background: viewMode === 'grid' ? 'rgba(59, 130, 246, 0.20)' : 'transparent',
              borderRadius: '6px',
              width: '33px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }} onClick={() => setViewMode('grid')}>
              <Icon name="grid-view-icon" size="sm" style={{
                width: '18px',
                height: '18px',
                color: viewMode === 'grid' ? '#3B82F6' : '#9CA3AF'
              }} />
            </div>
            <div style={{
              background: viewMode === 'list' ? 'rgba(59, 130, 246, 0.20)' : 'transparent',
              borderRadius: '6px',
              width: '33px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }} onClick={() => setViewMode('list')}>
              <Icon name="list-view-icon" size="sm" style={{
                width: '18px',
                height: '18px',
                color: viewMode === 'list' ? '#3B82F6' : '#9CA3AF'
              }} />
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
        gap: '16px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'nowrap'
        }}>
          <div style={{
            gap: '4px',
            display: 'flex',
            flexDirection: 'column',
            flex: '1'
          }}>
            <h3 style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-2xl)',
              lineHeight: '28px',
              margin: 0,
              whiteSpace: 'nowrap'
            }}>收藏统计</h3>
            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-base)',
              lineHeight: '20px',
              margin: 0,
              whiteSpace: 'nowrap'
            }}>当前共有 28 个收藏项目</p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.10)',
            borderRadius: '8px',
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '6px',
            paddingBottom: '6px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            <Icon name="batch-manage-icon" size="xs" style={{
              color: 'var(--color-text-primary)',
              width: '16px',
              height: '16px',
              flexShrink: 0
            }} />
            <span style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-base)',
              lineHeight: '20px'
            }}>批量管理</span>
          </div>
        </div>

        {/* 统计数据网格 */}
        <div style={{
          gap: '16px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          flexWrap: 'nowrap'
        }}>
          {collectionStats.map((stat, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              flexGrow: 1,
              flexShrink: 1,
              minWidth: 0,
              flexDirection: 'row'
            }}>
              <div style={{
                background: stat.gradient,
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                width: '40px',
                height: '40px',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0
              }}>
                <Icon name={stat.icon} size="sm" style={{
                  color: 'var(--color-text-primary)',
                  width: '20px',
                  height: '20px'
                }} />
              </div>
              <div style={{
                gap: '4px',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                flex: 1
              }}>
                <div style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--font-size-xs)',
                  lineHeight: '16px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>{stat.title}</div>
                <div style={{
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--font-size-xl)',
                  lineHeight: '28px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
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
        gap: '20px'
      }}>
        {bookmarkedItems.map((item, index) => (
          <div key={index} style={{
            background: 'rgba(26, 26, 26, 0.30)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(42, 42, 42, 0.70)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            <div style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '128px',
              display: 'flex',
              alignItems: 'flex-start',
              padding: '8px'
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.50)',
                borderRadius: '9999px',
                padding: '4px 8px',
                whiteSpace: 'nowrap'
              }}>
                <span style={{
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--font-size-xs)',
                  lineHeight: '16px'
                }}>{item.category}</span>
              </div>
            </div>
            <div style={{ padding: '12px' }}>
              <h4 style={{
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-lg)',
                lineHeight: '24px',
                margin: '0 0 8px 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>{item.title}</h4>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'nowrap'
              }}>
                <div style={{
                  gap: '4px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  minWidth: 0
                }}>
                  <Icon name="bookmark-star-icon" size="xs" style={{
                    color: 'var(--color-warning)',
                    width: '16px',
                    height: '16px',
                    flexShrink: 0
                  }} />
                  <span style={{
                    color: 'var(--color-warning)',
                    fontSize: 'var(--font-size-xs)',
                    lineHeight: '16px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>{item.collectedAt}</span>
                </div>
                <Icon name="bookmark-more-icon" size="xs" style={{
                  color: 'var(--color-text-muted)',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  flexShrink: 0
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页导航 */}
      <div style={{
        gap: '8px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '16px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'rgba(26, 26, 26, 0.30)',
          border: '1px solid rgba(42, 42, 42, 0.70)',
          borderRadius: '6px',
          width: '32px',
          height: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer'
        }}>
          <span style={{
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-lg)',
            lineHeight: '24px'
          }}>&lt;</span>
        </div>

        <div style={{
          background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
          borderRadius: '6px',
          width: '32px',
          height: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-lg)',
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
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <span style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-lg)',
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
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer'
        }}>
          <span style={{
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-lg)',
            lineHeight: '24px'
          }}>&gt;</span>
        </div>
      </div>

      {/* 样式定义 */}
      <style jsx>{`
                input::placeholder {
                  color: var(--color-text-muted);
                  opacity: 1;
                  transition: color 0.2s ease;
                }
                input::-webkit-input-placeholder {
                  color: var(--color-text-muted);
                  opacity: 1;
                  transition: color 0.2s ease;
                }
                input::-moz-placeholder {
                  color: var(--color-text-muted);
                  opacity: 1;
                  transition: color 0.2s ease;
                }
                input:-ms-input-placeholder {
                  color: var(--color-text-muted);
                  opacity: 1;
                  transition: color 0.2s ease;
                }
                
                /* 聚焦时的placeholder颜色 */
                input:focus::placeholder {
                  color: rgba(156, 163, 175, 0.7);
                }
                input:focus::-webkit-input-placeholder {
                  color: rgba(156, 163, 175, 0.7);
                }
                input:focus::-moz-placeholder {
                  color: rgba(156, 163, 175, 0.7);
                }
                input:focus:-ms-input-placeholder {
                  color: rgba(156, 163, 175, 0.7);
                }
              `}</style>
    </div>
  )
} 