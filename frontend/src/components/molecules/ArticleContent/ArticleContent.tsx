'use client'

import { useState, useEffect } from 'react'

interface ArticleContentProps {
    content: string
    className?: string
    fontSize?: number // 新增字体大小参数
}

export function ArticleContent({ content, className = '', fontSize = 16 }: ArticleContentProps) {
    const [isClient, setIsClient] = useState(false)
    const [renderedContent, setRenderedContent] = useState('')

    // 客户端状态检测
    useEffect(() => {
        setIsClient(true)
        setRenderedContent(renderMarkdown(content))
    }, [content])

    // 字体大小变化时重新渲染内容
    useEffect(() => {
        if (isClient) {
            setRenderedContent(renderMarkdown(content))
        }
    }, [fontSize, isClient, content])
    // 简化的Markdown渲染函数 - 支持主题切换和动态字体大小
    const renderMarkdown = (content: string): string => {
        // 基于当前fontSize计算相对大小
        const h1Size = Math.round(fontSize * 1.5)  // 24px when fontSize=16
        const h2Size = Math.round(fontSize * 1.25) // 20px when fontSize=16  
        const h3Size = Math.round(fontSize * 1.125) // 18px when fontSize=16
        const h4Size = fontSize // 16px when fontSize=16
        const codeSize = Math.round(fontSize * 0.875) // 14px when fontSize=16
        const lineHeight = Math.round(fontSize * 1.8) // 动态行高

        const processedContent = content
            // 标题渲染 - 使用动态字体大小
            .replace(/^# (.*$)/gim, `<h1 style="background: var(--gradient-primary); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: ${h1Size}px; font-weight: 600; line-height: ${Math.round(h1Size * 1.3)}px; margin: ${Math.round(fontSize * 2.7)}px 0 ${Math.round(fontSize * 0.3)}px 0;">$1</h1>`)
            .replace(/^## (.*$)/gim, `<h2 style="color: var(--color-text-primary); font-size: ${h2Size}px; font-weight: 600; line-height: ${Math.round(h2Size * 1.3)}px; margin: ${Math.round(fontSize * 0.55)}px 0 ${Math.round(fontSize * 0.06)}px 0;">$1</h2>`)
            .replace(/^### (.*$)/gim, `<h3 style="color: var(--color-text-primary); font-size: ${h3Size}px; font-weight: 600; line-height: ${Math.round(h3Size * 1.3)}px; margin: 1.5rem 0 0.8rem 0;">$1</h3>`)
            .replace(/^#### (.*$)/gim, `<h4 style="color: var(--color-text-primary); font-size: ${h4Size}px; font-weight: 600; line-height: ${Math.round(h4Size * 1.3)}px; margin: 1.3rem 0 0.6rem 0;">$1</h4>`)
            // 文本样式
            .replace(/\*\*(.*)\*\*/gim, '<strong style="color: var(--color-text-primary); font-weight: 700;">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em style="color: var(--color-text-primary); font-style: italic;">$1</em>')
            // 代码块 - 使用动态字体大小
            .replace(/```([^`]+)```/gim, `<div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border-primary); border-radius: 8px; margin: 25px 0; padding: 17px;"><code style="color: var(--color-text-primary); font-size: ${codeSize}px; line-height: ${Math.round(codeSize * 1.5)}px; font-family: 'Fira Code', monospace;">$1</code></div>`)
            .replace(/`([^`]+)`/gim, '<code style="background: var(--color-info-bg); color: var(--color-primary-blue); padding: 2px 6px; border-radius: 4px; font-family: \'Fira Code\', monospace; font-size: 0.9em;">$1</code>')
            // 信息卡片 - 使用动态行高
            .replace(/^📋 \*\*(.*)\*\*: (.*$)/gim, `<div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border-primary); border-radius: 12px; margin: 18px 0 9.9px 0; padding: 24px; display: flex; align-items: center;"><div style="margin-right: 24px; width: 48px; height: 48px; background: var(--color-info-bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; background-size: cover;"></div><div style="width: 590px; color: var(--color-text-primary); line-height: ${lineHeight}px; align-items: center; display: flex; text-overflow: ellipsis; min-height: 22px;"><span style="font-weight: 700;">$1</span>：$2</div></div>`)
            .replace(/^📋 (.*$)/gim, `<div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border-primary); border-radius: 12px; margin: 18px 0 9.9px 0; padding: 24px; display: flex; align-items: center;"><div style="margin-right: 24px; width: 48px; height: 48px; background: var(--color-info-bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; background-size: cover;"></div><div style="color: var(--color-text-primary); line-height: ${lineHeight}px; align-items: center; display: flex; text-overflow: ellipsis; min-height: 22px;">$1</div></div>`)
            // 引用块 - 使用动态行高
            .replace(/^> "(.*)" —— (.*$)/gim, `<div style="background: var(--color-bg-secondary); border-left: 4px solid var(--color-border-active); margin: 8.8px 0 4.9px 0; padding: 24px; display: flex; align-items: center;"><div style="color: var(--color-text-secondary); line-height: ${lineHeight}px; align-items: center; display: flex; text-overflow: ellipsis; min-height: 50.79px;">"$1" —— $2</div></div>`)
            .replace(/^> (.*$)/gim, '<blockquote style="border-left: 4px solid var(--color-primary-blue); background: var(--color-info-bg); padding: var(--spacing-4); margin: var(--spacing-4) 0; border-radius: 0 var(--radius-lg) var(--radius-lg) 0;"><p style="color: var(--color-text-secondary); font-style: italic; margin: 0;">$1</p></blockquote>')
            // 链接
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" style="color: var(--color-primary-blue); text-decoration: underline; text-decoration-color: var(--color-info-border); transition: all 0.2s ease;" onmouseover="this.style.textDecorationColor = \'var(--color-primary-blue)\'" onmouseout="this.style.textDecorationColor = \'var(--color-info-border)\'">$1</a>')
            // 段落 - 使用动态行高和边距
            .replace(/\n\n/gim, `</p><p style="color: var(--color-text-primary); line-height: ${lineHeight}px; margin: ${Math.round(fontSize * 0.75)}px 0;">`)

        // 包装整个内容在段落标签中
        return `<p style="color: var(--color-text-primary); line-height: ${lineHeight}px; margin: ${Math.round(fontSize * 0.75)}px 0;">${processedContent}</p>`
    }

    // 服务端渲染时显示加载占位符，客户端渲染时显示格式化内容
    if (!isClient) {
        return (
            <div style={{
                color: 'var(--color-text-primary)',
                lineHeight: '28.8px',
                fontSize: 'var(--font-size-lg)',
                fontFamily: 'var(--font-family-primary)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border-primary)'
            }}>
                <div style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>
                    📄 正在加载文章内容...
                </div>
            </div>
        )
    }

    return (
        <div style={{
            color: 'var(--color-text-primary)',
            lineHeight: '1.8',
            fontSize: `${fontSize}px`, // 使用动态字体大小
            fontFamily: 'var(--font-family-primary)',
            transition: 'font-size 0.3s ease', // 添加平滑过渡
        }}>
            <div
                dangerouslySetInnerHTML={{
                    __html: renderedContent
                }}
            />
        </div>
    )
} 