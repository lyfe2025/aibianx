import { NextResponse } from 'next/server'
import { getArticles } from '@/lib/strapi'

export async function GET() {
    try {
        const result = await getArticles({ pageSize: 2 })

        return NextResponse.json({
            success: true,
            data: result,
            message: 'API调用成功'
        })
    } catch (error) {
        console.error('API测试错误:', error)

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            message: 'API调用失败'
        }, { status: 500 })
    }
} 