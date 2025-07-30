/**
 * system-config service
 * 系统配置服务 - 提供系统配置相关的业务逻辑
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::system-config.system-config', ({ strapi }) => ({
    /**
     * 获取系统配置（带缓存）
     */
    async getSystemConfig() {
        try {
            const config = await strapi.entityService.findMany('api::system-config.system-config')
            return config
        } catch (error) {
            strapi.log.error('获取系统配置失败:', error)
            return null
        }
    },

    /**
     * 获取邮件服务配置
     */
    async getEmailServiceConfig() {
        const config = await this.getSystemConfig()

        if (!config || !config.emailServiceEnabled) {
            return null
        }

        return {
            provider: config.emailServiceProvider,
            host: config.emailSmtpHost,
            port: config.emailSmtpPort,
            fromAddress: config.emailFromAddress,
            fromName: config.emailFromName,
            useTLS: config.emailUseTLS,
            subjectPrefix: config.emailSubjectPrefix,
            verificationCodeLength: config.emailVerificationCodeLength,
            verificationCodeExpiry: config.emailVerificationCodeExpiry,
            passwordResetTokenExpiry: config.passwordResetTokenExpiry
        }
    },

    /**
     * 获取OAuth配置
     */
    async getOAuthConfig() {
        const config = await this.getSystemConfig()

        if (!config || !config.oauthEnabled) {
            return {
                enabled: false,
                providers: {}
            }
        }

        return {
            enabled: true,
            autoRegister: config.oauthAutoRegister,
            providers: {
                github: config.githubOauthEnabled,
                google: config.googleOauthEnabled,
                wechat: config.wechatOauthEnabled,
                qq: config.qqOauthEnabled
            }
        }
    },

    /**
     * 获取用户注册配置
     */
    async getRegistrationConfig() {
        const config = await this.getSystemConfig()

        if (!config) {
            return null
        }

        return {
            enabled: config.registrationEnabled,
            emailVerificationEnabled: config.emailVerificationEnabled,
            passwordMinLength: config.passwordMinLength,
            passwordRequireSpecialChar: config.passwordRequireSpecialChar,
            passwordRequireNumber: config.passwordRequireNumber,
            passwordRequireUppercase: config.passwordRequireUppercase,
            allowedEmailDomains: config.allowedEmailDomains ?
                config.allowedEmailDomains.split('\n').filter(domain => domain.trim()) : [],
            blockedEmailDomains: config.blockedEmailDomains ?
                config.blockedEmailDomains.split('\n').filter(domain => domain.trim()) : []
        }
    },

    /**
     * 获取安全配置
     */
    async getSecurityConfig() {
        const config = await this.getSystemConfig()

        if (!config) {
            return null
        }

        return {
            maxLoginAttempts: config.maxLoginAttempts,
            accountLockoutDuration: config.accountLockoutDuration,
            sessionTimeout: config.sessionTimeout,
            passwordResetEnabled: config.passwordResetEnabled
        }
    },

    /**
     * 检查系统是否处于维护模式
     */
    async isMaintenanceMode() {
        const config = await this.getSystemConfig()
        return config ? config.maintenanceMode : false
    },

    /**
     * 获取维护模式信息
     */
    async getMaintenanceInfo() {
        const config = await this.getSystemConfig()

        if (!config || !config.maintenanceMode) {
            return null
        }

        return {
            enabled: true,
            message: config.maintenanceMessage || '网站正在维护中，请稍后访问。'
        }
    },

    /**
     * 验证邮箱域名是否被允许
     */
    async isEmailDomainAllowed(email: string) {
        const config = await this.getRegistrationConfig()

        if (!config) {
            return true // 如果无法获取配置，默认允许
        }

        const domain = email.split('@')[1]?.toLowerCase()

        if (!domain) {
            return false
        }

        // 检查黑名单
        if (config.blockedEmailDomains.some(blocked =>
            blocked.toLowerCase() === domain
        )) {
            return false
        }

        // 检查白名单（如果设置了白名单）
        if (config.allowedEmailDomains.length > 0) {
            return config.allowedEmailDomains.some(allowed =>
                allowed.toLowerCase() === domain
            )
        }

        return true // 没有白名单限制且不在黑名单中
    },

    /**
     * 初始化默认系统配置
     */
    async initializeDefaultConfig() {
        try {
            const existingConfig = await this.getSystemConfig()

            if (existingConfig) {
                strapi.log.info('系统配置已存在，跳过初始化')
                return existingConfig
            }

            // 创建默认配置
            const defaultConfig = await strapi.entityService.create('api::system-config.system-config', {
                data: {
                    // 使用schema中定义的默认值
                    lastModifiedBy: '系统初始化'
                }
            })

            strapi.log.info('系统配置初始化完成')
            return defaultConfig
        } catch (error) {
            strapi.log.error('系统配置初始化失败:', error)
            throw error
        }
    }
}))