/**
 * Payment Config router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/payment-config',
      handler: 'payment-config.find',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'PUT', 
      path: '/payment-config',
      handler: 'payment-config.update',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/payment-config/available-methods',
      handler: 'payment-config.getAvailableMethods',
      config: {
        auth: false, // 公开API，前端无需认证即可获取
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/payment-config/test/:method',
      handler: 'payment-config.testConfiguration',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
};