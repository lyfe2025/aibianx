/**
 * 支付管理器核心服务
 * 统一管理所有支付提供商，提供标准化接口
 */

import { Strapi } from '@strapi/strapi';

// 支付数据接口定义
export interface PaymentData {
  orderId: string;
  userId: string;
  paymentNo: string;
  amount: number; // 金额（分）
  currency: string;
  productName: string;
  productId?: string;
  clientIp?: string;
  userAgent?: string;
  returnUrl?: string;
  cancelUrl?: string;
  // 微信支付特有
  openid?: string;
  // 其他扩展数据
  metadata?: Record<string, any>;
}

// 支付结果接口
export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  message?: string;
  // 不同支付方式的特定数据
  paymentData?: {
    type: 'redirect' | 'jsapi' | 'stripe_elements' | 'qrcode';
    url?: string; // 跳转URL（支付宝）
    params?: any; // 支付参数（微信JSAPI）
    clientSecret?: string; // Stripe客户端密钥
    qrCode?: string; // 二维码数据
  };
  // 第三方响应原始数据
  rawResponse?: any;
}

// 支付状态接口
export interface PaymentStatus {
  paymentNo: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded';
  amount?: number;
  thirdPartyTransactionId?: string;
  message?: string;
  completedAt?: Date;
}

// 退款结果接口
export interface RefundResult {
  success: boolean;
  refundId?: string;
  refundAmount: number;
  message?: string;
  thirdPartyRefundId?: string;
}

// 支付提供商接口
export interface PaymentProvider {
  name: string;
  
  /**
   * 创建支付
   */
  createPayment(data: PaymentData): Promise<PaymentResult>;
  
  /**
   * 查询支付状态
   */
  queryPayment(paymentNo: string): Promise<PaymentStatus>;
  
  /**
   * 处理回调通知
   */
  handleCallback(data: any): Promise<void>;
  
  /**
   * 处理退款
   */
  processRefund(paymentNo: string, refundAmount: number, reason?: string): Promise<RefundResult>;
  
  /**
   * 验证回调签名
   */
  verifyCallback(data: any): boolean;
}

/**
 * 支付管理器主类
 */
export class PaymentManager {
  private providers = new Map<string, PaymentProvider>();
  private strapi: Strapi;

  constructor(strapi: Strapi) {
    strapi = strapi;
  }

  /**
   * 注册支付提供商
   */
  register(provider: PaymentProvider) {
    this.providers.set(provider.name, provider);
    strapi.log.info(`支付提供商 ${provider.name} 已注册`);
  }

  /**
   * 获取支付提供商
   */
  getProvider(name: string): PaymentProvider | undefined {
    return this.providers.get(name);
  }

  /**
   * 获取所有已注册的提供商
   */
  getRegisteredProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  /**
   * 创建支付订单
   */
  async createPayment(method: string, orderData: PaymentData): Promise<PaymentResult> {
    try {
      // 1. 验证支付方式是否可用
      const isEnabled = await strapi.service('api::payment-config.payment-config')
        .isPaymentMethodEnabled(method);
      
      if (!isEnabled) {
        return {
          success: false,
          message: `支付方式 ${method} 未启用或配置不完整`
        };
      }

      // 2. 获取支付提供商
      const provider = this.getProvider(method);
      if (!provider) {
        return {
          success: false,
          message: `不支持的支付方式: ${method}`
        };
      }

      // 3. 生成支付流水号
      const paymentNo = this.generatePaymentNo();
      const paymentData = {
        ...orderData,
        paymentNo
      };

      // 4. 在数据库中创建支付记录
      const payment = await strapi.entityService.create('api::payment.payment', {
        data: {
          paymentNo,
          order: orderData.orderId,
          user: orderData.userId,
          paymentMethod: method as any,
          amount: orderData.amount,
          currency: orderData.currency || 'CNY',
          status: 'pending',
          ipAddress: orderData.clientIp,
          userAgent: orderData.userAgent
        }
      });

      // 5. 调用支付提供商创建支付
      const result = await provider.createPayment(paymentData);

      // 6. 更新支付记录
      if (result.success) {
        await strapi.entityService.update('api::payment.payment', payment.id, {
          data: {
            thirdPartyOrderNo: result.paymentId,
            thirdPartyResponse: result.rawResponse
          }
        });

        // 记录支付日志
        strapi.log.info(`支付创建成功: ${paymentNo}, 方式: ${method}`);
      } else {
        await strapi.entityService.update('api::payment.payment', payment.id, {
          data: {
            status: 'failed',
            failReason: result.message
          }
        });

        strapi.log.error(`支付创建失败: ${paymentNo}, 原因: ${result.message}`);
      }

      return {
        ...result,
        paymentId: String(payment.id)
      };
    } catch (error) {
      strapi.log.error('创建支付时发生错误:', error);
      return {
        success: false,
        message: '创建支付失败，请稍后重试'
      };
    }
  }

  /**
   * 查询支付状态
   */
  async queryPaymentStatus(paymentNo: string): Promise<PaymentStatus> {
    try {
      // 1. 从数据库获取支付记录
      const payments = await strapi.entityService.findMany('api::payment.payment', {
        filters: { paymentNo }
      });

      if (!payments || payments.length === 0) {
        return {
          paymentNo,
          status: 'failed',
          message: '支付记录不存在'
        };
      }

      const payment = payments[0];

      // 2. 如果状态已经是终态，直接返回
      if (['success', 'failed', 'cancelled', 'refunded'].includes(payment.status)) {
        return {
          paymentNo,
          status: payment.status,
          amount: payment.amount,
          thirdPartyTransactionId: payment.thirdPartyTransactionId,
          completedAt: payment.completedAt ? new Date(payment.completedAt) : undefined
        };
      }

      // 3. 如果是pending状态，查询第三方支付状态
      const provider = this.getProvider(payment.paymentMethod);
      if (provider) {
        const thirdPartyStatus = await provider.queryPayment(paymentNo);
        
        // 4. 如果第三方状态有变化，更新数据库
        if (thirdPartyStatus.status !== payment.status) {
          await this.updatePaymentStatus(String(payment.id), thirdPartyStatus);
        }

        return thirdPartyStatus;
      }

      return {
        paymentNo,
        status: payment.status,
        amount: payment.amount
      };
    } catch (error) {
      strapi.log.error('查询支付状态错误:', error);
      return {
        paymentNo,
        status: 'failed',
        message: '查询支付状态失败'
      };
    }
  }

  /**
   * 处理支付回调
   */
  async handlePaymentCallback(method: string, callbackData: any): Promise<boolean> {
    try {
      const provider = this.getProvider(method);
      if (!provider) {
        strapi.log.error(`未找到支付提供商: ${method}`);
        return false;
      }

      // 1. 验证回调签名
      const isValid = provider.verifyCallback(callbackData);
      if (!isValid) {
        strapi.log.error(`支付回调签名验证失败: ${method}`);
        return false;
      }

      // 2. 处理回调
      await provider.handleCallback(callbackData);
      
      strapi.log.info(`支付回调处理成功: ${method}`);
      return true;
    } catch (error) {
      strapi.log.error('处理支付回调错误:', error);
      return false;
    }
  }

  /**
   * 处理退款
   */
  async processRefund(paymentNo: string, refundAmount: number, reason?: string): Promise<RefundResult> {
    try {
      // 1. 获取支付记录
      const payments = await strapi.entityService.findMany('api::payment.payment', {
        filters: { paymentNo },
        populate: ['order']
      });

      if (!payments || payments.length === 0) {
        return {
          success: false,
          refundAmount,
          message: '支付记录不存在'
        };
      }

      const payment = payments[0];

      // 2. 验证支付状态
      if (payment.status !== 'success') {
        return {
          success: false,
          refundAmount,
          message: '只有成功的支付才能退款'
        };
      }

      // 3. 验证退款金额
      if (refundAmount > payment.amount) {
        return {
          success: false,
          refundAmount,
          message: '退款金额不能超过支付金额'
        };
      }

      // 4. 调用支付提供商处理退款
      const provider = this.getProvider(payment.paymentMethod);
      if (!provider) {
        return {
          success: false,
          refundAmount,
          message: '支付提供商不存在'
        };
      }

      const refundResult = await provider.processRefund(paymentNo, refundAmount, reason);

      // 5. 创建退款记录
      if (refundResult.success) {
        await strapi.entityService.create('api::refund.refund', {
          data: {
            refundNo: this.generateRefundNo(),
            order: (payment as any).order.id,
            payment: payment.id,
            user: (payment as any).user,
            refundAmount,
            refundReason: reason || '用户申请退款',
            status: 'completed',
            processedAt: new Date()
          }
        });

        // 6. 更新支付状态
        await strapi.entityService.update('api::payment.payment', payment.id, {
          data: {
            status: 'refunded'
          }
        });
      }

      return refundResult;
    } catch (error) {
      strapi.log.error('处理退款错误:', error);
      return {
        success: false,
        refundAmount,
        message: '退款处理失败'
      };
    }
  }

  /**
   * 更新支付状态
   */
  private async updatePaymentStatus(paymentId: string, statusData: PaymentStatus) {
    const updateData: any = {
      status: statusData.status
    };

    if (statusData.thirdPartyTransactionId) {
      updateData.thirdPartyTransactionId = statusData.thirdPartyTransactionId;
    }

    if (statusData.completedAt) {
      updateData.completedAt = statusData.completedAt;
      updateData.notifiedAt = new Date();
    }

    await strapi.entityService.update('api::payment.payment', paymentId, {
      data: updateData
    });

    // 如果支付成功，触发订单处理
    if (statusData.status === 'success') {
      const payment = await strapi.entityService.findOne('api::payment.payment', paymentId, {
        populate: ['order']
      });
      
      if ((payment as any)?.order) {
        await strapi.service('api::order.order').handlePaymentSuccess((payment as any).order);
      }
    }
  }

  /**
   * 生成支付流水号
   */
  private generatePaymentNo(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `PAY${timestamp}${random}`;
  }

  /**
   * 生成退款流水号
   */
  private generateRefundNo(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `REF${timestamp}${random}`;
  }
}

export default PaymentManager;