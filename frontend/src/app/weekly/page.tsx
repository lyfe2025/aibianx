'use client'

import { Container } from '@/components/ui'
import { PageHeader, SubscriptionSection } from '@/components/molecules'
import {
    WeeklySearchSection,
    WeeklyArticleGrid,
    WeeklyEmptyState,
    WeeklyPagination
} from '@/components/molecules'
import { useWeeklyLogicWithAPI } from '@/lib/hooks'
import { PAGE_CONFIG, STYLES_CONFIG } from '@/constants/weeklyConfig'

/**
 * WeeklyPage 组件 - 精选AI变现周刊页面
 * 
 * 功能特性：
 * - 页面标题和描述
 * - 智能搜索功能
 * - 多维度文章筛选
 * - 响应式文章网格
 * - 分页导航
 * - 空状态处理
 * - 订阅区域
 * - 真实Strapi API集成
 * 
 * 设计规范：
 * - 1440px容器最大宽度
 * - 3列网格布局（桌面端）
 * - 响应式适配移动端
 * - 毛玻璃效果和渐变设计
 * - 平滑动画过渡
 */
export default function WeeklyPage() {
  // 使用API版本的Hook管理所有状态和逻辑
    const {
        searchQuery,
        activeFilter,
        isSearching,
    isLoading,
    connectionError,
    articles,
        totalPages,
    totalCount,
        currentPage,
        hasResults,
        handleSearch,
        handleFilterChange,
        handlePageChange,
        resetToDefaults,
    clearSearch,
    refetch
  } = useWeeklyLogicWithAPI()

    return (
        <div style={{
            color: 'var(--color-text-primary)',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            minHeight: '100vh',
            paddingTop: STYLES_CONFIG.container.paddingTop
        }}>
            <div style={{
                paddingBottom: STYLES_CONFIG.container.paddingBottom
            }}>
                <Container size="xl">
                    {/* 页面头部 */}
                    <PageHeader
                        title={PAGE_CONFIG.title}
                        subtitle={PAGE_CONFIG.subtitle}
                        description=""
                        alignment="center"
                        className="page-header"
                    />

                    {/* 搜索和筛选区域 */}
                    <WeeklySearchSection
                        searchQuery={searchQuery}
                        activeFilter={activeFilter}
                        isSearching={isSearching}
                        totalResults={totalCount}
                        onSearch={handleSearch}
                        onFilterChange={handleFilterChange}
                        onClearSearch={clearSearch}
                    />

                    {/* 主要内容区域 */}
                    {isLoading ? (
                        /* 加载状态 */
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 20px',
                            color: 'var(--color-text-secondary)'
                        }}>
                            <div style={{ fontSize: 'var(--font-size-lg)' }}>
                                加载文章中...
                            </div>
                        </div>
                    ) : connectionError ? (
                        /* 连接错误状态 */
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 20px',
                            color: 'var(--color-text-secondary)'
                        }}>
                            <div style={{ fontSize: 'var(--font-size-lg)', marginBottom: '16px' }}>
                                无法连接到后端服务
                            </div>
                            <button 
                                onClick={refetch}
                                style={{
                                    background: 'var(--gradient-primary)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '8px 16px',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                重试
                            </button>
                        </div>
                    ) : hasResults ? (
                        <>
                            {/* 文章网格 */}
                            <WeeklyArticleGrid articles={articles} />

                            {/* 分页导航 */}
                            <WeeklyPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />

                            {/* 订阅区域 */}
                            <div style={{
                                marginTop: totalPages > 1 ? '0px' : STYLES_CONFIG.spacing.sectionGap,
                                marginBottom: '0px'
                            }}>
                                <SubscriptionSection />
                            </div>
                        </>
                    ) : (
                        /* 空状态 */
                        <WeeklyEmptyState
                            searchQuery={searchQuery}
                            onSearch={handleSearch}
                            onResetToDefaults={resetToDefaults}
                        />
                    )}
                </Container>
            </div>

            {/* CSS样式 - 响应式设计和动画 */}
            <style jsx>{`
        .search-container {
          max-width: ${STYLES_CONFIG.searchContainer.maxWidth};
        }

        /* 动画效果 */
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 搜索建议按钮动画 */
        .suggestion-button {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .suggestion-button:nth-child(1) { animation-delay: 0.1s; }
        .suggestion-button:nth-child(2) { animation-delay: 0.2s; }
        .suggestion-button:nth-child(3) { animation-delay: 0.3s; }
        .suggestion-button:nth-child(4) { animation-delay: 0.4s; }
        .suggestion-button:nth-child(5) { animation-delay: 0.5s; }
        .suggestion-button:nth-child(6) { animation-delay: 0.6s; }

        /* 响应式设计 */
        @media (max-width: 1024px) {
          .search-container {
            max-width: 700px;
          }
        }

        @media (max-width: 768px) {
          .search-container {
            max-width: 100%;
          }
          
          .articles-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-6) !important;
            max-width: 400px !important;
          }
          
          .search-filter-container {
            gap: var(--spacing-4) !important;
          }
          
          .article-filter {
            justify-content: flex-start !important;
            overflow-x: auto;
            padding-bottom: var(--spacing-2);
          }

          /* 移动端搜索建议优化 */
          .suggestion-button {
            font-size: 12px !important;
            padding: 4px 12px !important;
          }

          /* 移动端搜索结果统计优化 */
          .search-result-stats {
            flex-direction: column !important;
            gap: 12px !important;
            text-align: center !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .search-result-stats > div:first-child {
            font-size: 13px !important;
          }
        }

        @media (max-width: 1200px) {
          .articles-grid {
            grid-template-columns: ${STYLES_CONFIG.articlesGrid.tablet} !important;
            gap: 20px !important;
            max-width: 900px !important;
          }
        }

        @media (max-width: 480px) {
          .page-header {
            padding: 60px 0 40px !important;
          }
          
          .empty-state {
            padding: 60px 20px !important;
          }
          
          .empty-state h3 {
            font-size: var(--font-size-xl) !important;
          }

          .empty-state p {
            font-size: var(--font-size-sm) !important;
          }
        }
      `}</style>
        </div>
    )
} 