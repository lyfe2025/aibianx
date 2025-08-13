interface VerificationSession {
  email: string
  code: string
  expiresAt: number
  attempts: number
  maxAttempts: number
}

class VerificationManager {
  private sessions: Map<string, VerificationSession> = new Map()
  private readonly EXPIRY_MINUTES = 10
  private readonly MAX_ATTEMPTS = 3

  // 生成验证码
  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // 创建验证会话
  createSession(email: string): string {
    const code = this.generateCode()
    const expiresAt = Date.now() + (this.EXPIRY_MINUTES * 60 * 1000)
    
    this.sessions.set(email, {
      email,
      code,
      expiresAt,
      attempts: 0,
      maxAttempts: this.MAX_ATTEMPTS
    })

    return code
  }

  // 验证验证码
  verifyCode(email: string, inputCode: string): {
    success: boolean
    message: string
    attemptsLeft?: number
  } {
    const session = this.sessions.get(email)
    
    if (!session) {
      return {
        success: false,
        message: '验证会话不存在，请重新发送验证码'
      }
    }

    // 检查是否过期
    if (Date.now() > session.expiresAt) {
      this.sessions.delete(email)
      return {
        success: false,
        message: '验证码已过期，请重新发送'
      }
    }

    // 检查尝试次数
    if (session.attempts >= session.maxAttempts) {
      this.sessions.delete(email)
      return {
        success: false,
        message: '验证失败次数过多，请重新发送验证码'
      }
    }

    // 增加尝试次数
    session.attempts++

    // 验证码匹配
    if (session.code === inputCode) {
      this.sessions.delete(email)
      return {
        success: true,
        message: '验证成功'
      }
    }

    const attemptsLeft = session.maxAttempts - session.attempts

    return {
      success: false,
      message: `验证码错误，还有 ${attemptsLeft} 次机会`,
      attemptsLeft
    }
  }

  // 检查会话状态
  getSessionStatus(email: string): {
    exists: boolean
    expiresAt?: number
    attemptsLeft?: number
  } {
    const session = this.sessions.get(email)
    
    if (!session) {
      return { exists: false }
    }

    // 检查是否过期
    if (Date.now() > session.expiresAt) {
      this.sessions.delete(email)
      return { exists: false }
    }

    return {
      exists: true,
      expiresAt: session.expiresAt,
      attemptsLeft: session.maxAttempts - session.attempts
    }
  }

  // 删除会话
  removeSession(email: string): void {
    this.sessions.delete(email)
  }

  // 清理过期会话
  cleanupExpiredSessions(): void {
    const now = Date.now()
    for (const [email, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        this.sessions.delete(email)
      }
    }
  }
}

// 创建单例实例
export const verificationManager = new VerificationManager()

// 格式化剩余时间显示
export function formatTimeRemaining(expiresAt: number): string {
  const remaining = Math.max(0, expiresAt - Date.now())
  const minutes = Math.floor(remaining / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)
  
  if (minutes > 0) {
    return `${minutes}分${seconds}秒`
  }
  return `${seconds}秒`
}

// 定期清理过期会话
setInterval(() => {
  verificationManager.cleanupExpiredSessions()
}, 60000) // 每分钟清理一次
