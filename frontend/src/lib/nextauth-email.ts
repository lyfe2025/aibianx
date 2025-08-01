/**
 * NextAuth 邮件发送集成 - 使用 BillionMail
 * 为NextAuth提供邮件验证功能
 */

import { subscribeEmail, sendVerificationCode, sendWelcomeEmail } from '@/lib/billionmail'

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
    
    // 使用BillionMail发送验证邮件
    const result = await sendVerificationCode(email, 'NextAuth用户', {
      templateId: 'nextauth_login_verification',
      variables: {
        user_name: email.split('@')[0],
        verification_code: verificationCode,
        verification_url: url,
        site_name: 'AI变现之路',
        site_url: process.env.NEXTAUTH_URL || 'http://localhost',
        expiry_time: '15分钟'
      }
    })

    if (result.success) {
      console.log('✅ NextAuth验证邮件发送成功')
      return true
    } else {
      console.error('❌ NextAuth验证邮件发送失败:', result.message)
      throw new Error(`邮件发送失败: ${result.message}`)
    }
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
    
    const result = await sendWelcomeEmail(email, userName, {
      templateId: 'user_welcome',
      variables: {
        user_name: userName,
        site_name: 'AI变现之路',
        site_url: process.env.NEXTAUTH_URL || 'http://localhost',
        dashboard_url: `${process.env.NEXTAUTH_URL || 'http://localhost'}/profile`,
        support_email: 'support@aibianx.com'
      }
    })

    if (result.success) {
      console.log('✅ 用户欢迎邮件发送成功')
      return true
    } else {
      console.error('❌ 用户欢迎邮件发送失败:', result.message)
      return false
    }
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
    
    const result = await sendVerificationCode(email, '密码重置用户', {
      templateId: 'password_reset',
      variables: {
        user_name: email.split('@')[0],
        verification_code: resetCode,
        reset_url: resetUrl,
        site_name: 'AI变现之路',
        site_url: process.env.NEXTAUTH_URL || 'http://localhost',
        expiry_time: '30分钟'
      }
    })

    if (result.success) {
      console.log('✅ 密码重置邮件发送成功')
      return { success: true, verificationCode: resetCode }
    } else {
      console.error('❌ 密码重置邮件发送失败:', result.message)
      return { success: false, message: result.message }
    }
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
    
    const result = await sendVerificationCode(email, userName, {
      templateId: 'account_verification',
      variables: {
        user_name: userName,
        verification_code: verificationCode,
        verification_url: verificationUrl,
        site_name: 'AI变现之路',
        site_url: process.env.NEXTAUTH_URL || 'http://localhost',
        expiry_time: '24小时'
      }
    })

    if (result.success) {
      console.log('✅ 账户验证邮件发送成功')
      return { success: true, verificationCode }
    } else {
      console.error('❌ 账户验证邮件发送失败:', result.message)
      return { success: false, message: result.message }
    }
  } catch (error) {
    console.error('❌ 发送账户验证邮件错误:', error)
    return { success: false, message: error.message }
  }
}