/**
 * 简单测试API路由 - 验证Next.js API路由系统工作正常
 */

export async function GET() {
    return Response.json({
        message: 'API路由系统工作正常',
        timestamp: new Date().toISOString(),
        nextAuth: 'NextAuth.js应该能正常工作'
    })
}

export async function POST() {
    return Response.json({
        message: 'POST请求成功',
        timestamp: new Date().toISOString()
    })
}