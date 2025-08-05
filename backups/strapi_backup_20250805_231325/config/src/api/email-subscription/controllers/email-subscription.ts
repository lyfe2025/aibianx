/**
 * 邮件订阅控制器
 * 专门处理邮件列表订阅，与BillionMail集成
 */

import { factories } from '@strapi/strapi';
import { BillionMailIntegrationService } from '../../../services/billionmail-integration';

export default factories.createCoreController('api::email-subscription.email-subscription', ({ strapi }) => ({
  /**
   * 邮件订阅接口
   * POST /api/email-subscription/subscribe
   */
  async subscribe(ctx) {
    const { email, source = 'api', tags = [] } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('邮箱地址不能为空');
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ctx.badRequest('邮箱格式不正确');
    }

    try {
      // 检查是否已存在订阅记录
      const existingSubscription = await strapi.entityService.findMany('api::email-subscription.email-subscription', {
        filters: { email }
      });

      if (existingSubscription.length > 0) {
        const subscription = existingSubscription[0];
        
        if (subscription.status === 'active') {
          return ctx.send({
            status: 'existing',
            message: '您已经订阅过了，感谢支持！',
            data: { email }
          });
        } else if (subscription.status === 'unsubscribed') {
          // 重新激活订阅
          await strapi.entityService.update('api::email-subscription.email-subscription', subscription.id, {
            data: {
              status: 'active',
              tags: [...new Set([...(Array.isArray(subscription.tags) ? subscription.tags : []), ...tags])],
              subscribedAt: new Date()
            }
          });
          
          return ctx.send({
            status: 'resubscribed',
            message: '欢迎回来！您已重新订阅我们的邮件列表',
            data: { email }
          });
        }
      }

      // 查找关联用户
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email }
      });

      // 调用BillionMail服务添加订阅者
      const billionmailResult = await BillionMailIntegrationService.billionMailClient.addSubscriber(
        email,
        user?.nickname || user?.username || email.split('@')[0],
        ['newsletter', ...tags]
      );

      // 创建邮件订阅记录
      const subscriptionData = {
        email,
        user: user?.id || null,
        source,
        tags,
        status: 'active' as const,
        subscribedAt: new Date(),
        billionmailSubscriberId: billionmailResult.success ? billionmailResult.id : null,
        billionmailListIds: [process.env.BILLIONMAIL_DEFAULT_LIST_ID || 'newsletter']
      };

      const subscription = await strapi.entityService.create('api::email-subscription.email-subscription', {
        data: subscriptionData
      });

      // 如果用户已注册，更新用户的邮件订阅状态
      if (user) {
        await strapi.entityService.update('plugin::users-permissions.user', user.id, {
          data: {
            billionmailSubscribed: true,
            billionmailSubscriberId: billionmailResult.success ? billionmailResult.id : null,
            billionmailListIds: subscriptionData.billionmailListIds
          }
        });
      }

      strapi.log.info(`新用户邮件订阅成功: ${email}, 来源: ${source}`);

      return ctx.send({
        status: 'success',
        message: '订阅成功！感谢加入AI变现之路社区，欢迎邮件已发送至您的邮箱',
        data: { 
          email,
          billionmailSuccess: billionmailResult.success 
        }
      });

    } catch (error) {
      strapi.log.error(`邮件订阅失败: ${error.message}`);
      return ctx.internalServerError('订阅失败，请稍后重试');
    }
  },

  /**
   * 取消邮件订阅接口
   * POST /api/email-subscription/unsubscribe
   */
  async unsubscribe(ctx) {
    const { email, token } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('邮箱地址不能为空');
    }

    try {
      const subscription = await strapi.query('api::email-subscription.email-subscription').findOne({
        where: { email }
      });

      if (!subscription) {
        return ctx.notFound('未找到订阅记录');
      }

      // 更新订阅状态
      await strapi.entityService.update('api::email-subscription.email-subscription', subscription.id, {
        data: {
          status: 'unsubscribed'
        }
      });

      // 同步更新用户表
      if (subscription.user) {
        await strapi.entityService.update('plugin::users-permissions.user', subscription.user, {
          data: {
            billionmailSubscribed: false
          }
        });
      }

      // 从BillionMail中取消订阅
      if (subscription.billionmailSubscriberId) {
        await BillionMailIntegrationService.billionMailClient.unsubscribeContact(
          subscription.billionmailSubscriberId
        );
      }

      return ctx.send({
        status: 'success',
        message: '已成功取消订阅'
      });

    } catch (error) {
      strapi.log.error(`取消订阅失败: ${error.message}`);
      return ctx.internalServerError('取消订阅失败，请稍后重试');
    }
  },

  /**
   * 获取订阅统计
   * GET /api/email-subscription/stats
   */
  async getStats(ctx) {
    try {
      const totalSubscriptions = await strapi.query('api::email-subscription.email-subscription').count();
      const activeSubscriptions = await strapi.query('api::email-subscription.email-subscription').count({
        where: { status: 'active' }
      });

      const stats = {
        total: totalSubscriptions,
        active: activeSubscriptions,
        unsubscribed: totalSubscriptions - activeSubscriptions
      };

      return ctx.send(stats);
    } catch (error) {
      strapi.log.error(`获取订阅统计失败: ${error.message}`);
      return ctx.internalServerError('获取统计失败');
    }
  }
}));