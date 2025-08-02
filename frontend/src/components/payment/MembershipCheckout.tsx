'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CheckIcon, CrownIcon, StarIcon, ZapIcon } from '@/components/ui/Icons'

interface Plan {
  id: string
  name: string
  price: number
  originalPrice?: number
  duration: string
  features: string[]
  popular?: boolean
  icon: React.ComponentType<{ className?: string }>
}

const plans: Plan[] = [
  {
    id: 'basic_monthly',
    name: '基础会员',
    price: 29,
    originalPrice: 39,
    duration: '月',
    icon: StarIcon,
    features: [
      '解锁所有文章内容',
      '移除广告',
      '基础邮件支持',
      '获得邀请权限'
    ]
  },
  {
    id: 'premium_yearly',
    name: '高级会员',
    price: 299,
    originalPrice: 348,
    duration: '年',
    popular: true,
    icon: CrownIcon,
    features: [
      '包含基础会员所有权益',
      '优先邮件支持',
      '独家内容访问',
      '高级邀请奖励',
      '专属会员徽章'
    ]
  },
  {
    id: 'vip_lifetime',
    name: 'VIP终身',
    price: 999,
    originalPrice: 1299,
    duration: '终身',
    icon: ZapIcon,
    features: [
      '包含高级会员所有权益',
      '终身免费更新',
      '一对一专属支持',
      '最高邀请返佣',
      'VIP专属社群'
    ]
  }
]

interface MembershipCheckoutProps {
  onSuccess?: () => void
}

export default function MembershipCheckout({ onSuccess }: MembershipCheckoutProps) {
  const { data: session } = useSession()
  const [selectedPlan, setSelectedPlan] = useState<string>('premium_yearly')
  const [loading, setLoading] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan)

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return

    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: couponCode,
          planId: selectedPlan 
        })
      })

      if (response.ok) {
        const { discount } = await response.json()
        setDiscountAmount(discount)
      } else {
        alert('优惠券无效或已过期')
      }
    } catch (error) {
      console.error('验证优惠券失败:', error)
      alert('验证优惠券失败，请重试')
    }
  }

  const handleCheckout = async () => {
    if (!session?.user) {
      alert('请先登录')
      return
    }

    if (!selectedPlanData) return

    setLoading(true)

    try {
      // 1. 创建订单
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedPlan,
          productName: selectedPlanData.name,
          productType: selectedPlanData.duration === '月' ? 'monthly' : 
                      selectedPlanData.duration === '年' ? 'yearly' : 'lifetime',
          originalPrice: (selectedPlanData.originalPrice || selectedPlanData.price) * 100, // 转换为分
          discountAmount: discountAmount * 100,
          finalPrice: (selectedPlanData.price - discountAmount) * 100,
          couponCode: couponCode || null
        })
      })

      if (!orderResponse.ok) {
        throw new Error('创建订单失败')
      }

      const order = await orderResponse.json()

      // 2. 创建支付记录
      const paymentResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: order.id,
          paymentMethod: 'alipay', // 默认支付宝，实际应该让用户选择
          amount: order.finalPrice,
          currency: 'CNY'
        })
      })

      if (!paymentResponse.ok) {
        throw new Error('创建支付记录失败')
      }

      const payment = await paymentResponse.json()

      // 3. 跳转到支付页面（这里简化处理）
      alert(`订单创建成功！\n订单号：${order.orderNo}\n金额：¥${(order.finalPrice / 100).toFixed(2)}`)
      
      // 模拟支付成功
      setTimeout(() => {
        onSuccess?.()
      }, 1000)

    } catch (error) {
      console.error('结账失败:', error)
      alert('结账失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const finalPrice = selectedPlanData ? selectedPlanData.price - discountAmount : 0

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">选择会员套餐</h1>
        <p className="text-gray-600">
          升级会员，解锁全部内容并获得邀请返佣权限
        </p>
      </div>

      {/* 套餐选择 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => {
          const IconComponent = plan.icon
          const isSelected = selectedPlan === plan.id

          return (
            <Card
              key={plan.id}
              className={`relative p-6 cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-primary shadow-lg scale-105' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  最受欢迎
                </Badge>
              )}

              <div className="text-center">
                <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold">¥{plan.price}</span>
                    <span className="text-gray-500">/ {plan.duration}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      原价 ¥{plan.originalPrice}
                    </div>
                  )}
                </div>

                <ul className="space-y-2 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )
        })}
      </div>

      {/* 优惠券输入 */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">优惠券</h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="请输入优惠券代码"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button 
            variant="outline" 
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim()}
          >
            应用
          </Button>
        </div>
        {discountAmount > 0 && (
          <div className="mt-2 text-green-600 text-sm">
            已优惠 ¥{discountAmount}
          </div>
        )}
      </Card>

      {/* 订单摘要 */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">订单摘要</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>套餐</span>
            <span>{selectedPlanData?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>原价</span>
            <span>¥{selectedPlanData?.originalPrice || selectedPlanData?.price}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>优惠</span>
              <span>-¥{discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>实付金额</span>
            <span>¥{finalPrice}</span>
          </div>
        </div>
      </Card>

      {/* 支付按钮 */}
      <Button
        className="w-full py-3 text-lg"
        onClick={handleCheckout}
        disabled={loading || !session?.user}
      >
        {loading ? '处理中...' : `立即支付 ¥${finalPrice}`}
      </Button>

      {!session?.user && (
        <p className="text-center text-gray-500 text-sm mt-2">
          请先登录后再进行购买
        </p>
      )}
    </div>
  )
}