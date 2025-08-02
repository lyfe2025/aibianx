/**
 * system-config controller
 */

import { factories } from '@strapi/strapi'

// 定义标准的populate参数，包含所有组件
const SYSTEM_CONFIG_POPULATE = {
    userManagement: true,
    passwordPolicy: true,
    verificationSettings: true,
    oauthSettings: true,
    securitySettings: true,
    systemMaintenance: true
}

export default factories.createCoreController('api::system-config.system-config', ({ strapi }) => ({
    // 重写默认的update方法，确保包含组件数据
    async update(ctx) {
        const { id } = ctx.params
        const { data } = ctx.request.body

        const entity = await strapi.entityService.update('api::system-config.system-config', id, {
            data,
            populate: SYSTEM_CONFIG_POPULATE
        })

        return this.sanitizeOutput(entity, ctx)
    },

    /**
     * 获取公开的系统配置（用于前端，隐藏敏感信息）
     * GET /api/system-config/public
     */
    async getPublicConfig(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config', {
            populate: SYSTEM_CONFIG_POPULATE
        }) as any
        
        if (!entity) {
            return ctx.notFound('系统配置未找到')
        }

        // 只返回前端需要的公开配置，隐藏所有敏感信息
        const publicConfig = {
            // 注册和登录相关（从userManagement组件）
            registrationEnabled: entity.userManagement?.registrationEnabled || false,
            emailVerificationEnabled: entity.userManagement?.emailVerificationEnabled || false,
            passwordResetEnabled: entity.userManagement?.passwordResetEnabled || false,

            // OAuth相关（仅开关状态，不包含密钥）
            oauthEnabled: entity.oauthSettings?.oauthEnabled || false,
            githubOauthEnabled: entity.oauthSettings?.githubOauth?.enabled || false,
            googleOauthEnabled: entity.oauthSettings?.googleOauth?.enabled || false,
            wechatOauthEnabled: entity.oauthSettings?.wechatOauth?.enabled || false,
            qqOauthEnabled: entity.oauthSettings?.qqOauth?.enabled || false,
            oauthAutoRegister: entity.oauthSettings?.oauthAutoRegister || false,

            // 密码策略
            passwordMinLength: entity.passwordPolicy?.passwordMinLength || 8,
            passwordRequireSpecialChar: entity.passwordPolicy?.passwordRequireSpecialChar || false,
            passwordRequireNumber: entity.passwordPolicy?.passwordRequireNumber || false,
            passwordRequireUppercase: entity.passwordPolicy?.passwordRequireUppercase || false,

            // 系统状态
            maintenanceMode: entity.systemMaintenance?.maintenanceMode || false,
            maintenanceMessage: entity.systemMaintenance?.maintenanceMessage || '网站正在进行系统升级维护，预计30分钟后恢复正常访问。',

            // 用户功能
            enableUserProfileEdit: entity.userManagement?.enableUserProfileEdit || false,
            enableAccountDeletion: entity.userManagement?.enableAccountDeletion || false
        }

        return publicConfig
    },

    /**
     * 获取OAuth配置（用于后端验证，包含客户端密钥但不暴露给前端）
     * GET /api/system-config/oauth（内部API）
     */
    async getOAuthConfig(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config', {
            populate: SYSTEM_CONFIG_POPULATE
        }) as any
        if (!entity || !entity.oauthSettings?.oauthEnabled) {
            return { 
                enabled: false,
                providers: []
            }
        }

        const config = {
            enabled: true,
            autoRegister: entity.oauthSettings?.oauthAutoRegister,
            providers: []
        }

        // GitHub OAuth配置
        if (entity.oauthSettings?.githubOauth?.enabled && entity.oauthSettings?.githubOauth?.client_id && entity.oauthSettings?.githubOauth?.client_secret) {
            config.providers.push({
                name: 'github',
                clientId: entity.oauthSettings.githubOauth.client_id,
                clientSecret: entity.oauthSettings.githubOauth.client_secret,
                callbackUrl: entity.oauthSettings.githubOauth.callback_url
            })
        }

        // Google OAuth配置
        if (entity.oauthSettings?.googleOauth?.enabled && entity.oauthSettings?.googleOauth?.client_id && entity.oauthSettings?.googleOauth?.client_secret) {
            config.providers.push({
                name: 'google',
                clientId: entity.oauthSettings.googleOauth.client_id,
                clientSecret: entity.oauthSettings.googleOauth.client_secret,
                callbackUrl: entity.oauthSettings.googleOauth.callback_url
            })
        }

        // 微信OAuth配置
        if (entity.oauthSettings?.wechatOauth?.enabled && entity.oauthSettings?.wechatOauth?.client_id && entity.oauthSettings?.wechatOauth?.client_secret) {
            config.providers.push({
                name: 'wechat',
                appId: entity.oauthSettings.wechatOauth.client_id,
                appSecret: entity.oauthSettings.wechatOauth.client_secret,
                callbackUrl: entity.oauthSettings.wechatOauth.callback_url
            })
        }

        // QQ OAuth配置
        if (entity.oauthSettings?.qqOauth?.enabled && entity.oauthSettings?.qqOauth?.client_id && entity.oauthSettings?.qqOauth?.client_secret) {
            config.providers.push({
                name: 'qq',
                appId: entity.oauthSettings.qqOauth.client_id,
                appSecret: entity.oauthSettings.qqOauth.client_secret,
                callbackUrl: entity.oauthSettings.qqOauth.callback_url
            })
        }

        return config
    },

    /**
     * 获取注册配置
     * GET /api/system-config/registration
     */
    async getRegistrationConfig(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config', {
            populate: SYSTEM_CONFIG_POPULATE
        }) as any
        if (!entity) {
            return {
                enabled: false,
                emailVerificationEnabled: false,
                passwordResetEnabled: false,
                verificationCodeExpiry: 600,
                passwordResetTokenExpiry: 3600,
                allowedEmailDomains: '',
                blockedEmailDomains: '',
                password: {
                    minLength: 8,
                    requireSpecialChar: false,
                    requireNumber: false,
                    requireUppercase: false
                }
            }
        }

        return {
            enabled: entity.userManagement?.registrationEnabled,
            emailVerificationEnabled: entity.userManagement?.emailVerificationEnabled,
            passwordResetEnabled: entity.userManagement?.passwordResetEnabled,
            verificationCodeExpiry: entity.verificationSettings?.verificationCodeExpiry,
            passwordResetTokenExpiry: entity.verificationSettings?.passwordResetTokenExpiry,
            allowedEmailDomains: entity.verificationSettings?.allowedEmailDomains,
            blockedEmailDomains: entity.verificationSettings?.blockedEmailDomains,
            password: {
                minLength: entity.passwordPolicy?.passwordMinLength,
                requireSpecialChar: entity.passwordPolicy?.passwordRequireSpecialChar,
                requireNumber: entity.passwordPolicy?.passwordRequireNumber,
                requireUppercase: entity.passwordPolicy?.passwordRequireUppercase
            }
        }
    },

    /**
     * 获取维护状态
     * GET /api/system-config/maintenance
     */
    async getMaintenanceStatus(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config', {
            populate: SYSTEM_CONFIG_POPULATE
        }) as any
        return {
            maintenanceMode: entity?.systemMaintenance?.maintenanceMode || false,
            maintenanceMessage: entity?.systemMaintenance?.maintenanceMessage || '网站正在进行系统升级维护，预计30分钟后恢复正常访问。'
        }
    }
}))