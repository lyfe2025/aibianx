import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::smtp-config.smtp-config', ({ strapi }) => ({
  /**
   * 获取最佳可用的SMTP配置
   * 根据优先级、错误次数、使用频率等选择最佳配置
   */
  async getBestAvailableConfig() {
    try {
      const availableConfigs = await strapi.db.query('api::smtp-config.smtp-config').findMany({
        where: {
          isActive: true,
          healthStatus: { $in: ['healthy', 'warning'] },
          $or: [
            { dailyLimit: 0 }, // 无限制
            { $where: 'daily_sent < daily_limit' } // 未达到每日限制
          ]
        },
        orderBy: [
          { priority: 'asc' },    // 优先级越低越优先
          { errorCount: 'asc' },  // 错误次数越少越优先
          { lastUsed: 'asc' }     // 最近未使用的优先（负载均衡）
        ],
        limit: 1
      });

      return availableConfigs.length > 0 ? availableConfigs[0] : null;
    } catch (error) {
      strapi.log.error('获取最佳SMTP配置失败:', error);
      return null;
    }
  },

  /**
   * 更新SMTP配置使用统计
   */
  async updateUsageStats(configId: number, success: boolean = true) {
    try {
      const config = await strapi.entityService.findOne('api::smtp-config.smtp-config', configId);
      if (!config) return;

      const updateData: any = {
        lastUsed: new Date(),
        dailySent: (config.dailySent || 0) + 1,
        monthlySent: (config.monthlySent || 0) + 1
      };

      if (success) {
        // 发送成功，重置错误计数
        updateData.errorCount = 0;
        updateData.healthStatus = 'healthy';
      } else {
        // 发送失败，增加错误计数
        const newErrorCount = (config.errorCount || 0) + 1;
        updateData.errorCount = newErrorCount;
        
        if (newErrorCount >= (config.maxErrorCount || 3)) {
          updateData.healthStatus = 'error';
          updateData.isActive = false; // 暂停使用
        } else {
          updateData.healthStatus = 'warning';
        }
      }

      await strapi.entityService.update('api::smtp-config.smtp-config', configId, {
        data: updateData
      });

      strapi.log.info(`SMTP配置统计已更新: ${config.name} (成功: ${success})`);
    } catch (error) {
      strapi.log.error('更新SMTP使用统计失败:', error);
    }
  },

  /**
   * 重置每日统计（定时任务使用）
   */
  async resetDailyStats() {
    try {
      await strapi.db.query('api::smtp-config.smtp-config').updateMany({
        data: { dailySent: 0 }
      });
      strapi.log.info('所有SMTP配置的每日统计已重置');
    } catch (error) {
      strapi.log.error('重置每日统计失败:', error);
    }
  },

  /**
   * 重置每月统计（定时任务使用）
   */
  async resetMonthlyStats() {
    try {
      await strapi.db.query('api::smtp-config.smtp-config').updateMany({
        data: { monthlySent: 0 }
      });
      strapi.log.info('所有SMTP配置的每月统计已重置');
    } catch (error) {
      strapi.log.error('重置每月统计失败:', error);
    }
  },

  /**
   * 执行所有SMTP配置的健康检查
   */
  async performHealthChecks() {
    try {
      const configs = await strapi.db.query('api::smtp-config.smtp-config').findMany({
        where: { isActive: true }
      });

      for (const config of configs) {
        // 检查是否需要健康检查
        const lastCheck = config.lastHealthCheck ? new Date(config.lastHealthCheck) : null;
        const now = new Date();
        const interval = (config.healthCheckInterval || 300) * 1000; // 转换为毫秒

        if (!lastCheck || (now.getTime() - lastCheck.getTime()) >= interval) {
          // 执行健康检查（直接调用健康检查逻辑）
          try {
            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
              host: config.host,
              port: config.port,
              secure: config.secure,
              auth: {
                user: config.username,
                pass: config.password
              },
              connectionTimeout: config.connectionTimeout || 30000
            });

            await transporter.verify();
            
            // 更新健康状态为正常
            await strapi.entityService.update('api::smtp-config.smtp-config', config.id, {
              data: {
                healthStatus: 'healthy',
                lastHealthCheck: new Date(),
                errorCount: 0
              }
            });
          } catch (error) {
            strapi.log.error(`SMTP配置 ${config.name} 健康检查失败:`, error);
            
            // 更新健康状态为错误
            const newErrorCount = (config.errorCount || 0) + 1;
            const shouldDisable = newErrorCount >= (config.maxErrorCount || 3);

            await strapi.entityService.update('api::smtp-config.smtp-config', config.id, {
              data: {
                healthStatus: shouldDisable ? 'error' : 'warning',
                lastHealthCheck: new Date(),
                errorCount: newErrorCount,
                isActive: shouldDisable ? false : config.isActive
              }
            });
          }
        }
      }
    } catch (error) {
      strapi.log.error('批量健康检查失败:', error);
    }
  }
}));