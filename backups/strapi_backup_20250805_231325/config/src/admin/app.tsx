import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['zh-Hans'],
    translations: {
      'zh-Hans': {
        // 文章字段中文翻译
        'content-manager.containers.Edit.pluginHeader.title.new': '创建文章',
        'content-manager.containers.Edit.pluginHeader.title.edit': '编辑文章',
        
        // 自定义字段标签
        'form.attribute.item.customField.featured': '是否置顶推荐',
        'form.attribute.item.customField.isPremium': '是否会员专享',
        
        // 字段描述
        'form.attribute.item.description.featured': '用于首页精选推荐，置顶显示',
        'form.attribute.item.description.isPremium': '需要会员权限才能查看完整内容',
      },
    },
    
    // 自定义字段标签映射
    theme: {
      light: {},
      dark: {},
    },
  },
  
  // 自定义组件
  bootstrap(app: StrapiApp) {
    // 添加自定义字段标签
    app.customFields = {
      ...app.customFields,
      'boolean-featured': {
        name: 'featured',
        pluginId: 'custom-fields',
        type: 'boolean',
        intlLabel: {
          id: 'custom-fields.featured.label',
          defaultMessage: '是否置顶推荐',
        },
        intlDescription: {
          id: 'custom-fields.featured.description', 
          defaultMessage: '用于首页精选推荐，置顶显示',
        },
      },
      'boolean-isPremium': {
        name: 'isPremium',
        pluginId: 'custom-fields',
        type: 'boolean',
        intlLabel: {
          id: 'custom-fields.isPremium.label',
          defaultMessage: '是否会员专享',
        },
        intlDescription: {
          id: 'custom-fields.isPremium.description',
          defaultMessage: '需要会员权限才能查看完整内容',
        },
      },
    };
  },
} satisfies StrapiApp;