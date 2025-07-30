/**
 * Article 生命周期钩子
 * 
 * 自动同步文章数据到MeiliSearch搜索索引
 * 确保搜索索引与数据库保持实时同步
 */

import MeiliSearchService from '../../../../services/meilisearch'

let meilisearchService: MeiliSearchService

// 懒加载初始化MeiliSearch服务
const getMeiliSearchService = () => {
    if (!meilisearchService) {
        meilisearchService = new MeiliSearchService()
    }
    return meilisearchService
}

export default {
    /**
     * 文章创建后触发
     */
    async afterCreate(event) {
        const { result } = event

        try {
            // 只有已发布的文章才同步到搜索索引
            if (result.publishedAt) {
                const service = getMeiliSearchService()
                await service.syncSingleArticle(result.documentId)

                strapi.log.info(`📝 新文章已同步到搜索索引: ${result.title}`)
            }
        } catch (error) {
            strapi.log.error('❌ 文章创建后同步搜索索引失败:', error)
            // 不抛出错误，避免影响文章创建流程
        }
    },

    /**
     * 文章更新后触发
     */
    async afterUpdate(event) {
        const { result } = event

        try {
            const service = getMeiliSearchService()

            // 如果文章已发布，同步到搜索索引
            if (result.publishedAt) {
                await service.syncSingleArticle(result.documentId)
                strapi.log.info(`📝 文章更新已同步到搜索索引: ${result.title}`)
            } else {
                // 如果文章变为未发布状态，从搜索索引中删除
                await service.deleteArticle(result.documentId)
                strapi.log.info(`🗑️  未发布文章已从搜索索引删除: ${result.title}`)
            }
        } catch (error) {
            strapi.log.error('❌ 文章更新后同步搜索索引失败:', error)
            // 不抛出错误，避免影响文章更新流程
        }
    },

    /**
     * 文章删除后触发
     */
    async afterDelete(event) {
        const { result } = event

        try {
            const service = getMeiliSearchService()
            await service.deleteArticle(result.documentId)

            strapi.log.info(`🗑️  文章已从搜索索引删除: ${result.title}`)
        } catch (error) {
            strapi.log.error('❌ 文章删除后清理搜索索引失败:', error)
            // 不抛出错误，避免影响文章删除流程
        }
    },

    /**
     * 批量删除后触发
     */
    async afterDeleteMany(event) {
        const { result } = event

        try {
            const service = getMeiliSearchService()

            // 批量删除搜索索引
            for (const article of result) {
                await service.deleteArticle(article.documentId)
            }

            strapi.log.info(`🗑️  批量删除 ${result.length} 篇文章的搜索索引`)
        } catch (error) {
            strapi.log.error('❌ 批量删除后清理搜索索引失败:', error)
            // 不抛出错误，避免影响批量删除流程
        }
    }
}