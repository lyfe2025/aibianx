/**
 * 支付API服务层
 * 封装支付业务逻辑，供控制器调用
 */

import { PaymentData, PaymentResult, PaymentStatus } from '../../../services/payment-manager';

export default ({ strapi }) => ({
  /**
   * 创建支付
   */
  async createPayment(method: string, orderData: PaymentData): Promise<PaymentResult> {
    return await strapi.service('payment-service').createPayment(method, orderData);
  },

  /**
   * 查询支付状态
   */
  async queryPaymentStatus(paymentNo: string): Promise<PaymentStatus> {
    return await strapi.service('payment-service').queryPaymentStatus(paymentNo);
  },

  /**
   * 处理支付回调
   */
  async handlePaymentCallback(method: string, callbackData: any): Promise<boolean> {
    return await strapi.service('payment-service').handlePaymentCallback(method, callbackData);
  },

  /**
   * 处理退款
   */
  async processRefund(paymentNo: string, refundAmount: number, reason?: string) {
    return await strapi.service('payment-service').processRefund(paymentNo, refundAmount, reason);
  },

  /**
   * 验证支付数据
   */
  validatePaymentData(data: PaymentData): { valid: boolean; errors: string[] } {
    return strapi.service('payment-service').validatePaymentData(data);
  },

  /**
   * 获取客户端IP
   */
  getClientIp(ctx: any): string {
    return strapi.service('payment-service').getClientIp(ctx);
  },

  /**
   * 获取用户代理
   */
  getUserAgent(ctx: any): string {
    return strapi.service('payment-service').getUserAgent(ctx);
  },

  /**
   * 验证订单状态
   */
  async validateOrderForPayment(orderId: string, userId: string): Promise<{ valid: boolean; message?: string; order?: any }> {
    try {
      const order = await strapi.entityService.findOne('api::order.order', orderId, {
        populate: ['user', 'subscription']
      });

      if (!order) {
        return { valid: false, message: '订单不存在' };
      }

      if (order.user.id !== userId) {
        return { valid: false, message: '无权限访问此订单' };
      }

      if (order.status !== 'pending') {
        return { valid: false, message: '订单状态不允许支付' };
      }

      // 检查是否已有成功的支付记录
      const existingPayments = await strapi.entityService.findMany('api::payment.payment', {
        filters: {
          order: orderId,
          status: 'success'
        }
      });

      if (existingPayments && existingPayments.length > 0) {
        return { valid: false, message: '订单已支付' };
      }

      return { valid: true, order };
    } catch (error) {
      strapi.log.error('验证订单错误:', error);
      return { valid: false, message: '验证订单失败' };
    }
  },

  /**
   * 根据订单创建支付数据
   */
  async buildPaymentDataFromOrder(order: any, userId: string, paymentMethod: string): Promise<PaymentData> {
    const config = await strapi.service('api::payment-config.payment-config').getPaymentConfig();
    
    return {
      orderId: order.id,
      userId: userId,
      paymentNo: '', // 在PaymentManager中生成
      amount: order.totalAmount,
      currency: order.currency || 'CNY',
      productName: this.getProductNameByType(order.productType),
      productId: order.productType,
      metadata: {
        orderNo: order.orderNo,
        subscriptionId: order.subscription?.id
      }
    };
  },

  /**
   * 根据产品类型获取产品名称
   */
  getProductNameByType(productType: string): string {
    const productNames = {
      'premium_monthly': 'AI变现之路 - 高级会员月费',
      'premium_yearly': 'AI变现之路 - 高级会员年费',
      'vip_monthly': 'AI变现之路 - VIP会员月费',
      'vip_yearly': 'AI变现之路 - VIP会员年费',
      'consultation': 'AI变现之路 - 专业咨询服务',
      'course': 'AI变现之路 - 在线课程',
      'workshop': 'AI变现之路 - 专题工作坊'
    };

    return productNames[productType] || `AI变现之路 - ${productType}`;
  },

  /**
   * 格式化支付历史数据
   */
  formatPaymentHistory(payments: any[]): any[] {
    return payments.map(payment => ({
      id: payment.id,
      paymentNo: payment.paymentNo,
      amount: payment.amount / 100, // 转换为元
      status: payment.status,
      statusText: this.getPaymentStatusText(payment.status),
      paymentMethod: payment.paymentMethod,
      paymentMethodText: this.getPaymentMethodText(payment.paymentMethod),
      createdAt: payment.createdAt,
      completedAt: payment.completedAt,
      failReason: payment.failReason,
      order: payment.order ? {
        id: payment.order.id,
        orderNo: payment.order.orderNo,
        productType: payment.order.productType,
        productName: this.getProductNameByType(payment.order.productType)
      } : null
    }));
  },

  /**
   * 获取支付状态文本
   */
  getPaymentStatusText(status: string): string {
    const statusTexts = {
      'pending': '待支付',
      'success': '支付成功',
      'failed': '支付失败',
      'cancelled': '已取消',
      'refunded': '已退款'
    };

    return statusTexts[status] || status;
  },

  /**
   * 获取支付方式文本
   */
  getPaymentMethodText(method: string): string {
    const methodTexts = {
      'alipay': '支付宝',
      'wechat': '微信支付',
      'stripe': '信用卡支付'
    };

    return methodTexts[method] || method;
  },

  /**
   * 检查支付是否超时
   */
  async checkPaymentTimeout(): Promise<void> {
    try {
      const config = await strapi.service('api::payment-config.payment-config').getPaymentConfig();
      const timeoutMinutes = config?.general?.paymentTimeout || 30;
      
      const timeoutTime = new Date();
      timeoutTime.setMinutes(timeoutTime.getMinutes() - timeoutMinutes);

      // 查找超时的待支付订单
      const timeoutPayments = await strapi.entityService.findMany('api::payment.payment', {
        filters: {
          status: 'pending',
          createdAt: {
            $lt: timeoutTime.toISOString()
          }
        }
      });

      // 更新超时支付状态
      for (const payment of timeoutPayments) {
        await strapi.entityService.update('api::payment.payment', payment.id, {
          data: {
            status: 'failed',
            failReason: '支付超时'
          }
        });

        strapi.log.info(`支付超时自动取消: ${payment.paymentNo}`);
      }

      if (timeoutPayments.length > 0) {
        strapi.log.info(`处理了 ${timeoutPayments.length} 个超时支付`);
      }
    } catch (error) {
      strapi.log.error('检查支付超时错误:', error);
    }
  },

  /**
   * 获取支付统计数据
   */
  async getPaymentStats(userId?: string) {
    try {
      const filters: any = {};
      if (userId) {
        filters.user = userId;
      }

      const [totalPayments, successPayments, pendingPayments, failedPayments] = await Promise.all([
        strapi.entityService.count('api::payment.payment', { filters }),
        strapi.entityService.count('api::payment.payment', { filters: { ...filters, status: 'success' } }),
        strapi.entityService.count('api::payment.payment', { filters: { ...filters, status: 'pending' } }),
        strapi.entityService.count('api::payment.payment', { filters: { ...filters, status: 'failed' } })
      ]);

      // 计算总金额
      const payments = await strapi.entityService.findMany('api::payment.payment', {
        filters: { ...filters, status: 'success' },
        fields: ['amount']
      });

      const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

      return {
        totalPayments,
        successPayments,
        pendingPayments,
        failedPayments,
        totalAmount: totalAmount / 100, // 转换为元
        successRate: totalPayments > 0 ? (successPayments / totalPayments * 100).toFixed(2) : '0.00'
      };
    } catch (error) {
      strapi.log.error('获取支付统计错误:', error);
      return {
        totalPayments: 0,
        successPayments: 0,
        pendingPayments: 0,
        failedPayments: 0,
        totalAmount: 0,
        successRate: '0.00'
      };
    }
  }
});