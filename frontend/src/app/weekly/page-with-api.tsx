'use client'

import { Container } from '@/components/ui'
import { PageHeader, SubscriptionSection } from '@/components/molecules'
import {
    WeeklySearchSection,
    WeeklyArticleGrid,
    WeeklyEmptyState,
    WeeklyPagination
} from '@/components/molecules'
import { useWeeklyLogicWithAPI } from '@/lib/hooks/useWeeklyLogicWithAPI'
import { PAGE_CONFIG, STYLES_CONFIG } from '@/constants/weeklyConfig'

/**
 * WeeklyPageWithAPI 组件 - API版本的Weekly页面
 * 
 * 功能特性：
 * - 连接真实Strapi API
 * - 智能搜索功能
 * - 多维度文章筛选
 * - 响应式文章网格
 * - 分页导航
 * - 空状态处理
 * - 错误状态处理
 * - 加载状态
 */
export default function WeeklyPageWithAPI() {
    // 使用API版本的Hook
    const {
        searchQuery,
        activeFilter,
        isSearching,
        isLoading,
        connectionError,
        articles,
        totalPages,
        currentPage,
        hasResults,
        totalCount,
        handleSearch,
        handleFilterChange,
        handlePageChange,
        resetToDefaults,
        clearSearch,
        refetch
    } = useWeeklyLogicWithAPI()

    // 渲染加载状态
    if (isLoading && articles.length === 0) {
        return (
            <div style={{
                color: 'var(--color-text-primary)',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                minHeight: '100vh',
                paddingTop: STYLES_CONFIG.container.paddingTop,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Container size="xl">
                    <div style={{
                        textAlign: 'center',
                        padding: '120px 20px'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            border: '4px solid var(--color-border-primary)',
                            borderTop: '4px solid var(--color-primary-blue)',
                            borderRadius: '50%',
                            margin: '0 auto 24px',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <h3 style={{
                            fontSize: 'var(--font-size-xl)',
                            marginBottom: '8px',
                            color: 'var(--color-text-primary)'
                        }}>加载文章中...</h3>
                        <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)'
                        }}>正在从API获取最新内容</p>
                    </div>
                </Container>
                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        )
    }

    // 渲染连接错误状态
    if (connectionError) {
        return (
            <div style={{
                color: 'var(--color-text-primary)',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                minHeight: '100vh',
                paddingTop: STYLES_CONFIG.container.paddingTop
            }}>
                <Container size="xl">
                    <div style={{
                        textAlign: 'center',
                        padding: '120px 20px'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'var(--color-bg-secondary)',
                            borderRadius: '50%',
                            margin: '0 auto 24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>⚠️</div>
                        <h3 style={{
                            fontSize: 'var(--font-size-2xl)',
                            marginBottom: '16px',
                            color: 'var(--color-text-primary)'
                        }}>无法连接到服务器</h3>
                        <p style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-muted)',
                            marginBottom: '32px',
                            maxWidth: '480px',
                            margin: '0 auto 32px'
                        }}>
                            无法连接到Strapi CMS服务器。请确保后端服务正在运行。
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button
                                onClick={refetch}
                                style={{
                                    background: 'var(--gradient-primary)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-full)',
                                    padding: '12px 24px',
                                    color: 'white',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                }}
                            >
                                重试连接
                            </button>
                            <button
                                onClick={() => window.location.href = '/weekly'}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--color-border-primary)',
                                    borderRadius: 'var(--radius-full)',
                                    padding: '12px 24px',
                                    color: 'var(--color-text-primary)',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = 'var(--color-bg-secondary)'
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = 'transparent'
                                }}
                            >
                                使用离线版本
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

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
                        title={`${PAGE_CONFIG.title} (API版本)`}
                        subtitle={`${PAGE_CONFIG.subtitle} - 连接到Strapi CMS`}
                        description=""
                        alignment="center"
                        className="page-header"
                    />

                    {/* API状态指示器 */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '32px',
                        padding: '12px 20px',
                        background: 'var(--color-bg-glass)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-border-primary)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-muted)'
                    }}>
                        📡 已连接到API服务器 • 共找到 {totalCount} 篇文章
                    </div>

                    {/* 搜索和筛选区域 */}
                    <WeeklySearchSection
                        searchQuery={searchQuery}
                        activeFilter={activeFilter}
                        isSearching={isSearching || isLoading}
                        totalResults={totalCount}
                        onSearch={handleSearch}
                        onFilterChange={handleFilterChange}
                        onClearSearch={clearSearch}
                    />

                    {/* 主要内容区域 */}
                    {hasResults ? (
                        <>
                            {/* 文章网格 */}
                            <div style={{ position: 'relative' }}>
                                {isLoading && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'rgba(3, 3, 3, 0.5)',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 10
                                    }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            border: '3px solid var(--color-border-primary)',
                                            borderTop: '3px solid var(--color-primary-blue)',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }}></div>
                                    </div>
                                )}
                                <WeeklyArticleGrid articles={articles} />
                            </div>

                            {/* 分页导航 */}
                            {totalPages > 1 && (
                                <WeeklyPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}

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

            {/* CSS样式 */}
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* 响应式设计 */
                @media (max-width: 768px) {
                    .articles-grid {
                        grid-template-columns: 1fr !important;
                        gap: var(--spacing-6) !important;
                        max-width: 400px !important;
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
                }
            `}</style>
        </div>
    )
} 