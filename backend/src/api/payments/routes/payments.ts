/**
 * 支付API路由配置
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/payments/create',
      handler: 'payments.create',
      config: {
        auth: {}, // 需要用户认证
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/status/:paymentNo',
      handler: 'payments.getStatus',
      config: {
        auth: {},
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/payments/callback/:method',
      handler: 'payments.handleCallback',
      config: {
        auth: false, // 回调不需要认证，由签名验证
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/history',
      handler: 'payments.getHistory',
      config: {
        auth: {},
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/payments/cancel/:paymentNo',
      handler: 'payments.cancel',
      config: {
        auth: {},
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/payments/refund/:paymentNo',
      handler: 'payments.requestRefund',
      config: {
        auth: {},
        policies: [],
        middlewares: []
      }
    },
    
    // 支付宝专用回调路由
    {
      method: 'POST',
      path: '/payments/alipay/callback',
      handler: 'alipay-callback.callback',
      config: {
        auth: false, // 第三方回调无需认证
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/alipay/return',
      handler: 'alipay-callback.return',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/alipay/cancel',
      handler: 'alipay-callback.cancel',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },

    // 微信支付专用回调路由
    {
      method: 'POST',
      path: '/payments/wechat/callback',
      handler: 'wechat-callback.callback',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/payments/wechat/refund-callback',
      handler: 'wechat-callback.refundCallback',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/wechat/return',
      handler: 'wechat-callback.return',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/wechat/cancel',
      handler: 'wechat-callback.cancel',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },

    // Stripe专用回调路由
    {
      method: 'POST',
      path: '/payments/stripe/webhook',
      handler: 'stripe-callback.webhook',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/stripe/success',
      handler: 'stripe-callback.success',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/stripe/cancel',
      handler: 'stripe-callback.cancel',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/stripe/config',
      handler: 'stripe-callback.getConfig',
      config: {
        auth: false, // 公开配置，前端需要
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/payments/stripe/create-customer',
      handler: 'stripe-callback.createCustomer',
      config: {
        auth: {}, // 需要用户认证
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/payments/stripe/setup-intent',
      handler: 'stripe-callback.createSetupIntent',
      config: {
        auth: {},
        policies: [],
        middlewares: []
      }
    }
  ]
};