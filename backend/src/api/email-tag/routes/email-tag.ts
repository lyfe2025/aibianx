export default {
  routes: [
    {
      method: 'GET',
      path: '/email-tags',
      handler: 'email-tag.find',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取邮件标签列表 (仅管理员)',
        tags: ['Email-Tag'],
      }
    },
    {
      method: 'GET',
      path: '/email-tags/:id',
      handler: 'email-tag.findOne',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取邮件标签详情 (仅管理员)',
        tags: ['Email-Tag'],
      }
    },
    {
      method: 'POST',
      path: '/email-tags',
      handler: 'email-tag.create',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '创建邮件标签 (仅管理员)',
        tags: ['Email-Tag'],
      }
    },
    {
      method: 'PUT',
      path: '/email-tags/:id',
      handler: 'email-tag.update',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '更新邮件标签 (仅管理员)',
        tags: ['Email-Tag'],
      }
    },
    {
      method: 'DELETE',
      path: '/email-tags/:id',
      handler: 'email-tag.delete',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '删除邮件标签 (仅管理员)',
        tags: ['Email-Tag'],
      }
    }
  ]
};