/**
 * 清理旧subscription内容类型脚本
 * 1. 更新所有代码引用 api::subscription.subscription -> api::membership.membership
 * 2. 移除旧的subscription目录
 */

const fs = require('fs');
const path = require('path');

async function cleanupOldSubscription() {
  console.log('🧹 开始清理旧的subscription内容类型...');

  try {
    // 1. 更新refund服务中的引用
    console.log('🔧 更新 refund 服务中的引用...');
    await updateRefundService();

    // 2. 更新order服务中的引用
    console.log('🔧 更新 order 服务中的引用...');
    await updateOrderService();

    // 3. 更新前端分析组件中的引用
    console.log('🔧 更新前端分析组件中的引用...');
    await updateFrontendComponents();

    // 4. 检查是否有其他引用
    console.log('🔍 检查是否还有其他引用...');
    await checkRemainingReferences();

    console.log('✅ 旧subscription引用清理完成');
    
    // 注意：实际删除目录需要在数据迁移完成后手动执行
    console.log('\n⚠️  注意事项:');
    console.log('1. 旧subscription目录保留，等数据迁移完成后再删除');
    console.log('2. 请先执行数据迁移，确保数据安全');
    console.log('3. 迁移完成后可手动删除: backend/src/api/subscription/');

  } catch (error) {
    console.error('💥 清理过程中出现错误:', error);
    throw error;
  }
}

/**
 * 更新退款服务中的引用
 */
async function updateRefundService() {
  const filePath = path.join(__dirname, '../src/api/refund/services/refund.ts');
  
  if (!fs.existsSync(filePath)) {
    console.log('⚠️  refund服务文件不存在，跳过更新');
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // 替换所有subscription引用为membership
  content = content.replace(/api::subscription\.subscription/g, 'api::membership.membership');
  content = content.replace(/const subscriptions = /g, 'const memberships = ');
  content = content.replace(/subscriptions\.map\(subscription =>/g, 'memberships.map(membership =>');
  content = content.replace(/subscription\.id/g, 'membership.id');
  
  fs.writeFileSync(filePath, content);
  console.log('✅ refund服务更新完成');
}

/**
 * 更新订单服务中的引用
 */
async function updateOrderService() {
  const filePath = path.join(__dirname, '../src/api/order/services/order.ts');
  
  if (!fs.existsSync(filePath)) {
    console.log('⚠️  order服务文件不存在，跳过更新');
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // 替换订单服务中的subscription引用
  content = content.replace(/api::subscription\.subscription/g, 'api::membership.membership');
  content = content.replace(/const existingSubscriptions = /g, 'const existingMemberships = ');
  content = content.replace(/subscription\.id/g, 'membership.id');
  content = content.replace(/const newSubscription = /g, 'const newMembership = ');
  
  fs.writeFileSync(filePath, content);
  console.log('✅ order服务更新完成');
}

/**
 * 更新前端分析组件中的引用
 */
async function updateFrontendComponents() {
  // 更新前端分析组件，将subscription统计改为membership统计
  const componentsToUpdate = [
    '../../../frontend/src/components/molecules/RevenueAnalytics.tsx',
    '../../../frontend/src/components/molecules/FinancialDashboard.tsx'
  ];

  for (const componentPath of componentsToUpdate) {
    const fullPath = path.join(__dirname, componentPath);
    
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // 更新API端点引用
      content = content.replace(/\/api\/admin\/subscriptions\/stats/g, '/api/admin/memberships/stats');
      content = content.replace(/subscriptionStats/g, 'membershipStats');
      content = content.replace(/subscriptionData/g, 'membershipData');
      content = content.replace(/activeSubscriptions/g, 'activeMemberships');
      
      fs.writeFileSync(fullPath, content);
      console.log(`✅ ${path.basename(fullPath)} 更新完成`);
    }
  }
}

/**
 * 检查是否还有其他引用
 */
async function checkRemainingReferences() {
  // 这里可以添加检查逻辑，搜索项目中是否还有subscription的引用
  console.log('🔍 建议手动检查以下位置是否还有subscription引用:');
  console.log('- backend/types/generated/contentTypes.d.ts');
  console.log('- 前端API调用');
  console.log('- 数据库查询');
}

module.exports = cleanupOldSubscription;