/**
 * 发送验证邮件API端点
 * POST /api/auth/send-verification
 * 
 * 重新发送邮箱验证邮件
 */

import { NextRequest, NextResponse } from 'next/server'

interface SendVerificationRequest {
    email: string
}

interface SendVerificationResponse {
    success: boolean
    message: string
    error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<SendVerificationResponse>> {
    try {
        const body: SendVerificationRequest = await request.json()
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

        // 调用Strapi重新发送验证邮件API
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
        const response = await fetch(`${strapiUrl}/api/auth/send-email-confirmation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))

            // 处理Strapi错误响应
            if (errorData.error?.message?.includes('already confirmed')) {
                return NextResponse.json({
                    success: false,
                    message: '该邮箱已经通过验证',
                    error: 'ALREADY_CONFIRMED'
                }, { status: 400 })
            }

            if (errorData.error?.message?.includes('not found')) {
                return NextResponse.json({
                    success: false,
                    message: '邮箱地址未注册',
                    error: 'EMAIL_NOT_FOUND'
                }, { status: 404 })
            }

            if (errorData.error?.message?.includes('rate limit')) {
                return NextResponse.json({
                    success: false,
                    message: '发送过于频繁，请稍后再试',
                    error: 'RATE_LIMITED'
                }, { status: 429 })
            }

            return NextResponse.json({
                success: false,
                message: errorData.error?.message || '发送验证邮件失败，请稍后重试',
                error: 'SEND_VERIFICATION_FAILED'
            }, { status: response.status })
        }

        // 成功发送验证邮件
        return NextResponse.json({
            success: true,
            message: '验证邮件已发送，请查收您的邮箱'
        }, { status: 200 })

    } catch (error) {
        console.error('发送验证邮件API错误:', error)
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