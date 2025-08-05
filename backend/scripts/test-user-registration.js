/**
 * 测试用户注册功能
 * 验证默认设置：邀请码生成、系统用户关联、默认会员等级等
 */

async function testUserRegistration() {
  const axios = require('axios');
  
  // 域名和端口配置
  const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || 'localhost';
  const BACKEND_PORT = process.env.BACKEND_PORT || '1337';
  const BACKEND_PROTOCOL = process.env.BACKEND_PROTOCOL || 'http';
  const BASE_URL = `${BACKEND_PROTOCOL}://${BACKEND_DOMAIN}${BACKEND_PORT === '80' || BACKEND_PORT === '443' ? '' : `:${BACKEND_PORT}`}`;
  
  console.log('🧪 测试用户注册功能...\n');
  
  // 测试数据
  const testUsers = [
    {
      username: 'testuser1',
      email: 'testuser1@example.com',
      password: 'Test123456'
    },
    {
      username: 'testuser2',
      email: 'testuser2@example.com',
      password: 'Test123456'
    }
  ];
  
  try {
    // 1. 获取管理员token
    let adminToken;
    try {
      const loginResponse = await axios.post(`${BASE_URL}/api/auth/local`, {
        identifier: 'admin@aibianx.com',
        password: 'Admin123456'
      });
      adminToken = loginResponse.data.jwt;
      console.log('✅ 管理员登录成功');
    } catch (error) {
      console.error('❌ 管理员登录失败:', error.message);
      return;
    }
    
    // 2. 清理可能存在的测试用户
    console.log('\n🧹 清理测试环境...');
    for (const testUser of testUsers) {
      try {
        const existingUsers = await axios.get(`${BASE_URL}/api/users?filters[email][$eq]=${testUser.email}`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        if (existingUsers.data.length > 0) {
          for (const user of existingUsers.data) {
            await axios.delete(`${BASE_URL}/api/users/${user.id}`, {
              headers: { Authorization: `Bearer ${adminToken}` }
            });
          }
          console.log(`✅ 清理用户: ${testUser.email}`);
        }
      } catch (error) {
        console.log(`⚠️ 清理用户失败: ${testUser.email} - ${error.message}`);
      }
    }
    
    // 3. 检查系统用户是否存在
    console.log('\n🔍 检查系统用户...');
    try {
      const systemUsers = await axios.get(`${BASE_URL}/api/users?filters[username][$eq]=system`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      
      if (systemUsers.data.length > 0) {
        console.log('✅ 系统用户已存在:', systemUsers.data[0].id);
      } else {
        console.log('⚠️ 系统用户不存在，将在首次注册时自动创建');
      }
    } catch (error) {
      console.log('⚠️ 检查系统用户失败:', error.message);
    }
    
    // 4. 测试用户注册
    console.log('\n📝 测试用户注册...');
    const registeredUsers = [];
    
    for (const testUser of testUsers) {
      try {
        console.log(`\n注册用户: ${testUser.email}`);
        
        const registerResponse = await axios.post(`${BASE_URL}/api/auth/local/register`, testUser);
        
        if (registerResponse.data.user) {
          const user = registerResponse.data.user;
          registeredUsers.push(user);
          
          console.log(`✅ 注册成功: ${user.email}`);
          console.log(`   - 用户ID: ${user.id}`);
          console.log(`   - 邀请码: ${user.inviteCode || '未设置'}`);
          console.log(`   - 会员等级: ${user.membershipLevel || '未设置'}`);
          console.log(`   - 邀请人ID: ${user.invitedBy || '未设置'}`);
          
          // 验证默认设置
          const issues = [];
          if (!user.inviteCode) issues.push('缺少邀请码');
          if (!user.membershipLevel || user.membershipLevel !== 'free') issues.push('会员等级不是免费');
          if (!user.invitedBy) issues.push('缺少邀请人');
          
          if (issues.length > 0) {
            console.log(`❌ 发现问题: ${issues.join(', ')}`);
          } else {
            console.log('✅ 所有默认设置正确');
          }
        }
      } catch (error) {
        console.error(`❌ 注册失败: ${testUser.email} - ${error.response?.data?.error?.message || error.message}`);
      }
    }
    
    // 5. 获取详细用户信息（包括关联数据）
    console.log('\n🔍 获取详细用户信息...');
    for (const user of registeredUsers) {
      try {
        const detailedUser = await axios.get(`${BASE_URL}/api/users/${user.id}?populate=*`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        
        const userData = detailedUser.data;
        console.log(`\n用户详情: ${userData.email}`);
        console.log(`   - 邀请码: ${userData.inviteCode}`);
        console.log(`   - 会员等级: ${userData.membershipLevel}`);
        console.log(`   - 邀请人: ${userData.invitedBy ? `ID: ${userData.invitedBy.id} (${userData.invitedBy.username})` : '无'}`);
        console.log(`   - 邀请统计: ${userData.inviteCount || 0} 人`);
        console.log(`   - 累计佣金: ¥${userData.totalCommission || 0}`);
        console.log(`   - 登录次数: ${userData.loginCount || 0}`);
        console.log(`   - 自动续费: ${userData.membershipAutoRenew ? '是' : '否'}`);
        console.log(`   - 邮件订阅: ${userData.billionmailSubscribed ? '是' : '否'}`);
        
      } catch (error) {
        console.error(`❌ 获取用户详情失败: ${user.email} - ${error.message}`);
      }
    }
    
    // 6. 验证邀请码唯一性
    console.log('\n🔍 验证邀请码唯一性...');
    const inviteCodes = registeredUsers.map(user => user.inviteCode).filter(code => code);
    const uniqueCodes = [...new Set(inviteCodes)];
    
    if (inviteCodes.length === uniqueCodes.length) {
      console.log('✅ 所有邀请码都是唯一的');
    } else {
      console.log('❌ 发现重复的邀请码!');
    }
    
    // 7. 检查系统用户是否被正确创建
    console.log('\n🔍 最终检查系统用户...');
    try {
      const systemUsers = await axios.get(`${BASE_URL}/api/users?filters[username][$eq]=system`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      
      if (systemUsers.data.length > 0) {
        const systemUser = systemUsers.data[0];
        console.log('✅ 系统用户存在:');
        console.log(`   - ID: ${systemUser.id}`);
        console.log(`   - 用户名: ${systemUser.username}`);
        console.log(`   - 邮箱: ${systemUser.email}`);
        console.log(`   - 邀请码: ${systemUser.inviteCode}`);
        console.log(`   - 会员等级: ${systemUser.membershipLevel}`);
      } else {
        console.log('❌ 系统用户未创建');
      }
    } catch (error) {
      console.log('❌ 检查系统用户失败:', error.message);
    }
    
    console.log('\n🎉 用户注册功能测试完成!');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

// 执行测试
if (require.main === module) {
  testUserRegistration().catch(console.error);
}

module.exports = { testUserRegistration };