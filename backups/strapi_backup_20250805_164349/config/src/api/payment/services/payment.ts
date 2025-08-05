/**
 * Payment service
 */

import { factories } from '@strapi/strapi';
import crypto from 'crypto';

export default factories.createCoreService('api::payment.payment', ({ strapi }) => ({
  /**
   * 处理支付回调
   */
  async processPaymentCallback(payment, callbackData) {
    try {
      const { status, thirdPartyTransactionId, completedAt } = this.parseCallbackData(
        payment.paymentMethod,
        callbackData
      );
      
      // 更新支付记录
      const updatedPayment = await strapi.entityService.update('api::payment.payment', payment.id, {
        data: {
          status: status as 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded',
          thirdPartyTransactionId,
          thirdPartyResponse: callbackData,
          completedAt: completedAt || new Date(),
          notifiedAt: new Date()
        },
        populate: ['order', 'user']
      });
      
      // 如果支付成功，更新订单状态并触发后续逻辑
      if (status === 'success') {
        await this.handlePaymentSuccess(updatedPayment);
      }
      
      return updatedPayment;
    } catch (error) {
      strapi.log.error(`处理支付回调失败: ${error.message}`);
      throw error;
    }
  },

  /**
   * 处理支付成功
   */
  async handlePaymentSuccess(payment) {
    // 1. 更新订单状态
    await strapi.entityService.update('api::order.order', payment.order.id, {
      data: {
        status: 'paid',
        paidAt: new Date(),
        paymentMethod: payment.paymentMethod
      }
    });
    
    // 2. 调用订单服务处理支付成功逻辑
    await strapi.service('api::order.order').handlePaymentSuccess({
      ...payment.order,
      status: 'paid',
      paidAt: new Date(),
      paymentMethod: payment.paymentMethod
    });
  },

  /**
   * 验证支付回调签名
   */
  async verifyCallback(paymentMethod: string, callbackData: any): Promise<boolean> {
    switch (paymentMethod) {
      case 'alipay':
        return this.verifyAlipayCallback(callbackData);
      case 'wechat':
        return this.verifyWechatCallback(callbackData);
      case 'stripe':
        return this.verifyStripeCallback(callbackData);
      default:
        return false;
    }
  },

  /**
   * 解析回调数据
   */
  parseCallbackData(paymentMethod: string, callbackData: any) {
    switch (paymentMethod) {
      case 'alipay':
        return this.parseAlipayCallback(callbackData);
      case 'wechat':
        return this.parseWechatCallback(callbackData);
      case 'stripe':
        return this.parseStripeCallback(callbackData);
      default:
        return { status: 'failed', thirdPartyTransactionId: null, completedAt: null };
    }
  },

  /**
   * 处理退款
   */
  async processRefund(payment, refundAmount: number, reason: string) {
    try {
      // 调用第三方退款接口
      const refundResult = await this.callThirdPartyRefund(payment, refundAmount, reason);
      
      if (refundResult.success) {
        // 更新支付记录状态
        await strapi.entityService.update('api::payment.payment', payment.id, {
          data: {
            status: 'refunded'
          }
        });
        
        // 创建退款记录
        await strapi.entityService.create('api::refund.refund', {
          data: {
            order: payment.order.id,
            payment: payment.id,
            user: payment.user.id,
            refundNo: `REF${Date.now()}`,
            refundAmount,
            refundReason: reason,
            status: 'completed',
            processedAt: new Date()
          }
        });
        
        // 更新订单状态
        await strapi.entityService.update('api::order.order', payment.order.id, {
          data: {
            status: 'refunded'
          }
        });
      }
      
      return refundResult;
    } catch (error) {
      strapi.log.error(`处理退款失败: ${error.message}`);
      throw error;
    }
  },

  /**
   * 重试支付
   */
  async retryPayment(payment) {
    // 创建新的支付记录
    const newPaymentNo = `PAY${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    const newPayment = await strapi.entityService.create('api::payment.payment', {
      data: {
        order: payment.order.id,
        user: payment.user.id,
        paymentNo: newPaymentNo,
        paymentMethod: payment.paymentMethod,
        amount: payment.amount,
        currency: payment.currency,
        status: 'pending'
      },
      populate: ['order', 'user']
    });
    
    return newPayment;
  },

  /**
   * 获取用户支付统计
   */
  async getUserPaymentStats(userId: number, startDate?: string, endDate?: string) {
    const filters: any = { user: userId };
    
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = startDate;
      if (endDate) filters.createdAt.$lte = endDate;
    }
    
    const payments = await strapi.entityService.findMany('api::payment.payment', {
      filters
    });
    
    const stats = {
      totalPayments: payments.length,
      totalAmount: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
      successPayments: payments.filter(p => p.status === 'success').length,
      failedPayments: payments.filter(p => p.status === 'failed').length,
      refundedPayments: payments.filter(p => p.status === 'refunded').length,
      
      // 按支付方式统计
      paymentMethods: {
        alipay: payments.filter(p => p.paymentMethod === 'alipay').length,
        wechat: payments.filter(p => p.paymentMethod === 'wechat').length,
        stripe: payments.filter(p => p.paymentMethod === 'stripe').length,
        points: payments.filter(p => p.paymentMethod === 'points').length,
      }
    };
    
    return stats;
  },

  // === 第三方支付相关方法 ===

  /**
   * 验证支付宝回调
   */
  verifyAlipayCallback(callbackData: any): boolean {
    // 支付宝回调验证逻辑
    // 这里需要根据实际的支付宝SDK进行实现
    return true; // 简化实现
  },

  /**
   * 验证微信回调
   */
  verifyWechatCallback(callbackData: any): boolean {
    // 微信回调验证逻辑
    return true; // 简化实现
  },

  /**
   * 验证Stripe回调
   */
  verifyStripeCallback(callbackData: any): boolean {
    // Stripe回调验证逻辑
    return true; // 简化实现
  },

  /**
   * 解析支付宝回调
   */
  parseAlipayCallback(callbackData: any) {
    return {
      status: callbackData.trade_status === 'TRADE_SUCCESS' ? 'success' : 'failed',
      thirdPartyTransactionId: callbackData.trade_no,
      completedAt: callbackData.gmt_payment ? new Date(callbackData.gmt_payment) : new Date()
    };
  },

  /**
   * 解析微信回调
   */
  parseWechatCallback(callbackData: any) {
    return {
      status: callbackData.return_code === 'SUCCESS' && callbackData.result_code === 'SUCCESS' ? 'success' : 'failed',
      thirdPartyTransactionId: callbackData.transaction_id,
      completedAt: callbackData.time_end ? new Date(callbackData.time_end) : new Date()
    };
  },

  /**
   * 解析Stripe回调
   */
  parseStripeCallback(callbackData: any) {
    return {
      status: callbackData.type === 'payment_intent.succeeded' ? 'success' : 'failed',
      thirdPartyTransactionId: callbackData.data?.object?.id,
      completedAt: new Date()
    };
  },

  /**
   * 调用第三方退款接口
   */
  async callThirdPartyRefund(payment, refundAmount: number, reason: string) {
    // 这里根据不同的支付方式调用对应的退款接口
    // 简化实现，实际需要集成具体的支付SDK
    return {
      success: true,
      refundId: `REF_THIRD_${Date.now()}`,
      message: '退款成功'
    };
  }
}));