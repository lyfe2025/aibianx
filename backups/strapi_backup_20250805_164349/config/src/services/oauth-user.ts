/**
 * OAuth用户统一处理服务
 * 根据架构文档实现OAuth用户的创建、关联和数据映射
 */

interface OAuthProfile {
  id: string;
  email: string;
  name?: string;
  login?: string; // GitHub
  sub?: string;   // Google
  avatar_url?: string; // GitHub
  picture?: string;    // Google
  email_verified?: boolean;
}

interface OAuthAccount {
  provider: string;
  type: string;
}

export class OAuthUserService {
  /**
   * 查找或创建OAuth用户
   */
  static async findOrCreateOAuthUser(profile: OAuthProfile, account: OAuthAccount) {
    const provider = account.provider;
    let user = null;
    let isNewUser = false;

    try {
      // 1. 先通过邮箱查找现有用户
      if (profile.email) {
        user = await strapi.query('plugin::users-permissions.user').findOne({
          where: { email: profile.email }
        });
      }

      // 2. 如果用户不存在，创建新用户
      if (!user) {
        const userData = this.mapOAuthProfile(profile, account);
        
        user = await strapi.query('plugin::users-permissions.user').create({
          data: {
            ...userData,
            confirmed: true, // OAuth用户默认已确认
            blocked: false,
            role: await this.getDefaultRole()
          }
        });
        
        isNewUser = true;
        strapi.log.info(`创建新OAuth用户: ${profile.email} via ${provider}`);
      } else {
        // 3. 如果用户存在，更新OAuth信息
        const updateData = await this.prepareOAuthUpdateData(user, profile, account);
        
        if (Object.keys(updateData).length > 0) {
          await strapi.query('plugin::users-permissions.user').update({
            where: { id: user.id },
            data: updateData
          });
          
          strapi.log.info(`更新OAuth用户信息: ${profile.email} via ${provider}`);
        }
      }

      // 4. 如果是新用户，触发自动订阅
      if (isNewUser) {
        await this.handleNewOAuthUser(user, provider);
      }

      return { user, isNewUser };
    } catch (error) {
      strapi.log.error(`OAuth用户处理失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * OAuth档案信息映射
   */
  private static mapOAuthProfile(profile: OAuthProfile, account: OAuthAccount) {
    const provider = account.provider;
    
    switch (provider) {
      case 'github':
        return {
          username: profile.login,
          email: profile.email,
          nickname: profile.name,
          provider: 'github',
          providerAccountId: profile.id,
          githubId: profile.id,
          githubUsername: profile.login,
          hasPassword: false,
          isEmailVerified: true,
          connectedProviders: ['github'],
          inviteCode: this.generateInviteCode()
        };
        
      case 'google':
        return {
          username: profile.email.split('@')[0],
          email: profile.email,
          nickname: profile.name,
          provider: 'google',
          providerAccountId: profile.sub,
          googleId: profile.sub,
          hasPassword: false,
          isEmailVerified: profile.email_verified || false,
          connectedProviders: ['google'],
          inviteCode: this.generateInviteCode()
        };
        
      default:
        throw new Error(`不支持的OAuth提供者: ${provider}`);
    }
  }

  /**
   * 准备OAuth更新数据
   */
  private static async prepareOAuthUpdateData(user: any, profile: OAuthProfile, account: OAuthAccount) {
    const provider = account.provider;
    const updateData: any = {};

    // 更新provider特定信息
    if (provider === 'github' && !user.githubId) {
      updateData.githubId = profile.id;
      updateData.githubUsername = profile.login;
    } else if (provider === 'google' && !user.googleId) {
      updateData.googleId = profile.sub;
    }

    // 更新已连接的提供者列表
    const connectedProviders = user.connectedProviders || [];
    if (!connectedProviders.includes(provider)) {
      connectedProviders.push(provider);
      updateData.connectedProviders = connectedProviders;
    }

    // 更新头像（如果用户没有头像）
    if (!user.avatar && (profile.avatar_url || profile.picture)) {
      updateData.avatar = profile.avatar_url || profile.picture;
    }

    // 更新昵称（如果用户没有昵称）
    if (!user.nickname && profile.name) {
      updateData.nickname = profile.name;
    }

    // 生成邀请码（如果用户没有邀请码）
    if (!user.inviteCode) {
      updateData.inviteCode = this.generateInviteCode();
    }

    return updateData;
  }

  /**
   * 处理新OAuth用户
   */
  private static async handleNewOAuthUser(user: any, provider: string) {
    try {
      // 1. 触发BillionMail自动订阅
      await strapi.service('api::billionmail.billionmail').autoSubscribeOnAuth(user, 'oauth_signin');
      
      // 2. 记录登录统计
      await this.updateLoginStats(user.id);
      
      strapi.log.info(`新OAuth用户后续处理完成: ${user.email} via ${provider}`);
    } catch (error) {
      strapi.log.error(`新OAuth用户后续处理失败: ${error.message}`);
    }
  }

  /**
   * 更新登录统计
   */
  private static async updateLoginStats(userId: number) {
    await strapi.query('plugin::users-permissions.user').update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
        loginCount: 1 // 新用户首次登录
      }
    });
  }

  /**
   * 获取默认角色
   */
  private static async getDefaultRole() {
    const defaultRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'authenticated' }
    });
    
    return defaultRole?.id || 1;
  }

  /**
   * 生成邀请码
   */
  private static generateInviteCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 验证邀请码唯一性并重新生成
   */
  private static async ensureUniqueInviteCode(): Promise<string> {
    let inviteCode: string;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      inviteCode = this.generateInviteCode();
      
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
   * OAuth用户登录统计更新
   */
  static async updateOAuthLoginStats(userId: number) {
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { id: userId },
      select: ['loginCount']
    });

    await strapi.query('plugin::users-permissions.user').update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
        loginCount: (user?.loginCount || 0) + 1
      }
    });
  }
}