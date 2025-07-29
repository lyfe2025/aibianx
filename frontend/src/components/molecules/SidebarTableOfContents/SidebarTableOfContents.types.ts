export interface SidebarTableOfContentsProps {
  /** 文章内容，用于提取标题 */
  content: string
  /** 目标容器选择器，默认为 '.glass-card' */
  targetSelector?: string
  /** 自定义CSS类名 */
  className?: string
  /** 是否显示组件，默认为true */
  isVisible?: boolean
}

export interface HeadingItem {
  /** 标题唯一ID */
  id: string
  /** 标题文本 */
  text: string
  /** 标题层级 (1-4) */
  level: number
  /** DOM元素引用 */
  element: HTMLElement
} 