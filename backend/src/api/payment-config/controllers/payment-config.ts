/**
 * Payment Config controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::payment-config.payment-config', ({ strapi }) => ({
  /**
   * 获取支付配置（管理员）
   */
  async find(ctx) {
    const { user } = ctx.state;
    
    if (!user || user.role?.type !== 'admin') {
      return ctx.forbidden('仅管理员可访问支付配置');
    }

    const config = await strapi.entityService.findMany('api::payment-config.payment-config', {
      populate: ['general', 'alipay', 'wechatPay', 'stripe', 'lastModifiedBy']
    });

    return config;
  },

  /**
   * 更新支付配置（管理员）
   */
  async update(ctx) {
    const { user } = ctx.state;
    const { data } = ctx.request.body;
    
    if (!user || user.role?.type !== 'admin') {
      return ctx.forbidden('仅管理员可修改支付配置');
    }

    // 自动设置回调URL
    const callbackBaseUrl = data.callbackBaseUrl || process.env.BACKEND_URL || 'http://localhost:1337';
    
    if (data.alipay) {
      data.alipay.notifyUrl = `${callbackBaseUrl}/api/payment/alipay/callback`;
    }
    
    if (data.wechatPay) {
      data.wechatPay.notifyUrl = `${callbackBaseUrl}/api/payment/wechat/callback`;
    }
    
    if (data.stripe) {
      data.stripe.webhookEndpoint = `${callbackBaseUrl}/api/payment/stripe/webhook`;
    }

    // 设置最后修改人
    data.lastModifiedBy = user.id;

    const config = await strapi.entityService.update('api::payment-config.payment-config', 1, {
      data,
      populate: ['general', 'alipay', 'wechatPay', 'stripe', 'lastModifiedBy']
    });

    strapi.log.info(`支付配置已更新，修改人：${user.username}`);
    
    return config;
  },

  /**
   * 获取可用的支付方式（前端公开API）
   */
  async getAvailableMethods(ctx) {
    try {
      const config = await strapi.entityService.findMany('api::payment-config.payment-config', {
        populate: ['general', 'alipay', 'wechatPay', 'stripe']
      });

      if (!config) {
        return ctx.notFound('支付配置未找到');
      }

      const availableMethods = [];

      // 检查支付宝
      if ((config as any).alipay?.enabled && (config as any).alipay?.configStatus === 'active') {
        availableMethods.push({
          id: 'alipay',
          name: '支付宝',
          icon: '/icons/alipay.svg',
          supportedMethods: (config as any).alipay.supportedMethods || {}
        });
      }

      // 检查微信支付
      if ((config as any).wechatPay?.enabled && (config as any).wechatPay?.configStatus === 'active') {
        availableMethods.push({
          id: 'wechat',
          name: '微信支付',
          icon: '/icons/wechat.svg',
          supportedMethods: (config as any).wechatPay.supportedMethods || {}
        });
      }

      // 检查Stripe
      if ((config as any).stripe?.enabled && (config as any).stripe?.configStatus === 'active') {
        availableMethods.push({
          id: 'stripe',
          name: '信用卡支付',
          icon: '/icons/stripe.svg',
          supportedMethods: (config as any).stripe.supportedMethods || {},
          supportedCurrencies: (config as any).stripe.supportedCurrencies || ['usd']
        });
      }

      return {
        success: true,
        data: {
          availableMethods,
          environment: config.environment,
          general: {
            siteName: (config as any).general?.siteName || 'AI变现之路',
            paymentTimeout: (config as any).general?.paymentTimeout || 30,
            minPaymentAmount: (config as any).general?.minPaymentAmount || 1,
            maxPaymentAmount: (config as any).general?.maxPaymentAmount || 100000
          }
        }
      };
    } catch (error) {
      strapi.log.error('获取可用支付方式失败:', error);
      return ctx.internalServerError('获取支付方式失败');
    }
  },

  /**
   * 测试支付配置连接
   */
  async testConfiguration(ctx) {
    const { user } = ctx.state;
    const { method } = ctx.params; // alipay, wechat, stripe
    
    if (!user || user.role?.type !== 'admin') {
      return ctx.forbidden('仅管理员可测试支付配置');
    }

    try {
      const testResult = await strapi.service('api::payment-config.payment-config').testPaymentMethod(method);
      
      return {
        success: testResult.success,
        message: testResult.message,
        details: testResult.details,
        testedAt: new Date()
      };
    } catch (error) {
      strapi.log.error(`测试${method}配置失败:`, error);
      return ctx.internalServerError('测试配置失败');
    }
  }
}));