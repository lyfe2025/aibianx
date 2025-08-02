/**
 * Refund service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::refund.refund', ({ strapi }) => ({
  /**
   * 处理已批准的退款
   */
  async processApprovedRefund(refund) {
    try {
      // 获取相关的支付记录
      const payment = await strapi.entityService.findMany('api::payment.payment', {
        filters: {
          order: refund.order.id,
          status: 'success'
        },
        limit: 1
      });
      
      if (payment.length === 0) {
        throw new Error('找不到对应的成功支付记录');
      }
      
      const paymentRecord = payment[0];
      
      // 调用支付服务的退款方法
      const refundResult = await strapi.service('api::payment.payment').processRefund(
        paymentRecord,
        refund.refundAmount,
        refund.refundReason
      );
      
      if (refundResult.success) {
        // 更新订单状态
        await strapi.entityService.update('api::order.order', refund.order.id, {
          data: {
            status: 'refunded'
          }
        });
        
        // 如果是会员订阅，取消相关订阅
        if (refund.order.orderType === 'membership') {
          await this.cancelRelatedSubscription(refund.order.id);
        }
        
        // 处理返佣回收
        await this.handleCommissionRecovery(refund.order);
      }
      
      return refundResult;
    } catch (error) {
      strapi.log.error('处理已批准退款失败:', error);
      throw error;
    }
  },

  /**
   * 取消相关订阅
   */
  async cancelRelatedSubscription(orderId: number) {
    const subscriptions = await strapi.entityService.findMany('api::subscription.subscription', {
      filters: {
        order: orderId,
        status: 'active'
      }
    });
    
    const updatePromises = subscriptions.map(subscription =>
      strapi.entityService.update('api::subscription.subscription', subscription.id, {
        data: {
          status: 'cancelled',
          endDate: new Date()
        }
      })
    );
    
    await Promise.all(updatePromises);
  },

  /**
   * 处理返佣回收
   */
  async handleCommissionRecovery(order) {
    if (order.commissionAmount > 0 && order.inviterUser) {
      // 创建返佣回收记录
      await strapi.entityService.create('api::commission.commission', {
        data: {
          inviterUser: order.inviterUser.id,
          invitedUser: order.user.id,
          order: order.id,
          commissionAmount: -order.commissionAmount, // 负数表示回收
          commissionType: 'refund_recovery',
          status: 'completed',
          description: `订单 ${order.orderNo} 退款返佣回收`
        }
      });
    }
  },

  /**
   * 获取退款统计
   */
  async getRefundStats(startDate?: string, endDate?: string) {
    const filters: any = {};
    
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = startDate;
      if (endDate) filters.createdAt.$lte = endDate;
    }
    
    const refunds = await strapi.entityService.findMany('api::refund.refund', {
      filters,
      populate: ['order']
    });
    
    const stats = {
      totalRefunds: refunds.length,
      totalRefundAmount: refunds.reduce((sum, refund) => sum + (refund.refundAmount || 0), 0),
      pendingRefunds: refunds.filter(r => r.status === 'pending').length,
      approvedRefunds: refunds.filter(r => r.status === 'approved').length,
      completedRefunds: refunds.filter(r => r.status === 'completed').length,
      rejectedRefunds: refunds.filter(r => r.status === 'rejected').length,
      
      // 退款率
      refundRate: await this.calculateRefundRate(startDate, endDate),
      
      // 平均处理时间（小时）
      averageProcessingTime: this.calculateAverageProcessingTime(refunds),
      
      // 按原因分类统计
      refundReasons: this.groupRefundsByReason(refunds),
      
      // 按订单类型统计
      orderTypes: this.groupRefundsByOrderType(refunds)
    };
    
    return stats;
  },

  /**
   * 计算退款率
   */
  async calculateRefundRate(startDate?: string, endDate?: string) {
    const orderFilters: any = {};
    
    if (startDate || endDate) {
      orderFilters.createdAt = {};
      if (startDate) orderFilters.createdAt.$gte = startDate;
      if (endDate) orderFilters.createdAt.$lte = endDate;
    }
    
    const totalOrders = await strapi.entityService.findMany('api::order.order', {
      filters: {
        ...orderFilters,
        status: 'paid'
      }
    });
    
    const refundedOrders = await strapi.entityService.findMany('api::order.order', {
      filters: {
        ...orderFilters,
        status: 'refunded'
      }
    });
    
    if (totalOrders.length === 0) return 0;
    
    return ((refundedOrders.length / totalOrders.length) * 100).toFixed(2);
  },

  /**
   * 计算平均处理时间
   */
  calculateAverageProcessingTime(refunds) {
    const processedRefunds = refunds.filter(r => 
      r.processedAt && ['completed', 'rejected'].includes(r.status)
    );
    
    if (processedRefunds.length === 0) return 0;
    
    const totalTime = processedRefunds.reduce((sum, refund) => {
      const createdTime = new Date(refund.createdAt).getTime();
      const processedTime = new Date(refund.processedAt).getTime();
      return sum + (processedTime - createdTime);
    }, 0);
    
    // 转换为小时
    const averageTimeMs = totalTime / processedRefunds.length;
    return Math.floor(averageTimeMs / (1000 * 60 * 60));
  },

  /**
   * 按退款原因分组统计
   */
  groupRefundsByReason(refunds) {
    const reasonStats = {};
    
    refunds.forEach(refund => {
      const reason = refund.refundReason || '未知原因';
      reasonStats[reason] = (reasonStats[reason] || 0) + 1;
    });
    
    return reasonStats;
  },

  /**
   * 按订单类型分组统计
   */
  groupRefundsByOrderType(refunds) {
    const typeStats = {};
    
    refunds.forEach(refund => {
      if (refund.order) {
        const orderType = refund.order.orderType || 'unknown';
        typeStats[orderType] = (typeStats[orderType] || 0) + 1;
      }
    });
    
    return typeStats;
  },

  /**
   * 自动处理超期退款申请
   */
  async processOverdueRefunds() {
    // 获取超过7天未处理的退款申请
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const overdueRefunds = await strapi.entityService.findMany('api::refund.refund', {
      filters: {
        status: 'pending',
        createdAt: {
          $lt: sevenDaysAgo.toISOString()
        }
      },
      populate: ['user', 'order']
    });
    
    const results = [];
    
    for (const refund of overdueRefunds) {
      try {
        // 自动批准符合条件的退款申请
        if (this.shouldAutoApprove(refund)) {
          const updated = await strapi.entityService.update('api::refund.refund', refund.id, {
            data: {
              status: 'approved',
              processNote: '系统自动批准（超期处理）',
              processedAt: new Date()
            }
          });
          
          // 处理实际退款
          const refundResult = await this.processApprovedRefund(updated);
          
          if (refundResult.success) {
            await strapi.entityService.update('api::refund.refund', refund.id, {
              data: { status: 'completed' }
            });
          }
          
          results.push({ refundId: refund.id, action: 'auto_approved' });
        }
      } catch (error) {
        strapi.log.error(`自动处理退款失败 - ID: ${refund.id}`, error);
        results.push({ refundId: refund.id, action: 'failed', error: error.message });
      }
    }
    
    return results;
  },

  /**
   * 判断是否应该自动批准
   */
  shouldAutoApprove(refund) {
    // 简单的自动批准逻辑，实际可以根据业务需求调整
    return refund.refundAmount <= 10000; // 100元以下自动批准
  }
}));