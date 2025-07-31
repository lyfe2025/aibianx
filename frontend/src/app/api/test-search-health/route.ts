/**
 * 测试搜索引擎健康状态的API端点
 * 
 * 这个端点用于测试前端到后端的搜索API连接
 */

import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'

const STRAPI_URL = config.backend.url

export async function GET(request: NextRequest) {
    try {
        console.log('🔍 测试搜索健康状态...')

        // 测试到后端的连接
        const response = await fetch(`${STRAPI_URL}/api/search/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('✅ 后端响应:', data)

        return NextResponse.json({
            success: true,
            backend_url: `${STRAPI_URL}/api/search/health`,
            backend_response: data,
            status: data.data?.status === 'available' ? 'healthy' : 'unhealthy',
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('❌ 搜索健康检查失败:', error)

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : '未知错误',
            backend_url: `${STRAPI_URL}/api/search/health`,
            timestamp: new Date().toISOString()
        }, { status: 500 })
    }
}