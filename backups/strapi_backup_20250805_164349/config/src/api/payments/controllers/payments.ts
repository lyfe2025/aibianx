/**
 * 支付API控制器
 * 提供前端统一的支付接口
 */

export default ({ strapi }) => ({
  /**
   * 创建支付订单
   * POST /api/payments/create
   */
  async create(ctx) {
    try {
      const { user } = ctx.state;
      const { orderId, paymentMethod, amount, currency = 'CNY', productName, returnUrl, cancelUrl } = ctx.request.body;

      // 验证用户登录
      if (!user) {
        return ctx.unauthorized('请先登录');
      }

      // 验证必要参数
      if (!orderId || !paymentMethod || !amount || !productName) {
        return ctx.badRequest('缺少必要参数：orderId, paymentMethod, amount, productName');
      }

      // 验证订单是否存在且属于当前用户
      const order = await strapi.entityService.findOne('api::order.order', orderId, {
        populate: ['user']
      });

      if (!order) {
        return ctx.notFound('订单不存在');
      }

      if (order.user.id !== user.id) {
        return ctx.forbidden('无权限访问此订单');
      }

      if (order.status !== 'pending') {
        return ctx.badRequest('订单状态不允许支付');
      }

      // 构建支付数据
      const paymentData = {
        orderId: order.id,
        userId: user.id,
        amount: Math.round(amount * 100), // 转换为分
        currency,
        productName,
        productId: order.productType,
        clientIp: strapi.service('api::payments.payments').getClientIp(ctx),
        userAgent: strapi.service('api::payments.payments').getUserAgent(ctx),
        returnUrl: returnUrl || `${process.env.FRONTEND_URL}/payment/success`,
        cancelUrl: cancelUrl || `${process.env.FRONTEND_URL}/payment/cancel`
      };

      // 验证支付数据
      const validation = strapi.service('api::payments.payments').validatePaymentData(paymentData);
      if (!validation.valid) {
        return ctx.badRequest(validation.errors.join(', '));
      }

      // 创建支付
      const result = await strapi.service('api::payments.payments').createPayment(paymentMethod, paymentData);

      if (result.success) {
        ctx.status = 200;
        return {
          success: true,
          data: {
            paymentId: result.paymentId,
            paymentData: result.paymentData,
            message: '支付创建成功'
          }
        };
      } else {
        return ctx.badRequest(result.message || '支付创建失败');
      }
    } catch (error) {
      strapi.log.error('创建支付错误:', error);
      return ctx.internalServerError('支付创建失败，请稍后重试');
    }
  },

  /**
   * 查询支付状态
   * GET /api/payments/status/:paymentNo
   */
  async getStatus(ctx) {
    try {
      const { paymentNo } = ctx.params;
      const { user } = ctx.state;

      // 验证用户登录
      if (!user) {
        return ctx.unauthorized('请先登录');
      }

      if (!paymentNo) {
        return ctx.badRequest('支付流水号不能为空');
      }

      // 验证支付记录是否属于当前用户
      const payments = await strapi.entityService.findMany('api::payment.payment', {
        filters: { paymentNo },
        populate: ['user', 'order']
      });

      if (!payments || payments.length === 0) {
        return ctx.notFound('支付记录不存在');
      }

      const payment = payments[0];
      if (payment.user.id !== user.id) {
        return ctx.forbidden('无权限访问此支付记录');
      }

      // 查询支付状态
      const status = await strapi.service('api::payments.payments').queryPaymentStatus(paymentNo);

      return {
        success: true,
        data: {
          paymentNo: status.paymentNo,
          status: status.status,
          amount: status.amount,
          orderId: payment.order.id,
          orderNo: payment.order.orderNo,
          thirdPartyTransactionId: status.thirdPartyTransactionId,
          completedAt: status.completedAt,
          message: status.message
        }
      };
    } catch (error) {
      strapi.log.error('查询支付状态错误:', error);
      return ctx.internalServerError('查询支付状态失败');
    }
  },

  /**
   * 支付回调处理
   * POST /api/payments/callback/:method
   */
  async handleCallback(ctx) {
    try {
      const { method } = ctx.params;
      const callbackData = ctx.request.body;

      strapi.log.info(`收到${method}支付回调:`, callbackData);

      // 处理支付回调
      const success = await strapi.service('api::payments.payments').handlePaymentCallback(method, callbackData);

      if (success) {
        // 不同支付方式可能需要不同的响应格式
        switch (method) {
          case 'alipay':
            ctx.body = 'success';
            break;
          case 'wechat':
            ctx.body = { code: 'SUCCESS', message: '成功' };
            break;
          case 'stripe':
            ctx.body = { received: true };
            break;
          default:
            ctx.body = 'success';
        }
      } else {
        ctx.status = 400;
        ctx.body = 'failed';
      }
    } catch (error) {
      strapi.log.error('处理支付回调错误:', error);
      ctx.status = 500;
      ctx.body = 'error';
    }
  },

  /**
   * 用户支付历史
   * GET /api/payments/history
   */
  async getHistory(ctx) {
    try {
      const { user } = ctx.state;
      const { page = 1, pageSize = 10, status } = ctx.query;

      if (!user) {
        return ctx.unauthorized('请先登录');
      }

      const filters: any = { user: user.id };
      if (status) {
        filters.status = status;
      }

      const { results, pagination } = await strapi.entityService.findPage('api::payment.payment', {
        filters,
        populate: ['order'],
        sort: { createdAt: 'desc' },
        page: parseInt(page),
        pageSize: Math.min(parseInt(pageSize), 50)
      });

      const payments = results.map(payment => ({
        id: payment.id,
        paymentNo: payment.paymentNo,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        createdAt: payment.createdAt,
        completedAt: payment.completedAt,
        order: {
          id: payment.order.id,
          orderNo: payment.order.orderNo,
          productType: payment.order.productType
        }
      }));

      return {
        success: true,
        data: payments,
        pagination
      };
    } catch (error) {
      strapi.log.error('获取支付历史错误:', error);
      return ctx.internalServerError('获取支付历史失败');
    }
  },

  /**
   * 取消支付
   * POST /api/payments/cancel/:paymentNo
   */
  async cancel(ctx) {
    try {
      const { paymentNo } = ctx.params;
      const { user } = ctx.state;

      if (!user) {
        return ctx.unauthorized('请先登录');
      }

      if (!paymentNo) {
        return ctx.badRequest('支付流水号不能为空');
      }

      // 验证支付记录
      const payments = await strapi.entityService.findMany('api::payment.payment', {
        filters: { paymentNo },
        populate: ['user', 'order']
      });

      if (!payments || payments.length === 0) {
        return ctx.notFound('支付记录不存在');
      }

      const payment = payments[0];
      if (payment.user.id !== user.id) {
        return ctx.forbidden('无权限操作此支付记录');
      }

      if (payment.status !== 'pending') {
        return ctx.badRequest('当前状态不允许取消支付');
      }

      // 更新支付状态为已取消
      await strapi.entityService.update('api::payment.payment', payment.id, {
        data: {
          status: 'cancelled',
          cancelledAt: new Date()
        }
      });

      strapi.log.info(`支付已取消: ${paymentNo}`);

      return {
        success: true,
        message: '支付已取消'
      };
    } catch (error) {
      strapi.log.error('取消支付错误:', error);
      return ctx.internalServerError('取消支付失败');
    }
  },

  /**
   * 申请退款
   * POST /api/payments/refund/:paymentNo
   */
  async requestRefund(ctx) {
    try {
      const { paymentNo } = ctx.params;
      const { user } = ctx.state;
      const { refundAmount, reason } = ctx.request.body;

      if (!user) {
        return ctx.unauthorized('请先登录');
      }

      if (!paymentNo) {
        return ctx.badRequest('支付流水号不能为空');
      }

      // 验证支付记录
      const payments = await strapi.entityService.findMany('api::payment.payment', {
        filters: { paymentNo },
        populate: ['user', 'order']
      });

      if (!payments || payments.length === 0) {
        return ctx.notFound('支付记录不存在');
      }

      const payment = payments[0];
      if (payment.user.id !== user.id) {
        return ctx.forbidden('无权限操作此支付记录');
      }

      if (payment.status !== 'success') {
        return ctx.badRequest('只有支付成功的订单才能申请退款');
      }

      const finalRefundAmount = refundAmount ? Math.round(refundAmount * 100) : payment.amount;

      // 处理退款
      const result = await strapi.service('api::payments.payments').processRefund(
        paymentNo, 
        finalRefundAmount, 
        reason || '用户申请退款'
      );

      if (result.success) {
        return {
          success: true,
          data: {
            refundId: result.refundId,
            refundAmount: result.refundAmount,
            message: '退款申请成功'
          }
        };
      } else {
        return ctx.badRequest(result.message || '退款申请失败');
      }
    } catch (error) {
      strapi.log.error('申请退款错误:', error);
      return ctx.internalServerError('退款申请失败');
    }
  }
});