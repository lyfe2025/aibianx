'use client'

import React, { useState } from 'react'
import { Container } from '@/components/ui'
import { PaymentCheckout } from '@/components/molecules'

interface TestOrder {
  orderId: string
  amount: number
  productName: string
  description: string
  currency: string
}

const testOrders: TestOrder[] = [
  {
    orderId: 'TEST_ORDER_001',
    amount: 100, // 1元
    productName: '测试商品 - 小额支付',
    description: '用于测试支付流程的小额商品',
    currency: 'CNY'
  },
  {
    orderId: 'TEST_ORDER_002', 
    amount: 9900, // 99元
    productName: 'AI变现之路 - 专业版月费',
    description: '专业版会员月度订阅',
    currency: 'CNY'
  },
  {
    orderId: 'TEST_ORDER_003',
    amount: 29900, // 299元
    productName: 'AI变现之路 - 企业版月费',
    description: '企业版会员月度订阅',
    currency: 'CNY'
  }
]

export default function PaymentTestPage() {
  const [selectedOrder, setSelectedOrder] = useState<TestOrder | null>(null)
  const [testResults, setTestResults] = useState<any[]>([])

  const handleOrderSelect = (order: TestOrder) => {
    setSelectedOrder(order)
  }

  const handlePaymentSuccess = (result: any) => {
    console.log('支付成功:', result)
    const testResult = {
      timestamp: new Date().toISOString(),
      orderId: selectedOrder?.orderId,
      status: 'success',
      result
    }
    setTestResults(prev => [testResult, ...prev])
    alert(`支付成功！\n订单号: ${selectedOrder?.orderId}\n金额: ${selectedOrder?.amount}分`)
  }

  const handlePaymentError = (error: Error) => {
    console.error('支付失败:', error)
    const testResult = {
      timestamp: new Date().toISOString(),
      orderId: selectedOrder?.orderId,
      status: 'error',
      error: error.message
    }
    setTestResults(prev => [testResult, ...prev])
    alert(`支付失败: ${error.message}`)
  }

  const handleBackToOrders = () => {
    setSelectedOrder(null)
  }

  const clearTestResults = () => {
    setTestResults([])
  }

  if (selectedOrder) {
    return (
      <Container size="xl" className="py-8">
        <div className="max-w-2xl mx-auto">
          {/* 返回按钮 */}
          <button
            onClick={handleBackToOrders}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回订单选择
          </button>

          {/* 测试标识 */}
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">测试模式</span>
              <span className="ml-2">此页面仅用于支付系统功能测试</span>
            </div>
          </div>

          {/* 订单信息 */}
          <div className="glass-card p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">测试订单信息</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">订单号</span>
                <span className="font-mono text-sm">{selectedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">商品名称</span>
                <span className="font-medium">{selectedOrder.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">商品描述</span>
                <span className="text-sm text-gray-700">{selectedOrder.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">支付金额</span>
                <span className="text-lg font-semibold text-blue-600">
                  ¥{(selectedOrder.amount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">货币</span>
                <span>{selectedOrder.currency}</span>
              </div>
            </div>
          </div>

          {/* 支付组件 */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">选择支付方式</h3>
            
            <PaymentCheckout
              orderData={selectedOrder}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container size="xl" className="py-16">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          支付系统测试页面
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          测试支付组件的功能，验证不同支付方式的集成效果
        </p>
      </div>

      {/* 测试说明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">测试说明</h3>
        <div className="space-y-2 text-blue-800">
          <p>• 此页面用于测试支付系统的前端集成</p>
          <p>• 选择测试订单后，可以测试不同支付方式的UI和交互</p>
          <p>• 支付成功/失败的回调处理会在控制台显示</p>
          <p>• 如果后端未配置真实支付平台，支付流程会模拟执行</p>
        </div>
      </div>

      {/* 测试订单选择 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">选择测试订单</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testOrders.map((order) => (
            <div
              key={order.orderId}
              className="glass-card p-6 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => handleOrderSelect(order)}
            >
              <h3 className="font-semibold text-gray-900 mb-2">{order.productName}</h3>
              <p className="text-sm text-gray-600 mb-4">{order.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">订单号: {order.orderId}</span>
                <span className="text-lg font-bold text-blue-600">
                  ¥{(order.amount / 100).toFixed(2)}
                </span>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                测试此订单
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 测试结果 */}
      {testResults.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">测试结果</h2>
            <button
              onClick={clearTestResults}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              清空结果
            </button>
          </div>
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`glass-card p-4 ${
                  result.status === 'success' 
                    ? 'border-l-4 border-green-500' 
                    : 'border-l-4 border-red-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-sm text-gray-600">
                    {result.orderId}
                  </span>
                  <span className={`text-sm font-medium ${
                    result.status === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.status === 'success' ? '成功' : '失败'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {new Date(result.timestamp).toLocaleString('zh-CN')}
                </div>
                <div className="text-sm">
                  {result.status === 'success' ? (
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(result.result, null, 2)}
                    </pre>
                  ) : (
                    <span className="text-red-600">{result.error}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 功能检查清单 */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">功能检查清单</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">支付方式选择</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="alipay-ui" className="rounded" />
                <label htmlFor="alipay-ui" className="text-gray-600">支付宝UI正常显示</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="wechat-ui" className="rounded" />
                <label htmlFor="wechat-ui" className="text-gray-600">微信支付UI正常显示</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="stripe-ui" className="rounded" />
                <label htmlFor="stripe-ui" className="text-gray-600">Stripe UI正常显示</label>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">交互功能</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="payment-create" className="rounded" />
                <label htmlFor="payment-create" className="text-gray-600">支付创建流程</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="payment-cancel" className="rounded" />
                <label htmlFor="payment-cancel" className="text-gray-600">支付取消功能</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="status-polling" className="rounded" />
                <label htmlFor="status-polling" className="text-gray-600">状态轮询机制</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}