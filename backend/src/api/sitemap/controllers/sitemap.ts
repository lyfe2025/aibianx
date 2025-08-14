/**
 * AI变现之路 - 站点地图控制器
 * 功能：生成包含所有已发布内容的XML站点地图
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::sitemap.sitemap', ({ strapi }) => ({
  async generate(ctx) {
    try {
      // 设置响应头为XML格式
      ctx.set('Content-Type', 'application/xml');
      
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const currentDate = new Date().toISOString();
      
      // 获取所有已发布的文章
      const articles = await strapi.entityService.findMany('api::article.article', {
        filters: {
          publishedAt: {
            $notNull: true,
          },
        },
        fields: ['slug', 'updatedAt'],
        sort: { updatedAt: 'desc' },
      });
      
      // 获取所有分类
      const categories = await strapi.entityService.findMany('api::category.category', {
        fields: ['slug', 'updatedAt'],
        sort: { updatedAt: 'desc' },
      });
      
      // 获取所有标签
      const tags = await strapi.entityService.findMany('api::tag.tag', {
        fields: ['slug', 'updatedAt'],
        sort: { updatedAt: 'desc' },
      });
      
      // 生成XML站点地图
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
      
      // 添加首页
      xml += `
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;
      
      // 添加关于页面
      xml += `
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      
      // 添加文章页面
      articles.forEach((article) => {
        if (article.slug) {
          xml += `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        }
      });
      
      // 添加分类页面
      categories.forEach((category) => {
        if (category.slug) {
          xml += `
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${new Date(category.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
        }
      });
      
      // 添加标签页面
      tags.forEach((tag) => {
        if (tag.slug) {
          xml += `
  <url>
    <loc>${baseUrl}/tags/${tag.slug}</loc>
    <lastmod>${new Date(tag.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`;
        }
      });
      
      xml += `
</urlset>`;
      
      // 记录生成日志
      strapi.log.info(`站点地图已生成，包含 ${articles.length} 篇文章，${categories.length} 个分类，${tags.length} 个标签`);
      
      return xml;
    } catch (error) {
      strapi.log.error('站点地图生成失败:', error);
      ctx.throw(500, '站点地图生成失败');
    }
  },
}));
