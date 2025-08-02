/**
 * 微信支付回调控制器
 * 专门处理微信支付的异步通知回调
 */

export default ({ strapi }) => ({
  /**
   * 微信支付异步通知回调
   * POST /api/payments/wechat/callback
   */
  async callback(ctx) {
    try {
      const notifyData = ctx.request.body;
      const headers = ctx.request.headers;
      
      strapi.log.info('收到微信支付回调通知:', { 
        eventType: notifyData.event_type,
        headers: {
          'wechatpay-signature': headers['wechatpay-signature'],
          'wechatpay-timestamp': headers['wechatpay-timestamp'],
          'wechatpay-nonce': headers['wechatpay-nonce']
        }
      });

      // 验证回调数据
      if (!notifyData.event_type) {
        strapi.log.error('微信支付回调数据不完整:', notifyData);
        ctx.status = 400;
        ctx.body = { code: 'FAIL', message: '回调数据不完整' };
        return;
      }

      // 处理支付回调
      const success = await strapi.service('api::payments.payments').handlePaymentCallback('wechat', notifyData);

      if (success) {
        strapi.log.info(`微信支付回调处理成功: ${notifyData.event_type}`);
        ctx.status = 200;
        ctx.body = { code: 'SUCCESS', message: '成功' }; // 微信支付要求返回SUCCESS
      } else {
        strapi.log.error(`微信支付回调处理失败: ${notifyData.event_type}`);
        ctx.status = 400;
        ctx.body = { code: 'FAIL', message: '处理失败' };
      }
    } catch (error) {
      strapi.log.error('微信支付回调处理异常:', error);
      ctx.status = 500;
      ctx.body = { code: 'FAIL', message: '系统错误' };
    }
  },

  /**
   * 微信支付退款回调
   * POST /api/payments/wechat/refund-callback
   */
  async refundCallback(ctx) {
    try {
      const notifyData = ctx.request.body;
      
      strapi.log.info('收到微信支付退款回调:', notifyData);

      // 处理退款回调
      if (notifyData.event_type === 'REFUND.SUCCESS') {
        // 处理退款成功逻辑
        const refundData = notifyData.resource;
        if (refundData && refundData.out_refund_no) {
          // 更新退款记录状态
          strapi.log.info('微信退款成功:', { refundNo: refundData.out_refund_no });
        }
      }

      ctx.status = 200;
      ctx.body = { code: 'SUCCESS', message: '成功' };
    } catch (error) {
      strapi.log.error('微信支付退款回调处理异常:', error);
      ctx.status = 500;
      ctx.body = { code: 'FAIL', message: '系统错误' };
    }
  },

  /**
   * 微信支付同步跳转回调（H5支付完成后的页面跳转）
   * GET /api/payments/wechat/return
   */
  async return(ctx) {
    try {
      const { out_trade_no, trade_state } = ctx.query;
      
      strapi.log.info('收到微信支付同步回调:', ctx.query);

      // 构建前端跳转URL
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      let redirectUrl = '';

      if (trade_state === 'SUCCESS') {
        // 支付成功，跳转到成功页面
        redirectUrl = `${frontendUrl}/payment/success?paymentNo=${out_trade_no}`;
      } else {
        // 支付失败或其他状态，跳转到对应页面
        redirectUrl = `${frontendUrl}/payment/failed?paymentNo=${out_trade_no}&status=${trade_state}`;
      }

      // 重定向到前端页面
      ctx.redirect(redirectUrl);
    } catch (error) {
      strapi.log.error('微信支付同步回调处理异常:', error);
      
      // 发生错误时跳转到错误页面
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      ctx.redirect(`${frontendUrl}/payment/error`);
    }
  },

  /**
   * 微信支付取消回调
   * GET /api/payments/wechat/cancel
   */
  async cancel(ctx) {
    try {
      const { out_trade_no } = ctx.query;
      
      strapi.log.info('用户取消微信支付:', { paymentNo: out_trade_no });

      // 构建前端取消页面URL
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      const redirectUrl = `${frontendUrl}/payment/cancel?paymentNo=${out_trade_no}`;

      // 重定向到前端取消页面
      ctx.redirect(redirectUrl);
    } catch (error) {
      strapi.log.error('微信支付取消回调处理异常:', error);
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      ctx.redirect(`${frontendUrl}/payment/error`);
    }
  }
});