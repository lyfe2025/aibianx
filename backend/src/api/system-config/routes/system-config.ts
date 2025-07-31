export default {
    routes: [
        // 基础CRUD路由
        {
            method: 'GET',
            path: '/system-config',
            handler: 'system-config.find',
            config: {
                policies: [],
                middlewares: [],
                description: '获取完整系统配置（仅管理员）',
                tags: ['System-Config'],
            }
        },
        {
            method: 'PUT',
            path: '/system-config/:id',
            handler: 'system-config.update',
            config: {
                policies: [],
                middlewares: [],
                description: '更新系统配置（仅管理员）',
                tags: ['System-Config'],
            }
        },

        // 公开配置API（前端使用）
        {
            method: 'GET',
            path: '/system-config/public',
            handler: 'system-config.getPublicConfig',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
                description: '获取公开系统配置（前端使用，隐藏敏感信息）',
                tags: ['System-Config'],
            }
        },

        // OAuth配置API（NextAuth.js内部使用）
        {
            method: 'GET',
            path: '/system-config/oauth',
            handler: 'system-config.getOAuthConfig',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
                description: '获取OAuth配置（NextAuth.js内部使用，包含敏感信息）',
                tags: ['System-Config'],

            }
        },



        // 用户注册配置API
        {
            method: 'GET',
            path: '/system-config/registration',
            handler: 'system-config.getRegistrationConfig',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
                description: '获取用户注册配置',
                tags: ['System-Config'],
            }
        },

        // 维护模式状态API
        {
            method: 'GET',
            path: '/system-config/maintenance',
            handler: 'system-config.getMaintenanceStatus',
            config: {
                auth: false,
                policies: [],
                middlewares: [],
                description: '获取维护模式状态',
                tags: ['System-Config'],
            }
        }
    ]
}