/**
 * 邮件订阅 Hook - 集成 BillionMail
 * 提供邮件订阅、验证码发送等功能
 */

import { useState, useCallback } from 'react';
import { 
  subscribeEmail, 
  unsubscribeEmail, 
  sendVerificationCode, 
  sendLoginVerificationCode,
  sendWelcomeEmail,
  getSubscriberStatus,
  validateEmail,
  validateVerificationCode,
  type SubscribeData,
  type BillionMailApiResponse,
  type VerificationCodeResponse
} from '@/lib/billionmail';

interface UseEmailSubscriptionReturn {
  // 状态
  isLoading: boolean;
  error: string | null;
  
  // 订阅相关
  subscribe: (data: SubscribeData) => Promise<{ success: boolean; message?: string }>;
  unsubscribe: (email: string) => Promise<{ success: boolean; message?: string }>;
  checkSubscriptionStatus: (email: string) => Promise<{ success: boolean; data?: any; message?: string }>;
  
  // 验证码相关
  sendVerification: (email: string, userName: string) => Promise<{ success: boolean; verificationCode?: string; message?: string }>;
  sendLoginVerification: (email: string, userName: string) => Promise<{ success: boolean; verificationCode?: string; message?: string }>;
  
  // 欢迎邮件
  sendWelcome: (email: string, userName: string) => Promise<{ success: boolean; message?: string }>;
  
  // 工具函数
  validateEmailFormat: (email: string) => boolean;
  validateCodeFormat: (code: string) => boolean;
}

/**
 * 邮件订阅 Hook
 */
export function useEmailSubscription(): UseEmailSubscriptionReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 重置错误状态
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  // 邮件订阅
  const subscribe = useCallback(async (data: SubscribeData) => {
    setIsLoading(true);
    resetError();

    try {
      const result = await subscribeEmail(data);
      
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        setError(result.error || '订阅失败');
        return { success: false, message: result.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '订阅失败，请稍后重试';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [resetError]);

  // 取消订阅
  const unsubscribe = useCallback(async (email: string) => {
    setIsLoading(true);
    resetError();

    try {
      const result = await unsubscribeEmail(email);
      
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        setError(result.error || '取消订阅失败');
        return { success: false, message: result.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '取消订阅失败，请稍后重试';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [resetError]);

  // 检查订阅状态
  const checkSubscriptionStatus = useCallback(async (email: string) => {
    setIsLoading(true);
    resetError();

    try {
      const result = await getSubscriberStatus(email);
      
      if (result.success) {
        return { 
          success: true, 
          data: result.data, 
          message: result.message 
        };
      } else {
        setError(result.error || '获取订阅状态失败');
        return { success: false, message: result.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取订阅状态失败';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [resetError]);

  // 发送注册验证码
  const sendVerification = useCallback(async (email: string, userName: string) => {
    setIsLoading(true);
    resetError();

    try {
      const result = await sendVerificationCode(email, userName);
      
      if (result.success) {
        return { 
          success: true, 
          verificationCode: result.verificationCode,
          message: result.message 
        };
      } else {
        setError(result.message || '验证码发送失败');
        return { success: false, message: result.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '验证码发送失败';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [resetError]);

  // 发送登录验证码
  const sendLoginVerification = useCallback(async (email: string, userName: string) => {
    setIsLoading(true);
    resetError();

    try {
      const result = await sendLoginVerificationCode(email, userName);
      
      if (result.success) {
        return { 
          success: true, 
          verificationCode: result.verificationCode,
          message: result.message 
        };
      } else {
        setError(result.message || '登录验证码发送失败');
        return { success: false, message: result.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '登录验证码发送失败';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [resetError]);

  // 发送欢迎邮件
  const sendWelcome = useCallback(async (email: string, userName: string) => {
    setIsLoading(true);
    resetError();

    try {
      const result = await sendWelcomeEmail(email, userName);
      
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        setError(result.error || '欢迎邮件发送失败');
        return { success: false, message: result.error };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '欢迎邮件发送失败';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [resetError]);

  // 验证邮箱格式
  const validateEmailFormat = useCallback((email: string) => {
    return validateEmail(email);
  }, []);

  // 验证验证码格式
  const validateCodeFormat = useCallback((code: string) => {
    return validateVerificationCode(code);
  }, []);

  return {
    // 状态
    isLoading,
    error,
    
    // 订阅相关
    subscribe,
    unsubscribe,
    checkSubscriptionStatus,
    
    // 验证码相关
    sendVerification,
    sendLoginVerification,
    
    // 欢迎邮件
    sendWelcome,
    
    // 工具函数
    validateEmailFormat,
    validateCodeFormat
  };
}