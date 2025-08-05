/**
 * Stripe回调控制器
 * 专门处理Stripe的Webhook回调
 */

export default ({ strapi }) => ({
  /**
   * Stripe Webhook回调
   * POST /api/payments/stripe/webhook
   */
  async webhook(ctx) {
    try {
      const signature = ctx.request.headers['stripe-signature'];
      const payload = ctx.request.body;
      
      strapi.log.info('收到Stripe Webhook:', { 
        eventType: payload.type,
        hasSignature: !!signature
      });

      // 验证回调数据
      if (!payload.type || !payload.data) {
        strapi.log.error('Stripe Webhook数据不完整:', payload);
        ctx.status = 400;
        ctx.body = { error: 'Invalid payload' };
        return;
      }

      // 处理Webhook回调
      const success = await strapi.service('api::payments.payments').handlePaymentCallback('stripe', payload);

      if (success) {
        strapi.log.info(`Stripe Webhook处理成功: ${payload.type}`);
        ctx.status = 200;
        ctx.body = { received: true }; // Stripe要求返回received: true
      } else {
        strapi.log.error(`Stripe Webhook处理失败: ${payload.type}`);
        ctx.status = 400;
        ctx.body = { error: '处理失败' };
      }
    } catch (error) {
      strapi.log.error('Stripe Webhook处理异常:', error);
      ctx.status = 500;
      ctx.body = { error: '系统错误' };
    }
  },

  /**
   * Stripe支付成功跳转
   * GET /api/payments/stripe/success
   */
  async success(ctx) {
    try {
      const { payment_intent, payment_intent_client_secret } = ctx.query;
      
      strapi.log.info('收到Stripe支付成功跳转:', { 
        paymentIntent: payment_intent,
        hasClientSecret: !!payment_intent_client_secret
      });

      // 构建前端跳转URL
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      const redirectUrl = `${frontendUrl}/payment/success?paymentIntent=${payment_intent}`;

      // 重定向到前端成功页面
      ctx.redirect(redirectUrl);
    } catch (error) {
      strapi.log.error('Stripe支付成功跳转处理异常:', error);
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      ctx.redirect(`${frontendUrl}/payment/error`);
    }
  },

  /**
   * Stripe支付取消跳转
   * GET /api/payments/stripe/cancel
   */
  async cancel(ctx) {
    try {
      const { payment_intent } = ctx.query;
      
      strapi.log.info('用户取消Stripe支付:', { paymentIntent: payment_intent });

      // 构建前端取消页面URL
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      const redirectUrl = `${frontendUrl}/payment/cancel?paymentIntent=${payment_intent}`;

      // 重定向到前端取消页面
      ctx.redirect(redirectUrl);
    } catch (error) {
      strapi.log.error('Stripe支付取消跳转处理异常:', error);
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      ctx.redirect(`${frontendUrl}/payment/error`);
    }
  },

  /**
   * 获取Stripe公钥配置（前端使用）
   * GET /api/payments/stripe/config
   */
  async getConfig(ctx) {
    try {
      // 获取Stripe配置
      const config = await strapi.service('api::payment-config.payment-config')
        .getPaymentMethodConfig('stripe');

      if (!config || !config.enabled) {
        return ctx.notFound('Stripe支付未启用');
      }

      // 只返回公钥信息，不暴露私钥
      return {
        success: true,
        data: {
          publishableKey: config.publishableKey,
          supportedCurrencies: config.supportedCurrencies || ['usd'],
          supportedMethods: config.supportedMethods || { card: true }
        }
      };
    } catch (error) {
      strapi.log.error('获取Stripe配置失败:', error);
      return ctx.internalServerError('获取配置失败');
    }
  },

  /**
   * 创建客户（可选功能）
   * POST /api/payments/stripe/create-customer
   */
  async createCustomer(ctx) {
    try {
      const { user } = ctx.state;
      const { email, name } = ctx.request.body;

      if (!user) {
        return ctx.unauthorized('请先登录');
      }

      if (!email) {
        return ctx.badRequest('邮箱地址是必需的');
      }

      // 获取Stripe Provider
      const paymentManager = strapi.service('payment-service').getPaymentManager();
      const stripeProvider = paymentManager.getProvider('stripe');

      if (!stripeProvider) {
        return ctx.notFound('Stripe支付未配置');
      }

      // 创建Stripe客户
      const result = await stripeProvider.createCustomer(email, name);

      if (result.success) {
        // 可以选择将customer_id保存到用户记录中
        // await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        //   data: { stripeCustomerId: result.customer_id }
        // });

        return {
          success: true,
          data: {
            customerId: result.customer_id
          }
        };
      } else {
        return ctx.badRequest(result.message || '创建客户失败');
      }
    } catch (error) {
      strapi.log.error('创建Stripe客户失败:', error);
      return ctx.internalServerError('创建客户失败');
    }
  },

  /**
   * 创建SetupIntent（保存支付方式）
   * POST /api/payments/stripe/setup-intent
   */
  async createSetupIntent(ctx) {
    try {
      const { user } = ctx.state;
      const { customerId } = ctx.request.body;

      if (!user) {
        return ctx.unauthorized('请先登录');
      }

      // 获取Stripe Provider
      const paymentManager = strapi.service('payment-service').getPaymentManager();
      const stripeProvider = paymentManager.getProvider('stripe');

      if (!stripeProvider) {
        return ctx.notFound('Stripe支付未配置');
      }

      // 创建SetupIntent
      const result = await stripeProvider.createSetupIntent(customerId);

      if (result.success) {
        return {
          success: true,
          data: {
            clientSecret: result.client_secret,
            setupIntentId: result.setup_intent_id
          }
        };
      } else {
        return ctx.badRequest(result.message || '创建SetupIntent失败');
      }
    } catch (error) {
      strapi.log.error('创建SetupIntent失败:', error);
      return ctx.internalServerError('创建SetupIntent失败');
    }
  }
});