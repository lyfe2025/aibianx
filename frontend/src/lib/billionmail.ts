/**
 * 前端 BillionMail 集成工具
 * 用于处理邮件订阅、验证码发送等功能
 */

// 从环境变量获取API URL
const BILLIONMAIL_API_URL = process.env.NEXT_PUBLIC_BILLIONMAIL_API_URL || 'http://localhost:8081/api';

export interface SubscribeData {
  email: string;
  name?: string;
  tags?: string[];
  preferences?: {
    newsletter: boolean;
    marketing: boolean;
    updates: boolean;
  };
}

export interface VerificationCodeResponse {
  success: boolean;
  verificationCode: string;
  message?: string;
}

export interface BillionMailApiResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

/**
 * 邮件订阅功能
 */
export async function subscribeEmail(data: SubscribeData): Promise<BillionMailApiResponse> {
  try {
    const response = await fetch(`${BILLIONMAIL_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        tags: data.tags || [],
        preferences: data.preferences || {
          newsletter: true,
          marketing: false,
          updates: true
        },
        source: 'website',
        subscribed_at: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`订阅失败: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
      message: '订阅成功！'
    };
  } catch (error) {
    console.error('邮件订阅失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '订阅失败，请稍后重试'
    };
  }
}

/**
 * 发送注册验证码
 */
export async function sendVerificationCode(email: string, userName: string): Promise<VerificationCodeResponse> {
  // 生成6位数字验证码
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    const response = await fetch(`${BILLIONMAIL_API_URL}/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        template_id: 'email_verification',
        variables: {
          user_name: userName,
          verification_code: verificationCode,
          expiry_time: '10分钟',
          site_name: 'AI变现之路',
          site_url: window.location.origin
        },
        type: 'transactional'
      })
    });

    if (!response.ok) {
      throw new Error('验证码发送失败');
    }

    await response.json();
    return {
      success: true,
      verificationCode,
      message: '验证码已发送到您的邮箱'
    };
  } catch (error) {
    console.error('发送验证码失败:', error);
    return {
      success: false,
      verificationCode: '',
      message: '验证码发送失败，请稍后重试'
    };
  }
}

/**
 * 发送登录验证码
 */
export async function sendLoginVerificationCode(email: string, userName: string): Promise<VerificationCodeResponse> {
  // 生成6位数字验证码
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    const response = await fetch(`${BILLIONMAIL_API_URL}/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        template_id: 'login_verification',
        variables: {
          user_name: userName,
          verification_code: verificationCode,
          expiry_time: '5分钟',
          site_name: 'AI变现之路',
          login_time: new Date().toLocaleString('zh-CN'),
          client_ip: 'Unknown' // 前端无法获取真实IP
        },
        type: 'transactional'
      })
    });

    if (!response.ok) {
      throw new Error('登录验证码发送失败');
    }

    await response.json();
    return {
      success: true,
      verificationCode,
      message: '登录验证码已发送到您的邮箱'
    };
  } catch (error) {
    console.error('发送登录验证码失败:', error);
    return {
      success: false,
      verificationCode: '',
      message: '登录验证码发送失败，请稍后重试'
    };
  }
}

/**
 * 发送欢迎邮件
 */
export async function sendWelcomeEmail(email: string, userName: string): Promise<BillionMailApiResponse> {
  try {
    const response = await fetch(`${BILLIONMAIL_API_URL}/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        template_id: 'welcome_email',
        variables: {
          user_name: userName,
          site_name: 'AI变现之路',
          site_url: window.location.origin,
          dashboard_url: `${window.location.origin}/profile`,
          support_email: 'support@aibianx.com'
        },
        type: 'transactional'
      })
    });

    if (!response.ok) {
      throw new Error('欢迎邮件发送失败');
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
      message: '欢迎邮件已发送'
    };
  } catch (error) {
    console.error('发送欢迎邮件失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '欢迎邮件发送失败'
    };
  }
}

/**
 * 取消邮件订阅
 */
export async function unsubscribeEmail(email: string): Promise<BillionMailApiResponse> {
  try {
    const response = await fetch(`${BILLIONMAIL_API_URL}/subscribers/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        unsubscribed_at: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`取消订阅失败: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
      message: '取消订阅成功'
    };
  } catch (error) {
    console.error('取消订阅失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '取消订阅失败，请稍后重试'
    };
  }
}

/**
 * 获取订阅者状态
 */
export async function getSubscriberStatus(email: string): Promise<BillionMailApiResponse> {
  try {
    const response = await fetch(`${BILLIONMAIL_API_URL}/subscribers/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 404) {
      return {
        success: true,
        data: null,
        message: '用户未订阅'
      };
    }

    if (!response.ok) {
      throw new Error(`获取订阅状态失败: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
      message: '获取订阅状态成功'
    };
  } catch (error) {
    console.error('获取订阅状态失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '获取订阅状态失败'
    };
  }
}

/**
 * 检查BillionMail服务健康状态
 */
export async function checkBillionMailHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BILLIONMAIL_API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.ok;
  } catch (error) {
    console.error('BillionMail服务健康检查失败:', error);
    return false;
  }
}

/**
 * 验证邮箱格式
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证验证码格式（6位数字）
 */
export function validateVerificationCode(code: string): boolean {
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
}

/**
 * 生成随机验证码（用于前端模拟）
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 导出常量
export const BILLIONMAIL_ENDPOINTS = {
  SUBSCRIBE: `${BILLIONMAIL_API_URL}/subscribers`,
  UNSUBSCRIBE: `${BILLIONMAIL_API_URL}/subscribers/unsubscribe`,
  SEND_EMAIL: `${BILLIONMAIL_API_URL}/emails/send`,
  HEALTH: `${BILLIONMAIL_API_URL}/health`
} as const;