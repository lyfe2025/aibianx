/**
 * 搜索服务
 * 
 * 提供搜索相关的服务方法
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::search.search', ({ strapi }) => ({
    /**
     * 获取搜索配置
     */
    async getSearchConfig() {
        return await strapi.entityService.findOne('api::search.search', 1) || {
            enabled: true,
            indexStatus: 'ready',
            totalDocuments: 0
        }
    },

    /**
     * 更新搜索统计
     */
    async updateSearchStats(stats: any) {
        try {
            const existing = await strapi.entityService.findOne('api::search.search', 1)

            if (existing) {
                return await strapi.entityService.update('api::search.search', 1, {
                    data: {
                        ...stats,
                        lastIndexUpdate: new Date()
                    }
                })
            } else {
                return await strapi.entityService.create('api::search.search', {
                    data: {
                        enabled: true,
                        indexStatus: 'ready',
                        totalDocuments: 0,
                        ...stats,
                        lastIndexUpdate: new Date()
                    }
                })
            }
        } catch (error) {
            strapi.log.error('更新搜索统计失败:', error)
            throw error
        }
    }
}))