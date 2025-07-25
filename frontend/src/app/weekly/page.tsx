'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/ui'
import {
    PageHeader,
    SearchBar,
    ArticleFilter,
    ArticleCard,
    Pagination,
    SubscriptionSection
} from '@/components/molecules'
import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

// 模拟文章数据
const mockArticles: ArticleCardData[] = [
    {
        id: 'midjourney-monetization-guide',
        title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
        excerpt: '在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。',
        coverImage: '/images/articles/midjourney-guide.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2023-11-22',
        readingTime: '12分钟',
        viewCount: '2.4k',
        tags: ['变现心得', 'AI工具'],
        slug: 'midjourney-monetization-guide',
        isPremium: false
    },
    {
        id: '1',
        title: '如何利用ChatGPT API搭建付费咨询机器人，月入过万的实战指南',
        excerpt: '从零开始教你搭建一个基于ChatGPT API的智能咨询机器人，包含完整的技术方案、商业模式设计和变现策略，助你实现AI创业的第一桶金。',
        coverImage: '/images/articles/chatgpt-bot.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-12-10',
        readingTime: '15分钟',
        viewCount: '2.4k',
        tags: ['技术指南', 'AI工具'],
        slug: 'chatgpt-api-consulting-bot',
        isPremium: false
    },
    {
        id: '2',
        title: 'GPT-4文案系统搭建：打造高转化的AI内容营销机器',
        excerpt: '揭秘如何构建基于GPT-4的自动化文案系统，涵盖prompt工程、内容策略、转化优化等核心技能。',
        coverImage: '/images/articles/gpt4-copywriting.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-12-06',
        readingTime: '18分钟',
        viewCount: '1.8k',
        tags: ['技术指南', '前沿技术'],
        slug: 'gpt4-copywriting-system',
        isPremium: false
    },
    {
        id: '3',
        title: 'Midjourney变现完整指南：从新手到月入万元的实战路径',
        excerpt: '详细拆解Midjourney的商业变现模式，包含接单技巧、定价策略、客户开发等实用方法，适合零基础用户。',
        coverImage: '/images/articles/midjourney-guide.svg',
        author: {
            name: '张先生',
            avatar: '/images/avatars/user-zhang-zhichuang.svg'
        },
        publishedAt: '2024-12-04',
        readingTime: '12分钟',
        viewCount: '3.1k',
        tags: ['AI工具', '实战案例'],
        slug: 'midjourney-monetization-guide',
        isPremium: false
    },
    {
        id: '4',
        title: '无代码AI应用开发：零基础打造你的第一个AI产品',
        excerpt: '使用无代码平台快速构建AI应用的完整教程，包含工具选择、产品设计、部署上线等关键步骤。',
        coverImage: '/images/articles/nocode-platform.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-12-02',
        readingTime: '14分钟',
        viewCount: '1.5k',
        tags: ['技术指南', '前沿技术'],
        slug: 'nocode-ai-development',
        isPremium: false
    },
    {
        id: '5',
        title: 'AI内容自动化：搭建智能内容生产流水线',
        excerpt: '学会整合多个AI工具，构建高效的内容自动化生产流程，从创意生成到发布全流程自动化。',
        coverImage: '/images/articles/ai-content-automation.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-11-28',
        readingTime: '16分钟',
        viewCount: '2.2k',
        tags: ['增长黑客', 'AI工具'],
        slug: 'ai-content-automation',
        isPremium: true
    },
    {
        id: '6',
        title: 'AI辅助创业：从想法到产品的完整路径',
        excerpt: '利用AI工具降低创业门槛，包括市场调研、产品设计、营销推广等各个环节的AI应用实践。',
        coverImage: '/images/articles/ai-assistant.svg',
        author: {
            name: '张先生',
            avatar: '/images/avatars/user-zhang-zhichuang.svg'
        },
        publishedAt: '2024-11-25',
        readingTime: '20分钟',
        viewCount: '1.9k',
        tags: ['实战案例', '增长黑客'],
        slug: 'ai-assisted-entrepreneurship',
        isPremium: true
    },
    {
        id: '7',
        title: 'AI艺术变现全攻略：数字艺术的商业化之路',
        excerpt: '深入探讨AI艺术创作的各种变现模式，从NFT销售到定制服务，帮你找到适合的商业路径。',
        coverImage: '/images/articles/ai-art-guide.svg',
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg'
        },
        publishedAt: '2024-11-22',
        readingTime: '13分钟',
        viewCount: '2.8k',
        tags: ['变现心得', 'AI工具'],
        slug: 'ai-art-monetization',
        isPremium: false
    },
    {
        id: '8',
        title: 'ChatGPT私域运营：AI驱动的用户增长策略',
        excerpt: '运用ChatGPT优化私域运营流程，提升用户留存和转化率，打造高效的AI驱动增长体系。',
        coverImage: '/images/articles/ai-mcn.svg',
        author: {
            name: '张先生',
            avatar: '/images/avatars/user-zhang-zhichuang.svg'
        },
        publishedAt: '2024-11-20',
        readingTime: '17分钟',
        viewCount: '1.7k',
        tags: ['增长黑客', '技术指南'],
        slug: 'chatgpt-private-domain',
        isPremium: true
    }
]

// 筛选选项 - 按设计稿精确还原
const filterOptions = [
    {
        id: 'latest',
        label: '最新发布',
        count: 12,
        colors: {
            background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
            text: '#FFFFFF'
        }
    },
    {
        id: 'tech-guide',
        label: '技术指南',
        count: 5,
        colors: {
            background: 'rgba(12, 30, 71, 0.80)',
            border: 'rgba(59, 130, 246, 0.40)',
            text: '#3B82F6'
        }
    },
    {
        id: 'monetization',
        label: '变现心得',
        count: 3,
        colors: {
            background: 'rgba(58, 23, 8, 0.80)',
            border: 'rgba(249, 115, 22, 0.40)',
            text: '#F97316'
        }
    },
    {
        id: 'case-study',
        label: '实战案例',
        count: 4,
        colors: {
            background: 'rgba(12, 40, 23, 0.80)',
            border: 'rgba(16, 185, 129, 0.40)',
            text: '#10B981'
        }
    },
    {
        id: 'ai-tools',
        label: 'AI工具',
        count: 7,
        colors: {
            background: 'rgba(30, 12, 71, 0.80)',
            border: 'rgba(139, 92, 246, 0.40)',
            text: '#8B5CF6'
        }
    },
    {
        id: 'trending',
        label: '前沿技术',
        count: 3,
        colors: {
            background: 'rgba(30, 58, 138, 0.80)',
            border: 'rgba(96, 165, 250, 0.40)',
            text: '#60A5FA'
        }
    },
    {
        id: 'hot',
        label: '热门趋势',
        count: 12,
        colors: {
            background: 'rgba(127, 29, 29, 0.80)',
            border: 'rgba(252, 165, 165, 0.40)',
            text: '#FCA5A5'
        }
    }
]

const ITEMS_PER_PAGE = 6

export default function WeeklyPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('latest')
    const [currentPage, setCurrentPage] = useState(1)
    const [isSearching, setIsSearching] = useState(false)

    // 筛选和搜索逻辑
    const filteredArticles = useMemo(() => {
        let filtered = mockArticles

        // 应用搜索筛选
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.excerpt?.toLowerCase().includes(query) ||
                article.tags.some(tag => tag.toLowerCase().includes(query))
            )
        }

        // 应用分类筛选
        switch (activeFilter) {
            case 'latest':
                filtered = filtered.sort((a, b) =>
                    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                )
                break
            case 'hot':
                filtered = filtered.sort((a, b) =>
                    parseInt(b.viewCount.replace('k', '000').replace('.', '')) -
                    parseInt(a.viewCount.replace('k', '000').replace('.', ''))
                )
                break
            case 'ai-tools':
                filtered = filtered.filter(article =>
                    article.tags.some(tag => tag === 'AI工具')
                )
                break
            case 'monetization':
                filtered = filtered.filter(article =>
                    article.tags.some(tag => tag === '变现心得')
                )
                break
            case 'tech-guide':
                filtered = filtered.filter(article =>
                    article.tags.some(tag => tag === '技术指南')
                )
                break
            case 'case-study':
                filtered = filtered.filter(article =>
                    article.tags.some(tag => tag === '实战案例')
                )
                break
            case 'trending':
                filtered = filtered.filter(article =>
                    article.tags.some(tag => tag === '前沿技术')
                )
                break
            default:
                break
        }

        return filtered
    }, [searchQuery, activeFilter])

    // 分页逻辑
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)
    const paginatedArticles = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [filteredArticles, currentPage])

    // 搜索变化时重置分页并添加加载状态
    const handleSearch = (query: string) => {
        setIsSearching(true)
        setSearchQuery(query)
        setCurrentPage(1)

        // 模拟搜索延迟，提供更好的用户反馈
        setTimeout(() => {
            setIsSearching(false)
        }, 300)
    }

    // 筛选变化时重置分页
    const handleFilterChange = (filterId: string) => {
        setActiveFilter(filterId)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div style={{
            color: '#FFFFFF',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            minHeight: '100vh',
            paddingTop: '80px' // 为固定头部留出空间
        }}>
            <div style={{ paddingBottom: '80px' }}>
                <Container size="xl">
                    {/* 页面头部 */}
                    <PageHeader
                        title="精选AI变现周刊"
                        subtitle="每周精选AI变现干货，助你快速实现财务自由"
                        description=""
                        alignment="center"
                        className="page-header"
                    />

                    {/* 搜索和筛选区域 */}
                    <div
                        className="search-filter-container"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-6)',
                            marginBottom: '60px'
                        }}>
                        {/* 搜索栏 - 优化视觉比例 */}
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <div
                                className="search-container"
                                style={{
                                    width: '100%',
                                    maxWidth: '800px' // 更合理的搜索框比例
                                }}>
                                <SearchBar
                                    placeholder="搜索文章、工具、案例..."
                                    onSearch={handleSearch}
                                    isLoading={isSearching}
                                />
                            </div>
                        </div>

                        {/* P1-4: 外部结果统计 - 优化位置布局 */}
                        {searchQuery.trim() && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center', // 居中对齐整个容器
                                marginBottom: '24px'
                            }}>
                                <div
                                    className="search-result-stats"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        maxWidth: '800px', // 与搜索框保持一致的最大宽度
                                        color: '#9CA3AF',
                                        fontSize: '14px',
                                        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                                        paddingLeft: '4px', // 微调左边距，与搜索框内容对齐
                                        paddingRight: '4px'
                                    }}>
                                    <div>
                                        {isSearching ? (
                                            <span>搜索中...</span>
                                        ) : (
                                            <span>
                                                搜索 &ldquo;{searchQuery}&rdquo; 找到 <strong style={{ color: '#D1D5DB' }}>{filteredArticles.length}</strong> 个相关结果
                                            </span>
                                        )}
                                    </div>
                                    {filteredArticles.length > 0 && (
                                        <button
                                            onClick={() => handleSearch('')}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid rgba(42, 42, 42, 0.70)',
                                                borderRadius: '6px',
                                                padding: '4px 8px',
                                                color: '#9CA3AF',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.50)'
                                                e.currentTarget.style.color = '#D1D5DB'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = 'rgba(42, 42, 42, 0.70)'
                                                e.currentTarget.style.color = '#9CA3AF'
                                            }}
                                        >
                                            清空搜索
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 筛选器 */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <ArticleFilter
                                options={filterOptions}
                                activeFilter={activeFilter}
                                onFilterChange={handleFilterChange}
                                className="article-filter"
                            />
                        </div>
                    </div>

                    {/* 文章列表 */}
                    {paginatedArticles.length > 0 ? (
                        <>
                            <div
                                className="articles-grid"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '24px',
                                    marginBottom: '48px', // 减少底部间距，让分页更贴近文章
                                    maxWidth: '1375px',
                                    margin: '0 auto 48px auto' // 减少底部间距
                                }}>
                                {paginatedArticles.map((article) => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                        variant="vertical"
                                        showExcerpt={true}
                                    />
                                ))}
                            </div>

                            {/* 分页导航 - 优化间距，提升用户体验 */}
                            {totalPages > 1 && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '0px', // 移除上边距，让分页更贴近文章
                                    marginBottom: '60px' // 增加下边距，给订阅区域更多空间
                                }}>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                        showFirstLast={false}
                                    />
                                </div>
                            )}

                            {/* 订阅AI变现周刊区域 - 按设计稿1:1还原 */}
                            <div style={{
                                marginTop: totalPages > 1 ? '0px' : '60px', // 有分页时无上边距，无分页时保持间距
                                marginBottom: '0px'
                            }}>
                                <SubscriptionSection />
                            </div>
                        </>
                    ) : (
                        // P1-6: 优化空搜索结果状态 - 更智能更友好
                        <div
                            className="empty-state"
                            style={{
                                textAlign: 'center',
                                padding: '80px 0',
                                color: 'var(--color-text-secondary)'
                            }}>
                            {searchQuery.trim() ? (
                                // 搜索无结果状态
                                <>
                                    <div style={{
                                        fontSize: '48px',
                                        marginBottom: '20px',
                                        opacity: 0.4,
                                        animation: 'pulse 2s ease-in-out infinite'
                                    }}>
                                        🔍
                                    </div>
                                    <h3 style={{
                                        fontSize: 'var(--font-size-2xl)',
                                        color: 'var(--color-text-primary)',
                                        marginBottom: '12px',
                                        fontWeight: '600'
                                    }}>
                                        未找到相关内容
                                    </h3>
                                    <p style={{
                                        fontSize: 'var(--font-size-base)',
                                        marginBottom: '32px',
                                        lineHeight: '1.6',
                                        color: '#9CA3AF'
                                    }}>
                                        没有找到包含 &ldquo;<span style={{
                                            color: 'var(--color-primary-blue)',
                                            fontWeight: '500'
                                        }}>{searchQuery}</span>&rdquo; 的内容
                                    </p>

                                    {/* 搜索建议 */}
                                    <div style={{
                                        marginBottom: '32px'
                                    }}>
                                        <p style={{
                                            fontSize: 'var(--font-size-sm)',
                                            color: '#9CA3AF',
                                            marginBottom: '16px'
                                        }}>
                                            试试这些热门搜索：
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '8px',
                                            justifyContent: 'center',
                                            marginBottom: '24px'
                                        }}>
                                            {['ChatGPT', 'AI工具', 'Midjourney', '变现', 'GPT-4', '无代码'].map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    className="suggestion-button"
                                                    onClick={() => handleSearch(suggestion)}
                                                    style={{
                                                        background: 'rgba(59, 130, 246, 0.1)',
                                                        border: '1px solid rgba(59, 130, 246, 0.3)',
                                                        borderRadius: '20px',
                                                        padding: '6px 16px',
                                                        color: '#60A5FA',
                                                        fontSize: 'var(--font-size-sm)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                                        fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                                                        opacity: 0 // 初始透明，动画控制显示
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
                                                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                                                        e.currentTarget.style.transform = 'translateY(-1px)'
                                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)'
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
                                                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                                                        e.currentTarget.style.transform = 'translateY(0)'
                                                        e.currentTarget.style.boxShadow = 'none'
                                                    }}
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSearchQuery('')
                                            setActiveFilter('latest')
                                            setCurrentPage(1)
                                        }}
                                        style={{
                                            background: 'var(--gradient-primary)',
                                            color: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '14px 28px',
                                            fontSize: 'var(--font-size-base)',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                                            minWidth: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)'
                                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)'
                                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)'
                                        }}
                                    >
                                        查看全部文章
                                    </button>
                                </>
                            ) : (
                                // 分类无内容状态
                                <>
                                    <div style={{
                                        fontSize: '72px',
                                        marginBottom: '24px',
                                        opacity: 0.3
                                    }}>
                                        📝
                                    </div>
                                    <h3 style={{
                                        fontSize: 'var(--font-size-3xl)',
                                        color: 'var(--color-text-primary)',
                                        marginBottom: '16px'
                                    }}>
                                        该分类暂无文章
                                    </h3>
                                    <p style={{
                                        fontSize: 'var(--font-size-lg)',
                                        marginBottom: '32px'
                                    }}>
                                        敬请期待更多精彩内容
                                    </p>
                                    <button
                                        onClick={() => {
                                            setActiveFilter('latest')
                                            setCurrentPage(1)
                                        }}
                                        style={{
                                            background: 'var(--gradient-primary)',
                                            color: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: 'var(--radius-lg)',
                                            padding: '12px 24px',
                                            fontSize: 'var(--font-size-base)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            minWidth: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        查看最新文章
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </Container>
            </div>

            {/* 响应式样式和动画 */}
            <style jsx>{`
                .search-container {
                    max-width: 800px;
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
                        grid-template-columns: repeat(2, 1fr) !important;
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