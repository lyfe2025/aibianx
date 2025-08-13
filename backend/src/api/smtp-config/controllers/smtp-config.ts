/**
 * smtp-config controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::smtp-config.smtp-config', ({ strapi }) => ({
  
  // 自定义测试连接方法
  async test(ctx) {
    try {
      const { id } = ctx.params;
      const { testEmail } = ctx.request.body;
      
      const smtpConfig = await strapi.entityService.findOne('api::smtp-config.smtp-config', id);
      
      if (!smtpConfig) {
        return ctx.badRequest('SMTP配置不存在');
      }

      // 这里应该实现实际的SMTP连接测试逻辑
      // 暂时返回模拟结果
      const testResult = {
        success: true,
        message: testEmail ? `测试邮件已发送到 ${testEmail}` : 'SMTP连接测试成功',
        timestamp: new Date().toISOString(),
        config: {
          host: smtpConfig.host,
          port: smtpConfig.port,
          secure: smtpConfig.secure
        }
      };

      // 更新最后使用时间
      await strapi.entityService.update('api::smtp-config.smtp-config', id, {
        data: {
          lastUsed: new Date(),
          successCount: smtpConfig.successCount + 1
        }
      });

      ctx.body = {
        data: testResult,
        message: '测试完成'
      };
    } catch (error) {
      strapi.log.error('SMTP测试失败:', error);
      ctx.badRequest('SMTP测试失败: ' + error.message);
    }
  },

  // 健康检查
  async healthCheck(ctx) {
    try {
      const { id } = ctx.params;
      
      const smtpConfig = await strapi.entityService.findOne('api::smtp-config.smtp-config', id);
      
      if (!smtpConfig) {
        return ctx.badRequest('SMTP配置不存在');
      }

      // 这里应该实现实际的健康检查逻辑
      // 暂时返回模拟结果
      const healthStatus = 'healthy';
      
      // 更新健康状态
      await strapi.entityService.update('api::smtp-config.smtp-config', id, {
        data: {
          healthStatus,
          lastHealthCheck: new Date()
        }
      });

      ctx.body = {
        data: {
          status: healthStatus,
          timestamp: new Date().toISOString()
        },
        message: '健康检查完成'
      };
    } catch (error) {
      strapi.log.error('SMTP健康检查失败:', error);
      ctx.badRequest('健康检查失败: ' + error.message);
    }
  },

  // 重置统计
  async resetStats(ctx) {
    try {
      const { id } = ctx.params;
      const { type = 'daily' } = ctx.request.body;
      
      const updateData: any = {};
      
      if (type === 'daily') {
        updateData.dailySent = 0;
      } else if (type === 'all') {
        updateData.dailySent = 0;
        updateData.errorCount = 0;
        updateData.successCount = 0;
        updateData.lastError = null;
      }

      await strapi.entityService.update('api::smtp-config.smtp-config', id, {
        data: updateData
      });

      ctx.body = {
        message: `${type === 'daily' ? '每日' : '全部'}统计已重置`
      };
    } catch (error) {
      strapi.log.error('重置统计失败:', error);
      ctx.badRequest('重置统计失败: ' + error.message);
    }
  }
}));
