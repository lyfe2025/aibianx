/**
 * 支付宝回调控制器
 * 专门处理支付宝的异步通知回调
 */

export default ({ strapi }) => ({
  /**
   * 支付宝异步通知回调
   * POST /api/payments/alipay/callback
   */
  async callback(ctx) {
    try {
      const notifyData = ctx.request.body;
      
      strapi.log.info('收到支付宝回调通知:', notifyData);

      // 验证回调数据
      if (!notifyData.out_trade_no || !notifyData.trade_status) {
        strapi.log.error('支付宝回调数据不完整:', notifyData);
        ctx.status = 400;
        ctx.body = 'fail';
        return;
      }

      // 处理支付回调
      const success = await strapi.service('api::payments.payments').handlePaymentCallback('alipay', notifyData);

      if (success) {
        strapi.log.info(`支付宝回调处理成功: ${notifyData.out_trade_no}`);
        ctx.status = 200;
        ctx.body = 'success'; // 支付宝要求返回success
      } else {
        strapi.log.error(`支付宝回调处理失败: ${notifyData.out_trade_no}`);
        ctx.status = 400;
        ctx.body = 'fail';
      }
    } catch (error) {
      strapi.log.error('支付宝回调处理异常:', error);
      ctx.status = 500;
      ctx.body = 'fail';
    }
  },

  /**
   * 支付宝同步跳转回调（用户支付完成后的页面跳转）
   * GET /api/payments/alipay/return
   */
  async return(ctx) {
    try {
      const { out_trade_no, trade_no, trade_status } = ctx.query;
      
      strapi.log.info('收到支付宝同步回调:', ctx.query);

      // 构建前端跳转URL
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      let redirectUrl = '';

      if (trade_status === 'TRADE_SUCCESS') {
        // 支付成功，跳转到成功页面
        redirectUrl = `${frontendUrl}/payment/success?paymentNo=${out_trade_no}&tradeNo=${trade_no}`;
      } else {
        // 支付失败或取消，跳转到失败页面
        redirectUrl = `${frontendUrl}/payment/failed?paymentNo=${out_trade_no}&status=${trade_status}`;
      }

      // 重定向到前端页面
      ctx.redirect(redirectUrl);
    } catch (error) {
      strapi.log.error('支付宝同步回调处理异常:', error);
      
      // 发生错误时跳转到错误页面
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      ctx.redirect(`${frontendUrl}/payment/error`);
    }
  },

  /**
   * 支付宝支付取消回调
   * GET /api/payments/alipay/cancel
   */
  async cancel(ctx) {
    try {
      const { out_trade_no } = ctx.query;
      
      strapi.log.info('用户取消支付宝支付:', { paymentNo: out_trade_no });

      // 构建前端取消页面URL
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      const redirectUrl = `${frontendUrl}/payment/cancel?paymentNo=${out_trade_no}`;

      // 重定向到前端取消页面
      ctx.redirect(redirectUrl);
    } catch (error) {
      strapi.log.error('支付宝取消回调处理异常:', error);
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
      ctx.redirect(`${frontendUrl}/payment/error`);
    }
  }
});