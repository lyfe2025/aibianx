/**
 * 验证码管理工具
 * 处理注册验证码、登录验证码的生成、存储、验证和过期管理
 */

export interface VerificationCodeData {
  code: string;
  email: string;
  type: 'registration' | 'login' | 'password_reset';
  expiresAt: number;
  attempts: number;
  maxAttempts: number;
}

export interface VerificationResult {
  success: boolean;
  message: string;
  isExpired?: boolean;
  attemptsExceeded?: boolean;
  remainingAttempts?: number;
}

export interface SendCodeResult {
  success: boolean;
  message: string;
  code?: string; // 仅在开发环境返回
}

/**
 * 验证码管理器类
 */
export class VerificationManager {
  private readonly STORAGE_KEY = 'verification_codes';
  private readonly DEFAULT_EXPIRY_MINUTES = {
    registration: 10,
    login: 5,
    password_reset: 15
  };
  private readonly MAX_ATTEMPTS = 3;
  
  /**
   * 生成验证码
   */
  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * 获取存储的验证码数据
   */
  private getStoredCodes(): VerificationCodeData[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('读取验证码存储失败:', error);
      return [];
    }
  }

  /**
   * 保存验证码数据
   */
  private saveStoredCodes(codes: VerificationCodeData[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(codes));
    } catch (error) {
      console.error('保存验证码存储失败:', error);
    }
  }

  /**
   * 清理过期的验证码
   */
  private cleanupExpiredCodes(): void {
    const codes = this.getStoredCodes();
    const now = Date.now();
    const validCodes = codes.filter(code => code.expiresAt > now);
    this.saveStoredCodes(validCodes);
  }

  /**
   * 发送注册验证码
   */
  async sendRegistrationCode(email: string, userName: string): Promise<SendCodeResult> {
    try {
      // 使用BillionMail发送验证码
      const { sendVerificationCode } = await import('@/lib/billionmail');
      const result = await sendVerificationCode(email, userName);
      
      if (result.success) {
        // 本地存储验证码信息（用于验证）
        const code = result.verificationCode;
        const expiresAt = Date.now() + (this.DEFAULT_EXPIRY_MINUTES.registration * 60 * 1000);
        
        this.cleanupExpiredCodes();
        const codes = this.getStoredCodes();
        
        // 移除同一邮箱的旧验证码
        const filteredCodes = codes.filter(c => !(c.email === email && c.type === 'registration'));
        
        // 添加新验证码
        filteredCodes.push({
          code,
          email,
          type: 'registration',
          expiresAt,
          attempts: 0,
          maxAttempts: this.MAX_ATTEMPTS
        });
        
        this.saveStoredCodes(filteredCodes);
        
        return {
          success: true,
          message: '注册验证码已发送到您的邮箱',
          code: process.env.NODE_ENV === 'development' ? code : undefined
        };
      } else {
        return {
          success: false,
          message: result.message || '验证码发送失败'
        };
      }
    } catch (error) {
      console.error('发送注册验证码失败:', error);
      return {
        success: false,
        message: '验证码发送失败，请稍后重试'
      };
    }
  }

  /**
   * 发送登录验证码
   */
  async sendLoginCode(email: string, userName: string): Promise<SendCodeResult> {
    try {
      // 使用BillionMail发送登录验证码
      const { sendLoginVerificationCode } = await import('@/lib/billionmail');
      const result = await sendLoginVerificationCode(email, userName);
      
      if (result.success) {
        // 本地存储验证码信息（用于验证）
        const code = result.verificationCode;
        const expiresAt = Date.now() + (this.DEFAULT_EXPIRY_MINUTES.login * 60 * 1000);
        
        this.cleanupExpiredCodes();
        const codes = this.getStoredCodes();
        
        // 移除同一邮箱的旧验证码
        const filteredCodes = codes.filter(c => !(c.email === email && c.type === 'login'));
        
        // 添加新验证码
        filteredCodes.push({
          code,
          email,
          type: 'login',
          expiresAt,
          attempts: 0,
          maxAttempts: this.MAX_ATTEMPTS
        });
        
        this.saveStoredCodes(filteredCodes);
        
        return {
          success: true,
          message: '登录验证码已发送到您的邮箱',
          code: process.env.NODE_ENV === 'development' ? code : undefined
        };
      } else {
        return {
          success: false,
          message: result.message || '登录验证码发送失败'
        };
      }
    } catch (error) {
      console.error('发送登录验证码失败:', error);
      return {
        success: false,
        message: '登录验证码发送失败，请稍后重试'
      };
    }
  }

  /**
   * 验证验证码
   */
  verifyCode(email: string, inputCode: string, type: 'registration' | 'login' | 'password_reset'): VerificationResult {
    this.cleanupExpiredCodes();
    const codes = this.getStoredCodes();
    
    // 查找对应的验证码
    const codeIndex = codes.findIndex(c => 
      c.email === email && 
      c.type === type
    );
    
    if (codeIndex === -1) {
      return {
        success: false,
        message: '验证码不存在或已过期，请重新获取'
      };
    }
    
    const codeData = codes[codeIndex];
    
    // 检查是否过期
    if (codeData.expiresAt <= Date.now()) {
      // 移除过期验证码
      codes.splice(codeIndex, 1);
      this.saveStoredCodes(codes);
      
      return {
        success: false,
        message: '验证码已过期，请重新获取',
        isExpired: true
      };
    }
    
    // 检查尝试次数
    if (codeData.attempts >= codeData.maxAttempts) {
      return {
        success: false,
        message: '验证失败次数过多，请重新获取验证码',
        attemptsExceeded: true
      };
    }
    
    // 验证码码
    if (codeData.code === inputCode) {
      // 验证成功，移除验证码
      codes.splice(codeIndex, 1);
      this.saveStoredCodes(codes);
      
      return {
        success: true,
        message: '验证码验证成功'
      };
    } else {
      // 验证失败，增加尝试次数
      codeData.attempts += 1;
      this.saveStoredCodes(codes);
      
      const remainingAttempts = codeData.maxAttempts - codeData.attempts;
      
      return {
        success: false,
        message: `验证码错误，还有${remainingAttempts}次尝试机会`,
        remainingAttempts
      };
    }
  }

  /**
   * 检查验证码状态
   */
  getCodeStatus(email: string, type: 'registration' | 'login' | 'password_reset'): {
    exists: boolean;
    expiresAt?: number;
    remainingAttempts?: number;
  } {
    this.cleanupExpiredCodes();
    const codes = this.getStoredCodes();
    
    const codeData = codes.find(c => 
      c.email === email && 
      c.type === type
    );
    
    if (!codeData) {
      return { exists: false };
    }
    
    return {
      exists: true,
      expiresAt: codeData.expiresAt,
      remainingAttempts: codeData.maxAttempts - codeData.attempts
    };
  }

  /**
   * 清除特定邮箱的验证码
   */
  clearCodes(email: string, type?: 'registration' | 'login' | 'password_reset'): void {
    const codes = this.getStoredCodes();
    const filteredCodes = codes.filter(c => {
      if (type) {
        return !(c.email === email && c.type === type);
      } else {
        return c.email !== email;
      }
    });
    this.saveStoredCodes(filteredCodes);
  }

  /**
   * 清除所有过期验证码
   */
  clearExpiredCodes(): void {
    this.cleanupExpiredCodes();
  }

  /**
   * 获取验证码剩余时间（秒）
   */
  getRemainingTime(email: string, type: 'registration' | 'login' | 'password_reset'): number {
    const codes = this.getStoredCodes();
    const codeData = codes.find(c => c.email === email && c.type === type);
    
    if (!codeData) return 0;
    
    const remaining = Math.max(0, codeData.expiresAt - Date.now());
    return Math.floor(remaining / 1000);
  }
}

// 导出单例实例
export const verificationManager = new VerificationManager();

// 导出工具函数
export function formatTimeRemaining(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function validateVerificationCode(code: string): boolean {
  return /^\d{6}$/.test(code);
}