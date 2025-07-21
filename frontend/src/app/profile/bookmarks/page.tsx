'use client'

import React, { useState } from 'react'
import { Container, Icon } from '@/components/ui'
import { UserSidebar, SearchFilter, CollectionCard } from '@/components/molecules'
import { Header, Footer } from '@/components/organisms'

export default function BookmarksPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('全部')

    // 模拟收藏数据
    const bookmarkedItems = [
        {
            title: 'ChatGPT 高效提示词编写技巧',
            category: 'AI工具',
            coverImage: '/images/articles/chatgpt-article.jpeg',
            collectedAt: '2 天前'
        },
        {
            title: 'Midjourney 从入门到精通完整指南',
            category: '教程',
            coverImage: '/images/articles/midjourney-article.jpeg',
            collectedAt: '5 天前'
        },
        {
            title: 'AI 内容自动化生产工作流',
            category: '案例',
            coverImage: '/images/articles/ai-content-automation.svg',
            collectedAt: '1 周前'
        },
        {
            title: 'GPT-4 高级应用与商业化场景',
            category: 'AI工具',
            coverImage: '/images/articles/gpt4-article.jpeg',
            collectedAt: '1 周前'
        },
        {
            title: 'AI 绘画艺术创作完整指南',
            category: '教程',
            coverImage: '/images/articles/ai-art-guide.svg',
            collectedAt: '2 周前'
        },
        {
            title: 'ChatGPT 智能客服机器人搭建',
            category: '案例',
            coverImage: '/images/articles/chatgpt-bot.svg',
            collectedAt: '2 周前'
        },
        {
            title: 'AI 变现模式深度解析',
            category: '文章',
            coverImage: '/images/articles/ai-revenue-model.jpeg',
            collectedAt: '3 周前'
        },
        {
            title: 'Midjourney 商业化工作流程',
            category: '教程',
            coverImage: '/images/articles/midjourney-workflow.jpeg',
            collectedAt: '3 周前'
        }
    ]

    // 筛选逻辑
    const filteredItems = bookmarkedItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())

        if (activeFilter === '全部') return matchesSearch
        if (activeFilter === '最近收藏') {
            const isRecent = ['天前', '1 周前'].some(period => item.collectedAt.includes(period))
            return matchesSearch && isRecent
        }
        return matchesSearch
    })

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter)
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg-primary)]">
            <Header />

            <main className="bookmarks-page">
                <Container size="xl" className="bookmarks-container">
                    <div className="bookmarks-layout">
                        {/* 左侧边栏 */}
                        <UserSidebar />

                        {/* 右侧主内容 */}
                        <div className="bookmarks-main">
                            <div className="bookmarks-header">
                                <h1 className="page-title">我的收藏</h1>
                                <p className="page-description">已收藏 {bookmarkedItems.length} 项内容</p>
                            </div>

                            {/* 搜索筛选 */}
                            <SearchFilter
                                onSearch={handleSearch}
                                onFilterChange={handleFilterChange}
                                activeFilter={activeFilter}
                            />

                            {/* 收藏统计 */}
                            <div className="bookmarks-stats">
                                <div className="stats-item">
                                    <span className="stats-label">显示结果:</span>
                                    <span className="stats-value">{filteredItems.length} 项</span>
                                </div>
                                {searchQuery && (
                                    <div className="stats-item">
                                        <span className="stats-label">搜索关键词:</span>
                                        <span className="stats-value">"{searchQuery}"</span>
                                    </div>
                                )}
                            </div>

                            {/* 收藏内容网格 */}
                            {filteredItems.length > 0 ? (
                                <div className="collections-grid">
                                    {filteredItems.map((item, index) => (
                                        <CollectionCard
                                            key={index}
                                            title={item.title}
                                            category={item.category}
                                            coverImage={item.coverImage}
                                            collectedAt={item.collectedAt}
                                            onClick={() => {
                                                // 处理卡片点击
                                                console.log('查看收藏:', item.title)
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        <Icon name="collect-icon-detail" size="xl" />
                                    </div>
                                    <h3 className="empty-title">暂无符合条件的收藏</h3>
                                    <p className="empty-description">
                                        {searchQuery ?
                                            '尝试调整搜索关键词或筛选条件' :
                                            '开始收藏您感兴趣的内容吧'
                                        }
                                    </p>
                                </div>
                            )}

                            {/* 分页或加载更多 */}
                            {filteredItems.length > 0 && (
                                <div className="pagination-section">
                                    <div className="load-more">
                                        <button className="load-more-btn">
                                            加载更多收藏
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />

            <style jsx>{`
        .bookmarks-page {
          padding: 32px 0 80px;
          min-height: calc(100vh - 80px);
        }

        .bookmarks-container {
          max-width: 1440px;
        }

        .bookmarks-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }

        .bookmarks-main {
          flex: 1;
          max-width: calc(100% - 280px);
        }

        .bookmarks-header {
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

        .bookmarks-stats {
          display: flex;
          gap: 32px;
          margin-bottom: 32px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(42, 42, 42, 0.30);
        }

        .stats-item {
          display: flex;
          gap: 8px;
        }

        .stats-label {
          color: var(--color-text-muted);
          font-size: var(--font-size-base);
          line-height: 20px;
        }

        .stats-value {
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
          line-height: 20px;
          font-weight: 500;
        }

        .collections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          background: rgba(59, 130, 246, 0.10);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: var(--color-text-muted);
        }

        .empty-title {
          color: var(--color-text-primary);
          font-size: var(--font-size-2xl);
          font-weight: 600;
          line-height: 28px;
          margin: 0 0 8px 0;
        }

        .empty-description {
          color: var(--color-text-muted);
          font-size: var(--font-size-lg);
          line-height: 24px;
          margin: 0;
        }

        .pagination-section {
          display: flex;
          justify-content: center;
          padding-top: 40px;
        }

        .load-more-btn {
          background: rgba(26, 26, 26, 0.60);
          border: 1px solid rgba(42, 42, 42, 0.70);
          border-radius: 8px;
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
          line-height: 20px;
          font-weight: 500;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .load-more-btn:hover {
          background: rgba(26, 26, 26, 0.80);
          border-color: rgba(59, 130, 246, 0.30);
        }

        /* 响应式设计 */
        @media (max-width: 1024px) {
          .bookmarks-layout {
            flex-direction: column;
          }

          .bookmarks-main {
            max-width: 100%;
          }

          .collections-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .bookmarks-page {
            padding: 20px 0 60px;
          }

          .bookmarks-layout {
            gap: 24px;
          }

          .collections-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .bookmarks-stats {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
        </div>
    )
} 