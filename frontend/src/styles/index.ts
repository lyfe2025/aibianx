/**
 * 样式文件统一导出
 * 
 * 管理项目中所有样式文件的导入
 * 包括移动端专用样式和现有样式
 */

// 移动端样式模块
import './mobile.css'

// 现有的样式文件
import './globals.css'

/**
 * 移动端样式类名常量
 * 提供类型安全的CSS类名引用
 */
export const MobileStyles = {
  // 基础布局
  container: 'mobile-container',
  page: 'mobile-page',
  section: 'mobile-section',
  
  // 网格系统
  grid: 'mobile-grid',
  grid1: 'mobile-grid-1',
  grid2: 'mobile-grid-2',
  grid3: 'mobile-grid-3',
  
  // 组件样式
  card: 'mobile-card',
  cardCompact: 'mobile-card-compact',
  cardInteractive: 'mobile-card-interactive',
  
  button: 'mobile-button',
  buttonPrimary: 'mobile-button-primary',
  buttonSecondary: 'mobile-button-secondary',
  
  input: 'mobile-input',
  formGroup: 'mobile-form-group',
  
  // 导航
  nav: 'mobile-nav',
  navItem: 'mobile-nav-item',
  
  // 模态框
  modalOverlay: 'mobile-modal-overlay',
  modal: 'mobile-modal',
  modalHeader: 'mobile-modal-header',
  modalContent: 'mobile-modal-content',
  
  // 工具类
  touchTarget: 'touch-target',
  touchFeedback: 'touch-feedback',
  glass: 'mobile-glass',
  gradientPrimary: 'mobile-gradient-primary',
  
  // 性能优化
  gpuAccelerated: 'gpu-accelerated',
  touchOptimized: 'touch-optimized',
  fontOptimized: 'font-optimized',
  
  // 状态类
  loading: 'mobile-loading',
  error: 'mobile-error',
  success: 'mobile-success',
  warning: 'mobile-warning',
  
  // 显示隐藏
  show: 'mobile-show',
  hide: 'mobile-hide',
  mobileOnly: 'mobile-only',
  desktopOnly: 'desktop-only',
  
  // 间距
  m0: 'mobile-m-0',
  mxs: 'mobile-m-xs',
  msm: 'mobile-m-sm',
  mmd: 'mobile-m-md',
  mlg: 'mobile-m-lg',
  mxl: 'mobile-m-xl',
  
  p0: 'mobile-p-0',
  pxs: 'mobile-p-xs',
  psm: 'mobile-p-sm',
  pmd: 'mobile-p-md',
  plg: 'mobile-p-lg',
  pxl: 'mobile-p-xl',
  
  // 安全区域
  safeAreaTop: 'safe-area-top',
  safeAreaBottom: 'safe-area-bottom',
  
  // 可访问性
  srOnly: 'sr-only',
  focusVisible: 'focus-visible',
} as const

/**
 * 移动端断点常量
 */
export const MobileBreakpoints = {
  xs: 320,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024,
} as const

/**
 * 移动端样式工具函数
 */
export const MobileStyleUtils = {
  /**
   * 组合多个移动端CSS类名
   */
  combine: (...classNames: (string | undefined | null | false)[]): string => {
    return classNames.filter(Boolean).join(' ')
  },
  
  /**
   * 条件性添加CSS类名
   */
  conditional: (condition: boolean, className: string, fallback = ''): string => {
    return condition ? className : fallback
  },
  
  /**
   * 根据屏幕尺寸生成响应式类名
   */
  responsive: (baseClass: string, breakpoint?: keyof typeof MobileBreakpoints): string => {
    if (!breakpoint) return baseClass
    return `${baseClass}-${breakpoint}`
  },
  
  /**
   * 检查是否为移动端设备
   */
  isMobile: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= MobileBreakpoints.lg
  },
  
  /**
   * 检查是否支持触摸
   */
  isTouchDevice: (): boolean => {
    if (typeof window === 'undefined') return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  },
  
  /**
   * 获取安全区域insets
   */
  getSafeAreaInsets: () => {
    if (typeof window === 'undefined') return { top: 0, bottom: 0, left: 0, right: 0 }
    
    const style = getComputedStyle(document.documentElement)
    return {
      top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
      bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
      left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
      right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
    }
  }
}

/**
 * 移动端主题配置
 */
export const MobileTheme = {
  spacing: {
    xs: 'var(--mobile-spacing-xs)',
    sm: 'var(--mobile-spacing-sm)',
    md: 'var(--mobile-spacing-md)',
    lg: 'var(--mobile-spacing-lg)',
    xl: 'var(--mobile-spacing-xl)',
  },
  touchTarget: {
    min: 'var(--touch-target-min)',
    comfortable: 'var(--touch-target-comfortable)',
    large: 'var(--touch-target-large)',
  },
  shadow: {
    light: 'var(--mobile-shadow-light)',
    medium: 'var(--mobile-shadow-medium)',
    heavy: 'var(--mobile-shadow-heavy)',
  },
} as const