/**
 * 用户注册API
 * 完成用户注册并创建Strapi用户
 */

import { NextRequest, NextResponse } from 'next/server'

// 引入验证码存储
const verificationCodes = new Map<string, { code: string; expires: number }>()

export async function POST(request: NextRequest) {
    try {
        const { email, password, code, username } = await request.json()

        // 验证必填字段
        if (!email || !password || !code) {
            return NextResponse.json({ error: '邮箱、密码和验证码不能为空' }, { status: 400 })
        }

        // 验证密码强度
        if (password.length < 6) {
            return NextResponse.json({ error: '密码长度至少6位' }, { status: 400 })
        }

        // 再次验证验证码
        const storedData = verificationCodes.get(email)
        if (!storedData || Date.now() > storedData.expires || storedData.code !== code.toString()) {
            return NextResponse.json({ error: '验证码无效或已过期' }, { status: 400 })
        }

        try {
            const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

            // 再次检查邮箱是否已注册
            const userCheckResponse = await fetch(`${strapiUrl}/api/users?filters[email][$eq]=${email}`)
            if (userCheckResponse.ok) {
                const existingUsers = await userCheckResponse.json()
                if (existingUsers.length > 0) {
                    return NextResponse.json({ error: '该邮箱已被注册' }, { status: 400 })
                }
            }

            // 使用Strapi注册API创建用户
            const registrationResponse = await fetch(`${strapiUrl}/api/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username || email.split('@')[0], // 如果没有提供用户名，使用邮箱前缀
                    email: email,
                    password: password,
                    confirmed: true, // 邮箱已验证
                }),
            })

            if (!registrationResponse.ok) {
                const errorData = await registrationResponse.json()
                console.error('Strapi注册失败:', errorData)

                // 处理常见的Strapi错误
                if (errorData.error?.message?.includes('already taken')) {
                    return NextResponse.json({ error: '用户名或邮箱已被使用' }, { status: 400 })
                }

                return NextResponse.json({ error: '注册失败，请稍后重试' }, { status: 500 })
            }

            const userData = await registrationResponse.json()

            // 注册成功，删除验证码
            verificationCodes.delete(email)

            return NextResponse.json({
                message: '注册成功！',
                user: {
                    id: userData.user.id,
                    username: userData.user.username,
                    email: userData.user.email,
                },
                // 不返回JWT token，让用户重新登录以获取session
            })

        } catch (strapiError) {
            console.error('Strapi注册过程中出错:', strapiError)
            return NextResponse.json({ error: '注册服务暂时不可用，请稍后重试' }, { status: 500 })
        }

    } catch (error) {
        console.error('注册API出错:', error)
        return NextResponse.json(
            { error: '注册失败，请稍后重试' },
            { status: 500 }
        )
    }
}

// 导出验证码存储供其他API使用
export { verificationCodes }