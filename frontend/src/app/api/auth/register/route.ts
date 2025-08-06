/**
 * 用户注册API - 邮件发送功能（BillionMail已移除）
 */

import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { sendAccountVerificationEmail, sendWelcomeEmailForUser } from '@/lib/nextauth-email'
// import { subscribeEmail } from '@/lib/billionmail' // BillionMail已移除

interface RegisterRequest {
  email: string
  password: string
  username?: string
  firstName?: string
  lastName?: string
  autoSubscribe?: boolean // 是否自动订阅邮件列表
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json()
    const { email, password, username, firstName, lastName, autoSubscribe = true } = body

    // 验证必需字段
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码为必填项' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
        { status: 400 }
      )
    }

    // 验证密码强度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少6位' },
        { status: 400 }
      )
    }

    const strapiUrl = config.backend.url
    const displayName = username || firstName || email.split('@')[0]

    try {
      // 1. 检查用户是否已存在
      const checkResponse = await fetch(`${strapiUrl}/api/users?filters[email][$eq]=${email}`)
      if (checkResponse.ok) {
        const existingUsers = await checkResponse.json()
        if (existingUsers.length > 0) {
          return NextResponse.json(
            { error: '该邮箱已被注册' },
            { status: 409 }
          )
        }
      }

      // 2. 注册用户到Strapi
      const registerResponse = await fetch(`${strapiUrl}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: displayName,
          email,
          password,
        }),
      })

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json()
        console.error('❌ Strapi注册失败:', errorData)
        return NextResponse.json(
          { error: errorData.error?.message || '注册失败，请稍后重试' },
          { status: 400 }
        )
      }

      const userData = await registerResponse.json()
      console.log('✅ 用户注册成功:', userData.user.email)

      // 3. 并行处理邮件发送
      const emailPromises = []

      // 发送账户验证邮件
      const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost'}/auth/verify?token=${userData.jwt}&email=${email}`
      emailPromises.push(
        sendAccountVerificationEmail(email, displayName, verificationUrl)
          .then(result => ({ type: 'verification', result }))
          .catch(error => ({ type: 'verification', error: error.message }))
      )

      // 发送欢迎邮件
      emailPromises.push(
        sendWelcomeEmailForUser(email, displayName)
          .then(result => ({ type: 'welcome', result }))
          .catch(error => ({ type: 'welcome', error: error.message }))
      )

      // 如果选择自动订阅，添加到邮件列表 (BillionMail已移除)
      if (autoSubscribe) {
        // emailPromises.push(
        //   subscribeEmail({
        //     email,
        //     name: displayName,
        //     tags: ['new-user', 'auto-subscribe'],
        //     preferences: {
        //       newsletter: true,
        //       marketing: false,
        //       updates: true
        //     }
        //   }).then(result => ({ type: 'subscribe', result }))
        //     .catch(error => ({ type: 'subscribe', error: error.message }))
        // )
      }

      // 等待所有邮件操作完成
      const emailResults = await Promise.allSettled(emailPromises)
      
      // 记录邮件发送结果
      emailResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const { type, result: emailResult, error } = result.value
          if (error) {
            console.error(`❌ ${type} 邮件发送失败:`, error)
          } else {
            console.log(`✅ ${type} 邮件发送成功`)
          }
        } else {
          console.error(`❌ 邮件操作失败:`, result.reason)
        }
      })

      // 返回成功响应（不包含敏感信息）
      return NextResponse.json({
        success: true,
        message: '注册成功！请查收验证邮件',
        user: {
          id: userData.user.id,
          email: userData.user.email,
          username: userData.user.username,
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
        },
        emailSent: {
          verification: true,
          welcome: true,
          subscribed: autoSubscribe
        }
      })

    } catch (error) {
      console.error('❌ 注册过程中出错:', error)
      return NextResponse.json(
        { error: '注册失败，请稍后重试' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ 注册API错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

// 获取注册表单配置
export async function GET() {
  return NextResponse.json({
    fields: {
      email: { required: true, type: 'email' },
      password: { required: true, type: 'password', minLength: 6 },
      username: { required: false, type: 'text' },
      firstName: { required: false, type: 'text' },
      lastName: { required: false, type: 'text' },
      autoSubscribe: { required: false, type: 'boolean', default: true }
    },
    features: {
      emailVerification: true,
      welcomeEmail: true,
      autoSubscribe: true,
      billionMailIntegration: true
    }
  })
}