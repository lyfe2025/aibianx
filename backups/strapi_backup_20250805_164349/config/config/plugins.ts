export default ({ env }) => ({
    // 启用API文档插件
    documentation: {
        enabled: true,
        config: {
            openapi: '3.0.0',
            info: {
                version: '1.0.0',
                title: 'AI变现之路 API 文档',
                description: 'AI变现之路网站的完整API文档，包含文章管理、SEO配置、用户认证等功能',
                contact: {
                    name: 'AI变现之路开发团队',
                    email: 'dev@aibianx.com',
                },
            },
            'x-strapi-config': {
                path: '/documentation',
                generateDocumentation: true,
            },
        },
    },

    // 启用国际化插件 (内置)
    i18n: true,

    // 启用文件上传插件 (内置) 
    upload: {
        config: {
            provider: 'local',
            providerOptions: {
                sizeLimit: 10000000, // 10MB
            },
        },
    },

    // 启用用户权限插件 (内置)
    'users-permissions': {
        config: {
            jwt: {
                expiresIn: '7d',
            },
        },
    },
});
