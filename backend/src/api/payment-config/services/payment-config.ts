/**
 * Payment Config service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::payment-config.payment-config', ({ strapi }) => ({
  /**
   * 获取支付配置
   */
  async getPaymentConfig() {
    const config = await strapi.entityService.findMany('api::payment-config.payment-config', {
      populate: ['general', 'alipay', 'wechatPay', 'stripe']
    });

    return config;
  },

  /**
   * 检查特定支付方式是否可用
   */
  async isPaymentMethodEnabled(method: string): Promise<boolean> {
    const config = await this.getPaymentConfig();
    
    if (!config) return false;

    switch (method) {
      case 'alipay':
        return (config as any).alipay?.enabled && (config as any).alipay?.configStatus === 'active';
      case 'wechat':
        return (config as any).wechatPay?.enabled && (config as any).wechatPay?.configStatus === 'active';
      case 'stripe':
        return (config as any).stripe?.enabled && (config as any).stripe?.configStatus === 'active';
      default:
        return false;
    }
  },

  /**
   * 获取特定支付方式的配置
   */
  async getPaymentMethodConfig(method: string) {
    const config = await this.getPaymentConfig();
    
    if (!config) return null;

    switch (method) {
      case 'alipay':
        return (config as any).alipay;
      case 'wechat':
        return (config as any).wechatPay;
      case 'stripe':
        return (config as any).stripe;
      default:
        return null;
    }
  },

  /**
   * 测试支付方式配置
   */
  async testPaymentMethod(method: string) {
    const config = await this.getPaymentMethodConfig(method);
    
    if (!config || !config.enabled) {
      return {
        success: false,
        message: `${method}支付未启用`,
        details: null
      };
    }

    try {
      switch (method) {
        case 'alipay':
          return await this.testAlipayConfig(config);
        case 'wechat':
          return await this.testWechatConfig(config);
        case 'stripe':
          return await this.testStripeConfig(config);
        default:
          return {
            success: false,
            message: '不支持的支付方式',
            details: null
          };
      }
    } catch (error) {
      strapi.log.error(`测试${method}配置时出错:`, error);
      return {
        success: false,
        message: '测试配置时发生错误',
        details: error.message
      };
    }
  },

  /**
   * 测试支付宝配置
   */
  async testAlipayConfig(config: any) {
    // 检查必要配置项
    if (!config.appId || !config.privateKey || !config.alipayPublicKey) {
      return {
        success: false,
        message: '支付宝配置不完整，缺少必要参数',
        details: {
          missingFields: [
            !config.appId && 'appId',
            !config.privateKey && 'privateKey', 
            !config.alipayPublicKey && 'alipayPublicKey'
          ].filter(Boolean)
        }
      };
    }

    try {
      // 这里可以实际调用支付宝API进行测试
      // 例如调用 alipay.system.oauth.token 接口
      // 现在先返回配置检查结果
      
      return {
        success: true,
        message: '支付宝配置测试通过',
        details: {
          appId: config.appId,
          gateway: config.gateway,
          signType: config.signType,
          supportedMethods: config.supportedMethods
        }
      };
    } catch (error) {
      return {
        success: false,
        message: '支付宝API连接测试失败',
        details: error.message
      };
    }
  },

  /**
   * 测试微信支付配置
   */
  async testWechatConfig(config: any) {
    // 检查必要配置项
    const requiredFields = ['appId', 'mchId'];
    if (config.apiVersion === 'v3') {
      requiredFields.push('privateKey', 'certificate');
    } else {
      requiredFields.push('apiKey');
    }

    const missingFields = requiredFields.filter(field => !config[field]);
    
    if (missingFields.length > 0) {
      return {
        success: false,
        message: '微信支付配置不完整，缺少必要参数',
        details: { missingFields }
      };
    }

    try {
      // 这里可以实际调用微信支付API进行测试
      // 例如调用获取商户信息接口
      
      return {
        success: true,
        message: '微信支付配置测试通过',
        details: {
          appId: config.appId,
          mchId: config.mchId,
          apiVersion: config.apiVersion,
          supportedMethods: config.supportedMethods
        }
      };
    } catch (error) {
      return {
        success: false,
        message: '微信支付API连接测试失败',
        details: error.message
      };
    }
  },

  /**
   * 测试Stripe配置
   */
  async testStripeConfig(config: any) {
    // 检查必要配置项
    if (!config.publishableKey || !config.secretKey) {
      return {
        success: false,
        message: 'Stripe配置不完整，缺少必要参数',
        details: {
          missingFields: [
            !config.publishableKey && 'publishableKey',
            !config.secretKey && 'secretKey'
          ].filter(Boolean)
        }
      };
    }

    try {
      // 这里可以实际调用Stripe API进行测试
      // 例如获取账户信息
      
      return {
        success: true,
        message: 'Stripe配置测试通过',
        details: {
          apiVersion: config.apiVersion,
          defaultCurrency: config.defaultCurrency,
          supportedCurrencies: config.supportedCurrencies,
          supportedMethods: config.supportedMethods
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Stripe API连接测试失败',
        details: error.message
      };
    }
  },

  /**
   * 初始化默认支付配置
   */
  async initializeDefaultConfig() {
    const existingConfig = await this.getPaymentConfig();
    
    if (existingConfig) {
      return existingConfig;
    }

    const defaultConfig = {
      environment: 'sandbox',
      callbackBaseUrl: process.env.BACKEND_URL || 'http://localhost:1337',
      frontendBaseUrl: process.env.FRONTEND_URL || 'http://localhost',
      general: {
        siteName: 'AI变现之路',
        paymentTimeout: 30,
        enablePaymentLogs: true,
        enableAutoRefund: false,
        minPaymentAmount: 1,
        maxPaymentAmount: 100000
      },
      alipay: {
        enabled: false,
        configStatus: 'draft',
        gateway: 'https://openapi.alipaydev.com/gateway.do',
        signType: 'RSA2',
        charset: 'utf-8',
        supportedMethods: {
          web: true,
          wap: true,
          app: false,
          qrcode: true
        }
      },
      wechatPay: {
        enabled: false,
        configStatus: 'draft',
        apiVersion: 'v3',
        supportedMethods: {
          jsapi: true,
          h5: true,
          native: true,
          app: false,
          miniprogram: false
        }
      },
      stripe: {
        enabled: false,
        configStatus: 'draft',
        apiVersion: '2023-10-16',
        defaultCurrency: 'usd',
        supportedCurrencies: ['usd', 'eur', 'cny'],
        automaticPaymentMethods: true,
        supportedMethods: {
          card: true,
          alipay: true,
          wechat_pay: false,
          paypal: false
        }
      }
    };

    const config = await strapi.entityService.create('api::payment-config.payment-config', {
      data: defaultConfig as any,
      populate: ['general', 'alipay', 'wechatPay', 'stripe']
    });

    strapi.log.info('默认支付配置已初始化');
    
    return config;
  }
}));