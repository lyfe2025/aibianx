/**
 * 支付服务 - Strapi服务层
 * 提供给控制器调用的统一支付服务接口
 */

import { PaymentManager, PaymentData, PaymentResult, PaymentStatus } from './payment-manager';

// 将PaymentManager实例存储在Strapi实例上
declare module '@strapi/strapi' {
  interface Strapi {
    paymentManager?: PaymentManager;
  }
}

export default ({ strapi }) => ({
  /**
   * 获取支付管理器实例
   */
  getPaymentManager(): PaymentManager {
    if (!strapi.paymentManager) {
      strapi.paymentManager = new PaymentManager(strapi);
      // 初始化支付提供商
      this.initializeProviders();
    }
    return strapi.paymentManager;
  },

  /**
   * 初始化支付提供商
   */
  initializeProviders() {
    const manager = strapi.paymentManager;
    
    // 注册支付宝提供商 (稍后实现)
    // const alipayProvider = new AlipayProvider(strapi);
    // manager.register(alipayProvider);

    // 注册微信支付提供商 (稍后实现)
    // const wechatProvider = new WechatProvider(strapi);
    // manager.register(wechatProvider);

    // 注册Stripe提供商 (稍后实现)
    // const stripeProvider = new StripeProvider(strapi);
    // manager.register(stripeProvider);

    strapi.log.info('支付提供商初始化完成');
  },

  /**
   * 创建支付
   */
  async createPayment(method: string, orderData: PaymentData): Promise<PaymentResult> {
    const manager = this.getPaymentManager();
    return await manager.createPayment(method, orderData);
  },

  /**
   * 查询支付状态
   */
  async queryPaymentStatus(paymentNo: string): Promise<PaymentStatus> {
    const manager = this.getPaymentManager();
    return await manager.queryPaymentStatus(paymentNo);
  },

  /**
   * 处理支付回调
   */
  async handlePaymentCallback(method: string, callbackData: any): Promise<boolean> {
    const manager = this.getPaymentManager();
    return await manager.handlePaymentCallback(method, callbackData);
  },

  /**
   * 处理退款
   */
  async processRefund(paymentNo: string, refundAmount: number, reason?: string) {
    const manager = this.getPaymentManager();
    return await manager.processRefund(paymentNo, refundAmount, reason);
  },

  /**
   * 获取支持的支付方式
   */
  async getSupportedMethods(): Promise<string[]> {
    const manager = this.getPaymentManager();
    return manager.getRegisteredProviders();
  },

  /**
   * 验证支付数据
   */
  validatePaymentData(data: PaymentData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.orderId) {
      errors.push('订单ID不能为空');
    }

    if (!data.userId) {
      errors.push('用户ID不能为空');
    }

    if (!data.amount || data.amount <= 0) {
      errors.push('支付金额必须大于0');
    }

    if (!data.productName) {
      errors.push('商品名称不能为空');
    }

    if (!data.currency) {
      errors.push('货币类型不能为空');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * 格式化支付金额（元转分）
   */
  formatAmount(yuan: number): number {
    return Math.round(yuan * 100);
  },

  /**
   * 格式化支付金额（分转元）
   */
  formatAmountToYuan(fen: number): number {
    return fen / 100;
  },

  /**
   * 生成订单号
   */
  generateOrderNo(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD${timestamp}${random}`;
  },

  /**
   * 获取客户端IP
   */
  getClientIp(ctx: any): string {
    return ctx.request.ip || 
           ctx.request.header['x-forwarded-for'] || 
           ctx.request.header['x-real-ip'] || 
           ctx.request.connection?.remoteAddress || 
           '127.0.0.1';
  },

  /**
   * 获取用户代理
   */
  getUserAgent(ctx: any): string {
    return ctx.request.header['user-agent'] || '';
  }
});