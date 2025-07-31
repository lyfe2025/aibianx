/**
 * 系统配置相关的React Hooks
 * 提供获取和使用系统配置的便捷方法
 */

import { useState, useEffect } from 'react'
import {
    getPublicSystemConfig,
    getEnabledOAuthProviders,
    validatePassword,
    isMaintenanceMode,
    type PublicSystemConfig
} from '../strapi'

/**
 * 获取公开系统配置的Hook
 */
export function useSystemConfig() {
    const [config, setConfig] = useState<PublicSystemConfig | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchConfig() {
            try {
                setIsLoading(true)
                setError(null)
                const configData = await getPublicSystemConfig()
                setConfig(configData)
            } catch (err) {
                setError(err instanceof Error ? err.message : '获取系统配置失败')
                console.error('获取系统配置失败:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchConfig()
    }, [])

    return {
        config, isLoading, error, refetch: () => {
            setIsLoading(true)
            setError(null)
            return getPublicSystemConfig().then(setConfig).finally(() => setIsLoading(false))
        }
    }
}

/**
 * 获取启用的OAuth提供商列表的Hook
 */
export function useOAuthProviders() {
    const [providers, setProviders] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProviders() {
            try {
                setIsLoading(true)
                setError(null)
                const enabledProviders = await getEnabledOAuthProviders()
                setProviders(enabledProviders)
            } catch (err) {
                setError(err instanceof Error ? err.message : '获取OAuth提供商失败')
                console.error('获取OAuth提供商失败:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProviders()
    }, [])

    return { providers, isLoading, error }
}

/**
 * 密码验证Hook
 */
export function usePasswordValidation() {
    const [validationResult, setValidationResult] = useState<{
        isValid: boolean
        errors: string[]
    } | null>(null)
    const [isValidating, setIsValidating] = useState(false)

    const validatePasswordAsync = async (password: string) => {
        if (!password) {
            setValidationResult({ isValid: false, errors: ['密码不能为空'] })
            return
        }

        try {
            setIsValidating(true)
            const result = await validatePassword(password)
            setValidationResult(result)
            return result
        } catch (err) {
            console.error('密码验证失败:', err)
            setValidationResult({ isValid: false, errors: ['密码验证失败'] })
        } finally {
            setIsValidating(false)
        }
    }

    return {
        validationResult,
        isValidating,
        validatePassword: validatePasswordAsync,
        clearValidation: () => setValidationResult(null)
    }
}

/**
 * 维护模式检查Hook
 */
export function useMaintenanceMode() {
    const [maintenanceMode, setMaintenanceMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function checkMaintenanceMode() {
            try {
                setIsLoading(true)
                setError(null)
                const isInMaintenance = await isMaintenanceMode()
                setMaintenanceMode(isInMaintenance)
            } catch (err) {
                setError(err instanceof Error ? err.message : '检查维护模式失败')
                console.error('检查维护模式失败:', err)
            } finally {
                setIsLoading(false)
            }
        }

        checkMaintenanceMode()
    }, [])

    return { maintenanceMode, isLoading, error }
}

/**
 * 注册功能可用性检查Hook
 */
export function useRegistrationAvailability() {
    const { config, isLoading, error } = useSystemConfig()

    return {
        isRegistrationEnabled: config?.registrationEnabled || false,
        isEmailVerificationEnabled: config?.emailVerificationEnabled || false,
        isPasswordResetEnabled: config?.passwordResetEnabled || false,
        isLoading,
        error
    }
}

/**
 * OAuth功能可用性检查Hook
 */
export function useOAuthAvailability() {
    const { config, isLoading, error } = useSystemConfig()

    return {
        isOAuthEnabled: config?.oauthEnabled || false,
        isGitHubEnabled: config?.githubOauthEnabled || false,
        isGoogleEnabled: config?.googleOauthEnabled || false,
        isWeChatEnabled: config?.wechatOauthEnabled || false,
        isQQEnabled: config?.qqOauthEnabled || false,
        autoRegister: config?.oauthAutoRegister || false,
        isLoading,
        error
    }
}

/**
 * 用户功能权限检查Hook
 */
export function useUserPermissions() {
    const { config, isLoading, error } = useSystemConfig()

    return {
        canEditProfile: config?.enableUserProfileEdit || false,
        canDeleteAccount: config?.enableAccountDeletion || false,
        isLoading,
        error
    }
}

/**
 * 密码策略Hook
 */
export function usePasswordPolicy() {
    const { config, isLoading, error } = useSystemConfig()

    return {
        minLength: config?.passwordMinLength || 8,
        requireSpecialChar: config?.passwordRequireSpecialChar || false,
        requireNumber: config?.passwordRequireNumber || false,
        requireUppercase: config?.passwordRequireUppercase || false,
        isLoading,
        error,
        getPolicyDescription: () => {
            if (!config) return '加载密码策略中...'

            const requirements = []
            requirements.push(`至少${config.passwordMinLength}个字符`)
            if (config.passwordRequireNumber) requirements.push('包含数字')
            if (config.passwordRequireSpecialChar) requirements.push('包含特殊字符')
            if (config.passwordRequireUppercase) requirements.push('包含大写字母')

            return `密码要求：${requirements.join('、')}`
        }
    }
}

/**
 * 系统状态综合Hook
 */
export function useSystemStatus() {
    const { config, isLoading: configLoading } = useSystemConfig()
    const { maintenanceMode, isLoading: maintenanceLoading } = useMaintenanceMode()

    return {
        isSystemReady: !configLoading && !maintenanceLoading && !maintenanceMode,
        isMaintenanceMode: maintenanceMode,
        maintenanceMessage: config?.maintenanceMessage || '网站正在维护中，请稍后访问。',
        isLoading: configLoading || maintenanceLoading,
        emailVerificationEnabled: config?.emailVerificationEnabled || false
    }
}