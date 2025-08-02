/**
 * 邮件订阅API - email-subscription.ts
 * 
 * 移动端邮件订阅相关的API调用
 */

import { mobileAPI, useAPIState, handleAPIError } from './mobile-api'
import { useToast } from '@/components/ui'
import { useCallback } from 'react'

// 邮件订阅数据接口
export interface EmailSubscription {
  id: string
  email: string
  isSubscribed: boolean
  frequency: 'daily' | 'weekly' | 'monthly'
  categories: {
    aiTools: boolean
    monetization: boolean
    caseStudies: boolean
    tutorials: boolean
  }
  subscribedAt: string
  lastEmailSent?: string
}

// 订阅请求接口
export interface SubscribeRequest {
  email: string
  frequency?: EmailSubscription['frequency']
  categories?: Partial<EmailSubscription['categories']>
  source?: string // 订阅来源跟踪
}

// 订阅偏好更新接口
export interface UpdatePreferencesRequest {
  frequency?: EmailSubscription['frequency']
  categories?: Partial<EmailSubscription['categories']>
}

/**
 * 邮件订阅API模块
 */
export const emailSubscriptionAPI = {
  /**
   * 邮件订阅
   */
  async subscribe(data: SubscribeRequest): Promise<EmailSubscription> {
    return mobileAPI.post('/api/email-subscriptions', {
      data: {
        email: data.email,
        frequency: data.frequency || 'weekly',
        categories: {
          aiTools: true,
          monetization: true,
          caseStudies: false,
          tutorials: true,
          ...data.categories
        },
        source: data.source || 'mobile-discover',
        isSubscribed: true,
        subscribedAt: new Date().toISOString()
      }
    })
  },

  /**
   * 取消订阅
   */
  async unsubscribe(email: string): Promise<void> {
    return mobileAPI.put(`/api/email-subscriptions/unsubscribe`, {
      data: { email }
    })
  },

  /**
   * 获取订阅状态
   */
  async getSubscription(email: string): Promise<EmailSubscription | null> {
    try {
      return await mobileAPI.get(`/api/email-subscriptions?filters[email][$eq]=${email}`)
    } catch (error) {
      // 如果没找到订阅记录，返回null而不是抛出错误
      if (error instanceof Error && error.message.includes('404')) {
        return null
      }
      throw error
    }
  },

  /**
   * 更新订阅偏好
   */
  async updatePreferences(email: string, preferences: UpdatePreferencesRequest): Promise<EmailSubscription> {
    return mobileAPI.put('/api/email-subscriptions/preferences', {
      data: {
        email,
        ...preferences
      }
    })
  },

  /**
   * 获取免费资源列表
   */
  async getFreeResources(): Promise<Array<{
    id: string
    title: string
    description: string
    downloadUrl: string
    category: string
    downloadCount: number
  }>> {
    return mobileAPI.get('/api/free-resources?populate=*')
  },

  /**
   * 发送验证邮件
   */
  async sendVerificationEmail(email: string): Promise<void> {
    return mobileAPI.post('/api/email-subscriptions/verify', {
      data: { email }
    })
  },

  /**
   * 验证邮箱
   */
  async verifyEmail(token: string): Promise<EmailSubscription> {
    return mobileAPI.post('/api/email-subscriptions/confirm', {
      data: { token }
    })
  }
}

/**
 * 邮件订阅Hook
 */
export function useEmailSubscription() {
  const { toast } = useToast()
  const subscriptionState = useAPIState<EmailSubscription>()
  const resourcesState = useAPIState<Array<any>>([])

  // 订阅邮件
  const subscribe = useCallback(async (data: SubscribeRequest) => {
    subscriptionState.setLoading(true)
    subscriptionState.setError(null)

    try {
      const result = await emailSubscriptionAPI.subscribe(data)
      subscriptionState.setData(result)
      
      // 显示成功Toast
      toast.success('订阅成功！', {
        message: '感谢订阅！我们会定期向您发送高质量的AI变现资讯',
        duration: 5000,
        action: {
          label: '查看',
          onClick: () => {
            window.location.href = '/profile'
          }
        }
      })

      return result
    } catch (error) {
      const errorMessage = handleAPIError(error, toast)
      subscriptionState.setError(errorMessage)
      throw error
    } finally {
      subscriptionState.setLoading(false)
    }
  }, [subscriptionState, toast])

  // 取消订阅
  const unsubscribe = useCallback(async (email: string) => {
    subscriptionState.setLoading(true)
    subscriptionState.setError(null)

    try {
      await emailSubscriptionAPI.unsubscribe(email)
      subscriptionState.setData(undefined)
      
      toast.info('已取消订阅', {
        message: '您已成功取消邮件订阅'
      })
    } catch (error) {
      const errorMessage = handleAPIError(error, toast)
      subscriptionState.setError(errorMessage)
      throw error
    } finally {
      subscriptionState.setLoading(false)
    }
  }, [subscriptionState, toast])

  // 更新偏好
  const updatePreferences = useCallback(async (email: string, preferences: UpdatePreferencesRequest) => {
    subscriptionState.setLoading(true)
    subscriptionState.setError(null)

    try {
      const result = await emailSubscriptionAPI.updatePreferences(email, preferences)
      subscriptionState.setData(result)
      
      toast.success('偏好已更新', {
        message: '您的邮件订阅偏好已成功更新'
      })

      return result
    } catch (error) {
      const errorMessage = handleAPIError(error, toast)
      subscriptionState.setError(errorMessage)
      throw error
    } finally {
      subscriptionState.setLoading(false)
    }
  }, [subscriptionState, toast])

  // 获取订阅状态
  const checkSubscription = useCallback(async (email: string) => {
    subscriptionState.setLoading(true)
    subscriptionState.setError(null)

    try {
      const result = await emailSubscriptionAPI.getSubscription(email)
      subscriptionState.setData(result || undefined)
      return result
    } catch (error) {
      const errorMessage = handleAPIError(error)
      subscriptionState.setError(errorMessage)
      throw error
    } finally {
      subscriptionState.setLoading(false)
    }
  }, [subscriptionState])

  // 获取免费资源
  const loadFreeResources = useCallback(async () => {
    resourcesState.setLoading(true)
    resourcesState.setError(null)

    try {
      const result = await emailSubscriptionAPI.getFreeResources()
      resourcesState.setData(result)
      return result
    } catch (error) {
      const errorMessage = handleAPIError(error, toast)
      resourcesState.setError(errorMessage)
      throw error
    } finally {
      resourcesState.setLoading(false)
    }
  }, [resourcesState, toast])

  return {
    // 状态
    subscription: subscriptionState.data,
    freeResources: resourcesState.data,
    loading: subscriptionState.loading || resourcesState.loading,
    error: subscriptionState.error || resourcesState.error,

    // 操作
    subscribe,
    unsubscribe,
    updatePreferences,
    checkSubscription,
    loadFreeResources,

    // 工具方法
    reset: () => {
      subscriptionState.reset()
      resourcesState.reset()
    }
  }
}

/**
 * 邮件订阅表单验证
 */
export const emailValidation = {
  /**
   * 验证邮箱格式
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * 验证邮箱域名
   */
  isValidDomain: (email: string): boolean => {
    const domain = email.split('@')[1]
    if (!domain) return false
    
    // 常见的无效域名
    const invalidDomains = ['test.com', 'example.com', 'temp.com']
    return !invalidDomains.includes(domain.toLowerCase())
  },

  /**
   * 获取邮箱验证错误信息
   */
  getValidationError: (email: string): string | null => {
    if (!email.trim()) {
      return '请输入邮箱地址'
    }
    
    if (!emailValidation.isValidEmail(email)) {
      return '请输入有效的邮箱格式'
    }
    
    if (!emailValidation.isValidDomain(email)) {
      return '请使用真实的邮箱地址'
    }
    
    return null
  }
}