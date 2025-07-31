export default {
  routes: [
    // 标准CRUD路由
    {
      method: 'GET',
      path: '/smtp-configs',
      handler: 'smtp-config.find',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取SMTP配置列表 (仅管理员)',
        tags: ['SMTP-Config'],
      }
    },
    {
      method: 'GET',
      path: '/smtp-configs/:id',
      handler: 'smtp-config.findOne',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取SMTP配置详情 (仅管理员)',
        tags: ['SMTP-Config'],
      }
    },
    {
      method: 'POST',
      path: '/smtp-configs',
      handler: 'smtp-config.create',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '创建SMTP配置 (仅管理员)',
        tags: ['SMTP-Config'],
      }
    },
    {
      method: 'PUT',
      path: '/smtp-configs/:id',
      handler: 'smtp-config.update',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '更新SMTP配置 (仅管理员)',
        tags: ['SMTP-Config'],
      }
    },
    {
      method: 'DELETE',
      path: '/smtp-configs/:id',
      handler: 'smtp-config.delete',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '删除SMTP配置 (仅管理员)',
        tags: ['SMTP-Config'],
      }
    },

    // 自定义路由
    {
      method: 'GET',
      path: '/smtp-configs/available',
      handler: 'smtp-config.getAvailable',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '获取可用的SMTP配置 (仅管理员)',
        tags: ['SMTP-Config'],
      }
    },
    {
      method: 'POST',
      path: '/smtp-configs/:id/test',
      handler: 'smtp-config.testConnection',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '测试SMTP配置连接 (仅管理员)',
        tags: ['SMTP-Config'],
      }
    },
    {
      method: 'POST',
      path: '/smtp-configs/:id/health-check',
      handler: 'smtp-config.healthCheck',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: 'SMTP配置健康检查 (仅管理员)',
        tags: ['SMTP-Config'],
      }
    },
    {
      method: 'POST',
      path: '/smtp-configs/:id/reset-stats',
      handler: 'smtp-config.resetStats',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
        description: '重置SMTP配置统计 (仅管理员)',
        tags: ['SMTP-Config'],
      }
    }
  ]
};