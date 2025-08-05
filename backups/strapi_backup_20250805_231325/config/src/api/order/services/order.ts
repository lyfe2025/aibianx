/**
 * Order service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::order.order', ({ strapi }) => ({
  /**
   * 处理支付成功后的订单逻辑
   */
  async handlePaymentSuccess(order) {
    try {
      // 1. 如果是会员订单，创建或更新订阅记录
      if (order.orderType === 'membership') {
        await this.handleMembershipOrder(order);
      }
      
      // 2. 处理返佣逻辑
      if (order.inviterUser && order.commissionAmount > 0) {
        await this.handleCommission(order);
      }
      
      // 3. 发送订单完成通知
      await this.sendOrderCompletionNotification(order);
      
      return { success: true };
    } catch (error) {
      strapi.log.error('处理订单支付成功逻辑失败:', error);
      throw error;
    }
  },

  /**
   * 处理会员订单
   */
  async handleMembershipOrder(order) {
    const { user, productType, productId } = order;
    
    // 根据产品类型确定订阅信息
    const subscriptionData = this.getSubscriptionData(productType, productId);
    
    if (!subscriptionData) {
      throw new Error(`未知的会员产品类型: ${productType}`);
    }
    
    // 获取用户现有的活跃订阅
    const existingMemberships = await strapi.entityService.findMany('api::membership.membership', {
      filters: {
        user: user.id,
        status: 'active'
      }
    });
    
    // 如果有活跃订阅，先结束它们
    for (const membership of existingMemberships) {
      await strapi.entityService.update('api::membership.membership', membership.id, {
        data: {
          status: 'cancelled',
          endDate: new Date()
        }
      });
    }
    
    // 创建新的订阅记录
    const newMembership = await strapi.entityService.create('api::membership.membership', {
      data: {
        user: user.id,
        order: order.id,
        planType: subscriptionData.planType,
        planName: subscriptionData.planName,
        membershipLevel: subscriptionData.membershipLevel || 'premium',
        actualPrice: subscriptionData.actualPrice || 0,
        originalPrice: subscriptionData.originalPrice || 0,
        startDate: new Date(),
        endDate: subscriptionData.endDate,
        status: 'active' as const,
        features: subscriptionData.features as any
      }
    });
    
    return newMembership;
  },

  /**
   * 处理返佣逻辑
   */
  async handleCommission(order) {
    const { inviterUser, commissionAmount, orderNo } = order;
    
    // 创建返佣记录
    await strapi.entityService.create('api::commission.commission', {
      data: {
        inviterUser: inviterUser.id,
        invitedUser: order.user.id,
        order: order.id,
        commissionAmount,
        commissionType: 'order',
        status: 'pending',
        description: `订单 ${orderNo} 返佣`
      } as any
    });
    
    // 这里可以添加积分或余额增加逻辑
    // await this.addUserBalance(inviterUser.id, commissionAmount);
  },

  /**
   * 发送订单完成通知
   */
  async sendOrderCompletionNotification(order) {
    try {
      // 发送邮件通知
      await strapi.plugins['email'].services.email.send({
        to: order.user.email,
        subject: '订单支付成功通知',
        template: 'order-success',
        data: {
          user: order.user,
          order,
          productName: order.productName,
          amount: (order.finalPrice / 100).toFixed(2) // 转换为元
        }
      });
    } catch (error) {
      strapi.log.error('发送订单通知邮件失败:', error);
      // 不抛出错误，避免影响主流程
    }
  },

  /**
   * 获取订阅数据
   */
  getSubscriptionData(productType: string, productId: string) {
    const subscriptionPlans = {
      'monthly-member': {
        planType: 'monthly',
        planName: '月度会员',
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后
        features: {
          premiumContent: true,
          downloadLimit: 100,
          supportPriority: 'standard'
        }
      },
      'yearly-member': {
        planType: 'yearly',
        planName: '年度会员',
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 365天后
        features: {
          premiumContent: true,
          downloadLimit: 1000,
          supportPriority: 'high',
          exclusiveContent: true
        }
      },
      'lifetime-member': {
        planType: 'lifetime',
        planName: '终身会员',
        endDate: null, // 终身有效
        features: {
          premiumContent: true,
          downloadLimit: -1, // 无限制
          supportPriority: 'premium',
          exclusiveContent: true,
          earlyAccess: true
        }
      }
    };
    
    return subscriptionPlans[productType] || null;
  },

  /**
   * 获取用户订单统计
   */
  async getUserOrderStats(userId: number, startDate?: string, endDate?: string) {
    const filters: any = { user: userId };
    
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = startDate;
      if (endDate) filters.createdAt.$lte = endDate;
    }
    
    const orders = await strapi.entityService.findMany('api::order.order', {
      filters
    });
    
    const stats = {
      totalOrders: orders.length,
      totalAmount: orders.reduce((sum, order) => sum + (order.finalPrice || 0), 0),
      paidOrders: orders.filter(o => o.status === 'paid').length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
      refundedOrders: orders.filter(o => o.status === 'refunded').length,
      
      // 按订单类型统计
      orderTypes: {
        membership: orders.filter(o => o.orderType === 'membership').length,
        course: orders.filter(o => o.orderType === 'course').length,
        service: orders.filter(o => o.orderType === 'service').length,
      }
    };
    
    return stats;
  },

  /**
   * 获取管理员订单统计
   */
  async getAdminOrderStats(startDate?: string, endDate?: string, groupBy?: string) {
    const filters: any = {};
    
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = startDate;
      if (endDate) filters.createdAt.$lte = endDate;
    }
    
    const orders = await strapi.entityService.findMany('api::order.order', {
      filters,
      populate: ['user']
    });
    
    const payments = await strapi.entityService.findMany('api::payment.payment', {
      filters: {
        status: 'success',
        ...(startDate || endDate ? {
          completedAt: {
            ...(startDate ? { $gte: startDate } : {}),
            ...(endDate ? { $lte: endDate } : {})
          }
        } : {})
      }
    });
    
    const baseStats = {
      totalOrders: orders.length,
      totalRevenue: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
      paidOrders: orders.filter(o => o.status === 'paid').length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
      refundedOrders: orders.filter(o => o.status === 'refunded').length,
      
      // 平均订单价值
      averageOrderValue: orders.length > 0 
        ? Math.floor(payments.reduce((sum, payment) => sum + (payment.amount || 0), 0) / orders.length)
        : 0,
      
      // 转化率
      conversionRate: orders.length > 0 
        ? ((orders.filter(o => o.status === 'paid').length / orders.length) * 100).toFixed(2)
        : 0
    };
    
    // 根据groupBy参数添加分组统计
    if (groupBy === 'daily') {
      (baseStats as any).dailyStats = this.groupOrdersByDay(orders, payments);
    } else if (groupBy === 'monthly') {
      (baseStats as any).monthlyStats = this.groupOrdersByMonth(orders, payments);
    }
    
    return baseStats;
  },

  /**
   * 按天分组统计
   */
  groupOrdersByDay(orders, payments) {
    const dailyStats = {};
    
    orders.forEach(order => {
      const date = order.createdAt.split('T')[0]; // 获取日期部分
      if (!dailyStats[date]) {
        dailyStats[date] = { orders: 0, revenue: 0 };
      }
      dailyStats[date].orders++;
    });
    
    payments.forEach(payment => {
      const date = payment.completedAt.split('T')[0];
      if (!dailyStats[date]) {
        dailyStats[date] = { orders: 0, revenue: 0 };
      }
      dailyStats[date].revenue += payment.amount || 0;
    });
    
    return dailyStats;
  },

  /**
   * 按月分组统计
   */
  groupOrdersByMonth(orders, payments) {
    const monthlyStats = {};
    
    orders.forEach(order => {
      const month = order.createdAt.substring(0, 7); // YYYY-MM
      if (!monthlyStats[month]) {
        monthlyStats[month] = { orders: 0, revenue: 0 };
      }
      monthlyStats[month].orders++;
    });
    
    payments.forEach(payment => {
      const month = payment.completedAt.substring(0, 7);
      if (!monthlyStats[month]) {
        monthlyStats[month] = { orders: 0, revenue: 0 };
      }
      monthlyStats[month].revenue += payment.amount || 0;
    });
    
    return monthlyStats;
  }
}));