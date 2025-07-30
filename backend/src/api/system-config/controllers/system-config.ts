/**
 * system-config controller
 * 系统配置控制器 - 管理邮件服务、OAuth、用户注册等系统功能配置
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::system-config.system-config', ({ strapi }) => ({
    /**
     * 获取系统配置
     * GET /api/system-config
     */
    async find(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config')
        return this.sanitizeOutput(entity, ctx)
    },

    /**
     * 更新系统配置
     * PUT /api/system-config
     */
    async update(ctx) {
        // 记录最后修改人（如果有用户上下文）
        if (ctx.state.user) {
            ctx.request.body.data = {
                ...ctx.request.body.data,
                lastModifiedBy: ctx.state.user.username || ctx.state.user.email || '系统管理员'
            }
        }

        const entity = await strapi.entityService.update('api::system-config.system-config', 1, {
            data: ctx.request.body.data
        })

        return this.sanitizeOutput(entity, ctx)
    },

    /**
     * 获取公开的系统配置（用于前端）
     * GET /api/system-config/public
     */
    async getPublicConfig(ctx) {
        const entity = await strapi.entityService.findMany('api::system-config.system-config')

        if (!entity) {
            return ctx.notFound('系统配置未找到')
        }

        // 只返回前端需要的公开配置
        const publicConfig = {
            // 注册和登录相关
            registrationEnabled: entity.registrationEnabled,
            emailVerificationEnabled: entity.emailVerificationEnabled,
            passwordResetEnabled: entity.passwordResetEnabled,

            // OAuth相关
            oauthEnabled: entity.oauthEnabled,
            githubOauthEnabled: entity.githubOauthEnabled,
            googleOauthEnabled: entity.googleOauthEnabled,
            wechatOauthEnabled: entity.wechatOauthEnabled,
            qqOauthEnabled: entity.qqOauthEnabled,
            oauthAutoRegister: entity.oauthAutoRegister,

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

            // 邮件服务（仅状态，不包含敏感配置）
            emailServiceEnabled: entity.emailServiceEnabled
        }

        return publicConfig
    },

    /**
     * 获取邮件配置（用于服务端）
     * GET /api/system-config/email
     */
    async getEmailConfig(ctx) {
        // 仅允许管理员或系统内部调用
        if (!ctx.state.user || !ctx.state.user.isAdmin) {
            return ctx.forbidden('权限不足')
        }

        const entity = await strapi.entityService.findMany('api::system-config.system-config')

        if (!entity) {
            return ctx.notFound('系统配置未找到')
        }

        // 返回邮件相关配置
        const emailConfig = {
            emailServiceEnabled: entity.emailServiceEnabled,
            emailServiceProvider: entity.emailServiceProvider,
            emailSmtpHost: entity.emailSmtpHost,
            emailSmtpPort: entity.emailSmtpPort,
            emailFromAddress: entity.emailFromAddress,
            emailFromName: entity.emailFromName,
            emailUseTLS: entity.emailUseTLS,
            emailSubjectPrefix: entity.emailSubjectPrefix,
            emailVerificationCodeLength: entity.emailVerificationCodeLength,
            emailVerificationCodeExpiry: entity.emailVerificationCodeExpiry,
            passwordResetTokenExpiry: entity.passwordResetTokenExpiry
        }

        return emailConfig
    }
}))