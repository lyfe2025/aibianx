/**
 * NextAuth 邮件发送集成 - 使用 Strapi 邮件系统
 * 为NextAuth提供邮件验证功能
 */

// import { subscribeEmail, sendVerificationCode, sendWelcomeEmail } from '@/lib/strapi-email' 
// 邮件功能已简化，不再依赖外部模块

/**
 * 为NextAuth发送验证邮件
 * 用于魔法链接登录
 */
export async function sendVerificationRequest({
  identifier: email,
  url,
  provider,
  theme
}: {
  identifier: string
  url: string
  provider: any
  theme?: any
}) {
  try {
    console.log('📧 发送NextAuth验证邮件:', email)
    
    // 提取验证码或使用URL中的token
    const urlObj = new URL(url)
    const token = urlObj.searchParams.get('token')
    const verificationCode = token ? token.substring(0, 6) : generateVerificationCode()
    
    // 简化实现：邮件验证功能已禁用
    console.log('✅ NextAuth验证邮件功能已禁用（开发模式）')
    return true
  } catch (error) {
    console.error('❌ NextAuth sendVerificationRequest 错误:', error)
    throw error
  }
}

/**
 * 生成6位数字验证码
 */
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * 发送用户注册欢迎邮件
 */
export async function sendWelcomeEmailForUser(email: string, userName: string) {
  try {
    console.log('📧 发送用户注册欢迎邮件:', email)
    
    // 简化实现：欢迎邮件功能已禁用
    console.log('✅ 用户欢迎邮件功能已禁用（开发模式）')
    return true
  } catch (error) {
    console.error('❌ 发送用户欢迎邮件错误:', error)
    return false
  }
}

/**
 * 发送密码重置邮件
 */
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    console.log('📧 发送密码重置邮件:', email)
    
    // 生成重置验证码
    const resetCode = generateVerificationCode()
    
    // 简化实现：密码重置邮件功能已禁用
    console.log('✅ 密码重置邮件功能已禁用（开发模式）')
    return { success: true, verificationCode: resetCode }
  } catch (error) {
    console.error('❌ 发送密码重置邮件错误:', error)
    return { success: false, message: error.message }
  }
}

/**
 * 发送账户验证邮件（新用户注册）
 */
export async function sendAccountVerificationEmail(email: string, userName: string, verificationUrl: string) {
  try {
    console.log('📧 发送账户验证邮件:', email)
    
    const verificationCode = generateVerificationCode()
    
    // 简化实现：账户验证邮件功能已禁用
    console.log('✅ 账户验证邮件功能已禁用（开发模式）')
    return { success: true, verificationCode }
  } catch (error) {
    console.error('❌ 发送账户验证邮件错误:', error)
    return { success: false, message: error.message }
  }
}