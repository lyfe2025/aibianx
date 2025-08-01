/**
 * 密码重置API - 集成BillionMail邮件发送
 */

import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { sendPasswordResetEmail } from '@/lib/nextauth-email'

interface ResetPasswordRequest {
  email: string
}

interface ConfirmResetRequest {
  email: string
  code: string
  newPassword: string
}

// 发送密码重置邮件
export async function POST(request: NextRequest) {
  try {
    const body: ResetPasswordRequest = await request.json()
    const { email } = body

    // 验证邮箱
    if (!email) {
      return NextResponse.json(
        { error: '请提供邮箱地址' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
        { status: 400 }
      )
    }

    const strapiUrl = config.backend.url

    try {
      // 1. 直接尝试Strapi的忘记密码功能
      const resetResponse = await fetch(`${strapiUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!resetResponse.ok) {
        const errorData = await resetResponse.json()
        console.error('❌ Strapi密码重置失败:', errorData)
        return NextResponse.json(
          { error: '重置请求失败，请稍后重试' },
          { status: 400 }
        )
      }

      // 3. 发送自定义密码重置邮件（使用BillionMail）
      const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost'}/auth/reset-password`
      const emailResult = await sendPasswordResetEmail(email, resetUrl)

      if (emailResult.success) {
        console.log('✅ 密码重置邮件发送成功:', email)
        
        // 在生产环境中，不应该返回验证码
        const response: any = {
          success: true,
          message: '密码重置邮件已发送，请查收邮件并按提示操作'
        }

        // 开发环境返回验证码
        if (process.env.NODE_ENV === 'development') {
          response.verificationCode = emailResult.verificationCode
          response.devNote = '开发环境：验证码已在响应中返回'
        }

        return NextResponse.json(response)
      } else {
        console.error('❌ 密码重置邮件发送失败:', emailResult.message)
        return NextResponse.json(
          { error: '邮件发送失败，请稍后重试' },
          { status: 500 }
        )
      }

    } catch (error) {
      console.error('❌ 密码重置处理错误:', error)
      return NextResponse.json(
        { error: '重置请求失败，请稍后重试' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ 密码重置API错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

// 验证重置码并更新密码
export async function PUT(request: NextRequest) {
  try {
    const body: ConfirmResetRequest = await request.json()
    const { email, code, newPassword } = body

    // 验证输入
    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { error: '请提供完整的重置信息' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: '新密码长度至少6位' },
        { status: 400 }
      )
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: '验证码格式不正确' },
        { status: 400 }
      )
    }

    // 这里需要验证码验证逻辑
    // 可以使用verificationManager或数据库存储的验证码
    const { verificationManager } = await import('@/lib/verificationManager')
    const verifyResult = verificationManager.verifyCode(email, code, 'password_reset')

    if (!verifyResult.success) {
      return NextResponse.json(
        { error: verifyResult.message },
        { status: 400 }
      )
    }

    // 注意：在实际应用中，这里应该使用Strapi的reset-password端点
    // 这里我们模拟密码重置确认流程
    
    console.log(`🔄 确认密码重置: ${email}, 验证码: ${code}`)
    
    // 模拟成功响应（在实际应用中需要真正更新密码）
    return NextResponse.json({
      success: true,
      message: '密码重置成功，请使用新密码登录（模拟）'
    })

  } catch (error) {
    console.error('❌ 确认密码重置API错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}