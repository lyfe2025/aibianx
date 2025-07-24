'use client'

interface ArticleContentProps {
    content: string
    className?: string
}

export function ArticleContent({ content, className = '' }: ArticleContentProps) {
    // 增强的Markdown渲染器，匹配设计稿样式
    const renderMarkdown = (markdown: string) => {
        return markdown
            // 标题样式 - 渐变色标题
            .replace(/^# (.*$)/gim, '<h1 style="background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 24px; font-weight: 600; line-height: 43.2px; margin: 43.9px 0 4.99px 0;">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 style="color: #FFFFFF; font-size: 20px; font-weight: 600; line-height: 36px; margin: 8.9px 0 0.9px 0;">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 style="color: #FFFFFF; font-size: 18px; font-weight: 600; line-height: 32px; margin: 1.5rem 0 0.8rem 0;">$1</h3>')
            .replace(/^#### (.*$)/gim, '<h4 style="color: #FFFFFF; font-size: 16px; font-weight: 600; line-height: 28px; margin: 1.3rem 0 0.6rem 0;">$1</h4>')
            // 正文样式
            .replace(/\*\*(.*)\*\*/gim, '<strong style="color: #E5E7EB; font-weight: 700;">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em style="color: #E5E7EB; font-style: italic;">$1</em>')
            // 代码样式
            .replace(/```([^`]+)```/gim, '<div style="background: rgba(17, 24, 39, 0.60); border: 1px solid rgba(75, 85, 99, 0.40); border-radius: 8px; margin: 25px 0; padding: 17px;"><code style="color: #E5E7EB; font-size: 14px; line-height: 21px; font-family: \'Fira Code\', monospace;">$1</code></div>')
            .replace(/`([^`]+)`/gim, '<code style="background: rgba(59, 130, 246, 0.1); color: var(--color-primary-blue); padding: 2px 6px; border-radius: 4px; font-family: \'Fira Code\', monospace; font-size: 0.9em;">$1</code>')
            // 列表样式 - 使用设计稿中的点状列表
            .replace(/^- \*\*(.*?)\*\*：(.*$)/gim, '<div style="margin: 14px 0; gap: 12px; display: flex; flex-direction: row; align-items: stretch;"><div style="background-image: url(\'/icons/bullet-point.svg\'); width: 4px; height: 4px; margin-top: 9.4px; background-size: cover;"></div><div style="width: 590px; color: #E5E7EB; line-height: 28.8px; align-items: center; display: flex; text-overflow: ellipsis; min-height: 22px;"><span style="font-weight: 700;">$1</span>：$2</div></div>')
            .replace(/^- (.*$)/gim, '<div style="margin: 14px 0; gap: 12px; display: flex; flex-direction: row; align-items: stretch; padding-left: 4px;"><div style="background-image: url(\'/icons/bullet-point.svg\'); width: 4px; height: 4px; margin-top: 9.4px; background-size: cover;"></div><div style="color: #E5E7EB; line-height: 28.8px; align-items: center; display: flex; text-overflow: ellipsis; min-height: 22px;">$1</div></div>')
            // 引用样式
            .replace(/^> "(.*)" —— (.*$)/gim, '<div style="background: rgba(26, 26, 26, 0.40); border-left: 4px solid rgba(59, 130, 246, 0.60); margin: 8.8px 0 4.9px 0; padding: 24px; display: flex; align-items: center;"><div style="color: #D1D5DB; line-height: 28.8px; align-items: center; display: flex; text-overflow: ellipsis; min-height: 50.79px;">"$1" —— $2</div></div>')
            .replace(/^> (.*$)/gim, '<blockquote style="border-left: 4px solid var(--color-primary-blue); background: rgba(59, 130, 246, 0.05); padding: var(--spacing-4); margin: var(--spacing-4) 0; border-radius: 0 var(--radius-lg) var(--radius-lg) 0;"><p style="color: var(--color-text-secondary); font-style: italic; margin: 0;">$1</p></blockquote>')
            // 链接样式
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" style="color: var(--color-primary-blue); text-decoration: underline; text-decoration-color: rgba(59, 130, 246, 0.3); transition: all 0.2s ease;" onmouseover="this.style.textDecorationColor = \'var(--color-primary-blue)\'" onmouseout="this.style.textDecorationColor = \'rgba(59, 130, 246, 0.3)\'">$1</a>')
            // 段落样式
            .replace(/\n\n/gim, '</p><p style="color: #E5E7EB; line-height: 28.8px; margin: 12px 0;">')
            .replace(/\n/gim, '<br />')
    }

    return (
        <article
            className={className}
            style={{
                maxWidth: '100%',
                color: '#E5E7EB',
                lineHeight: '28.8px',
                fontSize: '16px'
            }}
        >
            {/* 文章导语 */}
            <div style={{
                color: '#E5E7EB',
                lineHeight: '28.8px',
                fontSize: '16px',
                marginBottom: '18.9px',
                marginRight: '13.93px',
                minHeight: '50.79px'
            }}>
                {content.split('\n\n')[0].replace(/^# .*\n/, '')}
            </div>

            {/* 文章主体内容 */}
            <div
                style={{
                    color: '#E5E7EB',
                    lineHeight: '28.8px',
                    fontSize: '16px'
                }}
                dangerouslySetInnerHTML={{
                    __html: renderMarkdown(content)
                }}
            />

            {/* 文章底部样式 */}
            <style jsx>{`
                article ul, article ol {
                    margin: var(--spacing-4) 0;
                    padding-left: var(--spacing-6);
                }
                
                article ul {
                    list-style-type: none;
                }
                
                article ol {
                    list-style-type: decimal;
                }
                
                article img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin: 25px 0;
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