/**
 * 邮件订阅字段描述自动化配置脚本
 * 确保Admin界面显示中文字段描述
 */

const contentType = 'email-subscription';

const fieldDescriptions = {
  email: '订阅邮箱地址',
  user: '关联用户（可选）',
  source: '订阅来源页面',
  tags: '订阅标签列表',
  emailSubscriberId: '邮件订阅者ID',
  emailListIds: '邮件列表ID集合',
  status: '订阅状态',
  preferences: '邮件偏好设置',
  subscribedAt: '首次订阅时间',
  lastEmailSent: '最后发送邮件时间'
};

async function configureEmailSubscriptionFields() {
  console.log('🔧 开始配置邮件订阅字段描述...');
  
  try {
    // 1. 构建配置对象
    const configuration = {
      uid: `api::${contentType}.${contentType}`,
      layouts: {
        list: ['id', 'email', 'user', 'source', 'status', 'subscribedAt'],
        edit: [
          [{ name: 'email', size: 6 }, { name: 'user', size: 6 }],
          [{ name: 'source', size: 6 }, { name: 'status', size: 6 }],
          [{ name: 'tags', size: 12 }],
          [{ name: 'emailSubscriberId', size: 6 }, { name: 'emailListIds', size: 6 }],
          [{ name: 'preferences', size: 6 }, { name: 'subscribedAt', size: 6 }],
          [{ name: 'lastEmailSent', size: 6 }]
        ]
      },
      metadatas: {}
    };

    // 2. 为每个字段添加中文描述
    Object.entries(fieldDescriptions).forEach(([fieldName, description]) => {
      configuration.metadatas[fieldName] = {
        edit: {
          label: description,
          description: description,
          placeholder: '',
          visible: true,
          editable: true
        },
        list: {
          label: description,
          searchable: fieldName === 'email' || fieldName === 'source',
          sortable: ['email', 'status', 'subscribedAt'].includes(fieldName)
        }
      };
    });

    // 3. 保存配置到数据库
    const configKey = `plugin_content_manager_configuration_content_types::api::${contentType}.${contentType}`;
    
    await strapi.query('strapi::core-store').update({
      where: { key: configKey },
      data: {
        value: JSON.stringify(configuration)
      }
    });

    console.log('✅ 邮件订阅字段描述配置成功');
    
    // 4. 验证配置
    const savedConfig = await strapi.query('strapi::core-store').findOne({
      where: { key: configKey }
    });
    
    if (savedConfig) {
      console.log('✅ 配置验证成功，Admin界面将显示中文字段描述');
    } else {
      throw new Error('配置保存失败');
    }

  } catch (error) {
    console.error('❌ 配置邮件订阅字段描述失败:', error.message);
    throw error;
  }
}

module.exports = configureEmailSubscriptionFields;