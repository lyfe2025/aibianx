/**
 * 忘记密码API
 * 发送密码重置链接到用户邮箱
 */

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { randomBytes } from 'crypto'

// 存储重置token的临时存储（生产环境应使用Redis）
const resetTokens = new Map<string, { email: string; expires: number }>()

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

        try {
            const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

            // 检查邮箱是否已注册
            const userResponse = await fetch(`${strapiUrl}/api/users?filters[email][$eq]=${email}`)

            if (userResponse.ok) {
                const users = await userResponse.json()
                if (users.length === 0) {
                    // 为了安全，不透露邮箱是否注册，统一返回成功消息
                    return NextResponse.json({
                        message: '如果该邮箱已注册，我们已发送重置链接到您的邮箱'
                    })
                }
            }
        } catch (error) {
            console.error('检查用户失败:', error)
        }

        // 生成重置token
        const token = randomBytes(32).toString('hex')

        // 设置过期时间（1小时）
        const expires = Date.now() + 60 * 60 * 1000

        // 存储重置token
        resetTokens.set(token, { email, expires })

        // 生成重置链接
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
        const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`

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

        // 发送重置密码邮件
        const result = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: '🔐 AI变现之路 - 重置密码',
            text: `请点击以下链接重置您的密码：${resetUrl}\n\n链接有效期1小时。如果您没有请求重置密码，请忽略此邮件。`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>重置密码 - AI变现之路</title>
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
              <h2 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px; text-align: center;">重置密码</h2>
              
              <p style="margin: 0 0 30px 0; color: #4a5568; font-size: 16px; text-align: center; line-height: 1.6;">
                我们收到了您的密码重置请求。请点击下方按钮设置新密码：
              </p>
              
              <!-- Reset Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                  🔐 重置密码
                </a>
              </div>
              
              <!-- Alternative Link -->
              <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <p style="margin: 0 0 10px 0; color: #495057; font-size: 14px; font-weight: 600;">
                  如果按钮无法点击，请复制以下链接到浏览器地址栏：
                </p>
                <p style="margin: 0; word-break: break-all; color: #007bff; font-size: 12px; font-family: monospace;">
                  ${resetUrl}
                </p>
              </div>
              
              <!-- Security Notice -->
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 20px; margin: 30px 0;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>🔒 安全提醒：</strong>
                </p>
                <ul style="margin: 10px 0 0 0; color: #856404; font-size: 14px; padding-left: 20px;">
                  <li>重置链接有效期为1小时</li>
                  <li>如果您没有请求重置密码，请忽略此邮件</li>
                  <li>为了您的账户安全，请设置强密码</li>
                  <li>重置后请妥善保管您的新密码</li>
                </ul>
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
            message: '如果该邮箱已注册，我们已发送重置链接到您的邮箱'
        })

    } catch (error) {
        console.error('发送重置密码邮件失败:', error)
        return NextResponse.json(
            { error: '发送重置链接失败，请稍后重试' },
            { status: 500 }
        )
    }
}

// 清理过期token的定时任务
setInterval(() => {
    const now = Date.now()
    for (const [token, data] of resetTokens.entries()) {
        if (data.expires < now) {
            resetTokens.delete(token)
        }
    }
}, 10 * 60 * 1000) // 每10分钟清理一次

// 导出重置token存储，供其他API使用
export { resetTokens }