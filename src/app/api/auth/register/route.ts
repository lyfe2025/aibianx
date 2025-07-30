/**
 * 用户注册API端点
 * POST /api/auth/register
 * 
 * 与Strapi后端集成，支持邮箱注册和验证
 */

import { NextRequest, NextResponse } from 'next/server'

interface RegisterRequest {
    email: string
    password: string
    username: string
    confirmPassword: string
}

interface RegisterResponse {
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

export async function POST(request: NextRequest): Promise<NextResponse<RegisterResponse>> {
    try {
        const body: RegisterRequest = await request.json()
        const { email, password, username, confirmPassword } = body

        // 输入验证
        if (!email || !password || !username || !confirmPassword) {
            return NextResponse.json({
                success: false,
                message: '请填写所有必填字段',
                error: 'MISSING_FIELDS'
            }, { status: 400 })
        }

        if (password !== confirmPassword) {
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

        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                message: '请输入有效的邮箱地址',
                error: 'INVALID_EMAIL'
            }, { status: 400 })
        }

        // 调用Strapi注册API
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
        const response = await fetch(`${strapiUrl}/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            // 处理Strapi错误响应
            if (data.error?.message?.includes('Email is already taken')) {
                return NextResponse.json({
                    success: false,
                    message: '该邮箱已被注册',
                    error: 'EMAIL_TAKEN'
                }, { status: 409 })
            }

            if (data.error?.message?.includes('Username already taken')) {
                return NextResponse.json({
                    success: false,
                    message: '该用户名已被占用',
                    error: 'USERNAME_TAKEN'
                }, { status: 409 })
            }

            return NextResponse.json({
                success: false,
                message: data.error?.message || '注册失败，请稍后重试',
                error: 'REGISTRATION_FAILED'
            }, { status: response.status })
        }

        // 注册成功
        return NextResponse.json({
            success: true,
            message: '注册成功！请查收验证邮件',
            user: {
                id: data.user.id.toString(),
                email: data.user.email,
                username: data.user.username,
                confirmed: data.user.confirmed
            },
            jwt: data.jwt
        }, { status: 201 })

    } catch (error) {
        console.error('注册API错误:', error)
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