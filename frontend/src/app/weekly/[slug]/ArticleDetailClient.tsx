'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Icon, Avatar, TagList } from '@/components/ui'
import { ArticleContent, RelatedArticles } from '@/components/molecules'
import { MOCK_RELATED_ARTICLES, WEEKLY_DETAIL_TEXT } from '@/constants/weeklyDetail'
import type { ArticleCardData } from '@/components/molecules/ArticleCard/ArticleCard'

// Toast通知函数
function showToast(message: string, type: 'success' | 'error' = 'success') {
    // 创建临时Toast元素
    const toast = document.createElement('div')
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `
    toast.textContent = message
    document.body.appendChild(toast)

    // 动画显示
    setTimeout(() => {
        toast.style.transform = 'translateX(0)'
    }, 100)

    // 3秒后自动移除
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)'
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast)
            }
        }, 300)
    }, 3000)
}

interface ArticleDetailClientProps {
    article: ArticleCardData
}

export function ArticleDetailClient({ article }: ArticleDetailClientProps) {
    const router = useRouter()
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [readingProgress, setReadingProgress] = useState(0)
    const [fontSize, setFontSize] = useState(16) // 字体大小状态
    const [showFontSelector, setShowFontSelector] = useState(false) // 字体选择器显示状态
    const [relatedArticles, setRelatedArticles] = useState(MOCK_RELATED_ARTICLES)

    // 阅读进度追踪 - 基于文章内容区域
    useEffect(() => {
        const handleScroll = () => {
            // 获取文章内容容器
            const articleContentElement = document.querySelector('.glass-card')

            if (!articleContentElement) {
                setReadingProgress(0)
                return
            }

            const scrollY = window.pageYOffset
            const windowHeight = window.innerHeight

            // 获取文章内容的位置信息
            const contentRect = articleContentElement.getBoundingClientRect()
            const contentTop = scrollY + contentRect.top
            const contentHeight = contentRect.height

            // 计算文章内容完全可见时的scroll位置
            const contentEndScrollY = contentTop + contentHeight - windowHeight

            // 计算基于文章内容的阅读进度
            let progress = 0

            if (scrollY <= contentTop) {
                // 还没开始阅读文章内容
                progress = 0
            } else if (scrollY >= contentEndScrollY) {
                // 文章内容已完全可见/读完
                progress = 100
            } else {
                // 正在阅读文章内容
                const readableHeight = contentEndScrollY - contentTop
                const readProgress = scrollY - contentTop
                progress = (readProgress / readableHeight) * 100
            }

            setReadingProgress(Math.min(Math.max(progress, 0), 100))
        }

        // 确保DOM已加载
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll, { passive: true })
            // 延迟初始计算，确保页面完全渲染
            setTimeout(handleScroll, 200)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    // 将进度条渲染到body中，避免容器影响
    useEffect(() => {
        if (typeof window === 'undefined') return

        // 创建进度条容器
        const progressContainer = document.createElement('div')
        progressContainer.id = 'reading-progress-fixed'
        progressContainer.style.cssText = `
            position: fixed !important;
            bottom: 24px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 320px !important;
            height: 48px !important;
            background: var(--color-bg-glass) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border: 1px solid var(--color-border-primary) !important;
            border-radius: 24px !important;
            padding: 12px 20px !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            z-index: 99999 !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        `

        // 创建图标
        const icon = document.createElement('div')
        icon.textContent = '📖'
        icon.style.cssText = `
            width: 16px !important;
            height: 16px !important;
            border-radius: 50% !important;
            background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%) !important;
            flex-shrink: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 8px !important;
            color: white !important;
            font-weight: 600 !important;
        `

        // 创建进度条背景
        const progressBg = document.createElement('div')
        progressBg.style.cssText = `
            flex: 1 !important;
            height: 4px !important;
            background: rgba(255, 255, 255, 0.1) !important;
            border-radius: 2px !important;
            overflow: hidden !important;
            position: relative !important;
        `

        // 创建进度条填充
        const progressFill = document.createElement('div')
        progressFill.id = 'progress-fill'
        progressFill.style.cssText = `
            width: 0% !important;
            height: 100% !important;
            background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%) !important;
            border-radius: 2px !important;
            transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            box-shadow: 0 0 8px rgba(59, 130, 246, 0.4) !important;
        `

        // 创建百分比显示
        const percentage = document.createElement('div')
        percentage.id = 'progress-percentage'
        percentage.textContent = '0%'
        percentage.style.cssText = `
            font-size: 12px !important;
            font-weight: 500 !important;
            color: var(--color-text-primary) !important;
            font-family: var(--font-family-primary) !important;
            min-width: 35px !important;
            text-align: right !important;
            flex-shrink: 0 !important;
        `

        // 组装元素
        progressBg.appendChild(progressFill)
        progressContainer.appendChild(icon)
        progressContainer.appendChild(progressBg)
        progressContainer.appendChild(percentage)

        // 添加到body
        document.body.appendChild(progressContainer)

        // 清理函数
        return () => {
            const existingProgress = document.getElementById('reading-progress-fixed')
            if (existingProgress) {
                document.body.removeChild(existingProgress)
            }
        }
    }, [])

    // 更新进度条显示
    useEffect(() => {
        const progressFill = document.getElementById('progress-fill')
        const percentage = document.getElementById('progress-percentage')

        if (progressFill && percentage) {
            progressFill.style.width = `${readingProgress}%`
            percentage.textContent = `${Math.round(readingProgress)}%`
        }
    }, [readingProgress])

    // 点击外部关闭字体选择器
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showFontSelector) {
                const fontSelector = document.querySelector('.font-selector')
                const adjustButton = document.querySelector('.font-adjust-container')

                if (fontSelector && adjustButton) {
                    if (!fontSelector.contains(event.target as Node) &&
                        !adjustButton.contains(event.target as Node)) {
                        setShowFontSelector(false)
                    }
                }
            }
        }

        if (showFontSelector) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showFontSelector])

    // 智能相关文章推荐（基于标签）
    useEffect(() => {
        // 模拟基于当前文章标签的智能推荐
        const fetchRelatedArticles = async () => {
            try {
                // TODO: 这里可以调用真实的API来获取相关文章
                // const related = await getArticles({
                //     tags: article.tags,
                //     exclude: article.id,
                //     limit: 3
                // })

                // 目前使用Mock数据，但添加了智能过滤逻辑
                const filtered = MOCK_RELATED_ARTICLES.filter(relatedArticle =>
                    relatedArticle.id !== article.id
                ).slice(0, 3)

                setRelatedArticles(filtered)
            } catch (error) {
                console.error('获取相关文章失败:', error)
                setRelatedArticles(MOCK_RELATED_ARTICLES.slice(0, 3))
            }
        }

        fetchRelatedArticles()
    }, [article.id, article.tags])

    // 点赞功能处理
    const handleLike = () => {
        setIsLiked(!isLiked)
        if (!isLiked) {
            showToast('已点赞！感谢您的支持', 'success')
        } else {
            showToast('已取消点赞', 'success')
        }
        // TODO: 这里可以添加API调用来更新后端数据
        // await incrementArticleLikes(article.id)
    }

    // 收藏功能处理
    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked)
        if (!isBookmarked) {
            showToast('已收藏！可在个人中心查看', 'success')
        } else {
            showToast('已取消收藏', 'success')
        }
        // TODO: 这里可以添加API调用来更新后端数据
        // await toggleArticleBookmark(article.id)
    }

    // 字体大小调节功能 - 显示选择器
    const handleFontSizeAdjust = () => {
        setShowFontSelector(!showFontSelector)
    }

    // 字体大小选择
    const handleFontSizeSelect = (newSize: number) => {
        setFontSize(newSize)
        setShowFontSelector(false)
        // 移除Toast提示，保持界面简洁
    }

    // 返回上一页
    const handleGoBack = () => {
        // 智能返回：如果有历史记录就返回，否则去周刊页面
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push('/weekly')
        }
    }

    // 分享功能处理
    const handleShare = async (platform: 'link' | 'wechat' | 'weibo') => {
        const currentUrl = window.location.href
        const title = article.title
        const description = article.excerpt || '分享一篇来自AI变现之路的精彩文章'

        switch (platform) {
            case 'link':
                try {
                    await navigator.clipboard.writeText(currentUrl)
                    showToast('链接已复制到剪贴板！', 'success')
                } catch (error) {
                    // 兜底方案：选择文本
                    const textArea = document.createElement('textarea')
                    textArea.value = currentUrl
                    document.body.appendChild(textArea)
                    textArea.select()
                    document.execCommand('copy')
                    document.body.removeChild(textArea)
                    showToast('链接已复制到剪贴板！', 'success')
                }
                break

            case 'wechat':
                // 微信分享通过生成二维码实现
                const wechatShareUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`
                const newWindow = window.open('', '_blank', 'width=300,height=350')
                if (newWindow) {
                    newWindow.document.write(`
                        <html>
                            <head><title>微信分享</title></head>
                            <body style="text-align:center; padding:20px; font-family: Arial;">
                                <h3>微信扫码分享</h3>
                                <img src="${wechatShareUrl}" alt="微信分享二维码" style="border: 1px solid #ddd;">
                                <p style="color:#666; font-size:12px;">使用微信扫描二维码分享文章</p>
                            </body>
                        </html>
                    `)
                }
                break

            case 'weibo':
                // 微博分享
                const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title + ' - ' + description)}&source=bookmark`
                window.open(weiboUrl, '_blank', 'width=600,height=400')
                break
        }
    }

    return (
        <>
            {/* CSS动画定义 */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            {/* 进度条已通过useEffect直接渲染到body中，确保始终可见 */}



            {/* 文章详情内容 */}
            <div className="glass-card" style={{
                borderRadius: '16px',
                padding: '50px 48px',
                marginTop: '48px',
                marginBottom: '30px',
                border: '1px solid var(--color-border-primary)',
                background: 'var(--color-bg-glass)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                width: '100%',
                margin: '48px auto 30px auto'
            }}>
                {/* 标题区域 - 包含返回按钮、标题和调整按钮 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                    gap: '20px'
                }}>
                    {/* 返回按钮 */}
                    <button
                        onClick={handleGoBack}
                        title="返回上一页"
                        style={{
                            background: 'var(--color-bg-glass)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 16px',
                            border: '1px solid var(--color-border-primary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            color: 'var(--color-text-muted)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '500',
                            flexShrink: 0,
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)'
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                            e.currentTarget.style.color = 'var(--color-text-primary)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)'
                            e.currentTarget.style.background = 'var(--color-bg-glass)'
                            e.currentTarget.style.borderColor = 'var(--color-border-primary)'
                            e.currentTarget.style.color = 'var(--color-text-muted)'
                        }}
                    >
                        <Icon name="arrow-left" size="sm" />
                        <span>返回</span>
                    </button>

                    {/* 标题 - 居中显示 */}
                    <h1 style={{
                        fontSize: 'var(--font-size-5xl)',
                        fontWeight: '700',
                        lineHeight: '1.3',
                        margin: '0',
                        background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.02em',
                        textShadow: 'none',
                        textAlign: 'center',
                        flex: 1,
                        maxWidth: '800px' // 限制标题最大宽度，保持可读性
                    }}>
                        {article.title}
                    </h1>

                    {/* 字体调整按钮 */}
                    <div className="font-adjust-container" style={{
                        position: 'relative',
                        flexShrink: 0
                    }}>
                        <button
                            onClick={handleFontSizeAdjust}
                            title="调整字体大小"
                            style={{
                                background: 'var(--color-bg-glass)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 16px',
                                border: '1px solid var(--color-border-primary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                color: 'var(--color-text-muted)',
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: '500',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)'
                                e.currentTarget.style.background = 'rgba(156, 163, 175, 0.1)'
                                e.currentTarget.style.borderColor = 'rgba(156, 163, 175, 0.3)'
                                e.currentTarget.style.color = 'var(--color-text-primary)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                                e.currentTarget.style.background = 'var(--color-bg-glass)'
                                e.currentTarget.style.borderColor = 'var(--color-border-primary)'
                                e.currentTarget.style.color = 'var(--color-text-muted)'
                            }}
                        >
                            <Icon name="adjust-icon-detail" size="sm" />
                            <span>调整</span>
                        </button>

                        {/* 字体大小选择器 */}
                        {showFontSelector && (
                            <div
                                className="font-selector"
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: '0',
                                    marginTop: '8px',
                                    background: 'var(--color-bg-glass)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: '1px solid var(--color-border-primary)',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    minWidth: '180px',
                                    zIndex: 10000,
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                    animation: 'fadeIn 0.2s ease'
                                }}
                            >
                                <div style={{
                                    fontSize: '12px',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '12px',
                                    textAlign: 'center',
                                    fontWeight: '500'
                                }}>
                                    选择字体大小
                                </div>
                                {[
                                    { size: 14, label: '小', desc: '14px' },
                                    { size: 16, label: '中', desc: '16px' },
                                    { size: 18, label: '大', desc: '18px' },
                                    { size: 20, label: '特大', desc: '20px' }
                                ].map(({ size, label, desc }) => (
                                    <button
                                        key={size}
                                        onClick={() => handleFontSizeSelect(size)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '10px 12px',
                                            margin: '2px 0',
                                            background: fontSize === size
                                                ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                                                : 'transparent',
                                            border: fontSize === size
                                                ? '1px solid rgba(59, 130, 246, 0.3)'
                                                : '1px solid transparent',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            color: fontSize === size
                                                ? 'var(--color-text-primary)'
                                                : 'var(--color-text-muted)',
                                            fontSize: '13px',
                                            fontWeight: fontSize === size ? '500' : 'normal',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (fontSize !== size) {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                                                e.currentTarget.style.color = 'var(--color-text-primary)'
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (fontSize !== size) {
                                                e.currentTarget.style.background = 'transparent'
                                                e.currentTarget.style.color = 'var(--color-text-muted)'
                                            }
                                        }}
                                    >
                                        <span>{label}</span>
                                        <span style={{
                                            fontSize: '11px',
                                            opacity: 0.7
                                        }}>
                                            {desc}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 元信息 */}
                <div className="meta-info" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '40px',
                    flexWrap: 'nowrap',
                    padding: '20px 0',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                }}>
                    {/* 作者信息 */}
                    <div className="author-info" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexShrink: 0
                    }}>
                        <Avatar
                            src={article.author.avatar || "/images/avatars/author-li-mingyang.jpeg"}
                            alt={article.author.name}
                            size="lg"
                        />
                        <div>
                            <div style={{
                                fontSize: 'var(--font-size-lg)',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)',
                                marginBottom: '4px'
                            }}>
                                {article.author.name}
                            </div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)'
                            }}>
                                AI变现专家
                            </div>
                        </div>
                    </div>

                    {/* 标签和阅读信息 */}
                    <div className="tags-row" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        flexShrink: 0
                    }}>
                        <TagList
                            tags={article.tags}
                            size="md"
                            maxCount={3}
                        />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)',
                            whiteSpace: 'nowrap'
                        }}>
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
                    <div style={{
                        fontSize: `${fontSize}px`, // 使用动态字体大小
                        lineHeight: '1.7',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '40px',
                        padding: '32px',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
                        borderRadius: '12px',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        position: 'relative',
                        fontStyle: 'italic',
                        transition: 'font-size 0.3s ease' // 添加平滑过渡
                    }}>
                        {article.excerpt}
                    </div>
                )}

                {/* 如果有content字段，显示文章内容，否则显示占位符 */}
                {article.content ? (
                    <ArticleContent content={article.content} fontSize={fontSize} />
                ) : (
                    <div style={{
                        fontSize: `${fontSize}px`,
                        lineHeight: '1.8',
                        color: 'var(--color-text-primary)',
                        marginBottom: '32px',
                        transition: 'font-size 0.3s ease'
                    }}>
                        <p style={{ marginBottom: '24px' }}>
                            这是文章的详细内容部分。在实际应用中，这里会显示从Strapi CMS获取的完整文章内容。
                        </p>
                        <p style={{ marginBottom: '24px' }}>
                            目前显示的是基于API数据的动态内容，包括：
                        </p>
                        <ul style={{
                            paddingLeft: '24px',
                            marginBottom: '24px',
                            listStyle: 'disc'
                        }}>
                            <li style={{ marginBottom: '8px' }}>✅ 真实的文章标题和摘要</li>
                            <li style={{ marginBottom: '8px' }}>✅ 动态SEO元数据生成</li>
                            <li style={{ marginBottom: '8px' }}>✅ 结构化数据嵌入</li>
                            <li style={{ marginBottom: '8px' }}>✅ 服务端渲染和ISR支持</li>
                            <li style={{ marginBottom: '8px' }}>✅ 完整的社交媒体分享优化</li>
                        </ul>
                        <p>
                            文章内容可以通过在Strapi CMS中编辑文章的content字段来更新。
                        </p>
                    </div>
                )}

                {/* 底部操作区域 */}
                <div className="bottom-actions" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '56px',
                    paddingTop: '40px',
                    borderTop: '2px solid rgba(59, 130, 246, 0.15)',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.02), rgba(139, 92, 246, 0.02))',
                    borderRadius: '12px',
                    padding: '40px 24px 24px 24px',
                    marginLeft: '-24px',
                    marginRight: '-24px',
                    position: 'relative',
                    zIndex: 1000 // 确保交互按钮可见
                }}>
                    {/* 左侧操作按钮 */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center'
                    }}>
                        {/* 点赞按钮 */}
                        <button
                            onClick={handleLike}
                            title={isLiked ? "取消点赞" : "点赞"}
                            className="action-button"
                            style={{
                                background: 'var(--color-bg-glass)',
                                borderRadius: '8px',
                                display: 'flex',
                                gap: '6px',
                                alignItems: 'center',
                                padding: '8px 12px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                color: isLiked ? '#EF4444' : 'var(--color-text-muted)',
                                transform: 'scale(1)',
                                position: 'relative',
                                zIndex: 1001
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)'
                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                                e.currentTarget.style.background = 'var(--color-bg-glass)'
                            }}
                        >
                            <Icon name="like-icon-detail" size="sm" />
                            <span style={{ fontSize: '14px' }}>
                                {article.likeCount || '0'}
                            </span>
                        </button>

                        {/* 收藏按钮 */}
                        <button
                            onClick={handleBookmark}
                            title={isBookmarked ? "取消收藏" : "收藏"}
                            className="action-button"
                            style={{
                                background: 'var(--color-bg-glass)',
                                borderRadius: '8px',
                                display: 'flex',
                                gap: '6px',
                                alignItems: 'center',
                                padding: '8px 12px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                color: isBookmarked ? '#FFC107' : 'var(--color-text-muted)',
                                transform: 'scale(1)',
                                position: 'relative',
                                zIndex: 1001
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)'
                                e.currentTarget.style.background = 'rgba(255, 193, 7, 0.1)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                                e.currentTarget.style.background = 'var(--color-bg-glass)'
                            }}
                        >
                            <Icon name="collect-icon-detail" size="sm" />
                            <span style={{ fontSize: '14px' }}>
                                {WEEKLY_DETAIL_TEXT.bookmarkAction}
                            </span>
                        </button>


                    </div>

                    {/* 右侧分享按钮 */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                    }}>
                        <button
                            onClick={() => handleShare('link')}
                            title="复制链接"
                            className="share-button"
                            style={{
                                background: 'var(--color-bg-glass)',
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
                                transform: 'scale(1)',
                                position: 'relative',
                                zIndex: 1001
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)'
                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                                e.currentTarget.style.background = 'var(--color-bg-glass)'
                            }}
                        >
                            <Icon name="share-link-detail" size="sm" />
                        </button>
                        <button
                            onClick={() => handleShare('wechat')}
                            title="微信分享"
                            className="share-button"
                            style={{
                                background: 'var(--color-bg-glass)',
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
                                transform: 'scale(1)',
                                position: 'relative',
                                zIndex: 1001
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)'
                                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                                e.currentTarget.style.background = 'var(--color-bg-glass)'
                            }}
                        >
                            <Icon name="share-wechat-detail" size="sm" />
                        </button>
                        <button
                            onClick={() => handleShare('weibo')}
                            title="微博分享"
                            className="share-button"
                            style={{
                                background: 'var(--color-bg-glass)',
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
                                transform: 'scale(1)',
                                position: 'relative',
                                zIndex: 1001
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)'
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                                e.currentTarget.style.background = 'var(--color-bg-glass)'
                            }}
                        >
                            <Icon name="share-weibo-detail" size="sm" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 相关文章推荐 */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(139, 92, 246, 0.03))',
                borderRadius: '16px',
                padding: '16px',
                marginTop: '48px'
            }}>
                <RelatedArticles
                    articles={relatedArticles}
                    title={`${WEEKLY_DETAIL_TEXT.relatedTitle} (基于标签智能推荐)`}
                />
            </div>



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
                        white-space: normal !important;
                        overflow: visible !important;
                        text-overflow: clip !important;
                        line-height: 1.3 !important;
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
        </>
    )
} 