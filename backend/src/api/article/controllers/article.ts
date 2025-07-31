import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  // 重写查找方法，可以添加自定义逻辑
  async find(ctx) {
    // 调用默认服务
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // 🔧 临时调试：重写update方法
  async update(ctx) {
    const { id } = ctx.params;
    console.log('🔍 [DEBUG] Article update called for ID:', id);
    console.log('🔍 [DEBUG] Request body:', JSON.stringify(ctx.request.body, null, 2));
    
    // 调用默认的update方法
    const result = await super.update(ctx);
    
    console.log('🔍 [DEBUG] Update result:', JSON.stringify(result, null, 2));
    
    // 检查featuredImage是否在结果中
    if (result.data && result.data.featuredImage) {
      console.log('🖼️ [DEBUG] Featured image after update:', result.data.featuredImage);
    } else {
      console.log('⚠️ [DEBUG] No featured image in result');
    }
    
    return result;
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
