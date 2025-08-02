/**
 * 会员管理API - membership.ts
 * 
 * 移动端会员状态和权限管理相关的API调用
 */

import { mobileAPI, useAPIState, handleAPIError } from './mobile-api'
import { useToast } from '@/components/ui'
import { useCallback } from 'react'

// 会员状态接口
export interface MembershipStatus {
  id: string
  userId: string
  isMember: boolean
  membershipType: 'free' | 'basic' | 'premium' | 'vip'
  startDate?: string
  endDate?: string
  autoRenew: boolean
  freeArticlesRead: number
  freeArticlesLimit: number
  features: {
    unlimitedArticles: boolean
    exclusiveContent: boolean
    expertGuidance: boolean
    communityAccess: boolean
    downloadResources: boolean
    prioritySupport: boolean
  }
  paymentStatus: 'active' | 'past_due' | 'canceled' | 'unpaid'
  createdAt: string
  updatedAt: string
}

// 会员权益接口
export interface MembershipBenefit {
  id: string
  name: string
  description: string
  icon: string
  available: boolean
  membershipTypes: string[]
}

// 会员升级请求接口
export interface UpgradeRequest {
  membershipType: MembershipStatus['membershipType']
  paymentMethod: 'alipay' | 'wechat' | 'card'
  autoRenew?: boolean
}

// 文章访问权限接口
export interface ArticleAccess {
  articleId: string
  canAccess: boolean
  reason?: 'free' | 'member' | 'limit_exceeded' | 'premium_required'
  remainingFreeAccess: number
}

/**
 * 会员管理API模块
 */
export const membershipAPI = {
  /**
   * 获取当前用户会员状态
   */
  async getMembershipStatus(userId?: string): Promise<MembershipStatus> {
    const endpoint = userId 
      ? `/api/memberships?filters[userId][$eq]=${userId}&populate=*`
      : '/api/memberships/me?populate=*'
    
    return mobileAPI.get(endpoint)
  },

  /**
   * 检查文章访问权限
   */
  async checkArticleAccess(articleId: string, userId?: string): Promise<ArticleAccess> {
    return mobileAPI.post('/api/memberships/check-access', {
      data: { articleId, userId }
    })
  },

  /**
   * 记录免费文章阅读
   */
  async recordFreeArticleRead(articleId: string, userId?: string): Promise<MembershipStatus> {
    return mobileAPI.post('/api/memberships/record-read', {
      data: { articleId, userId }
    })
  },

  /**
   * 获取会员权益列表
   */
  async getMembershipBenefits(): Promise<MembershipBenefit[]> {
    return mobileAPI.get('/api/membership-benefits?populate=*')
  },

  /**
   * 获取会员计划和价格
   */
  async getMembershipPlans(): Promise<Array<{
    id: string
    type: MembershipStatus['membershipType']
    name: string
    description: string
    price: number
    originalPrice?: number
    duration: number // 月数
    features: string[]
    popular?: boolean
    discount?: number
  }>> {
    return mobileAPI.get('/api/membership-plans?populate=*')
  },

  /**
   * 创建会员升级订单
   */
  async createUpgradeOrder(data: UpgradeRequest): Promise<{
    orderId: string
    paymentUrl: string
    qrCode?: string
    amount: number
  }> {
    return mobileAPI.post('/api/memberships/upgrade', { data })
  },

  /**
   * 查询订单状态
   */
  async getOrderStatus(orderId: string): Promise<{
    orderId: string
    status: 'pending' | 'paid' | 'failed' | 'canceled'
    paidAt?: string
    amount: number
  }> {
    return mobileAPI.get(`/api/orders/${orderId}/status`)
  },

  /**
   * 取消自动续费
   */
  async cancelAutoRenewal(userId?: string): Promise<MembershipStatus> {
    return mobileAPI.put('/api/memberships/cancel-auto-renewal', {
      data: { userId }
    })
  },

  /**
   * 恢复自动续费
   */
  async enableAutoRenewal(userId?: string): Promise<MembershipStatus> {
    return mobileAPI.put('/api/memberships/enable-auto-renewal', {
      data: { userId }
    })
  },

  /**
   * 获取会员专享内容预览
   */
  async getMemberPreviewContent(): Promise<Array<{
    id: string
    title: string
    description: string
    type: 'article' | 'resource' | 'course' | 'tool'
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    estimatedTime: string
    value: string
    preview: string
  }>> {
    return mobileAPI.get('/api/member-content-preview?populate=*')
  }
}

/**
 * 会员状态管理Hook
 */
export function useMembership(userId?: string) {
  const { toast } = useToast()
  const membershipState = useAPIState<MembershipStatus>()
  const benefitsState = useAPIState<MembershipBenefit[]>([])
  const plansState = useAPIState<any[]>([])

  // 加载会员状态
  const loadMembershipStatus = useCallback(async () => {
    membershipState.setLoading(true)
    membershipState.setError(null)

    try {
      const result = await membershipAPI.getMembershipStatus(userId)
      membershipState.setData(result)
      return result
    } catch (error) {
      const errorMessage = handleAPIError(error)
      membershipState.setError(errorMessage)
      throw error
    } finally {
      membershipState.setLoading(false)
    }
  }, [membershipState, userId])

  // 检查文章访问权限
  const checkAccess = useCallback(async (articleId: string): Promise<ArticleAccess> => {
    try {
      const result = await membershipAPI.checkArticleAccess(articleId, userId)
      
      // 如果没有访问权限，显示相应提示
      if (!result.canAccess) {
        switch (result.reason) {
          case 'limit_exceeded':
            toast.warning('免费阅读次数已用完', {
              message: `今日免费阅读已达上限，升级会员解锁无限阅读`,
              action: {
                label: '升级',
                onClick: () => {
                  window.location.href = '/membership'
                }
              }
            })
            break
          case 'premium_required':
            toast.info('会员专享内容', {
              message: '该内容仅限会员访问，升级会员解锁更多内容',
              action: {
                label: '升级',
                onClick: () => {
                  window.location.href = '/membership'
                }
              }
            })
            break
        }
      }

      return result
    } catch (error) {
      handleAPIError(error, toast)
      throw error
    }
  }, [userId, toast])

  // 记录阅读并更新状态
  const recordRead = useCallback(async (articleId: string) => {
    try {
      const result = await membershipAPI.recordFreeArticleRead(articleId, userId)
      membershipState.setData(result)
      return result
    } catch (error) {
      handleAPIError(error, toast)
      throw error
    }
  }, [membershipState, userId, toast])

  // 创建升级订单
  const createUpgrade = useCallback(async (data: UpgradeRequest) => {
    membershipState.setLoading(true)
    membershipState.setError(null)

    try {
      const result = await membershipAPI.createUpgradeOrder(data)
      
      toast.success('订单创建成功', {
        message: '请完成支付以升级会员',
        duration: 10000
      })

      return result
    } catch (error) {
      const errorMessage = handleAPIError(error, toast)
      membershipState.setError(errorMessage)
      throw error
    } finally {
      membershipState.setLoading(false)
    }
  }, [membershipState, toast])

  // 加载会员权益
  const loadBenefits = useCallback(async () => {
    benefitsState.setLoading(true)
    benefitsState.setError(null)

    try {
      const result = await membershipAPI.getMembershipBenefits()
      benefitsState.setData(result)
      return result
    } catch (error) {
      const errorMessage = handleAPIError(error)
      benefitsState.setError(errorMessage)
      throw error
    } finally {
      benefitsState.setLoading(false)
    }
  }, [benefitsState])

  // 加载会员计划
  const loadPlans = useCallback(async () => {
    plansState.setLoading(true)
    plansState.setError(null)

    try {
      const result = await membershipAPI.getMembershipPlans()
      plansState.setData(result)
      return result
    } catch (error) {
      const errorMessage = handleAPIError(error)
      plansState.setError(errorMessage)
      throw error
    } finally {
      plansState.setLoading(false)
    }
  }, [plansState])

  // 取消自动续费
  const cancelAutoRenew = useCallback(async () => {
    membershipState.setLoading(true)

    try {
      const result = await membershipAPI.cancelAutoRenewal(userId)
      membershipState.setData(result)
      
      toast.success('已取消自动续费', {
        message: '您的会员将在到期后停止续费'
      })

      return result
    } catch (error) {
      handleAPIError(error, toast)
      throw error
    } finally {
      membershipState.setLoading(false)
    }
  }, [membershipState, userId, toast])

  return {
    // 状态
    membership: membershipState.data,
    benefits: benefitsState.data,
    plans: plansState.data,
    loading: membershipState.loading || benefitsState.loading || plansState.loading,
    error: membershipState.error || benefitsState.error || plansState.error,

    // 操作
    loadMembershipStatus,
    checkAccess,
    recordRead,
    createUpgrade,
    loadBenefits,
    loadPlans,
    cancelAutoRenew,

    // 工具方法
    reset: () => {
      membershipState.reset()
      benefitsState.reset()
      plansState.reset()
    },

    // 计算属性
    get isMember() {
      return membershipState.data?.isMember || false
    },

    get remainingFreeAccess() {
      const membership = membershipState.data
      if (!membership) return 0
      return Math.max(0, membership.freeArticlesLimit - membership.freeArticlesRead)
    },

    get membershipType() {
      return membershipState.data?.membershipType || 'free'
    }
  }
}