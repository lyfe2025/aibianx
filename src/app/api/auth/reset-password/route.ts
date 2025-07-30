/**
 * 重置密码API端点
 * POST /api/auth/reset-password
 * 
 * 使用重置令牌重置用户密码
 */

import { NextRequest, NextResponse } from 'next/server'

interface ResetPasswordRequest {
    code: string
    password: string
    passwordConfirmation: string
}

interface ResetPasswordResponse {
    success: boolean
    message: string
    user?: {
        id: string
        email: string
        username: string
    }
    jwt?: string
    error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<ResetPasswordResponse>> {
    try {
        const body: ResetPasswordRequest = await request.json()
        const { code, password, passwordConfirmation } = body

        // 输入验证
        if (!code || !password || !passwordConfirmation) {
            return NextResponse.json({
                success: false,
                message: '请填写所有必填字段',
                error: 'MISSING_FIELDS'
            }, { status: 400 })
        }

        if (password !== passwordConfirmation) {
            return NextResponse.json({
                success: false,
                message: '两次输入的密码不一致',
                error: 'PASSWORD_MISMATCH'
            }, { status: 400 })
        }

        if (password.length < 6) {
            return NextResponse.json({
                success: false,
                message: '密码长度至少6位',
                error: 'PASSWORD_TOO_SHORT'
            }, { status: 400 })
        }

        // 调用Strapi重置密码API
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
        const response = await fetch(`${strapiUrl}/api/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                password,
                passwordConfirmation,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            // 处理Strapi错误响应
            if (data.error?.message?.includes('Incorrect code provided')) {
                return NextResponse.json({
                    success: false,
                    message: '重置码无效或已过期，请重新申请密码重置',
                    error: 'INVALID_CODE'
                }, { status: 400 })
            }

            if (data.error?.message?.includes('code has expired')) {
                return NextResponse.json({
                    success: false,
                    message: '重置码已过期，请重新申请密码重置',
                    error: 'CODE_EXPIRED'
                }, { status: 400 })
            }

            return NextResponse.json({
                success: false,
                message: data.error?.message || '密码重置失败，请稍后重试',
                error: 'RESET_PASSWORD_FAILED'
            }, { status: response.status })
        }

        // 密码重置成功
        return NextResponse.json({
            success: true,
            message: '密码重置成功！您现在可以使用新密码登录',
            user: {
                id: data.user.id.toString(),
                email: data.user.email,
                username: data.user.username
            },
            jwt: data.jwt
        }, { status: 200 })

    } catch (error) {
        console.error('重置密码API错误:', error)
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