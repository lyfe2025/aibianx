/**
 * 验证邮箱验证码API
 * 验证用户输入的验证码是否正确
 */

import { NextRequest, NextResponse } from 'next/server'

// 引入验证码存储（实际应用中应使用Redis等持久化存储）
const verificationCodes = new Map<string, { code: string; expires: number }>()

export async function POST(request: NextRequest) {
    try {
        const { email, code } = await request.json()

        if (!email || !code) {
            return NextResponse.json({ error: '邮箱地址和验证码不能为空' }, { status: 400 })
        }

        // 获取存储的验证码信息
        const storedData = verificationCodes.get(email)

        if (!storedData) {
            return NextResponse.json({ error: '验证码不存在或已过期' }, { status: 400 })
        }

        // 检查验证码是否过期
        if (Date.now() > storedData.expires) {
            verificationCodes.delete(email)
            return NextResponse.json({ error: '验证码已过期，请重新获取' }, { status: 400 })
        }

        // 验证验证码
        if (storedData.code !== code.toString()) {
            return NextResponse.json({ error: '验证码不正确' }, { status: 400 })
        }

        // 验证成功，但不立即删除验证码，等注册完成后再删除
        return NextResponse.json({
            message: '验证码验证成功',
            verified: true
        })

    } catch (error) {
        console.error('验证验证码失败:', error)
        return NextResponse.json(
            { error: '验证失败，请稍后重试' },
            { status: 500 }
        )
    }
}

// 导出验证码存储供其他API使用
export { verificationCodes }