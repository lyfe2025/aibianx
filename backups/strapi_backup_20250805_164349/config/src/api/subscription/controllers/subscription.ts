/**
 * Subscription controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::subscription.subscription', ({ strapi }) => ({
  /**
   * 获取用户当前订阅状态
   */
  async getCurrentSubscription(ctx) {
    const { user } = ctx.state;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const subscription = await strapi.entityService.findMany('api::subscription.subscription', {
      filters: {
        user: user.id,
        status: 'active'
      },
      populate: ['user', 'order'],
      limit: 1,
      sort: [{ createdAt: 'desc' }]
    });
    
    if (subscription.length === 0) {
      return { hasSubscription: false, subscription: null };
    }
    
    const currentSubscription = subscription[0];
    
    // 检查订阅是否过期
    if (currentSubscription.endDate && new Date(currentSubscription.endDate) < new Date()) {
      // 自动更新过期订阅状态
      await strapi.entityService.update('api::subscription.subscription', currentSubscription.id, {
        data: { status: 'expired' }
      });
      
      return { hasSubscription: false, subscription: currentSubscription };
    }
    
    return { hasSubscription: true, subscription: currentSubscription };
  },

  /**
   * 获取用户订阅历史
   */
  async getSubscriptionHistory(ctx) {
    const { user } = ctx.state;
    const { pagination, sort } = ctx.query;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const subscriptions = await strapi.entityService.findMany('api::subscription.subscription', {
      filters: {
        user: user.id
      },
      populate: ['user', 'order'],
      pagination,
      sort: sort || [{ createdAt: 'desc' }]
    });
    
    return subscriptions;
  },

  /**
   * 取消订阅
   */
  async cancelSubscription(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    const { reason } = ctx.request.body;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const subscription = await strapi.entityService.findOne('api::subscription.subscription', id, {
      populate: ['user']
    });
    
    if (!subscription) {
      return ctx.notFound('订阅记录不存在');
    }
    
    if ((subscription as any).user.id !== user.id) {
      return ctx.forbidden('无权限操作此订阅');
    }
    
    if (subscription.status !== 'active') {
      return ctx.badRequest('只能取消活跃的订阅');
    }
    
    const result = await strapi.entityService.update('api::subscription.subscription', id, {
      data: {
        status: 'cancelled',
        endDate: new Date(), // 立即结束
        autoRenew: false
      },
      populate: ['user', 'order']
    });
    
    // 发送取消通知
    await (this as any).sendCancellationNotification(result, reason);
    
    return result;
  },

  /**
   * 检查用户权限
   */
  async checkUserPermission(ctx) {
    const { user } = ctx.state;
    const { feature } = ctx.params;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const hasPermission = await strapi.service('api::subscription.subscription')
      .checkUserFeaturePermission(user.id, feature);
    
    return { hasPermission, feature };
  },

  /**
   * 获取订阅统计（管理员）
   */
  async getAdminStats(ctx) {
    const { user } = ctx.state;
    
    if (!user || !this.isAdmin(user)) {
      return ctx.forbidden('需要管理员权限');
    }
    
    const { startDate, endDate } = ctx.query;
    
    const stats = await strapi.service('api::subscription.subscription')
      .getSubscriptionStats(startDate, endDate);
    
    return stats;
  },

  /**
   * 更新订阅设置
   */
  async updateSettings(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    const { autoRenew } = ctx.request.body;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const subscription = await strapi.entityService.findOne('api::subscription.subscription', id, {
      populate: ['user']
    });
    
    if (!subscription) {
      return ctx.notFound('订阅记录不存在');
    }
    
    if ((subscription as any).user.id !== user.id) {
      return ctx.forbidden('无权限操作此订阅');
    }
    
    const result = await strapi.entityService.update('api::subscription.subscription', id, {
      data: { autoRenew },
      populate: ['user', 'order']
    });
    
    return result;
  },

  /**
   * 发送取消通知
   */
  async sendCancellationNotification(subscription, reason) {
    try {
      await strapi.plugins['email'].services.email.send({
        to: subscription.user.email,
        subject: '订阅取消确认',
        template: 'subscription-cancelled',
        data: {
          user: subscription.user,
          subscription,
          reason,
          planName: subscription.planName
        }
      });
    } catch (error) {
      strapi.log.error('发送取消通知邮件失败:', error);
    }
  },

  /**
   * 检查是否是管理员
   */
  isAdmin(user) {
    return user.role?.type === 'admin' || user.role?.name === 'Super Admin';
  }
}));