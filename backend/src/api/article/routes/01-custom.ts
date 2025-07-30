/**
 * Custom article routes
 */

export default {
  routes: [
    {
      method: 'PUT',
      path: '/articles/:id/view',
      handler: 'article.incrementView',
      config: {
        auth: false,
        policies: [],
      },
    }
  ],
}; 