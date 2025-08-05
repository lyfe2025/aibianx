/**
 * 邮件订阅路由配置
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/email-subscription/subscribe',
      handler: 'email-subscription.subscribe',
      config: {
        auth: false, // 允许游客订阅
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST', 
      path: '/email-subscription/unsubscribe',
      handler: 'email-subscription.unsubscribe',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/email-subscription/stats',
      handler: 'email-subscription.getStats',
      config: {
        auth: false, // 公开访问统计
        policies: [],
        middlewares: []
      }
    }
  ]
};