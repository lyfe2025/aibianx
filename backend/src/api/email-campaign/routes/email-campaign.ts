export default {
  routes: [
    {
      method: 'GET',
      path: '/email-campaigns',
      handler: 'email-campaign.find',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取邮件营销活动列表 (仅管理员)',
        tags: ['Email-Campaign'],
      }
    },
    {
      method: 'GET',
      path: '/email-campaigns/:id',
      handler: 'email-campaign.findOne',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取邮件营销活动详情 (仅管理员)',
        tags: ['Email-Campaign'],
      }
    },
    {
      method: 'POST',
      path: '/email-campaigns',
      handler: 'email-campaign.create',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '创建邮件营销活动 (仅管理员)',
        tags: ['Email-Campaign'],
      }
    },
    {
      method: 'PUT',
      path: '/email-campaigns/:id',
      handler: 'email-campaign.update',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '更新邮件营销活动 (仅管理员)',
        tags: ['Email-Campaign'],
      }
    },
    {
      method: 'DELETE',
      path: '/email-campaigns/:id',
      handler: 'email-campaign.delete',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '删除邮件营销活动 (仅管理员)',
        tags: ['Email-Campaign'],
      }
    }
  ]
};