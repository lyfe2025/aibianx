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
        auth: true, // 需要用户认证
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payments/status/:paymentNo',
      handler: 'payments.getStatus',
      config: {
        auth: true,
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
        auth: true,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/payments/cancel/:paymentNo',
      handler: 'payments.cancel',
      config: {
        auth: true,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/payments/refund/:paymentNo',
      handler: 'payments.requestRefund',
      config: {
        auth: true,
        policies: [],
        middlewares: []
      }
    }
  ]
};