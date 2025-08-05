/**
 * 新内容类型完整配置脚本
 * 一次性完成数据库注释和字段描述配置
 */

const fs = require('fs');
const path = require('path');

async function configureNewContentTypes() {
  console.log('🚀 开始配置新内容类型：email-subscription 和 membership');
  console.log('📋 配置内容：数据库中文注释 + Strapi后台中文字段描述');

  try {
    // 1. 执行数据库注释脚本
    console.log('\n📊 Step 1: 添加数据库中文注释...');
    
    // 读取SQL文件并执行
    const emailSubscriptionSQL = fs.readFileSync(
      path.join(__dirname, 'add-email-subscription-comments.sql'), 
      'utf8'
    );
    const membershipSQL = fs.readFileSync(
      path.join(__dirname, 'add-membership-comments.sql'), 
      'utf8'
    );

    // 执行SQL命令
    const knex = strapi.db.connection;
    
    console.log('🔧 正在为 email_subscriptions 表添加中文注释...');
    await knex.raw(emailSubscriptionSQL);
    console.log('✅ email_subscriptions 表注释添加成功');
    
    console.log('🔧 正在为 memberships 表添加中文注释...');
    await knex.raw(membershipSQL);
    console.log('✅ memberships 表注释添加成功');

    // 2. 配置Strapi字段描述
    console.log('\n🎨 Step 2: 配置Strapi后台中文字段描述...');
    
    // 加载并执行字段配置脚本
    const configureEmailSubscription = require('./configure-email-subscription-fields');
    const configureMembership = require('./configure-membership-fields');
    
    console.log('🔧 正在配置邮件订阅字段描述...');
    await configureEmailSubscription();
    
    console.log('🔧 正在配置会员服务字段描述...');
    await configureMembership();

    // 3. 验证配置结果
    console.log('\n🔍 Step 3: 验证配置结果...');
    
    // 验证数据库注释
    const tableComments = await knex.raw(`
      SELECT table_name, obj_description(c.oid) as table_comment
      FROM information_schema.tables t
      LEFT JOIN pg_class c ON c.relname = t.table_name
      WHERE t.table_name IN ('email_subscriptions', 'memberships')
    `);
    
    console.log('📊 数据库表注释验证:');
    tableComments.rows.forEach(row => {
      console.log(`  ✅ ${row.table_name}: ${row.table_comment || '未设置'}`);
    });

    // 验证字段描述配置
    const emailSubConfig = await strapi.query('strapi::core-store').findOne({
      where: { key: 'plugin_content_manager_configuration_content_types::api::email-subscription.email-subscription' }
    });
    
    const membershipConfig = await strapi.query('strapi::core-store').findOne({
      where: { key: 'plugin_content_manager_configuration_content_types::api::membership.membership' }
    });

    console.log('🎨 Strapi字段描述配置验证:');
    console.log(`  ✅ email-subscription: ${emailSubConfig ? '已配置' : '未配置'}`);
    console.log(`  ✅ membership: ${membershipConfig ? '已配置' : '未配置'}`);

    // 4. 生成验证报告
    const report = {
      timestamp: new Date().toISOString(),
      contentTypes: [
        {
          name: 'email-subscription',
          tableName: 'email_subscriptions',
          description: '邮件订阅管理表',
          databaseCommentsAdded: true,
          strapiFieldDescriptionsConfigured: !!emailSubConfig
        },
        {
          name: 'membership', 
          tableName: 'memberships',
          description: '会员服务管理表',
          databaseCommentsAdded: true,
          strapiFieldDescriptionsConfigured: !!membershipConfig
        }
      ],
      nextSteps: [
        '重启Strapi服务以应用配置变更',
        '在Admin界面验证中文字段显示', 
        '清理旧代码引用',
        '移除过时的subscription内容类型'
      ]
    };

    // 保存验证报告
    const reportPath = path.join(__dirname, '../logs', `new-content-types-config-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n🎉 新内容类型配置完成！');
    console.log('📄 详细报告保存至:', reportPath);
    console.log('\n⚠️  下一步操作:');
    console.log('1. 重启Strapi服务: ./scripts.sh deployment start-backend');
    console.log('2. 访问Admin验证字段显示: http://localhost:1337/admin');
    console.log('3. 清理旧代码引用: npm run strapi script:cleanup-old-subscription');

  } catch (error) {
    console.error('💥 配置过程中出现错误:', error);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  console.log('请在Strapi环境中运行此配置脚本');
  console.log('命令: npm run strapi script:configure-new-content-types');
} else {
  module.exports = configureNewContentTypes;
}