/**
 * 移动端API统一导出 - index.ts
 * 
 * 统一管理所有移动端API模块
 * 提供统一的导入入口和工具函数
 */

// 导出API客户端和基础工具
export { 
  mobileAPI, 
  useAPIState, 
  handleAPIError, 
  APIError 
} from './mobile-api'

// 导出邮件订阅相关
export { 
  emailSubscriptionAPI, 
  useEmailSubscription, 
  emailValidation 
} from './email-subscription'
export type { 
  EmailSubscription, 
  SubscribeRequest, 
  UpdatePreferencesRequest 
} from './email-subscription'

// 导出会员管理相关
export { 
  membershipAPI, 
  useMembership 
} from './membership'
export type { 
  MembershipStatus, 
  MembershipBenefit, 
  UpgradeRequest, 
  ArticleAccess 
} from './membership'

// React相关导入
import { useEffect, useCallback } from 'react'

/**
 * 移动端应用初始化Hook
 * 用于在应用启动时初始化必要的数据
 */
export function useMobileAppInit(userId?: string) {
  const emailSub = useEmailSubscription()
  const membership = useMembership(userId)

  // 应用初始化
  const initialize = useCallback(async () => {
    try {
      // 并行加载基础数据
      await Promise.allSettled([
        membership.loadMembershipStatus(),
        membership.loadBenefits(),
        emailSub.loadFreeResources()
      ])
    } catch (error) {
      console.error('App initialization failed:', error)
    }
  }, [membership, emailSub])

  // 组件挂载时初始化
  useEffect(() => {
    initialize()
  }, [initialize])

  return {
    // 状态
    isInitialized: !membership.loading && !emailSub.loading,
    
    // 数据
    membership: membership.membership,
    freeResources: emailSub.freeResources,
    benefits: membership.benefits,
    
    // 操作
    reinitialize: initialize,
    
    // 子模块
    emailSubscription: emailSub,
    membershipManager: membership
  }
}

/**
 * 移动端页面级别的数据管理Hook
 * 用于在特定页面加载所需的数据
 */
export function useMobilePageData(
  page: 'discover' | 'weekly' | 'profile',
  userId?: string
) {
  const emailSub = useEmailSubscription()
  const membership = useMembership(userId)

  const loadPageData = useCallback(async () => {
    switch (page) {
      case 'discover':
        // 发现页面：加载免费资源
        await emailSub.loadFreeResources()
        break
        
      case 'weekly':
        // 周刊页面：加载会员状态和权益
        await Promise.allSettled([
          membership.loadMembershipStatus(),
          membership.loadBenefits()
        ])
        break
        
      case 'profile':
        // 个人中心：加载所有用户相关数据
        await Promise.allSettled([
          membership.loadMembershipStatus(),
          membership.loadBenefits(),
          membership.loadPlans(),
          emailSub.loadFreeResources()
        ])
        break
    }
  }, [page, emailSub, membership])

  useEffect(() => {
    loadPageData()
  }, [loadPageData])

  return {
    loading: membership.loading || emailSub.loading,
    error: membership.error || emailSub.error,
    reload: loadPageData,
    emailSubscription: emailSub,
    membership: membership
  }
}

/**
 * 移动端数据缓存管理
 */
export const mobileCache = {
  /**
   * 清除所有缓存
   */
  clearAll(): void {
    mobileAPI.clearCache()
  },

  /**
   * 清除特定模块的缓存
   */
  clearModule(module: 'email' | 'membership' | 'articles'): void {
    switch (module) {
      case 'email':
        mobileAPI.clearCache('email-subscriptions')
        break
      case 'membership':
        mobileAPI.clearCache('memberships')
        break
      case 'articles':
        mobileAPI.clearCache('articles')
        break
    }
  },

  /**
   * 预加载关键数据
   */
  async preload(userId?: string): Promise<void> {
    try {
      // 预加载会员状态（最重要）
      await membershipAPI.getMembershipStatus(userId)
      
      // 预加载免费资源
      await emailSubscriptionAPI.getFreeResources()
      
      // 预加载会员权益
      await membershipAPI.getMembershipBenefits()
    } catch (error) {
      console.warn('Preload failed:', error)
    }
  }
}

/**
 * 移动端错误恢复工具
 */
export const mobileErrorRecovery = {
  /**
   * 自动重试失败的请求
   */
  async retryFailedRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError: Error

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await requestFn()
      } catch (error) {
        lastError = error as Error
        
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)))
        }
      }
    }

    throw lastError!
  },

  /**
   * 网络恢复后重新加载数据
   */
  setupNetworkRecovery(onReconnect: () => void): () => void {
    const handleOnline = () => {
      console.log('Network recovered, reloading data...')
      onReconnect()
    }

    window.addEventListener('online', handleOnline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
    }
  }
}

/**
 * 移动端性能监控
 */
export const mobilePerformance = {
  /**
   * 监控API请求性能
   */
  measureAPIPerformance: (() => {
    const measurements = new Map<string, number[]>()

    return {
      start(key: string) {
        return performance.now()
      },

      end(key: string, startTime: number) {
        const duration = performance.now() - startTime
        
        if (!measurements.has(key)) {
          measurements.set(key, [])
        }
        
        measurements.get(key)!.push(duration)
        
        // 只保留最近的10次测量
        const times = measurements.get(key)!
        if (times.length > 10) {
          times.shift()
        }
      },

      getAverageTime(key: string): number {
        const times = measurements.get(key)
        if (!times || times.length === 0) return 0
        
        return times.reduce((sum, time) => sum + time, 0) / times.length
      },

      getAllMeasurements(): Record<string, number> {
        const result: Record<string, number> = {}
        
        for (const [key, times] of measurements) {
          result[key] = this.getAverageTime(key)
        }
        
        return result
      }
    }
  })(),

  /**
   * 监控组件渲染性能
   */
  measureComponentPerformance(componentName: string) {
    return {
      start: performance.now(),
      end(startTime: number) {
        const duration = performance.now() - startTime
        console.log(`${componentName} render time:`, duration, 'ms')
        return duration
      }
    }
  }
}

/**
 * 移动端开发调试工具
 */
export const mobileDebug = {
  /**
   * 启用API调试日志
   */
  enableAPILogs(): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('Mobile API debug logs enabled')
    }
  },

  /**
   * 模拟网络状况
   */
  simulateNetworkConditions(condition: 'slow' | 'offline' | 'normal'): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Simulating ${condition} network condition`)
      // 在开发环境中可以添加网络延迟模拟
    }
  },

  /**
   * 获取当前API状态
   */
  getAPIStatus(): {
    cacheSize: number
    pendingRequests: number
    errorRate: number
  } {
    return {
      cacheSize: 0, // 实际实现中从mobileAPI获取
      pendingRequests: 0,
      errorRate: 0
    }
  }
}