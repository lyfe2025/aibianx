export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    console.log('🚀 开始配置SEO管理系统权限...');

    try {
      // 获取Public角色
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' }
      });

      if (!publicRole) {
        console.error('❌ 找不到Public角色');
        return;
      }

      console.log('✅ 找到Public角色:', publicRole.name);

      // 定义需要的权限
      const permissions = [
        // Site Config 权限
        { action: 'find', subject: 'api::site-config.site-config' },
        { action: 'findOne', subject: 'api::site-config.site-config' },

        // System Config 权限（系统配置管理）
        { action: 'find', subject: 'api::system-config.system-config' },
        { action: 'findOne', subject: 'api::system-config.system-config' },
        { action: 'getPublicConfig', subject: 'api::system-config.system-config' },

        // SEO Metrics 权限
        { action: 'find', subject: 'api::seo-metrics.seo-metrics' },
        { action: 'findOne', subject: 'api::seo-metrics.seo-metrics' },
        { action: 'create', subject: 'api::seo-metrics.seo-metrics' },

        // 确保现有API正常工作
        { action: 'find', subject: 'api::article.article' },
        { action: 'findOne', subject: 'api::article.article' },
        { action: 'find', subject: 'api::author.author' },
        { action: 'findOne', subject: 'api::author.author' },
        { action: 'find', subject: 'api::category.category' },
        { action: 'findOne', subject: 'api::category.category' },
        { action: 'find', subject: 'api::tag.tag' },
        { action: 'findOne', subject: 'api::tag.tag' }
      ];

      // 为每个权限创建或更新权限记录
      for (const perm of permissions) {
        try {
          // 检查权限是否已存在
          const existingPermission = await strapi.query('plugin::users-permissions.permission').findOne({
            where: {
              action: `${perm.subject}.${perm.action}`,
              role: publicRole.id
            }
          });

          if (!existingPermission) {
            // 创建新权限
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action: `${perm.subject}.${perm.action}`,
                subject: perm.subject,
                properties: {},
                conditions: [],
                role: publicRole.id
              }
            });
            console.log(`✅ 创建权限: ${perm.subject}.${perm.action}`);
          } else {
            console.log(`⏭️  权限已存在: ${perm.subject}.${perm.action}`);
          }
        } catch (error) {
          console.log(`⚠️  权限配置跳过: ${perm.subject}.${perm.action} - ${error.message}`);
        }
      }

      console.log('🎉 系统权限配置完成！');

      // 初始化系统配置
      console.log('⚙️  正在初始化系统配置...');
      try {
        // 使用系统配置服务初始化默认配置
        const systemConfigService = strapi.service('api::system-config.system-config');
        if (systemConfigService && systemConfigService.initializeDefaultConfig) {
          await systemConfigService.initializeDefaultConfig();
          console.log('✅ 系统配置初始化完成');
        }
      } catch (error) {
        console.log('⚠️  系统配置初始化失败:', error.message);
      }

      // 测试权限是否生效
      console.log('🧪 正在测试API端点...');

      setTimeout(async () => {
        try {
          // 简单测试 - 检查内容类型是否注册
          const contentTypes = Object.keys(strapi.contentTypes);
          const hasMetrics = contentTypes.some(type => type.includes('seo-metrics'));
          const hasSiteConfig = contentTypes.some(type => type.includes('site-config'));
          const hasSystemConfig = contentTypes.some(type => type.includes('system-config'));

          console.log('📋 已注册的内容类型:');
          console.log('  - SEO监控数据:', hasMetrics ? '✅' : '❌');
          console.log('  - 网站配置:', hasSiteConfig ? '✅' : '❌');
          console.log('  - 系统配置:', hasSystemConfig ? '✅' : '❌');

          if (hasMetrics && hasSiteConfig && hasSystemConfig) {
            console.log('🎊 完整管理系统就绪！');
            console.log('🌐 API端点现在可以正常访问:');
            console.log('  - http://localhost:1337/api/site-config');
            console.log('  - http://localhost:1337/api/seo-metrics');
            console.log('  - http://localhost:1337/api/system-config/public (前端可用)');
            console.log('  - http://localhost:1337/api/system-config (管理员)');
          }

        } catch (error) {
          console.log('⚠️  API测试出现错误:', error.message);
        }
      }, 2000);

    } catch (error) {
      console.error('❌ 权限配置失败:', error);
    }
  },
};