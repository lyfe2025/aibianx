'use client'

interface ArticleContentProps {
    content: string
    className?: string
}

export function ArticleContent({ content, className = '' }: ArticleContentProps) {
    // 简单的Markdown渲染器（生产环境建议使用react-markdown）
    const renderMarkdown = (markdown: string) => {
        return markdown
            .replace(/^# (.*$)/gim, '<h1 style="font-size: var(--font-size-5xl); font-weight: 700; color: var(--color-text-primary); margin: 2rem 0 1rem 0; line-height: 1.2;">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 style="font-size: var(--font-size-4xl); font-weight: 600; color: var(--color-text-primary); margin: 1.8rem 0 1rem 0; line-height: 1.3;">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 style="font-size: var(--font-size-3xl); font-weight: 600; color: var(--color-text-primary); margin: 1.5rem 0 0.8rem 0; line-height: 1.4;">$1</h3>')
            .replace(/^#### (.*$)/gim, '<h4 style="font-size: var(--font-size-2xl); font-weight: 600; color: var(--color-text-primary); margin: 1.3rem 0 0.6rem 0; line-height: 1.4;">$1</h4>')
            .replace(/\*\*(.*)\*\*/gim, '<strong style="color: var(--color-text-primary); font-weight: 600;">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em style="color: var(--color-text-secondary); font-style: italic;">$1</em>')
            .replace(/`([^`]+)`/gim, '<code style="background: rgba(59, 130, 246, 0.1); color: var(--color-primary-blue); padding: 2px 6px; border-radius: 4px; font-family: \'Fira Code\', monospace; font-size: 0.9em;">$1</code>')
            .replace(/```([^`]+)```/gim, '<pre style="background: var(--color-bg-secondary); border: 1px solid var(--color-border-primary); border-radius: var(--radius-lg); padding: var(--spacing-4); margin: var(--spacing-4) 0; overflow-x: auto;"><code style="color: var(--color-text-primary); font-family: \'Fira Code\', monospace; font-size: var(--font-size-sm);">$1</code></pre>')
            .replace(/^\* (.*$)/gim, '<li style="margin: 0.5rem 0; color: var(--color-text-secondary); line-height: 1.6;">$1</li>')
            .replace(/^- (.*$)/gim, '<li style="margin: 0.5rem 0; color: var(--color-text-secondary); line-height: 1.6;">$1</li>')
            .replace(/^\d+\. (.*$)/gim, '<li style="margin: 0.5rem 0; color: var(--color-text-secondary); line-height: 1.6;">$1</li>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" style="color: var(--color-primary-blue); text-decoration: underline; text-decoration-color: rgba(59, 130, 246, 0.3); transition: all 0.2s ease;" onmouseover="this.style.textDecorationColor = \'var(--color-primary-blue)\'" onmouseout="this.style.textDecorationColor = \'rgba(59, 130, 246, 0.3)\'">$1</a>')
            .replace(/^> (.*$)/gim, '<blockquote style="border-left: 4px solid var(--color-primary-blue); background: rgba(59, 130, 246, 0.05); padding: var(--spacing-4); margin: var(--spacing-4) 0; border-radius: 0 var(--radius-lg) var(--radius-lg) 0;"><p style="color: var(--color-text-secondary); font-style: italic; margin: 0;">$1</p></blockquote>')
            .replace(/\n\n/gim, '</p><p style="margin: 1.2rem 0; color: var(--color-text-secondary); line-height: 1.7; font-size: var(--font-size-lg);">')
            .replace(/\n/gim, '<br />')
    }

    return (
        <article
            className={className}
            style={{
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.7'
            }}
        >
            <div
                style={{
                    fontSize: 'var(--font-size-lg)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.7'
                }}
                dangerouslySetInnerHTML={{
                    __html: `<p style="margin: 1.2rem 0; color: var(--color-text-secondary); line-height: 1.7; font-size: var(--font-size-lg);">${renderMarkdown(content)}</p>`
                }}
            />

            {/* 文章底部样式 */}
            <style jsx>{`
                article ul, article ol {
                    margin: var(--spacing-4) 0;
                    padding-left: var(--spacing-6);
                }
                
                article ul {
                    list-style-type: disc;
                }
                
                article ol {
                    list-style-type: decimal;
                }
                
                article img {
                    max-width: 100%;
                    height: auto;
                    border-radius: var(--radius-lg);
                    margin: var(--spacing-6) 0;
                }
                
                article table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: var(--spacing-6) 0;
                    background: var(--color-bg-secondary);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                }
                
                article th, article td {
                    padding: var(--spacing-3);
                    text-align: left;
                    border-bottom: 1px solid var(--color-border-primary);
                }
                
                article th {
                    background: var(--color-bg-glass);
                    color: var(--color-text-primary);
                    font-weight: 600;
                }
                
                article td {
                    color: var(--color-text-secondary);
                }
            `}</style>
        </article>
    )
} 