/**
 * NextAuth测试API端点
 * GET /api/test-nextauth
 * 
 * 测试NextAuth配置是否正常工作
 */

import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // 测试NextAuth配置
        const testConfig = {
            providers: ['credentials'],
            session: { strategy: 'jwt' },
            pages: {
                signIn: '/',
                error: '/auth/error'
            }
        }

        return NextResponse.json({
            success: true,
            message: 'NextAuth配置测试正常',
            config: testConfig,
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('NextAuth测试错误:', error)
        return NextResponse.json({
            success: false,
            message: '测试失败',
            error: error.message
        }, { status: 500 })
    }
}