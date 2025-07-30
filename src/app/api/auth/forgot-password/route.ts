/**
 * 忘记密码API端点
 * POST /api/auth/forgot-password
 * 
 * 发送密码重置邮件
 */

import { NextRequest, NextResponse } from 'next/server'

interface ForgotPasswordRequest {
    email: string
}

interface ForgotPasswordResponse {
    success: boolean
    message: string
    error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<ForgotPasswordResponse>> {
    try {
        const body: ForgotPasswordRequest = await request.json()
        const { email } = body

        // 输入验证
        if (!email) {
            return NextResponse.json({
                success: false,
                message: '请输入邮箱地址',
                error: 'MISSING_EMAIL'
            }, { status: 400 })
        }

        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                message: '请输入有效的邮箱地址',
                error: 'INVALID_EMAIL'
            }, { status: 400 })
        }

        // 调用Strapi忘记密码API
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
        const response = await fetch(`${strapiUrl}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            // 处理Strapi错误响应
            if (data.error?.message?.includes('This email does not exist')) {
                // 出于安全考虑，不透露邮箱是否存在
                return NextResponse.json({
                    success: true,
                    message: '如果该邮箱已注册，您将收到密码重置邮件'
                }, { status: 200 })
            }

            return NextResponse.json({
                success: false,
                message: data.error?.message || '发送重置邮件失败，请稍后重试',
                error: 'FORGOT_PASSWORD_FAILED'
            }, { status: response.status })
        }

        // 成功发送重置邮件
        return NextResponse.json({
            success: true,
            message: '密码重置邮件已发送，请查收您的邮箱'
        }, { status: 200 })

    } catch (error) {
        console.error('忘记密码API错误:', error)
        return NextResponse.json({
            success: false,
            message: '服务器内部错误，请稍后重试',
            error: 'INTERNAL_ERROR'
        }, { status: 500 })
    }
}

// 支持OPTIONS请求（CORS预检）
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}