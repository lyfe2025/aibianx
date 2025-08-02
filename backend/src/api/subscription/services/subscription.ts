/**
 * Subscription service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::subscription.subscription', ({ strapi }) => ({
  /**
   * 检查用户特定功能权限
   */
  async checkUserFeaturePermission(userId: number, feature: string): Promise<boolean> {
    const subscription = await strapi.entityService.findMany('api::subscription.subscription', {
      filters: {
        user: userId,
        status: 'active'
      },
      limit: 1,
      sort: [{ createdAt: 'desc' }]
    });
    
    if (subscription.length === 0) {
      return false; // 没有活跃订阅
    }
    
    const currentSubscription = subscription[0];
    
    // 检查是否过期
    if (currentSubscription.endDate && new Date(currentSubscription.endDate) < new Date()) {
      // 自动更新过期状态
      await strapi.entityService.update('api::subscription.subscription', currentSubscription.id, {
        data: { status: 'expired' }
      });
      return false;
    }
    
    // 检查功能权限
    const features = currentSubscription.features || {};
    
    switch (feature) {
      case 'premiumContent':
        return features.premiumContent === true;
      case 'downloadLimit':
        return features.downloadLimit === -1 || (features.downloadLimit && features.downloadLimit > 0);
      case 'exclusiveContent':
        return features.exclusiveContent === true;
      case 'supportPriority':
        return ['high', 'premium'].includes(features.supportPriority);
      case 'earlyAccess':
        return features.earlyAccess === true;
      default:
        return false;
    }
  },

  /**
   * 获取订阅统计
   */
  async getSubscriptionStats(startDate?: string, endDate?: string) {
    const filters: any = {};
    
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = startDate;
      if (endDate) filters.createdAt.$lte = endDate;
    }
    
    const subscriptions = await strapi.entityService.findMany('api::subscription.subscription', {
      filters,
      populate: ['user', 'order']
    });
    
    const currentDate = new Date();
    
    const stats = {
      totalSubscriptions: subscriptions.length,
      activeSubscriptions: subscriptions.filter(s => 
        s.status === 'active' && 
        (!s.endDate || new Date(s.endDate) > currentDate)
      ).length,
      expiredSubscriptions: subscriptions.filter(s => 
        s.status === 'expired' || 
        (s.endDate && new Date(s.endDate) <= currentDate)
      ).length,
      cancelledSubscriptions: subscriptions.filter(s => s.status === 'cancelled').length,
      
      // 按计划类型统计
      planTypes: {
        monthly: subscriptions.filter(s => s.planType === 'monthly').length,
        yearly: subscriptions.filter(s => s.planType === 'yearly').length,
        lifetime: subscriptions.filter(s => s.planType === 'lifetime').length,
      },
      
      // 续费率
      renewalRate: this.calculateRenewalRate(subscriptions),
      
      // 平均订阅时长
      averageSubscriptionDuration: this.calculateAverageSubscriptionDuration(subscriptions),
      
      // 月度递归收入 (MRR)
      monthlyRecurringRevenue: await this.calculateMRR(),
      
      // 年度递归收入 (ARR)
      annualRecurringRevenue: await this.calculateARR(),
    };
    
    return stats;
  },

  /**
   * 计算续费率
   */
  calculateRenewalRate(subscriptions) {
    const expiredSubscriptions = subscriptions.filter(s => s.status === 'expired');
    if (expiredSubscriptions.length === 0) return 0;
    
    // 这里简化计算，实际需要根据实际业务逻辑
    const renewedCount = expiredSubscriptions.filter(s => {
      // 检查是否有后续的订阅
      return subscriptions.some(newSub => 
        newSub.user.id === s.user.id && 
        new Date(newSub.createdAt) > new Date(s.endDate || s.createdAt)
      );
    }).length;
    
    return ((renewedCount / expiredSubscriptions.length) * 100).toFixed(2);
  },

  /**
   * 计算平均订阅时长（天数）
   */
  calculateAverageSubscriptionDuration(subscriptions) {
    const completedSubscriptions = subscriptions.filter(s => 
      s.status === 'expired' || s.status === 'cancelled'
    );
    
    if (completedSubscriptions.length === 0) return 0;
    
    const totalDuration = completedSubscriptions.reduce((sum, sub) => {
      const startDate = new Date(sub.startDate);
      const endDate = new Date(sub.endDate || sub.createdAt);
      const duration = Math.max(0, (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      return sum + duration;
    }, 0);
    
    return Math.floor(totalDuration / completedSubscriptions.length);
  },

  /**
   * 计算月度递归收入 (MRR)
   */
  async calculateMRR() {
    const activeSubscriptions = await strapi.entityService.findMany('api::subscription.subscription', {
      filters: {
        status: 'active',
        planType: 'monthly'
      },
      populate: ['order']
    });
    
    // 获取月度订阅的平均收入
    let monthlyRevenue = 0;
    
    for (const subscription of activeSubscriptions) {
      if (subscription.order) {
        monthlyRevenue += subscription.order.finalPrice || 0;
      }
    }
    
    return monthlyRevenue;
  },

  /**
   * 计算年度递归收入 (ARR)
   */
  async calculateARR() {
    const mrr = await this.calculateMRR();
    
    const yearlySubscriptions = await strapi.entityService.findMany('api::subscription.subscription', {
      filters: {
        status: 'active',
        planType: 'yearly'
      },
      populate: ['order']
    });
    
    let yearlyRevenue = 0;
    for (const subscription of yearlySubscriptions) {
      if (subscription.order) {
        yearlyRevenue += subscription.order.finalPrice || 0;
      }
    }
    
    return (mrr * 12) + yearlyRevenue;
  },

  /**
   * 检查并更新过期订阅
   */
  async checkAndUpdateExpiredSubscriptions() {
    const currentDate = new Date();
    
    const expiredSubscriptions = await strapi.entityService.findMany('api::subscription.subscription', {
      filters: {
        status: 'active',
        endDate: {
          $lt: currentDate.toISOString()
        }
      }
    });
    
    const updatePromises = expiredSubscriptions.map(subscription =>
      strapi.entityService.update('api::subscription.subscription', subscription.id, {
        data: { status: 'expired' }
      })
    );
    
    await Promise.all(updatePromises);
    
    return expiredSubscriptions.length;
  },

  /**
   * 处理自动续费
   */
  async processAutoRenewals() {
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    const subscriptionsToRenew = await strapi.entityService.findMany('api::subscription.subscription', {
      filters: {
        status: 'active',
        autoRenew: true,
        endDate: {
          $lte: threeDaysFromNow.toISOString()
        }
      },
      populate: ['user', 'order']
    });
    
    const renewalResults = [];
    
    for (const subscription of subscriptionsToRenew) {
      try {
        const renewalResult = await this.renewSubscription(subscription);
        renewalResults.push(renewalResult);
      } catch (error) {
        strapi.log.error(`自动续费失败 - 订阅ID: ${subscription.id}`, error);
        renewalResults.push({ 
          subscriptionId: subscription.id, 
          success: false, 
          error: error.message 
        });
      }
    }
    
    return renewalResults;
  },

  /**
   * 续费订阅
   */
  async renewSubscription(subscription) {
    // 创建续费订单
    const renewalOrder = await strapi.entityService.create('api::order.order', {
      data: {
        orderNo: `ORD${Date.now()}R${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        user: subscription.user.id,
        orderType: 'membership',
        productName: `${subscription.planName} - 续费`,
        productType: `${subscription.planType}-member`,
        originalPrice: subscription.order.originalPrice,
        finalPrice: subscription.order.finalPrice,
        status: 'pending',
        expiredAt: new Date(Date.now() + 30 * 60 * 1000) // 30分钟过期
      }
    });
    
    // 创建续费支付记录
    const renewalPayment = await strapi.entityService.create('api::payment.payment', {
      data: {
        order: renewalOrder.id,
        user: subscription.user.id,
        paymentNo: `PAY${Date.now()}R${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        paymentMethod: subscription.order.paymentMethod || 'auto',
        amount: subscription.order.finalPrice,
        status: 'pending'
      }
    });
    
    return {
      subscriptionId: subscription.id,
      renewalOrderId: renewalOrder.id,
      renewalPaymentId: renewalPayment.id,
      success: true
    };
  },

  /**
   * 获取用户权限详情
   */
  async getUserPermissionDetails(userId: number) {
    const subscription = await strapi.entityService.findMany('api::subscription.subscription', {
      filters: {
        user: userId,
        status: 'active'
      },
      limit: 1,
      sort: [{ createdAt: 'desc' }]
    });
    
    if (subscription.length === 0) {
      return {
        hasSubscription: false,
        permissions: this.getFreeUserPermissions()
      };
    }
    
    const currentSubscription = subscription[0];
    const features = currentSubscription.features || {};
    
    return {
      hasSubscription: true,
      planType: currentSubscription.planType,
      planName: currentSubscription.planName,
      endDate: currentSubscription.endDate,
      permissions: {
        premiumContent: features.premiumContent === true,
        downloadLimit: features.downloadLimit || 0,
        exclusiveContent: features.exclusiveContent === true,
        supportPriority: features.supportPriority || 'standard',
        earlyAccess: features.earlyAccess === true
      }
    };
  },

  /**
   * 获取免费用户权限
   */
  getFreeUserPermissions() {
    return {
      premiumContent: false,
      downloadLimit: 5, // 免费用户每天5次下载
      exclusiveContent: false,
      supportPriority: 'low',
      earlyAccess: false
    };
  }
}));