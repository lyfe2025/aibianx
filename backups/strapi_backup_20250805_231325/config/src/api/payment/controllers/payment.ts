/**
 * Payment controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({
  /**
   * 创建支付记录
   */
  async create(ctx) {
    const { data } = ctx.request.body;
    const { user } = ctx.state;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    // 生成支付流水号
    const paymentNo = `PAY${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    // 获取客户端信息
    const ipAddress = ctx.request.ip;
    const userAgent = ctx.request.header['user-agent'];
    
    const paymentData = {
      ...data,
      paymentNo,
      user: user.id,
      status: 'pending',
      ipAddress,
      userAgent
    };
    
    const result = await strapi.entityService.create('api::payment.payment', {
      data: paymentData,
      populate: ['order', 'user']
    });
    
    return result;
  },

  /**
   * 处理支付回调
   */
  async handleCallback(ctx) {
    const { paymentNo } = ctx.params;
    const callbackData = ctx.request.body;
    
    try {
      const payment = await strapi.entityService.findOne('api::payment.payment', null, {
        filters: { paymentNo },
        populate: ['order', 'user']
      });
      
      if (!payment) {
        return ctx.notFound('支付记录不存在');
      }
      
      // 验证回调签名（具体实现依赖于支付方式）
      const isValidCallback = await strapi.service('api::payment.payment').verifyCallback(
        payment.paymentMethod,
        callbackData
      );
      
      if (!isValidCallback) {
        return ctx.badRequest('回调验证失败');
      }
      
      // 处理支付结果
      const result = await strapi.service('api::payment.payment').processPaymentCallback(
        payment,
        callbackData
      );
      
      return result;
    } catch (error) {
      strapi.log.error('处理支付回调失败:', error);
      return ctx.internalServerError('处理支付回调失败');
    }
  },

  /**
   * 查询用户支付记录
   */
  async findUserPayments(ctx) {
    const { user } = ctx.state;
    const { pagination, filters, sort } = ctx.query;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const results = await strapi.entityService.findMany('api::payment.payment', {
      filters: {
        user: user.id,
        ...(filters && typeof filters === 'object' ? filters : {})
      },
      populate: ['order', 'user'],
      pagination,
      sort
    });
    
    return results;
  },

  /**
   * 发起退款
   */
  async requestRefund(ctx) {
    const { id } = ctx.params;
    const { reason, amount } = ctx.request.body;
    
    try {
      const payment = await strapi.entityService.findOne('api::payment.payment', id, {
        populate: ['order', 'user']
      });
      
      if (!payment) {
        return ctx.notFound('支付记录不存在');
      }
      
      if (payment.status !== 'success') {
        return ctx.badRequest('只能对成功的支付发起退款');
      }
      
      const refundResult = await strapi.service('api::payment.payment').processRefund(
        payment,
        amount || payment.amount,
        reason
      );
      
      return refundResult;
    } catch (error) {
      strapi.log.error('发起退款失败:', error);
      return ctx.internalServerError('发起退款失败');
    }
  },

  /**
   * 获取支付统计
   */
  async getStats(ctx) {
    const { user } = ctx.state;
    const { startDate, endDate } = ctx.query;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const stats = await strapi.service('api::payment.payment').getUserPaymentStats(
      user.id,
      startDate,
      endDate
    );
    
    return stats;
  },

  /**
   * 重新发起支付
   */
  async retryPayment(ctx) {
    const { id } = ctx.params;
    
    try {
      const payment = await strapi.entityService.findOne('api::payment.payment', id, {
        populate: ['order', 'user']
      });
      
      if (!payment) {
        return ctx.notFound('支付记录不存在');
      }
      
      if (payment.status !== 'failed') {
        return ctx.badRequest('只能重试失败的支付');
      }
      
      const retryResult = await strapi.service('api::payment.payment').retryPayment(payment);
      
      return retryResult;
    } catch (error) {
      strapi.log.error('重试支付失败:', error);
      return ctx.internalServerError('重试支付失败');
    }
  }
}));