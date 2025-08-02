'use client'

import { useState } from 'react'
import { GradientButton } from '@/components/ui'
import { useToast } from '@/components/ui'
import { WEEKLY_DETAIL_TEXT } from '@/constants/weeklyDetail'
import type { ArticleActionsProps } from './ArticleActions.types'

export function ArticleActions({ article }: ArticleActionsProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const { toast } = useToast()

    // 点赞功能处理
    const handleLike = () => {
        setIsLiked(!isLiked)
        if (!isLiked) {
            toast.success('已点赞！感谢您的支持')
        } else {
            toast.success('已取消点赞')
        }
    }

    // 收藏功能处理
    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked)
        if (!isBookmarked) {
            toast.success('已收藏！可在个人中心查看')
        } else {
            toast.success('已取消收藏')
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
                    toast.success('链接已复制到剪贴板！')
                } catch (error) {
                    // 兜底方案：选择文本
                    const textArea = document.createElement('textarea')
                    textArea.value = currentUrl
                    document.body.appendChild(textArea)
                    textArea.select()
                    document.execCommand('copy')
                    document.body.removeChild(textArea)
                    toast.success('链接已复制到剪贴板！')
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
        <div className="article-actions">
            {/* 底部操作区域 */}
            <div style={{
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
                zIndex: 10000
            }}>
                {/* 左侧操作按钮 */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                }}>
                    {/* 点赞按钮 */}
                    <GradientButton
                        variant="outline"
                        size="sm"
                        onClick={handleLike}
                        style={{
                            color: isLiked ? '#EF4444' : 'var(--color-text-primary)'
                        }}
                    >
                        👍 {article.likeCount || '0'}
                    </GradientButton>

                    {/* 收藏按钮 */}
                    <GradientButton
                        variant="outline"
                        size="sm"
                        onClick={handleBookmark}
                        style={{
                            color: isBookmarked ? '#FFC107' : 'var(--color-text-primary)'
                        }}
                    >
                        🔖 {WEEKLY_DETAIL_TEXT.bookmarkAction}
                    </GradientButton>
                </div>

                {/* 右侧分享按钮 */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    minWidth: '200px',
                    justifyContent: 'flex-end'
                }}>
                    <GradientButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('link')}
                    >
                        🔗 链接
                    </GradientButton>
                    <GradientButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('wechat')}
                    >
                        💬 微信
                    </GradientButton>
                    <GradientButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('weibo')}
                    >
                        📱 微博
                    </GradientButton>
                </div>
            </div>
        </div>
    )
} 