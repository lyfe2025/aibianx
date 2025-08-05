'use client'

import { useState } from 'react'
import { useThemeStore, useUserStore } from '@/stores'
import { Icon } from '@/components/ui'

interface MembershipPlan {
  level: 'basic' | 'premium' | 'vip'
  name: string
  planType: 'monthly' | 'yearly' | 'lifetime'
  originalPrice: number
  actualPrice: number
  features: string[]
  badge?: string
  popular?: boolean
}

interface MembershipPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  onPurchaseSuccess?: (membership: any) => void
}

/**
 * 会员服务购买弹窗组件
 * 
 * 功能特性：
 * - 会员套餐选择 (basic/premium/vip)
 * - 付费周期选择 (monthly/yearly/lifetime)
 * - 集成支付系统
 * - 与邮件订阅完全分离
 */
export function MembershipPurchaseModal({ 
  isOpen, 
  onClose, 
  onPurchaseSuccess 
}: MembershipPurchaseModalProps) {
  const { theme } = useThemeStore()
  const { user } = useUserStore()
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // 会员套餐配置
  const membershipPlans: MembershipPlan[] = [
    {
      level: 'basic',
      name: '基础会员',
      planType: 'monthly',
      originalPrice: 2900, // 29元/月
      actualPrice: 1900,   // 19元/月
      features: [
        '基础内容下载 (10个/月)',
        '无广告浏览体验',
        'AI工具使用指南',
        '基础客服支持'
      ]
    },
    {
      level: 'premium', 
      name: '高级会员',
      planType: 'yearly',
      originalPrice: 29900, // 299元/年
      actualPrice: 19900,   // 199元/年
      features: [
        '高级内容下载 (50个/月)',
        '独家资源访问',
        '无广告浏览体验', 
        'AI变现案例库',
        '专属社群访问',
        '优先客服支持'
      ],
      badge: '最受欢迎',
      popular: true
    },
    {
      level: 'vip',
      name: 'VIP终身会员',
      planType: 'lifetime', 
      originalPrice: 99900, // 999元终身
      actualPrice: 59900,   // 599元终身
      features: [
        '无限内容下载',
        '所有独家内容访问',
        '无广告浏览体验',
        'VIP专属资源库',
        'VIP专属社群', 
        '1对1专属顾问',
        '优先新功能体验',
        '终身免费更新'
      ],
      badge: '超值推荐'
    }
  ]

  const handlePurchase = async (plan: MembershipPlan) => {
    if (!user) {
      alert('请先登录再购买会员服务')
      return
    }

    setSelectedPlan(plan)
    setIsProcessing(true)

    try {
      // 1. 创建订单
      const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt') || (user as any).jwt || ''}`
        },
        body: JSON.stringify({
          data: {
            user: user.id,
            productType: 'membership',
            productName: plan.name,
            productDesc: `${plan.name} - ${plan.planType}`,
            originalPrice: plan.originalPrice,
            finalPrice: plan.actualPrice,
            discountAmount: plan.originalPrice - plan.actualPrice,
            quantity: 1,
            orderType: 'membership',
            paymentMethod: 'pending', // 待选择支付方式
            metadata: {
              membershipLevel: plan.level,
              planType: plan.planType,
              features: plan.features
            }
          }
        })
      })

      if (!orderResponse.ok) {
        throw new Error('创建订单失败')
      }

      const order = await orderResponse.json()

      // 2. 跳转到支付页面或显示支付选项
      const paymentUrl = `/payment?orderId=${order.data.id}&type=membership`
      window.location.href = paymentUrl

    } catch (error) {
      console.error('购买会员失败:', error)
      alert('购买失败，请稍后重试')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(0) // 转换为元并去掉小数点
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #0C1E47 0%, #1E0C47 100%)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '20px',
          padding: '32px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div className="flex justify-between items-center mb-8">
          <h2 style={{
            color: 'var(--color-text-primary)',
            fontSize: '28px',
            fontWeight: '700',
            fontFamily: "'Alibaba PuHuiTi 3.0', sans-serif"
          }}>
            选择会员套餐
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <Icon name="x" style={{ color: 'var(--color-text-secondary)', width: '24px', height: '24px' }} />
          </button>
        </div>

        {/* 套餐选择 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {membershipPlans.map((plan) => (
            <div
              key={`${plan.level}-${plan.planType}`}
              className="relative"
              style={{
                background: theme === 'dark'
                  ? 'rgba(18, 18, 18, 0.6)'
                  : 'rgba(255, 255, 255, 0.8)',
                border: plan.popular 
                  ? '2px solid var(--color-primary-blue)' 
                  : '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: plan === selectedPlan ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => setSelectedPlan(plan)}
            >
              {/* 推荐标签 */}
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  padding: '4px 16px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {plan.badge}
                </div>
              )}

              {/* 套餐名称 */}
              <h3 style={{
                color: 'var(--color-text-primary)',
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                {plan.name}
              </h3>

              {/* 价格 */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '14px',
                  textDecoration: 'line-through',
                  marginBottom: '4px'
                }}>
                  原价 ¥{formatPrice(plan.originalPrice)}
                </div>
                <div style={{
                  color: 'var(--color-primary-blue)',
                  fontSize: '32px',
                  fontWeight: '700'
                }}>
                  ¥{formatPrice(plan.actualPrice)}
                </div>
                <div style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '14px'
                }}>
                  {plan.planType === 'monthly' && '每月'}
                  {plan.planType === 'yearly' && '每年'}
                  {plan.planType === 'lifetime' && '终身'}
                </div>
              </div>

              {/* 功能特性 */}
              <ul style={{ marginBottom: '24px' }}>
                {plan.features.map((feature, index) => (
                  <li 
                    key={index}
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: '14px',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}
                  >
                    <Icon name="check" style={{ 
                      color: 'var(--color-primary-blue)', 
                      width: '16px', 
                      height: '16px',
                      marginTop: '2px',
                      flexShrink: 0
                    }} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* 购买按钮 */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePurchase(plan)
                }}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: plan.popular 
                    ? 'var(--gradient-primary)' 
                    : theme === 'dark' 
                      ? 'rgba(59, 130, 246, 0.2)' 
                      : 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid var(--color-primary-blue)',
                  borderRadius: '8px',
                  color: plan.popular ? 'white' : 'var(--color-primary-blue)',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isProcessing ? 0.7 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                {isProcessing && selectedPlan === plan ? '处理中...' : '立即购买'}
              </button>
            </div>
          ))}
        </div>

        {/* 说明文字 */}
        <div style={{
          background: theme === 'dark' 
            ? 'rgba(59, 130, 246, 0.1)' 
            : 'rgba(59, 130, 246, 0.05)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
            margin: 0
          }}>
            💡 购买会员服务后，您将自动加入我们的邮件列表，接收专属内容推送。
            会员权益立即生效，支持7天无理由退款。
          </p>
        </div>
      </div>
    </div>
  )
}