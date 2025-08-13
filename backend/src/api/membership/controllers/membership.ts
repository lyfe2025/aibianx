/**
 * 会员服务控制器
 * 专门处理付费会员服务，与订单和支付系统集成
 */

import { factories } from '@strapi/strapi';

// 会员特权配置工具函数
function getMembershipFeatures(level: string) {
  const featuresMap = {
    basic: {
      downloadLimit: 10,
      exclusiveContent: false,
      prioritySupport: false,
      adFree: true,
      features: ['基础内容下载', '无广告浏览']
    },
    premium: {
      downloadLimit: 50,
      exclusiveContent: true,
      prioritySupport: false,
      adFree: true,
      features: ['高级内容下载', '独家资源访问', '无广告浏览']
    },
    vip: {
      downloadLimit: -1, // 无限制
      exclusiveContent: true,
      prioritySupport: true,
      adFree: true,
      features: ['无限下载', '所有独家内容', '优先客服支持', '无广告浏览', 'VIP专属社群']
    }
  };

  return featuresMap[level] || featuresMap.basic;
}

export default factories.createCoreController('api::membership.membership', ({ strapi }) => ({
  /**
   * 创建会员服务
   * 通常在订单支付成功后调用
   */
  async create(ctx) {
    const { user, order, membershipLevel, planType, planName, originalPrice, actualPrice, discountInfo } = ctx.request.body;

    if (!user || !membershipLevel || !planType || !planName || !actualPrice) {
      return ctx.badRequest('缺少必要参数');
    }

    try {
      // 检查用户是否已有激活的会员服务
      const existingMembership = await strapi.query('api::membership.membership').findOne({
        where: {
          user,
          status: 'active'
        }
      });

      if (existingMembership) {
        return ctx.badRequest('用户已有激活的会员服务');
      }

      // 计算会员期限
      const startDate = new Date();
      let endDate = null;

      if (planType !== 'lifetime') {
        endDate = new Date(startDate);
        if (planType === 'monthly') {
          endDate.setMonth(endDate.getMonth() + 1);
        } else if (planType === 'yearly') {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }
      }

      // 定义会员特权
      const features = getMembershipFeatures(membershipLevel);

      // 创建会员服务记录
      const membership = await strapi.entityService.create('api::membership.membership', {
        data: {
          user,
          order,
          membershipLevel,
          planType,
          planName,
          startDate,
          endDate,
          originalPrice,
          actualPrice,
          discountInfo,
          features: features as any,
          status: 'active'
        }
      });

      // 更新用户会员状态
      await strapi.entityService.update('plugin::users-permissions.user', user, {
        data: {
          membershipLevel,
          membershipExpiry: endDate
        }
      });

      // 记录会员升级通知信息
      const userInfo = await strapi.entityService.findOne('plugin::users-permissions.user', user);
      strapi.log.info(`会员升级通知: ${userInfo.email} -> ${membershipLevel}`);

      strapi.log.info(`用户 ${user} 会员服务创建成功: ${membershipLevel} - ${planType}`);

      return ctx.send({
        status: 'success',
        message: '会员服务创建成功',
        data: membership
      });

    } catch (error) {
      strapi.log.error(`创建会员服务失败: ${error.message}`);
      return ctx.internalServerError('创建会员服务失败');
    }
  },

  /**
   * 续费会员服务
   */
  async renew(ctx) {
    const { membershipId, newOrder, planType } = ctx.request.body;

    if (!membershipId || !newOrder || !planType) {
      return ctx.badRequest('缺少必要参数');
    }

    try {
      const membership = await strapi.entityService.findOne('api::membership.membership', membershipId);
      
      if (!membership) {
        return ctx.notFound('会员服务不存在');
      }

      // 计算新的到期时间
      const currentEndDate = membership.endDate ? new Date(membership.endDate) : new Date();
      const newEndDate = new Date(currentEndDate);

      if (planType === 'monthly') {
        newEndDate.setMonth(newEndDate.getMonth() + 1);
      } else if (planType === 'yearly') {
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
      } else if (planType === 'lifetime') {
        // 升级为终身会员
        await strapi.entityService.update('api::membership.membership', membershipId, {
          data: {
            planType: 'lifetime',
            endDate: null,
            status: 'active'
          }
        });

        return ctx.send({
          status: 'success',
          message: '已升级为终身会员'
        });
      }

      // 更新会员服务
      await strapi.entityService.update('api::membership.membership', membershipId, {
        data: {
          endDate: newEndDate,
          status: 'active'
        }
      });

      // 更新用户表
      await strapi.entityService.update('plugin::users-permissions.user', (membership as any).user, {
        data: {
          membershipExpiry: newEndDate
        }
      });

      return ctx.send({
        status: 'success',
        message: '会员续费成功',
        data: { newEndDate }
      });

    } catch (error) {
      strapi.log.error(`会员续费失败: ${error.message}`);
      return ctx.internalServerError('会员续费失败');
    }
  },

  /**
   * 取消会员服务
   */
  async cancel(ctx) {
    const { membershipId, reason } = ctx.request.body;

    if (!membershipId) {
      return ctx.badRequest('会员服务ID不能为空');
    }

    try {
      const membership = await strapi.entityService.findOne('api::membership.membership', membershipId);
      
      if (!membership) {
        return ctx.notFound('会员服务不存在');
      }

      // 更新会员状态
      await strapi.entityService.update('api::membership.membership', membershipId, {
        data: {
          status: 'cancelled',
          autoRenew: false
        }
      });

      // 更新用户会员等级
      await strapi.entityService.update('plugin::users-permissions.user', (membership as any).user, {
        data: {
          membershipLevel: 'free',
          membershipAutoRenew: false
        }
      });

      return ctx.send({
        status: 'success',
        message: '会员服务已取消'
      });

    } catch (error) {
      strapi.log.error(`取消会员服务失败: ${error.message}`);
      return ctx.internalServerError('取消会员服务失败');
    }
  }
}));