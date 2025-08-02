/**
 * BillionMail自动订阅集成服务
 * 根据架构文档实现注册和OAuth用户自动订阅
 */

import { BillionMailClient } from '../lib/billionmail-config';

export class BillionMailIntegrationService {
  private static billionMailClient = new BillionMailClient();
  
  /**
   * 用户注册/OAuth登录时自动订阅
   */
  static async autoSubscribeOnAuth(user: any, authType: string = 'register') {
    // 检查是否已经订阅
    if (user.billionmailSubscribed) {
      strapi.log.info(`用户 ${user.email} 已订阅BillionMail，跳过自动订阅`);
      return;
    }

    try {
      // 根据认证方式设置标签
      const tags = ['new_user', 'auto_subscribed'];
      if (user.provider !== 'local') {
        tags.push(`oauth_${user.provider}`);
      }

      // 1. 创建BillionMail订阅者
      const subscriber = await this.billionMailClient.addSubscriber(
        user.email,
        user.nickname || user.username,
        tags
      );

      if (subscriber.success) {
        // 2. 更新用户信息
        await strapi.entityService.update('plugin::users-permissions.user', user.id, {
          data: {
            billionmailSubscribed: true,
            billionmailSubscriberId: subscriber.id,
            billionmailListIds: [process.env.BILLIONMAIL_DEFAULT_LIST_ID || 'newsletter']
          }
        });

        strapi.log.info(`用户 ${user.email} 自动订阅BillionMail成功`);
        
        // 3. 发送欢迎邮件
        await this.sendWelcomeEmail(user, authType);
      } else {
        strapi.log.error(`用户 ${user.email} 自动订阅BillionMail失败: ${subscriber.error}`);
      }
    } catch (error) {
      strapi.log.error(`BillionMail自动订阅失败: ${error.message}`);
    }
  }

  /**
   * 发送欢迎邮件
   */
  private static async sendWelcomeEmail(user: any, authType: string) {
    try {
      let templateId = 'user_welcome';
      
      // 根据注册方式选择不同模板
      if (authType === 'oauth_signin') {
        templateId = 'oauth_welcome';
      }

      const variables = {
        user_name: user.nickname || user.username,
        site_name: process.env.SITE_NAME || 'AI变现之路',
        site_url: process.env.FRONTEND_URL || 'http://localhost',
        dashboard_url: `${process.env.FRONTEND_URL || 'http://localhost'}/profile`,
        support_email: process.env.SUPPORT_EMAIL || 'support@aibianx.com'
      };

      await this.billionMailClient.sendTemplateEmail(
        user.email,
        templateId,
        variables
      );

      strapi.log.info(`发送欢迎邮件成功: ${user.email}`);
    } catch (error) {
      strapi.log.error(`发送欢迎邮件失败: ${error.message}`);
    }
  }

  /**
   * 邀请用户特殊处理
   */
  static async handleInvitedUserSubscription(user: any, inviteCode: string) {
    try {
      if (!user.billionmailSubscribed) {
        await this.autoSubscribeOnAuth(user, 'invite');
      }

      // 为邀请用户添加特殊标签
      if (user.billionmailSubscriberId) {
        await this.billionMailClient.updateSubscriber(user.billionmailSubscriberId, {
          tags: ['invited_user', `invited_by_${inviteCode}`],
          customFields: {
            inviteCode: inviteCode,
            invitedAt: new Date().toISOString()
          }
        });
      }

      strapi.log.info(`邀请用户BillionMail处理完成: ${user.email}`);
    } catch (error) {
      strapi.log.error(`邀请用户BillionMail处理失败: ${error.message}`);
    }
  }

  /**
   * 发送邀请通知邮件
   */
  static async sendInviteNotificationEmail(inviterEmail: string, inviteeEmail: string, commissionAmount: number) {
    try {
      const variables = {
        inviter_email: inviterEmail,
        invitee_email: inviteeEmail,
        commission_amount: (commissionAmount / 100).toFixed(2), // 转换为元
        site_name: process.env.SITE_NAME || 'AI变现之路',
        site_url: process.env.FRONTEND_URL || 'http://localhost'
      };

      await this.billionMailClient.sendTemplateEmail(
        inviterEmail,
        'commission_notification',
        variables
      );

      strapi.log.info(`发送返佣通知邮件成功: ${inviterEmail}`);
    } catch (error) {
      strapi.log.error(`发送返佣通知邮件失败: ${error.message}`);
    }
  }

  /**
   * 发送购买确认邮件
   */
  static async sendPurchaseConfirmationEmail(user: any, order: any) {
    try {
      const variables = {
        user_name: user.nickname || user.username,
        order_no: order.orderNo,
        product_name: order.productName,
        amount: (order.finalPrice / 100).toFixed(2), // 转换为元
        payment_method: order.paymentMethod,
        purchase_date: new Date().toLocaleDateString('zh-CN'),
        site_name: process.env.SITE_NAME || 'AI变现之路',
        site_url: process.env.FRONTEND_URL || 'http://localhost'
      };

      await this.billionMailClient.sendTemplateEmail(
        user.email,
        'purchase_confirmation',
        variables
      );

      strapi.log.info(`发送购买确认邮件成功: ${user.email}`);
    } catch (error) {
      strapi.log.error(`发送购买确认邮件失败: ${error.message}`);
    }
  }

  /**
   * 发送会员升级通知邮件
   */
  static async sendMembershipUpgradeEmail(user: any, newLevel: string) {
    try {
      const variables = {
        user_name: user.nickname || user.username,
        new_level: newLevel,
        upgrade_date: new Date().toLocaleDateString('zh-CN'),
        benefits_url: `${process.env.FRONTEND_URL || 'http://localhost'}/profile/subscription`,
        site_name: process.env.SITE_NAME || 'AI变现之路',
        site_url: process.env.FRONTEND_URL || 'http://localhost'
      };

      await this.billionMailClient.sendTemplateEmail(
        user.email,
        'membership_upgrade',
        variables
      );

      strapi.log.info(`发送会员升级通知邮件成功: ${user.email}`);
    } catch (error) {
      strapi.log.error(`发送会员升级通知邮件失败: ${error.message}`);
    }
  }

  /**
   * 批量发送营销邮件
   */
  static async sendMarketingCampaign(listId: string, templateId: string, variables: Record<string, any>) {
    try {
      const result = await this.billionMailClient.sendCampaign({
        listId,
        templateId,
        variables,
        scheduledAt: null // 立即发送
      });

      if (result.success) {
        strapi.log.info(`营销邮件发送成功，活动ID: ${result.campaignId}`);
        return result;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      strapi.log.error(`营销邮件发送失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 获取订阅统计
   */
  static async getSubscriptionStats() {
    try {
      const totalUsers = await strapi.query('plugin::users-permissions.user').count();
      const subscribedUsers = await strapi.query('plugin::users-permissions.user').count({
        where: { billionmailSubscribed: true }
      });

      const stats = {
        totalUsers,
        subscribedUsers,
        subscriptionRate: totalUsers > 0 ? (subscribedUsers / totalUsers * 100).toFixed(2) : '0.00'
      };

      return stats;
    } catch (error) {
      strapi.log.error(`获取订阅统计失败: ${error.message}`);
      return { totalUsers: 0, subscribedUsers: 0, subscriptionRate: '0.00' };
    }
  }
}