/**
 * 邀请返佣服务
 * 根据架构文档实现邀请码注册、一级返佣计算和邀请人升级检查
 */

import { BillionMailIntegrationService } from './billionmail-integration';

export class InviteCommissionService {
  /**
   * 处理用户注册时的邀请码
   */
  static async handleInviteCodeOnRegister(user: any, inviteCode: string) {
    if (!inviteCode) {
      return;
    }

    try {
      // 1. 查找邀请记录
      const invitation = await strapi.query('api::invitation.invitation').findOne({
        where: { inviteCode, status: 'sent' },
        populate: ['inviter']
      });

      if (invitation) {
        // 2. 更新邀请记录
        await strapi.query('api::invitation.invitation').update({
          where: { id: invitation.id },
          data: {
            invitee: user.id,
            status: 'registered',
            registeredAt: new Date()
          }
        });

        // 3. 给被邀请人发放注册优惠
        if (invitation.inviteeCoupon) {
          await this.grantWelcomeCoupon(user.id, invitation.inviteeCoupon);
        }

        // 4. 更新用户邀请关系
        await strapi.query('plugin::users-permissions.user').update({
          where: { id: user.id },
          data: { invitedBy: invitation.inviter.id }
        });

        // 5. 更新邀请人统计
        await this.updateInviterStats(invitation.inviter.id, 'registered');

        // 6. 发送BillionMail欢迎邮件（带优惠信息）
        await BillionMailIntegrationService.handleInvitedUserSubscription(user, inviteCode);

        strapi.log.info(`邀请码注册处理成功: ${user.email} via ${inviteCode}`);
      }
    } catch (error) {
      strapi.log.error(`邀请码注册处理失败: ${error.message}`);
    }
  }

  /**
   * 处理支付成功后的一级返佣
   */
  static async processFirstLevelCommission(payer: any, order: any) {
    // 只处理被邀请用户的首次付费
    if (!payer.invitedBy) {
      return;
    }

    try {
      const invitation = await strapi.query('api::invitation.invitation').findOne({
        where: { inviter: payer.invitedBy, invitee: payer.id },
        populate: ['inviter']
      });

      if (invitation && invitation.status === 'registered') {
        // 计算返佣金额（15%）
        const commissionRate = 0.15;
        const commissionAmount = Math.floor(order.finalPrice * commissionRate);

        // 创建返佣记录
        await strapi.query('api::commission.commission').create({
          data: {
            inviter: payer.invitedBy,
            invitee: payer.id,
            invitation: invitation.id,
            order: order.id,
            commissionType: 'first_purchase',
            amount: commissionAmount,
            rate: commissionRate,
            originalAmount: order.finalPrice,
            status: 'pending',
            isFirstTimeBonus: true
          }
        });

        // 更新邀请记录状态
        await strapi.query('api::invitation.invitation').update({
          where: { id: invitation.id },
          data: {
            status: 'purchased',
            purchasedAt: new Date(),
            inviterReward: commissionAmount
          }
        });

        // 更新邀请人累计返佣
        await this.updateInviterTotalCommission(payer.invitedBy, commissionAmount);

        // 更新邀请人统计
        await this.updateInviterStats(payer.invitedBy, 'purchased');

        // 发送返佣通知邮件
        const inviter = await strapi.entityService.findOne('plugin::users-permissions.user', payer.invitedBy);
        await BillionMailIntegrationService.sendInviteNotificationEmail(
          inviter.email,
          payer.email,
          commissionAmount
        );

        strapi.log.info(`一级返佣处理成功: ${commissionAmount}分 for ${inviter.email}`);
      }
    } catch (error) {
      strapi.log.error(`一级返佣处理失败: ${error.message}`);
    }
  }

  /**
   * 检查邀请人升级条件
   */
  static async checkInviterUpgrade(newMember: any) {
    if (!newMember.invitedBy) {
      return;
    }

    try {
      const inviterStats = await this.getInviterStats(newMember.invitedBy);
      const inviter = await strapi.entityService.findOne('plugin::users-permissions.user', newMember.invitedBy);

      // 检查升级条件
      let shouldUpgrade = false;
      let newLevel = inviter.membershipLevel;

      if (inviterStats.paidInvites >= 10 && inviter.membershipLevel !== 'vip') {
        newLevel = 'vip';
        shouldUpgrade = true;
      } else if (inviterStats.paidInvites >= 5 && inviter.membershipLevel === 'free') {
        newLevel = 'premium';
        shouldUpgrade = true;
      }

      if (shouldUpgrade) {
        await this.upgradeUserMembership(newMember.invitedBy, newLevel);
        await BillionMailIntegrationService.sendMembershipUpgradeEmail(inviter, newLevel);
        
        strapi.log.info(`邀请人升级成功: ${inviter.email} -> ${newLevel}`);
      }
    } catch (error) {
      strapi.log.error(`邀请人升级检查失败: ${error.message}`);
    }
  }

  /**
   * 发放欢迎优惠券
   */
  private static async grantWelcomeCoupon(userId: number, couponCode: string) {
    // 这里实现优惠券发放逻辑
    // 简化实现，实际需要根据优惠券系统实现
    strapi.log.info(`发放欢迎优惠券: ${couponCode} to user ${userId}`);
  }

  /**
   * 更新邀请人累计返佣
   */
  private static async updateInviterTotalCommission(inviterId: number, commissionAmount: number) {
    const inviter = await strapi.entityService.findOne('plugin::users-permissions.user', inviterId, {
      fields: ['totalCommission']
    });

    const newTotal = (inviter.totalCommission || 0) + commissionAmount;

    await strapi.entityService.update('plugin::users-permissions.user', inviterId, {
      data: {
        totalCommission: newTotal
      }
    });
  }

  /**
   * 更新邀请人统计
   */
  private static async updateInviterStats(inviterId: number, action: 'registered' | 'purchased') {
    const inviter = await strapi.entityService.findOne('plugin::users-permissions.user', inviterId, {
      fields: ['inviteCount']
    });

    const updateData: any = {};

    if (action === 'registered') {
      updateData.inviteCount = (inviter.inviteCount || 0) + 1;
    }

    if (Object.keys(updateData).length > 0) {
      await strapi.entityService.update('plugin::users-permissions.user', inviterId, {
        data: updateData
      });
    }
  }

  /**
   * 获取邀请人统计
   */
  private static async getInviterStats(inviterId: number) {
    const invitations = await strapi.query('api::invitation.invitation').findMany({
      where: { inviter: inviterId },
      populate: false
    });

    const stats = {
      totalInvites: invitations.length,
      registeredInvites: invitations.filter(inv => ['registered', 'purchased'].includes(inv.status)).length,
      paidInvites: invitations.filter(inv => inv.status === 'purchased').length,
    };

    return stats;
  }

  /**
   * 升级用户会员
   */
  private static async upgradeUserMembership(userId: number, newLevel: string) {
    const expiry = new Date();
    
    // 根据等级设置过期时间
    switch (newLevel) {
      case 'premium':
        expiry.setFullYear(expiry.getFullYear() + 1); // 1年
        break;
      case 'vip':
        expiry.setFullYear(expiry.getFullYear() + 2); // 2年
        break;
      default:
        expiry.setMonth(expiry.getMonth() + 1); // 1个月
    }

    await strapi.entityService.update('plugin::users-permissions.user', userId, {
      data: {
        membershipLevel: newLevel as 'free' | 'basic' | 'premium' | 'vip',
        membershipExpiry: expiry
      }
    });
  }

  /**
   * 生成邀请码
   */
  static generateInviteCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 创建邀请记录
   */
  static async createInvitation(inviterId: number, inviteChannel: string = 'link') {
    try {
      const inviter = await strapi.entityService.findOne('plugin::users-permissions.user', inviterId);
      
      if (!inviter || inviter.membershipLevel === 'free') {
        throw new Error('只有会员才能邀请其他用户');
      }

      const inviteCode = inviter.inviteCode || this.generateInviteCode();
      const expiredAt = new Date();
      expiredAt.setDate(expiredAt.getDate() + 30); // 30天有效

      const invitation = await strapi.entityService.create('api::invitation.invitation', {
        data: {
          inviter: inviterId,
          inviteCode,
          inviteChannel: inviteChannel as 'email' | 'link' | 'social',
          status: 'sent',
          inviterReward: 0, // 将在被邀请人付费后计算
          inviteeReward: 1000, // 10元优惠（单位：分）
          invitedAt: new Date(),
          expiredAt
        }
      });

      return invitation;
    } catch (error) {
      strapi.log.error(`创建邀请记录失败: ${error.message}`);
      throw error;
    }
  }
}