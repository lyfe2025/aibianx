'use client'

import React, { useState } from 'react'
import { Container } from '@/components/ui'
import { MembershipPlanCard, PaymentCheckout } from '@/components/molecules'
import { membershipPlans, type BillingCycle, type MembershipPlan } from '@/lib/membership'

interface MembershipPageState {
  selectedPlan: MembershipPlan | null
  billingCycle: BillingCycle
  showPayment: boolean
  paymentLoading: boolean
}

export default function MembershipPage() {
  const [state, setState] = useState<MembershipPageState>({
    selectedPlan: null,
    billingCycle: 'annually',
    showPayment: false,
    paymentLoading: false
  })

  const handlePlanSelect = (planId: string) => {
    const plan = membershipPlans.find(p => p.id === planId)
    if (plan && plan.id !== 'free') {
      setState(prev => ({
        ...prev,
        selectedPlan: plan,
        showPayment: false
      }))
    }
  }

  const handleBillingCycleChange = (cycle: BillingCycle) => {
    setState(prev => ({
      ...prev,
      billingCycle: cycle
    }))
  }

  const handleProceedToPayment = () => {
    if (state.selectedPlan) {
      setState(prev => ({
        ...prev,
        showPayment: true
      }))
    }
  }

  const handleBackToPlans = () => {
    setState(prev => ({
      ...prev,
      showPayment: false
    }))
  }

  const handlePaymentSuccess = (result: any) => {
    console.log('支付成功:', result)
    // TODO: 处理支付成功逻辑
    // - 更新用户会员状态
    // - 跳转到成功页面
    alert('支付成功！会员权限已激活')
    setState(prev => ({
      ...prev,
      showPayment: false,
      selectedPlan: null
    }))
  }

  const handlePaymentError = (error: Error) => {
    console.error('支付失败:', error)
    alert(`支付失败: ${error.message}`)
  }

  const generateOrderId = () => {
    return `ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  }

  if (state.showPayment && state.selectedPlan) {
    const amount = state.selectedPlan.price[state.billingCycle]
    const productName = `${state.selectedPlan.name} - ${state.billingCycle === 'monthly' ? '月费' : '年费'}`
    
    return (
      <Container size="xl" className="py-8">
        <div className="max-w-2xl mx-auto">
          {/* 返回按钮 */}
          <button
            onClick={handleBackToPlans}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回套餐选择
          </button>

          {/* 订单摘要 */}
          <div className="glass-card p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">订单摘要</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">套餐</span>
                <span className="font-medium">{state.selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">计费周期</span>
                <span className="font-medium">{state.billingCycle === 'monthly' ? '按月计费' : '按年计费'}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>总计</span>
                <span className="text-blue-600">¥{amount}</span>
              </div>
            </div>
          </div>

          {/* 支付组件 */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">选择支付方式</h3>
            
            <PaymentCheckout
              orderData={{
                orderId: generateOrderId(),
                amount: amount * 100, // 转为分
                productName,
                description: state.selectedPlan.description,
                currency: 'CNY'
              }}
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
          选择您的会员套餐
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          解锁AI变现的全部潜力，从免费体验到专业级服务
        </p>
      </div>

      {/* 计费周期切换 */}
      <div className="flex justify-center mb-12">
        <div className="glass-card p-1 inline-flex">
          <button
            onClick={() => handleBillingCycleChange('monthly')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              state.billingCycle === 'monthly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            按月付费
          </button>
          <button
            onClick={() => handleBillingCycleChange('annually')}
            className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
              state.billingCycle === 'annually'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            按年付费
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              省50%
            </span>
          </button>
        </div>
      </div>

      {/* 套餐卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {membershipPlans.map((plan) => (
          <MembershipPlanCard
            key={plan.id}
            plan={plan}
            billingCycle={state.billingCycle}
            selected={state.selectedPlan?.id === plan.id}
            onSelect={handlePlanSelect}
            loading={state.paymentLoading}
          />
        ))}
      </div>

      {/* 继续支付按钮 */}
      {state.selectedPlan && state.selectedPlan.id !== 'free' && (
        <div className="text-center">
          <button
            onClick={handleProceedToPayment}
            disabled={state.paymentLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.paymentLoading ? '处理中...' : '继续支付'}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            选择支付方式，享受30天无理由退款保障
          </p>
        </div>
      )}

      {/* 功能对比 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          功能对比
        </h2>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">功能</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">免费版</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">专业版</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">企业版</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">AI工具访问</td>
                  <td className="px-6 py-4 text-center">基础工具</td>
                  <td className="px-6 py-4 text-center text-green-600">✓ 完整工具库</td>
                  <td className="px-6 py-4 text-center text-green-600">✓ 完整工具库</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">变现案例</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center text-green-600">✓ 独家案例</td>
                  <td className="px-6 py-4 text-center text-green-600">✓ 独家案例</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">专家指导</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center text-green-600">✓ 1对1咨询</td>
                  <td className="px-6 py-4 text-center text-green-600">✓ 专属客户经理</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">团队协作</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center text-green-600">✓ 团队工具</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">API访问</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center text-green-600">✓ 完整API</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          常见问题
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-gray-900 mb-3">可以随时取消订阅吗？</h3>
            <p className="text-gray-600">
              是的，您可以随时在设置中取消订阅。取消后，您的会员权限将在当前计费周期结束时终止。
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold text-gray-900 mb-3">支持哪些支付方式？</h3>
            <p className="text-gray-600">
              我们支持支付宝、微信支付和信用卡支付，确保您的支付安全便捷。
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold text-gray-900 mb-3">有退款保障吗？</h3>
            <p className="text-gray-600">
              我们提供30天无理由退款保障。如果您对服务不满意，可在30天内申请全额退款。
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}