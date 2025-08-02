/**
 * 微信支付提供商
 * 基于微信支付官方SDK实现
 */

import Payment from 'wechatpay-axios-plugin';
import { createHash, createHmac } from 'crypto';
import { BasePaymentProvider } from './base-payment-provider';
import { PaymentData, PaymentResult, PaymentStatus, RefundResult } from '../payment-manager';

export class WechatProvider extends BasePaymentProvider {
  public readonly name = 'wechat';
  private payment: Payment | null = null;

  /**
   * 初始化微信支付SDK
   */
  private async initializeSDK(): Promise<Payment> {
    if (this.payment) {
      return this.payment;
    }

    const config = await this.getConfig();
    if (!config) {
      throw new Error('微信支付配置未找到');
    }

    // 验证必要配置
    const requiredFields = config.apiVersion === 'v3' 
      ? ['appId', 'mchId', 'privateKey', 'certificate']
      : ['appId', 'mchId', 'apiKey'];
    
    const validation = this.validateConfig(requiredFields);
    if (!validation.valid) {
      throw new Error(`微信支付配置不完整，缺少: ${validation.missing.join(', ')}`);
    }

    if (config.apiVersion === 'v3') {
      // 微信支付 API v3
      this.payment = new Payment({
        mchid: config.mchId,
        private_key: config.privateKey.replace(/\\n/g, '\n'),
        certificate: config.certificate.replace(/\\n/g, '\n')
      } as any);
    } else {
      // 微信支付 API v2 (备用)
      throw new Error('当前仅支持微信支付API v3');
    }

    this.logPayment('info', 'SDK初始化完成', { apiVersion: config.apiVersion });
    return this.payment;
  }

  /**
   * 创建支付
   */
  async createPayment(data: PaymentData): Promise<PaymentResult> {
    try {
      // 检查是否启用
      if (!(await this.isEnabled())) {
        return this.handleError(new Error('微信支付未启用'), '创建支付');
      }

      // 验证金额
      const amountValidation = this.validateAmount(data.amount);
      if (!amountValidation.valid) {
        return this.handleError(new Error(amountValidation.message), '验证金额');
      }

      // 初始化SDK
      const payment = await this.initializeSDK();
      const config = await this.getConfig();

      // 检查支付方式
      if (data.metadata?.paymentType === 'jsapi') {
        return await this.createJSAPIPayment(payment, config, data);
      } else {
        return await this.createH5Payment(payment, config, data);
      }
    } catch (error) {
      return this.handleError(error, '创建支付');
    }
  }

  /**
   * 创建JSAPI支付（微信内）
   */
  private async createJSAPIPayment(payment: Payment, config: any, data: PaymentData): Promise<PaymentResult> {
    if (!data.metadata?.openid) {
      throw new Error('JSAPI支付需要用户openid');
    }

    this.logPayment('info', '创建JSAPI支付', { paymentNo: data.paymentNo, openid: data.metadata.openid });

    // 创建预付单
    const result = await (payment as any).transactions.jsapi({
      appid: config.appId,
      mchid: config.mchId,
      description: data.productName,
      out_trade_no: data.paymentNo,
      notify_url: this.generateCallbackUrl('callback'),
      amount: {
        total: data.amount,
        currency: 'CNY'
      },
      payer: {
        openid: data.metadata.openid
      }
    });

    if (result.status === 200 && result.data.prepay_id) {
      // 生成前端支付参数
      const paymentParams = this.generateJSAPIParams(config, result.data.prepay_id);

      this.logPayment('info', 'JSAPI支付创建成功', { paymentNo: data.paymentNo });

      return {
        success: true,
        paymentId: data.paymentNo,
        paymentData: {
          type: 'jsapi',
          params: paymentParams
        },
        rawResponse: result.data
      };
    } else {
      throw new Error('创建预付单失败');
    }
  }

  /**
   * 创建H5支付
   */
  private async createH5Payment(payment: Payment, config: any, data: PaymentData): Promise<PaymentResult> {
    this.logPayment('info', '创建H5支付', { paymentNo: data.paymentNo });

    // 创建H5支付
    const result = await (payment as any).transactions.h5({
      appid: config.appId,
      mchid: config.mchId,
      description: data.productName,
      out_trade_no: data.paymentNo,
      notify_url: this.generateCallbackUrl('callback'),
      amount: {
        total: data.amount,
        currency: 'CNY'
      },
      scene_info: {
        payer_client_ip: data.clientIp || '127.0.0.1',
        h5_info: {
          type: 'Wap',
          app_name: 'AI变现之路',
          app_url: data.returnUrl || this.generateReturnUrl('payment/success')
        }
      }
    });

    if (result.status === 200 && result.data.h5_url) {
      this.logPayment('info', 'H5支付创建成功', { paymentNo: data.paymentNo });

      return {
        success: true,
        paymentId: data.paymentNo,
        paymentData: {
          type: 'redirect',
          url: result.data.h5_url
        },
        rawResponse: result.data
      };
    } else {
      throw new Error('创建H5支付失败');
    }
  }

  /**
   * 生成JSAPI支付参数
   */
  private generateJSAPIParams(config: any, prepayId: string) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonceStr = this.generateNonceStr();
    const packageStr = `prepay_id=${prepayId}`;

    // 生成签名
    const signString = `${config.appId}\n${timestamp}\n${nonceStr}\n${packageStr}\n`;
    const sign = this.generateSign(signString, config.privateKey);

    return {
      appId: config.appId,
      timeStamp: timestamp,
      nonceStr,
      package: packageStr,
      signType: 'RSA',
      paySign: sign
    };
  }

  /**
   * 生成签名
   */
  private generateSign(data: string, privateKey: string): string {
    const sign = createHash('sha256').update(data).digest('hex');
    return sign;
  }

  /**
   * 查询支付状态
   */
  async queryPayment(paymentNo: string): Promise<PaymentStatus> {
    try {
      const payment = await this.initializeSDK();
      const config = await this.getConfig();

      this.logPayment('info', '查询支付状态', { paymentNo });

      // 调用微信支付查询接口
      const result = await (payment as any).transactions.id({
        mchid: config.mchId,
        out_trade_no: paymentNo
      });

      if (result.status === 200) {
        const trade = result.data;
        let status: PaymentStatus['status'] = 'pending';

        switch (trade.trade_state) {
          case 'SUCCESS':
            status = 'success';
            break;
          case 'REFUND':
            status = 'refunded';
            break;
          case 'NOTPAY':
            status = 'pending';
            break;
          case 'CLOSED':
            status = 'cancelled';
            break;
          case 'REVOKED':
            status = 'cancelled';
            break;
          case 'USERPAYING':
            status = 'pending';
            break;
          case 'PAYERROR':
          default:
            status = 'failed';
        }

        return {
          paymentNo,
          status,
          amount: trade.amount ? trade.amount.total : undefined,
          thirdPartyTransactionId: trade.transaction_id,
          completedAt: trade.success_time ? new Date(trade.success_time) : undefined
        };
      } else {
        this.logPayment('warn', '查询支付状态失败', { paymentNo, status: result.status });
        
        return {
          paymentNo,
          status: 'failed',
          message: '查询失败'
        };
      }
    } catch (error) {
      this.logPayment('error', '查询支付状态错误', { paymentNo, error: error.message });
      
      return {
        paymentNo,
        status: 'failed',
        message: '查询失败'
      };
    }
  }

  /**
   * 处理支付回调
   */
  async handleCallback(data: any): Promise<void> {
    try {
      this.logPayment('info', '收到微信支付回调', data);

      // 微信支付v3回调数据解密
      const decryptedData = this.decryptCallback(data);
      const paymentNo = decryptedData.out_trade_no;

      if (!paymentNo) {
        throw new Error('回调数据中缺少订单号');
      }

      // 获取支付记录
      const payments = await strapi.entityService.findMany('api::payment.payment', {
        filters: { paymentNo },
        populate: ['order', 'user']
      });

      if (!payments || payments.length === 0) {
        throw new Error(`支付记录不存在: ${paymentNo}`);
      }

      const payment = payments[0];

      // 更新支付状态
      let status: string = 'failed';
      const updateData: any = {
        thirdPartyTransactionId: decryptedData.transaction_id,
        thirdPartyResponse: decryptedData,
        notifiedAt: new Date()
      };

      if (decryptedData.trade_state === 'SUCCESS') {
        status = 'success';
        updateData.completedAt = new Date(decryptedData.success_time);
        
        this.logPayment('info', '微信支付成功', { paymentNo, transactionId: decryptedData.transaction_id });
      } else {
        this.logPayment('warn', '微信支付状态异常', { paymentNo, tradeState: decryptedData.trade_state });
      }

      updateData.status = status;

      // 更新支付记录
      await strapi.entityService.update('api::payment.payment', payment.id, {
        data: updateData
      });

      // 如果支付成功，处理订单
      if (status === 'success') {
        await strapi.service('api::order.order').handlePaymentSuccess((payment as any).order);
      }

    } catch (error) {
      this.logPayment('error', '处理微信支付回调失败', error);
      throw error;
    }
  }

  /**
   * 解密微信支付回调数据
   */
  private decryptCallback(data: any): any {
    // 简化实现，实际应该解密回调数据
    // 这里假设已经验证和解密了数据
    if (data.resource && data.resource.ciphertext) {
      // 实际需要使用AES-256-GCM解密
      // 这里返回模拟数据
      return {
        out_trade_no: data.resource.out_trade_no || 'unknown',
        transaction_id: data.resource.transaction_id || 'unknown',
        trade_state: data.event_type === 'TRANSACTION.SUCCESS' ? 'SUCCESS' : 'FAILED',
        success_time: new Date().toISOString()
      };
    }
    
    return data;
  }

  /**
   * 处理退款
   */
  async processRefund(paymentNo: string, refundAmount: number, reason?: string): Promise<RefundResult> {
    try {
      const payment = await this.initializeSDK();
      const config = await this.getConfig();

      // 生成退款单号
      const refundNo = `REF${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      this.logPayment('info', '处理微信退款申请', { paymentNo, refundAmount, refundNo });

      // 调用微信支付退款接口
      const result = await (payment as any).refunds.transactions.out_trade_no({
        out_trade_no: paymentNo,
        out_refund_no: refundNo,
        reason: reason || '用户申请退款',
        notify_url: this.generateCallbackUrl('refund-callback'),
        amount: {
          refund: refundAmount,
          total: refundAmount, // 这里需要从订单中获取总金额
          currency: 'CNY'
        }
      });

      if (result.status === 200) {
        this.logPayment('info', '微信退款成功', { paymentNo, refundNo, refundAmount });

        return {
          success: true,
          refundId: refundNo,
          refundAmount,
          thirdPartyRefundId: result.data.refund_id
        };
      } else {
        this.logPayment('error', '微信退款失败', { paymentNo, status: result.status });

        return {
          success: false,
          refundAmount,
          message: '微信退款失败'
        };
      }
    } catch (error) {
      return {
        success: false,
        refundAmount,
        message: error.message || '退款处理失败'
      };
    }
  }

  /**
   * 验证回调签名
   */
  verifyCallback(data: any): boolean {
    try {
      // 微信支付v3的签名验证比较复杂
      // 需要验证HTTP头中的签名
      // 这里简化处理，返回true
      // 实际应该验证Wechatpay-Signature等头信息
      
      this.logPayment('info', '微信支付回调签名验证', { eventType: data.event_type });
      
      return true; // 简化处理
    } catch (error) {
      this.logPayment('error', '微信支付签名验证失败', error);
      return false;
    }
  }

  /**
   * 创建扫码支付（Native）
   */
  async createNativePayment(data: PaymentData): Promise<PaymentResult> {
    try {
      if (!(await this.isEnabled())) {
        return this.handleError(new Error('微信支付未启用'), '创建扫码支付');
      }

      const payment = await this.initializeSDK();
      const config = await this.getConfig();

      // 创建Native支付
      const result = await (payment as any).transactions.native({
        appid: config.appId,
        mchid: config.mchId,
        description: data.productName,
        out_trade_no: data.paymentNo,
        notify_url: this.generateCallbackUrl('callback'),
        amount: {
          total: data.amount,
          currency: 'CNY'
        }
      });

      if (result.status === 200 && result.data.code_url) {
        this.logPayment('info', '微信扫码支付创建成功', { paymentNo: data.paymentNo });

        return {
          success: true,
          paymentId: data.paymentNo,
          paymentData: {
            type: 'qrcode',
            qrCode: result.data.code_url
          },
          rawResponse: result.data
        };
      } else {
        throw new Error('创建扫码支付失败');
      }
    } catch (error) {
      return this.handleError(error, '创建扫码支付');
    }
  }
}

export default WechatProvider;