/**
 * 重置密码API
 * 使用重置token设置新密码
 */

import { NextRequest, NextResponse } from 'next/server'

// 引入重置token存储
const resetTokens = new Map<string, { email: string; expires: number }>()

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json()

        if (!token || !password) {
            return NextResponse.json({ error: '重置token和新密码不能为空' }, { status: 400 })
        }

        // 验证密码强度
        if (password.length < 6) {
            return NextResponse.json({ error: '密码长度至少6位' }, { status: 400 })
        }

        // 验证token
        const tokenData = resetTokens.get(token)
        if (!tokenData) {
            return NextResponse.json({ error: '重置链接无效或已过期' }, { status: 400 })
        }

        // 检查token是否过期
        if (Date.now() > tokenData.expires) {
            resetTokens.delete(token)
            return NextResponse.json({ error: '重置链接已过期，请重新申请' }, { status: 400 })
        }

        try {
            const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

            // 获取用户信息
            const userResponse = await fetch(`${strapiUrl}/api/users?filters[email][$eq]=${tokenData.email}`)

            if (!userResponse.ok) {
                throw new Error('获取用户信息失败')
            }

            const users = await userResponse.json()
            if (users.length === 0) {
                return NextResponse.json({ error: '用户不存在' }, { status: 404 })
            }

            const user = users[0]

            // 调用Strapi的密码重置API
            const resetResponse = await fetch(`${strapiUrl}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: token, // 使用我们的token作为code
                    password: password,
                    passwordConfirmation: password,
                }),
            })

            // 如果Strapi的重置API不可用，直接更新用户密码
            if (!resetResponse.ok) {
                // 获取管理员token（需要在环境变量中配置）
                const adminResponse = await fetch(`${strapiUrl}/api/auth/local`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        identifier: process.env.STRAPI_ADMIN_EMAIL,
                        password: process.env.STRAPI_ADMIN_PASSWORD,
                    }),
                })

                if (adminResponse.ok) {
                    const adminData = await adminResponse.json()

                    // 使用管理员token更新用户密码
                    const updateResponse = await fetch(`${strapiUrl}/api/users/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${adminData.jwt}`,
                        },
                        body: JSON.stringify({
                            password: password,
                        }),
                    })

                    if (!updateResponse.ok) {
                        throw new Error('更新密码失败')
                    }
                } else {
                    throw new Error('权限验证失败')
                }
            }

            // 密码重置成功，删除token
            resetTokens.delete(token)

            return NextResponse.json({
                message: '密码重置成功！请使用新密码登录。'
            })

        } catch (strapiError) {
            console.error('Strapi密码重置过程中出错:', strapiError)
            return NextResponse.json({ error: '密码重置失败，请稍后重试' }, { status: 500 })
        }

    } catch (error) {
        console.error('重置密码API出错:', error)
        return NextResponse.json(
            { error: '密码重置失败，请稍后重试' },
            { status: 500 }
        )
    }
}

// 验证重置token的GET请求
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url)
        const token = url.searchParams.get('token')

        if (!token) {
            return NextResponse.json({ error: '重置token不能为空' }, { status: 400 })
        }

        // 验证token
        const tokenData = resetTokens.get(token)
        if (!tokenData) {
            return NextResponse.json({ error: '重置链接无效', valid: false }, { status: 400 })
        }

        // 检查token是否过期
        if (Date.now() > tokenData.expires) {
            resetTokens.delete(token)
            return NextResponse.json({ error: '重置链接已过期', valid: false }, { status: 400 })
        }

        return NextResponse.json({
            valid: true,
            email: tokenData.email.replace(/(.{2}).*(@.*)/, '$1****$2'), // 脱敏显示邮箱
        })

    } catch (error) {
        console.error('验证重置token失败:', error)
        return NextResponse.json(
            { error: '验证失败', valid: false },
            { status: 500 }
        )
    }
}

// 导出重置token存储
export { resetTokens }