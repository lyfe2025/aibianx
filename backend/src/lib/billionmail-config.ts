/**
 * BillionMail 集成配置
 * 用于连接和操作 BillionMail 邮件营销平台
 */

export interface BillionMailConfig {
  apiUrl: string;
  apiKey: string;
  defaultListId: string;
  adminUrl?: string;
}

export interface SubscribeData {
  email: string;
  name?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface EmailTemplate {
  id: string;
  name: string;
  variables: Record<string, any>;
}

export interface SendEmailOptions {
  to: string;
  templateId: string;
  variables: Record<string, any>;
  listId?: string;
}

/**
 * BillionMail API 客户端类
 */
export class BillionMailClient {
  private config: BillionMailConfig;

  constructor(config?: Partial<BillionMailConfig>) {
    this.config = {
      apiUrl: config?.apiUrl || process.env.BILLIONMAIL_API_URL || 'http://localhost:8081/api',
      apiKey: config?.apiKey || process.env.BILLIONMAIL_API_KEY || '',
      defaultListId: config?.defaultListId || process.env.BILLIONMAIL_DEFAULT_LIST_ID || '1',
      adminUrl: config?.adminUrl || process.env.BILLIONMAIL_ADMIN_URL || 'http://localhost:8081/admin'
    };
  }

  /**
   * 添加订阅者到邮件列表
   */
  async addSubscriber(email: string, name?: string, tags?: string[]): Promise<any> {
    try {
      const response = await fetch(`${this.config.apiUrl}/subscribers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          name,
          tags,
          list_id: this.config.defaultListId,
          status: 'active'
        })
      });

      if (!response.ok) {
        throw new Error(`BillionMail API错误: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('添加订阅者失败:', error);
      throw error;
    }
  }

  /**
   * 发送系统邮件（注册确认、密码重置等）
   */
  async sendSystemEmail(templateId: string, email: string, variables: any): Promise<any> {
    try {
      const response = await fetch(`${this.config.apiUrl}/emails/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: email,
          template_id: templateId,
          variables,
          type: 'transactional'
        })
      });

      if (!response.ok) {
        throw new Error(`BillionMail发送邮件失败: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('发送系统邮件失败:', error);
      throw error;
    }
  }

  /**
   * 发送用户注册验证码
   */
  async sendVerificationCode(email: string, userName: string, verificationCode: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.apiUrl}/emails/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: email,
          template_id: 'email_verification', // 假设在BillionMail中已创建此模板
          variables: {
            user_name: userName,
            verification_code: verificationCode,
            expiry_time: '10分钟', // 可配置
            site_name: 'AI变现之路',
            site_url: process.env.NEXTAUTH_URL || 'http://localhost'
          },
          type: 'transactional'
        })
      });

      if (!response.ok) {
        throw new Error(`BillionMail发送验证码失败: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('发送验证码失败:', error);
      throw error;
    }
  }

  /**
   * 发送登录验证码
   */
  async sendLoginVerificationCode(email: string, userName: string, verificationCode: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.apiUrl}/emails/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
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
            client_ip: 'Unknown' // 可以从请求中获取
          },
          type: 'transactional'
        })
      });

      if (!response.ok) {
        throw new Error(`BillionMail发送登录验证码失败: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('发送登录验证码失败:', error);
      throw error;
    }
  }

  /**
   * 取消订阅
   */
  async unsubscribe(email: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.apiUrl}/subscribers/unsubscribe`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          list_id: this.config.defaultListId
        })
      });

      if (!response.ok) {
        throw new Error(`BillionMail取消订阅失败: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('取消订阅失败:', error);
      throw error;
    }
  }

  /**
   * 获取订阅者信息
   */
  async getSubscriber(email: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.apiUrl}/subscribers/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // 订阅者不存在
        }
        throw new Error(`BillionMail获取订阅者失败: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('获取订阅者信息失败:', error);
      throw error;
    }
  }

  /**
   * 检查BillionMail服务状态
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.apiUrl}/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        }
      });

      return response.ok;
    } catch (error) {
      console.error('BillionMail健康检查失败:', error);
      return false;
    }
  }
}

// 导出默认实例
export const billionMailClient = new BillionMailClient();

// 导出配置验证函数
export function validateBillionMailConfig(): boolean {
  const requiredEnvVars = [
    'BILLIONMAIL_API_URL',
    'BILLIONMAIL_API_KEY',
    'BILLIONMAIL_DEFAULT_LIST_ID'
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`缺少环境变量: ${envVar}`);
      return false;
    }
  }

  return true;
}