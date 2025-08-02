/**
 * 基础支付提供商抽象类
 * 所有支付提供商都应该继承这个类
 */

import { Strapi } from '@strapi/strapi';
import { PaymentProvider, PaymentData, PaymentResult, PaymentStatus, RefundResult } from '../payment-manager';

export abstract class BasePaymentProvider implements PaymentProvider {
  public abstract readonly name: string;
  protected strapi: Strapi;
  protected config: any;

  constructor(strapi: Strapi) {
    strapi = strapi;
  }

  /**
   * 获取支付配置
   */
  protected async getConfig(): Promise<any> {
    if (!this.config) {
      this.config = await strapi.service('api::payment-config.payment-config')
        .getPaymentMethodConfig(this.name);
    }
    return this.config;
  }

  /**
   * 检查支付方式是否启用
   */
  protected async isEnabled(): Promise<boolean> {
    const config = await this.getConfig();
    return config?.enabled && config?.configStatus === 'active';
  }

  /**
   * 验证必要配置项
   */
  protected validateConfig(requiredFields: string[]): { valid: boolean; missing: string[] } {
    const missing: string[] = [];
    
    for (const field of requiredFields) {
      if (!this.config || !this.config[field]) {
        missing.push(field);
      }
    }

    return {
      valid: missing.length === 0,
      missing
    };
  }

  /**
   * 记录支付日志
   */
  protected logPayment(level: 'info' | 'error' | 'warn', message: string, data?: any) {
    const logMessage = `[${this.name}] ${message}`;
    
    switch (level) {
      case 'info':
        strapi.log.info(logMessage, data);
        break;
      case 'error':
        strapi.log.error(logMessage, data);
        break;
      case 'warn':
        strapi.log.warn(logMessage, data);
        break;
    }
  }

  /**
   * 处理支付错误
   */
  protected handleError(error: any, context: string): PaymentResult {
    this.logPayment('error', `${context}失败`, error);
    
    return {
      success: false,
      message: error.message || `${context}失败`,
      rawResponse: error
    };
  }

  /**
   * 生成回调URL
   */
  protected generateCallbackUrl(path: string): string {
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:1337';
    return `${baseUrl}/api/payment/${this.name}/${path}`;
  }

  /**
   * 生成前端跳转URL
   */
  protected generateReturnUrl(path: string, params?: Record<string, string>): string {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost';
    let url = `${baseUrl}/${path}`;
    
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    
    return url;
  }

  /**
   * 验证支付金额
   */
  protected validateAmount(amount: number): { valid: boolean; message?: string } {
    if (!amount || amount <= 0) {
      return { valid: false, message: '支付金额必须大于0' };
    }

    // 这里可以添加更多金额验证逻辑
    if (amount > 100000000) { // 100万元
      return { valid: false, message: '支付金额超过限制' };
    }

    return { valid: true };
  }

  /**
   * 格式化金额（根据不同支付方式的要求）
   */
  protected formatAmount(amount: number, currency: string = 'CNY'): string {
    // 大部分支付方式要求金额为分，但格式化为字符串时需要转换为元
    return (amount / 100).toFixed(2);
  }

  /**
   * 生成随机字符串
   */
  protected generateNonceStr(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 获取当前时间戳
   */
  protected getTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * 延迟执行
   */
  protected async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 抽象方法，由具体支付提供商实现
  abstract createPayment(data: PaymentData): Promise<PaymentResult>;
  abstract queryPayment(paymentNo: string): Promise<PaymentStatus>;
  abstract handleCallback(data: any): Promise<void>;
  abstract processRefund(paymentNo: string, refundAmount: number, reason?: string): Promise<RefundResult>;
  abstract verifyCallback(data: any): boolean;
}

export default BasePaymentProvider;