export interface FontSizeControllerProps {
    /**
     * 当前字体大小
     */
    fontSize: number
    
    /**
     * 字体大小变化回调
     */
    onFontSizeChange: (fontSize: number) => void
    
    /**
     * 自定义类名
     */
    className?: string
} 