/**
 * 会员服务路由配置
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/membership',
      handler: 'membership.create',
      config: {
        auth: { scope: ['authenticated'] },
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'PUT',
      path: '/membership/:id',
      handler: 'membership.update',
      config: {
        auth: { scope: ['authenticated'] },
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/membership/renew',
      handler: 'membership.renew',
      config: {
        auth: { scope: ['authenticated'] },
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/membership/cancel',
      handler: 'membership.cancel',
      config: {
        auth: { scope: ['authenticated'] },
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/membership',
      handler: 'membership.find',
      config: {
        auth: { scope: ['authenticated'] },
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/membership/:id',
      handler: 'membership.findOne',
      config: {
        auth: { scope: ['authenticated'] },
        policies: [],
        middlewares: []
      }
    }
  ]
};