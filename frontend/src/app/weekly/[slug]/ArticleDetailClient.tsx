'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon, Avatar, TagList, GradientButton } from '@/components/ui'
import {
    ArticleContent,
    SidebarTableOfContents,
    ArticleActions,
    FontSizeController
} from '@/components/molecules'
import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'
import styles from './ArticleDetailClient.module.css'

interface ArticleDetailClientProps {
    article: ArticleCardData
}

export function ArticleDetailClient({ article }: ArticleDetailClientProps) {
    const router = useRouter()
    const [fontSize, setFontSize] = useState(16)

    // 返回上一页
    const handleGoBack = () => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push('/weekly')
        }
    }

    return (
        <>
            {/* 固定定位的目录导航 */}
            <SidebarTableOfContents
                content={article.content || '模拟内容'}
                targetSelector=".glass-card"
            />

            {/* 文章详情容器 */}
            <div className={styles.articleDetailContainer}>
                {/* 文章详情内容 - 统一毛玻璃框 */}
                <div className={`${styles.glassCard} glass-card`}>
                    {/* 文章内容区域 - 简化为单列布局 */}
                    <div className={styles.mainContent}>
                        {/* 标题区域 */}
                        <div className={styles.titleSection}>
                            {/* 返回按钮 */}
                            <div className={styles.backButton}>
                                <GradientButton
                                    variant="outline"
                                    size="md"
                                    onClick={handleGoBack}
                                >
                                    <Icon name="arrow-left" size="sm" />
                                    返回
                                </GradientButton>
                            </div>

                            {/* 标题 - 居中显示 */}
                            <h1 className={styles.mainTitle}>
                                {article.title}
                            </h1>

                            {/* 字体调整按钮 - 使用新组件 */}
                            <div className={styles.fontController}>
                                <FontSizeController
                                    fontSize={fontSize}
                                    onFontSizeChange={setFontSize}
                                />
                            </div>
                        </div>

                        {/* 元信息 */}
                        <div className={styles.metaInfo}>
                            {/* 作者信息 */}
                            <div className={styles.authorInfo}>
                                <Avatar
                                    src={article.author.avatar || "/images/avatars/author-li-mingyang.jpeg"}
                                    alt={article.author.name}
                                    size="lg"
                                />
                                <div>
                                    <div className={styles.authorName}>
                                        {article.author.name}
                                    </div>
                                    <div className={styles.authorTitle}>
                                        AI变现专家
                                    </div>
                                </div>
                            </div>

                            {/* 标签和阅读信息 */}
                            <div className={styles.tagsRow}>
                                <TagList tags={article.tags} size="md" maxCount={3} />
                                <div className={styles.readingMeta}>
                                    <span>{article.publishedAt}</span>
                                    <span>•</span>
                                    <span>{article.readingTime}</span>
                                    <span>•</span>
                                    <span>{article.viewCount} 浏览</span>
                                </div>
                            </div>
                        </div>

                        {/* 文章摘要 */}
                        {article.excerpt && (
                            <div
                                className={styles.articleExcerpt}
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                {article.excerpt}
                            </div>
                        )}

                        {/* 文章内容 */}
                        {article.content ? (
                            <ArticleContent content={article.content} fontSize={fontSize} />
                        ) : (
                            <div
                                className={styles.mockContent}
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                <h1
                                    className={styles.mockHeading1}
                                    style={{ fontSize: `${Math.round(fontSize * 1.5)}px` }}
                                >
                                    一、了解Midjourney的核心优势
                                </h1>
                                <p className={styles.mockParagraph}>
                                    这是文章的详细内容部分。在实际应用中，这里会显示从Strapi CMS获取的完整文章内容。
                                </p>
                            </div>
                        )}

                        {/* 底部操作区域 - 使用ArticleActions组件 */}
                        <ArticleActions article={article} />
                    </div>
                </div>
            </div>
        </>
    )
} 