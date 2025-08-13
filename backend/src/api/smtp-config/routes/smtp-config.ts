/**
 * smtp-config router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::smtp-config.smtp-config', {
  config: {
    find: {
      middlewares: [],
      policies: []
    },
    findOne: {
      middlewares: [],
      policies: []
    },
    create: {
      middlewares: [],
      policies: []
    },
    update: {
      middlewares: [],
      policies: []
    },
    delete: {
      middlewares: [],
      policies: []
    }
  }
});
