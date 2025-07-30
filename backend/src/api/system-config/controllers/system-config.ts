import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::system-config.system-config', ({ strapi }) => ({
    /**
     * 获取系统配置（完整配置，仅后台使用）
     * GET /api/system-config
     */
    async find(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config')
        return this.sanitizeOutput(entity, ctx)
    },

    /**
     * 更新系统配置
     * PUT /api/system-config/:id
     */
    async update(ctx) {
        const { id } = ctx.params
        const { data } = ctx.request.body

        const entity = await strapi.entityService.update('api::system-config.system-config', id, {
            data
        })

        return this.sanitizeOutput(entity, ctx)
    },

    /**
     * 获取公开的系统配置（用于前端，隐藏敏感信息）
     * GET /api/system-config/public
     */
    async getPublicConfig(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config')

        if (!entity) {
            return ctx.notFound('系统配置未找到')
        }

        // 只返回前端需要的公开配置，隐藏所有敏感信息
        const publicConfig = {
            // 注册和登录相关
            registrationEnabled: entity.registrationEnabled,
            emailVerificationEnabled: entity.emailVerificationEnabled,
            passwordResetEnabled: entity.passwordResetEnabled,

            // OAuth相关（仅开关状态，不包含密钥）
            oauthEnabled: entity.oauthEnabled,
            githubOauthEnabled: entity.githubOauthEnabled,
            googleOauthEnabled: entity.googleOauthEnabled,
            wechatOauthEnabled: entity.wechatOauthEnabled,
            qqOauthEnabled: entity.qqOauthEnabled,
            oauthAutoRegister: entity.oauthAutoRegister,

            // OAuth回调地址（非敏感信息）
            githubCallbackUrl: entity.githubCallbackUrl,
            googleCallbackUrl: entity.googleCallbackUrl,
            wechatCallbackUrl: entity.wechatCallbackUrl,
            qqCallbackUrl: entity.qqCallbackUrl,

            // 密码策略
            passwordMinLength: entity.passwordMinLength,
            passwordRequireSpecialChar: entity.passwordRequireSpecialChar,
            passwordRequireNumber: entity.passwordRequireNumber,
            passwordRequireUppercase: entity.passwordRequireUppercase,

            // 系统状态
            maintenanceMode: entity.maintenanceMode,
            maintenanceMessage: entity.maintenanceMessage,

            // 用户功能
            enableUserProfileEdit: entity.enableUserProfileEdit,
            enableAccountDeletion: entity.enableAccountDeletion,
            enableUserListPublic: entity.enableUserListPublic,
            maxAvatarSize: entity.maxAvatarSize,

            // 邮件服务（仅状态，不包含敏感配置）
            emailServiceEnabled: entity.emailServiceEnabled,
            emailServiceProvider: entity.emailServiceProvider,
            emailFromAddress: entity.emailFromAddress,
            emailFromName: entity.emailFromName
        }

        return publicConfig
    },

    /**
     * 获取OAuth配置（用于NextAuth.js，包含敏感信息）
     * GET /api/system-config/oauth
     * 注意：此接口仅供内部服务端使用，需要严格的访问控制
     */
    async getOAuthConfig(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config')

        if (!entity || !entity.oauthEnabled) {
            return {
                enabled: false,
                providers: {}
            }
        }

        const oauthConfig: any = {
            enabled: true,
            autoRegister: entity.oauthAutoRegister,
            providers: {}
        }

        // GitHub配置
        if (entity.githubOauthEnabled && entity.githubClientId && entity.githubClientSecret) {
            oauthConfig.providers.github = {
                enabled: true,
                clientId: entity.githubClientId,
                clientSecret: entity.githubClientSecret,
                callbackUrl: entity.githubCallbackUrl
            }
        }

        // Google配置
        if (entity.googleOauthEnabled && entity.googleClientId && entity.googleClientSecret) {
            oauthConfig.providers.google = {
                enabled: true,
                clientId: entity.googleClientId,
                clientSecret: entity.googleClientSecret,
                callbackUrl: entity.googleCallbackUrl
            }
        }

        // 微信配置
        if (entity.wechatOauthEnabled && entity.wechatAppId && entity.wechatAppSecret) {
            oauthConfig.providers.wechat = {
                enabled: true,
                appId: entity.wechatAppId,
                appSecret: entity.wechatAppSecret,
                callbackUrl: entity.wechatCallbackUrl
            }
        }

        // QQ配置
        if (entity.qqOauthEnabled && entity.qqAppId && entity.qqAppSecret) {
            oauthConfig.providers.qq = {
                enabled: true,
                appId: entity.qqAppId,
                appSecret: entity.qqAppSecret,
                callbackUrl: entity.qqCallbackUrl
            }
        }

        return oauthConfig
    },

    /**
     * 获取邮件配置（用于服务端发送邮件）
     * GET /api/system-config/email
     */
    async getEmailConfig(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config')

        if (!entity || !entity.emailServiceEnabled) {
            return {
                enabled: false
            }
        }

        return {
            enabled: true,
            provider: entity.emailServiceProvider,
            host: entity.emailSmtpHost,
            port: entity.emailSmtpPort,
            username: entity.emailUsername,
            password: entity.emailPassword,
            useTLS: entity.emailUseTLS,
            fromAddress: entity.emailFromAddress,
            fromName: entity.emailFromName
        }
    },

    /**
     * 获取用户注册配置
     * GET /api/system-config/registration
     */
    async getRegistrationConfig(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config')

        if (!entity) {
            return ctx.notFound('系统配置未找到')
        }

        return {
            enabled: entity.registrationEnabled,
            emailVerificationEnabled: entity.emailVerificationEnabled,
            passwordResetEnabled: entity.passwordResetEnabled,
            verificationCodeExpiry: entity.verificationCodeExpiry,
            passwordResetTokenExpiry: entity.passwordResetTokenExpiry,
            allowedEmailDomains: entity.allowedEmailDomains,
            blockedEmailDomains: entity.blockedEmailDomains,
            passwordPolicy: {
                minLength: entity.passwordMinLength,
                requireSpecialChar: entity.passwordRequireSpecialChar,
                requireNumber: entity.passwordRequireNumber,
                requireUppercase: entity.passwordRequireUppercase
            }
        }
    },

    /**
     * 检查维护模式状态
     * GET /api/system-config/maintenance
     */
    async getMaintenanceStatus(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config')

        return {
            maintenanceMode: entity?.maintenanceMode || false,
            maintenanceMessage: entity?.maintenanceMessage || '网站正在进行系统升级维护，预计30分钟后恢复正常访问。'
        }
    }
}))