import { factories } from '@strapi/strapi';
import nodemailer from 'nodemailer';

export default factories.createCoreController('api::smtp-config.smtp-config', ({ strapi }) => ({
  /**
   * 测试SMTP配置
   * POST /api/smtp-configs/:id/test
   */
  async testConnection(ctx) {
    try {
      const { id } = ctx.params;
      const { testEmail } = ctx.request.body;

      const smtpConfig = await strapi.entityService.findOne('api::smtp-config.smtp-config', id);
      
      if (!smtpConfig) {
        return ctx.notFound('SMTP配置未找到');
      }

      // 创建邮件传输器
      const transporter = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        auth: {
          user: smtpConfig.username,
          pass: smtpConfig.password
        },
        connectionTimeout: smtpConfig.connectionTimeout || 30000
      });

      // 验证连接
      await transporter.verify();

      // 发送测试邮件
      if (testEmail) {
        const testMailOptions = {
          from: `${smtpConfig.fromName || 'AI变现之路'} <${smtpConfig.fromEmail}>`,
          to: testEmail,
          subject: `SMTP配置测试 - ${smtpConfig.name}`,
          html: `
            <h2>SMTP配置测试成功</h2>
            <p>恭喜！您的SMTP配置 <strong>${smtpConfig.name}</strong> 工作正常。</p>
            <hr>
            <p>配置信息：</p>
            <ul>
              <li>服务器：${smtpConfig.host}:${smtpConfig.port}</li>
              <li>发件人：${smtpConfig.fromEmail}</li>
              <li>安全连接：${smtpConfig.secure ? '是' : '否'}</li>
            </ul>
            <p>测试时间：${new Date().toLocaleString('zh-CN')}</p>
          `
        };

        await transporter.sendMail(testMailOptions);
      }

      // 更新健康状态
      await strapi.entityService.update('api::smtp-config.smtp-config', id, {
        data: {
          healthStatus: 'healthy',
          lastHealthCheck: new Date(),
          errorCount: 0,
          lastUsed: new Date()
        }
      });

      return ctx.send({
        success: true,
        message: testEmail ? '连接测试成功，测试邮件已发送' : '连接测试成功',
        data: {
          configName: smtpConfig.name,
          testEmail: testEmail || null,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      strapi.log.error('SMTP测试失败:', error);
      
      // 更新错误状态
      const { id } = ctx.params;
      if (id) {
        try {
          const smtpConfig = await strapi.entityService.findOne('api::smtp-config.smtp-config', id);
          if (smtpConfig) {
            await strapi.entityService.update('api::smtp-config.smtp-config', id, {
              data: {
                healthStatus: 'error',
                lastHealthCheck: new Date(),
                errorCount: (smtpConfig.errorCount || 0) + 1
              }
            });
          }
        } catch (updateError) {
          strapi.log.error('更新SMTP错误状态失败:', updateError);
        }
      }

      return ctx.badRequest({
        message: 'SMTP连接测试失败',
        error: error.message,
        details: error.code || '未知错误'
      });
    }
  },

  /**
   * 获取可用的SMTP配置
   * GET /api/smtp-configs/available
   */
  async getAvailable(ctx) {
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
          { priority: 'asc' },
          { errorCount: 'asc' },
          { lastUsed: 'asc' }
        ]
      });

      return ctx.send({
        data: availableConfigs.map(config => ({
          id: config.id,
          name: config.name,
          provider: config.provider,
          fromEmail: config.fromEmail,
          fromName: config.fromName,
          priority: config.priority,
          healthStatus: config.healthStatus,
          dailySent: config.dailySent,
          dailyLimit: config.dailyLimit,
          errorCount: config.errorCount,
          lastUsed: config.lastUsed
        }))
      });

    } catch (error) {
      strapi.log.error('获取可用SMTP配置失败:', error);
      return ctx.internalServerError('获取可用SMTP配置失败');
    }
  },

  /**
   * SMTP配置健康检查
   * POST /api/smtp-configs/:id/health-check
   */
  async healthCheck(ctx) {
    try {
      const { id } = ctx.params;
      
      const smtpConfig = await strapi.entityService.findOne('api::smtp-config.smtp-config', id);
      
      if (!smtpConfig) {
        return ctx.notFound('SMTP配置未找到');
      }

      // 创建邮件传输器
      const transporter = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        auth: {
          user: smtpConfig.username,
          pass: smtpConfig.password
        },
        connectionTimeout: smtpConfig.connectionTimeout || 30000
      });

      let healthStatus = 'healthy';
      let errorMessage = null;

      try {
        // 验证连接
        await transporter.verify();
        
        // 重置错误计数
        await strapi.entityService.update('api::smtp-config.smtp-config', id, {
          data: {
            healthStatus: 'healthy',
            lastHealthCheck: new Date(),
            errorCount: 0
          }
        });

      } catch (error) {
        healthStatus = 'error';
        errorMessage = error.message;

        // 增加错误计数
        const newErrorCount = (smtpConfig.errorCount || 0) + 1;
        const shouldDisable = newErrorCount >= (smtpConfig.maxErrorCount || 3);

        await strapi.entityService.update('api::smtp-config.smtp-config', id, {
          data: {
            healthStatus: shouldDisable ? 'error' : 'warning',
            lastHealthCheck: new Date(),
            errorCount: newErrorCount,
            isActive: shouldDisable ? false : smtpConfig.isActive
          }
        });
      }

      return ctx.send({
        data: {
          configId: id,
          configName: smtpConfig.name,
          healthStatus,
          errorMessage,
          lastHealthCheck: new Date().toISOString(),
          errorCount: smtpConfig.errorCount || 0,
          maxErrorCount: smtpConfig.maxErrorCount || 3
        }
      });

    } catch (error) {
      strapi.log.error('健康检查失败:', error);
      return ctx.internalServerError('健康检查失败');
    }
  },

  /**
   * 重置SMTP配置统计
   * POST /api/smtp-configs/:id/reset-stats
   */
  async resetStats(ctx) {
    try {
      const { id } = ctx.params;
      const { type = 'daily' } = ctx.request.body;

      const updateData: any = {
        lastHealthCheck: new Date()
      };

      if (type === 'daily') {
        updateData.dailySent = 0;
      } else if (type === 'monthly') {
        updateData.monthlySent = 0;
      } else if (type === 'all') {
        updateData.dailySent = 0;
        updateData.monthlySent = 0;
        updateData.errorCount = 0;
      }

      const updated = await strapi.entityService.update('api::smtp-config.smtp-config', id, {
        data: updateData
      });

      return ctx.send({
        message: `${type === 'daily' ? '每日' : type === 'monthly' ? '每月' : '全部'}统计已重置`,
        data: updated
      });

    } catch (error) {
      strapi.log.error('重置统计失败:', error);
      return ctx.internalServerError('重置统计失败');
    }
  }
}));