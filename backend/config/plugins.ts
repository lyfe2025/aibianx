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

    // ========== 官方插件配置 ==========

    // 启用SEO增强插件 - Meta标签和社交媒体预览优化
    seo: {
        enabled: true,
        config: {
            contentTypes: ['article', 'category', 'tag'],
            // 默认SEO配置
            defaults: {
                title: 'AI变现之路 - 专业AI工具与变现指南',
                description: '探索AI变现的无限可能，分享最新AI工具和变现策略',
                keywords: 'AI工具,人工智能,变现,副业,在线赚钱',
                robots: 'index,follow',
                canonical: process.env.FRONTEND_URL || 'http://localhost:3000'
            }
        }
    },

    // 注意：第三方插件已移除，避免兼容性问题
    // 如需要以下功能，可考虑替代方案：
    // - 数据导入导出：使用 @strapi/strapi 内置导入导出功能
    // - API格式转换：在前端进行数据处理
    // - 邮件模板：使用外部邮件服务或自定义实现
});
