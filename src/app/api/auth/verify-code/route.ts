/**
 * 验证码验证API端点
 * POST /api/auth/verify-code
 * 
 * 验证用户邮箱验证码
 */

import { NextRequest, NextResponse } from 'next/server'

interface VerifyCodeRequest {
    email: string
    code: string
}

interface VerifyCodeResponse {
    success: boolean
    message: string
    user?: {
        id: string
        email: string
        username: string
        confirmed: boolean
    }
    jwt?: string
    error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<VerifyCodeResponse>> {
    try {
        const body: VerifyCodeRequest = await request.json()
        const { email, code } = body

        // 输入验证
        if (!email || !code) {
            return NextResponse.json({
                success: false,
                message: '请填写邮箱和验证码',
                error: 'MISSING_FIELDS'
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

        // 验证码格式验证（假设6位数字）
        if (!/^\d{6}$/.test(code)) {
            return NextResponse.json({
                success: false,
                message: '验证码格式错误，应为6位数字',
                error: 'INVALID_CODE_FORMAT'
            }, { status: 400 })
        }

        // 调用Strapi邮箱验证API
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
        const response = await fetch(`${strapiUrl}/api/auth/email-confirmation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Strapi通常使用confirmation参数传递验证码
        })

        // 由于Strapi的邮箱验证通常通过URL参数，我们需要构造特殊的验证请求
        const verifyResponse = await fetch(`${strapiUrl}/api/auth/email-confirmation?confirmation=${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!verifyResponse.ok) {
            const errorData = await verifyResponse.json().catch(() => ({}))

            if (verifyResponse.status === 400) {
                return NextResponse.json({
                    success: false,
                    message: '验证码无效或已过期',
                    error: 'INVALID_CODE'
                }, { status: 400 })
            }

            return NextResponse.json({
                success: false,
                message: errorData.error?.message || '验证失败，请稍后重试',
                error: 'VERIFICATION_FAILED'
            }, { status: verifyResponse.status })
        }

        // 验证成功，可能需要根据Strapi响应调整
        const data = await verifyResponse.json()

        return NextResponse.json({
            success: true,
            message: '邮箱验证成功！',
            user: {
                id: data.user?.id?.toString() || '',
                email: data.user?.email || email,
                username: data.user?.username || '',
                confirmed: true
            },
            jwt: data.jwt
        }, { status: 200 })

    } catch (error) {
        console.error('验证码API错误:', error)
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