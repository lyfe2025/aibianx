import { Container, GradientText, GradientButton, Tag } from '@/components/ui'
import Link from 'next/link'
import { useCallback } from 'react'
import styles from './FreeResourcesSection.module.css'

/**
 * 免费精选资源区块组件 - FreeResourcesSection
 * 
 * 根据设计稿展示4个免费资源卡片：
 * - AI技术入门指南
 * - AI变现秘籍手册
 * - AI创业案例集
 * - AI工具速查手册
 */
export function FreeResourcesSection() {
    const resources = [
        {
            id: 1,
            title: 'AI技术入门指南',
            description: '零基础快速上手AI工具，掌握核心技能',
            image: '/images/illustrations/tech-guide.svg',
            tag: 'tech-guide'
        },
        {
            id: 2,
            title: 'AI变现秘籍手册',
            description: '10种经过验证的AI赚钱模式详解',
            image: '/images/illustrations/monetization-guide.svg',
            tag: 'monetization'
        },
        {
            id: 3,
            title: 'AI创业案例集',
            description: '5个月入过万的AI创业成功故事',
            image: '/images/illustrations/case-studies.svg',
            tag: 'case-study'
        },
        {
            id: 4,
            title: 'AI工具速查手册',
            description: '50+必备AI工具清单及使用指南',
            image: '/images/illustrations/tools-handbook.svg',
            tag: 'ai-tools'
        }
    ]

    const scrollToFinalCTA = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const target = document.getElementById('final-cta')
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [])

    return (
        <section
            className={styles.freeResourcesSection}
        >
            <Container>
                {/* 区块标题 - 1:1还原设计稿 */}
                <div className={styles.sectionTitleContainer}>
                    {/* 主标题 */}
                    <div className={styles.mainTitle}>
                        免费精选资源
                    </div>

                    {/* 副标题 */}
                    <div className={styles.subTitle}>
                        立即获取这些高质量的AI变现指南，加速你的成功之路
                    </div>
                </div>

                {/* 资源卡片网格 - 1:1还原设计稿布局 */}
                <div className={styles.cardsContainer}>
                    {resources.map((resource) => (
                        <Link
                            key={resource.id}
                            href="#final-cta"
                            onClick={scrollToFinalCTA}
                            className={styles.resourceCard}
                        >
                            {/* 资源图片 - 1:1还原设计稿尺寸 */}
                            <div
                                className={styles.resourceImage}
                                style={{
                                    backgroundImage: `url(${resource.image})`
                                }}
                            />

                            {/* 标签区域 - 1:1还原设计稿间距 */}
                            <div className={styles.tagContainer}>
                                <Tag
                                    tag={resource.tag}
                                    size="md"
                                />
                            </div>

                            {/* 标题区域 - 1:1还原设计稿间距 */}
                            <div className={styles.titleContainer}>
                                <div className={styles.titleText}>
                                    {resource.title}
                                </div>
                            </div>

                            {/* 描述区域 - 1:1还原设计稿间距 */}
                            <div className={styles.descriptionContainer}>
                                <div className={styles.descriptionText}>
                                    {resource.description}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
} 