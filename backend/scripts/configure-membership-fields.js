/**
 * 会员服务字段描述自动化配置脚本
 * 确保Admin界面显示中文字段描述
 */

const contentType = 'membership';

const fieldDescriptions = {
  user: '会员用户',
  order: '关联订单',
  membershipLevel: '会员等级',
  planType: '付费计划',
  planName: '套餐名称',
  startDate: '开始日期',
  endDate: '到期日期',
  autoRenew: '自动续费',
  status: '会员状态',
  features: '会员特权',
  originalPrice: '原价（分）',
  actualPrice: '实际价格（分）',
  discountInfo: '优惠信息'
};

async function configureMembershipFields() {
  console.log('🔧 开始配置会员服务字段描述...');
  
  try {
    // 1. 构建配置对象
    const configuration = {
      uid: `api::${contentType}.${contentType}`,
      layouts: {
        list: ['id', 'user', 'membershipLevel', 'planType', 'status', 'startDate', 'endDate'],
        edit: [
          [{ name: 'user', size: 6 }, { name: 'order', size: 6 }],
          [{ name: 'membershipLevel', size: 4 }, { name: 'planType', size: 4 }, { name: 'planName', size: 4 }],
          [{ name: 'startDate', size: 6 }, { name: 'endDate', size: 6 }],
          [{ name: 'originalPrice', size: 6 }, { name: 'actualPrice', size: 6 }],
          [{ name: 'status', size: 6 }, { name: 'autoRenew', size: 6 }],
          [{ name: 'features', size: 6 }, { name: 'discountInfo', size: 6 }]
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
          searchable: ['user', 'membershipLevel', 'planType', 'status'].includes(fieldName),
          sortable: ['membershipLevel', 'planType', 'status', 'startDate', 'endDate'].includes(fieldName)
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

    console.log('✅ 会员服务字段描述配置成功');
    
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
    console.error('❌ 配置会员服务字段描述失败:', error.message);
    throw error;
  }
}

module.exports = configureMembershipFields;