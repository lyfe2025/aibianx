export default {
  routes: [
    // 标准CRUD路由
    {
      method: 'GET',
      path: '/email-subscriptions',
      handler: 'email-subscription.find',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取邮件订阅列表 (仅管理员)',
        tags: ['Email-Subscription'],
      }
    },
    {
      method: 'GET',
      path: '/email-subscriptions/:id',
      handler: 'email-subscription.findOne',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取邮件订阅详情 (仅管理员)',
        tags: ['Email-Subscription'],
      }
    },
    {
      method: 'POST',
      path: '/email-subscriptions',
      handler: 'email-subscription.create',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '创建邮件订阅 (仅管理员)',
        tags: ['Email-Subscription'],
      }
    },
    {
      method: 'PUT',
      path: '/email-subscriptions/:id',
      handler: 'email-subscription.update',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '更新邮件订阅 (仅管理员)',
        tags: ['Email-Subscription'],
      }
    },
    {
      method: 'DELETE',
      path: '/email-subscriptions/:id',
      handler: 'email-subscription.delete',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '删除邮件订阅 (仅管理员)',
        tags: ['Email-Subscription'],
      }
    },

    // 自定义路由
    {
      method: 'POST',
      path: '/email-subscription/subscribe',
      handler: 'email-subscription.subscribe',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
        description: '用户邮件订阅接口 (公开API)',
        tags: ['Email-Subscription'],
      }
    },
    {
      method: 'POST',
      path: '/email-subscription/unsubscribe',
      handler: 'email-subscription.unsubscribe',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
        description: '用户取消订阅接口 (公开API)',
        tags: ['Email-Subscription'],
      }
    },
    {
      method: 'GET',
      path: '/email-subscription/stats',
      handler: 'email-subscription.stats',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取订阅统计 (仅管理员)',
        tags: ['Email-Subscription'],
      }
    }
  ]
};