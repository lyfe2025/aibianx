import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::email-subscription.email-subscription', ({ strapi }) => ({
  /**
   * 邮件订阅接口
   * POST /api/email-subscription/subscribe
   */
  async subscribe(ctx) {
    try {
      const { email, name, source = 'unknown', tags = [], preferences = {} } = ctx.request.body;

      // 验证邮箱格式
      if (!email) {
        return ctx.badRequest('邮箱地址不能为空');
      }

      // 检查是否已订阅
      const existingSubscription = await strapi.entityService.findMany('api::email-subscription.email-subscription', {
        filters: { email },
        limit: 1
      });

      if (existingSubscription.length > 0) {
        const existing = existingSubscription[0];
        
        if (existing.status === 'active') {
          return ctx.send({
            status: 'existing',
            message: '该邮箱已订阅',
            data: { email }
          });
        }

        // 如果之前取消订阅，重新激活
        if (existing.status === 'unsubscribed') {
          const updated = await strapi.entityService.update('api::email-subscription.email-subscription', existing.id, {
            data: {
              status: 'active',
              subscribeDate: new Date(),
              unsubscribeDate: null,
              preferences: Object.assign({}, existing.preferences || {}, preferences || {})
            }
          });

          return ctx.send({
            status: 'resubscribed',
            message: '重新订阅成功',
            data: updated
          });
        }
      }

      // 创建新订阅
      const subscription = await strapi.entityService.create('api::email-subscription.email-subscription', {
        data: {
          email,
          name,
          status: 'active',
          subscribeSource: source,
          subscribeDate: new Date(),
          preferences: preferences,
          metadata: {
            ip: ctx.request.ip,
            userAgent: ctx.request.header['user-agent'],
            referrer: ctx.request.header.referer
          },
          confirmed: true,
          confirmDate: new Date()
        }
      });

      strapi.log.info(`新用户订阅: ${email} (来源: ${source})`);

      return ctx.send({
        status: 'success',
        message: '订阅成功',
        data: subscription
      });

    } catch (error) {
      strapi.log.error('邮件订阅失败:', error);
      return ctx.internalServerError('订阅失败，请稍后重试');
    }
  },

  /**
   * 取消订阅接口
   * POST /api/email-subscription/unsubscribe
   */
  async unsubscribe(ctx) {
    try {
      const { email, token } = ctx.request.body;

      if (!email) {
        return ctx.badRequest('邮箱地址不能为空');
      }

      const subscription = await strapi.entityService.findMany('api::email-subscription.email-subscription', {
        filters: { email },
        limit: 1
      });

      if (subscription.length === 0) {
        return ctx.notFound('未找到该邮箱的订阅记录');
      }

      const sub = subscription[0];

      if (sub.status === 'unsubscribed') {
        return ctx.send({
          status: 'already_unsubscribed',
          message: '该邮箱已取消订阅'
        });
      }

      const updated = await strapi.entityService.update('api::email-subscription.email-subscription', sub.id, {
        data: {
          status: 'unsubscribed',
          unsubscribeDate: new Date()
        }
      });

      return ctx.send({
        status: 'success',
        message: '取消订阅成功',
        data: updated
      });

    } catch (error) {
      strapi.log.error('取消订阅失败:', error);
      return ctx.internalServerError('取消订阅失败，请稍后重试');
    }
  },

  /**
   * 获取订阅统计
   * GET /api/email-subscription/stats
   */
  async stats(ctx) {
    try {
      const totalSubscribers = await strapi.db.query('api::email-subscription.email-subscription').count({
        where: { status: 'active' }
      });

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todaySubscribers = await strapi.db.query('api::email-subscription.email-subscription').count({
        where: {
          status: 'active',
          subscribeDate: { $gte: today }
        }
      });

      return ctx.send({
        data: {
          totalSubscribers,
          todaySubscribers,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      strapi.log.error('获取订阅统计失败:', error);
      return ctx.internalServerError('获取统计数据失败');
    }
  }
}));