'use client'

interface ArticleContentProps {
    content: string
    className?: string
}

export function ArticleContent({ content, className = '' }: ArticleContentProps) {
    // 简化的Markdown渲染函数 - 支持主题切换
    const renderMarkdown = (content: string): string => {
        return content
            // 标题渲染
            .replace(/^# (.*$)/gim, '<h1 style="background: var(--gradient-primary); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 24px; font-weight: 600; line-height: 43.2px; margin: 43.9px 0 4.99px 0;">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 style="color: var(--color-text-primary); font-size: 20px; font-weight: 600; line-height: 36px; margin: 8.9px 0 0.9px 0;">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 style="color: var(--color-text-primary); font-size: 18px; font-weight: 600; line-height: 32px; margin: 1.5rem 0 0.8rem 0;">$1</h3>')
            .replace(/^#### (.*$)/gim, '<h4 style="color: var(--color-text-primary); font-size: 16px; font-weight: 600; line-height: 28px; margin: 1.3rem 0 0.6rem 0;">$1</h4>')
            // 文本样式
            .replace(/\*\*(.*)\*\*/gim, '<strong style="color: var(--color-text-primary); font-weight: 700;">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em style="color: var(--color-text-primary); font-style: italic;">$1</em>')
            // 代码块
            .replace(/```([^`]+)```/gim, '<div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border-primary); border-radius: 8px; margin: 25px 0; padding: 17px;"><code style="color: var(--color-text-primary); font-size: 14px; line-height: 21px; font-family: \'Fira Code\', monospace;">$1</code></div>')
            .replace(/`([^`]+)`/gim, '<code style="background: var(--color-info-bg); color: var(--color-primary-blue); padding: 2px 6px; border-radius: 4px; font-family: \'Fira Code\', monospace; font-size: 0.9em;">$1</code>')
            // 信息卡片
            .replace(/^📋 \*\*(.*)\*\*: (.*$)/gim, '<div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border-primary); border-radius: 12px; margin: 18px 0 9.9px 0; padding: 24px; display: flex; align-items: center;"><div style="margin-right: 24px; width: 48px; height: 48px; background: var(--color-info-bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; background-size: cover;"></div><div style="width: 590px; color: var(--color-text-primary); line-height: 28.8px; align-items: center; display: flex; text-overflow: ellipsis; min-height: 22px;"><span style="font-weight: 700;">$1</span>：$2</div></div>')
            .replace(/^📋 (.*$)/gim, '<div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border-primary); border-radius: 12px; margin: 18px 0 9.9px 0; padding: 24px; display: flex; align-items: center;"><div style="margin-right: 24px; width: 48px; height: 48px; background: var(--color-info-bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; background-size: cover;"></div><div style="color: var(--color-text-primary); line-height: 28.8px; align-items: center; display: flex; text-overflow: ellipsis; min-height: 22px;">$1</div></div>')
            // 引用块
            .replace(/^> "(.*)" —— (.*$)/gim, '<div style="background: var(--color-bg-secondary); border-left: 4px solid var(--color-border-active); margin: 8.8px 0 4.9px 0; padding: 24px; display: flex; align-items: center;"><div style="color: var(--color-text-secondary); line-height: 28.8px; align-items: center; display: flex; text-overflow: ellipsis; min-height: 50.79px;">"$1" —— $2</div></div>')
            .replace(/^> (.*$)/gim, '<blockquote style="border-left: 4px solid var(--color-primary-blue); background: var(--color-info-bg); padding: var(--spacing-4); margin: var(--spacing-4) 0; border-radius: 0 var(--radius-lg) var(--radius-lg) 0;"><p style="color: var(--color-text-secondary); font-style: italic; margin: 0;">$1</p></blockquote>')
            // 链接
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" style="color: var(--color-primary-blue); text-decoration: underline; text-decoration-color: var(--color-info-border); transition: all 0.2s ease;" onmouseover="this.style.textDecorationColor = \'var(--color-primary-blue)\'" onmouseout="this.style.textDecorationColor = \'var(--color-info-border)\'">$1</a>')
            // 段落
            .replace(/\n\n/gim, '</p><p style="color: var(--color-text-primary); line-height: 28.8px; margin: 12px 0;">')
    }

    return (
        <div style={{
            color: 'var(--color-text-primary)',
            lineHeight: '28.8px',
            fontSize: 'var(--font-size-lg)',
            fontFamily: 'var(--font-family-primary)',
        }}>
            <p style={{
                color: 'var(--color-text-primary)',
                lineHeight: '28.8px',
                margin: '12px 0',
                }}
                dangerouslySetInnerHTML={{
                    __html: renderMarkdown(content)
                }}
            />
        </div>
    )
} 