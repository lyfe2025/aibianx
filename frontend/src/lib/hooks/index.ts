/**
 * Hooks 统一导出
 * 
 * 项目中所有自定义Hook的统一导出入口
 */

// 移动端手势相关
export { useGestures, useSimpleGestures } from './useGestures'
export { useTouchFeedback, useSimpleTouchFeedback } from './useTouchFeedback'

// 现有的hooks
export { useWeeklyLogicWithAPI } from './useWeeklyLogicWithAPI'

// UI相关hooks
export { useSubtitleColorFix } from './useSubtitleColorFix'
export { useHeaderScroll } from './useHeaderScroll'

// 数据获取hooks
export { useHomeArticles } from './useHomeArticles'
export { useBookmarksLogic } from './useBookmarksLogic'
export { useSettingsLogic } from './useSettingsLogic'

// 系统配置hooks
export { 
  useSystemConfig, 
  useOAuthAvailability, 
  usePasswordPolicy, 
  usePasswordValidation 
} from './useSystemConfig'