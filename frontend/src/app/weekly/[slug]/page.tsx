'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import {
    ArticleHeader,
    ArticleContent,
    AuthorCard,
    RelatedArticles
} from '@/components/molecules'

interface ArticleDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

// 模拟文章详情数据
const mockArticleData = {
    'chatgpt-api-consulting-bot': {
        id: '1',
        title: '如何利用ChatGPT API搭建付费咨询机器人，月入过万的实战指南',
        content: `
# 前言

在AI时代，如何利用ChatGPT API打造一个盈利的咨询机器人？本文将从技术实现到商业变现，为你提供完整的实战指南。

## 技术架构设计

### 1. 系统架构概览

我们的咨询机器人系统主要包含以下几个核心模块：

- **用户界面模块**：提供友好的交互界面
- **API调用模块**：与ChatGPT API进行通信
- **支付系统**：处理用户付费逻辑
- **用户管理**：管理用户账户和会话记录

### 2. 核心代码实现

以下是一个基础的ChatGPT API调用示例：

\`\`\`javascript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatCompletion(messages) {
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 1000,
  });
  
  return completion.choices[0].message.content;
}
\`\`\`

## 商业模式设计

### 按次付费模式

最适合初期的变现方式：

- **咨询定价**：每次对话收费5-20元
- **专业咨询**：针对特定领域提供高价值服务
- **会员制度**：月费/年费模式，提供更多功能

### 目标用户分析

1. **小企业主**：寻求快速的商业建议
2. **学生群体**：需要学习和作业辅导
3. **专业人士**：寻求特定领域的专业建议

## 实战案例分享

### 案例一：法律咨询机器人

> 通过专门训练的提示词，我们为一家律师事务所开发了法律咨询机器人，**月收入达到3万元**。

关键成功因素：
- 专业的法律知识库
- 精准的用户定位
- 合理的定价策略

### 案例二：心理健康咨询

针对都市白领的心理健康需求：

- 提供24小时在线咨询服务
- 结合专业心理学理论
- 建立用户信任关系

## 技术优化建议

### 1. 提示词工程

设计高质量的系统提示词是成功的关键：

\`\`\`
你是一位经验丰富的商业顾问，擅长为中小企业提供实用的经营建议...
\`\`\`

### 2. 成本控制

- **Token优化**：合理控制输入输出长度
- **缓存策略**：对常见问题使用缓存
- **模型选择**：根据场景选择合适的模型

## 营销推广策略

### 初期获客

1. **内容营销**：通过优质内容吸引用户
2. **社交媒体**：利用微信群、QQ群等渠道
3. **合作推广**：与相关服务商建立合作关系

### 用户留存

- **个性化体验**：记录用户偏好，提供定制化服务
- **反馈机制**：及时收集用户反馈，持续优化
- **会员权益**：为付费用户提供更多价值

## 法律合规要求

⚠️ **重要提醒**：

- 确保服务内容符合相关法律法规
- 明确服务免责声明
- 保护用户隐私数据
- 避免涉及敏感话题

## 总结

通过合理的技术架构、清晰的商业模式和有效的营销策略，ChatGPT API咨询机器人完全可以实现月入过万的目标。关键在于：

1. **找准细分市场**
2. **提供真正的价值**
3. **持续优化用户体验**
4. **建立品牌信任度**

希望这份实战指南能够帮助你在AI变现的道路上迈出重要一步！
        `,
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg',
            bio: 'AI创业导师，专注人工智能商业化应用',
            followersCount: '1.2k',
            articlesCount: '45',
            specialties: ['AI应用', 'ChatGPT', '商业变现', '技术创业']
        },
        publishedAt: '2024-12-10',
        readingTime: '15分钟',
        viewCount: '2.4k',
        likeCount: '186',
        tags: [
            { name: '技术指南', color: '#3B82F6' },
            { name: 'AI工具', color: '#8B5CF6' }
        ],
        isPremium: false
    }
}

// 模拟相关文章数据
const mockRelatedArticles = [
    {
        id: '2',
        title: 'GPT-4文案系统搭建：打造高转化的AI内容营销机器',
        excerpt: '揭秘如何构建基于GPT-4的自动化文案系统，涵盖prompt工程、内容策略、转化优化等核心技能。',
        publishedAt: '2024-12-06',
        readingTime: '18分钟',
        viewCount: '1.8k',
        slug: 'gpt4-copywriting-system',
        isPremium: false
    },
    {
        id: '3',
        title: '无代码AI应用开发：零基础打造你的第一个AI产品',
        excerpt: '使用无代码平台快速构建AI应用的完整教程，包含工具选择、产品设计、部署上线等关键步骤。',
        publishedAt: '2024-12-02',
        readingTime: '14分钟',
        viewCount: '2.2k',
        slug: 'no-code-ai-development',
        isPremium: false
    },
    {
        id: '4',
        title: 'AI语音克隆技术商业应用：声音变现的新蓝海',
        excerpt: '探索AI语音技术的商业化应用场景，从配音服务到个人IP打造，详解声音经济时代的变现机会。',
        publishedAt: '2024-12-04',
        readingTime: '10分钟',
        viewCount: '1.5k',
        slug: 'ai-voice-cloning-business',
        isPremium: true
    }
]

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
    const [slug, setSlug] = useState<string>('')
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    // 解析params
    useEffect(() => {
        params.then(resolvedParams => {
            setSlug(resolvedParams.slug)
        })
    }, [params])

    // 根据slug获取文章数据（实际项目中应该从API获取）
    const article = slug ? mockArticleData[slug as keyof typeof mockArticleData] : null

    if (!slug) {
        // 加载中状态
        return (
            <div style={{
                color: '#FFFFFF',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '80px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Container size="md">
                        <div style={{
                            fontSize: 'var(--font-size-2xl)',
                            color: 'var(--color-text-secondary)'
                        }}>
                            加载中...
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    if (!article) {
        // 404页面
        return (
            <div style={{
                color: '#FFFFFF',
                fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '80px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Container size="md">
                        <h1 style={{
                            fontSize: 'var(--font-size-8xl)',
                            fontWeight: '700',
                            color: 'var(--color-text-muted)',
                            marginBottom: 'var(--spacing-4)'
                        }}>
                            404
                        </h1>
                        <h2 style={{
                            fontSize: 'var(--font-size-3xl)',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-2)'
                        }}>
                            文章不存在
                        </h2>
                        <p style={{
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-text-secondary)',
                            marginBottom: 'var(--spacing-6)'
                        }}>
                            抱歉，您访问的文章不存在或已被删除
                        </p>
                        <Link
                            href="/weekly"
                            style={{
                                display: 'inline-block',
                                background: 'var(--gradient-primary)',
                                color: '#FFFFFF',
                                textDecoration: 'none',
                                padding: '12px 24px',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: 'var(--font-size-base)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            返回周刊首页
                        </Link>
                    </Container>
                </div>
            </div>
        )
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
        // TODO: 实现点赞API调用
    }

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked)
        // TODO: 实现收藏API调用
    }

    const handleShare = () => {
        // 实现分享功能
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: `来看看这篇关于AI变现的精彩文章：${article.title}`,
                url: window.location.href
            })
        } else {
            // 降级到复制链接
            navigator.clipboard.writeText(window.location.href)
            alert('链接已复制到剪贴板')
        }
    }

    const handleFollow = () => {
        setIsFollowing(!isFollowing)
        // TODO: 实现关注API调用
    }

    return (
        <div style={{
            color: '#FFFFFF',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            minHeight: '100vh',
            paddingTop: '80px' // 为固定头部留出空间
        }}>
            <Container size="xl">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 300px',
                    gap: '40px',
                    alignItems: 'start',
                    paddingBottom: '80px'
                }}>
                    {/* 主内容区域 */}
                    <main>
                        {/* 文章头部 */}
                        <ArticleHeader
                            title={article.title}
                            author={article.author}
                            publishedAt={article.publishedAt}
                            readingTime={article.readingTime}
                            viewCount={article.viewCount}
                            likeCount={article.likeCount}
                            tags={article.tags}
                            isPremium={article.isPremium}
                            onLike={handleLike}
                            onBookmark={handleBookmark}
                            onShare={handleShare}
                            isLiked={isLiked}
                            isBookmarked={isBookmarked}
                        />

                        {/* 文章内容 */}
                        <div style={{ marginBottom: '60px' }}>
                            <ArticleContent
                                content={article.content}
                            />
                        </div>

                        {/* 相关文章推荐 */}
                        <RelatedArticles
                            articles={mockRelatedArticles}
                            title="相关推荐"
                        />
                    </main>

                    {/* 侧边栏 */}
                    <aside style={{
                        position: 'sticky',
                        top: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-6)'
                    }}>
                        {/* 作者信息卡片 */}
                        <AuthorCard
                            author={{
                                name: article.author.name,
                                avatar: article.author.avatar,
                                bio: article.author.bio || '',
                                followersCount: article.author.followersCount,
                                articlesCount: article.author.articlesCount,
                                specialties: article.author.specialties
                            }}
                            onFollow={handleFollow}
                            isFollowing={isFollowing}
                        />

                        {/* 目录导航（可选功能） */}
                        <div className="glass-card" style={{
                            padding: 'var(--spacing-5)'
                        }}>
                            <h4 style={{
                                fontSize: 'var(--font-size-lg)',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)',
                                marginBottom: 'var(--spacing-3)',
                                paddingBottom: 'var(--spacing-2)',
                                borderBottom: '1px solid var(--color-border-primary)'
                            }}>
                                文章目录
                            </h4>
                            <nav style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-2)'
                            }}>
                                <a href="#前言" style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    padding: '4px 0',
                                    transition: 'color 0.2s ease'
                                }}>前言</a>
                                <a href="#技术架构设计" style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    padding: '4px 0',
                                    transition: 'color 0.2s ease'
                                }}>技术架构设计</a>
                                <a href="#商业模式设计" style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    padding: '4px 0',
                                    transition: 'color 0.2s ease'
                                }}>商业模式设计</a>
                                <a href="#实战案例分享" style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    padding: '4px 0',
                                    transition: 'color 0.2s ease'
                                }}>实战案例分享</a>
                                <a href="#总结" style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    padding: '4px 0',
                                    transition: 'color 0.2s ease'
                                }}>总结</a>
                            </nav>
                        </div>
                    </aside>
                </div>
            </Container>

            {/* 响应式样式 */}
            <style jsx>{`
                @media (max-width: 1024px) {
                    main {
                        grid-column: 1 / -1 !important;
                    }
                    aside {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    )
} 