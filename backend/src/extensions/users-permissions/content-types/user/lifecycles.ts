/**
 * 用户生命周期钩子
 * 处理用户注册时的默认设置：邀请码生成、系统用户关联、默认会员等级等
 */

export default {
  /**
   * 用户创建前的处理
   */
  async beforeCreate(event: any) {
    const { data } = event.params;

    try {
      // 1. 生成唯一邀请码（如果没有提供）
      if (!data.inviteCode) {
        data.inviteCode = await generateUniqueInviteCode();
        strapi.log.info(`为新用户生成邀请码: ${data.inviteCode}`);
      }

      // 2. 设置默认会员等级（如果没有设置）
      if (!data.membershipLevel) {
        data.membershipLevel = 'free';
        strapi.log.info('设置默认会员等级: free');
      }

      // 3. 设置默认邀请人为系统用户（如果没有邀请人）
      if (!data.invitedBy) {
        const systemUser = await getOrCreateSystemUser();
        if (systemUser) {
          data.invitedBy = systemUser.id;
          strapi.log.info(`设置默认邀请人为系统用户: ${systemUser.id}`);
        }
      }

      // 4. 初始化其他默认值
      if (data.inviteCount === undefined) {
        data.inviteCount = 0;
      }
      if (data.totalCommission === undefined) {
        data.totalCommission = 0;
      }
      if (data.loginCount === undefined) {
        data.loginCount = 0;
      }
      if (data.membershipAutoRenew === undefined) {
        data.membershipAutoRenew = false;
      }
      if (data.billionmailSubscribed === undefined) {
        data.billionmailSubscribed = false;
      }

    } catch (error) {
      strapi.log.error('用户创建前处理失败:', error);
      throw error;
    }
  },

  /**
   * 用户创建后的处理
   */
  async afterCreate(event: any) {
    const { result } = event;

    try {
      // 1. 更新邀请人的邀请统计
      if (result.invitedBy) {
        await updateInviterStats(result.invitedBy);
        strapi.log.info(`更新邀请人统计: ${result.invitedBy}`);
      }

      // 2. 记录用户创建日志
      strapi.log.info(`新用户创建完成: ${result.email} (ID: ${result.id})`);

      // 3. 触发自动订阅（如果启用）
      if (strapi.service('api::billionmail.billionmail')) {
        try {
          await strapi.service('api::billionmail.billionmail').autoSubscribeOnAuth(result, 'register');
          strapi.log.info(`为新用户触发自动订阅: ${result.email}`);
        } catch (error) {
          strapi.log.warn(`自动订阅失败: ${error.message}`);
        }
      }

    } catch (error) {
      strapi.log.error('用户创建后处理失败:', error);
      // 不抛出错误，避免影响用户创建
    }
  }
};

/**
 * 生成唯一邀请码
 */
async function generateUniqueInviteCode(): Promise<string> {
  let inviteCode: string;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 10;

  while (!isUnique && attempts < maxAttempts) {
    inviteCode = generateInviteCode();
    
    const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
      where: { inviteCode }
    });
    
    if (!existingUser) {
      isUnique = true;
      return inviteCode;
    }
    
    attempts++;
  }
  
  throw new Error('无法生成唯一邀请码');
}

/**
 * 生成邀请码
 */
function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 获取或创建系统用户
 */
async function getOrCreateSystemUser() {
  try {
    // 1. 尝试查找现有系统用户
    let systemUser = await strapi.query('plugin::users-permissions.user').findOne({
      where: { username: 'system' }
    });

    // 2. 如果不存在，创建系统用户
    if (!systemUser) {
      const defaultRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'authenticated' }
      });

      systemUser = await strapi.query('plugin::users-permissions.user').create({
        data: {
          username: 'system',
          email: 'system@aibianx.com',
          nickname: '系统用户',
          confirmed: true,
          blocked: false,
          membershipLevel: 'vip', // 系统用户设为VIP
          inviteCode: 'SYSTEM00', // 固定的系统邀请码
          hasPassword: false, // 系统用户无密码
          role: defaultRole?.id || 1,
          provider: 'local'
        }
      });
      
      strapi.log.info('创建系统用户成功:', systemUser.id);
    }

    return systemUser;
  } catch (error) {
    strapi.log.error('获取或创建系统用户失败:', error);
    return null;
  }
}

/**
 * 更新邀请人统计
 */
async function updateInviterStats(inviterId: number) {
  try {
    const inviter = await strapi.query('plugin::users-permissions.user').findOne({
      where: { id: inviterId },
      select: ['inviteCount']
    });

    if (inviter) {
      await strapi.query('plugin::users-permissions.user').update({
        where: { id: inviterId },
        data: {
          inviteCount: (inviter.inviteCount || 0) + 1
        }
      });
    }
  } catch (error) {
    strapi.log.error('更新邀请人统计失败:', error);
  }
}