import type { Core } from '@strapi/strapi'

export default {
    /**
     * 应用启动后的初始化逻辑
     * 自动配置权限、初始化系统配置等
     */
    async bootstrap({ strapi }: { strapi: Core.Strapi }) {
        console.log('🚀 AI变现之路 - Strapi应用启动中...')

        try {
            // 1. 配置Public角色权限
            await configurePublicPermissions(strapi)

            // 2. 初始化系统配置
            await initializeSystemConfig(strapi)

            // 3. 初始化MeiliSearch搜索引擎
            await initializeMeiliSearch(strapi)

            // 4. 显示API端点信息
            displayAPIEndpoints()

            console.log('✅ Strapi应用启动完成！')

        } catch (error) {
            console.error('❌ Strapi应用启动失败:', error)
            throw error
        }
    },
}

/**
 * 配置Public角色权限
 */
async function configurePublicPermissions(strapi: Core.Strapi) {
    console.log('🔐 配置Public角色权限...')

    try {
        // 获取Public角色
        const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
            where: { type: 'public' },
            populate: { permissions: true }
        })

        if (!publicRole) {
            console.error('❌ 未找到Public角色')
            return
        }

        // 需要配置的权限列表（包含OAuth相关权限）
        const requiredPermissions = [
            // Article相关权限
            'api::article.article.find',
            'api::article.article.findOne',

            // Author相关权限
            'api::author.author.find',
            'api::author.author.findOne',

            // Category相关权限
            'api::category.category.find',
            'api::category.category.findOne',

            // Tag相关权限
            'api::tag.tag.find',
            'api::tag.tag.findOne',

            // Site Config相关权限
            'api::site-config.site-config.find',
            'api::site-config.site-config.findOne',

            // SEO Metrics相关权限
            'api::seo-metrics.seo-metrics.find',
            'api::seo-metrics.seo-metrics.findOne',

            // System Config相关权限（包含OAuth配置）
            'api::system-config.system-config.find',
            'api::system-config.system-config.findOne',
            'api::system-config.system-config.getPublicConfig',
            'api::system-config.system-config.getOAuthConfig',
            'api::system-config.system-config.getEmailConfig',
            'api::system-config.system-config.getRegistrationConfig',
            'api::system-config.system-config.getMaintenanceStatus',

            // Search相关权限（MeiliSearch搜索引擎）
            'api::search.search.articles',
            'api::search.search.suggestions',
            'api::search.search.stats',
            'api::search.search.health',
            'api::search.search.reindex'
        ]

        let permissionsUpdated = 0

        for (const permissionAction of requiredPermissions) {
            try {
                // 检查权限是否已存在
                const existingPermission = await strapi.query('plugin::users-permissions.permission').findOne({
                    where: {
                        action: permissionAction,
                        role: publicRole.id
                    }
                })

                if (!existingPermission) {
                    // 创建新权限
                    await strapi.query('plugin::users-permissions.permission').create({
                        data: {
                            action: permissionAction,
                            enabled: true,
                            policy: '',
                            role: publicRole.id
                        }
                    })
                    permissionsUpdated++
                    console.log(`  ✅ 已添加权限: ${permissionAction}`)
                } else if (!existingPermission.enabled) {
                    // 启用已存在但被禁用的权限
                    await strapi.query('plugin::users-permissions.permission').update({
                        where: { id: existingPermission.id },
                        data: { enabled: true }
                    })
                    permissionsUpdated++
                    console.log(`  ✅ 已启用权限: ${permissionAction}`)
                }
            } catch (error) {
                console.error(`  ❌ 配置权限失败 ${permissionAction}:`, error.message)
            }
        }

        if (permissionsUpdated > 0) {
            console.log(`✅ Public角色权限配置完成，共更新 ${permissionsUpdated} 个权限`)
        } else {
            console.log('✅ Public角色权限已是最新状态')
        }

    } catch (error) {
        console.error('❌ 配置Public角色权限失败:', error)
        throw error
    }
}

/**
 * 初始化系统配置
 */
async function initializeSystemConfig(strapi: Core.Strapi) {
    console.log('⚙️  初始化系统配置...')

    try {
        // 获取system-config服务
        const systemConfigService = strapi.service('api::system-config.system-config')

        if (!systemConfigService) {
            console.error('❌ 未找到system-config服务')
            return
        }

        // 调用初始化方法
        await systemConfigService.initializeDefaultConfig()

        console.log('✅ 系统配置初始化完成')

        // 显示当前配置状态
        const config = await systemConfigService.getSystemConfig()
        if (config) {
            console.log('📊 当前系统配置状态:')
            console.log(`  📧 邮件服务: ${config.emailServiceEnabled ? '✅ 已启用' : '❌ 已禁用'} (${config.emailServiceProvider})`)
            console.log(`  🔐 用户注册: ${config.registrationEnabled ? '✅ 已启用' : '❌ 已禁用'}`)
            console.log(`  📨 邮箱验证: ${config.emailVerificationEnabled ? '✅ 已启用' : '❌ 已禁用'}`)
            console.log(`  🔄 密码重置: ${config.passwordResetEnabled ? '✅ 已启用' : '❌ 已禁用'}`)
            console.log(`  🔗 OAuth总开关: ${config.oauthEnabled ? '✅ 已启用' : '❌ 已禁用'}`)

            // OAuth具体配置状态
            if (config.oauthEnabled) {
                console.log('  🔗 OAuth具体配置:')
                console.log(`    GitHub: ${config.githubOauthEnabled ? '✅ 已启用' : '❌ 已禁用'} ${config.githubClientId ? '(已配置密钥)' : '(未配置密钥)'}`)
                console.log(`    Google: ${config.googleOauthEnabled ? '✅ 已启用' : '❌ 已禁用'} ${config.googleClientId ? '(已配置密钥)' : '(未配置密钥)'}`)
                console.log(`    微信: ${config.wechatOauthEnabled ? '✅ 已启用' : '❌ 已禁用'} ${config.wechatAppId ? '(已配置密钥)' : '(未配置密钥)'}`)
                console.log(`    QQ: ${config.qqOauthEnabled ? '✅ 已启用' : '❌ 已禁用'} ${config.qqAppId ? '(已配置密钥)' : '(未配置密钥)'}`)
            }

            console.log(`  🛡️  维护模式: ${config.maintenanceMode ? '⚠️  已启用' : '✅ 正常运行'}`)
        }

    } catch (error) {
        console.error('❌ 初始化系统配置失败:', error)
        throw error
    }
}

/**
 * 初始化MeiliSearch搜索引擎
 */
async function initializeMeiliSearch(strapi: Core.Strapi) {
    console.log('🔍 初始化MeiliSearch搜索引擎...')

    try {
        // 动态导入MeiliSearch服务
        const MeiliSearchService = (await import('./services/meilisearch')).default
        const meilisearchService = new MeiliSearchService()

        // 检查MeiliSearch健康状态
        const health = await meilisearchService.healthCheck()

        if (health.status === 'healthy') {
            console.log('✅ MeiliSearch服务连接成功')

            // 初始化搜索索引
            await meilisearchService.initializeIndexes()

            // 同步现有文章数据到搜索索引
            console.log('📊 同步文章数据到搜索索引...')
            const syncedCount = await meilisearchService.syncArticles()
            console.log(`✅ 已同步 ${syncedCount} 篇文章到搜索索引`)

            // 获取索引统计
            const stats = await meilisearchService.getIndexStats()
            console.log(`📈 搜索索引统计: ${stats.totalDocuments} 篇文档`)

        } else {
            console.warn('⚠️  MeiliSearch服务连接失败，搜索功能将不可用')
            console.warn('   请确保MeiliSearch服务正在运行在 http://localhost:7700')
            console.warn('   启动命令: ./meilisearch')
        }

    } catch (error) {
        console.warn('⚠️  MeiliSearch初始化失败，搜索功能将不可用:', error.message)
        console.warn('   这不会影响应用的其他功能，但搜索功能需要MeiliSearch服务')

        // 不抛出错误，允许应用继续启动
    }
}

/**
 * 显示API端点信息
 */
function displayAPIEndpoints() {
    console.log('📡 API端点信息:')
    console.log('  📰 内容管理:')
    console.log('    GET  /api/articles - 获取文章列表')
    console.log('    GET  /api/articles/:id - 获取文章详情')
    console.log('    GET  /api/authors - 获取作者列表')
    console.log('    GET  /api/categories - 获取分类列表')
    console.log('    GET  /api/tags - 获取标签列表')

    console.log('  🔍 搜索功能 (新增MeiliSearch引擎):')
    console.log('    GET  /api/search/articles - 文章搜索')
    console.log('    GET  /api/search/suggestions - 搜索建议')
    console.log('    GET  /api/search/stats - 搜索统计')
    console.log('    POST /api/search/reindex - 重建搜索索引')
    console.log('    GET  /api/search/health - 搜索服务健康检查')

    console.log('  ⚙️  系统配置 (新增OAuth配置支持):')
    console.log('    GET  /api/system-config/public - 获取公开配置')
    console.log('    GET  /api/system-config/oauth - 获取OAuth配置 (内部API)')
    console.log('    GET  /api/system-config/email - 获取邮件配置 (内部API)')
    console.log('    GET  /api/system-config/registration - 获取注册配置')
    console.log('    GET  /api/system-config/maintenance - 获取维护状态')
    console.log('    GET  /api/system-config - 获取完整配置 (仅管理员)')
    console.log('    PUT  /api/system-config/:id - 更新配置 (仅管理员)')

    console.log('  🌐 网站配置:')
    console.log('    GET  /api/site-config - 获取网站配置')
    console.log('    GET  /api/seo-metrics - 获取SEO数据')

    console.log('  📚 API文档: http://localhost:1337/documentation')
    console.log('  🔧 管理面板: http://localhost:1337/admin')
}