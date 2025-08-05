/**
 * Payment router
 */

export default {
  routes: [
    // 基础CRUD路由
    {
      method: 'GET',
      path: '/payments',
      handler: 'payment.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/payments/:id',
      handler: 'payment.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/payments',
      handler: 'payment.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/payments/:id',
      handler: 'payment.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/payments/:id',
      handler: 'payment.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // 自定义路由
    {
      method: 'POST',
      path: '/payments/:paymentNo/callback',
      handler: 'payment.handleCallback',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // 支付回调不需要认证
      },
    },
    {
      method: 'GET',
      path: '/payments/user/me',
      handler: 'payment.findUserPayments',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/payments/:id/refund',
      handler: 'payment.requestRefund',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/payments/:id/retry',
      handler: 'payment.retryPayment',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/payments/stats/user',
      handler: 'payment.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};