import { useState } from 'react'
import { strapiApi } from '@/lib/strapi'

interface UseEmailSubscriptionResult {
  subscribe: (email: string) => Promise<{ success: boolean; message: string }>
  isLoading: boolean
  error: string | null
}

export function useEmailSubscription(): UseEmailSubscriptionResult {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subscribe = async (email: string): Promise<{ success: boolean; message: string }> => {
    if (!email) {
      setError('邮箱地址不能为空')
      return { success: false, message: '邮箱地址不能为空' }
    }

    // 基本邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('请输入有效的邮箱地址')
      return { success: false, message: '请输入有效的邮箱地址' }
    }

    setIsLoading(true)
    setError(null)

    try {
      // 调用Strapi邮件订阅API
      const response = await strapiApi.post('/api/email-subscriptions', {
        data: {
          email: email.toLowerCase(),
          isActive: true,
          source: 'website'
        }
      })

      if (response) {
        return {
          success: true,
          message: '订阅成功！感谢您的关注'
        }
      } else {
        throw new Error('订阅失败')
      }
    } catch (err: any) {
      let errorMessage = '订阅失败，请稍后重试'
      
      if (err.response?.status === 400) {
        errorMessage = '该邮箱已订阅或格式不正确'
      } else if (err.response?.status === 409) {
        errorMessage = '该邮箱已订阅'
      } else if (err.message) {
        errorMessage = err.message
      }

      setError(errorMessage)
      return {
        success: false,
        message: errorMessage
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    subscribe,
    isLoading,
    error
  }
}
