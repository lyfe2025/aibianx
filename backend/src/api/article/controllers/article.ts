/**
 * article controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  // 重写查找方法，可以添加自定义逻辑
  async find(ctx) {
    // 调用默认服务
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // 自定义方法：增加浏览量
  async incrementView(ctx) {
    const { id } = ctx.params;

    try {
      // 查找文章
      const article = await strapi.entityService.findOne('api::article.article', id);
      if (!article) {
        return ctx.notFound('文章不存在');
      }

      // 使用原生SQL直接更新浏览量，完全避免触发时间戳更新
      const newViewCount = (article.viewCount || 0) + 1;
      await strapi.db.connection.raw(
        'UPDATE articles SET view_count = ? WHERE id = ?',
        [newViewCount, parseInt(id)]
      );

      // 返回更新后的浏览量数据
      return {
        data: {
          ...article,
          viewCount: newViewCount
        },
        message: '浏览量已更新'
      };
    } catch (error) {
      return ctx.badRequest('更新浏览量失败', { error: error.message });
    }
  }
})); 