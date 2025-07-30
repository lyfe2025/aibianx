/**
 * 发送邮箱验证码API
 * 用于用户注册时的邮箱验证
 */

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// 存储验证码的临时存储（生产环境应使用Redis）
const verificationCodes = new Map<string, { code: string; expires: number }>()

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({ error: '邮箱地址不能为空' }, { status: 400 })
        }

        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: '邮箱格式不正确' }, { status: 400 })
        }

        // 检查邮箱是否已注册
        try {
            const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
            const userResponse = await fetch(`${strapiUrl}/api/users?filters[email][$eq]=${email}`)

            if (userResponse.ok) {
                const users = await userResponse.json()
                if (users.length > 0) {
                    return NextResponse.json({ error: '该邮箱已被注册' }, { status: 400 })
                }
            }
        } catch (error) {
            console.error('检查邮箱注册状态失败:', error)
        }

        // 生成6位数验证码
        const code = Math.floor(100000 + Math.random() * 900000).toString()

        // 设置过期时间（10分钟）
        const expires = Date.now() + 10 * 60 * 1000

        // 存储验证码
        verificationCodes.set(email, { code, expires })

        // 配置邮件发送器
        const transporter = nodemailer.createTransporter({
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            secure: false, // 使用TLS
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        })

        // 发送验证码邮件
        const result = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: '🔐 AI变现之路 - 邮箱验证码',
            text: `您的验证码是：${code}，有效期10分钟。如果您没有请求此验证码，请忽略此邮件。`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>邮箱验证码 - AI变现之路</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">🚀 AI变现之路</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">AI技术商业化知识平台</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px; text-align: center;">邮箱验证码</h2>
              
              <p style="margin: 0 0 30px 0; color: #4a5568; font-size: 16px; text-align: center; line-height: 1.6;">
                感谢您注册AI变现之路！请使用以下验证码完成邮箱验证：
              </p>
              
              <!-- Verification Code -->
              <div style="background: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                <div style="font-size: 36px; font-weight: 700; color: #2d3748; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${code}
                </div>
                <p style="margin: 15px 0 0 0; color: #6c757d; font-size: 14px;">
                  验证码有效期：10分钟
                </p>
              </div>
              
              <!-- Instructions -->
              <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #1976d2; font-size: 16px;">📋 使用说明</h3>
                <ul style="margin: 0; padding-left: 20px; color: #424242; font-size: 14px; line-height: 1.6;">
                  <li>请在注册页面输入此验证码</li>
                  <li>验证码10分钟内有效</li>
                  <li>如需重新获取，请点击"重新发送"</li>
                </ul>
              </div>
              
              <!-- Security Notice -->
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 20px; margin: 30px 0;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>🔒 安全提醒：</strong>请勿将验证码泄露给他人。如果您没有请求此验证码，请忽略此邮件并检查账户安全。
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">© 2025 AI变现之路 | 专注AI技术商业化</p>
              <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 12px;">如有问题，请联系我们的技术支持</p>
            </div>
          </div>
        </body>
        </html>
      `,
        })

        if (result.rejected.length > 0) {
            throw new Error(`邮件发送失败: ${result.rejected.join(', ')}`)
        }

        return NextResponse.json({
            message: '验证码已发送到您的邮箱，请查收',
            expiresIn: 600 // 10分钟
        })

    } catch (error) {
        console.error('发送验证码失败:', error)
        return NextResponse.json(
            { error: '发送验证码失败，请稍后重试' },
            { status: 500 }
        )
    }
}

// 清理过期验证码的定时任务
setInterval(() => {
    const now = Date.now()
    for (const [email, data] of verificationCodes.entries()) {
        if (data.expires < now) {
            verificationCodes.delete(email)
        }
    }
}, 5 * 60 * 1000) // 每5分钟清理一次

// 导出验证码存储，供其他API使用
export { verificationCodes }