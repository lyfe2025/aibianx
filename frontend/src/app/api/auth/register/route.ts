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
      // 1. 直接进行注册，让Strapi处理重复邮箱检查（避免权限问题）
      console.log('📝 开始注册流程:', email)

      // 2. 注册用户到Strapi（Strapi会自动检查邮箱唯一性）
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
        
        // 处理不同类型的Strapi错误格式
        let errorMessage = '注册失败，请稍后重试'
        
        if (errorData.error) {
          // 标准Strapi错误格式
          errorMessage = errorData.error.message || errorData.error
        } else if (typeof errorData.error === 'string') {
          // 直接字符串错误
          errorMessage = errorData.error
        } else if (errorData.message) {
          // 可能的message字段
          errorMessage = errorData.message
        } else if (typeof errorData === 'string') {
          // 整个响应就是错误字符串
          errorMessage = errorData
        }
        
        // 处理特定的错误类型（按优先级排序，更具体的条件在前）
        if (errorMessage.toLowerCase().includes('email or username are already taken')) {
          // Strapi返回的混合错误信息，需要进一步分析
          errorMessage = '邮箱或用户名已被使用，请更换后重试'
        } else if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('taken')) {
          errorMessage = '该邮箱已被注册，请使用其他邮箱或直接登录'
        } else if (errorMessage.toLowerCase().includes('username') && errorMessage.toLowerCase().includes('taken')) {
          errorMessage = '该用户名已被使用，请选择其他用户名'
        }
        
        return NextResponse.json(
          { error: errorMessage },
          { status: registerResponse.status }
        )
      }

      const userData = await registerResponse.json()
      console.log('✅ 用户注册成功:', userData.user.email)

      // 3. 立即更新用户confirmed状态为true（跳过邮箱验证）
      try {
        const updateResponse = await fetch(`${strapiUrl}/api/users/${userData.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.jwt}`,
          },
          body: JSON.stringify({
            confirmed: true,
          }),
        })

        if (updateResponse.ok) {
          const updatedUser = await updateResponse.json()
          console.log('✅ 用户confirmed状态已更新为true')
          userData.user = updatedUser  // 更新用户数据
        } else {
          console.error('⚠️ 更新confirmed状态失败，但不影响注册')
        }
      } catch (updateError) {
        console.error('⚠️ 更新confirmed状态出错，但不影响注册:', updateError)
      }

      // 4. 可选的欢迎邮件发送（不影响注册成功）
      if (autoSubscribe) {
        try {
          await sendWelcomeEmailForUser(email, displayName)
          console.log('✅ 欢迎邮件发送成功')
        } catch (error) {
          console.error('❌ 欢迎邮件发送失败:', error)
          // 邮件发送失败不影响注册成功
        }
      }

      // 返回成功响应（不包含敏感信息）
      return NextResponse.json({
        success: true,
        message: '注册成功！您现在可以直接登录',
        user: {
          id: userData.user.id,
          email: userData.user.email,
          username: userData.user.username,
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
          confirmed: true,  // 用户已确认，可直接登录
        },
        emailSent: {
          verification: false,  // 不再发送验证邮件
          welcome: autoSubscribe,  // 只有选择订阅时才发送欢迎邮件
          subscribed: false  // BillionMail已移除
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
      emailVerification: false,  // 已禁用邮箱验证
      welcomeEmail: true,
      autoSubscribe: true,
      billionMailIntegration: false  // BillionMail已移除
    }
  })
}