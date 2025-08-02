/**
 * Order controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  /**
   * 创建订单
   */
  async create(ctx) {
    const { data } = ctx.request.body;
    const { user } = ctx.state;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    // 生成订单号
    const orderNo = `ORD${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    // 计算返佣信息
    const commissionInfo = await (this as any).calculateCommission(data);
    
    const orderData = {
      ...data,
      orderNo,
      user: user.id,
      status: 'pending',
      expiredAt: new Date(Date.now() + 30 * 60 * 1000), // 30分钟过期
      ...(commissionInfo as any)
    };
    
    const result = await strapi.entityService.create('api::order.order', {
      data: orderData as any,
      populate: ['user', 'inviterUser']
    });
    
    return result;
  },

  /**
   * 获取用户订单列表
   */
  async findUserOrders(ctx) {
    const { user } = ctx.state;
    const { pagination, filters, sort } = ctx.query;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const results = await strapi.entityService.findMany('api::order.order', {
      filters: {
        user: user.id,
        ...(filters && typeof filters === 'object' ? filters : {})
      },
      populate: ['user', 'inviterUser'],
      pagination,
      sort
    });
    
    return results;
  },

  /**
   * 取消订单
   */
  async cancel(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    const { reason } = ctx.request.body;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const order = await strapi.entityService.findOne('api::order.order', id, {
      populate: ['user']
    });
    
    if (!order) {
      return ctx.notFound('订单不存在');
    }
    
    if ((order as any).user.id !== user.id) {
      return ctx.forbidden('无权限操作此订单');
    }
    
    if (order.status !== 'pending') {
      return ctx.badRequest('只能取消待支付订单');
    }
    
    const result = await strapi.entityService.update('api::order.order', id, {
      data: {
        status: 'cancelled',
        cancelledAt: new Date(),
        customerNote: reason
      },
      populate: ['user', 'inviterUser']
    });
    
    return result;
  },

  /**
   * 获取订单详情
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const order = await strapi.entityService.findOne('api::order.order', id, {
      populate: ['user', 'inviterUser']
    });
    
    if (!order) {
      return ctx.notFound('订单不存在');
    }
    
    // 检查权限：只有订单所属用户或管理员可以查看
    if ((order as any).user.id !== user.id && !(this as any).isAdmin(user)) {
      return ctx.forbidden('无权限查看此订单');
    }
    
    return order;
  },

  /**
   * 获取订单统计
   */
  async getStats(ctx) {
    const { user } = ctx.state;
    const { startDate, endDate } = ctx.query;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const stats = await strapi.service('api::order.order').getUserOrderStats(
      user.id,
      startDate,
      endDate
    );
    
    return stats;
  },

  /**
   * 管理员获取所有订单统计（需要管理员权限）
   */
  async getAdminStats(ctx) {
    const { user } = ctx.state;
    
    if (!user || !(this as any).isAdmin(user)) {
      return ctx.forbidden('需要管理员权限');
    }
    
    const { startDate, endDate, groupBy } = ctx.query;
    
    const stats = await strapi.service('api::order.order').getAdminOrderStats(
      startDate,
      endDate,
      groupBy
    );
    
    return stats;
  },

  /**
   * 计算返佣信息
   */
  async calculateCommission(orderData) {
    const { inviterUser, originalPrice } = orderData;
    
    if (!inviterUser) {
      return {
        commissionRate: 0,
        commissionAmount: 0
      };
    }
    
    // 从系统配置获取返佣比例
    const systemConfig = await strapi.entityService.findMany('api::system-config.system-config', {
      limit: 1
    });
    
    const defaultCommissionRate = systemConfig[0]?.defaultCommissionRate || 0.15; // 默认15%
    
    const commissionAmount = Math.floor(originalPrice * defaultCommissionRate);
    
    return {
      commissionRate: defaultCommissionRate,
      commissionAmount
    };
  },

  /**
   * 检查是否是管理员
   */
  isAdmin(user) {
    return user.role?.type === 'admin' || user.role?.name === 'Super Admin';
  }
}));