/**
 * Refund controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::refund.refund', ({ strapi }) => ({
  /**
   * 申请退款
   */
  async create(ctx) {
    const { data } = ctx.request.body;
    const { user } = ctx.state;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const { orderId, refundAmount, refundReason } = data;
    
    // 验证订单
    const order = await strapi.entityService.findOne('api::order.order', orderId, {
      populate: ['user']
    });
    
    if (!order) {
      return ctx.notFound('订单不存在');
    }
    
    if (order.user.id !== user.id) {
      return ctx.forbidden('无权限操作此订单');
    }
    
    if (order.status !== 'paid') {
      return ctx.badRequest('只能对已支付订单申请退款');
    }
    
    // 检查是否已有待处理的退款申请
    const existingRefund = await strapi.entityService.findMany('api::refund.refund', {
      filters: {
        order: orderId,
        status: ['pending', 'approved']
      }
    });
    
    if (existingRefund.length > 0) {
      return ctx.badRequest('已有待处理的退款申请');
    }
    
    // 生成退款单号
    const refundNo = `REF${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    const refundData = {
      order: orderId,
      user: user.id,
      refundNo,
      refundAmount: refundAmount || order.finalPrice,
      refundReason,
      status: 'pending'
    };
    
    const result = await strapi.entityService.create('api::refund.refund', {
      data: refundData,
      populate: ['order', 'user', 'payment']
    });
    
    // 发送退款申请通知给管理员
    await this.sendRefundNotificationToAdmin(result);
    
    return result;
  },

  /**
   * 获取用户退款记录
   */
  async findUserRefunds(ctx) {
    const { user } = ctx.state;
    const { pagination, filters, sort } = ctx.query;
    
    if (!user) {
      return ctx.unauthorized('用户未登录');
    }
    
    const results = await strapi.entityService.findMany('api::refund.refund', {
      filters: {
        user: user.id,
        ...(filters && typeof filters === 'object' ? filters : {})
      },
      populate: ['order', 'user', 'payment', 'processedBy'],
      pagination,
      sort: sort || [{ createdAt: 'desc' }]
    });
    
    return results;
  },

  /**
   * 管理员处理退款申请
   */
  async processRefund(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    const { action, processNote } = ctx.request.body;
    
    if (!user || !this.isAdmin(user)) {
      return ctx.forbidden('需要管理员权限');
    }
    
    if (!['approve', 'reject'].includes(action)) {
      return ctx.badRequest('无效的处理操作');
    }
    
    const refund = await strapi.entityService.findOne('api::refund.refund', id, {
      populate: ['order', 'user', 'payment']
    });
    
    if (!refund) {
      return ctx.notFound('退款记录不存在');
    }
    
    if (refund.status !== 'pending') {
      return ctx.badRequest('只能处理待处理的退款申请');
    }
    
    let updateData: any = {
      processedBy: user.id,
      processNote,
      processedAt: new Date()
    };
    
    if (action === 'approve') {
      updateData.status = 'approved';
      
      // 调用退款服务处理实际退款
      try {
        const refundResult = await strapi.service('api::refund.refund').processApprovedRefund(refund);
        if (refundResult.success) {
          updateData.status = 'completed';
        }
      } catch (error) {
        strapi.log.error('处理退款失败:', error);
        return ctx.internalServerError('处理退款失败');
      }
    } else {
      updateData.status = 'rejected';
    }
    
    const result = await strapi.entityService.update('api::refund.refund', id, {
      data: updateData,
      populate: ['order', 'user', 'payment', 'processedBy']
    });
    
    // 发送处理结果通知给用户
    await this.sendRefundResultNotification(result);
    
    return result;
  },

  /**
   * 获取管理员退款统计
   */
  async getAdminStats(ctx) {
    const { user } = ctx.state;
    
    if (!user || !this.isAdmin(user)) {
      return ctx.forbidden('需要管理员权限');
    }
    
    const { startDate, endDate } = ctx.query;
    
    const stats = await strapi.service('api::refund.refund').getRefundStats(startDate, endDate);
    
    return stats;
  },

  /**
   * 管理员获取所有退款记录
   */
  async findAll(ctx) {
    const { user } = ctx.state;
    
    if (!user || !this.isAdmin(user)) {
      return ctx.forbidden('需要管理员权限');
    }
    
    const { pagination, filters, sort } = ctx.query;
    
    const results = await strapi.entityService.findMany('api::refund.refund', {
      filters: filters && typeof filters === 'object' ? filters : {},
      populate: ['order', 'user', 'payment', 'processedBy'],
      pagination,
      sort: sort || [{ createdAt: 'desc' }]
    });
    
    return results;
  },

  /**
   * 发送退款申请通知给管理员
   */
  async sendRefundNotificationToAdmin(refund) {
    try {
      // 获取管理员邮箱
      const admins = await strapi.query('plugin::users-permissions.user').findMany({
        where: {
          role: {
            type: 'admin'
          }
        }
      });
      
      const adminEmails = admins.map(admin => admin.email);
      
      if (adminEmails.length > 0) {
        await strapi.plugins['email'].services.email.send({
          to: adminEmails,
          subject: '新的退款申请',
          template: 'refund-request-admin',
          data: {
            refund,
            order: refund.order,
            user: refund.user,
            refundAmount: (refund.refundAmount / 100).toFixed(2),
            adminUrl: `${process.env.FRONTEND_URL}/admin/refunds/${refund.id}`
          }
        });
      }
    } catch (error) {
      strapi.log.error('发送退款申请通知失败:', error);
    }
  },

  /**
   * 发送退款处理结果通知给用户
   */
  async sendRefundResultNotification(refund) {
    try {
      const templateName = refund.status === 'completed' ? 'refund-approved' : 'refund-rejected';
      
      await strapi.plugins['email'].services.email.send({
        to: refund.user.email,
        subject: refund.status === 'completed' ? '退款申请已通过' : '退款申请已拒绝',
        template: templateName,
        data: {
          user: refund.user,
          refund,
          order: refund.order,
          refundAmount: (refund.refundAmount / 100).toFixed(2),
          processNote: refund.processNote
        }
      });
    } catch (error) {
      strapi.log.error('发送退款结果通知失败:', error);
    }
  },

  /**
   * 检查是否是管理员
   */
  isAdmin(user) {
    return user.role?.type === 'admin' || user.role?.name === 'Super Admin';
  }
}));