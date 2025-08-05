import { factories } from '@strapi/strapi'
import { oauthConfig } from '../../../lib/config'

export default factories.createCoreService('api::system-config.system-config', ({ strapi }) => ({
    /**
     * 缓存配置对象
     */
    _configCache: null,
    _cacheTime: 0,
    _cacheTimeout: 60000, // 1分钟缓存

    /**
     * 获取系统配置（带缓存）
     */
    async getSystemConfig() {
        const now = Date.now()

        // 检查缓存是否有效
        if (this._configCache && (now - this._cacheTime) < this._cacheTimeout) {
            return this._configCache
        }

        // 从数据库获取配置
        const config = await strapi.entityService.findMany('api::system-config.system-config')

        // 更新缓存
        this._configCache = config
        this._cacheTime = now

        return config
    },

    /**
     * 清除配置缓存
     */
    clearCache() {
        this._configCache = null
        this._cacheTime = 0
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

        const oauthConfig: any = {
            enabled: true,
            autoRegister: config.oauthAutoRegister,
            providers: {}
        }

        // GitHub配置
        if (config.githubOauthEnabled && config.githubClientId && config.githubClientSecret) {
            oauthConfig.providers.github = {
                enabled: true,
                clientId: config.githubClientId,
                clientSecret: config.githubClientSecret,
                callbackUrl: config.githubCallbackUrl
            }
        }

        // Google配置
        if (config.googleOauthEnabled && config.googleClientId && config.googleClientSecret) {
            oauthConfig.providers.google = {
                enabled: true,
                clientId: config.googleClientId,
                clientSecret: config.googleClientSecret,
                callbackUrl: config.googleCallbackUrl
            }
        }

        // 微信配置
        if (config.wechatOauthEnabled && config.wechatAppId && config.wechatAppSecret) {
            oauthConfig.providers.wechat = {
                enabled: true,
                appId: config.wechatAppId,
                appSecret: config.wechatAppSecret,
                callbackUrl: config.wechatCallbackUrl
            }
        }

        // QQ配置
        if (config.qqOauthEnabled && config.qqAppId && config.qqAppSecret) {
            oauthConfig.providers.qq = {
                enabled: true,
                appId: config.qqAppId,
                appSecret: config.qqAppSecret,
                callbackUrl: config.qqCallbackUrl
            }
        }

        return oauthConfig
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
            passwordResetEnabled: config.passwordResetEnabled,
            verificationCodeExpiry: config.verificationCodeExpiry,
            passwordResetTokenExpiry: config.passwordResetTokenExpiry,
            allowedEmailDomains: config.allowedEmailDomains,
            blockedEmailDomains: config.blockedEmailDomains,
            passwordPolicy: {
                minLength: config.passwordMinLength,
                requireSpecialChar: config.passwordRequireSpecialChar,
                requireNumber: config.passwordRequireNumber,
                requireUppercase: config.passwordRequireUppercase
            }
        }
    },

    /**
     * 验证密码是否符合配置的策略
     */
    async validatePassword(password) {
        const config = await this.getSystemConfig()

        if (!config) {
            return { valid: false, errors: ['系统配置未找到'] }
        }

        const errors = []

        // 检查长度
        if (password.length < config.passwordMinLength) {
            errors.push(`密码长度至少需要${config.passwordMinLength}位`)
        }

        // 检查特殊字符
        if (config.passwordRequireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('密码必须包含特殊字符')
        }

        // 检查数字
        if (config.passwordRequireNumber && !/\d/.test(password)) {
            errors.push('密码必须包含数字')
        }

        // 检查大写字母
        if (config.passwordRequireUppercase && !/[A-Z]/.test(password)) {
            errors.push('密码必须包含大写字母')
        }

        return {
            valid: errors.length === 0,
            errors
        }
    },

    /**
     * 检查邮箱域名是否被允许
     */
    async isEmailDomainAllowed(email) {
        const config = await this.getSystemConfig()

        if (!config) {
            return true // 默认允许
        }

        const domain = email.split('@')[1]?.toLowerCase()

        if (!domain) {
            return false
        }

        // 检查黑名单
        if (config.blockedEmailDomains) {
            const blockedDomains = config.blockedEmailDomains
                .split('\n')
                .map(d => d.trim().toLowerCase())
                .filter(d => d.length > 0)

            if (blockedDomains.includes(domain)) {
                return false
            }
        }

        // 检查白名单
        if (config.allowedEmailDomains) {
            const allowedDomains = config.allowedEmailDomains
                .split('\n')
                .map(d => d.trim().toLowerCase())
                .filter(d => d.length > 0)

            return allowedDomains.includes(domain)
        }

        return true // 没有白名单限制，默认允许
    },

    /**
     * 初始化默认配置
     */
    async initializeDefaultConfig() {
        try {
            // 检查是否已存在配置
            const existingConfig = await strapi.entityService.findMany('api::system-config.system-config')

            if (existingConfig) {
                console.log('✅ 系统配置已存在，跳过初始化')
                return existingConfig
            }

            // 创建默认配置（组件化结构）
            const defaultConfig = {
                configName: '系统配置',
                
                // 用户管理配置组件
                userManagement: {
                    registrationEnabled: true,
                    emailVerificationEnabled: true,
                    passwordResetEnabled: true,
                    enableUserProfileEdit: true,
                    enableAccountDeletion: false,
                    enableUserListPublic: false,
                    maxAvatarSize: 2097152,
                    defaultUserRole: 'authenticated' as const,
                    enableUserApproval: false
                },

                // 密码策略配置组件
                passwordPolicy: {
                    passwordMinLength: 8,
                    passwordMaxLength: 128,
                    passwordRequireSpecialChar: true,
                    passwordRequireNumber: true,
                    passwordRequireUppercase: false,
                    passwordRequireLowercase: true,
                    passwordHistoryCount: 5,
                    passwordExpiryDays: 0
                },

                // 验证设置配置组件
                verificationSettings: {
                    verificationCodeLength: 6,
                    verificationCodeType: 'numeric' as const,
                    verificationCodeExpiry: 600,
                    passwordResetTokenExpiry: 3600,
                    emailVerificationTokenExpiry: 86400,
                    maxVerificationAttempts: 5,
                    verificationCooldown: 60,
                    maxDailyVerifications: 10
                },

                // OAuth设置配置组件
                oauthSettings: {
                    oauthEnabled: true,
                    oauthAutoRegister: true,
                    oauthLinkExistingAccount: true,
                    oauthEmailRequired: true,
                    
                    // GitHub OAuth
                    githubOauth: {
                        enabled: false,
                        client_id: '',
                        client_secret: '',
                        callback_url: oauthConfig.github,
                        scope: 'user:email',
                        button_text: '使用GitHub登录',
                        button_icon: 'github'
                    },
                    
                    // Google OAuth
                    googleOauth: {
                        enabled: false,
                        client_id: '',
                        client_secret: '',
                        callback_url: oauthConfig.google,
                        scope: 'email profile',
                        button_text: '使用Google登录',
                        button_icon: 'google'
                    },
                    
                    // 微信OAuth
                    wechatOauth: {
                        enabled: false,
                        client_id: '',
                        client_secret: '',
                        callback_url: oauthConfig.wechat,
                        scope: 'snsapi_userinfo',
                        button_text: '使用微信登录',
                        button_icon: 'wechat'
                    },
                    
                    // QQ OAuth
                    qqOauth: {
                        enabled: false,
                        client_id: '',
                        client_secret: '',
                        callback_url: oauthConfig.qq,
                        scope: 'get_user_info',
                        button_text: '使用QQ登录',
                        button_icon: 'qq'
                    },
                    
                    oauthButtonStyle: 'horizontal' as const,
                    showOauthDivider: true,
                    oauthDividerText: '或使用第三方账号登录',
                    enableOauthOnRegister: true,
                    enableOauthOnLogin: true
                },

                // 安全设置配置组件
                securitySettings: {
                    sessionTimeout: 2592000,
                    enableRememberMe: true,
                    rememberMeDuration: 7776000,
                    maxLoginAttempts: 5,
                    accountLockoutDuration: 900,
                    enableIpWhitelist: false,
                    enableIpBlacklist: true,
                    enableRateLimiting: true,
                    rateLimitWindow: 3600,
                    rateLimitMax: 1000,
                    enableCsrfProtection: true,
                    enableXssProtection: true,
                    enableSecurityHeaders: true,
                    enableAuditLog: true,
                    auditLogRetention: 90
                },

                // 系统维护配置组件
                systemMaintenance: {
                    maintenanceMode: false,
                    maintenanceMessage: '网站正在进行系统升级维护，预计30分钟后恢复正常访问。',
                    maintenanceTitle: '系统维护中',
                    estimatedDowntime: '30分钟',
                    allowAdminAccess: true,
                    enableMaintenanceEmail: true,
                    enableSystemNotifications: true,
                    enableErrorReporting: true,
                    errorReportingLevel: 'error' as const,
                    logLevel: 'info' as const,
                    debugMode: false
                }
            }

            const config = await strapi.entityService.create('api::system-config.system-config', {
                data: defaultConfig
            })

            console.log('✅ 系统配置初始化完成')
            this.clearCache() // 清除缓存以确保使用新配置

            return config
        } catch (error) {
            console.error('❌ 系统配置初始化失败:', error)
            throw error
        }
    }
}))