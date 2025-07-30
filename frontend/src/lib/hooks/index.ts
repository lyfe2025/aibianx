/**
 * 自定义Hooks导出文件
 * 
 * 统一导出所有自定义Hook，提高代码组织性
 */

export { useSubtitleColorFix } from './useSubtitleColorFix'
export { useHeaderScroll } from './useHeaderScroll'
export { useWeeklyLogic } from './useWeeklyLogic'
export { useWeeklyLogicWithAPI } from './useWeeklyLogicWithAPI'
export { useSettingsLogic } from './useSettingsLogic'
export { useBookmarksLogic } from './useBookmarksLogic'
export { useHomeArticles } from './useHomeArticles'

// 系统配置相关Hooks
export {
    useSystemConfig,
    useOAuthProviders,
    usePasswordValidation,
    useMaintenanceMode,
    useRegistrationAvailability,
    useOAuthAvailability,
    useUserPermissions,
    usePasswordPolicy,
    useSystemStatus
} from './useSystemConfig' 