'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Container } from '@/components/ui'
import { useModalStore } from '@/stores'

export default function PaymentCancelPage() {
  const searchParams = useSearchParams()
  const { openModal } = useModalStore()
  const paymentNo = searchParams.get('paymentNo')
  const paymentIntent = searchParams.get('paymentIntent')

  return (
    <Container size="md" className="py-16">
      <div className="text-center">
        {/* 取消图标 */}
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* 主标题 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          支付已取消
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          您已取消此次支付，可以重新选择支付方式
        </p>

        {/* 订单信息 */}
        {(paymentNo || paymentIntent) && (
          <div className="glass-card p-6 max-w-md mx-auto mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">订单信息</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">订单号</span>
                <span className="font-mono text-sm">{paymentNo || paymentIntent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">状态</span>
                <span className="text-gray-600 font-medium">已取消</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">取消时间</span>
                <span className="text-sm">
                  {new Date().toLocaleString('zh-CN')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 接下来的选择 */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">您可以选择：</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-blue-900">重新支付</p>
                <p className="text-sm text-blue-700">返回会员套餐页面，重新选择并完成支付</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-green-900">体验免费版</p>
                <p className="text-sm text-green-700">先体验免费功能，随时可以升级到付费版本</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-purple-900">了解更多</p>
                <p className="text-sm text-purple-700">查看更多功能介绍，确定最适合您的套餐</p>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => openModal('membership')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            重新选择套餐
          </button>
          <Link
            href="/"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            返回首页
          </Link>
        </div>

        {/* 为什么选择我们 */}
        <div className="mt-12 glass-card p-6">
          <h3 className="font-semibold text-gray-900 mb-6">为什么选择AI变现之路？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">快速见效</h4>
              <p className="text-sm text-gray-600">7天内看到AI变现效果，30天不满意全额退款</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">专业保障</h4>
              <p className="text-sm text-gray-600">行业专家团队，提供专业指导和技术支持</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">社群支持</h4>
              <p className="text-sm text-gray-600">加入活跃社群，与同行交流经验，共同成长</p>
            </div>
          </div>
        </div>

        {/* 联系信息 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 text-sm">
            有任何疑问？我们随时为您服务：
            <a href="mailto:support@aibianx.com" className="text-blue-600 underline ml-1">
              support@aibianx.com
            </a>
            <span className="mx-2">|</span>
            <a href="tel:400-123-4567" className="text-blue-600 underline">
              400-123-4567
            </a>
          </p>
        </div>
      </div>
    </Container>
  )
}