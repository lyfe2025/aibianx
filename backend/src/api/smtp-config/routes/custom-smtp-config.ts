/**
 * custom smtp-config router for additional endpoints
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/smtp-configs/:id/test',
      handler: 'smtp-config.test',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/smtp-configs/:id/health-check',
      handler: 'smtp-config.healthCheck',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/smtp-configs/:id/reset-stats',
      handler: 'smtp-config.resetStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
