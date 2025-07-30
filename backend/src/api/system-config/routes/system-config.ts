/**
 * system-config router
 * 系统配置路由 - 定义系统配置相关的API端点
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/system-config',
            handler: 'system-config.find',
            config: {
                description: '获取完整系统配置（管理员权限）',
                tag: 'System Config',
                policies: [], // 可以添加权限策略
                middlewares: []
            }
        },
        {
            method: 'PUT',
            path: '/system-config',
            handler: 'system-config.update',
            config: {
                description: '更新系统配置（管理员权限）',
                tag: 'System Config',
                policies: [], // 可以添加权限策略
                middlewares: []
            }
        },
        {
            method: 'GET',
            path: '/system-config/public',
            handler: 'system-config.getPublicConfig',
            config: {
                description: '获取公开的系统配置（无需权限）',
                tag: 'System Config',
                auth: false, // 公开端点，不需要认证
                policies: [],
                middlewares: []
            }
        },
        {
            method: 'GET',
            path: '/system-config/email',
            handler: 'system-config.getEmailConfig',
            config: {
                description: '获取邮件配置（管理员权限）',
                tag: 'System Config',
                policies: [], // 需要管理员权限策略
                middlewares: []
            }
        }
    ]
}