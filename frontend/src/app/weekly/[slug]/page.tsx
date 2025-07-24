'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, Icon, Avatar, TagList } from '@/components/ui'
import {
    ArticleContent,
    RelatedArticles
} from '@/components/molecules'

interface ArticleDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

// 模拟文章详情数据 - 使用新的标签管理系统
const mockArticleData = {
    'midjourney-monetization-guide': {
        id: 'midjourney-monetization-guide',
        title: 'Midjourney变现指南：如何利用AI绘画技术月入过万',
        content: `
在AI技术飞速发展的今天，Midjourney已经成为数字艺术创作领域的一颗璀璨明星。这款强大的AI绘画工具不仅让没有绘画基础的普通人也能创作出精美图像，更为有远见的创作者开辟了全新的收入渠道。本文将系统地介绍如何利用Midjourney进行商业化变现，帮助你从零开始，逐步实现月入过万的目标。

# 一、了解Midjourney的核心优势

Midjourney作为顶级AI绘画工具，拥有以下几个核心优势：

- **惊人的艺术表现力**：Midjourney生成的图像具有极高的艺术性，风格多变，细节丰富
- **简单的学习曲线**：即使没有专业绘画背景，也能通过文字描述（Prompt）快速生成高质量图像
- **高效的创作速度**：几秒钟内可生成多个设计方案，大大提升工作效率
- **低成本高回报**：相比传统设计外包，成本极低但产出质量很高

这些优势为创作者提供了强有力的商业化基础。

# 二、核心变现途径详解

## 1. 数字艺术品销售

创作并销售数字艺术品是最直接的变现方式。你可以：

- 在Etsy、Redbubble等平台销售数字下载
- 创建NFT艺术品在OpenSea等平台交易
- 建立个人网站或社交媒体账号直接销售

成功的数字艺术品通常具有以下特征：
- 独特的视觉风格
- 明确的主题定位
- 高分辨率和优秀的构图
- 符合目标市场的审美需求

## 2. 定制设计服务

利用Midjourney为客户提供定制设计服务是一种高利润的变现方式。常见的定制服务包括：

- 品牌视觉素材设计
- 社交媒体配图定制
- 产品包装插画设计
- 书籍/电子书封面设计
- 个性化肖像或礼物定制

> "Midjourney让我能以惊人的速度为客户提供多种设计方案，大大缩短了反馈周期。以前需要一周的工作，现在几小时就能完成，客户满意度也大幅提升。" —— 资深设计师 王明

你可以通过Fiverr、Upwork等自由职业平台，或建立自己的设计服务网站来接单。一个成功的定制设计项目价格通常在300-2000元之间。

# 三、构建可持续的AI绘画变现体系

要实现长期稳定的收入，需要构建一个完整的变现体系：

## 1. 建立个人品牌

- 打造专业社交媒体账号，展示作品集
- 创建个人网站或作品集平台
- 树立特定风格或领域的专业定位
- 积极参与社区讨论，分享知识和经验

## 2. 提升技术能力

- 不断优化Prompt编写技巧
- 学习图像后期处理技术
- 探索Midjourney与其他AI工具的协同使用
- 关注AI绘画领域的最新发展和趋势

# 四、避坑指南与实用建议

## 1. 法律与版权问题

- 确保订阅适当的Midjourney会员计划，获得商业使用权
- 避免生成侵权内容(如知名IP、名人肖像等)
- 了解不同平台的版权政策和使用条款
- 建立清晰的客户合同和授权协议

## 2. 常见陷阱

- **低价竞争**：不要陷入价格战，而是通过提供更高价值的服务来区分自己
- **过度依赖**：不要完全依赖单一AI工具，保持技术多样性
- **忽视市场调研**：在创作前了解市场需求，针对性地生产有商业价值的内容

# 结语：未来展望

Midjourney等AI绘画工具正在重塑创意产业的格局，为创作者提供了前所未有的机遇。通过本文介绍的变现途径和策略，即使是没有传统艺术背景的人也能在这个新兴领域获得成功。

随着技术的不断进步，AI绘画的能力将继续提升，市场需求也会持续增长。那些能够熟练运用AI工具，并具有创新思维的创作者，将在未来的创意经济中占据有利位置。

现在正是进入AI创意变现领域的最佳时机，希望本文能为你的AI变现之路提供有价值的指导和启发。
        `,
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg',
            bio: 'AI创业者 | Midjourney进阶导师 | 数字艺术探索者'
        },
        publishedAt: '2023-11-22',
        readingTime: '12分钟阅读',
        viewCount: '2.4k',
        commentCount: '2.4k',
        likeCount: '678',
        // 使用标签名称数组，由Tag组件自动处理样式
        tags: ['变现心得', 'AI工具'],
        isPremium: false
    },
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
    max_tokens: 500,
    temperature: 0.7,
  });
  return completion.choices[0].message.content;
}
\`\`\`

# 二、商业模式设计

## 1. 付费策略

建议采用多层次的付费模式：

- **免费试用**：每日3次免费咨询
- **基础套餐**：月费49元，每月100次咨询
- **高级套餐**：月费99元，每月300次咨询
- **企业套餐**：月费299元，无限次数咨询

## 2. 技术实现要点

### 用户认证与计费

\`\`\`javascript
// 用户权限验证
const checkUserQuota = async (userId) => {
  const user = await User.findById(userId);
  return user.remainingQuota > 0;
};

// 扣减用户额度
const deductQuota = async (userId) => {
  await User.updateOne(
    { _id: userId },
    { $inc: { remainingQuota: -1 } }
  );
};
\`\`\`

# 三、实现步骤详解

## 第一步：搭建基础框架

1. 选择技术栈（推荐Node.js + Express）
2. 设计数据库结构
3. 实现用户注册登录功能
4. 集成支付系统（微信支付/支付宝）

## 第二步：核心功能开发

1. ChatGPT API集成
2. 会话管理系统
3. 用户额度管理
4. 对话历史记录

## 第三步：优化与推广

1. 响应速度优化
2. 用户体验提升
3. 营销推广策略
4. 数据分析与改进

# 结语

通过合理的技术架构和商业模式，ChatGPT API咨询机器人可以成为一个持续盈利的项目。关键在于提供有价值的服务，并不断优化用户体验。
        `,
        author: {
            name: '李明阳',
            avatar: '/images/avatars/author-li-mingyang.jpeg',
            bio: 'AI创业者 | 技术架构师 | 人工智能实践者'
        },
        publishedAt: '2024-12-10',
        readingTime: '15分钟阅读',
        viewCount: '2.4k',
        commentCount: '1.8k',
        likeCount: '892',
        // 使用标签名称数组
        tags: ['技术指南', 'AI工具'],
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

    return (
        <div style={{
            color: '#FFFFFF',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif",
            minHeight: '100vh',
            paddingTop: '80px',
            paddingLeft: '20px',
            paddingRight: '20px'
        }}>
            <Container size="xl">
                {/* 主要内容区域 - 毛玻璃卡片 */}
                <div
                    className="glass-card"
                    style={{
                        background: 'rgba(26, 26, 26, 0.30)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(42, 42, 42, 0.70)',
                        borderRadius: '16px',
                        padding: '49.95px 31px 31px 31px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        marginBottom: '80px'
                    }}
                >
                    {/* 文章标题 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        minHeight: '36px',
                        marginBottom: '1.19px'
                    }}>
                        <h1 style={{
                            color: '#FFFFFF',
                            fontSize: '28px',
                            fontWeight: '600',
                            lineHeight: '36.4px',
                            width: '100%',
                            alignItems: 'center',
                            display: 'flex',
                            textOverflow: 'ellipsis',
                            minHeight: '36px',
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                        }}>
                            {article.title}
                        </h1>
                    </div>

                    {/* 元信息和标签 */}
                    <div style={{
                        gap: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch'
                    }}>
                        {/* 元信息行 */}
                        <div
                            className="meta-info"
                            style={{
                                gap: '4px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                flexWrap: 'nowrap'
                            }}>
                            <Icon name="date-icon" size="sm" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <div style={{
                                color: '#9CA3AF',
                                fontSize: '14px',
                                lineHeight: '20px',
                                alignItems: 'center',
                                display: 'flex',
                                minHeight: '20px',
                                whiteSpace: 'nowrap',
                                flexShrink: 0
                            }}>
                                {article.publishedAt}
                            </div>
                            <Icon name="reading-time-icon" size="sm" style={{ marginTop: '2px', marginLeft: '11px', flexShrink: 0 }} />
                            <div style={{
                                color: '#9CA3AF',
                                fontSize: '14px',
                                lineHeight: '20px',
                                alignItems: 'center',
                                display: 'flex',
                                minHeight: '20px',
                                whiteSpace: 'nowrap',
                                flexShrink: 0
                            }}>
                                {article.readingTime}
                            </div>
                            <Icon name="comment-icon" size="sm" style={{ marginTop: '2px', marginLeft: '11.01px', flexShrink: 0 }} />
                            <div style={{
                                color: '#9CA3AF',
                                fontSize: '14px',
                                lineHeight: '20px',
                                alignItems: 'center',
                                display: 'flex',
                                minHeight: '20px',
                                whiteSpace: 'nowrap',
                                flexShrink: 0
                            }}>
                                {article.commentCount} 评论
                            </div>
                        </div>

                        {/* 标签行 */}
                        <div
                            className="tags-row"
                            style={{
                                gap: '16px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                flexWrap: 'nowrap',
                                marginBottom: '25px'
                            }}>
                            <TagList
                                tags={article.tags}
                                size="md"
                                maxCount={3}
                                style={{
                                    gap: '8px',
                                    flexWrap: 'nowrap'
                                }}
                            />
                        </div>

                        {/* 作者信息区域 */}
                        <div
                            className="author-info"
                            style={{
                                borderBottom: '1px solid rgba(42, 42, 42, 0.60)',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'stretch',
                                flexDirection: 'row',
                                paddingBottom: '25px',
                                flexWrap: 'nowrap'
                            }}>
                            <div style={{
                                background: 'rgba(59, 130, 246, 0.20)',
                                borderRadius: '24px',
                                width: '48px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'flex-start',
                                minHeight: '48px',
                                flexShrink: 0
                            }}>
                                <Avatar
                                    src={article.author.avatar}
                                    alt={article.author.name}
                                    size="lg"
                                    fallback={article.author.name.charAt(0)}
                                    style={{
                                        width: '48px',
                                        height: '48px'
                                    }}
                                />
                            </div>
                            <div style={{
                                marginTop: '1px',
                                marginBottom: '1px',
                                gap: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                flex: 1,
                                minWidth: 0
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    minHeight: '22px'
                                }}>
                                    <div style={{
                                        color: '#FFFFFF',
                                        fontWeight: '500',
                                        lineHeight: '22px',
                                        alignItems: 'center',
                                        display: 'flex',
                                        minHeight: '22px',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {article.author.name}
                                    </div>
                                </div>
                                <div style={{
                                    color: '#9CA3AF',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    alignItems: 'center',
                                    display: 'flex',
                                    minHeight: '20px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {article.author.bio}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 文章内容 */}
                    <div style={{ marginTop: '12px', marginBottom: '60px' }}>
                        <ArticleContent content={article.content} />
                    </div>

                    {/* 底部交互区域 */}
                    <div
                        className="bottom-actions"
                        style={{
                            borderTop: '1px solid rgba(42, 42, 42, 0.60)',
                            marginTop: '24.89px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: '25px',
                            flexWrap: 'nowrap',
                            alignItems: 'center'
                        }}>
                        {/* 左侧交互按钮 */}
                        <div style={{
                            gap: '16px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'stretch',
                            flexWrap: 'nowrap'
                        }}>
                            {/* 点赞按钮 */}
                            <button
                                onClick={handleLike}
                                style={{
                                    background: 'rgba(26, 26, 26, 0.50)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    gap: '6px',
                                    alignItems: 'stretch',
                                    flexDirection: 'row',
                                    padding: '8px 12px 8px 12px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    color: isLiked ? '#EF4444' : '#9CA3AF',
                                    whiteSpace: 'nowrap',
                                    minWidth: 'auto',
                                    flexShrink: 0
                                }}
                            >
                                <Icon name="like-icon-detail" size="sm" style={{ marginTop: '2px', marginBottom: '2px', flexShrink: 0 }} />
                                <div style={{
                                    color: isLiked ? '#EF4444' : '#9CA3AF',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    alignItems: 'center',
                                    display: 'flex',
                                    minHeight: '20px',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {article.likeCount}
                                </div>
                            </button>

                            {/* 收藏按钮 */}
                            <button
                                onClick={handleBookmark}
                                style={{
                                    background: 'rgba(26, 26, 26, 0.50)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    gap: '6px',
                                    alignItems: 'stretch',
                                    flexDirection: 'row',
                                    padding: '8px 12px 8px 11px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    color: isBookmarked ? '#FFC107' : '#9CA3AF',
                                    whiteSpace: 'nowrap',
                                    minWidth: 'auto',
                                    flexShrink: 0
                                }}
                            >
                                <Icon name="collect-icon-detail" size="sm" style={{ marginTop: '2px', marginBottom: '2px', flexShrink: 0 }} />
                                <div style={{
                                    color: isBookmarked ? '#FFC107' : '#9CA3AF',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    alignItems: 'center',
                                    display: 'flex',
                                    minHeight: '20px',
                                    whiteSpace: 'nowrap'
                                }}>
                                    收藏
                                </div>
                            </button>

                            {/* 调整按钮 */}
                            <button style={{
                                background: 'rgba(26, 26, 26, 0.50)',
                                borderRadius: '8px',
                                display: 'flex',
                                gap: '6px',
                                alignItems: 'stretch',
                                flexDirection: 'row',
                                padding: '8px 12px 8px 12px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                color: '#9CA3AF',
                                whiteSpace: 'nowrap',
                                minWidth: 'auto',
                                flexShrink: 0
                            }}>
                                <Icon name="adjust-icon-detail" size="sm" style={{ marginTop: '2px', marginBottom: '2px', flexShrink: 0 }} />
                                <div style={{
                                    color: '#9CA3AF',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    alignItems: 'center',
                                    display: 'flex',
                                    minHeight: '20px',
                                    whiteSpace: 'nowrap'
                                }}>
                                    调整
                                </div>
                            </button>
                        </div>

                        {/* 右侧分享按钮 */}
                        <div style={{
                            gap: '12px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'stretch',
                            flexShrink: 0
                        }}>
                            <button
                                onClick={handleShare}
                                style={{
                                    background: 'rgba(26, 26, 26, 0.50)',
                                    borderRadius: '18px',
                                    padding: '10px',
                                    display: 'flex',
                                    width: '36px',
                                    height: '36px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    flexShrink: 0
                                }}
                            >
                                <Icon name="share-link-detail" size="sm" />
                            </button>
                            <button style={{
                                background: 'rgba(26, 26, 26, 0.50)',
                                borderRadius: '18px',
                                padding: '10px',
                                display: 'flex',
                                width: '36px',
                                height: '36px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flexShrink: 0
                            }}>
                                <Icon name="share-wechat-detail" size="sm" />
                            </button>
                            <button style={{
                                background: 'rgba(26, 26, 26, 0.50)',
                                borderRadius: '18px',
                                padding: '10px',
                                display: 'flex',
                                width: '36px',
                                height: '36px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flexShrink: 0
                            }}>
                                <Icon name="share-weibo-detail" size="sm" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 相关文章推荐 */}
                <RelatedArticles
                    articles={mockRelatedArticles}
                    title="相关推荐"
                />
            </Container>

            {/* 响应式样式 */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .glass-card {
                        margin: 0 10px !important;
                        padding: 20px 16px !important;
                    }
                    
                    h1 {
                        font-size: 24px !important;
                        width: 100% !important;
                        white-space: nowrap !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    }
                    
                    .bottom-actions {
                        flex-direction: column !important;
                        gap: 16px !important;
                        align-items: stretch !important;
                    }
                    
                    .meta-info {
                        flex-wrap: wrap !important;
                        gap: 8px !important;
                    }
                    
                    .tags-row {
                        flex-wrap: wrap !important;
                        gap: 8px !important;
                    }
                    
                    .author-info {
                        flex-wrap: nowrap !important;
                    }
                }
                
                @media (max-width: 480px) {
                    h1 {
                        font-size: 20px !important;
                        line-height: 1.3 !important;
                        white-space: normal !important;
                        overflow: visible !important;
                        text-overflow: clip !important;
                    }
                    
                    .meta-info {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                    
                    .tags-row {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                }
            `}</style>
        </div>
    )
} 