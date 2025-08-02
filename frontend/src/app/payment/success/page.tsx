'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui'

interface PaymentResult {
  paymentNo: string
  amount: number
  productName: string
  status: 'success' | 'processing' | 'failed'
  transactionId?: string
  completedAt?: string
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const paymentNo = searchParams.get('paymentNo')
    const paymentIntent = searchParams.get('paymentIntent')
    
    if (paymentNo || paymentIntent) {
      // 查询支付结果
      fetchPaymentResult(paymentNo || paymentIntent)
    } else {
      setLoading(false)
    }
  }, [searchParams])

  const fetchPaymentResult = async (paymentId: string) => {
    try {
      // TODO: 替换为实际的API调用
      const response = await fetch(`/api/payments/status/${paymentId}`)
      const data = await response.json()
      
      if (data.success) {
        setPaymentResult(data.data)
      }
    } catch (error) {
      console.error('查询支付结果失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Container size="md" className="py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在确认支付结果...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container size="md" className="py-16">
      <div className="text-center">
        {/* 成功图标 */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* 主标题 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          支付成功！
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          恭喜您，会员权限已激活
        </p>

        {/* 支付详情 */}
        {paymentResult && (
          <div className="glass-card p-6 max-w-md mx-auto mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">支付详情</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">订单号</span>
                <span className="font-mono text-sm">{paymentResult.paymentNo}</span>
              </div>
              {paymentResult.productName && (
                <div className="flex justify-between">
                  <span className="text-gray-600">商品</span>
                  <span>{paymentResult.productName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">支付金额</span>
                <span className="font-semibold text-green-600">
                  ¥{(paymentResult.amount / 100).toFixed(2)}
                </span>
              </div>
              {paymentResult.completedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">完成时间</span>
                  <span className="text-sm">
                    {new Date(paymentResult.completedAt).toLocaleString('zh-CN')}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 接下来的步骤 */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">接下来您可以：</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <span className="text-left">访问完整的AI工具库和变现案例</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <span className="text-left">加入VIP专属社群，与同行交流</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <span className="text-left">预约专家1对1咨询，制定变现策略</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/profile"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            查看我的会员
          </Link>
          <Link
            href="/"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            返回首页
          </Link>
        </div>

        {/* 客服信息 */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            如有任何问题，请联系客服：
            <a href="mailto:support@aibianx.com" className="underline ml-1">
              support@aibianx.com
            </a>
          </p>
        </div>
      </div>
    </Container>
  )
}