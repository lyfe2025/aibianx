'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { useModalStore } from '@/stores'

interface PaymentError {
  paymentNo: string
  reason: string
  status: 'failed' | 'cancelled' | 'timeout'
  failedAt?: string
}

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const { openModal } = useModalStore()
  const [paymentError, setPaymentError] = useState<PaymentError | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const paymentNo = searchParams.get('paymentNo')
    const status = searchParams.get('status') as PaymentError['status']
    const reason = searchParams.get('reason')
    
    if (paymentNo) {
      // 查询支付失败详情
      fetchPaymentError(paymentNo, status, reason)
    } else {
      setLoading(false)
    }
  }, [searchParams])

  const fetchPaymentError = async (paymentNo: string, status?: string, reason?: string) => {
    try {
      // TODO: 替换为实际的API调用
      const response = await fetch(`/api/payments/status/${paymentNo}`)
      const data = await response.json()
      
      if (data.success) {
        setPaymentError({
          paymentNo,
          status: data.data.status || status || 'failed',
          reason: data.data.failReason || reason || '支付过程中发生错误',
          failedAt: data.data.failedAt || new Date().toISOString()
        })
      } else {
        setPaymentError({
          paymentNo,
          status: status || 'failed',
          reason: reason || '支付失败',
          failedAt: new Date().toISOString()
        })
      }
    } catch (error) {
      console.error('查询支付状态失败:', error)
      setPaymentError({
        paymentNo,
        status: status || 'failed',
        reason: reason || '网络错误，请稍后重试',
        failedAt: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  const getErrorMessage = (status: PaymentError['status']) => {
    switch (status) {
      case 'cancelled':
        return '支付已取消'
      case 'timeout':
        return '支付超时'
      case 'failed':
      default:
        return '支付失败'
    }
  }

  const getErrorDescription = (status: PaymentError['status']) => {
    switch (status) {
      case 'cancelled':
        return '您已取消了此次支付，可以重新选择支付方式'
      case 'timeout':
        return '支付超时，请重新发起支付'
      case 'failed':
      default:
        return '支付过程中发生错误，请检查支付信息后重试'
    }
  }

  const getErrorIcon = (status: PaymentError['status']) => {
    switch (status) {
      case 'cancelled':
        return (
          <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      case 'timeout':
        return (
          <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'failed':
      default:
        return (
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.081 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
    }
  }

  const getBackgroundColor = (status: PaymentError['status']) => {
    switch (status) {
      case 'cancelled':
        return 'bg-gray-100'
      case 'timeout':
        return 'bg-orange-100'
      case 'failed':
      default:
        return 'bg-red-100'
    }
  }

  if (loading) {
    return (
      <Container size="md" className="py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在查询支付状态...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container size="md" className="py-16">
      <div className="text-center">
        {/* 错误图标 */}
        <div className={`w-20 h-20 ${paymentError ? getBackgroundColor(paymentError.status) : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {paymentError ? getErrorIcon(paymentError.status) : (
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.081 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )}
        </div>

        {/* 主标题 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {paymentError ? getErrorMessage(paymentError.status) : '支付出现问题'}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {paymentError ? getErrorDescription(paymentError.status) : '请重新尝试支付'}
        </p>

        {/* 错误详情 */}
        {paymentError && (
          <div className="glass-card p-6 max-w-md mx-auto mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">详细信息</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">订单号</span>
                <span className="font-mono text-sm">{paymentError.paymentNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">状态</span>
                <span className={`font-medium ${
                  paymentError.status === 'cancelled' ? 'text-gray-600' :
                  paymentError.status === 'timeout' ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {getErrorMessage(paymentError.status)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">失败原因</span>
                <span className="text-sm text-right max-w-40">{paymentError.reason}</span>
              </div>
              {paymentError.failedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">时间</span>
                  <span className="text-sm">
                    {new Date(paymentError.failedAt).toLocaleString('zh-CN')}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 解决方案 */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">您可以尝试：</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium">重新支付</p>
                <p className="text-sm text-gray-600">返回会员套餐页面，重新选择并支付</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium">更换支付方式</p>
                <p className="text-sm text-gray-600">尝试使用其他支付方式，如支付宝、微信或信用卡</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium">检查账户余额</p>
                <p className="text-sm text-gray-600">确保支付账户有足够余额完成此次交易</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">4</span>
              </div>
              <div>
                <p className="font-medium">联系客服</p>
                <p className="text-sm text-gray-600">如问题持续存在，请联系我们的客服团队</p>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => openModal('membership')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            重新支付
          </button>
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
            遇到问题？联系客服获得帮助：
            <a href="mailto:support@aibianx.com" className="underline ml-1">
              support@aibianx.com
            </a>
            <span className="mx-2">|</span>
            <a href="tel:400-123-4567" className="underline">
              400-123-4567
            </a>
          </p>
        </div>
      </div>
    </Container>
  )
}