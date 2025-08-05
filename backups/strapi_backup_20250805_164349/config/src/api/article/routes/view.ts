/**
 * Custom routes for article view tracking
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