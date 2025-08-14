/**
 * AI变现之路 - 自定义站点地图路由
 * 功能：生成XML格式的站点地图，提升SEO效果
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/sitemap.xml',
      handler: 'sitemap.generate',
      config: {
        auth: false, // 允许公开访问
      },
    },
  ],
};
