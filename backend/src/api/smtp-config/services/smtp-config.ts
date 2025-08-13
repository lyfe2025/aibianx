/**
 * smtp-config service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::smtp-config.smtp-config', ({ strapi }) => ({
  
  // 获取默认SMTP配置
  async getDefaultConfig() {
    const defaultConfig = await strapi.entityService.findMany('api::smtp-config.smtp-config', {
      filters: {
        isDefault: true,
        isActive: true
      },
      limit: 1
    });
    
    return defaultConfig.length > 0 ? defaultConfig[0] : null;
  },

  // 获取可用的SMTP配置
  async getAvailableConfigs() {
    return await strapi.entityService.findMany('api::smtp-config.smtp-config', {
      filters: {
        isActive: true
      },
      sort: [{ priority: 'asc' }, { successCount: 'desc' }]
    });
  },

  // 设置默认配置
  async setDefault(configId) {
    // 首先取消所有其他配置的默认状态
    const allConfigs = await strapi.entityService.findMany('api::smtp-config.smtp-config', {
      filters: {
        isDefault: true
      }
    });

    for (const config of allConfigs) {
      if (config.id !== configId) {
        await strapi.entityService.update('api::smtp-config.smtp-config', config.id, {
          data: { isDefault: false }
        });
      }
    }

    // 设置新的默认配置
    await strapi.entityService.update('api::smtp-config.smtp-config', configId, {
      data: { isDefault: true }
    });
  },

  // 重置每日发送计数
  async resetDailyCounts() {
    const configs = await strapi.entityService.findMany('api::smtp-config.smtp-config', {
      filters: {
        isActive: true
      }
    });

    for (const config of configs) {
      await strapi.entityService.update('api::smtp-config.smtp-config', config.id, {
        data: { dailySent: 0 }
      });
    }
  },

  // 记录发送结果
  async recordSendResult(configId, success, error = null) {
    const config = await strapi.entityService.findOne('api::smtp-config.smtp-config', configId);
    
    if (!config) return;

    const updateData: any = {
      lastUsed: new Date(),
      dailySent: config.dailySent + 1
    };

    if (success) {
      updateData.successCount = config.successCount + 1;
      updateData.healthStatus = 'healthy';
    } else {
      updateData.errorCount = config.errorCount + 1;
      updateData.lastError = error;
      updateData.healthStatus = 'error';
    }

    await strapi.entityService.update('api::smtp-config.smtp-config', configId, {
      data: updateData
    });
  }
}));
